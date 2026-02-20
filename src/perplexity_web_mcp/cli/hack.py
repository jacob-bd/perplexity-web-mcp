"""Hack CLI command for seamless integration with other AI tools.

Provides the `pwm hack claude` command to seamlessly launch Claude Code
connected to the local Perplexity API server.
"""

from __future__ import annotations

import os
import shutil
import socket
import subprocess
import sys
import time
import urllib.request
from typing import NoReturn


def _get_free_port() -> int:
    """Find an available ephemeral port."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", 0))
        return s.getsockname()[1]


def _check_server_ready(url: str, timeout: int = 15) -> bool:
    """Poll the server until it responds or timeout is reached."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=1) as response:
                if response.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(0.5)
    return False


def cmd_hack(args: list[str]) -> int:
    """Handle: pwm hack <tool> [options]"""
    if not args:
        print("Error: pwm hack requires a tool to hack (e.g. 'claude').\n", file=sys.stderr)
        print("Usage: pwm hack claude [options]", file=sys.stderr)
        return 1

    tool = args[0].lower()

    if tool == "claude":
        return _hack_claude(args[1:])

    print(f"Error: Unknown tool '{tool}'. Currently only 'claude' is supported.", file=sys.stderr)
    return 1


def _hack_claude(args: list[str]) -> int:
    """Launch Claude Code connected to the local API server."""
    if "--help" in args or "-h" in args:
        print("pwm hack claude - Launch Claude Code using Perplexity models\n")
        print("Usage:")
        print("  pwm hack claude [options]\n")
        print("Options:")
        print("  -m, --model MODEL   Specify the model to use (see available models below)")
        print("  -h, --help          Show this help message")
        print("  [other options]     Any other options are passed directly to Claude Code\n")
        print("Available Models:")
        from perplexity_web_mcp.api.server import AVAILABLE_MODELS
        for model in AVAILABLE_MODELS:
            print(f"  {model['id']:<20} {model['description']}")
        return 0

    # 1. Verify claude is installed
    claude_path = shutil.which("claude")
    if not claude_path:
        print(
            "Error: 'claude' command not found.\n\n"
            "Please install Claude Code first:\n"
            "npm install -g @anthropic-ai/claude-code\n"
            "or run it via: npx @anthropic-ai/claude-code",
            file=sys.stderr,
        )
        return 1

    # 2. Launch API Server
    port = _get_free_port()
    print(f"Starting local API server (pwm-api) on port {port}...", file=sys.stderr)
    
    server_env = os.environ.copy()
    server_env["PORT"] = str(port)
    
    server_process = subprocess.Popen(
        [sys.executable, "-m", "perplexity_web_mcp.api.server"],
        env=server_env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        # 3. Wait for API Server to be ready
        if not _check_server_ready(f"http://127.0.0.1:{port}/health"):
            print("Error: Failed to start API server or timed out waiting for it to be ready.", file=sys.stderr)
            return 1

        print("API server ready! Launching Claude Code...\n", file=sys.stderr)

        # 4. Prepare environment variables
        env = os.environ.copy()
        
        # Clear out any existing Anthropic/Claude/Vertex variables to prevent conflicts
        # (e.g., CLAUDE_CODE_USE_VERTEX or ANTHROPIC_VERTEX_PROJECT_ID)
        for key in list(env.keys()):
            if key.startswith("ANTHROPIC_") or key.startswith("CLAUDE_"):
                del env[key]

        env["ANTHROPIC_BASE_URL"] = f"http://127.0.0.1:{port}"
        env["ANTHROPIC_API_KEY"] = "perplexity"

        # 5. Handle model selection
        # Pass the model to Claude Code via --model. Claude Code validates model names
        # by querying the /v1/models endpoint on our API server (which is now running).
        # This also enables mid-session model switching via /model inside Claude Code.
        claude_args = list(args)
        
        if "-m" in claude_args:
            idx = claude_args.index("-m")
            claude_args[idx] = "--model"
            
        if "--model" not in claude_args:
            claude_args.extend(["--model", "perplexity-auto"])

        # 6. Execute Claude Code interactively
        cmd = [claude_path] + claude_args
        result = subprocess.run(cmd, env=env)
        
        return result.returncode

    finally:
        # 7. Clean up the API server
        if server_process.poll() is None:
            print("\nShutting down local API server...", file=sys.stderr)
            server_process.terminate()
            try:
                server_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                server_process.kill()
