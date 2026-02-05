"""Tool use/result pairing validation for Anthropic Messages API compatibility.

Prevents API errors by ensuring every tool_result has a matching tool_use block
in conversation history.
"""

from __future__ import annotations
from typing import Any


def validate_tool_pairing(messages: list[dict[str, Any]]) -> tuple[bool, str | None]:
    """Validate tool_use/tool_result pairing in message history.

    Args:
        messages: List of message dicts with role and content

    Returns:
        (is_valid, error_message) tuple
        - is_valid: True if all tool_result blocks have matching tool_use
        - error_message: None if valid, error description if invalid

    Examples:
        >>> # Valid pairing
        >>> msgs = [
        ...     {"role": "assistant", "content": [{"type": "tool_use", "id": "toolu_123", "name": "search"}]},
        ...     {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_123", "content": "results"}]}
        ... ]
        >>> validate_tool_pairing(msgs)
        (True, None)

        >>> # Invalid - orphaned tool_result
        >>> msgs = [
        ...     {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_999", "content": "results"}]}
        ... ]
        >>> validate_tool_pairing(msgs)
        (False, "tool_result toolu_999 has no matching tool_use in conversation history")
    """
    # Track pending tool_use blocks awaiting results
    pending_tool_uses: dict[str, str] = {}  # id -> tool_name

    for msg in messages:
        role = msg.get("role")
        content = msg.get("content")

        # Skip if content is string (not content blocks)
        if isinstance(content, str):
            continue

        # Process content blocks
        if isinstance(content, list):
            for block in content:
                if not isinstance(block, dict):
                    continue

                block_type = block.get("type")

                # Collect tool_use blocks from assistant
                if role == "assistant" and block_type == "tool_use":
                    tool_id = block.get("id")
                    tool_name = block.get("name", "unknown")
                    if tool_id:
                        pending_tool_uses[tool_id] = tool_name

                # Match tool_result blocks from user
                elif role == "user" and block_type == "tool_result":
                    tool_use_id = block.get("tool_use_id")
                    if not tool_use_id:
                        return False, "tool_result block missing tool_use_id field"

                    # Check if this result has a matching tool_use
                    if tool_use_id not in pending_tool_uses:
                        return False, f"tool_result {tool_use_id} has no matching tool_use in conversation history"

                    # Remove matched tool_use
                    del pending_tool_uses[tool_use_id]

    # Pending tool_use blocks without results are allowed
    # (conversation can end with tool_use awaiting result)
    # We only validate that tool_results don't reference non-existent tool_uses

    return True, None
