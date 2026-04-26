# MCP Tools Reference

Complete parameter reference for all MCP tools in the `pplx_*` namespace.

## Quota Cost Summary

| Tool | Cost per Call |
|------|-------------|
| `pplx_smart_query(intent='quick')` | **FREE** (Sonar) |
| `pplx_smart_query(intent='standard')` | 1 Pro Search |
| `pplx_smart_query(intent='detailed')` | 1 Pro Search (premium model) |
| `pplx_smart_query(intent='research')` | 1 Deep Research |
| `pplx_sonar` | **FREE** |
| `pplx_ask`, `pplx_query`, all model-specific tools | 1 Pro Search |
| `pplx_deep_research` | 1 Deep Research (scarce monthly) |
| `pplx_usage`, auth tools | FREE |

## Smart Query (RECOMMENDED DEFAULT)

### pplx_smart_query

Quota-aware routing — checks limits and picks the best model automatically.
**Use this for every query.** Default to `intent='quick'` (FREE) and only
escalate when the query genuinely needs Pro or Research.

```
pplx_smart_query(
    query: str,                    # Required. The question to ask.
    intent: str = "standard",      # quick (FREE), standard (1 Pro), detailed (1 Pro), research (1 Research)
    source_focus: str = "web",     # none, web, academic, social, finance, all
) -> str
```

## Query Tools

### pplx_query

Explicit model selection with thinking toggle. **Costs 1 Pro Search query.**
Prefer `pplx_smart_query` unless you need a specific model.

```
pplx_query(
    query: str,                    # Required. The question to ask.
    model: str = "auto",           # auto, sonar, deep_research, gpt54, gpt55, claude_sonnet,
                                   # claude_opus, gemini_pro, nemotron, kimi_k26
    thinking: bool = False,        # Enable extended thinking (where supported)
    source_focus: str = "web",     # none, web, academic, social, finance, all
) -> str
```

### pplx_ask

Quick Q&A with auto-selected best model. **Costs 1 Pro Search query.**
For free lookups, use `pplx_smart_query(intent='quick')` instead.

```
pplx_ask(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # none, web, academic, social, finance, all
) -> str
```

### pplx_deep_research

In-depth research reports. **Costs 1 Deep Research query** (limited monthly pool,
typically 5-10 total). Only use when the user explicitly requests deep research.

```
pplx_deep_research(
    query: str,                    # Required. The research topic.
    source_focus: str = "web",     # none, web, academic, social, finance, all
) -> str
```

### Model-Specific Tools

All have the same signature and **each costs 1 Pro Search query** except `pplx_sonar` (FREE):

```
pplx_<model>(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # none, web, academic, social, finance, all
) -> str
```

| Tool | Model | Thinking | Cost |
|------|-------|----------|------|
| `pplx_sonar` | Perplexity Sonar | No | **FREE** |
| `pplx_gpt54` | GPT-5.4 (versatile) | No | 1 Pro |
| `pplx_gpt54_thinking` | GPT-5.4 (versatile) | Yes | 1 Pro |
| `pplx_gpt55` | GPT-5.5 (latest, Max tier) | No | 1 Pro |
| `pplx_gpt55_thinking` | GPT-5.5 (latest, Max tier) | Yes | 1 Pro |
| `pplx_claude_sonnet` | Claude 4.6 Sonnet | No | 1 Pro |
| `pplx_claude_sonnet_think` | Claude 4.6 Sonnet | Yes | 1 Pro |
| `pplx_claude_opus` | Claude 4.7 Opus (Max tier) | No | 1 Pro |
| `pplx_claude_opus_think` | Claude 4.7 Opus (Max tier) | Yes | 1 Pro |
| `pplx_gemini_pro_think` | Gemini 3.1 Pro | Yes (always) | 1 Pro |
| `pplx_nemotron_thinking` | Nemotron 3 Super | Yes (always) | 1 Pro |
| `pplx_kimi_k26` | Kimi K2.6 | No | 1 Pro |
| `pplx_kimi_k26_thinking` | Kimi K2.6 | Yes | 1 Pro |

## Usage Tool

### pplx_usage

Check remaining rate limits and quotas. **Call at session start** before making queries.

```
pplx_usage(
    refresh: bool = False,         # Force-refresh from Perplexity (ignores cache)
) -> str
```

Returns a summary including:
- Pro Search remaining (weekly)
- Deep Research remaining (monthly)
- Create Files & Apps remaining (monthly)
- Browser Agent remaining (monthly)
- Subscription tier and account info

## Authentication Tools

### pplx_auth_status

Check current authentication status. Returns email, subscription tier, and remaining quotas if authenticated.

```
pplx_auth_status() -> str
```

### pplx_auth_request_code

Send a 6-digit verification code to the user's Perplexity email. First step of re-authentication.

```
pplx_auth_request_code(
    email: str,                    # Required. Perplexity account email.
) -> str
```

### pplx_auth_complete

Complete authentication with the verification code. Second step of re-authentication.

```
pplx_auth_complete(
    email: str,                    # Required. Same email used in pplx_auth_request_code.
    code: str,                     # Required. 6-digit code from email.
) -> str
```

## Response Format

All query tools return a string containing:
1. The answer text
2. Citations section (if sources were found):
   ```
   Citations:
   [1]: https://example.com/source1
   [2]: https://example.com/source2
   ```

On error, the response starts with "Error" or "LIMIT REACHED" and includes
diagnostic information and recovery instructions.

## MCP Server Configuration

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "pwm-mcp"
    }
  }
}
```

For Claude Code CLI:
```bash
claude mcp add perplexity pwm-mcp
```
