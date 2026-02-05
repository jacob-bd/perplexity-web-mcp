"""Prompt builder module for constructing complete prompts with tool injection.

This module combines system context, tool definitions, and user messages into
a complete prompt that Perplexity models can understand and potentially execute.
Tool definitions are positioned before the user message in markdown code blocks.
"""

from typing import Any

__all__ = [
    "build_prompt_with_tools",
    "inject_tools_minimal",
    "format_tool_results",
]

# Try relative imports first, fall back to absolute
try:
    from .tool_injection import format_tool_as_python, format_tools_list
    from .session_manager import distill_system_prompt
except ImportError:
    # For testing, allow absolute imports
    from perplexity_web_mcp.api.tool_injection import format_tool_as_python, format_tools_list
    from perplexity_web_mcp.api.session_manager import distill_system_prompt


def build_prompt_with_tools(
    user_message: str,
    tools: list[dict[str, Any]],
    system: str | None = None,
    tool_results: dict[str, tuple[str, bool]] | None = None
) -> str:
    """Build a complete prompt with tool definitions injected before user message.

    Constructs a prompt that starts with distilled system context (if provided),
    followed by tool definitions in a Python markdown code block with usage
    instructions, tool execution results (if provided), and finally the user's
    actual message.

    The prompt structure is:
    1. System context (distilled, if provided)
    2. Tool definitions (Python code block with functions)
    3. Tool results (formatted markdown, if provided)
    4. User message

    Args:
        user_message: The user's query or request
        tools: List of Anthropic tool schema dictionaries to inject
        system: Optional system prompt to distill and include
        tool_results: Optional dictionary mapping tool_use_id to (content, is_error) tuples.
                     When provided, formatted tool results are injected between tool
                     definitions and the user message.

    Returns:
        Complete prompt string with tools positioned before user message
    """
    # Start with an empty list of prompt components
    prompt_parts = []

    # Add distilled system context if provided
    if system:
        distilled = distill_system_prompt(system)
        if distilled:
            prompt_parts.append(distilled)
            prompt_parts.append("")  # Add blank line after system context

    # Add tool definitions if provided
    if tools:
        # Add header for available functions
        prompt_parts.append("Available functions you can call:")
        prompt_parts.append("")

        # Wrap tool definitions in markdown code block
        prompt_parts.append("```python")

        # Format each tool as a Python function
        for tool in tools:
            prompt_parts.append(format_tool_as_python(tool))
            prompt_parts.append("")  # Blank line between functions

        # Close code block
        prompt_parts.append("```")
        prompt_parts.append("")

        # Add usage instructions
        prompt_parts.append("To use a function, write: functionname(param1='value1', param2='value2')")
        prompt_parts.append("Then I'll execute it and show you the result.")
        prompt_parts.append("")  # Blank line before tool results or user message

    # Add tool results if provided
    if tool_results:
        formatted_results = format_tool_results(tool_results)
        if formatted_results:
            prompt_parts.append(formatted_results)

    # Finally add the user's actual message
    prompt_parts.append(user_message)

    # Join all parts with newlines
    return "\n".join(prompt_parts)


def inject_tools_minimal(tools: list[dict[str, Any]]) -> str:
    """Create a minimal tool injection format for testing or fallback.

    Generates a simpler format that lists tools as bullet points with
    their names and first line of description, plus simple usage instructions.
    This can be used as a fallback if the full Python format doesn't work.

    Args:
        tools: List of Anthropic tool schema dictionaries

    Returns:
        Minimal tool injection string
    """
    if not tools:
        return ""

    lines = []
    lines.append("Available tools:")
    lines.append("")

    # List each tool as a bullet point
    for tool in tools:
        name = tool.get("name", "Unknown")
        description = tool.get("description", "No description")
        # Take just the first line of description
        first_line = description.split("\n")[0] if description else "No description"
        lines.append(f"• {name}: {first_line}")

    lines.append("")
    lines.append("To use a tool, write its name followed by parameters in parentheses.")
    lines.append("Example: toolname(param='value')")

    return "\n".join(lines)


def format_tool_results(
    tool_results: dict[str, tuple[str, bool]],
    max_results: int = 3,
    max_chars_per_result: int = 1000
) -> str:
    """Format tool execution results for injection into Perplexity prompts.

    Transforms tool result dictionaries into structured markdown sections that
    Perplexity models can understand and reference. Results are labeled clearly
    with tool IDs, and errors are distinguished from successful executions.
    Large results are truncated to prevent context bloat.

    Args:
        tool_results: Dictionary mapping tool_use_id to (content, is_error) tuples.
                     The content is the result string, and is_error indicates whether
                     the result represents an error. For backward compatibility,
                     if a tuple contains only a content string without is_error,
                     it defaults to False (successful execution).
        max_results: Maximum number of results to include (default: 3).
                    When there are more results than this limit, only the most
                    recent (last N) results are included to maintain focus.
        max_chars_per_result: Maximum characters per result content (default: 1000).
                             Content exceeding this limit is truncated with a
                             "... (truncated)" marker appended.

    Returns:
        Formatted markdown string with tool results, or empty string if no results.
        The format includes:
        - "TOOL RESULTS:" header
        - Separator lines ("---")
        - For each result:
          - "Tool: {tool_use_id} (ERROR)" if error, or "Tool: {tool_use_id}" if success
          - "Error: {content}" if error, or "Result: {content}" if success
        - Trailing blank line

    Examples:
        >>> results = {
        ...     "toolu_123": ("File not found", True),
        ...     "toolu_456": ("{'status': 'ok'}", False)
        ... }
        >>> print(format_tool_results(results))
        TOOL RESULTS:
        ---
        Tool: toolu_123 (ERROR)
        Error: File not found
        ---
        Tool: toolu_456
        Result: {'status': 'ok'}
        ---
        <BLANKLINE>

        >>> # Backward compatibility - tuple with just content string
        >>> results = {"toolu_789": ("Success",)}
        >>> print(format_tool_results(results))
        TOOL RESULTS:
        ---
        Tool: toolu_789
        Result: Success
        ---
        <BLANKLINE>

        >>> # Empty dict returns empty string
        >>> format_tool_results({})
        ''
    """
    # Return empty string if no results
    if not tool_results:
        return ""

    # Limit to most recent max_results (last N items from dict)
    # Python 3.7+ guarantees dict insertion order
    if len(tool_results) > max_results:
        # Get the last max_results items
        items = list(tool_results.items())[-max_results:]
        tool_results = dict(items)

    # Build the formatted output
    lines = []
    lines.append("TOOL RESULTS:")
    lines.append("---")

    for tool_use_id, result_tuple in tool_results.items():
        # Validate tuple structure and extract content and error flag
        # Support both (content, is_error) and (content,) for backward compatibility
        if isinstance(result_tuple, tuple):
            if len(result_tuple) >= 2:
                content, is_error = result_tuple[0], result_tuple[1]
            elif len(result_tuple) == 1:
                content, is_error = result_tuple[0], False
            else:
                # Empty tuple - skip this result
                continue
        else:
            # Not a tuple - skip this result
            continue

        # Validate content is a string and is_error is a bool
        if not isinstance(content, str):
            continue
        if not isinstance(is_error, bool):
            is_error = False  # Default to success if invalid type

        # Truncate content if needed
        if len(content) > max_chars_per_result:
            content = content[:max_chars_per_result] + "... (truncated)"

        # Format based on error status
        if is_error:
            lines.append(f"Tool: {tool_use_id} (ERROR)")
            lines.append(f"Error: {content}")
        else:
            lines.append(f"Tool: {tool_use_id}")
            lines.append(f"Result: {content}")

        lines.append("---")

    # Add trailing blank line
    lines.append("")

    return "\n".join(lines)