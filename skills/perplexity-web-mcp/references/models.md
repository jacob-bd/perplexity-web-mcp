# Model Reference

Complete list of models available through Perplexity Web MCP.

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
- **Notes:** Perplexity's latest in-house model.

### deep_research (Deep Research)
- **Identifier:** `pplx_alpha`
- **Thinking:** No
- **CLI:** `pwm research "query"` or `pwm ask "query" -m deep_research`
- **MCP:** `pplx_deep_research(query)` or `pplx_query(query, model="deep_research")`
- **Notes:** Produces in-depth reports with charts and extensive sources. Uses a separate **monthly** quota (not the weekly Pro Search pool). Use sparingly.

### gpt54 (OpenAI GPT-5.4)
- **Identifier:** `gpt54` / `gpt54_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt54` or `pwm ask "query" -m gpt54 -t`
- **MCP:** `pplx_gpt54(query)` or `pplx_gpt54_thinking(query)`
- **Notes:** OpenAI's versatile model.

### gpt55 (OpenAI GPT-5.5)
- **Identifier:** `gpt55` / `gpt55_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt55` or `pwm ask "query" -m gpt55 -t`
- **MCP:** `pplx_gpt55(query)` or `pplx_gpt55_thinking(query)`
- **Notes:** OpenAI's latest model. Requires Perplexity **Max** subscription tier ($200/mo).

### claude_sonnet (Anthropic Claude 4.6 Sonnet)
- **Identifier:** `claude46sonnet` / `claude46sonnetthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_sonnet` or `pwm ask "query" -m claude_sonnet -t`
- **MCP:** `pplx_claude_sonnet(query)` or `pplx_claude_sonnet_think(query)`

### claude_opus (Anthropic Claude 4.7 Opus)
- **Identifier:** `claude47opus` / `claude47opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus` or `pwm ask "query" -m claude_opus -t`
- **MCP:** `pplx_claude_opus(query)` or `pplx_claude_opus_think(query)`
- **Notes:** Requires Perplexity **Max** subscription tier ($200/mo).

### gemini_pro (Google Gemini 3.1 Pro)
- **Identifier:** `gemini31pro_high`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m gemini_pro`
- **MCP:** `pplx_gemini_pro_think(query)` or `pplx_query(query, model="gemini_pro")`
- **Notes:** Thinking is permanently enabled. The `-t` flag has no effect.

### nemotron (NVIDIA Nemotron 3 Super)
- **Identifier:** `nv_nemotron_3_super`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m nemotron`
- **MCP:** `pplx_nemotron_thinking(query)` or `pplx_query(query, model="nemotron")`
- **Notes:** NVIDIA's Nemotron 3 Super 120B model. Thinking is permanently enabled.

### kimi_k26 (Moonshot Kimi K2.6)
- **Identifier:** `kimik26instant` / `kimik26thinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m kimi_k26` or `pwm ask "query" -m kimi_k26 -t`
- **MCP:** `pplx_kimi_k26(query)` or `pplx_kimi_k26_thinking(query)`
- **Notes:** Moonshot AI's latest model. Costs 1 Pro Search regardless of source_focus — premium model access is what triggers the quota, not web search.

## Subscription Tiers

| Tier | Cost | Pro Search | Deep Research | Claude Opus | GPT-5.5 |
|------|------|------------|---------------|-------------|---------|
| Free | $0 | 3/day | 1/month | No | No |
| Pro | $20/mo | Weekly pool | Monthly pool | No | No |
| Max | $200/mo | Weekly pool | Monthly pool | Yes | Yes |
