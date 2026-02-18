# MCP Tools Reference

Complete parameter reference for all 17 MCP tools in the `pplx_*` namespace.

## Query Tools

### pplx_query

Flexible model selection with thinking toggle. The most versatile tool.

```
pplx_query(
    query: str,                    # Required. The question to ask.
    model: str = "auto",           # auto, sonar, deep_research, gpt52, claude_sonnet,
                                   # claude_opus, gemini_flash, gemini_pro, grok, kimi
    thinking: bool = False,        # Enable extended thinking (where supported)
    source_focus: str = "web",     # web, academic, social, finance, all
) -> str
```

### pplx_ask

Quick Q&A with auto-selected best model. Simplest tool for general queries.

```
pplx_ask(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # web, academic, social, finance, all
) -> str
```

### pplx_deep_research

In-depth research reports with extensive sources. Uses **monthly** Deep Research quota.

```
pplx_deep_research(
    query: str,                    # Required. The research topic.
    source_focus: str = "web",     # web, academic, social, finance, all
) -> str
```

### Model-Specific Tools

All have the same signature:

```
pplx_<model>(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # web, academic, social, finance, all
) -> str
```

| Tool | Model | Thinking |
|------|-------|----------|
| `pplx_sonar` | Perplexity Sonar | No |
| `pplx_gpt52` | GPT-5.2 | No |
| `pplx_gpt52_thinking` | GPT-5.2 | Yes |
| `pplx_claude_sonnet` | Claude 4.6 Sonnet | No |
| `pplx_claude_sonnet_think` | Claude 4.6 Sonnet | Yes |
| `pplx_gemini_flash` | Gemini 3 Flash | No |
| `pplx_gemini_flash_think` | Gemini 3 Flash | Yes |
| `pplx_gemini_pro_think` | Gemini 3 Pro | Yes (always) |
| `pplx_grok` | Grok 4.1 | No |
| `pplx_grok_thinking` | Grok 4.1 | Yes |
| `pplx_kimi_thinking` | Kimi K2.5 | Yes (always) |

## Usage Tool

### pplx_usage

Check remaining rate limits and quotas. Call before heavy use.

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
