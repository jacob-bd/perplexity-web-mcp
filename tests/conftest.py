"""Global pytest fixtures and configuration for perplexity-web-mcp tests.

Ensures strict 100% offline testing and prevents native curl_cffi and external socket hangs on Windows.
"""

from __future__ import annotations

import socket
from unittest.mock import MagicMock, patch

import pytest


@pytest.fixture(autouse=True)
def block_all_network(request: pytest.FixtureRequest):
    """Fail fast on any unmocked external network connection while allowing asyncio internal loopback."""
    if "TestIntegration" in request.node.nodeid:
        yield
        return

    orig_connect = socket.socket.connect

    def guarded_connect(self, address, *args, **kwargs):
        host = address[0] if isinstance(address, (tuple, list)) else address
        if host in ("127.0.0.1", "localhost", "::1"):
            return orig_connect(self, address, *args, **kwargs)
        raise RuntimeError(f"Blocked unmocked external network connection to {address} during test execution.")

    with patch.object(socket.socket, "connect", guarded_connect):
        yield


@pytest.fixture(autouse=True)
def mock_curl_cffi_globally(request: pytest.FixtureRequest):
    """Globally intercept curl_cffi Session across all modules to prevent native Windows socket hangs."""
    if "TestIntegration" in request.node.nodeid:
        yield None
        return

    mock_session_inst = MagicMock()
    mock_session_inst.headers = {}
    mock_session_inst.cookies = MagicMock()
    get_response = MagicMock(status_code=200, text="", url="https://www.perplexity.ai")
    get_response.json.return_value = {}
    post_response = MagicMock(status_code=200, text="", url="https://www.perplexity.ai")
    post_response.json.return_value = {}
    mock_session_inst.get.return_value = get_response
    mock_session_inst.post.return_value = post_response
    mock_session_inst.__enter__.return_value = mock_session_inst
    mock_session_inst.__exit__.return_value = None

    with (
        patch("curl_cffi.requests.Session", return_value=mock_session_inst) as mock_curl_session,
        patch("curl_cffi.requests.AsyncSession", return_value=mock_session_inst),
        patch("perplexity_web_mcp.core.Session", return_value=mock_session_inst),
        patch("perplexity_web_mcp.http.Session", return_value=mock_session_inst),
        patch("perplexity_web_mcp.rate_limits.Session", return_value=mock_session_inst),
        patch("perplexity_web_mcp.auth.Session", return_value=mock_session_inst),
        patch("perplexity_web_mcp.cli.auth.Session", return_value=mock_session_inst),
    ):
        yield mock_curl_session
