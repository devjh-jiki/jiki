---
name: eval-harness
description: >
  Eval-driven development (EDD) for AI-assisted and agent work — define
  pass/fail criteria BEFORE building, then measure reliability with pass@k /
  pass^k across repeated runs. Use when the user wants to make an agent, prompt,
  or non-deterministic feature reliable and measurable: "이거 얼마나 믿을 만한지",
  "eval 짜줘", "평가 기준 만들어줘", "프롬프트 회귀 잡고 싶어", "pass@k",
  "eval-driven", "how reliable is this agent", "measure agent reliability",
  "regression suite for a prompt". This is for judging NON-deterministic behavior
  measured statistically over many runs (an LLM call, an agent task, a flaky
  generation) where one run is not proof — it fires only when the target is an AI
  agent, prompt, or probabilistic pipeline. NOT for writing test cases for
  deterministic, pure-function code (that is plain test-writing), NOT for driving
  new code test-first (use tdd), and NOT for a one-off "did this fix work" check
  (use verification-before-completion). Where the correct output is a fixed value,
  a normal test beats an eval.
---

# Eval Harness

Evals are the unit tests of non-deterministic work. A single green run of an LLM call, an agent task, or a generation proves nothing: the next run can fail. This skill treats reliability as a measured quantity, not a claim.

## When this, not tdd

`tdd` drives deterministic code test-first: `add(2,2)` is always `4`, one passing test is proof. Reach for **eval-harness** when the thing under test is a coin, not a calculator: a prompt, an agent, a retrieval step, a model-graded output. There the question is not "does it pass" but "how often, out of how many tries". If a plain assertion can pin the answer, write the plain assertion; evals are for when it cannot.

## The loop

1. **Define before building.** Writing the criteria first forces you to state what "works" actually means. Vague success is unmeasurable.
2. **Run repeatedly.** One run is an anecdote. k runs are a rate.
3. **Track over time.** Each prompt or model change is a diff against the last measured rate.

## Eval types

Two kinds, and every feature wants both:

**Capability eval** — can it do the new thing at all?
```
[CAPABILITY: <name>]
Task:     what the agent must accomplish
Criteria: - [ ] concrete, checkable condition
          - [ ] another
Target:   pass@3 >= 0.90
```

**Regression eval** — did the change break what already worked?
```
[REGRESSION: <name>]
Baseline: <commit sha or checkpoint>
Cases:    existing-behavior-1, existing-behavior-2, ...
Target:   pass^3 = 1.00 on release-critical paths
```

## Graders: cheapest that is honest

Pick the least fancy grader that still catches the failure. Fancier graders are slower and flakier.

1. **Code grader** — deterministic. A grep, an exit code, a schema check. Prefer this whenever the pass condition is mechanical.
   ```bash
   npm test -- auth && echo PASS || echo FAIL
   grep -q "export function handleAuth" src/auth.ts && echo PASS || echo FAIL
   ```
2. **Rule grader** — regex or schema constraint on the output shape. For "must be valid JSON with these fields".
3. **Model grader** — an LLM judges an open-ended output against a rubric. For prose, explanations, design quality. Give it a 1-5 rubric and demand reasoning, not just a number.
4. **Human grader** — flag for manual review. Mandatory for security-sensitive or high-blast-radius changes. Never fully automate a security gate.

## Metrics

- **pass@k** — "at least one success in k tries". `pass@1` is raw first-shot reliability; `pass@3` is practical reliability with a couple of retries. Capability target: `pass@3 >= 0.90`.
- **pass^k** — "all k tries succeed". A stability bar, not a best-of. Use `pass^3 = 1.00` for release-critical and regression paths where a single failure is unacceptable.

The distinction matters: an agent at pass@3 = 100% but pass^3 = 40% works if you let it retry, but is unfit for an unattended pipeline.

## Report

After running, produce one legible report:

```
EVAL REPORT: <feature>
Capability:  X/Y passed   (pass@1: __%, pass@3: __%)
Regression:  X/Y passed   (pass^3: __%)
Status:      READY / NOT READY

Failing:
- <case>: <what actually happened>
```

## Anti-patterns

- **Overfitting to the eval.** Tuning the prompt until it memorizes the known examples. The eval must sample behavior, not be the behavior.
- **Happy-path only.** No adversarial or edge cases means the rate is a fiction.
- **Flaky graders in the gate.** A grader that itself fails 5% of the time cannot certify a 99% target.
- **Chasing pass rate while cost/latency drift.** Track those alongside; a "reliable" agent that got 4x slower regressed.
- **Reaching for an eval where a test would do.** Deterministic output → deterministic test. Evals are the expensive tool.

## Storing evals (optional)

If you want evals to live with the code, a light convention:
```
evals/<feature>.md    # definition + criteria
evals/<feature>.log    # run history, the rate over time
```
This is a suggestion, not a requirement — the value is in the loop, not the file layout. Adapt to whatever the project already uses.

## Boundaries

Deterministic unit tests of pure functions → plain test-writing. Driving new behavior test-first → `tdd`. Running build/lint/test gates before a PR → `verification-before-completion`. This skill is specifically for measuring how reliable a non-deterministic thing is before you trust it.

## Attribution

Adapted from [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) — the eval-driven-development framing, the capability/regression eval split, the four grader types, and the pass@k vs pass^k reliability metrics are preserved. Rewritten for this repo: the ECC-specific slash commands (`/eval define`), the `.claude/evals/` file layout, and hook integration were dropped in favor of a tool-agnostic loop, a sharp boundary against `tdd` (deterministic tests) was added, and Korean triggers were added. See THIRD_PARTY_NOTICES.md.
