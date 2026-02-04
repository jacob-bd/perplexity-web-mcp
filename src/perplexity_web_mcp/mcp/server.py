"""MCP server implementation using FastMCP."""

from __future__ import annotations

from typing import Literal

from fastmcp import FastMCP

from perplexity_web_mcp.config import ClientConfig, ConversationConfig
from perplexity_web_mcp.core import Perplexity
from perplexity_web_mcp.enums import CitationMode, SearchFocus, SourceFocus
from perplexity_web_mcp.models import Model, Models
from perplexity_web_mcp.token_store import get_token_or_raise, load_token, save_token


mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI using premium models. "
        "Use pplx_query for flexible model selection with thinking toggle. "
        "Or use model-specific tools like pplx_gpt52, pplx_claude_sonnet, etc. "
        "All tools support source_focus: web, academic, social, finance, all. "
        "\n\n"
        "AUTHENTICATION: If you get a 403 error or 'token expired' message, use these tools to re-authenticate:\n"
        "1. pplx_auth_status - Check current authentication status\n"
        "2. pplx_auth_request_code - Send verification code to email (requires email address)\n"
        "3. pplx_auth_complete - Complete auth with the 6-digit code from email\n"
        "Session tokens last ~30 days. After re-authenticating, all pplx_* tools will work again."
    ),
)

SOURCE_FOCUS_MAP = {
    "web": [SourceFocus.WEB],
    "academic": [SourceFocus.ACADEMIC],
    "social": [SourceFocus.SOCIAL],
    "finance": [SourceFocus.FINANCE],
    "all": [SourceFocus.WEB, SourceFocus.ACADEMIC, SourceFocus.SOCIAL],
}

# Model name to Model mapping (supports thinking toggle)
MODEL_MAP: dict[str, tuple[Model, Model | None]] = {
    # (base_model, thinking_model) - None if no thinking variant
    "auto": (Models.BEST, None),
    "sonar": (Models.SONAR, None),
    "deep_research": (Models.DEEP_RESEARCH, None),
    "gpt52": (Models.GPT_52, Models.GPT_52_THINKING),
    "claude_sonnet": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude_opus": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "gemini_flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    "gemini_pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),  # Only thinking variant
    "grok": (Models.GROK_41, Models.GROK_41_THINKING),
    "kimi": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),  # Only thinking variant
}

SourceFocusName = Literal["web", "academic", "social", "finance", "all"]
ModelName = Literal["auto", "sonar", "deep_research", "gpt52", "claude_sonnet", "claude_opus", "gemini_flash", "gemini_pro", "grok", "kimi"]

_client: Perplexity | None = None


def _get_client() -> Perplexity:
    """Get or create Perplexity client."""

    global _client  # noqa: PLW0603

    if _client is None:
        token = get_token_or_raise()
        _client = Perplexity(token, config=ClientConfig())

    return _client


def _ask(query: str, model: Model, source_focus: SourceFocusName = "web") -> str:
    """Execute a query with a specific model."""

    client = _get_client()
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
        answer = conversation.answer or "No answer received"

        response_parts = [answer]

        if conversation.search_results:
            response_parts.append("\n\nCitations:")

            for i, result in enumerate(conversation.search_results, 1):
                url = result.url or ""
                response_parts.append(f"\n[{i}]: {url}")

        return "".join(response_parts)

    except Exception as error:
        error_str = str(error)
        if "403" in error_str or "forbidden" in error_str.lower() or "token" in error_str.lower():
            return (
                f"Error: Session token missing or expired.\n\n"
                f"USE THESE MCP TOOLS TO AUTHENTICATE:\n"
                f"1. Call pplx_auth_request_code(email='YOUR_EMAIL') - sends verification code\n"
                f"2. Check email for 6-digit code from Perplexity\n"
                f"3. Call pplx_auth_complete(email='YOUR_EMAIL', code='XXXXXX')\n\n"
                f"Original error: {error_str}"
            )
        return f"Error: {error_str}"


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
    model_tuple = MODEL_MAP.get(model, (Models.BEST, None))
    base_model, thinking_model = model_tuple
    
    # Use thinking model if requested and available
    selected_model = thinking_model if thinking and thinking_model else base_model
    
    return _ask(query, selected_model, source_focus)


@mcp.tool
def pplx_ask(query: str, source_focus: SourceFocusName = "web") -> str:
    """Ask a question with real-time data from the internet (auto-selects best model)."""

    return _ask(query, Models.BEST, source_focus)


@mcp.tool
def pplx_deep_research(query: str, source_focus: SourceFocusName = "web") -> str:
    """Deep Research - In-depth reports with more sources, charts, and advanced reasoning."""

    return _ask(query, Models.DEEP_RESEARCH, source_focus)


@mcp.tool
def pplx_sonar(query: str, source_focus: SourceFocusName = "web") -> str:
    """Sonar - Perplexity's latest model."""

    return _ask(query, Models.SONAR, source_focus)


@mcp.tool
def pplx_gpt52(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 - OpenAI's latest model."""

    return _ask(query, Models.GPT_52, source_focus)


@mcp.tool
def pplx_gpt52_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 Thinking - OpenAI's latest model with extended thinking."""

    return _ask(query, Models.GPT_52_THINKING, source_focus)


@mcp.tool
def pplx_claude_sonnet(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.5 - Anthropic's fast model."""

    return _ask(query, Models.CLAUDE_45_SONNET, source_focus)


@mcp.tool
def pplx_claude_sonnet_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.5 Thinking - Anthropic's fast model with extended thinking."""

    return _ask(query, Models.CLAUDE_45_SONNET_THINKING, source_focus)


@mcp.tool
def pplx_gemini_flash(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash - Google's fast model."""

    return _ask(query, Models.GEMINI_3_FLASH, source_focus)


@mcp.tool
def pplx_gemini_flash_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash Thinking - Google's fast model with extended thinking."""

    return _ask(query, Models.GEMINI_3_FLASH_THINKING, source_focus)


@mcp.tool
def pplx_gemini_pro_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Pro Thinking - Google's most advanced model with extended thinking."""

    return _ask(query, Models.GEMINI_3_PRO_THINKING, source_focus)


@mcp.tool
def pplx_grok(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 - xAI's latest model."""

    return _ask(query, Models.GROK_41, source_focus)


@mcp.tool
def pplx_grok_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 Thinking - xAI's latest model with extended thinking."""

    return _ask(query, Models.GROK_41_THINKING, source_focus)


@mcp.tool
def pplx_kimi_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Kimi K2.5 Thinking - Moonshot AI's latest model."""

    return _ask(query, Models.KIMI_K25_THINKING, source_focus)


# =============================================================================
# Authentication Tools
# =============================================================================

# Session state for auth flow
_auth_session: dict = {}


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
    
    # Verify token is valid
    user_info = get_user_info(token)
    if user_info:
        return (
            f"AUTHENTICATED\n\n"
            f"Email: {user_info.email}\n"
            f"Username: {user_info.username}\n"
            f"Subscription: {user_info.tier_display}"
        )
    else:
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
    
    global _auth_session
    
    BASE_URL = "https://www.perplexity.ai"
    
    try:
        # Initialize session
        session = Session(impersonate="chrome", headers={"Referer": BASE_URL, "Origin": BASE_URL})
        session.get(BASE_URL)
        csrf_data = loads(session.get(f"{BASE_URL}/api/auth/csrf").content)
        csrf = csrf_data.get("csrfToken")
        
        if not csrf:
            return "ERROR: Failed to obtain CSRF token. Please try again."
        
        # Send verification code
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
        
        # Store session for completion
        _auth_session = {"session": session, "email": email}
        
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
    
    global _auth_session, _client
    
    BASE_URL = "https://www.perplexity.ai"
    SESSION_COOKIE_NAME = "__Secure-next-auth.session-token"
    
    try:
        # Use existing session or create new one
        if _auth_session and _auth_session.get("email") == email:
            session = _auth_session["session"]
        else:
            # Create fresh session if none exists
            session = Session(impersonate="chrome", headers={"Referer": BASE_URL, "Origin": BASE_URL})
            session.get(BASE_URL)
        
        # Validate code and get redirect URL
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
            return f"ERROR: Invalid verification code. Please check and try again."
        
        redirect_path = loads(response.content).get("redirect")
        if not redirect_path:
            return "ERROR: No redirect URL received. Please try again."
        
        redirect_url = f"{BASE_URL}{redirect_path}" if redirect_path.startswith("/") else redirect_path
        
        # Get session token
        session.get(redirect_url)
        token = session.cookies.get(SESSION_COOKIE_NAME)
        
        if not token:
            return "ERROR: Authentication succeeded but token not found."
        
        # Save token
        if save_token(token):
            # Clear cached client so it reloads with new token
            _client = None
            _auth_session = {}
            
            # Get user info
            user_info = get_user_info(token)
            if user_info:
                return (
                    f"SUCCESS: Authentication complete!\n\n"
                    f"Email: {user_info.email}\n"
                    f"Subscription: {user_info.tier_display}\n\n"
                    f"All pplx_* tools are now ready to use."
                )
            else:
                return "SUCCESS: Token saved. You can now use pplx_* tools."
        else:
            return "ERROR: Failed to save token. Check file permissions."
            
    except Exception as e:
        return f"ERROR: {e}"


def main() -> None:
    """Run the MCP server."""

    mcp.run()


if __name__ == "__main__":
    main()
