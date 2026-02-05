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

### Option A: pipx (Recommended - Isolated Install)

```bash
# Install directly from GitHub (no clone needed)
pipx install "perplexity-web-mcp[all] @ git+https://github.com/jacob-bd/perplexity-web-mcp.git"
```

This installs `pwm-auth`, `pwm-mcp`, and `pwm-api` as global commands.

### Option B: pip (Global or in existing venv)

```bash
pip install "perplexity-web-mcp[all] @ git+https://github.com/jacob-bd/perplexity-web-mcp.git"
```

### Option C: Clone + venv (For development)

```bash
# Clone the repository
git clone https://github.com/jacob-bd/perplexity-web-mcp.git
cd perplexity-web-mcp

# Using uv (fast)
uv venv && source .venv/bin/activate
uv pip install -e ".[all]"

# Or using standard Python
python -m venv .venv && source .venv/bin/activate
pip install -e ".[all]"
```

**Install variants:**
- `[all]` - MCP server + API server (recommended)
- `[mcp]` - MCP server only
- `[api]` - API server only

### Upgrading

To upgrade to the latest version, uninstall first then reinstall:

```bash
pip uninstall perplexity-web-mcp -y
pip install "perplexity-web-mcp[all] @ git+https://github.com/jacob-bd/perplexity-web-mcp.git"
```

**Note**: A simple `pip install --upgrade` may use cached packages. The uninstall/reinstall approach ensures you get the latest code.

After upgrading, restart your MCP client (Claude Code, Cursor, etc.) to reload the server.

## Authentication

```bash
pwm-auth
```

This will:
1. Prompt for your Perplexity email
2. Send a verification code
3. Save your session token to `~/.config/perplexity-web-mcp/token`
4. Display your subscription tier (Free/Pro/Max)

The token is stored globally, so you only need to authenticate once. Both the MCP server and API server will automatically use it.

**Note**: Session tokens typically last ~30 days. Re-run `pwm-auth` if you get 403 errors.

---

## Option 1: MCP Server

Use Perplexity models as MCP tools in Claude Desktop, Cursor, or other MCP clients.

### Setup

After running `pwm-auth`, add the MCP server to your client:

#### Claude Code CLI

```bash
claude mcp add perplexity pwm-mcp
```

Or manually create/edit `~/.mcp.json`:
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp"
    }
  }
}
```

#### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp"
    }
  }
}
```

#### Cursor IDE

Go to **Settings → Features → MCP Servers → Add Server** and add:
```json
{
  "perplexity": {
    "command": "pwm-mcp"
  }
}
```

#### If installed from clone (Option C)

Use the full path to the venv:
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "/path/to/perplexity-web-mcp/.venv/bin/pwm-mcp"
    }
  }
}
```

The token is loaded automatically from `~/.config/perplexity-web-mcp/token` (created by `pwm-auth`).

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

**Authentication Tools** (for AI-assisted re-authentication):

| Tool | Description |
|------|-------------|
| `pplx_auth_status` | Check if authenticated and show subscription tier |
| `pplx_auth_request_code` | Send verification code to email |
| `pplx_auth_complete` | Complete auth with email and 6-digit code |

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

## Observability & Monitoring

The API server includes Prometheus metrics for monitoring tool calling performance.

### Metrics Endpoint

Access metrics at `GET /metrics` in Prometheus exposition format:

```bash
curl http://localhost:8080/metrics
```

### Available Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `tool_parse_attempts_total` | Counter | strategy, success | Total parsing attempts by strategy and outcome |
| `tool_parse_confidence` | Histogram | strategy | Distribution of confidence scores by strategy |
| `tool_calls_detected_total` | Counter | strategy, tool_name | Individual tool calls detected |
| `tool_parse_duration_seconds` | Histogram | strategy | Parsing duration by strategy |

### Querying Metrics

**Success rate for Python AST strategy:**
```promql
rate(tool_parse_attempts_total{strategy="python_ast",success="true"}[5m])
/
rate(tool_parse_attempts_total{strategy="python_ast"}[5m])
```

**Average confidence by strategy:**
```promql
rate(tool_parse_confidence_sum[5m]) / rate(tool_parse_confidence_count[5m])
```

**Most used tools:**
```promql
topk(5, sum by (tool_name) (tool_calls_detected_total))
```

### Graceful Degradation

The system maintains API compatibility even when tool parsing fails:

- **Parse failures** → Returns text-only response (stop_reason: end_turn)
- **Low confidence** → Graceful fallback (below 0.7 threshold)
- **No tools detected** → Continues as conversational response

Error details are logged internally while users receive clear, actionable error messages.

### Integration with Grafana

1. Configure Prometheus to scrape `/metrics` endpoint
2. Import dashboard using queries above
3. Set alerts on success rate drops or high parse duration

Recommended alert: `rate(tool_parse_attempts_total{success="false"}[5m]) > 0.5` (>50% failure rate)

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
