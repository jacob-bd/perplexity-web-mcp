"""Unified CLI for Perplexity Web MCP.

Entry point: pwm

Subcommands:
    pwm login           Authenticate with Perplexity (interactive or non-interactive)
    pwm ask "query"     Ask a question (web search + AI model)
    pwm council "q"     Query multiple models in parallel (Model Council)
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
from importlib import metadata
from typing import NoReturn

import rich_click as click

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


# ── Click configuration ────────────────────────────────────────────────────


def _print_ai_docs(ctx, param, value):
    """Callback for --ai flag. Outputs AI-friendly documentation."""
    if not value or ctx.resilient_parsing:
        return
    from perplexity_web_mcp.cli.ai_doc import print_ai_doc
    print_ai_doc()
    ctx.exit(0)


def _print_version(ctx, param, value):
    """Callback for --version flag."""
    if not value or ctx.resilient_parsing:
        return
    version = metadata.version("perplexity-web-mcp-cli")
    click.echo(f"perplexity-web-mcp-cli {version}")
    ctx.exit(0)


@click.group(invoke_without_command=True)
@click.option("--version", "-v", is_flag=True, callback=_print_version,
              expose_value=False, is_eager=True, help="Show version.")
@click.option("--ai", is_flag=True, callback=_print_ai_docs,
              expose_value=False, is_eager=True,
              help="Print AI-optimized documentation (for LLM agents).")
@click.pass_context
def cli(ctx):
    """pwm — Perplexity Web MCP CLI.

    Ask questions, run deep research, manage MCP server setup,
    and more — all powered by Perplexity AI.
    """
    if ctx.invoked_subcommand is None:
        click.echo(ctx.get_help())


# ── Ask ────────────────────────────────────────────────────────────────────


@cli.command()
@click.argument("query")
@click.option("-m", "--model", "model_name", default="auto",
              help=f"Model to use ({', '.join(MODEL_NAMES)}).")
@click.option("-t", "--thinking", is_flag=True, help="Enable extended thinking mode.")
@click.option("-s", "--source", "source", default="web",
              help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}).")
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
@click.option("--no-citations", is_flag=True, help="Suppress citation URLs.")
@click.option("--intent", default="standard",
              help="Routing intent: quick, standard, detailed, research.")
def ask_cmd(query, model_name, thinking, source, json_output, no_citations, intent):
    """Ask a question using Perplexity AI.

    \b
    Examples:
      pwm ask "What is quantum computing?"
      pwm ask "latest AI news" -m gpt52 -s academic
      pwm ask "explain transformers" -m claude_sonnet --thinking
    """
    code = _cmd_ask_impl(query, model_name, thinking, source, json_output, no_citations, intent)
    raise SystemExit(code)


def _cmd_ask_impl(query, model_name, thinking, source, json_output, no_citations, intent):
    """Implementation for ask command (kept separate for testability)."""
    if source not in SOURCE_FOCUS_NAMES:
        print(f"Error: Unknown source '{source}'. Available: {', '.join(SOURCE_FOCUS_NAMES)}", file=sys.stderr)
        return 1

    try:
        explicit_model = model_name != "auto"
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


# ── Research ───────────────────────────────────────────────────────────────


@cli.command()
@click.argument("query")
@click.option("-s", "--source", "source", default="web",
              help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}).")
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
def research(query, source, json_output):
    """Deep research on a topic.

    Uses the in-depth research model for comprehensive reports (monthly quota).

    \b
    Examples:
      pwm research "agentic AI trends 2026"
      pwm research "quantum computing advances" -s academic
    """
    code = _cmd_research_impl(query, source, json_output)
    raise SystemExit(code)


def _cmd_research_impl(query, source, json_output):
    """Implementation for research command."""
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


# ── Council ────────────────────────────────────────────────────────────────

COUNCIL_MODEL_NAMES = ("gpt54", "claude_sonnet", "claude_opus", "gemini_pro", "nemotron")


@cli.command()
@click.argument("query")
@click.option("-m", "--models", "models_str", default="gpt54,claude_opus,gemini_pro",
              help=f"Comma-separated models ({', '.join(COUNCIL_MODEL_NAMES)}).")
@click.option("-s", "--source", "source", default="web",
              help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}).")
@click.option("--no-synthesis", is_flag=True, help="Skip Sonar consensus synthesis.")
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
def council(query, models_str, source, no_synthesis, json_output):
    """Query multiple models in parallel (Model Council).

    Each model costs 1 Pro Search. Default: 3 models = 3 Pro Searches.
    Synthesis by Sonar is free.

    \b
    Examples:
      pwm council "What are best practices for microservices?"
      pwm council "Compare Rust and Go" -m gpt54,claude_sonnet
      pwm council "Explain quantum computing" -s academic
      pwm council "React vs Vue" --no-synthesis --json
    """
    code = _cmd_council_impl(query, models_str, source, not no_synthesis, json_output)
    raise SystemExit(code)


def _cmd_council_impl(query, models_str, source, synthesize, json_output):
    """Implementation for council command."""
    if source not in SOURCE_FOCUS_NAMES:
        print(f"Error: Unknown source '{source}'. Available: {', '.join(SOURCE_FOCUS_NAMES)}", file=sys.stderr)
        return 1

    # Validate model names
    model_names = [m.strip() for m in models_str.split(",") if m.strip()]
    for name in model_names:
        if name not in COUNCIL_MODEL_NAMES:
            print(f"Error: Unknown council model '{name}'. Available: {', '.join(COUNCIL_MODEL_NAMES)}", file=sys.stderr)
            return 1

    if len(model_names) < 2:
        print("Error: Council requires at least 2 models.", file=sys.stderr)
        return 1

    try:
        from perplexity_web_mcp.council import council_ask

        # Build model list (None = use defaults)
        model_list = None
        if models_str != "gpt54,claude_opus,gemini_pro":
            display_names = {
                "gpt54": "GPT-5.4",
                "claude_sonnet": "Claude Sonnet 4.6",
                "claude_opus": "Claude Opus 4.6",
                "gemini_pro": "Gemini 3.1 Pro",
                "nemotron": "Nemotron 3 Super",
            }
            model_list = []
            for name in model_names:
                resolved = resolve_model(name)
                display = display_names.get(name, name)
                model_list.append((display, resolved))

        result = council_ask(
            query=query,
            models=model_list,
            source_focus=source,
            synthesize=synthesize,
        )

        if json_output:
            import orjson

            data = {
                "query": result.query,
                "models": result.model_names,
                "synthesis": result.synthesis,
                "individual_results": [
                    {
                        "model": r.model_name,
                        "answer": r.answer,
                        "error": r.error,
                    }
                    for r in result.individual_results
                ],
            }
            sys.stdout.buffer.write(orjson.dumps(data, option=orjson.OPT_INDENT_2))
            sys.stdout.buffer.write(b"\n")
        else:
            print(result.format_response())

    except (AuthenticationError, RateLimitError) as e:
        print(str(e), file=sys.stderr)
        return 1

    return 0


# ── Login ──────────────────────────────────────────────────────────────────


@cli.command()
@click.option("--check", is_flag=True, help="Check current auth status (no login prompt).")
@click.option("--email", default=None, help="Send verification code to email (non-interactive).")
@click.option("--code", default=None, help="Complete auth with 6-digit code from email.")
@click.option("--no-save", is_flag=True, help="Don't save token to config.")
@click.pass_context
def login(ctx, check, email, code, no_save):
    """Authenticate with Perplexity.

    \b
    Examples:
      pwm login                                    # Interactive login
      pwm login --check                            # Check current auth status
      pwm login --email user@example.com           # Send verification code
      pwm login --email user@example.com --code 123456  # Complete auth
    """
    from perplexity_web_mcp.cli.auth import main as auth_main

    # Build args for the auth module
    auth_args = []
    if check:
        auth_args.append("--check")
    if email:
        auth_args.extend(["--email", email])
    if code:
        auth_args.extend(["--code", code])
    if no_save:
        auth_args.append("--no-save")

    sys.argv = ["pwm-auth", *auth_args]
    try:
        auth_main()
    except SystemExit as e:
        raise SystemExit(e.code if isinstance(e.code, int) else 0)


# ── Usage ──────────────────────────────────────────────────────────────────


@cli.command()
@click.option("--refresh", is_flag=True, help="Force refresh rate limit data.")
def usage(refresh):
    """Check remaining rate limits and quotas.

    \b
    Examples:
      pwm usage
      pwm usage --refresh
    """
    code = _cmd_usage_impl(refresh)
    raise SystemExit(code)


def _cmd_usage_impl(refresh):
    """Implementation for usage command."""
    from datetime import datetime, timezone

    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table

    console = Console()
    token = load_token()
    if not token:
        console.print(
            Panel(
                "[bold red]NOT AUTHENTICATED[/]\n\n"
                "No session token found. Authenticate first with: [cyan]pwm login[/]",
                title="⚠️  Authentication Required",
            )
        )
        return 1

    cache = get_limit_cache()
    if cache is None:
        console.print("[red]ERROR:[/] Could not initialize limit cache.")
        return 1

    # ── Rate Limits ────────────────────────────────────────────────────────
    limits = cache.get_rate_limits(force_refresh=refresh)
    if limits:
        table = Table(title="📊 Rate Limits", show_header=True, header_style="bold cyan")
        table.add_column("Feature", style="bold")
        table.add_column("Remaining", justify="right")

        def _color(n: int) -> str:
            if n <= 0:
                return f"[bold red]{n}[/]"
            if n <= 5:
                return f"[yellow]{n}[/]"
            return f"[green]{n}[/]"

        table.add_row("Pro Search", _color(limits.remaining_pro))
        table.add_row("Deep Research", _color(limits.remaining_research))
        table.add_row("Create Files & Apps", _color(limits.remaining_labs))
        table.add_row("Browser Agent", _color(limits.remaining_agentic_research))

        console.print(table)
    else:
        console.print("[yellow]WARNING:[/] Could not fetch rate limits (network error or token issue).")

    # ── Account Info ───────────────────────────────────────────────────────
    settings = cache.get_user_settings(force_refresh=refresh)
    if settings:
        table = Table(title="👤 Account", show_header=True, header_style="bold cyan")
        table.add_column("Field", style="bold")
        table.add_column("Value", justify="right")

        tier = settings.subscription_tier.title()
        status = settings.subscription_status
        table.add_row("Subscription", f"[bold]{tier}[/] ({status})")
        table.add_row("Total Queries", f"{settings.query_count:,}")
        table.add_row("Pro Queries", f"{settings.query_count_copilot:,}")

        console.print(table)

    # ── Credits ────────────────────────────────────────────────────────────
    credits = cache.get_credits(force_refresh=refresh)
    if credits:
        table = Table(title="💳 Usage-Based Credits", show_header=True, header_style="bold cyan")
        table.add_column("Field", style="bold")
        table.add_column("Value", justify="right")

        # Credit sources (matching Perplexity UI: Plan / Purchased / Bonus)
        purchased = credits.current_period_purchased_cents
        table.add_row("Purchased Credits", f"{purchased:,.2f}")

        total_grants = 0.0
        for grant in credits.credit_grants:
            label = grant.type.replace("_", " ").title() + " Credits"
            table.add_row(label, f"{grant.amount_cents:,.2f}")
            total_grants += grant.amount_cents
            if grant.expires_at_ts:
                exp_date = datetime.fromtimestamp(grant.expires_at_ts, tz=timezone.utc)
                table.add_row("  Expires", exp_date.strftime("%b %d, %Y"))

        # Total available / total granted
        total_pool = total_grants + purchased
        balance = credits.balance_cents
        if total_pool > 0:
            table.add_row("Total Available", f"[bold green]{balance:,.2f}[/] / {total_pool:,.2f}")
        else:
            table.add_row("Total Available", f"[bold green]{balance:,.2f}[/]")

        # Usage breakdown by type (Text, Image, Video, Audio)
        meter_map = {
            "asi_token_usage": "Text Usage",
            "image_generation_usage": "Image Usage",
            "video_generation_usage": "Video Usage",
            "audio_generation_usage": "Audio Usage",
        }
        seen_types: set[str] = set()
        if credits.meter_usage:
            table.add_section()
            for meter in credits.meter_usage:
                raw_type = meter.get("meter_type", "unknown")
                seen_types.add(raw_type)
                friendly = meter_map.get(raw_type, raw_type.replace("_", " ").title())
                cost = meter.get("cost_cents", 0)
                table.add_row(friendly, f"{cost:,.2f}")
            # Show zero for any standard types not in the response
            for raw_type, friendly in meter_map.items():
                if raw_type not in seen_types:
                    table.add_row(friendly, "0.00")

        if credits.renewal_date_ts:
            table.add_section()
            renewal = datetime.fromtimestamp(credits.renewal_date_ts, tz=timezone.utc)
            table.add_row("Next Renewal", renewal.strftime("%b %d, %Y"))

        console.print(table)

    return 0


# ── API ────────────────────────────────────────────────────────────────────


@cli.command()
@click.option("--host", default="0.0.0.0", help="Bind address.")
@click.option("-p", "--port", default=8080, type=int, help="Port number.")
@click.option("--model", "default_model", default="auto", help="Default model.")
@click.option("--log-level", default="info", help="Log level: debug, info, warning, error.")
def api(host, port, default_model, log_level):
    """Start the Anthropic/OpenAI API-compatible server.

    \b
    Examples:
      pwm api
      pwm api --port 9090
      pwm api --model gpt52 --log-level debug
    """
    import os

    os.environ.setdefault("HOST", host)
    os.environ.setdefault("PORT", str(port))
    os.environ.setdefault("LOG_LEVEL", log_level)
    os.environ.setdefault("DEFAULT_MODEL", default_model)

    from perplexity_web_mcp.api import run_server

    run_server()


# ── Hack ───────────────────────────────────────────────────────────────────


@cli.command()
@click.argument("tool")
@click.argument("extra_args", nargs=-1, type=click.UNPROCESSED)
@click.pass_context
def hack(ctx, tool, extra_args):
    """Launch AI tools connected to Perplexity models.

    Currently supports 'claude' — launches Claude Code using
    the local Perplexity API server as the backend.

    \b
    Examples:
      pwm hack claude
      pwm hack claude -m gpt52
    """
    from perplexity_web_mcp.cli.hack import cmd_hack

    code = cmd_hack([tool, *extra_args])
    raise SystemExit(code)


# ── Skill ──────────────────────────────────────────────────────────────────


@cli.command()
@click.argument("args", nargs=-1)
def skill(args):
    """Manage Perplexity Web MCP skill across AI platforms.

    \b
    Actions:
      pwm skill list                          Show tools and installation status
      pwm skill install <tool>                Install skill for a tool
      pwm skill install all                   Install for all detected tools
      pwm skill install <tool> --level project  Install at project level
      pwm skill uninstall <tool>              Remove installed skill
      pwm skill show                          Display the skill content
      pwm skill update                        Update all outdated skills

    \b
    Tools: claude-code, cursor, codex, opencode, gemini-cli,
           antigravity, cline, openclaw, cc-claw, all
    """
    from perplexity_web_mcp.cli.skill import cmd_skill

    code = cmd_skill(list(args))
    raise SystemExit(code)


# ── Doctor ─────────────────────────────────────────────────────────────────


@cli.command()
@click.option("-v", "--verbose", is_flag=True, help="Show additional diagnostic details.")
def doctor(verbose):
    """Diagnose installation, auth, config, and limits.

    Runs a comprehensive set of checks and reports the status
    of your Perplexity Web MCP installation.

    \b
    Examples:
      pwm doctor
      pwm doctor -v
    """
    from perplexity_web_mcp.cli.doctor import cmd_doctor

    args = []
    if verbose:
        args.append("-v")
    code = cmd_doctor(args)
    raise SystemExit(code)


# ── Setup (Click subgroup) ─────────────────────────────────────────────────


def _register_setup():
    """Register the setup subgroup from the setup module."""
    from perplexity_web_mcp.cli.setup import setup
    cli.add_command(setup)


_register_setup()


# ── Legacy functions for backward compatibility (tests) ────────────────────


def _cmd_ask(args: list[str]) -> int:
    """Handle: pwm ask <query> [options] — legacy interface for tests."""
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
    intent = "standard"

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-m", "--model") and i + 1 < len(args):
            model_name = args[i + 1]
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

    return _cmd_ask_impl(query, model_name, thinking, source, json_output, no_citations, intent)


def _cmd_research(args: list[str]) -> int:
    """Handle: pwm research <query> [options] — legacy interface for tests."""
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

    return _cmd_research_impl(query, source, json_output)


def _cmd_usage(args: list[str]) -> int:
    """Handle: pwm usage [--refresh] — legacy interface for tests."""
    refresh = "--refresh" in args
    return _cmd_usage_impl(refresh)


def _cmd_council(args: list[str]) -> int:
    """Handle: pwm council <query> [options] — legacy interface for tests."""
    if not args or args[0].startswith("-"):
        print("Error: pwm council requires a query string.\n", file=sys.stderr)
        print('Usage: pwm council "your question" [-m MODELS] [-s SOURCE]', file=sys.stderr)
        return 1

    query = args[0]
    models_str = "gpt54,claude_opus,gemini_pro"
    source: SourceFocusName = "web"
    synthesize = True
    json_output = False

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-m", "--models") and i + 1 < len(args):
            models_str = args[i + 1]
            i += 2
        elif arg in ("-s", "--source") and i + 1 < len(args):
            source = args[i + 1]  # type: ignore[assignment]
            i += 2
        elif arg == "--no-synthesis":
            synthesize = False
            i += 1
        elif arg == "--json":
            json_output = True
            i += 1
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    return _cmd_council_impl(query, models_str, source, synthesize, json_output)


# ── Entry point ────────────────────────────────────────────────────────────


def main() -> NoReturn:
    """Main entry point for the unified pwm CLI."""
    try:
        cli(standalone_mode=True)
    except SystemExit as e:
        sys.exit(e.code if isinstance(e.code, int) else 0)
    sys.exit(0)


if __name__ == "__main__":
    main()
