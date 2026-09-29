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
├── sessions.py          # Multi-turn context persistence and thread management
├── models.py            # Model definitions (GPT, Claude, Gemini, Grok, etc.)
├── config.py            # ClientConfig, ConversationConfig
├── enums.py             # CitationMode, SearchFocus, SourceFocus
├── http.py              # HTTP client with retry/rate limiting
├── rate_limits.py       # Rate limit checking via /rest/rate-limit/all
├── token_store.py       # Token persistence (~/.config/perplexity-web-mcp/token)
├── preferences.py       # Saved user preferences (default model, thinking, source)
├── data/                # Bundled Agent Skill (SKILL.md + references/)
├── cli/
│   ├── main.py          # Unified CLI entry point (pwm; chat, config, threads, export)
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
pwm config [show|set|clear]                    # Saved default model, thinking, source
pwm chat [-m MODEL] [-t] [-s SOURCE]          # Multi-turn interactive chat
pwm council "query" [-m MODELS] [-t] [-s SOURCE]  # Model Council (multi-model)
pwm research "query" [-s SOURCE]              # Deep research
pwm login [--check] [--email E --code C]      # Authentication
pwm usage [--refresh]                          # Rate limits
pwm setup [list|add|remove] CLIENT             # MCP config
pwm skill [list|install|uninstall] TOOL        # Skill management
pwm doctor [-v]                                # Diagnostics
pwm --ai                                       # AI reference doc
```

## Models

- `auto` / `sonar` (Sonar 2, API id `experimental`) / `deep_research`
- `gpt56_terra` / `gpt6_sol` (+ thinking)
- `gpt56_sol` (+ thinking, Max)
- `grok45` / `grok47` (+ thinking)
- `claude_sonnet` (+ thinking) / `claude_opus` / `claude_opus55` (+ thinking, Max)
- `gemini_pro` (always thinking) / `gemini38` (+ thinking)
- `nemotron` / `glm52` / `glm53` (always thinking)
- `kimi_k26` (+ thinking) / `kimi_k3` (always thinking)

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
