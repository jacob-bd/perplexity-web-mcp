# Architecture Patterns: Tool Calling in Proxy Layers

**Domain:** API Proxy Tool Calling
**Researched:** 2026-02-04
**Confidence:** LOW-MEDIUM - Based on training data, unable to verify with current sources

## Executive Summary

Proxy layers that enable tool calling for models without native support typically use one of three architectural patterns: prompt injection with structured extraction, intermediate model routing, or response transformation pipelines. Based on analysis of known proxy implementations, the most viable approach for Perplexity Web MCP is prompt injection with JSON extraction.

## Recommended Architecture

### Primary Pattern: Prompt Injection with Structured Extraction

```
User Request → [Proxy Layer] → Modified Prompt → [Target Model] → Response → [Parser] → Tool Calls
                     ↑                                                           ↓
                Tool Definitions                                          Extracted Actions
```

**Implementation:**
1. Inject tool definitions into system/user prompts
2. Guide model to output structured markers (e.g., JSON blocks)
3. Parse response for tool invocation patterns
4. Execute tools and re-inject results

**Why this works for our case:**
- No intermediate models needed
- Works with any text-generating model
- Can be tuned per model's response patterns
- Maintains single API call flow

## Patterns from Known Implementations

### Pattern 1: LiteLLM's Approach
**What:** Universal function calling interface
**Method:**
- Translates OpenAI function calling format to provider-specific formats
- For models without native support, uses prompt engineering
- Includes response parsing with fallback strategies

**Key insight:** Model-specific prompt templates:
```python
if not model.supports_tools:
    prompt = inject_tool_instructions(original_prompt, tools)
    response = model.generate(prompt)
    tool_calls = extract_tool_calls(response, model_type)
```

### Pattern 2: OpenRouter's Approach
**What:** Multi-provider routing with tool support
**Method:**
- Routes to models with native tool support when available
- Falls back to prompt injection for others
- Uses confidence scoring to validate extractions

### Pattern 3: Langchain's Approach
**What:** Agent framework with tool calling abstraction
**Method:**
- Structured output parsers (JSON, XML, custom)
- Chain-of-thought prompting for reasoning
- Retry logic with clarification prompts

## Proposed Architecture for Perplexity Web MCP

### Component Structure

| Component | Responsibility | Implementation Strategy |
|-----------|---------------|------------------------|
| Tool Injector | Modify prompts with tool definitions | Template-based injection with model-specific formatting |
| Response Parser | Extract tool calls from responses | Regex + JSON parsing with fallback strategies |
| Execution Manager | Run tools and format results | Async execution with result injection |
| Model Adapter | Model-specific optimizations | Per-model prompt templates and parsing rules |

### Data Flow

```
1. API Request with Tools
   ↓
2. Tool Definition Injection
   - Convert OpenAI format to prompt text
   - Add parsing instructions
   ↓
3. Send to Perplexity
   - Modified prompt with embedded instructions
   ↓
4. Parse Response
   - Look for JSON blocks
   - Extract tool_name and parameters
   - Fallback to regex patterns
   ↓
5. Execute Tools
   - Validate extracted calls
   - Run tool functions
   - Format results
   ↓
6. Continue Conversation
   - Inject tool results
   - Request final response
```

## Implementation Strategies

### Strategy 1: JSON Block Extraction (Recommended)
```python
# Inject into prompt
TOOL_PROMPT = """
Available tools: {tool_definitions}

To use a tool, output:
```tool_use
{
  "tool": "tool_name",
  "parameters": {...}
}
```
"""

# Parse response
tool_blocks = re.findall(r'```tool_use\n(.*?)\n```', response, re.DOTALL)
```

### Strategy 2: XML-style Tags
```python
# More reliable for some models
TOOL_PROMPT = """
To use a tool: <tool name="tool_name">{"param": "value"}</tool>
"""

# Parse with XML parser or regex
```

### Strategy 3: Structured Markers
```python
# Natural language with markers
TOOL_PROMPT = """
To use a tool, say: "TOOL_CALL: tool_name with parameters..."
"""
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Intermediate Model Dependency
**What:** Using a separate model to parse/plan tool calls
**Why bad:** Adds latency, cost, and complexity
**Instead:** Direct parsing with fallbacks

### Anti-Pattern 2: Rigid Parsing
**What:** Single parsing strategy without fallbacks
**Why bad:** Models vary in output format compliance
**Instead:** Multiple extraction strategies with confidence scoring

### Anti-Pattern 3: Synchronous Tool Execution
**What:** Blocking on each tool call
**Why bad:** Poor performance for multiple tools
**Instead:** Batch and parallel execution where possible

## Model-Specific Considerations

| Model Type | Preferred Format | Parsing Strategy | Confidence |
|------------|-----------------|------------------|------------|
| GPT-based | JSON blocks | JSON parser with validation | Medium |
| Claude-based | XML or JSON | Multi-format parser | Medium |
| Gemini-based | JSON with schema | Strict JSON validation | Medium |
| Generic | Structured markers | Regex with patterns | Low |

## Validation & Error Handling

### Extraction Confidence Scoring
```python
def score_extraction(extracted_call):
    score = 0
    if valid_json_structure: score += 40
    if tool_name_matches: score += 30
    if parameters_valid: score += 30
    return score

# Threshold for execution
if score > 70:
    execute_tool()
else:
    request_clarification()
```

### Fallback Chain
1. Try JSON extraction
2. Try XML extraction
3. Try regex patterns
4. Try natural language parsing
5. Return no tools detected

## Performance Optimizations

| Optimization | Impact | Implementation |
|--------------|--------|----------------|
| Prompt caching | Reduce token usage | Cache tool definition prompts |
| Batch parsing | Reduce latency | Parse all tools in single pass |
| Early detection | Reduce parsing overhead | Quick check for tool markers |
| Model-specific templates | Improve extraction rate | Tune prompts per model |

## Implementation Phases

### Phase 1: Basic JSON Extraction
- Simple JSON block detection
- Single tool per response
- Basic parameter validation

### Phase 2: Multi-Format Support
- Add XML parsing
- Support multiple tools
- Confidence scoring

### Phase 3: Model-Specific Optimization
- Custom templates per model
- Response pattern learning
- Advanced error recovery

## Confidence Assessment

| Aspect | Confidence | Reason |
|--------|------------|--------|
| General patterns | MEDIUM | Based on established practices |
| Specific implementations | LOW | Unable to verify current implementations |
| Recommended approach | MEDIUM | Logical from constraints but untested |
| Model-specific details | LOW | Requires empirical testing |

---
*Research completed: 2026-02-04*
*Confidence: LOW-MEDIUM - requires verification with current sources*
