"""AI model definitions."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Model:
    """AI model configuration."""

    identifier: str
    mode: str = "copilot"


class Models:
    """Available AI models (all use copilot mode with web search)."""

    DEEP_RESEARCH = Model(identifier="pplx_alpha")
    """Deep Research - Create in-depth reports with more sources, charts, and advanced reasoning."""

    CREATE_FILES_AND_APPS = Model(identifier="pplx_beta")
    """Create files and apps (previously known as Labs) - Turn your ideas into docs, slides, dashboards, and more."""

    BEST = Model(identifier="pplx_pro")
    """Best - Automatically selects the best model based on the query."""

    SONAR = Model(identifier="experimental")
    """Sonar - Perplexity's latest model."""

    GEMINI_3_FLASH = Model(identifier="gemini30flash")
    """Gemini 3 Flash - Google's fast model."""

    GEMINI_3_FLASH_THINKING = Model(identifier="gemini30flash_high")
    """Gemini 3 Flash Thinking - Google's fast model (thinking)."""

    GEMINI_3_PRO_THINKING = Model(identifier="gemini30pro")
    """Gemini 3 Pro Thinking - Google's most advanced model (thinking)."""

    GPT_52 = Model(identifier="gpt52")
    """GPT-5.2 - OpenAI's latest model."""

    GPT_52_THINKING = Model(identifier="gpt52_thinking")
    """GPT-5.2 Thinking - OpenAI's latest model (thinking)."""

    CLAUDE_46_SONNET = Model(identifier="claude46sonnet")
    """Claude Sonnet 4.6 - Anthropic's fast model."""

    CLAUDE_46_SONNET_THINKING = Model(identifier="claude46sonnetthinking")
    """Claude Sonnet 4.6 Thinking - Anthropic's fast model (thinking)."""

    CLAUDE_46_OPUS = Model(identifier="claude46opus")
    """Claude Opus 4.6 - Anthropic's most advanced reasoning model."""

    CLAUDE_46_OPUS_THINKING = Model(identifier="claude46opusthinking")
    """Claude Opus 4.6 Thinking - Anthropic's most advanced reasoning model (thinking)."""

    GROK_41 = Model(identifier="grok41nonreasoning")
    """Grok 4.1 - xAI's latest model."""

    GROK_41_THINKING = Model(identifier="grok41reasoning")
    """Grok 4.1 Thinking - xAI's latest model (thinking)."""

    KIMI_K25_THINKING = Model(identifier="kimik25thinking")
    """Kimi K2.5 Thinking - Moonshot AI's latest model."""
