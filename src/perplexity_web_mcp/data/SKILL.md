---
name: querying-perplexity
description: >-
  Search the web and query AI models via Perplexity AI using perplexity-web-mcp-cli.
  Supports CLI commands (pwm ask, pwm research), MCP tools (pplx_*), and
  Anthropic/OpenAI-compatible API server. Use when the user mentions "perplexity",
  "pplx", "pwm", "web search with AI", "deep research", "search the internet",
  or wants to query premium models like GPT-5.4, Claude, Gemini, Nemotron through
  Perplexity's web interface.
metadata:
  version: "0.9.5"
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
4. **Default to quick/Sonar** — only escalate when the query genuinely needs Pro
5. **Never use Deep Research autonomously** — only when the user explicitly asks

## Quota-Aware Usage Protocol (MANDATORY)

Perplexity has hard quota limits. Wasting Pro queries on simple lookups exhausts
the weekly pool fast, leaving nothing for questions that actually need it.

### Cost Model

| Tier | What It Costs | Resets | Typical Pool |
|------|---------------|--------|--------------|
| **Sonar / quick** | FREE — no quota consumed | — | Unlimited |
| **Pro Search** (standard/detailed, pplx_ask, pplx_query, all model-specific tools) | 1 Pro Search query | Weekly | ~300/week |
| **Council** (pplx_council, pwm council) | N Pro Searches (1 per model selected) + 1 free Sonar synthesis | Weekly | ~300/week (shared) |
| **Deep Research** (pplx_deep_research, research intent) | 1 Deep Research query | Monthly | ~5-10/month |

### Before Every Session

1. **Check quota first**: Call `pplx_usage()` (MCP) or `pwm usage` (CLI) before your first query.
2. Review the remaining Pro and Research counts.
3. If Pro < 20% remaining, restrict yourself to quick/Sonar for everything except user-requested Pro queries.

### Before Every Query: Choose the Lowest Sufficient Tier

Ask yourself: **"Can Sonar answer this?"** If yes, use `quick`. Only escalate if the answer is no.

**Use quick (FREE — Sonar)** when the query is:
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

**Use council (N Pro Searches — expensive)** when:
- The user needs high-confidence answers validated across multiple AI providers
- Important decisions, fact-checking, or complex analysis
- BEFORE calling: ASK the user which models and how many (each = 1 Pro Search)
- Available models: gpt54, claude_sonnet, claude_opus, gemini_pro, nemotron
- Default: 3 models (GPT-5.4, Claude Opus, Gemini Pro) = 3 Pro Searches

### Decision Flowchart

```
You want to query Perplexity...
│
├─ Is this a simple fact, definition, or well-known how-to?
│  └─ YES → intent='quick' (FREE)
│
├─ Does it need multiple current web sources or cited synthesis?
│  └─ YES → intent='standard' (1 Pro)
│
├─ Does it need deep reasoning, complex analysis, or premium model quality?
│  └─ YES → intent='detailed' (1 Pro, premium model)
│
├─ Does the user need high-confidence answers from multiple AI providers?
│  └─ YES → pplx_council / pwm council (N Pro Searches — ASK USER which models first!)
│
├─ Did the user explicitly request deep research / comprehensive report?
│  └─ YES → intent='research' (1 Deep Research)
│
└─ When in doubt → intent='quick' (FREE, upgrade later if insufficient)
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
- **Exhausted quota**: Falls back to Sonar for everything except research
- **Research exhausted**: Falls back to premium Pro Search
- Response metadata shows what model was used, why, and remaining quota

### When to Use Explicit Models Instead

Only use model-specific tools (pplx_gpt54, pplx_claude_sonnet, etc.) when:
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
|   +-- Explicit model: pwm ask "query" -m gpt54  or  pplx_query(query, model="gpt54")
|
+-- Query multiple models at once (Model Council)
|   +-- CLI:  pwm council "query"                         # default 3 models
|   +-- CLI:  pwm council "query" -m gpt54,claude_sonnet  # custom models
|   +-- MCP:  pplx_council(query)                         # ASK USER which models first!
|
+-- Deep research on a topic
|   +-- CLI:  pwm research "query"
|   +-- MCP:  pplx_deep_research(query)
|
+-- Use a specific model
|   +-- CLI:  pwm ask "query" -m gpt54 --thinking
|   +-- MCP:  pplx_gpt54_thinking(query)  or  pplx_query(query, model="gpt54", thinking=True)
|
+-- Check remaining quotas
|   +-- CLI:  pwm usage
|   +-- MCP:  pplx_usage()
|
+-- Authenticate / re-authenticate
|   +-- Interactive:      pwm login
|   +-- Non-interactive:  pwm login --email EMAIL  then  pwm login --email EMAIL --code CODE
|   +-- MCP (no shell):   pplx_auth_request_code(email)  then  pplx_auth_complete(email, code)
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
pwm ask "Compare React and Vue" -m gpt54
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
```

Output options:
```bash
pwm ask "What is Rust?" --json            # JSON (for piping)
pwm ask "What is Rust?" --no-citations    # Answer only, no URLs
```

Combine flags:
```bash
pwm ask "protein folding advances" -m gemini_pro -s academic --json
```

### Model Council

Query multiple models in parallel and get a synthesized consensus.
Each model in the council costs 1 Pro Search. Default: 3 models = 3 Pro Searches.

```bash
pwm council "What are the best practices for microservices?"           # default 3 models
pwm council "Compare Rust and Go for backend" -m gpt54,claude_sonnet  # custom 2 models
pwm council "Explain quantum computing" -s academic                   # with source focus
pwm council "Is React or Vue better?" --no-synthesis                  # skip synthesis
pwm council "AI trends 2026" --json                                   # JSON output
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
```

### Usage

```bash
pwm usage                   # Cached limits
pwm usage --refresh         # Force-refresh from server
```

## MCP Tools Summary

| Tool | Cost | Purpose |
|------|------|---------|
| `pplx_smart_query` | **Varies by intent** | **USE THIS BY DEFAULT** — quota-aware auto routing |
| `pplx_sonar` | **FREE** | Perplexity Sonar model (no Pro quota used) |
| `pplx_query` | 1 Pro | Explicit model selection with thinking toggle |
| `pplx_ask` | 1 Pro | Quick Q&A (auto model) |
| `pplx_council` | **N Pro** (1 per model) | Model Council — **ASK USER which models first!** |
| `pplx_gpt54` / `_thinking` | 1 Pro | OpenAI GPT-5.4 |
| `pplx_claude_sonnet` / `_think` | 1 Pro | Anthropic Claude 4.6 Sonnet |
| `pplx_claude_opus` / `_think` | 1 Pro | Anthropic Claude 4.6 Opus |
| `pplx_gemini_pro_think` | 1 Pro | Google Gemini 3.1 Pro (thinking always on) |
| `pplx_nemotron_thinking` | 1 Pro | NVIDIA Nemotron 3 Super (thinking always on) |
| `pplx_deep_research` | 1 Research | In-depth reports (**scarce monthly quota**) |
| `pplx_usage` | FREE | Check remaining quotas |
| `pplx_auth_status` | FREE | Check auth status |
| `pplx_auth_request_code` | FREE | Send verification code |
| `pplx_auth_complete` | FREE | Complete auth with code |

All query tools accept `source_focus`: `"none"`, `"web"`, `"academic"`, `"social"`, `"finance"`, `"all"`.
Use `source_focus="none"` for model-only queries without web search.

For full MCP tool parameters: See [references/mcp-tools.md](references/mcp-tools.md)

## Models

| CLI Name | Provider | Thinking | Notes |
|----------|----------|----------|-------|
| auto | Perplexity | No | Auto-selects best |
| sonar | Perplexity | No | Latest Perplexity model |
| deep_research | Perplexity | No | Monthly quota |
| gpt54 | OpenAI | Toggle | GPT-5.4 |
| claude_sonnet | Anthropic | Toggle | Claude 4.6 Sonnet |
| claude_opus | Anthropic | Toggle | Claude 4.6 Opus (Max tier) |
| gemini_pro | Google | Always | Gemini 3.1 Pro |
| nemotron | NVIDIA | Always | Nemotron 3 Super 120B |

For full model details: See [references/models.md](references/models.md)

## Source Focus Options

| Option | Description | Example Use Case |
|--------|-------------|------------------|
| `none` | No search -- model training data only | Code review, writing, analysis without web |
| `web` | General web search (default) | News, general questions |
| `academic` | Academic papers, journals | Research, citations, scientific topics |
| `social` | Reddit, Twitter, forums | Opinions, recommendations, community |
| `finance` | SEC EDGAR filings | Company financials, regulatory filings |
| `all` | Web + Academic + Social | Broad coverage across all sources |

## Error Recovery

| Error | Cause | Solution |
|-------|-------|----------|
| 403 Forbidden | Token expired | `pwm login` |
| 429 Rate limit | Quota exhausted | Wait, check `pwm usage` |
| "No token found" | Not authenticated | `pwm login` |
| "LIMIT REACHED" | Quota at zero | Wait for reset or upgrade |

## Common Patterns

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
pwm ask "Compare React and Vue" -m gpt54
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
```

## API Server

For API server setup and model name mapping, see [references/api-endpoints.md](references/api-endpoints.md).
