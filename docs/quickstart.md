# Quick Start Guide

Get up and running with Perplexity Web MCP in under 5 minutes.

## Prerequisites

- **Python 3.10–3.13**
- **Perplexity account** — Free accounts can use supported basic features; Pro or Max is required for premium models such as GPT-5.6 Terra, Claude Sonnet 5, Gemini 3.1 Pro, and Nemotron 3 Ultra

## 1. Install

Pick your preferred installer:

```bash
# uv (recommended)
uv tool install perplexity-web-mcp-cli

# pipx
pipx install perplexity-web-mcp-cli

# pip
pip install perplexity-web-mcp-cli
```

Verify the installation:

```bash
pwm --version
```

## 2. Authenticate

Log in with your Perplexity account:

```bash
pwm login
```

The CLI sends a verification code to your Perplexity email and stores the resulting session token locally at `~/.config/perplexity-web-mcp/token`. If your account uses TOTP, it also prompts for the code from your authenticator app.

Check it worked:

```bash
pwm login --check
```

> **Tokens last about 30 days.** If you get a 403 error later, just run `pwm login` again.

### Non-interactive login (for servers or CI)

```bash
pwm login --email you@example.com        # sends a verification code
pwm login --email you@example.com --code 123456   # completes the login
pwm login --email you@example.com --code 123456 --totp-code 654321  # account with TOTP enabled
```

## 3. Your First Query

Ask Perplexity anything from the terminal:

```bash
pwm ask "What is quantum computing?"
```

The CLI auto-selects the best model based on your quota. You can also pick a specific model:

```bash
pwm ask "Compare React and Vue" -m gpt56_terra
pwm ask "Explain attention" -m claude_sonnet --thinking
```

### Deep Research

For comprehensive reports using Perplexity's Deep Research mode:

```bash
pwm research "agentic AI trends 2026"
```

> Deep Research has a limited monthly quota. Check your usage with `pwm usage`.

### Model Council

Get perspectives from multiple models at once:

```bash
pwm council "Compare Rust and Go for backend development"
```

Each model costs 1 Pro Search. The default council uses GPT-5.6 Terra, Claude Sonnet 5, and Gemini 3.1 Pro, followed by Sonar 2 synthesis.

## 4. Check Your Quotas

See how many Pro Search and Deep Research queries you have left:

```bash
pwm usage
```

## 5. Set Up MCP for AI Tools

Connect Perplexity to your AI coding tools (Claude Code, Cursor, Gemini CLI, etc.):

```bash
# Interactive setup — detects all installed tools
pwm setup add all

# Or set up individual tools
pwm setup add claude-code
pwm setup add cursor
pwm setup add gemini
```

After setup, restart your AI tool. You'll have access to `pplx_*` MCP tools.

### Shared MCP daemon (optional)

Use a shared local SSE daemon when multiple MCP clients or Codex sessions should
connect to one MCP process:

```bash
pwm serve-mcp                         # Start SSE on 127.0.0.1:8000
pwm setup add codex --sse             # Configure Codex for the SSE endpoint
pwm serve-mcp --status                # Check daemon status
pwm serve-mcp --stop                  # Stop the daemon
```

The HTTP transports bind to loopback by default. Keep the daemon on a loopback
address unless you put an authenticated reverse proxy in front of it.

### Install the Agent Skill

The Agent Skill gives your AI tool built-in knowledge about how to use Perplexity:

```bash
pwm skill install all          # all detected tools
pwm skill install claude-code  # or a specific tool
```

## 6. Run Diagnostics

If something isn't working, the doctor command checks everything:

```bash
pwm doctor
```

This verifies your installation, authentication, MCP config, skill status, rate limits, and token security.

### Blank or Truncated Answers

Perplexity can return answer chunks without the older `text` field. If `pwm ask` returns `No answer received` or only part of the answer, upgrade the CLI:

```bash
uv tool upgrade perplexity-web-mcp-cli
pwm --version
```

## Available Models

| Name             | Provider   | Thinking  | Tier          |
| ---------------- | ---------- | --------- | ------------- |
| `auto`           | Perplexity | No        | Account quota |
| `sonar`          | Perplexity | No        | Account quota |
| `deep_research`  | Perplexity | No        | Monthly quota |
| `gpt56_terra`    | OpenAI     | Toggle    | Pro           |
| `gpt56_sol`      | OpenAI     | Toggle    | Max           |
| `grok45`         | xAI        | Toggle    | Pro           |
| `claude_sonnet`  | Anthropic  | Toggle    | Pro           |
| `claude_opus`    | Anthropic  | Toggle    | Max           |
| `gemini_pro`     | Google     | Always on | Pro           |
| `nemotron`       | NVIDIA     | Always on | Pro           |
| `glm52`          | Z.ai       | Always on | Pro           |
| `kimi_k26`       | Moonshot   | Toggle    | Pro           |

## Source Focus

Control where Perplexity searches:

```bash
pwm ask "review this code" -s none         # No web search, model only
pwm ask "AI news" -s web                   # General web (default)
pwm ask "transformer papers" -s academic   # Academic papers
pwm ask "best keyboard" -s social          # Reddit, forums
pwm ask "AAPL revenue" -s finance          # SEC filings
```

## Thread Library (FREE — no quota)

Browse your past Perplexity conversations, search your history, and export everything
to JSON. **No Pro quota is consumed** by any thread library operation.

```bash
pwm threads                         # list recent conversations
pwm threads --search "quantum"      # search before spending quota
pwm export                          # export full history to JSON
```

For AI agents via MCP:
```
pplx_list_threads()                          # browse history
pplx_list_threads(search_term="topic")       # check if already researched
pplx_get_thread("slug-uuid")                # read full conversation
```

See the full [Thread Library guide](superpowers/thread-library.md) for resumption patterns and export details.

## What's Next?

- Run `pwm --help` — see all available commands
- Run `pwm --ai` — comprehensive reference doc for AI agents
- Read the [README](../README.md) — full documentation
