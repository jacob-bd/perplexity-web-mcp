"""Tests for model-specific MCP tool routing."""

from __future__ import annotations

import ctypes
from pathlib import Path
import subprocess
import sys
from unittest.mock import MagicMock, patch

import pytest

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
    with (
        patch.object(server.mcp, "run") as mock_run,
        patch.object(server, "get_running_daemon_pid", return_value=None),
        patch.object(server, "is_port_in_use", return_value=False),
        patch.object(server, "acquire_daemon_lock", return_value=True),
        patch.object(server, "release_daemon_lock"),
    ):
        # Default stdio
        server.main()
        mock_run.assert_called_with(transport="stdio")

        # Explicit SSE
        server.main(transport="sse", host="127.0.0.1", port=9000)
        mock_run.assert_called_with(transport="sse", host="127.0.0.1", port=9000)

        # Explicit streamable-http
        server.main(transport="streamable-http", host="127.0.0.1", port=8000)
        mock_run.assert_called_with(transport="streamable-http", host="127.0.0.1", port=8000)


def test_daemon_pid_lifecycle(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr(server, "CONFIG_DIR", tmp_path)

    port = 8999
    assert server.get_running_daemon_pid(port) is None

    # Acquire lock
    assert server.acquire_daemon_lock(port) is True
    pid_path = server.get_daemon_pid_path(port)
    assert pid_path.exists()
    assert server.get_running_daemon_pid(port) is not None

    # Release lock
    server.release_daemon_lock(port)
    assert not pid_path.exists()
    assert server.get_running_daemon_pid(port) is None


@pytest.mark.parametrize(
    ("open_result", "last_error", "wait_result", "expected"),
    (
        (0, 87, None, False),
        (0, 5, None, True),
        (123, 0, 0x00000102, True),
        (123, 0, 0x00000000, False),
        (123, 0, 0xFFFFFFFF, True),
    ),
)
def test_windows_pid_probe_is_non_destructive_and_conservative(
    open_result: int,
    last_error: int,
    wait_result: int | None,
    expected: bool,
) -> None:
    kernel32 = MagicMock()
    kernel32.OpenProcess.return_value = open_result
    kernel32.WaitForSingleObject.return_value = wait_result

    with (
        patch.object(ctypes, "WinDLL", return_value=kernel32, create=True) as win_dll,
        patch.object(ctypes, "get_last_error", return_value=last_error, create=True),
    ):
        assert server._is_windows_pid_running(4242) is expected

    win_dll.assert_called_once_with("kernel32", use_last_error=True)
    kernel32.OpenProcess.assert_called_once_with(0x00100000, False, 4242)
    if open_result:
        kernel32.WaitForSingleObject.assert_called_once_with(open_result, 0)
        kernel32.CloseHandle.assert_called_once_with(open_result)
    else:
        kernel32.WaitForSingleObject.assert_not_called()
        kernel32.CloseHandle.assert_not_called()


def test_is_pid_running_uses_windows_probe() -> None:
    with (
        patch.object(server.sys, "platform", "win32"),
        patch.object(server, "_is_windows_pid_running", return_value=True) as probe,
        patch.object(server.os, "kill") as kill,
    ):
        assert server.is_pid_running(4242) is True

    probe.assert_called_once_with(4242)
    kill.assert_not_called()


def test_is_pid_running_rejects_out_of_range_windows_pid() -> None:
    with (
        patch.object(server.sys, "platform", "win32"),
        patch.object(server, "_is_windows_pid_running") as probe,
        patch.object(server.os, "kill") as kill,
    ):
        assert server.is_pid_running(0x100000000) is False

    probe.assert_not_called()
    kill.assert_not_called()


def test_windows_live_pid_file_is_retained_and_blocks_duplicate(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr(server, "CONFIG_DIR", tmp_path)
    port = 8995
    pid_path = server.get_daemon_pid_path(port)
    pid_path.write_text("4242", encoding="utf-8")

    with (
        patch.object(server.sys, "platform", "win32"),
        patch.object(server, "_is_windows_pid_running", return_value=True) as probe,
    ):
        assert server.get_running_daemon_pid(port) == 4242
        assert pid_path.exists()
        assert server.acquire_daemon_lock(port) is False

    probe.assert_called_once_with(4242)


@pytest.mark.skipif(sys.platform != "win32", reason="requires Windows process APIs")
def test_windows_pid_probe_preserves_live_child() -> None:
    child = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(30)"])
    try:
        assert server.is_pid_running(child.pid) is True
        assert child.poll() is None
    finally:
        child.terminate()
        child.wait(timeout=10)

    assert server.is_pid_running(child.pid) is False


def test_daemon_stale_pid_cleanup(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr(server, "CONFIG_DIR", tmp_path)
    port = 8998
    pid_path = server.get_daemon_pid_path(port)
    pid_path.write_text("99999999", encoding="utf-8")

    with patch.object(server, "is_pid_running", return_value=False):
        assert server.get_running_daemon_pid(port) is None
        assert not pid_path.exists()


def test_daemon_lock_acquisition_is_atomic(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr(server, "CONFIG_DIR", tmp_path)
    port = 8997

    assert server.acquire_daemon_lock(port) is True
    assert server.acquire_daemon_lock(port) is False


def test_mcp_server_rejects_remote_binding_without_authentication() -> None:
    with (
        patch.object(server, "get_running_daemon_pid", return_value=None),
        patch.object(server, "is_port_in_use", return_value=False),
        patch.object(server.mcp, "run"),
        pytest.raises(SystemExit) as exc,
    ):
        server.main(transport="sse", host="0.0.0.0", port=8996)

    assert exc.value.code == 1


def test_mcp_server_main_duplicate_daemon_guard() -> None:
    with patch.object(server, "get_running_daemon_pid", return_value=12345):
        with pytest.raises(SystemExit) as exc:
            server.main(transport="sse", port=8000)
        assert exc.value.code == 1


def test_mcp_server_main_port_in_use_guard() -> None:
    with patch.object(server, "get_running_daemon_pid", return_value=None):
        with patch.object(server, "is_port_in_use", return_value=True):
            with pytest.raises(SystemExit) as exc:
                server.main(transport="sse", port=8000)
            assert exc.value.code == 1
