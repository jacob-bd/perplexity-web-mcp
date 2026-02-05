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
    claude --model claude-sonnet-4-5      # Use Claude 4.5 Sonnet via Perplexity
    claude --model gpt-5.2                # Use GPT-5.2 via Perplexity
    claude --model perplexity-auto        # Use Perplexity's auto model selection
    claude --model claude-3-5-sonnet      # Legacy name, maps to Claude 4.5 Sonnet
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import time
import uuid
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import datetime
from typing import Any, AsyncGenerator

import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, ConfigDict, Field

from perplexity_web_mcp import Perplexity, ConversationConfig, Models
from perplexity_web_mcp.enums import CitationMode
from perplexity_web_mcp.models import Model
from perplexity_web_mcp.token_store import load_token
# Tool calling disabled for now - models don't reliably follow format instructions
# from perplexity_web_mcp.api.tool_calling import (...)
from perplexity_web_mcp.api.session_manager import (
    ConversationManager,
    distill_system_prompt,
)
from perplexity_web_mcp.api.prompt_builder import build_prompt_with_tools, format_tool_results
from perplexity_web_mcp.api.response_parser import parse_response
from perplexity_web_mcp.api.tool_validation import validate_tool_pairing

# Supported Anthropic API version
ANTHROPIC_API_VERSION = "2023-06-01"


# =============================================================================
# Configuration
# =============================================================================

@dataclass
class ServerConfig:
    """Server configuration from environment variables."""
    
    session_token: str
    api_key: str | None = None  # Optional auth
    host: str = "0.0.0.0"
    port: int = 8080
    log_level: str = "INFO"
    default_model: str = "auto"
    
    @classmethod
    def from_env(cls) -> "ServerConfig":
        """Load from environment."""
        # Try to load from token store (env var or ~/.config/perplexity-web-mcp/token)
        session_token = load_token()
        if not session_token:
            raise ValueError(
                "No Perplexity session token found. "
                "Run 'pwm-auth' to authenticate."
            )
        
        return cls(
            session_token=session_token,
            api_key=os.getenv("ANTHROPIC_API_KEY"),  # For auth validation
            host=os.getenv("HOST", "0.0.0.0"),
            port=int(os.getenv("PORT", "8080")),
            log_level=os.getenv("LOG_LEVEL", "INFO"),
            default_model=os.getenv("DEFAULT_MODEL", "auto"),
        )


# =============================================================================
# Model Mapping
# =============================================================================

# Map model names to Perplexity models
# Supports Anthropic, OpenAI, and standard Claude Code model naming conventions
# Updated Feb 2026 to match Perplexity UI offerings
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
    # Claude Sonnet 4.5 - supports thinking toggle
    # Claude Opus 4.5 - supports thinking (requires Max subscription)
    # ==========================================================================
    # Current model names
    "claude-sonnet-4-5": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude-4-5-sonnet": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude-sonnet-4-5-20250514": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude-opus-4-5": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "claude-4-5-opus": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "claude-opus-4-5-20251101": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    # Claude Code default model aliases (for compatibility)
    # These allow `claude --model claude-3-5-sonnet` to work
    "claude-3-5-sonnet": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude-3-5-sonnet-20241022": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude-3-opus": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "claude-3-opus-20240229": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "claude-3-5-haiku": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),  # Map to Sonnet
    "claude-haiku-4-5-20251001": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),  # Map Haiku 4.5 to Sonnet
    "claude-haiku": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    # Generic aliases
    "claude": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "sonnet": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "opus": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    
    # ==========================================================================
    # OpenAI GPT-5.2 (via Perplexity) - supports thinking toggle
    # Note: GPT-4 series deprecated by OpenAI, removed
    # ==========================================================================
    "gpt-5.2": (Models.GPT_52, Models.GPT_52_THINKING),
    "gpt-5-2": (Models.GPT_52, Models.GPT_52_THINKING),
    "gpt-52": (Models.GPT_52, Models.GPT_52_THINKING),
    "gpt52": (Models.GPT_52, Models.GPT_52_THINKING),
    
    # ==========================================================================
    # Google Gemini 3 Models (via Perplexity)
    # - Gemini 3 Flash: has thinking toggle (on/off)
    # - Gemini 3 Pro: thinking ALWAYS enabled (no toggle in UI)
    # ==========================================================================
    "gemini-3-flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    "gemini-3.0-flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    "gemini-flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    # Gemini 3 Pro - thinking only, no non-thinking variant available
    "gemini-3-pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),
    "gemini-3.0-pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),
    "gemini-pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),
    
    # ==========================================================================
    # xAI Grok 4.1 (via Perplexity) - supports thinking toggle
    # ==========================================================================
    "grok-4.1": (Models.GROK_41, Models.GROK_41_THINKING),
    "grok-4-1": (Models.GROK_41, Models.GROK_41_THINKING),
    "grok-41": (Models.GROK_41, Models.GROK_41_THINKING),
    "grok": (Models.GROK_41, Models.GROK_41_THINKING),
    
    # ==========================================================================
    # Moonshot Kimi K2.5 (via Perplexity)
    # Thinking ALWAYS enabled (no toggle in UI) - only thinking variant available
    # ==========================================================================
    "kimi-k2.5": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),
    "kimi-k2-5": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),
    "kimi-k25": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),
    "kimi": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),
}

# Models we expose via /v1/models
# Ordered to match Perplexity UI (Feb 2026)
AVAILABLE_MODELS = [
    # Perplexity Native
    {"id": "perplexity-auto", "description": "Best - Automatically selects optimal model"},
    {"id": "perplexity-sonar", "description": "Sonar - Perplexity's latest model"},
    {"id": "perplexity-research", "description": "Deep Research - In-depth reports with sources"},
    # Google Gemini
    {"id": "gemini-3-flash", "description": "Gemini 3 Flash - Fast, thinking toggle available"},
    {"id": "gemini-3-pro", "description": "Gemini 3 Pro - Advanced, thinking always on"},
    # OpenAI
    {"id": "gpt-5.2", "description": "GPT-5.2 - OpenAI's latest, thinking toggle available"},
    # Anthropic Claude
    {"id": "claude-sonnet-4-5", "description": "Claude Sonnet 4.5 - Fast, thinking toggle available"},
    {"id": "claude-opus-4-5", "description": "Claude Opus 4.5 - Advanced reasoning, Max tier required"},
    # xAI
    {"id": "grok-4.1", "description": "Grok 4.1 - xAI's latest, thinking toggle available"},
    # Moonshot
    {"id": "kimi-k2.5", "description": "Kimi K2.5 - Moonshot AI multimodal, thinking always on"},
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
    including text, images, and tool_result blocks.

    Tool results should be provided in content blocks as:
    {"type": "tool_result", "tool_use_id": "...", "content": "..."}
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
    model: str = Field(..., description="Model to use (e.g., 'claude-sonnet-4-5')")
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
        None, 
        description="Extended thinking config. Set type='enabled' to use thinking models."
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


class ToolUseBlock(BaseModel):
    """Tool use content block.

    Represents a request from the model to call a tool.
    Reference: https://docs.anthropic.com/en/api/messages#tool-use
    """
    type: str = Field("tool_use", description="Block type")
    id: str = Field(..., description="Unique tool use ID (format: toolu_{24 hex chars})")
    name: str = Field(..., description="Tool name to invoke")
    input: dict[str, Any] = Field(..., description="Tool arguments as JSON object")


class ToolResultBlock(BaseModel):
    """Tool result content block.

    Contains the result of executing a tool use.
    Sent back by the user in a subsequent request.
    Reference: https://docs.anthropic.com/en/api/messages#tool-result
    """
    type: str = Field("tool_result", description="Block type")
    tool_use_id: str = Field(..., description="References ToolUseBlock.id")
    content: str = Field(..., description="Tool execution result")
    is_error: bool = Field(False, description="Whether execution failed")


class MessagesResponse(BaseModel):
    """Anthropic Messages API response.

    Reference: https://docs.anthropic.com/en/api/messages
    """
    id: str = Field(..., description="Unique message identifier")
    type: str = Field("message", description="Object type")
    role: str = Field("assistant", description="Message role")
    content: list[TextBlock | ToolUseBlock] = Field(..., description="Response content blocks")
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
    logging.info(f"Auth required: {'Yes' if config.api_key else 'No'}")
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

def verify_auth(request: Request) -> None:
    """Verify API key if configured.
    
    Supports both:
    - x-api-key header (Anthropic style)
    - Authorization: Bearer <key> header (OpenAI style)
    
    For Claude Code compatibility:
    - If ANTHROPIC_API_KEY env var is not set, any auth value is accepted
    - This matches Ollama's behavior for seamless Claude Code integration
    """
    # If no API key is configured, accept any auth (Claude Code compatibility)
    if not config.api_key:
        return
    
    auth = request.headers.get("x-api-key", "")
    if not auth:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            auth = auth[7:]
    
    # If API key is configured, validate it
    if auth != config.api_key:
        raise HTTPException(
            status_code=401,
            detail={"type": "authentication_error", "message": "Invalid API key"}
        )


def check_anthropic_version(request: Request) -> None:
    """Log anthropic-version header if present (informational only)."""
    version = request.headers.get("anthropic-version")
    if version and version != ANTHROPIC_API_VERSION:
        logging.debug(
            f"Client requested anthropic-version {version}, "
            f"server implements {ANTHROPIC_API_VERSION}"
        )


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


def openai_messages_to_query(messages: list[OpenAIChatMessage]) -> str:
    """Convert OpenAI chat messages to Perplexity query.
    
    Note: System messages are intentionally NOT included to avoid URL length
    limits with Perplexity.
    """
    # Filter out system messages and get user/assistant messages only
    conversation_msgs = [m for m in messages if m.role in ("user", "assistant")]
    
    # For single user message, just return it directly
    user_msgs = [m for m in conversation_msgs if m.role == "user"]
    if len(user_msgs) == 1 and len(conversation_msgs) == 1:
        return user_msgs[0].get_text()
    
    # Multi-turn: format as conversation
    parts = []
    for msg in conversation_msgs:
        text = msg.get_text()
        if msg.role == "user":
            parts.append(f"User: {text}")
        elif msg.role == "assistant":
            parts.append(f"Assistant: {text}")
    
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
        url = getattr(result, 'url', '') or ''
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


def extract_tool_results(messages: list[MessageParam]) -> dict[str, tuple[str, bool]]:
    """Extract tool results from message history.

    Args:
        messages: Message history

    Returns:
        Dict mapping tool_use_id -> (content, is_error) tuples
    """
    results = {}
    for msg in messages:
        if msg.role == "user" and isinstance(msg.content, list):
            for block in msg.content:
                if isinstance(block, dict) and block.get("type") == "tool_result":
                    tool_use_id = block.get("tool_use_id")
                    content = block.get("content", "")
                    is_error = block.get("is_error", False)
                    if tool_use_id:
                        results[tool_use_id] = (content, is_error)
    return results


def transform_to_tool_use_blocks(
    parse_result: dict,
    answer: str,
    confidence_threshold: float = 0.7
) -> tuple[list[dict], str]:
    """Transform parser output to tool_use content blocks.

    Args:
        parse_result: Output from parse_response containing tool_calls, confidence, strategy
        answer: Original model answer text
        confidence_threshold: Minimum confidence to return tool_use blocks (default 0.7)

    Returns:
        Tuple of (content_blocks, stop_reason):
        - content_blocks: List of content block dicts (text and/or tool_use)
        - stop_reason: "tool_use" if tool blocks present, "end_turn" otherwise
    """
    tool_calls = parse_result.get("tool_calls", [])
    confidence = parse_result.get("confidence", 0.0)

    # No tool calls detected
    if not tool_calls:
        return ([{"type": "text", "text": answer}], "end_turn")

    # Log confidence scores when tool calls detected (TC-03)
    logging.info(f"Detected tool calls with confidence: {confidence:.2f} (threshold: {confidence_threshold:.2f})")

    # Tool calls detected but confidence too low
    if confidence < confidence_threshold:
        logging.info(
            f"Tool calls detected but confidence {confidence:.2f} < threshold {confidence_threshold:.2f}, "
            "returning text-only response"
        )
        return ([{"type": "text", "text": answer}], "end_turn")

    # High-confidence tool calls - build content blocks
    content_blocks = []

    # If there's answer text, add it first
    if answer.strip():
        content_blocks.append({"type": "text", "text": answer})

    # Add tool_use blocks for each tool call
    for tool_call in tool_calls:
        tool_use_id = f"toolu_{uuid.uuid4().hex[:24]}"
        tool_use_block = ToolUseBlock(
            id=tool_use_id,
            name=tool_call["name"],
            input=tool_call["arguments"]
        )
        content_blocks.append(tool_use_block.model_dump())

    return (content_blocks, "tool_use")


def classify_parse_error(error: Exception, context: str) -> tuple[str, str]:
    """Classify a parsing error and return user-friendly message with internal details.

    Args:
        error: The exception that occurred during parsing
        context: Context string describing what was being parsed

    Returns:
        Tuple of (user_message, internal_details)
        - user_message: User-friendly error description
        - internal_details: Technical details for debugging
    """
    error_type = type(error).__name__
    error_msg = str(error)

    # Map exception types to user-friendly messages
    if isinstance(error, SyntaxError):
        user_message = "Could not parse tool call format. The model's response contained malformed code."
    elif isinstance(error, (json.JSONDecodeError, ValueError)):
        user_message = "Tool arguments were not valid JSON. The model did not provide properly formatted parameters."
    elif isinstance(error, KeyError):
        user_message = "Tool call missing required fields. The model's response did not include all necessary information."
    else:
        user_message = "Unable to parse tool calls from model response."

    # Create internal details string
    internal_details = f"{error_type}: {error_msg}"

    # Log with full exception info for debugging
    logging.error(
        f"Parse error during {context}: {internal_details}",
        exc_info=True,
        extra={"context": context, "error_type": error_type}
    )

    return (user_message, internal_details)


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
    return ModelsListResponse(
        data=[
            ModelObject(id=m["id"], created=now)
            for m in AVAILABLE_MODELS
        ]
    )


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
            status_code=400,
            detail={"type": "invalid_request_error", "message": "messages is required"}
        )

    # Validate tool_use/tool_result pairing
    is_valid, error_msg = validate_tool_pairing([msg.model_dump() for msg in body.messages])
    if not is_valid:
        logging.error(f"Tool pairing validation failed: {error_msg}")
        raise HTTPException(
            status_code=400,
            detail={"type": "invalid_request_error", "message": f"Invalid tool pairing: {error_msg}"}
        )

    # Extract and log tool results
    tool_results = extract_tool_results(body.messages)
    if tool_results:
        logging.info(f"Received {len(tool_results)} tool results")
        logging.debug(f"Tool results: {list(tool_results.keys())}")

    # Determine if thinking mode is requested
    thinking_enabled = body.thinking is not None and body.thinking.get("type") == "enabled"
    
    # Get the appropriate model
    model = get_model(body.model, thinking=thinking_enabled)
    
    # Get system prompt text
    system_text = body.get_system_text()

    # Convert messages to query
    query = messages_to_query(body.messages)

    # Check if tools are provided and inject them into the prompt
    if body.tools:
        logging.info(f"Tool injection: Processing {len(body.tools)} tools from request")
        # Pass tool_results if available
        query = build_prompt_with_tools(
            query,
            body.tools,
            system_text,
            tool_results=tool_results if tool_results else None
        )
        # System is now included in the prompt, don't apply it separately
        system_text = None

        # Log tool result injection with context size estimate
        if tool_results:
            # Calculate estimated context size from tool results
            result_chars = sum(len(content) for content, _ in tool_results.values())
            logging.info(f"Tool result injection: Estimated context size: {result_chars} chars across {len(tool_results)} results")

            # Log if any results were errors
            error_count = sum(1 for _, is_error in tool_results.values() if is_error)
            if error_count > 0:
                logging.warning(f"Tool result injection: {error_count} of {len(tool_results)} results are errors")

            logging.debug(f"Tool result injection: IDs: {list(tool_results.keys())}")

        logging.debug(f"Tool injection: Prompt preview: {query[:200]}...")
        logging.info("Tool injection: Successfully injected tools into prompt")

    input_tokens = estimate_tokens(query)
    logging.debug(f"Prompt construction: Final prompt length: {len(query)} chars, estimated {input_tokens} tokens")
    
    # Generate response ID
    response_id = f"msg_{uuid.uuid4().hex[:24]}"
    
    logging.info(f"Request: model={body.model}, thinking={thinking_enabled}, stream={body.stream}")
    
    if body.stream:
        return StreamingResponse(
            stream_response(response_id, body.model, model, query, input_tokens, system_text, body.tools),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    
    # Non-streaming response
    try:
        # Create fresh client for each request (with semaphore to limit concurrency)
        async with perplexity_semaphore:
            global last_request_time
            import time as time_module
            
            # Rate limiting: ensure minimum interval between requests
            now = time_module.time()
            wait_needed = MIN_REQUEST_INTERVAL - (now - last_request_time)
            if wait_needed > 0:
                logging.debug(f"Rate limiting: waiting {wait_needed:.1f}s")
                await asyncio.sleep(wait_needed)
            last_request_time = time_module.time()
            
            # Prepend distilled system prompt to query (single ask)
            full_query = query
            if system_text:
                distilled = distill_system_prompt(system_text)
                full_query = f"[Instructions: {distilled}]\n\n{query}"
            
            fresh_client = Perplexity(session_token=config.session_token)
            conversation = fresh_client.create_conversation(
                ConversationConfig(model=model, citation_mode=CitationMode.DEFAULT)
            )
            # Single ask with prepended system context
            await asyncio.to_thread(conversation.ask, full_query)
            fresh_client.close()
        answer = conversation.answer or ""

        # Parse response for tool calls and transform to content blocks
        if body.tools:
            try:
                parse_result = parse_response(answer)
                content_blocks, stop_reason = transform_to_tool_use_blocks(parse_result, answer)

                # Log parsing results
                if parse_result["tool_calls"]:
                    logging.info(
                        f"Parsed {len(parse_result['tool_calls'])} tool calls using "
                        f"{parse_result['strategy']} strategy (confidence: {parse_result['confidence']:.1f})"
                    )
                    for tool_call in parse_result["tool_calls"]:
                        logging.debug(f"Tool call: {tool_call['name']} with args {tool_call['arguments']}")
                else:
                    logging.debug(f"No tool calls found in response (strategy: {parse_result['strategy']})")

            except Exception as parse_error:
                # Determine context - parse_result may not exist if exception occurred early
                try:
                    context = f"parsing response for {parse_result.get('strategy', 'unknown')} strategy"
                except NameError:
                    context = "parsing response"

                user_message, internal_details = classify_parse_error(parse_error, context)
                # Internal logging already handled in classify_parse_error
                logging.debug(f"Falling back to text-only response due to: {user_message}")

                # Fallback to text-only response (maintain existing contract)
                content_blocks = [{"type": "text", "text": answer}]
                stop_reason = "end_turn"
        else:
            # No tools provided - return text-only
            content_blocks = [{"type": "text", "text": answer}]
            stop_reason = "end_turn"

        # Append citations to the last text block if present
        citations = format_citations(conversation.search_results)
        if citations:
            # Find the last text block and append citations
            for i in range(len(content_blocks) - 1, -1, -1):
                if content_blocks[i].get("type") == "text":
                    content_blocks[i]["text"] += citations
                    break
            else:
                # No text block found (all tool_use blocks), add as new text block
                content_blocks.append({"type": "text", "text": citations})

        # Calculate output tokens from all content
        full_response = answer + citations
        output_tokens = estimate_tokens(full_response)

        return {
            "id": response_id,
            "type": "message",
            "role": "assistant",
            "content": content_blocks,
            "model": body.model,
            "stop_reason": stop_reason,
            "stop_sequence": None,
            "usage": {
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
            },
        }
    
    except Exception as e:
        logging.error(f"Error creating message: {e}")
        raise HTTPException(
            status_code=500,
            detail={"type": "api_error", "message": str(e)}
        )


async def stream_response(
    response_id: str,
    model_name: str,
    model: Model,
    query: str,
    input_tokens: int,
    system_text: str | None = None,
    tools: list[dict[str, Any]] | None = None,
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
        }
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
        
        # Prepend distilled system prompt to query (single ask instead of priming)
        full_query = query
        if system_text:
            distilled = distill_system_prompt(system_text)
            full_query = f"[Instructions: {distilled}]\n\n{query}"
            logging.debug(f"Query with system context ({len(distilled)} chars)")
        
        for attempt in range(max_retries):
            try:
                # Create fresh client for each request to avoid curl_cffi Session issues
                fresh_client = Perplexity(session_token=config.session_token)
                conversation = fresh_client.create_conversation(
                    ConversationConfig(model=model, citation_mode=CitationMode.DEFAULT)
                )
                
                # Single ask with prepended system context
                for resp in conversation.ask(full_query, stream=True):
                    current = resp.answer or ""
                    if len(current) > len(last):
                        delta = current[len(last):]
                        last = current
                        loop.call_soon_threadsafe(queue.put_nowait, ("delta", delta))
                
                # Parse response for tool calls if tools were provided
                # Send accumulated response and parse_result to consumer
                parse_result = None
                if tools:
                    try:
                        parse_result = parse_response(last)
                        if parse_result["tool_calls"]:
                            logging.info(
                                f"Parsed {len(parse_result['tool_calls'])} tool calls using "
                                f"{parse_result['strategy']} strategy (confidence: {parse_result['confidence']:.1f})"
                            )
                            for tool_call in parse_result["tool_calls"]:
                                logging.debug(f"Tool call: {tool_call['name']} with args {tool_call['arguments']}")
                        else:
                            logging.info(f"No tool calls found in response (strategy: {parse_result['strategy']})")
                    except Exception as parse_error:
                        logging.warning(f"Response parsing failed: {parse_error}")
                        parse_result = None
                        # Continue without tool extraction - don't break the response flow

                # Get citations from search results
                citations = format_citations(conversation.search_results)
                loop.call_soon_threadsafe(queue.put_nowait, ("done", (last, citations, parse_result)))
                fresh_client.close()
                # Update last_request_time AFTER completion
                last_request_time = time_module.time()
                break  # Success
            except Exception as e:
                error_str = str(e)
                last_request_time = time_module.time()  # Update even on error
                if "curl" in error_str.lower() and attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2
                    logging.warning(f"Curl error (attempt {attempt + 1}/{max_retries}), retrying in {wait_time}s")
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
    parse_result = None
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
            # Add recovery instructions for 403 errors
            error_msg = payload
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
        else:  # done - payload is (answer, citations, parse_result)
            total_output, citations_text, parse_result = payload
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

    # 5. content_block_stop event for text (index 0)
    yield f"event: content_block_stop\ndata: {json.dumps({'type': 'content_block_stop', 'index': 0})}\n\n"

    # Stream tool_use blocks if tools were provided and detected
    content_index = 1  # Text was index 0, tools start at 1
    stop_reason = "end_turn"

    if tools and parse_result:
        try:
            # Transform parse result to tool_use blocks
            content_blocks, stop_reason = transform_to_tool_use_blocks(
                parse_result, total_output, confidence_threshold=0.7
            )

            # Stream tool_use blocks (skip the text block at index 0 since already streamed)
            for block in content_blocks:
                if block.get("type") == "tool_use":
                    # content_block_start for tool_use
                    yield f"event: content_block_start\ndata: {json.dumps({
                        'type': 'content_block_start',
                        'index': content_index,
                        'content_block': {
                            'type': 'tool_use',
                            'id': block['id'],
                            'name': block['name'],
                            'input': {}
                        }
                    })}\n\n"

                    # content_block_delta with input_json_delta
                    input_json = json.dumps(block['input'])
                    yield f"event: content_block_delta\ndata: {json.dumps({
                        'type': 'content_block_delta',
                        'index': content_index,
                        'delta': {
                            'type': 'input_json_delta',
                            'partial_json': input_json
                        }
                    })}\n\n"

                    # content_block_stop
                    yield f"event: content_block_stop\ndata: {json.dumps({
                        'type': 'content_block_stop',
                        'index': content_index
                    })}\n\n"

                    content_index += 1

            if stop_reason == "tool_use":
                tool_count = len([b for b in content_blocks if b.get('type') == 'tool_use'])
                logging.info(
                    f"Streamed {tool_count} tool_use blocks "
                    f"(confidence: {parse_result.get('confidence', 0):.1f})"
                )
        except Exception as parse_error:
            logging.warning(f"Streaming tool parsing failed: {parse_error}")
            stop_reason = "end_turn"

    # 6. message_delta event (final usage with computed stop_reason)
    output_tokens = estimate_tokens(total_output)
    message_delta = {
        "type": "message_delta",
        "delta": {"stop_reason": stop_reason, "stop_sequence": None},
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
            status_code=400,
            detail={"error": {"type": "invalid_request_error", "message": "messages is required"}}
        )
    
    # Determine if thinking mode should be enabled
    # Map reasoning_effort to thinking models
    thinking_enabled = body.reasoning_effort in ("medium", "high", "xhigh")
    
    # Get the appropriate model
    model = get_model(body.model, thinking=thinking_enabled)
    
    # Convert messages to query
    query = openai_messages_to_query(body.messages)
    input_tokens = estimate_tokens(query)
    
    # Generate response ID
    response_id = f"chatcmpl-{uuid.uuid4().hex[:24]}"
    created = int(time.time())
    
    logging.info(f"OpenAI Request: model={body.model}, thinking={thinking_enabled}, stream={body.stream}")
    
    if body.stream:
        return StreamingResponse(
            stream_openai_response(response_id, body.model, model, query, created),
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
        await asyncio.to_thread(conversation.ask, query)
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
        raise HTTPException(
            status_code=500,
            detail={"error": {"type": "api_error", "message": str(e)}}
        )


async def stream_openai_response(
    response_id: str,
    model_name: str,
    model: Model,
    query: str,
    created: int,
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
            for resp in conversation.ask(query, stream=True):
                current = resp.answer or ""
                if len(current) > len(last):
                    delta = current[len(last):]
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
