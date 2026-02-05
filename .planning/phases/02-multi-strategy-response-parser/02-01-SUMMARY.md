---
phase: 02-multi-strategy-response-parser
plan: 01
subsystem: response-parsing
tags: [python, ast, parsing, tool-extraction]

requires: [01-prompt-injection-foundation]
provides: [python-ast-strategy]
affects: [02-02, 02-03, 02-04, 02-05]

tech-stack:
  added: []
  patterns: [ast-parsing, tdd]

key-files:
  created:
    - src/perplexity_web_mcp/api/strategies/__init__.py
    - src/perplexity_web_mcp/api/strategies/python_ast.py
    - tests/test_python_ast_strategy.py
  modified: []

decisions:
  - Use ast.walk() for comprehensive extraction: "Finds all calls regardless of control flow"
  - Return empty list on syntax errors: "Graceful degradation for invalid Python"
  - Use success flag for None disambiguation: "Distinguish actual None from evaluation failure"

metrics:
  duration: 8m
  completed: 2026-02-05
---

# Phase 2 Plan 1: Python AST Strategy Summary

**One-liner:** Extract function calls from Python code blocks using ast.parse and ast.walk with literal_eval for safe argument extraction

## Implementation Overview

Built a Python AST-based strategy that:
1. Parses Python code strings using `ast.parse()`
2. Walks the AST tree to find all `ast.Call` nodes
3. Extracts function names from both simple calls and method calls
4. Safely evaluates arguments using `ast.literal_eval()`
5. Returns structured call information with name, args, and kwargs

## Key Technical Details

### Strategy Pattern
- `extract_python_calls(code: str) -> List[Dict[str, Any]]`
- Returns list of call dictionaries with 'name', 'args', 'kwargs' keys
- Handles syntax errors by returning empty list

### Argument Evaluation
- Uses success flag tuple `(value, bool)` to distinguish None values from failed evaluations
- Supports literals: strings, numbers, lists, dicts, booleans, None
- Skips non-evaluable expressions like variable references or *args/**kwargs

### Test Coverage
Created comprehensive test suite (150 lines) covering:
- Simple function calls
- Keyword arguments
- Multiple and nested calls
- Invalid syntax handling
- Method calls
- Edge cases (empty calls, star args)

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **ast.walk() over ast.NodeVisitor**: Simpler implementation, finds all calls regardless of nesting
2. **Return success flag from evaluation**: Properly handles None values in arguments
3. **Extract method name only**: For `obj.method()` calls, return 'method' not full chain
4. **Catch specific exceptions**: Use `(ValueError, SyntaxError)` instead of bare except

## Next Phase Readiness

### Requirements Met
✅ Parser extracts function calls from Python code blocks
✅ Parser handles multiple functions in single block
✅ Parser gracefully fails on invalid Python syntax
✅ Tests exceed minimum 50 lines (150 lines)
✅ AST parsing pattern established with `ast.parse` link

### Setup for Next Plans
- Strategy infrastructure in place at `src/perplexity_web_mcp/api/strategies/`
- Ready for regex and markdown parsing strategies
- Pattern established for function extraction return format

### No Blockers
All tests passing, ready for Phase 2 Plan 2 (Regex Strategy).

## Session Stats
- **TDD Phases:** RED (test) → GREEN (implement) → REFACTOR (type hints)
- **Commits:** 3 (test, feat, refactor)
- **Test Results:** 14/14 passing
- **Files Created:** 3
- **LOC Added:** ~280