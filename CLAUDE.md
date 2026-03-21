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
├── shared.py            # Shared query logic (MODEL_MAP, ask(), used by CLI + MCP)
├── council.py           # Model Council (parallel multi-model queries + synthesis)
├── core.py              # Perplexity client, Conversation class
├── models.py            # Model definitions (GPT, Claude, Gemini, Grok, etc.)
├── config.py            # ClientConfig, ConversationConfig
├── enums.py             # CitationMode, SearchFocus, SourceFocus
├── http.py              # HTTP client with retry/rate limiting
├── rate_limits.py       # Rate limit checking via /rest/rate-limit/all
├── token_store.py       # Token persistence (~/.config/perplexity-web-mcp/token)
├── data/                # Bundled Agent Skill (SKILL.md + references/)
├── cli/
│   ├── main.py          # Unified CLI entry point (pwm)
│   ├── auth.py          # Authentication flow
│   ├── setup.py         # MCP server setup for AI tools
│   ├── skill.py         # Agent Skill management
│   ├── doctor.py        # Diagnostic checks
│   └── ai_doc.py        # --ai flag documentation
├── mcp/
│   └── server.py        # MCP server (imports from shared.py)
└── api/
    └── server.py        # Anthropic/OpenAI API compatibility
```

## CLI Commands

```bash
pwm ask "query" [-m MODEL] [-t] [-s SOURCE]  # Query Perplexity
pwm council "query" [-m MODELS] [-s SOURCE]   # Model Council (multi-model)
pwm research "query" [-s SOURCE]              # Deep research
pwm login [--check] [--email E --code C]      # Authentication
pwm usage [--refresh]                          # Rate limits
pwm setup [list|add|remove] CLIENT             # MCP config
pwm skill [list|install|uninstall] TOOL        # Skill management
pwm doctor [-v]                                # Diagnostics
pwm --ai                                       # AI reference doc
```

## Models

- `auto` / `sonar` / `deep_research`
- `gpt54` (+ thinking)
- `claude_sonnet` / `claude_opus` (+ thinking)
- `gemini_pro` (always thinking)
- `nemotron` (always thinking)

## Development

```bash
# Install with dev dependencies
uv pip install -e .

# Run tests
uv run --group tests pytest tests/ -v

# Run just unit tests (no network calls)
uv run --group tests pytest tests/ -v -k "not Integration"
```

## Credits

Based on [perplexity-webui-scraper](https://github.com/henrique-coder/perplexity-webui-scraper) by henrique-coder.
