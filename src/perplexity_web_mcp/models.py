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

    GEMINI_31_PRO_THINKING = Model(identifier="gemini31pro_high")
    """Gemini 3.1 Pro Thinking - Google's most advanced model (thinking)."""

    GPT_54 = Model(identifier="gpt54")
    """GPT-5.4 - OpenAI's versatile model."""

    GPT_54_THINKING = Model(identifier="gpt54_thinking")
    """GPT-5.4 Thinking - OpenAI's versatile model (thinking)."""

    GPT_55 = Model(identifier="gpt55")
    """GPT-5.5 - OpenAI's latest model (Max only)."""

    GPT_55_THINKING = Model(identifier="gpt55_thinking")
    """GPT-5.5 Thinking - OpenAI's latest model with thinking (Max only)."""

    CLAUDE_46_SONNET = Model(identifier="claude46sonnet")
    """Claude Sonnet 4.6 - Anthropic's fast model."""

    CLAUDE_46_SONNET_THINKING = Model(identifier="claude46sonnetthinking")
    """Claude Sonnet 4.6 Thinking - Anthropic's fast model (thinking)."""

    CLAUDE_47_OPUS = Model(identifier="claude47opus")
    """Claude Opus 4.7 - Anthropic's most advanced reasoning model."""

    CLAUDE_47_OPUS_THINKING = Model(identifier="claude47opusthinking")
    """Claude Opus 4.7 Thinking - Anthropic's most advanced reasoning model (thinking)."""

    NEMOTRON_3_SUPER = Model(identifier="nv_nemotron_3_super")
    """Nemotron 3 Super - NVIDIA's Nemotron 3 Super 120B model (thinking)."""

    KIMI_K2_6 = Model(identifier="kimik26instant")
    """Kimi K2.6 - Moonshot AI's latest model."""

    KIMI_K2_6_THINKING = Model(identifier="kimik26thinking")
    """Kimi K2.6 Thinking - Moonshot AI's latest model (thinking)."""

