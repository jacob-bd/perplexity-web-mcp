"""Guard against committing browser profile data or session credentials."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts" / "check_browser_profile_leaks.py"

_spec = importlib.util.spec_from_file_location("check_browser_profile_leaks", SCRIPT)
assert _spec and _spec.loader
checker = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(checker)


def test_no_tracked_browser_profiles() -> None:
    tracked = subprocess.run(
        ["git", "ls-files", "-z"],
        cwd=ROOT,
        capture_output=True,
        check=True,
    ).stdout.split(b"\0")
    paths = [item.decode("utf-8", "surrogateescape") for item in tracked if item]
    assert [path for path in paths if checker.is_browser_profile_path(path)] == []


def test_detector_blocks_common_chrome_profile_paths() -> None:
    blocked = (
        "chrome-profile/Default/Cookies",
        "profile/Default/Login Data",
        "tools/User Data/Local State",
        "tmp/chrome-debug-profile/Default/Preferences",
        "fixtures/Profile 2/Web Data",
        "Network/Cookies-journal",
        ".chromium-debug-profile/SingletonLock",
    )
    assert all(checker.is_browser_profile_path(path) for path in blocked)


def test_detector_allows_regular_project_files() -> None:
    allowed = (
        "src/perplexity_web_mcp/preferences.py",
        "tests/test_preferences.py",
        "docs/configuration.md",
        "src/perplexity_web_mcp/api/server.py",
    )
    assert not [path for path in allowed if checker.is_browser_profile_path(path)]


def test_cli_scans_tracked_files() -> None:
    result = subprocess.run(
        [sys.executable, str(SCRIPT)],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0, result.stderr
