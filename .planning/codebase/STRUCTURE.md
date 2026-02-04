# Codebase Structure

**Analysis Date:** 2026-02-04

## Directory Layout

```
perplexity-web-mcp/
├── src/perplexity_web_mcp/        # Main package
│   ├── __init__.py                # Package exports
│   ├── core.py                    # Perplexity client, Conversation class
│   ├── models.py                  # Model definitions
│   ├── config.py                  # ClientConfig, ConversationConfig
│   ├── enums.py                   # CitationMode, SearchFocus, etc.
│   ├── types.py                   # Response, SearchResultItem, Coordinates
│   ├── exceptions.py              # Custom exception hierarchy
│   ├── http.py                    # HTTPClient with retry/rate limiting
│   ├── constants.py               # API endpoints, headers, patterns
│   ├── limits.py                  # MAX_FILE_SIZE, MAX_FILES
│   ├── logging.py                 # Logging configuration
│   ├── resilience.py              # RetryConfig, RateLimiter, browser profiles
│   ├── token_store.py             # Token persistence and loading
│   ├── cli/                       # CLI utilities
│   │   ├── __init__.py
│   │   └── auth.py                # pwm-auth command (Perplexity login)
│   ├── mcp/                       # MCP server implementation
│   │   ├── __init__.py            # Server bootstrap
│   │   ├── __main__.py            # Entry point
│   │   └── server.py              # FastMCP tools (13 query tools + auth)
│   └── api/                       # Anthropic API-compatible server
│       ├── __init__.py            # Server bootstrap
│       ├── server.py              # FastAPI endpoints (/v1/messages, /v1/chat/completions)
│       ├── session_manager.py     # Conversation caching + system prompt distillation
│       └── tool_calling.py        # Tool calling support (currently disabled)
├── docs/                          # Documentation
├── pyproject.toml                 # Project metadata, dependencies, CLI entry points
└── .planning/                     # GSD planning documents
```

## Directory Purposes

**`src/perplexity_web_mcp/`:**
- Purpose: Core package containing all client logic and server implementations
- Contains: Python modules for HTTP, conversation management, models, configuration
- Key files: `core.py`, `http.py`

**`src/perplexity_web_mcp/cli/`:**
- Purpose: Command-line authentication tool
- Contains: `auth.py` - user info fetching, token extraction, MFA handling
- Key files: `auth.py`

**`src/perplexity_web_mcp/mcp/`:**
- Purpose: Model Context Protocol server implementation
- Contains: FastMCP server with 13 tools (query, auth, model-specific)
- Key files: `server.py` (446 lines)

**`src/perplexity_web_mcp/api/`:**
- Purpose: Anthropic API and OpenAI Chat Completions API compatible server
- Contains: FastAPI application, session management, conversation priming
- Key files: `server.py` (1300 lines), `session_manager.py`

## Key File Locations

**Entry Points:**
- `src/perplexity_web_mcp/mcp/__main__.py`: MCP server entry point (pwm-mcp command)
- `src/perplexity_web_mcp/api/server.py`: API server entry point (pwm-api command), `run_server()` function
- `src/perplexity_web_mcp/cli/auth.py`: Auth CLI entry point (pwm-auth command), `main()` function

**Configuration:**
- `src/perplexity_web_mcp/config.py`: Pydantic models for `ClientConfig` and `ConversationConfig`
- `src/perplexity_web_mcp/constants.py`: API endpoints, headers, regex patterns
- `src/perplexity_web_mcp/limits.py`: File upload limits (MAX_FILE_SIZE, MAX_FILES)

**Core Logic:**
- `src/perplexity_web_mcp/core.py`: `Perplexity` client factory and `Conversation` state machine (554 lines)
- `src/perplexity_web_mcp/http.py`: `HTTPClient` with curl_cffi, retries, rate limiting (265 lines)
- `src/perplexity_web_mcp/models.py`: `Model` dataclass and `Models` class with 13+ variants
- `src/perplexity_web_mcp/types.py`: Pydantic response types

**Utilities:**
- `src/perplexity_web_mcp/token_store.py`: Token file and environment variable management
- `src/perplexity_web_mcp/resilience.py`: `RetryConfig`, `RateLimiter`, browser profile rotation
- `src/perplexity_web_mcp/logging.py`: Loguru configuration and request/response logging
- `src/perplexity_web_mcp/exceptions.py`: Exception hierarchy

**Testing:**
- No test files in codebase (tests not yet implemented)

## Naming Conventions

**Files:**
- Core modules: `{module}.py` (e.g., `core.py`, `http.py`, `models.py`)
- Classes: `PascalCase` (e.g., `Perplexity`, `Conversation`, `HTTPClient`)
- Functions: `snake_case` (e.g., `create_conversation()`, `_execute()`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`, `SESSION_COOKIE_NAME`)

**Directories:**
- Packages: lowercase with underscores (e.g., `cli/`, `mcp/`, `api/`)
- Purpose: Group related functionality by domain (CLI, MCP, API adapters)

**Import Organization (from `pyproject.toml` isort config):**
1. Standard library imports
2. Third-party imports (curl_cffi, pydantic, fastmcp, fastapi)
3. Relative imports (from `.core import`, etc.)
- Lines after imports: 2
- Force sort within sections: true
- Example from `mcp/server.py`:
  ```python
  from typing import Literal
  from fastmcp import FastMCP
  from perplexity_web_mcp.config import ClientConfig, ConversationConfig
  from perplexity_web_mcp.token_store import get_token_or_raise
  ```

## Where to Add New Code

**New MCP Tool:**
- Primary code: `src/perplexity_web_mcp/mcp/server.py`
- Pattern: Add function handler + register with `@mcp.tool()` decorator
- Example: Existing tools like `pplx_query`, `pplx_auth_status`

**New API Endpoint:**
- Primary code: `src/perplexity_web_mcp/api/server.py`
- Pattern: Add FastAPI route handler, use existing `_create_conversation()` helper
- Example: Existing endpoints `/v1/messages`, `/v1/chat/completions`

**New Conversation Feature:**
- Implementation: `src/perplexity_web_mcp/core.py` (Conversation class)
- Add method to `Conversation` class (e.g., `follow_up()`, `regenerate()`)
- Update `ConversationConfig` if new configuration needed

**New Model:**
- Add to `src/perplexity_web_mcp/models.py` `Models` class
- Follow pattern: `NAME = Model(identifier="api_identifier")`
- Include docstring with model description and capabilities

**Configuration Changes:**
- Conversation defaults: `src/perplexity_web_mcp/config.py` `ConversationConfig`
- HTTP client settings: `src/perplexity_web_mcp/config.py` `ClientConfig`
- API endpoints/headers: `src/perplexity_web_mcp/constants.py`

**Utilities:**
- Shared helpers: `src/perplexity_web_mcp/` (core package root)
- Error types: `src/perplexity_web_mcp/exceptions.py`
- Resilience patterns: `src/perplexity_web_mcp/resilience.py`

## Special Directories

**`.planning/`:**
- Purpose: GSD (Getting Stuff Done) planning documents
- Generated: Yes (by GSD commands)
- Committed: Yes (planning documents are part of repo)
- Contents: `ARCHITECTURE.md`, `STRUCTURE.md`, `STACK.md`, `INTEGRATIONS.md`, etc.

**`docs/`:**
- Purpose: User-facing documentation
- Generated: No (manually maintained)
- Committed: Yes
- Contents: Markdown files for setup, API reference, examples

**`src/perplexity_web_mcp/__pycache__/`, `api/__pycache__/`, etc.:**
- Purpose: Python bytecode cache
- Generated: Yes (automatic)
- Committed: No (in .gitignore)

## File Size and Complexity

**Large files (>300 lines):**
- `src/perplexity_web_mcp/api/server.py` (1300 lines) - FastAPI server, multiple endpoints, response formatting
- `src/perplexity_web_mcp/core.py` (554 lines) - Perplexity client, Conversation class, streaming logic, file upload

**Medium files (100-300 lines):**
- `src/perplexity_web_mcp/http.py` (265 lines) - HTTP client, request/response handling
- `src/perplexity_web_mcp/mcp/server.py` (446 lines) - MCP tools and handlers

**Small files (<100 lines):**
- `src/perplexity_web_mcp/config.py` - Pydantic configuration classes
- `src/perplexity_web_mcp/enums.py` - Enumeration definitions
- `src/perplexity_web_mcp/models.py` - Model definitions
- `src/perplexity_web_mcp/types.py` - Response types
- `src/perplexity_web_mcp/exceptions.py` - Exception classes
- `src/perplexity_web_mcp/constants.py` - API constants
- `src/perplexity_web_mcp/limits.py` - Upload limits
- `src/perplexity_web_mcp/token_store.py` - Token persistence
- `src/perplexity_web_mcp/resilience.py` - Retry/rate limiting
- `src/perplexity_web_mcp/logging.py` - Logging setup
- `src/perplexity_web_mcp/cli/auth.py` - Authentication CLI

---

*Structure analysis: 2026-02-04*
