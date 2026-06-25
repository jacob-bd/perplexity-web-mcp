"""Diagnostic checks for perplexity-web-mcp installation.

Validates installation, authentication, configuration, rate limits,
and connectivity -- everything an AI agent or user needs to know
before using the tool.
"""

from __future__ import annotations

from importlib import metadata
import os
import shutil
import sys

from perplexity_web_mcp.token_store import TOKEN_FILE, load_token


def _check(label: str, ok: bool, detail: str, fix: str = "") -> bool:
    """Print a check result line and return the status."""
    icon = "✓" if ok else "✗"
    line = f"  {icon} {label}: {detail}"
    if not ok and fix:
        line += f"  -> {fix}"
    print(line)
    return ok


def _check_installation() -> bool:
    print("Installation")
    all_ok = True

    try:
        version = metadata.version("perplexity-web-mcp-cli")
        _check("perplexity-web-mcp-cli", True, version)
    except metadata.PackageNotFoundError:
        all_ok = (
            _check("perplexity-web-mcp-cli", False, "not installed", "pip install perplexity-web-mcp-cli") and all_ok
        )

    pwm_path = shutil.which("pwm")
    _check("pwm", pwm_path is not None, pwm_path or "not in PATH", "pip install -e '.[mcp]'")

    pwm_mcp_path = shutil.which("pwm-mcp")
    all_ok = (
        _check("pwm-mcp", pwm_mcp_path is not None, pwm_mcp_path or "not in PATH", "pip install -e '.[mcp]'") and all_ok
    )

    try:
        import perplexity_web_mcp.api.server  # noqa: F401

        _check("pwm api", True, "module available", "")
    except ImportError:
        _check("pwm api", False, "module not found", "pip install -e .")

    return all_ok


def _check_authentication(token: str | None, token_exists: bool) -> bool:
    print("\nAuthentication")

    if not token_exists:
        return _check("Token", False, "not found", "pwm login")

    token_source = "file" if TOKEN_FILE.exists() else "env"
    _check("Token", True, f"present ({token_source}, {len(token)} chars)")  # type: ignore[arg-type]

    from perplexity_web_mcp.cli.auth import get_user_info

    user_info = get_user_info(token)
    if user_info:
        _check("Account", True, f"{user_info.email}")
        _check("Subscription", True, user_info.tier_display)
        return True

    return _check("Account", False, "token invalid or expired", "pwm login")


def _check_connectivity(token: str | None, token_exists: bool) -> bool:
    print("\nConnectivity")

    if not token_exists:
        _check("Search endpoint", False, "skipped (no token)", "pwm login first")
        return True

    try:
        from curl_cffi.requests import Session as CurlSession

        from perplexity_web_mcp.constants import API_BASE_URL, ENDPOINT_SEARCH_INIT, SESSION_COOKIE_NAME

        with CurlSession(impersonate="chrome") as s:
            s.cookies.set(SESSION_COOKIE_NAME, token)  # type: ignore[arg-type]
            resp = s.get(f"{API_BASE_URL}{ENDPOINT_SEARCH_INIT}", params={"q": "test"}, timeout=10)

        if resp.status_code == 200:
            return _check("Search endpoint", True, "reachable")
        if resp.status_code == 403:
            return _check(
                "Search endpoint",
                False,
                "403 Forbidden",
                'Check VPN/proxy/network/IP restrictions; try: LOG_LEVEL=debug pwm ask "test"',
            )
        return _check(
            "Search endpoint",
            False,
            f"unexpected status {resp.status_code}",
            "check network connection",
        )
    except Exception as exc:
        return _check("Search endpoint", False, f"error: {exc}", "check network connection")


def _check_rate_limits(token: str | None, token_exists: bool) -> bool:
    print("\nRate Limits")

    if not token_exists:
        _check("Rate limits", False, "skipped (no token)", "pwm login first")
        return True

    from perplexity_web_mcp.rate_limits import fetch_rate_limits

    limits = fetch_rate_limits(token)
    if not limits:
        return _check("Rate limits", False, "could not fetch", "check network connection")

    pro_ok = limits.remaining_pro > 0
    research_ok = limits.remaining_research > 0
    all_ok = _check("Pro Search", pro_ok, f"{limits.remaining_pro} remaining", "wait for weekly reset")
    _check("Deep Research", research_ok, f"{limits.remaining_research} remaining", "wait for monthly reset")
    _check("Create Files & Apps", True, f"{limits.remaining_labs} remaining")
    _check("Browser Agent", True, f"{limits.remaining_agentic_research} remaining")
    return all_ok


def _check_mcp_config() -> bool:
    print("\nMCP Configuration")

    from perplexity_web_mcp.cli.setup import _get_tools, _is_configured_compat

    tools = _get_tools()
    any_configured = False
    for tool in tools:
        configured = _is_configured_compat(tool)
        if configured:
            any_configured = True
        if configured:
            _check(tool.name, True, "configured")
        else:
            _check(tool.name, False, "not configured", f"pwm setup add {tool.name}")

    return any_configured


def _check_skills(verbose: bool) -> None:
    print("\nSkill Installation")

    from perplexity_web_mcp.cli.skill import SKILL_DIR_NAME, _get_current_version, _get_installed_version, _get_targets

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


def _check_security(verbose: bool) -> bool:
    if not verbose or not TOKEN_FILE.exists():
        return True

    print("\nSecurity")
    mode = oct(TOKEN_FILE.stat().st_mode)[-3:]
    secure = mode == "600"
    return _check("Token permissions", secure, mode, "chmod 600 ~/.config/perplexity-web-mcp/token")


def _check_environment(verbose: bool) -> bool:
    """Print local runtime diagnostics in verbose mode."""

    if not verbose:
        return True

    print("\nEnvironment")
    python_version = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    _check("Python", True, python_version)

    try:
        curl_cffi_version = metadata.version("curl-cffi")
        _check("curl-cffi", True, curl_cffi_version)
    except metadata.PackageNotFoundError:
        _check("curl-cffi", False, "not installed", "reinstall perplexity-web-mcp-cli")

    proxy_keys = ("HTTPS_PROXY", "HTTP_PROXY", "ALL_PROXY")
    set_proxy_keys = [key for key in proxy_keys if os.environ.get(key)]
    if set_proxy_keys:
        _check("Proxy env", False, ", ".join(set_proxy_keys), "unset proxy env vars and retry")
    else:
        _check("Proxy env", True, "none set")

    debug_values = []
    for key in ("LOG_LEVEL", "PWM_DEBUG"):
        value = os.environ.get(key)
        if value:
            debug_values.append(f"{key}={value}")
    _check("Debug env", True, ", ".join(debug_values) if debug_values else "none set")

    return True


def cmd_doctor(args: list[str]) -> int:
    """Handle: pwm doctor [--verbose]"""
    verbose = "-v" in args or "--verbose" in args

    print("\nPerplexity Web MCP Doctor\n")

    token = load_token()
    token_exists = token is not None and len(token) > 10

    all_ok = _check_installation()
    all_ok = _check_authentication(token, token_exists) and all_ok
    all_ok = _check_connectivity(token, token_exists) and all_ok
    all_ok = _check_rate_limits(token, token_exists) and all_ok
    all_ok = _check_mcp_config() and all_ok
    _check_skills(verbose)
    all_ok = _check_environment(verbose) and all_ok
    all_ok = _check_security(verbose) and all_ok

    print()
    if all_ok:
        print("✓ All checks passed!")
    else:
        print("Some checks failed. See suggestions above (->).")

    return 0 if all_ok else 1
