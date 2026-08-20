"""Global pytest fixtures and configuration for perplexity-web-mcp tests.

Keeps the default suite strictly offline and prevents native curl_cffi and external socket hangs on Windows.
Live integration tests must be marked and explicitly enabled from the command line.
"""

from __future__ import annotations

from ipaddress import ip_address
import socket
from unittest.mock import MagicMock, patch

import pytest


LIVE_TEST_MARKER = "integration"
LIVE_TEST_OPTION = "--run-live-tests"


def pytest_addoption(parser: pytest.Parser) -> None:
    """Require a deliberate command-line opt-in before live tests can run."""
    group = parser.getgroup("live integration tests")
    group.addoption(
        LIVE_TEST_OPTION,
        action="store_true",
        default=False,
        help="Allow tests marked 'integration' to access live external services.",
    )


def pytest_collection_modifyitems(config: pytest.Config, items: list[pytest.Item]) -> None:
    """Skip live tests by default, even when local credentials are present."""
    if config.getoption(LIVE_TEST_OPTION):
        return

    skip_live = pytest.mark.skip(reason=f"live integration tests require {LIVE_TEST_OPTION}")
    for item in items:
        if item.get_closest_marker(LIVE_TEST_MARKER) is not None:
            item.add_marker(skip_live)


def _live_integration_enabled(request: pytest.FixtureRequest) -> bool:
    """Return whether this marked test has explicit permission to use the network."""
    return request.node.get_closest_marker(LIVE_TEST_MARKER) is not None and request.config.getoption(LIVE_TEST_OPTION)


@pytest.fixture(autouse=True)
def block_all_network(request: pytest.FixtureRequest):
    """Fail fast on any unmocked external network connection while allowing asyncio internal loopback."""
    if _live_integration_enabled(request):
        yield
        return

    orig_connect = socket.socket.connect
    orig_getaddrinfo = socket.getaddrinfo

    def is_allowed_host(host) -> bool:
        if host is None:
            return True
        if isinstance(host, bytes):
            try:
                host = host.decode("ascii")
            except UnicodeDecodeError:
                return False
        if host == "localhost":
            return True
        try:
            address = ip_address(host)
        except (TypeError, ValueError):
            return False
        return address.is_loopback or address.is_unspecified

    def guarded_connect(self, address, *args, **kwargs):
        host = address[0] if isinstance(address, (tuple, list)) else address
        if is_allowed_host(host):
            return orig_connect(self, address, *args, **kwargs)
        raise RuntimeError(f"Blocked unmocked external network connection to {address} during test execution.")

    def guarded_getaddrinfo(host, port, *args, **kwargs):
        if is_allowed_host(host):
            return orig_getaddrinfo(host, port, *args, **kwargs)
        raise RuntimeError(f"Blocked unmocked external network connection to {(host, port)} during test execution.")

    with (
        patch.object(socket, "getaddrinfo", guarded_getaddrinfo),
        patch.object(socket.socket, "connect", guarded_connect),
    ):
        yield


@pytest.fixture(autouse=True)
def mock_curl_cffi_globally(request: pytest.FixtureRequest):
    """Globally intercept curl_cffi Session across all modules to prevent native Windows socket hangs."""
    if _live_integration_enabled(request):
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
