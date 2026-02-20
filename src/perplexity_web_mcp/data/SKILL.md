---
name: querying-perplexity
description: >-
  Search the web and query AI models via Perplexity AI using perplexity-web-mcp-cli.
  Supports CLI commands (pwm ask, pwm research), MCP tools (pplx_*), and
  Anthropic/OpenAI-compatible API server. Use when the user mentions "perplexity",
  "pplx", "pwm", "web search with AI", "deep research", "search the internet",
  or wants to query premium models like GPT-5.2, Claude, Gemini, Grok through
  Perplexity's web interface.
metadata:
  version: "0.4.0"
  author: "Jacob Ben David"
---

# Perplexity Web MCP

Search the web and query premium AI models through Perplexity AI.

## Quick Reference

Run `pwm --ai` for comprehensive AI-optimized documentation covering all
commands, models, MCP tools, auth flows, and error recovery.

```bash
pwm --ai                # Full AI reference (RECOMMENDED first step)
pwm --help              # CLI help
pwm login --check       # Check auth status
```

## Critical Rules

1. **Authenticate first**: Run `pwm login` before any queries
2. **Tokens last ~30 days**: Re-run `pwm login` on 403 errors
3. **Check limits before heavy use**: Run `pwm usage` or call `pplx_usage()`
4. **Deep Research uses a separate monthly quota**: Don't exhaust it accidentally

## Tool Detection

Check which interface is available before proceeding:

```
has_mcp = check for tools starting with "pplx_"
has_cli = can run "pwm" commands via shell

if has_mcp and has_cli:
    Ask user which they prefer, or use MCP for programmatic access
elif has_mcp:
    Use pplx_* MCP tools directly
else:
    Use pwm CLI via shell
```

## Workflow Decision Tree

```
User wants to...
|
+-- Search the web / ask a question
|   +-- CLI:  pwm ask "query" [-m MODEL] [-t] [-s SOURCE]
|   +-- MCP:  pplx_ask(query) or pplx_query(query, model, thinking, source_focus)
|
+-- Deep research on a topic
|   +-- CLI:  pwm research "query"
|   +-- MCP:  pplx_deep_research(query)
|
+-- Use a specific model
|   +-- CLI:  pwm ask "query" -m gpt52 --thinking
|   +-- MCP:  pplx_gpt52_thinking(query)  or  pplx_query(query, model="gpt52", thinking=True)
|
+-- Check remaining quotas
|   +-- CLI:  pwm usage
|   +-- MCP:  pplx_usage()
|
+-- Authenticate / re-authenticate
|   +-- Interactive:      pwm login
|   +-- Non-interactive:  pwm login --email EMAIL  then  pwm login --email EMAIL --code CODE
|   +-- MCP (no shell):   pplx_auth_request_code(email)  then  pplx_auth_complete(email, code)
|
+-- Start MCP server
|   +-- pwm-mcp
|
+-- Start API server (for Claude Code / OpenAI SDK)
|   +-- pwm-api
```

## CLI Commands

### Querying

```bash
pwm ask "What is quantum computing?"
```

Choose a specific model with `-m`:
```bash
pwm ask "Compare React and Vue" -m gpt52
pwm ask "Explain attention mechanism" -m claude_sonnet
```

Enable extended thinking with `-t`:
```bash
pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet --thinking
```

Focus on specific sources with `-s`:
```bash
pwm ask "transformer improvements 2025" -s academic   # Scholarly papers
pwm ask "best mechanical keyboard" -s social           # Reddit/Twitter
pwm ask "Apple revenue Q4 2025" -s finance             # SEC EDGAR filings
pwm ask "latest AI news" -s all                        # All sources
```

Output options:
```bash
pwm ask "What is Rust?" --json            # JSON (for piping)
pwm ask "What is Rust?" --no-citations    # Answer only, no URLs
```

Combine flags:
```bash
pwm ask "protein folding advances" -m gemini_pro -s academic --json
```

### Deep Research

Uses a separate monthly quota. Produces in-depth reports with extensive sources.

```bash
pwm research "agentic AI trends 2026"
pwm research "climate policy impact" -s academic
pwm research "NVIDIA competitive landscape" -s finance --json
```

### Authentication

```bash
pwm login                                                # Interactive
pwm login --check                                        # Check status
pwm login --email user@example.com                       # Send code
pwm login --email user@example.com --code 123456         # Complete
```

### Usage

```bash
pwm usage                   # Cached limits
pwm usage --refresh         # Force-refresh from server
```

## MCP Tools Summary

| Tool | Purpose |
|------|---------|
| `pplx_query` | Flexible: model + thinking + source selection |
| `pplx_ask` | Quick Q&A (auto model) |
| `pplx_deep_research` | In-depth reports (monthly quota) |
| `pplx_sonar` | Perplexity Sonar model |
| `pplx_gpt52` / `_thinking` | OpenAI GPT-5.2 |
| `pplx_claude_sonnet` / `_think` | Anthropic Claude 4.6 Sonnet |
| `pplx_gemini_flash` / `_think` | Google Gemini 3 Flash |
| `pplx_gemini_pro_think` | Google Gemini 3.1 Pro (thinking always on) |
| `pplx_grok` / `_thinking` | xAI Grok 4.1 |
| `pplx_kimi_thinking` | Moonshot Kimi K2.5 (thinking always on) |
| `pplx_usage` | Check remaining quotas |
| `pplx_auth_status` | Check auth status |
| `pplx_auth_request_code` | Send verification code |
| `pplx_auth_complete` | Complete auth with code |

For full MCP tool parameters: See [references/mcp-tools.md](references/mcp-tools.md)

## Models

| CLI Name | Provider | Thinking | Notes |
|----------|----------|----------|-------|
| auto | Perplexity | No | Auto-selects best |
| sonar | Perplexity | No | Latest Perplexity model |
| deep_research | Perplexity | No | Monthly quota |
| gpt52 | OpenAI | Toggle | GPT-5.2 |
| claude_sonnet | Anthropic | Toggle | Claude 4.6 Sonnet |
| claude_opus | Anthropic | Toggle | Claude 4.6 Opus (Max tier) |
| gemini_flash | Google | Toggle | Gemini 3 Flash |
| gemini_pro | Google | Always | Gemini 3.1 Pro |
| grok | xAI | Toggle | Grok 4.1 |
| kimi | Moonshot | Always | Kimi K2.5 |

For full model details: See [references/models.md](references/models.md)

## Source Focus Options

| Option | Description | Example Use Case |
|--------|-------------|------------------|
| `web` | General web search (default) | News, general questions |
| `academic` | Academic papers, journals | Research, citations, scientific topics |
| `social` | Reddit, Twitter, forums | Opinions, recommendations, community |
| `finance` | SEC EDGAR filings | Company financials, regulatory filings |
| `all` | Web + Academic + Social | Broad coverage across all sources |

## Error Recovery

| Error | Cause | Solution |
|-------|-------|----------|
| 403 Forbidden | Token expired | `pwm login` |
| 429 Rate limit | Quota exhausted | Wait, check `pwm usage` |
| "No token found" | Not authenticated | `pwm login` |
| "LIMIT REACHED" | Quota at zero | Wait for reset or upgrade |

## Common Patterns

### Quick web search
```bash
pwm ask "What happened in AI today?"
```

### Specific model
```bash
pwm ask "Compare React and Vue" -m gpt52
```

### Model with thinking
```bash
pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet -t
```

### Academic research
```bash
pwm ask "transformer improvements 2025" -m gemini_pro -s academic
```

### Financial analysis
```bash
pwm ask "Apple revenue Q4 2025" -s finance
```

### Launch Claude Code seamlessly (Integration)
```bash
pwm hack claude
```

### Deep research pipeline
```bash
pwm research "quantum computing breakthroughs 2026" --json > research.json
```

### Check everything before heavy use
```bash
pwm login --check && pwm usage
```

### Re-authenticate (non-interactive, for AI agents)
```bash
pwm login --email user@example.com
# wait for email, then:
pwm login --email user@example.com --code 123456
```

## API Server

For API server setup and model name mapping, see [references/api-endpoints.md](references/api-endpoints.md).
