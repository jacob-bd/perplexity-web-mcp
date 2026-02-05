"""Unit tests for tool injection module."""

import pytest
from src.perplexity_web_mcp.api.tool_injection import (
    format_tool_as_python,
    format_tools_list
)


class TestFormatToolAsPython:
    """Test format_tool_as_python function."""

    def test_simple_tool_one_required_param(self):
        """Test formatting a simple tool with one required parameter."""
        tool = {
            "name": "get_weather",
            "description": "Get the weather for a location",
            "input_schema": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                    }
                },
                "required": ["location"]
            }
        }

        result = format_tool_as_python(tool)

        assert "def get_weather(location: str):" in result
        assert '"""Get the weather for a location' in result
        assert "Args:" in result
        assert "location (str): The city and state, e.g. San Francisco, CA (required)" in result
        assert "Returns:" in result
        assert "pass" in result

    def test_tool_multiple_params_mixed_required(self):
        """Test tool with multiple parameters, mix of required and optional."""
        tool = {
            "name": "search_documents",
            "description": "Search through documents",
            "input_schema": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Maximum results to return"
                    },
                    "include_metadata": {
                        "type": "boolean",
                        "description": "Whether to include metadata"
                    }
                },
                "required": ["query"]
            }
        }

        result = format_tool_as_python(tool)

        assert "def search_documents(query: str, limit: int = None, include_metadata: bool = None):" in result
        assert "query (str): Search query (required)" in result
        assert "limit (int): Maximum results to return" in result
        assert "include_metadata (bool): Whether to include metadata" in result

    def test_tool_no_parameters(self):
        """Test tool with no parameters."""
        tool = {
            "name": "get_current_time",
            "description": "Get the current time",
            "input_schema": {
                "type": "object",
                "properties": {}
            }
        }

        result = format_tool_as_python(tool)

        assert "def get_current_time():" in result
        assert '"""Get the current time' in result
        assert "Returns:" in result
        # No Args section for parameterless function
        assert "Args:" not in result

    def test_tool_with_nested_schema(self):
        """Test tool with complex nested schema."""
        tool = {
            "name": "create_event",
            "description": "Create a calendar event",
            "input_schema": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Event title"
                    },
                    "details": {
                        "type": "object",
                        "description": "Event details object"
                    },
                    "attendees": {
                        "type": "array",
                        "description": "List of attendees"
                    }
                },
                "required": ["title", "details"]
            }
        }

        result = format_tool_as_python(tool)

        assert "def create_event(title: str, details: dict, attendees: list = None):" in result
        assert "title (str): Event title (required)" in result
        assert "details (dict): Event details object (required)" in result
        assert "attendees (list): List of attendees" in result

    def test_tool_with_array_object_types(self):
        """Test tool with array and object parameter types."""
        tool = {
            "name": "process_data",
            "description": "Process complex data",
            "input_schema": {
                "type": "object",
                "properties": {
                    "items": {
                        "type": "array",
                        "description": "Array of items to process"
                    },
                    "config": {
                        "type": "object",
                        "description": "Configuration object"
                    },
                    "count": {
                        "type": "number",
                        "description": "Number of items"
                    }
                },
                "required": ["items"]
            }
        }

        result = format_tool_as_python(tool)

        assert "def process_data(items: list, config: dict = None, count: float = None):" in result
        assert "items (list): Array of items to process (required)" in result
        assert "config (dict): Configuration object" in result
        assert "count (float): Number of items" in result

    def test_tool_missing_description(self):
        """Test tool with missing description field."""
        tool = {
            "name": "simple_tool",
            "input_schema": {
                "type": "object",
                "properties": {
                    "param": {
                        "type": "string"
                    }
                },
                "required": ["param"]
            }
        }

        result = format_tool_as_python(tool)

        assert "def simple_tool(param: str):" in result
        assert '"""' in result  # Empty description still gets docstring
        assert "param (str):" in result

    def test_type_mapping(self):
        """Test that JSON types map correctly to Python types."""
        tool = {
            "name": "test_types",
            "description": "Test type mapping",
            "input_schema": {
                "type": "object",
                "properties": {
                    "str_param": {"type": "string", "description": "String param"},
                    "int_param": {"type": "integer", "description": "Integer param"},
                    "float_param": {"type": "number", "description": "Float param"},
                    "bool_param": {"type": "boolean", "description": "Boolean param"},
                    "list_param": {"type": "array", "description": "List param"},
                    "dict_param": {"type": "object", "description": "Dict param"},
                    "null_param": {"type": "null", "description": "Null param"},
                    "unknown_param": {"type": "unknown", "description": "Unknown type"}
                },
                "required": []
            }
        }

        result = format_tool_as_python(tool)

        assert "str_param: str = None" in result
        assert "int_param: int = None" in result
        assert "float_param: float = None" in result
        assert "bool_param: bool = None" in result
        assert "list_param: list = None" in result
        assert "dict_param: dict = None" in result
        assert "null_param: None = None" in result
        assert "unknown_param: Any = None" in result


class TestFormatToolsList:
    """Test format_tools_list function."""

    def test_empty_tools_list(self):
        """Test formatting an empty tools list."""
        result = format_tools_list([])
        assert result == ""

    def test_single_tool(self):
        """Test formatting a single tool."""
        tools = [
            {
                "name": "get_time",
                "description": "Get current time",
                "input_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        ]

        result = format_tools_list(tools)

        assert "# Available Tools" in result
        assert "# The following functions can be called" in result
        assert "def get_time():" in result

    def test_multiple_tools(self):
        """Test formatting multiple tools."""
        tools = [
            {
                "name": "tool_one",
                "description": "First tool",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "param1": {"type": "string", "description": "First param"}
                    },
                    "required": ["param1"]
                }
            },
            {
                "name": "tool_two",
                "description": "Second tool",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "param2": {"type": "integer", "description": "Second param"}
                    },
                    "required": []
                }
            }
        ]

        result = format_tools_list(tools)

        # Check header
        assert "# Available Tools" in result
        assert "# The following functions can be called" in result

        # Check both tools are present
        assert "def tool_one(param1: str):" in result
        assert "def tool_two(param2: int = None):" in result

        # Check they're separated by blank lines
        lines = result.split("\n")
        # Find blank lines between functions
        blank_count = sum(1 for line in lines if line == "")
        assert blank_count >= 2  # At least 2 blank lines for separation

    def test_tools_formatting_consistency(self):
        """Test that multiple tools maintain consistent formatting."""
        tools = [
            {
                "name": f"tool_{i}",
                "description": f"Tool number {i}",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        f"param_{i}": {"type": "string", "description": f"Parameter {i}"}
                    },
                    "required": [f"param_{i}"]
                }
            }
            for i in range(3)
        ]

        result = format_tools_list(tools)

        # All tools should have consistent structure
        assert "def tool_0(param_0: str):" in result
        assert "def tool_1(param_1: str):" in result
        assert "def tool_2(param_2: str):" in result

        # All should have docstrings
        assert result.count('"""') == 6  # 3 tools × 2 quotes per docstring

    def test_complex_tools_list(self):
        """Test a realistic set of tools like Read, Write, Bash."""
        tools = [
            {
                "name": "Read",
                "description": "Read a file from the filesystem",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "file_path": {
                            "type": "string",
                            "description": "The path to the file to read"
                        },
                        "offset": {
                            "type": "integer",
                            "description": "Line number to start reading from"
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Number of lines to read"
                        }
                    },
                    "required": ["file_path"]
                }
            },
            {
                "name": "Write",
                "description": "Write content to a file",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "file_path": {
                            "type": "string",
                            "description": "The path to write to"
                        },
                        "content": {
                            "type": "string",
                            "description": "The content to write"
                        }
                    },
                    "required": ["file_path", "content"]
                }
            },
            {
                "name": "Bash",
                "description": "Execute a bash command",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "command": {
                            "type": "string",
                            "description": "The command to execute"
                        }
                    },
                    "required": ["command"]
                }
            }
        ]

        result = format_tools_list(tools)

        # Verify all three tools are formatted
        assert "def Read(file_path: str, offset: int = None, limit: int = None):" in result
        assert "def Write(file_path: str, content: str):" in result
        assert "def Bash(command: str):" in result

        # Verify docstrings
        assert "Read a file from the filesystem" in result
        assert "Write content to a file" in result
        assert "Execute a bash command" in result