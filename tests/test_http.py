"""Tests for HTTP client diagnostics.

Network calls are mocked; these tests verify error context only.
"""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from perplexity_web_mcp.exceptions import AuthenticationError, RateLimitError
from perplexity_web_mcp.http import HTTPClient


class TestHTTPDiagnostics:
    """Verify HTTP errors preserve endpoint context."""

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
