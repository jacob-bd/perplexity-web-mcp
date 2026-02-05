# Perplexity Web MCP

## What This Is

An MCP server and Anthropic API-compatible interface that provides access to Perplexity AI models (GPT-5.2, Claude 4.5, Gemini 3, Grok 4.1, Kimi K2.5) through the web interface. Currently supports chat with streaming, model selection, and thinking modes — but not tool calling.

## Core Value

Enable Perplexity web models to execute local tools (Read, Write, Bash) through Claude Code, unlocking agentic workflows without requiring the official Perplexity API.

## Requirements

### Validated

- ✓ MCP server for Claude Code/Cursor integration — v0.x
- ✓ Anthropic API-compatible server (POST /v1/messages) — v0.x
- ✓ OpenAI API-compatible endpoint (POST /v1/chat/completions) — v0.x
- ✓ Email-based authentication with session token storage — v0.x
- ✓ Multiple model support (GPT-5.2, Claude 4.5 Sonnet/Opus, Gemini 3, Grok 4.1, Kimi K2.5) — v0.x
- ✓ Thinking mode toggle for all compatible models — v0.x
- ✓ Streaming responses with SSE — v0.x
- ✓ Citation extraction and formatting — v0.x
- ✓ Deep Research mode support — v0.x
- ✓ File upload support (PDF, text, audio) — v0.x
- ✓ Search focus options (Web, Academic, Social, Finance) — v0.x
- ✓ Perplexity models output parseable tool calls when given tool definitions — v1.0 (40-60% success rate)
- ✓ Tool calls execute locally (Read, Write, Bash) through Claude Code — v1.0 (via tool_use/tool_result cycle)
- ✓ Tool results can be fed back to continue the conversation — v1.0 (result injection into prompts)

### Active

(No active requirements — v1.0 shipped, next milestone requirements TBD)

### Out of Scope

- Intermediate parsing model — user prefers pure solution without second model
- Official Perplexity API — defeats the purpose of leveraging web interface access
- Browser automation — too fragile for production use

## Context

**Previous attempts that failed:**
1. XML tag format (`<tool_call>...</tool_call>`) — models ignored format entirely
2. ReAct format (detailed) — models explained ReAct instead of using it
3. ReAct format (minimal with examples) — models still conversed instead of acting
4. Bare minimum instructions — same conversational behavior

**Root cause identified:**
- Perplexity web UI models are optimized for conversational search, not structured output
- No system prompt distinction — everything appears as user content
- Models default to explaining rather than executing

**Research completed (2026-02-04):**
- Ollama uses prompt templates + post-processing (works because models are fine-tuned on tool-calling data)
- Hermes format requires training — won't work through prompting alone
- Pure prompt engineering achieves 40-60% reliability at best
- Formats most likely to work: Python in markdown blocks, simple key-value patterns
- Fundamental limitation confirmed: training objective mismatch cannot be overcome with prompts alone

## Constraints

- **No second model**: Solution must not require running another LLM to parse output
- **Web interface only**: Must work through Perplexity's web UI, not official API
- **Maintain existing functionality**: Cannot break working chat/search features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Focus on pure solution | User preference — avoid latency/complexity of intermediate model | Confirmed |
| Research-first approach | Previous attempts failed — need new angles before more implementation | Complete |
| Accept probabilistic behavior | Research shows 40-60% max reliability without model-level support | Pending user confirmation |
| Use training-data-familiar formats | Markdown code blocks appear frequently in model training | Recommended |
| Build flexible parsing | Models will deviate from any format — need multi-strategy extraction | Recommended |

## Current State (v1.0 Shipped)

**Codebase:** 6,041 LOC Python
**Tech Stack:** FastAPI, Prometheus (metrics), httpx (Perplexity API client)
**Test Coverage:** 111 tests (100% pass rate)
**Key Features:**
- Multi-strategy tool call parser (Python AST, key-value, inline code)
- Anthropic API-compatible /v1/messages endpoint
- Tool_use/tool_result content blocks with streaming support
- Prometheus metrics at /metrics endpoint
- Graceful degradation with error classification

**Known Issues:**
- Real Perplexity model behavior untested (all tests use mocks)
- Success rate validation pending (expected 40-60% for simple tools)
- Confidence threshold (0.7) may need adjustment based on production data

**Next Steps:**
- Manual testing with live Perplexity models
- Metrics collection and analysis
- Success rate validation

---
*Last updated: 2026-02-05 after v1.0 milestone*
