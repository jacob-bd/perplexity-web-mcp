# API Server Reference

The API server (`pwm-api`) provides Anthropic Messages API and OpenAI Chat
Completions API compatible endpoints, allowing Claude Code, OpenAI SDK clients,
and other tools to use Perplexity models as a backend.

## Starting the Server

```bash
pwm-api
```

Default: `http://localhost:8080`

Environment variables:
- `HOST` -- Bind address (default: `0.0.0.0`)
- `PORT` -- Port number (default: `8080`)
- `LOG_LEVEL` -- Logging level (default: `INFO`)
- `DEFAULT_MODEL` -- Default model (default: `auto`)
- `ANTHROPIC_API_KEY` -- Optional API key for auth validation

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

List available models (OpenAI-compatible format).

### POST /v1/messages/count_tokens

Estimate token count for a messages request (Anthropic beta endpoint).

### GET /health

Health check with uptime and session stats.

## Model Name Mapping

The API server accepts many model name variants:

| API Model Name | Maps To |
|---------------|---------|
| `perplexity-auto`, `auto`, `best` | Perplexity Best (auto-select) |
| `perplexity-sonar`, `sonar` | Perplexity Sonar |
| `perplexity-research`, `deep-research` | Deep Research |
| `claude-sonnet-4-6`, `claude-4-6-sonnet`, `claude` | Claude 4.6 Sonnet |
| `claude-opus-4-6`, `claude-4-6-opus`, `opus` | Claude 4.6 Opus |
| `claude-3-5-sonnet` (legacy) | Claude 4.6 Sonnet |
| `claude-3-opus` (legacy) | Claude 4.6 Opus |
| `gpt-5.2`, `gpt-52`, `gpt52` | GPT-5.2 |
| `gemini-3-flash`, `gemini-flash` | Gemini 3 Flash |
| `gemini-3-pro`, `gemini-pro` | Gemini 3 Pro |
| `grok-4.1`, `grok` | Grok 4.1 |
| `kimi-k2.5`, `kimi` | Kimi K2.5 |

Unknown model names fall back to `perplexity-auto`.

## Claude Code Integration

```bash
# 1. Start the API server
pwm-api

# 2. Configure environment
export ANTHROPIC_BASE_URL=http://localhost:8080
export ANTHROPIC_AUTH_TOKEN=perplexity

# 3. Run Claude Code with any model
claude --model gpt-5.2
claude --model claude-sonnet-4-6
claude --model gemini-3-pro
```

## OpenAI SDK Integration

```bash
# 1. Start the API server
pwm-api

# 2. Configure environment
export OPENAI_BASE_URL=http://localhost:8080/v1
export OPENAI_API_KEY=anything
```

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-5.2",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

## Limitations

- **No tool calling**: Claude Code's local tools (Read, Write, Bash, MCPs) do not work when using Perplexity models through the API server. The models can chat but cannot execute local actions.
- **Rate limiting**: Enforces a 5-second minimum between requests.
- **Concurrency**: Serializes Perplexity requests (one at a time) due to curl_cffi limitations.
