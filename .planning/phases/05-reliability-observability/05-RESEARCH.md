# Phase 5: Reliability & Observability - Research

**Researched:** 2026-02-05
**Domain:** Reliability patterns and observability infrastructure for best-effort tool calling systems
**Confidence:** HIGH

## Summary

Phase 5 addresses how to make the tool calling system reliable and observable in production. Unlike traditional systems where failures break functionality, this best-effort system must gracefully degrade when tool parsing fails, provide clear feedback about why failures occurred, and collect metrics showing which strategies and models work best.

The core challenge is maintaining API contract compliance while handling parsing failures transparently. When the response parser fails to extract tool calls, the system must return a conversational text response (stop_reason: end_turn) rather than breaking the request. This graceful degradation pattern is critical for production reliability.

Research shows that modern Python systems use structured logging (JSON format) with observability platforms, prometheus-client for metrics collection, and explicit fallback paths for error handling. The existing codebase already has foundational logging in response_parser.py and server.py, uses Python's standard logging module, and has try/except blocks catching parse errors.

**Primary recommendation:** Implement three-layer observability (logs, metrics, user-facing errors) with graceful fallback to text-only responses when parsing fails. Use prometheus-client Counter and Histogram metrics for success rate tracking per strategy, structured logging for debugging, and clear error messages explaining parsing failures without exposing internals.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| logging | Built-in | Standard Python logging | Already in use, zero dependencies |
| prometheus-client | 0.21+ | Metrics collection | Industry standard, FastAPI compatible |
| FastAPI | 0.115+ | Already in stack | Built-in exception handling, middleware support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| structlog | 24.1+ | Structured JSON logging | Production deployments needing log aggregation |
| python-json-logger | 2.0+ | JSON log formatting | Lighter alternative to structlog |
| OpenTelemetry | 1.20+ | Distributed tracing | Multi-service observability needs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| prometheus-client | StatsD/Graphite | Prometheus is pull-based, better for containers |
| logging module | loguru | loguru already in project (used by core), but adds dependency vs standard library |
| Middleware metrics | Manual tracking | Middleware auto-captures all requests, less error-prone |

**Installation:**
```bash
# Add prometheus-client to api dependencies
uv pip install prometheus-client

# Optional: structured logging (if needed for production)
uv pip install structlog
```

## Architecture Patterns

### Recommended Observability Layers

Modern resilient systems implement three observability layers:

1. **Metrics** - Counter/Histogram for success rates, latency
2. **Logs** - Structured logging for debugging and tracing
3. **User-facing errors** - Clear messages explaining failures

```
┌─────────────────────────────────────────────┐
│         User-Facing API Response            │
│  (stop_reason: end_turn OR tool_use)        │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │   Graceful Fallback   │
        │  (try/except wrapper) │
        └───────────┬───────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼────┐    ┌────▼────┐    ┌────▼────┐
│ Metrics│    │  Logs   │    │ Errors  │
│Counter │    │Structured    │Clear msg│
│Histogram    │ JSON    │    │No stack │
└────────┘    └─────────┘    └─────────┘
```

### Pattern 1: Graceful Fallback with Metrics

**What:** Wrap parsing in try/except, increment failure counter, return text-only response
**When to use:** All tool parsing operations
**Example:**
```python
# Source: AWS Well-Architected Reliability Pillar + FastAPI error handling
from prometheus_client import Counter, Histogram
import logging

# Metrics
parse_attempts = Counter(
    'tool_parse_attempts_total',
    'Total tool parsing attempts',
    ['strategy', 'success']
)
parse_duration = Histogram(
    'tool_parse_duration_seconds',
    'Tool parsing duration',
    ['strategy']
)

def parse_with_fallback(answer: str, tools: list | None) -> tuple[list[dict], str]:
    """Parse response with graceful fallback to text-only.

    Args:
        answer: Model response text
        tools: Tools that were available (for context)

    Returns:
        Tuple of (content_blocks, stop_reason)
    """
    # If no tools provided, return text-only immediately
    if not tools:
        return ([{"type": "text", "text": answer}], "end_turn")

    try:
        with parse_duration.labels(strategy='unknown').time():
            parse_result = parse_response(answer)

        strategy = parse_result.get('strategy', 'none')
        confidence = parse_result.get('confidence', 0.0)
        tool_calls = parse_result.get('tool_calls', [])

        # Update metrics with actual strategy
        parse_duration.labels(strategy=strategy).observe(0)  # Already timed above

        # Check confidence threshold
        if tool_calls and confidence >= 0.7:
            # Success - convert to tool_use blocks
            parse_attempts.labels(strategy=strategy, success='true').inc()
            content_blocks, stop_reason = transform_to_tool_use_blocks(
                parse_result, answer, confidence_threshold=0.7
            )
            return (content_blocks, stop_reason)
        else:
            # Low confidence - graceful fallback
            parse_attempts.labels(strategy=strategy, success='false').inc()
            logging.info(
                f"Graceful fallback: Tool calls detected but confidence "
                f"{confidence:.2f} < 0.7, returning text-only"
            )
            return ([{"type": "text", "text": answer}], "end_turn")

    except Exception as e:
        # Parse failure - graceful fallback
        parse_attempts.labels(strategy='error', success='false').inc()
        logging.warning(f"Tool parsing failed: {type(e).__name__}: {e}")
        logging.debug(f"Failed to parse response: {answer[:200]}...")

        # Return text-only response - system continues operating
        return ([{"type": "text", "text": answer}], "end_turn")
```

### Pattern 2: Success Rate Metrics Collection

**What:** Track success/failure rates per format/strategy using Prometheus Counter
**When to use:** All parsing attempts
**Example:**
```python
# Source: Prometheus Python client docs + FastAPI observability patterns
from prometheus_client import Counter, Histogram, generate_latest
from fastapi import Response

# Define metrics at module level (singleton)
parse_attempts = Counter(
    'tool_parse_attempts_total',
    'Total parsing attempts by strategy and outcome',
    ['strategy', 'success']  # Labels for filtering
)

parse_confidence = Histogram(
    'tool_parse_confidence',
    'Confidence scores of parsing attempts',
    ['strategy'],
    buckets=[0.0, 0.3, 0.5, 0.7, 0.9, 1.0]
)

tool_calls_detected = Counter(
    'tool_calls_detected_total',
    'Number of tool calls detected',
    ['strategy', 'tool_name']
)

# Expose metrics endpoint
@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint."""
    return Response(
        content=generate_latest(),
        media_type="text/plain; version=0.0.4"
    )

# Track metrics in parsing flow
def parse_and_track(answer: str) -> dict:
    """Parse with automatic metrics tracking."""
    parse_result = parse_response(answer)

    strategy = parse_result['strategy']
    confidence = parse_result['confidence']
    tool_calls = parse_result['tool_calls']

    # Track confidence distribution
    parse_confidence.labels(strategy=strategy).observe(confidence)

    # Track success/failure
    success = 'true' if tool_calls else 'false'
    parse_attempts.labels(strategy=strategy, success=success).inc()

    # Track individual tool calls
    for call in tool_calls:
        tool_name = call.get('name', 'unknown')
        tool_calls_detected.labels(
            strategy=strategy,
            tool_name=tool_name
        ).inc()

    return parse_result
```

### Pattern 3: Clear Error Messages Without Internal Details

**What:** Provide actionable error messages to users without exposing stack traces
**When to use:** All error responses to external users
**Example:**
```python
# Source: Python error handling best practices + API security guidelines
import logging

def format_parsing_error(
    error: Exception,
    answer_preview: str,
    strategy_attempted: str | None = None
) -> str:
    """Format user-friendly error message for parsing failures.

    Args:
        error: Original exception
        answer_preview: First 100 chars of response
        strategy_attempted: Which strategy was being tried

    Returns:
        User-friendly error message (no stack traces)
    """
    # Log full details internally
    logging.error(
        f"Tool parsing failed: {type(error).__name__}: {error}",
        exc_info=True,
        extra={
            'strategy': strategy_attempted,
            'answer_preview': answer_preview,
        }
    )

    # Return sanitized message to user
    error_messages = {
        'SyntaxError': "Could not parse tool call format. The model's response contained malformed code.",
        'JSONDecodeError': "Tool arguments were not valid JSON. The model did not provide properly formatted parameters.",
        'KeyError': "Tool call missing required fields. The model's response did not include all necessary information.",
        'ValueError': "Tool arguments had invalid values. The model provided parameters that could not be processed.",
    }

    error_type = type(error).__name__
    message = error_messages.get(
        error_type,
        "Unable to parse tool calls from model response."
    )

    # Add context if available
    if strategy_attempted:
        message += f" (Attempted: {strategy_attempted} strategy)"

    return message

# Usage in API endpoint
try:
    parse_result = parse_response(answer)
except Exception as e:
    user_message = format_parsing_error(e, answer[:100], "python_ast")
    # Don't break the response - return text with error context
    return {
        "content": [{
            "type": "text",
            "text": f"{answer}\n\n[Note: {user_message}]"
        }],
        "stop_reason": "end_turn"
    }
```

### Pattern 4: Structured Logging for Production Debugging

**What:** Use JSON logging with correlation IDs for tracing requests through parsing
**When to use:** Production deployments
**Example:**
```python
# Source: FastAPI middleware patterns + structlog documentation
import logging
import json
import time
from contextvars import ContextVar
from typing import Any

# Context variable for request ID (thread-safe in async)
request_id_var: ContextVar[str | None] = ContextVar('request_id', default=None)

class StructuredFormatter(logging.Formatter):
    """JSON formatter for structured logs."""

    def format(self, record: logging.LogRecord) -> str:
        """Format log record as JSON."""
        log_data = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
        }

        # Add request ID if available
        request_id = request_id_var.get()
        if request_id:
            log_data['request_id'] = request_id

        # Add extra fields if present
        if hasattr(record, 'strategy'):
            log_data['strategy'] = record.strategy
        if hasattr(record, 'confidence'):
            log_data['confidence'] = record.confidence
        if hasattr(record, 'tool_count'):
            log_data['tool_count'] = record.tool_count

        # Add exception info if present
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)

        return json.dumps(log_data)

# Configure structured logging
def setup_structured_logging():
    """Configure JSON logging for production."""
    handler = logging.StreamHandler()
    handler.setFormatter(StructuredFormatter())

    logger = logging.getLogger('perplexity_web_mcp')
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)

# Middleware to set request ID
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    """Add unique request ID to context."""
    import uuid
    request_id = str(uuid.uuid4())
    request_id_var.set(request_id)

    response = await call_next(request)
    response.headers['X-Request-ID'] = request_id
    return response

# Usage in parsing
def parse_with_structured_logging(answer: str) -> dict:
    """Parse with structured log output."""
    start = time.time()

    try:
        result = parse_response(answer)

        logging.info(
            "Tool parsing completed",
            extra={
                'strategy': result['strategy'],
                'confidence': result['confidence'],
                'tool_count': len(result['tool_calls']),
                'duration_ms': (time.time() - start) * 1000,
            }
        )
        return result

    except Exception as e:
        logging.error(
            "Tool parsing failed",
            exc_info=True,
            extra={
                'duration_ms': (time.time() - start) * 1000,
                'answer_length': len(answer),
            }
        )
        raise
```

### Anti-Patterns to Avoid

- **Breaking API on parse failure:** Never raise HTTPException for parsing errors - return text-only response
- **Exposing stack traces to users:** Log internally, return sanitized messages
- **Incrementing metrics inside exceptions:** Metrics may not record if exception propagates
- **Blocking on metric writes:** Use prometheus-client's async-safe methods
- **Over-logging in hot path:** Log at DEBUG for per-request details, INFO for summaries

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Metrics collection | Custom counter dict | prometheus-client Counter/Histogram | Thread-safe, standard format, Grafana integration |
| JSON logging | Manual json.dumps() | structlog or python-json-logger | Handles edge cases, context binding, performance optimized |
| Error correlation | Thread locals | contextvars.ContextVar | Async-safe, Python 3.7+ standard |
| Rate calculation | Manual math | Prometheus PromQL queries | rate(counter[5m]) handles rollover, gaps, aggregation |
| Log aggregation | Custom log parser | Loki, Elasticsearch, CloudWatch | Production-tested, scalable, queryable |

**Key insight:** Observability is infrastructure, not features. Use standard libraries (prometheus-client, logging) rather than custom metrics systems. Grafana + Prometheus are industry standard for good reason.

## Common Pitfalls

### Pitfall 1: Breaking API Contract on Parse Failure

**What goes wrong:** Raising HTTPException 500 when parsing fails breaks Claude Code compatibility

**Why it happens:**
- Natural instinct to treat parse failures as errors
- try/except without fallback path
- Missing understanding that parsing is best-effort
- Expecting tool calls to always work

**How to avoid:**
- Always return valid Anthropic response format
- Parse failure → text-only response (stop_reason: end_turn)
- Log errors internally, don't expose to client
- Test with malformed responses to verify fallback

**Warning signs:**
- Claude Code shows 500 errors
- Users report API "crashes" when tools provided
- Test failures on edge cases
- Exception traces in client logs

### Pitfall 2: Metrics That Don't Answer Questions

**What goes wrong:** Collecting metrics that look useful but don't help debug actual problems

**Why it happens:**
- Tracking "number of parses" without success/failure breakdown
- No labels distinguishing strategies
- Counting calls but not measuring confidence distribution
- Missing correlation between metrics (e.g., which models trigger which strategies)

**How to avoid:**
- Start with questions: "Which strategy works best? Which models fail most? What confidence distribution?"
- Use labels for dimensions (strategy, success, model)
- Track distributions (Histogram) not just counts
- Link metrics to business value (user experience, not just internal operations)

**Warning signs:**
- Can't answer "what's the success rate for AST parsing?"
- Debugging requires reading logs instead of checking dashboards
- Metrics don't change when system behavior changes
- Too many metrics to understand (metric explosion)

### Pitfall 3: Logging Everything at INFO Level

**What goes wrong:** Logs become noise, hard to find actual issues

**Why it happens:**
- Every parsing attempt logged at INFO
- Individual tool calls logged verbosely
- No distinction between normal operation and problems
- Copy-paste logging from examples

**How to avoid:**
- INFO: Summary events (parse completed with X tools)
- DEBUG: Per-tool details, individual strategy attempts
- WARNING: Fallback to text-only, low confidence
- ERROR: Actual failures (parse crashed, network issues)
- Use structured fields instead of message interpolation

**Warning signs:**
- Logs scroll too fast to read
- Can't filter to just problems
- Log storage costs escalate
- Search timeouts in log aggregation

### Pitfall 4: Error Messages Exposing Internal State

**What goes wrong:** User sees "KeyError: 'arguments'" or full stack traces

**Why it happens:**
- Re-raising exceptions without sanitizing
- Not catching specific exception types
- Logging to console instead of proper channels
- Missing error message mapping

**How to avoid:**
- Catch specific exceptions (SyntaxError, JSONDecodeError)
- Map to user-friendly messages ("Tool format invalid")
- Log full details internally with exc_info=True
- Never include stack traces in API responses
- Test error paths explicitly

**Warning signs:**
- Users report confusing error messages
- Stack traces visible in responses
- Internal variable names in errors
- Security scanners flag information disclosure

### Pitfall 5: Not Testing Observability Infrastructure

**What goes wrong:** Metrics endpoint returns 500, logs missing in production

**Why it happens:**
- Observability code treated as "infrastructure" not features
- No tests for metrics collection
- Logging configured differently in dev vs prod
- Prometheus endpoint not included in health checks

**How to avoid:**
- Unit test: metrics increment correctly
- Integration test: /metrics endpoint returns valid format
- Load test: metrics don't impact latency
- Include observability in CI/CD checks

**Warning signs:**
- Metrics endpoint 404 in production
- Grafana shows no data after deployment
- Logs missing for certain code paths
- Can't reproduce issue because logs inadequate

## Code Examples

Verified patterns from official sources:

### Minimal Metrics Integration

```python
# Source: prometheus-client documentation + FastAPI patterns
from prometheus_client import Counter, Histogram, generate_latest
from fastapi import FastAPI, Response
import time

app = FastAPI()

# Define metrics at module level
parse_total = Counter(
    'tool_parse_total',
    'Total parsing attempts',
    ['strategy', 'result']  # Labels
)

parse_duration = Histogram(
    'tool_parse_duration_seconds',
    'Parsing duration',
    ['strategy']
)

@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint."""
    return Response(
        content=generate_latest(),
        media_type="text/plain; version=0.0.4"
    )

def parse_with_metrics(text: str) -> dict:
    """Parse with automatic metric tracking."""
    start = time.time()

    try:
        result = parse_response(text)
        strategy = result['strategy']

        # Record success
        parse_total.labels(
            strategy=strategy,
            result='success' if result['tool_calls'] else 'no_tools'
        ).inc()

        # Record duration
        parse_duration.labels(strategy=strategy).observe(time.time() - start)

        return result

    except Exception as e:
        # Record failure
        parse_total.labels(strategy='error', result='failure').inc()
        parse_duration.labels(strategy='error').observe(time.time() - start)
        raise
```

### Graceful Degradation in API Endpoint

```python
# Source: AWS Well-Architected + Anthropic API compatibility
from fastapi import HTTPException
import logging

@app.post("/v1/messages")
async def create_message(request: Request, body: MessagesRequest):
    """Create message with graceful tool parsing degradation."""

    # ... existing setup code ...

    # Parse response for tool calls IF tools provided
    if body.tools:
        try:
            parse_result = parse_response(answer)
            content_blocks, stop_reason = transform_to_tool_use_blocks(
                parse_result, answer, confidence_threshold=0.7
            )

            # Log success
            if stop_reason == "tool_use":
                logging.info(
                    f"Tool calling success: {len(parse_result['tool_calls'])} tools "
                    f"via {parse_result['strategy']} strategy"
                )
            else:
                logging.info(
                    f"Graceful fallback: confidence {parse_result['confidence']:.2f} "
                    f"below threshold"
                )

        except Exception as parse_error:
            # GRACEFUL DEGRADATION: Don't break the response
            logging.warning(
                f"Tool parsing failed: {type(parse_error).__name__}: {parse_error}",
                exc_info=True
            )

            # Fallback to text-only response
            content_blocks = [{"type": "text", "text": answer}]
            stop_reason = "end_turn"

            # Optionally append note to user
            # content_blocks[0]["text"] += "\n\n[Note: Tool parsing unavailable]"
    else:
        # No tools - text-only response
        content_blocks = [{"type": "text", "text": answer}]
        stop_reason = "end_turn"

    # Return valid response regardless of parsing outcome
    return {
        "id": response_id,
        "type": "message",
        "role": "assistant",
        "content": content_blocks,
        "model": body.model,
        "stop_reason": stop_reason,
        "usage": {...}
    }
```

### Strategy-Level Success Rate Tracking

```python
# Source: Prometheus best practices + observability patterns
from prometheus_client import Counter

# Track at granular level
strategy_results = Counter(
    'tool_parse_strategy_results_total',
    'Parsing results by strategy',
    ['strategy', 'outcome', 'confidence_bucket']
)

def record_parse_outcome(parse_result: dict):
    """Record parsing outcome with detailed labels."""
    strategy = parse_result.get('strategy', 'none')
    confidence = parse_result.get('confidence', 0.0)
    has_tools = len(parse_result.get('tool_calls', [])) > 0

    # Determine outcome
    if not has_tools:
        outcome = 'no_tools_detected'
    elif confidence >= 0.9:
        outcome = 'high_confidence'
    elif confidence >= 0.7:
        outcome = 'medium_confidence'
    else:
        outcome = 'low_confidence'

    # Bucket confidence for histogram-like tracking
    if confidence >= 0.9:
        bucket = '0.9-1.0'
    elif confidence >= 0.7:
        bucket = '0.7-0.9'
    elif confidence >= 0.5:
        bucket = '0.5-0.7'
    else:
        bucket = '0.0-0.5'

    # Record
    strategy_results.labels(
        strategy=strategy,
        outcome=outcome,
        confidence_bucket=bucket
    ).inc()

# Usage
parse_result = parse_response(text)
record_parse_outcome(parse_result)

# Query in Prometheus:
# Success rate for AST parsing:
#   rate(tool_parse_strategy_results_total{strategy="python_ast",outcome=~"high_confidence|medium_confidence"}[5m])
#   /
#   rate(tool_parse_strategy_results_total{strategy="python_ast"}[5m])
```

### Clear Error Messages for Common Failures

```python
# Source: Python error handling best practices + API design patterns
from typing import NamedTuple

class ParseError(NamedTuple):
    """User-friendly parse error information."""
    user_message: str
    internal_details: str
    suggestion: str | None = None

def classify_parse_error(error: Exception, context: str) -> ParseError:
    """Convert exception to user-friendly error.

    Args:
        error: Exception that occurred
        context: Brief context (e.g., "parsing AST")

    Returns:
        ParseError with user message and internal details
    """
    error_type = type(error).__name__
    error_msg = str(error)

    # Map errors to user messages
    if isinstance(error, SyntaxError):
        return ParseError(
            user_message="The model's response contained invalid Python syntax.",
            internal_details=f"{error_type} in {context}: {error_msg}",
            suggestion="Try asking the model to format the tool call differently."
        )

    elif isinstance(error, (json.JSONDecodeError, ValueError)):
        return ParseError(
            user_message="Tool arguments were not properly formatted.",
            internal_details=f"{error_type} in {context}: {error_msg}",
            suggestion="The model needs to provide valid JSON for tool parameters."
        )

    elif isinstance(error, KeyError):
        return ParseError(
            user_message="Tool call was missing required information.",
            internal_details=f"{error_type} in {context}: {error_msg}",
            suggestion="The response must include both tool name and arguments."
        )

    else:
        return ParseError(
            user_message="Unable to parse tool calls from the response.",
            internal_details=f"{error_type} in {context}: {error_msg}",
            suggestion=None
        )

# Usage in parsing
def safe_parse_response(text: str) -> dict:
    """Parse with clear error reporting."""
    try:
        return parse_response(text)
    except Exception as e:
        # Classify error
        error_info = classify_parse_error(e, "response parsing")

        # Log internal details
        logging.error(
            f"Parse error: {error_info.internal_details}",
            exc_info=True,
            extra={'text_preview': text[:200]}
        )

        # Could return error info to caller for user messaging
        # For now, re-raise with context
        raise RuntimeError(error_info.user_message) from e
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Fail-fast on errors | Graceful degradation to text | 2025-2026 | Systems stay operational during issues |
| Plain text logs | Structured JSON logging | 2024-2025 | Logs queryable, correlatable across services |
| StatsD for metrics | Prometheus pull model | 2023-2024 | Better for containerized environments |
| Thread locals for context | contextvars.ContextVar | 2019+ | Async-safe context propagation |
| Manual metric aggregation | PromQL queries | 2023+ | Centralized query language, rate() function |
| Single observability pillar | Three pillars (logs, metrics, traces) | 2024-2026 | Complete visibility into system behavior |

**Deprecated/outdated:**
- Raising HTTPException on parse failures: Breaks best-effort contract
- Logging only errors: Need success metrics to measure improvement
- Text logs without structure: Can't query or aggregate at scale
- Manual counters without labels: Can't slice by dimensions

## Open Questions

Things that couldn't be fully resolved:

1. **Should we expose parsing metrics to users or keep internal?**
   - What we know: Prometheus /metrics endpoint is standard, but could expose internals
   - What's unclear: Whether users benefit from seeing parse success rates
   - Recommendation: Start with internal-only (/metrics protected), expose in /health summary if needed

2. **What's the right balance between logging detail and noise?**
   - What we know: INFO for summaries, DEBUG for details is standard
   - What's unclear: Whether every parse attempt should log, or only failures
   - Recommendation: Log all attempts at INFO during rollout, reduce to DEBUG + failures once stable

3. **How long to retain metrics (retention policy)?**
   - What we know: Prometheus default is 15 days
   - What's unclear: Whether longer retention needed for trend analysis
   - Recommendation: Start with 15-day default, extend if needed based on actual usage

4. **Should we add distributed tracing (OpenTelemetry)?**
   - What we know: Tracing useful for multi-service architectures
   - What's unclear: Whether single-service API benefits enough to justify overhead
   - Recommendation: Defer tracing until multi-service needs emerge, focus on logs + metrics first

5. **How to handle user notification of degraded functionality?**
   - What we know: System gracefully falls back to text-only
   - What's unclear: Should users see "Note: tool parsing unavailable" or transparent fallback?
   - Recommendation: Transparent fallback (no user message) unless debugging, add config flag for verbose mode

## Sources

### Primary (HIGH confidence)
- [AWS Well-Architected Reliability Pillar - Graceful Degradation](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_mitigate_interaction_failure_graceful_degradation.html) - Soft dependency patterns
- [Prometheus Python Client Documentation](https://prometheus.github.io/client_python/) - Counter and Histogram usage
- [Prometheus Metric Types](https://prometheus.io/docs/concepts/metric_types/) - Official metric type reference
- [Python Logging Best Practices 2026](https://www.carmatec.com/blog/python-logging-best-practices-complete-guide/) - Modern logging patterns
- [Better Stack: Python Logging Best Practices](https://betterstack.com/community/guides/logging/python/python-logging-best-practices/) - Structured logging
- [FastAPI Middleware Patterns 2026](https://johal.in/fastapi-middleware-patterns-custom-logging-metrics-and-error-handling-2026-2/) - Middleware for observability
- Existing codebase: `src/perplexity_web_mcp/api/server.py` (lines 987-1010, graceful fallback)
- Existing codebase: `src/perplexity_web_mcp/api/response_parser.py` (logging patterns)

### Secondary (MEDIUM confidence)
- [GeeksforGeeks: Graceful Degradation in Distributed Systems](https://www.geeksforgeeks.org/system-design/graceful-degradation-in-distributed-systems/) - Pattern overview
- [Better Stack: Prometheus Python Monitoring](https://betterstack.com/community/guides/monitoring/prometheus-python-metrics/) - Python metrics tutorial
- [FastAPI Observability GitHub](https://github.com/blueswen/fastapi-observability) - Three pillars reference implementation
- [FastAPI Best Architecture - Observability](https://deepwiki.com/fastapi-practices/fastapi_best_architecture/10.3-logging-and-monitoring) - Logging patterns
- [Medium: Building Resilient REST API Integrations](https://medium.com/@oshiryaeva/building-resilient-rest-api-integrations-graceful-degradation-and-combining-patterns-e8352d8e29c0) - Graceful degradation patterns
- [Python Error Handling Guide](https://blog.miguelgrinberg.com/post/the-ultimate-guide-to-error-handling-in-python) - Error message design
- [SigNoz: Python Logging Best Practices](https://signoz.io/guides/python-logging-best-practices/) - Production logging

### Tertiary (LOW confidence - validation needed)
- [Unleash: Graceful Degradation with FeatureOps](https://www.getunleash.io/blog/graceful-degradation-featureops-resilience) - Circuit breaker patterns
- [Structlog documentation](https://www.structlog.org/) - Advanced structured logging (if needed)
- [Datadog: Python Logging Best Practices](https://www.datadoghq.com/blog/python-logging-best-practices/) - Log aggregation patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - prometheus-client and logging are industry standard
- Architecture: HIGH - Patterns verified with AWS Well-Architected, FastAPI docs, Prometheus docs
- Pitfalls: HIGH - Based on production observability experience and 2026 best practices
- Code examples: HIGH - Derived from official Prometheus + FastAPI documentation

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - observability patterns stable but tooling evolves)
