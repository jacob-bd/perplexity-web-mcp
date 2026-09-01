"""Dual API-compatible server for Perplexity Web MCP.

This server provides both Anthropic Messages API and OpenAI Chat Completions API
compatible interfaces, allowing Claude Code, OpenAI SDK clients, and other tools
to use Perplexity models as a backend.

Supported APIs:
- Anthropic Messages API: POST /v1/messages
  Reference: https://docs.anthropic.com/en/api/messages

- OpenAI Chat Completions API: POST /v1/chat/completions
  Reference: https://platform.openai.com/docs/api-reference/chat

Both APIs support streaming (SSE) and non-streaming responses.

Claude Code Integration:
  Set these environment variables:
    export ANTHROPIC_AUTH_TOKEN=perplexity
    export ANTHROPIC_BASE_URL=http://localhost:8080
    export ANTHROPIC_API_KEY=""

  Then run Claude Code with any supported model:
    claude --model claude-sonnet-5-0      # Use Claude Sonnet 5 via Perplexity
    claude --model gpt-5.6-terra          # Use GPT-5.6 Terra via Perplexity
    claude --model perplexity-auto        # Use Perplexity's auto model selection
    claude --model claude-3-5-sonnet      # Legacy name, maps to Claude Sonnet 5
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import datetime
import hmac
import ipaddress
import json
import logging
import os
import time
from typing import Any
import uuid

from fastapi import FastAPI, HTTPException, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, ConfigDict, Field
import uvicorn

from perplexity_web_mcp import ConversationConfig, Models, Perplexity, ResponseParsingError

# Tool calling disabled for now - models don't reliably follow format instructions
# from perplexity_web_mcp.api.tool_calling import (...)
from perplexity_web_mcp.api.session_manager import ConversationManager
from perplexity_web_mcp.enums import CitationMode
from perplexity_web_mcp.models import Model
from perplexity_web_mcp.token_store import load_token
from perplexity_web_mcp.trace import log_trace


# Supported Anthropic API version
ANTHROPIC_API_VERSION = "2023-06-01"


# =============================================================================
# Configuration
# =============================================================================


def is_loopback_host(host: str) -> bool:
    """Return whether *host* is an explicit loopback address.

    Hostnames other than ``localhost`` fail closed rather than being resolved,
    avoiding DNS changes that could turn an apparently local bind into a remote
    one.
    """
    normalized = host.strip().removeprefix("[").removesuffix("]")
    if normalized.lower() == "localhost":
        return True
    try:
        return ipaddress.ip_address(normalized).is_loopback
    except ValueError:
        return False


@dataclass
class ServerConfig:
    """Server configuration from environment variables."""

    session_token: str
    api_key: str | None = None
    host: str = "127.0.0.1"
    port: int = 8080
    log_level: str = "INFO"
    default_model: str = "auto"

    def __post_init__(self) -> None:
        """Normalize configuration and reject unsafe network exposure."""
        self.host = self.host.strip()
        self.api_key = self.api_key.strip() if self.api_key and self.api_key.strip() else None
        if not is_loopback_host(self.host) and not self.api_key:
            raise ValueError(
                f"Refusing to bind the API compatibility server to non-loopback host {self.host!r} "
                "without authentication. Set PWM_API_KEY (or ANTHROPIC_API_KEY) to a strong secret, "
                "or bind to 127.0.0.1. Use TLS via a trusted reverse proxy for remote access."
            )

    @classmethod
    def from_env(cls) -> ServerConfig:
        """Load from environment."""
        # Try to load from token store (env var or ~/.config/perplexity-web-mcp/token)
        session_token = load_token()
        if not session_token:
            raise ValueError("No Perplexity session token found. Run 'pwm-auth' to authenticate.")

        return cls(
            session_token=session_token,
            api_key=os.getenv("PWM_API_KEY") or os.getenv("ANTHROPIC_API_KEY"),
            host=os.getenv("HOST", "127.0.0.1"),
            port=int(os.getenv("PORT", "8080")),
            log_level=os.getenv("LOG_LEVEL", "INFO"),
            default_model=os.getenv("DEFAULT_MODEL", "auto"),
        )


# =============================================================================
# Model Mapping
# =============================================================================

# Map model names to Perplexity models
# Supports Anthropic, OpenAI, and standard Claude Code model naming conventions
# Updated Jul 2026 to match Perplexity UI offerings
MODEL_MAP: dict[str, tuple[Model, Model | None]] = {
    # ==========================================================================
    # Perplexity Native Models
    # ==========================================================================
    "perplexity-auto": (Models.BEST, None),
    "auto": (Models.BEST, None),
    "best": (Models.BEST, None),
    "perplexity-sonar": (Models.SONAR, None),
    "sonar": (Models.SONAR, None),
    "perplexity-research": (Models.DEEP_RESEARCH, None),
    "deep-research": (Models.DEEP_RESEARCH, None),
    # ==========================================================================
    # Anthropic Claude Models (via Perplexity)
    # Claude Sonnet 5 - supports thinking toggle
    # Claude Opus 4.8 - supports thinking (requires Max subscription)
    # ==========================================================================
    # Current model names
    "claude-sonnet-5-0": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-5-0-sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-sonnet-5": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-5-sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    # Legacy Sonnet aliases map to the current Perplexity Sonnet selection.
    "claude-sonnet-4-6": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-4-6-sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-sonnet-4-6-20260217": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-sonnet-4-5": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-4-5-sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-opus-4-8": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-4-8-opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-opus-4-7": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-4-7-opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-opus-4-7-20260401": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    # Legacy Opus aliases map to the current Perplexity Opus selection.
    "claude-opus-4-6": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-4-6-opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-opus-4-6-20260203": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-opus-4-5": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-4-5-opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-opus-4-5-20251101": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    # Claude Code default model aliases (for compatibility)
    # These allow `claude --model claude-3-5-sonnet` to work
    "claude-3-5-sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-3-5-sonnet-20241022": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "claude-3-opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-3-opus-20240229": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    "claude-3-5-haiku": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),  # Map to Sonnet
    "claude-haiku-4-5-20251001": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),  # Map Haiku to Sonnet
    "claude-haiku": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    # Generic aliases
    "claude": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "sonnet": (Models.CLAUDE_50_SONNET, Models.CLAUDE_50_SONNET_THINKING),
    "opus": (Models.CLAUDE_48_OPUS, Models.CLAUDE_48_OPUS_THINKING),
    # ==========================================================================
    # OpenAI GPT and xAI Grok Models (via Perplexity) - support thinking toggle
    # ==========================================================================
    "gpt-5.6-terra": (Models.GPT_56_TERRA, Models.GPT_56_TERRA_THINKING),
    "gpt-5-6-terra": (Models.GPT_56_TERRA, Models.GPT_56_TERRA_THINKING),
    "gpt56_terra": (Models.GPT_56_TERRA, Models.GPT_56_TERRA_THINKING),
    "gpt-5.6-sol": (Models.GPT_56_SOL, Models.GPT_56_SOL_THINKING),
    "gpt-5-6-sol": (Models.GPT_56_SOL, Models.GPT_56_SOL_THINKING),
    "gpt56_sol": (Models.GPT_56_SOL, Models.GPT_56_SOL_THINKING),
    "grok-4.5": (Models.GROK_45, Models.GROK_45_THINKING),
    "grok-4-5": (Models.GROK_45, Models.GROK_45_THINKING),
    "grok45": (Models.GROK_45, Models.GROK_45_THINKING),
    # ==========================================================================
    # Google Gemini Models (via Perplexity)
    # Gemini 3.1 Pro: thinking ALWAYS enabled (no toggle in UI)
    # ==========================================================================
    "gemini-3.1-pro": (Models.GEMINI_31_PRO_THINKING, Models.GEMINI_31_PRO_THINKING),
    "gemini-3-pro": (Models.GEMINI_31_PRO_THINKING, Models.GEMINI_31_PRO_THINKING),
    "gemini-pro": (Models.GEMINI_31_PRO_THINKING, Models.GEMINI_31_PRO_THINKING),
    # ==========================================================================
    # NVIDIA Nemotron 3 Ultra (via Perplexity)
    # Thinking ALWAYS enabled (no toggle in UI) - reasoning only
    # ==========================================================================
    "nemotron-3-ultra": (Models.NEMOTRON_3_ULTRA, Models.NEMOTRON_3_ULTRA),
    "nemotron-3": (Models.NEMOTRON_3_ULTRA, Models.NEMOTRON_3_ULTRA),
    "nemotron": (Models.NEMOTRON_3_ULTRA, Models.NEMOTRON_3_ULTRA),
    # ==========================================================================
    # Z.ai GLM 5.2 (via Perplexity)
    # Thinking ALWAYS enabled (no toggle in UI) - reasoning only
    # ==========================================================================
    "glm-5.2": (Models.GLM_5_2, Models.GLM_5_2),
    "glm-5-2": (Models.GLM_5_2, Models.GLM_5_2),
    "glm52": (Models.GLM_5_2, Models.GLM_5_2),
    "glm": (Models.GLM_5_2, Models.GLM_5_2),
    # ==========================================================================
    # Moonshot Kimi Models (via Perplexity)
    # Kimi K2.6 - supports thinking toggle
    # ==========================================================================
    "kimi-k2.6": (Models.KIMI_K2_6, Models.KIMI_K2_6_THINKING),
    "kimi-k2-6": (Models.KIMI_K2_6, Models.KIMI_K2_6_THINKING),
    "kimi": (Models.KIMI_K2_6, Models.KIMI_K2_6_THINKING),
}

# Models we expose via /v1/models
# Ordered to match Perplexity UI search models (Jul 2026)
AVAILABLE_MODELS = [
    # Perplexity Native
    {"id": "perplexity-auto", "description": "Best - Automatically selects optimal model"},
    {"id": "perplexity-sonar", "description": "Sonar 2 - Perplexity's latest in-house model"},
    {"id": "perplexity-research", "description": "Deep Research - In-depth reports with sources"},
    # OpenAI
    {"id": "gpt-5.6-terra", "description": "GPT-5.6 Terra - OpenAI's versatile model, thinking toggle available"},
    {"id": "gpt-5.6-sol", "description": "GPT-5.6 Sol - OpenAI's most powerful model, Max tier required"},
    # Google Gemini
    {"id": "gemini-3.1-pro", "description": "Gemini 3.1 Pro - Advanced, thinking always on"},
    # Anthropic Claude
    {"id": "claude-sonnet-5", "description": "Claude Sonnet 5 - Fast, thinking toggle available"},
    {"id": "claude-opus-4-8", "description": "Claude Opus 4.8 - Advanced reasoning, Max tier required"},
    # Z.ai
    {"id": "glm-5.2", "description": "GLM 5.2 - Z.ai advanced model, thinking always on"},
    # Moonshot
    {"id": "kimi-k2.6", "description": "Kimi K2.6 - Advanced, thinking toggle available"},
    # xAI
    {"id": "grok-4.5", "description": "Grok 4.5 - xAI's most advanced model, thinking toggle available"},
    # NVIDIA
    {"id": "nemotron-3-ultra", "description": "Nemotron 3 Ultra - NVIDIA 550B, thinking always on"},
]


def get_model(name: str, thinking: bool = False) -> Model:
    """Get Perplexity model from name.

    Supports both Anthropic and OpenAI model naming conventions.
    Falls back to perplexity-auto for unknown models.
    """
    key = name.lower().strip()
    if key in MODEL_MAP:
        base, thinking_model = MODEL_MAP[key]
        if thinking and thinking_model:
            return thinking_model
        return base
    # Default to auto
    logging.warning(f"Unknown model '{name}', using perplexity-auto")
    return Models.BEST


# =============================================================================
# Pydantic Models (Anthropic API format)
# =============================================================================


class TextContent(BaseModel):
    """Text content block in a message."""

    type: str = "text"
    text: str


class ImageSource(BaseModel):
    """Image source for multimodal content."""

    type: str  # "base64" or "url"
    media_type: str | None = None  # e.g., "image/jpeg"
    data: str | None = None  # base64 data
    url: str | None = None  # URL


class ImageContent(BaseModel):
    """Image content block."""

    type: str = "image"
    source: ImageSource


class MessageParam(BaseModel):
    """Input message parameter (Anthropic format).

    Supports both simple string content and complex content blocks
    including text and images.
    """

    role: str  # "user" or "assistant"
    content: str | list[dict[str, Any]]

    model_config = ConfigDict(extra="allow")

    def get_text(self) -> str:
        """Extract text content from message.

        For simple string content, returns the string directly.
        For content blocks, concatenates all text blocks.
        """
        if isinstance(self.content, str):
            return self.content
        # Handle content blocks array
        texts = []
        for block in self.content:
            if isinstance(block, dict) and block.get("type") == "text":
                texts.append(block.get("text", ""))
        return "\n".join(texts)


class MessagesRequest(BaseModel):
    """Anthropic Messages API request.

    Reference: https://docs.anthropic.com/en/api/messages
    """

    model: str = Field(..., description="Model to use (e.g., 'claude-sonnet-5-0')")
    max_tokens: int = Field(..., description="Maximum tokens to generate")
    messages: list[MessageParam] = Field(..., description="Conversation messages")

    # Optional parameters
    # System can be a string OR an array of content blocks (for prompt caching)
    system: str | list[dict[str, Any]] | None = Field(None, description="System prompt")
    stream: bool = Field(False, description="Enable streaming response")
    temperature: float | None = Field(None, ge=0, le=1, description="Sampling temperature")
    top_p: float | None = Field(None, ge=0, le=1, description="Nucleus sampling")
    top_k: int | None = Field(None, ge=0, description="Top-k sampling")
    stop_sequences: list[str] | None = Field(None, description="Stop sequences")
    metadata: dict[str, Any] | None = Field(None, description="Request metadata")

    # Extended thinking (maps to Perplexity thinking models)
    thinking: dict[str, Any] | None = Field(
        None, description="Extended thinking config. Set type='enabled' to use thinking models."
    )

    # Tools support (for Claude Code)
    tools: list[dict[str, Any]] | None = Field(None, description="Available tools")
    tool_choice: dict[str, Any] | str | None = Field(None, description="Tool choice config")

    model_config = ConfigDict(extra="allow")

    def get_system_text(self) -> str | None:
        """Extract system prompt text, handling both string and array formats."""
        if self.system is None:
            return None
        if isinstance(self.system, str):
            return self.system
        # Handle array of content blocks (Claude Code format with cache_control)
        texts = []
        for block in self.system:
            if isinstance(block, dict) and block.get("type") == "text":
                texts.append(block.get("text", ""))
        return "\n".join(texts) if texts else None


class Usage(BaseModel):
    """Token usage statistics."""

    input_tokens: int = Field(..., description="Number of input tokens")
    output_tokens: int = Field(..., description="Number of output tokens")


class TextBlock(BaseModel):
    """Response text content block."""

    type: str = "text"
    text: str


class MessagesResponse(BaseModel):
    """Anthropic Messages API response.

    Reference: https://docs.anthropic.com/en/api/messages
    """

    id: str = Field(..., description="Unique message identifier")
    type: str = Field("message", description="Object type")
    role: str = Field("assistant", description="Message role")
    content: list[TextBlock] = Field(..., description="Response content blocks")
    model: str = Field(..., description="Model used")
    stop_reason: str | None = Field("end_turn", description="Reason generation stopped")
    stop_sequence: str | None = Field(None, description="Stop sequence if triggered")
    usage: Usage = Field(..., description="Token usage")


class ModelObject(BaseModel):
    """Model object (OpenAI-compatible format for /v1/models)."""

    id: str
    object: str = "model"
    created: int
    owned_by: str = "perplexity-web-mcp"


class ModelsListResponse(BaseModel):
    """Models list response (OpenAI-compatible format)."""

    object: str = "list"
    data: list[ModelObject]


class ErrorDetail(BaseModel):
    """Error detail."""

    type: str
    message: str


class ErrorResponse(BaseModel):
    """Anthropic API error response."""

    type: str = "error"
    error: ErrorDetail


# =============================================================================
# OpenAI API Models (Chat Completions format)
# =============================================================================


class OpenAIChatMessage(BaseModel):
    """OpenAI chat message format."""

    role: str = Field(..., description="Message role: system, user, or assistant")
    content: str | list[dict[str, Any]] | None = Field(None, description="Message content")
    name: str | None = Field(None, description="Optional name for the participant")

    model_config = ConfigDict(extra="allow")

    def get_text(self) -> str:
        """Extract text content from message."""
        if self.content is None:
            return ""
        if isinstance(self.content, str):
            return self.content
        # Handle content blocks array (for multimodal)
        texts = []
        for block in self.content:
            if isinstance(block, dict) and block.get("type") == "text":
                texts.append(block.get("text", ""))
        return "\n".join(texts)


class OpenAIChatRequest(BaseModel):
    """OpenAI Chat Completions API request.

    Reference: https://platform.openai.com/docs/api-reference/chat
    """

    model: str = Field(..., description="Model ID (e.g., 'gpt-4o')")
    messages: list[OpenAIChatMessage] = Field(..., description="Conversation messages")

    # Optional parameters
    max_tokens: int | None = Field(None, description="Max tokens (deprecated, use max_completion_tokens)")
    max_completion_tokens: int | None = Field(None, description="Max completion tokens")
    temperature: float | None = Field(None, ge=0, le=2, description="Sampling temperature")
    top_p: float | None = Field(None, ge=0, le=1, description="Nucleus sampling")
    n: int | None = Field(1, description="Number of completions")
    stream: bool = Field(False, description="Enable streaming")
    stream_options: dict[str, Any] | None = Field(None, description="Streaming options")
    stop: str | list[str] | None = Field(None, description="Stop sequences")
    presence_penalty: float | None = Field(None, ge=-2, le=2)
    frequency_penalty: float | None = Field(None, ge=-2, le=2)
    user: str | None = Field(None, description="User identifier")

    # Extended features
    reasoning_effort: str | None = Field(None, description="Reasoning effort level")

    model_config = ConfigDict(extra="allow")


class OpenAIChoiceMessage(BaseModel):
    """Message in a chat completion choice."""

    role: str = "assistant"
    content: str | None = None


class OpenAIChoice(BaseModel):
    """A chat completion choice."""

    index: int = 0
    message: OpenAIChoiceMessage
    finish_reason: str | None = "stop"
    logprobs: Any | None = None


class OpenAIUsage(BaseModel):
    """Token usage for OpenAI format."""

    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


class OpenAIChatResponse(BaseModel):
    """OpenAI Chat Completions API response.

    Reference: https://platform.openai.com/docs/api-reference/chat
    """

    id: str = Field(..., description="Unique completion identifier")
    object: str = Field("chat.completion", description="Object type")
    created: int = Field(..., description="Unix timestamp")
    model: str = Field(..., description="Model used")
    choices: list[OpenAIChoice] = Field(..., description="Completion choices")
    usage: OpenAIUsage = Field(..., description="Token usage")
    system_fingerprint: str | None = Field(None, description="System fingerprint")


class OpenAIStreamChoice(BaseModel):
    """A streaming chat completion choice."""

    index: int = 0
    delta: dict[str, Any]
    finish_reason: str | None = None
    logprobs: Any | None = None


class OpenAIStreamResponse(BaseModel):
    """OpenAI streaming chunk response."""

    id: str
    object: str = "chat.completion.chunk"
    created: int
    model: str
    choices: list[OpenAIStreamChoice]
    system_fingerprint: str | None = None


# =============================================================================
# Global State
# =============================================================================

config: ServerConfig
client: Perplexity
conversation_manager: ConversationManager
start_time: datetime
# Semaphore to limit concurrent Perplexity requests (curl_cffi can't handle many)
perplexity_semaphore: asyncio.Semaphore
# Track last request time for rate limiting
last_request_time: float = 0.0
MIN_REQUEST_INTERVAL: float = 5.0  # Minimum seconds between Perplexity requests (Perplexity rate limits)
API_CONTEXT_MAX_CHARS: int = int(os.getenv("PWM_API_CONTEXT_MAX_CHARS", "60000"))

# Perplexity backend error frames known to be transient (retry-worthy) rather than
# indicative of a malformed request. Matched as a substring against the exception message.
_RETRYABLE_BACKEND_MESSAGES: tuple[str, ...] = (
    "error in processing query",
    "missing 'text' field",
)


def _is_retryable_error(error: Exception) -> bool:
    """Whether a query failure looks transient and worth retrying."""

    error_str = str(error)
    if "curl" in error_str.lower():
        return True
    if isinstance(error, ResponseParsingError):
        lowered = error_str.lower()
        return any(marker in lowered for marker in _RETRYABLE_BACKEND_MESSAGES)
    return False


# =============================================================================
# Application
# =============================================================================


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan."""
    global config, client, conversation_manager, start_time, perplexity_semaphore

    start_time = datetime.now()
    config = ServerConfig.from_env()
    client = Perplexity(session_token=config.session_token)
    conversation_manager = ConversationManager(
        client=client,
        max_sessions=50,
        session_timeout_seconds=1800,  # 30 minutes
    )
    # Limit concurrent Perplexity requests to 1 - curl_cffi can't handle concurrency
    perplexity_semaphore = asyncio.Semaphore(1)

    logging.basicConfig(
        level=getattr(logging, config.log_level.upper(), logging.INFO),
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    logging.info(f"Starting Anthropic API server on http://{config.host}:{config.port}")
    if config.api_key:
        logging.info("API authentication required")
    else:
        logging.warning("API authentication is disabled; access is limited to the local machine by loopback binding")
    if not is_loopback_host(config.host):
        logging.warning(
            "API server is exposed on a non-loopback interface. Authentication is enabled, but HTTP is not encrypted; "
            "use a trusted TLS reverse proxy and firewall rules for remote access."
        )
    logging.info("Fresh client per request, single ask (system prepended), serialized")

    yield

    conversation_manager.clear_all()
    client.close()


app = FastAPI(
    title="Perplexity Web MCP - Anthropic API",
    description="Anthropic Messages API compatible interface for Perplexity AI",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Helpers
# =============================================================================


def verify_auth(request: Request | WebSocket) -> None:
    """Verify the configured API key.

    Supports both:
    - x-api-key header (Anthropic style)
    - Authorization: Bearer <key> header (OpenAI style)
    """
    if not config.api_key:
        return

    auth = request.headers.get("x-api-key", "")
    if not auth:
        auth = request.headers.get("Authorization", "")
        scheme, separator, credentials = auth.partition(" ")
        auth = credentials.strip() if separator and scheme.lower() == "bearer" else ""

    if not hmac.compare_digest(auth, config.api_key):
        raise HTTPException(status_code=401, detail={"type": "authentication_error", "message": "Invalid API key"})


def check_anthropic_version(request: Request) -> None:
    """Log anthropic-version header if present (informational only)."""
    version = request.headers.get("anthropic-version")
    if version and version != ANTHROPIC_API_VERSION:
        logging.debug(f"Client requested anthropic-version {version}, server implements {ANTHROPIC_API_VERSION}")


def messages_to_query(messages: list[MessageParam]) -> str:
    """Convert Anthropic messages to Perplexity query."""
    # Extract the user's message(s)
    parts = []
    for msg in messages:
        text = msg.get_text()
        if msg.role == "user":
            parts.append(text if len(messages) == 1 else f"User: {text}")
        elif msg.role == "assistant":
            parts.append(f"Assistant: {text}")

    return "\n\n".join(parts)


def bound_context_text(text: str | None, max_chars: int = API_CONTEXT_MAX_CHARS) -> str:
    """Preserve prompt context within a bounded character budget."""
    if not text:
        return ""

    stripped = text.strip()
    if len(stripped) <= max_chars:
        return stripped
    if max_chars <= 0:
        return ""

    marker = f"\n\n[... {len(stripped)} characters of API context truncated to fit budget ...]\n\n"
    available = max_chars - len(marker)
    if available <= 0:
        return stripped[:max_chars]

    head_chars = available // 2
    tail_chars = available - head_chars
    return f"{stripped[:head_chars].rstrip()}{marker}{stripped[-tail_chars:].lstrip()}"


def build_query_with_system_context(query: str, system_text: str | None) -> str:
    """Prefix a user/conversation query with preserved system/workspace context."""
    context = bound_context_text(system_text)
    if not context:
        return query

    return f"[System instructions and workspace context]\n{context}\n\n[Conversation]\n{query}"


def openai_messages_to_search_query(messages: list[OpenAIChatMessage]) -> str:
    """Return the latest user text for Perplexity search initialization."""
    for msg in reversed(messages):
        if msg.role == "user":
            text = msg.get_text().strip()
            if text:
                return text

    return openai_messages_to_query(messages)[:500]


def openai_messages_to_query(messages: list[OpenAIChatMessage]) -> str:
    """Convert OpenAI chat messages to Perplexity query.

    System and developer messages are preserved because agent runtimes use them
    for workspace bootstrap context. URL length is handled separately by passing
    a short init_query to Perplexity's search initialization endpoint.
    """
    supported_msgs = [m for m in messages if m.role in ("system", "developer", "user", "assistant", "tool")]

    # For single user message, just return it directly
    user_msgs = [m for m in supported_msgs if m.role == "user"]
    if len(user_msgs) == 1 and len(supported_msgs) == 1:
        return user_msgs[0].get_text()

    # Multi-turn: format as conversation
    context_parts = []
    conversation_parts = []
    role_labels = {
        "system": "System",
        "developer": "Developer",
        "user": "User",
        "assistant": "Assistant",
        "tool": "Tool",
    }

    for msg in supported_msgs:
        text = msg.get_text()
        if not text:
            continue
        label = role_labels[msg.role]
        formatted = f"{label}: {text}"
        if msg.role in ("system", "developer"):
            context_parts.append(formatted)
        else:
            conversation_parts.append(formatted)

    context = bound_context_text("\n\n".join(context_parts))
    parts = [part for part in (context, "\n\n".join(conversation_parts)) if part]
    return "\n\n".join(parts)


def estimate_tokens(text: str) -> int:
    """Rough token estimate."""
    return len(text) // 4


def format_citations(search_results: list) -> str:
    """Format search results as citations to append to response."""
    if not search_results:
        return ""

    citations = ["\n\nCitations:"]
    for i, result in enumerate(search_results, 1):
        url = getattr(result, "url", "") or ""
        if url:
            citations.append(f"\n[{i}]: {url}")

    return "".join(citations) if len(citations) > 1 else ""


# =============================================================================
# Endpoints
# =============================================================================


@app.get("/")
async def root():
    """Server info (for discovery)."""
    return {
        "name": "perplexity-web-mcp",
        "version": "0.1.0",
        "description": "Anthropic & OpenAI API compatible server powered by Perplexity",
        "endpoints": {
            "anthropic": "/v1/messages",
            "openai": "/v1/chat/completions",
            "openai_responses": "/v1/responses",
            "models": "/v1/models",
            "health": "/health",
        },
    }


class CountTokensRequest(BaseModel):
    """Request model for count_tokens endpoint."""

    model: str
    messages: list[MessageParam]
    system: str | list[dict[str, Any]] | None = None
    tools: list[dict[str, Any]] | None = None


@app.post("/v1/messages/count_tokens")
async def count_tokens(request: Request, body: CountTokensRequest):
    """Count tokens in a messages request (Anthropic beta endpoint).

    Returns estimated token count. Claude Code calls this frequently.
    """
    verify_auth(request)

    # Estimate tokens from messages
    query = messages_to_query(body.messages)
    input_tokens = estimate_tokens(query)

    return {
        "input_tokens": input_tokens,
    }


@app.get("/health")
async def health():
    """Health check."""
    return {
        "status": "healthy",
        "uptime_seconds": (datetime.now() - start_time).total_seconds(),
        "backend": "perplexity",
        "sessions": conversation_manager.get_stats(),
    }


@app.get("/v1/models")
async def list_models(request: Request):
    """List available models (OpenAI-compatible format)."""
    verify_auth(request)

    now = int(time.time())
    return ModelsListResponse(data=[ModelObject(id=m["id"], created=now) for m in AVAILABLE_MODELS])


@app.post("/v1/messages")
async def create_message(request: Request, body: MessagesRequest):
    """Create a message (Anthropic Messages API).

    Reference: https://docs.anthropic.com/en/api/messages

    Supports:
    - Single and multi-turn conversations
    - System prompts (primed into conversation context)
    - Streaming (SSE) and non-streaming responses
    - Extended thinking via thinking parameter
    - Tool calling via prompt injection
    """
    verify_auth(request)
    check_anthropic_version(request)

    # Claude Code sends internal requests with haiku model for capabilities/warmup
    # Return a quick mock response to avoid concurrent Perplexity calls
    if body.model and "haiku" in body.model.lower():
        response_id = f"msg_{uuid.uuid4().hex[:24]}"
        # Get the last user message for a relevant mock response
        user_msg = ""
        for msg in body.messages:
            if msg.role == "user":
                user_msg = msg.get_text()[:50]
        mock_response = f"Response to: {user_msg}" if user_msg else "OK"

        if body.stream:

            async def mock_stream():
                yield f"event: message_start\ndata: {json.dumps({'type': 'message_start', 'message': {'id': response_id, 'type': 'message', 'role': 'assistant', 'content': [], 'model': body.model, 'stop_reason': None, 'stop_sequence': None, 'usage': {'input_tokens': 10, 'output_tokens': 0}}})}\n\n"
                yield f"event: content_block_start\ndata: {json.dumps({'type': 'content_block_start', 'index': 0, 'content_block': {'type': 'text', 'text': ''}})}\n\n"
                yield f"event: content_block_delta\ndata: {json.dumps({'type': 'content_block_delta', 'index': 0, 'delta': {'type': 'text_delta', 'text': mock_response}})}\n\n"
                yield f"event: content_block_stop\ndata: {json.dumps({'type': 'content_block_stop', 'index': 0})}\n\n"
                yield f"event: message_delta\ndata: {json.dumps({'type': 'message_delta', 'delta': {'stop_reason': 'end_turn', 'stop_sequence': None}, 'usage': {'output_tokens': len(mock_response.split())}})}\n\n"
                yield f"event: message_stop\ndata: {json.dumps({'type': 'message_stop'})}\n\n"

            logging.info(f"Mock response for internal model: {body.model}")
            return StreamingResponse(mock_stream(), media_type="text/event-stream")
        else:
            logging.info(f"Mock response for internal model: {body.model}")
            return MessagesResponse(
                id=response_id,
                type="message",
                role="assistant",
                content=[{"type": "text", "text": mock_response}],
                model=body.model,
                stop_reason="end_turn",
                usage=Usage(input_tokens=10, output_tokens=len(mock_response.split())),
            )

    if not body.messages:
        raise HTTPException(
            status_code=400, detail={"type": "invalid_request_error", "message": "messages is required"}
        )

    # Determine if thinking mode is requested
    thinking_enabled = body.thinking is not None and body.thinking.get("type") == "enabled"

    # Get the appropriate model
    model = get_model(body.model, thinking=thinking_enabled)

    # Get system prompt text
    system_text = body.get_system_text()

    # Convert messages to query (tool calling not supported via web UI)
    query = messages_to_query(body.messages)
    full_query = build_query_with_system_context(query, system_text)
    input_tokens = estimate_tokens(full_query)

    # Generate response ID
    response_id = f"msg_{uuid.uuid4().hex[:24]}"

    logging.info(f"Request: model={body.model}, thinking={thinking_enabled}, stream={body.stream}")

    log_trace(
        f"[STAGE 1 - INBOUND REQUEST] model={body.model} thinking={thinking_enabled} "
        f"stream={body.stream} system_len={len(system_text or '')} "
        f"messages_count={len(body.messages)} tools_count={len(body.tools or [])}"
    )
    if system_text:
        log_trace(f"[STAGE 1 - SYSTEM PROMPT]\n{system_text}")

    log_trace(
        f"[STAGE 2 - TRANSFORMED QUERY] target_model={model.identifier} mode={model.mode} "
        f"init_query={query!r} full_query_len={len(full_query)}"
    )
    log_trace(f"[STAGE 2 - FULL QUERY BODY]\n{full_query}")

    if body.stream:
        return StreamingResponse(
            stream_response(response_id, body.model, model, full_query, input_tokens, init_query=query),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    # Non-streaming response
    global last_request_time
    import time as time_module

    max_retries = 3
    for attempt in range(max_retries):
        try:
            # Create fresh client for each request (with semaphore to limit concurrency)
            async with perplexity_semaphore:
                # Rate limiting: ensure minimum interval between requests
                now = time_module.time()
                wait_needed = MIN_REQUEST_INTERVAL - (now - last_request_time)
                if wait_needed > 0:
                    logging.debug(f"Rate limiting: waiting {wait_needed:.1f}s")
                    await asyncio.sleep(wait_needed)
                last_request_time = time_module.time()

                fresh_client = Perplexity(session_token=config.session_token)
                conversation = fresh_client.create_conversation(
                    ConversationConfig(model=model, citation_mode=CitationMode.DEFAULT)
                )
                # Single ask with prepended system context
                await asyncio.to_thread(conversation.ask, full_query, init_query=query)
                fresh_client.close()
            answer = conversation.answer or ""

            # Append citations if available
            citations = format_citations(conversation.search_results)
            full_response = answer + citations

            return {
                "id": response_id,
                "type": "message",
                "role": "assistant",
                "content": [{"type": "text", "text": full_response}],
                "model": body.model,
                "stop_reason": "end_turn",
                "stop_sequence": None,
                "usage": {
                    "input_tokens": input_tokens,
                    "output_tokens": estimate_tokens(full_response),
                },
            }

        except Exception as e:  # noqa: PERF203 -- retry loop is network-bound, max 3 iterations
            last_request_time = time_module.time()  # Update even on error
            if _is_retryable_error(e) and attempt < max_retries - 1:
                wait_time = (attempt + 1) * 2
                logging.warning(f"Retryable error (attempt {attempt + 1}/{max_retries}): {e}. Retrying in {wait_time}s")
                await asyncio.sleep(wait_time)
                continue
            logging.error(f"Error creating message: {e}")
            raise HTTPException(status_code=500, detail={"type": "api_error", "message": str(e)})


async def stream_response(
    response_id: str,
    model_name: str,
    model: Model,
    query: str,
    input_tokens: int,
    init_query: str | None = None,
) -> AsyncGenerator[str, None]:
    """Stream Anthropic-format SSE response.

    Implements the Anthropic streaming protocol:
    1. message_start - Initial message object with empty content
    2. content_block_start - Start of each content block
    3. content_block_delta - Incremental text updates (text_delta)
    4. ping - Periodic keepalive (every ~10 deltas)
    5. content_block_stop - End of content block
    6. message_delta - Final message updates (stop_reason, usage)
    7. message_stop - Stream complete

    Reference: https://docs.anthropic.com/en/api/messages-streaming
    """
    import threading
    import time as time_module

    # Acquire semaphore to serialize Perplexity requests
    await perplexity_semaphore.acquire()
    semaphore_released = False

    # 1. message_start event
    message_start = {
        "type": "message_start",
        "message": {
            "id": response_id,
            "type": "message",
            "role": "assistant",
            "content": [],
            "model": model_name,
            "stop_reason": None,
            "stop_sequence": None,
            "usage": {"input_tokens": input_tokens, "output_tokens": 0},
        },
    }
    yield f"event: message_start\ndata: {json.dumps(message_start)}\n\n"

    # 2. content_block_start event for text
    content_block_start = {
        "type": "content_block_start",
        "index": 0,
        "content_block": {"type": "text", "text": ""},
    }
    yield f"event: content_block_start\ndata: {json.dumps(content_block_start)}\n\n"

    # Stream content deltas from Perplexity
    queue: asyncio.Queue[tuple[str, str]] = asyncio.Queue()
    loop = asyncio.get_running_loop()

    def release_semaphore():
        nonlocal semaphore_released
        if not semaphore_released:
            semaphore_released = True
            loop.call_soon_threadsafe(perplexity_semaphore.release)

    def producer():
        """Background thread to stream from Perplexity with retry."""
        global last_request_time

        # Rate limiting: ensure minimum interval since LAST REQUEST COMPLETED
        now = time_module.time()
        wait_needed = MIN_REQUEST_INTERVAL - (now - last_request_time)
        if wait_needed > 0:
            logging.info(f"Rate limiting: waiting {wait_needed:.1f}s before next Perplexity request")
            time_module.sleep(wait_needed)

        last = ""
        max_retries = 3

        for attempt in range(max_retries):
            try:
                # Create fresh client for each request to avoid curl_cffi Session issues
                fresh_client = Perplexity(session_token=config.session_token)
                conversation = fresh_client.create_conversation(
                    ConversationConfig(model=model, citation_mode=CitationMode.DEFAULT)
                )

                # Single ask with prepended system context
                for resp in conversation.ask(query, stream=True, init_query=init_query):
                    current = resp.answer or ""
                    if len(current) > len(last):
                        delta = current[len(last) :]
                        last = current
                        loop.call_soon_threadsafe(queue.put_nowait, ("delta", delta))

                # Get citations from search results
                citations = format_citations(conversation.search_results)
                loop.call_soon_threadsafe(queue.put_nowait, ("done", (last, citations)))
                fresh_client.close()
                # Update last_request_time AFTER completion
                last_request_time = time_module.time()
                break  # Success
            except Exception as e:
                error_str = str(e)
                last_request_time = time_module.time()  # Update even on error
                if _is_retryable_error(e) and attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2
                    logging.warning(
                        f"Retryable error (attempt {attempt + 1}/{max_retries}): {error_str}. Retrying in {wait_time}s"
                    )
                    time_module.sleep(wait_time)
                    last = ""
                    continue
                loop.call_soon_threadsafe(queue.put_nowait, ("error", error_str))
                break

        release_semaphore()

    threading.Thread(target=producer, daemon=True).start()

    # 3. content_block_delta events
    total_output = ""
    citations_text = ""
    delta_count = 0

    while True:
        kind, payload = await queue.get()
        if kind == "delta":
            total_output += payload
            delta_count += 1

            delta_event = {
                "type": "content_block_delta",
                "index": 0,
                "delta": {"type": "text_delta", "text": payload},
            }
            yield f"event: content_block_delta\ndata: {json.dumps(delta_event)}\n\n"

            # 4. Send periodic ping events for keepalive
            if delta_count % 10 == 0:
                yield f"event: ping\ndata: {json.dumps({'type': 'ping'})}\n\n"

        elif kind == "error":
            logging.error(f"Stream error: {payload}")
            log_trace(f"[STAGE 4 - STREAM ERROR] {payload}")
            # Strip wrapper prefixes for cleaner client-facing messages
            error_msg = payload.removeprefix("Failed to parse API response: ")
            if "403" in payload or "forbidden" in payload.lower():
                error_msg = (
                    "Session token expired (403). "
                    "Re-authenticate: pwm-auth --email EMAIL, then pwm-auth --email EMAIL --code CODE"
                )
            error_delta = {
                "type": "content_block_delta",
                "index": 0,
                "delta": {"type": "text_delta", "text": f"\n\n[Error: {error_msg}]"},
            }
            yield f"event: content_block_delta\ndata: {json.dumps(error_delta)}\n\n"
            break

        else:  # done - payload is (answer, citations)
            total_output, citations_text = payload
            break

    # Stream citations if available
    if citations_text:
        citation_delta = {
            "type": "content_block_delta",
            "index": 0,
            "delta": {"type": "text_delta", "text": citations_text},
        }
        yield f"event: content_block_delta\ndata: {json.dumps(citation_delta)}\n\n"
        total_output += citations_text

    # 5. content_block_stop event
    yield f"event: content_block_stop\ndata: {json.dumps({'type': 'content_block_stop', 'index': 0})}\n\n"

    # 6. message_delta event (final usage)
    output_tokens = estimate_tokens(total_output)
    message_delta = {
        "type": "message_delta",
        "delta": {"stop_reason": "end_turn", "stop_sequence": None},
        "usage": {"output_tokens": output_tokens},
    }
    yield f"event: message_delta\ndata: {json.dumps(message_delta)}\n\n"

    # 7. message_stop event
    yield f"event: message_stop\ndata: {json.dumps({'type': 'message_stop'})}\n\n"

    # Ensure semaphore is released
    if not semaphore_released:
        perplexity_semaphore.release()

    logging.info(f"Stream complete: {output_tokens} output tokens")


# =============================================================================
# OpenAI Chat Completions Endpoint
# =============================================================================


@app.post("/v1/chat/completions")
async def create_chat_completion(request: Request, body: OpenAIChatRequest):
    """Create a chat completion (OpenAI Chat Completions API).

    Reference: https://platform.openai.com/docs/api-reference/chat

    Supports:
    - System, user, and assistant messages
    - Streaming (SSE) and non-streaming responses
    - Reasoning effort mapping to thinking models
    """
    verify_auth(request)

    if not body.messages:
        raise HTTPException(
            status_code=400, detail={"error": {"type": "invalid_request_error", "message": "messages is required"}}
        )

    # Determine if thinking mode should be enabled
    # Map reasoning_effort to thinking models
    thinking_enabled = body.reasoning_effort in ("medium", "high", "xhigh")

    # Get the appropriate model
    model = get_model(body.model, thinking=thinking_enabled)

    # Convert messages to query
    query = openai_messages_to_query(body.messages)
    init_query = openai_messages_to_search_query(body.messages)
    input_tokens = estimate_tokens(query)

    # Generate response ID
    response_id = f"chatcmpl-{uuid.uuid4().hex[:24]}"
    created = int(time.time())

    logging.info(f"OpenAI Request: model={body.model}, thinking={thinking_enabled}, stream={body.stream}")

    if body.stream:
        return StreamingResponse(
            stream_openai_response(response_id, body.model, model, query, created, init_query),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    # Non-streaming response
    try:
        conversation = client.create_conversation(
            ConversationConfig(
                model=model,
                citation_mode=CitationMode.DEFAULT,
            )
        )

        # Run in thread to not block
        await asyncio.to_thread(conversation.ask, query, init_query=init_query)
        answer = conversation.answer or ""

        # Append citations if available
        citations = format_citations(conversation.search_results)
        full_response = answer + citations
        output_tokens = estimate_tokens(full_response)

        return OpenAIChatResponse(
            id=response_id,
            created=created,
            model=body.model,
            choices=[
                OpenAIChoice(
                    index=0,
                    message=OpenAIChoiceMessage(role="assistant", content=full_response),
                    finish_reason="stop",
                )
            ],
            usage=OpenAIUsage(
                prompt_tokens=input_tokens,
                completion_tokens=output_tokens,
                total_tokens=input_tokens + output_tokens,
            ),
        )

    except Exception as e:
        logging.error(f"Error creating chat completion: {e}")
        raise HTTPException(status_code=500, detail={"error": {"type": "api_error", "message": str(e)}})


async def stream_openai_response(
    response_id: str,
    model_name: str,
    model: Model,
    query: str,
    created: int,
    init_query: str | None = None,
) -> AsyncGenerator[str, None]:
    """Stream OpenAI-format SSE response.

    Implements the OpenAI streaming protocol:
    1. Initial chunk with role
    2. Content delta chunks
    3. Final chunk with finish_reason
    4. [DONE] marker

    Reference: https://platform.openai.com/docs/api-reference/chat/streaming
    """
    import threading

    # 1. Initial chunk with role
    initial_chunk = OpenAIStreamResponse(
        id=response_id,
        created=created,
        model=model_name,
        choices=[
            OpenAIStreamChoice(
                index=0,
                delta={"role": "assistant", "content": ""},
                finish_reason=None,
            )
        ],
    )
    yield f"data: {initial_chunk.model_dump_json()}\n\n"

    # Stream content deltas from Perplexity
    queue: asyncio.Queue[tuple[str, str]] = asyncio.Queue()
    loop = asyncio.get_running_loop()

    def producer():
        """Background thread to stream from Perplexity."""
        last = ""
        try:
            conversation = client.create_conversation(
                ConversationConfig(model=model, citation_mode=CitationMode.DEFAULT)
            )
            for resp in conversation.ask(query, stream=True, init_query=init_query):
                current = resp.answer or ""
                if len(current) > len(last):
                    delta = current[len(last) :]
                    last = current
                    loop.call_soon_threadsafe(queue.put_nowait, ("delta", delta))
            # Get citations from search results
            citations = format_citations(conversation.search_results)
            loop.call_soon_threadsafe(queue.put_nowait, ("done", (last, citations)))
        except Exception as e:
            loop.call_soon_threadsafe(queue.put_nowait, ("error", str(e)))

    threading.Thread(target=producer, daemon=True).start()

    # 2. Content delta chunks
    citations_text = ""
    while True:
        kind, payload = await queue.get()
        if kind == "delta":
            delta_chunk = OpenAIStreamResponse(
                id=response_id,
                created=created,
                model=model_name,
                choices=[
                    OpenAIStreamChoice(
                        index=0,
                        delta={"content": payload},
                        finish_reason=None,
                    )
                ],
            )
            yield f"data: {delta_chunk.model_dump_json()}\n\n"

        elif kind == "error":
            logging.error(f"Stream error: {payload}")
            # Send error as content
            error_chunk = OpenAIStreamResponse(
                id=response_id,
                created=created,
                model=model_name,
                choices=[
                    OpenAIStreamChoice(
                        index=0,
                        delta={"content": f"\n\n[Error: {payload}]"},
                        finish_reason=None,
                    )
                ],
            )
            yield f"data: {error_chunk.model_dump_json()}\n\n"
            break
        else:  # done - payload is (answer, citations)
            _, citations_text = payload
            break

    # Stream citations if available
    if citations_text:
        citation_chunk = OpenAIStreamResponse(
            id=response_id,
            created=created,
            model=model_name,
            choices=[
                OpenAIStreamChoice(
                    index=0,
                    delta={"content": citations_text},
                    finish_reason=None,
                )
            ],
        )
        yield f"data: {citation_chunk.model_dump_json()}\n\n"

    # 3. Final chunk with finish_reason
    final_chunk = OpenAIStreamResponse(
        id=response_id,
        created=created,
        model=model_name,
        choices=[
            OpenAIStreamChoice(
                index=0,
                delta={},
                finish_reason="stop",
            )
        ],
    )
    yield f"data: {final_chunk.model_dump_json()}\n\n"

    # 4. [DONE] marker
    yield "data: [DONE]\n\n"

    logging.info("OpenAI stream complete")


# =============================================================================
# Main
# =============================================================================

from .responses import responses_router


app.include_router(responses_router)


def run_server():
    """Run the API server."""
    cfg = ServerConfig.from_env()
    uvicorn.run(
        "perplexity_web_mcp.api.server:app",
        host=cfg.host,
        port=cfg.port,
        log_level=cfg.log_level.lower(),
    )


if __name__ == "__main__":
    run_server()
