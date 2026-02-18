# Changelog

All notable changes to **perplexity-web-mcp-cli** are documented in this file.

---

## [0.5.5] - 2026-02-17

### Changed

- **Claude Sonnet 4.5 replaced by Claude Sonnet 4.6** — Perplexity updated the model. Identifiers changed from `claude45sonnet` / `claude45sonnetthinking` to `claude46sonnet` / `claude46sonnetthinking` (verified via Chrome DevTools network capture). CLI name `claude_sonnet` unchanged.
- API server model mappings updated: `claude-sonnet-4-6` is now the primary name, legacy `claude-sonnet-4-5` aliases still work.

---

## [0.5.4] - 2026-02-16

### Fixed

- OpenClaw skill path corrected to `~/.openclaw/workspace/skills/` (verified against live system).
- OpenCode skill path corrected to `~/.config/opencode/skills/` (verified against nlm source).
- Cline MCP config path corrected to `~/.cline/data/settings/cline_mcp_settings.json` (verified against nlm source).
- All platform paths now verified against upstream documentation or source code.

---

## [0.5.3] - 2026-02-16

### Added

- `pwm setup`: Added support for Cline and Antigravity (7 tools total, parity with nlm CLI).
- `pwm skill`: Added support for OpenCode, Cline, and OpenClaw (8 platforms total, parity with nlm CLI).
- `pwm doctor`: Now checks all 7 MCP tools and 8 skill platforms.

---

## [0.5.2] - 2026-02-16

### Changed

- All dependencies are now included by default. No more `[all]`, `[mcp]`, or `[api]` extras needed. Install with just `pip install perplexity-web-mcp-cli`.
- `fastmcp`, `fastapi`, `uvicorn`, and `httpx` moved from optional extras into base dependencies.

---

## [0.5.1] - 2026-02-16

### Changed

- Expanded `pwm --ai` documentation with detailed model selection, source focus, and combined flag examples.
- Expanded Agent Skill (SKILL.md) with separated CLI examples, source focus table with use cases, and real-world common patterns.
- README, `--ai` doc, and skill now have consistent examples across all three surfaces.

---

## [0.5.0] - 2026-02-16

### Changed

- **Package renamed** from `perplexity-web-mcp` to `perplexity-web-mcp-cli` on PyPI. Install with: `pip install perplexity-web-mcp-cli[all]`. Python import (`perplexity_web_mcp`), CLI commands (`pwm`), and config paths are unchanged.

---

## [0.4.1] - 2026-02-16

### Removed

- Internal planning documents (`.planning/`, `plan/`, `docs/TOOL_CALLING_CHALLENGES.md`) removed from public repo.

### Fixed

- PyPI project URLs corrected from `jbendavi` to `jacob-bd`.

---

## [0.4.0] - 2026-02-16

### Added

- **Unified `pwm` CLI** replacing `pwm-auth` (removed). All commands under one entry point.
- `pwm ask` — query any Perplexity model from the terminal with model selection (`-m`), thinking (`-t`), source focus (`-s`), JSON output, and citation control.
- `pwm research` — deep research from the terminal.
- `pwm login` — authentication (interactive + non-interactive), replaces `pwm-auth`.
- `pwm usage` — check remaining rate limits and quotas.
- `pwm setup` — configure MCP server for AI tools (Claude Code, Claude Desktop, Cursor, Windsurf, Gemini CLI). Supports `add`, `remove`, `list`.
- `pwm skill` — install/uninstall/update Agent Skill across platforms (Claude Code, Cursor, Gemini CLI, Codex, Antigravity). Supports user and project level.
- `pwm doctor` — diagnose installation, authentication, rate limits, MCP configuration, skill installation, and token security.
- `pwm --ai` — comprehensive AI-optimized reference document for LLM agents.
- `shared.py` — single source of truth for model mappings, source focus, client management, rate limits, and the `ask()` function. Both MCP server and CLI import from here (no duplication).
- Agent Skill following the open standard (SKILL.md + references/). Portable across Claude, Cursor, Gemini, Codex, Antigravity.
- Skill data bundled inside the package at `data/` for pip/pipx installs.
- GitHub Actions workflow rewritten for tag-based Trusted Publishing (OIDC, no API token).
- 81 new tests (209 total).

### Removed

- `pwm-auth` CLI entry point (replaced by `pwm login`).

### Changed

- MCP server (`mcp/server.py`) refactored to import from `shared.py` instead of defining its own model maps and query logic.
- README rewritten with PyPI install commands (uv, pipx, pip), full CLI reference, and updated examples.

---

## [0.3.0] - 2026-02-13

Comprehensive stability, performance, and correctness overhaul. No breaking API changes.

### Fixed

- **Resource leak: CurlMime in file upload** (`core.py`) — `CurlMime()` is now wrapped in `try/finally` so it is always closed, even when S3 upload raises an exception.
- **Resource leak: unclosed HTTP sessions** (`rate_limits.py`) — `fetch_rate_limits()` and `fetch_user_settings()` now use context managers to close `curl_cffi` sessions after each call.
- **Resource leak: MCP client never closed** (`mcp/server.py`) — The Perplexity client was created fresh per request but never closed, leaking `curl_cffi` sessions. Replaced with a cached client (see Performance below).
- **RateLimiter blocked all threads during sleep** (`resilience.py`) — `acquire()` held the lock for the entire sleep duration, serializing all threads. Now reserves the time slot under the lock but sleeps outside it.
- **RateLimitError never retried despite being listed as retryable** (`http.py`) — `get()` and `post()` intercepted `RateLimitError` before tenacity could handle it. Now correctly propagates through the retry decorator.
- **Dead code in retry exception handling** (`http.py`) — `_handle_error()` always raises, so the trailing `raise error` after it was unreachable. Removed.
- **Streaming errors left HTTP connections open** (`core.py`) — Both `_complete()` and `_stream()` now use `try/finally` with `gen.close()` to ensure the underlying HTTP response is cleaned up on error.
- **`_process_data()` raised ValueError instead of ResponseParsingError** (`core.py`) — Missing/invalid JSON in SSE data now raises `ResponseParsingError` (part of the exception hierarchy) instead of bare `ValueError`.
- **`_parse_line()` crashed on malformed JSON** (`core.py`) — `JSONDecodeError` and `UnicodeDecodeError` are now caught gracefully; malformed SSE lines return `None` instead of crashing the stream.
- **Race condition in rate limit cache** (`rate_limits.py`) — Added a dedicated `_fetch_lock` with double-checked locking to prevent thundering herd when multiple threads hit a stale cache simultaneously.
- **Unprotected global state in MCP server** (`mcp/server.py`) — `_get_limit_cache()` now uses a `Lock` to prevent duplicate cache creation under concurrent requests.
- **Auth session objects leaked indefinitely** (`mcp/server.py`) — The `_auth_session` global now has a 10-minute TTL. Stale sessions are automatically discarded.
- **`init_search()` had no retry logic** (`http.py`) — Unlike `get()` and `post()`, this endpoint had no retry decorator. Now retries on transient failures with the same strategy.
- **Session rotation silently suppressed all exceptions** (`http.py`) — `with suppress(Exception)` replaced with `try/except` that logs the error at debug level.
- **Silent exception swallowing** (`token_store.py`, `cli/auth.py`) — `save_token()`, `load_token()`, and `get_user_info()` now log failures instead of silently returning `False`/`None`.
- **`get_user_info()` leaked session** (`cli/auth.py`) — Now uses a context manager for the `curl_cffi` session.
- **`ConversationConfig` was mutable** (`config.py`) — Now `frozen=True`, consistent with `ClientConfig`, preventing accidental mutation after creation.

### Performance

- **Cached Perplexity client in MCP server** — The client is now created once and reused across requests, with automatic recreation on token change. Eliminates ~50-100ms of `curl_cffi` session setup overhead per MCP tool call.
- **Smarter error handling in MCP server** — `get_user_info()` is now only called on 403/429 errors (not every error), removing an unnecessary HTTP round-trip on transient failures. Rate limit cache is only invalidated after successful queries or rate-limit errors, not all errors.

### Added

- `tests/test_resilience.py` — 16 tests covering `RateLimiter` behavior, lock-free sleep verification, thread safety, `get_random_browser_profile()`, `RetryConfig` defaults, and `create_retry_decorator` retry/no-retry/callback behavior.
- `tests/test_token_store.py` — 10 tests covering `save_token`, `load_token` priority and fallback, whitespace handling, empty files, and `get_token_or_raise` error message.
- `tests/test_core.py` — 47 tests covering `Perplexity` initialization, `_validate_files` edge cases, `_build_payload` structure, `_format_citations` modes, `_parse_line` SSE parsing, `_process_data` state updates and error handling, and `_build_response` output.
- `pytest-cov` and `pytest-mock` added to test dependency group.

### Changed

- All dependency version constraints now include upper bounds (e.g., `pydantic>=2.12.5,<3.0`) to prevent breakage from major version bumps.

---

## [0.2.0] - 2026-02-13

### Added

- **Rate limit checking** via Perplexity internal REST API (`/rest/rate-limit/all` and `/rest/user/settings`).
- `pplx_usage` MCP tool — check remaining Pro Search, Deep Research, Labs, and Browser Agent quotas.
- `RateLimitCache` — thread-safe, time-based cache for rate limit and user settings data (30s TTL for limits, 5min for settings).
- Pre-flight limit checking before every query in the MCP server.
- `RateLimits`, `UserSettings`, `ConnectorLimits`, `SourceLimit` data models.
- `fetch_rate_limits()` and `fetch_user_settings()` low-level fetch functions.
- Comprehensive test suite for rate limits (`tests/test_rate_limits.py`, 66 tests).

---

## [0.1.0] - 2026-02-03 to 2026-02-05

Initial release. Forked from [perplexity-webui-scraper](https://github.com/henrique-coder/perplexity-webui-scraper) by henrique-coder and rebranded as `perplexity-web-mcp`.

### Core

- `Perplexity` client with session token authentication and browser fingerprint rotation.
- `Conversation` class with query, follow-up, file upload, and streaming support.
- `HTTPClient` with retry (tenacity), rate limiting, and error mapping.
- Custom exception hierarchy: `PerplexityError`, `HTTPError`, `AuthenticationError`, `RateLimitError`, `FileUploadError`, `FileValidationError`, `ResponseParsingError`, `StreamingError`, `ResearchClarifyingQuestionsError`.
- Citation formatting modes: `DEFAULT`, `CLEAN` (remove), `MARKDOWN` (convert to links).
- Search focus (`WEB`, `WRITING`) and source focus (`WEB`, `ACADEMIC`, `SOCIAL`, `FINANCE`).
- Time range filtering (`ALL`, `DAY`, `WEEK`, `MONTH`, `YEAR`).
- Configurable logging with `loguru`.

### Models

- `Models.BEST` — auto-select best model.
- `Models.DEEP_RESEARCH` — in-depth reports.
- `Models.SONAR` — Perplexity's model.
- `Models.GPT_52` / `Models.GPT_52_THINKING` — OpenAI.
- `Models.CLAUDE_45_SONNET` / `Models.CLAUDE_45_SONNET_THINKING` — Anthropic.
- `Models.CLAUDE_46_OPUS` / `Models.CLAUDE_46_OPUS_THINKING` — Anthropic.
- `Models.GEMINI_3_FLASH` / `Models.GEMINI_3_FLASH_THINKING` — Google.
- `Models.GEMINI_3_PRO_THINKING` — Google.
- `Models.GROK_41` / `Models.GROK_41_THINKING` — xAI.
- `Models.KIMI_K25_THINKING` — Moonshot AI.

### MCP Server

- `pplx_query` — flexible model selection with thinking toggle.
- `pplx_ask` — auto-select best model.
- `pplx_deep_research` — deep research reports.
- `pplx_sonar`, `pplx_gpt52`, `pplx_gpt52_thinking`, `pplx_claude_sonnet`, `pplx_claude_sonnet_think`, `pplx_gemini_flash`, `pplx_gemini_flash_think`, `pplx_gemini_pro_think`, `pplx_grok`, `pplx_grok_thinking`, `pplx_kimi_thinking` — model-specific tools.
- `pplx_auth_status`, `pplx_auth_request_code`, `pplx_auth_complete` — in-band authentication for AI agents.
- All query tools support `source_focus` parameter (`web`, `academic`, `social`, `finance`, `all`).

### Anthropic API Compatibility

- Drop-in `/v1/messages` endpoint compatible with Anthropic SDK.
- Model mapping from Anthropic model names to Perplexity models.
- Streaming support via SSE.

### CLI

- `pwm-auth` — interactive and non-interactive authentication.
- `--check` flag to verify token validity.
- `--help` flag.
- Token stored in `~/.config/perplexity-web-mcp/token` with `0600` permissions.
- Environment variable fallback (`PERPLEXITY_SESSION_TOKEN`).

### Documentation

- Comprehensive README with installation options (pipx, pip, git clone).
- MCP config examples for Claude Code CLI, Claude Desktop, and Cursor.
- Project logo.
- Tool calling research and v1 requirements.
- Model Council implementation plan.
