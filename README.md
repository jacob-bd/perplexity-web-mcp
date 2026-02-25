<p align="center">
  <img src="assets/logo.png" alt="Perplexity Web MCP" width="700">
</p>

# Perplexity Web MCP

MCP server, CLI, and API-compatible interface for Perplexity AI's web interface.

Use your Perplexity Pro/Max subscription to access premium models (GPT-5.2, Claude 4.6 Opus, Claude 4.6 Sonnet, Gemini 3, Grok 4.1, Kimi K2.5) from the terminal, through MCP tools, or as an API endpoint.

## Features

- **CLI**: Query Perplexity models directly from the terminal (`pwm ask`, `pwm research`)
- **MCP Server**: 17 MCP tools for AI agents with citations and rate limit checking
- **API Server**: Drop-in Anthropic Messages API and OpenAI Chat Completions API
- **10 Models**: GPT-5.2, Claude 4.6 Opus, Claude 4.6 Sonnet, Gemini 3 Flash, Gemini 3.1 Pro, Grok 4.1, Kimi K2.5, Sonar
- **Thinking Mode**: Extended thinking support for all compatible models
- **Deep Research**: Full support for Perplexity's Deep Research mode
- **Setup & Skill Management**: Auto-configure MCP for Claude, Cursor, Windsurf, Gemini CLI; install Agent Skills across platforms
- **Doctor**: Diagnose installation, auth, config, rate limits, and skill status

## Vibe Coding Alert

Full transparency: this project was built by a non-developer using AI coding assistants. If you're an experienced Python developer, you might look at this codebase and wince. That's okay.

The goal here was to learn — both about building CLI tools in Python and about how modern web applications work under the hood. The code works, but it's very much a learning project released solely for the purpose of research and education, not a polished product.

**If you know better, teach us.** PRs, issues, and architectural advice are all welcome. This is open source specifically because human expertise is irreplaceable.

---

## Installation

### From PyPI (recommended)

**Using uv:**

```bash
uv tool install perplexity-web-mcp-cli
```

**Using pipx:**

```bash
pipx install perplexity-web-mcp-cli
```

**Using pip:**

```bash
pip install perplexity-web-mcp-cli
```

> **Note:** Requires Python 3.10-3.13.

### From source (for development)

```bash
git clone https://github.com/jacob-bd/perplexity-web-mcp.git
cd perplexity-web-mcp
uv venv && source .venv/bin/activate
uv pip install -e .
```

### Upgrading

```bash
pip install --upgrade perplexity-web-mcp-cli
```

After upgrading, restart your MCP client (Claude Code, Cursor, etc.) to reload the server.

---

## Quick Start

```bash
# 1. Authenticate
pwm login

# 2. Ask a question
pwm ask "What is quantum computing?"

# 3. Deep research
pwm research "agentic AI trends 2026"

# 4. Check your remaining quotas
pwm usage

# 5. Set up MCP for your AI tools
pwm setup add claude-code
pwm setup add cursor

# 6. Install the Agent Skill
pwm skill install claude-code

# 7. Diagnose any issues
pwm doctor
```

---

## CLI Reference

### Querying

Ask Perplexity a question. By default, Perplexity auto-selects the best model.

```bash
pwm ask "What is quantum computing?"
```

**Choose a specific model** with `-m` (see [Models](#models) for the full list):

```bash
pwm ask "Compare React and Vue" -m gpt52
```

```bash
pwm ask "Explain the attention mechanism" -m claude_sonnet
```

**Enable extended thinking** with `-t` for deeper reasoning (available on models with Toggle thinking):

```bash
pwm ask "Prove that the square root of 2 is irrational" -m claude_sonnet --thinking
```

**Focus on specific sources** with `-s` to control where Perplexity searches:

```bash
# Search only academic papers and scholarly articles
pwm ask "transformer architecture improvements 2025" -s academic

# Search only social media (Reddit, Twitter, etc.)
pwm ask "best mechanical keyboard 2026" -s social

# Search SEC EDGAR financial filings
pwm ask "Apple revenue Q4 2025" -s finance

# Search all source types at once
pwm ask "latest AI news" -s all
```

**Output options:**

```bash
# JSON output (for piping to other tools)
pwm ask "What is Rust?" --json

# Suppress citation URLs (answer text only)
pwm ask "What is Rust?" --no-citations
```

**Combine flags** for full control:

```bash
pwm ask "recent advances in protein folding" -m gemini_pro -s academic --json
```

### Deep Research

Run Perplexity's Deep Research mode for in-depth reports with extensive sources. Uses a separate **monthly** quota.

```bash
pwm research "agentic AI trends 2026"
```

```bash
pwm research "climate policy impact on renewable energy" -s academic
```

```bash
pwm research "NVIDIA competitive landscape" -s finance --json
```

### Authentication

```bash
pwm login                                    # Interactive login (email + OTP)
pwm login --check                            # Check if authenticated
pwm login --email user@example.com           # Send verification code (non-interactive)
pwm login --email user@example.com --code 123456  # Complete auth with code
```

### Usage & Limits

```bash
pwm usage                  # Check remaining rate limits
pwm usage --refresh        # Force-refresh from Perplexity servers
```

### Hack

Seamlessly launch external AI tools connected to the Perplexity API server. This automatically starts the local `pwm api` server in the background, sets the required environment variables, and launches the tool.

```bash
pwm hack claude            # Launch Claude Code
pwm hack claude -m gpt52   # Launch Claude Code with a specific model
```

### MCP Setup

```bash
pwm setup list             # Show supported tools and MCP configuration status
pwm setup add claude-code  # Add MCP server to Claude Code
pwm setup add cursor       # Add MCP server to Cursor
pwm setup add windsurf     # Add MCP server to Windsurf
pwm setup add gemini       # Add MCP server to Gemini CLI
pwm setup remove cursor    # Remove MCP server from a tool
```

### Skill Management

```bash
pwm skill list                            # Show installation status per platform
pwm skill install claude-code             # Install skill for Claude Code
pwm skill install cursor --level project  # Install at project level
pwm skill uninstall gemini-cli            # Remove skill
pwm skill update                          # Update all outdated skills
pwm skill show                            # Display skill content
```

### Doctor

```bash
pwm doctor                 # Diagnose installation, auth, config, limits
pwm doctor -v              # Verbose (includes security + per-platform skill status)
```

### AI Documentation

```bash
pwm --ai                   # Print comprehensive AI-optimized reference
```

---

## Models

| CLI Name | Provider | Thinking | Notes |
|----------|----------|----------|-------|
| `auto` | Perplexity | No | Auto-selects best model |
| `sonar` | Perplexity | No | Perplexity's latest model |
| `deep_research` | Perplexity | No | Monthly quota, in-depth reports |
| `gpt52` | OpenAI | Toggle | GPT-5.2 |
| `claude_sonnet` | Anthropic | Toggle | Claude 4.6 Sonnet |
| `claude_opus` | Anthropic | Toggle | Claude 4.6 Opus (Max tier required) |
| `gemini_flash` | Google | Toggle | Gemini 3 Flash |
| `gemini_pro` | Google | Always | Gemini 3.1 Pro |
| `grok` | xAI | Toggle | Grok 4.1 |
| `kimi` | Moonshot | Always | Kimi K2.5 |

### Source Focus

Control where Perplexity searches using `-s` (CLI) or `source_focus` (MCP):

| Option | Description | Example Use Case |
|--------|-------------|------------------|
| `web` | General web search (default) | News, general questions |
| `academic` | Academic papers, journals | Research, citations, scientific topics |
| `social` | Reddit, Twitter, forums | Opinions, recommendations, community sentiment |
| `finance` | SEC EDGAR filings | Company financials, regulatory filings |
| `all` | Web + Academic + Social combined | Broad coverage across all sources |

---

## MCP Server

### Setup

The easiest way to configure MCP:

```bash
pwm setup add claude-code
```

Or configure manually for any MCP client:

**Claude Code CLI:**
```bash
claude mcp add perplexity pwm-mcp
```

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp"
    }
  }
}
```

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp"
    }
  }
}
```

### Available MCP Tools

**Query tools (14):**

| Tool | Description |
|------|-------------|
| `pplx_query` | Flexible: model selection + thinking toggle |
| `pplx_ask` | Quick Q&A (auto-selects best model) |
| `pplx_deep_research` | In-depth reports with sources |
| `pplx_sonar` | Perplexity Sonar |
| `pplx_gpt52` / `pplx_gpt52_thinking` | GPT-5.2 |
| `pplx_claude_sonnet` / `pplx_claude_sonnet_think` | Claude 4.6 Sonnet |
| `pplx_gemini_flash` / `pplx_gemini_flash_think` | Gemini 3 Flash |
| `pplx_gemini_pro_think` | Gemini 3.1 Pro (thinking always on) |
| `pplx_grok` / `pplx_grok_thinking` | Grok 4.1 |
| `pplx_kimi_thinking` | Kimi K2.5 (thinking always on) |

**Usage & auth tools (4):**

| Tool | Description |
|------|-------------|
| `pplx_usage` | Check remaining quotas |
| `pplx_auth_status` | Check authentication status |
| `pplx_auth_request_code` | Send verification code to email |
| `pplx_auth_complete` | Complete auth with 6-digit code |

All query tools support `source_focus`: `web`, `academic`, `social`, `finance`, `all`.

---

## API Server

Use Perplexity models through Anthropic or OpenAI compatible API endpoints.

### Start the server

```bash
pwm api
```

### Anthropic API (Claude Code)

```bash
export ANTHROPIC_BASE_URL=http://localhost:8080
export ANTHROPIC_API_KEY=perplexity
claude --model gpt-5.2
```

Alternatively, launch Claude Code seamlessly using the `hack` command, which automatically starts the API server and configures the environment for you:

```bash
pwm hack claude
```

### OpenAI API

```bash
export OPENAI_BASE_URL=http://localhost:8080/v1
export OPENAI_API_KEY=anything
```

### API Model Names

| API Name | Perplexity Model | Thinking |
|----------|------------------|----------|
| `perplexity-auto` | Best (auto-select) | No |
| `gpt-5.2` | GPT-5.2 | Toggle |
| `claude-sonnet-4-6` | Claude 4.6 Sonnet | Toggle |
| `claude-opus-4-6` | Claude 4.6 Opus | Toggle |
| `gemini-3-flash` | Gemini 3 Flash | Toggle |
| `gemini-3.1-pro` | Gemini 3.1 Pro | Always |
| `grok-4.1` | Grok 4.1 | Toggle |
| `kimi-k2.5` | Kimi K2.5 | Always |

Legacy aliases (`claude-3-5-sonnet`, `claude-3-opus`) are supported for compatibility.

---

## Python API

```python
from perplexity_web_mcp import Perplexity, ConversationConfig, Models

client = Perplexity(session_token="your_token")
conversation = client.create_conversation(
    ConversationConfig(model=Models.CLAUDE_45_SONNET)
)

conversation.ask("What is quantum computing?")
print(conversation.answer)

for result in conversation.search_results:
    print(f"Source: {result.url}")

# Follow-up (context preserved)
conversation.ask("Explain it simpler")
print(conversation.answer)
```

---

## Subscription Tiers & Rate Limits

| Tier | Cost | Pro Search | Deep Research | Labs |
|------|------|------------|---------------|------|
| Free | $0 | 3/day | 1/month | No |
| Pro | $20/mo | Weekly pool | Monthly pool | Monthly pool |
| Max | $200/mo | Weekly pool | Monthly pool | Monthly pool |

The MCP server checks quotas before each query. Use `pwm usage` or `pplx_usage` to check your limits.

---

## Troubleshooting

### Authentication Errors (403)

Session tokens last ~30 days. Re-authenticate when expired:

```bash
pwm login
```

**Non-interactive (for AI agents):**

```bash
pwm login --email your@email.com
```
```bash
pwm login --email your@email.com --code 123456
```

**Via MCP tools (for AI agents without shell):**

1. Call `pplx_auth_request_code(email="your@email.com")`
2. Check email for 6-digit code
3. Call `pplx_auth_complete(email="your@email.com", code="123456")`

### Diagnose Issues

```bash
pwm doctor
```

This checks installation, authentication, rate limits, MCP configuration, and skill installation -- with fix suggestions for every issue found.

### Rate Limiting

- **CLI/MCP**: Auto-checks quotas before each query, blocks if exhausted
- **API server**: Enforces 5-second minimum between requests

---

## Agent Skill

This project includes a portable [Agent Skill](https://agentskills.io/) (SKILL.md) that teaches AI agents how to use the CLI and MCP tools. Install it for your platform:

```bash
pwm skill install claude-code
pwm skill install cursor
pwm skill install gemini-cli
```

The skill follows Anthropic's Agent Skills open standard and works across any compliant AI platform.

---

## Credits

Originally forked from [perplexity-webui-scraper](https://github.com/henrique-coder/perplexity-webui-scraper) by [henrique-coder](https://github.com/henrique-coder).

## License

MIT
