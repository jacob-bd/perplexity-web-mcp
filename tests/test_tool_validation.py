"""Tests for tool_use/tool_result validation module."""

import pytest
from perplexity_web_mcp.api.tool_validation import validate_tool_pairing


class TestToolPairingValidation:
    """Test cases for validate_tool_pairing function."""

    def test_valid_pairing(self):
        """Test single tool_use + tool_result pair is valid."""
        messages = [
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "tool_use",
                        "id": "toolu_123abc",
                        "name": "search",
                        "input": {"query": "Python tutorials"}
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": "toolu_123abc",
                        "content": "Found 10 tutorials"
                    }
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_multiple_valid_pairs(self):
        """Test multiple tool_use/tool_result pairs in sequence."""
        messages = [
            {
                "role": "user",
                "content": "Search for Python and then JavaScript"
            },
            {
                "role": "assistant",
                "content": [
                    {"type": "tool_use", "id": "toolu_001", "name": "search", "input": {"query": "Python"}},
                    {"type": "tool_use", "id": "toolu_002", "name": "search", "input": {"query": "JavaScript"}}
                ]
            },
            {
                "role": "user",
                "content": [
                    {"type": "tool_result", "tool_use_id": "toolu_001", "content": "Python results"},
                    {"type": "tool_result", "tool_use_id": "toolu_002", "content": "JS results"}
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_orphaned_tool_result(self):
        """Test tool_result without matching tool_use fails validation."""
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": "toolu_nonexistent",
                        "content": "Some results"
                    }
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is False
        assert error_msg == "tool_result toolu_nonexistent has no matching tool_use in conversation history"

    def test_string_content_ignored(self):
        """Test messages with string content are skipped."""
        messages = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi there"},
            {"role": "user", "content": "How are you?"}
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_pending_tool_use_allowed(self):
        """Test tool_use without result is valid (conversation ongoing)."""
        messages = [
            {
                "role": "user",
                "content": "Search for Python"
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "tool_use",
                        "id": "toolu_pending",
                        "name": "search",
                        "input": {"query": "Python"}
                    }
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_missing_tool_use_id_field(self):
        """Test malformed tool_result without tool_use_id field fails."""
        messages = [
            {
                "role": "assistant",
                "content": [
                    {"type": "tool_use", "id": "toolu_123", "name": "search", "input": {}}
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        # Missing tool_use_id field
                        "content": "Some results"
                    }
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is False
        assert error_msg == "tool_result block missing tool_use_id field"

    def test_mixed_content_blocks(self):
        """Test messages with mixed content blocks (text + tool_use/result)."""
        messages = [
            {
                "role": "assistant",
                "content": [
                    {"type": "text", "text": "I'll search for that."},
                    {"type": "tool_use", "id": "toolu_abc", "name": "search", "input": {"query": "test"}}
                ]
            },
            {
                "role": "user",
                "content": [
                    {"type": "tool_result", "tool_use_id": "toolu_abc", "content": "results"},
                    {"type": "text", "text": "Please summarize"}
                ]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_sequential_tool_use_chains(self):
        """Test multi-turn tool use chains are validated correctly."""
        messages = [
            # Turn 1: Initial tool use
            {"role": "assistant", "content": [{"type": "tool_use", "id": "toolu_1", "name": "search", "input": {}}]},
            {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_1", "content": "result 1"}]},
            # Turn 2: Follow-up tool use
            {"role": "assistant", "content": [{"type": "tool_use", "id": "toolu_2", "name": "read", "input": {}}]},
            {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_2", "content": "result 2"}]},
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_wrong_pairing_order(self):
        """Test tool_result appearing before tool_use fails."""
        messages = [
            {
                "role": "user",
                "content": [{"type": "tool_result", "tool_use_id": "toolu_future", "content": "results"}]
            },
            {
                "role": "assistant",
                "content": [{"type": "tool_use", "id": "toolu_future", "name": "search", "input": {}}]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is False
        assert "toolu_future" in error_msg
        assert "no matching tool_use" in error_msg

    def test_empty_messages_list(self):
        """Test empty messages list is valid."""
        messages = []

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None

    def test_non_dict_content_blocks_ignored(self):
        """Test non-dict items in content blocks are safely ignored."""
        messages = [
            {
                "role": "user",
                "content": ["string_content", 123, None, {"type": "text", "text": "hello"}]
            }
        ]

        is_valid, error_msg = validate_tool_pairing(messages)
        assert is_valid is True
        assert error_msg is None
