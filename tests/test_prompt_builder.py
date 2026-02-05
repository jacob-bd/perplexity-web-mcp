"""Unit tests for the prompt builder module.

Tests that prompts are correctly constructed with tool definitions
injected before user messages, including proper formatting and positioning.
"""

import pytest
from perplexity_web_mcp.api.prompt_builder import (
    build_prompt_with_tools,
    inject_tools_minimal,
    format_tool_results,
)


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


# Tests for format_tool_results function

def test_format_tool_results_empty():
    """Test that empty dict returns empty string."""
    result = format_tool_results({})
    assert result == ""


def test_format_tool_results_single_success():
    """Test single successful result formatted correctly."""
    tool_results = {
        "toolu_abc123": ("File contents: Hello World", False)
    }
    result = format_tool_results(tool_results)

    # Should have proper structure
    assert "TOOL RESULTS:" in result
    assert "---" in result
    assert "Tool: toolu_abc123" in result
    assert "Result: File contents: Hello World" in result
    assert "(ERROR)" not in result
    assert result.endswith("\n")


def test_format_tool_results_single_error():
    """Test single error result formatted with (ERROR) marker."""
    tool_results = {
        "toolu_xyz789": ("FileNotFoundError: /path/to/file.txt not found", True)
    }
    result = format_tool_results(tool_results)

    # Should have error markers
    assert "TOOL RESULTS:" in result
    assert "Tool: toolu_xyz789 (ERROR)" in result
    assert "Error: FileNotFoundError: /path/to/file.txt not found" in result
    assert "Result:" not in result


def test_format_tool_results_multiple():
    """Test multiple results formatted with separators."""
    tool_results = {
        "toolu_001": ("First result", False),
        "toolu_002": ("Second result", False),
        "toolu_003": ("Third result", False)
    }
    result = format_tool_results(tool_results)

    # Should have all results
    assert "Tool: toolu_001" in result
    assert "Result: First result" in result
    assert "Tool: toolu_002" in result
    assert "Result: Second result" in result
    assert "Tool: toolu_003" in result
    assert "Result: Third result" in result

    # Should have separators between results
    assert result.count("---") == 4  # Opening + 3 separators after each result


def test_format_tool_results_max_limit():
    """Test that more than max_results only includes most recent N."""
    tool_results = {
        "toolu_001": ("Result 1", False),
        "toolu_002": ("Result 2", False),
        "toolu_003": ("Result 3", False),
        "toolu_004": ("Result 4", False),
        "toolu_005": ("Result 5", False)
    }
    result = format_tool_results(tool_results, max_results=3)

    # Should only include last 3 results (most recent)
    assert "toolu_001" not in result
    assert "toolu_002" not in result
    assert "toolu_003" in result
    assert "toolu_004" in result
    assert "toolu_005" in result

    # Should have exactly 3 results + header separator
    assert result.count("---") == 4


def test_format_tool_results_truncation():
    """Test large content truncated to max_chars with marker."""
    large_content = "x" * 1500  # Content larger than default max_chars (1000)
    tool_results = {
        "toolu_large": (large_content, False)
    }
    result = format_tool_results(tool_results, max_chars_per_result=1000)

    # Should be truncated
    assert "... (truncated)" in result
    # Should have exactly max_chars + truncation marker
    result_line = [line for line in result.split("\n") if line.startswith("Result:")][0]
    # Remove "Result: " prefix (8 chars)
    content_part = result_line[8:]
    assert len(content_part) == 1000 + len("... (truncated)")
    assert content_part.startswith("x" * 1000)


def test_format_tool_results_mixed_success_error():
    """Test mixed success/error results formatted distinctly."""
    tool_results = {
        "toolu_success1": ("Operation completed successfully", False),
        "toolu_error1": ("Permission denied", True),
        "toolu_success2": ("Data retrieved", False)
    }
    result = format_tool_results(tool_results)

    # Success results should not have ERROR marker
    assert "Tool: toolu_success1\n" in result or "Tool: toolu_success1 (ERROR)" not in result
    assert "Result: Operation completed successfully" in result
    assert "Result: Data retrieved" in result

    # Error result should have ERROR marker
    assert "Tool: toolu_error1 (ERROR)" in result
    assert "Error: Permission denied" in result


def test_format_tool_results_order_preservation():
    """Test that most recent results included when limiting."""
    # Python 3.7+ guarantees dict insertion order
    tool_results = {
        "toolu_first": ("First", False),
        "toolu_second": ("Second", False),
        "toolu_third": ("Third", False),
        "toolu_fourth": ("Fourth", False)
    }
    result = format_tool_results(tool_results, max_results=2)

    # Should only have the last 2 (most recent) results
    assert "toolu_first" not in result
    assert "toolu_second" not in result
    assert "toolu_third" in result
    assert "toolu_fourth" in result

    # Verify order is preserved (third before fourth)
    third_pos = result.find("toolu_third")
    fourth_pos = result.find("toolu_fourth")
    assert third_pos < fourth_pos


# Tests for build_prompt_with_tools with tool_results parameter

def test_prompt_with_tool_results():
    """Test building a prompt with tool results injected."""
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
        }
    ]

    tool_results = {
        "toolu_abc123": ("File contents: Hello World", False)
    }

    user_message = "Summarize the file contents"
    result = build_prompt_with_tools(user_message, tools, tool_results=tool_results)

    # Tool definitions should appear first
    assert "Available functions you can call:" in result
    assert "def Read(path: str):" in result

    # Tool results should appear after tools but before user message
    assert "TOOL RESULTS:" in result
    assert "Tool: toolu_abc123" in result
    assert "Result: File contents: Hello World" in result

    # User message should be at the end
    assert result.endswith(user_message)

    # Verify order: tools -> results -> user message
    tools_pos = result.find("Available functions")
    results_pos = result.find("TOOL RESULTS:")
    message_pos = result.find(user_message)
    assert tools_pos < results_pos < message_pos


def test_prompt_with_tool_results_and_system():
    """Test building a prompt with system, tools, and tool results."""
    tools = [
        {
            "name": "Write",
            "description": "Write a file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "content": {"type": "string"}
                },
                "required": ["path", "content"]
            }
        }
    ]

    tool_results = {
        "toolu_write1": ("File written successfully", False)
    }

    system_prompt = "You are a helpful assistant."
    user_message = "Continue with the next step"
    result = build_prompt_with_tools(
        user_message, tools, system=system_prompt, tool_results=tool_results
    )

    # All components should be present
    assert "Available functions you can call:" in result
    assert "TOOL RESULTS:" in result
    assert result.endswith(user_message)


def test_prompt_without_tool_results():
    """Test that prompt building works without tool_results (backward compatibility)."""
    tools = [
        {
            "name": "Search",
            "description": "Search",
            "input_schema": {
                "type": "object",
                "properties": {"query": {"type": "string"}},
                "required": ["query"]
            }
        }
    ]

    user_message = "Find information"
    result = build_prompt_with_tools(user_message, tools)

    # Should work without tool_results
    assert "Available functions you can call:" in result
    assert "def Search(query: str):" in result
    assert "TOOL RESULTS:" not in result
    assert result.endswith(user_message)


def test_prompt_with_empty_tool_results():
    """Test that empty tool_results dict doesn't add results section."""
    tools = [
        {
            "name": "Test",
            "description": "Test tool",
            "input_schema": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    ]

    user_message = "Test message"
    result = build_prompt_with_tools(user_message, tools, tool_results={})

    # Empty dict should not add results section
    assert "TOOL RESULTS:" not in result
    assert result.endswith(user_message)


def test_prompt_with_multiple_tool_results():
    """Test building prompt with multiple tool results."""
    tools = [
        {
            "name": "Read",
            "description": "Read file",
            "input_schema": {
                "type": "object",
                "properties": {"path": {"type": "string"}},
                "required": ["path"]
            }
        },
        {
            "name": "Write",
            "description": "Write file",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "content": {"type": "string"}
                },
                "required": ["path", "content"]
            }
        }
    ]

    tool_results = {
        "toolu_read1": ("File contents here", False),
        "toolu_write1": ("File written", False),
        "toolu_read2": ("More contents", False)
    }

    user_message = "Process the results"
    result = build_prompt_with_tools(user_message, tools, tool_results=tool_results)

    # All tool results should be present
    assert "Tool: toolu_read1" in result
    assert "Result: File contents here" in result
    assert "Tool: toolu_write1" in result
    assert "Result: File written" in result
    assert "Tool: toolu_read2" in result
    assert "Result: More contents" in result

    # Results should be between tools and message
    tools_pos = result.find("Available functions")
    results_start = result.find("TOOL RESULTS:")
    message_pos = result.find(user_message)
    assert tools_pos < results_start < message_pos


def test_prompt_with_error_tool_results():
    """Test building prompt with error tool results."""
    tools = [
        {
            "name": "Read",
            "description": "Read file",
            "input_schema": {
                "type": "object",
                "properties": {"path": {"type": "string"}},
                "required": ["path"]
            }
        }
    ]

    tool_results = {
        "toolu_error1": ("FileNotFoundError: File does not exist", True)
    }

    user_message = "Try again with a different file"
    result = build_prompt_with_tools(user_message, tools, tool_results=tool_results)

    # Error should be marked appropriately
    assert "Tool: toolu_error1 (ERROR)" in result
    assert "Error: FileNotFoundError: File does not exist" in result
    assert result.endswith(user_message)