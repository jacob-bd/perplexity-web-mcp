# Perplexity Web MCP

MCP server and Anthropic/OpenAI API-compatible interface for Perplexity AI's web interface.

Use your Perplexity Pro/Max subscription to access premium models (GPT-5.2, Claude 4.5, Gemini 3, Grok 4.1, etc.) through MCP tools or as an API endpoint for Claude Code.

## Features

- **MCP Server**: Use Perplexity models as MCP tools with citations
- **Anthropic API**: Drop-in replacement for Anthropic's Messages API (works with Claude Code)
- **OpenAI API**: Compatible with OpenAI Chat Completions API
- **Multiple Models**: GPT-5.2, Claude 4.5 Sonnet/Opus, Gemini 3, Grok 4.1, Kimi K2.5
- **Thinking Mode**: Extended thinking support for all compatible models
- **Deep Research**: Full support for Perplexity's Deep Research mode

## Installation

```bash
# Clone the repository
git clone https://github.com/jbendavi/perplexity-web-mcp.git
cd perplexity-web-mcp

# Create virtual environment and install
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install with MCP and API support
uv pip install -e ".[all]"

# Or install specific features:
# uv pip install -e ".[mcp]"  # MCP server only
# uv pip install -e ".[api]"  # API server only
```

## Authentication

```bash
pwm-auth
```

This will:
1. Prompt for your Perplexity email
2. Send a verification code
3. Save your session token to `.env`
4. Display your subscription tier (Free/Pro/Max)

**Note**: Session tokens typically last ~30 days (NextAuth default). Re-run `pwm-auth` if you get authentication errors.

---

## Option 1: MCP Server

Use Perplexity models as MCP tools in Claude Desktop, Cursor, or other MCP clients.

### Setup

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp",
      "env": {
        "PERPLEXITY_SESSION_TOKEN": "your_token_here"
      }
    }
  }
}
```

Or if you have the token in `.env`:
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "/path/to/perplexity-web-mcp/.venv/bin/pwm-mcp"
    }
  }
}
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `pplx_query` | Flexible tool with model selection and thinking toggle |
| `pplx_ask` | Quick Q&A (auto-selects best model) |
| `pplx_deep_research` | In-depth reports with sources |
| `pplx_sonar` | Perplexity's latest model |
| `pplx_gpt52` | GPT-5.2 |
| `pplx_gpt52_thinking` | GPT-5.2 with extended thinking |
| `pplx_claude_sonnet` | Claude 4.5 Sonnet |
| `pplx_claude_sonnet_think` | Claude 4.5 Sonnet with extended thinking |
| `pplx_gemini_flash` | Gemini 3 Flash |
| `pplx_gemini_flash_think` | Gemini 3 Flash with extended thinking |
| `pplx_gemini_pro_think` | Gemini 3 Pro (thinking always on) |
| `pplx_grok` | Grok 4.1 |
| `pplx_grok_thinking` | Grok 4.1 with extended thinking |
| `pplx_kimi_thinking` | Kimi K2.5 (thinking always on) |

**Source Focus Options**: All tools support `source_focus` parameter:
- `web` (default) - General web search
- `academic` - Academic/scholarly sources
- `social` - Social media sources
- `finance` - Financial sources
- `all` - All source types

**Citations**: MCP responses include citations with source URLs at the end of each response.

---

## Option 2: Anthropic API Server (Claude Code)

Use Perplexity models directly in Claude Code by running the API compatibility server.

### Setup

1. Start the API server:
   ```bash
   pwm-api
   ```

2. Configure Claude Code environment:
   ```bash
   export ANTHROPIC_BASE_URL=http://localhost:8080
   export ANTHROPIC_AUTH_TOKEN=perplexity
   ```

3. Run Claude Code with a Perplexity model:
   ```bash
   claude --model gpt-5.2
   claude --model claude-sonnet-4-5
   claude --model gemini-3-pro
   ```

### Supported Model Names

Use these model names with Claude Code or any Anthropic API client:

| Model Name | Perplexity Model | Thinking |
|------------|------------------|----------|
| `perplexity-auto` / `auto` | Best (auto-select) | No |
| `perplexity-sonar` / `sonar` | Sonar | No |
| `perplexity-research` / `deep-research` | Deep Research | No |
| `gpt-5.2` / `gpt-52` | GPT-5.2 | Toggle |
| `claude-sonnet-4-5` / `claude-4-5-sonnet` | Claude 4.5 Sonnet | Toggle |
| `claude-opus-4-5` / `claude-4-5-opus` | Claude 4.5 Opus (Max tier) | Toggle |
| `gemini-3-flash` / `gemini-flash` | Gemini 3 Flash | Toggle |
| `gemini-3-pro` / `gemini-pro` | Gemini 3 Pro | Always On |
| `grok-4.1` / `grok` | Grok 4.1 | Toggle |
| `kimi-k2.5` / `kimi` | Kimi K2.5 | Always On |

**Legacy Claude Code aliases** (for compatibility):
- `claude-3-5-sonnet` → Claude 4.5 Sonnet
- `claude-3-opus` → Claude 4.5 Opus

**Thinking Mode**: Models with "Toggle" support thinking when enabled via the `thinking` parameter. Models with "Always On" have thinking enabled by default.

### Features

- **Citations included**: Responses include source URLs at the end (same format as MCP mode)
- **Streaming support**: Real-time streaming responses with citations appended at the end

### Limitations

- **No tool calling**: Claude Code's local tools (Read, Write, Bash, MCPs) won't work when using Perplexity models. The models can chat but can't execute local actions.

---

## Option 3: OpenAI API Server

The API server also supports OpenAI's Chat Completions format.

```bash
# Start server
pwm-api

# Use with OpenAI SDK
export OPENAI_BASE_URL=http://localhost:8080/v1
export OPENAI_API_KEY=anything
```

---

## Python API

```python
from perplexity_web_mcp import Perplexity, ConversationConfig, Models

client = Perplexity(session_token="your_token")
conversation = client.create_conversation(
    ConversationConfig(model=Models.CLAUDE_45_SONNET)
)

# First query
conversation.ask("What is quantum computing?")
print(conversation.answer)

# Access citations
for result in conversation.search_results:
    print(f"Source: {result.url}")

# Follow-up (context preserved)
conversation.ask("Explain it simpler")
print(conversation.answer)
```

### Available Models

```python
from perplexity_web_mcp import Models

Models.BEST                      # Auto-select best model
Models.SONAR                     # Perplexity Sonar
Models.DEEP_RESEARCH             # Deep Research mode
Models.GPT_52                    # GPT-5.2
Models.GPT_52_THINKING           # GPT-5.2 with thinking
Models.CLAUDE_45_SONNET          # Claude 4.5 Sonnet
Models.CLAUDE_45_SONNET_THINKING # Claude 4.5 Sonnet with thinking
Models.CLAUDE_45_OPUS            # Claude 4.5 Opus (Max tier)
Models.CLAUDE_45_OPUS_THINKING   # Claude 4.5 Opus with thinking
Models.GEMINI_3_FLASH            # Gemini 3 Flash
Models.GEMINI_3_FLASH_THINKING   # Gemini 3 Flash with thinking
Models.GEMINI_3_PRO_THINKING     # Gemini 3 Pro (thinking only)
Models.GROK_41                   # Grok 4.1
Models.GROK_41_THINKING          # Grok 4.1 with thinking
Models.KIMI_K25_THINKING         # Kimi K2.5 (thinking only)
```

---

## Subscription Tiers

| Tier | Cost | Access |
|------|------|--------|
| Free | $0 | All models (limited queries) |
| Pro | $20/mo | Extended quotas |
| Max | $200/mo | Unlimited + Claude 4.5 Opus |

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `pwm-auth` | Authenticate and save session token |
| `pwm-auth --email EMAIL` | Request verification code (non-interactive) |
| `pwm-auth --email EMAIL --code CODE` | Complete auth with code (non-interactive) |
| `pwm-mcp` | Start MCP server |
| `pwm-api` | Start Anthropic/OpenAI API server |

---

## Troubleshooting

### Authentication Errors (403)

**Error**: `Access forbidden (403). Session token invalid or expired.`

Session tokens typically last ~30 days. When expired, re-authenticate:

**Interactive (human)**:
```bash
pwm-auth
```

**Non-interactive (AI agents)**:
```bash
# Step 1: Request verification code
pwm-auth --email your@email.com

# Step 2: Check email for 6-digit code, then complete auth
pwm-auth --email your@email.com --code 123456
```

### AI-Assisted Token Recovery

For AI agents with email access (like OpenClaw), the recovery flow is:

1. **Detect 403 error** in response
2. **Run**: `pwm-auth --email YOUR_PERPLEXITY_EMAIL`
3. **Check email** for 6-digit verification code from Perplexity
4. **Run**: `pwm-auth --email YOUR_PERPLEXITY_EMAIL --code XXXXXX`
5. **Restart** the `pwm-api` server to load the new token

The token is automatically saved to `.env` file. Output includes `TOKEN=...` for capture if needed.

### Rate Limiting
The API server enforces a 5-second minimum between requests to respect Perplexity's rate limits.

### Claude Code Hangs
If Claude Code hangs with "zero tokens sent", restart the `pwm-api` server.

---

## Credits

Based on [perplexity-ai](https://github.com/helallao/perplexity-ai) by helallao.

## License

MIT
