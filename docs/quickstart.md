# Quick Start Guide

Get up and running with Perplexity Web MCP in under 5 minutes.

## Prerequisites

- **Python 3.10–3.13**
- **Perplexity Pro or Max subscription** — required for premium models (GPT-5.4, Claude 4.6, Gemini 3.1 Pro, Nemotron)

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

This opens your browser, you sign in, and the CLI stores your session token locally at `~/.config/perplexity-web-mcp/token`.

Check it worked:

```bash
pwm login --check
```

> **Tokens last about 30 days.** If you get a 403 error later, just run `pwm login` again.

### Non-interactive login (for servers or CI)

```bash
pwm login --email you@example.com        # sends a verification code
pwm login --email you@example.com --code 123456   # completes the login
```

## 3. Your First Query

Ask Perplexity anything from the terminal:

```bash
pwm ask "What is quantum computing?"
```

The CLI auto-selects the best model based on your quota. You can also pick a specific model:

```bash
pwm ask "Compare React and Vue" -m gpt54
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

Each model costs 1 Pro Search. Default: 3 models (GPT-5.4, Claude Opus, Gemini Pro).

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

## Available Models

| Name | Provider | Thinking | Tier |
|------|----------|----------|------|
| `auto` / `sonar` | Perplexity | No | Free |
| `deep_research` | Perplexity | No | Monthly quota |
| `gpt54` | OpenAI | Toggle | Pro |
| `claude_sonnet` | Anthropic | Toggle | Pro |
| `claude_opus` | Anthropic | Toggle | Max |
| `gemini_pro` | Google | Always on | Pro |
| `nemotron` | NVIDIA | Always on | Pro |

## Source Focus

Control where Perplexity searches:

```bash
pwm ask "review this code" -s none         # No web search, model only
pwm ask "AI news" -s web                   # General web (default)
pwm ask "transformer papers" -s academic   # Academic papers
pwm ask "best keyboard" -s social          # Reddit, forums
pwm ask "AAPL revenue" -s finance          # SEC filings
```

## What's Next?

- Run `pwm --help` — see all available commands
- Run `pwm --ai` — comprehensive reference doc for AI agents
- Read the [README](../README.md) — full documentation
