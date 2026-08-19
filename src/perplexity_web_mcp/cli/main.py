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

from importlib import metadata
import sys
from typing import NoReturn

import rich_click as click

from perplexity_web_mcp.exceptions import AuthenticationError, RateLimitError
from perplexity_web_mcp.shared import (
    COUNCIL_DEFAULT_MODELS_STR,
    COUNCIL_DISPLAY_NAMES,
    COUNCIL_ELIGIBLE_MODEL_NAMES,
    MODEL_MAP,
    MODEL_NAMES,
    SOURCE_FOCUS_NAMES,
    Models,
    SourceFocusName,
    SourceResolutionError,
    ask,
    build_council_model_list,
    format_thread_list,
    get_connector_sources,
    get_limit_cache,
    get_thread,
    list_threads,
    resolve_model,
    resolve_source_focus,
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
@click.option(
    "--version", "-v", is_flag=True, callback=_print_version, expose_value=False, is_eager=True, help="Show version."
)
@click.option(
    "--ai",
    is_flag=True,
    callback=_print_ai_docs,
    expose_value=False,
    is_eager=True,
    help="Print AI-optimized documentation (for LLM agents).",
)
@click.pass_context
def cli(ctx):
    """pwm — Perplexity Web MCP CLI.

    Ask questions, run deep research, manage MCP server setup,
    and more — all powered by Perplexity AI.
    """
    if ctx.invoked_subcommand is None:
        click.echo(ctx.get_help())


def _validate_source_for_cli(source: str) -> bool:
    try:
        resolve_source_focus(source)
    except SourceResolutionError as error:
        print(str(error), file=sys.stderr)
        return False
    return True


# ── Ask ────────────────────────────────────────────────────────────────────


@cli.command(name="ask")
@click.argument("query")
@click.option("-m", "--model", "model_name", default="auto", help=f"Model to use ({', '.join(MODEL_NAMES)}).")
@click.option("-t", "--thinking", is_flag=True, help="Enable extended thinking mode.")
@click.option(
    "-s",
    "--source",
    "source",
    default="web",
    help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}) or connector source ID.",
)
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
@click.option("--no-citations", is_flag=True, help="Suppress citation URLs.")
@click.option("--intent", default="standard", help="Routing intent: quick, standard, detailed, research.")
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
    if not _validate_source_for_cli(source):
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
@click.option(
    "-s",
    "--source",
    "source",
    default="web",
    help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}) or connector source ID.",
)
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
    if not _validate_source_for_cli(source):
        return 1

    model = Models.DEEP_RESEARCH

    try:
        from rich.console import Console

        console = Console(stderr=True)
        with console.status("[bold cyan]Running deep research (this may take several minutes)...[/]"):
            result = ask(query, model, source)
    except (AuthenticationError, RateLimitError) as e:
        if json_output:
            import orjson

            error_data = {"error": str(e), "model": "deep_research", "source": source}
            sys.stdout.buffer.write(orjson.dumps(error_data, option=orjson.OPT_INDENT_2))
            sys.stdout.buffer.write(b"\n")
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


# ── Thread Library ─────────────────────────────────────────────────────────


@cli.command()
@click.option("-l", "--limit", default=20, help="Max threads to return (default 20, max 100).")
@click.option("-o", "--offset", default=0, help="Pagination offset — skip this many threads.")
@click.option("-s", "--search", "search_term", default="", help="Filter threads by keyword.")
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
def threads(limit, offset, search_term, json_output):
    """Browse your Perplexity thread library. FREE — no quota consumed.

    Lists your past Perplexity conversations with titles, models, and previews.
    Use the slug shown for each thread with 'pwm export' or to resume a conversation.

    \b
    Examples:
      pwm threads                          # most recent 20 threads
      pwm threads --limit 50              # get 50 threads
      pwm threads --search "quantum"      # filter by keyword
      pwm threads --offset 20             # page 2 (skip first 20)
      pwm threads --json                  # JSON output (for piping)
    """
    code = _cmd_threads_impl(limit, offset, search_term, json_output)
    raise SystemExit(code)


def _cmd_threads_impl(limit, offset, search_term, json_output):
    """Implementation for threads command."""
    try:
        thread_list = list_threads(limit=limit, offset=offset, search_term=search_term)
    except AuthenticationError as e:
        print(f"Error: Not authenticated. {e}", file=sys.stderr)
        print("Re-authenticate with: pwm login", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"Error fetching threads: {e}", file=sys.stderr)
        return 1

    if json_output:
        import orjson

        sys.stdout.buffer.write(orjson.dumps([t.model_dump() for t in thread_list], option=orjson.OPT_INDENT_2))
        sys.stdout.buffer.write(b"\n")
    else:
        print(format_thread_list(thread_list))

    return 0


@cli.command()
@click.option(
    "--output",
    "-o",
    default=None,
    help="Output file path. Defaults to pplx-export-<date>.json in current directory.",
)
@click.option("-s", "--search", "search_term", default="", help="Only export threads matching this keyword.")
@click.option("-l", "--limit", default=100, help="Max threads to export (default 100).")
def export(output, search_term, limit):
    """Export your Perplexity thread library to a JSON file. FREE — no quota consumed.

    Fetches your thread list and then retrieves the full conversation history for
    each thread, saving everything to a timestamped JSON file.

    Inspired by kylebrodeur/perplexity-exporter, but uses the REST API directly
    (no browser required) making it dramatically faster.

    \b
    Examples:
      pwm export                              # export all threads to pplx-export-<date>.json
      pwm export --output ./my-backup.json   # custom output path
      pwm export --search "ai"               # only export threads matching "ai"
      pwm export --limit 50                  # cap at 50 threads
    """
    code = _cmd_export_impl(output, search_term, limit)
    raise SystemExit(code)


def _cmd_export_impl(output, search_term, limit):
    """Implementation for export command."""
    import datetime

    import orjson
    from rich.console import Console
    from rich.progress import BarColumn, Progress, SpinnerColumn, TaskProgressColumn, TextColumn

    console = Console(stderr=True)

    # Determine output path
    if output is None:
        date_str = datetime.date.today().isoformat()
        output = f"pplx-export-{date_str}.json"

    console.print(f"[bold cyan]Perplexity Thread Export[/]\nOutput: {output}\n")

    # Step 1: List threads
    try:
        with console.status("[cyan]Fetching thread list...[/]"):
            thread_list = list_threads(limit=limit, search_term=search_term)
    except AuthenticationError as e:
        console.print(f"[red]Error: Not authenticated. {e}[/]")
        console.print("Re-authenticate with: [bold]pwm login[/]")
        return 1
    except Exception as e:
        console.print(f"[red]Error fetching thread list: {e}[/]")
        return 1

    if not thread_list:
        console.print("[yellow]No threads found.[/]")
        return 0

    console.print(f"Found [bold]{len(thread_list)}[/] thread(s). Fetching full history...\n")

    # Step 2: Fetch full detail for each thread
    export_data: list[dict] = []
    errors: list[str] = []

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TaskProgressColumn(),
        console=console,
    ) as progress:
        task = progress.add_task("Exporting threads", total=len(thread_list))

        for t in thread_list:
            slug = t.slug
            title = t.title or slug
            progress.update(task, description=f"[cyan]{title[:50]}[/]", advance=0)

            if not slug:
                errors.append(f"Skipped thread with no slug: {title!r}")
                progress.advance(task)
                continue

            try:
                thread_detail = get_thread(slug)
                export_data.append(
                    {
                        "slug": slug,
                        "title": title,
                        "metadata": t.model_dump(),
                        "thread": thread_detail.model_dump(),
                    }
                )
            except Exception as e:
                errors.append(f"Failed to fetch thread '{slug}' ({title!r}): {e}")

            progress.advance(task)

    from pathlib import Path

    # Step 3: Write output file
    try:
        with Path(output).open("wb") as f:
            f.write(orjson.dumps(export_data, option=orjson.OPT_INDENT_2))
    except OSError as e:
        console.print(f"[red]Error writing file: {e}[/]")
        return 1

    console.print(f"\n[green]✓[/] Exported [bold]{len(export_data)}[/] threads to [bold]{output}[/]")
    if errors:
        console.print(f"[yellow]⚠ {len(errors)} error(s):[/]")
        for err in errors:
            console.print(f"  [dim]{err}[/]")

    return 0


# ── Council ────────────────────────────────────────────────────────────────

COUNCIL_MODEL_NAMES = COUNCIL_ELIGIBLE_MODEL_NAMES


@cli.command()
@click.argument("query")
@click.option(
    "-m",
    "--models",
    "models_str",
    default=COUNCIL_DEFAULT_MODELS_STR,
    help=f"Comma-separated models ({', '.join(COUNCIL_MODEL_NAMES)}).",
)
@click.option("-t", "--thinking", is_flag=True, help="Enable extended thinking mode.")
@click.option(
    "-s",
    "--source",
    "source",
    default="web",
    help=f"Source focus ({', '.join(SOURCE_FOCUS_NAMES)}) or connector source ID.",
)
@click.option("--no-synthesis", is_flag=True, help="Skip consensus synthesis.")
@click.option(
    "--chairman",
    default="sonar",
    help=f"Synthesis model (default: sonar / Sonar 2). Non-sonar costs 1 extra Pro Search. ({', '.join(MODEL_NAMES)})",
)
@click.option("--json", "json_output", is_flag=True, help="Output as JSON.")
def council(query, models_str, thinking, source, no_synthesis, chairman, json_output):
    """Query multiple models in parallel (Model Council).

    Each model costs 1 Pro Search, plus 1 for synthesis. Default: 3 models + synthesis = 4 Pro Searches.
    Default synthesis uses Sonar 2. Use --chairman to pick a different synthesis model.

    \b
    Examples:
      pwm council "What are best practices for microservices?"
      pwm council "Compare Rust and Go" -m gpt56_terra,claude_sonnet
      pwm council "Explain quantum computing" -s academic --thinking
      pwm council "React vs Vue" --chairman claude_sonnet
      pwm council "React vs Vue" --no-synthesis --json
    """
    code = _cmd_council_impl(query, models_str, source, not no_synthesis, json_output, thinking, chairman)
    raise SystemExit(code)


def _cmd_council_impl(query, models_str, source, synthesize, json_output, thinking=False, chairman="sonar"):
    """Implementation for council command."""
    if not _validate_source_for_cli(source):
        return 1

    # Validate model names
    model_names = [m.strip() for m in models_str.split(",") if m.strip()]
    for name in model_names:
        if name not in COUNCIL_MODEL_NAMES:
            print(
                f"Error: Unknown council model '{name}'. Available: {', '.join(COUNCIL_MODEL_NAMES)}", file=sys.stderr
            )
            return 1

    if len(model_names) < 2:
        print("Error: Council requires at least 2 models.", file=sys.stderr)
        return 1

    if chairman not in MODEL_NAMES:
        print(f"Error: Unknown chairman model '{chairman}'. Available: {', '.join(MODEL_NAMES)}", file=sys.stderr)
        return 1

    if chairman != "sonar" and synthesize:
        chairman_display = COUNCIL_DISPLAY_NAMES.get(chairman, chairman)
        print(f"Note: Using {chairman_display} as chairman costs 1 extra Pro Search query.", file=sys.stderr)

    try:
        from perplexity_web_mcp.council import council_ask

        # Build model list (None = use defaults)
        model_list = None
        if models_str != COUNCIL_DEFAULT_MODELS_STR:
            model_list = build_council_model_list(model_names, thinking=thinking)

        synthesis_model = resolve_model(chairman) if chairman != "sonar" else None

        result = council_ask(
            query=query,
            models=model_list,
            source_focus=source,
            synthesize=synthesize,
            thinking=thinking,
            synthesis_model=synthesis_model,
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
                "[bold red]NOT AUTHENTICATED[/]\n\nNo session token found. Authenticate first with: [cyan]pwm login[/]",
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

        source_rows = [source for source in limits.source_limits if source.monthly_limit is not None]
        if source_rows:
            source_table = Table(title="Source Limits", show_header=True, header_style="bold cyan")
            source_table.add_column("Source ID", style="bold")
            source_table.add_column("Remaining", justify="right")
            source_table.add_column("Monthly Limit", justify="right")
            for source in source_rows:
                source_table.add_row(
                    source.source_id,
                    "unlimited" if source.remaining is None else str(source.remaining),
                    "unlimited" if source.monthly_limit is None else str(source.monthly_limit),
                )
            console.print(source_table)
    else:
        console.print("[yellow]WARNING:[/] Could not fetch rate limits (network error or token issue).")

    # ── Account Info ───────────────────────────────────────────────────────
    settings = cache.get_user_settings(force_refresh=refresh)
    from perplexity_web_mcp.cli.auth import get_user_info

    user_info = get_user_info(token)
    if settings or user_info:
        table = Table(title="👤 Account", show_header=True, header_style="bold cyan")
        table.add_column("Field", style="bold")
        table.add_column("Value", justify="right")

        if user_info:
            table.add_row("Subscription", f"[bold]{user_info.tier_display}[/]")

        if settings:
            billing = settings.subscription_tier or "unknown"
            status = settings.subscription_status
            table.add_row("Billing", f"[bold]{billing}[/] ({status})")
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


# ── Connectors ─────────────────────────────────────────────────────────────


@cli.group()
def connectors():
    """List account connector source IDs."""


@connectors.command(name="list")
@click.option("--refresh", is_flag=True, help="Refresh limits before listing connectors.")
def connectors_list(refresh):
    """List source IDs visible in the account rate-limit API."""
    code = _cmd_connectors_list(refresh=refresh)
    raise SystemExit(code)


def _cmd_connectors_list(refresh: bool = False) -> int:
    """Implementation for connectors list command."""
    from rich.console import Console
    from rich.table import Table

    console = Console()
    token = load_token()
    if not token:
        print("Not authenticated. Run `pwm login` first.", file=sys.stderr)
        return 1

    cache = get_limit_cache()
    if cache is None:
        print("Could not initialize limit cache.", file=sys.stderr)
        return 1

    limits = cache.get_rate_limits(force_refresh=refresh)
    if limits is None:
        print("Could not fetch connector source IDs.", file=sys.stderr)
        return 1

    connector_sources = get_connector_sources(limits.source_limits)
    if not connector_sources:
        console.print("[yellow]No connector source IDs were reported by this account.[/]")
        return 0

    table = Table(title="Connector Sources", show_header=True, header_style="bold cyan")
    table.add_column("Source ID", style="bold")
    table.add_column("Remaining", justify="right")
    table.add_column("Monthly Limit", justify="right")

    for source in connector_sources:
        table.add_row(
            source.source_id,
            "unlimited" if source.remaining is None else str(source.remaining),
            "unlimited" if source.monthly_limit is None else str(source.monthly_limit),
        )

    console.print(table)
    return 0


# ── API ────────────────────────────────────────────────────────────────────


@cli.command()
@click.option("--host", default="0.0.0.0", help="Bind address.")
@click.option("-p", "--port", default=8080, type=int, help="Port number.")
@click.option("--model", "default_model", default="auto", help="Default model.")
@click.option("--log-level", default="info", help="Log level: debug, info, warning, error.")
@click.option(
    "--trace",
    is_flag=True,
    help="Enable trace mode (logs un-truncated payloads to ~/.config/perplexity-web-mcp/logs/api-trace.log).",
)
def api(host, port, default_model, log_level, trace):
    """Start the Anthropic/OpenAI API-compatible server.

    \b
    Examples:
      pwm api
      pwm api --port 9090
      pwm api --trace
    """
    import os

    os.environ.setdefault("HOST", host)
    os.environ.setdefault("PORT", str(port))
    os.environ.setdefault("LOG_LEVEL", log_level)
    os.environ.setdefault("DEFAULT_MODEL", default_model)
    if trace:
        os.environ["PWM_TRACE"] = "1"
        from perplexity_web_mcp.trace import get_trace_log_path, reset_trace_log

        reset_trace_log()
        print(f"Trace mode enabled! Logging to {get_trace_log_path()}", file=sys.stderr)

    from perplexity_web_mcp.api import run_server

    run_server()


# ── Hack ───────────────────────────────────────────────────────────────────


@cli.command(context_settings={"ignore_unknown_options": True})
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
           antigravity, cline, openclaw, alef-agent, all
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


# ── Serve MCP (Daemon Mode) ────────────────────────────────────────────────


@cli.command(name="serve-mcp")
@click.option(
    "--transport",
    "-t",
    type=click.Choice(["stdio", "sse", "streamable-http"]),
    default="sse",
    help="Transport protocol (sse, streamable-http, or stdio).",
)
@click.option("--host", default="127.0.0.1", help="Bind address for HTTP/SSE daemon.")
@click.option("-p", "--port", default=8000, type=int, help="Port number for HTTP/SSE daemon.")
@click.option("--status", is_flag=True, help="Check status of running MCP daemon on specified port.")
@click.option("--stop", is_flag=True, help="Stop running MCP daemon on specified port.")
def serve_mcp(transport, host, port, status, stop):
    """Run the Perplexity Web MCP server as a shared daemon (SSE or stdio).

    Enables multiple AI tool clients (or multi-thread Codex sessions) to connect
    to a single shared background MCP process, preventing duplicate process spawn
    and high memory usage on Windows.

    \b
    Examples:
      pwm serve-mcp                     # Start SSE daemon on 127.0.0.1:8000
      pwm serve-mcp --port 8080         # Custom port
      pwm serve-mcp --status            # Check daemon status on port 8000
      pwm serve-mcp --stop              # Stop daemon on port 8000
      pwm serve-mcp --transport stdio   # Standard stdio mode
    """
    from rich.console import Console

    from perplexity_web_mcp.mcp.server import (
        get_running_daemon_pid,
        is_port_in_use,
        stop_daemon,
    )
    from perplexity_web_mcp.mcp.server import main as mcp_server_main

    console = Console()

    if status:
        pid = get_running_daemon_pid(port)
        port_busy = is_port_in_use(host, port)
        if pid is not None:
            console.print(
                f"[green]✓[/green] Perplexity MCP daemon is [bold green]running[/bold green] (PID {pid}) on [cyan]http://{host}:{port}[/cyan]"
            )
        elif port_busy:
            console.print(f"[yellow]![/yellow] Port {port} is in use on {host}, but no managed PID lockfile found.")
        else:
            console.print(f"[dim]No active MCP daemon detected on port {port}.[/dim]")
        return

    if stop:
        success, message = stop_daemon(port)
        if success:
            console.print(f"[green]✓[/green] {message}")
        else:
            console.print(f"[yellow]![/yellow] {message}")
        return

    mcp_server_main(transport=transport, host=host, port=port)


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
        print('Usage: pwm council "your question" [-m MODELS] [-s SOURCE] [-t]', file=sys.stderr)
        return 1

    query = args[0]
    models_str = COUNCIL_DEFAULT_MODELS_STR
    source: SourceFocusName = "web"
    synthesize = True
    json_output = False
    thinking = False

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-m", "--models") and i + 1 < len(args):
            models_str = args[i + 1]
            i += 2
        elif arg in ("-s", "--source") and i + 1 < len(args):
            source = args[i + 1]  # type: ignore[assignment]
            i += 2
        elif arg in ("-t", "--thinking"):
            thinking = True
            i += 1
        elif arg == "--no-synthesis":
            synthesize = False
            i += 1
        elif arg == "--json":
            json_output = True
            i += 1
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    return _cmd_council_impl(query, models_str, source, synthesize, json_output, thinking)


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
