# Misc Skills

> 한국어: [README.ko.md](./README.ko.md)

One-off setup skills that configure a specific environment, rather than the day-to-day code/writing skills in the other buckets. Each targets a particular runtime or ecosystem — read the description before reaching for it.

**Model-invoked** (used automatically when the context fits)

- [git-guardrails](./git-guardrails/SKILL.md) — Set up a Claude Code PreToolUse hook that blocks dangerous git commands (push, reset --hard, clean -f, branch -D, checkout/restore .). Claude Code only.
- [setup-pre-commit](./setup-pre-commit/SKILL.md) — Set up Husky pre-commit hooks with lint-staged (Prettier), typecheck, and tests. JavaScript/TypeScript only.

Both are **Available** (validated in real use) and adapted from [mattpocock/skills](https://github.com/mattpocock/skills). See [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md).
