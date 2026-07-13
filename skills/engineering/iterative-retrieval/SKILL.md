---
name: iterative-retrieval
description: >
  Progressively refine context for a subagent instead of guessing it upfront.
  A dispatch → evaluate → refine loop (max ~3 cycles) that learns the codebase's
  own terminology in the first pass and keeps only files scoring high on
  relevance. Use when dispatching a subagent or search that needs codebase
  context it cannot predict, when a dispatched subagent fails because it got
  irrelevant or overwhelming code, or when the user says
  "서브에이전트한테 뭘 줘야 할지 모르겠어", "관련 파일 좀 추려서",
  "이 코드베이스에서 X 찾아서 맥락 잡아줘", "gather the right context for this task",
  "which files matter for this". This is a RETRIEVAL strategy for feeding an
  agent the right FILES — not for auditing a config's standing token overhead
  (that is context-budget), not for parallelizing independent tasks, and not a
  general codebase Q&A; it is specifically the "start broad, score, narrow,
  repeat" discipline for assembling just-enough context.
---

# Iterative Retrieval

A subagent spawned to work on a task rarely knows, up front, which files it needs, what patterns the codebase uses, or what the project calls things. The naive options all fail: send everything and you blow the context window; send nothing and the agent flies blind; guess and you are usually wrong. The fix is to retrieve in cycles, learning as you go.

## The loop

**DISPATCH → EVALUATE → REFINE → LOOP**, capped at about 3 cycles, then proceed with the best context you have.

### 1. DISPATCH — start broad

Cast a wide first net from the task's plain intent. Broad keyword search plus obvious path globs, excluding the obvious noise (tests, generated files) only if it helps. Do not over-specify the first query: you do not yet know the codebase's vocabulary.

### 2. EVALUATE — score relevance

For each candidate, assign a relevance score and, crucially, note what is still missing:

| Score | Meaning | Action |
|-------|---------|--------|
| 0.8-1.0 | Directly implements the target | keep |
| 0.5-0.7 | Related pattern or type | keep if room |
| 0.2-0.4 | Tangential | drop unless it fills a gap |
| 0-0.2 | Not relevant | exclude, confidently |

Alongside each file, track **missing context** explicitly: "found the handler, still need where sessions are stored". The gaps drive the next cycle more than the hits do.

### 3. REFINE — update the query from what you learned

The first cycle's real payoff is often vocabulary. Fold it back in:
- add patterns and terms discovered in high-relevance files (the codebase says `throttle`, not `rate limit`)
- exclude paths confirmed irrelevant so they stop resurfacing
- point the next query at the named gaps, not the whole space again

### 4. LOOP — repeat, then stop at good enough

Stop when you have roughly 3 files in the top band (>= 0.8, ones that directly implement the thing) and no critical gap flagged — or when you hit the cycle cap. Three files that actually implement the thing beat ten that merely mention it. Do not keep looping for marginal completeness; assemble and proceed.

## Worked examples

**Bug fix — vocabulary was fine, scope narrowed**
```
Task: fix the auth token expiry bug
Cycle 1  dispatch: "token", "auth", "expiry" in src/**
         evaluate: auth.ts 0.9, tokens.ts 0.8, user.ts 0.3
         refine:   add "refresh", "jwt"; drop user.ts
Cycle 2  evaluate: session-manager.ts 0.95, jwt-utils.ts 0.85 → enough
Result:  auth.ts, tokens.ts, session-manager.ts, jwt-utils.ts
```

**Feature — first cycle taught the terminology**
```
Task: add rate limiting to API endpoints
Cycle 1  dispatch: "rate", "limit", "api" → no matches; repo says "throttle"
         refine:   add "throttle", "middleware"
Cycle 2  evaluate: throttle.ts 0.9, middleware/index.ts 0.7 → need router shape
         refine:   add "router", "express"
Cycle 3  evaluate: router-setup.ts 0.8 → enough
Result:  throttle.ts, middleware/index.ts, router-setup.ts
```

Notice the second run's whole first cycle produced zero hits and was still the most valuable: it revealed the codebase's word for the concept.

## Handing it to a subagent

If you delegate the retrieval, put the loop in the agent's instructions rather than expecting it to invent one:
> Start with a broad keyword search. Score each file 0-1 for relevance to the task. Write down what context is still missing. Refine the search from what you learned and repeat, max 3 cycles. Return the files that directly implement the thing (>= 0.8), plus any 0.5-0.7 file you have room for, plus any gap you could not close.

## Best practices

- Start broad, narrow progressively — a tight first query encodes assumptions you have not earned yet.
- Treat cycle 1 as a vocabulary lesson; the codebase names things its own way.
- Track missing context explicitly; the gaps steer refinement better than the hits.
- Stop at good enough. Three solid files beat a padded list.
- Exclude confidently. A 0.1 file will not become relevant next cycle.

## Boundaries

This is about *assembling context* for an agent or search. Running several independent tasks at once is a different concern (parallel dispatch). Answering a one-off "how does X work" for the user directly is ordinary exploration, not this loop. Reach for iterative-retrieval specifically when the hard part is *not knowing what context is needed until you start looking*.

## Attribution

Adapted from [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) — the subagent context problem framing, the DISPATCH/EVALUATE/REFINE/LOOP cycle, the relevance-scoring bands, explicit missing-context tracking, the 3-cycle cap, and both worked examples are preserved. Rewritten for this repo: the upstream's fictional JavaScript retrieval API (`retrieveFiles`, `scoreRelevance`, ...) was replaced with tool-agnostic prose and a ready-to-paste subagent instruction, references to other ECC skills were dropped, and Korean triggers were added. See THIRD_PARTY_NOTICES.md.
