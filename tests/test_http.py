"""Tests for HTTP client diagnostics.

Network calls are mocked; these tests verify error context only.
"""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.exceptions import AuthenticationError, RateLimitError, TLSCertificateError
from perplexity_web_mcp.http import HTTPClient


@pytest.fixture(autouse=True)
def mock_curl_cffi_session():
    """Automatically mock curl_cffi Session for all HTTP tests to prevent native Windows socket hangs."""
    with patch("perplexity_web_mcp.http.Session") as mock_session:
        mock_session.return_value.headers = {}
        yield mock_session


class TestHTTPDiagnostics:
    """Verify HTTP errors preserve endpoint context."""

    def test_session_includes_perplexity_app_headers(self, mock_curl_cffi_session) -> None:
        client = HTTPClient("token", requests_per_second=0, max_retries=0, rotate_fingerprint=False)

        assert mock_curl_cffi_session.call_args[1]["headers"]["x-app-apiclient"] == "default"
        assert mock_curl_cffi_session.call_args[1]["headers"]["x-app-apiversion"] == "2.18"

    def test_init_search_403_includes_endpoint_context(self) -> None:
        client = HTTPClient("token", requests_per_second=0, max_retries=0, rotate_fingerprint=False)
        client._session = MagicMock()
        response = MagicMock()
        response.status_code = 403
        response.url = "https://www.perplexity.ai/search/new?q=test"
        response.text = "forbidden"
        client._session.get.return_value = response

        with pytest.raises(AuthenticationError) as exc:
            client.init_search("test")

        assert "GET /search/new returned 403" in str(exc.value)
        assert exc.value.url == "https://www.perplexity.ai/search/new?q=test"
        assert exc.value.response_body == "forbidden"

    def test_post_429_includes_endpoint_context(self) -> None:
        client = HTTPClient("token", requests_per_second=0, max_retries=0, rotate_fingerprint=False)
        client._session = MagicMock()
        error = Exception("429 Client Error")
        response = MagicMock()
        response.status_code = 429
        response.url = "https://www.perplexity.ai/rest/sse/perplexity_ask"
        response.text = "rate limit"
        error.response = response
        client._session.post.side_effect = error

        with pytest.raises(RateLimitError) as exc:
            client.post("/rest/sse/perplexity_ask", json={"query_str": "test"})

        assert "POST /rest/sse/perplexity_ask returned 429" in str(exc.value)
        assert exc.value.url == "https://www.perplexity.ai/rest/sse/perplexity_ask"
        assert exc.value.response_body == "rate limit"


class TestTLSAndCABundle:
    """Verify TLS certificate error handling and CA bundle discovery."""

    def test_get_tls_error_fails_fast_without_retry(self) -> None:
        client = HTTPClient("token", requests_per_second=0, max_retries=3, rotate_fingerprint=False)
        client._session = MagicMock()
        client._session.get.side_effect = Exception(
            "curl: (60) SSL certificate OpenSSL verify result: unable to get local issuer certificate"
        )

        with pytest.raises(TLSCertificateError) as exc:
            client.get("/test")

        assert "TLS certificate verification failed" in str(exc.value)
        # Should fail on first attempt without retrying 3 times
        assert client._session.get.call_count == 1

    def test_post_tls_error_fails_fast_without_retry(self) -> None:
        client = HTTPClient("token", requests_per_second=0, max_retries=3, rotate_fingerprint=False)
        client._session = MagicMock()
        client._session.post.side_effect = Exception("curl: (60) SSL certificate OpenSSL verify result")

        with pytest.raises(TLSCertificateError) as exc:
            client.post("/test", json={})

        assert "TLS certificate verification failed" in str(exc.value)
        assert client._session.post.call_count == 1

    def test_ca_bundle_respects_env_var(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        from perplexity_web_mcp.http import get_system_ca_bundle_path

        fake_cert = tmp_path / "my_ca.pem"
        fake_cert.write_text("FAKE CERT")
        monkeypatch.setenv("CURL_CA_BUNDLE", str(fake_cert))

        bundle = get_system_ca_bundle_path()
        assert bundle == str(fake_cert)

    def test_windows_store_only_includes_server_trusted_certificates(self, monkeypatch: pytest.MonkeyPatch) -> None:
        from perplexity_web_mcp import http

        server_auth_oid = "1.3.6.1.5.5.7.3.1"
        monkeypatch.setattr(
            http.ssl,
            "enum_certificates",
            lambda store: [
                (b"trusted", "x509_asn", True),
                (b"server-auth", "x509_asn", {server_auth_oid}),
                (b"client-only", "x509_asn", {"1.3.6.1.5.5.7.3.2"}),
                (b"untrusted", "x509_asn", False),
            ],
            raising=False,
        )
        monkeypatch.setattr(http, "_convert_der_to_pem", lambda der: der.decode())

        assert http._extract_windows_store_certs("ROOT") == ["trusted", "server-auth"]

    def test_ca_bundle_generation_on_windows(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        import sys

        from perplexity_web_mcp import http

        monkeypatch.setattr(http, "CONFIG_DIR", tmp_path)
        monkeypatch.delenv("CURL_CA_BUNDLE", raising=False)
        monkeypatch.delenv("SSL_CERT_FILE", raising=False)
        monkeypatch.delenv("REQUESTS_CA_BUNDLE", raising=False)

        if sys.platform == "win32":
            bundle = http.get_system_ca_bundle_path()
            assert bundle is not None
            assert Path(bundle).exists()
            assert (tmp_path / "system-ca-bundle.pem").exists()
