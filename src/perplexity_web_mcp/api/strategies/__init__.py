"""Response parsing strategies for extracting tool calls from model outputs."""

from .inline_code import extract_inline_code_mentions
from .key_value import extract_key_value_patterns
from .python_ast import extract_python_calls

__all__ = [
    "extract_python_calls",
    "extract_key_value_patterns",
    "extract_inline_code_mentions",
]