# Technology Stack

**Analysis Date:** 2026-02-04

## Languages

**Primary:**
- Python 3.10+ - Core language for CLI, MCP server, and API server. Version constraint: `>=3.10,<3.14`

## Runtime

**Environment:**
- Python 3.10, 3.11, 3.12, 3.13 (supported versions in `pyproject.toml`)
- uv - Package manager (primary) or pip (alternative)

**Package Manager:**
- uv (primary) - Configured in build system (`pyproject.toml` with `uv_build` backend)
- pip (fallback) - Supported as alternative
- Lockfile: `uv.lock` (present)

## Frameworks

**Core:**
- FastMCP 2.14.4+ - MCP server implementation (`src/perplexity_web_mcp/mcp/server.py`)
- FastAPI 0.115.0+ - REST API server implementation (`src/perplexity_web_mcp/api/server.py`)
- Uvicorn 0.30.0+ - ASGI server for FastAPI

**HTTP Client:**
- curl-cffi 0.14.0+ - Core HTTP client with TLS fingerprint rotation and browser impersonation (`src/perplexity_web_mcp/http.py`)

**Utilities:**
- Pydantic 2.12.5+ - Data validation and configuration models
- Rich 13.0.0+ - Terminal UI and formatting for CLI
- loguru 0.7.3+ - Structured logging framework
- orjson 3.11.6+ - Fast JSON serialization
- python-dotenv 1.0.0+ - Environment variable loading

## Key Dependencies

**Critical:**
- curl-cffi 0.14.0+ - Enables browser-like HTTP requests with fingerprint rotation (prevents Cloudflare/bot detection blocks)
- tenacity 9.1.2+ - Retry logic with exponential backoff and jitter for resilience
- Pydantic 2.12.5+ - Type validation for config, models, and API responses

**Infrastructure:**
- FastMCP 2.14.4+ - MCP protocol implementation for Claude Code and Cursor integration
- FastAPI 0.115.0+ - REST API framework for Anthropic/OpenAI API compatibility
- Uvicorn 0.30.0+ - Production-grade ASGI server

**Build/Testing:**
- ruff 0.14.14+ - Code linting and formatting (used via `pyproject.toml` lint config)
- pytest 9.0.2+ - Testing framework (in dev dependencies)
- beautifulsoup4 4.14.3+ - HTML parsing (dev dependency for test utilities)

## Configuration

**Environment:**
- Configuration stored in `~/.config/perplexity-web-mcp/token` (session token file with 0o600 permissions)
- Token source priority (in `src/perplexity_web_mcp/token_store.py`):
  1. File: `~/.config/perplexity-web-mcp/token` (updated by auth tools)
  2. Env var: `PERPLEXITY_SESSION_TOKEN` (fallback)

**Environment Variables:**
- `PERPLEXITY_SESSION_TOKEN` - Perplexity web session token (required)
- `HOST` - API server bind address (default: "0.0.0.0")
- `PORT` - API server port (default: 8080)
- `LOG_LEVEL` - Logging level for API server (default: "INFO")
- `DEFAULT_MODEL` - Default model for API (default: "auto")
- `ANTHROPIC_API_KEY` - Optional auth token for API server

**Build:**
- pyproject.toml - Build configuration with entry points:
  - `pwm-auth` → `perplexity_web_mcp.cli.auth:main` (Authentication CLI)
  - `pwm-mcp` → `perplexity_web_mcp.mcp:run_server` (MCP server)
  - `pwm-api` → `perplexity_web_mcp.api:run_server` (API server)

**Code Quality:**
- `.ruff.toml` equivalent in `pyproject.toml` with:
  - Line length: 120
  - Indent width: 4
  - Linting rules: F, E, W, I, UP, B, SIM, C4, PIE, RUF, PERF, FURB, PTH, PL (selected set with PLR0912, PLR0913, PLR2004 ignored)
  - Format: double quotes, LF line endings, docstring code formatting enabled
  - Import sorting: 2 lines after imports, isort-compatible

## Platform Requirements

**Development:**
- Python 3.10+ (local development)
- Git (version control)
- uv or pip (dependency management)
- curl/curl-cffi compatible system (Windows, macOS, Linux all supported)

**Production:**
- Python 3.10+ runtime
- Network access to `https://www.perplexity.ai` (API endpoint: `https://www.perplexity.ai/rest/sse/perplexity_ask`, `https://www.perplexity.ai/search/new`, etc.)
- For API server deployment: any ASGI-compatible host (Heroku, Railway, AWS Lambda with adapter, DigitalOcean, etc.)

## CLI Entry Points

**pwm-auth:**
- Location: `src/perplexity_web_mcp/cli/auth.py`
- Purpose: Authenticate with Perplexity, retrieve user info, save session token
- Output: Session token saved to `~/.config/perplexity-web-mcp/token`

**pwm-mcp:**
- Location: `src/perplexity_web_mcp/mcp/server.py`
- Purpose: Run FastMCP server for MCP clients (Claude Code, Cursor, etc.)
- Requires: `PERPLEXITY_SESSION_TOKEN` env var or saved token

**pwm-api:**
- Location: `src/perplexity_web_mcp/api/server.py`
- Purpose: Run FastAPI server with Anthropic/OpenAI API compatibility
- Requires: `PERPLEXITY_SESSION_TOKEN` env var or saved token
- Default binding: `0.0.0.0:8080`

---

*Stack analysis: 2026-02-04*
