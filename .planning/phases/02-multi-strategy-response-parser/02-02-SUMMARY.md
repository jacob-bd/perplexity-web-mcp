---
phase: 02-multi-strategy-response-parser
plan: 02
subsystem: parsing
tags: [key-value, regex, tool-extraction, fallback-parser]
requires: []
provides: ["key-value pattern extraction", "case-insensitive fallback"]
affects: ["02-03", "02-04", "02-05"]
files:
  created:
    - src/perplexity_web_mcp/api/strategies/__init__.py
    - src/perplexity_web_mcp/api/strategies/key_value.py
    - tests/test_key_value_strategy.py
  modified: []
tech:
  patterns: ["regex-based parsing", "fallback strategy", "normalization"]
  dependencies: []
decisions:
  - "Use dual regex patterns for strict and fallback matching"
  - "Normalize all keys to lowercase for consistency"
  - "Ignore empty values to prevent invalid tool calls"
  - "Process line-by-line to handle multiline inputs"
metrics:
  duration: "2 minutes"
  tests: 11
  coverage: "100%"
  commits: 2
completed: 2026-02-05
---

# Phase 2 Plan 2: Key-Value Strategy Summary

**One-liner:** Simple KEY: value pattern extraction with case-insensitive fallback for tool invocation

## What Got Built

Created a key-value pattern extraction strategy that identifies and extracts simple command patterns from text. The parser handles both strict uppercase patterns (SEARCH:, READ_FILE:) and case-insensitive fallback patterns for flexibility.

## Implementation Details

### Core Components

1. **Dual Regex Patterns**
   - Primary: `^([A-Z_]+):\s*(.+)$` for strict uppercase matching
   - Fallback: `^([a-zA-Z_]+):\s*(.+)$` with IGNORECASE for flexibility

2. **Processing Flow**
   - Split text into lines for independent pattern matching
   - Try strict pattern first, fallback if no match
   - Normalize keys to lowercase
   - Strip whitespace from values
   - Ignore empty values

3. **Test Coverage**
   - Single pattern extraction
   - Multiple patterns in multiline text
   - Case-insensitive handling
   - Whitespace stripping
   - Empty value filtering
   - Non-matching text handling

## Commits

| Hash | Type | Description |
|------|------|-------------|
| fc18430 | test | Add failing test for key-value pattern extraction |
| 337b6b8 | feat | Implement key-value pattern extraction |

## Deviations from Plan

None - plan executed exactly as written.

## Authentication Gates

None encountered.

## Decisions Made

1. **Dual Pattern Strategy**: Instead of a single complex regex, used two patterns - strict uppercase primary and case-insensitive fallback. This provides better performance for the common case while maintaining flexibility.

2. **Line-by-Line Processing**: Rather than trying to match across the entire text, process line-by-line. This simplifies the regex and makes it easier to handle multiline inputs with mixed content.

3. **Empty Value Filtering**: Decided to silently ignore patterns with empty values rather than raising errors. This makes the parser more robust to malformed input.

## Technical Insights

1. **Regex Compilation**: Pre-compiled regex patterns as module constants for better performance on repeated calls.

2. **Normalization Approach**: Normalizing keys to lowercase at extraction time rather than requiring exact matches simplifies downstream processing.

3. **Return Format**: Consistent dictionary format with 'tool' and 'input' keys matches what the orchestrator will expect.

## Next Phase Readiness

### What's Ready
- Key-value extraction strategy fully functional
- Comprehensive test coverage
- Ready for integration into multi-strategy parser

### Dependencies Resolved
- strategies/ directory created and initialized
- Pattern extraction interface established

### Open Questions
- How will multiple strategies be prioritized?
- Should strategies be tried in parallel or sequence?
- What confidence threshold triggers fallback to next strategy?

## Performance Notes

- Test execution: 0.13s for 11 tests
- No performance bottlenecks identified
- Regex patterns are efficient for line-by-line processing

## Files for Reference

```python
# Example usage
from src.perplexity_web_mcp.api.strategies.key_value import extract_key_value_patterns

text = "SEARCH: weather forecast\nREAD_FILE: config.json"
patterns = extract_key_value_patterns(text)
# Returns: [
#   {'tool': 'search', 'input': 'weather forecast'},
#   {'tool': 'read_file', 'input': 'config.json'}
# ]
```