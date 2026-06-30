# Commands

opencode custom commands. Each `*.md` here can be used as a `/<name>` slash command in the opencode TUI.

These are kept in dev-hub for version control, then **activated per-project** (not globally) so they never auto-load in work repos that have their own conventions.

## Available

- **design-system.md** → `/design-system <request>` — loads the `engineering/design-system` skill (reads its SKILL.md + references, uses the bundled docs template) and applies it to your request. Respects an existing design system when present.

## Activate in a side project

opencode discovers commands in `.opencode/commands/` (per-project) or `~/.config/opencode/commands/` (global). To use a command **only in a specific side project**, symlink it from this repo:

```bash
# run inside the side project's repo root
mkdir -p .opencode/commands
ln -sfn ~/Desktop/dev-hub/commands/design-system.md .opencode/commands/design-system.md
```

Then in opencode (TUI), in that project:

```
/design-system this docs site needs a cool-neutral theme with an indigo accent, light + dark
```

`$ARGUMENTS` in the command becomes everything after `/design-system`.

## Why per-project, not global

A global command would offer `/design-system` everywhere — including work repos that already have a defined design system. Symlinking per side project keeps it scoped: it exists only where you put it, and the skill itself also respects any existing system as a second safeguard.

To remove it from a project: `rm .opencode/commands/design-system.md` (removes the symlink, not the source).
