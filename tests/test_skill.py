"""Tests for the skill command (cli/skill.py).

Uses tmp_path for all filesystem operations.
"""

from __future__ import annotations

import os
from pathlib import Path
import stat
from unittest.mock import patch

import pytest

from perplexity_web_mcp.cli.skill import (
    SKILL_DIR_NAME,
    SkillTarget,
    _get_installed_version,
    _get_targets,
    _hermes_home,
    _install_skill,
    _is_tool_installed,
    _uninstall_skill,
    cmd_skill,
)


# ============================================================================
# Fixtures
# ============================================================================


@pytest.fixture
def skill_source(tmp_path: Path) -> Path:
    """Create a minimal skill source directory."""
    source = tmp_path / "source" / SKILL_DIR_NAME
    source.mkdir(parents=True)
    skill_md = source / "SKILL.md"
    skill_md.write_text(
        '---\nname: querying-perplexity\ndescription: "test"\nmetadata:\n  version: "0.3.0"\n---\n# Test Skill\n'
    )
    refs = source / "references"
    refs.mkdir()
    (refs / "models.md").write_text("# Models\n")
    return source


@pytest.fixture
def dest_dir(tmp_path: Path) -> Path:
    """Create a destination directory."""
    d = tmp_path / "dest"
    d.mkdir()
    return d


# ============================================================================
# 1. _get_installed_version
# ============================================================================


class TestGetInstalledVersion:
    """Test version extraction from installed SKILL.md."""

    def test_returns_version_from_frontmatter(self, tmp_path: Path) -> None:
        skill_dir = tmp_path / SKILL_DIR_NAME
        skill_dir.mkdir()
        (skill_dir / "SKILL.md").write_text('---\nname: test\nmetadata:\n  version: "1.2.3"\n---\n')
        assert _get_installed_version(skill_dir) == "1.2.3"

    def test_returns_none_when_no_file(self, tmp_path: Path) -> None:
        assert _get_installed_version(tmp_path / "nope") is None

    def test_returns_none_when_no_version(self, tmp_path: Path) -> None:
        skill_dir = tmp_path / SKILL_DIR_NAME
        skill_dir.mkdir()
        (skill_dir / "SKILL.md").write_text("---\nname: test\n---\n")
        assert _get_installed_version(skill_dir) is None


# ============================================================================
# 2. _is_tool_installed
# ============================================================================


class TestIsToolInstalled:
    """Test the two-signal tool detection logic."""

    def test_detected_via_binary_on_path(self, tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
        bin_dir = tmp_path / "bin"
        bin_dir.mkdir()
        binary = bin_dir / "fake-tool.exe"
        binary.touch()
        binary.chmod(binary.stat().st_mode | stat.S_IXUSR)
        monkeypatch.setenv("PATH", str(bin_dir))

        target = SkillTarget(
            name="fake-tool",
            description="T",
            user_dir=Path("/nonexistent/skills"),
            project_dir=".fake/skills",
            binary=binary.name,
            root_dirs=[],
        )
        assert _is_tool_installed(target) is True

    def test_detected_via_root_dir(self, tmp_path: Path) -> None:
        root = tmp_path / ".fake-tool"
        root.mkdir()
        target = SkillTarget(
            name="fake-tool",
            description="T",
            user_dir=tmp_path / ".fake-tool" / "skills",
            project_dir=".fake/skills",
            binary="definitely-not-a-real-binary-xyz",
            root_dirs=[root],
        )
        assert _is_tool_installed(target) is True

    def test_not_detected_when_neither_signal(self) -> None:
        target = SkillTarget(
            name="fake-tool",
            description="T",
            user_dir=Path("/nonexistent/skills"),
            project_dir=".fake/skills",
            binary="definitely-not-a-real-binary-xyz",
            root_dirs=[Path("/nonexistent/root")],
        )
        assert _is_tool_installed(target) is False

    def test_no_binary_but_root_dir_exists(self, tmp_path: Path) -> None:
        root = tmp_path / ".tool-config"
        root.mkdir()
        target = SkillTarget(
            name="fake-tool",
            description="T",
            user_dir=tmp_path / ".tool-config" / "skills",
            project_dir=".fake/skills",
            root_dirs=[root],
        )
        assert _is_tool_installed(target) is True

    def test_empty_root_dirs_and_no_binary(self) -> None:
        target = SkillTarget(
            name="other",
            description="Export",
            user_dir=Path.home(),
            project_dir=".",
        )
        assert _is_tool_installed(target) is False


# ============================================================================
# 3. Platform helpers
# ============================================================================


class TestPlatformHelpers:
    """Test _hermes_home."""

    def test_hermes_home_default(self) -> None:
        env = {k: v for k, v in os.environ.items() if k != "HERMES_HOME"}
        with patch.dict("os.environ", env, clear=True):
            assert _hermes_home() == Path.home() / ".hermes"

    def test_hermes_home_custom_env(self, tmp_path: Path) -> None:
        with patch.dict("os.environ", {"HERMES_HOME": str(tmp_path / "custom-hermes")}):
            assert _hermes_home() == tmp_path / "custom-hermes"


# ============================================================================
# 4. Target registry
# ============================================================================


class TestGetTargets:
    """Test that _get_targets includes expected entries."""

    def test_hermes_target_exists(self) -> None:
        targets = _get_targets()
        names = [t.name for t in targets]
        assert "hermes" in names

    def test_hermes_target_paths(self) -> None:
        targets = _get_targets()
        hermes = next(t for t in targets if t.name == "hermes")
        assert hermes.binary == "hermes"
        assert hermes.project_dir == ".hermes/skills"
        assert len(hermes.root_dirs) == 1

    def test_all_targets_have_detection_metadata(self) -> None:
        """Every real tool (not 'other') should have either binary or root_dirs."""
        targets = _get_targets()
        for t in targets:
            if t.name == "other":
                continue
            has_signal = bool(t.binary) or bool(t.root_dirs)
            assert has_signal, f"{t.name} has no binary or root_dirs for detection"

    def test_list_shows_hermes(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["list"]) == 0
        out = capsys.readouterr().out
        assert "hermes" in out
        assert "Hermes Agent" in out


# ============================================================================
# 5. _install_skill / _uninstall_skill
# ============================================================================


class TestInstallUninstall:
    """Test skill file copy and removal."""

    def test_install_copies_files(self, skill_source: Path, dest_dir: Path) -> None:
        result = _install_skill(skill_source, dest_dir)
        assert result is True

        installed = dest_dir / SKILL_DIR_NAME
        assert installed.exists()
        assert (installed / "SKILL.md").exists()
        assert (installed / "references" / "models.md").exists()

    def test_install_overwrites_existing(self, skill_source: Path, dest_dir: Path) -> None:
        # Install once
        _install_skill(skill_source, dest_dir)

        # Modify installed file
        installed_skill = dest_dir / SKILL_DIR_NAME / "SKILL.md"
        installed_skill.write_text("modified")

        # Install again (should overwrite)
        _install_skill(skill_source, dest_dir)
        assert "modified" not in installed_skill.read_text()

    def test_install_failure_preserves_existing_skill(self, skill_source: Path, dest_dir: Path) -> None:
        _install_skill(skill_source, dest_dir)
        installed_skill = dest_dir / SKILL_DIR_NAME / "SKILL.md"
        original_content = installed_skill.read_text()

        with patch(
            "perplexity_web_mcp.cli.skill.shutil.copytree",
            side_effect=OSError("access denied"),
        ):
            assert _install_skill(skill_source, dest_dir) is False

        assert installed_skill.read_text() == original_content
        assert (dest_dir / SKILL_DIR_NAME / "references" / "models.md").exists()

    def test_install_customizes_staged_readonly_skill_before_promotion(
        self, skill_source: Path, dest_dir: Path
    ) -> None:
        source_skill = skill_source / "SKILL.md"
        source_skill.chmod(stat.S_IREAD)

        try:
            assert _install_skill(skill_source, dest_dir, {"type": "tool", "status": "approved"}) is True
        finally:
            source_skill.chmod(source_skill.stat().st_mode | stat.S_IWRITE)

        installed_text = (dest_dir / SKILL_DIR_NAME / "SKILL.md").read_text()
        assert "type: tool" in installed_text
        assert "status: approved" in installed_text
        assert list(dest_dir.glob(f".{SKILL_DIR_NAME}-*")) == []

    def test_install_frontmatter_failure_preserves_existing_skill(self, skill_source: Path, dest_dir: Path) -> None:
        installed = dest_dir / SKILL_DIR_NAME
        references = installed / "references"
        references.mkdir(parents=True)
        installed_skill = installed / "SKILL.md"
        installed_skill.write_text("old skill")
        (references / "models.md").write_text("old reference")

        with patch(
            "perplexity_web_mcp.cli.skill._inject_frontmatter_extras",
            side_effect=ValueError("invalid frontmatter"),
        ):
            assert _install_skill(skill_source, dest_dir, {"type": "tool"}) is False

        assert installed_skill.read_text() == "old skill"
        assert (references / "models.md").read_text() == "old reference"
        assert list(dest_dir.glob(f".{SKILL_DIR_NAME}-*")) == []

    def test_uninstall_removes_directory(self, skill_source: Path, dest_dir: Path) -> None:
        _install_skill(skill_source, dest_dir)
        installed = dest_dir / SKILL_DIR_NAME
        assert installed.exists()

        result = _uninstall_skill(dest_dir)
        assert result is True
        assert not installed.exists()

    def test_uninstall_routes_through_readonly_safe_removal(self, skill_source: Path, dest_dir: Path) -> None:
        _install_skill(skill_source, dest_dir)
        installed = dest_dir / SKILL_DIR_NAME

        with patch("perplexity_web_mcp.cli.skill._remove_tree") as remove_tree:
            assert _uninstall_skill(dest_dir) is True

        remove_tree.assert_called_once_with(installed)

    def test_uninstall_removes_readonly_tree(self, skill_source: Path, dest_dir: Path) -> None:
        _install_skill(skill_source, dest_dir)
        installed = dest_dir / SKILL_DIR_NAME
        readonly_files = [installed / "SKILL.md", installed / "references" / "models.md"]
        for path in readonly_files:
            path.chmod(stat.S_IREAD)

        try:
            assert _uninstall_skill(dest_dir) is True
            assert not installed.exists()
        finally:
            for path in readonly_files:
                if path.exists():
                    path.chmod(path.stat().st_mode | stat.S_IWRITE)

    def test_uninstall_returns_false_when_not_installed(self, dest_dir: Path) -> None:
        assert _uninstall_skill(dest_dir) is False


# ============================================================================
# 6. cmd_skill routing
# ============================================================================


class TestCmdSkill:
    """Test the cmd_skill CLI handler."""

    def test_help_returns_0(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["--help"]) == 0
        assert "Manage Perplexity Web MCP skill" in capsys.readouterr().out

    def test_no_args_returns_0(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill([]) == 0

    def test_list_returns_0(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["list"]) == 0
        out = capsys.readouterr().out
        assert "claude-code" in out
        assert "cursor" in out

    @patch("perplexity_web_mcp.cli.skill._find_skill_source")
    def test_show_displays_skill(
        self, mock_source: pytest.CaptureFixture, tmp_path: Path, capsys: pytest.CaptureFixture
    ) -> None:
        skill_dir = tmp_path / SKILL_DIR_NAME
        skill_dir.mkdir()
        (skill_dir / "SKILL.md").write_text("# My Skill Content")
        mock_source.return_value = skill_dir  # type: ignore

        assert cmd_skill(["show"]) == 0
        assert "My Skill Content" in capsys.readouterr().out

    def test_install_missing_tool_shows_usage(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["install"]) == 0
        assert "Usage:" in capsys.readouterr().out

    def test_install_unknown_tool_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["install", "nonexistent"]) == 1
        assert "Unknown tool" in capsys.readouterr().err

    @patch("perplexity_web_mcp.cli.skill._find_skill_source", return_value=None)
    def test_install_no_source_returns_1(self, mock_src, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["install", "claude-code"]) == 1
        assert "Could not find" in capsys.readouterr().err

    def test_unknown_action_returns_1(self, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["bogus"]) == 1

    @patch("perplexity_web_mcp.cli.skill._find_skill_source", return_value=None)
    def test_update_no_source_returns_1(self, mock_src, capsys: pytest.CaptureFixture) -> None:
        assert cmd_skill(["update"]) == 1

    @patch("perplexity_web_mcp.cli.skill._find_skill_source")
    @patch("perplexity_web_mcp.cli.skill._get_targets")
    @patch("perplexity_web_mcp.cli.skill._get_current_version", return_value="0.4.0")
    def test_update_finds_outdated(
        self, mock_ver, mock_targets, mock_source, tmp_path: Path, capsys: pytest.CaptureFixture
    ) -> None:
        # Set up a fake installed skill with old version
        user_dir = tmp_path / "skills"
        skill_dir = user_dir / SKILL_DIR_NAME
        skill_dir.mkdir(parents=True)
        (skill_dir / "SKILL.md").write_text('---\nname: test\nmetadata:\n  version: "0.3.0"\n---\n')

        # Set up source
        source_dir = tmp_path / "source" / SKILL_DIR_NAME
        source_dir.mkdir(parents=True)
        (source_dir / "SKILL.md").write_text('---\nname: test\nmetadata:\n  version: "0.4.0"\n---\n')
        mock_source.return_value = source_dir

        mock_targets.return_value = [
            SkillTarget(
                name="test-tool",
                description="T",
                user_dir=user_dir,
                project_dir=".test/skills",
                frontmatter_extras={"type": "tool"},
            ),
        ]

        assert cmd_skill(["update"]) == 0
        out = capsys.readouterr().out
        assert "Updated" in out
        assert "0.3.0" in out
        assert "0.4.0" in out
        assert "type: tool" in (skill_dir / "SKILL.md").read_text()

    @patch("perplexity_web_mcp.cli.skill._find_skill_source")
    @patch("perplexity_web_mcp.cli.skill._get_targets")
    @patch("perplexity_web_mcp.cli.skill._get_current_version", return_value="0.4.0")
    def test_update_reports_failure_and_preserves_skill(
        self, mock_ver, mock_targets, mock_source, tmp_path: Path, capsys: pytest.CaptureFixture
    ) -> None:
        user_dir = tmp_path / "skills"
        skill_dir = user_dir / SKILL_DIR_NAME
        skill_dir.mkdir(parents=True)
        installed_skill = skill_dir / "SKILL.md"
        installed_skill.write_text('---\nname: test\nmetadata:\n  version: "0.3.0"\n---\n')
        original_content = installed_skill.read_text()

        source_dir = tmp_path / "source" / SKILL_DIR_NAME
        source_dir.mkdir(parents=True)
        (source_dir / "SKILL.md").write_text('---\nname: test\nmetadata:\n  version: "0.4.0"\n---\n')
        mock_source.return_value = source_dir
        mock_targets.return_value = [
            SkillTarget(name="test-tool", description="T", user_dir=user_dir, project_dir=".test/skills"),
        ]

        with patch(
            "perplexity_web_mcp.cli.skill.shutil.copytree",
            side_effect=OSError("access denied"),
        ):
            assert cmd_skill(["update"]) == 1

        out = capsys.readouterr().out
        assert "Failed: test-tool" in out
        assert "All installed skills are up to date" not in out
        assert installed_skill.read_text() == original_content
