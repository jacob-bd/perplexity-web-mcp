"""Unified CLI for Perplexity Web MCP.

Entry point: pwm

Subcommands:
    pwm login           Authenticate with Perplexity (interactive or non-interactive)
    pwm ask "query"     Ask a question (web search + AI model)
    pwm research "q"    Deep research on a topic
    pwm api             Start the Anthropic/OpenAI API-compatible server
    pwm usage           Check remaining rate limits and quotas
    pwm hack claude     Launch Claude Code connected to Perplexity models
    pwm skill           Manage skill installation across AI platforms
    pwm doctor          Diagnose installation, auth, config, and limits
    pwm --ai            Print AI-optimized documentation (for LLM agents)
    pwm --help          Show help
    pwm --version       Show version
"""

from __future__ import annotations

import sys
from typing import NoReturn

from perplexity_web_mcp.exceptions import AuthenticationError, RateLimitError
from perplexity_web_mcp.shared import (
    MODEL_MAP,
    MODEL_NAMES,
    SOURCE_FOCUS_NAMES,
    Models,
    SourceFocusName,
    ask,
    get_limit_cache,
    resolve_model,
)
from perplexity_web_mcp.token_store import load_token


def _print_help() -> None:
    """Print usage help."""
    print(
        "pwm - Perplexity Web MCP CLI\n"
        "\n"
        "Usage:\n"
        "  pwm ask <query> [options]       Ask a question using Perplexity AI\n"
        "  pwm research <query> [options]  Deep research on a topic\n"
        "  pwm login [options]             Authenticate with Perplexity\n"
        "  pwm usage [--refresh]           Check remaining rate limits and quotas\n"
        "  pwm api [options]               Start API server (Anthropic/OpenAI compatible)\n"
        "  pwm setup [add|remove|list]     Configure MCP server for AI tools\n"
        "  pwm hack claude [options]       Launch Claude Code using Perplexity models\n"
        "  pwm skill [install|list|...]    Manage skill across AI platforms\n"
        "  pwm doctor [-v]                 Diagnose installation, auth, and config\n"
        "  pwm --ai                        Print AI-optimized documentation\n"
        "  pwm --version                   Show version\n"
        "  pwm --help                      Show this help\n"
        "\n"
        "Ask options:\n"
        f"  -m, --model MODEL     Model to use ({', '.join(MODEL_NAMES)}) [default: auto]\n"
        "  -t, --thinking        Enable extended thinking mode\n"
        f"  -s, --source SOURCE   Source focus ({', '.join(SOURCE_FOCUS_NAMES)}) [default: web]\n"
        "  --json                Output as JSON (answer + citations)\n"
        "  --no-citations        Suppress citation URLs\n"
        "  --intent INTENT       Routing intent: quick, standard, detailed, research [default: standard]\n"
        "\n"
        "API options:\n"
        "  --host HOST           Bind address [default: 0.0.0.0]\n"
        "  -p, --port PORT       Port number [default: 8080]\n"
        "  --model MODEL         Default model [default: auto]\n"
        "  --log-level LEVEL     Log level [default: info]\n"
        "\n"
        "Research options:\n"
        f"  -s, --source SOURCE   Source focus ({', '.join(SOURCE_FOCUS_NAMES)}) [default: web]\n"
        "  --json                Output as JSON\n"
        "\n"
        "Login options:\n"
        "  --check               Check current auth status (no login prompt)\n"
        "  --email EMAIL         Send verification code to email (non-interactive)\n"
        "  --code CODE           Complete auth with 6-digit code from email\n"
        "  --no-save             Don't save token to config\n"
        "\n"
        "Examples:\n"
        '  pwm ask "What is quantum computing?"\n'
        '  pwm ask "latest AI news" -m gpt52 -s academic\n'
        '  pwm ask "explain transformers" -m claude_sonnet --thinking\n'
        '  pwm research "agentic AI trends 2026"\n'
        "  pwm login\n"
        "  pwm login --check\n"
        "  pwm usage\n"
        "  pwm setup list\n"
        "  pwm setup add cursor\n"
        "  pwm skill install claude-code\n"
        "  pwm doctor\n"
    )


def _print_version() -> None:
    """Print version."""
    from importlib import metadata

    version = metadata.version("perplexity-web-mcp-cli")
    print(f"perplexity-web-mcp-cli {version}")


def _cmd_api(args: list[str]) -> int:
    """Handle: pwm api [options]"""
    host = "0.0.0.0"
    port = 8080
    log_level = "INFO"
    default_model = "auto"

    i = 0
    while i < len(args):
        arg = args[i]
        if arg in ("--host",) and i + 1 < len(args):
            host = args[i + 1]
            i += 2
        elif arg in ("-p", "--port") and i + 1 < len(args):
            port = int(args[i + 1])
            i += 2
        elif arg in ("--log-level",) and i + 1 < len(args):
            log_level = args[i + 1]
            i += 2
        elif arg in ("--model",) and i + 1 < len(args):
            default_model = args[i + 1]
            i += 2
        elif arg in ("--help", "-h"):
            print(
                "pwm api - Start the Anthropic/OpenAI API-compatible server\n"
                "\n"
                "Usage: pwm api [options]\n"
                "\n"
                "Options:\n"
                "  --host HOST           Bind address [default: 0.0.0.0]\n"
                "  -p, --port PORT       Port number [default: 8080]\n"
                "  --model MODEL         Default model [default: auto]\n"
                "  --log-level LEVEL     Log level: debug, info, warning, error [default: info]\n"
            )
            return 0
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    import os

    os.environ.setdefault("HOST", host)
    os.environ.setdefault("PORT", str(port))
    os.environ.setdefault("LOG_LEVEL", log_level)
    os.environ.setdefault("DEFAULT_MODEL", default_model)

    from perplexity_web_mcp.api import run_server

    run_server()
    return 0


def _cmd_ask(args: list[str]) -> int:
    """Handle: pwm ask <query> [options]"""
    if not args or args[0].startswith("-"):
        print("Error: pwm ask requires a query string.\n", file=sys.stderr)
        print('Usage: pwm ask "your question" [--model MODEL] [--thinking] [--source SOURCE]', file=sys.stderr)
        return 1

    query = args[0]
    model_name = "auto"
    thinking = False
    source: SourceFocusName = "web"
    json_output = False
    no_citations = False
    explicit_model = False
    intent = "standard"

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-m", "--model") and i + 1 < len(args):
            model_name = args[i + 1]
            explicit_model = True
            i += 2
        elif arg in ("-t", "--thinking"):
            thinking = True
            i += 1
        elif arg in ("-s", "--source") and i + 1 < len(args):
            source = args[i + 1]  # type: ignore[assignment]
            i += 2
        elif arg == "--json":
            json_output = True
            i += 1
        elif arg == "--no-citations":
            no_citations = True
            i += 1
        elif arg == "--intent" and i + 1 < len(args):
            intent = args[i + 1]
            i += 2
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    if source not in SOURCE_FOCUS_NAMES:
        print(f"Error: Unknown source '{source}'. Available: {', '.join(SOURCE_FOCUS_NAMES)}", file=sys.stderr)
        return 1

    try:
        if explicit_model:
            if model_name not in MODEL_MAP:
                print(f"Error: Unknown model '{model_name}'. Available: {', '.join(MODEL_NAMES)}", file=sys.stderr)
                return 1

            model = resolve_model(model_name, thinking=thinking)
            result = ask(query, model, source)

            if json_output:
                import orjson

                parts = result.split("\n\nCitations:")
                answer_text = parts[0]
                citations = []
                if len(parts) > 1:
                    for line in parts[1].strip().split("\n"):
                        line = line.strip()
                        if line.startswith("[") and "]: " in line:
                            url = line.split("]: ", 1)[1]
                            citations.append(url)
                data = {"answer": answer_text, "citations": citations, "model": model_name, "source": source}
                sys.stdout.buffer.write(orjson.dumps(data, option=orjson.OPT_INDENT_2))
                sys.stdout.buffer.write(b"\n")
            elif no_citations:
                parts = result.split("\n\nCitations:")
                print(parts[0])
            else:
                print(result)
        else:
            from perplexity_web_mcp.shared import smart_ask

            response = smart_ask(query, intent=intent, source_focus=source)
            if json_output:
                import orjson

                sys.stdout.buffer.write(orjson.dumps(response.to_dict(), option=orjson.OPT_INDENT_2))
                sys.stdout.buffer.write(b"\n")
            elif no_citations:
                print(response.answer)
            else:
                print(response.format_response())
    except (AuthenticationError, RateLimitError) as e:
        print(str(e), file=sys.stderr)
        return 1

    return 0


def _cmd_research(args: list[str]) -> int:
    """Handle: pwm research <query> [options]"""
    if not args or args[0].startswith("-"):
        print("Error: pwm research requires a query string.\n", file=sys.stderr)
        print('Usage: pwm research "your topic" [--source SOURCE]', file=sys.stderr)
        return 1

    query = args[0]
    source: SourceFocusName = "web"
    json_output = False

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-s", "--source") and i + 1 < len(args):
            source = args[i + 1]  # type: ignore[assignment]
            i += 2
        elif arg == "--json":
            json_output = True
            i += 1
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    model = Models.DEEP_RESEARCH

    try:
        result = ask(query, model, source)
    except (AuthenticationError, RateLimitError) as e:
        print(str(e), file=sys.stderr)
        return 1

    if json_output:
        import orjson

        parts = result.split("\n\nCitations:")
        answer_text = parts[0]
        citations = []
        if len(parts) > 1:
            for line in parts[1].strip().split("\n"):
                line = line.strip()
                if line.startswith("[") and "]: " in line:
                    url = line.split("]: ", 1)[1]
                    citations.append(url)
        data = {"answer": answer_text, "citations": citations, "model": "deep_research", "source": source}
        sys.stdout.buffer.write(orjson.dumps(data, option=orjson.OPT_INDENT_2))
        sys.stdout.buffer.write(b"\n")
    else:
        print(result)

    return 0


def _cmd_login(args: list[str]) -> int:
    """Handle: pwm login [options] -- delegates to the existing auth module."""
    from perplexity_web_mcp.cli.auth import main as auth_main

    sys.argv = ["pwm-auth", *args]
    try:
        auth_main()
    except SystemExit as e:
        return e.code if isinstance(e.code, int) else 0
    return 0


def _cmd_usage(args: list[str]) -> int:
    """Handle: pwm usage [--refresh]"""
    refresh = "--refresh" in args

    token = load_token()
    if not token:
        print(
            "NOT AUTHENTICATED\n\n"
            "No session token found. Authenticate first with: pwm login"
        )
        return 1

    cache = get_limit_cache()
    if cache is None:
        print("ERROR: Could not initialize limit cache.")
        return 1

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

    print("\n".join(parts))
    return 0


def main() -> NoReturn:
    """Main entry point for the unified pwm CLI."""
    args = sys.argv[1:]

    if not args:
        _print_help()
        sys.exit(0)

    first = args[0]

    if first in ("--help", "-h", "help"):
        _print_help()
        sys.exit(0)

    if first in ("--version", "-v"):
        _print_version()
        sys.exit(0)

    if first == "--ai":
        from perplexity_web_mcp.cli.ai_doc import print_ai_doc

        print_ai_doc()
        sys.exit(0)

    if first == "api":
        sys.exit(_cmd_api(args[1:]))

    if first == "ask":
        sys.exit(_cmd_ask(args[1:]))

    if first == "research":
        sys.exit(_cmd_research(args[1:]))

    if first in ("login", "auth"):
        sys.exit(_cmd_login(args[1:]))

    if first == "usage":
        sys.exit(_cmd_usage(args[1:]))

    if first == "setup":
        from perplexity_web_mcp.cli.setup import cmd_setup

        sys.exit(cmd_setup(args[1:]))

    if first == "hack":
        from perplexity_web_mcp.cli.hack import cmd_hack

        sys.exit(cmd_hack(args[1:]))

    if first == "skill":
        from perplexity_web_mcp.cli.skill import cmd_skill

        sys.exit(cmd_skill(args[1:]))

    if first == "doctor":
        from perplexity_web_mcp.cli.doctor import cmd_doctor

        sys.exit(cmd_doctor(args[1:]))

    print(f"Unknown command: {first}\n", file=sys.stderr)
    _print_help()
    sys.exit(1)


if __name__ == "__main__":
    main()
