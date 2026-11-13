"""Tests for API-compatible server model aliases."""

from __future__ import annotations

from perplexity_web_mcp.api.server import AVAILABLE_MODELS, get_model
from perplexity_web_mcp.models import Models


def test_claude_sonnet_aliases_route_to_sonnet_5_5() -> None:
    assert get_model("claude-sonnet-5-5") is Models.CLAUDE_55_SONNET
    assert get_model("claude-5-5-sonnet", thinking=True) is Models.CLAUDE_55_SONNET_THINKING
    assert get_model("claude55sonnet") is Models.CLAUDE_55_SONNET


def test_legacy_claude_sonnet_alias_routes_to_current_sonnet() -> None:
    assert get_model("claude-sonnet-4-6") is Models.CLAUDE_55_SONNET
    assert get_model("claude-3-5-sonnet", thinking=True) is Models.CLAUDE_55_SONNET_THINKING
    assert get_model("claude-sonnet-5") is Models.CLAUDE_55_SONNET


def test_claude_opus_aliases_route_to_opus_5_5() -> None:
    assert get_model("claude-opus-5-5") is Models.CLAUDE_55_OPUS
    assert get_model("claude-4-8-opus", thinking=True) is Models.CLAUDE_55_OPUS_THINKING
    assert get_model("opus") is Models.CLAUDE_55_OPUS


def test_glm_aliases_route_to_glm_5_3() -> None:
    assert get_model("glm-5.3") is Models.GLM_5_3
    assert get_model("glm53", thinking=True) is Models.GLM_5_3


def test_available_models_include_current_sonnet_and_glm() -> None:
    ids = {model["id"] for model in AVAILABLE_MODELS}
    assert "claude-sonnet-5-5" in ids
    assert "glm-5.3" in ids


def test_openai_and_xai_aliases_route_to_current_models() -> None:
    assert get_model("gpt-6.1-sol") is Models.GPT_61_SOL
    assert get_model("gpt61_sol", thinking=True) is Models.GPT_61_SOL_THINKING
    assert get_model("gpt-6-astra") is Models.GPT_6_ASTRA
    assert get_model("gpt6_astra", thinking=True) is Models.GPT_6_ASTRA_THINKING
    assert get_model("grok-4.7") is Models.GROK_47
    assert get_model("grok47", thinking=True) is Models.GROK_47_THINKING


def test_available_models_match_current_gpt_and_grok_roster() -> None:
    ids = {model["id"] for model in AVAILABLE_MODELS}
    assert {"gpt-6.1-sol", "gpt-6-astra", "grok-4.7"} <= ids
    assert {"gpt-5.6-terra", "gpt-5.6-sol", "grok-4.5"}.isdisjoint(ids)


def test_gemini_nemotron_and_fable_aliases_route_to_current_models() -> None:
    assert get_model("gemini-4-carbon") is Models.GEMINI_4_CARBON
    assert get_model("gemini4carbon", thinking=True) is Models.GEMINI_4_CARBON_THINKING
    assert get_model("gemini-4-hydrogen") is Models.GEMINI_4_HYDROGEN
    assert get_model("gemini4hydrogen", thinking=True) is Models.GEMINI_4_HYDROGEN_THINKING
    assert get_model("nemotron-3.5-super-vl") is Models.NEMOTRON_3_5_SUPER
    assert get_model("nemotron") is Models.NEMOTRON_3_5_SUPER
    assert get_model("claude-fable-5-2") is Models.CLAUDE_FABLE_52
    assert get_model("claudefable52", thinking=True) is Models.CLAUDE_FABLE_52_THINKING


def test_available_models_include_new_generation() -> None:
    ids = {model["id"] for model in AVAILABLE_MODELS}
    assert {
        "gemini-4-carbon",
        "gemini-4-hydrogen",
        "claude-opus-5-5",
        "claude-fable-5-2",
        "grok-4.7",
        "kimi-k3",
        "glm-5.3",
        "nemotron-3.5-super-vl",
    } <= ids


def test_get_model_uses_live_catalog_fallback(monkeypatch) -> None:
    from perplexity_web_mcp.api import server as api_server
    from perplexity_web_mcp.models import Model

    def _live(name, thinking=False):
        if name == "gpt9_demo":
            return Model(identifier=name, mode="copilot")
        return None

    monkeypatch.setattr(api_server, "cached_live_model", _live)
    model = api_server.get_model("gpt9_demo")
    assert model.identifier == "gpt9_demo"
    assert model.mode == "copilot"
    assert api_server.get_model("still_unknown") is Models.BEST
