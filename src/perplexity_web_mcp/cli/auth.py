"""CLI utility for Perplexity authentication and user info."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from pathlib import Path
from sys import exit
from typing import NoReturn

from curl_cffi.requests import Session
from orjson import loads
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Confirm, Prompt
from rich.table import Table


BASE_URL: str = "https://www.perplexity.ai"
ENV_KEY: str = "PERPLEXITY_SESSION_TOKEN"
SESSION_COOKIE_NAME: str = "__Secure-next-auth.session-token"

console = Console(stderr=True, soft_wrap=True)


class SubscriptionTier(Enum):
    """Perplexity subscription tiers."""

    FREE = "none"
    PRO = "pro"
    MAX = "max"
    EDUCATION_PRO = "education_pro"
    UNKNOWN = "unknown"

    @classmethod
    def from_api(cls, tier_str: str | None) -> "SubscriptionTier":
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
    def from_api(cls, data: dict) -> "UserInfo":
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
    try:
        session = Session(
            impersonate="chrome",
            headers={"Referer": BASE_URL, "Origin": BASE_URL},
            cookies={SESSION_COOKIE_NAME: token},
        )
        response = session.get(f"{BASE_URL}/api/user")
        if response.status_code == 200:
            return UserInfo.from_api(response.json())
    except Exception:
        pass
    return None


def update_env(token: str) -> bool:
    """Securely updates the .env file with the session token."""

    path = Path(".env")
    line_entry = f'{ENV_KEY}="{token}"'

    try:
        lines = path.read_text(encoding="utf-8").splitlines() if path.exists() else []
        updated = False
        new_lines = []

        for line in lines:
            if line.strip().startswith(ENV_KEY):
                new_lines.append(line_entry)
                updated = True
            else:
                new_lines.append(line)

        if not updated:
            if new_lines and new_lines[-1] != "":
                new_lines.append("")
            new_lines.append(line_entry)

        path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
        return True

    except Exception:
        return False


def _initialize_session() -> tuple[Session, str]:
    """Initialize session and obtain CSRF token."""

    session = Session(impersonate="chrome", headers={"Referer": BASE_URL, "Origin": BASE_URL})

    with console.status("[bold green]Initializing secure connection...", spinner="dots"):
        session.get(BASE_URL)
        csrf_data = loads(session.get(f"{BASE_URL}/api/auth/csrf").content)
        csrf = csrf_data.get("csrfToken")

        if not csrf:
            raise ValueError("Failed to obtain CSRF token.")

    return session, csrf


def _request_verification_code(session: Session, csrf: str, email: str) -> None:
    """Send verification code to user's email."""

    with console.status("[bold green]Sending verification code...", spinner="dots"):
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
            raise ValueError(f"Authentication request failed: {response.text}")


def _validate_and_get_redirect_url(session: Session, email: str, user_input: str) -> str:
    """Validate user input (OTP or magic link) and return redirect URL."""

    with console.status("[bold green]Validating...", spinner="dots"):
        if user_input.startswith("http"):
            return user_input

        response_otp = session.post(
            f"{BASE_URL}/api/auth/otp-redirect-link",
            json={
                "email": email,
                "otp": user_input,
                "redirectUrl": f"{BASE_URL}/?login-source=floatingSignup",
                "emailLoginMethod": "web-otp",
            },
        )

        if response_otp.status_code != 200:
            raise ValueError("Invalid verification code.")

        redirect_path = loads(response_otp.content).get("redirect")

        if not redirect_path:
            raise ValueError("No redirect URL received.")

        return f"{BASE_URL}{redirect_path}" if redirect_path.startswith("/") else redirect_path


def _extract_session_token(session: Session, redirect_url: str) -> str:
    """Extract session token from cookies after authentication."""

    session.get(redirect_url)
    token = session.cookies.get(SESSION_COOKIE_NAME)

    if not token:
        raise ValueError("Authentication successful, but token not found.")

    return token


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
    """Display token, user info, and optionally save to .env file."""

    console.print("\n[bold green]Authentication successful![/bold green]\n")

    # Fetch and display user info
    user_info = get_user_info(token)
    if user_info:
        _display_user_info(user_info)
        console.print()

    # Show token
    console.print(f"[bold white]Session Token:[/bold white]\n[dim]{token[:50]}...{token[-20:]}[/dim]\n")

    prompt_text = f"Save token to [bold yellow].env[/bold yellow] file ({ENV_KEY})?"

    if Confirm.ask(prompt_text, default=True, console=console):
        if update_env(token):
            console.print("[green]Token saved to .env successfully.[/green]")
        else:
            console.print("[red]Failed to save to .env file.[/red]")


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


def auth_non_interactive(email: str, code: str | None = None, auto_save: bool = True) -> str | None:
    """Non-interactive authentication for AI agents.
    
    Args:
        email: Perplexity account email
        code: 6-digit verification code (if None, sends code and returns None)
        auto_save: Whether to automatically save token to .env
        
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
        token = _extract_session_token(session, redirect_url)
        
        # Verify token works
        user_info = get_user_info(token)
        if user_info:
            print(f"Authenticated as: {user_info.email} ({user_info.tier_display})")
        
        if auto_save:
            if update_env(token):
                print("Token saved to .env")
            else:
                print("Warning: Failed to save to .env")
        
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
    
    if "--email" in args:
        # Non-interactive mode for AI agents
        email_idx = args.index("--email")
        email = args[email_idx + 1] if email_idx + 1 < len(args) else None
        
        code = None
        if "--code" in args:
            code_idx = args.index("--code")
            code = args[code_idx + 1] if code_idx + 1 < len(args) else None
        
        no_save = "--no-save" in args
        
        if not email:
            print("Error: --email requires an email address")
            exit(1)
        
        result = auth_non_interactive(email, code, auto_save=not no_save)
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

        token = _extract_session_token(session, redirect_url)

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
