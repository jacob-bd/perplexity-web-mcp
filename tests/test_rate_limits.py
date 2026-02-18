"""Comprehensive tests for the rate_limits module and MCP server integration.

Test categories:
1. Data model parsing (RateLimits, UserSettings, SourceLimit, ConnectorLimits)
2. Edge cases (missing fields, empty data, nulls, unexpected types)
3. Properties and formatting
4. RateLimitCache (TTL, invalidation, token changes, thread safety)
5. MCP server helpers (_check_limits_before_query, _is_research_model)
6. Integration tests (live API calls - require valid token, skipped if unavailable)
"""

from __future__ import annotations

import threading
import time
from unittest.mock import MagicMock, patch

import pytest

from perplexity_web_mcp.rate_limits import (
    ConnectorLimits,
    RateLimitCache,
    RateLimits,
    SourceLimit,
    UserSettings,
    fetch_rate_limits,
    fetch_user_settings,
)
from perplexity_web_mcp.token_store import load_token


# ============================================================================
# Fixtures: realistic API response payloads
# ============================================================================

@pytest.fixture
def rate_limit_api_response() -> dict:
    """Realistic /rest/rate-limit/all response (based on live capture)."""
    return {
        "model_specific_limits": {},
        "remaining_agentic_research": 0,
        "remaining_labs": 25,
        "remaining_pro": 600,
        "remaining_research": 10,
        "sources": {
            "source_to_limit": {
                "web": {"monthly_limit": None, "remaining": None},
                "scholar": {"monthly_limit": None, "remaining": None},
                "social": {"monthly_limit": None, "remaining": None},
                "google_drive": {"monthly_limit": None, "remaining": None},
                "cbinsights_mcp_cashmere": {"monthly_limit": 5, "remaining": 5},
                "pitchbook_mcp_cashmere": {"monthly_limit": 5, "remaining": 3},
                "statista_mcp_cashmere": {"monthly_limit": 5, "remaining": 0},
                "box": {"monthly_limit": 0, "remaining": 0},
            }
        },
    }


@pytest.fixture
def user_settings_api_response() -> dict:
    """Realistic /rest/user/settings response (based on live capture, sensitive fields redacted)."""
    return {
        "pages_limit": 100,
        "upload_limit": 50,
        "create_limit": 99,
        "article_image_upload_limit": 500,
        "max_files_per_user": 500,
        "max_files_per_repository": 50,
        "connector_limits": {
            "repo_type_limits": {
                "COLLECTION": {"max_files": 50, "max_folders": 50},
                "HEALTH": {"max_files": 200, "max_folders": 200},
            },
            "global_file_count": 500,
            "max_file_size_mb": 50,
            "max_attachment_file_size_mb": 50,
            "daily_attachment_limit": 500,
            "weekly_attachment_limit": None,
        },
        "has_ai_profile": True,
        "referral_code": "REDACTED",
        "subscription_status": "active",
        "subscription_source": "stripe",
        "subscription_tier": "yearly",
        "query_count": 3390,
        "query_count_copilot": 2196,
        "query_count_mobile": 1277,
        "default_model": "turbo",
        "disable_training": True,
        "connectors": {"connectors": []},
    }


@pytest.fixture
def exhausted_limits() -> RateLimits:
    """Limits where everything is at zero."""
    return RateLimits(
        remaining_pro=0,
        remaining_research=0,
        remaining_labs=0,
        remaining_agentic_research=0,
    )


@pytest.fixture
def healthy_limits() -> RateLimits:
    """Limits with healthy remaining quotas."""
    return RateLimits(
        remaining_pro=600,
        remaining_research=10,
        remaining_labs=25,
        remaining_agentic_research=5,
    )


# ============================================================================
# 1. Data Model Parsing - RateLimits
# ============================================================================

class TestRateLimitsFromApi:
    """Test RateLimits.from_api() with various inputs."""

    def test_parse_full_response(self, rate_limit_api_response: dict) -> None:
        limits = RateLimits.from_api(rate_limit_api_response)
        assert limits.remaining_pro == 600
        assert limits.remaining_research == 10
        assert limits.remaining_labs == 25
        assert limits.remaining_agentic_research == 0
        assert limits.model_specific_limits == {}

    def test_parse_source_limits(self, rate_limit_api_response: dict) -> None:
        limits = RateLimits.from_api(rate_limit_api_response)
        assert len(limits.source_limits) == 8

        # Check unlimited source
        web = next(s for s in limits.source_limits if s.source_id == "web")
        assert web.monthly_limit is None
        assert web.remaining is None
        assert web.is_unlimited is True
        assert web.is_exhausted is False

        # Check limited source with remaining
        pitchbook = next(s for s in limits.source_limits if s.source_id == "pitchbook_mcp_cashmere")
        assert pitchbook.monthly_limit == 5
        assert pitchbook.remaining == 3
        assert pitchbook.is_unlimited is False
        assert pitchbook.is_exhausted is False

        # Check exhausted source
        statista = next(s for s in limits.source_limits if s.source_id == "statista_mcp_cashmere")
        assert statista.monthly_limit == 5
        assert statista.remaining == 0
        assert statista.is_exhausted is True

    def test_parse_empty_response(self) -> None:
        limits = RateLimits.from_api({})
        assert limits.remaining_pro == 0
        assert limits.remaining_research == 0
        assert limits.remaining_labs == 0
        assert limits.remaining_agentic_research == 0
        assert limits.model_specific_limits == {}
        assert limits.source_limits == []

    def test_parse_missing_sources(self) -> None:
        data = {"remaining_pro": 100, "remaining_research": 5}
        limits = RateLimits.from_api(data)
        assert limits.remaining_pro == 100
        assert limits.remaining_research == 5
        assert limits.source_limits == []

    def test_parse_empty_sources(self) -> None:
        data = {"remaining_pro": 50, "sources": {}}
        limits = RateLimits.from_api(data)
        assert limits.remaining_pro == 50
        assert limits.source_limits == []

    def test_parse_with_model_specific_limits(self) -> None:
        data = {
            "remaining_pro": 100,
            "model_specific_limits": {"gpt-5.2": {"remaining": 50}},
        }
        limits = RateLimits.from_api(data)
        assert limits.model_specific_limits == {"gpt-5.2": {"remaining": 50}}

    def test_parse_only_sources_no_counts(self) -> None:
        """If top-level counts are missing, they default to 0."""
        data = {
            "sources": {
                "source_to_limit": {
                    "web": {"monthly_limit": None, "remaining": None}
                }
            }
        }
        limits = RateLimits.from_api(data)
        assert limits.remaining_pro == 0
        assert len(limits.source_limits) == 1


# ============================================================================
# 2. Data Model Parsing - UserSettings
# ============================================================================

class TestUserSettingsFromApi:
    """Test UserSettings.from_api() with various inputs."""

    def test_parse_full_response(self, user_settings_api_response: dict) -> None:
        settings = UserSettings.from_api(user_settings_api_response)
        assert settings.pages_limit == 100
        assert settings.upload_limit == 50
        assert settings.create_limit == 99
        assert settings.max_files_per_user == 500
        assert settings.max_files_per_repository == 50
        assert settings.subscription_status == "active"
        assert settings.subscription_source == "stripe"
        assert settings.subscription_tier == "yearly"
        assert settings.query_count == 3390
        assert settings.query_count_copilot == 2196
        assert settings.default_model == "turbo"

    def test_parse_connector_limits(self, user_settings_api_response: dict) -> None:
        settings = UserSettings.from_api(user_settings_api_response)
        cl = settings.connector_limits
        assert cl.max_file_size_mb == 50
        assert cl.daily_attachment_limit == 500
        assert cl.weekly_attachment_limit is None
        assert cl.global_file_count == 500

    def test_parse_empty_response(self) -> None:
        settings = UserSettings.from_api({})
        assert settings.pages_limit == 0
        assert settings.upload_limit == 0
        assert settings.subscription_status == "none"
        assert settings.subscription_tier == "none"
        assert settings.query_count == 0
        assert settings.default_model == "turbo"

    def test_parse_missing_connector_limits(self) -> None:
        data = {"pages_limit": 50, "subscription_tier": "pro"}
        settings = UserSettings.from_api(data)
        assert settings.pages_limit == 50
        assert settings.subscription_tier == "pro"
        # ConnectorLimits should use defaults
        assert settings.connector_limits.max_file_size_mb == 50
        assert settings.connector_limits.daily_attachment_limit == 500

    def test_sensitive_fields_not_exposed(self, user_settings_api_response: dict) -> None:
        """Ensure sensitive fields from API response aren't in the dataclass."""
        settings = UserSettings.from_api(user_settings_api_response)
        # These fields exist in the API response but should NOT be on the model
        assert not hasattr(settings, "referral_code")
        assert not hasattr(settings, "connectors")
        assert not hasattr(settings, "has_ai_profile")
        assert not hasattr(settings, "disable_training")

    def test_free_tier_response(self) -> None:
        data = {
            "subscription_status": "none",
            "subscription_tier": "none",
            "subscription_source": "none",
            "query_count": 5,
            "query_count_copilot": 2,
            "upload_limit": 5,
        }
        settings = UserSettings.from_api(data)
        assert settings.subscription_status == "none"
        assert settings.subscription_tier == "none"
        assert settings.query_count == 5


# ============================================================================
# 3. Data Model Parsing - SourceLimit
# ============================================================================

class TestSourceLimit:
    """Test SourceLimit properties."""

    def test_unlimited_source(self) -> None:
        s = SourceLimit(source_id="web", monthly_limit=None, remaining=None)
        assert s.is_unlimited is True
        assert s.is_exhausted is False

    def test_limited_with_remaining(self) -> None:
        s = SourceLimit(source_id="pitchbook", monthly_limit=5, remaining=3)
        assert s.is_unlimited is False
        assert s.is_exhausted is False

    def test_exhausted_source(self) -> None:
        s = SourceLimit(source_id="statista", monthly_limit=5, remaining=0)
        assert s.is_unlimited is False
        assert s.is_exhausted is True

    def test_zero_limit_zero_remaining(self) -> None:
        s = SourceLimit(source_id="box", monthly_limit=0, remaining=0)
        assert s.is_unlimited is False
        assert s.is_exhausted is True

    def test_negative_remaining(self) -> None:
        """Edge case: Perplexity might return negative remaining."""
        s = SourceLimit(source_id="test", monthly_limit=5, remaining=-1)
        assert s.is_exhausted is True

    def test_frozen(self) -> None:
        s = SourceLimit(source_id="web")
        with pytest.raises(AttributeError):
            s.source_id = "changed"  # type: ignore[misc]


# ============================================================================
# 4. Properties and Formatting
# ============================================================================

class TestRateLimitsProperties:
    """Test RateLimits boolean properties and formatting."""

    def test_has_pro_queries_true(self, healthy_limits: RateLimits) -> None:
        assert healthy_limits.has_pro_queries is True

    def test_has_pro_queries_false(self, exhausted_limits: RateLimits) -> None:
        assert exhausted_limits.has_pro_queries is False

    def test_has_research_queries_true(self, healthy_limits: RateLimits) -> None:
        assert healthy_limits.has_research_queries is True

    def test_has_research_queries_false(self, exhausted_limits: RateLimits) -> None:
        assert exhausted_limits.has_research_queries is False

    def test_has_pro_but_not_research(self) -> None:
        limits = RateLimits(remaining_pro=100, remaining_research=0)
        assert limits.has_pro_queries is True
        assert limits.has_research_queries is False

    def test_format_summary_basic(self, healthy_limits: RateLimits) -> None:
        summary = healthy_limits.format_summary()
        assert "Pro Search: 600 remaining" in summary
        assert "Deep Research: 10 remaining" in summary
        assert "Create Files & Apps: 25 remaining" in summary
        assert "Browser Agent: 5 remaining" in summary

    def test_format_summary_with_sources(self, rate_limit_api_response: dict) -> None:
        limits = RateLimits.from_api(rate_limit_api_response)
        summary = limits.format_summary()
        assert "Source Limits:" in summary
        assert "statista_mcp_cashmere: 0/5" in summary
        assert "pitchbook_mcp_cashmere: 3/5" in summary
        # Unlimited sources should NOT appear
        assert "web:" not in summary
        assert "scholar:" not in summary

    def test_format_summary_with_model_limits(self) -> None:
        limits = RateLimits(
            remaining_pro=100,
            model_specific_limits={"gpt-5.2": {"remaining": 50}},
        )
        summary = limits.format_summary()
        assert "Model-specific limits:" in summary

    def test_format_summary_no_sources(self) -> None:
        limits = RateLimits(remaining_pro=100)
        summary = limits.format_summary()
        assert "Source Limits:" not in summary


class TestUserSettingsFormatting:
    """Test UserSettings.format_summary()."""

    def test_format_summary(self, user_settings_api_response: dict) -> None:
        settings = UserSettings.from_api(user_settings_api_response)
        summary = settings.format_summary()
        assert "Subscription: yearly (active)" in summary
        assert "Total queries: 3,390" in summary
        assert "Pro queries: 2,196" in summary
        assert "Upload limit: 50 files" in summary
        assert "Max file size: 50 MB" in summary
        assert "Daily attachments: 500" in summary

    def test_format_summary_defaults(self) -> None:
        settings = UserSettings()
        summary = settings.format_summary()
        assert "Subscription: none (none)" in summary
        assert "Total queries: 0" in summary


# ============================================================================
# 5. ConnectorLimits
# ============================================================================

class TestConnectorLimits:
    """Test ConnectorLimits defaults and parsing."""

    def test_defaults(self) -> None:
        cl = ConnectorLimits()
        assert cl.max_file_size_mb == 50
        assert cl.daily_attachment_limit == 500
        assert cl.weekly_attachment_limit is None
        assert cl.global_file_count == 500

    def test_frozen(self) -> None:
        cl = ConnectorLimits()
        with pytest.raises(AttributeError):
            cl.max_file_size_mb = 100  # type: ignore[misc]


# ============================================================================
# 6. RateLimitCache - Unit Tests (mocked fetching)
# ============================================================================

class TestRateLimitCache:
    """Test cache behavior with mocked network calls."""

    def _make_cache(
        self, token: str = "fake-token", rate_limit_ttl: float = 1.0, settings_ttl: float = 2.0
    ) -> RateLimitCache:
        return RateLimitCache(token, rate_limit_ttl=rate_limit_ttl, settings_ttl=settings_ttl)

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_first_call_fetches(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = RateLimits(remaining_pro=100)
        cache = self._make_cache()

        result = cache.get_rate_limits()
        assert result is not None
        assert result.remaining_pro == 100
        mock_fetch.assert_called_once_with("fake-token")

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_second_call_uses_cache(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = RateLimits(remaining_pro=100)
        cache = self._make_cache(rate_limit_ttl=60.0)  # Long TTL

        result1 = cache.get_rate_limits()
        result2 = cache.get_rate_limits()

        assert result1 is result2  # Same object (cached)
        assert mock_fetch.call_count == 1  # Only fetched once

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_cache_expires_after_ttl(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = RateLimits(remaining_pro=100)
        cache = self._make_cache(rate_limit_ttl=0.1)  # 100ms TTL

        result1 = cache.get_rate_limits()
        time.sleep(0.15)  # Wait for TTL to expire
        result2 = cache.get_rate_limits()

        assert mock_fetch.call_count == 2  # Fetched twice
        assert result1 is not result2 or mock_fetch.call_count == 2

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_invalidation_forces_refetch(self, mock_fetch: MagicMock) -> None:
        returns = [RateLimits(remaining_pro=100), RateLimits(remaining_pro=99)]
        mock_fetch.side_effect = returns
        cache = self._make_cache(rate_limit_ttl=60.0)

        result1 = cache.get_rate_limits()
        assert result1.remaining_pro == 100

        cache.invalidate_rate_limits()
        result2 = cache.get_rate_limits()
        assert result2.remaining_pro == 99
        assert mock_fetch.call_count == 2

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_force_refresh(self, mock_fetch: MagicMock) -> None:
        returns = [RateLimits(remaining_pro=100), RateLimits(remaining_pro=95)]
        mock_fetch.side_effect = returns
        cache = self._make_cache(rate_limit_ttl=60.0)

        cache.get_rate_limits()
        result2 = cache.get_rate_limits(force_refresh=True)
        assert result2.remaining_pro == 95
        assert mock_fetch.call_count == 2

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_fetch_failure_returns_none(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = None
        cache = self._make_cache()

        result = cache.get_rate_limits()
        assert result is None

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_fetch_failure_does_not_cache_none(self, mock_fetch: MagicMock) -> None:
        """After a failed fetch, next call should retry."""
        mock_fetch.side_effect = [None, RateLimits(remaining_pro=50)]
        cache = self._make_cache(rate_limit_ttl=60.0)

        result1 = cache.get_rate_limits()
        assert result1 is None

        result2 = cache.get_rate_limits()
        assert result2 is not None
        assert result2.remaining_pro == 50
        assert mock_fetch.call_count == 2

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_update_token_clears_cache(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = RateLimits(remaining_pro=100)
        cache = self._make_cache(rate_limit_ttl=60.0)

        cache.get_rate_limits()
        cache.update_token("new-token")

        # Cache should be cleared, but next call uses the new token
        mock_fetch.return_value = RateLimits(remaining_pro=200)
        result = cache.get_rate_limits()
        assert result.remaining_pro == 200
        assert mock_fetch.call_count == 2
        # Verify the second call used the new token
        mock_fetch.assert_called_with("new-token")

    @patch("perplexity_web_mcp.rate_limits.fetch_user_settings")
    def test_settings_cache(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = UserSettings(subscription_tier="yearly")
        cache = self._make_cache(settings_ttl=60.0)

        result1 = cache.get_user_settings()
        result2 = cache.get_user_settings()

        assert result1 is result2
        assert mock_fetch.call_count == 1

    @patch("perplexity_web_mcp.rate_limits.fetch_user_settings")
    def test_settings_cache_expires(self, mock_fetch: MagicMock) -> None:
        mock_fetch.return_value = UserSettings(subscription_tier="yearly")
        cache = self._make_cache(settings_ttl=0.1)

        cache.get_user_settings()
        time.sleep(0.15)
        cache.get_user_settings()

        assert mock_fetch.call_count == 2

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_invalidation_does_not_affect_settings(self, mock_fetch: MagicMock) -> None:
        """invalidate_rate_limits should not clear settings cache."""
        mock_fetch.return_value = RateLimits(remaining_pro=100)
        cache = self._make_cache(rate_limit_ttl=60.0, settings_ttl=60.0)

        with patch("perplexity_web_mcp.rate_limits.fetch_user_settings") as mock_settings:
            mock_settings.return_value = UserSettings(subscription_tier="yearly")
            cache.get_user_settings()

            cache.invalidate_rate_limits()

            # Settings should still be cached
            cache.get_user_settings()
            assert mock_settings.call_count == 1

    @patch("perplexity_web_mcp.rate_limits.fetch_rate_limits")
    def test_thread_safety(self, mock_fetch: MagicMock) -> None:
        """Multiple threads should not cause crashes or data corruption."""
        call_count = 0

        def slow_fetch(token: str) -> RateLimits:
            nonlocal call_count
            call_count += 1
            time.sleep(0.01)  # Simulate network latency
            return RateLimits(remaining_pro=100)

        mock_fetch.side_effect = slow_fetch
        cache = self._make_cache(rate_limit_ttl=0.05)

        results: list[RateLimits | None] = []
        errors: list[Exception] = []

        def worker() -> None:
            try:
                for _ in range(5):
                    r = cache.get_rate_limits()
                    if r is not None:
                        results.append(r)
                    time.sleep(0.01)
            except Exception as e:
                errors.append(e)

        threads = [threading.Thread(target=worker) for _ in range(4)]
        for t in threads:
            t.start()
        for t in threads:
            t.join(timeout=5)

        assert not errors, f"Thread errors: {errors}"
        assert len(results) > 0
        # All results should have remaining_pro == 100
        assert all(r.remaining_pro == 100 for r in results)


# ============================================================================
# 7. MCP Server Helpers (unit tests with mocking)
# ============================================================================

class TestMCPServerHelpers:
    """Test _is_research_model and _check_limits_before_query."""

    def test_is_research_model(self) -> None:
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import is_research_model

        assert is_research_model(Models.DEEP_RESEARCH) is True
        assert is_research_model(Models.BEST) is False
        assert is_research_model(Models.GPT_52) is False
        assert is_research_model(Models.CLAUDE_46_SONNET) is False
        assert is_research_model(Models.GROK_41) is False
        assert is_research_model(Models.SONAR) is False
        assert is_research_model(Models.GEMINI_3_FLASH) is False
        assert is_research_model(Models.KIMI_K25_THINKING) is False

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_pro_ok(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=100, remaining_research=5)
        mock_cache_fn.return_value = mock_cache

        result = check_limits_before_query(Models.BEST)
        assert result is None  # No error, proceed

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_pro_exhausted(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=0, remaining_research=5)
        mock_cache_fn.return_value = mock_cache

        result = check_limits_before_query(Models.BEST)
        assert result is not None
        assert "LIMIT REACHED" in result
        assert "Pro Search" in result
        assert "weekly" in result.lower()

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_research_ok(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=100, remaining_research=5)
        mock_cache_fn.return_value = mock_cache

        result = check_limits_before_query(Models.DEEP_RESEARCH)
        assert result is None

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_research_exhausted(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=100, remaining_research=0)
        mock_cache_fn.return_value = mock_cache

        result = check_limits_before_query(Models.DEEP_RESEARCH)
        assert result is not None
        assert "LIMIT REACHED" in result
        assert "Deep Research" in result
        assert "monthly" in result.lower()

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_no_cache(self, mock_cache_fn: MagicMock) -> None:
        """When cache is None (no token), should fail-open."""
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache_fn.return_value = None
        result = check_limits_before_query(Models.BEST)
        assert result is None  # Fail-open

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_fetch_failure(self, mock_cache_fn: MagicMock) -> None:
        """When rate limit fetch returns None, should fail-open."""
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = None
        mock_cache_fn.return_value = mock_cache

        result = check_limits_before_query(Models.BEST)
        assert result is None  # Fail-open

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_check_limits_all_models_pro(self, mock_cache_fn: MagicMock) -> None:
        """All non-research models should check pro quota."""
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=0, remaining_research=10)
        mock_cache_fn.return_value = mock_cache

        pro_models = [
            Models.BEST, Models.SONAR, Models.GPT_52, Models.GPT_52_THINKING,
            Models.CLAUDE_46_SONNET, Models.CLAUDE_46_SONNET_THINKING,
            Models.CLAUDE_46_OPUS, Models.CLAUDE_46_OPUS_THINKING,
            Models.GEMINI_3_FLASH, Models.GEMINI_3_FLASH_THINKING,
            Models.GEMINI_3_PRO_THINKING,
            Models.GROK_41, Models.GROK_41_THINKING,
            Models.KIMI_K25_THINKING,
        ]
        for model in pro_models:
            result = check_limits_before_query(model)
            assert result is not None, f"Expected block for {model} with 0 pro remaining"
            assert "Pro Search" in result

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_error_context_with_limits(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.shared import get_limit_context_for_error

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = RateLimits(remaining_pro=50, remaining_research=3)
        mock_cache_fn.return_value = mock_cache

        context = get_limit_context_for_error()
        assert "Pro Search: 50 remaining" in context
        assert "Deep Research: 3 remaining" in context

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_error_context_no_cache(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.shared import get_limit_context_for_error

        mock_cache_fn.return_value = None
        context = get_limit_context_for_error()
        assert context == ""

    @patch("perplexity_web_mcp.shared.get_limit_cache")
    def test_error_context_fetch_failure(self, mock_cache_fn: MagicMock) -> None:
        from perplexity_web_mcp.shared import get_limit_context_for_error

        mock_cache = MagicMock()
        mock_cache.get_rate_limits.return_value = None
        mock_cache_fn.return_value = mock_cache

        context = get_limit_context_for_error()
        assert context == ""


# ============================================================================
# 8. Integration Tests (live API calls - require valid token)
# ============================================================================

def _has_valid_token() -> bool:
    """Check if a valid token is available for integration tests."""
    token = load_token()
    return token is not None and len(token) > 10


@pytest.mark.skipif(not _has_valid_token(), reason="No valid Perplexity token available")
class TestIntegrationRateLimits:
    """Live API integration tests. These hit the real Perplexity endpoints."""

    def test_fetch_rate_limits_live(self) -> None:
        token = load_token()
        limits = fetch_rate_limits(token)

        assert limits is not None, "fetch_rate_limits returned None"
        assert isinstance(limits, RateLimits)
        # Pro remaining should be non-negative
        assert limits.remaining_pro >= 0
        assert limits.remaining_research >= 0
        assert limits.remaining_labs >= 0
        assert limits.remaining_agentic_research >= 0

    def test_fetch_rate_limits_has_sources(self) -> None:
        token = load_token()
        limits = fetch_rate_limits(token)
        assert limits is not None
        assert len(limits.source_limits) > 0, "Expected at least one source limit"

        # web should be present and unlimited
        web_sources = [s for s in limits.source_limits if s.source_id == "web"]
        assert len(web_sources) == 1
        assert web_sources[0].is_unlimited is True

    def test_fetch_user_settings_live(self) -> None:
        token = load_token()
        settings = fetch_user_settings(token)

        assert settings is not None, "fetch_user_settings returned None"
        assert isinstance(settings, UserSettings)
        assert settings.subscription_status in ("active", "none", "trialing", "past_due", "canceled")
        assert settings.query_count >= 0

    def test_fetch_user_settings_has_limits(self) -> None:
        token = load_token()
        settings = fetch_user_settings(token)
        assert settings is not None
        assert settings.upload_limit > 0
        assert settings.connector_limits.max_file_size_mb > 0

    def test_fetch_with_invalid_token(self) -> None:
        """Invalid token returns zeroed-out data (Perplexity returns 200, not 401).

        This is important: Perplexity's internal REST endpoints don't reject
        invalid tokens -- they return HTTP 200 with "free tier" / zero-remaining
        data. This means we can't distinguish an invalid token from a free user
        who has used all their queries based on rate-limit data alone.
        """
        limits = fetch_rate_limits("invalid-token-12345")
        # Perplexity returns 200 with all zeros, not an error
        assert limits is not None
        assert limits.remaining_pro == 0
        assert limits.remaining_research == 0
        assert limits.remaining_labs == 0
        assert limits.remaining_agentic_research == 0

        settings = fetch_user_settings("invalid-token-12345")
        assert settings is not None
        # Subscription tier will be "none" or None (converted to "none" by default)
        assert settings.subscription_tier in ("none", "None", None)

    def test_cache_with_live_token(self) -> None:
        """Test full cache lifecycle with a real token."""
        token = load_token()
        cache = RateLimitCache(token, rate_limit_ttl=5.0, settings_ttl=10.0)

        # First fetch
        limits1 = cache.get_rate_limits()
        assert limits1 is not None

        # Should be cached (same object)
        limits2 = cache.get_rate_limits()
        assert limits2 is limits1

        # Invalidate and re-fetch
        cache.invalidate_rate_limits()
        limits3 = cache.get_rate_limits()
        assert limits3 is not None
        assert limits3 is not limits1  # New object

        # Settings should also work
        settings = cache.get_user_settings()
        assert settings is not None
        assert settings.subscription_status in ("active", "none", "trialing", "past_due", "canceled")

    def test_format_summary_with_live_data(self) -> None:
        """Verify formatting doesn't crash with real data."""
        token = load_token()
        limits = fetch_rate_limits(token)
        assert limits is not None

        summary = limits.format_summary()
        assert "Pro Search:" in summary
        assert "remaining" in summary
        assert len(summary) > 50  # Should be substantial

        settings = fetch_user_settings(token)
        assert settings is not None

        settings_summary = settings.format_summary()
        assert "Subscription:" in settings_summary
        assert len(settings_summary) > 50


@pytest.mark.skipif(not _has_valid_token(), reason="No valid Perplexity token available")
class TestIntegrationMCPServer:
    """Integration tests for MCP server rate limit features."""

    def test_get_limit_cache_returns_cache(self) -> None:
        from perplexity_web_mcp.shared import get_limit_cache

        cache = get_limit_cache()
        assert cache is not None
        assert isinstance(cache, RateLimitCache)

    def test_get_limit_cache_reuses_instance(self) -> None:
        from perplexity_web_mcp.shared import get_limit_cache

        cache1 = get_limit_cache()
        cache2 = get_limit_cache()
        assert cache1 is cache2

    def test_check_limits_passes_with_live_data(self) -> None:
        """Pre-flight check should pass if user has remaining quota."""
        from perplexity_web_mcp.models import Models
        from perplexity_web_mcp.shared import check_limits_before_query

        result = check_limits_before_query(Models.BEST)
        if result is not None:
            assert "LIMIT REACHED" in result

    def test_error_context_with_live_data(self) -> None:
        from perplexity_web_mcp.shared import get_limit_context_for_error

        context = get_limit_context_for_error()
        assert "Pro Search:" in context
        assert "remaining" in context
