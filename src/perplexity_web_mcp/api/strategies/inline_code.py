"""Inline code strategy for extracting tool mentions from backticks.

This strategy extracts function-like patterns from inline code snippets
wrapped in backticks, like `search('query')` or `read_file('test.txt')`.
"""

import re
from typing import List, Dict, Any

# Pattern to extract content within backticks
INLINE_CODE_PATTERN = r'`([^`]+)`'

# Pattern to identify function calls within the extracted code
FUNCTION_PATTERN = r'(\w+)\s*\(([^)]*)\)'


def extract_inline_code_mentions(text: str) -> List[Dict[str, Any]]:
    """Extract function-like patterns from inline code snippets.

    Args:
        text: Response text to parse for inline code mentions.

    Returns:
        List of dictionaries with 'name' and 'args_raw' keys.

    Examples:
        >>> extract_inline_code_mentions("I'll run `search('weather')` for you")
        [{'name': 'search', 'args_raw': "'weather'"}]

        >>> extract_inline_code_mentions("`variable` is not a function")
        []
    """
    mentions = []

    # First, remove code blocks to avoid false positives
    # Pattern to match triple backtick code blocks
    code_block_pattern = r'```[^`]*```'
    text_without_blocks = re.sub(code_block_pattern, '', text, flags=re.DOTALL)

    # Extract all content within single backticks
    inline_codes = re.findall(INLINE_CODE_PATTERN, text_without_blocks)

    for code_snippet in inline_codes:
        # Check if the snippet matches a function pattern
        function_matches = re.findall(FUNCTION_PATTERN, code_snippet)

        for func_name, args_raw in function_matches:
            mentions.append({
                'name': func_name,
                'args_raw': args_raw
            })

    return mentions