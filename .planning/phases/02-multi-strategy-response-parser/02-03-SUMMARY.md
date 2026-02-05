---
phase: 02-multi-strategy-response-parser
plan: 03
subsystem: "response-parsing"
tags: ["regex", "parsing", "inline-code", "tool-extraction"]
requires: ["01-prompt-injection-foundation"]
provides: ["inline-code-parser"]
affects: ["02-04", "02-05", "03-tool-use-blocks"]
tech-stack:
  added: []
  patterns: ["regex-based-extraction", "tdd-development"]
key-files:
  created: ["src/perplexity_web_mcp/api/strategies/inline_code.py", "tests/test_inline_code_strategy.py"]
  modified: []
decisions: ["exclude-code-blocks", "preserve-raw-args"]
metrics:
  duration: "4m"
  completed: "2026-02-05"
---

# Phase 2 Plan 3: Inline Code Strategy Summary

**Outcome:** Built inline code extraction strategy for detecting tool calls in backticks like `search("query")`

## What Was Built

### Core Implementation
- **Inline code parser** (`src/perplexity_web_mcp/api/strategies/inline_code.py`): Extracts function-like patterns from backticked code
- **Comprehensive test suite** (`tests/test_inline_code_strategy.py`): 10 test cases covering various scenarios
- **Pattern matching**: Two-stage regex approach - first extract backticks, then identify functions

### Key Features
1. **Function detection**: Identifies `function_name(args)` patterns within backticks
2. **Argument preservation**: Keeps raw argument strings for later parsing
3. **Code block exclusion**: Ignores inline code inside triple-backtick blocks to avoid false positives
4. **Non-function filtering**: Ignores backticked variables and non-callable code

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Exclude code blocks | Prevent false positives from example code | More accurate extraction |
| Preserve raw arguments | Let higher-level parser handle argument parsing | Simpler, more flexible |
| Use two-stage regex | Separate concerns: backtick extraction vs function detection | Cleaner, maintainable code |

## Technical Details

### Regex Patterns
- `INLINE_CODE_PATTERN`: `r'`([^`]+)`'` - Extracts content within single backticks
- `FUNCTION_PATTERN`: `r'(\w+)\s*\(([^)]*)\)'` - Identifies function calls
- Code block removal: `r'```[^`]*```'` - Strips triple-backtick blocks first

### Test Coverage
- Simple function calls: `search('weather')`
- Multiple arguments: `calculate(1, 2, 3)`
- Empty arguments: `search()`
- Non-functions ignored: `variable`
- Multiple functions: Multiple extractions in one text
- Whitespace handling: `search  ( 'query' )`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test expectation for code blocks**
- **Found during:** Initial test run
- **Issue:** Test expected inline code inside code blocks to be extracted
- **Fix:** Changed test to verify exclusion of code inside triple-backtick blocks
- **Files modified:** `tests/test_inline_code_strategy.py`
- **Commit:** c6ab3d7

## Integration Points

This strategy integrates with:
- **Strategy orchestrator** (Plan 02-04): Will be one of multiple strategies
- **Argument parser** (Plan 02-05): Raw args will be parsed into structured format
- **Tool use blocks** (Phase 3): Inline mentions will be converted to proper blocks

## Next Phase Readiness

### What's Ready
- Inline code extraction works reliably
- Tests provide good coverage
- Pattern matching is robust

### Dependencies for Next Plans
- Plan 02-04 needs this and other strategies to orchestrate
- Plan 02-05 needs the raw args format we produce

### Potential Issues
- Very complex nested backticks might cause issues
- Performance with very large responses not tested
- Unicode in function names not currently supported

## Files Changed

| File | Type | Lines | Purpose |
|------|------|-------|---------|
| `src/perplexity_web_mcp/api/strategies/inline_code.py` | Created | 53 | Core extraction logic |
| `tests/test_inline_code_strategy.py` | Created | 97 | Test suite |

## Performance

- Test suite execution: ~0.13s for 10 tests
- Regex performance: O(n) where n is text length
- Memory usage: Minimal (only stores extracted mentions)