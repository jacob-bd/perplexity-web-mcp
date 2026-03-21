"""Constants and values for the Perplexity internal API."""

from __future__ import annotations

from re import Pattern, compile
from typing import Final


API_VERSION: Final[str] = "2.18"
"""Current API version used by Perplexity WebUI."""

API_BASE_URL: Final[str] = "https://www.perplexity.ai"
"""Base URL for all API requests."""

ENDPOINT_ASK: Final[str] = "/rest/sse/perplexity_ask"
"""SSE endpoint for sending prompts."""

ENDPOINT_SEARCH_INIT: Final[str] = "/search/new"
"""Endpoint to initialize a search session."""

ENDPOINT_UPLOAD: Final[str] = "/rest/uploads/batch_create_upload_urls"
"""Endpoint for file upload URL generation."""

ENDPOINT_RATE_LIMITS: Final[str] = "/rest/rate-limit/all"
"""Endpoint to fetch current rate limit status and remaining quotas."""

ENDPOINT_USER_SETTINGS: Final[str] = "/rest/user/settings"
"""Endpoint to fetch user settings, subscription info, and connector limits."""

ENDPOINT_CREDITS: Final[str] = "/rest/billing/credits"
"""Endpoint to fetch usage-based credits balance and usage breakdown."""

SEND_BACK_TEXT: Final[bool] = True
"""Whether to receive full text in each streaming chunk (replace mode)."""

USE_SCHEMATIZED_API: Final[bool] = False
"""Whether to use the schematized API format."""

PROMPT_SOURCE: Final[str] = "user"
"""Source identifier for prompts."""

CITATION_PATTERN: Final[Pattern[str]] = compile(r"\[(\d{1,2})\]")
"""Regex pattern for matching citation markers like [1], [2]."""

JSON_OBJECT_PATTERN: Final[Pattern[str]] = compile(r"^\{.*\}$")
"""Pattern to detect JSON object strings."""

DEFAULT_HEADERS: Final[dict[str, str]] = {
    "Accept": "text/event-stream, application/json",
    "Content-Type": "application/json",
}
"""Default HTTP headers for API requests."""

SESSION_COOKIE_NAME: Final[str] = "__Secure-next-auth.session-token"
"""Name of the session cookie used for authentication."""
