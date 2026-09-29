"""Live model catalog fetched from Perplexity's ``/rest/models/config`` endpoint.

The website's model picker is server-driven, so it can run ahead of any static
table shipped with a release. This module mirrors the search section of that
picker: it fetches the live definition, caches it on disk, and exposes helpers
so the CLI, MCP server, and API server can resolve current model identifiers
without waiting for a code change.

Everything here fails soft: when the endpoint is unreachable, or the cache is
missing, callers fall back to the static catalog in
:mod:`perplexity_web_mcp.shared` and queries keep working.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, fields
from json import dumps, loads
from pathlib import Path
from time import time
from typing import Any

from .constants import ENDPOINT_MODELS_CONFIG
from .exceptions import AuthenticationError
from .http import HTTPClient
from .logging import get_logger
from .models import Model
from .token_store import CONFIG_DIR, load_token


_logger = get_logger(__name__)

CATALOG_CACHE_FILE = CONFIG_DIR / "models-catalog.json"
"""Where the last successful live catalog fetch is cached."""

DEFAULT_MAX_AGE_SECONDS = 24 * 60 * 60
"""How long a cached catalog is considered fresh."""

_NON_SEARCH_PREFIXES = ("comet_", "pplx_asi_")
"""Picker identifiers for browser-agent and computer (ASI) rows, excluded from the search catalog."""


@dataclass(frozen=True, slots=True)
class CatalogEntry:
    """One search-picker model identifier from the live catalog."""

    identifier: str
    row_label: str
    label: str
    mode: str
    provider: str
    tier: str | None
    is_new: bool
    is_default: bool
    order: int


def parse_models_config(payload: dict[str, Any]) -> list[CatalogEntry]:
    """Parse a ``/rest/models/config`` payload into search-picker catalog entries."""
    models = payload.get("models") if isinstance(payload, dict) else None
    models = models if isinstance(models, dict) else {}
    rows = payload.get("config") if isinstance(payload, dict) else None
    rows = rows if isinstance(rows, list) else []

    entries: dict[str, CatalogEntry] = {}
    order = 0
    for row in rows:
        if not isinstance(row, dict):
            continue
        identifiers = [
            row.get(key) for key in ("non_reasoning_model", "reasoning_model", "fast_model", "text_only_model")
        ]
        identifiers = [ident for ident in identifiers if isinstance(ident, str) and ident]
        if not identifiers or any(ident.startswith(_NON_SEARCH_PREFIXES) for ident in identifiers):
            continue
        for ident in identifiers:
            if ident in entries:
                continue
            meta = models.get(ident)
            meta = meta if isinstance(meta, dict) else {}
            tier = row.get("subscription_tier")
            entries[ident] = CatalogEntry(
                identifier=ident,
                row_label=str(row.get("label") or ident),
                label=str(meta.get("label") or row.get("label") or ident),
                mode=str(meta.get("mode") or ""),
                provider=str(meta.get("provider") or ""),
                tier=str(tier) if tier else None,
                is_new=bool(row.get("has_new_tag")),
                is_default=bool(row.get("is_default")),
                order=order,
            )
            order += 1
    return list(entries.values())


def fetch_catalog(token: str | None = None) -> list[CatalogEntry]:
    """Fetch and parse the live catalog. Raises on failure."""
    session_token = token or load_token()
    if not session_token:
        raise AuthenticationError("No Perplexity session token available to fetch the model catalog.")

    client = HTTPClient(session_token, requests_per_second=0, rotate_fingerprint=False, max_retries=2)
    try:
        response = client.get(ENDPOINT_MODELS_CONFIG)
        payload = response.json()
    finally:
        client.close()

    entries = parse_models_config(payload)
    if not entries:
        raise ValueError("Live model catalog returned no search entries.")
    return entries


def save_catalog(entries: list[CatalogEntry], path: Path | None = None) -> bool:
    """Persist entries to the cache file. Returns True on success."""
    target = path or CATALOG_CACHE_FILE
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        payload = {"fetched_at": int(time()), "entries": [asdict(entry) for entry in entries]}
        target.write_text(dumps(payload, indent=1), encoding="utf-8")
        return True
    except Exception as exc:  # noqa: BLE001 - cache writes must never break callers
        _logger.warning(f"Failed to write model catalog cache {target}: {exc}")
        return False


def load_cached_catalog(
    path: Path | None = None, max_age_seconds: int | None = DEFAULT_MAX_AGE_SECONDS
) -> list[CatalogEntry] | None:
    """Return cached catalog entries, or None when missing, expired, or unreadable."""
    target = path or CATALOG_CACHE_FILE
    try:
        payload = loads(target.read_text(encoding="utf-8"))
        fetched_at = int(payload.get("fetched_at", 0))
        raw_entries = payload.get("entries")
        if not isinstance(raw_entries, list):
            return None
        field_names = {field.name for field in fields(CatalogEntry)}
        entries = [
            CatalogEntry(**{key: value for key, value in entry.items() if key in field_names})
            for entry in raw_entries
            if isinstance(entry, dict)
        ]
    except Exception:  # noqa: BLE001 - unreadable cache is equivalent to no cache
        return None
    if not entries:
        return None
    if max_age_seconds is not None and time() - fetched_at > max_age_seconds:
        return None
    return entries


def get_catalog(refresh: bool = False) -> list[CatalogEntry] | None:
    """Return the freshest catalog available: cache, then live fetch, then stale cache."""
    if not refresh:
        cached = load_cached_catalog()
        if cached:
            return cached
    try:
        entries = fetch_catalog()
        save_catalog(entries)
        return entries
    except Exception as exc:  # noqa: BLE001 - callers fall back to the static catalog
        _logger.warning(f"Live model catalog fetch failed: {exc}")
        return load_cached_catalog(max_age_seconds=None)


def cached_search_identifiers(path: Path | None = None) -> list[str]:
    """Identifiers from the cached catalog that can be queried in search (copilot) mode."""
    entries = load_cached_catalog(path=path, max_age_seconds=None) or []
    return [entry.identifier for entry in entries if entry.mode == "search"]


def cached_live_model(name: str, thinking: bool = False, path: Path | None = None) -> Model | None:
    """Resolve a raw live identifier from the cache into a search Model."""
    identifiers = cached_search_identifiers(path=path)
    if not identifiers:
        return None
    if thinking and f"{name}_thinking" in identifiers:
        name = f"{name}_thinking"
    if name not in identifiers:
        return None
    return Model(identifier=name, mode="copilot")
