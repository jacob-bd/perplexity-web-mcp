# External Integrations

**Analysis Date:** 2026-02-04

## APIs & External Services

**Perplexity Web Interface:**
- Perplexity AI web API at `https://www.perplexity.ai`
  - SDK/Client: curl-cffi Session (`src/perplexity_web_mcp/http.py`)
  - Auth: Session cookie `__Secure-next-auth.session-token`
  - Base URL: `https://www.perplexity.ai`
  - Endpoints:
    - `POST /rest/sse/perplexity_ask` - Stream-based query execution with SSE
    - `POST /search/new` - Initialize search sessions
    - `POST /rest/uploads/batch_create_upload_urls` - File upload URL generation
    - `GET /api/user` - User profile and subscription info (in `src/perplexity_web_mcp/cli/auth.py`)

**Model APIs (Proxied via Perplexity):**
- OpenAI GPT-5.2 (with thinking mode)
- Google Gemini 3 Flash/Pro (with thinking mode)
- Anthropic Claude 4.5 Sonnet/Opus (with thinking mode)
- xAI Grok 4.1 (with thinking mode)
- Moonshot Kimi K2.5 (thinking mode only)
- Perplexity Sonar (native model)
- Perplexity Deep Research (in-depth reports)

**AWS S3 Integration:**
- Purpose: File storage for uploaded files through Perplexity
- Implementation: `src/perplexity_web_mcp/core.py` lines ~430-470
  - Presigned URL generation via `/rest/uploads/batch_create_upload_urls`
  - Fields extraction for multipart upload to `s3_bucket_url`
  - Object retrieval from `s3_object_url`
  - Client: curl-cffi Session for S3 multipart POST
- Flow: Request upload URL → get S3 presigned URL + fields → POST file to S3 → get object URL

## Data Storage

**Token Storage:**
- Local filesystem only - `~/.config/perplexity-web-mcp/token`
- Location: `src/perplexity_web_mcp/token_store.py`
- Format: Plain text (JWT-like session token string)
- Permissions: 0o600 (owner read/write only)
- Fallback: `PERPLEXITY_SESSION_TOKEN` environment variable

**Session Management:**
- In-memory conversation state per session (no persistence)
- API server: Thread-safe conversation manager in `src/perplexity_web_mcp/api/session_manager.py`
  - Stores active conversations keyed by conversation UUID
  - LRU cleanup for stale conversations
  - Thread-safe with locks

**Caching:**
- Browser fingerprint rotation enabled by default (disabled in MCP for stability)
- HTTP connection pooling via curl-cffi Session
- No external cache service (Redis, Memcached, etc.) - not used

**File Storage:**
- Temporary file uploads only - uploaded via S3 presigned URLs
- No persistent file storage - files exist only during conversation context
- Max file size: `2MB` per file (defined in `src/perplexity_web_mcp/limits.py`)
- Max files: 10 per request

## Authentication & Identity

**Perplexity Auth:**
- Provider: Perplexity.ai (custom web-based)
- Implementation: Email-based verification code flow (`src/perplexity_web_mcp/cli/auth.py`)
  - POST `/api/mobile/auth/request_code` - Request 6-digit verification code
  - POST `/api/mobile/auth/complete` - Validate code and get session token
  - GET `/api/user` - Retrieve authenticated user info
- Session Token Format: NextAuth JWT-like token stored as `__Secure-next-auth.session-token` cookie
- Token Lifespan: ~30 days (typical session duration)
- MCP Auth Tools (in `src/perplexity_web_mcp/mcp/server.py`):
  - `pplx_auth_status` - Check current token validity
  - `pplx_auth_request_code` - Request verification code
  - `pplx_auth_complete` - Complete auth with code

**User Information:**
- Subscription Detection: `src/perplexity_web_mcp/cli/auth.py` `UserInfo` class
  - Tier: FREE, PRO ($20/mo), MAX ($200/mo), EDUCATION_PRO ($10/mo), UNKNOWN
  - Status: Subscription status field
  - Source: Payment provider (e.g., stripe)
  - Organization: Corporate account indicator
  - Email, username, name, profile image

## Monitoring & Observability

**Error Tracking:**
- None detected - custom exception types but no external service integration
- Exceptions defined in `src/perplexity_web_mcp/exceptions.py`:
  - AuthenticationError (403 Forbidden)
  - RateLimitError (429 Too Many Requests)
  - HTTPError (generic 4xx/5xx)
  - ResponseParsingError
  - FileUploadError

**Logging:**
- loguru 0.7.3+ - Structured logging framework
- Configuration: `src/perplexity_web_mcp/logging.py`
- Log levels: DEBUG, INFO, WARNING, ERROR (configurable via ClientConfig)
- Optional file logging: `ClientConfig.log_file` parameter
- HTTP logging helpers: `log_request()`, `log_response()`, `log_retry()` functions
- No external logging service (Datadog, Sentry, etc.)

**Request Tracing:**
- Minimal - correlation IDs used in conversation UUIDs (`uuid4()`)
- HTTP client logs include request/response details on DEBUG level

## CI/CD & Deployment

**Hosting:**
- Not detected - codebase is library/server package, not hosted service
- Can be deployed to: Railway, Heroku, AWS Lambda, DigitalOcean App Platform, any ASGI host

**CI Pipeline:**
- Not detected - no GitHub Actions workflows in `.github/` (checked)
- Pre-commit hooks available: `.pre-commit-config.yaml` for linting/formatting

**Build:**
- pyproject.toml with uv_build backend
- Optional extras: `[mcp]` (FastMCP), `[api]` (FastAPI/Uvicorn), `[all]`

## Environment Configuration

**Required environment variables:**
- `PERPLEXITY_SESSION_TOKEN` - Session token (OR stored in `~/.config/perplexity-web-mcp/token`)

**Optional environment variables (API server):**
- `HOST` - Bind address (default: "0.0.0.0")
- `PORT` - Bind port (default: 8080)
- `LOG_LEVEL` - Logging level (default: "INFO")
- `DEFAULT_MODEL` - Default model (default: "auto")
- `ANTHROPIC_API_KEY` - Optional API key for request validation

**Secrets location:**
- Session token file: `~/.config/perplexity-web-mcp/token` (created by `pwm-auth`)
- File permissions: 0o600 (owner read/write only)
- Never committed to git: `.gitignore` excludes `.env`

## Webhooks & Callbacks

**Incoming:**
- Not detected - MCP server and API server are request-response only, no webhook endpoints

**Outgoing:**
- Perplexity auth callback: OAuth-style redirect in `src/perplexity_web_mcp/cli/auth.py`
  - `callbackUrl` parameter in auth request: `"https://www.perplexity.ai/?login-source=floatingSignup"`
  - Used for browser-based auth flow validation

## API Compatibility Layers

**Anthropic Messages API:**
- Implementation: `src/perplexity_web_mcp/api/server.py`
- Version: 2023-06-01
- Endpoint: `POST /v1/messages`
- Features:
  - Streaming and non-streaming responses
  - System message support
  - Tool use (experimental, currently disabled due to model limitations)
  - Model name mapping for Claude variants
  - Citation extraction from Perplexity responses

**OpenAI Chat Completions API:**
- Implementation: `src/perplexity_web_mcp/api/server.py`
- Endpoint: `POST /v1/chat/completions`
- Features:
  - Streaming and non-streaming responses
  - Model name mapping for compatibility
  - Message history preservation across turns

**MCP (Model Context Protocol):**
- Implementation: `src/perplexity_web_mcp/mcp/server.py`
- Tool-based interface with FastMCP
- Model-specific tools: `pplx_query`, `pplx_gpt52`, `pplx_claude_sonnet`, `pplx_gemini_flash`, `pplx_grok`, `pplx_kimi`
- Auth tools: `pplx_auth_status`, `pplx_auth_request_code`, `pplx_auth_complete`
- Citation mode support (DEFAULT, CLEAN, CITED)
- Search focus options (WEB, ACADEMIC, SOCIAL, FINANCE)

---

*Integration audit: 2026-02-04*
