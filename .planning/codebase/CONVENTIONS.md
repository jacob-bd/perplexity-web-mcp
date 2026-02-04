# Coding Conventions

**Analysis Date:** 2026-02-04

## Naming Patterns

**Files:**
- Snake case: `token_store.py`, `http.py`, `core.py`
- Module names are descriptive and single-purpose: `exceptions.py`, `enums.py`, `resilience.py`
- Sub-packages use init files: `cli/__init__.py`, `mcp/__init__.py`, `api/__init__.py`

**Functions:**
- Snake case: `save_token()`, `get_logger()`, `log_request()`, `create_conversation()`
- Private functions prefixed with underscore: `_validate_files()`, `_upload_file()`, `_parse_line()`, `_reset_response_state()`
- Descriptive verb-based names: `configure_logging()`, `get_random_browser_profile()`

**Variables:**
- Snake case throughout: `session_token`, `file_list`, `file_size`, `search_results`
- Internal state prefixed with underscore: `_http`, `_session`, `_retry_config`, `_rate_limiter`
- Single underscore dummy variable for unused: `_` (configured in ruff as `dummy-variable-rgx = "^_$"`)
- Constant names in UPPER_CASE: `API_BASE_URL`, `DEFAULT_HEADERS`, `MAX_FILE_SIZE`, `MAX_FILES`

**Types:**
- PascalCase for classes: `Perplexity`, `Conversation`, `HTTPClient`, `RateLimiter`, `PerplexityError`
- Enums in PascalCase: `CitationMode`, `SearchFocus`, `LogLevel`, `SubscriptionTier`
- Dataclass names: `RetryConfig`, `UserInfo`, `_FileInfo`

## Code Style

**Formatting:**
- Line length: 120 characters (ruff config: `line-length = 120`)
- Indent width: 4 spaces (ruff config: `indent-width = 4`)
- Quote style: Double quotes (ruff config: `quote-style = "double"`)
- Line ending: LF (Unix-style)

**Linting:**
- Tool: Ruff (v0.14.14+)
- Config file: `pyproject.toml` under `[tool.ruff]` and `[tool.ruff.lint]`
- Selected rule sets: Pyflakes (F), pycodestyle (E/W), isort (I), pyupgrade (UP), flake8-bugbear (B), flake8-simplify (SIM), flake8-comprehensions (C4), flake8-pie (PIE), Ruff-specific (RUF), Perflint (PERF), refurb (FURB), flake8-use-pathlib (PTH), Pylint (PL)
- Ignored rules: `PLR0912` (too many branches), `PLR0913` (too many arguments), `PLR2004` (magic value)
- All rules are fixable: `fixable = ["ALL"]`

**Formatting Tools:**
- Prettier for non-Python files (markdown, JSON, YAML)
- Ruff format for Python code: `uv run ruff format`
- Type checking: `ty` (v0.0.14+)

**Pre-commit Hooks:**
- Located in `.pre-commit-config.yaml`
- Format check: `just format` (runs prettier and ruff)
- Lint check: `just lint` (runs prettier check, ruff check, ty check)
- Both hooks run on pre-commit and pre-push

## Import Organization

**Order:**
1. `from __future__ import annotations` (if using future type hints)
2. Standard library imports
3. Third-party imports (pydantic, orjson, curl_cffi, loguru, tenacity, rich, etc.)
4. Local imports from own package

**Lines after imports:** 2 blank lines between import sections (ruff isort config: `lines-after-imports = 2`)

**Path Aliases:**
- No aliases configured; imports use relative paths within package
- Example: `from .config import ClientConfig, ConversationConfig`

**Force-sort within sections:** true (ruff isort config: `force-sort-within-sections = true`)

**TYPE_CHECKING guard:**
- Used for deferred imports to avoid circular dependencies
- Example in `core.py`:
  ```python
  if TYPE_CHECKING:
      from collections.abc import Generator
      from re import Match
  ```

## Error Handling

**Exception Hierarchy:**
- Base: `PerplexityError(Exception)` - all custom exceptions inherit from this
- HTTP-specific: `HTTPError(PerplexityError)` - wraps HTTP failures with status, URL, response body
- Authentication: `AuthenticationError(HTTPError)` - raised on 403 with helpful message
- Rate limiting: `RateLimitError(HTTPError)` - raised on 429
- File operations: `FileUploadError(PerplexityError)`, `FileValidationError(PerplexityError)` - include file path
- Validation: `ResearchClarifyingQuestionsError(PerplexityError)` - includes clarifying questions list
- Parsing: `ResponseParsingError(PerplexityError)` - includes raw data for debugging
- Streaming: `StreamingError(PerplexityError)` - streaming-specific errors

**Pattern:**
- All custom exceptions define `__init__` with typed parameters
- Call `super().__init__(message)` to pass message to base Exception
- Store additional context as instance attributes (status_code, url, file_path, etc.)
- Use `__repr__` for HTTPError to show diagnostic info

**File Validation Pattern** (`core.py` `_validate_files` method):
```python
try:
    if not path.exists():
        raise FileValidationError(file_path, "File not found")
    # ... more checks
except FileValidationError as error:
    raise error  # Re-raise custom exceptions
except (FileNotFoundError, PermissionError) as error:
    raise FileValidationError(file_path, f"Cannot access file: {error}") from error
except OSError as error:
    raise FileValidationError(file_path, f"File system error: {error}") from error
```

## Logging

**Framework:** Loguru (v0.7.3+)

**Configuration:** `src/perplexity_web_mcp/logging.py`
- Default: DISABLED (no output unless explicitly configured)
- Per-module logger instances via `get_logger(__name__)`
- Console format with colors and timestamps
- File format with extra context, rotation disabled by default

**Patterns:**
- `logger.debug()` - Low-level operation details (HTTP requests, retries)
- `logger.info()` - High-level operations (client initialized, conversation started)
- `logger.warning()` - Recoverable issues (rate limit, retries)
- `logger.exception()` - Errors with traceback via `log_error()`

**Example from logging.py:**
```python
def log_request(method: str, url: str, *, params: dict[str, Any] | None = None) -> None:
    logger.debug(f"HTTP {method} {url} | params={params} body_size={body_size}")

def log_response(method: str, url: str, status_code: int, *, elapsed_ms: float | None = None) -> None:
    level = "DEBUG" if status_code < 400 else "WARNING"
    logger.log(level, f"HTTP {method} {url} | status={status_code} elapsed_ms={elapsed_ms:.2f}")
```

## Comments

**When to Comment:**
- Complex logic or non-obvious algorithms (e.g., citation parsing with regex)
- "Why" not "what" - explain intent, not implementation
- TODO/FIXME comments for incomplete work (example: `# TODO: check correct identifier` in models.py)
- File-level docstrings explain module purpose

**Example from token_store.py:**
```python
# Config file takes priority (it's updated by auth tools)
# Fall back to environment variable
```

**Module Docstrings:**
- Every file starts with docstring explaining purpose
- Example: `"""Token storage for Perplexity session tokens."""`
- Include relevant implementation notes in docstring

## Function Design

**Size:** Generally compact (10-50 lines typical)
- Larger methods extract logic into private helpers: `_validate_files()`, `_upload_file()`, `_parse_line()`
- Core classes like `Conversation` keep complex behavior in methods but delegate HTTP to `HTTPClient`

**Parameters:**
- Use type hints: `def __init__(self, session_token: str, config: ClientConfig | None = None) -> None:`
- Optional params with defaults: `timeout: int = 3600`, `max_retries: int = 3`
- Use `|` union syntax (Python 3.10+): `str | None`, `list[str] | None`
- Keyword-only args after `*` when appropriate: `def log_request(..., params: dict = None, body_size: int = None)`

**Return Values:**
- Always include return type hint: `-> str`, `-> list[_FileInfo]`, `-> None`
- Use `None` for void operations
- Generator types: `-> Generator[Response, None, None]`

**Docstrings:**
- Google-style convention (configured in ruff)
- Example from token_store.py:
  ```python
  """Load token from config directory or environment.

  Priority:
  1. ~/.config/perplexity-web-mcp/token file
  2. PERPLEXITY_SESSION_TOKEN environment variable

  Returns token string or None if not found.
  """
  ```

## Module Design

**Exports:**
- Use `__all__` lists to define public API
- Example from `__init__.py`:
  ```python
  __all__: list[str] = [
      "AuthenticationError",
      "Perplexity",
      "Conversation",
      # ... etc
  ]
  ```
- All exceptions and main classes explicitly exported

**Barrel Files:**
- `__init__.py` files re-export key classes and exceptions
- Single entry point: `from perplexity_web_mcp import Perplexity, Conversation`

**Class Slots:**
- Used in performance-critical classes for memory efficiency
- Example: `__slots__ = ("_http",)` in Perplexity
- `__slots__ = ("_session", "_timeout", "_retry_config", "_rate_limiter")` in HTTPClient
- Prevents dynamic attribute addition

**Frozen Dataclasses:**
- Config classes use frozen=True for immutability: `@dataclass(frozen=True, slots=True)`
- Model dataclass: `@dataclass(frozen=True, slots=True)` for Model
- Pydantic models use ConfigDict: `model_config = ConfigDict(frozen=True)` for Coordinates, SearchResultItem

**Context Managers:**
- Perplexity client supports `with` statement:
  ```python
  def __enter__(self) -> Perplexity:
      return self

  def __exit__(self, *args: Any) -> None:
      self.close()
  ```

**Configuration Classes:**
- BaseModel from Pydantic (v2.12.5+)
- ClientConfig frozen for immutability
- ConversationConfig allows mutation for defaults
- Type-safe with validators

---

*Convention analysis: 2026-02-04*
