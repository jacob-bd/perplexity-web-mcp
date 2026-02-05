"""Response parser orchestrator that coordinates multiple parsing strategies.

The parser tries strategies in order of confidence:
1. Python AST parsing (highest confidence) - for well-formed Python code
2. Key-value patterns (medium confidence) - for TOOL_NAME: args format
3. Inline code mentions (lowest confidence) - for `function()` mentions

Returns the first successful parse result with strategy metadata.
"""

import logging
import time
from typing import Any, TypedDict

from .extractors.markdown import extract_python_blocks
from .strategies import extract_inline_code_mentions, extract_key_value_patterns, extract_python_calls

# Create logger for this module
logger = logging.getLogger(__name__)


class ParseResult(TypedDict):
    """Result from parsing a response."""

    strategy: str  # Name of the strategy that succeeded
    tool_calls: list[dict[str, Any]]  # Extracted tool calls
    confidence: float  # Confidence level (0.0 to 1.0)


def normalize_tool_calls(tool_calls: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Normalize tool calls to consistent format.

    Ensures all tool calls have 'name' and 'arguments' keys.

    Args:
        tool_calls: Raw tool calls from a strategy

    Returns:
        Normalized tool calls with consistent structure
    """
    normalized = []
    for call in tool_calls:
        # Ensure we have both name and arguments
        if isinstance(call, dict):
            # Handle different naming conventions
            tool_name = call.get("name", "") or call.get("tool", "") or call.get("function", "")

            # Handle different argument formats
            tool_args = call.get("arguments",
                               call.get("args",
                                       call.get("input",
                                               call.get("params", {}))))

            # If input is a string, wrap it in a dict
            if isinstance(tool_args, str):
                tool_args = {"query": tool_args} if tool_args else {}
            elif not isinstance(tool_args, dict):
                tool_args = {}

            normalized_call = {
                "name": tool_name,
                "arguments": tool_args
            }

            # Only add if we have a name
            if normalized_call["name"]:
                normalized.append(normalized_call)
    return normalized


def parse_response(text: str) -> ParseResult:
    """Parse response text to extract tool calls using multiple strategies.

    Applies strategies in order of confidence, returning the first successful result.
    Extracts markdown code blocks first, then tries each strategy.

    Args:
        text: Response text from model that may contain tool calls

    Returns:
        ParseResult with strategy name, tool calls, and confidence level

    Examples:
        >>> # Python code block
        >>> text = '''```python
        ... search("query")
        ... ```'''
        >>> result = parse_response(text)
        >>> result['strategy']
        'python_ast'
        >>> result['confidence']
        0.9

        >>> # Key-value pattern
        >>> text = 'SEARCH: climate change'
        >>> result = parse_response(text)
        >>> result['strategy']
        'key_value'
        >>> result['confidence']
        0.7

        >>> # Inline code mention
        >>> text = 'I would use `search("info")` to find that'
        >>> result = parse_response(text)
        >>> result['strategy']
        'inline_code'
        >>> result['confidence']
        0.5
    """
    start_time = time.time()
    logger.debug(f"Starting response parsing for {len(text)} character text")

    # Strategy 1: Python AST parsing on extracted code blocks
    try:
        logger.debug("Attempting Python AST strategy on markdown blocks")
        # Extract Python code blocks first
        python_blocks = extract_python_blocks(text)

        if python_blocks:
            logger.debug(f"Found {len(python_blocks)} Python code blocks")
            all_calls = []

            for block in python_blocks:
                # Try to parse each block
                calls = extract_python_calls(block)
                if calls:
                    all_calls.extend(calls)

            if all_calls:
                logger.debug(f"Python AST strategy succeeded with {len(all_calls)} calls")
                elapsed = time.time() - start_time
                logger.info(f"Parse completed in {elapsed:.3f}s using python_ast strategy")
                return ParseResult(
                    strategy="python_ast",
                    tool_calls=normalize_tool_calls(all_calls),
                    confidence=0.9
                )
            else:
                logger.debug("Python AST found blocks but no valid function calls")
        else:
            logger.debug("No Python code blocks found in text")

    except Exception as e:
        logger.warning(f"Python AST strategy failed: {e}")

    # Strategy 2: Key-value patterns on full text
    try:
        logger.debug("Attempting key-value pattern strategy")
        calls = extract_key_value_patterns(text)

        if calls:
            logger.debug(f"Key-value strategy succeeded with {len(calls)} calls")
            elapsed = time.time() - start_time
            logger.info(f"Parse completed in {elapsed:.3f}s using key_value strategy")
            return ParseResult(
                strategy="key_value",
                tool_calls=normalize_tool_calls(calls),
                confidence=0.7
            )
        else:
            logger.debug("Key-value strategy found no patterns")

    except Exception as e:
        logger.warning(f"Key-value strategy failed: {e}")

    # Strategy 3: Inline code mentions on full text
    try:
        logger.debug("Attempting inline code mentions strategy")
        calls = extract_inline_code_mentions(text)

        if calls:
            logger.debug(f"Inline code strategy succeeded with {len(calls)} calls")
            elapsed = time.time() - start_time
            logger.info(f"Parse completed in {elapsed:.3f}s using inline_code strategy")
            return ParseResult(
                strategy="inline_code",
                tool_calls=normalize_tool_calls(calls),
                confidence=0.5
            )
        else:
            logger.debug("Inline code strategy found no mentions")

    except Exception as e:
        logger.warning(f"Inline code strategy failed: {e}")

    # All strategies failed
    elapsed = time.time() - start_time
    logger.info(f"Parse completed in {elapsed:.3f}s with no tool calls found")
    logger.debug("All parsing strategies failed to extract tool calls")

    return ParseResult(
        strategy="none",
        tool_calls=[],
        confidence=0.0
    )