# MCP Tools Reference

Complete parameter reference for all MCP tools in the `pplx_*` namespace.

## Quota Cost Summary

| Tool                                               | Cost per Call                    |
| -------------------------------------------------- | -------------------------------- |
| `pplx_list_threads`                                | **FREE** (read-only)             |
| `pplx_get_thread`                                  | **FREE** (read-only)             |
| `pplx_smart_query(intent='quick')`                 | 1 Pro Search (Sonar 2)           |
| `pplx_smart_query(intent='standard')`              | 1 Pro Search                     |
| `pplx_smart_query(intent='detailed')`              | 1 Pro Search (premium model)     |
| `pplx_smart_query(intent='research')`              | 1 Deep Research                  |
| `pplx_sonar`                                       | 1 Pro Search                     |
| `pplx_ask`, `pplx_query`, all model-specific tools | 1 Pro Search                     |
| `pplx_deep_research`                               | 1 Deep Research (scarce monthly) |
| `pplx_usage`, `pplx_connectors`, auth tools         | FREE                             |

## Thread Library (FREE — no quota cost)

### pplx_list_threads

Browse your Perplexity conversation history. **Zero quota cost.** Call freely.

Before spending a Pro Search query, search your thread history — you may have
already researched the topic.

```
pplx_list_threads(
    limit: int = 20,       # Max threads to return (default 20, max 100)
    offset: int = 0,       # Pagination offset (skip this many, e.g. 20 for page 2)
    search_term: str = "", # Server-side keyword filter (title / content)
) -> str
```

Each entry in the response shows: `slug`, `title`, model used, date, turn count,
and an answer preview.

**Usage patterns:**

```
pplx_list_threads()                          # recent 20 threads
pplx_list_threads(limit=50)                  # get 50 threads
pplx_list_threads(search_term="quantum")     # filter by keyword
pplx_list_threads(offset=20)                 # page 2
```

### pplx_get_thread

Fetch the full conversation history for any past thread. **Zero quota cost.**

```
pplx_get_thread(
    slug: str,             # Required. Thread UUID. Get from pplx_list_threads.
) -> str
```

Returns the complete Markdown-formatted thread: every Q&A turn, sources with
links, and related queries suggested by Perplexity.

**Resume pattern — continue any past conversation:**

```
# Step 1: Find the thread and get its slug
pplx_list_threads(search_term="quantum computing")
# → 1. [f1f6562c-91be-47e9-9d1f-89ed902fdf8e] Quantum computing overview  (sonar)  · 2026-05-14

# Step 2: Read its history for context (optional)
pplx_get_thread("f1f6562c-91be-47e9-9d1f-89ed902fdf8e")

# Step 3: Continue the conversation — zero new Pro query for steps 1 & 2
pplx_smart_query(
    "What are the latest advances in error correction?",
    conversation_id="f1f6562c-91be-47e9-9d1f-89ed902fdf8e"
)
```

### MCP Resources

If your MCP client supports Resources, the thread library is also available as:

```
perplexity://library                  # Most recent 50 threads (formatted list)
perplexity://thread/<slug>            # Full conversation history for a specific thread
```


## Smart Query (RECOMMENDED DEFAULT)

## Source Focus and Connectors

All query tools accept built-in source focus values: `none`, `web`, `academic`, `social`, `finance`, and `all`.

Accounts with Perplexity connectors may also expose connector source IDs such as `pitchbook_mcp_cashmere` or `cbinsights_mcp_cashmere`. Call `pplx_connectors()` first, then pass the returned ID as `source_focus`.

Do not guess connector IDs. Unknown source values fail instead of falling back to web search.

Connector access inherits the authenticated Perplexity account's permissions and may expose private data to the calling agent. Set `PWM_CONNECTORS_ENABLED=0` to disable all connector queries, or use `PWM_CONNECTOR_ALLOWLIST` with a comma-separated list of approved connector IDs. When unset, reported connectors remain available for backward compatibility.

Local connector policy also applies to direct Python API payloads, not only CLI and MCP source routing.

### pplx_smart_query

Quota-aware routing — checks limits and picks the best model automatically.
**Use this for every query.** Default to `intent='quick'` (Sonar 2, 1 Pro Search)
and only escalate when the query genuinely needs a premium model or Research.

```
pplx_smart_query(
    query: str,                    # Required. The question to ask.
    intent: str = "standard",      # quick (1 Pro, Sonar 2), standard (1 Pro), detailed (1 Pro), research (1 Research)
    source_focus: str = "web",     # none, web, academic, social, finance, all, or connector ID from pplx_connectors()
    conversation_id: str = None,   # Optional. Pass ID from previous turn to persist context.
) -> str
```

## Query Tools

### pplx_query

Explicit model selection with thinking toggle. **Costs 1 Pro Search query.**
Prefer `pplx_smart_query` unless you need a specific model.

```
pplx_query(
    query: str,                    # Required. The question to ask.
    model: str = "auto",           # auto, sonar, deep_research, gpt56_terra, gpt56_sol, grok45, claude_sonnet,
                                   # claude_opus, gemini_pro, nemotron, glm52, kimi_k26
    thinking: bool = False,        # Enable extended thinking (where supported)
    source_focus: str = "web",     # none, web, academic, social, finance, all, or connector ID from pplx_connectors()
    conversation_id: str = None,   # Optional. Pass ID from previous turn to persist context.
) -> str
```

### pplx_ask

Quick Q&A with auto-selected best model. **Costs 1 Pro Search query.**
For simple lookups, prefer `pplx_smart_query(intent='quick')` instead.

```
pplx_ask(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # none, web, academic, social, finance, all, or connector ID from pplx_connectors()
    conversation_id: str = None,   # Optional. Pass ID from previous turn to persist context.
) -> str
```

### pplx_deep_research

In-depth research reports. **Costs 1 Deep Research query** (limited monthly pool,
typically 5-10 total). Only use when the user explicitly requests deep research.

```
pplx_deep_research(
    query: str,                    # Required. The research topic.
    source_focus: str = "web",     # none, web, academic, social, finance, all, or connector ID from pplx_connectors()
) -> str
```

### Model-Specific Tools

All have the same signature and **each costs 1 Pro Search query**:

```
pplx_<model>(
    query: str,                    # Required. The question to ask.
    source_focus: str = "web",     # none, web, academic, social, finance, all, or connector ID from pplx_connectors()
    conversation_id: str = None,   # Optional. Pass ID from previous turn to persist context.
) -> str
```

| Tool                       | Model                      | Thinking     | Cost  |
| -------------------------- | -------------------------- | ------------ | ----- |
| `pplx_sonar`               | Perplexity Sonar 2         | No           | 1 Pro |
| `pplx_gpt56_terra`               | GPT-5.6 Terra (versatile)        | No           | 1 Pro |
| `pplx_gpt56_terra_thinking`      | GPT-5.6 Terra (versatile)        | Yes          | 1 Pro |
| `pplx_gpt56_sol`               | GPT-5.6 Sol (latest, Max tier) | No           | 1 Pro |
| `pplx_gpt56_sol_thinking`      | GPT-5.6 Sol (latest, Max tier) | Yes          | 1 Pro |
| `pplx_grok45`                  | Grok 4.5                      | No           | 1 Pro |
| `pplx_grok45_thinking`         | Grok 4.5                      | Yes          | 1 Pro |
| `pplx_claude_sonnet`       | Claude Sonnet 5          | No           | 1 Pro |
| `pplx_claude_sonnet_think` | Claude Sonnet 5          | Yes          | 1 Pro |
| `pplx_claude_opus`         | Claude 4.8 Opus (Max tier) | No           | 1 Pro |
| `pplx_claude_opus_think`   | Claude 4.8 Opus (Max tier) | Yes          | 1 Pro |
| `pplx_gemini_pro_think`    | Gemini 3.1 Pro             | Yes (always) | 1 Pro |
| `pplx_nemotron_thinking`   | Nemotron 3 Ultra           | Yes (always) | 1 Pro |
| `pplx_glm52`               | GLM 5.2                    | Yes (always) | 1 Pro |
| `pplx_kimi_k26`            | Kimi K2.6                  | No           | 1 Pro |
| `pplx_kimi_k26_thinking`   | Kimi K2.6                  | Yes          | 1 Pro |

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
- Subscription tier, billing detail, and account info

### pplx_connectors

List account connector source IDs that can be passed to `source_focus`.

```
pplx_connectors(
    refresh: bool = False,         # Force-refresh source limits before listing
) -> str
```

Use this before connector-backed queries:

```
pplx_connectors()
pplx_smart_query(
    query="recent funding for Stripe",
    intent="standard",
    source_focus="pitchbook_mcp_cashmere",
)
```

Connector access depends on the authenticated Perplexity account. Free accounts may show no connector IDs.

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
    code: str = "",                # 6-digit code from email.
    totp_code: str | None = None,  # Authenticator code when TOTP is enabled.
) -> str
```

If the first completion call returns `TOTP_REQUIRED`, call the tool again with `email` and `totp_code`.

## Response Format

All query tools return a string containing:

1. The answer text
2. Citations section (if sources were found):
   ```
   Citations:
   [1]: https://example.com/source1
   [2]: https://example.com/source2
   ```
3. A quota footer and a `Conversation ID` footer:

   ```
   [Quota] Sonar 2 query completed (sonar) | Pro: 190 left | Research: 17 left

   [Conversation ID: 9c19882d-7481-4eef-b5df-beb4238003c7]
   ```

### Multi-Turn Conversations (Context Retention)

The `[Conversation ID: <uuid>]` footer allows AI agents to persist context across multiple turns.
When you receive this ID, extract it and pass it to the `conversation_id` parameter of your next query to continue the same thread. State is retained in memory by the MCP server for 1 hour.

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
