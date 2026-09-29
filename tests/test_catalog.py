"""Tests for the live model catalog module."""

from __future__ import annotations

import json
from time import time

from perplexity_web_mcp import catalog
from perplexity_web_mcp.catalog import (
    cached_live_model,
    cached_search_identifiers,
    load_cached_catalog,
    parse_models_config,
    save_catalog,
)


FIXTURE = {
    "models": {
        "gpt6_sol": {"label": "GPT-6 Sol", "mode": "search", "provider": "OPENAI"},
        "gpt6_sol_thinking": {"label": "GPT-6 Sol Thinking", "mode": "search", "provider": "OPENAI"},
        "comet_browser_agent_sonnet": {"label": "Claude Sonnet 5", "mode": "browser_agent", "provider": "ANTHROPIC"},
        "pplx_asi_gpt_6_sol": {"label": "GPT-6 Sol", "mode": "asi", "provider": "OPENAI"},
        "pplx_alpha": {"label": "Deep research", "mode": "research", "provider": "PERPLEXITY"},
    },
    "config": [
        {
            "label": "Claude Sonnet 5",
            "subscription_tier": "pro",
            "non_reasoning_model": "comet_browser_agent_sonnet",
        },
        {
            "label": "GPT-6 Sol",
            "subscription_tier": "pro",
            "has_new_tag": False,
            "non_reasoning_model": "gpt6_sol",
            "reasoning_model": "gpt6_sol_thinking",
        },
        {
            "label": "GPT-6 Astra",
            "subscription_tier": "pro",
            "non_reasoning_model": "pplx_asi_gpt_6_sol",
        },
    ],
}


def test_parse_models_config_filters_non_search_rows() -> None:
    entries = parse_models_config(FIXTURE)

    assert [entry.identifier for entry in entries] == ["gpt6_sol", "gpt6_sol_thinking"]
    assert entries[0].row_label == "GPT-6 Sol"
    assert entries[0].label == "GPT-6 Sol"
    assert entries[0].mode == "search"
    assert entries[0].provider == "OPENAI"
    assert entries[0].tier == "pro"
    assert entries[0].is_new is False
    assert entries[1].label == "GPT-6 Sol Thinking"


def test_parse_models_config_marks_new_rows() -> None:
    payload = json.loads(json.dumps(FIXTURE))
    payload["config"][1]["has_new_tag"] = True

    entries = parse_models_config(payload)

    assert all(entry.is_new for entry in entries)


def test_catalog_cache_roundtrip_and_freshness(tmp_path) -> None:
    path = tmp_path / "models-catalog.json"
    entries = parse_models_config(FIXTURE)
    assert save_catalog(entries, path=path)

    assert load_cached_catalog(path=path) == entries

    stale = json.loads(path.read_text(encoding="utf-8"))
    stale["fetched_at"] = int(time()) - 10_000
    path.write_text(json.dumps(stale), encoding="utf-8")

    assert load_cached_catalog(path=path, max_age_seconds=60) is None
    assert load_cached_catalog(path=path, max_age_seconds=None) == entries


def test_missing_or_corrupt_cache_returns_none(tmp_path) -> None:
    missing = tmp_path / "missing.json"
    assert load_cached_catalog(path=missing) is None

    corrupt = tmp_path / "corrupt.json"
    corrupt.write_text("{not json", encoding="utf-8")
    assert load_cached_catalog(path=corrupt) is None


def test_cached_identifiers_and_live_model(tmp_path, monkeypatch) -> None:
    path = tmp_path / "models-catalog.json"
    assert save_catalog(parse_models_config(FIXTURE), path=path)
    monkeypatch.setattr(catalog, "CATALOG_CACHE_FILE", path)

    assert cached_search_identifiers() == ["gpt6_sol", "gpt6_sol_thinking"]

    live = cached_live_model("gpt6_sol")
    assert live is not None
    assert live.identifier == "gpt6_sol"
    assert live.mode == "copilot"

    live_thinking = cached_live_model("gpt6_sol", thinking=True)
    assert live_thinking is not None
    assert live_thinking.identifier == "gpt6_sol_thinking"

    assert cached_live_model("not_a_model") is None


def test_get_catalog_falls_back_to_stale_cache_when_fetch_fails(tmp_path, monkeypatch) -> None:
    path = tmp_path / "models-catalog.json"
    entries = parse_models_config(FIXTURE)
    monkeypatch.setattr(catalog, "CATALOG_CACHE_FILE", path)

    def _failing_fetch(_token=None):
        raise OSError("offline")

    monkeypatch.setattr(catalog, "fetch_catalog", _failing_fetch)
    assert catalog.get_catalog(refresh=True) is None

    save_catalog(entries, path=path)
    assert catalog.get_catalog(refresh=True) == entries


def test_get_catalog_uses_fresh_cache_without_fetch(tmp_path, monkeypatch) -> None:
    path = tmp_path / "models-catalog.json"
    entries = parse_models_config(FIXTURE)
    save_catalog(entries, path=path)
    monkeypatch.setattr(catalog, "CATALOG_CACHE_FILE", path)

    def _unexpected_fetch(_token=None):
        raise AssertionError("fetch should not run while the cache is fresh")

    monkeypatch.setattr(catalog, "fetch_catalog", _unexpected_fetch)
    assert catalog.get_catalog() == entries
