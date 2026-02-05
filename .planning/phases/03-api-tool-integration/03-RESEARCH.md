# Phase 3: API Tool Integration - Research

**Researched:** 2026-02-05
**Domain:** Anthropic Messages API tool calling implementation
**Confidence:** HIGH

## Summary

Phase 3 requires implementing the Anthropic Messages API tool calling specification in the existing FastAPI server. The specification is well-documented and stable, with clear requirements for request/response formats.

The core implementation involves three capabilities:
1. **API-01**: Already partially complete - server accepts `tools` array in requests
2. **API-02**: Return `tool_use` content blocks when tool calls are detected by the parser
3. **API-03**: Accept and process `tool_result` messages for multi-turn conversations

The most critical aspect is maintaining proper `tool_use`/`tool_result` pairing to avoid API validation errors. The parser from Phase 2 already extracts tool calls with high confidence (0.5-0.9), so the main work is transforming parsed results into Anthropic-compliant response structures.

**Primary recommendation:** Implement `tool_use` content blocks first (non-streaming), verify pairing integrity, then add streaming support. Use existing parser confidence scores to decide when to return tool_use vs text-only responses.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| FastAPI | 0.115+ | HTTP server framework | De facto standard for Python async APIs, native streaming support |
| Pydantic | 2.x | Request/response validation | FastAPI's foundation, ensures type safety |
| uvicorn | 0.34+ | ASGI server | Production-ready, handles SSE streaming |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| pytest | 8.x | Testing framework | Integration tests for tool calling flows |
| pytest-asyncio | 0.24+ | Async test support | Testing async endpoints |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| FastAPI | Flask | FastAPI has native async/streaming, Flask requires extensions |
| Pydantic v2 | Pydantic v1 | v2 has better performance and validation, v1 is deprecated |

**Installation:**
```bash
# Already installed in project
uv pip install fastapi uvicorn pydantic pytest pytest-asyncio
```

## Architecture Patterns

### Recommended Response Structure

**Non-streaming response with tool_use:**
```python
{
    "id": "msg_01Aq9w938a90dw8q",
    "type": "message",
    "role": "assistant",
    "content": [
        {
            "type": "text",
            "text": "I'll check that for you."
        },
        {
            "type": "tool_use",
            "id": "toolu_01A09q90qw90lq917835lq9",
            "name": "get_weather",
            "input": {"location": "San Francisco, CA"}
        }
    ],
    "model": "claude-sonnet-4-5",
    "stop_reason": "tool_use",  # Critical: signals tool call
    "usage": {"input_tokens": 100, "output_tokens": 50}
}
```

**Streaming SSE events with tool_use:**
```
event: message_start
data: {"type": "message_start", "message": {...}}

event: content_block_start
data: {"type": "content_block_start", "index": 0, "content_block": {"type": "text", "text": ""}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "I'll check"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: content_block_start
data: {"type": "content_block_start", "index": 1, "content_block": {"type": "tool_use", "id": "toolu_...", "name": "get_weather", "input": {}}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 1, "delta": {"type": "input_json_delta", "partial_json": "{\"location\":"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 1}

event: message_delta
data: {"type": "message_delta", "delta": {"stop_reason": "tool_use"}, "usage": {...}}

event: message_stop
data: {"type": "message_stop"}
```

### Pattern 1: Tool Use Detection and Transformation

**What:** Convert parser results to Anthropic tool_use content blocks
**When to use:** When parse_response() returns tool_calls with confidence > threshold

**Example:**
```python
# Source: Phase 2 implementation + Anthropic API spec
from response_parser import parse_response
import uuid

def transform_to_tool_use_blocks(parse_result: dict) -> list[dict]:
    """Transform parser output to Anthropic tool_use blocks."""
    blocks = []

    for tool_call in parse_result["tool_calls"]:
        blocks.append({
            "type": "tool_use",
            "id": f"toolu_{uuid.uuid4().hex[:24]}",
            "name": tool_call["name"],
            "input": tool_call["arguments"]
        })

    return blocks
```

### Pattern 2: Multi-Turn Tool Result Handling

**What:** Accept tool_result messages and continue conversation
**When to use:** When user sends message with tool_result content blocks

**Example:**
```python
# Source: Anthropic API docs
def extract_tool_results(messages: list[MessageParam]) -> dict[str, str]:
    """Extract tool results keyed by tool_use_id."""
    results = {}

    for msg in messages:
        if msg.role == "user" and isinstance(msg.content, list):
            for block in msg.content:
                if block.get("type") == "tool_result":
                    results[block["tool_use_id"]] = block["content"]

    return results
```

### Pattern 3: Confidence-Based Response Selection

**What:** Decide whether to return tool_use or text based on parser confidence
**When to use:** When balancing reliability vs functionality

**Example:**
```python
# Source: Phase 2 confidence levels + best practices
CONFIDENCE_THRESHOLD = 0.7  # Configurable

def should_return_tool_use(parse_result: dict) -> bool:
    """Decide if confidence is high enough to return tool_use."""
    return (
        len(parse_result["tool_calls"]) > 0 and
        parse_result["confidence"] >= CONFIDENCE_THRESHOLD
    )
```

### Anti-Patterns to Avoid

- **Orphaned tool_result blocks:** Never send tool_result without matching tool_use in conversation history
- **Mismatched IDs:** Always use the exact tool_use_id from the response in the tool_result
- **History truncation breaking pairs:** When limiting history, never split tool_use/tool_result pairs
- **Skipping error handling:** Always set `is_error: true` in tool_result for failed tool executions

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Unique ID generation | Custom UUID schemes | `uuid.uuid4().hex[:24]` | Anthropic expects hex format, specific length |
| SSE event formatting | Manual string building | FastAPI StreamingResponse | Handles headers, chunking, connection management |
| Message validation | Custom schema checks | Pydantic models | Type-safe, automatic validation, error messages |
| Tool result pairing | Manual ID tracking | Validate against message history | Prevents orphaned blocks |

**Key insight:** The Anthropic Messages API is strict about format compliance. Use official SDKs' test suites as reference implementations rather than guessing formats.

## Common Pitfalls

### Pitfall 1: tool_use/tool_result Pairing Violations

**What goes wrong:** API returns 400 error: "tool_result block must have a corresponding tool_use"

**Why it happens:**
- History truncation cuts off assistant message with tool_use while keeping user message with tool_result
- Error handling skips assistant messages but doesn't remove corresponding tool_result
- Session persistence corrupts and loses tool_use blocks

**How to avoid:**
- Validate message history before sending to API
- Implement `validate_tool_pairing()` function that checks:
  - Every tool_result has a matching tool_use_id in previous assistant message
  - No orphaned tool_use blocks without results
- When truncating history, always keep or remove complete tool_use/tool_result pairs

**Warning signs:**
- Intermittent 400 errors on multi-turn conversations
- Errors only appear after conversation history grows
- New conversations work but resumed sessions fail

### Pitfall 2: stop_reason Mismatch

**What goes wrong:** Clients expect tool_use stop_reason but get end_turn

**Why it happens:**
- Returning tool_use content blocks but setting `stop_reason: "end_turn"`
- Parser finds tool calls but response builder ignores them
- Confidence threshold rejects tool calls but forgets to log why

**How to avoid:**
- Always set `stop_reason: "tool_use"` when content includes tool_use blocks
- Set `stop_reason: "end_turn"` only for text-only responses
- Log decision: "Not returning tool_use (confidence 0.6 < threshold 0.7)"

**Warning signs:**
- Claude Code doesn't execute tools
- Clients treat tool requests as final answers
- Tools are logged as detected but not executed

### Pitfall 3: Streaming Tool Input Fragmentation

**What goes wrong:** Streaming tool input JSON arrives in multiple delta events, client can't parse

**Why it happens:**
- Sending complete JSON in single event instead of using `input_json_delta`
- Not properly streaming the tool input construction
- Parser returns complete tool call, server streams it incorrectly

**How to avoid:**
- For streaming: emit tool input as `input_json_delta` events with partial JSON
- Track streaming state: are we in text block or tool_use block?
- Use proper content block indices (text is index 0, tool_use starts at 1+)

**Warning signs:**
- Streaming works for text but breaks on tool calls
- Clients see incomplete tool arguments
- JSON parse errors in client logs

### Pitfall 4: Ignoring Parser Confidence Scores

**What goes wrong:** Return low-confidence tool calls, models execute wrong tools with wrong arguments

**Why it happens:**
- Phase 2 parser returns confidence (0.5-0.9) but Phase 3 ignores it
- "If parser found anything, use it" logic
- No threshold configuration

**How to avoid:**
- Respect parser confidence scores from Phase 2
- Set threshold (suggested: 0.7 for production)
- Log rejected tool calls: "Tool call detected but confidence too low"
- Consider returning text explaining what tool WOULD be called at higher confidence

**Warning signs:**
- Frequent tool execution errors
- User reports "it called the wrong tool"
- Inline code mentions like "I would use search()" get executed

### Pitfall 5: Parallel Tool Calls Without Proper Indexing

**What goes wrong:** Multiple tool_use blocks have same index, client gets confused

**Why it happens:**
- Parser returns multiple tool calls but response builder reuses index
- Streaming logic doesn't increment content_block index
- Copy-paste code assumes single tool call

**How to avoid:**
- Each content block (text or tool_use) gets unique sequential index
- Start text at 0, first tool_use at 1, second at 2, etc.
- Track `content_block_index` variable throughout response building

**Warning signs:**
- Only first tool in parallel call executes
- Clients report "duplicate content block index"
- Multi-tool responses fail but single-tool works

## Code Examples

Verified patterns from official sources:

### Non-Streaming Response with Tool Use

```python
# Source: Anthropic API docs + Phase 2 parser integration
from response_parser import parse_response
import uuid

async def create_message_with_tools(
    model: str,
    query: str,
    answer: str,
    tools: list[dict] | None
) -> dict:
    """Create message response with optional tool_use blocks."""
    response_id = f"msg_{uuid.uuid4().hex[:24]}"
    content_blocks = []
    stop_reason = "end_turn"

    # Parse response for tool calls if tools were provided
    if tools:
        parse_result = parse_response(answer)

        if parse_result["tool_calls"] and parse_result["confidence"] >= 0.7:
            # Add thinking text before tool calls
            if answer.strip():
                content_blocks.append({
                    "type": "text",
                    "text": answer
                })

            # Transform to tool_use blocks
            for tool_call in parse_result["tool_calls"]:
                content_blocks.append({
                    "type": "tool_use",
                    "id": f"toolu_{uuid.uuid4().hex[:24]}",
                    "name": tool_call["name"],
                    "input": tool_call["arguments"]
                })

            stop_reason = "tool_use"
        else:
            # Low confidence or no tools - return as text
            content_blocks.append({"type": "text", "text": answer})
    else:
        # No tools provided - text only
        content_blocks.append({"type": "text", "text": answer})

    return {
        "id": response_id,
        "type": "message",
        "role": "assistant",
        "content": content_blocks,
        "model": model,
        "stop_reason": stop_reason,
        "usage": {
            "input_tokens": estimate_tokens(query),
            "output_tokens": estimate_tokens(answer)
        }
    }
```

### Streaming Response with Tool Use

```python
# Source: Anthropic streaming protocol + FastAPI patterns
async def stream_with_tool_use(
    response_id: str,
    model: str,
    answer: str,
    tools: list[dict] | None
) -> AsyncGenerator[str, None]:
    """Stream response with tool_use blocks following Anthropic protocol."""
    import json

    # 1. message_start
    yield f"event: message_start\ndata: {json.dumps({
        'type': 'message_start',
        'message': {
            'id': response_id,
            'type': 'message',
            'role': 'assistant',
            'content': [],
            'model': model,
            'usage': {'input_tokens': 100, 'output_tokens': 0}
        }
    })}\n\n"

    # Parse for tool calls
    parse_result = parse_response(answer) if tools else {"tool_calls": [], "confidence": 0.0}
    has_tool_calls = len(parse_result["tool_calls"]) > 0 and parse_result["confidence"] >= 0.7

    content_index = 0

    # 2. Stream text if present
    if answer.strip():
        yield f"event: content_block_start\ndata: {json.dumps({
            'type': 'content_block_start',
            'index': content_index,
            'content_block': {'type': 'text', 'text': ''}
        })}\n\n"

        # Stream text deltas
        yield f"event: content_block_delta\ndata: {json.dumps({
            'type': 'content_block_delta',
            'index': content_index,
            'delta': {'type': 'text_delta', 'text': answer}
        })}\n\n"

        yield f"event: content_block_stop\ndata: {json.dumps({
            'type': 'content_block_stop',
            'index': content_index
        })}\n\n"

        content_index += 1

    # 3. Stream tool_use blocks
    if has_tool_calls:
        for tool_call in parse_result["tool_calls"]:
            tool_id = f"toolu_{uuid.uuid4().hex[:24]}"

            # Start tool_use block
            yield f"event: content_block_start\ndata: {json.dumps({
                'type': 'content_block_start',
                'index': content_index,
                'content_block': {
                    'type': 'tool_use',
                    'id': tool_id,
                    'name': tool_call['name'],
                    'input': {}
                }
            })}\n\n"

            # Stream input JSON
            input_json = json.dumps(tool_call['arguments'])
            yield f"event: content_block_delta\ndata: {json.dumps({
                'type': 'content_block_delta',
                'index': content_index,
                'delta': {'type': 'input_json_delta', 'partial_json': input_json}
            })}\n\n"

            yield f"event: content_block_stop\ndata: {json.dumps({
                'type': 'content_block_stop',
                'index': content_index
            })}\n\n"

            content_index += 1

    # 4. message_delta with stop_reason
    yield f"event: message_delta\ndata: {json.dumps({
        'type': 'message_delta',
        'delta': {
            'stop_reason': 'tool_use' if has_tool_calls else 'end_turn',
            'stop_sequence': None
        },
        'usage': {'output_tokens': 50}
    })}\n\n"

    # 5. message_stop
    yield f"event: message_stop\ndata: {json.dumps({'type': 'message_stop'})}\n\n"
```

### Tool Result Validation

```python
# Source: GitHub issue analysis + best practices
def validate_tool_pairing(messages: list[dict]) -> tuple[bool, str | None]:
    """Validate tool_use/tool_result pairing in message history.

    Returns:
        (is_valid, error_message)
    """
    # Track pending tool_use blocks
    pending_tool_uses = {}

    for msg in messages:
        if msg["role"] == "assistant":
            # Collect tool_use blocks
            if isinstance(msg.get("content"), list):
                for block in msg["content"]:
                    if block.get("type") == "tool_use":
                        pending_tool_uses[block["id"]] = block["name"]

        elif msg["role"] == "user":
            # Match tool_result blocks
            if isinstance(msg.get("content"), list):
                for block in msg["content"]:
                    if block.get("type") == "tool_result":
                        tool_use_id = block.get("tool_use_id")

                        # Check if this result has a matching tool_use
                        if tool_use_id not in pending_tool_uses:
                            return False, f"tool_result {tool_use_id} has no matching tool_use"

                        # Remove matched tool_use
                        del pending_tool_uses[tool_use_id]

    # Check for unmatched tool_use blocks
    if pending_tool_uses:
        orphaned = ", ".join(pending_tool_uses.keys())
        return False, f"tool_use blocks without results: {orphaned}"

    return True, None
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate tool/function calling API | Unified Messages API with tools parameter | 2023-06 | Single API for all interactions |
| XML-based tool responses | JSON tool_use content blocks | 2024 | Easier parsing, better typing |
| Sequential tool execution | Parallel tool calls | 2024-11 (Claude Opus 4) | Faster multi-tool workflows |
| Client-only tools | Server tools (web_search, web_fetch) | 2025-03 | No client implementation needed |
| Manual schema validation | strict: true for guaranteed conformance | 2025 | Production-ready reliability |

**Deprecated/outdated:**
- XML tool formats: Replaced by JSON content blocks
- Function calling separate endpoint: Merged into Messages API
- tool_choice: "function" option: Now uses "tool" instead

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal confidence threshold for tool execution**
   - What we know: Parser returns 0.5-0.9 confidence, lower = more false positives
   - What's unclear: What threshold balances reliability vs functionality?
   - Recommendation: Start with 0.7, make configurable, add metrics to tune based on user feedback

2. **Tool call text vs tool_use priority**
   - What we know: Anthropic examples show text block before tool_use blocks
   - What's unclear: Should we always include Perplexity's answer text even when returning tool_use?
   - Recommendation: Include text if present and meaningful, skip if answer is just "I'll do that"

3. **Handling partial tool calls in streaming**
   - What we know: Parser works on complete response text
   - What's unclear: Can we detect tool calls mid-stream or must we wait for completion?
   - Recommendation: Wait for complete answer, then parse and stream tool_use blocks (acceptable latency tradeoff)

4. **Tool result content format**
   - What we know: Can be string or array of content blocks (text, images, documents)
   - What's unclear: Do we need rich content support or is string sufficient for Phase 3?
   - Recommendation: Support string tool_result content initially, add rich content if users need it

## Sources

### Primary (HIGH confidence)
- [Anthropic Tool Use Overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) - Official tool calling specification
- [Anthropic Messages API Reference](https://platform.claude.com/docs/en/api/messages) - Complete API specification
- [Anthropic Tool Use Implementation Guide](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use) - Best practices and examples
- Existing codebase: `src/perplexity_web_mcp/api/server.py` (lines 787-860, 989-1004)
- Existing codebase: `src/perplexity_web_mcp/api/response_parser.py` (Phase 2 implementation)

### Secondary (MEDIUM confidence)
- [OneUpTime: Anthropic API Integration Best Practices](https://oneuptime.com/blog/post/2026-01-25-anthropic-api-integration/view) - 2026 implementation guide
- [llama.cpp Anthropic Messages API](https://huggingface.co/blog/ggml-org/anthropic-messages-api-in-llamacpp) - Reference implementation
- [liteLLM Anthropic Provider](https://docs.litellm.ai/docs/anthropic_unified) - Proxy server patterns
- [FastAPI Streaming Responses](https://medium.com/@ab.hassanein/streaming-responses-in-fastapi-d6a3397a4b7b) - SSE implementation patterns

### Tertiary (LOW confidence - validation needed)
- GitHub Issues: tool_use/tool_result pairing errors (multiple repositories, 2026)
  - [Bad Request - tool_result must have corresponding tool_use](https://github.com/github/copilot-cli/issues/1159)
  - [Format error cascades to auth cooldown](https://github.com/openclaw/openclaw/issues/8434)
  - [Orphaned tool_result blocks after history limiting](https://github.com/badlogic/pi-mono/issues/1033)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - FastAPI/Pydantic are established choices in existing codebase
- Architecture: HIGH - Official Anthropic documentation provides exact specifications
- Pitfalls: HIGH - Recent GitHub issues (2026) show real-world failure patterns
- Code examples: HIGH - Derived from official docs and verified against existing Phase 2 code

**Research date:** 2026-02-05
**Valid until:** 2026-04-05 (60 days - Anthropic API is stable, unlikely to change)
