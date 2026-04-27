"""Tests for the router data structures (QuotaState, RoutingDecision, SmartResponse).

Test categories:
1. _classify / _classify_research helper functions at all thresholds
2. QuotaState.from_rate_limits at boundary values
3. QuotaState.to_dict
4. RoutingDecision creation
5. SmartResponse.format_metadata_block, format_response, to_dict
"""

from __future__ import annotations

import pytest

from perplexity_web_mcp.models import Models
from perplexity_web_mcp.rate_limits import RateLimits
from perplexity_web_mcp.router import (
    Intent,
    QuotaLevel,
    QuotaState,
    RoutingDecision,
    SmartResponse,
    SmartRouter,
    _classify,
    _classify_research,
)


# ============================================================================
# Fixtures
# ============================================================================

@pytest.fixture
def sample_quota_snapshot() -> dict:
    return {
        "pro_remaining": 142,
        "pro_level": "healthy",
        "research_remaining": 7,
        "research_level": "healthy",
        "labs_remaining": 48,
        "agent_remaining": 19,
    }


@pytest.fixture
def sample_routing(sample_quota_snapshot: dict) -> RoutingDecision:
    return RoutingDecision(
        model=Models.SONAR,
        model_name="sonar",
        search_type="standard",
        intent=Intent.QUICK,
        reason="Quick lookup — using Sonar 2",
        was_downgraded=False,
        quota_snapshot=sample_quota_snapshot,
    )


@pytest.fixture
def sample_response(sample_routing: RoutingDecision) -> SmartResponse:
    return SmartResponse(
        answer="Quantum computing uses qubits.",
        citations=["[1] https://example.com/quantum"],
        routing=sample_routing,
    )


# ============================================================================
# 1. Enum Basics
# ============================================================================

class TestEnums:
    def test_quota_level_values(self) -> None:
        assert QuotaLevel.HEALTHY == "healthy"
        assert QuotaLevel.LOW == "low"
        assert QuotaLevel.CRITICAL == "critical"
        assert QuotaLevel.EXHAUSTED == "exhausted"

    def test_quota_level_is_str(self) -> None:
        assert isinstance(QuotaLevel.HEALTHY, str)

    def test_intent_values(self) -> None:
        assert Intent.QUICK == "quick"
        assert Intent.STANDARD == "standard"
        assert Intent.DETAILED == "detailed"
        assert Intent.RESEARCH == "research"

    def test_intent_is_str(self) -> None:
        assert isinstance(Intent.QUICK, str)


# ============================================================================
# 2. _classify (pro thresholds: 0=exhausted, <10%=critical, <20%=low, else healthy)
# ============================================================================

class TestClassifyPro:
    """Pro thresholds with max=300: 10% = 30, 20% = 60."""

    def test_zero_is_exhausted(self) -> None:
        assert _classify(0, 300) == QuotaLevel.EXHAUSTED

    def test_negative_is_exhausted(self) -> None:
        assert _classify(-5, 300) == QuotaLevel.EXHAUSTED

    def test_just_below_10pct_is_critical(self) -> None:
        assert _classify(29, 300) == QuotaLevel.CRITICAL

    def test_one_remaining_is_critical(self) -> None:
        assert _classify(1, 300) == QuotaLevel.CRITICAL

    def test_exactly_10pct_is_low(self) -> None:
        assert _classify(30, 300) == QuotaLevel.LOW

    def test_just_below_20pct_is_low(self) -> None:
        assert _classify(59, 300) == QuotaLevel.LOW

    def test_exactly_20pct_is_healthy(self) -> None:
        assert _classify(60, 300) == QuotaLevel.HEALTHY

    def test_full_quota_is_healthy(self) -> None:
        assert _classify(300, 300) == QuotaLevel.HEALTHY

    def test_above_max_is_healthy(self) -> None:
        assert _classify(500, 300) == QuotaLevel.HEALTHY

    def test_zero_maximum_is_exhausted(self) -> None:
        assert _classify(5, 0) == QuotaLevel.EXHAUSTED

    def test_both_zero_is_exhausted(self) -> None:
        assert _classify(0, 0) == QuotaLevel.EXHAUSTED


# ============================================================================
# 3. _classify_research (thresholds: 0=exhausted, <20%=critical, <50%=low, else healthy)
# ============================================================================

class TestClassifyResearch:
    """Research thresholds with max=10: 20% = 2, 50% = 5."""

    def test_zero_is_exhausted(self) -> None:
        assert _classify_research(0, 10) == QuotaLevel.EXHAUSTED

    def test_negative_is_exhausted(self) -> None:
        assert _classify_research(-1, 10) == QuotaLevel.EXHAUSTED

    def test_just_below_20pct_is_critical(self) -> None:
        assert _classify_research(1, 10) == QuotaLevel.CRITICAL

    def test_exactly_20pct_is_low(self) -> None:
        assert _classify_research(2, 10) == QuotaLevel.LOW

    def test_just_below_50pct_is_low(self) -> None:
        assert _classify_research(4, 10) == QuotaLevel.LOW

    def test_exactly_50pct_is_healthy(self) -> None:
        assert _classify_research(5, 10) == QuotaLevel.HEALTHY

    def test_full_quota_is_healthy(self) -> None:
        assert _classify_research(10, 10) == QuotaLevel.HEALTHY

    def test_above_max_is_healthy(self) -> None:
        assert _classify_research(15, 10) == QuotaLevel.HEALTHY

    def test_zero_maximum_is_exhausted(self) -> None:
        assert _classify_research(3, 0) == QuotaLevel.EXHAUSTED


# ============================================================================
# 4. QuotaState.from_rate_limits
# ============================================================================

class TestQuotaStateFromRateLimits:
    def test_healthy_across_board(self) -> None:
        limits = RateLimits(
            remaining_pro=200,
            remaining_research=8,
            remaining_labs=48,
            remaining_agentic_research=19,
        )
        qs = QuotaState.from_rate_limits(limits)
        assert qs.pro_remaining == 200
        assert qs.pro_level == QuotaLevel.HEALTHY
        assert qs.research_remaining == 8
        assert qs.research_level == QuotaLevel.HEALTHY
        assert qs.labs_remaining == 48
        assert qs.agent_remaining == 19

    def test_all_exhausted(self) -> None:
        limits = RateLimits(
            remaining_pro=0,
            remaining_research=0,
            remaining_labs=0,
            remaining_agentic_research=0,
        )
        qs = QuotaState.from_rate_limits(limits)
        assert qs.pro_level == QuotaLevel.EXHAUSTED
        assert qs.research_level == QuotaLevel.EXHAUSTED

    def test_pro_critical_research_healthy(self) -> None:
        limits = RateLimits(remaining_pro=15, remaining_research=7)
        qs = QuotaState.from_rate_limits(limits)
        assert qs.pro_level == QuotaLevel.CRITICAL
        assert qs.research_level == QuotaLevel.HEALTHY

    def test_pro_low_research_low(self) -> None:
        limits = RateLimits(remaining_pro=45, remaining_research=3)
        qs = QuotaState.from_rate_limits(limits)
        assert qs.pro_level == QuotaLevel.LOW
        assert qs.research_level == QuotaLevel.LOW

    def test_custom_maximums(self) -> None:
        limits = RateLimits(remaining_pro=50, remaining_research=10)
        qs = QuotaState.from_rate_limits(limits, pro_max=500, research_max=20)
        assert qs.pro_level == QuotaLevel.LOW  # 50/500 = 10%, exactly 10% -> low
        assert qs.research_level == QuotaLevel.HEALTHY  # 10/20 = 50%, exactly 50% -> healthy

    def test_boundary_pro_at_10pct(self) -> None:
        limits = RateLimits(remaining_pro=30, remaining_research=10)
        qs = QuotaState.from_rate_limits(limits, pro_max=300)
        assert qs.pro_level == QuotaLevel.LOW  # 30/300 = 10% exactly

    def test_boundary_pro_at_20pct(self) -> None:
        limits = RateLimits(remaining_pro=60, remaining_research=10)
        qs = QuotaState.from_rate_limits(limits, pro_max=300)
        assert qs.pro_level == QuotaLevel.HEALTHY  # 60/300 = 20% exactly

    def test_boundary_research_at_20pct(self) -> None:
        limits = RateLimits(remaining_pro=300, remaining_research=2)
        qs = QuotaState.from_rate_limits(limits, research_max=10)
        assert qs.research_level == QuotaLevel.LOW  # 2/10 = 20% exactly

    def test_boundary_research_at_50pct(self) -> None:
        limits = RateLimits(remaining_pro=300, remaining_research=5)
        qs = QuotaState.from_rate_limits(limits, research_max=10)
        assert qs.research_level == QuotaLevel.HEALTHY  # 5/10 = 50% exactly

    def test_frozen(self) -> None:
        limits = RateLimits(remaining_pro=100, remaining_research=5)
        qs = QuotaState.from_rate_limits(limits)
        with pytest.raises(AttributeError):
            qs.pro_remaining = 0  # type: ignore[misc]


# ============================================================================
# 5. QuotaState.to_dict
# ============================================================================

class TestQuotaStateToDict:
    def test_to_dict_keys(self) -> None:
        limits = RateLimits(
            remaining_pro=142,
            remaining_research=7,
            remaining_labs=48,
            remaining_agentic_research=19,
        )
        qs = QuotaState.from_rate_limits(limits)
        d = qs.to_dict()
        assert d == {
            "pro_remaining": 142,
            "pro_level": "healthy",
            "research_remaining": 7,
            "research_level": "healthy",
            "labs_remaining": 48,
            "agent_remaining": 19,
        }

    def test_to_dict_exhausted_levels_are_strings(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=0)
        qs = QuotaState.from_rate_limits(limits)
        d = qs.to_dict()
        assert d["pro_level"] == "exhausted"
        assert d["research_level"] == "exhausted"
        assert isinstance(d["pro_level"], str)


# ============================================================================
# 6. RoutingDecision
# ============================================================================

class TestRoutingDecision:
    def test_creation(self, sample_routing: RoutingDecision) -> None:
        assert sample_routing.model == Models.SONAR
        assert sample_routing.model_name == "sonar"
        assert sample_routing.search_type == "standard"
        assert sample_routing.intent == Intent.QUICK
        assert sample_routing.reason == "Quick lookup — using Sonar 2"
        assert sample_routing.was_downgraded is False
        assert sample_routing.quota_snapshot["pro_remaining"] == 142

    def test_default_quota_snapshot(self) -> None:
        rd = RoutingDecision(
            model=Models.BEST,
            model_name="best",
            search_type="pro",
            intent=Intent.STANDARD,
            reason="Standard query",
            was_downgraded=False,
        )
        assert rd.quota_snapshot == {}

    def test_frozen(self, sample_routing: RoutingDecision) -> None:
        with pytest.raises(AttributeError):
            sample_routing.model_name = "changed"  # type: ignore[misc]

    def test_with_downgrade(self) -> None:
        rd = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.DETAILED,
            reason="Downgraded from GPT-5.2 — pro quota critical",
            was_downgraded=True,
            quota_snapshot={"pro_remaining": 5},
        )
        assert rd.was_downgraded is True
        assert rd.intent == Intent.DETAILED


# ============================================================================
# 7. SmartResponse.format_metadata_block
# ============================================================================

class TestSmartResponseMetadata:
    def test_format_metadata_block(self, sample_response: SmartResponse) -> None:
        block = sample_response.format_metadata_block()
        assert "Routing: sonar | standard | quick intent" in block
        assert "Reason: Quick lookup — using Sonar 2" in block
        assert "Quota: Pro 142 | Research 7 | Labs 48 | Agent 19" in block
        assert "Downgraded: No" in block

    def test_format_metadata_downgraded(self, sample_quota_snapshot: dict) -> None:
        routing = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.STANDARD,
            reason="Downgraded",
            was_downgraded=True,
            quota_snapshot=sample_quota_snapshot,
        )
        resp = SmartResponse(answer="test", citations=[], routing=routing)
        block = resp.format_metadata_block()
        assert "Downgraded: Yes" in block

    def test_format_metadata_missing_snapshot_keys(self) -> None:
        routing = RoutingDecision(
            model=Models.BEST,
            model_name="best",
            search_type="pro",
            intent=Intent.STANDARD,
            reason="test",
            was_downgraded=False,
        )
        resp = SmartResponse(answer="test", citations=[], routing=routing)
        block = resp.format_metadata_block()
        assert "Pro ?" in block
        assert "Research ?" in block

    def test_format_metadata_lines_count(self, sample_response: SmartResponse) -> None:
        block = sample_response.format_metadata_block()
        lines = block.strip().split("\n")
        assert len(lines) == 4


# ============================================================================
# 8. SmartResponse.format_response
# ============================================================================

class TestSmartResponseFormat:
    def test_format_response_with_citations(self, sample_response: SmartResponse) -> None:
        output = sample_response.format_response()
        assert output.startswith("Quantum computing uses qubits.")
        assert "[1] https://example.com/quantum" in output
        assert "\n\n---\n\n" in output
        assert "Routing: sonar" in output

    def test_format_response_no_citations(self, sample_quota_snapshot: dict) -> None:
        routing = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="Quick lookup",
            was_downgraded=False,
            quota_snapshot=sample_quota_snapshot,
        )
        resp = SmartResponse(answer="Hello world.", citations=[], routing=routing)
        output = resp.format_response()
        parts = output.split("\n\n")
        assert parts[0] == "Hello world."
        assert parts[1] == "---"

    def test_format_response_multiple_citations(self, sample_quota_snapshot: dict) -> None:
        routing = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="test",
            was_downgraded=False,
            quota_snapshot=sample_quota_snapshot,
        )
        resp = SmartResponse(
            answer="Answer here.",
            citations=["[1] source1", "[2] source2", "[3] source3"],
            routing=routing,
        )
        output = resp.format_response()
        assert "[1] source1\n[2] source2\n[3] source3" in output

    def test_format_response_sections_order(self, sample_response: SmartResponse) -> None:
        output = sample_response.format_response()
        answer_idx = output.index("Quantum computing")
        citation_idx = output.index("[1]")
        separator_idx = output.index("---")
        routing_idx = output.index("Routing:")
        assert answer_idx < citation_idx < separator_idx < routing_idx


# ============================================================================
# 9. SmartResponse.to_dict
# ============================================================================

class TestSmartResponseToDict:
    def test_to_dict_structure(self, sample_response: SmartResponse) -> None:
        d = sample_response.to_dict()
        assert d["answer"] == "Quantum computing uses qubits."
        assert d["citations"] == ["[1] https://example.com/quantum"]
        assert "routing" in d

    def test_to_dict_routing_fields(self, sample_response: SmartResponse) -> None:
        d = sample_response.to_dict()
        r = d["routing"]
        assert r["model"] == "experimental"  # Models.SONAR identifier
        assert r["model_name"] == "sonar"
        assert r["search_type"] == "standard"
        assert r["intent"] == "quick"
        assert r["reason"] == "Quick lookup — using Sonar 2"
        assert r["was_downgraded"] is False
        assert r["quota_snapshot"]["pro_remaining"] == 142

    def test_to_dict_is_json_serializable(self, sample_response: SmartResponse) -> None:
        import json

        d = sample_response.to_dict()
        serialized = json.dumps(d)
        assert isinstance(serialized, str)
        roundtripped = json.loads(serialized)
        assert roundtripped == d

    def test_to_dict_empty_citations(self, sample_quota_snapshot: dict) -> None:
        routing = RoutingDecision(
            model=Models.SONAR,
            model_name="sonar",
            search_type="standard",
            intent=Intent.QUICK,
            reason="test",
            was_downgraded=False,
            quota_snapshot=sample_quota_snapshot,
        )
        resp = SmartResponse(answer="Test.", citations=[], routing=routing)
        d = resp.to_dict()
        assert d["citations"] == []


# ============================================================================
# 10. SmartRouter — QUICK intent
# ============================================================================

class TestSmartRouterQuick:
    """QUICK always routes to Sonar, regardless of quota state."""

    def setup_method(self) -> None:
        self.router = SmartRouter()

    def test_quick_healthy_quota(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=8)
        decision = self.router.route(Intent.QUICK, limits)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.search_type == "standard"
        assert decision.intent == Intent.QUICK
        assert decision.was_downgraded is False

    def test_quick_exhausted_pro(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=0)
        decision = self.router.route(Intent.QUICK, limits)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.was_downgraded is False

    def test_quick_critical_pro(self) -> None:
        limits = RateLimits(remaining_pro=5, remaining_research=1)
        decision = self.router.route(Intent.QUICK, limits)
        assert decision.model == Models.SONAR
        assert decision.was_downgraded is False

    def test_quick_has_reason(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=8)
        decision = self.router.route(Intent.QUICK, limits)
        assert "Sonar" in decision.reason
        assert "200" in decision.reason

    def test_quick_has_quota_snapshot(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=8)
        decision = self.router.route(Intent.QUICK, limits)
        assert decision.quota_snapshot["pro_remaining"] == 200
        assert decision.quota_snapshot["research_remaining"] == 8


# ============================================================================
# 11. SmartRouter — STANDARD intent
# ============================================================================

class TestSmartRouterStandard:
    """STANDARD routes to auto (BEST) when pro available, Sonar when exhausted."""

    def setup_method(self) -> None:
        self.router = SmartRouter()

    def test_standard_healthy(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=8)
        decision = self.router.route(Intent.STANDARD, limits)
        assert decision.model == Models.BEST
        assert decision.model_name == "auto"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False

    def test_standard_low(self) -> None:
        limits = RateLimits(remaining_pro=45, remaining_research=8)
        decision = self.router.route(Intent.STANDARD, limits)
        assert decision.model == Models.BEST
        assert decision.model_name == "auto"
        assert decision.was_downgraded is False

    def test_standard_critical_still_uses_best(self) -> None:
        limits = RateLimits(remaining_pro=15, remaining_research=8)
        decision = self.router.route(Intent.STANDARD, limits)
        assert decision.model == Models.BEST
        assert decision.model_name == "auto"
        assert decision.was_downgraded is False

    def test_standard_exhausted_downgrades_to_sonar(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=8)
        decision = self.router.route(Intent.STANDARD, limits)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.search_type == "standard"
        assert decision.was_downgraded is True

    def test_standard_exhausted_reason(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=8)
        decision = self.router.route(Intent.STANDARD, limits)
        assert "exhausted" in decision.reason
        assert "Sonar" in decision.reason


# ============================================================================
# 12. SmartRouter — DETAILED intent
# ============================================================================

class TestSmartRouterDetailed:
    """DETAILED: premium when healthy/low, auto when critical, Sonar when exhausted."""

    def setup_method(self) -> None:
        self.router = SmartRouter()

    def test_detailed_healthy_uses_premium(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.model_name == "claude_sonnet"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False

    def test_detailed_low_uses_premium(self) -> None:
        limits = RateLimits(remaining_pro=45, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.model_name == "claude_sonnet"
        assert decision.was_downgraded is False

    def test_detailed_critical_downgrades_to_auto(self) -> None:
        limits = RateLimits(remaining_pro=15, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert decision.model == Models.BEST
        assert decision.model_name == "auto"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is True

    def test_detailed_exhausted_downgrades_to_sonar(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.search_type == "standard"
        assert decision.was_downgraded is True

    def test_detailed_critical_reason(self) -> None:
        limits = RateLimits(remaining_pro=15, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert "critical" in decision.reason
        assert "auto" in decision.reason

    def test_detailed_exhausted_reason(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=8)
        decision = self.router.route(Intent.DETAILED, limits)
        assert "exhausted" in decision.reason
        assert "Sonar" in decision.reason


# ============================================================================
# 13. SmartRouter — RESEARCH intent
# ============================================================================

class TestSmartRouterResearch:
    """RESEARCH: deep_research when available, premium when research exhausted, Sonar when all exhausted."""

    def setup_method(self) -> None:
        self.router = SmartRouter()

    def test_research_available(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=5)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.DEEP_RESEARCH
        assert decision.model_name == "deep_research"
        assert decision.search_type == "deep_research"
        assert decision.was_downgraded is False

    def test_research_low_still_uses_deep_research(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=3)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.DEEP_RESEARCH
        assert decision.was_downgraded is False

    def test_research_critical_still_uses_deep_research(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=1)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.DEEP_RESEARCH
        assert decision.was_downgraded is False

    def test_research_exhausted_pro_available_uses_premium(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=0)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.model_name == "claude_sonnet"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is True

    def test_research_exhausted_pro_critical_uses_premium(self) -> None:
        limits = RateLimits(remaining_pro=15, remaining_research=0)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.model_name == "claude_sonnet"
        assert decision.was_downgraded is True

    def test_research_and_pro_exhausted_uses_sonar(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=0)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.search_type == "standard"
        assert decision.was_downgraded is True

    def test_research_available_reason(self) -> None:
        limits = RateLimits(remaining_pro=200, remaining_research=5)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert "research" in decision.reason.lower()
        assert "5" in decision.reason

    def test_research_all_exhausted_reason(self) -> None:
        limits = RateLimits(remaining_pro=0, remaining_research=0)
        decision = self.router.route(Intent.RESEARCH, limits)
        assert "exhausted" in decision.reason
        assert "Sonar" in decision.reason


# ============================================================================
# 14. SmartRouter — limits=None (optimistic routing)
# ============================================================================

class TestSmartRouterOptimistic:
    """When limits=None (fetch failed), route optimistically with ideal models."""

    def setup_method(self) -> None:
        self.router = SmartRouter()

    def test_optimistic_quick(self) -> None:
        decision = self.router.route(Intent.QUICK, limits=None)
        assert decision.model == Models.SONAR
        assert decision.model_name == "sonar"
        assert decision.search_type == "standard"
        assert decision.was_downgraded is False
        assert decision.quota_snapshot == {}

    def test_optimistic_standard(self) -> None:
        decision = self.router.route(Intent.STANDARD, limits=None)
        assert decision.model == Models.BEST
        assert decision.model_name == "auto"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False
        assert decision.quota_snapshot == {}

    def test_optimistic_detailed(self) -> None:
        decision = self.router.route(Intent.DETAILED, limits=None)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.model_name == "claude_sonnet"
        assert decision.search_type == "pro"
        assert decision.was_downgraded is False
        assert decision.quota_snapshot == {}

    def test_optimistic_research(self) -> None:
        decision = self.router.route(Intent.RESEARCH, limits=None)
        assert decision.model == Models.DEEP_RESEARCH
        assert decision.model_name == "deep_research"
        assert decision.search_type == "deep_research"
        assert decision.was_downgraded is False
        assert decision.quota_snapshot == {}

    def test_optimistic_reason_mentions_no_quota(self) -> None:
        for intent in Intent:
            decision = self.router.route(intent, limits=None)
            assert "no quota data" in decision.reason

    def test_optimistic_never_downgraded(self) -> None:
        for intent in Intent:
            decision = self.router.route(intent, limits=None)
            assert decision.was_downgraded is False


# ============================================================================
# 15. SmartRouter — custom maximums
# ============================================================================

class TestSmartRouterCustomMax:
    """Verify custom pro_max/research_max affect classification thresholds."""

    def test_custom_pro_max_changes_threshold(self) -> None:
        router = SmartRouter(pro_max=100)
        limits = RateLimits(remaining_pro=15, remaining_research=8)
        decision = router.route(Intent.DETAILED, limits)
        assert decision.model == Models.CLAUDE_46_SONNET
        assert decision.was_downgraded is False

    def test_custom_research_max(self) -> None:
        router = SmartRouter(research_max=5)
        limits = RateLimits(remaining_pro=200, remaining_research=2)
        decision = router.route(Intent.RESEARCH, limits)
        assert decision.model == Models.DEEP_RESEARCH
        assert decision.was_downgraded is False
