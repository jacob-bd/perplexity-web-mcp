"""AI-optimized documentation for the pwm CLI.

Printed by `pwm --ai`. Designed for LLM consumption: plain text, no ANSI
colors, structured for quick parsing. Covers all CLI commands, MCP tools,
models, auth workflows, and error recovery.
"""

from __future__ import annotations

AI_DOC = """\
================================================================================
PERPLEXITY WEB MCP - AI REFERENCE
================================================================================

Perplexity Web MCP provides three interfaces to Perplexity AI:
  1. CLI (pwm)         - Direct terminal queries and authentication
  2. MCP Server        - 17 MCP tools for AI agents (pplx_* namespace)
  3. API Server        - Anthropic/OpenAI-compatible HTTP endpoints

All three share the same backend, models, and authentication token stored at
~/.config/perplexity-web-mcp/token.

================================================================================
CLI COMMANDS (pwm)
================================================================================

AUTHENTICATION
  pwm login                           Interactive login (email + OTP code)
  pwm login --check                   Check if authenticated (no login prompt)
  pwm login --email EMAIL             Send verification code (non-interactive)
  pwm login --email EMAIL --code CODE Complete auth with 6-digit code
  pwm login --no-save                 Don't persist token to disk

QUERYING
  pwm ask "query"                     Ask using auto-selected best model
  pwm ask "query" -m MODEL            Ask using a specific model
  pwm ask "query" -m MODEL -t         Ask with extended thinking enabled
  pwm ask "query" -s SOURCE           Ask with specific source focus
  pwm ask "query" --json              Output as JSON (answer + citations)
  pwm ask "query" --no-citations      Suppress citation URLs

  Model selection examples (-m):
    pwm ask "Compare React and Vue" -m gpt52
    pwm ask "Explain attention mechanism" -m claude_sonnet
    pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet --thinking
    pwm ask "Summarize this paper" -m gemini_pro

  Source focus examples (-s):
    pwm ask "review this code" -s none                     # Model only, no web search
    pwm ask "transformer improvements 2025" -s academic    # Scholarly papers
    pwm ask "best mechanical keyboard" -s social           # Reddit/Twitter
    pwm ask "Apple revenue Q4 2025" -s finance             # SEC EDGAR filings
    pwm ask "latest AI news" -s all                        # All sources combined

  Combined:
    pwm ask "protein folding advances" -m gemini_pro -s academic --json

DEEP RESEARCH
  pwm research "query"                In-depth research report (monthly quota)
  pwm research "query" -s SOURCE      Research with specific sources
  pwm research "query" --json         Output as JSON

  Examples:
    pwm research "agentic AI trends 2026"
    pwm research "climate policy impact" -s academic
    pwm research "NVIDIA competitive landscape" -s finance --json

USAGE & LIMITS
  pwm usage                           Check remaining rate limits and quotas
  pwm usage --refresh                 Force-refresh from Perplexity servers

HACK (INTEGRATION)
  pwm hack claude                     Launch Claude Code using Perplexity models
  pwm hack claude -m gpt52            Launch Claude Code with a specific model
  pwm hack claude --help              List all available models for Claude Code

OTHER
  pwm --ai                            Print this AI reference document
  pwm --version                       Show version
  pwm --help                          Show help

================================================================================
MODELS
================================================================================

Name            Identifier              Thinking   Notes
-----------     ----------------------  ---------  ---------------------------
auto            pplx_pro                No         Auto-selects best model
sonar           experimental            No         Perplexity's latest
deep_research   pplx_alpha              No         In-depth reports (monthly quota)
gpt52           gpt52                   Yes        OpenAI GPT-5.2
claude_sonnet   claude46sonnet          Yes        Anthropic Claude 4.6 Sonnet
claude_opus     claude46opus            Yes        Anthropic Claude 4.6 Opus (Max tier)
gemini_flash    gemini30flash           Yes        Google Gemini 3 Flash
gemini_pro      gemini31pro_high        Always     Google Gemini 3.1 Pro (thinking only)
grok            grok41nonreasoning      Yes        xAI Grok 4.1
kimi            kimik25thinking         Always     Moonshot Kimi K2.5 (thinking only)

"Thinking" = extended reasoning mode. Models marked "Always" have thinking
permanently enabled with no non-thinking variant.

Use with CLI: pwm ask "query" -m gpt52 -t
Use with MCP: pplx_query(query="...", model="gpt52", thinking=True)

================================================================================
SOURCE FOCUS OPTIONS
================================================================================

Name        Description                          Example Use Case
--------    -----------                          ----------------
none        No search — model training data only Code review, writing, analysis without web
web         General web search (default)         News, general questions
academic    Academic papers and scholarly articles  Research, citations, scientific topics
social      Social media (Reddit, Twitter, etc.) Opinions, recommendations, community
finance     SEC EDGAR filings                    Company financials, regulatory filings
all         Web + Academic + Social combined      Broad coverage across all sources

CLI examples:
  pwm ask "explain this algorithm" -s none                 # No web search
  pwm ask "transformer architecture" -s academic
  pwm ask "best laptop 2026" -s social
  pwm ask "Tesla 10-K filing" -s finance
  pwm ask "latest AI breakthroughs" -s all

MCP examples:
  pplx_ask(query="review this code", source_focus="none")
  pplx_ask(query="transformer architecture", source_focus="academic")
  pplx_query(query="Tesla financials", model="gpt52", source_focus="finance")

================================================================================
MCP TOOLS (17 total, pplx_* namespace)
================================================================================

QUERY TOOLS (14):
  pplx_query(query, model="auto", thinking=False, source_focus="web")
      Flexible: pick any model + thinking toggle.

  pplx_ask(query, source_focus="web")
      Quick Q&A with auto-selected best model.

  pplx_deep_research(query, source_focus="web")
      In-depth research report. Uses monthly Deep Research quota.

  pplx_sonar(query, source_focus="web")         Perplexity Sonar model
  pplx_gpt52(query, source_focus="web")          GPT-5.2
  pplx_gpt52_thinking(query, source_focus="web") GPT-5.2 + thinking
  pplx_claude_sonnet(query, source_focus="web")   Claude 4.6 Sonnet
  pplx_claude_sonnet_think(query, source_focus)   Claude 4.6 Sonnet + thinking
  pplx_gemini_flash(query, source_focus="web")    Gemini 3 Flash
  pplx_gemini_flash_think(query, source_focus)    Gemini 3 Flash + thinking
  pplx_gemini_pro_think(query, source_focus)      Gemini 3.1 Pro (thinking always on)
  pplx_grok(query, source_focus="web")            Grok 4.1
  pplx_grok_thinking(query, source_focus="web")   Grok 4.1 + thinking
  pplx_kimi_thinking(query, source_focus="web")   Kimi K2.5 (thinking always on)

  All query tools accept source_focus: "none", "web", "academic", "social",
  "finance", "all". Use "none" for model-only queries without web search.

USAGE TOOL (1):
  pplx_usage(refresh=False)
      Returns remaining Pro Search, Deep Research, Labs, and Agent quotas.
      Call before heavy use or after rate limit errors.

AUTH TOOLS (3):
  pplx_auth_status()
      Check if authenticated, show email and subscription tier.

  pplx_auth_request_code(email)
      Send 6-digit verification code to email.

  pplx_auth_complete(email, code)
      Complete auth with code from email. Saves token automatically.

================================================================================
AUTHENTICATION
================================================================================

Three ways to authenticate (all store token at ~/.config/perplexity-web-mcp/token):

1. INTERACTIVE CLI (human at terminal):
   pwm login

2. NON-INTERACTIVE CLI (AI agent with shell access):
   pwm login --email user@example.com          # Sends code
   pwm login --email user@example.com --code 123456  # Completes auth

3. MCP TOOLS (AI agent without shell):
   pplx_auth_request_code(email="user@example.com")  # Sends code
   pplx_auth_complete(email="user@example.com", code="123456")  # Completes

Tokens last ~30 days. Re-authenticate when you get 403 errors.
Check status: pwm login --check  OR  pplx_auth_status()

================================================================================
API SERVER (pwm api)
================================================================================

Start: pwm api
Default: http://localhost:8080

Endpoints:
  POST /v1/messages           Anthropic Messages API
  POST /v1/chat/completions   OpenAI Chat Completions API
  GET  /v1/models             List available models
  GET  /health                Health check

Claude Code setup:
  export ANTHROPIC_BASE_URL=http://localhost:8080
  export ANTHROPIC_API_KEY=perplexity
  claude --model gpt-5.2

MCP SERVER (pwm-mcp)
  Start: pwm-mcp
  Config: {"mcpServers": {"perplexity": {"command": "pwm-mcp"}}}

================================================================================
RATE LIMITS
================================================================================

Tier    Pro Search    Deep Research    Labs
-----   ----------    -------------    ----
Free    3/day         1/month          No
Pro     Weekly pool   Monthly pool     Monthly pool
Max     Weekly pool   Monthly pool     Monthly pool

The MCP server auto-checks limits before each query and blocks if exhausted.
Check manually: pwm usage  OR  pplx_usage()

================================================================================
ERROR RECOVERY
================================================================================

Error                    Cause               Solution
-----------------------  ------------------  ------------------------------------
403 Forbidden            Token expired       pwm login  OR  pplx_auth_request_code
429 Rate limit           Quota exhausted     Wait, check pwm usage
"No token found"         Not authenticated   pwm login
"LIMIT REACHED"          Quota at zero       Wait for reset or upgrade plan
Connection error         Network issue       Retry after a few seconds

================================================================================
COMMON WORKFLOWS
================================================================================

Quick web search:
  pwm ask "What happened in AI today?"

Model-only query (no web search):
  pwm ask "Explain the visitor pattern" -s none
  pwm ask "Write a retry decorator" -m claude_sonnet -s none

Specific model:
  pwm ask "Compare React and Vue" -m gpt52

Model with thinking:
  pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet -t

Academic research:
  pwm ask "transformer improvements 2025" -m gemini_pro -s academic

Financial analysis:
  pwm ask "Apple revenue Q4 2025" -s finance

Deep research:
  pwm research "agentic AI trends 2026"

Deep research (academic + JSON):
  pwm research "climate policy impact" -s academic --json

Check auth + limits before heavy use:
  pwm login --check && pwm usage

Re-authenticate (non-interactive):
  pwm login --email user@example.com
  # check email for code
  pwm login --email user@example.com --code 123456
"""


def print_ai_doc() -> None:
    """Print the AI-optimized documentation to stdout."""
    print(AI_DOC)
