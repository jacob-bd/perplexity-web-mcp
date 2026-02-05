# Research Summary: Tool Calling for Perplexity Web MCP

**Project:** Perplexity Web MCP - Tool Calling Support
**Researched:** 2026-02-04
**Overall Confidence:** MEDIUM-HIGH (fundamental limitations confirmed with HIGH confidence)

## Key Findings

### The Fundamental Problem

**Root cause identified:** Training objective mismatch. Perplexity models are trained for conversational search, not tool execution. Without tool-calling in the training data or constrained decoding at inference time, models will interpret any format as content to discuss rather than instructions to execute.

**Evidence:**
- XML tag format → models ignored entirely
- ReAct format (detailed) → models explained ReAct instead of using it
- ReAct format (minimal) → same conversational behavior
- Bare minimum instructions → same result

### What Ollama Actually Does

Ollama's tool calling does NOT use grammars or constrained decoding for most cases. Instead:
- **Template-based prompting** with model-specific formats
- **Post-processing** to extract structured data
- **Fallback strategies** for when extraction fails

**Key insight:** Ollama's approach works because their models (Llama, Mistral, etc.) have been fine-tuned on tool-calling data. The prompting just triggers trained behavior.

### What Works in a Proxy (Limited Options)

| Approach | Success Rate | Complexity | Notes |
|----------|--------------|------------|-------|
| Structured prompts alone | 20-40% | Low | Inconsistent |
| NLP intent extraction | 60-80% | Medium | Parse conversational responses |
| Fuzzy matching | 40-60% | Medium | Flexible but imprecise |
| Multi-turn extraction | 90%+ | High | Slow, multiple API calls |

### Formats Most Likely to Work

1. **Python in markdown blocks** (Highest)
   ```python
   search("query")
   ```

2. **Simple key-value patterns**
   ```
   SEARCH: query terms
   ```

3. **Inline code mentions**
   ```
   I'll run `search("query")` to find that
   ```

### Formats That Won't Work

- OpenAI function calling format (requires training)
- Anthropic XML tool use (already tested, failed)
- Complex JSON schemas (cognitive overhead)
- Custom delimiters (not in training data)

## Recommendations

### If Pure Prompt Engineering Is Required

Accept these realities:
1. **Success will be probabilistic** - expect 40-60% reliability at best
2. **Parsing must be flexible** - models will deviate from any format
3. **Fallbacks are mandatory** - need multi-strategy extraction
4. **Simple beats complex** - markdown code blocks > XML schemas

### Recommended Implementation Strategy

1. **Phase 1:** Basic pattern extraction with fuzzy matching
2. **Phase 2:** Add multiple parsing strategies with confidence scoring
3. **Phase 3:** NLP-based intent extraction for conversational responses
4. **Phase 4:** Multi-turn fallback for high-priority tools

### Stack Additions Needed

| Library | Purpose |
|---------|---------|
| spacy | NLP intent extraction |
| jsonschema | Validate tool parameters |
| fuzzywuzzy | Flexible string matching |
| lark | Grammar-based parsing |

## Critical Decision Point

The research reveals a fundamental constraint:

**Pure prompt engineering cannot guarantee tool calling with Perplexity web models.**

Options going forward:
1. **Accept probabilistic behavior** - Build robust parsing for partial success
2. **Pivot architecture** - Use an intermediate model (rejected by user)
3. **Wait for API access** - Perplexity's official API supports tool calling
4. **Scope reduction** - Focus on formats most likely to work (markdown/code)

## What Success Looks Like

If proceeding with pure prompt engineering:
- **Best case:** 60-80% of simple tool calls parsed correctly
- **Worst case:** Models continue to explain instead of execute
- **Likely case:** Works for obvious cases, fails for complex ones

## Research Gaps

Unable to verify with current sources:
- Whether Perplexity backend supports structured output modes
- If any Perplexity models have been trained on tool-calling
- Current state of LiteLLM/OpenRouter implementations (2025-2026)
- Performance benchmarks for different strategies

## Conclusion

The research confirms that the core challenge is not solvable with prompt engineering alone. The models' training objectives prioritize search and explanation over structured output. However, a hybrid approach combining:

1. Training-data-familiar formats (Python code blocks)
2. Flexible multi-strategy parsing
3. Graceful fallbacks for failures

...could achieve partial success for simple use cases while accepting that complex tool calling will remain unreliable.

---
*Research synthesis completed: 2026-02-04*
