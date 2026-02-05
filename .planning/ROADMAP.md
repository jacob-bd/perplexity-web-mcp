# Roadmap: Perplexity Web MCP Tool Calling

**Created:** 2026-02-04
**Depth:** standard
**Mode:** yolo

## Overview

Transform Perplexity web models into tool-executing agents through prompt engineering and flexible parsing. This roadmap delivers best-effort tool calling (40-60% reliability) by injecting tool definitions using training-data-familiar formats and extracting calls through multi-strategy parsing with graceful fallbacks.

## Phases

### Phase 1: Prompt Injection Foundation

**Goal:** Tool definitions successfully appear in model prompts using formats familiar from training data

**Dependencies:** None - foundation phase

**Requirements:**
- TC-01: Inject tool definitions using training-data-familiar formats

**Success Criteria:**
1. User can pass tools array in API request and see formatted tool definitions in model prompt
2. Tool definitions appear as Python functions in markdown code blocks (most familiar format)
3. Prompt structure preserves tool context alongside user message
4. System logs show tool injection happening for all requests with tools

**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Tool definition formatting module
- [x] 01-02-PLAN.md — Prompt construction with injection
- [x] 01-03-PLAN.md — API integration and verification

### Phase 2: Multi-Strategy Response Parser

**Goal:** System reliably extracts tool calls from model responses using multiple parsing strategies

**Dependencies:** Phase 1 (need injection to get tool mentions)

**Requirements:**
- TC-02: Multi-strategy response parser with fallback chain
- FMT-01: Python function call format in markdown blocks
- FMT-02: Simple key-value format
- FMT-03: Inline code pattern detection

**Success Criteria:**
1. User sees Python function calls extracted from markdown code blocks (e.g., `search("query")`)
2. User sees key-value patterns recognized (e.g., `SEARCH: query terms`)
3. User sees inline code mentions detected (e.g., "I'll run `read_file('test.txt')`")
4. Parser tries all strategies in order and returns first successful match
5. Failed parsing attempts continue to next strategy without crashing

**Plans:** 5 plans

Plans:
- [x] 02-01-PLAN.md — TDD: Python AST strategy
- [x] 02-02-PLAN.md — TDD: Key-value strategy
- [x] 02-03-PLAN.md — TDD: Inline code strategy
- [x] 02-04-PLAN.md — Response parser orchestrator
- [x] 02-05-PLAN.md — API integration with verification

### Phase 3: API Tool Integration

**Goal:** Tool calling flows seamlessly through the Anthropic-compatible API

**Dependencies:** Phase 2 (need parser to detect tool calls)

**Requirements:**
- API-01: POST /v1/messages accepts tools array
- API-02: Response includes tool_use content blocks
- API-03: POST /v1/messages accepts tool_result messages

**Success Criteria:**
1. User can send tools array in POST /v1/messages request body
2. User receives tool_use content blocks in response when tool calls detected
3. User can send tool_result messages to continue conversation after tool execution
4. API maintains conversation state across tool calling cycles

**Plans:** 3 plans

Plans:
- [x] 03-01-PLAN.md — Tool Use Content Blocks (Non-Streaming)
- [x] 03-02-PLAN.md — Streaming Tool Use Implementation
- [x] 03-03-PLAN.md — Tool Result Handling & Validation

### Phase 4: Tool Execution & Result Injection

**Goal:** Detected tool calls execute and their results feed back into the conversation

**Dependencies:** Phase 3 (need API integration for full cycle)

**Requirements:**
- TC-03: Confidence scoring for extracted tool calls
- TC-04: Tool execution and result injection

**Success Criteria:**
1. User sees confidence scores attached to extracted tool calls
2. Tool calls above confidence threshold execute automatically
3. Tool execution results appear in subsequent model prompts
4. Model can reference and use tool results in its response
5. Low-confidence tool calls are logged but not executed

**Plans:** 3 plans

Plans:
- [x] 04-01-PLAN.md — Tool result formatting with error handling
- [x] 04-02-PLAN.md — Result injection into prompts
- [x] 04-03-PLAN.md — End-to-end verification and observability

### Phase 5: Reliability & Observability

**Goal:** System handles failures gracefully and provides insights into performance

**Dependencies:** Phase 4 (need complete flow to measure reliability)

**Requirements:**
- REL-01: Graceful fallback to conversational response
- REL-02: Logging of success/failure rates
- REL-03: Clear error messages

**Success Criteria:**
1. User receives conversational response when tool parsing fails completely
2. User can view success/failure rates per format type in logs
3. User sees clear error messages explaining why tool parsing failed
4. System continues operating normally after parsing failures
5. Performance metrics show which models and formats work best

**Plans:** 3 plans

Plans:
- [x] 05-01-PLAN.md — Graceful degradation and error handling
- [x] 05-02-PLAN.md — Prometheus metrics collection
- [x] 05-03-PLAN.md — Integration testing and documentation

## Progress

| Phase | Goal | Requirements | Status | Progress |
|-------|------|--------------|--------|----------|
| 1 - Prompt Injection Foundation | Tool definitions in prompts | TC-01 | Complete | ██████████ 100% |
| 2 - Multi-Strategy Response Parser | Extract calls from responses | TC-02, FMT-01, FMT-02, FMT-03 | Complete | ██████████ 100% |
| 3 - API Tool Integration | Tool flow through API | API-01, API-02, API-03 | Complete | ██████████ 100% |
| 4 - Tool Execution & Result Injection | Execute and inject results | TC-03, TC-04 | Complete | ██████████ 100% |
| 5 - Reliability & Observability | Graceful failures and metrics | REL-01, REL-02, REL-03 | Complete | ██████████ 100% |

---
*Roadmap created: 2026-02-04*
*Expected outcome: 40-60% reliability for simple tool calls with graceful fallbacks*
