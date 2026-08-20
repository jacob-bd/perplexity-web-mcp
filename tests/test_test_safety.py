"""Regression coverage for the opt-in live-test safety contract."""

from unittest.mock import MagicMock

import conftest


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
