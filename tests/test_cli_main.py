"""Tests for the unified CLI (cli/main.py).

Tests command routing, argument parsing, help/version output.
All query tests mock the shared.ask function to avoid network calls.
"""

from __future__ import annotations

import sys
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.cli.main import _cmd_ask, _cmd_council, _cmd_research, _cmd_usage, main
from perplexity_web_mcp.exceptions import AuthenticationError, RateLimitError


# ============================================================================
# 1. Command routing (main)
# ============================================================================


class TestMainRouting:
    """Test that main() routes to the correct subcommands."""

    def test_no_args_prints_help(self, capsys: pytest.CaptureFixture) -> None:
        with patch.object(sys, "argv", ["pwm"]):
            with pytest.raises(SystemExit) as exc:
                main()
            assert exc.value.code == 0
        out = capsys.readouterr().out
        assert "Perplexity Web MCP CLI" in out

    def test_help_flag(self, capsys: pytest.CaptureFixture) -> None:
        with patch.object(sys, "argv", ["pwm", "--help"]):
            with pytest.raises(SystemExit) as exc:
                main()
            assert exc.value.code == 0
        assert "Usage:" in capsys.readouterr().out

    def test_version_flag(self, capsys: pytest.CaptureFixture) -> None:
        with patch.object(sys, "argv", ["pwm", "--version"]):
            with pytest.raises(SystemExit) as exc:
                main()
            assert exc.value.code == 0
        assert "perplexity-web-mcp-cli" in capsys.readouterr().out

    def test_ai_flag(self, capsys: pytest.CaptureFixture) -> None:
        with patch.object(sys, "argv", ["pwm", "--ai"]):
            with pytest.raises(SystemExit) as exc:
                main()
            assert exc.value.code == 0
        out = capsys.readouterr().out
        assert "PERPLEXITY WEB MCP" in out
        assert "CLI COMMANDS" in out

    def test_unknown_command_exits_nonzero(self, capsys: pytest.CaptureFixture) -> None:
        with patch.object(sys, "argv", ["pwm", "bogus"]):
            with pytest.raises(SystemExit) as exc:
                main()
            # Click exits with code 2 for usage errors
            assert exc.value.code != 0
        assert "No such command" in capsys.readouterr().err


# ============================================================================
# 2. pwm ask - argument parsing
# ============================================================================


class TestCmdAsk:
    """Test _cmd_ask argument parsing and output."""

    @patch("perplexity_web_mcp.cli.main.ask", return_value="The answer")
    def test_basic_ask(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["What is AI?", "-m", "sonar"])
        assert code == 0
        assert "The answer" in capsys.readouterr().out
        mock_ask.assert_called_once()

    def test_no_query_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask([])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_flag_as_first_arg_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["--model", "gpt54"])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "--model", "nonexistent"])
        assert code == 1
        assert "Unknown model" in capsys.readouterr().err

    def test_unknown_source_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "--source", "badvalue"])
        assert code == 1
        assert "Unknown source" in capsys.readouterr().err

    def test_unknown_option_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "--badopt"])
        assert code == 1
        assert "Unknown option" in capsys.readouterr().err

    @patch("perplexity_web_mcp.cli.main.ask", return_value="Answer\n\nCitations:\n[1]: https://x.com")
    def test_no_citations_flag(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "-m", "sonar", "--no-citations"])
        assert code == 0
        out = capsys.readouterr().out
        assert "Answer" in out
        assert "Citations" not in out

    @patch("perplexity_web_mcp.cli.main.ask", return_value="Answer\n\nCitations:\n[1]: https://x.com")
    def test_json_flag(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        import orjson

        code = _cmd_ask(["query", "-m", "sonar", "--json"])
        assert code == 0
        raw = capsys.readouterr().out
        data = orjson.loads(raw)
        assert data["answer"] == "Answer"
        assert data["citations"] == ["https://x.com"]

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    @patch("perplexity_web_mcp.cli.main.resolve_model")
    def test_model_and_thinking_flags(
        self, mock_resolve: MagicMock, mock_ask: MagicMock
    ) -> None:
        mock_resolve.return_value = MagicMock()
        _cmd_ask(["query", "-m", "gpt54", "-t"])
        mock_resolve.assert_called_once_with("gpt54", thinking=True)

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    def test_source_flag(self, mock_ask: MagicMock) -> None:
        _cmd_ask(["query", "-m", "sonar", "-s", "academic"])
        call_args = mock_ask.call_args
        assert call_args[0][2] == "academic"


# ============================================================================
# 3. pwm research - argument parsing
# ============================================================================


class TestCmdResearch:
    """Test _cmd_research argument parsing."""

    @patch("perplexity_web_mcp.cli.main.ask", return_value="Research report")
    def test_basic_research(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_research(["AI trends"])
        assert code == 0
        assert "Research report" in capsys.readouterr().out
        # Should use DEEP_RESEARCH model
        from perplexity_web_mcp.models import Models
        assert mock_ask.call_args[0][1] is Models.DEEP_RESEARCH

    def test_no_query_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_research([])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err


# ============================================================================
# 4. pwm usage
# ============================================================================


class TestCmdUsage:
    """Test _cmd_usage output."""

    @patch("perplexity_web_mcp.cli.main.load_token", return_value=None)
    def test_no_token_returns_1(self, mock_token: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_usage([])
        assert code == 1
        assert "NOT AUTHENTICATED" in capsys.readouterr().out

    @patch("perplexity_web_mcp.cli.main.get_limit_cache")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="valid-token")
    def test_with_limits(
        self, mock_token: MagicMock, mock_cache_fn: MagicMock, capsys: pytest.CaptureFixture
    ) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=100, remaining_research=5)
        mock_cache.get_user_settings.return_value = None
        mock_cache.get_credits.return_value = None
        mock_cache_fn.return_value = mock_cache

        code = _cmd_usage([])
        assert code == 0
        out = capsys.readouterr().out
        assert "Rate Limits" in out
        assert "100" in out


# ============================================================================
# 5. CLI error handling for AuthenticationError / RateLimitError
# ============================================================================


class TestCmdAskErrorHandling:
    """Verify CLI catches auth/rate-limit errors cleanly instead of crashing."""

    @patch("perplexity_web_mcp.cli.main.ask", side_effect=AuthenticationError())
    def test_auth_error_returns_1(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "-m", "sonar"])
        assert code == 1
        err = capsys.readouterr().err
        assert "403" in err or "forbidden" in err.lower()

    @patch("perplexity_web_mcp.cli.main.ask", side_effect=RateLimitError())
    def test_rate_limit_error_returns_1(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "-m", "sonar"])
        assert code == 1
        err = capsys.readouterr().err
        assert "429" in err or "rate limit" in err.lower()

    @patch("perplexity_web_mcp.shared.smart_ask", side_effect=AuthenticationError())
    def test_smart_ask_auth_error_returns_1(self, mock_smart: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query"])
        assert code == 1
        err = capsys.readouterr().err
        assert "403" in err or "forbidden" in err.lower()


class TestCmdResearchErrorHandling:
    """Verify research command catches auth/rate-limit errors."""

    @patch("perplexity_web_mcp.cli.main.ask", side_effect=AuthenticationError())
    def test_auth_error_returns_1(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_research(["topic"])
        assert code == 1
        err = capsys.readouterr().err
        assert "403" in err or "forbidden" in err.lower()

    @patch("perplexity_web_mcp.cli.main.ask", side_effect=RateLimitError())
    def test_rate_limit_error_returns_1(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_research(["topic"])
        assert code == 1
        err = capsys.readouterr().err
        assert "429" in err or "rate limit" in err.lower()


# ============================================================================
# 6. pwm council - argument parsing
# ============================================================================


class TestCmdCouncil:
    """Test _cmd_council argument parsing and output."""

    @patch("perplexity_web_mcp.council.council_ask")
    def test_basic_council(self, mock_council: MagicMock, capsys: pytest.CaptureFixture) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[
                CouncilMemberResult(model_name="GPT-5.4", answer="Answer A"),
                CouncilMemberResult(model_name="Claude", answer="Answer B"),
            ],
            synthesis="Combined answer",
            query="test",
            model_names=["GPT-5.4", "Claude"],
        )
        code = _cmd_council(["What is AI?"])
        assert code == 0
        out = capsys.readouterr().out
        assert "Model Council" in out
        assert "GPT-5.4" in out

    def test_no_query_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council([])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_flag_as_first_arg_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["--models", "gpt54,claude_sonnet"])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--models", "nonexistent,gpt54"])
        assert code == 1
        assert "Unknown council model" in capsys.readouterr().err

    def test_unknown_source_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--source", "badvalue"])
        assert code == 1
        assert "Unknown source" in capsys.readouterr().err

    def test_unknown_option_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--badopt"])
        assert code == 1
        assert "Unknown option" in capsys.readouterr().err

    def test_single_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--models", "gpt54"])
        assert code == 1
        assert "at least 2 models" in capsys.readouterr().err

    @patch("perplexity_web_mcp.council.council_ask")
    def test_json_output(self, mock_council: MagicMock, capsys: pytest.CaptureFixture) -> None:
        import orjson
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[
                CouncilMemberResult(model_name="GPT", answer="Answer"),
                CouncilMemberResult(model_name="Claude", answer="Answer2"),
            ],
            synthesis="Synth",
            query="test",
            model_names=["GPT", "Claude"],
        )
        code = _cmd_council(["query", "--json"])
        assert code == 0
        raw = capsys.readouterr().out
        data = orjson.loads(raw)
        assert data["query"] == "test"
        assert data["synthesis"] == "Synth"
        assert len(data["individual_results"]) == 2

    @patch("perplexity_web_mcp.council.council_ask")
    def test_no_synthesis_flag(self, mock_council: MagicMock) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[CouncilMemberResult(model_name="GPT", answer="A")],
            synthesis="",
            query="test",
            model_names=["GPT"],
        )
        _cmd_council(["query", "--no-synthesis"])
        call_kwargs = mock_council.call_args
        assert call_kwargs[1]["synthesize"] is False or call_kwargs.kwargs.get("synthesize") is False


# ============================================================================
# 7. Council error handling
# ============================================================================


class TestCmdCouncilErrorHandling:
    """Verify council command catches auth/rate-limit errors."""

    @patch("perplexity_web_mcp.council.council_ask", side_effect=AuthenticationError())
    def test_auth_error_returns_1(self, mock_council: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query"])
        assert code == 1
        err = capsys.readouterr().err
        assert "403" in err or "forbidden" in err.lower()

    @patch("perplexity_web_mcp.council.council_ask", side_effect=RateLimitError())
    def test_rate_limit_error_returns_1(self, mock_council: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query"])
        assert code == 1
        err = capsys.readouterr().err
        assert "429" in err or "rate limit" in err.lower()

