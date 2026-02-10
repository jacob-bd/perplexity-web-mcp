# Phase 0: RPC Capture Checklist

> **Status**: Waiting for Pro tier access
> **Prerequisite**: Pro or Max subscription with Model Council access

---

## Before You Start

- [ ] Confirm Pro/Max subscription is active
- [ ] Confirm Model Council is available in web UI
- [ ] Open Chrome with DevTools ready (F12 -> Network tab)
- [ ] Enable "Preserve log" in Network tab
- [ ] Clear existing network entries
- [ ] Have `plan/rpc_logger.py` ready

---

## Capture 1: Basic Council Query

**Goal**: Capture the main API call for a council query

1. [ ] Select "Model Council" in Perplexity's model selector
2. [ ] Note which models are pre-selected (default council)
3. [ ] Enter query: "What is quantum computing?"
4. [ ] Wait for response to complete
5. [ ] In Network tab, find the POST request (likely `/query` or `/council`)
6. [ ] Right-click -> Copy -> Copy as cURL (bash)
7. [ ] Run `python plan/rpc_logger.py` and paste

**Questions to Answer**:
- [ ] What endpoint is used? (`/query`, `/council`, other?)
- [ ] Is there a `mode` or `model_preference` field indicating council?
- [ ] How are the 3 models specified in the payload?
- [ ] Is there a `chair_model` or `synthesizer` field?

---

## Capture 2: Custom Model Selection

**Goal**: Understand how custom model selection affects the payload

1. [ ] Open Model Council
2. [ ] Change the model selection (e.g., GPT-5.2, Claude Opus, Gemini)
3. [ ] Execute query: "Best programming language for beginners?"
4. [ ] Capture the request

**Questions to Answer**:
- [ ] How are custom models specified differently?
- [ ] Is there a limit enforced (max 3 models)?
- [ ] Are thinking variants available for council?

---

## Capture 3: SSE Stream Analysis

**Goal**: Understand the streaming response format

1. [ ] Execute a council query
2. [ ] In Network tab, find the streaming request (EventStream type)
3. [ ] Click on it -> Response tab
4. [ ] Copy the raw SSE events

**Questions to Answer**:
- [ ] Are individual model responses streamed separately?
- [ ] When does the synthesis response appear?
- [ ] What event types are used? (data:, event:, etc.)
- [ ] How are consensus/disagreement markers structured?

---

## Capture 4: Response Structure

**Goal**: Document the final response format

1. [ ] Execute council query with clear consensus topic: "Is water wet?"
2. [ ] Capture the response
3. [ ] Execute council query with likely disagreement: "Best AI model in 2026?"
4. [ ] Capture and compare

**Questions to Answer**:
- [ ] How is `consensus` indicated in the response?
- [ ] How are `disagreements` structured?
- [ ] Are individual model answers preserved in the response?
- [ ] How are merged citations formatted?

---

## Capture 5: Error Scenarios

**Goal**: Understand error handling

1. [ ] Try to execute council with very long query (test limits)
2. [ ] Try rapid successive queries (test rate limits)
3. [ ] Capture any error responses

**Questions to Answer**:
- [ ] What error format is used?
- [ ] Are there council-specific error codes?
- [ ] What happens if one model fails?

---

## Summary Document

After completing captures, create a summary document:

```markdown
# Model Council API Findings

## Endpoint
- URL: ___
- Method: ___

## Payload Structure
```json
{
  "key": "value"
}
```

## Response Structure
```json
{
  "key": "value"
}
```

## SSE Event Types
1. ___
2. ___

## Key Differences from Standard Query
- ___
- ___

## Implementation Notes
- ___
```

---

## Next Steps

After Phase 0 is complete:

1. Update `MODEL_COUNCIL_IMPLEMENTATION.md` with findings
2. Determine if Native API (Approach A) or Orchestration (Approach B)
3. Proceed to Phase 1: Core Implementation

---

## Notes

*Add notes from capture sessions here*

```
Date:
Session:
Observations:
```
