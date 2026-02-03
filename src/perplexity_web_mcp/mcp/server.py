"""MCP server implementation using FastMCP."""

from __future__ import annotations

from os import environ
from typing import Literal

from fastmcp import FastMCP

from perplexity_web_mcp.config import ClientConfig, ConversationConfig
from perplexity_web_mcp.core import Perplexity
from perplexity_web_mcp.enums import CitationMode, SearchFocus, SourceFocus
from perplexity_web_mcp.models import Model, Models


mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI using premium models. "
        "Use pplx_query for flexible model selection with thinking toggle. "
        "Or use model-specific tools like pplx_gpt52, pplx_claude_sonnet, etc. "
        "All tools support source_focus: web, academic, social, finance, all."
    ),
)

SOURCE_FOCUS_MAP = {
    "web": [SourceFocus.WEB],
    "academic": [SourceFocus.ACADEMIC],
    "social": [SourceFocus.SOCIAL],
    "finance": [SourceFocus.FINANCE],
    "all": [SourceFocus.WEB, SourceFocus.ACADEMIC, SourceFocus.SOCIAL],
}

# Model name to Model mapping (supports thinking toggle)
MODEL_MAP: dict[str, tuple[Model, Model | None]] = {
    # (base_model, thinking_model) - None if no thinking variant
    "auto": (Models.BEST, None),
    "sonar": (Models.SONAR, None),
    "deep_research": (Models.DEEP_RESEARCH, None),
    "gpt52": (Models.GPT_52, Models.GPT_52_THINKING),
    "claude_sonnet": (Models.CLAUDE_45_SONNET, Models.CLAUDE_45_SONNET_THINKING),
    "claude_opus": (Models.CLAUDE_45_OPUS, Models.CLAUDE_45_OPUS_THINKING),
    "gemini_flash": (Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING),
    "gemini_pro": (Models.GEMINI_3_PRO_THINKING, Models.GEMINI_3_PRO_THINKING),  # Only thinking variant
    "grok": (Models.GROK_41, Models.GROK_41_THINKING),
    "kimi": (Models.KIMI_K25_THINKING, Models.KIMI_K25_THINKING),  # Only thinking variant
}

SourceFocusName = Literal["web", "academic", "social", "finance", "all"]
ModelName = Literal["auto", "sonar", "deep_research", "gpt52", "claude_sonnet", "claude_opus", "gemini_flash", "gemini_pro", "grok", "kimi"]

_client: Perplexity | None = None


def _get_client() -> Perplexity:
    """Get or create Perplexity client."""

    global _client  # noqa: PLW0603

    if _client is None:
        token = environ.get("PERPLEXITY_SESSION_TOKEN", "")

        if not token:
            raise ValueError(
                "PERPLEXITY_SESSION_TOKEN environment variable is required. "
                "Set it with: export PERPLEXITY_SESSION_TOKEN='your_token_here'"
            )

        _client = Perplexity(token, config=ClientConfig())

    return _client


def _ask(query: str, model: Model, source_focus: SourceFocusName = "web") -> str:
    """Execute a query with a specific model."""

    client = _get_client()
    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])

    try:
        conversation = client.create_conversation(
            ConversationConfig(
                model=model,
                citation_mode=CitationMode.DEFAULT,
                search_focus=SearchFocus.WEB,
                source_focus=sources,
            )
        )

        conversation.ask(query)
        answer = conversation.answer or "No answer received"

        response_parts = [answer]

        if conversation.search_results:
            response_parts.append("\n\nCitations:")

            for i, result in enumerate(conversation.search_results, 1):
                url = result.url or ""
                response_parts.append(f"\n[{i}]: {url}")

        return "".join(response_parts)

    except Exception as error:
        return f"Error: {error!s}"


@mcp.tool
def pplx_query(
    query: str,
    model: ModelName = "auto",
    thinking: bool = False,
    source_focus: SourceFocusName = "web",
) -> str:
    """Query Perplexity AI with model selection and thinking toggle.
    
    Args:
        query: The question to ask
        model: Model to use - auto, sonar, deep_research, gpt52, claude_sonnet, 
               claude_opus, gemini_flash, gemini_pro, grok, kimi
        thinking: Enable extended thinking mode (available for gpt52, claude_sonnet, 
                  claude_opus, gemini_flash, grok)
        source_focus: Source type - web, academic, social, finance, all
    """
    model_tuple = MODEL_MAP.get(model, (Models.BEST, None))
    base_model, thinking_model = model_tuple
    
    # Use thinking model if requested and available
    selected_model = thinking_model if thinking and thinking_model else base_model
    
    return _ask(query, selected_model, source_focus)


@mcp.tool
def pplx_ask(query: str, source_focus: SourceFocusName = "web") -> str:
    """Ask a question with real-time data from the internet (auto-selects best model)."""

    return _ask(query, Models.BEST, source_focus)


@mcp.tool
def pplx_deep_research(query: str, source_focus: SourceFocusName = "web") -> str:
    """Deep Research - In-depth reports with more sources, charts, and advanced reasoning."""

    return _ask(query, Models.DEEP_RESEARCH, source_focus)


@mcp.tool
def pplx_sonar(query: str, source_focus: SourceFocusName = "web") -> str:
    """Sonar - Perplexity's latest model."""

    return _ask(query, Models.SONAR, source_focus)


@mcp.tool
def pplx_gpt52(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 - OpenAI's latest model."""

    return _ask(query, Models.GPT_52, source_focus)


@mcp.tool
def pplx_gpt52_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """GPT-5.2 Thinking - OpenAI's latest model with extended thinking."""

    return _ask(query, Models.GPT_52_THINKING, source_focus)


@mcp.tool
def pplx_claude_sonnet(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.5 - Anthropic's fast model."""

    return _ask(query, Models.CLAUDE_45_SONNET, source_focus)


@mcp.tool
def pplx_claude_sonnet_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Claude Sonnet 4.5 Thinking - Anthropic's fast model with extended thinking."""

    return _ask(query, Models.CLAUDE_45_SONNET_THINKING, source_focus)


@mcp.tool
def pplx_gemini_flash(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash - Google's fast model."""

    return _ask(query, Models.GEMINI_3_FLASH, source_focus)


@mcp.tool
def pplx_gemini_flash_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Flash Thinking - Google's fast model with extended thinking."""

    return _ask(query, Models.GEMINI_3_FLASH_THINKING, source_focus)


@mcp.tool
def pplx_gemini_pro_think(query: str, source_focus: SourceFocusName = "web") -> str:
    """Gemini 3 Pro Thinking - Google's most advanced model with extended thinking."""

    return _ask(query, Models.GEMINI_3_PRO_THINKING, source_focus)


@mcp.tool
def pplx_grok(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 - xAI's latest model."""

    return _ask(query, Models.GROK_41, source_focus)


@mcp.tool
def pplx_grok_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Grok 4.1 Thinking - xAI's latest model with extended thinking."""

    return _ask(query, Models.GROK_41_THINKING, source_focus)


@mcp.tool
def pplx_kimi_thinking(query: str, source_focus: SourceFocusName = "web") -> str:
    """Kimi K2.5 Thinking - Moonshot AI's latest model."""

    return _ask(query, Models.KIMI_K25_THINKING, source_focus)


def main() -> None:
    """Run the MCP server."""

    mcp.run()


if __name__ == "__main__":
    main()
