"""Token storage for Perplexity session tokens.

Stores tokens in ~/.config/perplexity-web-mcp/token for persistent access
across all invocations (CLI, MCP server, API server).
"""

from __future__ import annotations

from os import environ
from pathlib import Path

CONFIG_DIR = Path.home() / ".config" / "perplexity-web-mcp"
TOKEN_FILE = CONFIG_DIR / "token"
ENV_KEY = "PERPLEXITY_SESSION_TOKEN"


def save_token(token: str) -> bool:
    """Save token to config directory.
    
    Returns True if successful, False otherwise.
    """
    try:
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        TOKEN_FILE.write_text(token, encoding="utf-8")
        # Restrict permissions (owner read/write only)
        TOKEN_FILE.chmod(0o600)
        return True
    except Exception:
        return False


def load_token() -> str | None:
    """Load token from config directory or environment.
    
    Priority:
    1. PERPLEXITY_SESSION_TOKEN environment variable
    2. ~/.config/perplexity-web-mcp/token file
    
    Returns token string or None if not found.
    """
    # Environment variable takes priority
    env_token = environ.get(ENV_KEY)
    if env_token:
        return env_token
    
    # Fall back to config file
    try:
        if TOKEN_FILE.exists():
            token = TOKEN_FILE.read_text(encoding="utf-8").strip()
            if token:
                return token
    except Exception:
        pass
    
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
