"""Perplexity Web MCP - MCP server and Anthropic API-compatible interface for Perplexity AI."""

from importlib import metadata

from .config import ClientConfig, ConversationConfig
from .core import Conversation, Perplexity
from .enums import CitationMode, LogLevel, SearchFocus, SourceFocus, TimeRange
from .exceptions import (
    AuthenticationError,
    FileUploadError,
    FileValidationError,
    HTTPError,
    PerplexityError,
    RateLimitError,
    ResearchClarifyingQuestionsError,
    ResponseParsingError,
    StreamingError,
)
from .models import Model, Models
from .rate_limits import RateLimitCache, RateLimits, SourceLimit, UserSettings, fetch_rate_limits, fetch_user_settings
from .council import CouncilMemberResult, CouncilResponse
from .router import Intent, QuotaLevel, QuotaState, RoutingDecision, SmartResponse, SmartRouter
from .shared import council_ask, smart_ask
from .types import Coordinates, Response, SearchResultItem


ConversationConfig.model_rebuild()


__version__: str = metadata.version("perplexity-web-mcp-cli")
__all__: list[str] = [
    "AuthenticationError",
    "CitationMode",
    "ClientConfig",
    "Conversation",
    "ConversationConfig",
    "Coordinates",
    "CouncilMemberResult",
    "CouncilResponse",
    "FileUploadError",
    "FileValidationError",
    "HTTPError",
    "Intent",
    "LogLevel",
    "Model",
    "Models",
    "Perplexity",
    "PerplexityError",
    "QuotaLevel",
    "QuotaState",
    "RateLimitCache",
    "RateLimits",
    "RateLimitError",
    "ResearchClarifyingQuestionsError",
    "RoutingDecision",
    "Response",
    "ResponseParsingError",
    "SearchFocus",
    "SearchResultItem",
    "SmartResponse",
    "SmartRouter",
    "SourceFocus",
    "SourceLimit",
    "StreamingError",
    "TimeRange",
    "UserSettings",
    "council_ask",
    "fetch_rate_limits",
    "fetch_user_settings",
    "smart_ask",
]
