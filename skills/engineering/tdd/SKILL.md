---
name: tdd
description: Test-driven development with a red-green-refactor loop, built one vertical slice at a time. Use when the user wants to build a feature or fix a bug test-first, mentions "red-green-refactor", "TDD", "테스트 먼저", or wants tests that survive refactors. Adapted from mattpocock/skills with added perspective on tests as a business/risk asset.
---

# Test-Driven Development

Build behavior test-first, one vertical slice at a time. Good tests are a long-lived asset; bad tests are a liability that slows every future change. As an engineer-owner, treat the test suite as risk management, not box-ticking.

## Philosophy

**Core principle**: Tests verify behavior through public interfaces, not implementation details. The implementation can change entirely; the tests shouldn't.

- **Good tests** are integration-style: they exercise real code paths through public APIs and read like a specification ("user can checkout with a valid cart"). They survive refactors.
- **Bad tests** couple to implementation: they mock internal collaborators or assert on internal shape. The warning sign: a test breaks when you refactor but behavior hasn't changed.

## Anti-pattern: horizontal slices

**Do not write all tests first, then all implementation.** Bulk-written tests verify *imagined* behavior, test the *shape* of things, and go insensitive to real changes.

```
WRONG (horizontal):  RED: test1..test5   then  GREEN: impl1..impl5
RIGHT (vertical):    RED→GREEN test1→impl1, then test2→impl2, ...
```

Each test responds to what you learned from the previous cycle.

## Workflow

### 1. Plan
- Confirm the public interface and which behaviors matter most. **You can't test everything** — focus on critical paths and complex logic.
- Prefer deep modules (small interface, deep implementation) so tests cross one clean seam. (See the `codebase-design` skill.)
- List behaviors to test (not implementation steps). Get user approval.

### 2. Tracer bullet
Write ONE test for the first behavior → it fails (RED) → write minimal code → it passes (GREEN). This proves the path end-to-end.

### 3. Incremental loop
For each remaining behavior: RED → GREEN. One test at a time, only enough code to pass, no speculative features.

### 4. Refactor (only while GREEN)
Extract duplication, deepen modules, apply SOLID where natural, re-run tests after each step. **Never refactor while RED.**

## Per-cycle checklist

```
[ ] Test describes behavior, not implementation
[ ] Test uses the public interface only
[ ] Test would survive an internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```

## Owner / leadership lens

Beyond correctness, weigh tests as a business decision:

- **Where to invest**: put test effort where a defect is most expensive (payments, auth, data integrity, anything customer-facing or irreversible). Skip exhaustive coverage of cheap-to-fix, low-traffic paths.
- **Tests as documentation**: a behavior-level suite is onboarding material and a contract with future maintainers (including future you and any agent).
- **Velocity vs safety**: a suite that breaks on every refactor *slows* the team. If tests are a drag, they're testing the wrong layer; fix the seam, not the symptom.
- **Don't measure coverage %, measure caught regressions.** High coverage of implementation detail is false confidence.

## Attribution

Adapted from [mattpocock/skills `tdd`](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) (MIT). See THIRD_PARTY_NOTICES.md.
