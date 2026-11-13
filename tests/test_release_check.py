"""Tests for the release gate orchestrator."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts" / "release_check.py"

_spec = importlib.util.spec_from_file_location("release_check", SCRIPT)
assert _spec and _spec.loader
release_check = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = release_check
_spec.loader.exec_module(release_check)


def test_gate_runs_lint_tests_and_live_smoke_in_order(monkeypatch) -> None:
    calls = []
    monkeypatch.setattr(release_check.subprocess, "run", lambda command, check: calls.append(command))
    assert release_check.main(["release_check.py"]) == 0
    assert calls == list(release_check.COMMANDS)
    assert calls[-1][-1] == "sonar,auto"


def test_gate_stops_on_first_failure(monkeypatch, capsys) -> None:
    calls = []

    def _run(command, check):
        calls.append(command)
        if command == release_check.COMMANDS[1]:
            raise subprocess.CalledProcessError(7, command)

    monkeypatch.setattr(release_check.subprocess, "run", _run)
    assert release_check.main(["release_check.py"]) == 7
    assert calls == list(release_check.COMMANDS[:2])
    assert "Release gate failed" in capsys.readouterr().err


def test_dry_run_runs_nothing(monkeypatch, capsys) -> None:
    monkeypatch.setattr(release_check.subprocess, "run", lambda *args, **kwargs: (_ for _ in ()).throw(AssertionError))
    assert release_check.main(["release_check.py", "--dry-run"]) == 0
    output = capsys.readouterr().out
    assert "scripts/live_smoke.py" in output
    assert "Dry run complete" in output
