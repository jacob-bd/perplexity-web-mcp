"""Regression tests for Anthropic SSE streaming in ``api/server.py`` (Issue #62)."""

from __future__ import annotations

import asyncio
import json
import time
from types import SimpleNamespace
from typing import Any, ClassVar

from perplexity_web_mcp.api import server


BROKEN_STREAM_ERROR = RuntimeError("Failed to perform, curl: (56) Recv failure: Connection reset by peer")


class _StubPerplexity:
    """In-memory stand-in for Perplexity streaming responses."""

    scripts: ClassVar[list[list[Any]]] = []
    asked: int = 0
    closed: int = 0
    close_delay: float = 0.0
    stream_closed: int = 0

    def __init__(self, **kwargs: Any) -> None:
        self.search_results: list[Any] = []

    def create_conversation(self, config: Any) -> _StubPerplexity:
        return self

    def ask(self, query: str, stream: bool = True, init_query: str | None = None):
        _StubPerplexity.asked += 1
        steps = _StubPerplexity.scripts.pop(0)

        def _gen():
            try:
                for step in steps:
                    if isinstance(step, Exception):
                        raise step
                    if isinstance(step, float):
                        time.sleep(step)
                    else:
                        yield SimpleNamespace(answer=step)
            finally:
                _StubPerplexity.stream_closed += 1

        return _gen()

    def close(self) -> None:
        if _StubPerplexity.close_delay:
            time.sleep(_StubPerplexity.close_delay)
        _StubPerplexity.closed += 1


def _configure_server(
    monkeypatch: Any,
    *,
    scripts: list[list[Any]],
    close_delay: float = 0.0,
    min_interval: float = 0.0,
    last_request_time: float = 0.0,
) -> asyncio.Semaphore:
    _StubPerplexity.scripts = [list(s) for s in scripts]
    _StubPerplexity.asked = 0
    _StubPerplexity.closed = 0
    _StubPerplexity.stream_closed = 0
    _StubPerplexity.close_delay = close_delay

    semaphore = asyncio.Semaphore(1)
    monkeypatch.setattr(server, "Perplexity", _StubPerplexity)
    monkeypatch.setattr(server, "config", SimpleNamespace(session_token="not-a-token"), raising=False)
    monkeypatch.setattr(server, "perplexity_semaphore", semaphore, raising=False)
    monkeypatch.setattr(server, "MIN_REQUEST_INTERVAL", min_interval)
    monkeypatch.setattr(server, "last_request_time", last_request_time)
    return semaphore


async def _consume_stream(*, leave_after_events: int | None = None) -> str:
    turn = server.stream_response("msg_1", "claude-sonnet-5-5", server.Models.BEST, "question", 1)
    text = ""
    events = 0
    async for chunk in turn:
        events += 1
        data = json.loads(chunk.split("data: ", 1)[1])
        if data["type"] == "content_block_delta":
            text += data["delta"]["text"]
        if leave_after_events is not None and events == leave_after_events:
            await turn.aclose()
            break
    return text


async def _wait_for_unlocked(semaphore: asyncio.Semaphore, timeout: float = 2.0) -> float:
    started = time.monotonic()
    while semaphore.locked():
        if time.monotonic() - started > timeout:
            raise TimeoutError("Semaphore remained locked past timeout")
        await asyncio.sleep(0.02)
    return time.monotonic() - started


def test_midstream_retryable_error_does_not_repeat_text(monkeypatch: Any) -> None:
    """Once text has been streamed to the client, a failure must end with an error instead of retrying."""
    semaphore = _configure_server(
        monkeypatch,
        scripts=[["The capital", BROKEN_STREAM_ERROR], ["The capital of France is Paris."]],
    )

    text = asyncio.run(_consume_stream())

    assert text.startswith("The capital")
    assert text.count("The capital") == 1
    assert "[Error:" in text
    assert _StubPerplexity.asked == 1
    assert _StubPerplexity.closed == 1
    assert semaphore._value == 1


def test_preoutput_retryable_error_still_retries(monkeypatch: Any) -> None:
    """A retryable failure before any text is sent should still retry and succeed."""
    semaphore = _configure_server(
        monkeypatch,
        scripts=[[BROKEN_STREAM_ERROR], ["The capital of France is Paris."]],
    )
    # Keep retry backoff fast in unit tests
    original_event = __import__("threading").Event

    class _FastEvent(original_event):
        def wait(self, timeout: float | None = None) -> bool:
            return super().wait(0.01 if timeout is not None else None)

    monkeypatch.setattr("threading.Event", _FastEvent)

    text = asyncio.run(_consume_stream())

    assert text == "The capital of France is Paris."
    assert _StubPerplexity.asked == 2
    assert _StubPerplexity.closed == 2
    assert semaphore._value == 1


def test_slow_client_close_does_not_double_release_semaphore(monkeypatch: Any) -> None:
    """Slow client.close() must not cause both generator and producer to release the semaphore."""
    semaphore = _configure_server(
        monkeypatch,
        scripts=[["Paris."]],
        close_delay=0.05,
    )

    async def _run() -> str:
        result = await _consume_stream()
        await asyncio.sleep(0.15)
        return result

    text = asyncio.run(_run())

    assert text == "Paris."
    assert _StubPerplexity.closed == 1
    assert semaphore._value == 1


def test_early_disconnect_before_producer_start_releases_semaphore(monkeypatch: Any) -> None:
    """Closing the generator after message_start (before producer starts) must still release the slot."""
    semaphore = _configure_server(monkeypatch, scripts=[["Paris."]])

    text = asyncio.run(_consume_stream(leave_after_events=1))

    assert text == ""
    assert _StubPerplexity.asked == 0
    assert semaphore._value == 1


def test_client_disconnect_midstream_cancels_producer_and_frees_slot(monkeypatch: Any) -> None:
    """Disconnecting mid-stream must stop the producer promptly, close the client, and skip retries."""
    long_answer = [step for n in range(1, 51) for step in ("word " * n, 0.1)]
    semaphore = _configure_server(
        monkeypatch,
        scripts=[[*long_answer, BROKEN_STREAM_ERROR], ["Second attempt."]],
    )

    async def _run() -> float:
        await _consume_stream(leave_after_events=4)
        return await _wait_for_unlocked(semaphore, timeout=1.5)

    release_delay = asyncio.run(_run())

    assert release_delay < 1.0
    assert _StubPerplexity.asked == 1
    assert _StubPerplexity.closed == 1
    assert _StubPerplexity.stream_closed == 1
    assert semaphore._value == 1


def test_client_disconnect_during_rate_limit_wait_exits_immediately(monkeypatch: Any) -> None:
    """Disconnecting during the pre-request rate-limit wait must wake immediately without calling Perplexity."""
    semaphore = _configure_server(
        monkeypatch,
        scripts=[["Paris."]],
        min_interval=5.0,
        last_request_time=time.time(),
    )

    async def _run() -> float:
        turn = server.stream_response("msg_1", "claude-sonnet-5-5", server.Models.BEST, "question", 1)
        # Consume message_start and content_block_start, then start waiting on queue.get()
        await anext(turn)
        await anext(turn)
        wait_task = asyncio.create_task(anext(turn))
        await asyncio.sleep(0.05)
        wait_task.cancel()
        try:
            await wait_task
        except asyncio.CancelledError:
            pass
        await turn.aclose()
        return await _wait_for_unlocked(semaphore, timeout=1.0)

    release_delay = asyncio.run(_run())

    assert release_delay < 0.5
    assert _StubPerplexity.asked == 0
    assert semaphore._value == 1
