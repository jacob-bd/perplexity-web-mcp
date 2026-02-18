"""Shared query logic for both CLI and MCP server.

This module is the single source of truth for model mappings, source focus
mappings, client management, rate limit checking, and the core ask() function.
Both the MCP server (mcp/server.py) and CLI (cli/main.py) import from here.
"""

from __future__ import annotations

from threading import Lock
from typing import TYPE_CHECKING, Any, Literal

from .config import ClientConfig, ConversationConfig
from .core import Perplexity
from .enums import CitationMode, SearchFocus, SourceFocus
from .models import Model, Models
from .rate_limits import RateLimitCache
from .token_store import get_token_or_raise, load_token


if TYPE_CHECKING:
    from .types import SearchResultItem


# ---------------------------------------------------------------------------
# Model and source focus mappings (single source of truth)
# ---------------------------------------------------------------------------

SOURCE_FOCUS_MAP: dict[str, list[SourceFocus]] = {
    "web": [SourceFocus.WEB],
    "academic": [SourceFocus.ACADEMIC],
    "social": [SourceFocus.SOCIAL],
    "finance": [SourceFocus.FINANCE],
    "all": [SourceFocus.WEB, SourceFocus.ACADEMIC, SourceFocus.SOCIAL],
}

MODEL_MAP: dict[str, tuple[Model, Model | None]] = {
    # (base_model, thinking_model) - None if no thinking variant
    "auto": (Models.BEST, None),
    "sonar": (Models.SONAR, None),
    "deep_research": (Models.DEEP_RESEARCH, None),
    "gpt52": (Models.GPT_52, Models.GPT_52_THINKING),
    "claude_sonnet": (Models.CLAUDE_46_SONNET, Models.CLAUDE_46_SONNET_THINKING),
    "claude_opus": (Models.CLAUDE_46_OPUS, Models.CLAUDE_46_OPUS_THINKING),
    "gemini_flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    "gemini_pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),
    "grok": (Models.GROK_41, Models.GROK_41_THINKING),
    "kimi": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),
}

SourceFocusName = Literal["web", "academic", "social", "finance", "all"]
ModelName = Literal[
    "auto", "sonar", "deep_research", "gpt52", "claude_sonnet",
    "claude_opus", "gemini_flash", "gemini_pro", "grok", "kimi",
]

MODEL_NAMES: list[str] = list(MODEL_MAP.keys())
SOURCE_FOCUS_NAMES: list[str] = list(SOURCE_FOCUS_MAP.keys())


def resolve_model(name: str, thinking: bool = False) -> Model:
    """Resolve a model name string to a Model instance.

    Args:
        name: Model name key (e.g. "gpt52", "claude_sonnet").
        thinking: Whether to use the thinking variant if available.

    Returns:
        The resolved Model. Falls back to Models.BEST for unknown names.
    """
    model_tuple = MODEL_MAP.get(name, (Models.BEST, None))
    base_model, thinking_model = model_tuple
    return thinking_model if thinking and thinking_model else base_model


# ---------------------------------------------------------------------------
# Cached Perplexity client (thread-safe, recreated on token change)
# ---------------------------------------------------------------------------

_client: Perplexity | None = None
_client_token: str | None = None
_client_lock = Lock()


def get_client() -> Perplexity:
    """Get or create a cached Perplexity client.

    The client is cached and reused across requests. It is automatically
    recreated when the token changes (e.g. after re-authentication).
    """
    global _client, _client_token  # noqa: PLW0603

    token = get_token_or_raise()
    with _client_lock:
        if _client is None or _client_token != token:
            if _client is not None:
                try:
                    _client.close()
                except Exception:
                    pass
            config = ClientConfig(
                rotate_fingerprint=False,
                requests_per_second=0,
            )
            _client = Perplexity(token, config=config)
            _client_token = token
        return _client


# ---------------------------------------------------------------------------
# Rate limit cache (thread-safe, persistent across requests)
# ---------------------------------------------------------------------------

_limit_cache: RateLimitCache | None = None
_limit_cache_token: str | None = None
_limit_cache_lock = Lock()


def get_limit_cache() -> RateLimitCache | None:
    """Get or create the rate limit cache for the current token."""
    global _limit_cache, _limit_cache_token  # noqa: PLW0603

    token = load_token()
    if not token:
        return None

    with _limit_cache_lock:
        if _limit_cache is None or _limit_cache_token != token:
            _limit_cache = RateLimitCache(token)
            _limit_cache_token = token
        return _limit_cache


def is_research_model(model: Model) -> bool:
    """Check if the model is Deep Research (uses research quota)."""
    return model is Models.DEEP_RESEARCH


def check_limits_before_query(model: Model) -> str | None:
    """Check rate limits before executing a query.

    Returns an error message string if limits are exceeded, None if OK.
    Does not block the query on cache miss / fetch failure (fail-open).
    """
    cache = get_limit_cache()
    if cache is None:
        return None

    limits = cache.get_rate_limits()
    if limits is None:
        return None

    if is_research_model(model):
        if not limits.has_research_queries:
            return (
                f"LIMIT REACHED: Deep Research queries exhausted "
                f"(0 remaining).\n\n"
                f"Current usage:\n{limits.format_summary()}\n\n"
                f"Deep Research limits reset monthly. "
                f"Use a standard model for Pro Search instead."
            )
    elif not limits.has_pro_queries:
        return (
            f"LIMIT REACHED: Pro Search queries exhausted "
            f"(0 remaining).\n\n"
            f"Current usage:\n{limits.format_summary()}\n\n"
            f"Pro Search limits reset weekly. "
            f"Consider waiting or upgrading your plan."
        )

    return None


def get_limit_context_for_error() -> str:
    """Get rate limit context to include in error messages."""
    cache = get_limit_cache()
    if cache is None:
        return ""

    limits = cache.get_rate_limits()
    if limits is None:
        return ""

    return f"\nCurrent usage:\n{limits.format_summary()}\n"


# ---------------------------------------------------------------------------
# Core ask function (shared by MCP and CLI)
# ---------------------------------------------------------------------------

def ask(query: str, model: Model, source_focus: SourceFocusName = "web") -> str:
    """Execute a query with a specific model.

    Returns the answer text with citations appended, or an error message.
    This is the single implementation used by both MCP tools and CLI commands.
    """
    limit_error = check_limits_before_query(model)
    if limit_error:
        return limit_error

    client = get_client()
    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])

    try:
        conversation = client.create_conversation(
            ConversationConfig(
                model=model,
                citation_mode=CitationMode.DEFAULT,
                search_focus=SearchFocus.WEB,
                source_focus=sources,
            )
        )

        conversation.ask(query)

        cache = get_limit_cache()
        if cache:
            cache.invalidate_rate_limits()

        answer = conversation.answer or "No answer received"

        response_parts = [answer]

        if conversation.search_results:
            response_parts.append("\n\nCitations:")
            for i, result in enumerate(conversation.search_results, 1):
                url = result.url or ""
                response_parts.append(f"\n[{i}]: {url}")

        return "".join(response_parts)

    except Exception as error:
        return _format_error(error)


def _format_error(error: Exception) -> str:
    """Format an error from a query into a human-readable message."""
    error_str = str(error)
    error_type = type(error).__name__
    is_rate_limit = "429" in error_str or "rate limit" in error_str.lower()
    is_auth_error = "403" in error_str or "forbidden" in error_str.lower()

    if is_rate_limit:
        cache = get_limit_cache()
        if cache:
            cache.invalidate_rate_limits()

    token_status = ""
    if is_auth_error or is_rate_limit:
        from .cli.auth import get_user_info

        token = load_token()
        if not token:
            token_status = "No token found"
        else:
            user_info = get_user_info(token)
            if user_info:
                token_status = f"Token valid for {user_info.email}"
            else:
                token_status = "Token exists but invalid"

    limit_context = get_limit_context_for_error()

    if is_rate_limit:
        return (
            f"Error: Rate limit exceeded (429).\n\n"
            f"Token status: {token_status}\n"
            f"{limit_context}\n"
            f"Wait a few minutes before retrying."
        )

    if is_auth_error:
        return (
            f"Error: Access forbidden (403).\n\n"
            f"Token status: {token_status}\n"
            f"Error type: {error_type}\n"
            f"Error details: {error_str}\n"
            f"{limit_context}\n"
            f"Re-authenticate with: pwm login\n"
            f"Or via MCP: pplx_auth_request_code -> pplx_auth_complete"
        )
    return f"Error ({error_type}): {error_str}"
