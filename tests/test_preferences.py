"""Tests for saved preference storage (default model, thinking, source)."""

from __future__ import annotations

import json

import pytest

from perplexity_web_mcp import preferences


@pytest.fixture
def prefs_file(tmp_path, monkeypatch):
    path = tmp_path / "preferences.json"
    monkeypatch.setattr(preferences, "PREFERENCES_FILE", path)
    return path


class TestPreferences:
    def test_load_missing_file_returns_empty(self, prefs_file) -> None:
        assert preferences.load_preferences() == {}

    def test_load_invalid_json_returns_empty(self, prefs_file) -> None:
        prefs_file.write_text("{not json", encoding="utf-8")
        assert preferences.load_preferences() == {}

    def test_invalid_types_are_dropped(self, prefs_file) -> None:
        prefs_file.write_text(json.dumps({"model": 5, "thinking": "yes", "source": "web"}), encoding="utf-8")
        assert preferences.load_preferences() == {"source": "web"}

    def test_set_and_load_roundtrip(self, prefs_file) -> None:
        preferences.set_preference("model", "grok47")
        preferences.set_preference("thinking", True)
        assert preferences.load_preferences() == {"model": "grok47", "thinking": True}

    def test_clear_one_key(self, prefs_file) -> None:
        preferences.save_preferences({"model": "sonar", "source": "academic"})
        preferences.clear_preferences("model")
        assert preferences.load_preferences() == {"source": "academic"}

    def test_clear_all(self, prefs_file) -> None:
        preferences.save_preferences({"model": "sonar"})
        preferences.clear_preferences()
        assert preferences.load_preferences() == {}
