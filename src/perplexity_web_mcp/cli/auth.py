"""CLI utility for Perplexity authentication and user info."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from sys import exit
from typing import Any, NoReturn

from curl_cffi.requests import Session
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.table import Table

from perplexity_web_mcp.auth import (
    create_auth_session,
    extract_session_token,
    follow_auth_callback,
    request_verification_code,
    resolve_redirect_url,
    verify_totp,
)
from perplexity_web_mcp.constants import API_BASE_URL, APP_HEADERS, SESSION_COOKIE_NAME
from perplexity_web_mcp.http import get_system_ca_bundle_path
from perplexity_web_mcp.limits import REST_API_TIMEOUT
from perplexity_web_mcp.token_store import load_token
from perplexity_web_mcp.token_store import save_token as save_token_to_config


BASE_URL: str = API_BASE_URL

console = Console(stderr=True, soft_wrap=True)


class SubscriptionTier(Enum):
    """Perplexity subscription tiers."""

    FREE = "none"
    PRO = "pro"
    MAX = "max"
    EDUCATION_PRO = "education_pro"
    UNKNOWN = "unknown"

    @classmethod
    def from_api(cls, tier_str: str | None) -> SubscriptionTier:
        """Convert API string to enum."""
        if tier_str is None or tier_str == "none":
            return cls.FREE
        for member in cls:
            if member.value == tier_str:
                return member
        return cls.UNKNOWN


@dataclass
class UserInfo:
    """User information from Perplexity API."""

    id: str
    email: str
    username: str
    name: str | None
    subscription_tier: SubscriptionTier
    subscription_status: str
    subscription_source: str
    payment_tier: str
    is_in_organization: bool
    image: str | None = None

    @classmethod
    def from_api(cls, data: dict) -> UserInfo:
        """Create from API response."""
        return cls(
            id=data.get("id", ""),
            email=data.get("email", ""),
            username=data.get("username", ""),
            name=data.get("name"),
            subscription_tier=SubscriptionTier.from_api(data.get("subscription_tier")),
            subscription_status=data.get("subscription_status", "none"),
            subscription_source=data.get("subscription_source", "none"),
            payment_tier=data.get("payment_tier", "none"),
            is_in_organization=data.get("is_in_organization", False),
            image=data.get("image"),
        )

    @property
    def tier_display(self) -> str:
        """Display name for subscription tier."""
        return {
            SubscriptionTier.FREE: "Free",
            SubscriptionTier.PRO: "Pro ($20/mo)",
            SubscriptionTier.MAX: "Max ($200/mo)",
            SubscriptionTier.EDUCATION_PRO: "Education Pro ($10/mo)",
            SubscriptionTier.UNKNOWN: "Unknown",
        }.get(self.subscription_tier, "Unknown")


def get_user_info(token: str) -> UserInfo | None:
    """Fetch user info from Perplexity API."""
    import logging

    _logger = logging.getLogger(__name__)

    verify_bundle = get_system_ca_bundle_path()
    session_kwargs: dict[str, Any] = {
        "impersonate": "chrome",
        "headers": {**APP_HEADERS, "Referer": BASE_URL, "Origin": BASE_URL},
        "cookies": {SESSION_COOKIE_NAME: token},
        "timeout": REST_API_TIMEOUT,
    }
    if verify_bundle:
        session_kwargs["verify"] = verify_bundle

    try:
        with Session(**session_kwargs) as session:
            response = session.get(f"{BASE_URL}/api/user")
            if response.status_code == 200:
                return UserInfo.from_api(response.json())
            _logger.debug(f"get_user_info: HTTP {response.status_code}")
    except Exception as exc:
        _logger.debug(f"get_user_info failed: {exc}")
    return None


def _initialize_session() -> tuple[Session, str]:
    """Initialize session and obtain CSRF token."""
    with console.status("[bold green]Initializing secure connection...", spinner="dots"):
        return create_auth_session()


def _request_verification_code(session: Session, csrf: str, email: str) -> None:
    """Send verification code to user's email."""
    with console.status("[bold green]Sending verification code...", spinner="dots"):
        request_verification_code(session, csrf, email)


def _validate_and_get_redirect_url(session: Session, email: str, user_input: str) -> str:
    """Validate user input (OTP or magic link) and return redirect URL."""
    with console.status("[bold green]Validating...", spinner="dots"):
        return resolve_redirect_url(session, email, user_input)


def _complete_auth_callback(session: Session, redirect_url: str, totp_code: str | None = None) -> str:
    """Complete the callback and optional TOTP challenge, then return the session token."""
    challenge_token = follow_auth_callback(session, redirect_url)
    if challenge_token:
        if not totp_code:
            raise ValueError("TOTP is required. Re-run with --totp-code and the code from your authenticator app.")
        verify_totp(session, challenge_token, totp_code)
    return extract_session_token(session)


def _prompt_and_verify_totp(session: Session, challenge_token: str) -> None:
    """Prompt until a valid TOTP code completes the challenge."""
    console.print("\n[bold cyan]Step 3: Two-Factor Authentication[/bold cyan]")
    console.print("  Enter the 6-digit code from your authenticator app.")

    while True:
        totp_code = Prompt.ask("  Enter TOTP code", console=console).strip()
        try:
            with console.status("[bold green]Verifying TOTP...", spinner="dots"):
                verify_totp(session, challenge_token, totp_code)
            return
        except ValueError as error:
            console.print(f"[red]  {error}[/red]")


def _display_user_info(user_info: UserInfo) -> None:
    """Display user information in a table."""

    table = Table(title="Account Information", show_header=False, border_style="cyan")
    table.add_column("Field", style="bold")
    table.add_column("Value")

    table.add_row("Email", user_info.email)
    table.add_row("Username", user_info.username)
    if user_info.name:
        table.add_row("Name", user_info.name)
    table.add_row("Subscription", user_info.tier_display)
    table.add_row("Status", user_info.subscription_status)
    if user_info.is_in_organization:
        table.add_row("Organization", "Yes")

    console.print(table)


def _display_and_save_token(token: str) -> None:
    """Display token, user info, and save to config directory."""

    console.print("\n[bold green]Authentication successful![/bold green]\n")

    # Fetch and display user info
    user_info = get_user_info(token)
    if user_info:
        _display_user_info(user_info)
        console.print()

    # Show token
    console.print(f"[bold white]Session Token:[/bold white]\n[dim]{token[:50]}...{token[-20:]}[/dim]\n")

    # Save to config directory (~/.config/perplexity-web-mcp/token)
    if save_token_to_config(token):
        console.print("[green]Token saved to ~/.config/perplexity-web-mcp/token[/green]")
    else:
        console.print("[red]Failed to save token to config directory.[/red]")


def _show_header() -> None:
    """Display welcome header."""

    console.print(
        Panel(
            "[bold white]Perplexity Web MCP[/bold white]\n\n"
            "Authenticate with your Perplexity account via email.\n"
            "[dim]Supports Free, Pro, and Max accounts.[/dim]",
            title="Authentication",
            border_style="cyan",
        )
    )


def _show_exit_message() -> None:
    """Display security note and wait for user to exit."""

    console.print("\n[bold yellow]Security Note:[/bold yellow]")
    console.print("Press [bold white]ENTER[/bold white] to clear screen and exit.")
    console.input()


def auth_non_interactive(
    email: str,
    code: str | None = None,
    auto_save: bool = True,
    totp_code: str | None = None,
) -> str | None:
    """Non-interactive authentication for AI agents.

    Args:
        email: Perplexity account email
        code: 6-digit verification code (if None, sends code and returns None)
        auto_save: Whether to automatically save token to config
        totp_code: Optional 6-digit authenticator code for accounts with TOTP enabled

    Returns:
        Session token if code provided, None if code was sent

    Usage:
        # Step 1: Request verification code
        pwm-auth --email user@example.com

        # Step 2: Complete auth with code from email
        pwm-auth --email user@example.com --code 123456
    """
    try:
        session, csrf = _initialize_session()

        if code is None:
            # Step 1: Send verification code
            _request_verification_code(session, csrf, email)
            print(f"Verification code sent to {email}")
            print("Check email and run: pwm-auth --email EMAIL --code CODE")
            return None

        # Step 2: Complete authentication
        redirect_url = _validate_and_get_redirect_url(session, email, code)
        token = _complete_auth_callback(session, redirect_url, totp_code)

        # Verify token works
        user_info = get_user_info(token)
        if user_info:
            print(f"Authenticated as: {user_info.email} ({user_info.tier_display})")

        if auto_save:
            if save_token_to_config(token):
                print("Token saved to ~/.config/perplexity-web-mcp/token")
            else:
                print("Warning: Failed to save token to config")

        # Output token for capture
        print(f"TOKEN={token}")
        return token

    except Exception as e:
        print(f"Error: {e}")
        return None


def main() -> NoReturn:
    """Executes the authentication flow."""
    import sys

    # Check for non-interactive mode (CLI args)
    args = sys.argv[1:]

    if "--help" in args or "-h" in args:
        console.print(
            Panel(
                "[bold white]pwm-auth[/bold white] - Perplexity Web MCP Authentication\n\n"
                "[bold cyan]Usage:[/bold cyan]\n"
                "  pwm-auth                              Interactive login (email + code)\n"
                "  pwm-auth --check                      Check current auth status\n"
                "  pwm-auth --email EMAIL                Send verification code to email\n"
                "  pwm-auth --email EMAIL --code CODE    Complete auth with code\n"
                "  pwm-auth --help                       Show this help message\n\n"
                "[bold cyan]Options:[/bold cyan]\n"
                "  --check          Check if authenticated without logging in\n"
                "  --email EMAIL    Email address for non-interactive auth\n"
                "  --code CODE      6-digit verification code from email\n"
                "  --totp-code CODE 6-digit code from your authenticator app\n"
                "  --no-save        Don't save token to config (non-interactive only)\n"
                "  -h, --help       Show this help message\n\n"
                "[bold cyan]Token Storage:[/bold cyan]\n"
                "  ~/.config/perplexity-web-mcp/token\n\n"
                "[bold cyan]Examples:[/bold cyan]\n"
                "  [dim]# Interactive login[/dim]\n"
                "  pwm-auth\n\n"
                "  [dim]# Check if already logged in[/dim]\n"
                "  pwm-auth --check\n\n"
                "  [dim]# Non-interactive (for AI agents)[/dim]\n"
                "  pwm-auth --email user@example.com\n"
                "  pwm-auth --email user@example.com --code 123456",
                title="Help",
                border_style="cyan",
            )
        )
        exit(0)

    if "--check" in args:
        # Check if already authenticated
        token = load_token()
        if not token:
            console.print("[red]Not authenticated.[/red] No saved token found.")
            console.print("Run [bold]pwm-auth[/bold] to log in.")
            exit(1)

        user_info = get_user_info(token)
        if user_info:
            console.print("[bold green]Authenticated[/bold green]\n")
            _display_user_info(user_info)
            exit(0)
        else:
            console.print("[red]Token expired or invalid.[/red]")
            console.print("Run [bold]pwm-auth[/bold] to re-authenticate.")
            exit(1)

    if "--email" in args:
        # Non-interactive mode for AI agents
        email_idx = args.index("--email")
        email = args[email_idx + 1] if email_idx + 1 < len(args) else None

        code = None
        if "--code" in args:
            code_idx = args.index("--code")
            code = args[code_idx + 1] if code_idx + 1 < len(args) else None

        totp_code = None
        if "--totp-code" in args:
            totp_idx = args.index("--totp-code")
            totp_code = args[totp_idx + 1] if totp_idx + 1 < len(args) else None

        no_save = "--no-save" in args

        if not email:
            print("Error: --email requires an email address")
            exit(1)

        result = auth_non_interactive(email, code, auto_save=not no_save, totp_code=totp_code)
        exit(0 if result or code is None else 1)

    # Interactive mode (original behavior)
    try:
        _show_header()

        session, csrf = _initialize_session()

        console.print("\n[bold cyan]Step 1: Email[/bold cyan]")
        email = Prompt.ask("  Enter your Perplexity email", console=console)
        _request_verification_code(session, csrf, email)

        console.print("\n[bold cyan]Step 2: Verification[/bold cyan]")
        console.print("  Check your email for a [bold]6-digit code[/bold] or [bold]magic link[/bold].")
        user_input = Prompt.ask("  Enter code or paste link", console=console).strip()
        redirect_url = _validate_and_get_redirect_url(session, email, user_input)
        challenge_token = follow_auth_callback(session, redirect_url)
        if challenge_token:
            _prompt_and_verify_totp(session, challenge_token)
        token = extract_session_token(session)

        _display_and_save_token(token)

        _show_exit_message()

        exit(0)

    except KeyboardInterrupt:
        exit(0)

    except Exception as error:
        console.print(f"\n[bold red]Error:[/bold red] {error}")
        console.input("[dim]Press ENTER to exit...[/dim]")
        exit(1)


if __name__ == "__main__":
    main()
