"""Diagnostic checks for perplexity-web-mcp installation.

Validates installation, authentication, configuration, rate limits,
and connectivity -- everything an AI agent or user needs to know
before using the tool.
"""

from __future__ import annotations

import shutil
import sys
from importlib import metadata
from pathlib import Path

from perplexity_web_mcp.token_store import TOKEN_FILE, load_token


def _check(label: str, ok: bool, detail: str, fix: str = "") -> bool:
    """Print a check result line and return the status."""
    icon = "✓" if ok else "✗"
    line = f"  {icon} {label}: {detail}"
    if not ok and fix:
        line += f"  -> {fix}"
    print(line)
    return ok


def cmd_doctor(args: list[str]) -> int:
    """Handle: pwm doctor [--verbose]"""
    verbose = "-v" in args or "--verbose" in args
    all_ok = True

    print("\nPerplexity Web MCP Doctor\n")

    # --- Installation ---
    print("Installation")
    try:
        version = metadata.version("perplexity-web-mcp-cli")
        _check("perplexity-web-mcp-cli", True, version)
    except metadata.PackageNotFoundError:
        all_ok = _check("perplexity-web-mcp-cli", False, "not installed", "pip install perplexity-web-mcp-cli") and all_ok

    pwm_path = shutil.which("pwm")
    _check("pwm", pwm_path is not None, pwm_path or "not in PATH", "pip install -e '.[mcp]'")

    pwm_mcp_path = shutil.which("pwm-mcp")
    all_ok = _check("pwm-mcp", pwm_mcp_path is not None, pwm_mcp_path or "not in PATH", "pip install -e '.[mcp]'") and all_ok

    try:
        import perplexity_web_mcp.api.server  # noqa: F401

        _check("pwm api", True, "module available", "")
    except ImportError:
        _check("pwm api", False, "module not found", "pip install -e .")

    # --- Authentication ---
    print("\nAuthentication")
    token = load_token()
    token_exists = token is not None and len(token) > 10

    if token_exists:
        token_source = "file" if TOKEN_FILE.exists() else "env"
        _check("Token", True, f"present ({token_source}, {len(token)} chars)")

        from perplexity_web_mcp.cli.auth import get_user_info
        user_info = get_user_info(token)
        if user_info:
            _check("Account", True, f"{user_info.email}")
            _check("Subscription", True, user_info.tier_display)
        else:
            all_ok = _check("Account", False, "token invalid or expired", "pwm login") and all_ok
    else:
        all_ok = _check("Token", False, "not found", "pwm login") and all_ok

    # --- Rate Limits ---
    print("\nRate Limits")
    if token_exists:
        from perplexity_web_mcp.rate_limits import fetch_rate_limits
        limits = fetch_rate_limits(token)
        if limits:
            pro_ok = limits.remaining_pro > 0
            research_ok = limits.remaining_research > 0
            all_ok = _check("Pro Search", pro_ok, f"{limits.remaining_pro} remaining", "wait for weekly reset") and all_ok
            _check("Deep Research", research_ok, f"{limits.remaining_research} remaining", "wait for monthly reset")
            _check("Create Files & Apps", True, f"{limits.remaining_labs} remaining")
            _check("Browser Agent", True, f"{limits.remaining_agentic_research} remaining")
        else:
            all_ok = _check("Rate limits", False, "could not fetch", "check network connection") and all_ok
    else:
        _check("Rate limits", False, "skipped (no token)", "pwm login first")

    # --- MCP Configuration ---
    print("\nMCP Configuration")
    from perplexity_web_mcp.cli.setup import _get_tools, _is_configured
    tools = _get_tools()
    any_configured = False
    for tool in tools:
        configured = _is_configured(tool)
        if configured:
            any_configured = True
        label = tool.name
        if configured:
            _check(label, True, "configured")
        else:
            _check(label, False, "not configured", f"pwm setup add {tool.name}")

    if not any_configured:
        all_ok = False

    # --- Skill Installation ---
    print("\nSkill Installation")
    from perplexity_web_mcp.cli.skill import _get_targets, _get_installed_version, _get_current_version, SKILL_DIR_NAME
    skill_targets = _get_targets()
    current_ver = _get_current_version()
    any_skill = False
    for t in skill_targets:
        user_ver = _get_installed_version(t.user_dir / SKILL_DIR_NAME)
        if user_ver:
            any_skill = True
            if user_ver == current_ver:
                _check(t.name, True, f"v{user_ver}")
            else:
                _check(t.name, True, f"v{user_ver} (outdated, current: v{current_ver})")
        elif verbose:
            _check(t.name, False, "not installed", f"pwm skill install {t.name}")

    if not any_skill:
        _check("Skills", False, "no skills installed", "pwm skill install claude-code")

    # --- Token File Permissions ---
    if verbose and TOKEN_FILE.exists():
        print("\nSecurity")
        mode = oct(TOKEN_FILE.stat().st_mode)[-3:]
        secure = mode == "600"
        all_ok = _check("Token permissions", secure, mode, "chmod 600 ~/.config/perplexity-web-mcp/token") and all_ok

    # --- Summary ---
    print()
    if all_ok:
        print("✓ All checks passed!")
    else:
        print("Some checks failed. See suggestions above (->).")

    return 0 if all_ok else 1
