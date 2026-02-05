"""Unit tests for the prompt builder module.

Tests that prompts are correctly constructed with tool definitions
injected before user messages, including proper formatting and positioning.
"""

import pytest
from src.perplexity_web_mcp.api.prompt_builder import build_prompt_with_tools, inject_tools_minimal


def test_prompt_with_tools_no_system():
    """Test building a prompt with tools but no system message."""
    tools = [
        {
            "name": "Read",
            "description": "Read a file from the filesystem",
            "input_schema": {
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Path to the file to read"
                    }
                },
                "required": ["file_path"]
            }
        }
    ]

    user_message = "Please read the config file"
    result = build_prompt_with_tools(user_message, tools)

    # Tool definitions should appear before user message
    assert "Available functions you can call:" in result
    assert "```python" in result
    assert "def Read(file_path: str):" in result
    assert "```" in result
    assert result.endswith(user_message)

    # Usage instructions should be present
    assert "To use a function, write:" in result
    assert "Then I'll execute it and show you the result." in result


def test_prompt_with_tools_and_system():
    """Test building a prompt with both tools and system message."""
    tools = [
        {
            "name": "Write",
            "description": "Write content to a file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path"},
                    "content": {"type": "string", "description": "Content to write"}
                },
                "required": ["path", "content"]
            }
        }
    ]

    system_prompt = "You are a helpful assistant."
    user_message = "Write a greeting to hello.txt"
    result = build_prompt_with_tools(user_message, tools, system=system_prompt)

    # System prompt should be distilled and appear first
    # The actual distilled content depends on session_manager implementation
    lines = result.split("\n")

    # Tools should appear after system context
    assert "Available functions you can call:" in result
    assert "def Write(path: str, content: str):" in result
    assert result.endswith(user_message)


def test_prompt_with_empty_tools_list():
    """Test that empty tools list just returns user message."""
    user_message = "Hello, how are you?"
    result = build_prompt_with_tools(user_message, [])

    # Should just be the user message when no tools
    assert result == user_message


def test_prompt_with_multiple_tools():
    """Test building a prompt with multiple tools."""
    tools = [
        {
            "name": "Read",
            "description": "Read a file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path"}
                },
                "required": ["path"]
            }
        },
        {
            "name": "Write",
            "description": "Write a file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path"},
                    "content": {"type": "string", "description": "Content"}
                },
                "required": ["path", "content"]
            }
        },
        {
            "name": "Delete",
            "description": "Delete a file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File path"}
                },
                "required": ["path"]
            }
        }
    ]

    user_message = "Manage these files"
    result = build_prompt_with_tools(user_message, tools)

    # All tools should be present
    assert "def Read(path: str):" in result
    assert "def Write(path: str, content: str):" in result
    assert "def Delete(path: str):" in result

    # Should be in a single code block
    assert result.count("```python") == 1
    assert result.count("```") == 2  # Opening and closing


def test_minimal_injection_format():
    """Test the minimal tool injection format."""
    tools = [
        {
            "name": "Calculator",
            "description": "Perform mathematical calculations\nSupports basic operations",
            "input_schema": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "Math expression"}
                },
                "required": ["expression"]
            }
        },
        {
            "name": "Search",
            "description": "Search the web for information",
            "input_schema": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"}
                },
                "required": ["query"]
            }
        }
    ]

    result = inject_tools_minimal(tools)

    # Should have bullet points
    assert "Available tools:" in result
    assert "• Calculator: Perform mathematical calculations" in result
    assert "• Search: Search the web for information" in result

    # Should have usage instructions
    assert "To use a tool, write its name followed by parameters" in result
    assert "Example: toolname(param='value')" in result

    # Should only use first line of description
    assert "Supports basic operations" not in result


def test_tools_appear_before_user_message():
    """Verify that tool definitions always appear before the user message."""
    tools = [
        {
            "name": "TestTool",
            "description": "A test tool",
            "input_schema": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    ]

    user_message = "This is my question that should appear at the end"
    result = build_prompt_with_tools(user_message, tools)

    # Find positions
    tools_pos = result.find("Available functions")
    code_block_pos = result.find("```python")
    usage_pos = result.find("To use a function")
    message_pos = result.find(user_message)

    # Tools should come before user message
    assert tools_pos < message_pos
    assert code_block_pos < message_pos
    assert usage_pos < message_pos

    # User message should be at the very end
    assert result.endswith(user_message)


def test_markdown_code_block_formatting():
    """Verify that tool definitions are properly wrapped in markdown code blocks."""
    tools = [
        {
            "name": "Example",
            "description": "An example function",
            "input_schema": {
                "type": "object",
                "properties": {
                    "param": {"type": "string", "description": "A parameter"}
                },
                "required": []
            }
        }
    ]

    result = build_prompt_with_tools("Test message", tools)

    # Should have proper markdown code block
    assert "```python" in result
    assert "```\n" in result  # Closing block

    # Function definition should be inside the code block
    lines = result.split("\n")
    in_code_block = False
    found_function = False

    for line in lines:
        if line == "```python":
            in_code_block = True
        elif line == "```":
            in_code_block = False
        elif "def Example" in line and in_code_block:
            found_function = True

    assert found_function, "Function definition should be inside code block"


def test_minimal_injection_with_empty_tools():
    """Test minimal injection with empty tools list."""
    result = inject_tools_minimal([])
    assert result == ""


def test_prompt_with_optional_parameters():
    """Test building prompt with tools that have optional parameters."""
    tools = [
        {
            "name": "Search",
            "description": "Search for information",
            "input_schema": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"},
                    "limit": {"type": "integer", "description": "Max results"},
                    "sort": {"type": "string", "description": "Sort order"}
                },
                "required": ["query"]  # Only query is required
            }
        }
    ]

    result = build_prompt_with_tools("Find something", tools)

    # Should show required and optional params differently
    assert "def Search(query: str, limit: int = None, sort: str = None):" in result
    assert "query (str): Search query (required)" in result
    assert "limit (int): Max results" in result  # No (required) marker
    assert "sort (str): Sort order" in result  # No (required) marker


def test_tools_with_no_parameters():
    """Test building prompt with tools that have no parameters."""
    tools = [
        {
            "name": "GetTime",
            "description": "Get the current time",
            "input_schema": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    ]

    result = build_prompt_with_tools("What time is it?", tools)

    # Should handle no-param functions correctly
    assert "def GetTime():" in result
    # No Args section when there are no parameters (correct Google-style)
    assert "Returns:" in result  # But should still have Returns section


def test_tool_with_complex_types():
    """Test building prompt with tools that have complex parameter types."""
    tools = [
        {
            "name": "ProcessData",
            "description": "Process structured data",
            "input_schema": {
                "type": "object",
                "properties": {
                    "data": {"type": "object", "description": "Data object"},
                    "items": {"type": "array", "description": "List of items"},
                    "flag": {"type": "boolean", "description": "Processing flag"},
                    "count": {"type": "number", "description": "Item count"}
                },
                "required": ["data"]
            }
        }
    ]

    result = build_prompt_with_tools("Process this", tools)

    # Should map JSON types to Python types
    assert "def ProcessData(data: dict, items: list = None, flag: bool = None, count: float = None):" in result
    assert "data (dict): Data object (required)" in result
    assert "items (list): List of items" in result
    assert "flag (bool): Processing flag" in result
    assert "count (float): Item count" in result