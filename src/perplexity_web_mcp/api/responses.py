"""OpenAI Responses API endpoints for Codex compatibility.

Reference: https://platform.openai.com/docs/api-reference/responses

This implements the stateful / agentic API used by Codex clients, which has a
different request format (input/instructions) and response format (output[])
than the standard Chat Completions API.
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncGenerator
import json
import logging
import threading
import time
from typing import Any
import uuid

from fastapi import APIRouter, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, ConfigDict, Field

from perplexity_web_mcp import ConversationConfig
from perplexity_web_mcp.enums import CitationMode

from . import server


responses_router = APIRouter()

# =============================================================================
# Pydantic Models (Responses API format)
# =============================================================================


class ResponsesRequest(BaseModel):
    """OpenAI Responses API request format."""

    model: str = Field(..., description="Model ID")
    input: str | list[dict[str, Any]] = Field(..., description="User input (string or array of messages)")
    instructions: str | None = Field(None, description="System instructions")
    stream: bool = Field(False, description="Enable streaming")
    store: bool = Field(False, description="Store the response (ignored)")
    previous_response_id: str | None = Field(None, description="State continuation ID")
    tools: list[dict[str, Any]] | None = Field(None, description="Tools available (ignored)")

    model_config = ConfigDict(extra="allow")


# =============================================================================
# Helpers
# =============================================================================


def input_to_query(input_data: str | list[dict[str, Any]]) -> str:
    """Convert Responses API input to a single string query."""
    if isinstance(input_data, str):
        return input_data

    # Handle structured message array format
    texts = []
    for msg in input_data:
        if isinstance(msg, dict):
            # If content is a simple string
            content = msg.get("content", "")
            if isinstance(content, str):
                texts.append(content)
            # If content is an array of objects
            elif isinstance(content, list):
                for part in content:
                    if isinstance(part, dict) and part.get("type") == "input_text":
                        texts.append(part.get("text", ""))

    return "\n".join(texts)


# =============================================================================
# Routes
# =============================================================================


@responses_router.post("/v1/responses")
async def create_response(request: Request, body: ResponsesRequest) -> Any:
    """OpenAI Responses API endpoint (POST)."""
    server.verify_auth(request)

    model = server.get_model(body.model, thinking=True)
    query = input_to_query(body.input)

    # Prepend instructions to query if provided, since we are doing a single ask
    if body.instructions:
        query = f"System: {body.instructions}\n\nUser: {query}"

    # We purposefully ignore body.previous_response_id as part of the stub strategy.
    # The client will treat this as a standalone query context.

    # Enforce rate limits
    now = time.time()
    elapsed = now - server.last_request_time
    if elapsed < server.MIN_REQUEST_INTERVAL:
        await asyncio.sleep(server.MIN_REQUEST_INTERVAL - elapsed)

    try:
        async with server.perplexity_semaphore:
            server.last_request_time = time.time()
            if body.stream:
                return await stream_response(query, model)
            else:
                return await standard_response(query, model)
    except Exception as e:
        logging.error(f"Error in /v1/responses: {e!s}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@responses_router.websocket("/v1/responses")
async def websocket_responses(websocket: WebSocket) -> None:
    """OpenAI Responses API endpoint (WebSocket)."""
    try:
        server.verify_auth(websocket)
    except HTTPException:
        await websocket.close(code=1008, reason="Invalid API key")
        return

    await websocket.accept()

    try:
        # Wait for the client to send a response.create event
        data = await websocket.receive_text()
        try:
            event = json.loads(data)
        except json.JSONDecodeError:
            await websocket.close(code=1003, reason="Invalid JSON")
            return

        if event.get("type") != "response.create":
            await websocket.close(code=1008, reason="Expected response.create event")
            return

        # Parse the event contents
        req_data = event.get("response", {})
        # Sometimes the body properties are top-level
        model_name = req_data.get("model") or event.get("model", "perplexity-auto")
        input_data = req_data.get("input") or event.get("input", "")
        instructions = req_data.get("instructions") or event.get("instructions", "")

        model = server.get_model(model_name, thinking=True)
        query = input_to_query(input_data)
        if instructions:
            query = f"System: {instructions}\n\nUser: {query}"

        # Enforce rate limits inside the websocket handler
        now = time.time()
        elapsed = now - server.last_request_time
        if elapsed < server.MIN_REQUEST_INTERVAL:
            await asyncio.sleep(server.MIN_REQUEST_INTERVAL - elapsed)

        async with server.perplexity_semaphore:
            server.last_request_time = time.time()
            # Stream the events back over the websocket
            async for json_str in generate_response_events(query, model):
                await websocket.send_text(json_str)

    except WebSocketDisconnect:
        logging.info("WebSocket disconnected")
    except Exception as e:
        logging.error(f"Error in WS /v1/responses: {e!s}", exc_info=True)
        await websocket.close(code=1011, reason=str(e))


# =============================================================================
# Event Generators
# =============================================================================


async def standard_response(query: str, model: Any) -> dict[str, Any]:
    """Generate a non-streaming Responses API payload."""
    response_id = f"resp_{uuid.uuid4().hex}"
    message_id = f"msg_{uuid.uuid4().hex}"
    created_at = int(time.time())

    conversation = server.client.create_conversation(
        ConversationConfig(
            model=model,
            citation_mode=CitationMode.CLEAN,
        )
    )

    # Run in thread to not block
    await asyncio.to_thread(conversation.ask, query)
    full_text = conversation.answer or ""

    # Approximation of usage since stream output doesn't provide exact counts
    input_tokens = len(query) // 4
    output_tokens = len(full_text) // 4

    return {
        "id": response_id,
        "object": "response",
        "created_at": created_at,
        "model": model.name if hasattr(model, "name") else "perplexity",
        "status": "completed",
        "output": [
            {
                "type": "message",
                "id": message_id,
                "status": "completed",
                "role": "assistant",
                "content": [{"type": "output_text", "text": full_text}],
            }
        ],
        "usage": {
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "total_tokens": input_tokens + output_tokens,
        },
    }


async def stream_response(query: str, model: Any) -> Any:
    """Return a StreamingResponse for SSE."""

    async def sse_generator() -> AsyncGenerator[str, None]:
        async for event_json in generate_response_events(query, model):
            yield f"event: {json.loads(event_json)['type']}\ndata: {event_json}\n\n"
        yield "event: done\ndata: [DONE]\n\n"

    return StreamingResponse(sse_generator(), media_type="text/event-stream")


async def generate_response_events(query: str, model: Any) -> AsyncGenerator[str, None]:
    """Generate the raw JSON events for the Responses API stream."""
    response_id = f"resp_{uuid.uuid4().hex}"
    message_id = f"msg_{uuid.uuid4().hex}"
    model_name = model.name if hasattr(model, "name") else "perplexity"

    # 1. response.created
    yield json.dumps(
        {
            "type": "response.created",
            "response": {"id": response_id, "object": "response", "status": "in_progress", "model": model_name},
        }
    )

    # 2. response.output_item.added
    yield json.dumps(
        {
            "type": "response.output_item.added",
            "output_index": 0,
            "item": {"id": message_id, "type": "message", "role": "assistant", "status": "in_progress", "content": []},
        }
    )

    # 3. response.content_part.added
    yield json.dumps(
        {
            "type": "response.content_part.added",
            "output_index": 0,
            "content_index": 0,
            "part": {"type": "output_text", "text": ""},
        }
    )

    # Threaded generation logic
    queue: asyncio.Queue[tuple[str, str]] = asyncio.Queue()
    loop = asyncio.get_running_loop()

    def producer():
        last = ""
        try:
            conversation = server.client.create_conversation(
                ConversationConfig(model=model, citation_mode=CitationMode.CLEAN)
            )
            for resp in conversation.ask(query, stream=True):
                current = resp.answer or ""
                if len(current) > len(last):
                    delta = current[len(last) :]
                    last = current
                    loop.call_soon_threadsafe(queue.put_nowait, ("delta", delta))
            loop.call_soon_threadsafe(queue.put_nowait, ("done", last))
        except Exception as e:
            loop.call_soon_threadsafe(queue.put_nowait, ("error", str(e)))

    threading.Thread(target=producer, daemon=True).start()

    # 4. response.output_text.delta
    last_text = ""
    while True:
        kind, payload = await queue.get()
        if kind == "delta":
            last_text += payload
            yield json.dumps(
                {"type": "response.output_text.delta", "output_index": 0, "content_index": 0, "delta": payload}
            )
        elif kind == "error":
            logging.error(f"Stream error: {payload}")
            yield json.dumps(
                {
                    "type": "response.output_text.delta",
                    "output_index": 0,
                    "content_index": 0,
                    "delta": f"\n\n[Error: {payload}]",
                }
            )
            break
        else:  # "done"
            # In "done", payload is the complete text, which we tracked via last_text
            break

    # 5. response.output_text.done
    yield json.dumps({"type": "response.output_text.done", "output_index": 0, "content_index": 0, "text": last_text})

    # 6. response.output_item.done
    yield json.dumps(
        {
            "type": "response.output_item.done",
            "output_index": 0,
            "item": {
                "id": message_id,
                "type": "message",
                "role": "assistant",
                "status": "completed",
                "content": [{"type": "output_text", "text": last_text}],
            },
        }
    )

    # 7. response.completed
    input_tokens = len(query) // 4
    output_tokens = len(last_text) // 4
    yield json.dumps(
        {
            "type": "response.completed",
            "response": {
                "id": response_id,
                "object": "response",
                "status": "completed",
                "model": model_name,
                "output": [
                    {
                        "id": message_id,
                        "type": "message",
                        "role": "assistant",
                        "status": "completed",
                        "content": [{"type": "output_text", "text": last_text}],
                    }
                ],
                "usage": {
                    "input_tokens": input_tokens,
                    "output_tokens": output_tokens,
                    "total_tokens": input_tokens + output_tokens,
                },
            },
        }
    )
