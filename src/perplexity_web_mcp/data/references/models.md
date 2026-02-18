# Model Reference

Complete list of models available through Perplexity Web MCP.

## Model Details

### auto (Perplexity Best)
- **Identifier:** `pplx_pro`
- **Thinking:** No
- **CLI:** `pwm ask "query" -m auto`
- **MCP:** `pplx_ask(query)` or `pplx_query(query, model="auto")`
- **Notes:** Perplexity auto-selects the optimal model for the query.

### sonar (Perplexity Sonar)
- **Identifier:** `experimental`
- **Thinking:** No
- **CLI:** `pwm ask "query" -m sonar`
- **MCP:** `pplx_sonar(query)` or `pplx_query(query, model="sonar")`
- **Notes:** Perplexity's latest proprietary model.

### deep_research (Deep Research)
- **Identifier:** `pplx_alpha`
- **Thinking:** No
- **CLI:** `pwm research "query"` or `pwm ask "query" -m deep_research`
- **MCP:** `pplx_deep_research(query)` or `pplx_query(query, model="deep_research")`
- **Notes:** Produces in-depth reports with charts and extensive sources. Uses a separate **monthly** quota (not the weekly Pro Search pool). Use sparingly.

### gpt52 (OpenAI GPT-5.2)
- **Identifier:** `gpt52` / `gpt52_thinking`
- **Thinking:** Toggle (use `-t` flag or `thinking=True`)
- **CLI:** `pwm ask "query" -m gpt52` or `pwm ask "query" -m gpt52 -t`
- **MCP:** `pplx_gpt52(query)` or `pplx_gpt52_thinking(query)`

### claude_sonnet (Anthropic Claude 4.6 Sonnet)
- **Identifier:** `claude46sonnet` / `claude46sonnetthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_sonnet` or `pwm ask "query" -m claude_sonnet -t`
- **MCP:** `pplx_claude_sonnet(query)` or `pplx_claude_sonnet_think(query)`

### claude_opus (Anthropic Claude 4.6 Opus)
- **Identifier:** `claude46opus` / `claude46opusthinking`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m claude_opus` or `pwm ask "query" -m claude_opus -t`
- **MCP:** `pplx_query(query, model="claude_opus")` or `pplx_query(query, model="claude_opus", thinking=True)`
- **Notes:** Requires Perplexity **Max** subscription tier ($200/mo).

### gemini_flash (Google Gemini 3 Flash)
- **Identifier:** `gemini30flash` / `gemini30flash_high`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m gemini_flash` or `pwm ask "query" -m gemini_flash -t`
- **MCP:** `pplx_gemini_flash(query)` or `pplx_gemini_flash_think(query)`

### gemini_pro (Google Gemini 3 Pro)
- **Identifier:** `gemini30pro`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m gemini_pro`
- **MCP:** `pplx_gemini_pro_think(query)` or `pplx_query(query, model="gemini_pro")`
- **Notes:** Thinking is permanently enabled. The `-t` flag has no effect.

### grok (xAI Grok 4.1)
- **Identifier:** `grok41nonreasoning` / `grok41reasoning`
- **Thinking:** Toggle
- **CLI:** `pwm ask "query" -m grok` or `pwm ask "query" -m grok -t`
- **MCP:** `pplx_grok(query)` or `pplx_grok_thinking(query)`

### kimi (Moonshot Kimi K2.5)
- **Identifier:** `kimik25thinking`
- **Thinking:** Always on (no non-thinking variant)
- **CLI:** `pwm ask "query" -m kimi`
- **MCP:** `pplx_kimi_thinking(query)` or `pplx_query(query, model="kimi")`
- **Notes:** Thinking is permanently enabled.

## Subscription Tiers

| Tier | Cost | Pro Search | Deep Research | Claude Opus |
|------|------|------------|---------------|-------------|
| Free | $0 | 3/day | 1/month | No |
| Pro | $20/mo | Weekly pool | Monthly pool | No |
| Max | $200/mo | Weekly pool | Monthly pool | Yes |
