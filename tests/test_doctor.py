"""Tests for the doctor command (cli/doctor.py).

All external dependencies (token, auth, network, filesystem) are mocked.

Note: doctor.py uses late imports inside cmd_doctor(), so we patch
at the actual source modules, not at doctor module level.
"""

from __future__ import annotations

from unittest.mock import MagicMock, patch
from unittest.mock import MagicMock as _MagicMock  # AITool removed, using mock

import pytest

from perplexity_web_mcp.cli.doctor import cmd_doctor
from perplexity_web_mcp.rate_limits import RateLimits


def _base_patches():
    """Return a dict of common patches for doctor tests."""
    return {
        "perplexity_web_mcp.cli.doctor.load_token": "valid-token-12345678901",
        "perplexity_web_mcp.cli.doctor.shutil.which": "/usr/local/bin/pwm",
    }


# ============================================================================
# 1. Full doctor run (all green)
# ============================================================================


class TestDoctorAllGreen:
    """Test doctor with everything healthy."""

    @patch("perplexity_web_mcp.cli.doctor.TOKEN_FILE")
    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value="valid-token-12345678901")
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.auth.get_user_info")
    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    @patch("perplexity_web_mcp.cli.setup._get_tools", return_value=[])
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_all_green_path(
        self,
        mock_targets,
        mock_tools,
        mock_limits,
        mock_user,
        mock_which,
        mock_token,
        mock_file,
        capsys: pytest.CaptureFixture,
    ) -> None:
        mock_file.exists.return_value = True

        mock_user_info = MagicMock()
        mock_user_info.email = "test@example.com"
        mock_user_info.tier_display = "Pro"
        mock_user.return_value = mock_user_info

        mock_limits.return_value = RateLimits(
            remaining_pro=100, remaining_research=5, remaining_labs=10, remaining_agentic_research=3
        )

        code = cmd_doctor([])
        out = capsys.readouterr().out
        assert "Perplexity Web MCP Doctor" in out
        assert "test@example.com" in out
        assert "100 remaining" in out


# ============================================================================
# 2. No token
# ============================================================================


class TestDoctorNoToken:
    """Test doctor when not authenticated."""

    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value=None)
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.setup._get_tools", return_value=[])
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_no_token_shows_error(
        self,
        mock_targets,
        mock_tools,
        mock_which,
        mock_token,
        capsys: pytest.CaptureFixture,
    ) -> None:
        code = cmd_doctor([])
        out = capsys.readouterr().out
        assert "not found" in out
        assert "pwm login" in out


# ============================================================================
# 3. Expired token
# ============================================================================


class TestDoctorExpiredToken:
    """Test doctor when token is invalid."""

    @patch("perplexity_web_mcp.cli.doctor.TOKEN_FILE")
    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value="expired-token-12345678901")
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.auth.get_user_info", return_value=None)
    @patch("perplexity_web_mcp.cli.setup._get_tools", return_value=[])
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_expired_token(
        self,
        mock_targets,
        mock_tools,
        mock_user,
        mock_which,
        mock_token,
        mock_file,
        capsys: pytest.CaptureFixture,
    ) -> None:
        mock_file.exists.return_value = True
        code = cmd_doctor([])
        out = capsys.readouterr().out
        assert "invalid or expired" in out


# ============================================================================
# 4. Rate limits exhausted
# ============================================================================


class TestDoctorLimitsExhausted:
    """Test doctor when rate limits are at zero."""

    @patch("perplexity_web_mcp.cli.doctor.TOKEN_FILE")
    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value="valid-token-12345678901")
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.auth.get_user_info")
    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    @patch("perplexity_web_mcp.cli.setup._get_tools", return_value=[])
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_zero_pro_search(
        self,
        mock_targets,
        mock_tools,
        mock_limits,
        mock_user,
        mock_which,
        mock_token,
        mock_file,
        capsys: pytest.CaptureFixture,
    ) -> None:
        mock_file.exists.return_value = True

        mock_user_info = MagicMock()
        mock_user_info.email = "test@example.com"
        mock_user_info.tier_display = "Pro"
        mock_user.return_value = mock_user_info

        mock_limits.return_value = RateLimits(remaining_pro=0, remaining_research=0)

        code = cmd_doctor([])
        out = capsys.readouterr().out
        assert "0 remaining" in out


# ============================================================================
# 5. MCP not configured
# ============================================================================


class TestDoctorMCPNotConfigured:
    """Test doctor shows setup suggestions for unconfigured tools."""

    @patch("perplexity_web_mcp.cli.doctor.TOKEN_FILE")
    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value="valid-token-12345678901")
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.auth.get_user_info")
    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    @patch("perplexity_web_mcp.cli.setup._get_tools")
    @patch("perplexity_web_mcp.cli.setup._is_configured_compat", return_value=False)
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_shows_setup_suggestions(
        self,
        mock_targets,
        mock_is_conf,
        mock_tools,
        mock_limits,
        mock_user,
        mock_which,
        mock_token,
        mock_file,
        capsys: pytest.CaptureFixture,
    ) -> None:
        mock_file.exists.return_value = True

        mock_user_info = MagicMock()
        mock_user_info.email = "t@e.com"
        mock_user_info.tier_display = "Pro"
        mock_user.return_value = mock_user_info

        mock_limits.return_value = RateLimits(remaining_pro=100)

        tool_mock = _MagicMock()
        tool_mock.name = "cursor"
        mock_tools.return_value = [tool_mock]

        code = cmd_doctor([])
        out = capsys.readouterr().out
        assert "pwm setup add cursor" in out


# ============================================================================
# 6. Verbose mode
# ============================================================================


class TestDoctorVerbose:
    """Test doctor -v shows extra info."""

    @patch("perplexity_web_mcp.cli.doctor.TOKEN_FILE")
    @patch("perplexity_web_mcp.cli.doctor.load_token", return_value="valid-token-12345678901")
    @patch("perplexity_web_mcp.cli.doctor.shutil.which", return_value="/usr/local/bin/pwm")
    @patch("perplexity_web_mcp.cli.auth.get_user_info")
    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    @patch("perplexity_web_mcp.cli.setup._get_tools", return_value=[])
    @patch("perplexity_web_mcp.cli.skill._get_targets", return_value=[])
    def test_verbose_shows_security(
        self,
        mock_targets,
        mock_tools,
        mock_limits,
        mock_user,
        mock_which,
        mock_token,
        mock_file,
        capsys: pytest.CaptureFixture,
    ) -> None:
        mock_file.exists.return_value = True
        mock_stat = MagicMock()
        mock_stat.st_mode = 0o100600
        mock_file.stat.return_value = mock_stat

        mock_user_info = MagicMock()
        mock_user_info.email = "t@e.com"
        mock_user_info.tier_display = "Pro"
        mock_user.return_value = mock_user_info

        mock_limits.return_value = RateLimits(remaining_pro=100)

        code = cmd_doctor(["-v"])
        out = capsys.readouterr().out
        assert "Security" in out
        assert "Token permissions" in out
        assert "Environment" in out
        assert "Python" in out
        assert "curl-cffi" in out
        assert "Proxy env" in out
        assert "Debug env" in out
