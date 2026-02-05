"""Key-value pattern extraction strategy.

Extracts simple command patterns like "SEARCH: query" from text.
"""

import re
from typing import List, Dict, Any


# Primary pattern for uppercase keys with underscores
KEY_VALUE_PATTERN = re.compile(r'^([A-Z_]+):\s*(.+)$')

# Fallback pattern for case-insensitive matching
KEY_VALUE_PATTERN_FALLBACK = re.compile(r'^([a-zA-Z_]+):\s*(.+)$', re.IGNORECASE)


def extract_key_value_patterns(text: str) -> List[Dict[str, Any]]:
    """Extract key-value pattern tool invocations from text.

    Args:
        text: Text containing potential key-value patterns

    Returns:
        List of tool invocations with 'tool' and 'input' keys

    Examples:
        >>> extract_key_value_patterns("SEARCH: weather today")
        [{'tool': 'search', 'input': 'weather today'}]

        >>> extract_key_value_patterns("SEARCH: query\\nREAD: file")
        [{'tool': 'search', 'input': 'query'}, {'tool': 'read', 'input': 'file'}]

        >>> extract_key_value_patterns("no patterns here")
        []
    """
    if not text:
        return []

    results = []
    lines = text.split('\n')

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Try primary pattern first (uppercase)
        match = KEY_VALUE_PATTERN.match(line)

        # Fallback to case-insensitive if no match
        if not match:
            match = KEY_VALUE_PATTERN_FALLBACK.match(line)

        if match:
            key, value = match.groups()
            value = value.strip()

            # Only add if value is not empty
            if value:
                results.append({
                    'tool': key.lower(),  # Normalize to lowercase
                    'input': value
                })

    return results