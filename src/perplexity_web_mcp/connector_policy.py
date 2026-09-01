"""Local policy controls for account-connected source queries."""

from __future__ import annotations

from os import environ


BUILTIN_SOURCE_IDS = frozenset({"web", "scholar", "social", "edgar"})
_FALSE_ENV_VALUES = frozenset({"0", "false", "no", "off"})


def is_builtin_source_id(source_id: str) -> bool:
    """Return whether *source_id* is a public built-in source."""
    return source_id in BUILTIN_SOURCE_IDS


def connector_policy_allows(source_id: str) -> bool:
    """Return whether local environment policy allows a connector source."""
    enabled = environ.get("PWM_CONNECTORS_ENABLED", "true").strip().lower()
    if enabled in _FALSE_ENV_VALUES:
        return False

    if "PWM_CONNECTOR_ALLOWLIST" not in environ:
        return True
    allowed = {item.strip() for item in environ["PWM_CONNECTOR_ALLOWLIST"].split(",") if item.strip()}
    return source_id in allowed


def connector_policy_error(source_id: str) -> ValueError:
    """Build the error raised when local policy denies a connector source."""
    enabled = environ.get("PWM_CONNECTORS_ENABLED", "true").strip().lower()
    if enabled in _FALSE_ENV_VALUES:
        return ValueError(
            f"Connector '{source_id}' is disabled by PWM_CONNECTORS_ENABLED. "
            "Use a built-in source or explicitly enable connector access."
        )
    return ValueError(
        f"Connector '{source_id}' is not in PWM_CONNECTOR_ALLOWLIST. "
        "Add the exact reported connector ID before retrying."
    )


def ensure_connector_policy(source_id: str) -> None:
    """Raise when a non-built-in source is denied by local policy."""
    if not is_builtin_source_id(source_id) and not connector_policy_allows(source_id):
        raise connector_policy_error(source_id)
