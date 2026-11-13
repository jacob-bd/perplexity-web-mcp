# API Server Reference

The API server (`pwm api`) provides Anthropic Messages API and OpenAI Chat
Completions API compatible endpoints, allowing Claude Code, OpenAI SDK clients,
and other tools to use Perplexity models as a backend.

## Starting the Server

```bash
pwm api
```

Default: `http://localhost:8080`

Environment variables:

- `HOST` -- Bind address (default: `127.0.0.1`)
- `PORT` -- Port number (default: `8080`)
- `LOG_LEVEL` -- Logging level (default: `INFO`)
- `DEFAULT_MODEL` -- Default model (default: `auto`)
- `PWM_API_KEY` -- Server API key (required for non-loopback binds)
- `ANTHROPIC_API_KEY` -- Backward-compatible fallback for `PWM_API_KEY`

Non-loopback binds are rejected unless an API key is configured. The built-in
server uses plain HTTP, so remote deployments also need a trusted TLS reverse
proxy and firewall rules. Clients may authenticate with `x-api-key` or
`Authorization: Bearer <secret>`.

When an API key is configured, authentication applies to every API endpoint,
including the `/v1/responses` WebSocket route. Unauthenticated WebSocket
connections are rejected before the server accepts the connection.

## Endpoints

### POST /v1/messages (Anthropic Messages API)

Drop-in replacement for Anthropic's Messages API.

Supports:

- Single and multi-turn conversations
- System prompts
- Streaming (SSE) and non-streaming responses
- Extended thinking via `thinking` parameter

### POST /v1/chat/completions (OpenAI Chat Completions API)

Drop-in replacement for OpenAI's Chat Completions API.

Supports:

- System, user, and assistant messages
- Streaming (SSE) and non-streaming responses
- `reasoning_effort` mapped to thinking models

### GET /v1/models

List available models (OpenAI-compatible format). Includes the curated model IDs plus any current
search identifiers from the cached live catalog (`pwm models --refresh` refreshes that cache).

### POST /v1/messages/count_tokens

Estimate token count for a messages request (Anthropic beta endpoint).

### GET /health

Health check with uptime and session stats.

## Model Name Mapping

The API server accepts many model name variants:

| API Model Name                                     | Maps To                       |
| -------------------------------------------------- | ----------------------------- |
| `perplexity-auto`, `auto`, `best`                  | Perplexity Best (auto-select) |
| `perplexity-sonar`, `sonar`                        | Perplexity Sonar 2            |
| `perplexity-research`, `deep-research`             | Deep Research                 |
| `claude-sonnet-5-5`, `claude-5-5-sonnet`, `claude` | Claude Sonnet 5.5             |
| `claude-opus-5-5`, `claude-5-5-opus`, `opus`       | Claude Opus 5.5 (Max tier)    |
| `claude-fable-5-2`, `claude-5-2-fable`             | Claude Fable 5.2 (Max tier)   |
| `claude-sonnet-5`, `claude-3-5-sonnet` (legacy)    | Claude Sonnet 5.5             |
| `claude-opus-4-8`, `claude-3-opus` (legacy)        | Claude Opus 5.5               |
| `gpt-6.1-sol`, `gpt-6-1-sol`, `gpt61_sol`          | GPT-6.1 Sol (versatile)       |
| `gpt-6-astra`, `gpt6_astra`                        | GPT-6 Astra (Max tier)        |
| `grok-4.7`, `grok-4-7`, `grok47`                   | Grok 4.7                      |
| `gemini-4-carbon`, `gemini4carbon`                 | Gemini 4 Carbon (Max tier)    |
| `gemini-4-hydrogen`, `gemini4hydrogen`             | Gemini 4 Hydrogen             |
| `nemotron-3.5-super-vl`, `nemotron`                | Nemotron 3.5 Super VL         |
| `glm-5.3`, `glm-5-3`, `glm53`, `glm`               | GLM 5.3                       |
| `kimi-k3`                                          | Kimi K3                       |

Unknown model names fall back to `perplexity-auto`.

## Claude Code Integration

```bash
# 1. Start the API server
pwm api

# 2. Configure environment
export ANTHROPIC_BASE_URL=http://localhost:8080
export ANTHROPIC_AUTH_TOKEN=perplexity

# 3. Run Claude Code with any model
claude --model gpt-5.6-terra
claude --model claude-sonnet-5-0
claude --model gemini-3-pro
```

## OpenAI SDK Integration

```bash
# 1. Start the API server
pwm api

# 2. Configure environment
export OPENAI_BASE_URL=http://localhost:8080/v1
export OPENAI_API_KEY=anything
```

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-5.6-terra",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

## Limitations

- **No tool calling**: Claude Code's local tools (Read, Write, Bash, MCPs) do not work when using Perplexity models through the API server. The models can chat but cannot execute local actions.
- **Rate limiting**: Enforces a 5-second minimum between requests.
- **Concurrency**: Serializes Perplexity requests (one at a time) due to curl_cffi limitations.
