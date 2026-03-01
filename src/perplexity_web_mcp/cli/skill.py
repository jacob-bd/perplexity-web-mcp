"""Skill management for AI tools.

Installs/uninstalls the perplexity-web-mcp Agent Skill (SKILL.md + references)
to the appropriate location for each supported AI platform.
"""

from __future__ import annotations

import shutil
import sys
from dataclasses import dataclass
from importlib import metadata
from pathlib import Path


SKILL_DIR_NAME = "perplexity-web-mcp"


@dataclass(frozen=True)
class SkillTarget:
    """A platform that supports Agent Skills."""

    name: str
    description: str
    user_dir: Path
    project_dir: str


def _home() -> Path:
    return Path.home()


def _get_targets() -> list[SkillTarget]:
    """Return the list of platforms that support skills."""
    home = _home()
    return [
        SkillTarget(
            name="claude-code",
            description="Claude Code CLI and Desktop",
            user_dir=home / ".claude" / "skills",
            project_dir=".claude/skills",
        ),
        SkillTarget(
            name="cursor",
            description="Cursor AI editor",
            user_dir=home / ".cursor" / "skills",
            project_dir=".cursor/skills",
        ),
        SkillTarget(
            name="codex",
            description="OpenAI Codex CLI",
            user_dir=home / ".codex" / "skills",
            project_dir=".codex/skills",
        ),
        SkillTarget(
            name="opencode",
            description="OpenCode AI assistant",
            user_dir=home / ".config" / "opencode" / "skills",
            project_dir=".opencode/skills",
        ),
        SkillTarget(
            name="gemini-cli",
            description="Google Gemini CLI",
            user_dir=home / ".gemini" / "skills",
            project_dir=".gemini/skills",
        ),
        SkillTarget(
            name="antigravity",
            description="Google Antigravity IDE",
            user_dir=home / ".gemini" / "antigravity" / "skills",
            project_dir=".agent/skills",
        ),
        SkillTarget(
            name="cline",
            description="Cline CLI terminal agent",
            user_dir=home / ".cline" / "skills",
            project_dir=".cline/skills",
        ),
        SkillTarget(
            name="openclaw",
            description="OpenClaw AI agent framework",
            user_dir=home / ".openclaw" / "workspace" / "skills",
            project_dir=".openclaw/workspace/skills",
        ),
    ]


def _find_skill_source() -> Path | None:
    """Find the bundled skill source directory.

    Search order:
    1. Package data/ directory (works for pip/pipx installs)
    2. Project root skills/ directory (works for editable / git clone installs)
    3. Current working directory skills/ (fallback)
    """
    # 1. Inside the installed package: src/perplexity_web_mcp/data/
    pkg_data = Path(__file__).resolve().parent.parent / "data"
    if (pkg_data / "SKILL.md").exists():
        return pkg_data

    # 2. Project root (editable install): ../../skills/perplexity-web-mcp/
    pkg_root = Path(__file__).resolve().parent.parent.parent.parent
    candidate = pkg_root / "skills" / SKILL_DIR_NAME
    if (candidate / "SKILL.md").exists():
        return candidate

    # 3. Current working directory
    cwd_candidate = Path.cwd() / "skills" / SKILL_DIR_NAME
    if (cwd_candidate / "SKILL.md").exists():
        return cwd_candidate

    return None


def _get_installed_version(target_dir: Path) -> str | None:
    """Read version from installed SKILL.md frontmatter."""
    skill_file = target_dir / "SKILL.md"
    if not skill_file.exists():
        return None
    try:
        text = skill_file.read_text(encoding="utf-8")
        for line in text.split("\n"):
            line = line.strip()
            if line.startswith("version:"):
                return line.split(":", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    return None


def _get_current_version() -> str:
    """Get the current package version."""
    try:
        return metadata.version("perplexity-web-mcp-cli")
    except metadata.PackageNotFoundError:
        return "unknown"


def _install_skill(source: Path, dest_dir: Path) -> bool:
    """Copy skill files to the destination directory."""
    try:
        target = dest_dir / SKILL_DIR_NAME
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(source, target)
        return True
    except OSError as e:
        print(f"  Error: {e}", file=sys.stderr)
        return False


def _uninstall_skill(dest_dir: Path) -> bool:
    """Remove skill files from the destination directory."""
    target = dest_dir / SKILL_DIR_NAME
    if not target.exists():
        return False
    try:
        shutil.rmtree(target)
        return True
    except OSError as e:
        print(f"  Error: {e}", file=sys.stderr)
        return False


# ---------------------------------------------------------------------------
# Public CLI handler
# ---------------------------------------------------------------------------

def cmd_skill(args: list[str]) -> int:
    """Handle: pwm skill [install|uninstall|list|show] [tool] [--level user|project]"""
    if not args or args[0] in ("--help", "-h"):
        print(
            "pwm skill - Manage Perplexity Web MCP skill for AI tools\n"
            "\n"
            "Usage:\n"
            "  pwm skill list                          Show tools and installation status\n"
            "  pwm skill install <tool>                Install skill for a tool\n"
            "  pwm skill install <tool> --level project  Install at project level\n"
            "  pwm skill uninstall <tool>              Remove installed skill\n"
            "  pwm skill show                          Display the skill content\n"
            "  pwm skill update                        Update all outdated skills\n"
            "\n"
            "Tools: claude-code, cursor, codex, opencode, gemini-cli, antigravity, cline, openclaw\n"
            "\n"
            "Examples:\n"
            "  pwm skill list\n"
            "  pwm skill install claude-code\n"
            "  pwm skill install cursor --level project\n"
            "  pwm skill uninstall gemini-cli\n"
            "  pwm skill update\n"
        )
        return 0

    action = args[0]
    targets = _get_targets()
    target_map = {t.name: t for t in targets}
    current_version = _get_current_version()

    if action == "list":
        print("\nPerplexity Web MCP Skill Installation Status\n")
        print(f"{'Tool':<16} {'Description':<32} {'User':<14} {'Project'}")
        print(f"{'─' * 16} {'─' * 32} {'─' * 14} {'─' * 10}")

        any_outdated = False
        for t in targets:
            user_ver = _get_installed_version(t.user_dir / SKILL_DIR_NAME)
            proj_dir = Path.cwd() / t.project_dir / SKILL_DIR_NAME
            proj_ver = _get_installed_version(proj_dir)

            if user_ver:
                user_status = f"✓ (v{user_ver})"
                if user_ver != current_version:
                    any_outdated = True
            else:
                user_status = "  -  "

            proj_status = f"✓ (v{proj_ver})" if proj_ver else "  -  "

            print(f"{t.name:<16} {t.description:<32} {user_status:<14} {proj_status}")

        print(f"\nLegend: ✓ = installed, - = not installed")
        if any_outdated:
            print(f"Some skills are outdated (current: v{current_version}). Run 'pwm skill update' to update.")
        return 0

    if action == "show":
        source = _find_skill_source()
        if source is None:
            print("Error: Could not find skill source files.", file=sys.stderr)
            return 1
        skill_file = source / "SKILL.md"
        print(skill_file.read_text(encoding="utf-8"))
        return 0

    if action in ("install", "uninstall"):
        if len(args) < 2:
            print(f"Error: pwm skill {action} requires a tool name.", file=sys.stderr)
            print(f"Available: {', '.join(target_map.keys())}", file=sys.stderr)
            return 1

        tool_name = args[1]
        if tool_name not in target_map:
            print(f"Error: Unknown tool '{tool_name}'.", file=sys.stderr)
            print(f"Available: {', '.join(target_map.keys())}", file=sys.stderr)
            return 1

        target = target_map[tool_name]
        level = "user"
        if "--level" in args:
            idx = args.index("--level")
            if idx + 1 < len(args):
                level = args[idx + 1]

        if action == "install":
            source = _find_skill_source()
            if source is None:
                print("Error: Could not find skill source files.", file=sys.stderr)
                print("Make sure you're running from the project root or the package is installed.", file=sys.stderr)
                return 1

            if level == "project":
                dest = Path.cwd() / target.project_dir
            else:
                dest = target.user_dir

            dest.mkdir(parents=True, exist_ok=True)
            if _install_skill(source, dest):
                print(f"  {tool_name}: Skill installed (v{current_version}) at {dest / SKILL_DIR_NAME}")
                return 0
            return 1

        if action == "uninstall":
            removed = False
            for dest in [target.user_dir, Path.cwd() / target.project_dir]:
                if _uninstall_skill(dest):
                    print(f"  {tool_name}: Skill removed from {dest / SKILL_DIR_NAME}")
                    removed = True
            if not removed:
                print(f"  {tool_name}: No skill installed.")
            return 0

    if action == "update":
        source = _find_skill_source()
        if source is None:
            print("Error: Could not find skill source files.", file=sys.stderr)
            return 1

        updated = 0
        for t in targets:
            seen_dests = set()
            for dest in [t.user_dir, Path.cwd() / t.project_dir]:
                abs_path = str(dest.absolute())
                if abs_path in seen_dests:
                    continue
                seen_dests.add(abs_path)

                installed_ver = _get_installed_version(dest / SKILL_DIR_NAME)
                if installed_ver and installed_ver != current_version:
                    if _install_skill(source, dest):
                        print(f"  {t.name}: Updated v{installed_ver} -> v{current_version}")
                        updated += 1

        if updated == 0:
            print("  All installed skills are up to date.")
        else:
            print(f"\n  Updated {updated} skill(s) to v{current_version}.")
        return 0

    print(f"Unknown skill action: {action}", file=sys.stderr)
    return 1
