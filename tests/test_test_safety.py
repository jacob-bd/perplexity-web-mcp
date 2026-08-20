"""Regression coverage for the opt-in live-test safety contract."""

from pathlib import Path
from unittest.mock import MagicMock, patch

import conftest
import pytest


pytest_plugins = ["pytester"]


PROJECT_CONFTEST = Path(__file__).with_name("conftest.py")


def _load_project_conftest(pytester: pytest.Pytester) -> None:
    pytester.makeini(
        """
        [pytest]
        markers =
            integration: accesses live external services and requires --run-live-tests
        """
    )
    pytester.makeconftest(PROJECT_CONFTEST.read_text())


def _request(*, marked: bool, opted_in: bool) -> MagicMock:
    request = MagicMock()
    request.node.get_closest_marker.return_value = object() if marked else None
    request.config.getoption.return_value = opted_in
    return request


def test_live_integration_requires_marker_and_explicit_opt_in() -> None:
    assert conftest._live_integration_enabled(_request(marked=True, opted_in=True)) is True
    assert conftest._live_integration_enabled(_request(marked=True, opted_in=False)) is False
    assert conftest._live_integration_enabled(_request(marked=False, opted_in=True)) is False


def test_collection_skips_marked_live_tests_without_opt_in() -> None:
    config = MagicMock()
    config.getoption.return_value = False
    live_item = MagicMock()
    live_item.get_closest_marker.return_value = object()
    unit_item = MagicMock()
    unit_item.get_closest_marker.return_value = None

    conftest.pytest_collection_modifyitems(config, [live_item, unit_item])

    live_item.add_marker.assert_called_once()
    unit_item.add_marker.assert_not_called()


def test_collection_does_not_skip_live_tests_after_opt_in() -> None:
    config = MagicMock()
    config.getoption.return_value = True
    item = MagicMock()

    conftest.pytest_collection_modifyitems(config, [item])

    item.add_marker.assert_not_called()


def test_network_guard_blocks_dns_before_native_resolution() -> None:
    native_getaddrinfo = MagicMock(return_value=[])

    with patch.object(conftest.socket, "getaddrinfo", native_getaddrinfo):
        fixture = conftest.block_all_network.__wrapped__(_request(marked=False, opted_in=False))
        next(fixture)
        try:
            with pytest.raises(RuntimeError, match="Blocked unmocked external network connection"):
                conftest.socket.getaddrinfo("example.com", 443)
            native_getaddrinfo.assert_not_called()

            assert conftest.socket.getaddrinfo("localhost", 443) == []
            native_getaddrinfo.assert_called_once_with("localhost", 443)
        finally:
            fixture.close()


def test_default_subprocess_skips_marked_live_test(pytester: pytest.Pytester) -> None:
    _load_project_conftest(pytester)
    pytester.makepyfile(
        test_live="""
        import pytest

        @pytest.mark.integration
        def test_live():
            raise AssertionError("live test should be skipped")
        """
    )

    result = pytester.runpytest_subprocess("-q", "-rs")

    result.assert_outcomes(skipped=1)
    result.stdout.fnmatch_lines(["*live integration tests require --run-live-tests*"])


def test_opt_in_subprocess_runs_only_marked_live_test(pytester: pytest.Pytester) -> None:
    _load_project_conftest(pytester)
    pytester.makepyfile(
        test_safety="""
        import socket

        import pytest

        @pytest.mark.integration
        def test_marked_live_test_runs():
            assert True

        def test_unmarked_network_is_blocked():
            socket.create_connection(("example.com", 443), timeout=0.1)
        """
    )

    result = pytester.runpytest_subprocess("-q", "--run-live-tests")

    result.assert_outcomes(passed=1, failed=1)
    result.stdout.fnmatch_lines(["*Blocked unmocked external network connection*"])
