# Third-Party Notices

This repository's skills draw on patterns and ideas from third-party work.
Attributions below. Where code or prose was adapted, the upstream license applies to that portion.

## Patterns referenced

- **[mattpocock/skills](https://github.com/mattpocock/skills)** (MIT) — overall skills repo structure
  (bucket folders, `.claude-plugin`, user-invoked vs model-invoked split) and the upstream-sync workflow
  approach are inspired by this repository. Specific skills such as `grill-me` informed our interview/
  decision-tree patterns.

- **[Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)** —
  the `SKILL.md` format (YAML frontmatter `name` + `description`, progressive disclosure via `references/`)
  follows Anthropic's Agent Skills standard.

## Notes

- This file is English-only by policy (see CLAUDE.md "한/영 문서 페어 규칙" exemptions).
- When a skill adapts material from a specific upstream project, add an entry here with the source link
  and its license, and note the adaptation inside that skill's `SKILL.md`.
