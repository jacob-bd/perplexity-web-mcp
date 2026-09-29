"""Saved user preferences (default model, thinking, source) for CLI and MCP.

Stored at ``~/.config/perplexity-web-mcp/preferences.json``. A missing or
invalid file means "no preferences" so built-in defaults keep applying.
"""

from __future__ import annotations

import json
from typing import Any

from .token_store import CONFIG_DIR


PREFERENCES_FILE = CONFIG_DIR / "preferences.json"

_KEY_TYPES: dict[str, type] = {"model": str, "thinking": bool, "source": str}


def load_preferences() -> dict[str, Any]:
    """Return saved preferences, or an empty dict when none are usable."""
    try:
        data = json.loads(PREFERENCES_FILE.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    if not isinstance(data, dict):
        return {}
    return {key: data[key] for key, kind in _KEY_TYPES.items() if isinstance(data.get(key), kind)}


def save_preferences(prefs: dict[str, Any]) -> None:
    """Persist preferences with owner-only permissions."""
    CONFIG_DIR.mkdir(mode=0o700, parents=True, exist_ok=True)
    PREFERENCES_FILE.write_text(json.dumps(prefs, indent=2) + "\n", encoding="utf-8")
    PREFERENCES_FILE.chmod(0o600)


def set_preference(key: str, value: Any) -> None:
    """Save a single preference key."""
    prefs = load_preferences()
    prefs[key] = value
    save_preferences(prefs)


def clear_preferences(key: str | None = None) -> None:
    """Remove one saved preference, or all of them when key is None."""
    if key is None:
        save_preferences({})
        return
    prefs = load_preferences()
    prefs.pop(key, None)
    save_preferences(prefs)
