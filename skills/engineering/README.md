# Engineering Skills

> 한국어: [README.ko.md](./README.ko.md)

Skills for daily code work. Several are adapted from [mattpocock/skills](https://github.com/mattpocock/skills)
with an added owner/leadership lens. See [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md).

**User-invoked** (run by a human via `/command`)

- [improve-codebase-architecture](./improve-codebase-architecture/SKILL.md) — Scan a codebase for deepening opportunities, present an HTML report, then grill through one.
- [to-prd](./to-prd/SKILL.md) — Synthesize the current conversation into a PRD (no interview). Complements `product-spec-builder` (which interviews first).
- [to-issues](./to-issues/SKILL.md) — Break a plan/PRD into independently-grabbable vertical-slice issues. Consumes `to-prd` output.
- [grill-with-docs](./grill-with-docs/SKILL.md) — Grilling interview that also maintains glossary + ADRs as you go (`grill-me` + `domain-modeling`).
- [prototype](./prototype/SKILL.md) — Build a throwaway prototype to de-risk a design (logic terminal app, or UI variations).
- [design-system](./design-system/SKILL.md) — Design, implement, and review a token-based UI design system, using Meta's Astryx as the default foundation (generalized to any stack); respects an existing system when present.
- [anti-slop-frontend](./anti-slop-frontend/SKILL.md) — Stop AI-built marketing/landing/portfolio frontends from looking templated: read the brief, tune three dials, avoid the LLM defaults, run a mechanical pre-flight (adapted from Leonxlnx/taste-skill). Taste layer; for a systematic app-wide token system use `design-system`.

**Model-invoked** (the agent uses it automatically when it fits)

- [tdd](./tdd/SKILL.md) — Red-green-refactor, one vertical slice at a time; tests as a risk asset.
- [lazy-code](./lazy-code/SKILL.md) — Force the laziest solution that works: YAGNI ladder, stdlib/native before dependencies, one line before fifty; lite/full/ultra (adapted from DietrichGebert/ponytail).
- [diagnosing-bugs](./diagnosing-bugs/SKILL.md) — Disciplined diagnosis loop; build a tight red-capable feedback loop before theorizing.
- [codebase-design](./codebase-design/SKILL.md) — Shared vocabulary for designing deep modules (interface, depth, seam, adapter, leverage, locality).
- [domain-modeling](./domain-modeling/SKILL.md) — Actively build and sharpen the project's domain model (glossary + ADRs).
- [eval-harness](./eval-harness/SKILL.md) — Eval-driven development for non-deterministic work: define pass/fail criteria before building, measure reliability with pass@k / pass^k (adapted from affaan-m/ecc). For deterministic tests use `tdd`.
- [verification-before-completion](./verification-before-completion/SKILL.md) — Never claim done without proof: run build/types/lint/tests/security/diff and read the output before declaring success (adapted from obra/superpowers + affaan-m/ecc).
- [iterative-retrieval](./iterative-retrieval/SKILL.md) — Assemble just-enough context for a subagent via a dispatch→evaluate→refine loop with relevance scoring, learning the codebase's own terminology (adapted from affaan-m/ecc).
