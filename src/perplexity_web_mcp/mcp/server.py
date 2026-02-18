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
)
from perplexity_web_mcp.token_store import load_token, save_token


mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI using premium models. "
        "Use pplx_query for flexible model selection with thinking toggle. "
        "Or use model-specific tools like pplx_gpt52, pplx_claude_sonnet, etc. "
        "All tools support source_focus: web, academic, social, finance, all. "
        "\n\n"
        "USAGE LIMITS: Call pplx_usage before heavy use to check remaining quotas. "
        "The server checks limits automatically and will warn you before queries "
        "that would exceed your plan's allowance.\n\n"
        "AUTHENTICATION: If you get a 403 error or 'token expired' message, use these tools to re-authenticate:\n"
        "1. pplx_auth_status - Check current authentication status\n"
        "2. pplx_auth_request_code - Send verification code to email (requires email address)\n"
        "3. pplx_auth_complete - Complete auth with the 6-digit code from email\n"
        "Session tokens last ~30 days. After re-authenticating, all pplx_* tools will work again."
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
    """Query Perplexity AI with model selection and thinking toggle.

    Args:
        query: The question to ask
        model: Model to use - auto, sonar, deep_research, gpt52, claude_sonnet,
               claude_opus, gemini_flash, gemini_pro, grok, kimi
        thinking: Enable extended thinking mode (available for gpt52, claude_sonnet,
                  claude_opus, gemini_flash, grok)
        source_focus: Source type - web, academic, social, finance, all
    """
    selected_model = resolve_model(model, thinking=thinking)
    return ask(query, selected_model, source_focus)


@mcp.tool
def pplx_ask(query: str, source_focus: SourceFocusName = "web") -> str:
    """Ask a question with real-time data from the internet (auto-selects best model)."""
    return ask(query, Models.BEST, source_focus)


@mcp.tool
def pplx_deep_research(query: str, source_focus: SourceFocusName = "web") -> str:
    """Deep Research - In-depth reports with more sources, charts, and advanced reasoning."""
    return ask(query, Models.DEEP_RESEARCH, source_focus)


@mcp.tool
def pplx_sonar(query: str, source_focus: SourceFocusName = "web") -> str:
    """Sonar - Perplexity's latest model."""
    return ask(query, Models.SONAR, source_focus)


@mcp.tool
def pplx_gpt52(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 - OpenAI's latest model."""
    return ask(query, Models.GPT_52, source_focus)


@mcp.tool
def pplx_gpt52_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 Thinking - OpenAI's latest model with extended thinking."""
    return ask(query, Models.GPT_52_THINKING, source_focus)


@mcp.tool
def pplx_claude_sonnet(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.6 - Anthropic's fast model."""
    return ask(query, Models.CLAUDE_46_SONNET, source_focus)


@mcp.tool
def pplx_claude_sonnet_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.6 Thinking - Anthropic's fast model with extended thinking."""
    return ask(query, Models.CLAUDE_46_SONNET_THINKING, source_focus)


@mcp.tool
def pplx_gemini_flash(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash - Google's fast model."""
    return ask(query, Models.GEMINI_3_FLASH, source_focus)


@mcp.tool
def pplx_gemini_flash_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash Thinking - Google's fast model with extended thinking."""
    return ask(query, Models.GEMINI_3_FLASH_THINKING, source_focus)


@mcp.tool
def pplx_gemini_pro_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Pro Thinking - Google's most advanced model with extended thinking."""
    return ask(query, Models.GEMINI_3_PRO_THINKING, source_focus)


@mcp.tool
def pplx_grok(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 - xAI's latest model."""
    return ask(query, Models.GROK_41, source_focus)


@mcp.tool
def pplx_grok_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 Thinking - xAI's latest model with extended thinking."""
    return ask(query, Models.GROK_41_THINKING, source_focus)


@mcp.tool
def pplx_kimi_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Kimi K2.5 Thinking - Moonshot AI's latest model."""
    return ask(query, Models.KIMI_K25_THINKING, source_focus)


# =============================================================================
# Usage & Limits Tools
# =============================================================================


@mcp.tool
def pplx_usage(refresh: bool = False) -> str:
    """Check current Perplexity usage limits and remaining quotas.

    Shows remaining Pro Search, Deep Research, Create Files & Apps, and Browser
    Agent queries. Also shows subscription info and file/upload limits.

    Call this before heavy use to plan queries, or after getting rate limit
    errors to understand what's left.

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
