# AGENTS.md

This repository is a public index hub for reusable developer assets. Keep changes portable across agent runtimes and preserve the existing English/Korean documentation pairs.

## Repository Map

- `skills/` — source of truth for runtime-neutral reusable agent skills, grouped by domain.
- `runtimes/` — runtime-specific skills, commands, hooks, MCP snippets, and configuration.
- `.agents/skills/` — Codex discovery adapter. Each entry is a relative symlink to a compatible skill under `skills/`.
- `.claude-plugin/` — Claude Code plugin and marketplace metadata.
- `mcp/` — cross-runtime MCP index; actual snippets live under `runtimes/<runtime>/mcp/`.
- `prompts/` — one-off copy-and-paste prompts. Promote repeated workflows to skills.
- `learning/ai/` — AI learning roadmap, references, and journal.
- `snippets/` — reusable code and configuration snippets.

## Skill Contract

Every shared skill uses `skills/<bucket>/<skill-name>/SKILL.md`; runtime-specific skills use `runtimes/<runtime>/skills/<skill-name>/SKILL.md`. Both use YAML frontmatter:

```yaml
---
name: skill-name
description: What the skill does and when it should activate.
---
```

- Treat the English `SKILL.md` as the source of truth and keep `SKILL.ko.md` semantically synchronized.
- Use lowercase letters, numbers, and hyphens for `name`.
- Keep detailed procedures in the body and make `description` specific enough for reliable activation.
- Register public shared skills in the root README files, the bucket README files, and compatible runtime manifests.
- Add a relative symlink under `.agents/skills/<skill-name>` when a shared skill is compatible with Codex.
- Put runtime-specific skills under `runtimes/<runtime>/skills/` and register them only with that runtime. For example, `git-guardrails` lives under `runtimes/claude-code/`.
- Do not list `personal/`, `in-progress/`, or `deprecated/` skills in public indexes or runtime adapters.

## English/Korean Documentation Pairs

English is the source of truth except for the root README:

- `X.md` pairs with `X.ko.md`.
- When either file changes, update the other with the same meaning.
- Root documentation is the exception: `README.md` is Korean and pairs with `README.en.md`.
- Pairing is not required for `CLAUDE.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, Changesets, code, executable command templates, templates, snippets, or supporting files under `references/`.

Run the same checks as `.github/workflows/check-doc-pairs.yml` after documentation changes.

## Working Agreements

- Preserve unrelated user changes in the worktree.
- Inspect the relevant skill, its references, indexes, and runtime registrations before editing.
- Prefer the narrowest complete change and avoid duplicating skill bodies across runtimes.
- Keep root discovery shims thin; place runtime-specific implementation under `runtimes/`.
- Use relative symlinks in `.agents/skills/` so clones remain portable.
- Do not add dependencies unless the task requires them.
- Use Changesets for release-worthy changes: `pnpm changeset`.

## Verification

For Codex adapter changes, verify that every link resolves to a directory containing `SKILL.md`:

```sh
find -L .agents/skills -mindepth 2 -maxdepth 2 -name SKILL.md -print
```

For documentation changes, run the repository's pair-check logic or the corresponding GitHub Actions workflow.
