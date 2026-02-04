# Codebase Concerns

**Analysis Date:** 2026-02-04

## Tech Debt

**Model Identifiers Unverified:**
- Issue: `CLAUDE_45_OPUS` and `CLAUDE_45_OPUS_THINKING` model identifiers in `src/perplexity_web_mcp/models.py` lines 52 and 55 are marked with TODO comments indicating they haven't been validated against actual Perplexity API responses
- Files: `src/perplexity_web_mcp/models.py` (lines 52-55)
- Impact: If identifiers are incorrect, Claude Opus models will silently fail or route to wrong model. Users may not get Opus responses when requested.
- Fix approach: Test these identifiers against live Perplexity API by submitting queries with these models and validating the response identifies the correct model.

**Session Token Not Validated on Startup:**
- Issue: Token is loaded and used without validation until first API call. Invalid/expired tokens only discovered during runtime, not at startup.
- Files: `src/perplexity_web_mcp/token_store.py`, `src/perplexity_web_mcp/api/server.py` (line 82-87)
- Impact: Server starts successfully with bad token, first request fails and logs cryptic error. For long-running API server, token expiration goes unnoticed.
- Fix approach: Add token validation endpoint in MCP server or API server startup; attempt minimal API call during initialization to verify token validity.

**Loose Token Priority Logic:**
- Issue: Token loading checks `~/.config/perplexity-web-mcp/token` first, then environment variable (line 46-58 in token_store.py). However, users may have both set with different values and expect environment variable to override.
- Files: `src/perplexity_web_mcp/token_store.py` (lines 46-58)
- Impact: Users debugging token issues by setting env var are surprised when file takes precedence. Can cause confusing behavior where "correct" env var is ignored.
- Fix approach: Add logging to indicate which token source is being used; consider making env var take precedence for debugging scenarios.

**Inconsistent Error Handling in File Operations:**
- Issue: File upload retry logic catches broad `Exception` instead of specific error types (lines 337-340 in core.py). Makes it unclear which errors are retriable vs fatal.
- Files: `src/perplexity_web_mcp/core.py` (lines 337-340)
- Impact: Network timeouts during file upload might be retried indefinitely; other fatal errors (permission denied, disk full) silently propagate as generic FileUploadError.
- Fix approach: Separate retriable exceptions (ConnectionError, TimeoutError) from fatal ones; implement retry logic specifically for transient errors only.

**Session Pool Cleanup Bug with Index Deletion:**
- Issue: In `src/perplexity_web_mcp/api/session_manager.py` line 222, session deletion by index during iteration can cause index shift if multiple sessions deleted. The code collects (key, idx, session) tuples but indices become invalid after first deletion.
- Files: `src/perplexity_web_mcp/api/session_manager.py` (lines 207-222)
- Impact: Not all expired sessions are properly cleaned up. Session pools can grow unbounded if cleanup doesn't remove sessions correctly, leading to memory leak.
- Fix approach: Collect sessions to delete first, then delete them in reverse order by index, or rebuild the pool with list comprehension instead of in-place deletion.

**Mock Response for Haiku Model Hardcoded:**
- Issue: API server includes hardcoded mock response logic for haiku model (lines 734-764 in api/server.py) to avoid concurrent Perplexity calls during Claude Code capability checks.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 734-764)
- Impact: If Perplexity's session limits change or rate limiting improves, this workaround wastes tokens on mock responses. Creates technical debt - adds special-case logic that needs removal later.
- Fix approach: Implement proper queueing/async handling for concurrent requests instead of mock responses; or remove when Perplexity infrastructure improves.

## Known Bugs

**403 Errors from Cloudflare or Perplexity Not Distinguished:**
- Symptoms: 403 error on `init_search` always attributed to "session token invalid or expired" (line 248 in http.py), but could be Cloudflare WAF rejection of headers or temporary service issue.
- Files: `src/perplexity_web_mcp/http.py` (line 247-248), `src/perplexity_web_mcp/api/server.py` (lines 1003-1009)
- Trigger: Hit Perplexity with too many requests too quickly, or with user-agent patterns that trigger Cloudflare rules
- Workaround: Current response message hints at re-authentication, which is incorrect if issue is Cloudflare rate limiting. Users waste time re-authenticating when they should just wait.
- Fix approach: Add diagnostic endpoint to check if 403 is token-related (test with known good endpoint) vs Cloudflare-related (check response headers for Cloudflare signatures).

**Stream Iterator Can Leak Semaphore on Exception:**
- Symptoms: If exception occurs in producer thread before `release_semaphore()` is called, semaphore gets stuck. Subsequent requests hang waiting for semaphore.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 857-1050)
- Trigger: Network error or Perplexity API error during streaming
- Workaround: Restart API server to reset semaphore
- Fix approach: Wrap producer thread in try/finally to guarantee `release_semaphore()` is called; or use context manager for semaphore.

**Token Store File May Not Be Readable by Web Server:**
- Symptoms: API server fails silently to load token if permissions are wrong on `~/.config/perplexity-web-mcp/token`
- Files: `src/perplexity_web_mcp/token_store.py` (lines 48-51)
- Trigger: File created with restrictive permissions (0o600 on line 29) but API server runs as different user (e.g., in Docker, or under different user account)
- Workaround: Re-run `pwm-auth` to recreate token file with current user's permissions
- Fix approach: Check file readability before startup; provide clear error message if token file exists but is unreadable.

## Security Considerations

**Session Token Stored in Plaintext:**
- Risk: Session token written to `~/.config/perplexity-web-mcp/token` in plaintext with 0o600 permissions (line 29 in token_store.py). Anyone with filesystem access to user's home directory can read it.
- Files: `src/perplexity_web_mcp/token_store.py` (lines 17-34)
- Current mitigation: File has restrictive permissions (0o600, owner read/write only); tokens are session-based and auto-expire (~30 days)
- Recommendations:
  - Consider optional encryption at rest using `keyring` library for privileged storage
  - Add warning in docs about token security implications
  - Implement token refresh/rotation mechanism to reduce lifetime exposure
  - Add audit logging for token access

**No API Key Validation on Server Startup:**
- Risk: If `ANTHROPIC_API_KEY` env var is empty, server accepts ANY request (line 560 in api/server.py). This is intentional for Ollama compatibility but means server on public network is completely open.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 548-574)
- Current mitigation: CORS allows all origins, so security relies on network firewalling
- Recommendations:
  - Add startup warning if server will run on public IP without API key
  - Consider requiring API key for production deployments
  - Log all requests with IP address for audit trail
  - Add rate limiting by IP/user-agent

**File Upload Vulnerability - MIME Type Guessing:**
- Risk: MIME type determined by file extension using `mimetypes.guess_type()` (line 260 in core.py). User-controlled file extensions could result in wrong MIME type being sent to Perplexity.
- Files: `src/perplexity_web_mcp/core.py` (lines 260-261)
- Current mitigation: S3 upload happens to Perplexity infrastructure, not user-accessible
- Recommendations:
  - Use file content analysis (magic bytes) instead of extension for MIME type detection
  - Whitelist allowed MIME types rather than guessing
  - Validate file extension matches detected MIME type

**Tool Calling Disabled Without Clear Reason:**
- Risk: Tool calling support is completely disabled in api/server.py (line 52-53) with comment "models don't reliably follow format instructions", but this isn't surfaced in error messages. Users may think it's a bug rather than intentional limitation.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 52-53)
- Current mitigation: Tool calls accepted but silently ignored; no error returned
- Recommendations:
  - Return explicit "not supported" error when tools parameter is present
  - Document in API responses why tool calling isn't available
  - Track if Perplexity adds native tool support so feature can be re-enabled

## Performance Bottlenecks

**Single Semaphore Serializes All Concurrent Requests:**
- Problem: All concurrent API requests bottleneck through single `perplexity_semaphore` (line 511 in api/server.py, set to limit 1). This serializes even independent requests.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 486-511, 881-882, 1047-1048)
- Cause: `curl_cffi` library cannot handle concurrent requests within same session. Creating fresh client per request works, but semaphore is overly conservative.
- Improvement path:
  - Measure actual curl_cffi concurrency limits with separate session objects
  - Increase semaphore limit if fresh clients can truly run in parallel
  - Or implement connection pooling with proper session reuse

**Rate Limiting Hardcoded to 5 Second Minimum Between Requests:**
- Problem: `MIN_REQUEST_INTERVAL = 5.0` (line 490 in api/server.py) enforced even for fast machines. This was added to avoid Perplexity rate limits but may be overly aggressive.
- Files: `src/perplexity_web_mcp/api/server.py` (lines 490, 809-814, 924-928)
- Cause: Early versions had issues with burst requests. Limit was hardcoded instead of configurable.
- Improvement path:
  - Make rate limit configurable via `RATE_LIMIT_SECONDS` env var
  - Implement adaptive backoff: start at 1s, back off exponentially on 429 errors
  - Track last 429 error timestamp to only enforce limit when actually needed

**Token Bucket Rate Limiter Uses Busy Sleep:**
- Problem: `RateLimiter.acquire()` uses `sleep()` for synchronous waiting (line 70 in resilience.py), blocking the thread. Not ideal for async code.
- Files: `src/perplexity_web_mcp/resilience.py` (lines 58-72)
- Cause: Original synchronous design carried over to async contexts
- Improvement path:
  - Create async variant of `RateLimiter` for async code paths
  - Use `asyncio.sleep()` in async context instead of blocking `time.sleep()`

**Token Estimation Very Rough:**
- Problem: `estimate_tokens()` divides by 4 (line 629 in api/server.py), which is ballpark estimate. For large texts this creates 25% error in token counts.
- Files: `src/perplexity_web_mcp/api/server.py` (line 629)
- Cause: True token counting requires actual tokenizer (e.g., from transformers library), which adds dependency
- Improvement path:
  - Add optional `tiktoken` library for accurate token counting
  - Use tiktoken if available, fall back to rough estimate if not
  - Cache tokenizer instance to avoid repeated initialization

## Fragile Areas

**Response Parsing is Order-Dependent:**
- Files: `src/perplexity_web_mcp/core.py` (lines 418-471)
- Why fragile: Parsing logic looks for specific keys in specific order ("backend_uuid", then "read_write_token", then "thread_title"). If Perplexity API adds new fields or changes response structure, parsing silently skips data.
- Safe modification: Add debug logging to show all keys received in response data before parsing; add unit tests with known API response samples.
- Test coverage: No snapshot tests of actual Perplexity API responses. Changes to response format discovered only in production.

**Conversation State Reset Clears Everything Without Validation:**
- Files: `src/perplexity_web_mcp/core.py` (lines 211-217)
- Why fragile: `_reset_response_state()` unconditionally clears all state including `_stream_generator`. If called twice or at wrong time, previous streaming iteration is lost.
- Safe modification: Add guard to check if stream is in progress before resetting; or return early if already reset.
- Test coverage: No tests for state transitions (reset → ask → iterate).

**Citation Parsing Uses Regex Without Bounds Checking:**
- Files: `src/perplexity_web_mcp/core.py` (lines 388-408)
- Why fragile: `_format_citations()` regex `[(\d+)]` matches any number, but then indexes into `self._search_results` with `int(num) - 1`. If API returns citation [99] but only 5 search results, returns original citation text with no error.
- Safe modification: Validate citation index is within bounds before using; log warning for out-of-bounds citations.
- Test coverage: No tests with mismatched citation counts.

**Session Pool Cleanup Not Thread-Safe Under Contention:**
- Files: `src/perplexity_web_mcp/api/session_manager.py` (lines 194-222)
- Why fragile: Lock is held during entire `_cleanup_expired()` which includes iteration and deletion. But cleanup is called inside `get_or_create_session()` lock scope (line 251). If cleanup takes time, blocks session acquisition for all other threads.
- Safe modification: Move cleanup to background thread or separate operation; or split lock granularity.
- Test coverage: No load tests with many concurrent session requests.

## Scaling Limits

**Session Pool Has Fixed Size Limits:**
- Current capacity: `max_sessions=50` (line 508), `max_sessions_per_pool=10` (default in session_manager.py line 175)
- Limit: With these defaults, only 5 different system prompts can be served concurrently before overflow sessions created
- Scaling path: Make limits configurable via env vars; monitor pool stats and warn when hitting limits; implement LRU eviction policy instead of FIFO.

**Single curl_cffi Session per HTTPClient:**
- Current capacity: Only 1 session per client instance; API creates fresh client per request to avoid concurrency issues
- Limit: Cannot reuse HTTP connection pooling; every request opens new TCP connection
- Scaling path: Investigate if multiple sessions can run concurrently; or use different HTTP library with better async support.

**Memory Growth from Unpooled Overflow Sessions:**
- Current capacity: Session pool max is 50, but overflow sessions created if pool full are not tracked or cleaned up
- Limit: Unbounded growth if many concurrent requests exceed pool capacity
- Scaling path: Track overflow sessions in separate list with automatic cleanup after timeout; consider using weak references.

## Dependencies at Risk

**curl_cffi Concurrency Limitations:**
- Risk: `curl_cffi` library is not designed for concurrent requests within same session (workaround: fresh client per request). If library changes or performance improves, entire API design needs refactoring.
- Impact: API server cannot efficiently handle many concurrent users
- Migration plan: Consider switching to `httpx` or `aiohttp` for better async support; this would require rewriting HTTPClient and entire streaming logic.

**tenacity Retry Library Not Well Maintained:**
- Risk: `tenacity` library (used in resilience.py) is mature but has slow release cycle. If security issues discovered, may need to wait or patch manually.
- Impact: Retry logic cannot be updated quickly if vulnerability found
- Migration plan: Consider `backoff` library as alternative; or implement custom retry logic for better control.

**orjson JSON Library Dependency:**
- Risk: `orjson` is fast C extension with fewer contributors than standard library `json`. Breakage could force upgrade or fallback.
- Impact: JSON parsing would fail if `orjson` becomes unavailable
- Migration plan: Already handles `JSONDecodeError` (line 437 in core.py) - ensure graceful fallback to standard `json` library if orjson breaks.

## Missing Critical Features

**No Token Refresh/Rotation Mechanism:**
- Problem: Tokens expire (~30 days), but there's no way for long-running API server to refresh token automatically. Server must be restarted and user must re-authenticate manually.
- Blocks: Unattended API servers running for >30 days (e.g., production deployments)
- Fix approach: Implement token refresh endpoint; track token creation date; trigger automatic re-auth before expiration.

**No Request Deduplication:**
- Problem: If client retries request, server executes it again. No idempotency keys or deduplication.
- Blocks: Reliable request handling for distributed clients
- Fix approach: Add optional `request_id` parameter; cache responses by request_id for short time; return cached response if duplicate detected.

**No Conversation Persistence:**
- Problem: All conversations are in-memory and lost on server restart. No database storage.
- Blocks: Persistent chat history; resuming conversations across restarts
- Fix approach: Add optional SQLite storage for conversation history; make storage configurable.

## Test Coverage Gaps

**No Integration Tests with Real Perplexity API:**
- What's not tested: Actual API responses; model identifier validity; citation parsing with real data; file upload to S3
- Files: Missing `tests/integration/test_perplexity_api.py`
- Risk: Model identifier bugs (line 52-55 in models.py) only discovered in production use
- Priority: High - add smoke tests for each model to validate identifiers work

**No Load Tests for Concurrent Streaming:**
- What's not tested: Multiple concurrent streaming requests; semaphore behavior under contention; session pool cleanup under load
- Files: Missing `tests/load/test_concurrent_streams.py`
- Risk: Semaphore leak (line 881-917) or session pool corruption only discovered under production load
- Priority: Medium - add concurrent request generator

**No Error Recovery Tests:**
- What's not tested: Retry logic for transient errors; graceful handling of 403/429/timeout errors; session recovery after network failure
- Files: Missing `tests/unit/test_resilience.py`
- Risk: Transient failures crash instead of retry; semaphore stuck permanently
- Priority: High - add fault injection tests

**No Snapshot Tests for API Responses:**
- What's not tested: Response format matches Anthropic API spec; SSE event ordering; citation formatting
- Files: Missing `tests/unit/test_api_responses.py`
- Risk: API changes silently break clients; citation formatting changes go unnoticed
- Priority: Medium - add response validation tests

---

*Concerns audit: 2026-02-04*
