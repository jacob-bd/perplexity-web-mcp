"""Tests for the unified CLI (cli/main.py).

Tests command routing, argument parsing, help/version output.
All query tests mock the shared.ask function to avoid network calls.
"""

from __future__ import annotations

import sys
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.cli.main import (
    _cmd_ask,
    _cmd_chat_impl,
    _cmd_config_clear,
    _cmd_config_set,
    _cmd_config_show,
    _cmd_connectors_list,
    _cmd_council,
    _cmd_research,
    _cmd_usage,
    main,
)
from perplexity_web_mcp.exceptions import AuthenticationError, FileValidationError, RateLimitError


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
        code = _cmd_ask(["--model", "gpt56_terra"])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "--model", "nonexistent"])
        assert code == 1
        assert "Unknown model" in capsys.readouterr().err

    def test_unknown_source_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["query", "--source", "badvalue"])
        assert code == 1
        err = capsys.readouterr().err
        assert "Unknown source" in err
        assert "pwm connectors list" in err

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
    def test_model_and_thinking_flags(self, mock_resolve: MagicMock, mock_ask: MagicMock) -> None:
        mock_resolve.return_value = MagicMock()
        _cmd_ask(["query", "-m", "gpt56_terra", "-t"])
        mock_resolve.assert_called_once_with("gpt56_terra", thinking=True)

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    def test_source_flag(self, mock_ask: MagicMock) -> None:
        _cmd_ask(["query", "-m", "sonar", "-s", "academic"])
        call_args = mock_ask.call_args
        assert call_args[0][2] == "academic"

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    @patch("perplexity_web_mcp.shared.get_limit_cache", return_value=None)
    def test_unverified_connector_source_fails_before_query(
        self, mock_cache: MagicMock, mock_ask: MagicMock, capsys: pytest.CaptureFixture
    ) -> None:
        code = _cmd_ask(["query", "-m", "sonar", "-s", "pitchbook_mcp_cashmere"])

        assert code == 1
        mock_ask.assert_not_called()
        assert "Could not verify connector" in capsys.readouterr().err


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
    @patch("perplexity_web_mcp.cli.auth.probe_session")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="valid-token")
    def test_with_limits(
        self,
        mock_token: MagicMock,
        mock_probe_fn: MagicMock,
        mock_cache_fn: MagicMock,
        capsys: pytest.CaptureFixture,
    ) -> None:
        from perplexity_web_mcp.cli.auth import SessionState
        from perplexity_web_mcp.rate_limits import RateLimits

        mock_user_info = MagicMock()
        mock_user_info.tier_display = "Pro ($20/mo)"
        mock_probe_fn.return_value = (SessionState.VALID, mock_user_info)

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
        assert "Pro ($20/mo)" in out

    @patch("perplexity_web_mcp.cli.main.get_limit_cache")
    @patch("perplexity_web_mcp.cli.auth.probe_session")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="valid-token")
    def test_usage_labels_settings_subscription_as_billing_detail(
        self,
        mock_token: MagicMock,
        mock_probe_fn: MagicMock,
        mock_cache_fn: MagicMock,
        capsys: pytest.CaptureFixture,
    ) -> None:
        from perplexity_web_mcp.cli.auth import SessionState
        from perplexity_web_mcp.rate_limits import UserSettings

        mock_user_info = MagicMock()
        mock_user_info.tier_display = "Pro ($20/mo)"
        mock_probe_fn.return_value = (SessionState.VALID, mock_user_info)

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = None
        mock_cache.get_user_settings.return_value = UserSettings(
            subscription_tier="yearly",
            subscription_status="active",
        )
        mock_cache.get_credits.return_value = None
        mock_cache_fn.return_value = mock_cache

        code = _cmd_usage([])
        assert code == 0
        out = capsys.readouterr().out
        assert "Subscription" in out
        assert "Pro ($20/mo)" in out
        assert "Billing" in out
        assert "yearly" in out

    @patch("perplexity_web_mcp.cli.main.get_limit_cache")
    @patch("perplexity_web_mcp.cli.auth.probe_session")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="expired-token")
    def test_expired_session_reports_and_skips_limits(
        self,
        mock_token: MagicMock,
        mock_probe_fn: MagicMock,
        mock_cache_fn: MagicMock,
        capsys: pytest.CaptureFixture,
    ) -> None:
        from perplexity_web_mcp.cli.auth import SessionState

        mock_probe_fn.return_value = (SessionState.EXPIRED, None)

        code = _cmd_usage([])

        assert code == 1
        out = capsys.readouterr().out
        assert "SESSION EXPIRED" in out
        assert "pwm login" in out
        mock_cache_fn.assert_not_called()

    @patch("perplexity_web_mcp.cli.main.get_limit_cache")
    @patch("perplexity_web_mcp.cli.auth.probe_session")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="valid-token")
    def test_unreachable_session_warns_but_continues(
        self,
        mock_token: MagicMock,
        mock_probe_fn: MagicMock,
        mock_cache_fn: MagicMock,
        capsys: pytest.CaptureFixture,
    ) -> None:
        from perplexity_web_mcp.cli.auth import SessionState
        from perplexity_web_mcp.rate_limits import RateLimits

        mock_probe_fn.return_value = (SessionState.UNREACHABLE, None)
        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=3, remaining_research=0)
        mock_cache.get_user_settings.return_value = None
        mock_cache.get_credits.return_value = None
        mock_cache_fn.return_value = mock_cache

        code = _cmd_usage([])

        assert code == 0
        out = capsys.readouterr().out
        assert "SESSION CHECK FAILED" in out
        assert "Rate Limits" in out


class TestCmdConnectors:
    """Test connector source discovery output."""

    @patch("perplexity_web_mcp.cli.main.load_token", return_value=None)
    def test_no_token_returns_1(self, mock_token: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_connectors_list(refresh=False)

        assert code == 1
        assert "Not authenticated" in capsys.readouterr().err

    @patch("perplexity_web_mcp.cli.main.get_limit_cache")
    @patch("perplexity_web_mcp.cli.main.load_token", return_value="valid-token")
    def test_lists_connector_source_ids(
        self,
        mock_token: MagicMock,
        mock_cache_fn: MagicMock,
        capsys: pytest.CaptureFixture,
    ) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits, SourceLimit

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(
            source_limits=[
                SourceLimit(source_id="web", monthly_limit=None, remaining=None),
                SourceLimit(source_id="pitchbook_mcp_cashmere", monthly_limit=5, remaining=3),
            ]
        )
        mock_cache_fn.return_value = mock_cache

        code = _cmd_connectors_list(refresh=True)

        assert code == 0
        out = capsys.readouterr().out
        assert "pitchbook_mcp_cashmere" in out
        assert "3" in out
        assert "5" in out
        mock_cache.get_rate_limits.assert_called_once_with(force_refresh=True)


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
                CouncilMemberResult(model_name="GPT-5.6 Terra", answer="Answer A"),
                CouncilMemberResult(model_name="Claude", answer="Answer B"),
            ],
            synthesis="Combined answer",
            query="test",
            model_names=["GPT-5.6 Terra", "Claude"],
        )
        code = _cmd_council(["What is AI?"])
        assert code == 0
        out = capsys.readouterr().out
        assert "Model Council" in out
        assert "GPT-5.6 Terra" in out

    def test_no_query_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council([])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_flag_as_first_arg_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["--models", "gpt56_terra,claude_sonnet"])
        assert code == 1
        assert "requires a query" in capsys.readouterr().err

    def test_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--models", "nonexistent,gpt56_terra"])
        assert code == 1
        assert "Unknown council model" in capsys.readouterr().err

    def test_unknown_source_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--source", "badvalue"])
        assert code == 1
        err = capsys.readouterr().err
        assert "Unknown source" in err
        assert "pwm connectors list" in err

    def test_unknown_option_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--badopt"])
        assert code == 1
        assert "Unknown option" in capsys.readouterr().err

    def test_single_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_council(["query", "--models", "gpt56_terra"])
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

    @patch("perplexity_web_mcp.council.council_ask")
    def test_sonar_can_be_custom_council_member(self, mock_council: MagicMock) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse
        from perplexity_web_mcp.models import Models

        mock_council.return_value = CouncilResponse(
            individual_results=[CouncilMemberResult(model_name="Sonar 2", answer="A")],
            synthesis="",
            query="test",
            model_names=["Sonar 2"],
        )

        code = _cmd_council(["query", "--models", "sonar,gpt56_terra", "--no-synthesis"])

        assert code == 0
        model_list = mock_council.call_args.kwargs["models"]
        assert model_list == [("Sonar 2", Models.SONAR), ("GPT-5.6 Terra", Models.GPT_56_TERRA)]

    @patch("perplexity_web_mcp.council.council_ask")
    def test_thinking_flag(self, mock_council: MagicMock) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[CouncilMemberResult(model_name="GPT", answer="A")],
            synthesis="",
            query="test",
            model_names=["GPT"],
        )
        _cmd_council(["query", "--thinking"])
        call_kwargs = mock_council.call_args
        assert call_kwargs[1].get("thinking") is True

    @patch("perplexity_web_mcp.council.council_ask")
    def test_thinking_short_flag(self, mock_council: MagicMock) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[CouncilMemberResult(model_name="GPT", answer="A")],
            synthesis="",
            query="test",
            model_names=["GPT"],
        )
        _cmd_council(["query", "-t"])
        call_kwargs = mock_council.call_args
        assert call_kwargs[1].get("thinking") is True

    @patch("perplexity_web_mcp.council.council_ask")
    def test_default_no_thinking(self, mock_council: MagicMock) -> None:
        from perplexity_web_mcp.council import CouncilMemberResult, CouncilResponse

        mock_council.return_value = CouncilResponse(
            individual_results=[CouncilMemberResult(model_name="GPT", answer="A")],
            synthesis="",
            query="test",
            model_names=["GPT"],
        )
        _cmd_council(["query"])
        call_kwargs = mock_council.call_args
        assert call_kwargs[1].get("thinking") is False


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


class TestCmdAskPromptSources:
    """#52: read the query from stdin ("-") or --prompt-file."""

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    def test_prompt_file(self, mock_ask: MagicMock, tmp_path, capsys: pytest.CaptureFixture) -> None:
        prompt = tmp_path / "prompt.txt"
        prompt.write_text("What is AI?", encoding="utf-8")
        code = _cmd_ask(["--prompt-file", str(prompt), "-m", "sonar"])
        assert code == 0
        assert mock_ask.call_args[0][0] == "What is AI?"

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    def test_stdin_dash(self, mock_ask: MagicMock, monkeypatch, capsys: pytest.CaptureFixture) -> None:
        import io

        monkeypatch.setattr("sys.stdin", io.StringIO("Explain quantum computing"))
        code = _cmd_ask(["-", "-m", "sonar"])
        assert code == 0
        assert mock_ask.call_args[0][0] == "Explain quantum computing"

    def test_query_and_prompt_file_conflict(self, tmp_path, capsys: pytest.CaptureFixture) -> None:
        prompt = tmp_path / "prompt.txt"
        prompt.write_text("hi", encoding="utf-8")
        code = _cmd_ask(["question", "--prompt-file", str(prompt)])
        assert code == 1
        assert "not both" in capsys.readouterr().err

    def test_empty_prompt_file_fails_before_query(self, tmp_path, capsys: pytest.CaptureFixture) -> None:
        prompt = tmp_path / "prompt.txt"
        prompt.write_text("   \n\n", encoding="utf-8")
        code = _cmd_ask(["--prompt-file", str(prompt), "-m", "sonar"])
        assert code == 1
        assert "empty" in capsys.readouterr().err.lower()


class TestCmdAskFiles:
    """#53: --file attachments reach the shared ask() call."""

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    def test_file_flag_reaches_ask(self, mock_ask: MagicMock, tmp_path) -> None:
        attachment = tmp_path / "report.pdf"
        attachment.write_bytes(b"%PDF-1.4 test")
        code = _cmd_ask(["summarize", "-m", "sonar", "--file", str(attachment)])
        assert code == 0
        assert mock_ask.call_args.kwargs["files"] == [str(attachment)]

    @patch("perplexity_web_mcp.cli.main.ask")
    @patch("perplexity_web_mcp.shared.smart_ask")
    def test_file_flag_reaches_smart_ask_on_auto_route(
        self, mock_smart: MagicMock, mock_ask: MagicMock, tmp_path
    ) -> None:
        mock_smart.return_value.format_response.return_value = "routed"
        assert _cmd_ask(["summarize", "--file", "report.pdf"]) == 0
        assert mock_smart.call_args.kwargs["files"] == ["report.pdf"]

    @patch("perplexity_web_mcp.cli.main.ask", side_effect=FileValidationError("report.pdf", "File is empty"))
    def test_file_error_returns_1(self, mock_ask: MagicMock, capsys: pytest.CaptureFixture) -> None:
        code = _cmd_ask(["summarize", "-m", "sonar", "--file", "report.pdf"])
        assert code == 1
        assert "File validation failed" in capsys.readouterr().err


class TestCmdAskPreferences:
    """#51: saved defaults apply when flags are omitted; explicit flags win."""

    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    @patch("perplexity_web_mcp.cli.main.load_preferences", return_value={"model": "sonar"})
    def test_saved_model_used_when_flag_omitted(self, mock_prefs: MagicMock, mock_ask: MagicMock) -> None:
        from perplexity_web_mcp.shared import Models

        assert _cmd_ask(["question"]) == 0
        assert mock_ask.call_args[0][1] == Models.SONAR

    @patch("perplexity_web_mcp.cli.main.ask")
    @patch("perplexity_web_mcp.shared.smart_ask")
    @patch("perplexity_web_mcp.cli.main.load_preferences", return_value={"model": "sonar"})
    def test_explicit_auto_beats_saved_model(
        self, mock_prefs: MagicMock, mock_smart: MagicMock, mock_ask: MagicMock
    ) -> None:
        mock_smart.return_value.format_response.return_value = "routed"
        assert _cmd_ask(["question", "-m", "auto"]) == 0
        mock_ask.assert_not_called()
        mock_smart.assert_called_once()

    @patch("perplexity_web_mcp.cli.main.resolve_model")
    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    @patch("perplexity_web_mcp.cli.main.load_preferences", return_value={"thinking": True})
    def test_saved_thinking_used_when_omitted(
        self, mock_prefs: MagicMock, mock_ask: MagicMock, mock_resolve: MagicMock
    ) -> None:
        mock_resolve.return_value = MagicMock()
        assert _cmd_ask(["question", "-m", "gpt56_terra"]) == 0
        mock_resolve.assert_called_once_with("gpt56_terra", thinking=True)

    @patch("perplexity_web_mcp.cli.main.resolve_model")
    @patch("perplexity_web_mcp.cli.main.ask", return_value="response")
    @patch("perplexity_web_mcp.cli.main.load_preferences", return_value={"thinking": True})
    def test_explicit_no_thinking_beats_saved_default(
        self, mock_prefs: MagicMock, mock_ask: MagicMock, mock_resolve: MagicMock
    ) -> None:
        mock_resolve.return_value = MagicMock()
        assert _cmd_ask(["question", "-m", "gpt56_terra", "--no-thinking"]) == 0
        mock_resolve.assert_called_once_with("gpt56_terra", thinking=False)


class TestCmdChat:
    """#54: pwm chat keeps one thread across turns."""

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    def test_chat_continues_thread_across_turns(
        self, mock_turn: MagicMock, monkeypatch, capsys: pytest.CaptureFixture
    ) -> None:
        import io

        mock_turn.side_effect = [("Answer one", "conv-1"), ("Answer two", "conv-1")]
        monkeypatch.setattr("sys.stdin", io.StringIO("first question\nsecond question\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        assert mock_turn.call_args_list[0].args[3] is None
        assert mock_turn.call_args_list[1].args[3] == "conv-1"
        out = capsys.readouterr().out
        assert "Answer one" in out
        assert "Answer two" in out

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    def test_new_command_resets_thread(self, mock_turn: MagicMock, monkeypatch) -> None:
        import io

        mock_turn.side_effect = [("A", "conv-1"), ("B", "conv-2")]
        monkeypatch.setattr("sys.stdin", io.StringIO("q1\n/new\nq2\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        assert mock_turn.call_args_list[0].args[3] is None
        assert mock_turn.call_args_list[1].args[3] is None
        assert mock_turn.call_args_list[1].args[0] == "q2"

    def test_chat_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        assert _cmd_chat_impl("nonexistent", None, None) == 1
        assert "Unknown model" in capsys.readouterr().err

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    def test_chat_default_model_is_sonar(
        self, mock_turn: MagicMock, monkeypatch, capsys: pytest.CaptureFixture
    ) -> None:
        import io

        from perplexity_web_mcp.shared import Models

        mock_turn.return_value = ("Answer", "conv-1")
        monkeypatch.setattr("sys.stdin", io.StringIO("hi\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        assert mock_turn.call_args.args[1] == Models.SONAR

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    @patch("perplexity_web_mcp.shared.smart_ask")
    def test_chat_auto_model_uses_quota_aware_routing(
        self, mock_smart: MagicMock, mock_turn: MagicMock, monkeypatch, capsys: pytest.CaptureFixture
    ) -> None:
        import io

        routed = MagicMock()
        routed.format_response.return_value = "Routed answer"
        routed.conversation_id = "conv-1"
        mock_smart.return_value = routed
        monkeypatch.setattr("sys.stdin", io.StringIO("q1\nq2\n/exit\n"))

        assert _cmd_chat_impl("auto", None, None) == 0

        mock_turn.assert_not_called()
        assert mock_smart.call_args_list[0].kwargs["conversation_id"] is None
        assert mock_smart.call_args_list[1].kwargs["conversation_id"] == "conv-1"

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    def test_chat_model_switch_mid_session(
        self, mock_turn: MagicMock, monkeypatch, capsys: pytest.CaptureFixture
    ) -> None:
        import io

        from perplexity_web_mcp.shared import Models

        mock_turn.side_effect = [("A", "conv-1"), ("B", "conv-1")]
        monkeypatch.setattr("sys.stdin", io.StringIO("q1\n/model grok47\nq2\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        assert mock_turn.call_args_list[0].args[1] == Models.SONAR
        assert mock_turn.call_args_list[1].args[1] == Models.GROK_47
        assert mock_turn.call_args_list[1].args[3] == "conv-1"
        assert "Model set to grok47" in capsys.readouterr().out

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    @patch("perplexity_web_mcp.shared.smart_ask")
    def test_chat_switch_to_auto_keeps_thread(self, mock_smart: MagicMock, mock_turn: MagicMock, monkeypatch) -> None:
        import io

        mock_turn.return_value = ("A", "conv-1")
        routed = MagicMock()
        routed.format_response.return_value = "Routed"
        routed.conversation_id = "conv-1"
        mock_smart.return_value = routed
        monkeypatch.setattr("sys.stdin", io.StringIO("q1\n/model auto\nq2\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        mock_turn.assert_called_once()
        assert mock_smart.call_args.kwargs["conversation_id"] == "conv-1"

    @patch("perplexity_web_mcp.cli.main.ask_turn")
    def test_chat_model_command_shows_and_rejects(
        self, mock_turn: MagicMock, monkeypatch, capsys: pytest.CaptureFixture
    ) -> None:
        import io

        from perplexity_web_mcp.shared import Models

        mock_turn.return_value = ("A", "conv-1")
        monkeypatch.setattr("sys.stdin", io.StringIO("/model\n/model bogus\nq1\n/exit\n"))

        assert _cmd_chat_impl(None, None, None) == 0

        captured = capsys.readouterr()
        assert "Current model: sonar" in captured.out
        assert "Available models:" in captured.out
        assert "grok47" in captured.out
        assert "Switch with /model NAME" in captured.out
        assert "Unknown model 'bogus'" in captured.err
        assert mock_turn.call_args.args[1] == Models.SONAR

    def test_chat_flag_like_model_gets_hint(self, capsys: pytest.CaptureFixture) -> None:
        assert _cmd_chat_impl("--help", None, None) == 1
        assert "expects a model name" in capsys.readouterr().err


class TestCmdConfig:
    """#51: pwm config set/show/clear."""

    def test_set_show_clear_roundtrip(self, capsys: pytest.CaptureFixture) -> None:
        assert _cmd_config_set("grok47", True, "web") == 0
        capsys.readouterr()

        assert _cmd_config_show() == 0
        out = capsys.readouterr().out
        assert "model: grok47" in out
        assert "thinking: True" in out
        assert "source: web" in out

        assert _cmd_config_clear(None) == 0
        assert _cmd_config_show() == 0
        assert "No saved preferences" in capsys.readouterr().out

    def test_set_requires_at_least_one_value(self, capsys: pytest.CaptureFixture) -> None:
        assert _cmd_config_set(None, None, None) == 1
        assert "Provide at least one" in capsys.readouterr().err

    def test_set_unknown_model_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        assert _cmd_config_set("nonexistent", None, None) == 1
        assert "Unknown model" in capsys.readouterr().err

    def test_clear_single_key(self) -> None:
        from perplexity_web_mcp.preferences import load_preferences

        assert _cmd_config_set("sonar", None, None) == 0
        assert _cmd_config_clear("model") == 0
        assert load_preferences() == {}


class TestClickSurface:
    """The click layer exposes chat, config, and the new ask options."""

    def test_top_level_help_lists_chat_and_config(self) -> None:
        from click.testing import CliRunner

        from perplexity_web_mcp.cli.main import cli

        result = CliRunner().invoke(cli, ["--help"])
        assert result.exit_code == 0
        assert "chat" in result.output
        assert "config" in result.output

    def test_ask_help_lists_new_options(self) -> None:
        from click.testing import CliRunner

        from perplexity_web_mcp.cli.main import cli

        result = CliRunner().invoke(cli, ["ask", "--help"])
        assert result.exit_code == 0
        assert "--prompt-file" in result.output
        assert "--file" in result.output

    def test_ask_without_query_fails_cleanly(self) -> None:
        from click.testing import CliRunner

        from perplexity_web_mcp.cli.main import cli

        result = CliRunner().invoke(cli, ["ask"])
        assert result.exit_code == 2
