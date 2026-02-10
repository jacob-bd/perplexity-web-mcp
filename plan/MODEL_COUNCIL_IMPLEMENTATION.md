# Model Council Implementation Plan

> **Status**: Draft - Pending RPC capture when Pro tier access becomes available
> **Last Updated**: 2026-02-10
> **Author**: Jacob + Claude

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Findings](#2-research-findings)
3. [Current Architecture Analysis](#3-current-architecture-analysis)
4. [Implementation Strategy](#4-implementation-strategy)
5. [Phase 0: RPC Capture & Analysis](#5-phase-0-rpc-capture--analysis)
6. [Phase 1: Core Implementation](#6-phase-1-core-implementation)
7. [Phase 2: MCP Integration](#7-phase-2-mcp-integration)
8. [Phase 3: Testing & Validation](#8-phase-3-testing--validation)
9. [Phase 4: Documentation](#9-phase-4-documentation)
10. [Technical Specifications](#10-technical-specifications)
11. [Risk Assessment](#11-risk-assessment)
12. [Open Questions](#12-open-questions)

---

## 1. Executive Summary

### What is Model Council?

Perplexity's **Model Council** is a multi-model research feature launched February 5, 2026, that queries multiple frontier AI models in parallel and synthesizes their responses into a unified answer.

### Goal

Add Model Council support to the Perplexity Web MCP, enabling users to:
- Query 3 models simultaneously
- Get synthesized responses with consensus/disagreement indicators
- Access merged citations from all sources

### Current Availability

| Tier | Access |
|------|--------|
| Max ($200/mo) | Available now (Web only) |
| Pro ($20/mo) | Coming soon |
| Free | Not available |

### Implementation Approach

Two possible strategies:

1. **Native API** (Preferred): Capture Perplexity's actual Model Council RPC calls and replicate them
2. **Client-Side Orchestration** (Fallback): Implement parallel querying ourselves if no dedicated API exists

---

## 2. Research Findings

### 2.1 How Model Council Works

Based on public documentation and tech coverage:

```
┌─────────────┐     ┌─────────────────────────────────────────┐
│   Query     │────>│           Model Council                  │
└─────────────┘     │                                          │
                    │  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
                    │  │ Model 1 │ │ Model 2 │ │ Model 3 │   │
                    │  │ (GPT-5.2)│ │(Claude) │ │ (Gemini)│   │
                    │  └────┬────┘ └────┬────┘ └────┬────┘   │
                    │       │           │           │         │
                    │       ▼           ▼           ▼         │
                    │  ┌─────────────────────────────────┐   │
                    │  │         Chair LLM               │   │
                    │  │   (Synthesizer - Claude 4.5)    │   │
                    │  └─────────────────────────────────┘   │
                    │                  │                      │
                    │                  ▼                      │
                    │  ┌─────────────────────────────────┐   │
                    │  │     Unified Response            │   │
                    │  │  - Consensus points             │   │
                    │  │  - Disagreement indicators      │   │
                    │  │  - Merged citations             │   │
                    │  └─────────────────────────────────┘   │
                    └─────────────────────────────────────────┘
```

### 2.2 Models Available for Council

| Model | Identifier (Known) | Provider | Thinking Variant |
|-------|-------------------|----------|------------------|
| GPT-5.2 | `gpt52` | OpenAI | `gpt52_thinking` |
| Claude Opus 4.5/4.6 | `claude46opus` | Anthropic | `claude46opusthinking` |
| Claude Sonnet 4.5 | `claude45sonnet` | Anthropic | `claude45sonnetthinking` |
| Gemini 3 Pro | `gemini30pro` | Google | Yes (only) |
| Gemini 3 Flash | `gemini30flash` | Google | `gemini30flash_high` |
| Grok 4.1 | `grok41nonreasoning` | xAI | `grok41reasoning` |

### 2.3 Chair/Synthesizer Model

- Default: **Claude Opus 4.5** for Max subscribers
- Role: Reviews all outputs, identifies best parts, merges into unified summary
- Behavior: Highlights consensus, explicitly flags disagreements

### 2.4 Key Features

1. **Parallel Execution**: All 3 models run concurrently
2. **Conflict Resolution**: Chair LLM resolves conflicts when evidence is clear
3. **Disagreement Surfacing**: Explicitly shows where models diverge
4. **Citation Merging**: Combines sources from all models

### 2.5 Limitations Observed

- Slower than single-model queries (3 parallel + synthesis)
- Web-only at launch
- Max tier exclusive initially
- Chair model may "flatten" nuanced disagreements

---

## 3. Current Architecture Analysis

### 3.1 Project Structure

```
src/perplexity_web_mcp/
├── __init__.py          # Public exports
├── core.py              # Perplexity client + Conversation class
├── models.py            # Model definitions (16 models)
├── config.py            # ClientConfig + ConversationConfig
├── enums.py             # CitationMode, SearchFocus, SourceFocus, TimeRange
├── http.py              # HTTPClient with retry + rate limiting
├── types.py             # Response, SearchResultItem, Coordinates
├── exceptions.py        # Custom exception hierarchy
├── constants.py         # API endpoints, headers, patterns
├── resilience.py        # RetryConfig, RateLimiter
├── cli/
│   └── auth.py          # Authentication, SubscriptionTier detection
├── mcp/
│   └── server.py        # FastMCP server with 20+ tools
└── api/
    └── server.py        # Anthropic/OpenAI compatible API server
```

### 3.2 Current Model System

**models.py** defines models as dataclass instances:

```python
@dataclass(frozen=True, slots=True)
class Model:
    name: str
    identifier: str    # API identifier (e.g., "gpt52")
    mode: str = "copilot"

class Models:
    BEST = Model("Best", "pplx_pro")
    GPT_52 = Model("GPT-5.2", "gpt52")
    CLAUDE_46_OPUS = Model("Claude Opus 4.6", "claude46opus")
    # ... etc
```

### 3.3 Query Flow

```
1. Perplexity.create_conversation() -> Conversation
2. Conversation.ask(query, model=...) -> self
3. Conversation._execute()
   ├── _upload_files() if needed
   ├── _build_payload() with model_preference
   ├── _http.init_search() to initialize session
   └── _stream() or _completion()
4. Response parsed from SSE stream
5. Answer + citations returned
```

### 3.4 MCP Tool Pattern

```python
@mcp.tool
def pplx_query(
    query: str,
    model: str = "auto",
    thinking: bool = False,
    source_focus: SourceFocusName = "web",
) -> str:
    """Tool implementation..."""
    client = _get_client()
    conversation = client.create_conversation(config)
    conversation.ask(query, model=selected_model)
    return format_response(conversation)
```

### 3.5 Subscription Tier Detection

```python
class SubscriptionTier(Enum):
    FREE = "none"
    PRO = "pro"
    MAX = "max"
    EDUCATION_PRO = "education_pro"

def get_user_info(token: str) -> UserInfo:
    # Fetches from /api/user endpoint
    # Returns UserInfo with subscription_tier
```

---

## 4. Implementation Strategy

### 4.1 Two Approaches

#### Approach A: Native API (Preferred)

If Perplexity exposes Model Council as a specific mode/endpoint:

```python
# Hypothetical - needs RPC capture to confirm
payload = {
    "mode": "council",  # or model_preference: "council"
    "council_models": ["gpt52", "claude46opus", "gemini30pro"],
    "chair_model": "claude45sonnet",
    "query_str": "..."
}
```

**Pros**:
- Uses Perplexity's optimized parallel infrastructure
- Gets their Chair LLM synthesis
- Consistent with web UI behavior
- Lower latency (server-side parallelism)

**Cons**:
- Dependent on their API structure
- Less flexibility in customization

#### Approach B: Client-Side Orchestration (Fallback)

If no dedicated API, implement ourselves:

```python
class ModelCouncil:
    def run_parallel(self, models: list[Model]) -> dict[str, Response]:
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {executor.submit(self._query, m): m for m in models}
            # Collect results
        return responses

    def synthesize(self, responses: dict) -> str:
        # Use a model to synthesize all responses
        synthesis_prompt = self._build_synthesis_prompt(responses)
        return self._perplexity.ask(synthesis_prompt)
```

**Pros**:
- Full control over implementation
- Works regardless of API structure
- Can customize synthesis logic

**Cons**:
- 4 API calls (3 parallel + 1 synthesis)
- Higher latency
- May not match Perplexity's synthesis quality

### 4.2 Decision Point

**Wait for RPC capture** to determine which approach is needed. If Perplexity has a native council endpoint, use Approach A. Otherwise, implement Approach B.

---

## 5. Phase 0: RPC Capture & Analysis

> **Status**: Pending Pro tier access

### 5.1 Objective

Capture and document the actual network requests when using Model Council on the web UI.

### 5.2 Tools Needed

- Chrome DevTools Network tab
- Browser with authenticated Max/Pro session
- Charles Proxy or similar (optional, for detailed analysis)

### 5.3 Capture Checklist

When Pro access becomes available, capture:

- [ ] **Initial Request**: What endpoint is called when selecting Model Council?
- [ ] **Model Selection**: How are the 3 models specified in the payload?
- [ ] **Chair Model**: Is the synthesizer model specified or implicit?
- [ ] **SSE Stream**: What events are emitted during streaming?
  - Individual model responses?
  - Synthesis progress?
  - Final combined response?
- [ ] **Response Structure**: What fields indicate consensus/disagreement?
- [ ] **Citations**: How are citations from multiple models merged?
- [ ] **Error Handling**: What happens if one model fails?

### 5.4 Expected Findings

Based on existing codebase patterns, likely scenarios:

**Scenario 1: New Endpoint**
```
POST /api/query/council
{
  "models": ["gpt52", "claude46opus", "gemini30pro"],
  "query_str": "...",
  "params": {...}
}
```

**Scenario 2: Mode in Existing Endpoint**
```
POST /query (existing endpoint)
{
  "params": {
    "model_preference": "council",
    "council_config": {...}
  }
}
```

**Scenario 3: Special Model Identifier**
```
POST /query
{
  "params": {
    "model_preference": "council_gpt52_claude46opus_gemini30pro"
  }
}
```

### 5.5 RPC Logging Script

Create a helper to log and save RPC calls:

```python
# plan/rpc_logger.py
"""
RPC Logger for Model Council capture.

Usage:
1. Open Perplexity in browser with DevTools Network tab
2. Execute a Model Council query
3. Right-click request -> Copy as cURL
4. Paste into this script
5. Script extracts and documents the request
"""

import json
from pathlib import Path

def parse_curl(curl_command: str) -> dict:
    """Parse a cURL command into structured data."""
    # Implementation to extract URL, headers, body
    pass

def save_capture(name: str, data: dict):
    """Save captured RPC to plan/rpc_captures/"""
    output_dir = Path(__file__).parent / "rpc_captures"
    output_dir.mkdir(exist_ok=True)

    with open(output_dir / f"{name}.json", "w") as f:
        json.dump(data, f, indent=2)

    print(f"Saved to rpc_captures/{name}.json")
```

---

## 6. Phase 1: Core Implementation

> **Prerequisite**: Phase 0 complete with RPC analysis

### 6.1 New Files to Create

#### 6.1.1 `src/perplexity_web_mcp/council.py`

Core Model Council implementation:

```python
"""Model Council - Query multiple models in parallel and synthesize responses."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any, Generator

from .models import Model, Models
from .types import Response, SearchResultItem
from .config import ConversationConfig
from .enums import CitationMode

if TYPE_CHECKING:
    from .core import Perplexity


@dataclass
class CouncilResult:
    """Result from a Model Council query."""

    synthesized_answer: str
    """The unified answer from the Chair LLM."""

    individual_responses: dict[str, str]
    """Mapping of model identifier to its raw answer."""

    consensus_points: list[str]
    """Points where all models agreed."""

    disagreements: list[dict[str, Any]]
    """Points of divergence with model positions."""

    merged_citations: list[SearchResultItem]
    """Deduplicated citations from all models."""

    models_used: list[str]
    """Identifiers of models that participated."""

    chair_model: str
    """Identifier of the synthesizer model."""

    raw_data: dict[str, Any] = field(default_factory=dict)
    """Full API response for debugging."""


class ModelCouncil:
    """Execute queries with multiple models and synthesize results."""

    # Default council composition
    DEFAULT_MODELS = [
        Models.GPT_52,
        Models.CLAUDE_45_SONNET,
        Models.GROK_41,
    ]

    DEFAULT_CHAIR = Models.CLAUDE_45_SONNET  # Based on research

    def __init__(
        self,
        perplexity: Perplexity,
        models: list[Model] | None = None,
        chair_model: Model | None = None,
    ) -> None:
        """Initialize Model Council.

        Args:
            perplexity: Authenticated Perplexity client
            models: List of 3 models for council (default: GPT-5.2, Claude, Grok)
            chair_model: Model for synthesis (default: Claude Sonnet 4.5)
        """
        self._perplexity = perplexity
        self._models = models or self.DEFAULT_MODELS
        self._chair_model = chair_model or self.DEFAULT_CHAIR

        if len(self._models) < 2:
            raise ValueError("Council requires at least 2 models")
        if len(self._models) > 5:
            raise ValueError("Council maximum is 5 models")

    def query(
        self,
        query: str,
        config: ConversationConfig | None = None,
        timeout: int = 300,
    ) -> CouncilResult:
        """Execute a council query.

        Args:
            query: The question to ask all models
            config: Optional conversation configuration
            timeout: Timeout in seconds for parallel execution

        Returns:
            CouncilResult with synthesized answer and metadata
        """
        # IMPLEMENTATION DEPENDS ON PHASE 0 FINDINGS
        #
        # Option A: If native API exists
        # return self._query_native(query, config)
        #
        # Option B: If client-side orchestration needed
        # return self._query_orchestrated(query, config, timeout)
        raise NotImplementedError("Awaiting RPC capture in Phase 0")

    def _query_native(
        self,
        query: str,
        config: ConversationConfig | None,
    ) -> CouncilResult:
        """Query using Perplexity's native council API."""
        # TODO: Implement based on RPC capture
        pass

    def _query_orchestrated(
        self,
        query: str,
        config: ConversationConfig | None,
        timeout: int,
    ) -> CouncilResult:
        """Query using client-side parallel orchestration."""
        responses = self._run_parallel(query, config, timeout)
        return self._synthesize(query, responses)

    def _run_parallel(
        self,
        query: str,
        config: ConversationConfig | None,
        timeout: int,
    ) -> dict[str, Response]:
        """Execute query across all models in parallel."""
        results: dict[str, Response] = {}

        with ThreadPoolExecutor(max_workers=len(self._models)) as executor:
            future_to_model = {
                executor.submit(
                    self._query_single_model, query, model, config
                ): model
                for model in self._models
            }

            for future in as_completed(future_to_model, timeout=timeout):
                model = future_to_model[future]
                try:
                    response = future.result()
                    results[model.identifier] = response
                except Exception as e:
                    # Log but continue - partial results are acceptable
                    results[model.identifier] = Response(
                        answer=f"[Error: {e}]",
                        search_results=[],
                    )

        return results

    def _query_single_model(
        self,
        query: str,
        model: Model,
        config: ConversationConfig | None,
    ) -> Response:
        """Query a single model and return its response."""
        conversation = self._perplexity.create_conversation(config)
        conversation.ask(query, model=model)
        return conversation._build_response()

    def _synthesize(
        self,
        original_query: str,
        responses: dict[str, Response],
    ) -> CouncilResult:
        """Synthesize responses using the chair model."""
        # Build synthesis prompt
        synthesis_prompt = self._build_synthesis_prompt(original_query, responses)

        # Query chair model
        conversation = self._perplexity.create_conversation()
        conversation.ask(synthesis_prompt, model=self._chair_model)

        # Merge citations
        merged_citations = self._merge_citations(responses)

        return CouncilResult(
            synthesized_answer=conversation.answer or "",
            individual_responses={
                mid: r.answer or "" for mid, r in responses.items()
            },
            consensus_points=[],  # TODO: Extract from synthesis
            disagreements=[],      # TODO: Extract from synthesis
            merged_citations=merged_citations,
            models_used=list(responses.keys()),
            chair_model=self._chair_model.identifier,
        )

    def _build_synthesis_prompt(
        self,
        original_query: str,
        responses: dict[str, Response],
    ) -> str:
        """Build the synthesis prompt for the chair model."""
        formatted_responses = "\n\n".join(
            f"=== {model_id.upper()} ===\n{resp.answer}"
            for model_id, resp in responses.items()
            if resp.answer
        )

        return f"""You are acting as the Chair of a Model Council. Multiple AI models have answered the same question. Your job is to:

1. Identify points of CONSENSUS where all models agree
2. Identify points of DISAGREEMENT where models diverge
3. Synthesize a unified answer that integrates the best insights
4. Be explicit about uncertainties and conflicts

ORIGINAL QUESTION:
{original_query}

MODEL RESPONSES:
{formatted_responses}

Please provide:
1. A synthesized answer combining the best insights
2. Note where models agreed (high confidence)
3. Note where models disagreed (requires further investigation)
4. Your recommendation based on the evidence"""

    def _merge_citations(
        self,
        responses: dict[str, Response],
    ) -> list[SearchResultItem]:
        """Merge and deduplicate citations from all responses."""
        seen_urls: set[str] = set()
        merged: list[SearchResultItem] = []

        for response in responses.values():
            for item in response.search_results:
                if item.url and item.url not in seen_urls:
                    seen_urls.add(item.url)
                    merged.append(item)

        return merged
```

#### 6.1.2 Update `src/perplexity_web_mcp/models.py`

Add council-related model helpers:

```python
# Add to Models class

class Models:
    # ... existing models ...

    # Council presets
    COUNCIL_DEFAULT = [GPT_52, CLAUDE_45_SONNET, GROK_41]
    COUNCIL_PREMIUM = [GPT_52, CLAUDE_46_OPUS, GEMINI_3_PRO_THINKING]
    COUNCIL_BALANCED = [CLAUDE_45_SONNET, GEMINI_3_FLASH, GROK_41]

    @classmethod
    def get_council_preset(cls, name: str) -> list[Model]:
        """Get a council preset by name."""
        presets = {
            "default": cls.COUNCIL_DEFAULT,
            "premium": cls.COUNCIL_PREMIUM,
            "balanced": cls.COUNCIL_BALANCED,
        }
        return presets.get(name, cls.COUNCIL_DEFAULT)
```

#### 6.1.3 Update `src/perplexity_web_mcp/__init__.py`

Export council module:

```python
from .council import ModelCouncil, CouncilResult

__all__ = [
    # ... existing exports ...
    "ModelCouncil",
    "CouncilResult",
]
```

---

## 7. Phase 2: MCP Integration

### 7.1 New MCP Tools

Add to `src/perplexity_web_mcp/mcp/server.py`:

```python
# =============================================================================
# Model Council Tools
# =============================================================================

COUNCIL_MODEL_MAP = {
    "gpt52": Models.GPT_52,
    "claude_sonnet": Models.CLAUDE_45_SONNET,
    "claude_opus": Models.CLAUDE_46_OPUS,
    "gemini_flash": Models.GEMINI_3_FLASH,
    "gemini_pro": Models.GEMINI_3_PRO_THINKING,
    "grok": Models.GROK_41,
}


@mcp.tool
def pplx_council(
    query: str,
    models: list[str] | None = None,
    source_focus: SourceFocusName = "web",
) -> str:
    """Query multiple AI models simultaneously and get a synthesized answer.

    Model Council runs your query through 3 frontier AI models in parallel,
    then synthesizes their responses to highlight consensus and disagreements.

    This is useful for:
    - Investment research (balanced perspectives)
    - Complex decisions (multiple viewpoints)
    - Fact-checking (cross-reference models)
    - Creative brainstorming (diverse ideas)

    Args:
        query: The question to ask all models
        models: List of model names (default: ["gpt52", "claude_sonnet", "grok"])
                Available: gpt52, claude_sonnet, claude_opus, gemini_flash,
                          gemini_pro, grok
        source_focus: Source type - web, academic, social, finance, all

    Returns:
        Synthesized answer with:
        - Combined insights from all models
        - Points of consensus (high confidence)
        - Points of disagreement (needs investigation)
        - Merged citations from all sources

    Note: Requires Pro or Max subscription. Takes longer than single-model queries.
    """
    from perplexity_web_mcp.council import ModelCouncil

    # Default models
    if models is None:
        models = ["gpt52", "claude_sonnet", "grok"]

    # Validate and map models
    council_models = []
    for model_name in models:
        if model_name not in COUNCIL_MODEL_MAP:
            return f"Error: Unknown model '{model_name}'. Available: {list(COUNCIL_MODEL_MAP.keys())}"
        council_models.append(COUNCIL_MODEL_MAP[model_name])

    try:
        client = _get_client()
        council = ModelCouncil(client, models=council_models)

        config = ConversationConfig(
            citation_mode=CitationMode.DEFAULT,
            source_focus=SOURCE_FOCUS_MAP.get(source_focus, SearchFocus.WEB),
        )

        result = council.query(query, config=config)

        # Format response
        output = [result.synthesized_answer]

        if result.consensus_points:
            output.append("\n\n**Points of Consensus:**")
            for point in result.consensus_points:
                output.append(f"- {point}")

        if result.disagreements:
            output.append("\n\n**Points of Disagreement:**")
            for d in result.disagreements:
                output.append(f"- {d}")

        if result.merged_citations:
            output.append("\n\n**Citations:**")
            for i, cite in enumerate(result.merged_citations, 1):
                output.append(f"[{i}]: {cite.url}")

        output.append(f"\n\n*Models consulted: {', '.join(result.models_used)}*")
        output.append(f"*Synthesized by: {result.chair_model}*")

        return "\n".join(output)

    except Exception as e:
        return f"Error: Council query failed: {e}"


@mcp.tool
def pplx_council_compare(
    query: str,
    models: list[str] | None = None,
    source_focus: SourceFocusName = "web",
) -> str:
    """Query multiple models and show individual responses side-by-side.

    Unlike pplx_council which synthesizes, this shows each model's raw response
    for direct comparison without synthesis.

    Args:
        query: The question to ask all models
        models: List of model names (default: ["gpt52", "claude_sonnet", "grok"])
        source_focus: Source type - web, academic, social, finance, all

    Returns:
        Individual responses from each model, labeled and separated.
    """
    from perplexity_web_mcp.council import ModelCouncil

    if models is None:
        models = ["gpt52", "claude_sonnet", "grok"]

    council_models = []
    for model_name in models:
        if model_name not in COUNCIL_MODEL_MAP:
            return f"Error: Unknown model '{model_name}'"
        council_models.append(COUNCIL_MODEL_MAP[model_name])

    try:
        client = _get_client()
        council = ModelCouncil(client, models=council_models)

        # Run parallel without synthesis
        responses = council._run_parallel(query, None, timeout=300)

        output = [f"# Model Comparison: {query}\n"]

        for model_id, response in responses.items():
            output.append(f"\n## {model_id.upper()}\n")
            output.append(response.answer or "[No response]")

            if response.search_results:
                output.append("\n\n*Citations:*")
                for i, cite in enumerate(response.search_results[:5], 1):
                    output.append(f"  [{i}]: {cite.url}")

        return "\n".join(output)

    except Exception as e:
        return f"Error: Comparison failed: {e}"
```

### 7.2 Update MCP Server Instructions

Update the `instructions` parameter in FastMCP:

```python
mcp = FastMCP(
    "perplexity-web-mcp",
    instructions="""Search the web with Perplexity AI using multiple frontier models.

Available tools:
- pplx_query: Flexible single-model queries with model selection
- pplx_council: Query 3 models in parallel, get synthesized answer (Pro/Max)
- pplx_council_compare: Compare raw responses from multiple models (Pro/Max)
- pplx_deep_research: In-depth research reports
- Model-specific tools: pplx_gpt52, pplx_claude_opus, etc.

Model Council is ideal for:
- Investment/financial research
- Complex decision-making
- Fact-checking across perspectives
- Creative brainstorming
""",
)
```

---

## 8. Phase 3: Testing & Validation

### 8.1 Unit Tests

Create `tests/test_council.py`:

```python
"""Tests for Model Council functionality."""

import pytest
from unittest.mock import Mock, patch
from perplexity_web_mcp.council import ModelCouncil, CouncilResult
from perplexity_web_mcp.models import Models
from perplexity_web_mcp.types import Response, SearchResultItem


class TestModelCouncil:
    """Tests for ModelCouncil class."""

    def test_init_default_models(self):
        """Test initialization with default models."""
        mock_perplexity = Mock()
        council = ModelCouncil(mock_perplexity)

        assert len(council._models) == 3
        assert council._chair_model == Models.CLAUDE_45_SONNET

    def test_init_custom_models(self):
        """Test initialization with custom models."""
        mock_perplexity = Mock()
        custom_models = [Models.GPT_52, Models.GROK_41]

        council = ModelCouncil(mock_perplexity, models=custom_models)

        assert council._models == custom_models

    def test_init_too_few_models(self):
        """Test that < 2 models raises error."""
        mock_perplexity = Mock()

        with pytest.raises(ValueError, match="at least 2 models"):
            ModelCouncil(mock_perplexity, models=[Models.GPT_52])

    def test_init_too_many_models(self):
        """Test that > 5 models raises error."""
        mock_perplexity = Mock()

        with pytest.raises(ValueError, match="maximum is 5"):
            ModelCouncil(mock_perplexity, models=[
                Models.GPT_52,
                Models.CLAUDE_45_SONNET,
                Models.GROK_41,
                Models.GEMINI_3_FLASH,
                Models.SONAR,
                Models.BEST,  # 6th model
            ])

    def test_merge_citations_deduplicates(self):
        """Test that citation merging removes duplicates."""
        mock_perplexity = Mock()
        council = ModelCouncil(mock_perplexity)

        responses = {
            "model1": Response(
                answer="Answer 1",
                search_results=[
                    SearchResultItem(url="https://example.com/1"),
                    SearchResultItem(url="https://example.com/2"),
                ]
            ),
            "model2": Response(
                answer="Answer 2",
                search_results=[
                    SearchResultItem(url="https://example.com/1"),  # Duplicate
                    SearchResultItem(url="https://example.com/3"),
                ]
            ),
        }

        merged = council._merge_citations(responses)

        assert len(merged) == 3
        urls = [c.url for c in merged]
        assert "https://example.com/1" in urls
        assert "https://example.com/2" in urls
        assert "https://example.com/3" in urls

    def test_build_synthesis_prompt(self):
        """Test synthesis prompt generation."""
        mock_perplexity = Mock()
        council = ModelCouncil(mock_perplexity)

        responses = {
            "gpt52": Response(answer="GPT answer"),
            "claude45sonnet": Response(answer="Claude answer"),
        }

        prompt = council._build_synthesis_prompt("Test query", responses)

        assert "Test query" in prompt
        assert "GPT answer" in prompt
        assert "Claude answer" in prompt
        assert "CONSENSUS" in prompt
        assert "DISAGREEMENT" in prompt


class TestCouncilResult:
    """Tests for CouncilResult dataclass."""

    def test_creation(self):
        """Test CouncilResult creation."""
        result = CouncilResult(
            synthesized_answer="Combined answer",
            individual_responses={"gpt52": "GPT answer"},
            consensus_points=["Point 1"],
            disagreements=[],
            merged_citations=[],
            models_used=["gpt52"],
            chair_model="claude45sonnet",
        )

        assert result.synthesized_answer == "Combined answer"
        assert len(result.consensus_points) == 1
```

### 8.2 Integration Tests

```python
"""Integration tests for Model Council (requires authentication)."""

import pytest
import os
from perplexity_web_mcp import Perplexity, ModelCouncil
from perplexity_web_mcp.models import Models


@pytest.mark.skipif(
    not os.environ.get("PERPLEXITY_SESSION_TOKEN"),
    reason="Requires PERPLEXITY_SESSION_TOKEN"
)
class TestCouncilIntegration:
    """Integration tests requiring live API access."""

    @pytest.fixture
    def perplexity(self):
        token = os.environ["PERPLEXITY_SESSION_TOKEN"]
        return Perplexity(token)

    def test_parallel_execution(self, perplexity):
        """Test that parallel execution completes."""
        council = ModelCouncil(
            perplexity,
            models=[Models.GPT_52, Models.CLAUDE_45_SONNET],
        )

        result = council.query("What is 2+2?")

        assert result.synthesized_answer
        assert len(result.models_used) == 2

    def test_synthesis_quality(self, perplexity):
        """Test that synthesis produces coherent output."""
        council = ModelCouncil(perplexity)

        result = council.query(
            "What are the main benefits of renewable energy?"
        )

        # Should have substantive synthesis
        assert len(result.synthesized_answer) > 100
        # Should identify the models used
        assert len(result.models_used) >= 2
```

### 8.3 MCP Tool Tests

```python
"""Tests for MCP council tools."""

import pytest
from perplexity_web_mcp.mcp.server import pplx_council, pplx_council_compare


class TestMCPCouncilTools:
    """Tests for MCP tool wrappers."""

    def test_pplx_council_invalid_model(self):
        """Test error handling for invalid model name."""
        result = pplx_council(
            query="Test",
            models=["invalid_model"],
        )

        assert "Error: Unknown model" in result

    def test_pplx_council_compare_format(self):
        """Test that compare output is properly formatted."""
        # This would need mocking in real tests
        pass
```

---

## 9. Phase 4: Documentation

### 9.1 README Updates

Add to main README.md:

```markdown
## Model Council

Query multiple AI models simultaneously and get synthesized answers.

### Usage

```python
from perplexity_web_mcp import Perplexity, ModelCouncil
from perplexity_web_mcp.models import Models

# Initialize
perplexity = Perplexity(session_token)
council = ModelCouncil(
    perplexity,
    models=[Models.GPT_52, Models.CLAUDE_45_SONNET, Models.GROK_41],
)

# Query
result = council.query("What are the implications of quantum computing?")

print(result.synthesized_answer)
print(f"Models used: {result.models_used}")
print(f"Citations: {len(result.merged_citations)}")
```

### MCP Tools

```
pplx_council - Query 3 models, get synthesized answer
pplx_council_compare - Compare raw responses side-by-side
```

### Requirements

- Pro or Max subscription
- Web access (mobile not yet supported)
```

### 9.2 Docstring Examples

All public methods should have usage examples in docstrings.

---

## 10. Technical Specifications

### 10.1 Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Parallel Query Time | < 30s | All 3 models complete |
| Synthesis Time | < 15s | Chair model processing |
| Total E2E Time | < 60s | Including all overhead |
| Memory Usage | < 100MB | For 3 concurrent requests |

### 10.2 Rate Limiting

- Perplexity applies rate limits per account
- Council makes 4 requests (3 parallel + 1 synthesis)
- Default rate: 0.5 req/sec per HTTPClient
- For council: Create separate clients to avoid throttling

### 10.3 Error Handling

| Error | Handling |
|-------|----------|
| One model fails | Continue with remaining, note in result |
| All models fail | Raise CouncilError with details |
| Synthesis fails | Return individual responses unsynthesized |
| Timeout | Return partial results if available |
| Auth failure | Raise AuthenticationError |

### 10.4 Thread Safety

- Each model query uses its own `Conversation` instance
- `HTTPClient` is thread-safe (uses `threading.Lock` for rate limiting)
- No shared mutable state between parallel queries

---

## 11. Risk Assessment

### 11.1 Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| No native API exists | Medium | Medium | Implement client-side orchestration |
| Rate limiting stricter for council | High | Low | Implement backoff, document limits |
| Response format changes | Medium | Low | Version detection, graceful fallback |
| Synthesis quality varies | Low | Medium | Allow custom synthesis prompts |

### 11.2 Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Feature removed/changed | High | Abstract implementation, easy updates |
| Pro tier access delayed | Low | Wait for access, test with Max if available |
| Terms of service concerns | Medium | Review ToS, document compliance |

---

## 12. Open Questions

### 12.1 Pending RPC Capture

- [ ] What is the actual endpoint for Model Council?
- [ ] How are models specified in the payload?
- [ ] Is synthesis server-side or client-triggered?
- [ ] What SSE events are emitted during streaming?
- [ ] How are consensus/disagreement indicators structured?

### 12.2 Design Decisions

- [ ] Should we support more than 3 models? (Perplexity does 3)
- [ ] Should we allow custom chair models?
- [ ] Should we expose individual responses in MCP tool?
- [ ] Should we cache council results?

### 12.3 Future Enhancements

- [ ] Streaming council results (show individual responses as they arrive)
- [ ] Confidence scoring based on agreement level
- [ ] Perspective highlighting (where models diverge)
- [ ] Council presets (research, creative, technical)

---

## Appendix A: File Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/perplexity_web_mcp/council.py` | Create | ModelCouncil class + CouncilResult |
| `src/perplexity_web_mcp/models.py` | Modify | Add council presets |
| `src/perplexity_web_mcp/__init__.py` | Modify | Export council module |
| `src/perplexity_web_mcp/mcp/server.py` | Modify | Add pplx_council tools |
| `tests/test_council.py` | Create | Unit + integration tests |
| `README.md` | Modify | Add council documentation |

---

## Appendix B: Timeline Estimate

| Phase | Dependency | Duration |
|-------|------------|----------|
| Phase 0: RPC Capture | Pro tier access | 1 day |
| Phase 1: Core Implementation | Phase 0 complete | 2-3 days |
| Phase 2: MCP Integration | Phase 1 complete | 1 day |
| Phase 3: Testing | Phase 2 complete | 1-2 days |
| Phase 4: Documentation | Phase 3 complete | 0.5 day |

**Total**: ~6-8 days after Pro tier access

---

*This plan will be updated after RPC capture in Phase 0.*
