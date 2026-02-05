"""Tests for key-value pattern extraction strategy."""

import pytest
from src.perplexity_web_mcp.api.strategies.key_value import extract_key_value_patterns


class TestKeyValuePatternExtraction:
    """Test key-value pattern extraction from text."""

    def test_single_search_pattern(self):
        """Test extraction of single SEARCH pattern."""
        text = "SEARCH: weather today"
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["tool"] == "search"
        assert result[0]["input"] == "weather today"

    def test_single_read_file_pattern(self):
        """Test extraction of READ_FILE pattern."""
        text = "READ_FILE: /path/to/file.txt"
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["tool"] == "read_file"
        assert result[0]["input"] == "/path/to/file.txt"

    def test_single_calculate_pattern(self):
        """Test extraction of CALCULATE pattern."""
        text = "CALCULATE: 2 + 2"
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["tool"] == "calculate"
        assert result[0]["input"] == "2 + 2"

    def test_multiple_patterns(self):
        """Test extraction of multiple patterns from multiline text."""
        text = "SEARCH: first query\nREAD: second file"
        result = extract_key_value_patterns(text)

        assert len(result) == 2
        assert result[0]["tool"] == "search"
        assert result[0]["input"] == "first query"
        assert result[1]["tool"] == "read"
        assert result[1]["input"] == "second file"

    def test_no_patterns(self):
        """Test that non-matching text returns empty list."""
        text = "no patterns here"
        result = extract_key_value_patterns(text)

        assert result == []

    def test_case_insensitive_fallback(self):
        """Test that lowercase keys work as fallback."""
        text = "Search: lowercase should work"
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["tool"] == "search"
        assert result[0]["input"] == "lowercase should work"

    def test_mixed_case_patterns(self):
        """Test mixed case patterns in single text."""
        text = "SEARCH: uppercase query\nsearch: lowercase query\nSeArCh: mixed case query"
        result = extract_key_value_patterns(text)

        assert len(result) == 3
        assert all(r["tool"] == "search" for r in result)
        assert result[0]["input"] == "uppercase query"
        assert result[1]["input"] == "lowercase query"
        assert result[2]["input"] == "mixed case query"

    def test_strips_whitespace(self):
        """Test that whitespace is stripped from values."""
        text = "SEARCH:    lots of spaces    "
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["input"] == "lots of spaces"

    def test_underscore_in_key(self):
        """Test keys with underscores."""
        text = "READ_FILE: test.txt\nWRITE_FILE: output.txt"
        result = extract_key_value_patterns(text)

        assert len(result) == 2
        assert result[0]["tool"] == "read_file"
        assert result[1]["tool"] == "write_file"

    def test_empty_value_ignored(self):
        """Test that patterns with empty values are ignored."""
        text = "SEARCH: \nREAD: valid file"
        result = extract_key_value_patterns(text)

        assert len(result) == 1
        assert result[0]["tool"] == "read"
        assert result[0]["input"] == "valid file"

    def test_text_between_patterns(self):
        """Test patterns with non-matching text between them."""
        text = """SEARCH: first query
Some random text here
that should be ignored
READ: a file
More text to ignore
CALCULATE: 5 * 10"""
        result = extract_key_value_patterns(text)

        assert len(result) == 3
        assert result[0]["tool"] == "search"
        assert result[0]["input"] == "first query"
        assert result[1]["tool"] == "read"
        assert result[1]["input"] == "a file"
        assert result[2]["tool"] == "calculate"
        assert result[2]["input"] == "5 * 10"