"""Tests for Python AST-based response parsing strategy."""

import pytest
from perplexity_web_mcp.api.strategies.python_ast import extract_python_calls


class TestExtractPythonCalls:
    """Test extraction of function calls from Python code blocks."""

    def test_simple_function_call(self):
        """Test extracting a simple function call with only positional args."""
        code = "search('query')"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'search',
            'args': ['query'],
            'kwargs': {}
        }]

    def test_function_with_kwargs(self):
        """Test extracting function call with keyword arguments."""
        code = "read_file('test.txt', encoding='utf-8')"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'read_file',
            'args': ['test.txt'],
            'kwargs': {'encoding': 'utf-8'}
        }]

    def test_multiple_positional_args(self):
        """Test extracting function with multiple positional arguments."""
        code = "calculate(1, 2, 3)"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'calculate',
            'args': [1, 2, 3],
            'kwargs': {}
        }]

    def test_dict_as_kwarg(self):
        """Test extracting function with dictionary as keyword argument."""
        code = "process(data={'key': 'value'})"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'process',
            'args': [],
            'kwargs': {'data': {'key': 'value'}}
        }]

    def test_invalid_python_syntax(self):
        """Test that invalid Python syntax returns empty list."""
        code = "invalid python {}"
        result = extract_python_calls(code)
        assert result == []

    def test_multiple_function_calls(self):
        """Test extracting multiple function calls from single block."""
        code = "print('hello')\nsearch('world')"
        result = extract_python_calls(code)
        assert len(result) == 2
        assert result[0] == {
            'name': 'print',
            'args': ['hello'],
            'kwargs': {}
        }
        assert result[1] == {
            'name': 'search',
            'args': ['world'],
            'kwargs': {}
        }

    def test_nested_function_calls(self):
        """Test that nested calls are extracted separately."""
        code = "outer(inner('arg'))"
        result = extract_python_calls(code)
        # Should extract both inner and outer calls
        assert len(result) == 2
        names = [call['name'] for call in result]
        assert 'inner' in names
        assert 'outer' in names

    def test_mixed_argument_types(self):
        """Test function with various argument types."""
        code = "func(42, 'string', True, None, [1, 2], {'a': 1})"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'func',
            'args': [42, 'string', True, None, [1, 2], {'a': 1}],
            'kwargs': {}
        }]

    def test_empty_function_call(self):
        """Test function call with no arguments."""
        code = "get_data()"
        result = extract_python_calls(code)
        assert result == [{
            'name': 'get_data',
            'args': [],
            'kwargs': {}
        }]

    def test_function_with_star_args(self):
        """Test that *args syntax is handled gracefully."""
        code = "func(*args)"
        result = extract_python_calls(code)
        # Should still extract the call even if args can't be evaluated
        assert len(result) == 1
        assert result[0]['name'] == 'func'

    def test_function_with_star_kwargs(self):
        """Test that **kwargs syntax is handled gracefully."""
        code = "func(**kwargs)"
        result = extract_python_calls(code)
        # Should still extract the call even if kwargs can't be evaluated
        assert len(result) == 1
        assert result[0]['name'] == 'func'

    def test_method_call(self):
        """Test that method calls are extracted (just the method name)."""
        code = "obj.method('arg')"
        result = extract_python_calls(code)
        assert len(result) == 1
        assert result[0]['name'] == 'method'
        assert result[0]['args'] == ['arg']

    def test_non_call_statements(self):
        """Test that non-call statements are ignored."""
        code = """
x = 5
y = 'hello'
if True:
    pass
"""
        result = extract_python_calls(code)
        assert result == []

    def test_calls_in_compound_statements(self):
        """Test extracting calls from within if/for blocks."""
        code = """
if condition:
    search('query1')
for i in range(3):
    process(i)
"""
        result = extract_python_calls(code)
        assert len(result) == 3  # range(), search(), and process()
        # Note: ast.walk finds all calls regardless of control flow
        names = [call['name'] for call in result]
        assert 'range' in names
        assert 'search' in names
        assert 'process' in names