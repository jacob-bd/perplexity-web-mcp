# Requirements: Perplexity Web MCP Tool Calling

**Created:** 2026-02-04
**Milestone:** v1 - Best-Effort Tool Calling

## v1 Requirements

### Tool Calling Infrastructure

- [x] **TC-01**: User can provide tool definitions that are injected into prompts using training-data-familiar formats (Python/markdown code blocks)
- [x] **TC-02**: System parses responses with multi-strategy fallback chain (JSON extraction → regex patterns → fuzzy matching)
- [ ] **TC-03**: System scores extracted tool calls with confidence threshold before execution
- [ ] **TC-04**: User receives tool execution results injected back into conversation for continuation

### Format Support

- [x] **FMT-01**: System recognizes Python function call format in markdown code blocks (e.g., `search("query")`)
- [x] **FMT-02**: System recognizes simple key-value format (e.g., `SEARCH: query`)
- [x] **FMT-03**: System detects inline code patterns mentioning tool calls

### API Compatibility

- [x] **API-01**: POST /v1/messages accepts `tools` array in request body
- [x] **API-02**: Response includes `tool_use` content blocks when tool calls are detected
- [x] **API-03**: POST /v1/messages accepts `tool_result` messages for continuation

### Reliability & Fallbacks

- [ ] **REL-01**: System gracefully falls back to conversational response when tool calling fails
- [ ] **REL-02**: System logs format success/failure rates for iteration
- [ ] **REL-03**: System provides clear error messages when tool parsing fails

## v2 Requirements (Deferred)

- [ ] NLP-based intent extraction using spaCy for conversational responses
- [ ] Multi-turn fallback for extracting tool parameters
- [ ] Model-specific prompt templates (GPT vs Claude vs Gemini)
- [ ] Advanced parameter validation with JSON schema
- [ ] Retry logic with format variation
- [ ] Tool call streaming (partial tool calls as they're generated)

## Out of Scope

- **Intermediate parsing model** — User preference: avoid latency/complexity of second model
- **100% guaranteed success** — Research confirms this is not achievable with prompt engineering
- **Official Perplexity API integration** — Defeats purpose of web interface access
- **Browser automation** — Too fragile for production

## Success Criteria

Given the fundamental limitation (training objective mismatch), success is defined as:

1. **Simple tool calls work reliably** (40-60% success rate)
   - Single-parameter tools (search, read_file)
   - Clear, unambiguous user requests

2. **Complex scenarios fail gracefully**
   - Multi-tool requests return conversational response
   - Ambiguous requests don't cause crashes

3. **System is observable**
   - Success/failure rates logged
   - Easy to identify which formats work best

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TC-01 | Phase 1 - Prompt Injection Foundation | Complete |
| TC-02 | Phase 2 - Multi-Strategy Response Parser | Complete |
| TC-03 | Phase 4 - Tool Execution & Result Injection | Pending |
| TC-04 | Phase 4 - Tool Execution & Result Injection | Pending |
| FMT-01 | Phase 2 - Multi-Strategy Response Parser | Complete |
| FMT-02 | Phase 2 - Multi-Strategy Response Parser | Complete |
| FMT-03 | Phase 2 - Multi-Strategy Response Parser | Complete |
| API-01 | Phase 3 - API Tool Integration | Complete |
| API-02 | Phase 3 - API Tool Integration | Complete |
| API-03 | Phase 3 - API Tool Integration | Complete |
| REL-01 | Phase 5 - Reliability & Observability | Pending |
| REL-02 | Phase 5 - Reliability & Observability | Pending |
| REL-03 | Phase 5 - Reliability & Observability | Pending |

---
*Requirements defined: 2026-02-04*
*Traceability updated: 2026-02-05*
*Expected outcome: 40-60% reliability for simple tool calls*