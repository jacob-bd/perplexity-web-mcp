"""MCP server setup for AI tools.

Handles adding/removing the perplexity-web-mcp MCP server configuration
to various AI tool config files (Claude Code, Claude Desktop, Cursor, etc.).
"""

from __future__ import annotations

import json
import platform
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


MCP_SERVER_NAME = "perplexity"
MCP_COMMAND = "pwm-mcp"
MCP_PACKAGE = "perplexity-web-mcp-cli"


@dataclass(frozen=True)
class AITool:
    """An AI tool that supports MCP server configuration."""

    name: str
    description: str
    config_path: Path | None
    config_hint: str
    uses_cli: bool = False


def _home() -> Path:
    return Path.home()


def _get_tools() -> list[AITool]:
    """Return the list of supported AI tools with their config paths."""
    home = _home()
    return [
        AITool(
            name="claude-code",
            description="Anthropic Claude Code CLI",
            config_path=None,
            config_hint="claude mcp list",
            uses_cli=True,
        ),
        AITool(
            name="claude-desktop",
            description="Claude desktop application",
            config_path=home / "Library" / "Application Support" / "Claude" / "claude_desktop_config.json",
            config_hint=str(home / "Library/Application Support/Claude/claude_desktop_config.json"),
        ),
        AITool(
            name="gemini",
            description="Google Gemini CLI",
            config_path=home / ".gemini" / "settings.json",
            config_hint=str(home / ".gemini/settings.json"),
        ),
        AITool(
            name="cursor",
            description="Cursor AI editor",
            config_path=home / ".cursor" / "mcp.json",
            config_hint=str(home / ".cursor/mcp.json"),
        ),
        AITool(
            name="windsurf",
            description="Codeium Windsurf editor",
            config_path=home / ".codeium" / "windsurf" / "mcp_config.json",
            config_hint=str(home / ".codeium/windsurf/mcp_config.json"),
        ),
        AITool(
            name="cline",
            description="Cline CLI terminal agent",
            config_path=home / ".cline" / "data" / "settings" / "cline_mcp_settings.json",
            config_hint=str(home / ".cline/data/settings/cline_mcp_settings.json"),
        ),
        AITool(
            name="antigravity",
            description="Google Antigravity AI IDE",
            config_path=home / ".gemini" / "antigravity" / "mcp_config.json",
            config_hint=str(home / ".gemini/antigravity/mcp_config.json"),
        ),
    ]


def _find_pwm_mcp() -> str:
    """Find the pwm-mcp binary path."""
    path = shutil.which(MCP_COMMAND)
    if path:
        return path
    return MCP_COMMAND


def _is_configured_cli(tool: AITool) -> bool:
    """Check if MCP is configured via Claude Code CLI."""
    try:
        result = subprocess.run(
            ["claude", "mcp", "list"], capture_output=True, text=True, timeout=5
        )
        return MCP_SERVER_NAME in result.stdout
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def _is_configured_file(tool: AITool) -> bool:
    """Check if MCP is configured in a JSON config file."""
    if tool.config_path is None or not tool.config_path.exists():
        return False
    try:
        data = json.loads(tool.config_path.read_text(encoding="utf-8"))
        servers = data.get("mcpServers", {})
        return MCP_SERVER_NAME in servers
    except (json.JSONDecodeError, OSError):
        return False


def _is_configured(tool: AITool) -> bool:
    """Check if MCP server is configured for a tool."""
    if tool.uses_cli:
        return _is_configured_cli(tool)
    return _is_configured_file(tool)


def _add_cli(tool: AITool) -> bool:
    """Add MCP server via Claude Code CLI (user scope)."""
    try:
        result = subprocess.run(
            ["claude", "mcp", "add", "-s", "user", MCP_SERVER_NAME, "--", MCP_COMMAND],
            capture_output=True, text=True, timeout=10,
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def _remove_cli(tool: AITool) -> bool:
    """Remove MCP server via Claude Code CLI (user scope)."""
    try:
        result = subprocess.run(
            ["claude", "mcp", "remove", "-s", "user", MCP_SERVER_NAME],
            capture_output=True, text=True, timeout=10,
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def _build_server_entry(tool: AITool) -> dict:
    """Build the MCP server JSON entry for a tool."""
    cmd_path = _find_pwm_mcp()
    entry: dict = {"command": cmd_path, "args": []}
    if tool.name == "gemini":
        entry["trust"] = True
    return entry


def _add_file(tool: AITool) -> bool:
    """Add MCP server to a JSON config file."""
    if tool.config_path is None:
        return False

    server_entry = _build_server_entry(tool)

    try:
        if tool.config_path.exists():
            data = json.loads(tool.config_path.read_text(encoding="utf-8"))
        else:
            tool.config_path.parent.mkdir(parents=True, exist_ok=True)
            data = {}

        if "mcpServers" not in data:
            data["mcpServers"] = {}

        data["mcpServers"][MCP_SERVER_NAME] = server_entry
        tool.config_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        return True
    except (json.JSONDecodeError, OSError) as e:
        print(f"  Error writing config: {e}", file=sys.stderr)
        return False


def _remove_file(tool: AITool) -> bool:
    """Remove MCP server from a JSON config file."""
    if tool.config_path is None or not tool.config_path.exists():
        return False

    try:
        data = json.loads(tool.config_path.read_text(encoding="utf-8"))
        servers = data.get("mcpServers", {})
        if MCP_SERVER_NAME in servers:
            del servers[MCP_SERVER_NAME]
            tool.config_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
            return True
        return False
    except (json.JSONDecodeError, OSError) as e:
        print(f"  Error writing config: {e}", file=sys.stderr)
        return False


# ---------------------------------------------------------------------------
# Interactive JSON generator
# ---------------------------------------------------------------------------

def _prompt_choice(prompt: str, choices: list[tuple[str, str]]) -> str:
    """Prompt the user to pick from numbered choices. Returns the key."""
    print(prompt)
    for i, (key, label) in enumerate(choices, 1):
        print(f"  {i}. {label}")
    while True:
        try:
            raw = input("> ").strip()
            idx = int(raw) - 1
            if 0 <= idx < len(choices):
                return choices[idx][0]
        except (ValueError, EOFError, KeyboardInterrupt):
            pass
        print(f"  Enter 1-{len(choices)}")


def _setup_json() -> int:
    """Interactive JSON config generator for any MCP client."""
    print("Generate MCP JSON config\n")
    print("Creates a JSON snippet you can paste into any tool's MCP config.\n")

    config_type = _prompt_choice("Config type:", [
        ("uvx", "uvx (no install required)"),
        ("regular", "Regular (uses installed binary)"),
    ])

    use_full_path = False
    if config_type == "regular":
        path_choice = _prompt_choice("Command format:", [
            ("name", f"Command name ({MCP_COMMAND})"),
            ("full", "Full path to binary"),
        ])
        use_full_path = path_choice == "full"

    config_scope = _prompt_choice("Config scope:", [
        ("existing", "Add to existing config (server entry only)"),
        ("new", "New config file (includes mcpServers wrapper)"),
    ])

    if config_type == "uvx":
        server_entry = {
            "command": "uvx",
            "args": ["--from", MCP_PACKAGE, MCP_COMMAND],
        }
    elif use_full_path:
        binary_path = _find_pwm_mcp()
        if binary_path == MCP_COMMAND:
            print(f"  Warning: {MCP_COMMAND} not found in PATH, using command name")
        server_entry = {"command": binary_path}
    else:
        server_entry = {"command": MCP_COMMAND}

    if config_scope == "new":
        output = {"mcpServers": {MCP_SERVER_NAME: server_entry}}
    else:
        output = {MCP_SERVER_NAME: server_entry}

    json_str = json.dumps(output, indent=2)

    print(f"\n{json_str}\n")

    if platform.system() == "Darwin":
        try:
            answer = input("Copy to clipboard? [Y/n] ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            answer = "n"
        if answer in ("", "y", "yes"):
            try:
                subprocess.run(
                    ["pbcopy"], input=json_str.encode(), check=True, timeout=5,
                )
                print("  Copied to clipboard.")
            except (subprocess.SubprocessError, OSError):
                print("  Could not copy to clipboard.")

    return 0


# ---------------------------------------------------------------------------
# Public CLI handlers
# ---------------------------------------------------------------------------

_ALL_CLIENTS = "claude-code, claude-desktop, gemini, cursor, windsurf, cline, antigravity, json"


def cmd_setup(args: list[str]) -> int:
    """Handle: pwm setup [add|remove|list] [client]"""
    if not args or args[0] in ("--help", "-h"):
        print(
            "pwm setup - Configure MCP server for AI tools\n"
            "\n"
            "Usage:\n"
            "  pwm setup list                  Show supported tools and MCP status\n"
            "  pwm setup add <client>          Add MCP server to a tool\n"
            "  pwm setup add json              Generate JSON config for manual setup\n"
            "  pwm setup remove <client>       Remove MCP server from a tool\n"
            "\n"
            f"Clients: {_ALL_CLIENTS}\n"
            "\n"
            "Examples:\n"
            "  pwm setup list\n"
            "  pwm setup add claude-code\n"
            "  pwm setup add cursor\n"
            "  pwm setup add antigravity\n"
            "  pwm setup add json              # Interactive JSON generator\n"
            "  pwm setup remove windsurf\n"
        )
        return 0

    action = args[0]
    tools = _get_tools()
    tool_map = {t.name: t for t in tools}

    if action == "list":
        print("\nPerplexity Web MCP Server Configuration\n")
        print(f"{'Client':<18} {'Description':<28} {'MCP Status':<12} {'Config Path'}")
        print(f"{'─' * 18} {'─' * 28} {'─' * 12} {'─' * 35}")
        for t in tools:
            status = "  ✓  " if _is_configured(t) else "  -  "
            print(f"{t.name:<18} {t.description:<28} {status:<12} {t.config_hint}")
        print(f"\nAdd MCP server:    pwm setup add <client>")
        print(f"Generate JSON:     pwm setup add json")
        print(f"Install skills:    pwm skill install <tool>")
        return 0

    if action in ("add", "remove"):
        if len(args) < 2:
            print(f"Error: pwm setup {action} requires a client name.", file=sys.stderr)
            print(f"Available: {_ALL_CLIENTS}", file=sys.stderr)
            return 1

        client_name = args[1]

        if action == "add" and client_name == "json":
            return _setup_json()

        if client_name not in tool_map:
            print(f"Error: Unknown client '{client_name}'.", file=sys.stderr)
            print(f"Available: {_ALL_CLIENTS}", file=sys.stderr)
            return 1

        tool = tool_map[client_name]

        if action == "add":
            if _is_configured(tool):
                print(f"  {tool.name}: Already configured.")
                return 0
            ok = _add_cli(tool) if tool.uses_cli else _add_file(tool)
            if ok:
                print(f"  {tool.name}: MCP server added successfully.")
                return 0
            print(f"  {tool.name}: Failed to add MCP server.", file=sys.stderr)
            return 1

        if action == "remove":
            ok = _remove_cli(tool) if tool.uses_cli else _remove_file(tool)
            if ok:
                print(f"  {tool.name}: MCP server removed.")
                return 0
            print(f"  {tool.name}: Not configured or failed to remove.", file=sys.stderr)
            return 1

    print(f"Unknown setup action: {action}", file=sys.stderr)
    return 1
