"""Rate limit checking and usage tracking via Perplexity internal REST API.

Uses undocumented endpoints:
- /rest/rate-limit/all: Current remaining quotas for all features
- /rest/user/settings: User settings, subscription info, file limits

These are the same endpoints the Perplexity web UI uses to display
usage counters and enforce limits client-side.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from threading import Lock
from time import monotonic
from typing import Any

from curl_cffi.requests import Session

from .constants import API_BASE_URL, ENDPOINT_CREDITS, ENDPOINT_RATE_LIMITS, ENDPOINT_USER_SETTINGS, SESSION_COOKIE_NAME
from .logging import get_logger


logger = get_logger(__name__)


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass(frozen=True, slots=True)
class SourceLimit:
    """Rate limit for a specific source (web, scholar, Google Drive, etc.)."""

    source_id: str
    monthly_limit: int | None = None
    remaining: int | None = None

    @property
    def is_unlimited(self) -> bool:
        return self.monthly_limit is None

    @property
    def is_exhausted(self) -> bool:
        return self.remaining is not None and self.remaining <= 0


@dataclass(frozen=True, slots=True)
class RateLimits:
    """Current rate limit status from /rest/rate-limit/all.

    Attributes:
        remaining_pro: Remaining Pro Search queries (weekly rolling).
        remaining_research: Remaining Deep Research queries (monthly).
        remaining_labs: Remaining Create Files & Apps queries (monthly).
        remaining_agentic_research: Remaining Browser Agent / Comet queries (monthly).
        model_specific_limits: Per-model limits (may be empty).
        source_limits: Per-source monthly limits.
    """

    remaining_pro: int = 0
    remaining_research: int = 0
    remaining_labs: int = 0
    remaining_agentic_research: int = 0
    model_specific_limits: dict[str, Any] = field(default_factory=dict)
    source_limits: list[SourceLimit] = field(default_factory=list)

    @classmethod
    def from_api(cls, data: dict[str, Any]) -> RateLimits:
        """Parse the /rest/rate-limit/all JSON response."""
        source_limits: list[SourceLimit] = []
        sources_data = data.get("sources", {}).get("source_to_limit", {})
        for source_id, limit_data in sources_data.items():
            source_limits.append(
                SourceLimit(
                    source_id=source_id,
                    monthly_limit=limit_data.get("monthly_limit"),
                    remaining=limit_data.get("remaining"),
                )
            )

        return cls(
            remaining_pro=data.get("remaining_pro", 0),
            remaining_research=data.get("remaining_research", 0),
            remaining_labs=data.get("remaining_labs", 0),
            remaining_agentic_research=data.get("remaining_agentic_research", 0),
            model_specific_limits=data.get("model_specific_limits", {}),
            source_limits=source_limits,
        )

    @property
    def has_pro_queries(self) -> bool:
        return self.remaining_pro > 0

    @property
    def has_research_queries(self) -> bool:
        return self.remaining_research > 0

    def format_summary(self) -> str:
        """Human-readable summary of current limits."""
        lines = [
            f"Pro Search: {self.remaining_pro} remaining",
            f"Deep Research: {self.remaining_research} remaining",
            f"Create Files & Apps: {self.remaining_labs} remaining",
            f"Browser Agent: {self.remaining_agentic_research} remaining",
        ]

        if self.model_specific_limits:
            lines.append(f"Model-specific limits: {self.model_specific_limits}")

        # Show limited sources (those with monthly caps)
        limited_sources = [s for s in self.source_limits if not s.is_unlimited]
        if limited_sources:
            lines.append("\nSource Limits:")
            for src in limited_sources:
                lines.append(f"  {src.source_id}: {src.remaining}/{src.monthly_limit}")

        return "\n".join(lines)


@dataclass(frozen=True, slots=True)
class ConnectorLimits:
    """File and connector limits from user settings."""

    max_file_size_mb: int = 50
    daily_attachment_limit: int = 500
    weekly_attachment_limit: int | None = None
    global_file_count: int = 500


@dataclass(frozen=True, slots=True)
class UserSettings:
    """Relevant user settings from /rest/user/settings.

    Only exposes non-sensitive fields useful for limit enforcement.
    Excludes: connector credentials, OAuth tokens, referral codes.
    """

    pages_limit: int = 0
    upload_limit: int = 0
    create_limit: int = 0
    max_files_per_user: int = 0
    max_files_per_repository: int = 0
    subscription_status: str = "none"
    subscription_source: str = "none"
    subscription_tier: str = "none"
    query_count: int = 0
    query_count_copilot: int = 0
    default_model: str = "turbo"
    connector_limits: ConnectorLimits = field(default_factory=ConnectorLimits)

    @classmethod
    def from_api(cls, data: dict[str, Any]) -> UserSettings:
        """Parse the /rest/user/settings JSON response (safe fields only)."""
        cl_data = data.get("connector_limits", {})
        connector_limits = ConnectorLimits(
            max_file_size_mb=cl_data.get("max_file_size_mb", 50),
            daily_attachment_limit=cl_data.get("daily_attachment_limit", 500),
            weekly_attachment_limit=cl_data.get("weekly_attachment_limit"),
            global_file_count=cl_data.get("global_file_count", 500),
        )

        return cls(
            pages_limit=data.get("pages_limit", 0),
            upload_limit=data.get("upload_limit", 0),
            create_limit=data.get("create_limit", 0),
            max_files_per_user=data.get("max_files_per_user", 0),
            max_files_per_repository=data.get("max_files_per_repository", 0),
            subscription_status=data.get("subscription_status", "none"),
            subscription_source=data.get("subscription_source", "none"),
            subscription_tier=data.get("subscription_tier", "none"),
            query_count=data.get("query_count", 0),
            query_count_copilot=data.get("query_count_copilot", 0),
            default_model=data.get("default_model", "turbo"),
            connector_limits=connector_limits,
        )

    def format_summary(self) -> str:
        """Human-readable summary of user settings."""
        lines = [
            f"Subscription: {self.subscription_tier} ({self.subscription_status})",
            f"Total queries: {self.query_count:,}",
            f"Pro queries: {self.query_count_copilot:,}",
            f"Upload limit: {self.upload_limit} files",
            f"Create limit: {self.create_limit}",
            f"Pages limit: {self.pages_limit}",
            f"Max files/user: {self.max_files_per_user:,}",
            f"Max file size: {self.connector_limits.max_file_size_mb} MB",
            f"Daily attachments: {self.connector_limits.daily_attachment_limit}",
        ]
        return "\n".join(lines)


@dataclass(frozen=True, slots=True)
class CreditGrant:
    """A single credit grant (plan, promotional, purchased, etc.)."""

    type: str
    amount_cents: float
    expires_at_ts: int | None = None


@dataclass(frozen=True, slots=True)
class Credits:
    """Usage-based credits from /rest/billing/credits.

    Attributes:
        balance_cents: Available credit balance in cents.
        total_usage_cents: Total usage in the current billing period.
        current_period_purchased_cents: Credits purchased this period.
        credit_grants: List of active credit grants (promotional, etc.).
        meter_usage: Usage breakdown by type (text, image, video, audio, etc.).
        renewal_date_ts: Unix timestamp of next renewal date.
        global_cap_cents: Maximum spending cap in cents.
        spending_limit_cents: User-set spending limit (None if not set).
        auto_topup_enabled: Whether auto top-up is active.
    """

    balance_cents: float = 0.0
    total_usage_cents: float = 0.0
    current_period_purchased_cents: float = 0.0
    credit_grants: list[CreditGrant] = field(default_factory=list)
    meter_usage: list[dict[str, Any]] = field(default_factory=list)
    renewal_date_ts: int | None = None
    global_cap_cents: int | None = None
    spending_limit_cents: float | None = None
    auto_topup_enabled: bool = False

    @classmethod
    def from_api(cls, data: dict[str, Any]) -> Credits:
        """Parse the /rest/billing/credits JSON response."""
        grants = [
            CreditGrant(
                type=g.get("type", "unknown"),
                amount_cents=g.get("amount_cents", 0),
                expires_at_ts=g.get("expires_at_ts"),
            )
            for g in data.get("credit_grants", [])
        ]
        return cls(
            balance_cents=data.get("balance_cents", 0.0),
            total_usage_cents=data.get("total_usage_cents", 0.0),
            current_period_purchased_cents=data.get("current_period_purchased_cents", 0.0),
            credit_grants=grants,
            meter_usage=data.get("meter_usage", []),
            renewal_date_ts=data.get("renewal_date_ts"),
            global_cap_cents=data.get("global_cap_cents"),
            spending_limit_cents=data.get("spending_limit_cents"),
            auto_topup_enabled=data.get("auto_topup_enabled", False),
        )

    def format_summary(self) -> str:
        """Human-readable summary of credits."""
        from datetime import datetime, timezone

        lines = [
            f"Purchased credits: {self.current_period_purchased_cents:,.2f}",
        ]

        total_grants = 0.0
        for grant in self.credit_grants:
            label = grant.type.replace("_", " ").title()
            exp = ""
            if grant.expires_at_ts:
                exp_date = datetime.fromtimestamp(grant.expires_at_ts, tz=timezone.utc)
                exp = f" (expires {exp_date.strftime('%b %d, %Y')})"
            lines.append(f"{label} credits: {grant.amount_cents:,.2f}{exp}")
            total_grants += grant.amount_cents

        total_pool = total_grants + self.current_period_purchased_cents
        if total_pool > 0:
            lines.append(f"Total available: {self.balance_cents:,.2f} / {total_pool:,.2f}")
        else:
            lines.append(f"Total available: {self.balance_cents:,.2f}")

        # Usage breakdown
        meter_map = {
            "asi_token_usage": "Text usage",
            "image_generation_usage": "Image usage",
            "video_generation_usage": "Video usage",
            "audio_generation_usage": "Audio usage",
        }
        if self.meter_usage:
            for meter in self.meter_usage:
                raw_type = meter.get("meter_type", "unknown")
                friendly = meter_map.get(raw_type, raw_type.replace("_", " ").title())
                cost = meter.get("cost_cents", 0)
                lines.append(f"{friendly}: {cost:,.2f}")

        if self.renewal_date_ts:
            renewal = datetime.fromtimestamp(self.renewal_date_ts, tz=timezone.utc)
            lines.append(f"Next renewal: {renewal.strftime('%b %d, %Y')}")

        return "\n".join(lines)


# ---------------------------------------------------------------------------
# Fetching (low-level, no caching)
# ---------------------------------------------------------------------------

def _create_session(token: str) -> Session:
    """Create a minimal session for REST API calls."""
    return Session(
        impersonate="chrome",
        headers={"Referer": API_BASE_URL, "Origin": API_BASE_URL},
        cookies={SESSION_COOKIE_NAME: token},
    )


def fetch_rate_limits(token: str) -> RateLimits | None:
    """Fetch current rate limits from Perplexity.

    Returns None on any error (network, auth, parsing).
    """
    try:
        with _create_session(token) as session:
            response = session.get(f"{API_BASE_URL}{ENDPOINT_RATE_LIMITS}")
            if response.status_code == 200:
                return RateLimits.from_api(response.json())
            logger.warning(f"Rate limits fetch failed: HTTP {response.status_code}")
    except Exception as exc:
        logger.warning(f"Rate limits fetch error: {exc}")
    return None


def fetch_user_settings(token: str) -> UserSettings | None:
    """Fetch user settings from Perplexity.

    Returns None on any error (network, auth, parsing).
    """
    try:
        with _create_session(token) as session:
            response = session.get(f"{API_BASE_URL}{ENDPOINT_USER_SETTINGS}")
            if response.status_code == 200:
                return UserSettings.from_api(response.json())
            logger.warning(f"User settings fetch failed: HTTP {response.status_code}")
    except Exception as exc:
        logger.warning(f"User settings fetch error: {exc}")
    return None


def fetch_credits(token: str) -> Credits | None:
    """Fetch usage-based credits from Perplexity.

    Returns None on any error (network, auth, parsing).
    """
    try:
        with _create_session(token) as session:
            response = session.get(
                f"{API_BASE_URL}{ENDPOINT_CREDITS}",
                params={"version": "2.18", "source": "default"},
                headers={"x-app-apiclient": "default", "x-app-apiversion": "2.18"},
            )
            if response.status_code == 200:
                return Credits.from_api(response.json())
            logger.warning(f"Credits fetch failed: HTTP {response.status_code}")
    except Exception as exc:
        logger.warning(f"Credits fetch error: {exc}")
    return None


# ---------------------------------------------------------------------------
# Cached layer (thread-safe, time-based)
# ---------------------------------------------------------------------------

class RateLimitCache:
    """Thread-safe, time-based cache for rate limit and settings data.

    - Rate limits: cached for ``rate_limit_ttl`` seconds (default 30s).
      Automatically invalidated after a query is made.
    - User settings: cached for ``settings_ttl`` seconds (default 300s / 5min).
    """

    __slots__ = (
        "_credits",
        "_credits_ts",
        "_credits_ttl",
        "_fetch_lock",
        "_lock",
        "_rate_limits",
        "_rate_limits_ts",
        "_rate_limit_ttl",
        "_settings",
        "_settings_ts",
        "_settings_ttl",
        "_token",
    )

    def __init__(
        self,
        token: str,
        rate_limit_ttl: float = 30.0,
        settings_ttl: float = 300.0,
        credits_ttl: float = 300.0,
    ) -> None:
        self._token = token
        self._rate_limit_ttl = rate_limit_ttl
        self._settings_ttl = settings_ttl
        self._credits_ttl = credits_ttl
        self._lock = Lock()
        self._fetch_lock = Lock()  # Prevents thundering herd on cache miss
        self._rate_limits: RateLimits | None = None
        self._rate_limits_ts: float = 0.0
        self._settings: UserSettings | None = None
        self._settings_ts: float = 0.0
        self._credits: Credits | None = None
        self._credits_ts: float = 0.0

    def update_token(self, token: str) -> None:
        """Update the token (e.g. after re-authentication) and clear cache."""
        with self._lock:
            self._token = token
            self._rate_limits = None
            self._rate_limits_ts = 0.0
            self._settings = None
            self._settings_ts = 0.0
            self._credits = None
            self._credits_ts = 0.0

    def get_rate_limits(self, force_refresh: bool = False) -> RateLimits | None:
        """Get rate limits, fetching if cache is stale or empty."""
        # Fast path: return cached value if still fresh
        with self._lock:
            if (
                not force_refresh
                and self._rate_limits is not None
                and (monotonic() - self._rate_limits_ts) < self._rate_limit_ttl
            ):
                return self._rate_limits
            token = self._token  # Capture token under lock

        # Serialize fetches to prevent thundering herd
        with self._fetch_lock:
            # Double-check: another thread may have refreshed while we waited
            with self._lock:
                if (
                    not force_refresh
                    and self._rate_limits is not None
                    and (monotonic() - self._rate_limits_ts) < self._rate_limit_ttl
                ):
                    return self._rate_limits

            limits = fetch_rate_limits(token)
            if limits is not None:
                with self._lock:
                    self._rate_limits = limits
                    self._rate_limits_ts = monotonic()
            return limits

    def get_user_settings(self, force_refresh: bool = False) -> UserSettings | None:
        """Get user settings, fetching if cache is stale or empty."""
        # Fast path: return cached value if still fresh
        with self._lock:
            if (
                not force_refresh
                and self._settings is not None
                and (monotonic() - self._settings_ts) < self._settings_ttl
            ):
                return self._settings
            token = self._token  # Capture token under lock

        # Serialize fetches to prevent thundering herd
        with self._fetch_lock:
            # Double-check: another thread may have refreshed while we waited
            with self._lock:
                if (
                    not force_refresh
                    and self._settings is not None
                    and (monotonic() - self._settings_ts) < self._settings_ttl
                ):
                    return self._settings

            settings = fetch_user_settings(token)
            if settings is not None:
                with self._lock:
                    self._settings = settings
                    self._settings_ts = monotonic()
            return settings

    def get_credits(self, force_refresh: bool = False) -> Credits | None:
        """Get credits info, fetching if cache is stale or empty."""
        with self._lock:
            if (
                not force_refresh
                and self._credits is not None
                and (monotonic() - self._credits_ts) < self._credits_ttl
            ):
                return self._credits
            token = self._token

        with self._fetch_lock:
            with self._lock:
                if (
                    not force_refresh
                    and self._credits is not None
                    and (monotonic() - self._credits_ts) < self._credits_ttl
                ):
                    return self._credits

            credits = fetch_credits(token)
            if credits is not None:
                with self._lock:
                    self._credits = credits
                    self._credits_ts = monotonic()
            return credits

    def invalidate_rate_limits(self) -> None:
        """Invalidate rate limit cache (call after making a query)."""
        with self._lock:
            self._rate_limits = None
            self._rate_limits_ts = 0.0
