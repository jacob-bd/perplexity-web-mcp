"""Tests for the live release smoke harness."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import sys

import pytest


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts" / "live_smoke.py"

_spec = importlib.util.spec_from_file_location("live_smoke", SCRIPT)
assert _spec and _spec.loader
live_smoke = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = live_smoke
_spec.loader.exec_module(live_smoke)


def test_dry_run_resolves_free_tier_cases(capsys) -> None:
    assert live_smoke.main(["live_smoke.py", "--dry-run"]) == 0
    output = capsys.readouterr().out
    assert "sonar -> experimental" in output
    assert "auto -> auto" in output


def test_all_cases_pass_when_marker_returns(monkeypatch) -> None:
    monkeypatch.setattr(live_smoke, "ask", lambda query, model: f"{live_smoke.MARKER}")
    assert live_smoke.main(["live_smoke.py"]) == 0


def test_missing_marker_fails(monkeypatch, capsys) -> None:
    monkeypatch.setattr(live_smoke, "ask", lambda query, model: "wrong answer")
    assert live_smoke.main(["live_smoke.py", "--models", "sonar"]) == 1
    assert "missing PWM_SMOKE_OK" in capsys.readouterr().out


def test_exception_fails_without_stopping_other_cases(monkeypatch, capsys) -> None:
    calls = []

    def _ask(query, model):
        calls.append(model.identifier)
        if model.identifier == "experimental":
            raise RuntimeError("expired session")
        return live_smoke.MARKER

    monkeypatch.setattr(live_smoke, "ask", _ask)
    assert live_smoke.main(["live_smoke.py"]) == 1
    assert calls == ["experimental", "auto"]
    assert "expired session" in capsys.readouterr().out


def test_unknown_case_is_a_usage_error(monkeypatch, capsys) -> None:
    monkeypatch.setattr(live_smoke, "ask", pytest.fail)
    assert live_smoke.main(["live_smoke.py", "--models", "gpt61_sol"]) == 2
    assert "Unknown or empty smoke case" in capsys.readouterr().err
