# Smart Quota-Aware Routing — Design

## Goal

Add intelligent, quota-aware model and search-type routing so that every query
automatically uses the best available option given current rate limits, without
wasting expensive quotas on simple questions.

## Decisions

- **Code + Skill**: Auto-routing lives in code (`router.py`, `smart_ask()`),
  and the SKILL.md teaches agents the logic so they can override or understand.
- **Quality first**: Only downgrade when quota is critically low (< 10%).
- **Deep Research**: Never auto-upgrade to deep research. Auto-downgrade from
  it to pro search when research quota is exhausted.
- **Structured metadata**: Every smart response includes `model_used`,
  `search_type`, `quota_snapshot`, and `routing_reason`.

## Architecture

### New module: `src/perplexity_web_mcp/router.py`

Three responsibilities:

#### 1. Quota Assessment

Fetch limits from `RateLimitCache` and classify:

| Level      | Pro Search         | Deep Research      |
|------------|--------------------|--------------------|
| healthy    | > 20% remaining    | > 50% remaining    |
| low        | 10–20% remaining   | 20–50% remaining   |
| critical   | < 10% remaining    | < 20% remaining    |
| exhausted  | 0                  | 0                  |

#### 2. Intent Classification

Caller passes an intent hint (or defaults to `standard`):

| Intent     | Description                        | Default Model Tier              |
|------------|------------------------------------|---------------------------------|
| quick      | Simple fact, definition            | Sonar (no Pro quota consumed)   |
| standard   | Normal question                    | Auto/Best (Pro Search)          |
| detailed   | Complex analysis, comparison       | Premium model (GPT-5.2/Claude)  |
| research   | Deep dive, multi-source report     | Deep Research                   |

#### 3. Routing Decision

Cross-reference intent with quota state:

```
intent=quick     → Always Sonar (no Pro quota consumed)
intent=standard  → Pro Search (auto model); downgrade to Sonar if pro exhausted
intent=detailed  → Premium model; downgrade to auto if pro critical, Sonar if exhausted
intent=research  → Deep Research; downgrade to detailed+pro if research exhausted
```

#### Key data structures

```python
@dataclass
class QuotaState:
    pro_remaining: int
    pro_level: str           # healthy | low | critical | exhausted
    research_remaining: int
    research_level: str
    labs_remaining: int
    agent_remaining: int

@dataclass
class RoutingDecision:
    model: Model
    search_type: str         # "standard" | "pro" | "deep_research"
    intent: str
    reason: str              # human-readable explanation
    was_downgraded: bool
    quota_snapshot: dict     # {"pro_remaining": 42, "research_remaining": 3, ...}

@dataclass
class SmartResponse:
    answer: str
    citations: list[str]
    routing: RoutingDecision
```

### Integration points

#### MCP Server (`mcp/server.py`)

New tool:

```python
@mcp.tool
def pplx_smart_query(
    query: str,
    intent: str = "standard",       # quick | standard | detailed | research
    source_focus: str = "web",
) -> str:
```

Existing tools untouched. MCP `instructions` updated to recommend
`pplx_smart_query` as the default.

#### CLI (`cli/main.py`)

- `pwm ask "query"` (no `-m`) routes through smart router instead of
  hardcoded `auto`.
- `pwm ask "query" -m gpt52` bypasses the router (explicit = explicit).
- New `--intent` flag: `pwm ask "query" --intent quick` (defaults to
  `standard`).

#### Shared layer (`shared.py`)

New function:

```python
def smart_ask(
    query: str,
    intent: str = "standard",
    source_focus: str = "web",
) -> SmartResponse:
```

Original `ask()` remains unchanged for explicit model selection.

#### Skill (`SKILL.md`)

Updated decision tree:
- Default to `pplx_smart_query` / `pwm ask` without `-m`
- Use explicit tools only when a specific model is needed
- Interpret the metadata block

### Response format

#### MCP (text with structured footer)

```
[Answer text]

Citations:
[1]: https://...

---
Routing: Sonar | Pro Search | standard intent
Reason: Quota healthy (142/300 pro remaining) — used standard model
Quota: Pro 142 | Research 7 | Labs 48 | Agent 19
Downgraded: No
```

#### CLI `--json`

```json
{
  "answer": "...",
  "citations": ["https://..."],
  "routing": {
    "model_used": "experimental",
    "model_name": "sonar",
    "search_type": "pro",
    "intent": "standard",
    "reason": "Quota healthy — used standard model",
    "was_downgraded": false,
    "quota": {
      "pro_remaining": 142,
      "research_remaining": 7,
      "labs_remaining": 48,
      "agent_remaining": 19
    }
  }
}
```

## Files touched

- **Create**: `src/perplexity_web_mcp/router.py` — routing logic
- **Modify**: `src/perplexity_web_mcp/shared.py` — add `smart_ask()`
- **Modify**: `src/perplexity_web_mcp/mcp/server.py` — add `pplx_smart_query`, update instructions
- **Modify**: `src/perplexity_web_mcp/cli/main.py` — smart routing for `-m auto`, `--intent` flag
- **Modify**: `src/perplexity_web_mcp/data/SKILL.md` + `skills/perplexity-web-mcp/SKILL.md`
- **Create**: `tests/test_router.py`
