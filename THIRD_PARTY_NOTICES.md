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
  - `skills/engineering/to-issues` ← engineering/to-issues
  - `skills/engineering/domain-modeling` ← engineering/domain-modeling
  - `skills/engineering/grill-with-docs` ← engineering/grill-with-docs
  - `skills/engineering/prototype` ← engineering/prototype
  - `skills/engineering/implement` ← engineering/implement
  - `skills/engineering/resolving-merge-conflicts` ← engineering/resolving-merge-conflicts
  - `skills/productivity/handoff` ← productivity/handoff
  - `skills/productivity/grill-me` ← productivity/grill-me
  - `skills/productivity/writing-great-skills` ← productivity/writing-great-skills
  - `runtimes/claude-code/skills/git-guardrails` ← misc/git-guardrails-claude-code (includes the `block-dangerous-git.sh` script, copied verbatim)
  - `skills/misc/setup-pre-commit` ← misc/setup-pre-commit
  A full snapshot of the upstream repo is kept under `.upstream/mattpocock-skills/` for reference and
  attribution tracking (not installed or distributed).

- **[Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)** —
  the `SKILL.md` format (YAML frontmatter `name` + `description`, progressive disclosure via `references/`)
  follows Anthropic's Agent Skills standard.

- **[anthropics/skills](https://github.com/anthropics/skills)** (Apache-2.0) — `skills/engineering/webapp-testing`
  is **adapted** from the upstream `webapp-testing` skill (core reconnaissance-then-action Playwright workflow
  preserved; trimmed of the bundled `with_server.py` helper, with a runtime-portability note and an
  owner/leadership lens added).

- **[buYoung/skills](https://github.com/buYoung/skills)** (MIT) — the `biz-opportunity-scout` skill's
  framework selection (TAM/SAM/SOM, unit economics, competitive analysis, PMF indicators) and the
  trust-level labeling approach (Available / Review / Private) are inspired by this repository.

- **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** (MIT) — `skills/engineering/lazy-code`
  is **adapted** from the `ponytail` skill: the YAGNI ladder, the lite/full/ultra intensity levels, and the
  "lazy, not negligent" framing are preserved. Renamed and rewritten for this repo (the code-comment marker
  `ponytail:` was changed to `lazy:`, Korean triggers were added, prose was condensed).

- **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)** (MIT) — `skills/productivity/terse-output`
  is **adapted** from the `caveman` skill: the terse-communication rules, the intensity ladder, the auto-clarity
  carve-outs, and the "shrink the mouth, not the brain" idea are preserved. Rewritten for this repo — the caveman
  persona and the classical-Chinese (wenyan) levels were dropped in favor of plain terse prose in the user's own
  language (Korean-first).

- **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** (MIT) — `skills/engineering/anti-slop-frontend`
  is **adapted** from the `design-taste-frontend` (taste-skill) skill: the brief-inference "design read", the three
  dials (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY), the official-system-vs-aesthetic split, the AI-tell
  catalogue, and the mechanical pre-flight check are preserved. Condensed into a shorter `SKILL.md` with the detailed
  rules moved into `references/`; renamed and generalized for this repo.

- **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** (MIT) — `skills/productivity/recency-research`
  is a **lightweight reimplementation** of the `last30days` concept: multi-source community research, engagement-scored
  synthesis, cross-source cluster merging, verbatim-community-quote weaving, and honest partial-coverage reporting. It
  deliberately does NOT vendor the upstream Python engine, its API-key source integrations, or its saved-library /
  watchlist features — the skill points users to the upstream tool for full power and otherwise runs on the host's own
  web tools.

- **[obra/superpowers](https://github.com/obra/superpowers)** (MIT) — this repo does NOT vendor the Superpowers
  framework (it is a complete, infrastructure-backed SDLC methodology best installed directly as a plugin). Two things
  draw on it: (1) `skills/engineering/verification-before-completion` takes its core principle ("evidence over claims,
  never declare success without running verification") from the upstream `verification-before-completion` skill, merged
  with ECC's `verification-loop` phases (see below); (2) the Superpowers plugin is installed separately in the user's
  own OpenCode config, not in this repository.

- **[affaan-m/ecc](https://github.com/affaan-m/ecc)** (MIT) — from ECC's large skill collection, five unique
  pure-prompt concepts were extracted and rewritten for this repo (ECC's execution infrastructure — hooks, CLI,
  SQLite state, slash commands — is deliberately NOT vendored, so only the tool-agnostic methodology was taken):
  - `skills/engineering/eval-harness` ← `eval-harness` (eval-driven development, capability/regression split, four grader types, pass@k vs pass^k)
  - `skills/engineering/verification-before-completion` ← `verification-loop` (the six-phase build→types→lint→tests→security→diff pipeline and VERIFICATION REPORT shape; combined with the superpowers principle above)
  - `skills/engineering/iterative-retrieval` ← `iterative-retrieval` (the DISPATCH/EVALUATE/REFINE/LOOP context-assembly cycle with relevance scoring)
  - `skills/productivity/council` ← `council` (four-voice decision council with parallel-subagent anti-anchoring)
  - `skills/productivity/context-budget` ← `context-budget` (four-phase setup token-overhead audit)
  Each rewrite dropped ECC-internal skill references and infrastructure hooks, generalized ECC-specific paths to
  tool-agnostic terms, drew boundaries against neighbouring dev-hub skills, and added Korean triggers.

A full snapshot of each upstream repo above is kept under `.upstream/<owner>-<repo>/` (fetched periodically by
`.github/workflows/sync-upstream-skills.yml`) for reference and attribution tracking — not installed or distributed.

## Notes

- This file is English-only by policy (see CLAUDE.md "한/영 문서 페어 규칙" exemptions).
- When a skill adapts material from a specific upstream project, add an entry here with the source link
  and its license, and note the adaptation inside that skill's `SKILL.md`.
