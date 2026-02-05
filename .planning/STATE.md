# Project State: Perplexity Web MCP

**Last Updated:** 2026-02-04

## Project Reference

**Core Value:** Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

**Current Focus:** Starting Phase 1 - Prompt Injection Foundation

## Current Position

**Phase:** 1 - Prompt Injection Foundation
**Plan:** None (awaiting plan creation)
**Status:** Planning
**Progress:** ░░░░░░░░░░ 0%

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
- **Phase 1:** Not started
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
- Disabled tool calling: `src/perplexity_web_mcp/tool_calling.py` (ReAct format that didn't work)

### Next Actions
1. Run `/gsd:plan-phase 1` to create implementation plan
2. Review existing tool_calling.py for salvageable components
3. Design prompt injection template for Python-in-markdown format

### Context for Next Session
Starting fresh implementation of tool calling after research confirmed fundamental limitations. Focus on Phase 1: getting tool definitions into prompts using Python function format in markdown blocks. Expect 40-60% reliability at best due to training objective mismatch. Multi-strategy parsing will be critical.

---
*State initialized: 2026-02-04*
*Mode: yolo | Depth: standard*