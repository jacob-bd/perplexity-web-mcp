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
  2. MCP Server        - MCP tools for AI agents (pplx_* namespace)
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
  pwm connectors list                 List account connector source IDs
  pwm ask "query" --json              Output as JSON (answer + citations)
  pwm ask "query" --no-citations      Suppress citation URLs
  pwm ask - < file.txt                Read the query from stdin
  pwm ask --prompt-file file.txt      Read the query from a UTF-8 file
  pwm ask "query" --file REPORT.pdf   Attach a file (PDF or image, repeatable)

  Model selection examples (-m):
    pwm ask "Compare React and Vue" -m gpt56_terra
    pwm ask "Explain attention mechanism" -m claude_sonnet
    pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet --thinking
    pwm ask "Summarize this paper" -m gemini_pro

  Source focus examples (-s):
    pwm ask "review this code" -s none                     # Model only, no web search
    pwm ask "transformer improvements 2025" -s academic    # Scholarly papers
    pwm ask "best mechanical keyboard" -s social           # Reddit/Twitter
    pwm ask "Apple revenue Q4 2025" -s finance             # SEC EDGAR filings
    pwm ask "latest AI news" -s all                        # All sources combined
    pwm ask "private company funding" -s pitchbook_mcp_cashmere  # Account connector

  Combined:
    pwm ask "protein folding advances" -m gemini_pro -s academic --json

MODEL COUNCIL
  pwm council "query"                         Query default 3 models in parallel
  pwm council "query" -m MODELS               Custom model selection (comma-separated)
  pwm council "query" -t                      Enable extended thinking for all models
  pwm council "query" -s SOURCE               Source focus for all council models
  pwm council "query" --chairman MODEL        Set synthesis model (default: sonar / Sonar 2)
  pwm council "query" --no-synthesis           Skip consensus synthesis
  pwm council "query" --json                  Output as JSON

  Each model in the council costs 1 Pro Search, plus 1 for synthesis. Default = 4 Pro Searches.
  Available models: sonar, gpt56_terra, gpt56_sol, gpt6_sol, grok45, grok47, claude_sonnet, claude_opus, claude_opus55, gemini_pro, gemini38, nemotron, glm52, glm53, kimi_k26, kimi_k3
  Thinking toggle: -t / --thinking (gpt56_terra, gpt56_sol, gpt6_sol, grok45, grok47, claude_sonnet, claude_opus, claude_opus55, gemini38, kimi_k26 support toggle;
    gemini_pro, nemotron, glm52, glm53, and kimi_k3 are always thinking)

  Chairman: --chairman MODEL (default: sonar / Sonar 2). Non-sonar costs 1 extra Pro Search.

  Examples:
    pwm council "Best practices for microservices?"
    pwm council "Compare Rust vs Go" -m gpt56_terra,claude_sonnet
    pwm council "Quantum computing" -s academic --thinking
    pwm council "React vs Vue" --chairman claude_sonnet
    pwm council "React vs Vue" --no-synthesis --json

CHAT (INTERACTIVE)
  pwm chat                            Multi-turn chat in one Perplexity thread (default: sonar)
  pwm chat -m MODEL -t -s SOURCE      Same options as pwm ask
  pwm chat -m auto                    Quota-aware routing (downgrades when quota is low)
                                      In-session commands: /new (new thread),
                                      /model [NAME] (show or switch model), /exit (quit)

SAVED DEFAULTS
  pwm config show                     Show saved default model, thinking, source
  pwm config set --model MODEL        Also: --thinking/--no-thinking, --source SOURCE
  pwm config clear                    Also: pwm config clear model|thinking|source
                                      Defaults apply to pwm ask, pwm chat, and
                                      pplx_query when the option is omitted;
                                      explicit flags always win.

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

MODELS
  pwm models                          List the live model catalog (free, no query quota)
  pwm models --refresh                Force a fresh fetch from Perplexity servers
  pwm models --json                   Output as JSON

HACK (INTEGRATION)
  pwm hack claude                     Launch Claude Code using Perplexity models
  pwm hack claude -m gpt56_terra            Launch Claude Code with a specific model
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
sonar           experimental            No         Sonar 2 (concise search mode for grounded responses)
deep_research   pplx_alpha              No         In-depth reports (monthly quota)
gpt56_terra           gpt56_terra                   Yes        OpenAI GPT-5.6 Terra (versatile)
gpt56_sol           gpt56_sol                   Yes        OpenAI GPT-5.6 Sol (latest, Max tier)
gpt6_sol        gpt6_sol                Yes        OpenAI GPT-6 Sol
grok45          grok45low                  Yes        xAI Grok 4.5
grok47          grok47                  Yes        xAI Grok 4.7
claude_sonnet   claude50sonnet          Yes        Anthropic Claude Sonnet 5
claude_opus     claude48opus            Yes        Anthropic Claude 4.8 Opus (Max tier)
claude_opus55   claude55opus            Yes        Anthropic Claude Opus 5.5 (Max tier)
gemini_pro      gemini31pro_high        Always     Google Gemini 3.1 Pro (thinking only)
gemini38        gemini38flash           Yes        Google Gemini 3.8 Flash
nemotron        nv_nemotron_3_ultra     Always     NVIDIA Nemotron 3 Ultra 550B (thinking only)
glm52           glm_5_2                 Always     Z.ai GLM 5.2 (thinking only)
glm53           glm_5_3_thinking        Always     Z.ai GLM 5.3 (thinking only)
kimi_k26        kimi_k26                Yes        Moonshot Kimi K2.6
kimi_k3         kimik3thinking          Always     Moonshot Kimi K3 (thinking only)

"Thinking" = extended reasoning mode. Models marked "Always" have thinking
permanently enabled with no non-thinking variant.

Use with CLI: pwm ask "query" -m gpt56_terra -t
Use with MCP: pplx_query(query="...", model="gpt56_terra", thinking=True)

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

Account connectors:
  pwm connectors list                              # List connector source IDs
  pwm ask "private company funding" -s pitchbook_mcp_cashmere

Connector rules:
  - Connector IDs come from the authenticated Perplexity account.
  - Free accounts may show no connector IDs.
  - Do not guess connector IDs. Run `pwm connectors list` or call `pplx_connectors()`.
  - Unknown source values fail instead of falling back to web search.

CLI examples:
  pwm ask "explain this algorithm" -s none                 # No web search
  pwm ask "transformer architecture" -s academic
  pwm ask "best laptop 2026" -s social
  pwm ask "Tesla 10-K filing" -s finance
  pwm ask "latest AI breakthroughs" -s all

MCP examples:
  pplx_ask(query="review this code", source_focus="none")
  pplx_ask(query="transformer architecture", source_focus="academic")
  pplx_query(query="Tesla financials", model="gpt56_terra", source_focus="finance")
  pplx_connectors(refresh=False)
  pplx_smart_query(query="private company funding", source_focus="pitchbook_mcp_cashmere")

================================================================================
MCP TOOLS (pplx_* namespace)
================================================================================

SMART QUERY (RECOMMENDED DEFAULT — use this for every query):
  pplx_smart_query(query, intent="quick", source_focus="web")
      Quota-aware routing. Default to intent='quick' for most lookups (Sonar 2 first).
      Only escalate to 'standard', 'detailed', or 'research' when needed.
      See QUOTA-AWARE QUERYING section above for decision rules.
      Multi-turn: responses end with [Conversation ID: ...]; pass it back via conversation_id to continue.

QUERY TOOLS (each call costs 1 Pro Search query unless noted):
  pplx_query(query, model="auto", thinking=False, source_focus="web")
      Explicit model selection. 1 PRO SEARCH per call.
      Omitted model/thinking/source follow saved defaults (pwm config); explicit values win.

  pplx_ask(query, source_focus="web")
      Auto-selects best model. 1 PRO SEARCH per call.

  pplx_council(query, source_focus="web", models="gpt56_terra,claude_sonnet,gemini_pro",
               synthesize=True, thinking=False, chairman="sonar")
      Model Council — N PRO SEARCHES (1 per model selected).
      BEFORE CALLING: You MUST ask the user which models and how many.
      Available: sonar, gpt56_terra, gpt56_sol, gpt6_sol, grok45, grok47, claude_sonnet, claude_opus, claude_opus55, gemini_pro, gemini38, nemotron, glm52, glm53, kimi_k26, kimi_k3.
      Max-only: gpt56_sol, claude_opus, claude_opus55. Exclude these when Subscription is Pro.
      Default: 3 Pro-compatible models (GPT-5.6 Terra, Claude Sonnet, Gemini Pro) + synthesis = 4 Pro Searches.
      Synthesis uses Sonar 2 by default. Set chairman to override.
      Non-sonar chairman costs 1 extra Pro Search.
      Set synthesize=False to skip synthesis entirely.
      Set thinking=True to enable extended thinking for all council models.

  pplx_deep_research(query, source_focus="web")
      In-depth research. 1 DEEP RESEARCH per call (scarce monthly quota).
      ONLY use when user explicitly requests deep research.

  pplx_sonar(query, source_focus="web")          Perplexity Sonar 2 (plan limits apply)
  pplx_gpt56_terra(query, source_focus="web")          GPT-5.6 Terra — 1 Pro
  pplx_gpt56_terra_thinking(query, source_focus="web") GPT-5.6 Terra + thinking — 1 Pro
  pplx_gpt56_sol(query, source_focus="web")          GPT-5.6 Sol — 1 Pro (Max tier)
  pplx_gpt56_sol_thinking(query, source_focus="web") GPT-5.6 Sol + thinking — 1 Pro (Max tier)
  pplx_grok45(query, source_focus="web")            Grok 4.5 — 1 Pro
  pplx_grok45_thinking(query, source_focus="web")   Grok 4.5 + thinking — 1 Pro
  pplx_claude_sonnet(query, source_focus="web")   Claude Sonnet 5 — 1 Pro
  pplx_claude_sonnet_think(query, source_focus)   Claude Sonnet 5 + thinking — 1 Pro
  pplx_claude_opus(query, source_focus="web")     Claude 4.8 Opus — 1 Pro (Max tier)
  pplx_claude_opus_think(query, source_focus)     Claude 4.8 Opus + thinking — 1 Pro (Max tier)
  pplx_gemini_pro_think(query, source_focus)      Gemini 3.1 Pro (thinking) — 1 Pro
  pplx_nemotron_thinking(query, source_focus)     Nemotron 3 Ultra (thinking) — 1 Pro
  pplx_glm52(query, source_focus="web")           GLM 5.2 (thinking) — 1 Pro
  pplx_kimi_k26(query, source_focus="web")        Kimi K2.6 — 1 Pro
  pplx_kimi_k26_thinking(query, source_focus)     Kimi K2.6 + thinking — 1 Pro

  All query tools accept source_focus: "none", "web", "academic", "social",
  "finance", "all", or a connector source ID from pplx_connectors().
  Use "none" for model-only queries without web search.

  pplx_connectors(refresh=False)                   List connector source IDs

  All query tools also accept an optional `conversation_id` (str) parameter.
  The server returns `[Conversation ID: <uuid>]` at the end of each response.
  Extract this UUID and pass it to the next query to maintain context across
  multiple turns. State is retained in memory for 1 hour.

USAGE TOOL (1):
  pplx_usage(refresh=False)
      Returns remaining Pro Search, Deep Research, Labs, and Agent quotas.
      CALL THIS AT SESSION START before making any queries.

AUTH TOOLS (3):
  pplx_auth_status()
      Check if authenticated, show email and subscription tier.

  pplx_auth_request_code(email)
      Send 6-digit verification code to email.

  pplx_auth_complete(email, code, totp_code=None)
      Complete email OTP and optional TOTP authentication. Saves token automatically.

================================================================================
AUTHENTICATION
================================================================================

Three ways to authenticate (all store token at ~/.config/perplexity-web-mcp/token):

1. INTERACTIVE CLI (human at terminal):
   pwm login

2. NON-INTERACTIVE CLI (AI agent with shell access):
   pwm login --email user@example.com          # Sends code
   pwm login --email user@example.com --code 123456  # Completes auth
   pwm login --email user@example.com --code 123456 --totp-code 654321  # TOTP account

3. MCP TOOLS (AI agent without shell):
   pplx_auth_request_code(email="user@example.com")  # Sends code
   pplx_auth_complete(email="user@example.com", code="123456")  # Completes email OTP
   # If TOTP_REQUIRED is returned:
   pplx_auth_complete(email="user@example.com", totp_code="654321")

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
  claude --model gpt-5.6-terra

MCP SERVER (pwm-mcp)
  Start: pwm-mcp
  Config: {"mcpServers": {"perplexity": {"command": "pwm-mcp"}}}

================================================================================
QUOTA-AWARE QUERYING (READ THIS FIRST)
================================================================================

Perplexity has hard quota limits. Every Pro Search query consumes from a
weekly pool (~300). Deep Research draws from a tiny monthly pool (~5-10).
Wasting Pro queries on simple lookups means nothing left for real questions.

COST MODEL:
  Sonar 2 (pplx_sonar,     In-house model; uses concise search mode to guarantee responses
    quick intent)         are grounded. Decrements Perplexity session counters.
  Pro Search (standard,   Typically 1 from weekly Pro Search pool (~300/week
    detailed, pplx_ask,   on Pro/Max; exact rules are enforced by Perplexity).
    pplx_query, premium
    model tools)
  Council (pplx_council)  N+1 Pro Searches (1 per model + 1 synthesis)
  Deep Research           1 Deep Research query           ~5-10/month

MANDATORY PROTOCOL:
  1. CHECK QUOTA FIRST: Call pplx_usage() before your first query each session.
  2. DEFAULT TO QUICK: Use pplx_smart_query(intent='quick') for most lookups.
     It prefers Sonar 2 first (using concise mode to guarantee grounding) and
     only escalates when the query needs a premium model.
  3. ESCALATE ONLY WHEN NEEDED: Use 'standard' for multi-source synthesis,
     'detailed' for complex analysis, 'research' only when user requests it.
  4. NEVER USE DEEP RESEARCH AUTONOMOUSLY — always ask the user first.
  5. SUBSCRIPTION-AWARE MODELS: Read the Subscription line from pplx_usage().
     If it is Pro, exclude Max-only models: gpt56_sol and claude_opus.
  6. COUNCIL: Before calling pplx_council, ASK the user which models and how
     many. Each model = 1 Pro Search. List available models for them to choose.

WHEN TO USE EACH INTENT:
  quick     Facts, definitions, simple lookups, "what is X"      → Sonar 2 (see usage)
  standard  Multi-source synthesis, comparisons, current events   → 1 Pro
  detailed  Complex analysis, deep reasoning, premium model       → 1 Pro
  research  Comprehensive reports (user must request explicitly)  → 1 Research

DECISION RULE: Ask "Can Sonar 2 answer this?" If yes → quick (grounded on concise search). If no → standard.
Only use detailed/research when the complexity genuinely demands it.
When in doubt, start with quick and escalate if the answer is insufficient.

================================================================================
RATE LIMITS
================================================================================

Tier    Pro Search    Deep Research    Labs
-----   ----------    -------------    ----
Free    3/day         1/month          No
Pro     Weekly pool   Monthly pool     Monthly pool
Max     Weekly pool   Monthly pool     Monthly pool

The MCP server auto-checks limits before each query and blocks if exhausted.
Every non-smart query response includes a quota footer showing remaining limits.
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
  pwm ask "Compare React and Vue" -m gpt56_terra

Model with thinking:
  pwm ask "Prove sqrt(2) is irrational" -m claude_sonnet -t

Academic research:
  pwm ask "transformer improvements 2025" -m gemini_pro -s academic

Financial analysis:
  pwm ask "Apple revenue Q4 2025" -s finance

Model council (3 models, synthesized):
  pwm council "What are the best practices for microservices?"

Model council (custom 2 models):
  pwm council "Compare Rust vs Go" -m gpt56_terra,claude_sonnet

Model council with thinking:
  pwm council "Prove the Pythagorean theorem" --thinking

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
