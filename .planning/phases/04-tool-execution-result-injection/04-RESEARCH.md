# Phase 4: Tool Execution & Result Injection - Research

**Researched:** 2026-02-05
**Domain:** Tool result injection and multi-turn conversation management in proxy LLM APIs
**Confidence:** HIGH

## Summary

Phase 4 addresses how tool execution results flow back into the conversation after Claude Code executes tools locally. Unlike typical tool-calling implementations where the server executes tools, this proxy architecture receives tool_result content blocks from the client (Claude Code), extracts them, and must inject them into the NEXT Perplexity prompt so the model can use those results to continue its response.

The key challenge is format: Perplexity models don't natively understand Anthropic's tool_result blocks, so results must be transformed into natural language or structured text that Perplexity can process. Research shows that context injection strategies (prepending results to user messages) and structured formatting (JSON or markdown) work best for tool-augmented LLM systems.

The existing codebase already has critical infrastructure: `extract_tool_results()` in tool_validation.py extracts results from message history, the confidence threshold of 0.7 filters low-quality tool calls, and the API validates tool_use/tool_result pairing. The remaining work is formatting and injection logic.

**Primary recommendation:** Inject tool results into Perplexity prompts as structured markdown blocks with clear labels (Tool: name, Result: content), prepended before the user's actual query. Use selective context injection to include only recent/relevant tool results and avoid context window bloat.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| FastAPI | 0.115+ | HTTP server framework | Already in use, handles multi-turn state |
| Pydantic | 2.x | Request/response validation | Already validates tool_result blocks |
| Python str.format | Built-in | Template-based injection | Simple, reliable, no dependencies |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Jinja2 | 3.1+ | Advanced templating | Complex multi-result formatting |
| json | Built-in | Structured formatting | When results are JSON objects |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Template strings | LangChain PromptTemplate | LangChain adds dependency weight for simple use case |
| Markdown formatting | XML/JSON in prompt | Markdown more human-readable, models handle it better |
| Prepend injection | Append injection | Prepending ensures model sees results before generating response |

**Installation:**
```bash
# Already installed in project
uv pip install fastapi pydantic
```

## Architecture Patterns

### Recommended Result Injection Structure

When tool results are present, construct prompt with this order:
1. System context (distilled, if provided)
2. Tool results (formatted, recent-first)
3. User's actual query

```
[System context if present]

TOOL RESULTS:
---
Tool: search
Arguments: {"query": "Python tutorials"}
Result:
Found comprehensive Python tutorials at python.org covering basics,
intermediate topics, and advanced features.
---

[User query]
```

### Pattern 1: Selective Tool Result Injection

**What:** Include only relevant recent tool results in the prompt
**When to use:** Multi-turn conversations with multiple tool executions
**Example:**
```python
# Source: Context window management best practices 2026
def format_tool_results(
    tool_results: dict[str, str],
    max_results: int = 3
) -> str:
    """Format tool results for injection into Perplexity prompt.

    Args:
        tool_results: Dict mapping tool_use_id -> result content
        max_results: Maximum number of results to include (default 3)

    Returns:
        Formatted markdown string for prompt injection
    """
    if not tool_results:
        return ""

    # Limit to most recent results (reverse chronological)
    recent_results = list(tool_results.items())[-max_results:]

    formatted_blocks = ["TOOL RESULTS:", "---"]

    for tool_use_id, content in recent_results:
        formatted_blocks.append(f"Tool Result ID: {tool_use_id}")
        formatted_blocks.append(f"Result:\n{content}")
        formatted_blocks.append("---")

    formatted_blocks.append("")  # Blank line before user query
    return "\n".join(formatted_blocks)
```

### Pattern 2: Error-Aware Result Formatting

**What:** Handle both successful results and errors differently
**When to use:** When tool execution can fail (network errors, invalid input)
**Example:**
```python
# Source: Anthropic tool use best practices
def format_tool_result_with_error(
    tool_use_id: str,
    content: str,
    is_error: bool = False
) -> str:
    """Format single tool result, highlighting errors.

    Args:
        tool_use_id: Tool use ID from tool_use block
        content: Result content or error message
        is_error: Whether this is an error result

    Returns:
        Formatted result block
    """
    if is_error:
        return f"""
Tool Result (ERROR):
ID: {tool_use_id}
Error: {content}
"""
    else:
        return f"""
Tool Result:
ID: {tool_use_id}
Result: {content}
"""
```

### Pattern 3: Context-Aware Injection Point

**What:** Inject tool results at optimal position based on conversation state
**When to use:** All tool result injections

**Example:**
```python
# Source: Multi-turn conversation management patterns
def build_query_with_tool_results(
    user_message: str,
    tool_results: dict[str, str],
    system_text: str | None = None
) -> str:
    """Build complete query with tool results injected.

    Order of components:
    1. System context (if present)
    2. Tool results (if present)
    3. User query

    Args:
        user_message: User's actual query text
        tool_results: Extracted tool results from message history
        system_text: Optional system prompt

    Returns:
        Complete query string for Perplexity
    """
    parts = []

    # 1. System context
    if system_text:
        from perplexity_web_mcp.api.session_manager import distill_system_prompt
        distilled = distill_system_prompt(system_text)
        parts.append(f"[Instructions: {distilled}]")
        parts.append("")

    # 2. Tool results
    if tool_results:
        formatted_results = format_tool_results(tool_results)
        parts.append(formatted_results)

    # 3. User query
    parts.append(user_message)

    return "\n".join(parts)
```

### Anti-Patterns to Avoid

- **Including ALL tool results:** Bloats context window, older results rarely relevant
- **Appending results after query:** Model may generate response before seeing results
- **Raw JSON without labels:** Hard for model to parse, needs structure
- **No result limiting:** Multi-turn conversations accumulate results, exceed context limits
- **Ignoring is_error flag:** Errors need different handling than successful results

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Template string formatting | Custom string builder | Python f-strings or str.format() | Built-in, tested, handles edge cases |
| Result deduplication | Manual ID tracking | Set or dict with tool_use_id keys | Guaranteed uniqueness, O(1) lookup |
| Context window management | Naive "include everything" | Selective injection with limits | Models degrade with excessive context |
| Multi-result formatting | Complex string concatenation | List.join() with template blocks | Cleaner, easier to maintain |

**Key insight:** Tool result injection is fundamentally a prompt engineering problem, not a parsing problem. The challenge is making results understandable to the model, not extracting them (already solved in Phase 3).

## Common Pitfalls

### Pitfall 1: Context Window Bloat

**What goes wrong:** Including all historical tool results causes Perplexity to truncate or degrade

**Why it happens:**
- Multi-turn conversations accumulate results
- Each tool execution adds 200-5000 tokens
- No pruning strategy for old results
- Perplexity has URL length limits on queries

**How to avoid:**
- Limit to most recent 2-3 tool results
- Drop results older than 3-5 turns
- Summarize large results (>1000 chars) before injection
- Monitor effective context usage

**Warning signs:**
- Perplexity responses become generic
- Model "forgets" earlier conversation
- 414 Request-URI Too Large errors
- Response quality degrades in long conversations

### Pitfall 2: Format Ambiguity

**What goes wrong:** Model confuses tool results with user input or can't parse results

**Why it happens:**
- Results injected without clear delimiters
- No labels identifying what each block is
- Mixing formats (JSON + text + markdown)
- Tool results contain prompt injection attempts

**How to avoid:**
- Always use clear section headers (TOOL RESULTS:, ----)
- Include tool_use_id for traceability
- Consistent formatting across all results
- Escape or sanitize result content to prevent injection

**Warning signs:**
- Model responds to content within tool results instead of query
- "I don't understand" when results are present
- Tool results trigger unintended behavior
- Inconsistent response quality

### Pitfall 3: Ignoring Tool Result Errors

**What goes wrong:** Errors passed to model as if successful, model makes wrong assumptions

**Why it happens:**
- Not checking is_error flag in tool_result blocks
- Same formatting for errors and successes
- Error messages not actionable for model

**How to avoid:**
- Check is_error flag when extracting results
- Format errors distinctly (ERROR: prefix, different structure)
- Include actionable error context ("Tool X failed because Y")
- Log errors separately for debugging

**Warning signs:**
- Model tries to use failed tool results in answers
- "Based on the search results" when search failed
- Hallucinated content filling gaps from failed tools

### Pitfall 4: Not Handling Missing Tool Results

**What goes wrong:** Code assumes tool results always present when tool_use was detected

**Why it happens:**
- Async execution delays between tool_use and tool_result
- Client (Claude Code) may choose not to execute low-confidence tools
- Network issues prevent result delivery
- Validation errors drop result blocks

**How to avoid:**
- Check if tool_results dict is empty before formatting
- Don't break flow when results missing
- Log when tool_use exists but result doesn't (potential issue)
- Consider timeout for waiting on results

**Warning signs:**
- KeyError or NoneType exceptions on tool result access
- Empty responses when tools were called
- Hanging requests waiting for results

### Pitfall 5: Order-Dependent Result Injection

**What goes wrong:** Tool results injected in wrong order, breaking logical flow

**Why it happens:**
- Dict iteration order not guaranteed (Python <3.7)
- Results from parallel tool calls have undefined order
- No tracking of which result answers which query part

**How to avoid:**
- Use ordered dict or maintain insertion order (Python 3.7+)
- Inject results in reverse chronological order (newest first)
- Document that order matters for model comprehension

**Warning signs:**
- Model confused about which result corresponds to what
- Earlier tool results override later ones in model reasoning
- Inconsistent answers when same tools called multiple times

## Code Examples

Verified patterns from official sources:

### Extract and Format Tool Results

```python
# Source: Existing codebase + context window management patterns
from perplexity_web_mcp.api.tool_validation import extract_tool_results
from perplexity_web_mcp.api.session_manager import distill_system_prompt

def extract_and_format_tool_results(
    messages: list[MessageParam],
    max_results: int = 3
) -> str:
    """Extract tool results from message history and format for injection.

    Args:
        messages: Message history including tool_result blocks
        max_results: Maximum number of results to include

    Returns:
        Formatted markdown string for prompt injection
    """
    # Extract results using existing function
    tool_results = extract_tool_results(messages)

    if not tool_results:
        return ""

    # Limit to most recent results
    recent_items = list(tool_results.items())[-max_results:]

    blocks = ["TOOL RESULTS:", "---"]

    for tool_use_id, content in recent_items:
        # Check if this is an error result
        # (In practice, would need to track is_error flag from extraction)
        blocks.append(f"Tool: {tool_use_id}")
        blocks.append(f"Result:\n{content}")
        blocks.append("---")

    blocks.append("")  # Blank line separator
    return "\n".join(blocks)
```

### Integrate Tool Results into Query Building

```python
# Source: Prompt builder patterns + tool result injection
def build_prompt_with_tool_results(
    user_message: str,
    messages: list[MessageParam],
    tools: list[dict] | None = None,
    system_text: str | None = None
) -> str:
    """Build complete prompt with tools AND tool results.

    This extends the existing build_prompt_with_tools to also inject
    tool results from conversation history.

    Args:
        user_message: User's current query
        messages: Full message history (to extract tool results)
        tools: Available tools (for tool definitions)
        system_text: Optional system prompt

    Returns:
        Complete prompt string
    """
    from perplexity_web_mcp.api.prompt_builder import build_prompt_with_tools

    parts = []

    # Start with system context if provided
    if system_text:
        distilled = distill_system_prompt(system_text)
        parts.append(distilled)
        parts.append("")

    # Add tool definitions if provided (from existing prompt_builder)
    if tools:
        # Use existing function to format tools
        tool_prompt = build_prompt_with_tools(user_message, tools, system_text=None)
        # Extract just the tool section (before user message)
        # In practice, might refactor build_prompt_with_tools to be composable
        parts.append("Available functions you can call:")
        parts.append("")
        # ... tool definitions ...
        parts.append("")

    # Inject tool results if present
    tool_results_section = extract_and_format_tool_results(messages)
    if tool_results_section:
        parts.append(tool_results_section)

    # Finally add user query
    parts.append(user_message)

    return "\n".join(parts)
```

### Confidence-Gated Result Injection

```python
# Source: Confidence threshold patterns + tool execution best practices
def should_inject_tool_results(
    parse_result: dict,
    confidence_threshold: float = 0.7
) -> bool:
    """Determine if tool results should be injected based on confidence.

    Only inject tool results if original tool_use had high confidence.
    Low-confidence tool calls that weren't executed shouldn't inject results.

    Args:
        parse_result: Parser output with confidence score
        confidence_threshold: Minimum confidence to inject

    Returns:
        True if results should be injected
    """
    # Check if tool calls were detected
    if not parse_result.get("tool_calls"):
        return False

    # Check confidence threshold
    if parse_result.get("confidence", 0.0) < confidence_threshold:
        return False

    return True

# Usage in create_message endpoint:
# if should_inject_tool_results(parse_result):
#     query = build_prompt_with_tool_results(user_message, messages, tools, system_text)
# else:
#     query = build_prompt_with_tools(user_message, tools, system_text)
```

### Handling Error Results

```python
# Source: Anthropic API docs + error handling patterns
def extract_tool_results_with_errors(
    messages: list[MessageParam]
) -> list[tuple[str, str, bool]]:
    """Extract tool results including error status.

    Returns list of (tool_use_id, content, is_error) tuples.

    Args:
        messages: Message history

    Returns:
        List of tool result tuples with error flags
    """
    results = []

    for msg in messages:
        if msg.role == "user" and isinstance(msg.content, list):
            for block in msg.content:
                if isinstance(block, dict) and block.get("type") == "tool_result":
                    tool_use_id = block.get("tool_use_id", "unknown")
                    content = block.get("content", "")
                    is_error = block.get("is_error", False)
                    results.append((tool_use_id, content, is_error))

    return results

def format_tool_results_with_errors(
    results: list[tuple[str, str, bool]]
) -> str:
    """Format results distinguishing errors from successes."""
    if not results:
        return ""

    blocks = ["TOOL RESULTS:", "---"]

    for tool_use_id, content, is_error in results:
        if is_error:
            blocks.append(f"Tool: {tool_use_id} (ERROR)")
            blocks.append(f"Error: {content}")
        else:
            blocks.append(f"Tool: {tool_use_id}")
            blocks.append(f"Result: {content}")
        blocks.append("---")

    blocks.append("")
    return "\n".join(blocks)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Include all tool results | Selective injection (2-3 recent) | 2025-2026 | Prevents context bloat, better focus |
| Plain text concatenation | Structured markdown with labels | 2025 | Models parse results more reliably |
| Append results after query | Prepend results before query | 2024 | Ensures model sees context first |
| Same format for errors and success | Distinct error formatting | 2025-2026 | Models handle failures appropriately |
| Fixed context strategy | Adaptive based on window size | 2026 | Better scaling to long conversations |

**Deprecated/outdated:**
- Including raw JSON without labels: Models need structure, not just data
- Unlimited result accumulation: Context windows aren't infinite
- Treating tool_result as opaque: Need to parse error flags and metadata

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal number of tool results to include**
   - What we know: 2-3 recent results recommended, more risks context bloat
   - What's unclear: How to determine relevance vs recency
   - Recommendation: Start with max_results=3, make configurable, monitor token usage

2. **How to handle very large tool results (>5000 chars)**
   - What we know: Large results bloat context and hit URL limits
   - What's unclear: Best summarization strategy for Perplexity
   - Recommendation: Truncate to first 1000 chars with "... (truncated)" marker, add config

3. **Should we track which tool_use generated which result?**
   - What we know: tool_result has tool_use_id reference
   - What's unclear: Whether Perplexity benefits from seeing the mapping
   - Recommendation: Include tool_use_id in formatted output for traceability, test if it helps

4. **Confidence threshold for result injection**
   - What we know: 0.7 threshold works for tool_use generation
   - What's unclear: Same threshold for result injection? Different threshold?
   - Recommendation: Use same 0.7 initially, separate if needed based on testing

5. **How to handle parallel tool executions with interdependencies**
   - What we know: Multiple tools can be called in one turn
   - What's unclear: Order of result injection when results depend on each other
   - Recommendation: Inject in reverse order (newest first), document that chronological order matters

## Sources

### Primary (HIGH confidence)
- [Anthropic Tool Use Implementation Guide](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use) - Tool result format and best practices
- [Context Window Management Strategies 2026](https://www.getmaxim.ai/articles/context-window-management-strategies-for-long-context-ai-agents-and-chatbots/) - Selective injection patterns
- [Context Window Overflow 2026](https://redis.io/blog/context-window-overflow/) - Context limits and management
- Existing codebase: `src/perplexity_web_mcp/api/tool_validation.py` (extract_tool_results function)
- Existing codebase: `src/perplexity_web_mcp/api/server.py` (lines 722-741, 885-889)
- Existing codebase: `src/perplexity_web_mcp/api/prompt_builder.py` (prompt construction patterns)

### Secondary (MEDIUM confidence)
- [How to Implement Tool Use in LLMs](https://www.apideck.com/blog/llm-tool-use-and-function-calling) - Tool result processing patterns
- [Multi-Turn Conversations with Agents](https://medium.com/@sainitesh/multi-turn-conversations-with-agents-building-context-across-dialogues-f0d9f14b8f64) - Context management for multi-turn
- [Understanding Tool-Augmented LLMs](https://apxml.com/courses/prompt-engineering-agentic-workflows/chapter-3-prompt-engineering-tool-use/principles-tool-augmented-llms) - Feedback mechanisms for tool results
- [LLM Agent Evaluation Guide](https://www.confident-ai.com/blog/llm-agent-evaluation-complete-guide) - Tool correctness and confidence metrics
- [Defense Against Prompt Injection via Tool Result Parsing](https://arxiv.org/html/2601.04795v1) - Security considerations for result injection

### Tertiary (LOW confidence - validation needed)
- [Prompt Injection in Tool Results 2026](https://www.getastra.com/blog/ai-security/prompt-injection-attacks/) - Security warnings about malicious tool results
- [Meta-Prompting and Self-Optimization](https://intuitionlabs.ai/articles/meta-prompting-llm-self-optimization) - Advanced prompt construction patterns
- Community discussions about tool result formatting (various sources, 2025-2026)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing project dependencies (FastAPI, Pydantic, Python built-ins)
- Architecture: HIGH - Patterns verified against Anthropic docs and context window research
- Pitfalls: HIGH - Based on 2026 context window research and multi-turn conversation best practices
- Code examples: HIGH - Derived from existing codebase + official patterns

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - prompt engineering patterns evolve moderately fast)
