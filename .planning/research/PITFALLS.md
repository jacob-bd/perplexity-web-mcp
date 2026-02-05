# Domain Pitfalls: Tool Calling for Non-Tool-Trained LLMs

**Domain:** Tool calling for non-tool-trained LLMs
**Researched:** 2026-02-04
**Confidence:** HIGH (based on direct experimental evidence)

## Executive Summary

The core issue is not the format (XML, ReAct, JSON) but the model's training objective. Without tool-calling in the training data, models will interpret any format as content to discuss rather than instructions to execute. This is a fundamental limitation that cannot be overcome with prompt engineering alone.

## Critical Pitfalls

Mistakes that cause complete failure or require architectural rewrites.

### Pitfall 1: Training Objective Mismatch
**What goes wrong:** Models trained for conversational search will always default to explaining rather than executing, no matter how clear your instructions.

**Why it happens:** The model's training objective was to be helpful by explaining and searching, not to follow strict output formats. This is baked into the model weights at a fundamental level.

**Consequences:** Model acknowledges it has tools but continues to respond conversationally. It might even explain what the tools are or how ReAct works instead of using them.

**Prevention:** Cannot be fully prevented with prompt engineering alone. Need either:
- A model explicitly trained for tool calling
- An intermediate parsing layer (rejected by user preference)
- Constrained decoding at inference time

**Detection:** Model says things like "I understand you want me to use tools" or "The ReAct format would be..." instead of actually outputting the format.

### Pitfall 2: System/User Prompt Conflation
**What goes wrong:** Everything you inject appears as user content, so models treat instructions as "information to discuss" rather than "rules to execute."

**Why it happens:** Web interfaces don't expose system prompt capability. All your carefully crafted instructions become part of the conversation history, not behavioral directives.

**Consequences:** Model may:
- Explain your instructions back to you
- Critique or discuss the format you've asked for
- Say "That's an interesting approach" about your tool definitions

**Prevention:** No true prevention without system prompt access. Mitigations:
- Keep instructions minimal (less to discuss)
- Use imperative language
- Avoid explanatory text that invites discussion

**Detection:** Model references your instructions as content rather than following them.

### Pitfall 3: Search-First Default Behavior
**What goes wrong:** When given a task, Perplexity models default to web search rather than tool execution, even when tools are the obvious solution.

**Why it happens:** Perplexity's models are optimized for search-augmented generation. Their primary training signal rewards searching for information.

**Consequences:** Ask to "list files" → model searches for "how to list files" instead of using a tool

**Prevention:** Cannot fully prevent. The search instinct is too deeply trained.

**Detection:** Response includes citations [1], [2] for tasks that should use local tools.

## Moderate Pitfalls

Mistakes that cause significant implementation delays or require approach changes.

### Pitfall 4: Few-Shot Learning Confusion
**What goes wrong:** Providing examples makes models explain the examples rather than follow them.

**Why it happens:** Without explicit instruction-following training, models interpret examples as content to analyze rather than patterns to mimic.

**Consequences:** You show:
```
User: List files
Action: list_files
Action Input: {}
```
Model responds: "That's a good example of the ReAct format where..."

**Prevention:** If few-shot examples don't work immediately, they won't work with more examples. This is a fundamental limitation.

**Detection:** Model discusses or analyzes your examples.

### Pitfall 5: Format Mimicry Without Understanding
**What goes wrong:** Model outputs something that looks like your format but with nonsense content.

**Why it happens:** The model is pattern-matching surface structure without understanding the semantics of tool calling.

**Consequences:** Outputs like:
```
Action: helpful_response
Action Input: {"message": "Hello! How can I assist you today?"}
```
Where "helpful_response" isn't a real tool.

**Prevention:** This actually indicates partial success - the model understands the format syntax. But without tool-calling training, it doesn't understand tool semantics.

**Detection:** Syntactically correct but semantically meaningless tool calls.

### Pitfall 6: Partial Format Adoption
**What goes wrong:** Model uses your format for some responses but not others, inconsistently.

**Why it happens:** The model's confidence in using the format varies based on input complexity and perceived task clarity.

**Consequences:** Works for simple cases ("list files") but reverts to conversation for complex cases.

**Prevention:** Cannot guarantee consistency without model-level support.

**Detection:** Format usage drops off with complexity or ambiguity.

## Minor Pitfalls

Mistakes that cause annoyance but might have workarounds.

### Pitfall 7: JSON Formatting Errors
**What goes wrong:** Model attempts to output tool calls but malforms the JSON.

**Why it happens:** Models not trained on structured output often struggle with proper JSON syntax, especially nested objects.

**Consequences:** Parser fails even though intent is clear.

**Prevention:** Robust parsing that can handle common malformations (missing quotes, trailing commas).

**Detection:** JSON parse errors in otherwise correct-looking output.

### Pitfall 8: Parameter Hallucination
**What goes wrong:** Model invents parameters that don't exist in the tool schema.

**Why it happens:** Model is guessing based on general knowledge rather than strictly following the schema.

**Consequences:** Tool execution fails due to unexpected parameters.

**Prevention:** Strict parameter validation and filtering.

**Detection:** Extra keys in tool input that aren't in schema.

## Fundamental Limitations

These are hard constraints that cannot be overcome with current approaches.

### Limitation 1: No Guaranteed Structured Output
**Constraint:** Models without tool-calling training cannot guarantee structured output.

**Why:** Structured output requires either:
- Explicit training on the format (function-calling fine-tuning)
- Constrained decoding (grammars, guided generation)
- Post-processing (intermediate model, which user rejected)

**Implication:** Any pure prompt-engineering solution will be probabilistic at best.

### Limitation 2: Instruction vs Content Ambiguity
**Constraint:** Without system prompt separation, models cannot reliably distinguish instructions from content.

**Why:** This distinction requires architectural support in the model or API.

**Implication:** Instructions will always risk being treated as discussion topics.

### Limitation 3: Training Data Precedence
**Constraint:** Models will follow their training data patterns over prompt instructions when they conflict.

**Why:** Training creates stronger neural pathways than in-context instructions.

**Implication:** If a model was trained to search and explain, it will prefer that over executing tools.

## Soft Constraints vs Hard Constraints

### Hard Constraints (Cannot overcome)
- Model must be trained on tool-calling data OR have constrained decoding
- System prompt distinction required for reliable instruction-following
- Cannot override core training objectives with prompts alone

### Soft Constraints (Might overcome with effort)
- JSON formatting issues (better parsing)
- Parameter validation (schema enforcement)
- Partial success cases (retry logic)

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Prompt Engineering | Training objective mismatch | Recognize limits early, don't over-invest |
| Format Design | Few-shot confusion | Test minimal format before adding complexity |
| Parser Implementation | Format mimicry without understanding | Validate semantic correctness, not just syntax |
| Integration | Search-first behavior | Cannot fully prevent, design around it |

## What Would Need to Change

For tool calling to work reliably with these models:

1. **Model-level change:** Fine-tune Perplexity models on tool-calling data
2. **API-level change:** Expose system prompt capability in web interface
3. **Inference-level change:** Add constrained decoding/grammar support
4. **Architecture change:** Use a different model that supports tools natively

Since we cannot change the model or API, and user rejected architectural changes (intermediate model), **the fundamental limitation cannot be overcome with pure prompt engineering.**

## Warning Signs You're Hitting the Same Wall

- Model acknowledges tools but doesn't use them ✓ (already seen)
- Model explains the format instead of using it ✓ (already seen)
- Model critiques or discusses your instructions ✓ (already seen)
- Works sometimes but not consistently
- Simpler formats fail just like complex ones ✓ (already seen)
- Adding more examples makes it worse
- Model searches for how to do something instead of doing it

## Conclusion

The core issue is not the format (XML, ReAct, JSON) but the model's training objective. Without tool-calling in the training data, models will interpret any format as content to discuss rather than instructions to execute. This is a fundamental limitation that cannot be overcome with prompt engineering alone.

---
*Research completed: 2026-02-04*
*Confidence: HIGH - based on direct experimental evidence*
