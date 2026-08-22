---
name: perplexity-web-mcp
description: 'Search the web and query AI models via Perplexity AI using perplexity-web-mcp-cli. Supports CLI commands (pwm ask, pwm research), MCP tools (pplx_*), and Anthropic/OpenAI-compatible API server. Use when the user mentions "perplexity", "pplx", "pwm", "web search with AI", "deep research", "search the internet", or wants to query premium models like GPT-5.6 Terra, GPT-5.6 Sol, Grok, Claude, Gemini, GLM, or Nemotron through Perplexity''s web interface.'
metadata:
  version: "0.14.11"
  author: "Jacob BD"

---

# Perplexity Web MCP

Search the web and query premium AI models through Perplexity AI.

## Quick Reference

Run `pwm --ai` for comprehensive AI-optimized documentation covering all
commands, models, MCP tools, auth flows, and error recovery.

```bash
pwm --ai                # Full AI reference (RECOMMENDED first step)
pwm --help              # CLI help
pwm login --check       # Check auth status
```

## Critical Rules

1. **Authenticate first**: Run `pwm login` before any queries
2. **Tokens last ~30 days**: Re-run `pwm login` on 403 errors
3. **Check quota before your first query every session** (see protocol below)
4. **Default to quick/Sonar 2** — only escalate when the query genuinely needs Pro
5. **Never use Deep Research autonomously** — only when the user explicitly asks

## Quota-Aware Usage Protocol (MANDATORY)

Perplexity has hard quota limits. Wasting Pro queries on simple lookups exhausts
the weekly pool fast, leaving nothing for questions that actually need it.

### Cost Model

| Tier                                                                               | What It Costs                                        | Resets  | Typical Pool       |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- | ------------------ |
| **Sonar 2 / quick**                                                                | 1 Pro Search                                         | Weekly  | ~300/week          |
| **Pro Search** (standard/detailed, pplx_ask, pplx_query, all model-specific tools) | 1 Pro Search query                                   | Weekly  | ~300/week          |
| **Council** (pplx_council, pwm council)                                            | N+1 Pro Searches (1 per model + 1 Sonar 2 synthesis) | Weekly  | ~300/week (shared) |
| **Deep Research** (pplx_deep_research, research intent)                            | 1 Deep Research query                                | Monthly | ~5-10/month        |

### Before Every Session

1. **Check quota first**: Call `pplx_usage()` (MCP) or `pwm usage` (CLI) before your first query.
2. Review the remaining Pro and Research counts and the `Subscription` line.
3. If Subscription is Pro, exclude Max-only models (`gpt56_sol`, `claude_opus`) from model selection and councils.
4. If Pro < 20% remaining, restrict yourself to quick/Sonar 2 for everything except user-requested Pro queries.

### Before Every Query: Choose the Lowest Sufficient Tier

Ask yourself: **"Can Sonar 2 answer this?"** If yes, use `quick`. Only escalate if the answer is no.

**Use quick (Sonar 2 — 1 Pro Search, cheapest option)** when the query is:

- A factual lookup: "What is the capital of France?"
- A definition: "What does CORS stand for?"
- A simple current-event check: "Who won the Super Bowl?"
- A quick status/version check: "What is the latest version of React?"
- A straightforward how-to that's well-documented: "How do I create a venv in Python?"
- A single-fact retrieval: "What is the population of Tokyo?"
- A simple translation or conversion: "How many meters in a mile?"

**Use standard (1 Pro Search)** when the query:

- Needs synthesis across multiple web sources: "Compare Next.js and Remix for SSR"
- Requires very current data from multiple sources: "What happened in AI this week?"
- Asks for a how-to with nuance: "Best practices for PostgreSQL indexing in 2026"
- Needs cited sources for credibility: "What are the side effects of metformin?"
- Involves a real comparison or tradeoff analysis

**Use detailed (1 Pro Search, premium model)** when the query:

- Requires complex multi-step reasoning: "Analyze the pros/cons of microservices vs monolith for a 10-person startup"
- Demands deep technical analysis: "Explain the differences between Raft and Paxos consensus algorithms"
- Needs authoritative synthesis with reasoning: "What are the economic implications of the new EU AI Act?"

**Use research (1 Deep Research — scarce)** ONLY when:

- The user explicitly asks for "deep research", "comprehensive report", or similar
- Never use autonomously — always ask the user first
- Falls back to premium Pro Search if research quota is exhausted

**Use council (N+1 Pro Searches — expensive)** when:

- The user needs high-confidence answers validated across multiple AI providers
- Important decisions, fact-checking, or complex analysis
- BEFORE calling: ASK the user which models and how many (each = 1 Pro Search)
- Available models: sonar, gpt56_terra, gpt56_sol, grok45, claude_sonnet, claude_opus, gemini_pro, nemotron, glm52, kimi_k26
- Max-only models: gpt56_sol, claude_opus. Do not use these for Pro subscriptions.
- Default: 3 Pro-compatible models (GPT-5.6 Terra, Claude Sonnet, Gemini Pro) + synthesis = 4 Pro Searches

### Decision Flowchart

```
You want to query Perplexity...
│
├─ Is this a simple fact, definition, or well-known how-to?
│  └─ YES → intent='quick' (Sonar 2, 1 Pro Search)
│
├─ Does it need multiple current web sources or cited synthesis?
│  └─ YES → intent='standard' (1 Pro Search)
│
├─ Does it need deep reasoning, complex analysis, or premium model quality?
│  └─ YES → intent='detailed' (1 Pro Search, premium model)
│
├─ Does the user need high-confidence answers from multiple AI providers?
│  └─ YES → pplx_council / pwm council (N+1 Pro Searches — ASK USER which models first!)
│
├─ Did the user explicitly request deep research / comprehensive report?
│  └─ YES → intent='research' (1 Deep Research)
│
└─ When in doubt → intent='quick' (Sonar 2, upgrade later if insufficient)
```

### Smart Routing

The tool includes quota-aware routing. Instead of choosing a model manually,
use the smart query interface and let it pick the best option:

```
MCP:  pplx_smart_query(query, intent="quick")       # default for most lookups
MCP:  pplx_smart_query(query, intent="standard")    # when quick isn't enough
CLI:  pwm ask "query"                                # auto routes via smart logic
CLI:  pwm ask "query" --intent quick                 # explicit intent hint
```

### Automatic Quota Protection

The smart router automatically protects you:

- **Healthy quota**: Uses the ideal model for your intent
- **Low quota (<20% pro remaining)**: Response footer warns you to conserve
- **Critical quota (<10% pro remaining)**: Downgrades detailed→auto to conserve
- **Exhausted quota**: Falls back to Sonar 2 for everything except research (Sonar 2 is forced to concise mode to ensure grounded responses using search results)
- **Research exhausted**: Falls back to premium Pro Search
- Response metadata shows what model was used, why, and remaining quota

### When to Use Explicit Models Instead

Only use model-specific tools (pplx_gpt56_terra, pplx_claude_sonnet, etc.) when:

- The user explicitly requests a specific model
- You're comparing outputs across models
- The smart router's choice isn't working for the specific use case

Each explicit model call costs 1 Pro Search query — there is no free tier for these.

## Tool Detection

Check which interface is available before proceeding:

```
has_mcp = check for tools starting with "pplx_"
has_cli = can run "pwm" commands via shell

if has_mcp and has_cli:
    Ask user which they prefer, or use MCP for programmatic access
elif has_mcp:
    Use pplx_* MCP tools directly
else:
    Use pwm CLI via shell
```

## Workflow Decision Tree

```
User wants to...
|
+-- Search the web / ask a question (RECOMMENDED: smart routing)
|   +-- CLI:  pwm ask "query"                    # smart routing (default)
|   +-- MCP:  pplx_smart_query(query)            # smart routing (default)
|   +-- Explicit model: pwm ask "query" -m gpt56_terra  or  pplx_query(query, model="gpt56_terra")
|
+-- Browse past conversations (FREE, no quota)
|   +-- CLI:  pwm threads                        # list recent threads
|   +-- CLI:  pwm threads --search "topic"       # search threads
|   +-- MCP:  pplx_list_threads()               # list threads
|   +-- MCP:  pplx_list_threads(search_term="X") # search threads
|
+-- Read or resume a past conversation (FREE, no quota)
|   +-- CLI:  pwm threads --search "topic"       # find slug
|   +-- MCP:  pplx_get_thread(slug)             # read full history
|   +-- MCP:  pplx_smart_query(query, conversation_id=slug) # resume
|
+-- Export full library to JSON (FREE, no quota)
|   +-- CLI:  pwm export                        # all threads → pplx-export-<date>.json
|   +-- CLI:  pwm export --search "ai"          # filtered export
|
+-- Query multiple models at once (Model Council)
|   +-- CLI:  pwm council "query"                         # default 3 models
|   +-- CLI:  pwm council "query" -m gpt56_terra,claude_sonnet  # custom models
|   +-- MCP:  pplx_council(query)                         # ASK USER which models first!
|
+-- Deep research on a topic
|   +-- CLI:  pwm research "query"
|   +-- MCP:  pplx_deep_research(query)
|
+-- Use a specific model
|   +-- CLI:  pwm ask "query" -m gpt56_terra --thinking
|   +-- MCP:  pplx_gpt56_terra_thinking(query)  or  pplx_query(query, model="gpt56_terra", thinking=True)
|
+-- Check remaining quotas
|   +-- CLI:  pwm usage
|   +-- MCP:  pplx_usage()
|
+-- Authenticate / re-authenticate
|   +-- Interactive:      pwm login
|   +-- Non-interactive:  pwm login --email EMAIL, then pwm login --email EMAIL --code CODE [--totp-code CODE]
|   +-- MCP (no shell):   pplx_auth_request_code(email), then pplx_auth_complete(email, code[, totp_code])
|
+-- Start MCP server
|   +-- pwm-mcp
|
+-- Start API server (for Claude Code / OpenAI SDK)
|   +-- pwm api [--port PORT]
```

## CLI Commands

### Querying

```bash
pwm ask "What is quantum computing?"
```

Choose a specific model with `-m`:

```bash
pwm ask "Compare React and Vue" -m gpt56_terra
pwm ask "Explain attention mechanism" -m claude_sonnet
```

Enable extended thinking with `-t`:

```bash
pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet --thinking
```

Focus on specific sources with `-s`:

```bash
pwm ask "review this code for bugs" -s none            # Model only, no web search
pwm ask "transformer improvements 2025" -s academic   # Scholarly papers
pwm ask "best mechanical keyboard" -s social           # Reddit/Twitter
pwm ask "Apple revenue Q4 2025" -s finance             # SEC EDGAR filings
pwm ask "latest AI news" -s all                        # All sources
pwm connectors list                                    # List connector source IDs
pwm ask "private company funding" -s pitchbook_mcp_cashmere
```

Connector source IDs:
- CLI: run `pwm connectors list`, then pass the source ID with `-s`.
- MCP: call `pplx_connectors()`, then pass the source ID as `source_focus`.
- Do not guess connector IDs. If no connector is listed, use normal source focus values.
- Connector access depends on the authenticated Perplexity account; free accounts may show none.
- Unknown source values fail instead of falling back to web search.

Output options:

```bash
pwm ask "What is Rust?" --json            # JSON (for piping)
pwm ask "What is Rust?" --no-citations    # Answer only, no URLs
```

Combine flags:

```bash
pwm ask "protein folding advances" -m gemini_pro -s academic --json
```

### Shared MCP daemon

Use the shared daemon when multiple MCP clients or Codex sessions should connect
to one local MCP process:

```bash
pwm serve-mcp --transport streamable-http  # HTTP MCP on 127.0.0.1:8000/mcp
pwm serve-mcp --status                # Check the daemon
pwm serve-mcp --stop                  # Stop the daemon
pwm setup add codex --http            # Configure Codex for Streamable HTTP
pwm serve-mcp --transport sse         # Start the legacy SSE transport
```

The HTTP transports bind to loopback by default. Keep the daemon on a loopback
address unless you put an authenticated reverse proxy in front of it.

### Model Council

Query multiple models in parallel and get a synthesized consensus.
Each model in the council costs 1 Pro Search, plus 1 for Sonar 2 synthesis. Default: 3 Pro-compatible models + synthesis = 4 Pro Searches.
Before selecting models, check `pplx_usage()` or `pwm usage`. If the subscription is Pro, exclude Max-only models (`gpt56_sol`, `claude_opus`).

```bash
pwm council "What are the best practices for microservices?"           # default 3 models
pwm council "Compare Rust and Go for backend" -m gpt56_terra,claude_sonnet  # custom 2 models
pwm council "Explain quantum computing" -s academic                   # with source focus
pwm council "Prove the Pythagorean theorem" --thinking                # extended thinking
pwm council "AI trends 2026" --chairman claude_sonnet                 # premium synthesis (+1 Pro)
pwm council "Is React or Vue better?" --no-synthesis                  # skip synthesis
pwm council "AI trends 2026" --json                                   # JSON output
```

### Thread Library (FREE — no quota)

Browse and export past Perplexity conversations:

```bash
pwm threads                          # list most recent 20 threads
pwm threads --limit 50              # get 50 threads
pwm threads --search "quantum"      # filter threads by keyword
pwm threads --offset 20             # page 2 (skip first 20)
pwm threads --json                  # JSON output (for piping)
```

Export full library to a JSON file (no browser required):

```bash
pwm export                              # all threads → pplx-export-<date>.json
pwm export --output ./my-backup.json   # custom path
pwm export --search "ai"               # filtered export
pwm export --limit 50                  # cap at 50 threads
```

### Deep Research

Uses a separate monthly quota. Produces in-depth reports with extensive sources.

```bash
pwm research "agentic AI trends 2026"
pwm research "climate policy impact" -s academic
pwm research "NVIDIA competitive landscape" -s finance --json
```

### Authentication

```bash
pwm login                                                # Interactive
pwm login --check                                        # Check status
pwm login --email user@example.com                       # Send code
pwm login --email user@example.com --code 123456         # Complete
pwm login --email user@example.com --code 123456 --totp-code 654321  # Complete with TOTP
```

Set `PWM_SAVE_TO_LIBRARY=1` to save shared CLI and MCP queries to the Perplexity thread library. Queries are incognito by default.

### Usage

```bash
pwm usage                   # Cached limits
pwm usage --refresh         # Force-refresh from server
```

## MCP Tools Summary

| Tool                            | Cost                                    | Purpose                                                                                                                                                                                |
| ------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pplx_smart_query`              | **Varies by intent**                    | **USE THIS BY DEFAULT** — quota-aware auto routing                                                                                                                                     |
| `pplx_list_threads`             | **FREE**                                | Browse past conversations — paginated, searchable. Use before spending quota.                                                                                                          |
| `pplx_get_thread`               | **FREE**                                | Full history for any past thread. Also enables conversation resumption via conversation_id.                                                                                             |
| `pplx_sonar`                    | 1 Pro Search                            | Perplexity Sonar 2                                                                                                                                                                     |
| `pplx_query`                    | 1 Pro                                   | Explicit model selection with thinking toggle                                                                                                                                          |
| `pplx_ask`                      | 1 Pro                                   | Quick Q&A (auto model)                                                                                                                                                                 |
| `pplx_council`                  | **N+1 Pro** (1 per model + 1 synthesis) | Model Council — **ASK USER which models first!** Check subscription first; exclude Max-only `gpt56_sol`/`claude_opus` on Pro. Supports `thinking=True` and `chairman` for synthesis model. |
| `pplx_gpt56_terra` / `_thinking`      | 1 Pro                                   | OpenAI GPT-5.6 Terra (versatile)                                                                                                                                                             |
| `pplx_gpt56_sol` / `_thinking`      | 1 Pro                                   | OpenAI GPT-5.6 Sol (latest, Max tier)                                                                                                                                                      |
| `pplx_grok45` / `_thinking`         | 1 Pro                                   | xAI Grok 4.5                                                                                                                                                                               |
| `pplx_claude_sonnet` / `_think` | 1 Pro                                   | Anthropic Claude Sonnet 5                                                                                                                                                            |
| `pplx_claude_opus` / `_think`   | 1 Pro                                   | Anthropic Claude 4.8 Opus                                                                                                                                                              |
| `pplx_gemini_pro_think`         | 1 Pro                                   | Google Gemini 3.1 Pro (thinking always on)                                                                                                                                             |
| `pplx_nemotron_thinking`        | 1 Pro                                   | NVIDIA Nemotron 3 Ultra (thinking always on)                                                                                                                                           |
| `pplx_glm52`                    | 1 Pro                                   | Z.ai GLM 5.2 (thinking always on)                                                                                                                                                      |
| `pplx_kimi_k26` / `_thinking`   | 1 Pro                                   | Moonshot Kimi K2.6                                                                                                                                                                     |
| `pplx_deep_research`            | 1 Research                              | In-depth reports (**scarce monthly quota**)                                                                                                                                            |
| `pplx_usage`                    | FREE                                    | Check remaining quotas                                                                                                                                                                 |
| `pplx_connectors`               | FREE                                    | List account connector source IDs for `source_focus`                                                                                                                                   |
| `pplx_auth_status`              | FREE                                    | Check auth status                                                                                                                                                                      |
| `pplx_auth_request_code`        | FREE                                    | Send verification code                                                                                                                                                                 |
| `pplx_auth_complete`            | FREE                                    | Complete email and optional TOTP authentication                                                                                                                                         |

All query tools accept `source_focus`: `"none"`, `"web"`, `"academic"`, `"social"`, `"finance"`, `"all"`, or a connector source ID from `pplx_connectors()`.
Use `source_focus="none"` for model-only queries without web search.

**Multi-Turn Conversations**: All query tools accept an optional `conversation_id` parameter. The server returns `[Conversation ID: <uuid>]` at the end of each response. Extract this UUID and pass it to the next query to maintain context across multiple turns.

For full MCP tool parameters: See [references/mcp-tools.md](references/mcp-tools.md)

## Models

| CLI Name      | Provider   | Thinking | Notes                                                                              |
| ------------- | ---------- | -------- | ---------------------------------------------------------------------------------- |
| auto          | Perplexity | No       | Auto-selects best                                                                  |
| sonar         | Perplexity | No       | Sonar 2 (API id `experimental`). Uses `mode="concise"` to ensure grounded answers. |
| deep_research | Perplexity | No       | Monthly quota                                                                      |
| gpt56_terra         | OpenAI     | Toggle   | GPT-5.6 Terra (versatile)                                                                |
| gpt56_sol         | OpenAI     | Toggle   | GPT-5.6 Sol (latest, Max tier)                                                         |
| grok45            | xAI        | Toggle   | Grok 4.5                                                                                |
| claude_sonnet | Anthropic  | Toggle   | Claude Sonnet 5                                                                  |
| claude_opus   | Anthropic  | Toggle   | Claude 4.8 Opus (Max tier)                                                         |
| gemini_pro    | Google     | Always   | Gemini 3.1 Pro                                                                     |
| nemotron      | NVIDIA     | Always   | Nemotron 3 Ultra 550B                                                              |
| glm52         | Z.ai       | Always   | GLM 5.2                                                                            |
| kimi_k26      | Moonshot   | Toggle   | Kimi K2.6                                                                          |

For full model details: See [references/models.md](references/models.md)

## Source Focus Options

| Option     | Description                                                                                 | Example Use Case                           |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `none`     | No search — model training data only. **Note: still costs 1 Pro Search for premium models** | Code review, writing, analysis without web |
| `web`      | General web search (default)                                                                | News, general questions                    |
| `academic` | Academic papers, journals                                                                   | Research, citations, scientific topics     |
| `social`   | Reddit, Twitter, forums                                                                     | Opinions, recommendations, community       |
| `finance`  | SEC EDGAR filings                                                                           | Company financials, regulatory filings     |
| `all`      | Web + Academic + Social                                                                     | Broad coverage across all sources          |

## Error Recovery

| Error            | Cause             | Solution                  |
| ---------------- | ----------------- | ------------------------- |
| 403 Forbidden    | Token expired     | `pwm login`               |
| 429 Rate limit   | Quota exhausted   | Wait, check `pwm usage`   |
| "No token found" | Not authenticated | `pwm login`               |
| "LIMIT REACHED"  | Quota at zero     | Wait for reset or upgrade |

## Common Patterns

### Thread Library & Conversation Resumption

```bash
# List recent threads
pwm threads

# Search before spending quota
pwm threads --search "python packaging"

# Export full library to JSON (no browser needed)
pwm export
```

MCP — quota-free thread browsing:

```
pplx_list_threads()                        # recent 20 threads
pplx_list_threads(search_term="topic")     # search first
pplx_get_thread("<slug>")                  # read full history
```

Resume pattern — continue any past conversation:

```
# 1. Find the thread
pplx_list_threads(search_term="quantum")
# → returns slug: "f1f6562c-91be-47e9-..."

# 2. Read it for context (optional)
pplx_get_thread("f1f6562c-91be-47e9-...")

# 3. Continue right where it left off
pplx_smart_query("follow-up question", conversation_id="f1f6562c-91be-47e9-...")
```

MCP Resources (if your MCP client supports resources):

```
perplexity://library                        # your thread library
perplexity://thread/<slug>                  # a specific thread
```

### Quick web search

```bash
pwm ask "What happened in AI today?"
```

### Model-only query (no web search)

```bash
pwm ask "Explain the visitor pattern in OOP" -s none
pwm ask "Write a Python decorator for retry logic" -m claude_sonnet -s none
```

### Specific model

```bash
pwm ask "Compare React and Vue" -m gpt56_terra
```

### Model with thinking

```bash
pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet -t
```

### Academic research

```bash
pwm ask "transformer improvements 2025" -m gemini_pro -s academic
```

### Financial analysis

```bash
pwm ask "Apple revenue Q4 2025" -s finance
```

### Launch Claude Code seamlessly (Integration)

```bash
pwm hack claude
```

### Deep research pipeline

```bash
pwm research "quantum computing breakthroughs 2026" --json > research.json
```

### Check everything before heavy use

```bash
pwm login --check && pwm usage
```

### Re-authenticate (non-interactive, for AI agents)

```bash
pwm login --email user@example.com
# wait for email, then:
pwm login --email user@example.com --code 123456
# For a TOTP-enabled account, include: --totp-code 654321
```

## API Server

For API server setup and model name mapping, see [references/api-endpoints.md](references/api-endpoints.md).
