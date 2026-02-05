"""Tool definition formatting module for prompt injection.

Converts Anthropic tool schemas to Python function definitions
with Google-style docstrings, making them more likely to trigger
trained tool-use behaviors in models.
"""

from typing import Any


def format_tool_as_python(tool: dict[str, Any]) -> str:
    """Convert Anthropic tool schema to Python function definition.

    Takes a tool dictionary with name, description, and input_schema,
    then formats it as a Python function with Google-style docstring.

    Args:
        tool: Anthropic tool schema dictionary containing:
            - name: Function name
            - description: Tool description
            - input_schema: JSON schema for parameters

    Returns:
        String containing formatted Python function definition
    """
    name = tool["name"]
    description = tool.get("description", "")
    schema = tool.get("input_schema", {})
    properties = schema.get("properties", {})
    required = schema.get("required", [])

    # Build function signature with typed parameters
    params = []
    for param_name, param_info in properties.items():
        # Map JSON types to Python types
        json_type = param_info.get("type", "Any")
        python_type = {
            "string": "str",
            "integer": "int",
            "number": "float",
            "boolean": "bool",
            "array": "list",
            "object": "dict",
            "null": "None"
        }.get(json_type, "Any")

        # Required params have no default, optional get = None
        if param_name in required:
            params.append(f"{param_name}: {python_type}")
        else:
            params.append(f"{param_name}: {python_type} = None")

    # Build Google-style docstring
    docstring_lines = [f'    """{description}']

    # Add Args section if there are parameters
    if properties:
        docstring_lines.append("")
        docstring_lines.append("    Args:")
        for param_name, param_info in properties.items():
            param_desc = param_info.get("description", "")
            # Mark required parameters
            req_marker = " (required)" if param_name in required else ""
            # Map type for docstring
            json_type = param_info.get("type", "Any")
            python_type = {
                "string": "str",
                "integer": "int",
                "number": "float",
                "boolean": "bool",
                "array": "list",
                "object": "dict",
                "null": "None"
            }.get(json_type, "Any")
            docstring_lines.append(f"        {param_name} ({python_type}): {param_desc}{req_marker}")

    # Add Returns section if appropriate
    docstring_lines.append("")
    docstring_lines.append("    Returns:")
    docstring_lines.append("        Result of the tool execution")

    docstring_lines.append('    """')

    # Combine signature and docstring
    if params:
        signature = f"def {name}({', '.join(params)}):"
    else:
        # Handle tools with no parameters
        signature = f"def {name}():"

    # Add a pass statement for valid Python syntax
    body = "    pass"

    return f"{signature}\n" + "\n".join(docstring_lines) + f"\n{body}"


def format_tools_list(tools: list[dict[str, Any]]) -> str:
    """Format a list of tools as Python function definitions.

    Takes a list of Anthropic tool schemas and formats each one
    as a Python function, joining them with blank lines.

    Args:
        tools: List of Anthropic tool schema dictionaries

    Returns:
        String containing all tool definitions separated by blank lines
    """
    if not tools:
        return ""

    # Format each tool
    formatted_tools = []

    # Add a header comment to indicate these are available tools
    formatted_tools.append("# Available Tools")
    formatted_tools.append("# The following functions can be called to interact with the system:\n")

    # Format each tool as a Python function
    for tool in tools:
        formatted_tools.append(format_tool_as_python(tool))

    # Join with blank lines between functions
    return "\n\n".join(formatted_tools)