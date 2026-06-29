---
name: diagnosing-bugs
description: A disciplined diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose", "debug this", "버그 잡아줘", "왜 안 되지", or reports something broken, throwing, failing, or slow. Adapted from mattpocock/skills. The heart of it is building a tight, red-capable feedback loop before theorizing.
---

# Diagnosing Bugs

A discipline for hard bugs. Skip phases only when explicitly justified. The single biggest mistake is jumping to a hypothesis before you have a way to test it.

## Phase 1 — Build a feedback loop

**This is the skill.** If you have a tight pass/fail signal that goes red on *this* bug, you will find the cause. If you don't, no amount of staring at code will save you. Be aggressive, creative, and refuse to give up here.

Ways to construct one, roughly in order of preference:

1. **Failing test** at whatever seam reaches the bug.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture, diffing stdout against known-good.
4. **Headless browser script** (Playwright/Puppeteer) asserting on DOM/console/network.
5. **Replay a captured trace** (saved request/payload/event log) through the code path in isolation.
6. **Throwaway harness** exercising the bug path with one function call.
7. **Property / fuzz loop** for "sometimes wrong output".
8. **Bisection harness** if it appeared between two known states (`git bisect run`).
9. **Differential loop**: same input through old vs new, diff outputs.
10. **Human-in-the-loop script** as a last resort, so even manual steps stay structured.

### Tighten the loop
Treat the loop as a product: make it faster (cache setup, narrow scope), sharper (assert the specific symptom, not "didn't crash"), and more deterministic (pin time, seed RNG, isolate FS/network). A 2-second deterministic loop is a debugging superpower.

### Non-deterministic bugs
Goal is a higher reproduction rate, not a clean repro. Loop 100×, parallelize, add stress, narrow timing windows. Raise a 1% flake to debuggable.

### Completion criterion
Phase 1 is done when you can name **one command** you have **already run** that is red-capable (asserts the user's exact symptom), deterministic, fast, and agent-runnable. **No red-capable command, no Phase 2.**

## Phase 2 — Reproduce + minimize
Run the loop; watch it go red. Confirm it's the **user's** failure, not a nearby one. Then shrink to the smallest scenario that still goes red, cutting inputs/callers/config one at a time. Done when every remaining element is load-bearing.

## Phase 3 — Hypothesize
Generate **3-5 ranked, falsifiable hypotheses** before testing any. Format: "If X is the cause, then changing Y makes the bug disappear." Show the ranked list to the user (they often re-rank instantly with domain knowledge). Don't block if they're away.

## Phase 4 — Instrument
Each probe maps to a specific prediction. Change one variable at a time. Prefer debugger/REPL over logs; targeted boundary logs over "log everything". **Tag every debug log** with a unique prefix (e.g. `[DEBUG-a4f2]`) so cleanup is one grep. For perf: measure first (baseline, profiler, query plan), then bisect.

## Phase 5 — Fix + regression test
Write the regression test **before the fix**, but only if a correct seam exists (one that exercises the real bug pattern at the call site). If no correct seam exists, **that is itself the finding** — note it; the architecture is preventing lock-down. Otherwise: failing test → watch fail → fix → watch pass → re-run the original (un-minimized) loop.

## Phase 6 — Cleanup + post-mortem
- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence of seam documented)
- [ ] All `[DEBUG-...]` instrumentation removed
- [ ] Throwaway prototypes deleted
- [ ] The correct hypothesis is stated in the commit/PR so the next debugger learns

Then ask: **what would have prevented this bug?** If the answer is architectural (no good seam, tangled callers, hidden coupling), hand off to the `improve-codebase-architecture` skill with specifics, **after** the fix is in.

## Owner / leadership lens

- **Triage by blast radius**, not by who shouted loudest: how many users, is data corrupted, is it reversible, is money or trust at stake.
- **Post-mortem without blame.** The output is a systemic fix (a seam, a guardrail, a test), not a culprit. Recurring bug classes are an architecture or process signal.
- **Decide when "good enough" is done.** A founder ships; perfect repro of a 0.01% edge case may not be worth the day it costs. Make that trade-off explicitly.

## Attribution

Adapted from [mattpocock/skills `diagnosing-bugs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) (MIT). See THIRD_PARTY_NOTICES.md.
