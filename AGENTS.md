# Perplexity Web MCP

CLI, MCP server, and API-compatible interface for Perplexity AI's web interface.

## Quick Start

```bash
# Install
uv venv && uv pip install -e .

# Authenticate
pwm login

# Query from terminal
pwm ask "What is quantum computing?"

# Run MCP server
pwm-mcp
```

## Project Structure

```
src/perplexity_web_mcp/
├── __init__.py          # Package exports
├── shared.py            # Shared query logic (MODEL_MAP, ask(), list_threads(), get_thread(), used by CLI + MCP)
├── council.py           # Model Council (parallel multi-model queries + synthesis)
├── core.py              # Perplexity client (Conversation, list_threads, get_thread methods)
├── sessions.py          # Multi-turn context persistence and thread management
├── models.py            # Model definitions (GPT, Codex, Gemini, Grok, etc.)
├── config.py            # ClientConfig, ConversationConfig
├── constants.py         # API endpoints (including ENDPOINT_LIST_THREADS, ENDPOINT_THREAD_DETAIL)
├── enums.py             # CitationMode, SearchFocus, SourceFocus
├── http.py              # HTTP client with retry/rate limiting
├── rate_limits.py       # Rate limit checking via /rest/rate-limit/all
├── token_store.py       # Token persistence (~/.config/perplexity-web-mcp/token)
├── data/                # Bundled Agent Skill (SKILL.md + references/)
│   └── references/
│       ├── mcp-tools.md # Full MCP tool parameter reference (includes thread library tools)
│       ├── models.md    # Model reference
│       └── api-endpoints.md  # API server reference
├── cli/
│   ├── main.py          # Unified CLI entry point (pwm) — includes threads + export commands
│   ├── auth.py          # Authentication flow
│   ├── setup.py         # MCP server setup for AI tools
│   ├── skill.py         # Agent Skill management
│   ├── doctor.py        # Diagnostic checks
│   └── ai_doc.py        # --ai flag documentation
├── mcp/
│   └── server.py        # MCP server (pplx_* tools + perplexity:// resources)
└── api/
    └── server.py        # Anthropic/OpenAI API compatibility
```

## CLI Commands

```bash
pwm ask "query" [-m MODEL] [-t] [-s SOURCE]  # Query Perplexity
pwm chat [-m MODEL] [-t] [-s SOURCE]          # Multi-turn interactive chat
pwm council "query" [-m MODELS] [-t] [-s SOURCE]  # Model Council (multi-model)
pwm research "query" [-s SOURCE]              # Deep research
pwm threads [-l LIMIT] [-s SEARCH] [--json]  # Browse thread library (FREE)
pwm export [-o FILE] [-s SEARCH] [-l LIMIT]  # Export thread library to JSON (FREE)
pwm login [--check] [--email E --code C]      # Authentication
pwm usage [--refresh]                          # Rate limits
pwm setup [list|add|remove] CLIENT             # MCP config
pwm skill [list|install|uninstall] TOOL        # Skill management
pwm doctor [-v]                                # Diagnostics
pwm --ai                                       # AI reference doc
```

## Models

- `auto` / `sonar` (Sonar 2, API id `experimental`) / `deep_research`
- `gpt56_terra` (+ thinking)
- `gpt56_sol` (+ thinking, Max)
- `grok45` (+ thinking)
- `claude_sonnet` / `claude_opus` (+ thinking)
- `gemini_pro` (always thinking)
- `nemotron` (always thinking)
- `glm52` (always thinking)
- `kimi_k26` (+ thinking)

## Development

```bash
# Install with dev dependencies
uv pip install -e .

# Run the default offline test suite
uv run --group tests pytest tests/ -v

# Deliberately run only live integration tests
uv run --group tests pytest tests/ -v -m integration --run-live-tests
```

## Credits

Based on [perplexity-webui-scraper](https://github.com/henrique-coder/perplexity-webui-scraper) by henrique-coder.

Thread library endpoints (`/rest/thread/list_ask_threads`, `/rest/thread/{slug}`) discovered by
[kylebrodeur/perplexity-exporter](https://github.com/kylebrodeur/perplexity-exporter).
