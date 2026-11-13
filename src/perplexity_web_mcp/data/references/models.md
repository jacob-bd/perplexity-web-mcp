# Model Reference

Complete list of models available through Perplexity Web MCP.

The catalog is server-driven. Run `pwm models` (free, no query quota) to print the live list and
current tier labels; every identifier it shows is accepted by `pwm ask -m` and `pplx_query`.

When no model is specified: `pwm ask` uses quota-aware auto routing, `pwm chat` defaults to
`sonar` (or a saved preference), and `pplx_query` uses a saved `pwm config` preference when
present, otherwise `auto`.

## Model Details

### auto (Perplexity Best)

- **Identifier:** `pplx_pro`
- **Thinking:** No
- **CLI:** `pwm ask "query" -m auto`
- **MCP:** `pplx_ask(query)` or `pplx_query(query, model="auto")`
- **Notes:** Perplexity auto-selects the optimal model for the query.

### sonar (Perplexity Sonar 2)

- **Identifier:** `experimental` (unchanged from legacy Sonar; UI label is Sonar 2)
- **Thinking:** No
- **CLI:** `pwm ask "query" -m sonar`
- **MCP:** `pplx_sonar(query)` or `pplx_query(query, model="sonar")`
- **Notes:** Perplexity's latest in-house model. Settings default to concise search mode (`mode="concise"`), which bypasses interactive copilot to guarantee responses are grounded on retrieved search citations on all accounts (including Free tier fallback).

### deep_research (Deep Research)

- **Identifier:** `pplx_alpha`
- **Thinking:** No
- **CLI:** `pwm research "query"` or `pwm ask "query" -m deep_research`
- **MCP:** `pplx_deep_research(query)` or `pplx_query(query, model="deep_research")`
- **Notes:** Produces in-depth reports with charts and extensive sources. Uses a separate **monthly** quota (not the weekly Pro Search pool). Use sparingly.

### gpt61_sol (OpenAI GPT-6.1 Sol)

- **Identifier:** `gpt6_1_sol` / `gpt6_1_sol_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt61_sol` or `pwm ask "query" -m gpt61_sol -t`
- **MCP:** `pplx_gpt61_sol(query)` or `pplx_gpt61_sol_thinking(query)`
- **Notes:** OpenAI's versatile model.

### gpt6_astra (OpenAI GPT-6 Astra)

- **Identifier:** `gpt6_astra` / `gpt6_astra_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt6_astra` or `pwm ask "query" -m gpt6_astra -t`
- **MCP:** `pplx_gpt6_astra(query)` or `pplx_gpt6_astra_thinking(query)`
- **Notes:** OpenAI's most capable model. Requires Perplexity **Max** subscription tier.

### gemini4_carbon (Google Gemini 4 Carbon)

- **Identifier:** `gemini4carbon` / `gemini4carbonthinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gemini4_carbon` or `pwm ask "query" -m gemini4_carbon -t`
- **MCP:** `pplx_gemini4_carbon(query)` or `pplx_gemini4_carbon_thinking(query)`
- **Notes:** Google's most powerful model. Requires Perplexity **Max** subscription tier.

### gemini4_hydrogen (Google Gemini 4 Hydrogen)

- **Identifier:** `gemini4hydrogen` / `gemini4hydrogenthinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gemini4_hydrogen` or `pwm ask "query" -m gemini4_hydrogen -t`
- **MCP:** `pplx_gemini4_hydrogen(query)` or `pplx_gemini4_hydrogen_thinking(query)`
- **Notes:** Google's latest model, labelled New in the picker. `gemini_pro` remains a legacy alias for this model.

### claude_sonnet (Anthropic Claude Sonnet 5.5)

- **Identifier:** `claude55sonnet` / `claude55sonnetthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_sonnet` or `pwm ask "query" -m claude_sonnet -t`
- **MCP:** `pplx_claude_sonnet(query)` or `pplx_claude_sonnet_think(query)`

### claude_opus (Anthropic Claude Opus 5.5)

- **Identifier:** `claude55opus` / `claude55opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus` or `pwm ask "query" -m claude_opus -t`
- **MCP:** `pplx_claude_opus(query)` or `pplx_claude_opus_think(query)`
- **Notes:** Requires Perplexity **Max** subscription tier. Alias of `claude_opus55`.

### claude_opus55 (Anthropic Claude Opus 5.5)

- **Identifier:** `claude55opus` / `claude55opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus55` or `pwm ask "query" -m claude_opus55 -t`
- **MCP:** `pplx_query(query, model="claude_opus55")` or `pplx_query(query, model="claude_opus55", thinking=True)`
- **Notes:** Explicit name for the current Opus. Requires Perplexity **Max** subscription tier.

### claude_fable52 (Anthropic Claude Fable 5.2)

- **Identifier:** `claudefable52` / `claudefable52thinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_fable52` or `pwm ask "query" -m claude_fable52 -t`
- **MCP:** `pplx_claude_fable52(query)` or `pplx_claude_fable52_think(query)`
- **Notes:** Anthropic's most capable model. Requires Perplexity **Max** subscription tier.

### grok47 (xAI Grok 4.7)

- **Identifier:** `grok47` / `grok47thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m grok47` or `pwm ask "query" -m grok47 -t`
- **MCP:** `pplx_grok47(query)` or `pplx_grok47_thinking(query)`
- **Notes:** xAI's newest model.

### nemotron (NVIDIA Nemotron 3.5 Super VL)

- **Identifier:** `nv_nemotron_3_5_super`
- **Thinking:** No separate variant
- **CLI:** `pwm ask "query" -m nemotron`
- **MCP:** `pplx_nemotron(query)` or `pplx_query(query, model="nemotron")`
- **Notes:** NVIDIA's Nemotron 3.5 Super VL model. The picker marks it text-only and offers no thinking toggle.

### glm53 (Z.ai GLM 5.3)

- **Identifier:** `glm_5_3_thinking`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m glm53`
- **MCP:** `pplx_glm53(query)` or `pplx_query(query, model="glm53")`
- **Notes:** Z.ai's newest model. Thinking is permanently enabled.

### kimi_k3 (Moonshot Kimi K3)

- **Identifier:** `kimik3thinking`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m kimi_k3`
- **MCP:** `pplx_kimi_k3(query)` or `pplx_query(query, model="kimi_k3")`
- **Notes:** Moonshot AI's newest model. Thinking is permanently enabled.

## Subscription Tiers

| Tier | Cost    | Pro Search  | Deep Research | Claude Opus 5.5 | GPT-6 Astra |
| ---- | ------- | ----------- | ------------- | --------------- | ----------- |
| Free | $0      | 3/day       | 1/month       | No              | No          |
| Pro  | $20/mo  | Weekly pool | Monthly pool  | No              | No          |
| Max  | $200/mo | Weekly pool | Monthly pool  | Yes             | Yes         |
