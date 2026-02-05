"""Python AST-based strategy for extracting function calls from code blocks."""

import ast
from typing import List, Dict, Any


def extract_python_calls(code: str) -> List[Dict[str, Any]]:
    """Extract function calls from Python code using AST parsing.

    Args:
        code: Python code string to parse

    Returns:
        List of dictionaries with 'name', 'args', and 'kwargs' for each call.
        Returns empty list if code has syntax errors.

    Examples:
        >>> extract_python_calls("search('query')")
        [{'name': 'search', 'args': ['query'], 'kwargs': {}}]

        >>> extract_python_calls("func(1, 2, key='value')")
        [{'name': 'func', 'args': [1, 2], 'kwargs': {'key': 'value'}}]
    """
    try:
        # Parse the code into an AST
        tree = ast.parse(code)
    except SyntaxError:
        # Return empty list for invalid Python syntax
        return []

    calls = []

    # Walk through all nodes in the AST
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            call_info = _extract_call_info(node)
            if call_info:
                calls.append(call_info)

    return calls


def _extract_call_info(node: ast.Call) -> Dict[str, Any]:
    """Extract information from a single Call node.

    Args:
        node: AST Call node

    Returns:
        Dictionary with 'name', 'args', and 'kwargs', or None if extraction fails.
    """
    # Extract function name
    func_name = _get_func_name(node.func)
    if not func_name:
        return None

    # Extract positional arguments
    args = []
    for arg in node.args:
        # Try to evaluate the argument as a literal
        value, success = _safe_eval_with_flag(arg)
        if success:
            args.append(value)

    # Extract keyword arguments
    kwargs = {}
    for keyword in node.keywords:
        if keyword.arg:  # Skip **kwargs
            value, success = _safe_eval_with_flag(keyword.value)
            if success:
                kwargs[keyword.arg] = value

    return {
        'name': func_name,
        'args': args,
        'kwargs': kwargs
    }


def _get_func_name(func_node) -> str:
    """Extract function name from various node types.

    Args:
        func_node: AST node representing the function being called

    Returns:
        Function name as string, or None if extraction fails.
    """
    if isinstance(func_node, ast.Name):
        # Simple function call: func()
        return func_node.id
    elif isinstance(func_node, ast.Attribute):
        # Method call: obj.method() - return just the method name
        return func_node.attr
    else:
        # Other call types we don't handle
        return None


def _safe_eval_with_flag(node):
    """Safely evaluate an AST node to a Python value with success flag.

    Args:
        node: AST node to evaluate

    Returns:
        Tuple of (value, success) where success indicates if evaluation succeeded.
    """
    # Handle None constant (in newer Python versions, it's ast.Constant)
    if isinstance(node, ast.Constant):
        return node.value, True

    try:
        # Use literal_eval for safe evaluation of literals
        return ast.literal_eval(node), True
    except:
        # For nodes that aren't literals, try to handle special cases
        if isinstance(node, ast.Name):
            # Handle special constants
            if node.id == 'True':
                return True, True
            elif node.id == 'False':
                return False, True
            elif node.id == 'None':
                return None, True
            else:
                # Variable reference - we can't evaluate this
                return None, False
        elif isinstance(node, ast.Starred):
            # *args - we know it exists but can't evaluate
            return None, False
        else:
            return None, False