# Project State: Perplexity Web MCP

**Last Updated:** 2026-02-05

## Project Reference

**Core Value:** Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

**Current Focus:** Phase 1 - Prompt Injection Foundation

## Current Position

**Phase:** 1 of 5 (Prompt Injection Foundation)
**Plan:** 2 of 3 completed
**Status:** In progress
**Last activity:** 2026-02-05 - Completed 01-02-PLAN.md
**Progress:** █████░░░░░ 67%

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
- **Phase 1:** Plan 1 complete (3m 15s), Plan 2 complete (5m 2s)
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
| 2026-02-05 | Position tools before user message | Ensures models see available tools before query |
| 2026-02-05 | Include explicit usage instructions | Guides models on how to invoke functions |
| 2026-02-05 | Support dual injection formats | Full Python primary, minimal bullet-point fallback |

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
- Tool injection: `src/perplexity_web_mcp/api/tool_injection.py` (Python function formatter)
- Prompt builder: `src/perplexity_web_mcp/api/prompt_builder.py` (NEW - Complete prompt construction)
- Disabled tool calling: `src/perplexity_web_mcp/tool_calling.py` (ReAct format that didn't work)

### Last Session
- **Date:** 2026-02-05 14:42 UTC
- **Stopped at:** Completed 01-02-PLAN.md
- **Resume file:** None

### Next Actions
1. Execute 01-03-PLAN.md to add response parsing
2. Move to Phase 2 for server integration
3. Begin testing with actual Perplexity models

### Context for Next Session
Prompt builder complete with tool injection working. Module constructs prompts with tool definitions in markdown Python blocks positioned before user messages. Includes usage instructions and system prompt distillation. All 11 tests passing. Ready for response parser implementation.

---
*State initialized: 2026-02-04*
*Mode: yolo | Depth: standard*