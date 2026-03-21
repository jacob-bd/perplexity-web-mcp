# Changelog

All notable changes to **perplexity-web-mcp-cli** are documented in this file.

---

## [0.10.0] - 2026-03-21

### Added

- **Model Council** — Parallel multi-model queries with optional Sonar synthesis. Query multiple AI models simultaneously and get a unified answer combining their perspectives.
  - `pplx_council` MCP tool with interactive model selection UX — AI agents must ask the user which models and how many before executing, with clear cost communication.
  - `pwm council` CLI command with `-m` model selection, `--no-synthesis`, `--json`, and `-s` source focus options.
  - Default council: GPT-5.4, Claude Opus, Gemini Pro (3 Pro Searches). Cost scales linearly with models selected.
  - MCP tool count increased from 16 to 17.
- **Usage-Based Credits** — New "💳 Usage-Based Credits" section in `pwm usage` and `pplx_usage` showing Perplexity's credit system data.
  - Fetches from `/rest/billing/credits` endpoint.
  - Displays: Purchased Credits, Bonus/Promotional Credits (with expiry), Total Available balance, and Text/Image/Video/Audio usage breakdown.
  - `Credits`, `CreditGrant` dataclasses and `fetch_credits()` in `rate_limits.py` with thread-safe caching (5-min TTL).

### Changed

- **`pwm usage` prettified with Rich tables** — Rate Limits, Account, and Credits sections now display as formatted tables with color-coded remaining counts (green → yellow → red) instead of raw text output. Removed source limits noise from Account section.
- All documentation surfaces updated: SKILL.md, `pwm --ai`, CLAUDE.md, README.md, quickstart.md.
- 11 new council CLI tests + updated usage tests.

---

## [0.9.5] - 2026-03-16

### Added

- **OpenCode MCP setup** — `pwm setup add opencode` and `pwm setup remove opencode` now configure MCP via OpenCode's custom JSON format (`~/.config/opencode/config.json`).
- **Verify hints after MCP setup** — `pwm setup add claude-code` and `pwm setup add codex` now show verification commands to confirm the setup worked.

### Fixed

- **`pwm hack claude` settings corruption** — Claude Code's `/model` command persists model selections (e.g. `gpt54`) to `~/.claude/settings.json`, breaking normal Claude launches. The hack session now memorizes the settings file before launch and restores it after exit, crash, or Ctrl+C.
- **Claude Code setup detection** — `pwm setup add claude-code` now checks both stdout and stderr for the "already exists" message, fixing false re-configuration on some Claude versions.
- **README model count** — Corrected model count in README.

---

## [0.9.4] - 2026-03-14

### Added

- **CC-Claw skill platform** — Added CC-Claw as a supported skill target (`pwm skill install cc-claw`). Skill path: `~/.cc-claw/workspace/skills/`. Total skill platforms: 9.
- **Quick Start Guide** — New `docs/quickstart.md` covering installation, authentication, first query, MCP setup, diagnostics, models, and source focus.

### Fixed

- **Hardcoded path in model-update workflow** — Removed personal filesystem path from `.agents/workflows/model-update.md`.
- **Desktop extension manifest version** — Bumped from stale 0.9.0 to match current release.
- **Skill docs out of sync** — `skills/perplexity-web-mcp/SKILL.md` and `references/` synced from `data/` (v0.9.1 → v0.9.4, now includes full quota protocol and cost tables).

### Changed

- **docs/ un-gitignored** — `docs/` is now tracked (only `docs/plans/` remains ignored). Internal planning documents removed.
- Skill metadata version bumped to 0.9.4.

---

## [0.9.3] - 2026-03-13

### Changed

- **Gemini CLI skill path** — Updated from `~/.gemini/skills/` to `~/.agents/skills/` to align with Gemini CLI v0.33.1+ which prioritizes the `.agents/skills/` directory. The `.agents/` path is the official cross-tool compatible alias. Detection now checks for the `gemini` binary in PATH instead of the `.gemini/` config directory (same pattern as Codex).
- Skill metadata version bumped to 0.9.3.

---

## [0.9.2] - 2026-03-12

### Added

- **Codex CLI MCP setup** — `pwm setup add codex` now performs real MCP configuration via `codex mcp add` CLI with `~/.codex/config.toml` fallback. Previously redirected users to skill install. Includes `pwm setup remove codex` support.
- **"other" skill export** — `pwm skill install other` exports all skill formats to a `perplexity-web-mcp-skill-export/` directory with a README containing manual installation instructions for all 8 supported platforms.

### Changed

- **Full tool parity with NotebookLM MCP** — Both skill management (8 tools) and MCP setup (7 clients) now match the sibling project. Codex upgraded from skill-only to full auto-setup.
- **README.md overhauled** — Updated model list (8 models, removed GPT-5.2/Gemini Flash/Grok/Kimi references), MCP tool count (16), setup section (added Codex, Cline, Antigravity), API model names, and skill install examples.
- Skill metadata version bumped to 0.9.2.

---

## [0.9.1] - 2026-03-11

### Added

- **NVIDIA Nemotron 3 Super model** — NVIDIA's Nemotron 3 Super 120B added. Identifier: `nv_nemotron_3_super`. Reasoning-only model with thinking permanently enabled.
  - `pplx_nemotron_thinking` MCP tool.
  - API server aliases: `nemotron-3-super`, `nemotron`.
  - CLI: `pwm ask "query" -m nemotron`.
- **Model change detection workflow** — `scripts/detect_model_changes.py` for automated detection of Perplexity model changes. Supports `--from-browser` and `--from-file` for Cloudflare-blocked environments. Reference snapshot at `scripts/reference_model_config.json`.
- `.agents/workflows/model-update.md` — Step-by-step workflow for detecting and applying model changes.

### Removed

- **GPT-5.2** — Removed from Perplexity UI. `pplx_gpt52` and `pplx_gpt52_thinking` MCP tools removed.
- **Gemini 3 Flash** — Removed from Perplexity UI. `pplx_gemini_flash` and `pplx_gemini_flash_think` MCP tools removed.
- **Grok 4.1** — Removed from Perplexity UI. `pplx_grok` and `pplx_grok_thinking` MCP tools removed.
- **Kimi K2.5** — Removed from Perplexity UI. `pplx_kimi_thinking` MCP tool removed.

### Changed

- MCP tool count reduced from 21 to 16 (removed 7 tools for deprecated models, added 1 for Nemotron).
- All documentation surfaces updated: SKILL.md, `pwm --ai`, CLAUDE.md, reference docs.
- Skill metadata version bumped to 0.9.1.

---

## [0.9.0] - 2026-03-11

### Added

- **Quota-aware usage protocol** — Comprehensive AI agent guidelines for conserving Pro Search and Deep Research quotas. Includes a cost model table, mandatory check-before-query protocol, intent classification rubric with concrete examples, and a decision flowchart.
- **Quota footer on all direct tool responses** — Every `ask()` response now appends a footer showing the query cost (Pro Search or Deep Research), remaining quotas, and warnings when Pro quota is running low (<20%) or exhausted. Helps AI agents track usage in real-time even when bypassing smart routing.
- **Cost labels on all MCP tool docstrings** — Every tool now declares its quota cost: `pplx_sonar` marked FREE, model-specific tools marked "COSTS 1 PRO SEARCH QUERY", `pplx_deep_research` marked "COSTS 1 DEEP RESEARCH QUERY (limited monthly pool)".
- **Quota-aware querying section in `pwm --ai`** — New section in the AI reference doc covering cost model, mandatory protocol, intent guide, and decision rules.
- **Cost summary table in `mcp-tools.md`** — Reference doc now includes per-tool cost information.

### Changed

- **MCP server instructions rewritten** — Now lead with cost model, mandatory quota-check protocol, intent classification guidance, and explicit "default to quick" directive. Previously only mentioned `pplx_smart_query` as "recommended".
- **`pplx_smart_query` docstring** — Rewritten to emphasize it is the "RECOMMENDED DEFAULT TOOL" and that `intent='quick'` is free.
- **`pplx_usage` docstring** — Now says "CALL THIS AT THE START OF EVERY SESSION".
- **SKILL.md overhauled** — Critical Rules section updated with quota-first behavior. New "Quota-Aware Usage Protocol (MANDATORY)" section with cost table, session checklist, classification rubric (7+ quick examples, 5 standard, 3 detailed, explicit research rules), decision flowchart, and automatic quota protection details. MCP Tools Summary table now includes a Cost column.
- Skill metadata version bumped to 0.9.0.

---

## [0.8.3] - 2026-03-08

### Added

- **Rich-Click CLI** — Entire CLI converted from manual `sys.argv` parsing to Click + `rich-click`. All commands now show colored, boxed help output with examples.
- **`pwm setup add all`** — Interactive multi-tool MCP setup. Scans system for detected AI tools, shows a Rich table with installation status, and lets you select which tools to configure.
- **`pwm setup remove all`** — Batch removal of MCP configurations with confirmation prompt.
- **Claude Desktop MCP extension** (`.mcpb`) — Bundled extension package for one-click Claude Desktop setup. Includes `run_server.py` launcher with cross-platform `uvx` discovery (macOS, Linux, Windows). Built automatically on every GitHub release.

### Fixed

- **Codex skill paths** — Updated from `.codex/skills/` to `.agents/skills/` per official OpenAI Codex documentation. Detection now checks for the `codex` binary in PATH instead of the shared `~/.agents/` directory.

### Changed

- **`claude-desktop` removed from `pwm setup`** — Claude Desktop is now configured via the `.mcpb` extension file (downloaded from GitHub releases) instead of the setup CLI.
- MCP tool count updated to 21 across all documentation surfaces.

---


## [0.8.2] - 2026-03-05

### Fixed

- **`pwm skill install all` detection** — Tool detection now verifies the config directory has content beyond the `skills/` subdirectory we create. Prevents installing to tools that aren't actually present on the system.

---

## [0.8.1] - 2026-03-05

### Added

- **`pwm skill install all`** — Install the skill to all detected tools on the system in one command. Detects which AI tools (Claude Code, Cursor, Gemini CLI, etc.) are present and installs to each one, with a summary showing installed, already current, and not detected tools.
- **`pwm skill install --help`** / **`pwm skill uninstall --help`** — Now shows usage and available tools instead of erroring with "Unknown tool '--help'".

### Changed

- **`pwm skill update` output** — Now shows a full breakdown: updated tools with version transitions, tools already at current version, and tools not installed.

---

## [0.8.0] - 2026-03-05

### Added

- **GPT-5.4 model support** — OpenAI's latest model added to Perplexity. Identifiers: `gpt54` / `gpt54_thinking`. Supports thinking toggle.
- `pplx_gpt54` and `pplx_gpt54_thinking` MCP tools.
- API server aliases: `gpt-5.4`, `gpt-5-4`, `gpt-54`, `gpt54`.
- CLI: `pwm ask "query" -m gpt54` (with optional `-t` for thinking).

### Changed

- MCP tool count increased from 17 to 19.
- GPT-5.2 descriptions updated from "latest" to reflect GPT-5.4 as the newest OpenAI model.

---

## [0.7.2] - 2026-03-01

### Added

- **No-search writing mode** (`source_focus="none"`) — Query Perplexity models using only their training data, without web search. Available across CLI (`-s none`), MCP tools, and API server. Uses the existing `SearchFocus.WRITING` mode internally.
- **`pwm setup add json`** — Interactive JSON config generator for manual MCP setup. Walks through config type (uvx / regular), command format (name / full path), and scope (server entry / full file), then prints copyable JSON with optional clipboard copy on macOS.

### Fixed

- **MCP `isError` propagation** — `AuthenticationError` and `RateLimitError` now propagate as exceptions from `ask()` and `smart_ask()` instead of being returned as plain text. FastMCP sets `isError: true` on the response, allowing AI agents to programmatically detect auth and rate-limit failures.
- **Token-from-disk retry** — On `AuthenticationError`, the cached client is invalidated and the token file is re-read. If the token changed (user re-authenticated via `pwm login`), the query is retried once automatically.
- **Claude Code setup scope** — `pwm setup add claude-code` now uses `-s user` scope flag and `--` separator, ensuring the MCP server is registered at user scope (persists across projects).
- **Gemini CLI trust flag** — `pwm setup add gemini` now includes `"trust": true` in the config entry, preventing Gemini CLI from prompting for trust confirmation on every use.
- **Antigravity skill project path** — Corrected project-level skill path from `.gemini/antigravity/skills/` to `.agent/skills/` (matching sibling projects and Antigravity docs).

### Changed

- CLI `_cmd_ask()` and `_cmd_research()` now catch `AuthenticationError` and `RateLimitError` with clean error messages to stderr instead of unhandled tracebacks.
- All documentation surfaces (SKILL.md, `pwm --ai`, MCP tool docstrings) updated with `source_focus="none"` option, examples, and workflow patterns.

---

## [0.7.1] - 2026-02-22

### Changed

- **`pwm api` merged into main CLI** — The standalone `pwm-api` entry point is replaced by `pwm api` subcommand. Options: `--host`, `--port`, `--model`, `--log-level`.

---

## [0.7.0] - 2026-02-21

### Added

- **Smart quota-aware routing** (`pplx_smart_query` MCP tool, `smart_ask()` function) — Automatically selects the best model and search type based on current rate limits. Supports four intents: `quick`, `standard`, `detailed`, `research`.
- **`SmartRouter`** — Routing engine with quota classification (healthy/low/critical/exhausted) and graceful downgrade logic.
- **`pwm ask` without `-m`** — CLI now uses smart routing by default when no model is specified. Added `--intent` flag.
- **Router data structures** — `QuotaState`, `RoutingDecision`, `SmartResponse`, `SmartRouter` in `router.py`.
- Exported router types from package `__init__.py`.
- SKILL.md updated with smart routing guidance.

---

## [0.6.0] - 2026-02-20

### Changed

- **`pwm hack claude` model handling rewritten** — Now passes `--model` directly to Claude Code (matching the gemini-web-mcp pattern). Claude Code validates model names against the running API server's `/v1/models` endpoint, and `/model` mid-session switching works with the built-in picker (sonnet, opus, haiku are mapped to Perplexity models server-side). Removed the `ANTHROPIC_MODEL` env var approach that prevented `/model` switching.

---

## [0.5.9] - 2026-02-20

### Added

- **`pwm hack claude --help`** — Added a dynamic help menu that lists all currently available models directly from the API server.
- **`-m` intercept for `pwm hack claude`** — Added support for using `-m` (e.g., `pwm hack claude -m gpt52`), which is automatically converted to `--model` under the hood since Claude Code doesn't natively support the short flag.
- **Vibe Coding Alert** — Added a disclaimer to the README emphasizing the project's educational nature.

---

## [0.5.8] - 2026-02-20

### Fixed

- **Skill Update Deduping** — Prevented duplicate skill updates in `pwm skill update` when the current working directory matches the user directory (e.g., running from `~`).
- **Skill Version Tracking** — Synchronized the internal `SKILL.md` metadata versions to track the CLI releases properly.

---

## [0.5.7] - 2026-02-20

### Added

- **`pwm hack claude` command** — Seamlessly launch Claude Code connected to the local API server.
  - Dynamically binds to an ephemeral port to prevent port collisions with other instances.
  - Automatically isolates Claude Code from existing `ANTHROPIC_` and `CLAUDE_` environment variables (e.g. Vertex configuration) to ensure clean connection.
  - Removes `ANTHROPIC_AUTH_TOKEN` to prevent Claude Code's "Auth conflict" warnings.

---

## [0.5.6] - 2026-02-20

### Changed

- **Gemini 3 Pro updated to Gemini 3.1 Pro** — Model name and identifier updated to `gemini31pro_high` (verified via Chrome DevTools network capture).

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
