#!/usr/bin/env python3
"""Run the mandatory release gate: lint, offline tests, and live smoke queries.

Usage:
    python scripts/release_check.py
    python scripts/release_check.py --dry-run
"""

from __future__ import annotations

import argparse
import subprocess
import sys


COMMANDS: tuple[tuple[str, ...], ...] = (
    ("uv", "run", "ruff", "check"),
    ("uv", "run", "--group", "tests", "pytest", "tests/", "-q"),
    ("uv", "run", "python", "scripts/live_smoke.py", "--models", "sonar,auto"),
)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Run the release gate")
    parser.add_argument("--dry-run", action="store_true", help="Print commands without running them")
    args = parser.parse_args(argv[1:])

    for command in COMMANDS:
        print(f"+ {' '.join(command)}", flush=True)
        if args.dry_run:
            continue
        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as exc:
            print(f"Release gate failed: {' '.join(command)} (exit {exc.returncode})", file=sys.stderr)
            return exc.returncode or 1
        except FileNotFoundError as exc:
            print(f"Release gate could not start {command[0]}: {exc}", file=sys.stderr)
            return 1

    if args.dry_run:
        print("Dry run complete. No commands executed.")
    else:
        print("Release gate passed. Safe to tag this commit.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
