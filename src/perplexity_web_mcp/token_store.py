"""Token storage for Perplexity session tokens.

Stores tokens in ~/.config/perplexity-web-mcp/token for persistent access
across all invocations (CLI, MCP server, API server).
"""

from __future__ import annotations

import logging
import os
from os import environ
from pathlib import Path
import secrets


# Use stdlib logging to avoid circular import with .logging module
_logger = logging.getLogger(__name__)

CONFIG_DIR = Path.home() / ".config" / "perplexity-web-mcp"
TOKEN_FILE = CONFIG_DIR / "token"
ENV_KEY = "PERPLEXITY_SESSION_TOKEN"


def _secure_replace_text(path: Path, text: str) -> None:
    """Atomically replace *path* using a file created with mode 0600.

    Creating a private temporary file before the atomic replace avoids the
    write-then-chmod window in which another local user could read a newly
    created token file.
    """
    temporary = path.with_name(f".{path.name}.{secrets.token_hex(8)}.tmp")
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL
    if hasattr(os, "O_BINARY"):
        flags |= os.O_BINARY

    descriptor: int | None = None
    try:
        descriptor = os.open(temporary, flags, 0o600)
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="") as handle:
            descriptor = None
            handle.write(text)
            handle.flush()
            os.fsync(handle.fileno())
        temporary.replace(path)
        # Windows maps chmod to its limited read-only ACL model; on POSIX this
        # also repairs permissions when replacing a token created by old versions.
        path.chmod(0o600)
    finally:
        if descriptor is not None:
            os.close(descriptor)
        try:
            temporary.unlink(missing_ok=True)
        except OSError:
            pass


def save_token(token: str) -> bool:
    """Save token to config directory and update environment.

    Also sets the environment variable for the current process
    to ensure the new token is used immediately.

    Returns True if successful, False otherwise.
    """
    try:
        CONFIG_DIR.mkdir(mode=0o700, parents=True, exist_ok=True)
        _secure_replace_text(TOKEN_FILE, token)
        # Also update environment so current process uses new token
        environ[ENV_KEY] = token
        return True
    except Exception as exc:
        _logger.warning(f"Failed to save token to {TOKEN_FILE}: {exc}")
        return False


def load_token() -> str | None:
    """Load token from config directory or environment.

    Priority:
    1. ~/.config/perplexity-web-mcp/token file (source of truth, updated by auth)
    2. PERPLEXITY_SESSION_TOKEN environment variable (fallback)

    Returns token string or None if not found.
    """
    # Config file takes priority (it's updated by auth tools)
    try:
        if TOKEN_FILE.exists():
            token = TOKEN_FILE.read_text(encoding="utf-8").strip()
            if token:
                return token
    except Exception as exc:
        _logger.debug(f"Could not read token file {TOKEN_FILE}: {exc}")

    # Fall back to environment variable
    env_token = environ.get(ENV_KEY)
    if env_token:
        return env_token

    return None


def get_token_or_raise() -> str:
    """Load token or raise ValueError with helpful message."""
    token = load_token()
    if not token:
        raise ValueError(
            "No Perplexity session token found. "
            "To authenticate via MCP tools: "
            "1) Call pplx_auth_request_code with your email, "
            "2) Check email for 6-digit code, "
            "3) Call pplx_auth_complete with email and code. "
            "Or run 'pwm-auth' CLI command."
        )
    return token
