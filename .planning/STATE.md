# Project State: Perplexity Web MCP

**Last Updated:** 2026-02-05

## Project Reference

**Core Value:** Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

**Current Focus:** Phase 5 - Reliability & Observability

## Current Position

**Phase:** 5 of 5 (Reliability & Observability)
**Plan:** 1 of ? completed
**Status:** In progress
**Last activity:** 2026-02-05 - Completed 05-01-PLAN.md (Graceful Degradation)
**Progress:** ████████░░ 82%

### This Phase Success Criteria
1. User receives conversational response when tool parsing fails completely
2. User can view success/failure rates per format type in logs
3. User sees clear error messages explaining why tool parsing failed
4. System continues operating normally after parsing failures
5. Performance metrics show which models and formats work best

### Overall Project Progress
- **Phases Completed:** 4/5
- **Requirements Delivered:** 10/13 (TC-01, TC-02, TC-03, TC-04, FMT-01, FMT-02, FMT-03, API-01, API-02, API-03)
- **Current Confidence:** Tool calling cycle complete with observability, ready for Phase 5

## Performance Metrics

### Velocity
- **Phase 1:** Plan 1 complete (3m 15s), Plan 2 complete (5m 2s), Plan 3 complete (16m)
- **Phase 2:** Plan 1 complete (8m), Plan 2 complete (2m), Plan 3 complete (4m), Plan 4 complete (6m 12s)
- **Phase 3:** Plan 1 complete (2m), Plan 2 complete (2m), Plan 3 complete (3m)
- **Phase 4:** Plan 1 complete (2m), Plan 2 complete (3m), Plan 3 complete (3m 29s)
- **Phase 5:** Plan 1 complete (6m 14s)

### Quality Indicators
- **Tool Call Success Rate:** Not yet measured
- **Format Performance:**
  - Python in markdown: Not tested
  - Key-value patterns: Not tested
  - Inline code: Not tested
- **Model Performance:**
  - GPT-5.2: Not tested
  - Claude 4.5: Not tested
  - Gemini 3: Not tested
  - Grok 4.1: Not tested

## Accumulated Context

### Key Decisions
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-04 | Accept 40-60% reliability target | Research confirms fundamental training mismatch |
| 2026-02-04 | Use Python in markdown as primary format | Most likely to trigger trained behavior |
| 2026-02-04 | Build multi-strategy parser | Models will deviate from any single format |
| 2026-02-05 | Use Google-style docstrings | More common in training data than numpy-style |
| 2026-02-05 | Keep type annotations simple | Avoid complex generics that might confuse models |
| 2026-02-05 | Position tools before user message | Ensures models see available tools before query |
| 2026-02-05 | Include explicit usage instructions | Guides models on how to invoke functions |
| 2026-02-05 | Support dual injection formats | Full Python primary, minimal bullet-point fallback |
| 2026-02-05 | Tool injection only when tools array present | Maintains backward compatibility |
| 2026-02-05 | System prompt included in tool-injected prompt | Avoids duplicate context |
| 2026-02-05 | Log at INFO for tool count, DEBUG for preview | Balances observability with log noise |
| 2026-02-05 | Use dual regex patterns for key-value extraction | Strict uppercase primary with case-insensitive fallback |
| 2026-02-05 | Process key-value patterns line-by-line | Simplifies regex and handles mixed content |
| 2026-02-05 | Silently ignore empty values in patterns | More robust to malformed input |
| 2026-02-05 | Exclude code blocks from inline extraction | Prevent false positives from example code |
| 2026-02-05 | Preserve raw arguments in inline code | Let higher-level parser handle argument parsing |
| 2026-02-05 | Use ast.walk() for comprehensive extraction | Finds all calls regardless of control flow |
| 2026-02-05 | Return empty list on syntax errors | Graceful degradation for invalid Python |
| 2026-02-05 | Use success flag for None disambiguation | Distinguish actual None from evaluation failure |
| 2026-02-05 | Use regex-based markdown extraction | mdextractor package had installation issues |
| 2026-02-05 | Normalize all tool call formats | Consistent name/arguments structure across strategies |
| 2026-02-05 | Apply strategies in confidence order | AST (0.9) -> key-value (0.7) -> inline (0.5) |
| 2026-02-05 | Extract markdown blocks before AST | Better success rate for Python code |
| 2026-02-05 | Log timing at INFO, details at DEBUG | Balance observability with log noise |
| 2026-02-05 | Use confidence threshold of 0.7 for tool_use blocks | Inline_code strategy at 0.5 would return too many false positives |
| 2026-02-05 | Generate tool_use IDs with toolu_{24 hex} format | Matches Anthropic API specification |
| 2026-02-05 | Append citations to last text block | Avoids polluting tool_use block input |
| 2026-02-05 | Set stop_reason to tool_use when tool blocks present | Signals to clients that tool execution is required |
| 2026-02-05 | Stream complete tool input JSON in single event | Simpler than streaming chunks, Anthropic spec allows both |
| 2026-02-05 | Parse response in producer thread for streaming | Producer has full text, avoids passing raw text through queue |
| 2026-02-05 | Graceful fallback to end_turn on streaming parse error | Don't crash stream if tool parsing fails |
| 2026-02-05 | Stream tool_use blocks before message_delta | Follows Anthropic SSE protocol - all content before message_delta |
| 2026-02-05 | Validate tool pairing before processing | Fail fast on invalid requests before expensive Perplexity calls |
| 2026-02-05 | Allow pending tool_use without results | Conversation can end awaiting tool execution |
| 2026-02-05 | Extract tool results early, inject later | Validation and logging in Phase 3, prompt injection in Phase 4 |
| 2026-02-05 | Return empty string for empty tool results | Simpler than None for string concatenation |
| 2026-02-05 | Default is_error to False for backward compatibility | Support tuples with missing is_error flag |
| 2026-02-05 | Limit to 3 most recent results by default | Maintains focus, prevents context bloat |
| 2026-02-05 | Truncate individual results to 1000 chars | Prevents context bloat with marker for clarity |
| 2026-02-05 | Use --- separators for result distinction | Visual clarity in markdown format |
| 2026-02-05 | Tool results injected after tool definitions, before user message | Ensures model sees execution results in context before responding |
| 2026-02-05 | extract_tool_results returns (content, is_error) tuples | Enables error distinction in formatted output |
| 2026-02-05 | Tool results parameter optional with None default | Maintains backward compatibility with existing code |
| 2026-02-05 | Log at INFO for injection count, DEBUG for IDs | Balances observability with log noise |
| 2026-02-05 | Log confidence scores at INFO level when tool calls detected | Provides visibility into tool detection quality (TC-03) |
| 2026-02-05 | Map exception types to user-friendly messages (SyntaxError, JSONDecodeError, etc.) | Separates user-facing errors from internal debugging details |
| 2026-02-05 | Log internal details at ERROR level with exc_info=True for debugging | Enables debugging without exposing stack traces to users |
| 2026-02-05 | Return strategy='error' with empty tool_calls on catastrophic parser failures | Distinguishes actual errors from normal "no tool calls" operation |
| 2026-02-05 | Three-tier error handling: strategy try/except, parser defensive wrapper, server fallback | Defense-in-depth prevents API crashes on parse failures |
| 2026-02-05 | Log context size in chars for tool results | Helps monitor prompt bloat, aids debugging |
| 2026-02-05 | Use WARNING for error tool results | Makes error conditions visible in production logs |

### Technical Discoveries
- Perplexity models optimized for conversational search, not tool execution
- No system prompt distinction - everything appears as user content
- Previous XML/ReAct formats failed completely
- Models default to explaining rather than executing

### Open TODOs
- [x] ~~Create plan for Phase 1~~ (Complete)
- [x] ~~Define exact prompt injection format~~ (Python in markdown)
- [x] ~~Implement multi-strategy response parser~~ (Phase 2 complete)
- [x] ~~Add tool_use content blocks to API~~ (Phase 3 complete)
- [x] ~~Decide on confidence threshold for tool execution~~ (0.7 threshold in Phase 4)
- [x] ~~Implement tool result injection into prompts~~ (Phase 4 complete)
- [x] ~~Production error handling and monitoring~~ (Phase 5 Plan 1 complete)
- [ ] Success/failure rate metrics (Phase 5 Plan 2)
- [ ] Test with real Perplexity models (Phase 5)

### Active Blockers
- None currently

## Session Continuity

### Entry Points
- MCP server: `src/perplexity_web_mcp/mcp/server.py`
- API server: `src/perplexity_web_mcp/api/server.py` (Tool calling endpoints with observability logging)
- Core logic: `src/perplexity_web_mcp/core.py`
- Tool injection: `src/perplexity_web_mcp/api/tool_injection.py` (Python function formatter)
- Prompt builder: `src/perplexity_web_mcp/api/prompt_builder.py` (Complete prompt construction, tool result formatting)
- Response parser: `src/perplexity_web_mcp/api/response_parser.py` (Multi-strategy orchestrator)
- Markdown extractor: `src/perplexity_web_mcp/api/extractors/markdown.py` (Code block extraction)
- Python AST strategy: `src/perplexity_web_mcp/api/strategies/python_ast.py` (AST-based extraction)
- Key-value strategy: `src/perplexity_web_mcp/api/strategies/key_value.py` (Simple pattern extraction)
- Inline code strategy: `src/perplexity_web_mcp/api/strategies/inline_code.py` (Backtick function extraction)
- Tool validation: `src/perplexity_web_mcp/api/tool_validation.py` (Tool use/result pairing validation)
- End-to-end tests: `tests/test_tool_result_flow.py` (Complete tool calling cycle tests)
- Disabled tool calling: `src/perplexity_web_mcp/tool_calling.py` (ReAct format that didn't work)

### Last Session
- **Date:** 2026-02-05
- **Stopped at:** Completed 05-01-PLAN.md (Graceful Degradation)
- **Resume file:** None

### Next Actions
1. Continue Phase 5: Implement success/failure rate metrics
2. Add format performance tracking
3. Test with real Perplexity models

### Context for Next Session
Phase 5 Plan 1 complete. Graceful degradation implemented with classify_parse_error function, defensive exception handling in response_parser, and 3 new error scenario tests. All 103 tests pass. API maintains Anthropic compliance even on parse failures with user-friendly error messages. Error handling pattern: three-tier defense (strategy → parser → server) with separation of user messages from internal debugging details. Ready for Phase 5 Plan 2: metrics and observability.

---
*State initialized: 2026-02-04*
*Mode: yolo | Depth: standard*