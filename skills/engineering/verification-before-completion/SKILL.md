---
name: verification-before-completion
description: >
  Never claim done without proof. Before saying a task is finished, fixed,
  working, or ready for PR, run the actual verification (build, types, lint,
  tests, a security scan, a diff review) and read the output. Use when wrapping
  up any change and about to declare success, or when the user says "다 됐어?",
  "확인하고 끝내줘", "PR 올리기 전에 점검", "검증하고 마무리", "verify before done",
  "make sure it actually works", "run the checks before you say it's fixed". This
  governs the moment of CLAIMING completion — it is not for diagnosing why a test
  fails (use diagnosing-bugs), not for driving new code test-first (use tdd), and
  not for judging code quality/logic/architecture (that is a code review; the
  "diff review" phase here only scans for unintended changes, not design). Its
  job is to convert "I think it's done" into "here is the evidence it's done".
---

# Verification Before Completion

"It's done" is a claim. A claim without evidence is a guess dressed up as a report. This skill is the discipline of running the checks and reading their output before the word "done" leaves your mouth.

The failure this prevents is specific and common: declaring success from intention rather than observation — "I fixed the bug" without rerunning the failing case, "the build passes" without running the build, "ready for PR" with untracked debug logs still in the diff.

## The rule

Before claiming a task is complete, fixed, working, or ready: run the relevant verification and quote what it actually printed. No output, no claim. If you did not run it, say "not yet verified" instead of "done".

## The phases

Run what applies. Not every change touches every phase, but skipping a phase is a decision you state, not a step you silently drop.

1. **Build** — does it compile / bundle?
   ```bash
   npm run build 2>&1 | tail -20    # or pnpm build, cargo build, go build, ...
   ```
   Fails → STOP and fix before anything else. A broken build makes every later phase meaningless.

2. **Types** — static check clean?
   ```bash
   npx tsc --noEmit 2>&1 | head -30    # or pyright ., mypy, ...
   ```

3. **Lint** — style/quality gate?
   ```bash
   npm run lint 2>&1 | head -30    # or ruff check ., golangci-lint, ...
   ```

4. **Tests** — and specifically the case tied to this change. Rerun the test that was red; watch it go green. Do not infer it from a full-suite summary.
   ```bash
   npm test 2>&1 | tail -50
   ```
   Report: total / passed / failed, and coverage if the project gates on it.

5. **Security / secrets** — nothing leaked, no debug backdoor left in.
   ```bash
   git diff | grep -nE "sk-|api_key|password|console\.log|TODO|debugger"
   ```

6. **Diff review** — read the actual diff, not your memory of it.
   ```bash
   git diff --stat && git diff
   ```
   Look for: unintended changes, stray files, missing error handling, an edge case the change opened up.

## Report

```
VERIFICATION
Build:    PASS / FAIL
Types:    PASS / FAIL  (N errors)
Lint:     PASS / FAIL  (N warnings)
Tests:    PASS / FAIL  (X/Y, Z% coverage)
Security: PASS / FAIL  (N flags)
Diff:     N files

Verdict:  READY / NOT READY
Skipped:  <phase> — <why it doesn't apply>
Fix next:
  1. ...
```

If any phase is FAIL, the verdict is NOT READY. There is no "mostly ready".

## Continuous checkpoints

On long work, do not save all verification for the end. Checkpoint after each meaningful unit — a finished function, a completed component, before switching tasks. A regression caught at the checkpoint costs minutes; one caught after ten more changes costs an afternoon of bisecting.

## Anti-patterns

- "It should work now" as a closing line. Should is not is.
- Quoting a full-suite green while the specific reproduction case was never rerun.
- Declaring the build green from the last time you ran it, three edits ago.
- Treating a skipped phase as invisible instead of stated.

## Boundaries

Figuring out *why* a check fails is `diagnosing-bugs`. Writing the tests in the first place is `tdd`. Measuring reliability of a non-deterministic thing over many runs is `eval-harness`. This skill is the honesty gate at the moment of claiming completion: proof before "done" — and the continuous-checkpoint mode above is that same gate applied at each mid-work milestone, not a separate skill.

## Attribution

Combines two upstreams. The core principle — evidence over claims, "never declare success without running verification" — is from [obra/superpowers](https://github.com/obra/superpowers) (MIT) `verification-before-completion`. The concrete six-phase pipeline (build → types → lint → tests → security → diff), the structured VERIFICATION REPORT shape, and continuous-checkpoint mode are from [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) `verification-loop`. Merged and rewritten for this repo: the ECC `/verify` command and hook-integration notes were dropped, the "rerun the specific failing case, do not infer from the suite" rule and explicit "state the skipped phase" discipline were added, boundaries against `diagnosing-bugs` / `tdd` / `eval-harness` were drawn, and Korean triggers were added. See THIRD_PARTY_NOTICES.md.
