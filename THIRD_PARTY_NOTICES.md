# Third-Party Notices

This repository's skills draw on patterns and ideas from third-party work.
Attributions below. Where code or prose was adapted, the upstream license applies to that portion.

## Patterns referenced

- **[mattpocock/skills](https://github.com/mattpocock/skills)** (MIT) — overall skills repo structure
  (bucket folders, `.claude-plugin`, user-invoked vs model-invoked split) and the upstream-sync workflow
  approach are inspired by this repository. Specific skills such as `grill-me` informed our interview/
  decision-tree patterns. The following skills are **adapted** from mattpocock originals (core preserved,
  mattpocock-specific dependencies removed, an owner/leadership lens added):
  - `skills/engineering/tdd` ← engineering/tdd
  - `skills/engineering/diagnosing-bugs` ← engineering/diagnosing-bugs
  - `skills/engineering/codebase-design` ← engineering/codebase-design
  - `skills/engineering/improve-codebase-architecture` ← engineering/improve-codebase-architecture
  - `skills/engineering/to-prd` ← engineering/to-prd
  - `skills/productivity/handoff` ← productivity/handoff
  - `skills/productivity/grill-me` ← productivity/grill-me
  A full snapshot of the upstream repo is kept under `.upstream/mattpocock-skills/` for reference and
  attribution tracking (not installed or distributed).

- **[Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)** —
  the `SKILL.md` format (YAML frontmatter `name` + `description`, progressive disclosure via `references/`)
  follows Anthropic's Agent Skills standard.

- **[buYoung/skills](https://github.com/buYoung/skills)** (MIT) — the `biz-opportunity-scout` skill's
  framework selection (TAM/SAM/SOM, unit economics, competitive analysis, PMF indicators) and the
  trust-level labeling approach (Available / Review / Private) are inspired by this repository.

## Notes

- This file is English-only by policy (see CLAUDE.md "한/영 문서 페어 규칙" exemptions).
- When a skill adapts material from a specific upstream project, add an entry here with the source link
  and its license, and note the adaptation inside that skill's `SKILL.md`.
