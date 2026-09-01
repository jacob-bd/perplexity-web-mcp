"""Comprehensive tests for the token_store module.

Test categories:
1. save_token - success, filesystem error
2. load_token - file priority, env fallback, neither, whitespace, empty file
3. get_token_or_raise - success, raises when no token
"""

from __future__ import annotations

import os
from pathlib import Path

import pytest

from perplexity_web_mcp import token_store


@pytest.fixture
def patch_paths(monkeypatch, tmp_path):
    """Point token_store to tmp_path so tests don't touch real config."""
    config_dir = tmp_path / "config"
    monkeypatch.setattr(token_store, "CONFIG_DIR", config_dir)
    monkeypatch.setattr(token_store, "TOKEN_FILE", config_dir / "token")
    return config_dir


@pytest.fixture
def patch_environ(monkeypatch):
    """Isolate env var tests from real environment."""
    env = {}
    monkeypatch.setattr(token_store, "environ", env)
    return env


# ============================================================================
# 1. save_token
# ============================================================================


class TestSaveToken:
    """Test save_token behavior."""

    def test_saves_to_file_sets_env_returns_true(self, patch_paths, patch_environ) -> None:
        """save_token writes to file, sets env var, returns True."""
        token = "sk-test-token-12345"
        result = token_store.save_token(token)

        assert result is True
        assert patch_paths.exists()
        assert (patch_paths / "token").read_text() == token
        assert patch_environ[token_store.ENV_KEY] == token

    def test_secure_creation_uses_exclusive_owner_only_temporary_file(
        self, patch_paths, patch_environ, monkeypatch
    ) -> None:
        """The token is private from creation, before it becomes the final file."""
        original_open = token_store.os.open
        observed: list[tuple[Path, int, int]] = []

        def observing_open(path, flags, mode=0o777):
            observed.append((Path(path), flags, mode))
            return original_open(path, flags, mode)

        monkeypatch.setattr(token_store.os, "open", observing_open)

        assert token_store.save_token("secret-token") is True

        assert len(observed) == 1
        temporary, flags, mode = observed[0]
        assert temporary.parent == patch_paths
        assert temporary.name.startswith(".token.")
        assert flags & os.O_CREAT
        assert flags & os.O_EXCL
        assert mode == 0o600
        assert token_store.TOKEN_FILE.read_text(encoding="utf-8") == "secret-token"
        assert list(patch_paths.glob(".token.*.tmp")) == []

    def test_returns_false_on_filesystem_error(self, monkeypatch, tmp_path) -> None:
        """save_token returns False when filesystem operations fail."""
        config_dir = tmp_path / "config"
        token_file = config_dir / "token"
        monkeypatch.setattr(token_store, "CONFIG_DIR", config_dir)
        monkeypatch.setattr(token_store, "TOKEN_FILE", token_file)

        # Mock mkdir to raise and simulate filesystem error
        def failing_mkdir(*args, **kwargs):
            raise OSError(13, "Permission denied")

        monkeypatch.setattr(Path, "mkdir", failing_mkdir)

        result = token_store.save_token("sk-token")

        assert result is False


# ============================================================================
# 2. load_token
# ============================================================================


class TestLoadToken:
    """Test load_token behavior."""

    def test_file_priority_over_env(self, patch_paths, patch_environ) -> None:
        """load_token prefers file over env var when both exist."""
        file_token = "token-from-file"
        env_token = "token-from-env"

        patch_paths.mkdir(parents=True)
        token_store.TOKEN_FILE.write_text(file_token, encoding="utf-8")
        patch_environ[token_store.ENV_KEY] = env_token

        result = token_store.load_token()

        assert result == file_token

    def test_falls_back_to_env_when_no_file(self, patch_paths, patch_environ) -> None:
        """load_token uses env var when token file does not exist."""
        env_token = "token-from-env"
        patch_environ[token_store.ENV_KEY] = env_token

        result = token_store.load_token()

        assert result == env_token

    def test_returns_none_when_neither_exists(self, patch_paths, patch_environ) -> None:
        """load_token returns None when no file and no env var."""
        assert token_store.load_token() is None

    def test_strips_whitespace_from_file(self, patch_paths, patch_environ) -> None:
        """load_token strips leading/trailing whitespace from token file."""
        raw = "  sk-token-with-whitespace  \n"
        patch_paths.mkdir(parents=True)
        token_store.TOKEN_FILE.write_text(raw, encoding="utf-8")

        result = token_store.load_token()

        assert result == "sk-token-with-whitespace"

    def test_returns_none_for_empty_file(self, patch_paths, patch_environ) -> None:
        """load_token returns None when file exists but is empty or only whitespace."""
        patch_paths.mkdir(parents=True)
        token_store.TOKEN_FILE.write_text("", encoding="utf-8")

        result = token_store.load_token()

        assert result is None

    def test_returns_none_for_whitespace_only_file(self, patch_paths, patch_environ) -> None:
        """load_token returns None when file contains only whitespace."""
        patch_paths.mkdir(parents=True)
        token_store.TOKEN_FILE.write_text("   \n\t  ", encoding="utf-8")

        result = token_store.load_token()

        assert result is None


# ============================================================================
# 3. get_token_or_raise
# ============================================================================


class TestGetTokenOrRaise:
    """Test get_token_or_raise behavior."""

    def test_returns_token_when_available(self, patch_paths, patch_environ) -> None:
        """get_token_or_raise returns token when load_token finds one."""
        token = "sk-available-token"
        patch_paths.mkdir(parents=True)
        token_store.TOKEN_FILE.write_text(token, encoding="utf-8")

        result = token_store.get_token_or_raise()

        assert result == token

    def test_raises_value_error_when_no_token(self, patch_paths, patch_environ) -> None:
        """get_token_or_raise raises ValueError when no token found."""
        with pytest.raises(ValueError) as exc_info:
            token_store.get_token_or_raise()

        err = exc_info.value
        assert "No Perplexity session token found" in str(err)
        assert "pwm-auth" in str(err) or "pplx_auth" in str(err)
