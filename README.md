<p align="center">
  <img src="assets/logo.png" alt="Perplexity Web MCP" width="700">
</p>

# Perplexity Web MCP & CLI

[![PyPI version](https://img.shields.io/pypi/v/perplexity-web-mcp-cli)](https://pypi.org/project/perplexity-web-mcp-cli/)
[![PyPI downloads](https://img.shields.io/pypi/dm/perplexity-web-mcp-cli)](https://pypistats.org/packages/perplexity-web-mcp-cli)
[![Total downloads](https://static.pepy.tech/badge/perplexity-web-mcp-cli)](https://pepy.tech/projects/perplexity-web-mcp-cli)
[![Python](https://img.shields.io/pypi/pyversions/perplexity-web-mcp-cli)](https://pypi.org/project/perplexity-web-mcp-cli/)
[![License](https://img.shields.io/pypi/l/perplexity-web-mcp-cli)](https://github.com/jacob-bd/perplexity-web-mcp/blob/main/LICENSE)

<p align="center">
  <a href="https://youtu.be/9xyClDvmoZ0">
    <img src="https://img.youtube.com/vi/9xyClDvmoZ0/maxresdefault.jpg" alt="Perplexity Powerhouse + Model Council Demo" width="400">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://youtu.be/ffyibtyk-LQ">
    <img src="https://img.youtube.com/vi/ffyibtyk-LQ/maxresdefault.jpg" alt="Demo Overview" width="400">
  </a>
  <br>
  <sub>▶️ <strong>Watch: <a href="https://youtu.be/9xyClDvmoZ0">Latest Update Demo</a> | <a href="https://youtu.be/ffyibtyk-LQ">Original Overview</a></strong></sub>
</p>

MCP server, CLI, and API-compatible interface for Perplexity AI's web interface.

Use your Perplexity Pro/Max subscription to access premium models (Sonar 2, GPT-5.6 Terra, GPT-5.6 Sol, Gemini 3.1 Pro, Claude Sonnet 5, Claude Opus 4.8, GLM 5.2, Kimi K2.6, Grok 4.5, and Nemotron 3 Ultra) from the terminal, through MCP tools, or as an API endpoint.

## Features

- **CLI**: Query Perplexity models directly from the terminal (`pwm ask`, `pwm council`, `pwm research`, `pwm chat`)
- **MCP Server**: MCP tools for AI agents with citations, rate limit checking, and multi-turn context
- **API Server**: Drop-in Anthropic Messages API and OpenAI Chat Completions API
- **10 Models**: Sonar 2, GPT-5.6 Terra, GPT-5.6 Sol, Gemini 3.1 Pro, Claude Sonnet 5, Claude Opus 4.8, GLM 5.2, Kimi K2.6, Grok 4.5, and Nemotron 3 Ultra
- **Thinking Mode**: Extended thinking support for all compatible models
- **Deep Research**: Full support for Perplexity's Deep Research mode
- **Multi-Turn Conversations**: State-preserved threaded conversations for both MCP and CLI REPL
- **Model Council**: Query multiple models in parallel and get a synthesized consensus
- **Setup & Skill Management**: Auto-configure MCP for Claude Code, Cursor, Windsurf, Gemini CLI, Codex, Cline, Antigravity; install Agent Skills across 9 platforms
- **Doctor**: Diagnose installation, auth, config, rate limits, and skill status

## Vibe Coding Alert

Full transparency: this project was built by a non-developer using AI coding assistants. If you're an experienced Python developer, you might look at this codebase and wince. That's okay.

The goal here was to learn — both about building CLI tools in Python and about how modern web applications work under the hood. The code works, but it's very much a learning project released solely for the purpose of research and education, not a polished product.

> [!WARNING]
> **Unofficial & Unsupported** — This project is **not affiliated with, endorsed by, or supported by Perplexity AI**. It interacts with Perplexity's web interface through unofficial, undocumented methods that may break at any time without notice if Perplexity changes their internal APIs or RPCs. Use at your own risk. The author(s) accept no responsibility for any consequences to your Perplexity account, including but not limited to rate limiting, suspension, or termination. This project is released strictly for **educational and research purposes only**.

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
pwm setup add all           # Interactive setup for all detected tools
pwm setup add cursor        # Or add individually

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
pwm ask "Compare React and Vue" -m gpt56_terra
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

# Search an account connector source, when your Perplexity account exposes one
pwm connectors list
pwm ask "recent funding for Stripe" -s pitchbook_mcp_cashmere
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

### Model Council

Query multiple models in parallel and get a synthesized consensus. Each model costs 1 Pro Search. Default synthesis uses Sonar 2 (also 1 Pro Search).

```bash
# Default: GPT-5.6 Terra, Claude Sonnet, Gemini Pro + Sonar 2 synthesis (4 Pro Searches)
pwm council "What are best practices for microservices?"
```

```bash
# Custom model selection
pwm council "Compare Rust and Go" -m gpt56_terra,claude_sonnet
```

```bash
# Enable extended thinking for all council models
pwm council "Prove the Pythagorean theorem" --thinking
```

```bash
# Skip synthesis, output as JSON
pwm council "React vs Vue" --no-synthesis --json
```

### Authentication

```bash
pwm login                                    # Interactive login (email + OTP)
pwm login --check                            # Check if authenticated
pwm login --email user@example.com           # Send verification code (non-interactive)
pwm login --email user@example.com --code 123456  # Complete auth with code
pwm login --email user@example.com --code 123456 --totp-code 654321  # Account with TOTP enabled
```

Set `PWM_SAVE_TO_LIBRARY=1` to save shared CLI and MCP queries to the Perplexity thread library. Queries are
incognito by default.

### Usage & Limits

```bash
pwm usage                  # Check remaining rate limits
pwm usage --refresh        # Force-refresh from Perplexity servers
```

### Hack

Seamlessly launch external AI tools connected to the Perplexity API server. This automatically starts the local `pwm api` server in the background, sets the required environment variables, and launches the tool.

```bash
pwm hack claude            # Launch Claude Code
pwm hack claude -m gpt56_terra   # Launch Claude Code with a specific model
```

### MCP Setup

```bash
pwm setup list             # Show supported tools and MCP configuration status
pwm setup add all          # Interactive: detect and configure all tools
pwm setup add claude-code  # Add MCP server to Claude Code
pwm setup add cursor       # Add MCP server to Cursor
pwm setup add codex        # Add MCP server to Codex CLI
pwm setup add gemini       # Add MCP server to Gemini CLI
pwm setup add windsurf     # Add MCP server to Windsurf
pwm setup add cline        # Add MCP server to Cline CLI
pwm setup add antigravity  # Add MCP server to Antigravity
pwm setup remove all       # Remove from all configured tools
pwm setup remove cursor    # Remove MCP server from a tool
```

For clients that support HTTP/SSE, or when multiple sessions should share one
MCP process, run the local daemon:

```bash
pwm serve-mcp --transport streamable-http  # Start HTTP MCP on 127.0.0.1:8000/mcp
pwm serve-mcp --status                # Check daemon status
pwm serve-mcp --stop                  # Stop the daemon
pwm setup add codex --http            # Configure Codex for Streamable HTTP
pwm serve-mcp --transport sse         # Start the legacy SSE transport
```

The HTTP transports bind to loopback by default. Keep the daemon on a loopback
address unless you put an authenticated reverse proxy in front of it.

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

| CLI Name        | Provider   | Thinking | Notes                                            |
| --------------- | ---------- | -------- | ------------------------------------------------ |
| `auto`          | Perplexity | No       | Auto-selects best model                          |
| `sonar`         | Perplexity | No       | Sonar 2 (latest in-house; API id `experimental`) |
| `deep_research` | Perplexity | No       | Monthly quota, in-depth reports                  |
| `gpt56_terra`   | OpenAI     | Toggle   | GPT-5.6 Terra                                    |
| `gpt56_sol`     | OpenAI     | Toggle   | GPT-5.6 Sol (Max tier required)                  |
| `grok45`        | xAI        | Toggle   | Grok 4.5                                         |
| `claude_sonnet` | Anthropic  | Toggle   | Claude Sonnet 5                                |
| `claude_opus`   | Anthropic  | Toggle   | Claude Opus 4.8 (Max tier required)              |
| `gemini_pro`    | Google     | Always   | Gemini 3.1 Pro                                   |
| `nemotron`      | NVIDIA     | Always   | Nemotron 3 Ultra 550B                            |
| `glm52`         | Z.ai       | Always   | GLM 5.2                                          |
| `kimi_k26`      | Moonshot   | Toggle   | Kimi K2.6                                        |

### Source Focus

Control where Perplexity searches using `-s` (CLI) or `source_focus` (MCP):

| Option     | Description                      | Example Use Case                               |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `web`      | General web search (default)     | News, general questions                        |
| `academic` | Academic papers, journals        | Research, citations, scientific topics         |
| `social`   | Reddit, Twitter, forums          | Opinions, recommendations, community sentiment |
| `finance`  | SEC EDGAR filings                | Company financials, regulatory filings         |
| `all`      | Web + Academic + Social combined | Broad coverage across all sources              |

### Account Connector Sources

Accounts with Perplexity connectors may expose additional source IDs such as `pitchbook_mcp_cashmere` or `cbinsights_mcp_cashmere`. List IDs before using them:

```bash
pwm connectors list
pwm ask "recent funding for Stripe" -s pitchbook_mcp_cashmere
```

MCP clients should call `pplx_connectors()` first, then pass the returned ID as `source_focus`.

Connector access inherits the authenticated Perplexity account's permissions and may expose private organization or cloud data to whichever local agent can call this tool. Unknown and unreported connector values fail instead of falling back to web search. Administrators can set `PWM_CONNECTORS_ENABLED=0` to disable connector queries or set `PWM_CONNECTOR_ALLOWLIST` to a comma-separated list of exact connector IDs. When these variables are unset, reported connectors remain available for backward compatibility. See [Account Connector Sources](docs/connectors.md) for the full trust-boundary guidance.

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

**Claude Desktop** — Download the `.mcpb` extension from the [latest release](https://github.com/jacob-bd/perplexity-web-mcp/releases/latest) and open it with Claude Desktop. Or configure manually:

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

**Query tools:**

| Tool                                              | Description                                 |
| ------------------------------------------------- | ------------------------------------------- |
| `pplx_query`                                      | Flexible: model selection + thinking toggle |
| `pplx_ask`                                        | Quick Q&A (auto-selects best model)         |
| `pplx_deep_research`                              | In-depth reports with sources               |
| `pplx_sonar`                                      | Perplexity Sonar 2 (1 Pro Search)           |
| `pplx_gpt56_terra` / `pplx_gpt56_terra_thinking`              | GPT-5.6 Terra                                     |
| `pplx_gpt56_sol` / `pplx_gpt56_sol_thinking`              | GPT-5.6 Sol (Max tier)                          |
| `pplx_grok45` / `pplx_grok45_thinking`                    | Grok 4.5                                        |
| `pplx_claude_sonnet` / `pplx_claude_sonnet_think` | Claude Sonnet 5                           |
| `pplx_claude_opus` / `pplx_claude_opus_think`     | Claude Opus 4.8 (Max tier)                  |
| `pplx_gemini_pro_think`                           | Gemini 3.1 Pro (thinking always on)         |
| `pplx_nemotron_thinking`                          | Nemotron 3 Ultra (thinking always on)       |
| `pplx_glm52`                                      | GLM 5.2 (thinking always on)                |
| `pplx_kimi_k26` / `pplx_kimi_k26_thinking`         | Kimi K2.6                                   |

**Smart routing (1):**

| Tool               | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `pplx_smart_query` | Quota-aware routing — auto-selects best model based on limits |

**Council (1):**

| Tool           | Description                                               |
| -------------- | --------------------------------------------------------- |
| `pplx_council` | Query multiple models in parallel with optional synthesis |

**Usage, connectors & auth tools (5):**

| Tool                     | Description                     |
| ------------------------ | ------------------------------- |
| `pplx_usage`             | Check remaining quotas          |
| `pplx_connectors`        | List connector source IDs       |
| `pplx_auth_status`       | Check authentication status     |
| `pplx_auth_request_code` | Send verification code to email |
| `pplx_auth_complete`     | Complete email and TOTP authentication |

All query tools support `source_focus`: `none`, `web`, `academic`, `social`, `finance`, `all`, or a connector source ID returned by `pplx_connectors()`.

---

## API Server

Use Perplexity models through Anthropic or OpenAI compatible API endpoints.

### Start the server

```bash
pwm api
```

The server binds to `127.0.0.1` by default. A non-loopback `--host` or `HOST`
value is rejected unless `PWM_API_KEY` (or the legacy `ANTHROPIC_API_KEY`)
contains a non-empty secret. Remote use should also be protected by a trusted
TLS reverse proxy and firewall rules because the built-in server serves plain
HTTP. Clients may send the configured secret as `x-api-key` or
`Authorization: Bearer <secret>`.

### Anthropic API (Claude Code)

```bash
export ANTHROPIC_BASE_URL=http://localhost:8080
export ANTHROPIC_API_KEY=perplexity
claude --model gpt-5.6-terra
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

### Codex CLI Integration

Codex CLI performs strict client-side model validation. By default, it will reject any model name that isn't a recognized OpenAI ChatGPT account model (e.g., rejecting `sonar`).

To bypass this client-side block and use arbitrary Perplexity models natively, start Codex with the `--local-provider lmstudio` flag (or `--oss`). This instructs Codex to treat the backend as a local proxy:

```bash
export OPENAI_API_BASE=http://localhost:8080/v1
export OPENAI_API_KEY=dummy

codex -m sonar --local-provider lmstudio
```

Our server's `MODEL_MAP` will seamlessly intercept `sonar` (or any other mapped names like `gemini-pro`, `nemotron`, `glm-5.2`, `claude-sonnet-5`) and correctly route it to Perplexity's API. You can also create an alias in your shell to make this easier: `alias codex-pplx="codex --local-provider lmstudio"`.

### API Model Names

| API Name                        | Perplexity Model   | Thinking |
| ------------------------------- | ------------------ | -------- |
| `perplexity-auto`               | Best (auto-select) | No       |
| `gpt-5.6-terra`                 | GPT-5.6 Terra      | Toggle   |
| `gpt-5.6-sol`                   | GPT-5.6 Sol        | Toggle   |
| `grok-4.5`                      | Grok 4.5           | Toggle   |
| `claude-sonnet-5`               | Claude Sonnet 5    | Toggle   |
| `claude-opus-4-8`               | Claude Opus 4.8    | Toggle   |
| `gemini-3.1-pro`                | Gemini 3.1 Pro     | Always   |
| `glm-5.2` / `glm52`             | GLM 5.2            | Always   |
| `nemotron-3-ultra` / `nemotron` | Nemotron 3 Ultra   | Always   |

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

| Tier | Cost    | Pro Search  | Deep Research | Labs         |
| ---- | ------- | ----------- | ------------- | ------------ |
| Free | $0      | 3/day       | 1/month       | No           |
| Pro  | $20/mo  | Weekly pool | Monthly pool  | Monthly pool |
| Max  | $200/mo | Weekly pool | Monthly pool  | Monthly pool |

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

If the tool returns `TOTP_REQUIRED`, call it again with
`pplx_auth_complete(email="your@email.com", totp_code="654321")`.

### Blank or Truncated Answers

Perplexity can return answer chunks without the older `text` field. If `pwm ask` returns `No answer received` or only part of the answer, upgrade to the latest patch release:

```bash
uv tool upgrade perplexity-web-mcp-cli
pwm --version
```

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
pwm skill install all              # Install for all detected tools
pwm skill install claude-code      # Or install individually
pwm skill install cursor
pwm skill install codex
pwm skill install gemini-cli
pwm skill install antigravity
pwm skill install cline
pwm skill install opencode
pwm skill install openclaw
pwm skill install alef-agent
```

The skill follows Anthropic's Agent Skills open standard and works across any compliant AI platform.

---

## Credits

Originally forked from [perplexity-webui-scraper](https://github.com/henrique-coder/perplexity-webui-scraper) by [henrique-coder](https://github.com/henrique-coder).

## Support

If Perplexity Web MCP saves you time or money, you can help cover the AI bills that go into building and testing it. Any support is hugely appreciated. 🙏

<a href="https://buymeacoffee.com/jacobbd"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="42"></a>

## License

MIT
