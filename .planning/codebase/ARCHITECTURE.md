# Architecture

**Analysis Date:** 2026-02-04

## Pattern Overview

**Overall:** Three-layer client-server architecture with pluggable runtime adapters.

**Key Characteristics:**
- **Core logic isolated from runtimes:** `core.py` implements Perplexity API client independently of serving mechanism
- **Multiple serving adapters:** MCP server (FastMCP), Anthropic API server (FastAPI), CLI auth tool
- **Stateless request handling:** Each request creates fresh client/conversation instances to avoid session state issues
- **Resilience built-in:** Retry logic, rate limiting, and error recovery at HTTP layer

## Layers

**HTTP Transport Layer:**
- Purpose: Handle HTTP communication with Perplexity API, including authentication, retries, and rate limiting
- Location: `src/perplexity_web_mcp/http.py`
- Contains: `HTTPClient` class wrapping curl_cffi sessions with tenacity retries
- Depends on: `curl_cffi`, `tenacity`, `resilience.py`
- Used by: `Conversation` class (for API calls), both server implementations

**Core Conversation Layer:**
- Purpose: Manage individual conversations and handle the ask/answer cycle with search integration
- Location: `src/perplexity_web_mcp/core.py`
- Contains: `Perplexity` client factory, `Conversation` state machine for queries
- Depends on: `HTTPClient`, `models.py`, `config.py`, `enums.py`, `types.py`
- Used by: MCP server, API server, any client code

**Server Adapter Layer:**
- Purpose: Translate protocol-specific requests into core Perplexity calls
- Location: `src/perplexity_web_mcp/mcp/server.py` and `src/perplexity_web_mcp/api/server.py`
- Contains: Tool handlers (MCP), endpoint handlers (FastAPI)
- Depends on: Core layer, token management, session managers
- Used by: FastMCP and FastAPI runtimes

## Data Flow

**Web Query Flow (MCP):**

1. User invokes tool (e.g., `pplx_query`) via MCP interface
2. MCP server calls `_get_client()` → creates fresh `Perplexity` instance with current session token
3. `_ask()` helper executes: creates `Conversation`, calls `.ask(query)`
4. `Conversation._execute()` flow:
   - Initialize search session via `HTTPClient.init_search()`
   - Build request payload with model, search focus, citations
   - Stream or complete response via SSE or blocking HTTP call
5. Response parsed into `Response` object (answer + search results)
6. MCP formats response for AI model

**API Server Flow (FastAPI):**

1. Client sends POST `/v1/messages` or `/v1/chat/completions`
2. FastAPI endpoint extracts model, messages, system prompt
3. `ConversationManager` distills system prompt and checks cache
4. If cached conversation exists: reuse it, append new message
5. If not cached: create fresh conversation, prime with distilled prompt
6. Execute query via core layer
7. Stream or return response in Anthropic/OpenAI format

**State Management:**

- **Per-request isolation:** No global state. Each MCP/API call creates fresh client/conversation
- **Token persistence:** Stored in `~/.config/perplexity-web-mcp/token` (loaded by `token_store.py`)
- **Session caching (API only):** Conversations cached by system prompt hash (60s TTL) in `ConversationManager`
- **Conversation state:** `Conversation` instance holds answer, search results, chunks, stream generator

## Key Abstractions

**Conversation:**
- Purpose: Represent a single Q&A exchange with Perplexity, including streaming and state
- Examples: `src/perplexity_web_mcp/core.py` lines 87-554
- Pattern: State machine (idle → streaming/complete → parsed)
  - `ask()` initiates query
  - `_stream()` yields `Response` chunks (async iteration)
  - `_complete()` blocks until answer received
  - Properties expose answer, search results, title

**Model:**
- Purpose: Encapsulate model identifier and mode (always "copilot" for web search)
- Examples: `src/perplexity_web_mcp/models.py` defines `Models` class with 13+ model variants
- Pattern: Frozen dataclass for immutability and configuration

**Configuration Objects:**
- `ClientConfig` (`src/perplexity_web_mcp/config.py`): HTTP client settings (timeout, retries, rate limit, fingerprint rotation)
- `ConversationConfig` (`src/perplexity_web_mcp/config.py`): Conversation defaults (model, citation mode, search focus, time range)
- Pattern: Pydantic BaseModel for validation and type safety

**Response Types:**
- `Response` (core payload): title, answer, chunks, search_results, conversation_uuid
- `SearchResultItem`: title, snippet, url
- Pattern: Pydantic BaseModel (frozen) for immutability

## Entry Points

**MCP Server (`pwm-mcp`):**
- Location: `src/perplexity_web_mcp/mcp/__main__.py` → `mcp/__init__.py` → `mcp/server.py`
- Triggers: Command line or Claude MCP configuration
- Responsibilities:
  - Instantiate FastMCP server with 13 tools (query, auth, model-specific)
  - Load token from storage, validate
  - Create fresh client per request
  - Format responses for AI models

**API Server (`pwm-api`):**
- Location: `src/perplexity_web_mcp/api/__init__.py` → `api/server.py`
- Triggers: FastAPI startup (uvicorn)
- Responsibilities:
  - Provide Anthropic Messages API and OpenAI Chat Completions API endpoints
  - Manage session cache and conversation priming
  - Stream or return responses in protocol format

**Auth CLI (`pwm-auth`):**
- Location: `src/perplexity_web_mcp/cli/auth.py`
- Triggers: User runs `pwm-auth` from terminal
- Responsibilities:
  - Guide user through Perplexity login/MFA
  - Extract session token from browser
  - Save token to config file
  - Display user info and subscription tier

## Error Handling

**Strategy:** Layered exception hierarchy with context preservation.

**Exception Hierarchy:**
```
PerplexityError (base)
├── HTTPError (status code, URL, body preserved)
│   ├── AuthenticationError (403)
│   └── RateLimitError (429)
├── FileUploadError (file path, reason)
├── FileValidationError (file path, reason)
├── ResearchClarifyingQuestionsError (questions list)
├── ResponseParsingError (raw data preserved)
└── StreamingError
```

**Patterns:**
- HTTP client catches network errors, converts to typed exceptions
- Conversation layer converts API errors to domain exceptions
- Retries handled by `tenacity` decorator at HTTP layer
- 403 errors trigger authentication error with remediation guidance
- 429 errors include retry-after hints

## Cross-Cutting Concerns

**Logging:**
- Configurable via `ClientConfig.logging_level`
- Implementation: `loguru` logger in `logging.py`
- Controls debug output at HTTP client level (requests, responses, retries)
- Disabled by default for safety

**Validation:**
- File uploads: checked for existence, size, type in `Conversation._validate_files()`
- Model configuration: enum-based (Pydantic validation)
- Query text: no restrictions (client sends as-is)

**Authentication:**
- Session token stored in config file (`~/.config/perplexity-web-mcp/token`)
- Fallback to `PERPLEXITY_SESSION_TOKEN` environment variable
- Injected into HTTP headers and cookies at `HTTPClient` initialization
- Re-authentication tools available in MCP server for token refresh

---

*Architecture analysis: 2026-02-04*
