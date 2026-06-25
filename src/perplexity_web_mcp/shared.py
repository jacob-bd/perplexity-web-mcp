"""Shared query logic for both CLI and MCP server.

This module is the single source of truth for model mappings, source focus
mappings, client management, rate limit checking, and the core ask() function.
Both the MCP server (mcp/server.py) and CLI (cli/main.py) import from here.
"""

from __future__ import annotations

from dataclasses import dataclass
from os import environ
from threading import Lock
from typing import TYPE_CHECKING, Literal
from uuid import uuid4

from .config import ClientConfig, ConversationConfig
from .core import Perplexity
from .enums import CitationMode, LogLevel, SearchFocus, SourceFocus
from .models import Model, Models
from .rate_limits import RateLimitCache
from .router import Intent, SmartResponse, SmartRouter
from .sessions import SessionStore
from .token_store import get_token_or_raise, load_token


if TYPE_CHECKING:
    from .council import CouncilResponse
    from .types import SearchResultItem


# ---------------------------------------------------------------------------
# Model and source focus mappings (single source of truth)
# ---------------------------------------------------------------------------

SubscriptionMinimumTier = Literal["free", "pro", "max"]


@dataclass(frozen=True, slots=True)
class ModelDefinition:
    """Metadata and model instances for one user-facing model key."""

    base_model: Model
    thinking_model: Model | None
    display_name: str
    provider: str
    minimum_tier: SubscriptionMinimumTier = "pro"
    council_eligible: bool = True

SOURCE_FOCUS_MAP: dict[str, list[SourceFocus]] = {
    "none": [],
    "web": [SourceFocus.WEB],
    "academic": [SourceFocus.ACADEMIC],
    "social": [SourceFocus.SOCIAL],
    "finance": [SourceFocus.FINANCE],
    "all": [SourceFocus.WEB, SourceFocus.ACADEMIC, SourceFocus.SOCIAL],
}

MODEL_METADATA: dict[str, ModelDefinition] = {
    "auto": ModelDefinition(Models.BEST, None, "Auto (Best)", "Perplexity", council_eligible=False),
    "sonar": ModelDefinition(Models.SONAR, None, "Sonar 2", "Perplexity"),
    "deep_research": ModelDefinition(
        Models.DEEP_RESEARCH,
        None,
        "Deep Research",
        "Perplexity",
        council_eligible=False,
    ),
    "gpt54": ModelDefinition(Models.GPT_54, Models.GPT_54_THINKING, "GPT-5.4", "OpenAI"),
    "gpt55": ModelDefinition(Models.GPT_55, Models.GPT_55_THINKING, "GPT-5.5", "OpenAI", minimum_tier="max"),
    "claude_sonnet": ModelDefinition(
        Models.CLAUDE_46_SONNET,
        Models.CLAUDE_46_SONNET_THINKING,
        "Claude Sonnet 4.6",
        "Anthropic",
    ),
    "claude_opus": ModelDefinition(
        Models.CLAUDE_48_OPUS,
        Models.CLAUDE_48_OPUS_THINKING,
        "Claude Opus 4.8",
        "Anthropic",
        minimum_tier="max",
    ),
    "gemini_pro": ModelDefinition(
        Models.GEMINI_31_PRO_THINKING,
        Models.GEMINI_31_PRO_THINKING,
        "Gemini 3.1 Pro",
        "Google",
    ),
    "nemotron": ModelDefinition(
        Models.NEMOTRON_3_ULTRA,
        Models.NEMOTRON_3_ULTRA,
        "Nemotron 3 Ultra",
        "NVIDIA",
    ),
    "kimi_k26": ModelDefinition(Models.KIMI_K2_6, Models.KIMI_K2_6_THINKING, "Kimi K2.6", "Moonshot"),
}
"""User-facing model metadata. Update this table when model names or tier availability changes."""

MODEL_MAP: dict[str, tuple[Model, Model | None]] = {
    name: (definition.base_model, definition.thinking_model) for name, definition in MODEL_METADATA.items()
}

SourceFocusName = Literal["none", "web", "academic", "social", "finance", "all"]
ModelName = Literal[
    "auto",
    "sonar",
    "deep_research",
    "gpt54",
    "gpt55",
    "claude_sonnet",
    "claude_opus",
    "gemini_pro",
    "nemotron",
    "kimi_k26",
]

MODEL_NAMES: list[str] = list(MODEL_MAP.keys())
SOURCE_FOCUS_NAMES: list[str] = list(SOURCE_FOCUS_MAP.keys())

COUNCIL_DISPLAY_NAMES: dict[str, str] = {
    name: definition.display_name for name, definition in MODEL_METADATA.items()
}

THINKING_TOGGLEABLE: frozenset[str] = frozenset(
    name for name, (base, thinking) in MODEL_MAP.items() if thinking is not None and thinking is not base
)

MAX_ONLY_MODEL_NAMES: frozenset[str] = frozenset(
    name for name, definition in MODEL_METADATA.items() if definition.minimum_tier == "max"
)

COUNCIL_ELIGIBLE_MODEL_NAMES: tuple[str, ...] = tuple(
    name for name, definition in MODEL_METADATA.items() if definition.council_eligible
)

COUNCIL_DEFAULT_MODEL_NAMES: tuple[str, ...] = ("gpt54", "claude_sonnet", "gemini_pro")
COUNCIL_DEFAULT_MODELS_STR = ",".join(COUNCIL_DEFAULT_MODEL_NAMES)


def build_council_model_list(
    model_names: tuple[str, ...] | list[str],
    thinking: bool = False,
) -> list[tuple[str, Model]]:
    """Build display/model pairs for council execution from model metadata."""
    model_list: list[tuple[str, Model]] = []
    for name in model_names:
        resolved = resolve_model(name, thinking=thinking)
        display = COUNCIL_DISPLAY_NAMES.get(name, name)
        if thinking and name in THINKING_TOGGLEABLE:
            display += " Thinking"
        model_list.append((display, resolved))
    return model_list


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


def _shared_client_config_from_env() -> ClientConfig:
    """Build shared CLI/MCP client config from supported environment variables."""

    log_level_raw = environ.get("LOG_LEVEL", "").strip().upper()
    pwm_debug = environ.get("PWM_DEBUG", "").strip().lower()

    logging_level = LogLevel.DISABLED
    if pwm_debug in {"1", "true", "yes", "on"}:
        logging_level = LogLevel.DEBUG
    elif log_level_raw:
        try:
            logging_level = LogLevel(log_level_raw)
        except ValueError:
            logging_level = LogLevel.DISABLED

    return ClientConfig(
        rotate_fingerprint=False,
        requests_per_second=0,
        logging_level=logging_level,
    )


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
            config = _shared_client_config_from_env()
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
    """Always returns None — pre-flight blocking disabled.

    Perplexity's rate-limit API reports 0 while the account still has quota,
    so real 429s from the request are the authoritative signal instead.
    """
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

_session_store = SessionStore()


def _execute_query(
    query: str,
    model: Model,
    sources: list[SourceFocus],
    search_focus: SearchFocus = SearchFocus.WEB,
    conversation_id: str | None = None,
) -> tuple[str, list[SearchResultItem], str | None]:
    """Run a single query attempt. Returns (answer_text, search_results, conversation_id).

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

    if conversation_id:
        session = _session_store.get(conversation_id)
        if session:
            conversation.restore_session(
                backend_uuid=session.backend_uuid,
                read_write_token=session.read_write_token,
            )

    conversation.ask(query)

    cache = get_limit_cache()
    if cache:
        cache.invalidate_rate_limits()

    answer = conversation.answer or "No answer received"

    new_conv_id = conversation_id
    if conversation.uuid:
        new_conv_id = conversation_id or str(uuid4())
        _session_store.save(
            conversation_id=new_conv_id,
            backend_uuid=conversation.uuid,
            read_write_token=conversation.read_write_token,
            model=model,
        )

    return answer, conversation.search_results or [], new_conv_id


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
    is_sonar = model is Models.SONAR
    if is_research:
        head = f"\n\n---\n[Quota] Used 1 Deep Research query ({model_label})"
    elif is_sonar:
        head = f"\n\n---\n[Quota] Sonar 2 query completed ({model_label})"
    else:
        head = f"\n\n---\n[Quota] Used 1 Pro Search query ({model_label})"

    parts = [
        head,
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
        parts.append(" | EXHAUSTED: Use pplx_smart_query(intent='quick') or pplx_sonar to avoid failures")

    return "".join(parts)


def _execute_with_retry(
    query: str,
    model: Model,
    source_focus: SourceFocusName,
    conversation_id: str | None,
) -> tuple[str, list[SearchResultItem], str | None]:
    """Execute a query with automatic token retry on authentication failure."""
    from .exceptions import AuthenticationError, RateLimitError

    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])
    search_mode = SearchFocus.WRITING if source_focus == "none" else SearchFocus.WEB

    try:
        return _execute_query(query, model, sources, search_mode, conversation_id)
    except AuthenticationError:
        old_token = _client_token
        reset_client()
        new_token = load_token()
        if new_token and new_token != old_token:
            try:
                return _execute_query(query, model, sources, search_mode, conversation_id)
            except (AuthenticationError, RateLimitError) as retry_err:
                raise type(retry_err)(_format_error(retry_err)) from retry_err
        else:
            raise


def ask(query: str, model: Model, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Execute a query with a specific model.

    Returns the answer text with citations appended.
    Raises AuthenticationError or RateLimitError on auth/rate-limit failures
    so MCP servers can signal isError:true to clients.
    """
    from .exceptions import AuthenticationError, RateLimitError

    try:
        answer, search_results, new_conv_id = _execute_with_retry(query, model, source_focus, conversation_id)
    except (AuthenticationError, RateLimitError):
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

    if new_conv_id:
        response_parts.append(f"\n\n[Conversation ID: {new_conv_id}]")

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
            token_status = f"valid for {user_info.email}" if user_info else "Token exists but invalid"

    limit_context = get_limit_context_for_error()

    if is_rate_limit:
        return (
            f"Error: Rate limit exceeded (429).\n\n"
            f"Token status: {token_status}\n"
            f"{limit_context}\n"
            f"Wait a few minutes before retrying."
        )

    if is_auth_error:
        endpoint = getattr(error, "url", None)
        endpoint_line = f"Failed endpoint: {endpoint}\n" if endpoint else ""
        network_hint = ""
        if token_status.startswith("valid for"):
            network_hint = (
                "Likely cause: token is valid, but the query endpoint returned 403. "
                "Check network/IP/proxy/datacenter restrictions.\n"
            )
        return (
            f"Error: Access forbidden (403).\n\n"
            f"Token status: {token_status}\n"
            f"{endpoint_line}"
            f"Error type: {error_type}\n"
            f"Error details: {error_str}\n"
            f"{network_hint}"
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
    conversation_id: str | None = None,
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

    try:
        answer, search_results, new_conv_id = _execute_with_retry(query, decision.model, source_focus, conversation_id)
    except (AuthenticationError, RateLimitError):
        raise
    except Exception as error:
        return SmartResponse(answer=_format_error(error), citations=[], routing=decision, conversation_id=None)

    citations = [r.url or "" for r in search_results]
    return SmartResponse(answer=answer, citations=citations, routing=decision, conversation_id=new_conv_id)


# ---------------------------------------------------------------------------
# Council ask (multi-model parallel query with synthesis)
# ---------------------------------------------------------------------------


def council_ask(
    query: str,
    models: list[tuple[str, Model]] | None = None,
    source_focus: SourceFocusName = "web",
    synthesize: bool = True,
    thinking: bool = False,
    synthesis_model: Model | None = None,
) -> CouncilResponse:
    """Query multiple models in parallel and optionally synthesize results.

    Args:
        query: The question to ask all models.
        models: List of (display_name, Model) tuples. Defaults to
                GPT-5.4, Claude Opus 4.8, and Gemini 3.1 Pro.
        source_focus: Source focus for all queries.
        synthesize: Whether to run Sonar 2 synthesis (default chairman; still a web query).
        thinking: Use thinking model variants for default council members.
        synthesis_model: Model to use for synthesis. Defaults to Sonar 2 when chairman is sonar.

    Returns:
        CouncilResponse with individual results and optional synthesis.
    """
    from .council import council_ask as _council_ask

    return _council_ask(
        query=query,
        models=models,
        source_focus=source_focus,
        synthesize=synthesize,
        thinking=thinking,
        synthesis_model=synthesis_model,
    )
