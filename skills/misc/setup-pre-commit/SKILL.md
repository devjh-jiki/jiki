---
name: setup-pre-commit
description: Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when the user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing. This is for the JavaScript/TypeScript (Husky) ecosystem — if the repo isn't Node-based, say so and suggest the language-native equivalent (e.g. pre-commit framework for Python) rather than forcing Husky.
---

# setup-pre-commit

Set up a Husky pre-commit hook that runs lint-staged (Prettier) on staged files, then a typecheck and tests, so broken or unformatted code can't be committed.

> JavaScript/TypeScript only. Husky lives in `package.json`. If there's no `package.json`, this skill doesn't apply — point the user at their language's native pre-commit tooling instead.

## What this sets up

- **Husky** pre-commit hook
- **lint-staged** running Prettier on staged files
- **Prettier** config (only if missing)
- **typecheck** and **test** scripts wired into the hook (only the ones the repo actually has)

## Steps

### 1. Detect the package manager

Check for `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn), `bun.lockb` (bun). Use whichever is present; default to npm if unclear. Use it consistently in every command below.

### 2. Install dev dependencies

Install `husky`, `lint-staged`, `prettier` as devDependencies with the detected package manager.

Before staging anything later, make sure `node_modules/` is gitignored — add it to `.gitignore` if missing. The `"*"` glob in lint-staged is greedy: without this, a `git add .` sweeps in dependencies and lint-staged tries to format hundreds of `node_modules` files (and can trip on a nested config inside one).

### 3. Initialize Husky

```bash
npx husky init
```

Creates `.husky/` and adds a `prepare: "husky"` script to `package.json`.

### 4. Write `.husky/pre-commit`

No shebang needed for Husky v9+. Run the fast staged-only step first, then the fuller checks:

```
npx lint-staged
npm run typecheck
npm run test
```

**Adapt to reality, don't assume it:** replace `npm` with the detected manager, and if the repo has no `typecheck` or `test` script in `package.json`, omit that line and tell the user it was skipped — a hook that calls a missing script fails every commit. Treat a placeholder stub like `"test": "echo \"Error: no test specified\" && exit 1"` (what `npm init -y` writes) as *absent* — running it would fail every commit just the same; remove it rather than wiring it in.

### 5. Write `.lintstagedrc`

```json
{ "*": "prettier --ignore-unknown --write" }
```

`--ignore-unknown` skips files Prettier can't parse (images, etc.).

### 6. Write `.prettierrc` (only if missing)

Skip if any Prettier config already exists — don't overwrite the project's style. Otherwise use sensible defaults (2-space, no tabs, 80 width, double quotes, es5 trailing commas, semicolons, always-parens arrows).

### 7. Verify

Completion criterion — all of these hold:

- [ ] `.husky/pre-commit` exists and is executable
- [ ] `.lintstagedrc` exists
- [ ] `package.json` `prepare` script is `"husky"`
- [ ] a Prettier config exists
- [ ] `npx lint-staged` runs clean

### 8. Commit as the smoke test

Stage everything and commit with `Add pre-commit hooks (husky + lint-staged + prettier)`. This commit runs *through* the new hook — if it passes, the setup works end-to-end. That commit is the test, not a formality.

## Owner / leadership lens

For a developer who is also CEO/CTO/CFO/PM, a pre-commit hook is quality moved left:

- **It catches cheap defects at the cheapest moment.** Formatting noise, type errors, and broken tests caught at commit never reach a reviewer, CI minutes, or a teammate's pull. The earliest gate is the cheapest gate.
- **It encodes the team's standard once.** New hires and agents inherit the same bar without being told — the hook is the standard, not a wiki page nobody reads.
- **Keep it fast or it gets bypassed.** lint-staged runs only on staged files for a reason; if the hook grows slow, people reach for `--no-verify` and the gate is gone. A guardrail that's routinely skipped has depreciated to zero.

## Attribution

Adapted from [mattpocock/skills `setup-pre-commit`](https://github.com/mattpocock/skills/tree/main/skills/misc/setup-pre-commit) (MIT). See THIRD_PARTY_NOTICES.md.
