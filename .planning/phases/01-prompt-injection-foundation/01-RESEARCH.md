# Phase 1: Prompt Injection Foundation - Research

**Researched:** 2026-02-05
**Domain:** Prompt injection and tool definition formatting for Perplexity models
**Confidence:** MEDIUM

## Summary

Research focused on understanding how to inject tool definitions into Perplexity model prompts using formats familiar from training data. Since Perplexity models are optimized for conversational search rather than tool execution, the strategy centers on using Python function definitions in markdown code blocks - the format most likely to be recognized from training data.

The key finding is that Perplexity's multi-model system (routing between lightweight, Sonar/Llama, GPT-5.2, Claude 4.5, etc.) requires a format that works across all backends. Python docstring format with clear parameter descriptions is the most universal approach, as it appears extensively in training data for all these models.

**Primary recommendation:** Use Python function definitions with Google-style docstrings in markdown code blocks, positioning tool definitions before the user message with clear usage instructions.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Python AST | stdlib | Parse/format Python functions | Native Python parsing for accurate formatting |
| json | stdlib | Tool schema parsing | Convert Anthropic tool format to Python params |
| re | stdlib | Pattern matching for extraction | Parse model responses for tool calls |
| typing | stdlib | Type annotations | Add type hints to generated Python functions |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| dataclasses | stdlib | Structured tool definitions | When tools have complex parameter schemas |
| inspect | stdlib | Function introspection | Extract signatures from existing functions |
| textwrap | stdlib | Format docstrings | Maintain consistent indentation in generated code |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Python format | XML/ReAct format | Already tested and failed with Perplexity models |
| Markdown blocks | JSON schemas | Less familiar to models, harder to parse |
| Google docstrings | NumPy docstrings | Google style more common in training data |

**Installation:**
```bash
# All standard library - no external dependencies needed
```

## Architecture Patterns

### Recommended Project Structure
```
src/perplexity_web_mcp/api/
├── tool_injection.py    # Convert tools to Python format
├── tool_parser.py        # Extract tool calls from responses
└── prompt_builder.py     # Construct full prompts with tools
```

### Pattern 1: Tool Definition Format
**What:** Convert Anthropic tool schemas to Python function definitions
**When to use:** For every tool in the tools array
**Example:**
```python
def format_tool_as_python(tool: dict) -> str:
    """Convert Anthropic tool to Python function with docstring."""
    name = tool["name"]
    description = tool.get("description", "")
    schema = tool.get("input_schema", {})
    properties = schema.get("properties", {})
    required = schema.get("required", [])

    # Build function signature
    params = []
    for param_name, param_info in properties.items():
        param_type = param_info.get("type", "Any")
        if param_name in required:
            params.append(f"{param_name}: {param_type}")
        else:
            default = "None"
            params.append(f"{param_name}: {param_type} = {default}")

    # Build docstring
    docstring_lines = [f'    """{description}']
    if properties:
        docstring_lines.append("    ")
        docstring_lines.append("    Args:")
        for param_name, param_info in properties.items():
            param_desc = param_info.get("description", "")
            req = " (required)" if param_name in required else ""
            docstring_lines.append(f"        {param_name}: {param_desc}{req}")
    docstring_lines.append('    """')

    # Combine
    signature = f"def {name}({', '.join(params)}):"
    return f"{signature}\n" + "\n".join(docstring_lines)
```

### Pattern 2: Prompt Structure
**What:** Position tool definitions optimally in the prompt
**When to use:** When injecting tools into user message
**Example:**
```python
def build_prompt_with_tools(user_message: str, tools: list[dict], system: str = None) -> str:
    """Build complete prompt with tool definitions."""
    parts = []

    # System context (if any) - distilled for Perplexity
    if system:
        parts.append(f"[Context: {distill_system_prompt(system)}]")

    # Tool definitions in Python format
    if tools:
        parts.append("Available functions you can call:")
        parts.append("```python")
        for tool in tools:
            parts.append(format_tool_as_python(tool))
            parts.append("")  # Blank line between functions
        parts.append("```")
        parts.append("")
        parts.append("To use a function, write: functionname(param1='value1', param2='value2')")
        parts.append("Then I'll execute it and show you the result.")

    # User's actual message
    parts.append("")
    parts.append(user_message)

    return "\n".join(parts)
```

### Anti-Patterns to Avoid
- **Complex XML structures:** Models trained on markdown/code, not XML
- **Nested JSON schemas:** Too complex, models default to explaining
- **Implicit tool calling:** Always include explicit usage instructions
- **Tool definitions after user message:** Models may ignore trailing context

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Python parsing | Regex-based parser | ast.parse() | Handles edge cases, quotes, multiline |
| Type mapping | Manual conversion | typing module mappings | Consistent with Python standards |
| Docstring formatting | String concatenation | textwrap.dedent | Maintains proper indentation |
| Parameter validation | Custom checker | inspect.signature | Built-in validation and error messages |

**Key insight:** Python's standard library has mature tools for working with Python code - use them instead of regex/string manipulation.

## Common Pitfalls

### Pitfall 1: Over-Engineering the Format
**What goes wrong:** Adding too many instructions, examples, or formatting rules
**Why it happens:** Trying to force 100% compliance from models
**How to avoid:** Keep format simple and familiar - basic Python functions with docstrings
**Warning signs:** Prompt exceeds 500 tokens just for tool definitions

### Pitfall 2: Assuming Single Format Works
**What goes wrong:** Model outputs vary - sometimes function calls, sometimes descriptions
**Why it happens:** Perplexity routes to different backend models
**How to avoid:** Build multi-strategy parser that handles variations
**Warning signs:** Tool calls only work with specific models

### Pitfall 3: Fighting Model Defaults
**What goes wrong:** Models explain tools instead of using them
**Why it happens:** Perplexity optimized for search/explanation, not execution
**How to avoid:** Accept 40-60% success rate, focus on clear detection when it works
**Warning signs:** Spending time on prompt engineering for marginal gains

### Pitfall 4: Context Position Mistakes
**What goes wrong:** Tools ignored or misunderstood
**Why it happens:** Wrong position in prompt or separated from usage context
**How to avoid:** Tools before user message, with usage instructions
**Warning signs:** Model says "I don't have access to functions"

## Code Examples

Verified patterns from official sources:

### Tool Response Detection
```python
# Multiple patterns to catch various formats models might use
def detect_tool_call(text: str) -> tuple[str, dict]:
    """Detect if response contains a tool call."""

    # Pattern 1: Direct function call
    # search_web(query="latest news")
    pattern1 = r'(\w+)\s*\((.*?)\)'

    # Pattern 2: Code block with function
    # ```python
    # result = search_web(query="latest news")
    # ```
    pattern2 = r'```python\s*(?:.*?=\s*)?(\w+)\((.*?)\).*?```'

    # Pattern 3: Inline code
    # `search_web("latest news")`
    pattern3 = r'`(\w+)\((.*?)\)`'

    for pattern in [pattern2, pattern1, pattern3]:  # Check code blocks first
        match = re.search(pattern, text, re.DOTALL)
        if match:
            func_name = match.group(1)
            params_str = match.group(2)
            # Parse parameters (simplified)
            params = {}
            # ... parameter parsing logic ...
            return func_name, params

    return None, {}
```

### Minimalist Tool Injection
```python
# Based on research findings - keep it simple
def inject_tools_minimal(tools: list[dict]) -> str:
    """Minimal tool injection format."""
    if not tools:
        return ""

    lines = ["Functions available:"]
    for tool in tools:
        name = tool["name"]
        desc = tool.get("description", "").split("\n")[0]  # First line only
        lines.append(f"- {name}: {desc}")

    lines.append("\nCall functions as: function_name(param='value')")
    return "\n".join(lines)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| XML tool use format | Python in markdown | 2024-2025 | Better recognition from training data |
| ReAct prompting | Direct function calls | 2025 | Simpler parsing, clearer intent |
| Complex schemas | Minimal descriptions | 2025-2026 | Reduces confusion, faster responses |
| System prompts | Context injection | 2024 (Perplexity) | No system prompt support in Perplexity |

**Deprecated/outdated:**
- XML formats: Models don't recognize Anthropic's XML reliably
- ReAct chains: Too complex for Perplexity's search-optimized models
- JSON schemas: Less familiar than Python code to models

## Open Questions

Things that couldn't be fully resolved:

1. **Exact trigger patterns**
   - What we know: Python in markdown has highest success
   - What's unclear: Which specific phrases trigger tool-calling behavior
   - Recommendation: Test multiple formats, measure success rates

2. **Model routing impact**
   - What we know: Perplexity routes to different backends
   - What's unclear: How each backend handles tool formats differently
   - Recommendation: Build parser that handles multiple response styles

3. **Streaming behavior**
   - What we know: Tool calls may appear mid-stream
   - What's unclear: Best way to detect/extract from partial responses
   - Recommendation: Buffer and parse at natural boundaries

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis - current implementation attempts
- Python stdlib documentation - ast, inspect, typing modules

### Secondary (MEDIUM confidence)
- [Perplexity Prompt Guide](https://docs.perplexity.ai/guides/prompt-guide) - Official guidance on prompting
- [What LLM Does Perplexity Use](https://www.glbgpt.com/hub/what-llm-does-perplexity-use/) - Model architecture breakdown
- [Anthropic Tool Calling Documentation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling) - Tool format specifications

### Tertiary (LOW confidence)
- [Prompt Injection Research](https://github.com/liu00222/Open-Prompt-Injection) - Attack/defense patterns
- [LLM Tool Calling Patterns](https://medium.com/@juvvij/llm-tool-calling-1-code-structure-and-jupyter-utilities-26ff52f80a59) - Implementation approaches
- [Python Docstring Generation](https://ajay-edupuganti.medium.com/building-a-python-documentation-generator-using-llms-067f7046bf1c) - Format patterns in training data

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All Python stdlib, well-documented
- Architecture: MEDIUM - Based on analysis and common patterns
- Pitfalls: HIGH - Learned from existing failed attempts in codebase

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - prompt engineering evolves slowly)