"""Markdown code block extraction utilities.

Extracts code blocks from markdown text using regex patterns.
"""

import re
from typing import Any


def extract_python_blocks(text: str) -> list[str]:
    """Extract Python code blocks from markdown text.

    Args:
        text: Markdown text containing code blocks

    Returns:
        List of Python code strings (content only, without fence markers)

    Examples:
        >>> extract_python_blocks('```python\\nprint("hello")\\n```')
        ['print("hello")']
        >>> extract_python_blocks('```py\\nx = 1\\n```\\n```python\\ny = 2\\n```')
        ['x = 1', 'y = 2']
    """
    # Match fenced code blocks with python/py language tag
    # This pattern handles both with and without newlines
    pattern = r'```(?:python|py|python3)\s*(.*?)\s*```'
    matches = re.findall(pattern, text, re.DOTALL)

    # Clean and return results
    results = []
    for match in matches:
        # Strip leading/trailing whitespace
        clean = match.strip()
        if clean:
            results.append(clean)

    return results


def extract_all_code_blocks(text: str) -> list[dict[str, Any]]:
    """Extract all code blocks from markdown text with metadata.

    Args:
        text: Markdown text containing code blocks

    Returns:
        List of dictionaries with 'language' and 'code' keys

    Examples:
        >>> blocks = extract_all_code_blocks('```js\\nvar x = 1;\\n```')
        >>> blocks[0]['language']
        'js'
        >>> blocks[0]['code']
        'var x = 1;'
    """
    result = []

    # Match fenced code blocks with optional language tag
    pattern = r'```(\w*)\n?(.*?)\n?```'
    matches = re.findall(pattern, text, re.DOTALL)

    for lang, code in matches:
        # Clean up code - remove leading/trailing newlines
        clean_code = code.strip()
        result.append({
            "language": lang,
            "code": clean_code
        })

    # Also check for blocks without language tags
    if not matches:
        pattern_no_lang = r'```\n(.*?)\n```'
        matches_no_lang = re.findall(pattern_no_lang, text, re.DOTALL)
        for code in matches_no_lang:
            result.append({
                "language": "",
                "code": code.strip()
            })

    return result


def extract_nested_blocks(text: str) -> list[str]:
    """Handle edge case of nested code blocks.

    Some markdown may have nested blocks or unusual formatting.
    This function attempts to handle those cases.

    Args:
        text: Markdown text that may contain nested blocks

    Returns:
        List of extracted Python code strings
    """
    # For nested blocks, we need to be more careful
    # Count backticks to handle variable-length fences
    blocks = []
    lines = text.split('\n')
    in_block = False
    current_block = []
    fence_length = 0
    is_python = False

    for line in lines:
        # Check for fence start
        if not in_block and line.startswith('```'):
            # Count backticks
            fence_length = len(line) - len(line.lstrip('`'))
            if fence_length >= 3:
                in_block = True
                # Check for language tag
                lang = line[fence_length:].strip().lower()
                is_python = lang in ('python', 'py', 'python3')
                current_block = []
        # Check for fence end
        elif in_block and line.startswith('`' * fence_length) and len(line.strip('`')) == 0:
            # End of block
            if is_python:
                blocks.append('\n'.join(current_block))
            in_block = False
            current_block = []
            fence_length = 0
            is_python = False
        # Collect block content
        elif in_block:
            current_block.append(line)

    return blocks


# Convenience function for backwards compatibility
def extract_code_blocks(text: str, language: str | None = None) -> list[str]:
    """Extract code blocks, optionally filtering by language.

    Args:
        text: Markdown text containing code blocks
        language: Optional language filter (e.g., 'python', 'javascript')

    Returns:
        List of code strings matching the language filter

    Examples:
        >>> extract_code_blocks('```python\\nx=1\\n```', language='python')
        ['x=1']
    """
    if language and language.lower() in ('python', 'py', 'python3'):
        return extract_python_blocks(text)

    blocks = extract_all_code_blocks(text)

    if language:
        # Filter by language
        language_lower = language.lower()
        return [b['code'] for b in blocks if b['language'].lower() == language_lower]
    else:
        # Return all code blocks
        return [b['code'] for b in blocks]