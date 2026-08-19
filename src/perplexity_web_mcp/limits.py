"""Upload and request limits."""

from __future__ import annotations

from typing import Final


MAX_FILES: Final[int] = 30
"""Maximum number of files per prompt."""

MAX_FILE_SIZE: Final[int] = 50 * 1024 * 1024
"""Maximum file size in bytes (50 MB)."""

DEFAULT_TIMEOUT: Final[int] = 30 * 60
"""Default request timeout in seconds (30 minutes)."""

REST_API_TIMEOUT: Final[float] = 15.0
"""Default timeout in seconds for REST API metadata and authentication requests."""
