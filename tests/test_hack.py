"""Tests for the hack command (cli/hack.py).

All filesystem operations use tmp_path to avoid touching real configs.
Tests verify the settings.json backup/restore guard that prevents
Claude Code's /model command from permanently corrupting user settings.
"""

from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.cli.hack import _hack_claude


# ============================================================================
# Settings Guard tests
# ============================================================================


class TestSettingsGuard:
    """Test inline settings.json backup/restore in _hack_claude."""

    def _make_settings(self, tmp_path: Path, content: dict) -> Path:
        """Create a fake ~/.claude/settings.json inside tmp_path."""
        claude_dir = tmp_path / ".claude"
        claude_dir.mkdir()
        settings = claude_dir / "settings.json"
        settings.write_text(json.dumps(content))
        return settings

    @patch("perplexity_web_mcp.cli.hack.subprocess.run")
    @patch("perplexity_web_mcp.cli.hack.shutil.which", return_value="/usr/bin/claude")
    @patch("perplexity_web_mcp.cli.hack._check_server_ready", return_value=True)
    @patch("perplexity_web_mcp.cli.hack.subprocess.Popen")
    def test_settings_restored_after_normal_exit(self, mock_popen, mock_ready, mock_which, mock_run, tmp_path):
        """Settings are restored after Claude exits normally."""
        original = {"model": "claude-sonnet-4-6", "permissions": {"ask": []}}
        settings_path = self._make_settings(tmp_path, original)

        # Simulate Claude Code changing the model during the session
        def simulate_model_change(*args, **kwargs):
            settings_path.write_text(json.dumps({"model": "gpt61_sol"}))
            return MagicMock(returncode=0)

        mock_run.side_effect = simulate_model_change
        mock_popen.return_value = MagicMock(poll=MagicMock(return_value=None))

        with patch("perplexity_web_mcp.cli.hack.Path.home", return_value=tmp_path):
            _hack_claude([])

        # Settings should be restored to original
        restored = json.loads(settings_path.read_text())
        assert restored == original

    @patch("perplexity_web_mcp.cli.hack.subprocess.run")
    @patch("perplexity_web_mcp.cli.hack.shutil.which", return_value="/usr/bin/claude")
    @patch("perplexity_web_mcp.cli.hack._check_server_ready", return_value=True)
    @patch("perplexity_web_mcp.cli.hack.subprocess.Popen")
    def test_settings_restored_after_exception(self, mock_popen, mock_ready, mock_which, mock_run, tmp_path):
        """Settings are restored even when Claude crashes with an exception."""
        original = {"model": "claude-sonnet-4-6"}
        settings_path = self._make_settings(tmp_path, original)

        def simulate_crash(*args, **kwargs):
            settings_path.write_text(json.dumps({"model": "gpt61_sol"}))
            raise RuntimeError("Claude crashed")

        mock_run.side_effect = simulate_crash
        mock_popen.return_value = MagicMock(poll=MagicMock(return_value=None))

        with patch("perplexity_web_mcp.cli.hack.Path.home", return_value=tmp_path):
            with pytest.raises(RuntimeError, match="Claude crashed"):
                _hack_claude([])

        # Settings should still be restored
        restored = json.loads(settings_path.read_text())
        assert restored == original

    @patch("perplexity_web_mcp.cli.hack.subprocess.run")
    @patch("perplexity_web_mcp.cli.hack.shutil.which", return_value="/usr/bin/claude")
    @patch("perplexity_web_mcp.cli.hack._check_server_ready", return_value=True)
    @patch("perplexity_web_mcp.cli.hack.subprocess.Popen")
    def test_no_crash_when_settings_missing(self, mock_popen, mock_ready, mock_which, mock_run, tmp_path):
        """No error when settings.json doesn't exist (fresh install)."""
        # Create .claude dir but NOT settings.json
        (tmp_path / ".claude").mkdir()

        mock_run.return_value = MagicMock(returncode=0)
        mock_popen.return_value = MagicMock(poll=MagicMock(return_value=None))

        with patch("perplexity_web_mcp.cli.hack.Path.home", return_value=tmp_path):
            code = _hack_claude([])

        assert code == 0
        # settings.json should still not exist
        assert not (tmp_path / ".claude" / "settings.json").exists()

    @patch("perplexity_web_mcp.cli.hack.subprocess.run")
    @patch("perplexity_web_mcp.cli.hack.shutil.which", return_value="/usr/bin/claude")
    @patch("perplexity_web_mcp.cli.hack._check_server_ready", return_value=True)
    @patch("perplexity_web_mcp.cli.hack.subprocess.Popen")
    def test_settings_unchanged_no_corruption(self, mock_popen, mock_ready, mock_which, mock_run, tmp_path):
        """When Claude doesn't change settings, file stays identical."""
        original = {"model": "claude-sonnet-4-6", "effortLevel": "medium"}
        settings_path = self._make_settings(tmp_path, original)

        mock_run.return_value = MagicMock(returncode=0)
        mock_popen.return_value = MagicMock(poll=MagicMock(return_value=None))

        with patch("perplexity_web_mcp.cli.hack.Path.home", return_value=tmp_path):
            _hack_claude([])

        restored = json.loads(settings_path.read_text())
        assert restored == original

    @patch("perplexity_web_mcp.cli.hack.subprocess.run")
    @patch("perplexity_web_mcp.cli.hack.shutil.which", return_value="/usr/bin/claude")
    @patch("perplexity_web_mcp.cli.hack._check_server_ready", return_value=True)
    @patch("perplexity_web_mcp.cli.hack.subprocess.Popen")
    def test_settings_preserves_binary_content(self, mock_popen, mock_ready, mock_which, mock_run, tmp_path):
        """Backup/restore uses read_bytes/write_bytes for exact preservation."""
        # Use content with specific whitespace formatting
        raw_content = b'{\n  "model": "claude-sonnet-4-6",\n  "effortLevel": "medium"\n}'
        claude_dir = tmp_path / ".claude"
        claude_dir.mkdir()
        settings_path = claude_dir / "settings.json"
        settings_path.write_bytes(raw_content)

        def simulate_model_change(*args, **kwargs):
            settings_path.write_text(json.dumps({"model": "gpt61_sol"}))
            return MagicMock(returncode=0)

        mock_run.side_effect = simulate_model_change
        mock_popen.return_value = MagicMock(poll=MagicMock(return_value=None))

        with patch("perplexity_web_mcp.cli.hack.Path.home", return_value=tmp_path):
            _hack_claude([])

        # Byte-for-byte identical
        assert settings_path.read_bytes() == raw_content
