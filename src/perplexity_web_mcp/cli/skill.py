"""Skill management for AI tools.

Installs/uninstalls the perplexity-web-mcp Agent Skill (SKILL.md + references)
to the appropriate location for each supported AI platform.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from importlib import metadata
import os
from pathlib import Path
import re
import shutil
import stat
import sys
import tempfile
import uuid


SKILL_DIR_NAME = "perplexity-web-mcp"


def _hermes_home() -> Path:
    """Resolve the Hermes root directory, respecting $HERMES_HOME."""
    return Path(os.environ.get("HERMES_HOME", Path.home() / ".hermes"))


@dataclass(frozen=True)
class SkillTarget:
    """A platform that supports Agent Skills."""

    name: str
    description: str
    user_dir: Path
    project_dir: str
    binary: str | None = None
    root_dirs: list[Path] = field(default_factory=list)
    frontmatter_extras: dict[str, str] | None = None


def _get_targets() -> list[SkillTarget]:
    """Return the list of platforms that support skills."""
    home = Path.home()
    hm_root = _hermes_home()
    return [
        SkillTarget(
            name="claude-code",
            description="Claude Code CLI and Desktop",
            user_dir=home / ".claude" / "skills",
            project_dir=".claude/skills",
            binary="claude",
            root_dirs=[home / ".claude"],
        ),
        SkillTarget(
            name="cursor",
            description="Cursor AI editor",
            user_dir=home / ".cursor" / "skills",
            project_dir=".cursor/skills",
            binary="cursor",
            root_dirs=[home / ".cursor"],
        ),
        SkillTarget(
            name="codex",
            description="OpenAI Codex CLI",
            user_dir=home / ".agents" / "skills",
            project_dir=".agents/skills",
            binary="codex",
            root_dirs=[home / ".codex", home / ".agents"],
        ),
        SkillTarget(
            name="opencode",
            description="OpenCode AI assistant",
            user_dir=home / ".config" / "opencode" / "skills",
            project_dir=".opencode/skills",
            binary="opencode",
            root_dirs=[home / ".config" / "opencode"],
        ),
        SkillTarget(
            name="gemini-cli",
            description="Google Gemini CLI",
            user_dir=home / ".agents" / "skills",
            project_dir=".agents/skills",
            binary="gemini",
            root_dirs=[home / ".agents", home / ".gemini"],
        ),
        SkillTarget(
            name="antigravity",
            description="Google Antigravity IDE",
            user_dir=home / ".gemini" / "antigravity" / "skills",
            project_dir=".agent/skills",
            root_dirs=[home / ".gemini" / "antigravity"],
        ),
        SkillTarget(
            name="cline",
            description="Cline CLI terminal agent",
            user_dir=home / ".cline" / "skills",
            project_dir=".cline/skills",
            binary="cline",
            root_dirs=[home / ".cline"],
        ),
        SkillTarget(
            name="openclaw",
            description="OpenClaw AI agent framework",
            user_dir=home / ".openclaw" / "workspace" / "skills",
            project_dir=".openclaw/workspace/skills",
            binary="openclaw",
            root_dirs=[home / ".openclaw"],
        ),
        SkillTarget(
            name="alef-agent",
            description="Alef Agent AI framework",
            user_dir=home / ".alef-agent" / "workspace" / "skills",
            project_dir=".alef-agent/workspace/skills",
            root_dirs=[home / ".alef-agent"],
            frontmatter_extras={"type": "tool", "status": "approved"},
        ),
        SkillTarget(
            name="hermes",
            description="Hermes Agent (NousResearch)",
            user_dir=hm_root / "skills",
            project_dir=".hermes/skills",
            binary="hermes",
            root_dirs=[hm_root],
        ),
        SkillTarget(
            name="other",
            description="Export all formats for manual install",
            user_dir=home,  # not used for export
            project_dir=".",
        ),
    ]


def _is_tool_installed(target: SkillTarget) -> bool:
    """Detect whether a tool is actually installed on this system.

    Checks two signals (either is sufficient):
    1. Binary on PATH (e.g. ``claude``, ``cursor``, ``opencode``, ``hermes``)
    2. Tool's root config directory exists (e.g. ``~/.claude``, ``~/.cursor``)
    """
    if target.binary and shutil.which(target.binary):
        return True

    return any(root_dir.is_dir() for root_dir in target.root_dirs)


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
        in_frontmatter = False
        for raw_line in text.split("\n"):
            stripped = raw_line.strip()
            if stripped == "---":
                if not in_frontmatter:
                    in_frontmatter = True
                    continue
                break  # closing --- reached
            if stripped.startswith("version:"):
                return stripped.split(":", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    return None


def _get_current_version() -> str:
    """Get the current package version."""
    try:
        return metadata.version("perplexity-web-mcp-cli")
    except metadata.PackageNotFoundError:
        return "unknown"


def _remove_tree(path: Path) -> None:
    """Remove a directory tree, clearing Windows read-only attributes when needed."""

    def handle_remove_error(func, failed_path, _exc_info) -> None:
        try:
            Path(failed_path).chmod(stat.S_IREAD | stat.S_IWRITE)
        except OSError:
            pass
        func(failed_path)

    shutil.rmtree(path, onerror=handle_remove_error)


def _install_skill(
    source: Path,
    dest_dir: Path,
    frontmatter_extras: dict[str, str] | None = None,
) -> bool:
    """Copy and customize skill files without exposing a partial replacement."""
    target = dest_dir / SKILL_DIR_NAME
    staging_root: Path | None = None
    backup: Path | None = None
    target_moved = False

    try:
        staging_root = Path(tempfile.mkdtemp(prefix=f".{SKILL_DIR_NAME}-", dir=dest_dir))
        staging = staging_root / SKILL_DIR_NAME
        shutil.copytree(source, staging)
        if frontmatter_extras:
            staged_skill = staging / "SKILL.md"
            staged_skill.chmod(staged_skill.stat().st_mode | stat.S_IWRITE)
            _inject_frontmatter_extras(staged_skill, frontmatter_extras)

        if target.exists():
            backup = dest_dir / f".{SKILL_DIR_NAME}.backup-{uuid.uuid4().hex}"
            target.replace(backup)
            target_moved = True

        staging.replace(target)

        if backup is not None and backup.exists():
            try:
                _remove_tree(backup)
            except OSError as e:
                print(f"  Warning: could not remove previous skill backup: {e}", file=sys.stderr)
        return True
    except (OSError, UnicodeError, ValueError) as e:
        if target_moved and backup is not None and backup.exists():
            try:
                if target.exists():
                    _remove_tree(target)
                backup.replace(target)
            except OSError as restore_error:
                print(f"  Error restoring previous skill: {restore_error}", file=sys.stderr)
        print(f"  Error: {e}", file=sys.stderr)
        return False
    finally:
        if staging_root is not None and staging_root.exists():
            try:
                _remove_tree(staging_root)
            except OSError as e:
                print(f"  Warning: could not remove temporary skill directory: {e}", file=sys.stderr)


def _inject_frontmatter_extras(skill_path: Path, extras: dict[str, str]) -> None:
    """Inject extra frontmatter fields into SKILL.md for target-specific compatibility.

    Used to add fields like ``type: tool`` and ``status: approved`` for Alef Agent.
    Only called when a SkillTarget defines ``frontmatter_extras``.
    """
    if not skill_path.exists():
        return
    content = skill_path.read_text(encoding="utf-8")
    if not content.startswith("---"):
        return

    end_idx = content.index("---", 3)
    frontmatter = content[3:end_idx]

    for key, value in extras.items():
        # Remove any existing line for this key
        frontmatter = re.sub(rf"\n{re.escape(key)}:.*", "", frontmatter)
        # Append the field
        frontmatter = frontmatter.rstrip() + f"\n{key}: {value}\n"

    content = "---" + frontmatter + "---" + content[end_idx + 3 :]
    skill_path.write_text(content, encoding="utf-8")


def _uninstall_skill(dest_dir: Path) -> bool:
    """Remove skill files from the destination directory."""
    target = dest_dir / SKILL_DIR_NAME
    if not target.exists():
        return False
    try:
        _remove_tree(target)
        return True
    except OSError as e:
        print(f"  Error: {e}", file=sys.stderr)
        return False


EXPORT_DIR_NAME = "perplexity-web-mcp-skill-export"


def _export_all_formats(source: Path, current_version: str) -> int:
    """Export all skill formats to a directory for manual installation."""
    export_dir = Path.cwd() / EXPORT_DIR_NAME

    if export_dir.exists():
        shutil.rmtree(export_dir)

    export_dir.mkdir(parents=True, exist_ok=True)

    skill_dir = export_dir / SKILL_DIR_NAME
    shutil.copytree(source, skill_dir)

    readme_content = f"""# Perplexity Web MCP Skill Export (v{current_version})

This directory contains the Perplexity Web MCP skill for manual installation.

## perplexity-web-mcp/

- `SKILL.md` - Main skill file
- `references/` - Additional reference documentation

## Installation

Copy the `{SKILL_DIR_NAME}/` directory to the appropriate location:

### Claude Code
```bash
cp -r {SKILL_DIR_NAME} ~/.claude/skills/
```

### Cursor
```bash
cp -r {SKILL_DIR_NAME} ~/.cursor/skills/
```

### OpenAI Codex CLI
```bash
cp -r {SKILL_DIR_NAME} ~/.agents/skills/
```

### OpenCode
```bash
cp -r {SKILL_DIR_NAME} ~/.config/opencode/skills/
```

### Gemini CLI
```bash
cp -r {SKILL_DIR_NAME} ~/.agents/skills/
```

### Antigravity
```bash
cp -r {SKILL_DIR_NAME} ~/.gemini/antigravity/skills/
```

### Cline CLI
```bash
cp -r {SKILL_DIR_NAME} ~/.cline/skills/
```

### OpenClaw
```bash
cp -r {SKILL_DIR_NAME} ~/.openclaw/workspace/skills/
```

### Alef Agent
```bash
cp -r {SKILL_DIR_NAME} ~/.alef-agent/workspace/skills/
```

### Hermes Agent
```bash
cp -r {SKILL_DIR_NAME} ~/.hermes/skills/
```

## Automated Installation

Instead of manual copying, you can use:
```bash
pwm skill install <tool>
```

Where `<tool>` is: claude-code, cursor, codex, opencode, gemini-cli, antigravity, cline, openclaw, alef-agent, hermes.
"""

    (export_dir / "README.md").write_text(readme_content)

    print(f"  Exported all formats to {export_dir}")
    print(f"    {SKILL_DIR_NAME}/SKILL.md")
    print(f"    {SKILL_DIR_NAME}/references/")
    print("    README.md (installation instructions)")
    return 0


def _install_all(targets: list[SkillTarget], current_version: str) -> int:
    """Install skill to all detected tools on the system."""
    source = _find_skill_source()
    if source is None:
        print("Error: Could not find skill source files.", file=sys.stderr)
        return 1

    detected: list[SkillTarget] = []
    not_detected: list[str] = []

    for t in targets:
        if t.name == "other":
            continue
        if _is_tool_installed(t):
            detected.append(t)
        else:
            not_detected.append(t.name)

    if not detected:
        print("  No supported tools detected on this system.")
        print("  (No binary on PATH and no config directory found for any tool)")
        return 0

    installed: list[str] = []
    skipped: list[str] = []
    failed: list[str] = []

    for t in detected:
        existing_ver = _get_installed_version(t.user_dir / SKILL_DIR_NAME)
        if existing_ver == current_version:
            skipped.append(t.name)
            continue
        t.user_dir.mkdir(parents=True, exist_ok=True)
        if _install_skill(source, t.user_dir, t.frontmatter_extras):
            if existing_ver:
                print(f"  ✓ {t.name}: v{existing_ver} → v{current_version}")
            else:
                print(f"  ✓ {t.name}: Installed v{current_version}")
            installed.append(t.name)
        else:
            failed.append(t.name)

    print()
    if installed:
        print(f"  Installed: {', '.join(installed)}")
    if skipped:
        print(f"  Already current: {', '.join(skipped)}")
    if not_detected:
        print(f"  Not detected: {', '.join(not_detected)}")
    if failed:
        print(f"  Failed: {', '.join(failed)}")

    total = len(installed)
    if total:
        print(f"\n  Installed skill to {total} tool(s) (v{current_version}).")
    else:
        print(f"\n  All detected tools already have v{current_version}.")
    return 1 if failed else 0


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
            "  pwm skill install all                   Install for all detected tools\n"
            "  pwm skill install <tool> --level project  Install at project level\n"
            "  pwm skill uninstall <tool>              Remove installed skill\n"
            "  pwm skill show                          Display the skill content\n"
            "  pwm skill update                        Update all outdated skills\n"
            "\n"
            "Tools: claude-code, cursor, codex, opencode, gemini-cli, antigravity, cline, openclaw, alef-agent, hermes, other, all\n"
            "\n"
            "Examples:\n"
            "  pwm skill list\n"
            "  pwm skill install all\n"
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
            if t.name == "other":
                continue
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

        print("\nLegend: ✓ = installed, - = not installed")
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
        if len(args) < 2 or args[1] in ("--help", "-h"):
            avail = f"{', '.join(target_map.keys())}"
            if action == "install":
                avail += ", all"
            print(f"Usage: pwm skill {action} <tool>")
            print(f"Available: {avail}")
            return 0

        tool_name = args[1]

        if action == "install" and tool_name == "all":
            return _install_all(targets, current_version)

        if tool_name not in target_map:
            print(f"Error: Unknown tool '{tool_name}'.", file=sys.stderr)
            print(f"Available: {', '.join(target_map.keys())}, all", file=sys.stderr)
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

            if tool_name == "other":
                return _export_all_formats(source, current_version)

            if level == "project":
                dest = Path.cwd() / target.project_dir
            else:
                dest = target.user_dir

            dest.mkdir(parents=True, exist_ok=True)
            if _install_skill(source, dest, target.frontmatter_extras):
                print(f"  {tool_name}: Skill installed (v{current_version}) at {dest / SKILL_DIR_NAME}")
                return 0
            return 1

        if action == "uninstall":
            if tool_name == "other":
                export_dir = Path.cwd() / EXPORT_DIR_NAME
                if export_dir.exists():
                    shutil.rmtree(export_dir)
                    print(f"  other: Removed export directory {export_dir}")
                else:
                    print("  other: No export directory found.")
                return 0

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

        updated_tools: list[str] = []
        current_tools: list[str] = []
        not_installed: list[str] = []
        failed_tools: list[str] = []

        for t in targets:
            seen_dests = set()
            tool_installed = False
            for dest in [t.user_dir, Path.cwd() / t.project_dir]:
                abs_path = str(dest.absolute())
                if abs_path in seen_dests:
                    continue
                seen_dests.add(abs_path)

                installed_ver = _get_installed_version(dest / SKILL_DIR_NAME)
                if not installed_ver:
                    continue
                tool_installed = True
                if installed_ver != current_version:
                    if _install_skill(source, dest, t.frontmatter_extras):
                        level = "project" if str(Path.cwd()) in abs_path else "user"
                        print(f"  ✓ {t.name} ({level}): v{installed_ver} → v{current_version}")
                        updated_tools.append(t.name)
                    else:
                        level = "project" if str(Path.cwd()) in abs_path else "user"
                        failed_tools.append(f"{t.name} ({level})")
                else:
                    current_tools.append(t.name)

            if not tool_installed:
                not_installed.append(t.name)

        print()
        if updated_tools:
            print(f"  Updated: {', '.join(updated_tools)}")
        if current_tools:
            print(f"  Already current: {', '.join(current_tools)}")
        if not_installed:
            print(f"  Not installed: {', '.join(not_installed)}")
        if failed_tools:
            print(f"  Failed: {', '.join(failed_tools)}")

        if failed_tools:
            print(f"\n  Failed to update {len(failed_tools)} skill installation(s).")
        elif not updated_tools:
            print(f"\n  All installed skills are up to date (v{current_version}).")
        else:
            print(f"\n  Updated {len(updated_tools)} tool(s) to v{current_version}.")
        return 1 if failed_tools else 0

    print(f"Unknown skill action: {action}", file=sys.stderr)
    return 1
