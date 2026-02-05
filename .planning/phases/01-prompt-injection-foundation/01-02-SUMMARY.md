---
phase: 01-prompt-injection-foundation
plan: 02
subsystem: api
tags: [prompt-building, tool-injection, markdown-blocks, system-distillation]
requires: [01-01]
provides: [prompt-construction, tool-positioning, usage-instructions]
affects: [01-03, 02-01, 02-02]
tech-stack:
  added: []
  patterns: [markdown-code-blocks, prompt-ordering, distillation-integration]
key-files:
  created:
    - src/perplexity_web_mcp/api/prompt_builder.py
    - tests/test_prompt_builder.py
  modified: []
decisions:
  - Position tool definitions before user message for model recognition
  - Wrap tools in markdown Python code blocks for training data match
  - Include clear usage instructions after tool definitions
  - Integrate system prompt distillation from session_manager
  - Support both full and minimal injection formats
completed: 2026-02-05
duration: 5m 2s
---

# Phase 1 Plan 2: Prompt Builder Module Summary

Complete prompt construction with tool definitions injected before user messages in markdown blocks.

## What Was Built

Created a prompt builder module that constructs complete prompts for Perplexity models, combining system context, tool definitions, and user messages in the optimal order for model recognition.

### Components Delivered

1. **`build_prompt_with_tools()`** - Main prompt construction function
   - Integrates distilled system prompts from session_manager
   - Positions tool definitions in Python markdown code blocks
   - Adds clear usage instructions for function calling
   - Places user message at the end for proper context flow

2. **`inject_tools_minimal()`** - Fallback format for simple injection
   - Bullet-point list of available tools
   - Simplified usage instructions
   - Can be used when full Python format isn't needed

3. **Comprehensive test suite** - 11 tests validating:
   - Tool positioning before user messages
   - Markdown code block formatting
   - System prompt integration
   - Multiple tools in single prompt
   - Optional vs required parameters
   - Edge cases (empty tools, no parameters)

## How It Works

The module takes a user message and optional tools/system prompt, then constructs a complete prompt in this order:

1. **Distilled system context** (if provided) - Condensed behavioral instructions
2. **Tool definitions** - Python functions in markdown code blocks
3. **Usage instructions** - How to call the functions
4. **User message** - The actual query at the end

Example output:
```
You are a helpful assistant

Available functions you can call:

```python
def Read(file_path: str):
    """Read a file from the filesystem

    Args:
        file_path (str): Path to the file to read (required)

    Returns:
        Result of the tool execution
    """
    pass
```

To use a function, write: functionname(param1='value1', param2='value2')
Then I'll execute it and show you the result.

Please read config.json
```

## Decisions Made

1. **Tool positioning before user message** - Ensures models see available tools before processing the query
2. **Markdown code blocks for tools** - Matches common training data format for code
3. **Explicit usage instructions** - Guides models on how to invoke functions
4. **System prompt distillation integration** - Keeps prompts concise while preserving key behavior
5. **Dual format support** - Full Python format as primary, minimal bullet-point format as fallback

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed import compatibility**
- **Found during:** Task 1
- **Issue:** Module imports failed in test environment due to relative imports
- **Fix:** Added try/except to support both relative and absolute imports
- **Files modified:** src/perplexity_web_mcp/api/prompt_builder.py
- **Commit:** e928c98

**2. [Rule 1 - Bug] Fixed test expectation for no-parameter functions**
- **Found during:** Task 2
- **Issue:** Test expected Args section for functions with no parameters
- **Fix:** Corrected test to match proper Google-style docstring format (no Args when no params)
- **Files modified:** tests/test_prompt_builder.py
- **Commit:** 9d0d6d9

## Authentication Gates

None encountered during execution.

## Next Phase Readiness

This prompt builder is ready for integration with the API server in phase 2. The format is optimized for Perplexity models to recognize and potentially execute tool calls.

### Critical Dependencies for Next Plans

- **01-03**: Response parser will need to extract tool calls from this prompt format
- **02-01**: Server integration will use build_prompt_with_tools on every API request
- **02-02**: Response handling will rely on consistent prompt structure

## Commits

- `e928c98`: feat(01-02): create prompt builder module
- `9d0d6d9`: test(01-02): add comprehensive unit tests for prompt builder

## Files Created

| File | Purpose | Lines |
|------|---------|-------|
| `src/perplexity_web_mcp/api/prompt_builder.py` | Prompt construction module | 111 |
| `tests/test_prompt_builder.py` | Unit tests | 330 |

Total: 441 lines of code