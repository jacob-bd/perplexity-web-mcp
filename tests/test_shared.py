"""Tests for the shared module (model mappings, resolve_model, ask)."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.models import Model, Models
from perplexity_web_mcp.shared import (
    MODEL_MAP,
    MODEL_NAMES,
    SOURCE_FOCUS_MAP,
    SOURCE_FOCUS_NAMES,
    ask,
    resolve_model,
)


# ============================================================================
# 1. MODEL_MAP and SOURCE_FOCUS_MAP constants
# ============================================================================


class TestMappings:
    """Verify the shared mapping dictionaries are well-formed."""

    def test_model_map_has_all_expected_keys(self) -> None:
        expected = {"auto", "sonar", "deep_research", "gpt52", "claude_sonnet",
                    "claude_opus", "gemini_flash", "gemini_pro", "grok", "kimi"}
        assert set(MODEL_MAP.keys()) == expected

    def test_model_names_matches_map_keys(self) -> None:
        assert MODEL_NAMES == list(MODEL_MAP.keys())

    def test_source_focus_map_has_all_expected_keys(self) -> None:
        expected = {"web", "academic", "social", "finance", "all"}
        assert set(SOURCE_FOCUS_MAP.keys()) == expected

    def test_source_focus_names_matches_map_keys(self) -> None:
        assert SOURCE_FOCUS_NAMES == list(SOURCE_FOCUS_MAP.keys())

    def test_every_model_tuple_has_model_instances(self) -> None:
        for name, (base, thinking) in MODEL_MAP.items():
            assert isinstance(base, Model), f"{name} base is not a Model"
            assert thinking is None or isinstance(thinking, Model), f"{name} thinking is not Model|None"

    def test_source_focus_values_are_lists(self) -> None:
        for name, sources in SOURCE_FOCUS_MAP.items():
            assert isinstance(sources, list), f"{name} value is not a list"
            assert len(sources) >= 1, f"{name} has empty source list"


# ============================================================================
# 2. resolve_model
# ============================================================================


class TestResolveModel:
    """Test resolve_model with various inputs."""

    def test_auto_returns_best(self) -> None:
        assert resolve_model("auto") is Models.BEST

    def test_auto_thinking_still_returns_best(self) -> None:
        # auto has no thinking variant (None)
        assert resolve_model("auto", thinking=True) is Models.BEST

    def test_gpt52_base(self) -> None:
        assert resolve_model("gpt52") is Models.GPT_52

    def test_gpt52_thinking(self) -> None:
        assert resolve_model("gpt52", thinking=True) is Models.GPT_52_THINKING

    def test_claude_sonnet_base(self) -> None:
        assert resolve_model("claude_sonnet") is Models.CLAUDE_46_SONNET

    def test_claude_sonnet_thinking(self) -> None:
        assert resolve_model("claude_sonnet", thinking=True) is Models.CLAUDE_46_SONNET_THINKING

    def test_gemini_pro_always_thinking(self) -> None:
        # gemini_pro has no non-thinking variant
        assert resolve_model("gemini_pro") is Models.GEMINI_3_PRO_THINKING
        assert resolve_model("gemini_pro", thinking=True) is Models.GEMINI_3_PRO_THINKING

    def test_kimi_always_thinking(self) -> None:
        assert resolve_model("kimi") is Models.KIMI_K25_THINKING
        assert resolve_model("kimi", thinking=True) is Models.KIMI_K25_THINKING

    def test_unknown_model_falls_back_to_best(self) -> None:
        assert resolve_model("nonexistent") is Models.BEST

    def test_unknown_model_thinking_still_falls_back(self) -> None:
        assert resolve_model("nonexistent", thinking=True) is Models.BEST

    def test_deep_research(self) -> None:
        assert resolve_model("deep_research") is Models.DEEP_RESEARCH

    def test_all_models_resolve_without_error(self) -> None:
        for name in MODEL_NAMES:
            model = resolve_model(name)
            assert isinstance(model, Model)
            model_t = resolve_model(name, thinking=True)
            assert isinstance(model_t, Model)


# ============================================================================
# 3. ask function (mocked)
# ============================================================================


class TestAsk:
    """Test the shared ask() function with mocked Perplexity client."""

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_successful_query_returns_answer(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = "The answer is 42"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = ask("question", Models.BEST)
        assert result == "The answer is 42"

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_successful_query_includes_citations(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock
    ) -> None:
        from perplexity_web_mcp.types import SearchResultItem

        mock_conv = MagicMock()
        mock_conv.answer = "Answer text"
        mock_conv.search_results = [
            SearchResultItem(title="S1", url="https://a.com"),
            SearchResultItem(title="S2", url="https://b.com"),
        ]
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = ask("question", Models.BEST)
        assert "Answer text" in result
        assert "Citations:" in result
        assert "[1]: https://a.com" in result
        assert "[2]: https://b.com" in result

    @patch("perplexity_web_mcp.shared.check_limits_before_query")
    def test_limit_reached_returns_error_message(self, mock_limits: MagicMock) -> None:
        mock_limits.return_value = "LIMIT REACHED: Pro Search exhausted"

        result = ask("question", Models.BEST)
        assert "LIMIT REACHED" in result

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_no_answer_returns_no_answer_received(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = None
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = ask("question", Models.BEST)
        assert result == "No answer received"

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_exception_returns_error_string(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock
    ) -> None:
        mock_client = MagicMock()
        mock_client.create_conversation.side_effect = RuntimeError("Network failure")
        mock_client_fn.return_value = mock_client

        result = ask("question", Models.BEST)
        assert "Error" in result
        assert "Network failure" in result
