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

    GEMINI_31_PRO_THINKING = Model(identifier="gemini31pro_high")
    """Gemini 3.1 Pro Thinking - Google's most advanced model (thinking)."""

    GEMINI_38_FLASH = Model(identifier="gemini38flash")
    """Gemini 3.8 Flash - Google's newest fast model."""

    GEMINI_38_FLASH_THINKING = Model(identifier="gemini38flashthinking")
    """Gemini 3.8 Flash Thinking - Google's newest fast model with thinking."""

    GPT_56_TERRA = Model(identifier="gpt56_terra")
    """GPT-5.6 Terra - OpenAI's versatile model."""

    GPT_56_TERRA_THINKING = Model(identifier="gpt56_terra_thinking")
    """GPT-5.6 Terra Thinking - OpenAI's versatile model with thinking."""

    GPT_56_SOL = Model(identifier="gpt56_sol")
    """GPT-5.6 Sol - OpenAI's most powerful model (Max only)."""

    GPT_56_SOL_THINKING = Model(identifier="gpt56_sol_thinking")
    """GPT-5.6 Sol Thinking - OpenAI's most powerful model with thinking (Max only)."""

    GPT_6_SOL = Model(identifier="gpt6_sol")
    """GPT-6 Sol - OpenAI's versatile model."""

    GPT_6_SOL_THINKING = Model(identifier="gpt6_sol_thinking")
    """GPT-6 Sol Thinking - OpenAI's versatile model with thinking."""

    GROK_45 = Model(identifier="grok45low")
    """Grok 4.5 - xAI's most advanced model."""

    GROK_45_THINKING = Model(identifier="grok45medium")
    """Grok 4.5 Thinking - xAI's most advanced model with thinking."""

    GROK_47 = Model(identifier="grok47")
    """Grok 4.7 - xAI's newest model."""

    GROK_47_THINKING = Model(identifier="grok47thinking")
    """Grok 4.7 Thinking - xAI's newest model with thinking."""

    CLAUDE_50_SONNET = Model(identifier="claude50sonnet")
    """Claude Sonnet 5 - Anthropic's fast model."""

    CLAUDE_50_SONNET_THINKING = Model(identifier="claude50sonnetthinking")
    """Claude Sonnet 5 Thinking - Anthropic's newest reasoning model."""

    CLAUDE_48_OPUS = Model(identifier="claude48opus")
    """Claude Opus 4.8 - Anthropic's most advanced reasoning model."""

    CLAUDE_48_OPUS_THINKING = Model(identifier="claude48opusthinking")
    """Claude Opus 4.8 Thinking - Anthropic's most advanced reasoning model (thinking)."""

    CLAUDE_55_OPUS = Model(identifier="claude55opus")
    """Claude Opus 5.5 - Anthropic's most powerful model (Max only)."""

    CLAUDE_55_OPUS_THINKING = Model(identifier="claude55opusthinking")
    """Claude Opus 5.5 Thinking - Anthropic's most powerful model with thinking (Max only)."""

    NEMOTRON_3_ULTRA = Model(identifier="nv_nemotron_3_ultra")
    """Nemotron 3 Ultra - NVIDIA's Nemotron 3 Ultra 550B model (thinking)."""

    GLM_5_2 = Model(identifier="glm_5_2")
    """GLM-5.2 - Z.ai's advanced model (thinking)."""

    GLM_5_3 = Model(identifier="glm_5_3_thinking")
    """GLM-5.3 - Z.ai's newest model (thinking only)."""

    KIMI_K2_6 = Model(identifier="kimik26instant")
    """Kimi K2.6 - Moonshot AI's latest model."""

    KIMI_K2_6_THINKING = Model(identifier="kimik26thinking")
    """Kimi K2.6 Thinking - Moonshot AI's latest model (thinking)."""

    KIMI_K3 = Model(identifier="kimik3thinking")
    """Kimi K3 - Moonshot AI's newest model (thinking only)."""
