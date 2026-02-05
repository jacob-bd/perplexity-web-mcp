# Feature Landscape: LLM Tool Calling Formats

**Domain:** LLM Tool/Function Calling Formats
**Researched:** 2026-02-04
**Confidence:** MEDIUM (based on training knowledge, unable to verify with current sources)

## Executive Summary

Tool calling formats fall into two categories: those requiring fine-tuning (won't work for Perplexity web models) and those that might work through prompting alone. Success depends on how frequently the format appears in training data and how naturally it fits with the model's pre-training patterns.

## Table Stakes - Formats Requiring Fine-Tuning

These formats typically require explicit training and won't work reliably through prompting alone.

| Format | Description | Why Requires Fine-tuning | Won't Work Because |
|--------|-------------|-------------------------|-------------------|
| **OpenAI Function Calling** | JSON schema with `functions` array | Models trained on specific token sequences | Perplexity models lack this specific training |
| **Anthropic Tool Use** | XML-based with `<function_calls>` tags | Custom XML schema with specific parsing | Already tested, models ignore the format |
| **Hermes Format** | Structured JSON with specific field names | Requires exact adherence to schema | Models need explicit training on format |
| **ChatML Tools** | Special tokens like `<|im_start|>` | Token-level formatting | Requires tokenizer awareness |
| **Gorilla/Berkeley Format** | AST-based function representations | Complex parsing requirements | Too specific without training |

## Differentiators - Formats That Might Work Through Prompting

These formats leverage patterns that commonly appear in training data, making them more likely to work without fine-tuning.

| Format | Why It Might Work | Complexity | Success Likelihood |
|--------|-------------------|------------|-------------------|
| **Markdown Code Blocks** | Ubiquitous in training data | Low | HIGH |
| **Python Function Calls** | Natural code format, heavily represented | Low | HIGH |
| **JSON in Code Blocks** | Common API documentation pattern | Low | MEDIUM-HIGH |
| **Chain of Thought + Action** | Natural reasoning pattern | Medium | MEDIUM |
| **Structured Lists** | Basic formatting, universally understood | Low | MEDIUM |
| **HTML/JavaScript** | Web-native, common in training | Low | MEDIUM-HIGH |

## Anti-Features - Formats to Avoid

Formats that consistently fail or create problems.

| Anti-Feature | Why Avoid | What Happens |
|--------------|-----------|--------------|
| **Complex XML Schemas** | Models treat as documentation, not instructions | Ignored or reproduced as examples |
| **Custom Delimiters** | Not in training data | Models don't recognize boundaries |
| **Nested JSON with Deep Structure** | Cognitive overhead | Models simplify or break structure |
| **Binary/Encoded Formats** | Unnatural for text models | Complete failure |
| **Token-Specific Formats** | Requires exact tokenizer match | Inconsistent reproduction |

## Emergent Formats - Patterns from Training Data

These formats work because they appear frequently in training data, creating "emergent" behavior.

### 1. Markdown Code Block with Language Hint
```markdown
\`\`\`python
function_name(param1="value", param2="value")
\`\`\`
```
**Why it works:** Extremely common in documentation, tutorials, Stack Overflow
**Success rate:** HIGH

### 2. JavaScript/JSON in Backticks
```javascript
searchWeb({query: "search terms", limit: 5})
```
**Why it works:** Web development documentation is heavily represented
**Success rate:** MEDIUM-HIGH

### 3. Natural Language with Structured Markers
```
ACTION: search_web
QUERY: "what is the weather today"
REASONING: User asked about current weather
```
**Why it works:** Similar to Chain of Thought patterns in training
**Success rate:** MEDIUM

### 4. HTML Comment Patterns
```html
<!-- SEARCH: query terms here -->
```
**Why it works:** HTML comments are everywhere in web training data
**Success rate:** MEDIUM

### 5. Inline Code with Clear Syntax
```
I'll search for `search("query terms")` to find that information.
```
**Why it works:** Natural inline code pattern from documentation
**Success rate:** MEDIUM-HIGH

## Testing Recommendations

Test formats in this order (most to least likely to work):

1. **Python in markdown blocks** (Highest likelihood)
   ```python
   search("test query")
   ```

2. **JavaScript function calls**
   ```javascript
   searchWeb("test query")
   ```

3. **Simple markers**
   ```
   SEARCH: test query
   ```

4. **Inline code mentions**
   ```
   Let me search for `search("test query")`
   ```

5. **HTML comments**
   ```html
   <!-- SEARCH: test query -->
   ```

## MVP Recommendation

For Perplexity web models, prioritize these approaches:

1. **Markdown code blocks with Python syntax** - Highest success likelihood
2. **Inline code with function calls** - Natural and unambiguous
3. **Simple key-value patterns** - Fallback for simpler tools

Defer to post-MVP:
- **Complex JSON schemas**: Too structured without fine-tuning
- **XML-based formats**: Already proven not to work
- **Multi-step chains**: Start simple, add complexity if basic works

## Implementation Strategies

### Strategy 1: Progressive Enhancement
1. Start with simplest format (KEY: value)
2. Test with code blocks if simple works
3. Add parameters only if basic calling works
4. Increase complexity gradually

### Strategy 2: Multi-Format Recognition
1. Instruct model to use preferred format
2. Parse multiple formats on receiving end
3. Accept variations that preserve intent
4. Log which formats model actually uses

### Strategy 3: Training Data Mimicry
1. Use examples that look like documentation
2. Frame as "code examples" not "instructions"
3. Leverage the model's tendency to complete patterns
4. Use familiar programming languages (Python, JavaScript)

## Confidence Assessment

| Format Category | Confidence | Reasoning |
|-----------------|------------|-----------|
| Fine-tuned formats won't work | HIGH | Clear requirement for specific training |
| Markdown code blocks might work | HIGH | Ubiquitous in training data |
| Python syntax likely to work | MEDIUM-HIGH | Common pattern, natural format |
| Simple patterns have chance | MEDIUM | Depends on model's training mix |
| Complex JSON unlikely without training | HIGH | Requires strict adherence |

## Gaps and Unknowns

- **Model-specific behavior**: Different models may respond differently to the same format
- **Context window effects**: Longer contexts might affect format recognition
- **System prompt influence**: How system prompts affect format following
- **Version differences**: How model updates affect format recognition

---
*Research completed: 2026-02-04*
*Confidence: MEDIUM - requires verification with current sources*
