"""HTTP client wrapper."""

from __future__ import annotations

from time import monotonic
from typing import TYPE_CHECKING, Any

from curl_cffi.requests import Response as CurlResponse
from curl_cffi.requests import Session

from .constants import API_BASE_URL, DEFAULT_HEADERS, ENDPOINT_ASK, ENDPOINT_SEARCH_INIT, SESSION_COOKIE_NAME
from .exceptions import AuthenticationError, HTTPError, PerplexityError, RateLimitError
from .limits import DEFAULT_TIMEOUT
from .logging import get_logger, log_request, log_response, log_retry
from .resilience import RateLimiter, RetryConfig, create_retry_decorator, get_random_browser_profile


if TYPE_CHECKING:
    from collections.abc import Generator

    from tenacity import RetryCallState


logger = get_logger(__name__)


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
        cookies: dict[str, str] = {SESSION_COOKIE_NAME: self._session_token}

        return Session(
            headers=headers,
            cookies=cookies,
            timeout=self._timeout,
            impersonate=impersonate,
        )

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

        url = f"{API_BASE_URL}{endpoint}" if endpoint.startswith("/") else endpoint
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
            except (RateLimitError, AuthenticationError):
                raise  # Already mapped; let tenacity handle retry
            except Exception as error:
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

        url = f"{API_BASE_URL}{endpoint}" if endpoint.startswith("/") else endpoint
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
            except (RateLimitError, AuthenticationError):
                raise  # Already mapped; let tenacity handle retry
            except Exception as error:
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
