"""Model Council: query multiple models in parallel and synthesize results.

Sends the same prompt to N models concurrently (via ThreadPoolExecutor),
collects their responses, then optionally uses Sonar (free, no Pro quota)
to produce a synthesized consensus that highlights agreements and
disagreements between the models.
"""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

from .config import ConversationConfig
from .enums import CitationMode, SearchFocus, SourceFocus
from .logging import get_logger
from .models import Model, Models


if TYPE_CHECKING:
    from .types import SearchResultItem


logger = get_logger(__name__)


# ---------------------------------------------------------------------------
# Default council composition
# ---------------------------------------------------------------------------

COUNCIL_DEFAULT_MODELS: list[tuple[str, Model]] = [
    ("GPT-5.4", Models.GPT_54),
    ("Claude Opus 4.6", Models.CLAUDE_46_OPUS),
    ("Gemini 3.1 Pro", Models.GEMINI_31_PRO_THINKING),
]
"""Default models for the council (3 diverse providers)."""


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass(frozen=True, slots=True)
class CouncilMemberResult:
    """Result from a single council member model."""

    model_name: str
    answer: str
    search_results: list[SearchResultItem] = field(default_factory=list)
    error: str | None = None


@dataclass(frozen=True, slots=True)
class CouncilResponse:
    """Full council response with individual results and synthesis."""

    individual_results: list[CouncilMemberResult]
    synthesis: str
    query: str
    model_names: list[str]

    def format_response(self) -> str:
        """Format the full council response for display."""
        parts: list[str] = []

        if self.synthesis:
            parts.append("# 🏛️ Model Council — Synthesized Answer\n")
            parts.append(self.synthesis)
            parts.append("\n\n---\n")

        parts.append("# Individual Model Responses\n")
        for r in self.individual_results:
            status = "✅" if r.error is None else "❌"
            parts.append(f"## {status} {r.model_name}\n")
            parts.append(r.answer)
            if r.search_results:
                parts.append("\n\n**Citations:**")
                for i, sr in enumerate(r.search_results, 1):
                    parts.append(f"\n[{i}]: {sr.url or ''}")
            parts.append("\n\n")

        return "".join(parts)


# ---------------------------------------------------------------------------
# Internal: query a single model
# ---------------------------------------------------------------------------

def _query_single_model(
    model_name: str,
    model: Model,
    query: str,
    sources: list[SourceFocus],
    search_focus: SearchFocus,
) -> CouncilMemberResult:
    """Query a single model. Designed to run inside a thread pool."""
    from .shared import get_client

    try:
        client = get_client()
        conversation = client.create_conversation(
            ConversationConfig(
                model=model,
                citation_mode=CitationMode.DEFAULT,
                search_focus=search_focus,
                source_focus=sources,
            )
        )
        conversation.ask(query)

        answer = conversation.answer or "No answer received"
        return CouncilMemberResult(
            model_name=model_name,
            answer=answer,
            search_results=list(conversation.search_results or []),
        )
    except Exception as exc:
        logger.warning(f"Council member {model_name} failed: {exc}")
        return CouncilMemberResult(
            model_name=model_name,
            answer=f"[Error querying {model_name}: {exc}]",
            error=str(exc),
        )


# ---------------------------------------------------------------------------
# Internal: synthesize results using Sonar (free)
# ---------------------------------------------------------------------------

_SYNTHESIS_SYSTEM_PROMPT = """\
You are synthesizing answers from {n} AI models that all responded to the same question.
Your job is to produce a single, authoritative answer by analyzing where the models agree \
and disagree.

## Original Question
{query}

{model_sections}

## Your Task
1. **SYNTHESIS** — Write the best unified answer, drawing on all models' strengths.
2. **AGREEMENTS** — List key points where all models converge.
3. **DISAGREEMENTS** — List points where models diverge, and briefly assess which \
   position is more likely correct and why.

Be concise but thorough. Use markdown formatting.\
"""


def _build_synthesis_prompt(
    query: str, results: list[CouncilMemberResult],
) -> str:
    """Build the prompt for the synthesis model."""
    sections: list[str] = []
    for r in results:
        if r.error is None:
            sections.append(f"## {r.model_name}'s Answer\n{r.answer}")
        else:
            sections.append(f"## {r.model_name}\n[This model encountered an error and did not respond.]")

    return _SYNTHESIS_SYSTEM_PROMPT.format(
        n=len(results),
        query=query,
        model_sections="\n\n".join(sections),
    )


def _synthesize(
    query: str,
    results: list[CouncilMemberResult],
    sources: list[SourceFocus],
    search_focus: SearchFocus,
) -> str:
    """Synthesize council results using Sonar (free — no Pro quota cost)."""
    synthesis_prompt = _build_synthesis_prompt(query, results)

    try:
        result = _query_single_model(
            "Sonar (synthesizer)",
            Models.SONAR,
            synthesis_prompt,
            sources,
            search_focus,
        )
        return result.answer
    except Exception as exc:
        logger.warning(f"Synthesis failed: {exc}")
        return "[Synthesis unavailable — individual model responses are shown below.]"


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def council_ask(
    query: str,
    models: list[tuple[str, Model]] | None = None,
    source_focus: str = "web",
    synthesize: bool = True,
) -> CouncilResponse:
    """Query multiple models in parallel and optionally synthesize results.

    Args:
        query: The question to ask all models.
        models: List of (display_name, Model) tuples. Defaults to
                COUNCIL_DEFAULT_MODELS (GPT-5.4, Claude Opus, Gemini Pro).
        source_focus: Source focus for all queries (none/web/academic/social/finance/all).
        synthesize: Whether to produce a synthesized consensus (adds 1 free Sonar query).

    Returns:
        CouncilResponse with individual results and optional synthesis.
    """
    from .shared import SOURCE_FOCUS_MAP, check_limits_before_query

    council = models or COUNCIL_DEFAULT_MODELS
    sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])
    search_mode = SearchFocus.WRITING if source_focus == "none" else SearchFocus.WEB

    # Pre-flight: check if we have enough Pro quota for N queries
    for model_name, model in council:
        limit_error = check_limits_before_query(model)
        if limit_error:
            return CouncilResponse(
                individual_results=[
                    CouncilMemberResult(
                        model_name="Council",
                        answer=limit_error,
                        error="rate_limit",
                    )
                ],
                synthesis="",
                query=query,
                model_names=[name for name, _ in council],
            )

    model_names = [name for name, _ in council]
    logger.info(f"Council: querying {len(council)} models in parallel: {model_names}")

    # Execute all queries in parallel
    results: list[CouncilMemberResult] = []
    with ThreadPoolExecutor(max_workers=len(council)) as executor:
        future_to_name = {
            executor.submit(
                _query_single_model, name, model, query, sources, search_mode,
            ): name
            for name, model in council
        }

        for future in as_completed(future_to_name):
            results.append(future.result())

    # Sort results to match the original model order
    name_order = {name: i for i, name in enumerate(model_names)}
    results.sort(key=lambda r: name_order.get(r.model_name, len(model_names)))

    # Synthesize if requested and we have successful results
    synthesis = ""
    successful = [r for r in results if r.error is None]
    if synthesize and len(successful) >= 2:
        synthesis = _synthesize(query, results, sources, search_mode)
    elif synthesize and len(successful) < 2:
        synthesis = "[Not enough successful responses to synthesize.]"

    from .rate_limits import RateLimitCache
    from .shared import get_limit_cache

    cache = get_limit_cache()
    if cache:
        cache.invalidate_rate_limits()

    return CouncilResponse(
        individual_results=results,
        synthesis=synthesis,
        query=query,
        model_names=model_names,
    )
