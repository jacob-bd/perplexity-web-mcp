"""Tests for inline code strategy for extracting tool mentions from backticks."""

import pytest
from perplexity_web_mcp.api.strategies.inline_code import extract_inline_code_mentions


class TestInlineCodeStrategy:
    """Tests for inline code pattern detection."""

    def test_simple_function_call(self):
        """Test extraction of simple function call in backticks."""
        text = "I'll run `search('weather')` for you"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 1
        assert mentions[0]['name'] == 'search'
        assert mentions[0]['args_raw'] == "'weather'"

    def test_file_operation(self):
        """Test extraction of file operation function."""
        text = "Let me `read_file('test.txt')` now"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 1
        assert mentions[0]['name'] == 'read_file'
        assert mentions[0]['args_raw'] == "'test.txt'"

    def test_multiple_arguments(self):
        """Test function with multiple arguments."""
        text = "Using `calculate(1, 2, 3)` to compute"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 1
        assert mentions[0]['name'] == 'calculate'
        assert mentions[0]['args_raw'] == '1, 2, 3'

    def test_non_function_ignored(self):
        """Test that non-function code snippets are ignored."""
        text = "`variable` is not a function"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 0

    def test_empty_arguments(self):
        """Test function with no arguments."""
        text = "`search()` with no args"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 1
        assert mentions[0]['name'] == 'search'
        assert mentions[0]['args_raw'] == ''

    def test_multiple_functions(self):
        """Test multiple function mentions in one text."""
        text = "Multiple: `func1()` and `func2('arg')`"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 2
        assert mentions[0]['name'] == 'func1'
        assert mentions[0]['args_raw'] == ''
        assert mentions[1]['name'] == 'func2'
        assert mentions[1]['args_raw'] == "'arg'"

    def test_inline_code_outside_blocks(self):
        """Test extraction of inline code outside code blocks."""
        text = "First `search('test')` then ```python\ncode block\n``` and `read_file('data.txt')`"
        mentions = extract_inline_code_mentions(text)

        # Should find both inline codes outside the code block
        assert len(mentions) == 2
        assert mentions[0]['name'] == 'search'
        assert mentions[1]['name'] == 'read_file'

    def test_mixed_content(self):
        """Test extraction with mixed function and non-function snippets."""
        text = "The `config` variable and `setup()` function plus `data`"
        mentions = extract_inline_code_mentions(text)

        # Should only find the function
        assert len(mentions) == 1
        assert mentions[0]['name'] == 'setup'
        assert mentions[0]['args_raw'] == ''

    def test_whitespace_handling(self):
        """Test function with whitespace around parentheses."""
        text = "Running `search  ( 'query' )` now"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 1
        assert mentions[0]['name'] == 'search'
        assert mentions[0]['args_raw'] == " 'query' "

    def test_no_backticks(self):
        """Test that text without backticks returns empty list."""
        text = "Just regular text with search('query') not in backticks"
        mentions = extract_inline_code_mentions(text)

        assert len(mentions) == 0