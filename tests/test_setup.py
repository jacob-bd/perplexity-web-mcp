"""Tests for the setup command (cli/setup.py).

All filesystem operations use tmp_path to avoid touching real configs.
Tests use Click's CliRunner for command invocation and patch
internal helpers for config path generation.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess
import sys
from unittest.mock import MagicMock, patch

from click.testing import CliRunner, Result


try:
    import tomllib
except ModuleNotFoundError:  # Python 3.10
    import tomli as tomllib

from perplexity_web_mcp.cli.setup import (
    CLIENT_REGISTRY,
    MCP_SERVER_KEY,
    _add_mcp_server,
    _is_configured,
    _read_json_config,
    _remove_mcp_server,
    _write_json_config,
    setup,
)


# ============================================================================
# 1. Helper function tests
# ============================================================================


class TestReadWriteJsonConfig:
    """Test JSON config reading and writing helpers."""

    def test_read_missing_file(self, tmp_path: Path) -> None:
        assert _read_json_config(tmp_path / "missing.json") == {}

    def test_read_invalid_json(self, tmp_path: Path) -> None:
        cfg = tmp_path / "bad.json"
        cfg.write_text("not json")
        assert _read_json_config(cfg) == {}

    def test_read_valid_json(self, tmp_path: Path) -> None:
        cfg = tmp_path / "good.json"
        cfg.write_text('{"mcpServers": {"test": {}}}')
        assert _read_json_config(cfg) == {"mcpServers": {"test": {}}}

    def test_write_creates_parent_dirs(self, tmp_path: Path) -> None:
        cfg = tmp_path / "sub" / "deep" / "config.json"
        _write_json_config(cfg, {"test": True})
        assert cfg.exists()
        data = json.loads(cfg.read_text())
        assert data == {"test": True}


class TestIsConfigured:
    """Test MCP config detection in a dict."""

    def test_returns_false_for_empty(self) -> None:
        assert _is_configured({}) is False

    def test_returns_false_when_no_server(self) -> None:
        assert _is_configured({"mcpServers": {}}) is False

    def test_returns_true_when_present(self) -> None:
        assert _is_configured({"mcpServers": {MCP_SERVER_KEY: {}}}) is True

    def test_returns_true_for_custom_key(self) -> None:
        assert _is_configured({"mcpServers": {"custom": {}}}, key="custom") is True


class TestAddRemoveMcpServer:
    """Test adding/removing from a config dict."""

    def test_add_to_empty(self) -> None:
        config = _add_mcp_server({})
        assert MCP_SERVER_KEY in config["mcpServers"]
        assert config["mcpServers"][MCP_SERVER_KEY]["command"] == "pwm-mcp"

    def test_add_preserves_existing(self) -> None:
        config = {"mcpServers": {"other": {"command": "other"}}}
        _add_mcp_server(config)
        assert "other" in config["mcpServers"]
        assert MCP_SERVER_KEY in config["mcpServers"]

    def test_add_with_extra(self) -> None:
        config = _add_mcp_server({}, extra={"trust": True})
        assert config["mcpServers"][MCP_SERVER_KEY]["trust"] is True

    def test_remove_returns_true(self) -> None:
        config = {"mcpServers": {MCP_SERVER_KEY: {}, "other": {}}}
        assert _remove_mcp_server(config) is True
        assert MCP_SERVER_KEY not in config["mcpServers"]
        assert "other" in config["mcpServers"]

    def test_remove_returns_false_when_not_present(self) -> None:
        config = {"mcpServers": {"other": {}}}
        assert _remove_mcp_server(config) is False


# ============================================================================
# 2. File-based add/remove integration tests
# ============================================================================


class TestSetupJsonClient:
    """Test adding/removing MCP config via JSON files."""

    def test_add_creates_new_config(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "sub" / "config.json"

        from perplexity_web_mcp.cli.setup import _setup_json_client

        with patch.dict(
            CLIENT_REGISTRY,
            {
                "test-tool": {
                    "name": "Test Tool",
                    "description": "Test",
                    "config_fn": lambda: cfg_path,
                }
            },
        ):
            result = _setup_json_client("test-tool")

        assert result is True
        assert cfg_path.exists()
        data = json.loads(cfg_path.read_text())
        assert MCP_SERVER_KEY in data["mcpServers"]

    def test_add_preserves_existing(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "config.json"
        cfg_path.write_text(json.dumps({"mcpServers": {"other-server": {"command": "other"}}}))

        from perplexity_web_mcp.cli.setup import _setup_json_client

        with patch.dict(
            CLIENT_REGISTRY,
            {
                "test-tool": {
                    "name": "Test Tool",
                    "description": "Test",
                    "config_fn": lambda: cfg_path,
                }
            },
        ):
            _setup_json_client("test-tool")

        data = json.loads(cfg_path.read_text())
        assert "other-server" in data["mcpServers"]
        assert MCP_SERVER_KEY in data["mcpServers"]

    def test_remove_deletes_server(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "config.json"
        cfg_path.write_text(json.dumps({"mcpServers": {MCP_SERVER_KEY: {"command": "pwm-mcp"}, "other": {}}}))

        from perplexity_web_mcp.cli.setup import _remove_json_client

        with patch.dict(
            CLIENT_REGISTRY,
            {
                "test-tool": {
                    "name": "Test Tool",
                    "description": "Test",
                    "config_fn": lambda: cfg_path,
                }
            },
        ):
            result = _remove_json_client("test-tool")

        assert result is True
        data = json.loads(cfg_path.read_text())
        assert MCP_SERVER_KEY not in data["mcpServers"]
        assert "other" in data["mcpServers"]

    def test_remove_returns_false_when_not_configured(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "config.json"
        cfg_path.write_text(json.dumps({"mcpServers": {}}))

        from perplexity_web_mcp.cli.setup import _remove_json_client

        with patch.dict(
            CLIENT_REGISTRY,
            {
                "test-tool": {
                    "name": "Test Tool",
                    "description": "Test",
                    "config_fn": lambda: cfg_path,
                }
            },
        ):
            assert _remove_json_client("test-tool") is False

    def test_remove_returns_false_when_no_file(self, tmp_path: Path) -> None:
        from perplexity_web_mcp.cli.setup import _remove_json_client

        with patch.dict(
            CLIENT_REGISTRY,
            {
                "test-tool": {
                    "name": "Test Tool",
                    "description": "Test",
                    "config_fn": lambda: tmp_path / "nope.json",
                }
            },
        ):
            assert _remove_json_client("test-tool") is False


# ============================================================================
# 3. Click command routing tests
# ============================================================================


class TestSetupCommands:
    """Test Click-based setup commands via CliRunner."""

    def _run(self, *args: str) -> Result:
        runner = CliRunner()
        return runner.invoke(setup, list(args))

    def test_add_unknown_client_exits_1(self) -> None:
        result = self._run("add", "nonexistent")
        assert result.exit_code == 1
        assert "Unknown client" in result.output

    def test_remove_unknown_client_exits_1(self) -> None:
        result = self._run("remove", "nonexistent")
        assert result.exit_code == 1
        assert "Unknown client" in result.output

    def test_add_codex_configures_mcp(self) -> None:
        with patch("perplexity_web_mcp.cli.setup._setup_codex", return_value=True) as mock_setup:
            result = self._run("add", "codex")
            assert result.exit_code == 0
            assert "codex" in result.output.lower()
            mock_setup.assert_called_once_with(streamable_http=False, port=8000)

    def test_add_codex_http_configures_streamable_http(self) -> None:
        with patch("perplexity_web_mcp.cli.setup._setup_codex", return_value=True) as mock_setup:
            result = self._run("add", "codex", "--http", "--port", "8123")
            assert result.exit_code == 0
            mock_setup.assert_called_once_with(streamable_http=True, port=8123)

    def test_add_codex_sse_remains_a_legacy_alias(self) -> None:
        with patch("perplexity_web_mcp.cli.setup._setup_codex", return_value=True) as mock_setup:
            result = self._run("add", "codex", "--sse")
            assert result.exit_code == 0
            mock_setup.assert_called_once_with(streamable_http=True, port=8000)

    def test_add_codex_http_propagates_setup_failure(self) -> None:
        with patch("perplexity_web_mcp.cli.setup._setup_codex", return_value=False):
            result = self._run("add", "codex", "--http")

        assert result.exit_code == 1

    def test_remove_codex_removes_mcp(self) -> None:
        with patch("perplexity_web_mcp.cli.setup._remove_codex", return_value=True) as mock_remove:
            result = self._run("remove", "codex")
            assert result.exit_code == 0
            mock_remove.assert_called_once()

    def test_add_opencode_configures_mcp(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "opencode.json"
        with patch("perplexity_web_mcp.cli.setup._opencode_config_path", return_value=cfg_path):
            result = self._run("add", "opencode")
        assert result.exit_code == 0
        assert "opencode" in result.output.lower()
        data = json.loads(cfg_path.read_text())
        assert MCP_SERVER_KEY in data["mcp"]
        assert data["mcp"][MCP_SERVER_KEY]["type"] == "local"
        assert data["mcp"][MCP_SERVER_KEY]["command"] == ["pwm-mcp"]

    def test_add_opencode_already_configured(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "opencode.json"
        cfg_path.write_text(json.dumps({"mcp": {MCP_SERVER_KEY: {"type": "local", "command": ["pwm-mcp"]}}}))
        with patch("perplexity_web_mcp.cli.setup._opencode_config_path", return_value=cfg_path):
            result = self._run("add", "opencode")
        assert result.exit_code == 0
        assert "already configured" in result.output.lower()

    def test_remove_opencode_removes_mcp(self, tmp_path: Path) -> None:
        cfg_path = tmp_path / "opencode.json"
        cfg_path.write_text(json.dumps({"mcp": {MCP_SERVER_KEY: {"type": "local"}, "other": {}}}))
        with patch("perplexity_web_mcp.cli.setup._opencode_config_path", return_value=cfg_path):
            result = self._run("remove", "opencode")
        assert result.exit_code == 0
        data = json.loads(cfg_path.read_text())
        assert MCP_SERVER_KEY not in data["mcp"]
        assert "other" in data["mcp"]

    def test_list_shows_clients(self) -> None:
        result = self._run("list")
        assert result.exit_code == 0
        # Should show at least some client names
        assert "Cursor" in result.output or "Claude" in result.output

    def test_add_help_shows_examples(self) -> None:
        result = self._run("add", "--help")
        assert result.exit_code == 0
        assert "pwm setup add cursor" in result.output

    def test_remove_help_shows_examples(self) -> None:
        result = self._run("remove", "--help")
        assert result.exit_code == 0
        assert "pwm setup remove" in result.output


# ============================================================================
# 4. Tool detection tests
# ============================================================================


class TestDetectTool:
    """Test tool detection logic."""

    def test_detect_unknown_tool(self) -> None:
        from perplexity_web_mcp.cli.setup import _detect_tool

        assert _detect_tool("nonexistent-tool") is False

    @patch("shutil.which", return_value="/usr/bin/claude")
    def test_detect_claude_code(self, mock_which: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _detect_tool

        assert _detect_tool("claude-code") is True

    @patch("shutil.which", return_value=None)
    def test_detect_claude_code_not_installed(self, mock_which: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _detect_tool

        assert _detect_tool("claude-code") is False


class TestIsAlreadyConfigured:
    """Test configuration status check."""

    @patch("perplexity_web_mcp.cli.setup._codex_config_path")
    def test_codex_not_configured_without_binary_or_toml(self, mock_path: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _is_already_configured

        mock_path.return_value = Path("/nonexistent/.codex")
        assert _is_already_configured("codex") is False

    @patch("perplexity_web_mcp.cli.setup._read_json_config")
    @patch("perplexity_web_mcp.cli.setup._cursor_config_path")
    def test_cursor_configured(self, mock_path: MagicMock, mock_read: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _is_already_configured

        mock_path.return_value = Path("/fake/config.json")
        mock_read.return_value = {"mcpServers": {MCP_SERVER_KEY: {}}}
        assert _is_already_configured("cursor") is True

    @patch("perplexity_web_mcp.cli.setup._read_json_config")
    @patch("perplexity_web_mcp.cli.setup._cursor_config_path")
    def test_cursor_not_configured(self, mock_path: MagicMock, mock_read: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _is_already_configured

        mock_path.return_value = Path("/fake/config.json")
        mock_read.return_value = {"mcpServers": {}}
        assert _is_already_configured("cursor") is False


# ============================================================================
# 5. Backward-compatibility helpers (for doctor.py)
# ============================================================================


class TestBackwardCompat:
    """Test backward-compatible functions used by doctor.py."""

    def test_get_tools_returns_list(self) -> None:
        from perplexity_web_mcp.cli.setup import _get_tools

        tools = _get_tools()
        assert isinstance(tools, list)
        assert len(tools) > 0
        # Each item should have .name attribute
        assert all(hasattr(t, "name") for t in tools)

    @patch("perplexity_web_mcp.cli.setup._is_already_configured", return_value=False)
    def test_is_configured_compat_codex(self, mock_configured: MagicMock) -> None:
        from perplexity_web_mcp.cli.setup import _get_tools, _is_configured_compat

        tools = _get_tools()
        codex_tool = next(t for t in tools if t.name == "codex")

        assert _is_configured_compat(codex_tool) is False
        mock_configured.assert_called_once_with("codex")


def test_serve_mcp_cli_command() -> None:
    """Test pwm serve-mcp invocation."""
    from click.testing import CliRunner

    from perplexity_web_mcp.cli.main import cli

    runner = CliRunner()
    for transport in ("sse", "streamable-http"):
        with patch("perplexity_web_mcp.mcp.server.main") as mock_main:
            result = runner.invoke(cli, ["serve-mcp", "--transport", transport, "--port", "8123"])
            assert result.exit_code == 0
            mock_main.assert_called_once_with(transport=transport, host="127.0.0.1", port=8123)


def test_serve_mcp_cli_status_and_stop() -> None:
    """Test pwm serve-mcp --status and --stop options."""
    from click.testing import CliRunner

    from perplexity_web_mcp.cli.main import cli

    runner = CliRunner()

    # Status when running
    with patch("perplexity_web_mcp.mcp.server.get_running_daemon_pid", return_value=12345):
        result = runner.invoke(cli, ["serve-mcp", "--status", "--port", "8000"])
        assert result.exit_code == 0
        assert "running" in result.output
        assert "12345" in result.output

    # Status when stopped
    with patch("perplexity_web_mcp.mcp.server.get_running_daemon_pid", return_value=None):
        with patch("perplexity_web_mcp.mcp.server.is_port_in_use", return_value=False):
            result = runner.invoke(cli, ["serve-mcp", "--status", "--port", "8000"])
            assert result.exit_code == 0
            assert "No active MCP daemon detected" in result.output

    # Stop running daemon
    with patch("perplexity_web_mcp.mcp.server.stop_daemon", return_value=(True, "Stopped MCP daemon (PID 12345)")):
        result = runner.invoke(cli, ["serve-mcp", "--stop", "--port", "8000"])
        assert result.exit_code == 0
        assert "Stopped MCP daemon" in result.output


def test_serve_mcp_status_handles_legacy_windows_output_encoding() -> None:
    script = """
import sys
from unittest.mock import patch

from perplexity_web_mcp.mcp import server
from perplexity_web_mcp.cli.main import main

sys.platform = "win32"
sys.argv = ["pwm", "serve-mcp", "--status", "--port", "8000"]
with (
    patch.object(server, "get_running_daemon_pid", return_value=12345),
    patch.object(server, "is_port_in_use", return_value=False),
):
    main()
"""
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "cp1252"

    result = subprocess.run(
        [sys.executable, "-c", script],
        capture_output=True,
        env=env,
        check=False,
    )

    assert result.returncode == 0, result.stderr.decode("utf-8", errors="replace")
    assert "running" in result.stdout.decode("utf-8")


def test_setup_codex_http_does_not_duplicate_matching_toml_config(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    config_path = tmp_path / "config.toml"
    original = '[mcp_servers.perplexity]\nurl = "http://127.0.0.1:8000/mcp"\nenabled = true\n'
    config_path.write_text(original)

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value=None),
    ):
        assert _setup_codex(streamable_http=True) is True

    assert config_path.read_text() == original


def test_setup_codex_http_refuses_to_overwrite_legacy_sse_config(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    config_path = tmp_path / "config.toml"
    original = '[mcp_servers.perplexity]\nurl = "http://127.0.0.1:8000/sse"\nenabled = true\n'
    config_path.write_text(original)

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value=None),
    ):
        assert _setup_codex(streamable_http=True) is False

    assert config_path.read_text() == original


def test_setup_codex_http_refuses_disabled_matching_config(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    config_path = tmp_path / "config.toml"
    original = '[mcp_servers.perplexity]\nurl = "http://127.0.0.1:8000/mcp"\nenabled = false\n'
    config_path.write_text(original)

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value=None),
    ):
        assert _setup_codex(streamable_http=True) is False

    assert config_path.read_text() == original


def test_setup_codex_http_refuses_non_table_mcp_servers(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    config_path = tmp_path / "config.toml"
    original = "mcp_servers = []\n"
    config_path.write_text(original)

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value=None),
    ):
        assert _setup_codex(streamable_http=True) is False

    assert config_path.read_text() == original


def test_setup_codex_http_writes_mcp_endpoint_without_codex_cli(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value=None),
    ):
        assert _setup_codex(streamable_http=True, port=8123) is True

    config = tomllib.loads((tmp_path / "config.toml").read_text())
    assert config["mcp_servers"]["perplexity"] == {
        "url": "http://127.0.0.1:8123/mcp",
        "enabled": True,
    }


def test_setup_codex_http_uses_mcp_endpoint_with_codex_cli(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    completed = subprocess.CompletedProcess(args=[], returncode=0, stdout="", stderr="")
    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value="codex") as mock_which,
        patch("perplexity_web_mcp.cli.setup.subprocess.run", return_value=completed) as mock_run,
    ):
        assert _setup_codex(streamable_http=True, port=8123) is True

    mock_which.assert_called_once_with("codex")
    mock_run.assert_called_once_with(
        ["codex", "mcp", "add", "perplexity", "--url", "http://127.0.0.1:8123/mcp"],
        capture_output=True,
        text=True,
        timeout=10,
    )


def test_setup_codex_http_does_not_edit_config_when_codex_cli_fails(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    completed = subprocess.CompletedProcess(args=[], returncode=1, stdout="", stderr="registration failed")
    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value="codex"),
        patch("perplexity_web_mcp.cli.setup.subprocess.run", return_value=completed),
    ):
        assert _setup_codex(streamable_http=True) is False

    assert not (tmp_path / "config.toml").exists()


def test_setup_codex_http_does_not_edit_config_when_codex_cli_times_out(tmp_path: Path) -> None:
    from perplexity_web_mcp.cli.setup import _setup_codex

    with (
        patch("perplexity_web_mcp.cli.setup._codex_config_path", return_value=tmp_path),
        patch("perplexity_web_mcp.cli.setup.shutil.which", return_value="codex"),
        patch(
            "perplexity_web_mcp.cli.setup.subprocess.run",
            side_effect=subprocess.TimeoutExpired(cmd=["codex", "mcp", "add"], timeout=10),
        ),
    ):
        assert _setup_codex(streamable_http=True) is False

    assert not (tmp_path / "config.toml").exists()
