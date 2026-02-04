# Testing Patterns

**Analysis Date:** 2026-02-04

## Test Framework

**Runner:**
- pytest (v9.0.2+)
- Config: Configured in `pyproject.toml` under `[dependency-groups]` tests
- Located at: `pyproject.toml`

**Assertion Library:**
- pytest's built-in assertions (no custom assertion library configured)
- Uses standard Python `assert` statements

**Run Commands:**
```bash
just test                      # Run all tests with verbose output and xfail tracking
uv run pytest -v --xfail-tb   # Full pytest command (shows traceback for expected failures)
uv run pytest                  # Basic run without flags
```

## Test File Organization

**Location:**
- No tests found in codebase currently
- Tests should be co-located with source code or in dedicated `tests/` directory
- Based on project structure, recommendation: `tests/` directory at root level parallel to `src/`

**Naming:**
- Convention: `test_*.py` or `*_test.py` files
- Test functions: `test_function_name()`
- Test classes: `TestClassName`

**Structure (Not Yet Implemented):**
Recommended structure based on pytest defaults:
```
tests/
├── conftest.py              # Shared fixtures and configuration
├── test_core.py             # Tests for src/perplexity_web_mcp/core.py
├── test_http.py             # Tests for src/perplexity_web_mcp/http.py
├── test_exceptions.py       # Exception handling tests
├── test_config.py           # Configuration validation tests
├── cli/
│   └── test_auth.py         # Tests for CLI auth
└── mcp/
    └── test_server.py       # Tests for MCP server
```

## Test Structure

**Suite Organization (Recommended Pattern):**

Based on codebase structure, tests should follow this pattern:

```python
"""Tests for perplexity_web_mcp.core module."""

import pytest
from unittest.mock import Mock, patch, MagicMock

from perplexity_web_mcp.core import Perplexity, Conversation
from perplexity_web_mcp.config import ClientConfig, ConversationConfig
from perplexity_web_mcp.exceptions import (
    AuthenticationError,
    FileValidationError,
    HTTPError,
)


class TestPerplexityClient:
    """Tests for Perplexity client initialization and lifecycle."""

    def test_client_init_with_valid_token(self):
        """Client initializes with valid session token."""
        token = "test_token_12345"
        client = Perplexity(session_token=token)
        assert client is not None

    def test_client_init_rejects_empty_token(self):
        """Client raises ValueError on empty session token."""
        with pytest.raises(ValueError, match="session_token cannot be empty"):
            Perplexity(session_token="")

    def test_context_manager_support(self):
        """Client supports context manager protocol."""
        with Perplexity(session_token="test_token") as client:
            assert client is not None
            # __exit__ should not raise

    @patch("perplexity_web_mcp.core.HTTPClient")
    def test_client_close(self, mock_http_client):
        """Client.close() calls HTTPClient.close()."""
        client = Perplexity(session_token="test_token")
        client.close()
        client._http.close.assert_called_once()


class TestConversation:
    """Tests for Conversation management."""

    @patch("perplexity_web_mcp.core.HTTPClient")
    def test_conversation_initialization(self, mock_http_client):
        """Conversation initializes with config."""
        mock_http = Mock()
        config = ConversationConfig()
        conv = Conversation(mock_http, config)
        assert conv is not None

    @patch("perplexity_web_mcp.core.HTTPClient")
    def test_conversation_properties(self, mock_http_client):
        """Conversation exposes answer, title, search_results, uuid properties."""
        mock_http = Mock()
        conv = Conversation(mock_http, ConversationConfig())

        # Properties should be accessible even if empty
        assert conv.answer is None
        assert conv.title is None
        assert conv.search_results == []
        assert conv.uuid is None


class TestFileValidation:
    """Tests for file validation in Conversation._validate_files()."""

    @patch("perplexity_web_mcp.core.HTTPClient")
    def test_validate_files_empty_list(self, mock_http_client):
        """Empty file list returns empty result."""
        mock_http = Mock()
        conv = Conversation(mock_http, ConversationConfig())
        result = conv._validate_files(None)
        assert result == []

    @patch("perplexity_web_mcp.core.HTTPClient")
    def test_validate_files_too_many_files(self, mock_http_client, tmp_path):
        """FileValidationError raised when file count exceeds MAX_FILES."""
        mock_http = Mock()
        conv = Conversation(mock_http, ConversationConfig())

        # Create dummy files
        files = [tmp_path / f"file{i}.txt" for i in range(10)]
        for f in files:
            f.write_text("content")

        with pytest.raises(FileValidationError, match="Too many files"):
            conv._validate_files([str(f) for f in files])


class TestErrorHandling:
    """Tests for custom exception classes."""

    def test_perplexity_error_base(self):
        """PerplexityError stores message."""
        from perplexity_web_mcp.exceptions import PerplexityError
        err = PerplexityError("test message")
        assert err.message == "test message"
        assert str(err) == "test message"

    def test_authentication_error(self):
        """AuthenticationError sets status code 403."""
        err = AuthenticationError()
        assert err.status_code == 403
        assert "403" in str(err)

    def test_http_error_repr(self):
        """HTTPError __repr__ shows diagnostic info."""
        err = HTTPError("failed", status_code=500, url="https://test.com")
        repr_str = repr(err)
        assert "status=500" in repr_str
        assert "https://test.com" in repr_str

    def test_file_validation_error(self):
        """FileValidationError includes file path."""
        err = FileValidationError("/path/to/file.txt", "File too large")
        assert "/path/to/file.txt" in str(err)
        assert "File too large" in str(err)
```

**Patterns:**
- Class-based organization: `TestClassName` for grouping related tests
- Descriptive test names: `test_what_it_does_and_expected_result()`
- Setup via fixtures (conftest.py, to be created) for shared mocks and temporary data
- Teardown via pytest's automatic cleanup
- Assertions use pytest's assertion rewriting

## Mocking

**Framework:** unittest.mock (standard library)
- `Mock()` - Generic mock object
- `patch()` - Replace objects during tests
- `MagicMock()` - Mock with magic methods
- `patch.object()` - Patch specific class methods

**Patterns (Recommended):**

```python
# Mock HTTP client for isolated unit tests
@patch("perplexity_web_mcp.core.HTTPClient")
def test_conversation_uses_http_client(mock_http_class):
    mock_http = Mock()
    conv = Conversation(mock_http, ConversationConfig())
    # mock_http is the injected dependency

# Patch a specific method
@patch.object(HTTPClient, "post")
def test_http_post_call(mock_post):
    mock_post.return_value = Mock(status_code=200, json=lambda: {})
    # Call code that uses post()
    # Assert mock_post.assert_called_once_with(...)

# Set return values
mock_http = Mock()
mock_http.post.return_value = Mock(status_code=200)
mock_http.post.return_value.json.return_value = {"key": "value"}
```

**What to Mock:**
- External HTTP calls (HTTPClient)
- File system operations (for unit tests, not integration tests)
- API responses (use fixtures for expected JSON structures)
- Time-dependent code (sleep, monotonic)

**What NOT to Mock:**
- Exception classes (test real exception behavior)
- Pydantic models (test real validation)
- Enums (test real enum values)
- Pure validation logic
- Configuration classes

## Fixtures and Factories

**Test Data (Recommended Pattern):**

To be created in `tests/conftest.py`:

```python
"""Shared fixtures and test utilities."""

import pytest
from pathlib import Path
from unittest.mock import Mock

from perplexity_web_mcp.config import ClientConfig, ConversationConfig
from perplexity_web_mcp.enums import CitationMode, SearchFocus, LogLevel
from perplexity_web_mcp.types import Response, SearchResultItem


@pytest.fixture
def client_config():
    """Default ClientConfig for tests."""
    return ClientConfig(
        timeout=3600,
        max_retries=1,  # Reduce retries for tests
        logging_level=LogLevel.DISABLED,
    )


@pytest.fixture
def conversation_config():
    """Default ConversationConfig for tests."""
    return ConversationConfig(
        citation_mode=CitationMode.CLEAN,
        search_focus=SearchFocus.WEB,
    )


@pytest.fixture
def mock_http_client():
    """Mock HTTPClient for isolation."""
    return Mock()


@pytest.fixture
def sample_response():
    """Sample API response structure."""
    return Response(
        title="Test Query Results",
        answer="This is a test answer with citations[1].",
        chunks=["This is a test answer", " with citations", "[1]."],
        search_results=[
            SearchResultItem(
                title="Test Source",
                snippet="Relevant snippet",
                url="https://example.com",
            ),
        ],
        conversation_uuid="test-uuid-1234",
    )


@pytest.fixture
def temp_text_file(tmp_path):
    """Temporary text file for testing."""
    file = tmp_path / "test.txt"
    file.write_text("test content")
    return file
```

**Location:**
- `tests/conftest.py` - Shared fixtures accessible to all tests
- `tests/test_module.py` - Module-specific fixtures

## Coverage

**Requirements:** Not enforced in config (no coverage threshold set)

**View Coverage:**
```bash
uv run pytest --cov=src/perplexity_web_mcp --cov-report=html
# Then open htmlcov/index.html in browser
```

**Target:** Unknown (not specified in pyproject.toml)

## Test Types

**Unit Tests:**
- Scope: Individual functions/methods in isolation
- Approach: Mock external dependencies (HTTPClient, file I/O, API calls)
- Location: `tests/test_*.py` for each module
- Examples: Test Perplexity.__init__, Conversation properties, exception creation

**Integration Tests:**
- Scope: Multiple components working together without external APIs
- Approach: Use real HTTPClient with mocked responses, real file system with tmp_path
- Location: `tests/integration/test_*.py` (to be created)
- Examples: Conversation.ask() with mocked HTTP responses, file validation with real files

**E2E Tests:**
- Framework: Not used currently
- Recommendation: Could use pytest with live API calls (requires test credentials)
- Would test full flow: authenticate, ask question, parse response, iterate

## Common Patterns

**Async Testing:**
Not applicable - codebase is synchronous (no async/await)

**Error Testing (Recommended Pattern):**

```python
"""Test that exceptions are raised correctly."""

def test_empty_session_token_raises():
    """ValueError raised when session token is empty or whitespace."""
    with pytest.raises(ValueError, match="session_token cannot be empty"):
        Perplexity(session_token="")

    with pytest.raises(ValueError):
        Perplexity(session_token="   ")


def test_file_validation_errors():
    """FileValidationError raised for various file issues."""
    from perplexity_web_mcp.exceptions import FileValidationError

    # Nonexistent file
    with pytest.raises(FileValidationError, match="File not found"):
        conv._validate_files(["/nonexistent/file.txt"])

    # Empty file
    empty_file = tmp_path / "empty.txt"
    empty_file.write_text("")
    with pytest.raises(FileValidationError, match="File is empty"):
        conv._validate_files([str(empty_file)])


@patch("perplexity_web_mcp.core.HTTPClient")
def test_http_error_on_auth_failure(mock_http_class):
    """HTTPError raised and properly formatted on auth failures."""
    mock_http = Mock()
    mock_http.post.side_effect = AuthenticationError(
        "Invalid token",
        status_code=403,
        url="https://api.perplexity.ai/ask",
    )

    with pytest.raises(AuthenticationError):
        # Code that triggers post()
```

**Parametrized Tests (Recommended):**

```python
"""Test multiple scenarios with one test function."""

@pytest.mark.parametrize("model,expected", [
    (Models.BEST, "pplx_pro"),
    (Models.SONAR, "experimental"),
    (Models.GPT_52, "gpt52"),
])
def test_model_identifiers(model, expected):
    assert model.identifier == expected
```

**Fixture Usage:**

```python
"""Use fixtures for common setup."""

def test_conversation_with_config(conversation_config):
    """Fixture provides clean config instance."""
    from perplexity_web_mcp.core import Conversation
    mock_http = Mock()

    conv = Conversation(mock_http, conversation_config)
    assert conv is not None
    # conversation_config is fresh instance, not shared between tests
```

---

*Testing analysis: 2026-02-04*

## Current Status

**No tests found in repository** - testing infrastructure is set up but not yet implemented. The following test suite should be created:

- `tests/conftest.py` - Shared fixtures and mocks
- `tests/test_core.py` - Perplexity and Conversation tests
- `tests/test_exceptions.py` - Exception behavior tests
- `tests/test_config.py` - Configuration validation tests
- `tests/http/test_http.py` - HTTP client tests
- `tests/cli/test_auth.py` - Authentication CLI tests
- `tests/mcp/test_server.py` - MCP server tests

Pytest is configured and ready (`just test` command works), waiting for test implementations.
