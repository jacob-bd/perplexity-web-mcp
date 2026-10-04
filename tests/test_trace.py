"""Tests for the trace logging module."""

from __future__ import annotations

from perplexity_web_mcp.trace import (
    get_trace_log_path,
    is_trace_enabled,
    log_trace,
    redact_trace_line,
    reset_trace_log,
)


def test_is_trace_enabled(monkeypatch):
    monkeypatch.delenv("PWM_TRACE", raising=False)
    assert not is_trace_enabled()

    monkeypatch.setenv("PWM_TRACE", "1")
    assert is_trace_enabled()

    monkeypatch.setenv("PWM_TRACE", "0")
    assert not is_trace_enabled()


def test_redact_trace_line():
    raw_auth = "Authorization: Bearer secret_token_12345"
    assert "secret_token_12345" not in redact_trace_line(raw_auth)
    assert "Bearer [REDACTED]" in redact_trace_line(raw_auth)

    raw_sk = '{"api_key": "sk-ant-1234567890abcdef"}'
    assert "sk-ant-1234567890abcdef" not in redact_trace_line(raw_sk)
    assert "sk-ant-[REDACTED]" in redact_trace_line(raw_sk)


def test_reset_and_log_trace(monkeypatch, tmp_path):
    monkeypatch.setenv("PWM_TRACE", "1")
    monkeypatch.setattr("perplexity_web_mcp.trace.LOGS_DIR", tmp_path / "logs")
    monkeypatch.setattr("perplexity_web_mcp.trace.TRACE_LOG_FILE", tmp_path / "logs" / "api-trace.log")
    trace_path = get_trace_log_path()

    reset_trace_log()
    assert trace_path.exists()

    log_trace("Sample trace event")
    with trace_path.open(encoding="utf-8") as f:
        content = f.read()

    assert "Sample trace event" in content
