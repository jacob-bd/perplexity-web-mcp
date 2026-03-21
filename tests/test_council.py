"""Tests for the council module (Model Council: parallel multi-model queries)."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.council import (
    COUNCIL_DEFAULT_MODELS,
    CouncilMemberResult,
    CouncilResponse,
    _build_synthesis_prompt,
    council_ask,
)
from perplexity_web_mcp.models import Model, Models


# ============================================================================
# 1. Data classes
# ============================================================================


class TestCouncilMemberResult:
    """Verify CouncilMemberResult dataclass behavior."""

    def test_successful_result(self) -> None:
        result = CouncilMemberResult(model_name="GPT-5.4", answer="The answer is 42")
        assert result.model_name == "GPT-5.4"
        assert result.answer == "The answer is 42"
        assert result.error is None
        assert result.search_results == []

    def test_error_result(self) -> None:
        result = CouncilMemberResult(
            model_name="Claude", answer="[Error]", error="Network failure"
        )
        assert result.error == "Network failure"

    def test_is_frozen(self) -> None:
        result = CouncilMemberResult(model_name="Test", answer="Test")
        with pytest.raises(AttributeError):
            result.model_name = "Changed"  # type: ignore[misc]


class TestCouncilResponse:
    """Verify CouncilResponse dataclass and formatting."""

    def test_format_response_with_synthesis(self) -> None:
        results = [
            CouncilMemberResult(model_name="GPT-5.4", answer="Answer A"),
            CouncilMemberResult(model_name="Claude", answer="Answer B"),
        ]
        response = CouncilResponse(
            individual_results=results,
            synthesis="Combined answer",
            query="test question",
            model_names=["GPT-5.4", "Claude"],
        )
        formatted = response.format_response()
        assert "Model Council" in formatted
        assert "Synthesized" in formatted
        assert "Combined answer" in formatted
        assert "GPT-5.4" in formatted
        assert "Claude" in formatted
        assert "Answer A" in formatted
        assert "Answer B" in formatted

    def test_format_response_without_synthesis(self) -> None:
        results = [
            CouncilMemberResult(model_name="GPT-5.4", answer="Answer A"),
        ]
        response = CouncilResponse(
            individual_results=results,
            synthesis="",
            query="test question",
            model_names=["GPT-5.4"],
        )
        formatted = response.format_response()
        assert "Synthesized" not in formatted
        assert "GPT-5.4" in formatted

    def test_format_response_marks_errors(self) -> None:
        results = [
            CouncilMemberResult(model_name="GPT-5.4", answer="OK"),
            CouncilMemberResult(
                model_name="Claude", answer="[Error]", error="timeout"
            ),
        ]
        response = CouncilResponse(
            individual_results=results,
            synthesis="",
            query="test",
            model_names=["GPT-5.4", "Claude"],
        )
        formatted = response.format_response()
        assert "✅" in formatted
        assert "❌" in formatted


# ============================================================================
# 2. Default models
# ============================================================================


class TestDefaultModels:
    """Verify the default council composition."""

    def test_default_models_has_three_members(self) -> None:
        assert len(COUNCIL_DEFAULT_MODELS) == 3

    def test_default_models_are_diverse_providers(self) -> None:
        names = [name for name, _ in COUNCIL_DEFAULT_MODELS]
        # Should have GPT, Claude, and Gemini for provider diversity
        assert any("GPT" in n for n in names)
        assert any("Claude" in n for n in names)
        assert any("Gemini" in n for n in names)

    def test_default_models_are_valid_model_instances(self) -> None:
        for name, model in COUNCIL_DEFAULT_MODELS:
            assert isinstance(model, Model), f"{name} is not a Model"


# ============================================================================
# 3. Synthesis prompt building
# ============================================================================


class TestBuildSynthesisPrompt:
    """Verify synthesis prompt construction."""

    def test_includes_original_question(self) -> None:
        results = [
            CouncilMemberResult(model_name="M1", answer="Answer 1"),
        ]
        prompt = _build_synthesis_prompt("What is 2+2?", results)
        assert "What is 2+2?" in prompt

    def test_includes_all_model_answers(self) -> None:
        results = [
            CouncilMemberResult(model_name="GPT", answer="Answer from GPT"),
            CouncilMemberResult(model_name="Claude", answer="Answer from Claude"),
        ]
        prompt = _build_synthesis_prompt("test", results)
        assert "GPT's Answer" in prompt
        assert "Answer from GPT" in prompt
        assert "Claude's Answer" in prompt
        assert "Answer from Claude" in prompt

    def test_handles_errored_models(self) -> None:
        results = [
            CouncilMemberResult(model_name="GPT", answer="OK"),
            CouncilMemberResult(model_name="Claude", answer="[Error]", error="timeout"),
        ]
        prompt = _build_synthesis_prompt("test", results)
        assert "GPT's Answer" in prompt
        assert "did not respond" in prompt

    def test_includes_synthesis_instructions(self) -> None:
        results = [
            CouncilMemberResult(model_name="M1", answer="A1"),
        ]
        prompt = _build_synthesis_prompt("test", results)
        assert "SYNTHESIS" in prompt
        assert "AGREEMENTS" in prompt
        assert "DISAGREEMENTS" in prompt


# ============================================================================
# 4. council_ask function (mocked)
# ============================================================================

# NOTE: _query_single_model uses a local import `from .shared import get_client`,
# so we mock at the shared module level where it's actually resolved.


class TestCouncilAsk:
    """Test the council_ask() function with mocked Perplexity client."""

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_queries_all_models_in_parallel(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = "Test answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = council_ask("test question", synthesize=False)

        assert isinstance(result, CouncilResponse)
        # Default: 3 council models
        assert len(result.individual_results) == 3
        assert all(r.answer == "Test answer" for r in result.individual_results)

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_custom_models(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = "Custom answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        custom = [
            ("Sonar", Models.SONAR),
            ("GPT", Models.GPT_54),
        ]
        result = council_ask("test", models=custom, synthesize=False)

        assert len(result.individual_results) == 2
        assert result.model_names == ["Sonar", "GPT"]

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_synthesis_runs_when_enabled(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = "Model answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = council_ask("test question", synthesize=True)

        assert isinstance(result, CouncilResponse)
        # Synthesis should have produced something (Sonar was also mocked)
        assert result.synthesis != ""

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_no_synthesis_when_disabled(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        mock_conv = MagicMock()
        mock_conv.answer = "Answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = council_ask("test", synthesize=False)
        assert result.synthesis == ""

    @patch("perplexity_web_mcp.shared.check_limits_before_query")
    def test_rate_limit_returns_error_response(
        self, mock_limits: MagicMock,
    ) -> None:
        mock_limits.return_value = "LIMIT REACHED: Pro Search exhausted"

        result = council_ask("test")
        assert len(result.individual_results) == 1
        assert "LIMIT REACHED" in result.individual_results[0].answer
        assert result.individual_results[0].error == "rate_limit"

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_partial_failure_still_returns_results(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        """If one model fails, others should still return successfully."""
        call_count = 0

        def create_conv_side_effect(*args, **kwargs):
            nonlocal call_count
            call_count += 1
            mock_conv = MagicMock()
            if call_count == 2:
                mock_conv.ask.side_effect = RuntimeError("Model 2 failed")
            else:
                mock_conv.answer = f"Answer {call_count}"
                mock_conv.search_results = []
            return mock_conv

        mock_client = MagicMock()
        mock_client.create_conversation.side_effect = create_conv_side_effect
        mock_client_fn.return_value = mock_client

        result = council_ask("test", synthesize=False)

        assert len(result.individual_results) == 3
        errors = [r for r in result.individual_results if r.error is not None]
        successes = [r for r in result.individual_results if r.error is None]
        # At least some should succeed, at least one should fail
        assert len(successes) >= 1
        assert len(errors) >= 1

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_insufficient_successes_skips_synthesis(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        """Synthesis requires at least 2 successful responses."""
        mock_client = MagicMock()

        call_count = 0

        def create_conv_side_effect(*args, **kwargs):
            nonlocal call_count
            call_count += 1
            mock_conv = MagicMock()
            if call_count <= 2:
                mock_conv.ask.side_effect = RuntimeError("Failed")
            else:
                mock_conv.answer = "Only success"
                mock_conv.search_results = []
            return mock_conv

        mock_client.create_conversation.side_effect = create_conv_side_effect
        mock_client_fn.return_value = mock_client

        result = council_ask("test", synthesize=True)
        assert "Not enough successful" in result.synthesis

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_preserves_original_model_order(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        """Results should be sorted to match the original model order."""
        mock_conv = MagicMock()
        mock_conv.answer = "Answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = council_ask("test", synthesize=False)

        # Results should be in the same order as COUNCIL_DEFAULT_MODELS
        expected_names = [name for name, _ in COUNCIL_DEFAULT_MODELS]
        actual_names = [r.model_name for r in result.individual_results]
        assert actual_names == expected_names


# ============================================================================
# 5. Shared council_ask wrapper
# ============================================================================


class TestSharedCouncilAsk:
    """Test the council_ask wrapper in shared.py delegates correctly."""

    @patch("perplexity_web_mcp.shared.check_limits_before_query", return_value=None)
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    @patch("perplexity_web_mcp.shared.get_client")
    def test_shared_wrapper_delegates(
        self, mock_client_fn: MagicMock, mock_cache: MagicMock, mock_limits: MagicMock,
    ) -> None:
        from perplexity_web_mcp.shared import council_ask as shared_council_ask

        mock_conv = MagicMock()
        mock_conv.answer = "Wrapper test"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = shared_council_ask("test", synthesize=False)
        assert isinstance(result, CouncilResponse)
        assert len(result.individual_results) == 3
