# Model Reference

Complete list of models available through Perplexity Web MCP.

The catalog is server-driven. Run `pwm models` (free, no query quota) to print the live list and
current tier labels; every identifier it shows is accepted by `pwm ask -m` and `pplx_query`.

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

### gpt56_terra (OpenAI GPT-5.6 Terra)

- **Identifier:** `gpt56_terra` / `gpt56_terra_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt56_terra` or `pwm ask "query" -m gpt56_terra -t`
- **MCP:** `pplx_gpt56_terra(query)` or `pplx_gpt56_terra_thinking(query)`
- **Notes:** OpenAI's versatile model.

### gpt56_sol (OpenAI GPT-5.6 Sol)

- **Identifier:** `gpt56_sol` / `gpt56_sol_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt56_sol` or `pwm ask "query" -m gpt56_sol -t`
- **MCP:** `pplx_gpt56_sol(query)` or `pplx_gpt56_sol_thinking(query)`
- **Notes:** OpenAI's most powerful model. Requires Perplexity **Max** subscription tier ($200/mo).

### gpt6_sol (OpenAI GPT-6 Sol)

- **Identifier:** `gpt6_sol` / `gpt6_sol_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt6_sol` or `pwm ask "query" -m gpt6_sol -t`
- **MCP:** `pplx_query(query, model="gpt6_sol")` or `pplx_query(query, model="gpt6_sol", thinking=True)`
- **Notes:** OpenAI's newest model. Availability follows your Perplexity plan; the live picker labels it Pro tier.

### grok45 (xAI Grok 4.5)

- **Identifier:** `grok45low` / `grok45medium`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m grok45` or `pwm ask "query" -m grok45 -t`
- **MCP:** `pplx_grok45(query)` or `pplx_grok45_thinking(query)`
- **Notes:** xAI's most advanced model.

### grok47 (xAI Grok 4.7)

- **Identifier:** `grok47` / `grok47thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m grok47` or `pwm ask "query" -m grok47 -t`
- **MCP:** `pplx_query(query, model="grok47")` or `pplx_query(query, model="grok47", thinking=True)`
- **Notes:** xAI's newest model.

### claude_sonnet (Anthropic Claude Sonnet 5)

- **Identifier:** `claude50sonnet` / `claude50sonnetthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_sonnet` or `pwm ask "query" -m claude_sonnet -t`
- **MCP:** `pplx_claude_sonnet(query)` or `pplx_claude_sonnet_think(query)`

### claude_opus (Anthropic Claude 4.8 Opus)

- **Identifier:** `claude48opus` / `claude48opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus` or `pwm ask "query" -m claude_opus -t`
- **MCP:** `pplx_claude_opus(query)` or `pplx_claude_opus_think(query)`
- **Notes:** Requires Perplexity **Max** subscription tier ($200/mo).

### claude_opus55 (Anthropic Claude Opus 5.5)

- **Identifier:** `claude55opus` / `claude55opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus55` or `pwm ask "query" -m claude_opus55 -t`
- **MCP:** `pplx_query(query, model="claude_opus55")` or `pplx_query(query, model="claude_opus55", thinking=True)`
- **Notes:** Anthropic's newest flagship. Requires Perplexity **Max** subscription tier per the live picker.

### gemini_pro (Google Gemini 3.1 Pro)

- **Identifier:** `gemini31pro_high`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m gemini_pro`
- **MCP:** `pplx_gemini_pro_think(query)` or `pplx_query(query, model="gemini_pro")`
- **Notes:** Thinking is permanently enabled. The `-t` flag has no effect.

### gemini38 (Google Gemini 3.8 Flash)

- **Identifier:** `gemini38flash` / `gemini38flashthinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gemini38` or `pwm ask "query" -m gemini38 -t`
- **MCP:** `pplx_query(query, model="gemini38")` or `pplx_query(query, model="gemini38", thinking=True)`
- **Notes:** Google's newest fast model.

### nemotron (NVIDIA Nemotron 3 Ultra)

- **Identifier:** `nv_nemotron_3_ultra`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m nemotron`
- **MCP:** `pplx_nemotron_thinking(query)` or `pplx_query(query, model="nemotron")`
- **Notes:** NVIDIA's Nemotron 3 Ultra 550B model. Thinking is permanently enabled.

### glm52 (Z.ai GLM 5.2)

- **Identifier:** `glm_5_2`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m glm52`
- **MCP:** `pplx_glm52(query)` or `pplx_query(query, model="glm52")`
- **Notes:** Z.ai's GLM 5.2 model. Thinking is permanently enabled.

### glm53 (Z.ai GLM 5.3)

- **Identifier:** `glm_5_3_thinking`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m glm53`
- **MCP:** `pplx_query(query, model="glm53")`
- **Notes:** Z.ai's newest model. Thinking is permanently enabled.

### kimi_k26 (Moonshot Kimi K2.6)

- **Identifier:** `kimik26instant` / `kimik26thinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m kimi_k26` or `pwm ask "query" -m kimi_k26 -t`
- **MCP:** `pplx_kimi_k26(query)` or `pplx_kimi_k26_thinking(query)`
- **Notes:** Moonshot AI's latest model. Costs 1 Pro Search regardless of source_focus — premium model access is what triggers the quota, not web search.

### kimi_k3 (Moonshot Kimi K3)

- **Identifier:** `kimik3thinking`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m kimi_k3`
- **MCP:** `pplx_query(query, model="kimi_k3")`
- **Notes:** Moonshot AI's newest model. Thinking is permanently enabled.

## Subscription Tiers

| Tier | Cost    | Pro Search  | Deep Research | Claude Opus 5.5 | GPT-5.6 Sol |
| ---- | ------- | ----------- | ------------- | --------------- | ----------- |
| Free | $0      | 3/day       | 1/month       | No              | No          |
| Pro  | $20/mo  | Weekly pool | Monthly pool  | No              | No          |
| Max  | $200/mo | Weekly pool | Monthly pool  | Yes             | Yes         |
