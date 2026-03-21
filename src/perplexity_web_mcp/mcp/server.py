"""MCP server implementation using FastMCP.

All model/source mappings, client management, rate limit logic, and the core
ask() function live in perplexity_web_mcp.shared.  This module defines only
the MCP tool wrappers and auth tools (which are MCP-specific).
"""

from __future__ import annotations

from time import monotonic

from fastmcp import FastMCP

from perplexity_web_mcp.models import Models
from perplexity_web_mcp.shared import (
    MODEL_MAP,
    ModelName,
    SourceFocusName,
    ask,
    get_limit_cache,
    resolve_model,
    smart_ask,
)
from perplexity_web_mcp.token_store import load_token, save_token


mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI. QUOTA IS LIMITED — read these rules.\n\n"

        "COST MODEL (critical):\n"
        "- pplx_sonar / pplx_smart_query(intent='quick'): FREE — no Pro quota used\n"
        "- pplx_ask / pplx_query / all model-specific tools: 1 PRO SEARCH each (weekly pool)\n"
        "- pplx_deep_research: 1 DEEP RESEARCH each (small monthly pool, ~5-10 total)\n\n"

        "MANDATORY PROTOCOL:\n"
        "1. On your FIRST query of the session, call pplx_usage() to check remaining quotas.\n"
        "2. DEFAULT to pplx_smart_query(intent='quick') for most lookups — it uses Sonar "
        "(free) and only upgrades to Pro when the query genuinely needs it.\n"
        "3. Only use 'standard' or 'detailed' intent when the question requires synthesis, "
        "comparison, multi-step reasoning, or very current data that Sonar can't handle.\n"
        "4. Reserve pplx_deep_research for user-requested deep dives only — NEVER use it "
        "autonomously without asking the user first.\n"
        "5. Avoid model-specific tools (pplx_gpt54, pplx_claude_sonnet, etc.) unless the "
        "user explicitly requests a specific model. Each call costs 1 Pro Search query.\n\n"

        "WHEN TO USE EACH INTENT:\n"
        "- quick: Facts, definitions, 'what is X', current date/weather, simple lookups\n"
        "- standard: How-to questions, comparisons, explanations needing web sources\n"
        "- detailed: Complex analysis, multi-source synthesis, technical deep-dives\n"
        "- research: Comprehensive reports (only when user explicitly asks for research)\n\n"

        "All tools support source_focus: none, web, academic, social, finance, all.\n"
        "Use source_focus='none' for model-only queries without web search.\n\n"

        "AUTHENTICATION: If you get a 403 error or 'token expired' message:\n"
        "1. pplx_auth_status — check current authentication status\n"
        "2. pplx_auth_request_code — send verification code to email\n"
        "3. pplx_auth_complete — complete auth with the 6-digit code"
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
) -> str:
    """Query Perplexity AI with explicit model selection. COSTS 1 PRO SEARCH QUERY per call.

    Prefer pplx_smart_query for automatic quota-aware routing. Use this only when
    you need a specific model or thinking mode.

    Args:
        query: The question to ask
        model: Model to use - auto, sonar, deep_research, gpt54,
               claude_sonnet, claude_opus, gemini_pro, nemotron
        thinking: Enable extended thinking mode (available for gpt54, claude_sonnet,
                  claude_opus; always on for gemini_pro and nemotron)
        source_focus: Source type - none (model only, no search), web, academic,
                      social, finance, all
    """
    selected_model = resolve_model(model, thinking=thinking)
    return ask(query, selected_model, source_focus)


@mcp.tool
def pplx_ask(query: str, source_focus: SourceFocusName = "web") -> str:
    """Quick Q&A with auto model. COSTS 1 PRO SEARCH QUERY. Prefer pplx_smart_query(intent='quick') for free lookups."""
    return ask(query, Models.BEST, source_focus)


@mcp.tool
def pplx_deep_research(query: str, source_focus: SourceFocusName = "web") -> str:
    """Deep Research — in-depth reports. COSTS 1 DEEP RESEARCH QUERY (limited monthly pool, typically 5-10 total). Only use when the user explicitly requests deep research."""
    return ask(query, Models.DEEP_RESEARCH, source_focus)


@mcp.tool
def pplx_sonar(query: str, source_focus: SourceFocusName = "web") -> str:
    """Sonar — Perplexity's latest model. FREE: does NOT consume Pro Search quota."""
    return ask(query, Models.SONAR, source_focus)


@mcp.tool
def pplx_gpt54(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.4 — OpenAI's latest model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GPT_54, source_focus)


@mcp.tool
def pplx_gpt54_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.4 Thinking — OpenAI's latest model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GPT_54_THINKING, source_focus)


@mcp.tool
def pplx_claude_sonnet(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.6 — Anthropic's fast model. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.CLAUDE_46_SONNET, source_focus)


@mcp.tool
def pplx_claude_sonnet_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.6 Thinking — Anthropic's fast model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.CLAUDE_46_SONNET_THINKING, source_focus)


@mcp.tool
def pplx_claude_opus(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Opus 4.6 — Anthropic's most advanced reasoning model. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.CLAUDE_46_OPUS, source_focus)


@mcp.tool
def pplx_claude_opus_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Opus 4.6 Thinking — Anthropic's most advanced reasoning model with extended thinking. COSTS 1 PRO SEARCH QUERY. Requires Max subscription."""
    return ask(query, Models.CLAUDE_46_OPUS_THINKING, source_focus)


@mcp.tool
def pplx_gemini_pro_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3.1 Pro Thinking — Google's most advanced model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.GEMINI_31_PRO_THINKING, source_focus)


@mcp.tool
def pplx_nemotron_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Nemotron 3 Super — NVIDIA's Nemotron 3 Super 120B model with extended thinking. COSTS 1 PRO SEARCH QUERY."""
    return ask(query, Models.NEMOTRON_3_SUPER, source_focus)


@mcp.tool
def pplx_smart_query(
    query: str,
    intent: str = "standard",
    source_focus: SourceFocusName = "web",
) -> str:
    """RECOMMENDED DEFAULT TOOL. Quota-aware query — checks limits and picks the best model automatically.

    USE THIS FOR EVERY QUERY unless the user explicitly requests a specific model.
    Default to intent='quick' for most lookups — it uses Sonar (FREE, no Pro quota).
    Only escalate intent when the question genuinely requires it.

    Intent guide (choose the LOWEST sufficient level):
    - quick: Facts, definitions, simple lookups, 'what is X' → FREE (Sonar, no Pro cost)
    - standard: How-to, comparisons, explanations needing web sources → 1 Pro Search
    - detailed: Complex multi-source analysis, technical deep-dives → 1 Pro Search (premium model)
    - research: Comprehensive report → 1 Deep Research (scarce monthly quota, user must request)

    Response includes a metadata block showing the model used, routing reason,
    and current quota snapshot.

    Args:
        query: The question to ask
        intent: Query complexity — quick (default for most), standard, detailed, research
        source_focus: Source type — none (model only, no search), web, academic,
                      social, finance, all
    """
    result = smart_ask(query, intent=intent, source_focus=source_focus)
    return result.format_response()


@mcp.tool
def pplx_council(
    query: str,
    source_focus: SourceFocusName = "web",
    models: str = "gpt54,claude_opus,gemini_pro",
    synthesize: bool = True,
) -> str:
    """Model Council — query multiple models in parallel, get synthesized consensus.

    IMPORTANT — BEFORE calling this tool, you MUST:
    1. Tell the user the available models: gpt54, claude_sonnet, claude_opus, gemini_pro, nemotron
    2. Ask the user WHICH models they want in their council and HOW MANY
    3. Inform them of the cost: each model = 1 Pro Search query, plus 1 free Sonar for synthesis
       (e.g., 3 models = 3 Pro Searches + 1 free Sonar = 3 Pro total)
    4. Get explicit confirmation before executing

    Default council: GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro (3 diverse providers).

    Args:
        query: The question to ask all council models
        source_focus: Source type for all models (none/web/academic/social/finance/all)
        models: Comma-separated model names to use as council members.
                Available: gpt54, claude_sonnet, claude_opus, gemini_pro, nemotron.
                Default: "gpt54,claude_opus,gemini_pro" (3 models = 3 Pro Searches)
        synthesize: Whether to synthesize a consensus from all responses.
                    Set false to get only individual responses (saves 1 Sonar call).
    """
    from perplexity_web_mcp.council import COUNCIL_DEFAULT_MODELS

    # Parse custom model list if provided
    model_list = None
    if models != "gpt54,claude_opus,gemini_pro":
        model_list = []
        for name in models.split(","):
            name = name.strip()
            resolved = resolve_model(name)
            # Map short names to display names
            display_names = {
                "auto": "Auto (Best)",
                "sonar": "Sonar",
                "gpt54": "GPT-5.4",
                "claude_sonnet": "Claude Sonnet 4.6",
                "claude_opus": "Claude Opus 4.6",
                "gemini_pro": "Gemini 3.1 Pro",
                "nemotron": "Nemotron 3 Super",
            }
            display = display_names.get(name, name)
            model_list.append((display, resolved))

    from perplexity_web_mcp.shared import council_ask

    result = council_ask(
        query=query,
        models=model_list,
        source_focus=source_focus,
        synthesize=synthesize,
    )
    return result.format_response()


# =============================================================================
# Usage & Limits Tools
# =============================================================================


@mcp.tool
def pplx_usage(refresh: bool = False) -> str:
    """Check current Perplexity usage limits and remaining quotas.

    CALL THIS AT THE START OF EVERY SESSION before making any queries.
    Shows remaining Pro Search (weekly), Deep Research (monthly), and other quotas.
    Use the results to decide whether to conserve Pro quota by using quick/Sonar queries.

    Args:
        refresh: Force refresh from Perplexity (ignores cache). Default False.
    """
    token = load_token()
    if not token:
        return (
            "NOT AUTHENTICATED\n\n"
            "No session token found. Authenticate first with pplx_auth_request_code."
        )

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

    settings = cache.get_user_settings(force_refresh=refresh)
    if settings:
        parts.append("")
        parts.append("ACCOUNT INFO")
        parts.append("=" * 40)
        parts.append(settings.format_summary())

    credits = cache.get_credits(force_refresh=refresh)
    if credits:
        parts.append("")
        parts.append("CREDITS")
        parts.append("=" * 40)
        parts.append(credits.format_summary())

    return "\n".join(parts)


# =============================================================================
# Authentication Tools (MCP-specific: in-band auth for AI agents)
# =============================================================================

_auth_session: dict = {}
_auth_session_ts: float = 0.0
_AUTH_SESSION_TTL: float = 600.0


def _get_auth_session(email: str) -> dict | None:
    """Get stored auth session if it matches the email and is still fresh."""
    if (
        _auth_session
        and _auth_session.get("email") == email
        and (monotonic() - _auth_session_ts) < _AUTH_SESSION_TTL
    ):
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
    from curl_cffi.requests import Session
    from orjson import loads

    BASE_URL = "https://www.perplexity.ai"

    try:
        session = Session(impersonate="chrome", headers={"Referer": BASE_URL, "Origin": BASE_URL})
        session.get(BASE_URL)
        csrf_data = loads(session.get(f"{BASE_URL}/api/auth/csrf").content)
        csrf = csrf_data.get("csrfToken")

        if not csrf:
            return "ERROR: Failed to obtain CSRF token. Please try again."

        response = session.post(
            f"{BASE_URL}/api/auth/signin/email?version=2.18&source=default",
            json={
                "email": email,
                "csrfToken": csrf,
                "useNumericOtp": "true",
                "json": "true",
                "callbackUrl": f"{BASE_URL}/?login-source=floatingSignup",
            },
        )

        if response.status_code != 200:
            return f"ERROR: Failed to send verification code. Status: {response.status_code}"

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
def pplx_auth_complete(email: str, code: str) -> str:
    """Complete Perplexity authentication with the verification code.

    Use the 6-digit code received via email after calling pplx_auth_request_code.
    On success, the session token is saved and all pplx_* tools will work.

    Args:
        email: Your Perplexity account email (same as used in pplx_auth_request_code)
        code: The 6-digit verification code from your email

    Returns:
        Status message with authentication result and subscription tier
    """
    from curl_cffi.requests import Session
    from orjson import loads

    from perplexity_web_mcp.cli.auth import get_user_info

    BASE_URL = "https://www.perplexity.ai"
    SESSION_COOKIE_NAME = "__Secure-next-auth.session-token"

    try:
        stored = _get_auth_session(email)
        if stored:
            session = stored["session"]
        else:
            session = Session(impersonate="chrome", headers={"Referer": BASE_URL, "Origin": BASE_URL})
            session.get(BASE_URL)

        response = session.post(
            f"{BASE_URL}/api/auth/otp-redirect-link",
            json={
                "email": email,
                "otp": code,
                "redirectUrl": f"{BASE_URL}/?login-source=floatingSignup",
                "emailLoginMethod": "web-otp",
            },
        )

        if response.status_code != 200:
            return "ERROR: Invalid verification code. Please check and try again."

        redirect_path = loads(response.content).get("redirect")
        if not redirect_path:
            return "ERROR: No redirect URL received. Please try again."

        redirect_url = f"{BASE_URL}{redirect_path}" if redirect_path.startswith("/") else redirect_path

        session.get(redirect_url)
        token = session.cookies.get(SESSION_COOKIE_NAME)

        if not token:
            return "ERROR: Authentication succeeded but token not found."

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


def main() -> None:
    """Run the MCP server."""
    mcp.run()


if __name__ == "__main__":
    main()
