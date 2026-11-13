#!/usr/bin/env python3
"""Live smoke test for the free-tier model paths a release must not break.

Runs real queries through the same ``shared.ask`` path as the CLI and MCP server.
Every case must return the marker text. The ``auto`` case can consume a Pro
Search, so check ``pwm usage`` before running the full gate.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
import sys
from time import monotonic

from perplexity_web_mcp.models import Model, Models
from perplexity_web_mcp.shared import ask


MARKER = "PWM_SMOKE_OK"
DEFAULT_MODELS = ("sonar", "auto")


@dataclass(frozen=True, slots=True)
class SmokeCase:
    """One live model query to validate."""

    name: str
    model: Model


CASES: dict[str, SmokeCase] = {
    "sonar": SmokeCase("sonar", Models.SONAR),
    "auto": SmokeCase("auto", Models.AUTO),
}


def _query(case: SmokeCase) -> str:
    return f"Reply with exactly this text and nothing else: {MARKER}"


def run_case(case: SmokeCase) -> bool:
    """Run one live query and report whether the marker came back."""
    started = monotonic()
    try:
        answer = ask(_query(case), case.model)
    except Exception as exc:  # noqa: BLE001 - report every failure and continue
        print(f"❌ {case.name}: {type(exc).__name__}: {exc}")
        return False

    elapsed = monotonic() - started
    text = answer if isinstance(answer, str) else ""
    if MARKER not in text.upper():
        preview = " ".join(text.split())[:200]
        print(f"❌ {case.name}: missing {MARKER} after {elapsed:.1f}s: {preview!r}")
        return False

    print(f"✅ {case.name}: {case.model.identifier} returned {MARKER} in {elapsed:.1f}s")
    return True


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Run live Perplexity smoke queries")
    parser.add_argument(
        "--models",
        default=",".join(DEFAULT_MODELS),
        help=f"Comma-separated cases to run (default: {','.join(DEFAULT_MODELS)})",
    )
    parser.add_argument("--dry-run", action="store_true", help="Resolve cases without querying")
    args = parser.parse_args(argv[1:])

    names = [name.strip().lower() for name in args.models.split(",") if name.strip()]
    unknown = [name for name in names if name not in CASES]
    if unknown or not names:
        print(f"Unknown or empty smoke case(s): {', '.join(unknown) or '(none)'}", file=sys.stderr)
        print(f"Available: {', '.join(CASES)}", file=sys.stderr)
        return 2

    if args.dry_run:
        for name in names:
            print(f"Would query {name} -> {CASES[name].model.identifier}")
        return 0

    print("Running live smoke queries; the auto case can consume a Pro Search.")
    results = [run_case(CASES[name]) for name in names]
    if all(results):
        print(f"All {len(results)} live smoke case(s) passed.")
        return 0

    print(f"{results.count(False)} of {len(results)} live smoke case(s) failed.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
