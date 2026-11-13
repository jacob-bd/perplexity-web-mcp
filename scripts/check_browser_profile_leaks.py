#!/usr/bin/env python3
"""Fail when browser profile data could be committed to the repository.

Browser profiles contain session cookies, saved logins, and history. They must
never be tracked, staged, or copied into fixtures. Run without arguments to
scan every tracked file, or pass paths for pre-commit staging checks.
"""

from __future__ import annotations

import re
import subprocess
import sys


# Files that only belong to a browser profile, wherever they appear.
UNAMBIGUOUS_FILES = frozenset(
    {
        "Cookies",
        "Cookies-journal",
        "Login Data",
        "Login Data For Account",
        "Local State",
        "Secure Preferences",
        "SingletonLock",
        "SingletonCookie",
        "SingletonSocket",
    }
)

# Sensitive files that are only a problem inside a profile directory.
PROFILE_ONLY_FILES = frozenset(
    {
        "Affiliation Database",
        "Bookmarks",
        "Current Session",
        "Current Tabs",
        "Favicons",
        "History",
        "Last Session",
        "Last Tabs",
        "Preferences",
        "Shortcuts",
        "Top Sites",
        "Visited Links",
        "Web Data",
    }
)

# Directory names that only a browser profile uses.
BROWSER_DIR_NAMES = frozenset(
    {
        ".chrome-debug-profile",
        ".chromium-debug-profile",
        "chrome-debug-profile",
        "chrome-profile",
        "chromium-debug-profile",
        "chromium-profile",
        "guest profile",
        "system profile",
        "user data",
    }
)

_PROFILE_NUMBERED_DIR = re.compile(r"^profile \d+$", re.IGNORECASE)


def _parts(path: str) -> list[str]:
    return [part for part in path.replace("\\", "/").split("/") if part and part != "."]


def is_browser_profile_path(path: str) -> bool:
    """Return whether *path* looks like a browser profile or credential store."""
    parts = _parts(path)
    if not parts:
        return False

    directories = parts[:-1]
    basename = parts[-1]

    if basename in UNAMBIGUOUS_FILES:
        return True
    if any(part.lower() in BROWSER_DIR_NAMES for part in parts):
        return True

    has_profile_dir = any(part.lower() == "default" or _PROFILE_NUMBERED_DIR.match(part) for part in directories)
    return has_profile_dir and basename in PROFILE_ONLY_FILES


def _tracked_files() -> list[str]:
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        capture_output=True,
        check=True,
    )
    return [item.decode("utf-8", "surrogateescape") for item in result.stdout.split(b"\0") if item]


def main(argv: list[str]) -> int:
    candidates = argv[1:] or _tracked_files()
    offenders = sorted({path for path in candidates if is_browser_profile_path(path)})
    if not offenders:
        return 0

    print("Refusing to include browser profile or credential files:", file=sys.stderr)
    for path in offenders:
        print(f"  - {path}", file=sys.stderr)
    print(
        "\nRemove them from the index and rotate any exposed Perplexity or Google session cookies.",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
