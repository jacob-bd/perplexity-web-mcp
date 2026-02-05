---
phase: 04-tool-execution-result-injection
plan: 02
subsystem: api
tags: [tool-calling, prompt-injection, anthropic-api, tool-results]

# Dependency graph
requires:
  - phase: 04-01
    provides: format_tool_results function for structured markdown formatting
  - phase: 03-03
    provides: extract_tool_results extraction from message history
  - phase: 03-02
    provides: Tool validation and result pairing logic
provides:
  - build_prompt_with_tools accepts optional tool_results parameter
  - Tool results injected into prompts between definitions and user message
  - extract_tool_results returns (content, is_error) tuples
  - Complete prompt construction flow with tool results
affects: [04-03, phase-5-integration-testing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Prompt structure: System -> Tools -> Tool Results -> User Message"
    - "Tuple return for error flag propagation"
    - "Backward compatible parameter defaults"

key-files:
  created: []
  modified:
    - src/perplexity_web_mcp/api/prompt_builder.py
    - src/perplexity_web_mcp/api/server.py
    - tests/test_prompt_builder.py
    - tests/test_api_integration.py

key-decisions:
  - "Tool results injected after tool definitions, before user message"
  - "extract_tool_results returns tuples for is_error propagation"
  - "Backward compatible: works without tool_results parameter"
  - "Log at INFO for injection count, DEBUG for result IDs"

patterns-established:
  - "Tool result injection only when tool_results present and non-empty"
  - "format_tool_results called within build_prompt_with_tools"
  - "Empty dict returns no results section in prompt"

# Metrics
duration: 3min
completed: 2026-02-05
---

# Phase 4 Plan 2: Tool Result Injection Summary

**Tool execution results flow from Claude Code back into Perplexity prompts, completing the multi-turn tool calling cycle**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-05T19:50:54Z
- **Completed:** 2026-02-05T19:53:40Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Extended build_prompt_with_tools to accept and inject tool results
- Updated extract_tool_results to return (content, is_error) tuples
- Integrated result injection into create_message endpoint
- Maintained full backward compatibility with existing code
- Added 7 comprehensive tests (6 unit + 1 integration)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend build_prompt_with_tools to support tool result injection** - `45c1d55` (feat)
   - Added tool_results parameter to build_prompt_with_tools function
   - Inject formatted results between tools and user message
   - Maintain backward compatibility (works without tool_results)
   - Add 6 comprehensive tests for result injection
   - Update docstring with new parameter and prompt structure

2. **Task 2: Integrate result injection into create_message endpoint** - `4a83066` (feat)
   - Update extract_tool_results to return (content, is_error) tuples
   - Add format_tool_results to imports
   - Pass tool_results to build_prompt_with_tools when tools present
   - Add INFO/DEBUG logging for tool result injection events
   - Add integration test verifying results appear in prompt
   - All existing tests pass (backward compatibility maintained)

## Files Created/Modified
- `src/perplexity_web_mcp/api/prompt_builder.py` - Added tool_results parameter, injects formatted results in correct position
- `src/perplexity_web_mcp/api/server.py` - Updated extract_tool_results signature, integrated injection into create_message
- `tests/test_prompt_builder.py` - Added 6 tests for tool_results parameter and injection behavior
- `tests/test_api_integration.py` - Added integration test verifying result injection flow

## Decisions Made

1. **Tool result position in prompt**: Results injected after tool definitions but before user message - ensures model sees execution results in context before responding
2. **Tuple return type**: Changed extract_tool_results to return (content, is_error) tuples instead of just content strings - enables error distinction in formatted output
3. **Backward compatibility**: Made tool_results parameter optional with None default - existing code continues to work without changes
4. **Logging strategy**: INFO for injection count, DEBUG for result IDs - balances observability with log noise

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Tool result injection complete and working
- Prompt structure maintains correct order: System -> Tools -> Results -> User Message
- extract_tool_results returns error flags for proper formatting
- Integration test verifies end-to-end flow
- All 36 tests pass (25 prompt builder + 11 API integration)
- Ready for Plan 04-03: Streaming mode integration

**Blockers:** None

**Concerns:** None - implementation straightforward, all tests green

---
*Phase: 04-tool-execution-result-injection*
*Completed: 2026-02-05*
