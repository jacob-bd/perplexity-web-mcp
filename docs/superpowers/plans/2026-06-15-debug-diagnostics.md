# Debug Diagnostics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make 403/debug output identify whether failures are token, endpoint, or network/IP related.

**Architecture:** Keep the change inside the existing HTTP, shared client, and doctor layers. HTTP errors carry endpoint context, shared CLI formatting uses token status to avoid misleading expired-token text, and `doctor -v` surfaces environment details without adding automatic public IP lookups.

**Tech Stack:** Python, pytest, curl-cffi, loguru.

---

### Task 1: Endpoint-Aware HTTP Errors

**Files:**
- Modify: `src/perplexity_web_mcp/exceptions.py`
- Modify: `src/perplexity_web_mcp/http.py`
- Test: `tests/test_http.py`

- [x] Add tests showing 403 errors include method/endpoint and URL context.
- [x] Update `AuthenticationError` and `RateLimitError` constructors to accept message, url, and response body.
- [x] Raise endpoint-specific errors from `get`, `post`, and `init_search`.

### Task 2: CLI Debug Env Support

**Files:**
- Modify: `src/perplexity_web_mcp/shared.py`
- Test: `tests/test_shared.py`

- [x] Add tests showing `LOG_LEVEL=debug` and `PWM_DEBUG=1` enable `ClientConfig.logging_level`.
- [x] Add a helper that builds the shared client config from environment variables.
- [x] Use that helper in `get_client()`.

### Task 3: Better 403 Formatting

**Files:**
- Modify: `src/perplexity_web_mcp/shared.py`
- Test: `tests/test_shared.py`

- [x] Add tests showing valid token plus 403 mentions query endpoint/network checks instead of only expired token.
- [x] Update `_format_error()` to include failed endpoint when available.
- [x] Keep existing MCP/CLI error behavior compatible.

### Task 4: Doctor Verbose Diagnostics

**Files:**
- Modify: `src/perplexity_web_mcp/cli/doctor.py`
- Test: `tests/test_doctor.py`

- [x] Add verbose checks for Python version, curl-cffi version, proxy env vars, and logging env vars.
- [x] Keep network checks token-safe.
- [x] Avoid automatic public IP lookup.

### Verification

- [x] Run focused tests for HTTP, shared, CLI, and doctor.
- [x] Run full non-integration test suite.
