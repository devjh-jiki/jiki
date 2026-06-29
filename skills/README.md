# Skills

> 한국어: [README.ko.md](./README.ko.md)

A collection of my own agent skills for daily use. Follows the [Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) standard.

## Installation

```bash
npx skills@latest add devjh-jiki/jiki
```

## Buckets

| Bucket | Purpose | Listed in README |
|------|------|-------------|
| `engineering/` | Daily coding work | O |
| `productivity/` | Non-code workflows (blogging, etc.) | O |
| `learning/` | AI / technical knowledge learning coaches | O |
| `business/` | Founder / product / marketing | O |
| `personal/` | My setup only | X |
| `in-progress/` | Unfinished drafts | X |
| `deprecated/` | No longer used | X |

## Listed Skills

### Engineering

**User-invoked** (run by a human only via `/command`)

- [improve-codebase-architecture](./engineering/improve-codebase-architecture/SKILL.md) — Scan for deepening opportunities, HTML report, then grill through one
- [to-prd](./engineering/to-prd/SKILL.md) — Synthesize the current conversation into a PRD (no interview)

**Model-invoked** (the agent uses it automatically when it fits the task)

- [tdd](./engineering/tdd/SKILL.md) — Red-green-refactor, one vertical slice at a time
- [diagnosing-bugs](./engineering/diagnosing-bugs/SKILL.md) — Disciplined diagnosis loop; tight red-capable feedback loop first
- [codebase-design](./engineering/codebase-design/SKILL.md) — Vocabulary for designing deep modules

### Productivity

**User-invoked**

- [write-blog-post](./productivity/write-blog-post/SKILL.md) — Write/refine drafts, learnings, and experiences into jihoon-style Korean technical blog posts (includes style and SEO guides)
- [grill-me](./productivity/grill-me/SKILL.md) — Relentless interview to stress-test a plan, design, decision, or business idea (inspired by mattpocock/skills)

**Model-invoked**

- _(none yet)_

### Learning

**Model-invoked** (the agent uses it automatically in a learning context)

- [open-source-reverse-engineering-coach](./learning/open-source-reverse-engineering-coach/SKILL.md) — A coach for learning architecture, interfaces, and trade-offs by reverse-engineering open source
- [technical-book-coach](./learning/technical-book-coach/SKILL.md) — Learn technical books and docs through coaching (when English text is pasted, separates Korean translation + coaching)

### Business (Review)

**Model-invoked**

- [biz-opportunity-scout](./business/biz-opportunity-scout/SKILL.md) — Validate a business opportunity (TAM/SAM/SOM, unit economics, competitive, PMF) with an honest Go/No-Go
- [marketing-copy](./business/marketing-copy/SKILL.md) — Turn a product/feature into Korean marketing copy
- [product-spec-builder](./business/product-spec-builder/SKILL.md) — Turn a rough idea into a buildable PRD via a short interview

## Upstream sync

Changes from trusted external repos such as [mattpocock/skills](https://github.com/mattpocock/skills) are
periodically detected by `.github/workflows/sync-upstream-skills.yml` and **proposed as PRs**.
Review the PRs and merge only the ones that meet your standards.
