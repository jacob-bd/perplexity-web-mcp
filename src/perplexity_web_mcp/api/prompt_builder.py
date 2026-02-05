"""Prompt builder module for constructing complete prompts with tool injection.

This module combines system context, tool definitions, and user messages into
a complete prompt that Perplexity models can understand and potentially execute.
Tool definitions are positioned before the user message in markdown code blocks.
"""

from typing import Any

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
    system: str | None = None
) -> str:
    """Build a complete prompt with tool definitions injected before user message.

    Constructs a prompt that starts with distilled system context (if provided),
    followed by tool definitions in a Python markdown code block with usage
    instructions, and finally the user's actual message.

    Args:
        user_message: The user's query or request
        tools: List of Anthropic tool schema dictionaries to inject
        system: Optional system prompt to distill and include

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
        prompt_parts.append("")  # Blank line before user message

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