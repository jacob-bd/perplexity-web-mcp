# Project State: Perplexity Web MCP

**Last Updated:** 2026-02-05

## Project Reference

**Core Value:** Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

**Current Focus:** Phase 2 - Multi-Strategy Response Parser

## Current Position

**Phase:** 2 of 5 (Multi-Strategy Response Parser)
**Plan:** 3 of 5 completed (02-01, 02-02, 02-03 done)
**Status:** In progress
**Last activity:** 2026-02-05 - Completed 02-01-PLAN.md (Python AST strategy)
**Progress:** ████████░░ 46%

### This Phase Success Criteria
1. ✓ User can pass tools array in API request and see formatted tool definitions in model prompt
2. ✓ Tool definitions appear as Python functions in markdown code blocks
3. ✓ Prompt structure preserves tool context alongside user message
4. ✓ System logs show tool injection happening for all requests with tools

### Overall Project Progress
- **Phases Completed:** 1/5
- **Requirements Delivered:** 1/13 (TC-01)
- **Current Confidence:** Foundation working, ready for Phase 2

## Performance Metrics

### Velocity
- **Phase 1:** Plan 1 complete (3m 15s), Plan 2 complete (5m 2s), Plan 3 complete (16m)
- **Phase 2:** Plan 1 complete (8m), Plan 2 complete (2m), Plan 3 complete (4m)
- **Phase 3:** Not started
- **Phase 4:** Not started
- **Phase 5:** Not started

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

### Technical Discoveries
- Perplexity models optimized for conversational search, not tool execution
- No system prompt distinction - everything appears as user content
- Previous XML/ReAct formats failed completely
- Models default to explaining rather than executing

### Open TODOs
- [x] ~~Create plan for Phase 1~~ (Complete)
- [x] ~~Define exact prompt injection format~~ (Python in markdown)
- [ ] Decide on confidence threshold for tool execution (Phase 4)
- [ ] Implement multi-strategy response parser (Phase 2)
- [ ] Add tool_use content blocks to API (Phase 3)

### Active Blockers
- None currently

## Session Continuity

### Entry Points
- MCP server: `src/perplexity_web_mcp/mcp/server.py`
- API server: `src/perplexity_web_mcp/api/server.py`
- Core logic: `src/perplexity_web_mcp/core.py`
- Tool injection: `src/perplexity_web_mcp/api/tool_injection.py` (Python function formatter)
- Prompt builder: `src/perplexity_web_mcp/api/prompt_builder.py` (Complete prompt construction)
- Python AST strategy: `src/perplexity_web_mcp/api/strategies/python_ast.py` (AST-based extraction)
- Key-value strategy: `src/perplexity_web_mcp/api/strategies/key_value.py` (Simple pattern extraction)
- Inline code strategy: `src/perplexity_web_mcp/api/strategies/inline_code.py` (Backtick function extraction)
- Disabled tool calling: `src/perplexity_web_mcp/tool_calling.py` (ReAct format that didn't work)

### Last Session
- **Date:** 2026-02-05 17:08 UTC
- **Stopped at:** Completed 02-01-PLAN.md
- **Resume file:** None

### Next Actions
1. Continue Phase 2: Response Parsing Strategies
2. Complete remaining plans (02-04, 02-05)
3. Begin testing with actual Perplexity models

### Context for Next Session
Phase 2 in progress. Three parsing strategies complete: Python AST extraction, key-value patterns, and inline code detection. All have comprehensive test coverage with TDD approach. Python AST strategy uses ast.parse for strictest parsing. Ready to build markdown extraction strategy (02-04) and the orchestrator to coordinate all strategies (02-05).

---
*State initialized: 2026-02-04*
*Mode: yolo | Depth: standard*