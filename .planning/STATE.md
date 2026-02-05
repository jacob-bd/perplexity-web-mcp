# Project State: Perplexity Web MCP

**Last Updated:** 2026-02-05

## Project Reference

**Core Value:** Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

**Current Focus:** Phase 1 - Prompt Injection Foundation

## Current Position

**Phase:** 1 of 5 (Prompt Injection Foundation)
**Plan:** 1 of 3 completed
**Status:** In progress
**Last activity:** 2026-02-05 - Completed 01-01-PLAN.md
**Progress:** ███░░░░░░░ 33%

### This Phase Success Criteria
1. ✗ User can pass tools array in API request and see formatted tool definitions in model prompt
2. ✗ Tool definitions appear as Python functions in markdown code blocks
3. ✗ Prompt structure preserves tool context alongside user message
4. ✗ System logs show tool injection happening for all requests with tools

### Overall Project Progress
- **Phases Completed:** 0/5
- **Requirements Delivered:** 0/13
- **Current Confidence:** Not yet measured

## Performance Metrics

### Velocity
- **Phase 1:** Plan 1 complete (3m 15s)
- **Phase 2:** Not started
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

### Technical Discoveries
- Perplexity models optimized for conversational search, not tool execution
- No system prompt distinction - everything appears as user content
- Previous XML/ReAct formats failed completely
- Models default to explaining rather than executing

### Open TODOs
- [ ] Create plan for Phase 1
- [ ] Decide on confidence threshold for tool execution
- [ ] Define exact prompt injection format
- [ ] Determine which tools to support initially

### Active Blockers
- None currently

## Session Continuity

### Entry Points
- MCP server: `src/perplexity_web_mcp/mcp/server.py`
- API server: `src/perplexity_web_mcp/api/server.py`
- Core logic: `src/perplexity_web_mcp/core.py`
- Tool injection: `src/perplexity_web_mcp/api/tool_injection.py` (NEW - Python function formatter)
- Disabled tool calling: `src/perplexity_web_mcp/tool_calling.py` (ReAct format that didn't work)

### Last Session
- **Date:** 2026-02-05 14:35 UTC
- **Stopped at:** Completed 01-01-PLAN.md
- **Resume file:** None

### Next Actions
1. Execute 01-02-PLAN.md to add prompt injection
2. Execute 01-03-PLAN.md to add response parsing
3. Move to Phase 2 for server integration

### Context for Next Session
Successfully created tool formatting foundation. Module converts Anthropic tool schemas to Python functions with Google-style docstrings. Ready for integration into prompt injection system. All tests passing.

---
*State initialized: 2026-02-04*
*Mode: yolo | Depth: standard*