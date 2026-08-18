"""Tests for model-specific MCP tool routing."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

from perplexity_web_mcp.mcp import server
from perplexity_web_mcp.models import Models


def test_current_model_tools_route_to_live_identifiers() -> None:
    cases = (
        (server.pplx_gpt56_terra, Models.GPT_56_TERRA),
        (server.pplx_gpt56_terra_thinking, Models.GPT_56_TERRA_THINKING),
        (server.pplx_gpt56_sol, Models.GPT_56_SOL),
        (server.pplx_gpt56_sol_thinking, Models.GPT_56_SOL_THINKING),
        (server.pplx_grok45, Models.GROK_45),
        (server.pplx_grok45_thinking, Models.GROK_45_THINKING),
    )

    with patch.object(server, "ask", return_value="ok") as mock_ask:
        for tool, model in cases:
            assert tool.fn("question", "none", "conversation") == "ok"
            mock_ask.assert_called_with("question", model, "none", "conversation")


def test_removed_gpt_tools_are_not_exposed() -> None:
    assert not hasattr(server, "pplx_gpt54")
    assert not hasattr(server, "pplx_gpt54_thinking")
    assert not hasattr(server, "pplx_gpt55")
    assert not hasattr(server, "pplx_gpt55_thinking")


def test_mcp_auth_preserves_totp_challenge_between_calls() -> None:
    """MCP clients can submit TOTP after the email OTP callback requests it."""
    session = MagicMock()
    server._set_auth_session({"session": session, "email": "user@example.com"})

    try:
        with (
            patch.object(server, "resolve_redirect_url", return_value="https://callback"),
            patch.object(server, "follow_auth_callback", return_value="challenge-123"),
            patch.object(server, "verify_totp") as verify,
            patch.object(server, "extract_session_token", return_value="session-token"),
            patch.object(server, "save_token", return_value=True),
            patch("perplexity_web_mcp.cli.auth.get_user_info", return_value=None),
        ):
            first = server.pplx_auth_complete.fn("user@example.com", "654321")
            second = server.pplx_auth_complete.fn("user@example.com", totp_code="123456")

        assert first.startswith("TOTP_REQUIRED")
        assert second.startswith("SUCCESS")
        verify.assert_called_once_with(session, "challenge-123", "123456")
    finally:
        server._clear_auth_session()


def test_mcp_server_main_transports() -> None:
    """Test that mcp main correctly forwards transport choices."""
    with patch.object(server.mcp, "run") as mock_run:
        # Default stdio
        server.main()
        mock_run.assert_called_with(transport="stdio")

        # Explicit SSE
        server.main(transport="sse", host="0.0.0.0", port=9000)
        mock_run.assert_called_with(transport="sse", host="0.0.0.0", port=9000)

        # Explicit streamable-http
        server.main(transport="streamable-http", host="127.0.0.1", port=8000)
        mock_run.assert_called_with(transport="streamable-http", host="127.0.0.1", port=8000)
