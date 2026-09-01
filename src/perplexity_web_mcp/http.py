"""HTTP client wrapper."""

from __future__ import annotations

from http.cookiejar import Cookie
import os
from pathlib import Path
import ssl
import sys
from time import monotonic
from typing import TYPE_CHECKING, Any
from urllib.parse import urlsplit

from curl_cffi.requests import Response as CurlResponse
from curl_cffi.requests import Session

from .constants import API_BASE_URL, DEFAULT_HEADERS, ENDPOINT_ASK, ENDPOINT_SEARCH_INIT, SESSION_COOKIE_NAME
from .exceptions import AuthenticationError, HTTPError, PerplexityError, RateLimitError, TLSCertificateError
from .limits import DEFAULT_TIMEOUT
from .logging import get_logger, log_request, log_response, log_retry
from .resilience import RateLimiter, RetryConfig, create_retry_decorator, get_random_browser_profile
from .token_store import CONFIG_DIR
from .trace import log_trace


if TYPE_CHECKING:
    from collections.abc import Generator

    from tenacity import RetryCallState


logger = get_logger(__name__)


_SERVER_AUTH_EKU = "1.3.6.1.5.5.7.3.1"
_PERPLEXITY_URL = urlsplit(API_BASE_URL)
_PERPLEXITY_HOST = _PERPLEXITY_URL.hostname or "www.perplexity.ai"


def _convert_der_to_pem(der: bytes) -> str | None:
    try:
        return ssl.DER_cert_to_PEM_cert(der)
    except Exception:
        return None


def _extract_windows_store_certs(store: str) -> list[str]:
    """Extract certificates from a Windows certificate store in PEM format."""
    try:
        converted = (
            _convert_der_to_pem(der)
            for der, encoding, trust in ssl.enum_certificates(store)
            if encoding == "x509_asn" and (trust is True or (isinstance(trust, set) and _SERVER_AUTH_EKU in trust))
        )
        return [c for c in converted if c is not None]
    except Exception:
        return []


def get_system_ca_bundle_path() -> str | None:
    """Resolve or build a CA bundle that includes the operating system's trusted roots.

    Checks CURL_CA_BUNDLE, SSL_CERT_FILE, and REQUESTS_CA_BUNDLE environment
    variables first. On Windows, if no explicit environment variable is set,
    exports trusted root and intermediate CA certificates from the Windows
    Certificate Store alongside certifi roots into a cached bundle at
    ~/.config/perplexity-web-mcp/system-ca-bundle.pem.
    """
    for env_var in ("CURL_CA_BUNDLE", "SSL_CERT_FILE", "REQUESTS_CA_BUNDLE"):
        bundle = os.environ.get(env_var)
        if bundle and Path(bundle).is_file():
            return bundle

    if sys.platform == "win32":
        try:
            cached_bundle = CONFIG_DIR / "system-ca-bundle.pem"
            if cached_bundle.is_file() and cached_bundle.stat().st_size > 0:
                return str(cached_bundle)

            pem_parts: list[str] = []

            try:
                import certifi

                certifi_file = Path(certifi.where())
                if certifi_file.is_file():
                    pem_parts.append(certifi_file.read_text(encoding="utf-8"))
            except Exception:
                pass

            for store in ("ROOT", "CA"):
                pem_parts.extend(_extract_windows_store_certs(store))

            if pem_parts:
                CONFIG_DIR.mkdir(parents=True, exist_ok=True)
                cached_bundle.write_text("\n".join(pem_parts), encoding="utf-8")
                return str(cached_bundle)
        except Exception as exc:
            logger.debug(f"Failed to generate system CA bundle on Windows: {exc}")

    return None


def _set_session_cookie(session: Session, session_token: str) -> None:
    """Install a host-only, HTTPS-only Perplexity session cookie."""
    session.cookies.jar.set_cookie(
        Cookie(
            version=0,
            name=SESSION_COOKIE_NAME,
            value=session_token,
            port=None,
            port_specified=False,
            domain=_PERPLEXITY_HOST,
            domain_specified=False,
            domain_initial_dot=False,
            path="/",
            path_specified=True,
            secure=True,
            expires=None,
            discard=True,
            comment=None,
            comment_url=None,
            rest={"HttpOnly": ""},
            rfc2109=False,
        )
    )


def _authenticated_url(endpoint: str) -> str:
    """Resolve an endpoint and restrict authenticated traffic to Perplexity HTTPS."""
    url = f"{API_BASE_URL}{endpoint}" if endpoint.startswith("/") else endpoint
    parsed = urlsplit(url)
    try:
        port = parsed.port
    except ValueError as exc:
        raise PerplexityError(f"Refusing authenticated request to malformed URL: {url!r}") from exc

    expected_port = _PERPLEXITY_URL.port or 443
    actual_port = port or (443 if parsed.scheme.lower() == "https" else None)
    same_origin = (
        parsed.scheme.lower() == "https"
        and parsed.hostname == _PERPLEXITY_HOST
        and actual_port == expected_port
        and parsed.username is None
        and parsed.password is None
    )
    if not same_origin:
        raise PerplexityError(
            f"Refusing to send an authenticated request outside {API_BASE_URL}. "
            "Use a separate unauthenticated HTTP client for external URLs."
        )
    return url


class HTTPClient:
    """HTTP client with retry, rate limiting, and error handling."""

    __slots__ = (
        "_impersonate",
        "_rate_limiter",
        "_retry_config",
        "_rotate_fingerprint",
        "_session",
        "_session_token",
        "_timeout",
    )

    def __init__(
        self,
        session_token: str,
        timeout: int = DEFAULT_TIMEOUT,
        impersonate: str = "chrome",
        max_retries: int = 3,
        retry_base_delay: float = 1.0,
        retry_max_delay: float = 60.0,
        retry_jitter: float = 0.5,
        requests_per_second: float = 0.5,
        rotate_fingerprint: bool = True,
    ) -> None:
        self._session_token = session_token
        self._timeout = timeout
        self._impersonate = impersonate
        self._rotate_fingerprint = rotate_fingerprint

        self._retry_config = RetryConfig(
            max_retries=max_retries,
            base_delay=retry_base_delay,
            max_delay=retry_max_delay,
            jitter=retry_jitter,
        )

        self._rate_limiter: RateLimiter | None = None
        if requests_per_second > 0:
            self._rate_limiter = RateLimiter(requests_per_second=requests_per_second)

        self._session = self._create_session(impersonate)
        logger.debug(f"HTTPClient initialized | impersonate={impersonate}")

    def _create_session(self, impersonate: str) -> Session:
        """Create a new HTTP session."""

        headers: dict[str, str] = {
            **DEFAULT_HEADERS,
            "Referer": f"{API_BASE_URL}/",
            "Origin": API_BASE_URL,
        }

        verify_bundle = get_system_ca_bundle_path()
        session_kwargs: dict[str, Any] = {
            "headers": headers,
            "timeout": self._timeout,
            "impersonate": impersonate,
        }
        if verify_bundle:
            session_kwargs["verify"] = verify_bundle

        session = Session(**session_kwargs)
        _set_session_cookie(session, self._session_token)
        return session

    def _rotate_session(self) -> None:
        """Rotate browser fingerprint."""

        if self._rotate_fingerprint:
            new_profile = get_random_browser_profile()
            logger.debug(f"Rotating fingerprint | old={self._impersonate} new={new_profile}")

            try:
                self._session.close()
            except Exception as exc:
                logger.debug(f"Session close error during rotation (suppressed): {exc}")

            self._impersonate = new_profile
            self._session = self._create_session(new_profile)

    def _on_retry(self, retry_state: RetryCallState) -> None:
        """Callback before each retry attempt."""

        attempt = retry_state.attempt_number
        exception = retry_state.outcome.exception() if retry_state.outcome else None
        wait_time = retry_state.next_action.sleep if retry_state.next_action else 0

        log_retry(attempt, self._retry_config.max_retries, exception, wait_time)

        if self._rotate_fingerprint:
            self._rotate_session()

    def _handle_error(self, error: Exception, context: str = "") -> None:
        """Handle HTTP errors and raise appropriate exceptions."""

        status_code = None
        response_body = None
        url = None
        response = getattr(error, "response", None)

        if response is not None:
            status_code = getattr(response, "status_code", None)
            url = getattr(response, "url", None)
            try:
                response_body = response.text if hasattr(response, "text") else None
            except Exception:
                response_body = None

        if status_code == 403:
            raise AuthenticationError(
                f"{context}returned 403 Forbidden.",
                url=str(url) if url else None,
                response_body=response_body,
            ) from error
        elif status_code == 429:
            raise RateLimitError(
                f"{context}returned 429 Rate Limited.",
                url=str(url) if url else None,
                response_body=response_body,
            ) from error
        elif status_code is not None:
            raise HTTPError(
                f"{context}HTTP {status_code}: {error!s}",
                status_code=status_code,
                url=str(url) if url else None,
                response_body=response_body,
            ) from error
        else:
            raise PerplexityError(f"{context}{error!s}") from error

    def _throttle(self) -> None:
        """Apply rate limiting."""

        if self._rate_limiter:
            self._rate_limiter.acquire()

    def get(self, endpoint: str, params: dict[str, Any] | None = None) -> CurlResponse:
        """Make a GET request with retry and rate limiting."""

        url = _authenticated_url(endpoint)
        log_request("GET", url, params=params)

        retryable_exceptions = (RateLimitError, ConnectionError, TimeoutError)

        @create_retry_decorator(self._retry_config, retryable_exceptions, self._on_retry)
        def _do_get() -> CurlResponse:
            self._throttle()
            request_start = monotonic()

            try:
                response = self._session.get(url, params=params)
                elapsed_ms = (monotonic() - request_start) * 1000
                log_response("GET", url, response.status_code, elapsed_ms=elapsed_ms)

                response.raise_for_status()
                return response
            except (RateLimitError, AuthenticationError, TLSCertificateError):
                raise  # Already mapped; let tenacity handle retry or fail fast
            except Exception as error:
                err_msg = str(error).lower()
                if "certificate" in err_msg or "ssl" in err_msg or "curl: (60)" in err_msg:
                    raise TLSCertificateError(
                        f"GET {endpoint} TLS certificate verification failed", reason=str(error)
                    ) from error
                self._handle_error(error, f"GET {endpoint} ")
                raise  # Unreachable (defensive); _handle_error always raises

        return _do_get()

    def post(
        self,
        endpoint: str,
        json: dict[str, Any] | None = None,
        stream: bool = False,
    ) -> CurlResponse:
        """Make a POST request with retry and rate limiting."""

        url = _authenticated_url(endpoint)
        log_request("POST", url, body_size=len(str(json)) if json else 0)

        retryable_exceptions = (RateLimitError, ConnectionError, TimeoutError)

        @create_retry_decorator(self._retry_config, retryable_exceptions, self._on_retry)
        def _do_post() -> CurlResponse:
            self._throttle()
            request_start = monotonic()

            try:
                response = self._session.post(url, json=json, stream=stream)
                elapsed_ms = (monotonic() - request_start) * 1000
                log_response("POST", url, response.status_code, elapsed_ms=elapsed_ms)

                response.raise_for_status()
                return response
            except (RateLimitError, AuthenticationError, TLSCertificateError):
                raise  # Already mapped; let tenacity handle retry or fail fast
            except Exception as error:
                err_msg = str(error).lower()
                if "certificate" in err_msg or "ssl" in err_msg or "curl: (60)" in err_msg:
                    raise TLSCertificateError(
                        f"POST {endpoint} TLS certificate verification failed", reason=str(error)
                    ) from error
                self._handle_error(error, f"POST {endpoint} ")
                raise  # Unreachable (defensive); _handle_error always raises

        return _do_post()

    def stream_lines(self, endpoint: str, json: dict[str, Any]) -> Generator[bytes, None, None]:
        """Make a streaming POST request and yield lines."""

        response = self.post(endpoint, json=json, stream=True)

        try:
            yield from response.iter_lines()
        finally:
            response.close()

    def init_search(self, query: str) -> None:
        """Initialize a search session (required before prompts).

        Uses minimal headers to avoid Cloudflare bot detection.
        The full headers (Accept, Content-Type) are only needed for POST requests.
        Retries on transient failures (same as get/post).
        """
        url = f"{API_BASE_URL}{ENDPOINT_SEARCH_INIT}"
        minimal_headers = {
            "Referer": API_BASE_URL,
            "Origin": API_BASE_URL,
        }

        log_request("GET", url, params={"q": query})

        retryable_exceptions = (RateLimitError, ConnectionError, TimeoutError)

        @create_retry_decorator(self._retry_config, retryable_exceptions, self._on_retry)
        def _do_init() -> None:
            self._throttle()
            request_start = monotonic()
            response = self._session.get(
                url,
                params={"q": query},
                headers=minimal_headers,  # Override session headers
            )
            elapsed_ms = (monotonic() - request_start) * 1000
            log_response("GET", url, response.status_code, elapsed_ms=elapsed_ms)
            log_trace(f"[STAGE 3 - HTTP GET /search/new] status={response.status_code} elapsed_ms={elapsed_ms:.1f}")

            response_body = None

            try:
                response_body = response.text if hasattr(response, "text") else None
            except Exception:
                response_body = None

            if response.status_code == 403:
                raise AuthenticationError(
                    f"GET {ENDPOINT_SEARCH_INIT} returned 403 Forbidden.",
                    url=str(getattr(response, "url", url)),
                    response_body=response_body,
                )
            if response.status_code == 429:
                raise RateLimitError(
                    f"GET {ENDPOINT_SEARCH_INIT} returned 429 Rate Limited.",
                    url=str(getattr(response, "url", url)),
                    response_body=response_body,
                )
            response.raise_for_status()

        _do_init()

    def stream_ask(self, payload: dict[str, Any]) -> Generator[bytes, None, None]:
        """Stream a prompt request to the ask endpoint."""

        yield from self.stream_lines(ENDPOINT_ASK, json=payload)

    def close(self) -> None:
        """Close the HTTP session."""

        self._session.close()

    def __enter__(self) -> HTTPClient:
        return self

    def __exit__(self, *args: Any) -> None:
        self.close()
