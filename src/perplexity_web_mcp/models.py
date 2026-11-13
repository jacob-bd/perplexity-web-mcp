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

    AUTO = Model(identifier="auto", mode="concise")
    """Standard Free Search — Unlimited concise search mode for free accounts."""

    DEEP_RESEARCH = Model(identifier="pplx_alpha")
    """Deep Research - Create in-depth reports with more sources, charts, and advanced reasoning."""

    CREATE_FILES_AND_APPS = Model(identifier="pplx_beta")
    """Create files and apps (previously known as Labs) - Turn your ideas into docs, slides, dashboards, and more."""

    BEST = Model(identifier="pplx_pro")
    """Best - Automatically selects the best model based on the query."""

    SONAR = Model(identifier="experimental", mode="concise")
    """Sonar 2 — Perplexity's latest in-house model (backend id: experimental)."""

    GPT_61_SOL = Model(identifier="gpt6_1_sol")
    """GPT-6.1 Sol - OpenAI's versatile model."""

    GPT_61_SOL_THINKING = Model(identifier="gpt6_1_sol_thinking")
    """GPT-6.1 Sol Thinking - OpenAI's versatile model with thinking."""

    GPT_6_ASTRA = Model(identifier="gpt6_astra")
    """GPT-6 Astra - OpenAI's most capable model (Max only)."""

    GPT_6_ASTRA_THINKING = Model(identifier="gpt6_astra_thinking")
    """GPT-6 Astra Thinking - OpenAI's most capable model with thinking (Max only)."""

    GEMINI_4_CARBON = Model(identifier="gemini4carbon")
    """Gemini 4 Carbon - Google's most powerful model (Max only)."""

    GEMINI_4_CARBON_THINKING = Model(identifier="gemini4carbonthinking")
    """Gemini 4 Carbon Thinking - Google's most powerful model with thinking (Max only)."""

    GEMINI_4_HYDROGEN = Model(identifier="gemini4hydrogen")
    """Gemini 4 Hydrogen - Google's latest model."""

    GEMINI_4_HYDROGEN_THINKING = Model(identifier="gemini4hydrogenthinking")
    """Gemini 4 Hydrogen Thinking - Google's latest model with thinking."""

    CLAUDE_55_SONNET = Model(identifier="claude55sonnet")
    """Claude Sonnet 5.5 - Anthropic's fast model."""

    CLAUDE_55_SONNET_THINKING = Model(identifier="claude55sonnetthinking")
    """Claude Sonnet 5.5 Thinking - Anthropic's newest reasoning model."""

    CLAUDE_55_OPUS = Model(identifier="claude55opus")
    """Claude Opus 5.5 - Anthropic's latest model (Max only)."""

    CLAUDE_55_OPUS_THINKING = Model(identifier="claude55opusthinking")
    """Claude Opus 5.5 Thinking - Anthropic's latest model with thinking (Max only)."""

    CLAUDE_FABLE_52 = Model(identifier="claudefable52")
    """Claude Fable 5.2 - Anthropic's most capable model (Max only)."""

    CLAUDE_FABLE_52_THINKING = Model(identifier="claudefable52thinking")
    """Claude Fable 5.2 Thinking - Anthropic's most capable model with thinking (Max only)."""

    NEMOTRON_3_5_SUPER = Model(identifier="nv_nemotron_3_5_super")
    """Nemotron 3.5 Super VL - NVIDIA's newest Nemotron model."""

    GLM_5_3 = Model(identifier="glm_5_3_thinking")
    """GLM-5.3 - Z.ai's newest model (thinking only)."""

    KIMI_K3 = Model(identifier="kimik3thinking")
    """Kimi K3 - Moonshot AI's newest model (thinking only)."""

    GROK_47 = Model(identifier="grok47")
    """Grok 4.7 - xAI's newest model."""

    GROK_47_THINKING = Model(identifier="grok47thinking")
    """Grok 4.7 Thinking - xAI's newest model with thinking."""
