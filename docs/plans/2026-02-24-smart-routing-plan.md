# Smart Quota-Aware Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add intelligent quota-aware model and search-type routing so every query automatically uses the best option given current rate limits.

**Architecture:** New `router.py` module with `SmartRouter` class handles quota assessment and routing decisions. `shared.py` gets a `smart_ask()` function that wraps the router + existing `ask()`. MCP server and CLI integrate via `pplx_smart_query` tool and `--intent` flag respectively.

**Tech Stack:** Python 3.10+, dataclasses, existing `RateLimitCache` from `rate_limits.py`, pytest + unittest.mock for testing.

---

### Task 1: Router Data Structures

**Files:**
- Create: `src/perplexity_web_mcp/router.py`
- Test: `tests/test_router.py`

**Step 1: Write failing tests for data structures**

```python
"""Tests for the router module."""

from __future__ import annotations

import pytest

from perplexity_web_mcp.models import Models
from perplexity_web_mcp.router import (
    Intent,
    QuotaLevel,
    QuotaState,
    RoutingDecision,
    SmartResponse,
)


class TestQuotaState:
    """Test QuotaState data structure."""

    def test_from_rate_limits_healthy(self) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits

        limits = RateLimits(remaining_pro=200, remaining_research=8, remaining_labs=25, remaining_agentic_research=5)
        state = QuotaState.from_rate_limits(limits, pro_max=300, research_max=10)
        assert state.pro_remaining == 200
        assert state.pro_level == QuotaLevel.HEALTHY
        assert state.research_remaining == 8
        assert state.research_level == QuotaLevel.HEALTHY

    def test_from_rate_limits_low(self) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits

        limits = RateLimits(remaining_pro=45, remaining_research=3, remaining_labs=25, remaining_agentic_research=5)
        state = QuotaState.from_rate_limits(limits, pro_max=300, research_max=10)
        assert state.pro_level == QuotaLevel.LOW
        assert state.research_level == QuotaLevel.LOW

    def test_from_rate_limits_critical(self) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits

        limits = RateLimits(remaining_pro=15, remaining_research=1, remaining_labs=25, remaining_agentic_research=5)
        state = QuotaState.from_rate_limits(limits, pro_max=300, research_max=10)
        assert state.pro_level == QuotaLevel.CRITICAL
        assert state.research_level == QuotaLevel.CRITICAL

    def test_from_rate_limits_exhausted(self) -> None:
        from perplexity_web_mcp.rate_limits import RateLimits

        limits = RateLimits(remaining_pro=0, remaining_research=0, remaining_labs=0, remaining_agentic_research=0)
        state = QuotaState.from_rate_limits(limits, pro_max=300, research_max=10)
        assert state.pro_level == QuotaLevel.EXHAUSTED
        assert state.research_level == QuotaLevel.EXHAUSTED

    def test_to_dict(self) -> None:
        state = QuotaState(
            pro_remaining=100, pro_level=QuotaLevel.HEALTHY,
            research_remaining=5, research_level=QuotaLevel.HEALTHY,
            labs_remaining=25, agent_remaining=5,
        )
        d = state.to_dict()
        assert d["pro_remaining"] == 100
        assert d["research_remaining"] == 5


class TestRoutingDecision:
    """Test RoutingDecision data structure."""

    def test_basic_creation(self) -> None:
        decision = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="Simple question, using Sonar",
            was_downgraded=False,
            quota_snapshot={"pro_remaining": 100},
        )
        assert decision.model is Models.SONAR
        assert decision.was_downgraded is False

    def test_downgraded_decision(self) -> None:
        decision = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.DETAILED,
            reason="Pro quota critical — downgraded from premium to Sonar",
            was_downgraded=True,
            quota_snapshot={"pro_remaining": 5},
        )
        assert decision.was_downgraded is True
        assert decision.intent == Intent.DETAILED


class TestSmartResponse:
    """Test SmartResponse data structure."""

    def test_format_metadata_block(self) -> None:
        decision = RoutingDecision(
            model=Models.BEST,
            model_name="auto",
            search_type="pro",
            intent=Intent.STANDARD,
            reason="Quota healthy — used standard model",
            was_downgraded=False,
            quota_snapshot={"pro_remaining": 142, "research_remaining": 7, "labs_remaining": 48, "agent_remaining": 19},
        )
        resp = SmartResponse(answer="Test answer", citations=["https://a.com"], routing=decision)
        block = resp.format_metadata_block()
        assert "auto" in block
        assert "pro" in block
        assert "Downgraded: No" in block

    def test_format_full_response(self) -> None:
        decision = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="Quick lookup",
            was_downgraded=False,
            quota_snapshot={"pro_remaining": 100},
        )
        resp = SmartResponse(answer="42", citations=[], routing=decision)
        full = resp.format_response()
        assert "42" in full
        assert "---" in full
        assert "Routing:" in full

    def test_to_dict(self) -> None:
        decision = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="Quick lookup",
            was_downgraded=False,
            quota_snapshot={"pro_remaining": 100},
        )
        resp = SmartResponse(answer="42", citations=["https://a.com"], routing=decision)
        d = resp.to_dict()
        assert d["answer"] == "42"
        assert d["citations"] == ["https://a.com"]
        assert d["routing"]["model_name"] == "sonar"
        assert d["routing"]["was_downgraded"] is False
```

**Step 2: Run tests to verify they fail**

Run: `uv run --group tests pytest tests/test_router.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'perplexity_web_mcp.router'`

**Step 3: Implement data structures**

Create `src/perplexity_web_mcp/router.py`:

```python
"""Quota-aware smart routing for model and search-type selection.

Checks current rate limits and selects the optimal model/search configuration
based on quota state and query intent.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any

from .models import Model
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


@dataclass(frozen=True, slots=True)
class QuotaState:
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


def _classify(remaining: int, maximum: int) -> QuotaLevel:
    if remaining <= 0:
        return QuotaLevel.EXHAUSTED
    ratio = remaining / maximum if maximum > 0 else 0.0
    if ratio < 0.10:
        return QuotaLevel.CRITICAL
    if ratio < 0.20:
        return QuotaLevel.LOW
    return QuotaLevel.HEALTHY


def _classify_research(remaining: int, maximum: int) -> QuotaLevel:
    if remaining <= 0:
        return QuotaLevel.EXHAUSTED
    ratio = remaining / maximum if maximum > 0 else 0.0
    if ratio < 0.20:
        return QuotaLevel.CRITICAL
    if ratio < 0.50:
        return QuotaLevel.LOW
    return QuotaLevel.HEALTHY


@dataclass(frozen=True, slots=True)
class RoutingDecision:
    model: Model
    model_name: str
    search_type: str
    intent: Intent
    reason: str
    was_downgraded: bool
    quota_snapshot: dict[str, Any]


@dataclass(frozen=True, slots=True)
class SmartResponse:
    answer: str
    citations: list[str]
    routing: RoutingDecision

    def format_metadata_block(self) -> str:
        r = self.routing
        snap = r.quota_snapshot
        lines = [
            f"Routing: {r.model_name} | {r.search_type} | {r.intent.value} intent",
            f"Reason: {r.reason}",
            f"Quota: Pro {snap.get('pro_remaining', '?')} | Research {snap.get('research_remaining', '?')} | Labs {snap.get('labs_remaining', '?')} | Agent {snap.get('agent_remaining', '?')}",
            f"Downgraded: {'Yes' if r.was_downgraded else 'No'}",
        ]
        return "\n".join(lines)

    def format_response(self) -> str:
        parts = [self.answer]
        if self.citations:
            parts.append("\n\nCitations:")
            for i, url in enumerate(self.citations, 1):
                parts.append(f"\n[{i}]: {url}")
        parts.append("\n\n---\n")
        parts.append(self.format_metadata_block())
        return "".join(parts)

    def to_dict(self) -> dict[str, Any]:
        r = self.routing
        return {
            "answer": self.answer,
            "citations": self.citations,
            "routing": {
                "model_used": r.model.identifier,
                "model_name": r.model_name,
                "search_type": r.search_type,
                "intent": r.intent.value,
                "reason": r.reason,
                "was_downgraded": r.was_downgraded,
                "quota": r.quota_snapshot,
            },
        }
```

**Step 4: Run tests to verify they pass**

Run: `uv run --group tests pytest tests/test_router.py -v`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/perplexity_web_mcp/router.py tests/test_router.py
git commit -m "feat: add router data structures (QuotaState, RoutingDecision, SmartResponse)"
```

---

### Task 2: Routing Logic

**Files:**
- Modify: `src/perplexity_web_mcp/router.py`
- Modify: `tests/test_router.py`

**Step 1: Write failing tests for route()**

Append to `tests/test_router.py`:

```python
from unittest.mock import MagicMock, patch

from perplexity_web_mcp.rate_limits import RateLimits
from perplexity_web_mcp.router import Intent, QuotaLevel, SmartRouter


class TestSmartRouter:
    """Test the routing decision logic."""

    def _make_limits(self, pro: int = 200, research: int = 8) -> RateLimits:
        return RateLimits(remaining_pro=pro, remaining_research=research, remaining_labs=25, remaining_agentic_research=5)

    def test_quick_always_uses_sonar(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=200)
        decision = router.route(Intent.QUICK, limits)
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is False

    def test_quick_uses_sonar_even_when_exhausted(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=0)
        decision = router.route(Intent.QUICK, limits)
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is False

    def test_standard_uses_auto_when_healthy(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=200)
        decision = router.route(Intent.STANDARD, limits)
        assert decision.model_name == "auto"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False

    def test_standard_downgrades_to_sonar_when_exhausted(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=0)
        decision = router.route(Intent.STANDARD, limits)
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is True
        assert "exhausted" in decision.reason.lower()

    def test_detailed_uses_premium_when_healthy(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=200)
        decision = router.route(Intent.DETAILED, limits)
        assert decision.model_name in ("gpt52", "claude_sonnet")
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False

    def test_detailed_downgrades_to_auto_when_critical(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=15)
        decision = router.route(Intent.DETAILED, limits)
        assert decision.model_name == "auto"
        assert decision.was_downgraded is True
        assert "critical" in decision.reason.lower()

    def test_detailed_downgrades_to_sonar_when_exhausted(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=0)
        decision = router.route(Intent.DETAILED, limits)
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is True

    def test_research_uses_deep_research_when_healthy(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=200, research=8)
        decision = router.route(Intent.RESEARCH, limits)
        assert decision.model_name == "deep_research"
        assert decision.search_type == "deep_research"
        assert decision.was_downgraded is False

    def test_research_downgrades_to_pro_when_research_exhausted(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=200, research=0)
        decision = router.route(Intent.RESEARCH, limits)
        assert decision.model_name != "deep_research"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is True
        assert "research" in decision.reason.lower() and "exhausted" in decision.reason.lower()

    def test_research_fully_exhausted(self) -> None:
        router = SmartRouter()
        limits = self._make_limits(pro=0, research=0)
        decision = router.route(Intent.RESEARCH, limits)
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is True

    def test_route_without_limits_defaults_to_intent(self) -> None:
        """When limits are None (fetch failed), route optimistically."""
        router = SmartRouter()
        decision = router.route(Intent.STANDARD, limits=None)
        assert decision.model_name == "auto"
        assert decision.was_downgraded is False

    def test_route_research_without_limits(self) -> None:
        router = SmartRouter()
        decision = router.route(Intent.RESEARCH, limits=None)
        assert decision.model_name == "deep_research"
        assert decision.was_downgraded is False
```

**Step 2: Run tests to verify they fail**

Run: `uv run --group tests pytest tests/test_router.py::TestSmartRouter -v`
Expected: FAIL — `ImportError: cannot import name 'SmartRouter'`

**Step 3: Implement SmartRouter.route()**

Add to `src/perplexity_web_mcp/router.py`:

```python
from .models import Models


# Default premium model for "detailed" intent
_PREMIUM_MODEL_NAME = "claude_sonnet"
_PREMIUM_MODEL = Models.CLAUDE_46_SONNET


class SmartRouter:
    """Quota-aware router that picks optimal model/search type."""

    def __init__(self, pro_max: int = 300, research_max: int = 10) -> None:
        self._pro_max = pro_max
        self._research_max = research_max

    def route(self, intent: Intent, limits: RateLimits | None = None) -> RoutingDecision:
        if limits is None:
            return self._optimistic_route(intent)

        state = QuotaState.from_rate_limits(limits, self._pro_max, self._research_max)
        snapshot = state.to_dict()

        if intent == Intent.QUICK:
            return self._route_quick(snapshot)

        if intent == Intent.STANDARD:
            return self._route_standard(state, snapshot)

        if intent == Intent.DETAILED:
            return self._route_detailed(state, snapshot)

        if intent == Intent.RESEARCH:
            return self._route_research(state, snapshot)

        return self._route_standard(state, snapshot)

    def _optimistic_route(self, intent: Intent) -> RoutingDecision:
        """When limits are unavailable, route based on intent alone."""
        model_map = {
            Intent.QUICK: (Models.SONAR, "sonar", "standard"),
            Intent.STANDARD: (Models.BEST, "auto", "pro"),
            Intent.DETAILED: (_PREMIUM_MODEL, _PREMIUM_MODEL_NAME, "pro"),
            Intent.RESEARCH: (Models.DEEP_RESEARCH, "deep_research", "deep_research"),
        }
        model, name, search = model_map.get(intent, (Models.BEST, "auto", "pro"))
        return RoutingDecision(
            model=model, model_name=name, search_type=search, intent=intent,
            reason="Quota data unavailable — routing optimistically",
            was_downgraded=False, quota_snapshot={},
        )

    def _route_quick(self, snapshot: dict) -> RoutingDecision:
        return RoutingDecision(
            model=Models.SONAR, model_name="sonar", search_type="standard",
            intent=Intent.QUICK, reason="Quick lookup — using Sonar (no Pro quota consumed)",
            was_downgraded=False, quota_snapshot=snapshot,
        )

    def _route_standard(self, state: QuotaState, snapshot: dict) -> RoutingDecision:
        if state.pro_level == QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.SONAR, model_name="sonar", search_type="standard",
                intent=Intent.STANDARD, reason="Pro quota exhausted — downgraded to Sonar",
                was_downgraded=True, quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=Models.BEST, model_name="auto", search_type="pro",
            intent=Intent.STANDARD,
            reason=f"Quota {state.pro_level.value} ({state.pro_remaining} pro remaining) — using auto model",
            was_downgraded=False, quota_snapshot=snapshot,
        )

    def _route_detailed(self, state: QuotaState, snapshot: dict) -> RoutingDecision:
        if state.pro_level == QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.SONAR, model_name="sonar", search_type="standard",
                intent=Intent.DETAILED, reason="Pro quota exhausted — downgraded to Sonar",
                was_downgraded=True, quota_snapshot=snapshot,
            )
        if state.pro_level == QuotaLevel.CRITICAL:
            return RoutingDecision(
                model=Models.BEST, model_name="auto", search_type="pro",
                intent=Intent.DETAILED,
                reason=f"Pro quota critical ({state.pro_remaining} remaining) — downgraded from premium to auto",
                was_downgraded=True, quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=_PREMIUM_MODEL, model_name=_PREMIUM_MODEL_NAME, search_type="pro",
            intent=Intent.DETAILED,
            reason=f"Quota {state.pro_level.value} ({state.pro_remaining} pro remaining) — using premium model",
            was_downgraded=False, quota_snapshot=snapshot,
        )

    def _route_research(self, state: QuotaState, snapshot: dict) -> RoutingDecision:
        if state.research_level != QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.DEEP_RESEARCH, model_name="deep_research", search_type="deep_research",
                intent=Intent.RESEARCH,
                reason=f"Research quota {state.research_level.value} ({state.research_remaining} remaining)",
                was_downgraded=False, quota_snapshot=snapshot,
            )
        # Research exhausted — fall through to detailed/standard logic
        if state.pro_level == QuotaLevel.EXHAUSTED:
            return RoutingDecision(
                model=Models.SONAR, model_name="sonar", search_type="standard",
                intent=Intent.RESEARCH,
                reason="Research and Pro quota exhausted — downgraded to Sonar",
                was_downgraded=True, quota_snapshot=snapshot,
            )
        return RoutingDecision(
            model=_PREMIUM_MODEL, model_name=_PREMIUM_MODEL_NAME, search_type="pro",
            intent=Intent.RESEARCH,
            reason=f"Research quota exhausted — downgraded to premium Pro Search ({state.pro_remaining} pro remaining)",
            was_downgraded=True, quota_snapshot=snapshot,
        )
```

**Step 4: Run tests to verify they pass**

Run: `uv run --group tests pytest tests/test_router.py -v`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/perplexity_web_mcp/router.py tests/test_router.py
git commit -m "feat: implement SmartRouter routing logic"
```

---

### Task 3: smart_ask() in shared.py

**Files:**
- Modify: `src/perplexity_web_mcp/shared.py`
- Modify: `tests/test_shared.py`

**Step 1: Write failing tests for smart_ask**

Append to `tests/test_shared.py`:

```python
from perplexity_web_mcp.router import Intent, SmartResponse


class TestSmartAsk:
    """Test the smart_ask() function with mocked client and cache."""

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    @patch("perplexity_web_mcp.shared.get_client")
    def test_returns_smart_response(self, mock_client_fn, mock_cache_fn):
        from perplexity_web_mcp.shared import smart_ask

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=200, remaining_research=8, remaining_labs=25, remaining_agentic_research=5)
        mock_cache_fn.return_value = mock_cache

        mock_conv = MagicMock()
        mock_conv.answer = "Smart answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = smart_ask("test question")
        assert isinstance(result, SmartResponse)
        assert result.answer == "Smart answer"
        assert result.routing.was_downgraded is False

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    @patch("perplexity_web_mcp.shared.get_client")
    def test_quick_intent_uses_sonar(self, mock_client_fn, mock_cache_fn):
        from perplexity_web_mcp.shared import smart_ask

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=200, remaining_research=8, remaining_labs=25, remaining_agentic_research=5)
        mock_cache_fn.return_value = mock_cache

        mock_conv = MagicMock()
        mock_conv.answer = "Quick answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = smart_ask("what is 2+2", intent="quick")
        assert result.routing.model_name == "sonar"

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    @patch("perplexity_web_mcp.shared.get_client")
    def test_downgrades_when_exhausted(self, mock_client_fn, mock_cache_fn):
        from perplexity_web_mcp.shared import smart_ask

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=0, remaining_research=0, remaining_labs=0, remaining_agentic_research=0)
        mock_cache_fn.return_value = mock_cache

        mock_conv = MagicMock()
        mock_conv.answer = "Fallback answer"
        mock_conv.search_results = []
        mock_client = MagicMock()
        mock_client.create_conversation.return_value = mock_conv
        mock_client_fn.return_value = mock_client

        result = smart_ask("complex analysis", intent="detailed")
        assert result.routing.was_downgraded is True
        assert result.routing.model_name == "sonar"

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    @patch("perplexity_web_mcp.shared.get_client")
    def test_error_returns_smart_response_with_error(self, mock_client_fn, mock_cache_fn):
        from perplexity_web_mcp.shared import smart_ask

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = None
        mock_cache_fn.return_value = mock_cache

        mock_client = MagicMock()
        mock_client.create_conversation.side_effect = RuntimeError("Network failure")
        mock_client_fn.return_value = mock_client

        result = smart_ask("test")
        assert isinstance(result, SmartResponse)
        assert "Error" in result.answer
```

Add this import at top of test file:

```python
from perplexity_web_mcp.rate_limits import RateLimits
```

**Step 2: Run tests to verify they fail**

Run: `uv run --group tests pytest tests/test_shared.py::TestSmartAsk -v`
Expected: FAIL — `ImportError: cannot import name 'smart_ask'`

**Step 3: Implement smart_ask()**

Add to `src/perplexity_web_mcp/shared.py`:

```python
from .router import Intent, RoutingDecision, SmartResponse, SmartRouter

_router = SmartRouter()


def smart_ask(
    query: str,
    intent: str = "standard",
    source_focus: SourceFocusName = "web",
) -> SmartResponse:
    """Quota-aware query that auto-selects the best model and search type.

    Routes to the optimal model based on current rate limits and intent.
    Falls back gracefully when quotas are low or exhausted.
    """
    cache = get_limit_cache()
    limits = cache.get_rate_limits() if cache else None

    parsed_intent = Intent(intent) if intent in Intent.__members__.values() else Intent.STANDARD

    decision = _router.route(parsed_intent, limits)

    try:
        client = get_client()
        sources = SOURCE_FOCUS_MAP.get(source_focus, [SourceFocus.WEB])

        conversation = client.create_conversation(
            ConversationConfig(
                model=decision.model,
                citation_mode=CitationMode.DEFAULT,
                search_focus=SearchFocus.WEB,
                source_focus=sources,
            )
        )

        conversation.ask(query)

        if cache:
            cache.invalidate_rate_limits()

        answer = conversation.answer or "No answer received"
        citations = [r.url or "" for r in (conversation.search_results or [])]

        return SmartResponse(answer=answer, citations=citations, routing=decision)

    except Exception as error:
        error_msg = _format_error(error)
        return SmartResponse(answer=error_msg, citations=[], routing=decision)
```

**Step 4: Run tests to verify they pass**

Run: `uv run --group tests pytest tests/test_shared.py -v`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/perplexity_web_mcp/shared.py tests/test_shared.py
git commit -m "feat: add smart_ask() with quota-aware routing"
```

---

### Task 4: MCP Tool (pplx_smart_query)

**Files:**
- Modify: `src/perplexity_web_mcp/mcp/server.py`

**Step 1: Add the pplx_smart_query tool**

Add to `src/perplexity_web_mcp/mcp/server.py`, after the existing query tools:

```python
from perplexity_web_mcp.shared import smart_ask


@mcp.tool
def pplx_smart_query(
    query: str,
    intent: str = "standard",
    source_focus: SourceFocusName = "web",
) -> str:
    """Quota-aware query — automatically selects the best model based on current limits.

    RECOMMENDED default tool. Checks your remaining Pro Search and Deep Research
    quotas, then picks the optimal model and search type for your query.

    Intent guides the routing:
    - quick: Simple fact lookup (uses Sonar, no Pro quota consumed)
    - standard: Normal question (uses Pro Search with auto model)
    - detailed: Complex analysis (uses premium model like Claude/GPT)
    - research: Deep dive (uses Deep Research if quota available, else falls back to Pro)

    Response includes a metadata block showing the model used, routing reason,
    and current quota snapshot.

    Args:
        query: The question to ask
        intent: Query complexity hint — quick, standard, detailed, research
        source_focus: Source type — web, academic, social, finance, all
    """
    result = smart_ask(query, intent=intent, source_focus=source_focus)
    return result.format_response()
```

**Step 2: Update MCP instructions**

Update the `mcp = FastMCP(...)` instructions string to recommend `pplx_smart_query` as the default:

```python
mcp = FastMCP(
    "perplexity-web-mcp",
    instructions=(
        "Search the web with Perplexity AI using premium models.\n\n"
        "RECOMMENDED: Use pplx_smart_query as your default tool. It automatically "
        "checks your remaining quotas and selects the best model/search type. "
        "Pass intent='quick' for simple lookups, 'standard' for normal questions, "
        "'detailed' for complex analysis, or 'research' for deep research.\n\n"
        "For explicit model control, use pplx_query or model-specific tools "
        "(pplx_gpt52, pplx_claude_sonnet, etc.). These bypass quota-aware routing.\n\n"
        "All tools support source_focus: web, academic, social, finance, all.\n\n"
        "USAGE LIMITS: pplx_smart_query handles this automatically. "
        "Call pplx_usage to see raw quota numbers.\n\n"
        "AUTHENTICATION: If you get a 403 error or 'token expired' message:\n"
        "1. pplx_auth_status - Check current authentication status\n"
        "2. pplx_auth_request_code - Send verification code to email\n"
        "3. pplx_auth_complete - Complete auth with the 6-digit code"
    ),
)
```

**Step 3: Add import for smart_ask**

Add to the import block at top of `mcp/server.py`:

```python
from perplexity_web_mcp.shared import (
    MODEL_MAP,
    ModelName,
    SourceFocusName,
    ask,
    get_limit_cache,
    resolve_model,
    smart_ask,
)
```

**Step 4: Run existing tests to verify no regressions**

Run: `uv run --group tests pytest tests/ -v -k "not Integration"`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/perplexity_web_mcp/mcp/server.py
git commit -m "feat: add pplx_smart_query MCP tool with quota-aware routing"
```

---

### Task 5: CLI Integration

**Files:**
- Modify: `src/perplexity_web_mcp/cli/main.py`
- Modify: `tests/test_cli_main.py`

**Step 1: Update _cmd_ask to use smart routing when no explicit model**

In `src/perplexity_web_mcp/cli/main.py`, modify `_cmd_ask()`:

- Add `--intent` flag parsing (defaults to `"standard"`)
- When `model_name == "auto"` and no explicit `-m` was passed, call `smart_ask()` instead of `ask()`
- When `-m` is explicitly provided, keep using `ask()` as before
- Format `SmartResponse` appropriately for CLI output (text with metadata footer, or JSON with routing block)

Key changes (add `intent` variable, track whether `-m` was explicitly set):

```python
def _cmd_ask(args: list[str]) -> int:
    if not args or args[0].startswith("-"):
        print("Error: pwm ask requires a query string.\n", file=sys.stderr)
        print('Usage: pwm ask "your question" [--model MODEL] [--thinking] [--source SOURCE]', file=sys.stderr)
        return 1

    query = args[0]
    model_name = "auto"
    explicit_model = False
    thinking = False
    source: SourceFocusName = "web"
    intent = "standard"
    json_output = False
    no_citations = False

    i = 1
    while i < len(args):
        arg = args[i]
        if arg in ("-m", "--model") and i + 1 < len(args):
            model_name = args[i + 1]
            explicit_model = True
            i += 2
        elif arg in ("-t", "--thinking"):
            thinking = True
            i += 1
        elif arg in ("-s", "--source") and i + 1 < len(args):
            source = args[i + 1]
            i += 2
        elif arg == "--intent" and i + 1 < len(args):
            intent = args[i + 1]
            i += 2
        elif arg == "--json":
            json_output = True
            i += 1
        elif arg == "--no-citations":
            no_citations = True
            i += 1
        else:
            print(f"Unknown option: {arg}", file=sys.stderr)
            return 1

    if explicit_model:
        # Explicit model — bypass smart routing
        if model_name not in MODEL_MAP:
            print(f"Error: Unknown model '{model_name}'. Available: {', '.join(MODEL_NAMES)}", file=sys.stderr)
            return 1
        if source not in SOURCE_FOCUS_NAMES:
            print(f"Error: Unknown source '{source}'. Available: {', '.join(SOURCE_FOCUS_NAMES)}", file=sys.stderr)
            return 1
        model = resolve_model(model_name, thinking=thinking)
        result = ask(query, model, source)
        # ... existing output formatting (unchanged) ...
    else:
        # Smart routing
        from perplexity_web_mcp.shared import smart_ask
        response = smart_ask(query, intent=intent, source_focus=source)
        if json_output:
            import orjson
            sys.stdout.buffer.write(orjson.dumps(response.to_dict(), option=orjson.OPT_INDENT_2))
            sys.stdout.buffer.write(b"\n")
        elif no_citations:
            print(response.answer)
        else:
            print(response.format_response())

    return 0
```

**Step 2: Update help text**

Add `--intent` to the help output in `_print_help()`:

```
"  --intent INTENT       Routing intent: quick, standard, detailed, research [default: standard]\n"
```

**Step 3: Run tests**

Run: `uv run --group tests pytest tests/test_cli_main.py -v`
Expected: All PASS (existing tests should still work since they use `-m` explicitly)

**Step 4: Commit**

```bash
git add src/perplexity_web_mcp/cli/main.py
git commit -m "feat: CLI smart routing for pwm ask without -m, add --intent flag"
```

---

### Task 6: Update SKILL.md Files

**Files:**
- Modify: `src/perplexity_web_mcp/data/SKILL.md`
- Modify: `skills/perplexity-web-mcp/SKILL.md`

**Step 1: Update both SKILL.md files**

Add a new section after "Critical Rules" and update the workflow decision tree.

New section to add:

```markdown
## Smart Routing (Recommended)

The tool includes quota-aware routing. Instead of choosing a model manually,
use the smart query interface and let it pick the best option:

```
MCP:  pplx_smart_query(query, intent="standard")
CLI:  pwm ask "query"                    # auto routes via smart logic
CLI:  pwm ask "query" --intent quick     # explicit intent hint
```

### Intent Guide

| Intent | When to Use | What Happens |
|--------|-------------|--------------|
| quick | Simple facts, definitions, lookups | Sonar (no Pro quota used) |
| standard | Normal questions (default) | Pro Search with auto model |
| detailed | Complex analysis, comparisons | Premium model (Claude/GPT) |
| research | Deep dives, comprehensive reports | Deep Research (monthly quota) |

### Quota-Aware Behavior

- **Healthy quota**: Uses the ideal model for your intent
- **Critical quota (<10% pro remaining)**: Downgrades detailed→auto to conserve
- **Exhausted quota**: Falls back to Sonar for everything except research
- **Research exhausted**: Falls back to premium Pro Search
- Response metadata shows what model was used and why

### When to Use Explicit Models Instead

- You need a *specific* model's capabilities (e.g., Gemini for multimodal)
- You're comparing model outputs
- The smart router's choice isn't working for your use case
```

Update the workflow decision tree to show smart query first:

```
User wants to...
|
+-- Search the web / ask a question (RECOMMENDED: smart routing)
|   +-- CLI:  pwm ask "query"
|   +-- MCP:  pplx_smart_query(query)
|   +-- For explicit model: pwm ask "query" -m gpt52  or  pplx_query(query, model="gpt52")
```

**Step 2: Bump version in metadata**

Update version from `"0.6.0"` to `"0.7.0"` in both SKILL.md front matter.

**Step 3: Commit**

```bash
git add src/perplexity_web_mcp/data/SKILL.md skills/perplexity-web-mcp/SKILL.md
git commit -m "docs: update SKILL.md with smart routing guidance"
```

---

### Task 7: Update __init__.py Exports

**Files:**
- Modify: `src/perplexity_web_mcp/__init__.py`

**Step 1: Add router exports**

Check current `__init__.py` and add public exports for `SmartRouter`, `SmartResponse`, `Intent`, `smart_ask`.

**Step 2: Run full test suite**

Run: `uv run --group tests pytest tests/ -v -k "not Integration"`
Expected: All PASS

**Step 3: Commit**

```bash
git add src/perplexity_web_mcp/__init__.py
git commit -m "feat: export router types from package"
```

---

### Task 8: Final Verification

**Step 1: Run full test suite**

Run: `uv run --group tests pytest tests/ -v -k "not Integration"`
Expected: All PASS, no regressions

**Step 2: Run integration test (if token available)**

Run: `uv run --group tests pytest tests/ -v -k "Integration" --no-header`
Expected: Integration tests PASS

**Step 3: Quick manual smoke test**

```bash
pwm ask "What is 2+2" --intent quick
pwm ask "Compare React and Vue frameworks"
pwm ask "Explain transformer architecture in detail" --intent detailed
pwm usage
```

Expected: Each shows answer + metadata footer with routing info.

**Step 4: Final commit (version bump)**

Bump version in `pyproject.toml` to 0.7.0 and commit:

```bash
git add pyproject.toml
git commit -m "chore: bump version to 0.7.0 for smart routing"
```
