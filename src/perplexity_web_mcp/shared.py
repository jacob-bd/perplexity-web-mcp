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
from .router import Intent, SmartResponse, SmartRouter
from .token_store import get_token_or_raise, load_token


if TYPE_CHECKING:
    from .types import SearchResultItem


# ---------------------------------------------------------------------------
# Model and source focus mappings (single source of truth)
# ---------------------------------------------------------------------------

SOURCE_FOCUS_MAP: dict[str, list[SourceFocus]] = {
    "none": [],
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
    "gpt54": (Models.GPT_54, Models.GPT_54_THINKING),
    "claude_sonnet": (Models.CLAUDE_46_SONNET, Models.CLAUDE_46_SONNET_THINKING),
    "claude_opus": (Models.CLAUDE_46_OPUS, Models.CLAUDE_46_OPUS_THINKING),
    "gemini_pro": (Models.GEMINI_31_PRO_THINKING, Models.GEMINI_31_PRO_THINKING),
    "nemotron": (Models.NEMOTRON_3_SUPER, Models.NEMOTRON_3_SUPER),
}

SourceFocusName = Literal["none", "web", "academic", "social", "finance", "all"]
ModelName = Literal[
    "auto", "sonar", "deep_research", "gpt54", "claude_sonnet",
    "claude_opus", "gemini_pro", "nemotron",
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


def reset_client() -> None:
    """Invalidate the cached client so the next get_client() re-reads the token file."""
    global _client, _client_token  # noqa: PLW0603

    with _client_lock:
        if _client is not None:
            try:
                _client.close()
            except Exception:
                pass
        _client = None
        _client_token = None


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

def _execute_query(
    query: str, model: Model, sources: list[SourceFocus],
    search_focus: SearchFocus = SearchFocus.WEB,
) -> tuple[str, list[SearchResultItem]]:
    """Run a single query attempt. Returns (answer_text, search_results).

    Raises AuthenticationError, RateLimitError, or other exceptions on failure.
    """
    client = get_client()
    conversation = client.create_conversation(
        ConversationConfig(
            model=model,
            citation_mode=CitationMode.DEFAULT,
            search_focus=search_focus,
            source_focus=sources,
        )
    )
    conversation.ask(query)

    cache = get_limit_cache()
    if cache:
        cache.invalidate_rate_limits()

    answer = conversation.answer or "No answer received"
    return answer, conversation.search_results or []


_MODEL_DISPLAY_NAMES: dict[str, str] = {
    model.identifier: name
    for name, (base, thinking) in MODEL_MAP.items()
    for model in ([base] if thinking is None else [base, thinking])
}


def _format_quota_footer(model: Model) -> str:
    """Build a compact quota footer showing remaining limits after a query."""
    cache = get_limit_cache()
    if cache is None:
        return ""

    limits = cache.get_rate_limits()
    if limits is None:
        return ""

    model_label = _MODEL_DISPLAY_NAMES.get(model.identifier, model.identifier)
    is_research = is_research_model(model)
    cost_label = "Deep Research" if is_research else "Pro Search"

    parts = [
        f"\n\n---\n[Quota] Used 1 {cost_label} query ({model_label})",
        f" | Pro: {limits.remaining_pro} left",
        f" | Research: {limits.remaining_research} left",
    ]

    pro_max = 300
    if limits.remaining_pro > 0 and limits.remaining_pro / pro_max < 0.20:
        parts.append(
            " | WARNING: Pro quota running low"
            " — prefer pplx_smart_query(intent='quick') or pplx_sonar for simple lookups"
        )
    elif limits.remaining_pro <= 0:
        parts.append(
            " | EXHAUSTED: Use pplx_smart_query(intent='quick') or pplx_sonar to avoid failures"
        )

    return "".join(parts)


def ask(query: str, model: Model, source_focus: SourceFocusName = "web") -> str:
    """Execute a query with a specific model.

    Returns the answer text with citations appended.
    Raises AuthenticationError or RateLimitError on auth/rate-limit failures
    so MCP servers can signal isError:true to clients.
    """
    from .exceptions import AuthenticationError, RateLimitError

    limit_error = check_limits_before_query(model)
    if limit_error:
        return limit_error

    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])
    search_mode = SearchFocus.WRITING if source_focus == "none" else SearchFocus.WEB

    try:
        answer, search_results = _execute_query(query, model, sources, search_mode)
    except AuthenticationError:
        old_token = _client_token
        reset_client()
        new_token = load_token()
        if new_token and new_token != old_token:
            try:
                answer, search_results = _execute_query(query, model, sources, search_mode)
            except (AuthenticationError, RateLimitError) as retry_err:
                raise type(retry_err)(_format_error(retry_err)) from retry_err
            except Exception as retry_err:
                return _format_error(retry_err)
        else:
            raise
    except RateLimitError:
        raise
    except Exception as error:
        return _format_error(error)

    response_parts = [answer]
    if search_results:
        response_parts.append("\n\nCitations:")
        for i, result in enumerate(search_results, 1):
            url = result.url or ""
            response_parts.append(f"\n[{i}]: {url}")

    response_parts.append(_format_quota_footer(model))

    return "".join(response_parts)


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


# ---------------------------------------------------------------------------
# Smart ask (quota-aware routing)
# ---------------------------------------------------------------------------

_router = SmartRouter()


def smart_ask(
    query: str,
    intent: str = "standard",
    source_focus: SourceFocusName = "web",
) -> SmartResponse:
    """Execute a query with automatic quota-aware model routing.

    Unlike ask(), which requires an explicit model, smart_ask() picks the
    best model for the given *intent* based on current rate limits.
    Raises AuthenticationError or RateLimitError so MCP servers can signal
    isError:true to clients.
    """
    from .exceptions import AuthenticationError, RateLimitError

    cache = get_limit_cache()
    limits = cache.get_rate_limits() if cache else None

    try:
        parsed_intent = Intent(intent)
    except ValueError:
        parsed_intent = Intent.STANDARD

    decision = _router.route(parsed_intent, limits)
    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])
    search_mode = SearchFocus.WRITING if source_focus == "none" else SearchFocus.WEB

    try:
        answer, search_results = _execute_query(query, decision.model, sources, search_mode)
    except AuthenticationError:
        old_token = _client_token
        reset_client()
        new_token = load_token()
        if new_token and new_token != old_token:
            try:
                answer, search_results = _execute_query(query, decision.model, sources, search_mode)
            except (AuthenticationError, RateLimitError) as retry_err:
                raise type(retry_err)(_format_error(retry_err)) from retry_err
            except Exception as retry_err:
                return SmartResponse(
                    answer=_format_error(retry_err), citations=[], routing=decision
                )
        else:
            raise
    except RateLimitError:
        raise
    except Exception as error:
        return SmartResponse(
            answer=_format_error(error), citations=[], routing=decision
        )

    citations = [r.url or "" for r in search_results]
    return SmartResponse(answer=answer, citations=citations, routing=decision)


# ---------------------------------------------------------------------------
# Council ask (multi-model parallel query with synthesis)
# ---------------------------------------------------------------------------

def council_ask(
    query: str,
    models: list[tuple[str, Model]] | None = None,
    source_focus: SourceFocusName = "web",
    synthesize: bool = True,
) -> "CouncilResponse":
    """Query multiple models in parallel and optionally synthesize results.

    Each council member model is queried concurrently. A free Sonar query
    then synthesizes the responses into a consensus answer highlighting
    agreements and disagreements.

    Args:
        query: The question to ask all models.
        models: List of (display_name, Model) tuples. Defaults to
                GPT-5.4, Claude Opus 4.6, and Gemini 3.1 Pro.
        source_focus: Source focus for all queries.
        synthesize: Whether to run Sonar synthesis (free, no Pro cost).

    Returns:
        CouncilResponse with individual results and optional synthesis.
    """
    from .council import CouncilResponse, council_ask as _council_ask

    return _council_ask(
        query=query,
        models=models,
        source_focus=source_focus,
        synthesize=synthesize,
    )
