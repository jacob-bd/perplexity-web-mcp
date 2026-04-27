"""Smart quota-aware routing data structures.

Provides enums, dataclasses, and helpers for classifying quota levels
and representing routing decisions.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any

from .models import Model, Models
from .rate_limits import RateLimits


class QuotaLevel(str, Enum):
    HEALTHY = "healthy"
    LOW = "low"
    CRITICAL = "critical"
    EXHAUSTED = "exhausted"


class Intent(str, Enum):
    QUICK = "quick"
    STANDARD = "standard"
    DETAILED = "detailed"
    RESEARCH = "research"


def _classify(remaining: int, maximum: int) -> QuotaLevel:
    """Classify pro-style quota: 0=exhausted, <10%=critical, <20%=low, else healthy."""
    if remaining <= 0:
        return QuotaLevel.EXHAUSTED
    if maximum <= 0:
        return QuotaLevel.EXHAUSTED
    pct = remaining / maximum
    if pct < 0.10:
        return QuotaLevel.CRITICAL
    if pct < 0.20:
        return QuotaLevel.LOW
    return QuotaLevel.HEALTHY


def _classify_research(remaining: int, maximum: int) -> QuotaLevel:
    """Classify research quota: 0=exhausted, <20%=critical, <50%=low, else healthy."""
    if remaining <= 0:
        return QuotaLevel.EXHAUSTED
    if maximum <= 0:
        return QuotaLevel.EXHAUSTED
    pct = remaining / maximum
    if pct < 0.20:
        return QuotaLevel.CRITICAL
    if pct < 0.50:
        return QuotaLevel.LOW
    return QuotaLevel.HEALTHY


@dataclass(frozen=True, slots=True)
class QuotaState:
    """Snapshot of current quota levels across all resource types."""

    pro_remaining: int
    pro_level: QuotaLevel
    research_remaining: int
    research_level: QuotaLevel
    labs_remaining: int
    agent_remaining: int

    @classmethod
    def from_rate_limits(
        cls,
        limits: RateLimits,
        pro_max: int = 300,
        research_max: int = 10,
    ) -> QuotaState:
        return cls(
            pro_remaining=limits.remaining_pro,
            pro_level=_classify(limits.remaining_pro, pro_max),
            research_remaining=limits.remaining_research,
            research_level=_classify_research(limits.remaining_research, research_max),
            labs_remaining=limits.remaining_labs,
            agent_remaining=limits.remaining_agentic_research,
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "pro_remaining": self.pro_remaining,
            "pro_level": self.pro_level.value,
            "research_remaining": self.research_remaining,
            "research_level": self.research_level.value,
            "labs_remaining": self.labs_remaining,
            "agent_remaining": self.agent_remaining,
        }


@dataclass(frozen=True, slots=True)
class RoutingDecision:
    """Represents the outcome of the smart routing algorithm."""

    model: Model
    model_name: str
    search_type: str
    intent: Intent
    reason: str
    was_downgraded: bool
    quota_snapshot: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True, slots=True)
class SmartResponse:
    """A query response bundled with routing metadata."""

    answer: str
    citations: list[str]
    routing: RoutingDecision

    def format_metadata_block(self) -> str:
        r = self.routing
        qs = r.quota_snapshot
        lines = [
            f"Routing: {r.model_name} | {r.search_type} | {r.intent.value} intent",
            f"Reason: {r.reason}",
            (
                f"Quota: Pro {qs.get('pro_remaining', '?')}"
                f" | Research {qs.get('research_remaining', '?')}"
                f" | Labs {qs.get('labs_remaining', '?')}"
                f" | Agent {qs.get('agent_remaining', '?')}"
            ),
            f"Downgraded: {'Yes' if r.was_downgraded else 'No'}",
        ]
        return "\n".join(lines)

    def format_response(self) -> str:
        parts = [self.answer]
        if self.citations:
            parts.append("\n".join(self.citations))
        parts.append("---")
        parts.append(self.format_metadata_block())
        return "\n\n".join(parts)

    def to_dict(self) -> dict[str, Any]:
        return {
            "answer": self.answer,
            "citations": self.citations,
            "routing": {
                "model": self.routing.model.identifier,
                "model_name": self.routing.model_name,
                "search_type": self.routing.search_type,
                "intent": self.routing.intent.value,
                "reason": self.routing.reason,
                "was_downgraded": self.routing.was_downgraded,
                "quota_snapshot": self.routing.quota_snapshot,
            },
        }


class SmartRouter:
    """Quota-aware model router.

    Selects the best model for a given intent based on current rate limits,
    gracefully downgrading when quotas are low or exhausted.
    """

    __slots__ = ("_pro_max", "_research_max")

    def __init__(self, pro_max: int = 300, research_max: int = 10) -> None:
        self._pro_max = pro_max
        self._research_max = research_max

    def route(self, intent: Intent, limits: RateLimits | None = None) -> RoutingDecision:
        if limits is None:
            return self._route_optimistic(intent)

        quota = QuotaState.from_rate_limits(limits, self._pro_max, self._research_max)
        snapshot = quota.to_dict()

        if intent == Intent.QUICK:
            return self._quick(quota, snapshot)
        if intent == Intent.STANDARD:
            return self._standard(quota, snapshot)
        if intent == Intent.DETAILED:
            return self._detailed(quota, snapshot)
        return self._research(quota, snapshot)

    # ------------------------------------------------------------------
    # Optimistic routing (no quota data available)
    # ------------------------------------------------------------------

    def _route_optimistic(self, intent: Intent) -> RoutingDecision:
        ideal_map: dict[Intent, tuple[Model, str, str]] = {
            Intent.QUICK: (Models.SONAR, "sonar", "standard"),
            Intent.STANDARD: (Models.BEST, "auto", "pro"),
            Intent.DETAILED: (Models.CLAUDE_46_SONNET, "claude_sonnet", "pro"),
            Intent.RESEARCH: (Models.DEEP_RESEARCH, "deep_research", "deep_research"),
        }
        model, model_name, search_type = ideal_map[intent]
        return RoutingDecision(
            model=model,
            model_name=model_name,
            search_type=search_type,
            intent=intent,
            reason=f"{intent.value.capitalize()} query — using {model_name} (no quota data)",
            was_downgraded=False,
            quota_snapshot={},
        )

    # ------------------------------------------------------------------
    # Per-intent routing with quota awareness
    # ------------------------------------------------------------------

    def _quick(self, quota: QuotaState, snapshot: dict[str, Any]) -> RoutingDecision:
        return RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason=f"Quick lookup — using Sonar 2 (pro: {quota.pro_remaining}/{self._pro_max})",
            was_downgraded=False,
            quota_snapshot=snapshot,
        )

    def _standard(self, quota: QuotaState, snapshot: dict[str, Any]) -> RoutingDecision:
        if quota.pro_level != QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.BEST,
                model_name="auto",
                search_type="pro",
                intent=Intent.STANDARD,
                reason=(
                    f"Standard query — pro {quota.pro_level.value}"
                    f" ({quota.pro_remaining}/{self._pro_max})"
                ),
                was_downgraded=False,
                quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.STANDARD,
            reason=(
                f"Standard query — pro exhausted, downgraded to Sonar 2"
                f" ({quota.pro_remaining}/{self._pro_max})"
            ),
            was_downgraded=True,
            quota_snapshot=snapshot,
        )

    def _detailed(self, quota: QuotaState, snapshot: dict[str, Any]) -> RoutingDecision:
        if quota.pro_level in (QuotaLevel.HEALTHY, QuotaLevel.LOW):
            return RoutingDecision(
                model=Models.CLAUDE_46_SONNET,
                model_name="claude_sonnet",
                search_type="pro",
                intent=Intent.DETAILED,
                reason=(
                    f"Detailed query — pro {quota.pro_level.value}"
                    f" ({quota.pro_remaining}/{self._pro_max})"
                ),
                was_downgraded=False,
                quota_snapshot=snapshot,
            )
        if quota.pro_level == QuotaLevel.CRITICAL:
            return RoutingDecision(
                model=Models.BEST,
                model_name="auto",
                search_type="pro",
                intent=Intent.DETAILED,
                reason=(
                    f"Detailed query — pro critical, downgraded to auto"
                    f" ({quota.pro_remaining}/{self._pro_max})"
                ),
                was_downgraded=True,
                quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.DETAILED,
            reason=(
                f"Detailed query — pro exhausted, downgraded to Sonar 2"
                f" ({quota.pro_remaining}/{self._pro_max})"
            ),
            was_downgraded=True,
            quota_snapshot=snapshot,
        )

    def _research(self, quota: QuotaState, snapshot: dict[str, Any]) -> RoutingDecision:
        if quota.research_level != QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.DEEP_RESEARCH,
                model_name="deep_research",
                search_type="deep_research",
                intent=Intent.RESEARCH,
                reason=(
                    f"Research query — research {quota.research_level.value}"
                    f" ({quota.research_remaining}/{self._research_max})"
                ),
                was_downgraded=False,
                quota_snapshot=snapshot,
            )
        if quota.pro_level != QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.CLAUDE_46_SONNET,
                model_name="claude_sonnet",
                search_type="pro",
                intent=Intent.RESEARCH,
                reason=(
                    f"Research query — research exhausted, using premium model"
                    f" (pro: {quota.pro_remaining}/{self._pro_max})"
                ),
                was_downgraded=True,
                quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.RESEARCH,
            reason=(
                f"Research query — research and pro exhausted, downgraded to Sonar 2"
                f" ({quota.pro_remaining}/{self._pro_max})"
            ),
            was_downgraded=True,
            quota_snapshot=snapshot,
        )
