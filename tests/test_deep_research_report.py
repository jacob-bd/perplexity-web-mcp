"""Regression tests for Deep Research report retrieval."""

from __future__ import annotations

import json
from typing import ClassVar

from perplexity_web_mcp.config import ConversationConfig
from perplexity_web_mcp.core import Conversation
from perplexity_web_mcp.models import Models


class _JSONResponse:
    def __init__(self, data: dict) -> None:
        self._data = data

    def json(self) -> dict:
        return self._data


class _DownloadResponse:
    status_code = 200
    text = "# Full report"


class _DownloadSession:
    last_kwargs: ClassVar[dict[str, object]] = {}

    def __init__(self, **kwargs) -> None:
        self.kwargs = kwargs
        type(self).last_kwargs = kwargs

    def __enter__(self) -> _DownloadSession:
        return self

    def __exit__(self, *args: object) -> None:
        pass

    def get(self, url: str, timeout: int) -> _DownloadResponse:
        return _DownloadResponse()


class _ResearchHTTP:
    def __init__(self) -> None:
        self.thread = {
            "entries": [
                {"text": json.dumps({"steps": [{"download_info": [{"url": "https://cdn.example/report.md"}]}]})}
            ]
        }

    def init_search(self, query: str) -> None:
        pass

    def stream_ask(self, payload: dict):
        final = {"step_type": "FINAL", "content": {"answer": "Research intro"}}
        yield f"data: {json.dumps({'backend_uuid': 'thread-123'})}".encode()
        yield f"data: {json.dumps({'text': json.dumps([final]), 'final': True})}".encode()

    def get(self, endpoint: str) -> _JSONResponse:
        return _JSONResponse(self.thread)


def test_deep_research_returns_report_body(monkeypatch) -> None:
    monkeypatch.setattr("perplexity_web_mcp.core.Session", _DownloadSession)
    conversation = Conversation(
        _ResearchHTTP(),
        ConversationConfig(model=Models.DEEP_RESEARCH),
    )

    conversation.ask("Explain quantum computing")

    assert conversation.answer == "Research intro\n\n---\n\n# Full report"


def test_deep_research_per_call_model_override_returns_report(monkeypatch) -> None:
    monkeypatch.setattr("perplexity_web_mcp.core.Session", _DownloadSession)
    conversation = Conversation(_ResearchHTTP(), ConversationConfig())

    conversation.ask("Explain quantum computing", model=Models.DEEP_RESEARCH)

    assert conversation.answer == "Research intro\n\n---\n\n# Full report"


def test_deep_research_stream_includes_report(monkeypatch) -> None:
    monkeypatch.setattr("perplexity_web_mcp.core.Session", _DownloadSession)
    conversation = Conversation(
        _ResearchHTTP(),
        ConversationConfig(model=Models.DEEP_RESEARCH),
    )

    responses = list(conversation.ask("Explain quantum computing", stream=True))

    assert responses[-1].answer == "Research intro\n\n---\n\n# Full report"


def test_deep_research_download_uses_resolved_ca_bundle(monkeypatch) -> None:
    monkeypatch.setattr("perplexity_web_mcp.core.Session", _DownloadSession)
    monkeypatch.setattr(
        "perplexity_web_mcp.core.get_system_ca_bundle_path",
        lambda: "/custom/ca-bundle.pem",
        raising=False,
    )
    conversation = Conversation(
        _ResearchHTTP(),
        ConversationConfig(model=Models.DEEP_RESEARCH),
    )

    conversation.ask("Explain quantum computing")

    assert _DownloadSession.last_kwargs["verify"] == "/custom/ca-bundle.pem"
