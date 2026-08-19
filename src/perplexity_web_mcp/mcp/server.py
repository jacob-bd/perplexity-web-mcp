"""MCP server implementation using FastMCP.

All model/source mappings, client management, rate limit logic, and the core
ask() function live in perplexity_web_mcp.shared.  This module defines only
the MCP tool wrappers and auth tools (which are MCP-specific).
"""

from __future__ import annotations

import threading
from time import monotonic
import uuid

from fastmcp import FastMCP

from perplexity_web_mcp.auth import (
    create_auth_session,
    extract_session_token,
    follow_auth_callback,
    request_verification_code,
    resolve_redirect_url,
    verify_totp,
)
from perplexity_web_mcp.models import Models
from perplexity_web_mcp.shared import (
    COUNCIL_DEFAULT_MODELS_STR,
    ModelName,
    SourceFocusName,
    SourceResolutionError,
    ask,
    build_council_model_list,
    council_ask,
    format_thread_detail,
    format_thread_list,
    get_connector_sources,
    get_limit_cache,
    get_thread,
    list_threads,
    resolve_model,
    resolve_source_focus,
    smart_ask,
)
from perplexity_web_mcp.token_store import CONFIG_DIR, load_token, save_token


mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI. QUOTA IS LIMITED — read these rules.\n\n"
        "COST MODEL (critical):\n"
        "- pplx_sonar / pplx_smart_query(intent='quick'): Sonar 2 (in-house). Still uses your "
        "Perplexity session; limits depend on your plan — call pplx_usage() first.\n"
        "- pplx_ask / pplx_query / all model-specific tools: 1 PRO SEARCH each (weekly pool)\n"
        "- pplx_deep_research: 1 DEEP RESEARCH each (small monthly pool, ~5-10 total)\n"
        "- pplx_list_threads / pplx_get_thread: FREE — read-only, zero quota cost\n\n"
        "MANDATORY PROTOCOL:\n"
        "1. On your FIRST query of the session, call pplx_usage() to check remaining quotas.\n"
        "   Read the Subscription line: Pro users must avoid Max-only models.\n"
        "2. DEFAULT to pplx_smart_query(intent='quick') for most lookups — it prefers Sonar 2 "
        "before premium models when that fits the question.\n"
        "3. Only use 'standard' or 'detailed' intent when the question requires synthesis, "
        "comparison, multi-step reasoning, or very current data that Sonar 2 can't handle.\n"
        "4. Reserve pplx_deep_research for user-requested deep dives only — NEVER use it "
        "autonomously without asking the user first. For complex research that might timeout, "
        "use pplx_deep_research_start and poll with pplx_research_status instead.\n"
        "5. Avoid model-specific tools (pplx_gpt56_terra, pplx_claude_sonnet, etc.) unless the "
        "user explicitly requests a specific model. Each call costs 1 Pro Search query.\n\n"
        "WHEN TO USE EACH INTENT:\n"
        "- quick: Facts, definitions, 'what is X', current date/weather, simple lookups\n"
        "- standard: How-to questions, comparisons, explanations needing web sources\n"
        "- detailed: Complex analysis, multi-source synthesis, technical deep-dives\n"
        "- research: Comprehensive reports (only when user explicitly asks for research)\n\n"
        "THREAD LIBRARY (quota-free):\n"
        "- Use pplx_list_threads() to browse past conversations — zero quota cost.\n"
        '  Search with search_term="keyword" before spending a Pro query on something already researched.\n'
        "- Use pplx_get_thread(slug) to load the full history of any past thread.\n"
        "- To resume a past conversation: call pplx_get_thread(slug) to load context,\n"
        "  then pass conversation_id=slug to any query tool to continue right where it left off.\n\n"
        "All query tools support source_focus: none, web, academic, social, finance, all, "
        "or an account connector source ID from pplx_connectors().\n"
        "Use source_focus='none' for model-only queries without web search.\n\n"
        "AUTHENTICATION: If you get a 403 error or 'token expired' message:\n"
        "1. pplx_auth_status — check current authentication status\n"
        "2. pplx_auth_request_code — send verification code to email\n"
        "3. pplx_auth_complete — complete email OTP and any requested TOTP challenge"
    ),
)


# =============================================================================
# Query Tools (all delegate to shared.ask)
# =============================================================================


@mcp.tool
def pplx_query(
    query: str,
    model: ModelName = "auto",
    thinking: bool = False,
    source_focus: SourceFocusName = "web",
    conversation_id: str | None = None,
) -> str:
    """Query Perplexity AI with explicit model selection. COSTS 1 PRO SEARCH QUERY per call.

    Prefer pplx_smart_query for automatic quota-aware routing. Use this only when
    you need a specific model or thinking mode.

    Args:
        query: The question to ask
        model: Model to use - auto, sonar, deep_research, gpt56_terra, gpt56_sol, grok45,
               claude_sonnet, claude_opus, gemini_pro, nemotron, glm52, kimi_k26
        thinking: Enable extended thinking mode (available for gpt56_terra, gpt56_sol, grok45, claude_sonnet,
                  claude_opus, kimi_k26; always on for gemini_pro, nemotron, and glm52)
        source_focus: Source type - none (model only, no search), web, academic,
                      social, finance, all, or connector source ID from pplx_connectors()
    """
    selected_model = resolve_model(model, thinking=thinking)
    return ask(query, selected_model, source_focus, conversation_id)


@mcp.tool
def pplx_ask(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Quick Q&A with auto model. COSTS 1 PRO SEARCH QUERY. Prefer pplx_smart_query(intent='quick') for simple lookups (Sonar 2 first)."""
    return ask(query, Models.BEST, source_focus, conversation_id)


@mcp.tool
def pplx_deep_research(query: str, source_focus: SourceFocusName = "web") -> str:
    """Deep Research — in-depth reports. COSTS 1 DEEP RESEARCH QUERY (limited monthly pool, typically 5-10 total). Only use when the user explicitly requests deep research."""
    return ask(query, Models.DEEP_RESEARCH, source_focus)


_research_tasks: dict[str, dict] = {}
_research_lock = threading.Lock()


def _run_research_task(task_id: str, query: str, source_focus: SourceFocusName) -> None:
    try:
        result = ask(query, Models.DEEP_RESEARCH, source_focus)
        with _research_lock:
            _research_tasks[task_id] = {"status": "completed", "result": result}
    except Exception as e:
        with _research_lock:
            _research_tasks[task_id] = {"status": "error", "error": str(e)}


@mcp.tool
def pplx_deep_research_start(query: str, source_focus: SourceFocusName = "web") -> str:
    """Start a deep research task asynchronously. COSTS 1 DEEP RESEARCH QUERY.

    Use this instead of pplx_deep_research for complex queries to avoid connection timeouts.
    Returns a task_id immediately. Poll pplx_research_status with the task_id to get the result.
    """
    try:
        resolve_source_focus(source_focus)
    except SourceResolutionError as e:
        return str(e)

    task_id = str(uuid.uuid4())
    with _research_lock:
        _research_tasks[task_id] = {"status": "in_progress"}

    thread = threading.Thread(
        target=_run_research_task,
        args=(task_id, query, source_focus),
        daemon=True,
    )
    thread.start()

    return f"Task started. Task ID: {task_id}. Poll pplx_research_status with this ID."


@mcp.tool
def pplx_research_status(task_id: str) -> str:
    """Check the status of an asynchronous deep research task.

    Returns 'in_progress' if the task is still running, the final research report if completed,
    or an error message if it failed.
    """
    with _research_lock:
        task = _research_tasks.get(task_id)
        if not task:
            return f"Error: Unknown task ID '{task_id}'."

        status = task["status"]
        if status == "in_progress":
            return f"Status: in_progress (task_id: {task_id}). Poll again in 10-15 seconds."
        elif status == "completed":
            result = task.pop("result")
            del _research_tasks[task_id]
            return result
        else:
            error = task.get("error", "Unknown error")
            del _research_tasks[task_id]
            return f"Task failed: {error}"


@mcp.tool
def pplx_sonar(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Sonar 2 — Perplexity's latest in-house model. Subject to your plan and Perplexity usage counters (see pplx_usage)."""
    return ask(query, Models.SONAR, source_focus, conversation_id)


@mcp.tool
def pplx_gpt56_terra(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """GPT-5.6 Terra — OpenAI's versatile model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GPT_56_TERRA, source_focus, conversation_id)


@mcp.tool
def pplx_gpt56_terra_thinking(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """GPT-5.6 Terra Thinking — OpenAI's versatile model with thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GPT_56_TERRA_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_gpt56_sol(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """GPT-5.6 Sol — OpenAI's most powerful model. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.GPT_56_SOL, source_focus, conversation_id)


@mcp.tool
def pplx_gpt56_sol_thinking(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """GPT-5.6 Sol Thinking — OpenAI's most powerful model with thinking. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.GPT_56_SOL_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_grok45(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Grok 4.5 — xAI's most advanced model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GROK_45, source_focus, conversation_id)


@mcp.tool
def pplx_grok45_thinking(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Grok 4.5 Thinking — xAI's most advanced model with thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GROK_45_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_claude_sonnet(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Claude Sonnet 5 — Anthropic's fast model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.CLAUDE_50_SONNET, source_focus, conversation_id)


@mcp.tool
def pplx_claude_sonnet_think(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """Claude Sonnet 5 Thinking — Anthropic's newest reasoning model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.CLAUDE_50_SONNET_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_claude_opus(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Claude Opus 4.8 — Anthropic's most advanced reasoning model. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.CLAUDE_48_OPUS, source_focus, conversation_id)


@mcp.tool
def pplx_claude_opus_think(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """Claude Opus 4.8 Thinking — Anthropic's most advanced reasoning model with extended thinking. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.CLAUDE_48_OPUS_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_gemini_pro_think(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Gemini 3.1 Pro Thinking — Google's most advanced model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GEMINI_31_PRO_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_nemotron_thinking(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """Nemotron 3 Ultra — NVIDIA's Nemotron 3 Ultra 550B model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.NEMOTRON_3_ULTRA, source_focus, conversation_id)


@mcp.tool
def pplx_glm52(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """GLM 5.2 — Z.ai's advanced model with thinking always enabled. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GLM_5_2, source_focus, conversation_id)


@mcp.tool
def pplx_kimi_k26(query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None) -> str:
    """Kimi K2.6 — Moonshot's advanced model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.KIMI_K2_6, source_focus, conversation_id)


@mcp.tool
def pplx_kimi_k26_thinking(
    query: str, source_focus: SourceFocusName = "web", conversation_id: str | None = None
) -> str:
    """Kimi K2.6 Thinking — Moonshot's advanced model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.KIMI_K2_6_THINKING, source_focus, conversation_id)


@mcp.tool
def pplx_smart_query(
    query: str,
    intent: str = "standard",
    source_focus: SourceFocusName = "web",
    conversation_id: str | None = None,
) -> str:
    """RECOMMENDED DEFAULT TOOL. Quota-aware query — checks limits and picks the best model automatically.

    USE THIS FOR EVERY QUERY unless the user explicitly requests a specific model.
    Default to intent='quick' for most lookups — it routes to Sonar 2 when appropriate.
    Only escalate intent when the question genuinely requires it.

    Intent guide (choose the LOWEST sufficient level):
    - quick: Facts, definitions, simple lookups, 'what is X' → Sonar 2 (check pplx_usage)
    - standard: How-to, comparisons, explanations needing web sources → 1 Pro Search
    - detailed: Complex multi-source analysis, technical deep-dives → 1 Pro Search (premium model)
    - research: Comprehensive report → 1 Deep Research (scarce monthly quota, user must request)

    Response includes a metadata block showing the model used, routing reason,
    and current quota snapshot.

    Args:
        query: The question to ask
        intent: Query complexity — quick (default for most), standard, detailed, research
        source_focus: Source type — none (model only, no search), web, academic,
                      social, finance, all, or connector source ID from pplx_connectors()
    """
    result = smart_ask(query, intent=intent, source_focus=source_focus)
    return result.format_response()


@mcp.tool
def pplx_council(
    query: str,
    source_focus: SourceFocusName = "web",
    models: str = COUNCIL_DEFAULT_MODELS_STR,
    synthesize: bool = True,
    thinking: bool = False,
    chairman: ModelName = "sonar",
) -> str:
    """Model Council — query multiple models in parallel, get synthesized consensus.

    IMPORTANT — BEFORE calling this tool, you MUST:
    1. Tell the user the available models: sonar, gpt56_terra, gpt56_sol, grok45, claude_sonnet, claude_opus, gemini_pro, nemotron, glm52, kimi_k26
    2. Check pplx_usage() first. If Subscription is Pro, do not include Max-only models: gpt56_sol, claude_opus
    3. Ask the user WHICH models they want in their council and HOW MANY
    4. Inform them of the cost: each council model = 1 Pro Search query, plus synthesis
       (default chairman sonar = Sonar 2 pass — still counts as a normal query toward limits)
    5. Get explicit confirmation before executing

    Default council: GPT-5.6 Terra, Claude Sonnet 5, Gemini 3.1 Pro (Pro-compatible, 3 diverse providers).

    Args:
        query: The question to ask all council models
        source_focus: Source type for all models (none/web/academic/social/finance/all or connector source ID)
        models: Comma-separated model names to use as council members.
                Available: sonar, gpt56_terra, gpt56_sol, grok45, claude_sonnet, claude_opus, gemini_pro, nemotron, glm52, kimi_k26.
                Default: "gpt56_terra,claude_sonnet,gemini_pro" (3 models + synthesis = 4 Pro Searches)
                Max-only: gpt56_sol, claude_opus. Exclude these when pplx_usage shows a Pro subscription.
        synthesize: Whether to synthesize a consensus from all responses.
                    Set false to get only individual responses (saves 1 Sonar 2 call).
        thinking: Enable extended thinking for council models (gpt56_terra, gpt56_sol, grok45, claude_sonnet,
                  claude_opus, kimi_k26 support toggle; gemini_pro, nemotron, and glm52 are always thinking).
        chairman: Model to use for synthesis (default: "sonar" / Sonar 2).
                  Non-sonar chairmen cost 1 extra Pro Search query.
    """
    # Parse custom model list if provided
    model_list = None
    if models != COUNCIL_DEFAULT_MODELS_STR:
        model_names = [name.strip() for name in models.split(",") if name.strip()]
        model_list = build_council_model_list(model_names, thinking=thinking)

    synthesis_model = resolve_model(chairman) if chairman != "sonar" else None

    try:
        result = council_ask(
            query=query,
            models=model_list,
            source_focus=source_focus,
            synthesize=synthesize,
            thinking=thinking,
            synthesis_model=synthesis_model,
        )
    except SourceResolutionError as e:
        return str(e)
    return result.format_response()


# =============================================================================
# Thread Library Tools (read-only, zero quota cost)
# =============================================================================


@mcp.tool
def pplx_list_threads(
    limit: int = 20,
    offset: int = 0,
    search_term: str = "",
) -> str:
    """Browse your Perplexity thread library. FREE — zero quota cost.

    Returns a paginated list of your past Perplexity conversations with their
    slugs, titles, models used, and answer previews.

    PRIMARY USE CASES:
    1. "Did I already research X?" — search before spending a Pro query:
       pplx_list_threads(search_term="quantum computing")
    2. Find a conversation to resume — get its slug, then pass it as
       conversation_id to any pplx_* query tool to continue right where it left off.
    3. Retrieve full history — call pplx_get_thread(slug) with any slug from this list.

    Args:
        limit: Max threads to return (default 20, max 100).
        offset: Skip this many threads — use for pagination (e.g. offset=20 for page 2).
        search_term: Optional keyword to filter threads by title or content.
    """
    from perplexity_web_mcp.exceptions import AuthenticationError

    try:
        threads = list_threads(limit=limit, offset=offset, search_term=search_term)
        return format_thread_list(threads)
    except AuthenticationError as e:
        return f"Error: Not authenticated. {e}\n\nRe-authenticate with pplx_auth_request_code."
    except Exception as e:
        return f"Error fetching thread list: {e}"


@mcp.tool
def pplx_get_thread(slug: str) -> str:
    """Fetch the full conversation history for a Perplexity thread. FREE — zero quota cost.

    Returns the complete Q&A turns, sources, and related queries for any past thread.
    Get the slug from pplx_list_threads, or from the [Conversation ID: ...] footer
    returned by any pplx_* query tool.

    RESUME PATTERN — to continue a past conversation:
    1. pplx_list_threads(search_term="topic") — find the thread and its slug
    2. pplx_get_thread(slug) — read the full history for context
    3. pplx_smart_query("follow-up question", conversation_id=slug) — continue it

    Args:
        slug: Thread UUID / slug. Obtain from pplx_list_threads or a previous
              [Conversation ID: ...] response footer.
    """
    from perplexity_web_mcp.exceptions import AuthenticationError

    if not slug or not slug.strip():
        return "Error: slug is required. Get it from pplx_list_threads."

    try:
        thread_data = get_thread(slug.strip())
        return format_thread_detail(thread_data)
    except AuthenticationError as e:
        return f"Error: Not authenticated. {e}\n\nRe-authenticate with pplx_auth_request_code."
    except Exception as e:
        return f"Error fetching thread '{slug}': {e}"


# =============================================================================
# MCP Resources (thread library as addressable resources)
# =============================================================================


@mcp.resource("perplexity://library")
def library_resource() -> str:
    """Your Perplexity thread library — most recent 50 threads.

    Returns a formatted list of your recent Perplexity conversations.
    Use perplexity://thread/{slug} to access a specific thread's full history.
    """
    from perplexity_web_mcp.exceptions import AuthenticationError

    try:
        threads = list_threads(limit=50)
        return format_thread_list(threads)
    except AuthenticationError:
        return "Not authenticated. Run pplx_auth_request_code to authenticate."
    except Exception as e:
        return f"Error loading library: {e}"


@mcp.resource("perplexity://thread/{slug}")
def thread_resource(slug: str) -> str:
    """Full conversation history for a specific Perplexity thread.

    Returns the complete Markdown-formatted Q&A turns, sources, and related
    queries for the thread identified by {slug}.

    Get slugs from the perplexity://library resource or from any pplx_* query
    response footer ([Conversation ID: ...]).
    """
    from perplexity_web_mcp.exceptions import AuthenticationError

    try:
        thread_data = get_thread(slug)
        return format_thread_detail(thread_data)
    except AuthenticationError:
        return "Not authenticated. Run pplx_auth_request_code to authenticate."
    except Exception as e:
        return f"Error loading thread '{slug}': {e}"


# =============================================================================
# Usage & Limits Tools
# =============================================================================


@mcp.tool
def pplx_usage(refresh: bool = False) -> str:
    """Check current Perplexity usage limits and remaining quotas.

    CALL THIS AT THE START OF EVERY SESSION before making any queries.
    Shows remaining Pro Search (weekly), Deep Research (monthly), and other quotas.
    Use the results to decide whether to conserve Pro quota (e.g. quick intent before premium models).

    Args:
        refresh: Force refresh from Perplexity (ignores cache). Default False.
    """
    token = load_token()
    if not token:
        return "NOT AUTHENTICATED\n\nNo session token found. Authenticate first with pplx_auth_request_code."

    cache = get_limit_cache()
    if cache is None:
        return "ERROR: Could not initialize limit cache."

    parts: list[str] = []

    limits = cache.get_rate_limits(force_refresh=refresh)
    if limits:
        parts.append("RATE LIMITS (remaining queries)")
        parts.append("=" * 40)
        parts.append(limits.format_summary())
    else:
        parts.append("WARNING: Could not fetch rate limits (network error or token issue).")

    from perplexity_web_mcp.cli.auth import get_user_info

    user_info = get_user_info(token)
    settings = cache.get_user_settings(force_refresh=refresh)
    if settings or user_info:
        parts.append("")
        parts.append("ACCOUNT INFO")
        parts.append("=" * 40)
        if user_info:
            parts.append(f"Subscription: {user_info.tier_display}")
        if settings:
            parts.append(f"Billing: {settings.subscription_tier} ({settings.subscription_status})")
            parts.append(f"Total queries: {settings.query_count:,}")
            parts.append(f"Pro queries: {settings.query_count_copilot:,}")
            parts.append(f"Upload limit: {settings.upload_limit} files")
            parts.append(f"Create limit: {settings.create_limit}")
            parts.append(f"Pages limit: {settings.pages_limit}")
            parts.append(f"Max files/user: {settings.max_files_per_user:,}")
            parts.append(f"Max file size: {settings.connector_limits.max_file_size_mb} MB")
            parts.append(f"Daily attachments: {settings.connector_limits.daily_attachment_limit}")

    credits = cache.get_credits(force_refresh=refresh)
    if credits:
        parts.append("")
        parts.append("CREDITS")
        parts.append("=" * 40)
        parts.append(credits.format_summary())

    return "\n".join(parts)


@mcp.tool
def pplx_connectors(refresh: bool = False) -> str:
    """List account connector source IDs that can be passed as source_focus.

    Returns source IDs from the Perplexity rate-limit API. Use these IDs as
    source_focus values, for example source_focus="pitchbook_mcp_cashmere".
    """
    cache = get_limit_cache()
    if cache is None:
        return "NOT AUTHENTICATED\n\nNo session token found. Authenticate first with pplx_auth_request_code."

    limits = cache.get_rate_limits(force_refresh=refresh)
    if limits is None:
        return "Could not fetch source limits."

    connector_sources = get_connector_sources(limits.source_limits)
    if not connector_sources:
        return "No connector source IDs were reported by this account."

    lines = ["Connector source IDs:"]
    for source in connector_sources:
        quota = "unlimited" if source.monthly_limit is None else f"{source.remaining}/{source.monthly_limit}"
        lines.append(f"- {source.source_id}: {quota}")
    return "\n".join(lines)


# =============================================================================
# Authentication Tools (MCP-specific: in-band auth for AI agents)
# =============================================================================

_auth_session: dict = {}
_auth_session_ts: float = 0.0
_AUTH_SESSION_TTL: float = 600.0


def _get_auth_session(email: str) -> dict | None:
    """Get stored auth session if it matches the email and is still fresh."""
    if _auth_session and _auth_session.get("email") == email and (monotonic() - _auth_session_ts) < _AUTH_SESSION_TTL:
        return _auth_session
    return None


def _set_auth_session(session_data: dict) -> None:
    """Store auth session with timestamp."""
    global _auth_session, _auth_session_ts  # noqa: PLW0603
    _auth_session = session_data
    _auth_session_ts = monotonic()


def _clear_auth_session() -> None:
    """Clear stored auth session."""
    global _auth_session, _auth_session_ts  # noqa: PLW0603
    _auth_session = {}
    _auth_session_ts = 0.0


@mcp.tool
def pplx_auth_status() -> str:
    """Check if Perplexity is authenticated.

    Returns the current authentication status and subscription tier if authenticated.
    Use this to check if re-authentication is needed before making queries.
    """
    from perplexity_web_mcp.cli.auth import get_user_info

    token = load_token()
    if not token:
        return (
            "NOT AUTHENTICATED\n\n"
            "No session token found. To authenticate:\n"
            "1. Call pplx_auth_request_code with your Perplexity email\n"
            "2. Check email for 6-digit verification code\n"
            "3. Call pplx_auth_complete with email and code"
        )

    user_info = get_user_info(token)
    if user_info:
        parts = [
            "AUTHENTICATED\n",
            f"Email: {user_info.email}",
            f"Username: {user_info.username}",
            f"Subscription: {user_info.tier_display}",
        ]

        cache = get_limit_cache()
        if cache:
            limits = cache.get_rate_limits()
            if limits:
                parts.append(
                    f"\nRemaining: {limits.remaining_pro} Pro | "
                    f"{limits.remaining_research} Research | "
                    f"{limits.remaining_labs} Labs | "
                    f"{limits.remaining_agentic_research} Agent"
                )

        return "\n".join(parts)

    return (
        "TOKEN EXPIRED\n\n"
        "Session token exists but is invalid or expired. To re-authenticate:\n"
        "1. Call pplx_auth_request_code with your Perplexity email\n"
        "2. Check email for 6-digit verification code\n"
        "3. Call pplx_auth_complete with email and code"
    )


@mcp.tool
def pplx_auth_request_code(email: str) -> str:
    """Request a verification code for Perplexity authentication.

    Sends a 6-digit verification code to the provided email address.
    After calling this, check the email inbox and use pplx_auth_complete
    with the code to finish authentication.

    Args:
        email: Your Perplexity account email address

    Returns:
        Status message indicating if the code was sent successfully
    """
    try:
        session, csrf = create_auth_session()
        request_verification_code(session, csrf, email)

        _set_auth_session({"session": session, "email": email})

        return (
            f"SUCCESS: Verification code sent to {email}\n\n"
            f"Next steps:\n"
            f"1. Check your email inbox for a 6-digit code from Perplexity\n"
            f"2. Call pplx_auth_complete with email='{email}' and the code"
        )

    except Exception as e:
        return f"ERROR: {e}"


@mcp.tool
def pplx_auth_complete(email: str, code: str = "", totp_code: str | None = None) -> str:
    """Complete Perplexity authentication with the verification code.

    Use the 6-digit code received via email after calling pplx_auth_request_code.
    On success, the session token is saved and all pplx_* tools will work.

    Args:
        email: Your Perplexity account email (same as used in pplx_auth_request_code)
        code: The 6-digit verification code from your email
        totp_code: The 6-digit authenticator code when TOTP is enabled

    Returns:
        Status message with authentication result and subscription tier
    """
    from perplexity_web_mcp.cli.auth import get_user_info

    try:
        stored = _get_auth_session(email)
        if stored:
            session = stored["session"]
        else:
            session, _ = create_auth_session()

        challenge_token = stored.get("challenge_token") if stored else None
        if challenge_token:
            if not totp_code:
                return "TOTP_REQUIRED: Call pplx_auth_complete again with email and totp_code."
            verify_totp(session, challenge_token, totp_code)
        else:
            if not code:
                return "ERROR: The 6-digit email verification code is required."
            redirect_url = resolve_redirect_url(session, email, code)
            challenge_token = follow_auth_callback(session, redirect_url)
            if challenge_token:
                _set_auth_session({"session": session, "email": email, "challenge_token": challenge_token})
                if not totp_code:
                    return "TOTP_REQUIRED: Call pplx_auth_complete again with email and totp_code."
                verify_totp(session, challenge_token, totp_code)

        token = extract_session_token(session)

        if save_token(token):
            _clear_auth_session()

            user_info = get_user_info(token)
            if user_info:
                return (
                    f"SUCCESS: Authentication complete!\n\n"
                    f"Email: {user_info.email}\n"
                    f"Subscription: {user_info.tier_display}\n\n"
                    f"All pplx_* tools are now ready to use."
                )
            return "SUCCESS: Token saved. You can now use pplx_* tools."

        return "ERROR: Failed to save token. Check file permissions."

    except Exception as e:
        return f"ERROR: {e}"


import atexit
import ipaddress
import os
from pathlib import Path
import signal
import socket
import sys


def get_daemon_pid_path(port: int) -> Path:
    """Get path to daemon PID file for a given port."""
    return CONFIG_DIR / f"daemon-{port}.pid"


def is_pid_running(pid: int) -> bool:
    """Check if a process with the given PID is currently running."""
    if pid <= 0:
        return False
    try:
        os.kill(pid, 0)
        return True
    except (ProcessLookupError, OSError):
        return False


def is_loopback_host(host: str) -> bool:
    """Return whether a host resolves to a loopback address."""
    if host.lower() == "localhost":
        return True
    try:
        return ipaddress.ip_address(host).is_loopback
    except ValueError:
        return False


def get_running_daemon_pid(port: int) -> int | None:
    """Return PID of running daemon on port if active, otherwise None."""
    pid_path = get_daemon_pid_path(port)
    if not pid_path.exists():
        return None
    try:
        pid = int(pid_path.read_text().strip())
        if is_pid_running(pid):
            return pid
        pid_path.unlink(missing_ok=True)
    except Exception:
        pid_path.unlink(missing_ok=True)
    return None


def is_port_in_use(host: str, port: int) -> bool:
    """Check if a TCP port is currently occupied."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        try:
            s.bind((host, port))
            return False
        except OSError:
            return True


def acquire_daemon_lock(port: int) -> bool:
    """Atomically record current process PID in daemon lockfile."""
    try:
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        pid_path = get_daemon_pid_path(port)
        fd = os.open(pid_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as pid_file:
            pid_file.write(str(os.getpid()))
        atexit.register(release_daemon_lock, port, os.getpid())
        return True
    except FileExistsError:
        return False
    except Exception:
        return False


def release_daemon_lock(port: int, owner_pid: int | None = None) -> None:
    """Clean up daemon lockfile."""
    try:
        pid_path = get_daemon_pid_path(port)
        if pid_path.exists():
            if owner_pid is not None and pid_path.read_text(encoding="utf-8").strip() != str(owner_pid):
                return
            pid_path.unlink(missing_ok=True)
    except Exception:
        pass


def stop_daemon(port: int) -> tuple[bool, str]:
    """Stop running daemon on port."""
    pid = get_running_daemon_pid(port)
    if pid is None:
        return False, f"No active MCP daemon found on port {port}."

    try:
        os.kill(pid, signal.SIGTERM)
        release_daemon_lock(port, pid)
        return True, f"Stopped MCP daemon (PID {pid}) on port {port}."
    except Exception as e:
        return False, f"Failed to stop MCP daemon (PID {pid}): {e}"


def main(transport: str | None = None, host: str = "127.0.0.1", port: int = 8000) -> None:
    """Run the MCP server with optional transport override."""
    if transport is None:
        if "--sse" in sys.argv:
            transport = "sse"
        elif "--streamable-http" in sys.argv or "--http" in sys.argv:
            transport = "streamable-http"
        elif "PWM_MCP_TRANSPORT" in os.environ:
            transport = os.environ["PWM_MCP_TRANSPORT"]
        else:
            transport = "stdio"

    for i, arg in enumerate(sys.argv):
        if arg == "--host" and i + 1 < len(sys.argv):
            host = sys.argv[i + 1]
        elif arg == "--port" and i + 1 < len(sys.argv):
            try:
                port = int(sys.argv[i + 1])
            except ValueError:
                pass

    if transport in ("sse", "streamable-http", "http"):
        if not is_loopback_host(host):
            sys.stderr.write(
                "Error: Refusing to bind the unauthenticated MCP daemon to a non-loopback host. "
                "Use a loopback address or place an authenticated reverse proxy in front of it.\n"
            )
            sys.exit(1)

        existing_pid = get_running_daemon_pid(port)
        if existing_pid is not None and existing_pid != os.getpid():
            sys.stderr.write(
                f"Error: MCP daemon is already running on port {port} (PID {existing_pid}).\n"
                f"Use 'pwm serve-mcp --port {port} --status' or 'pwm serve-mcp --port {port} --stop' to manage it.\n"
            )
            sys.exit(1)

        if is_port_in_use(host, port):
            sys.stderr.write(f"Error: Port {port} on {host} is already in use by another process.\n")
            sys.exit(1)

        if not acquire_daemon_lock(port):
            sys.stderr.write(f"Error: MCP daemon lock for port {port} is already held by another process.\n")
            sys.exit(1)
        try:
            if transport == "sse":
                mcp.run(transport="sse", host=host, port=port)
            else:
                mcp.run(transport="streamable-http", host=host, port=port)
        finally:
            release_daemon_lock(port, os.getpid())
    else:
        mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
