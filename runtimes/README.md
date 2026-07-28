# Runtime Adapters

> 한국어: [README.ko.md](./README.ko.md)

This directory owns assets that are specific to one agent runtime. Shared workflows remain under [`skills/`](../skills) as the single source of truth.

| Runtime | Directory | Runtime-specific assets |
|---|---|---|
| Claude Code | [`claude-code/`](./claude-code) | Claude-only skills, hooks, and MCP snippets |
| Codex | [`codex/`](./codex) | Codex configuration and MCP snippets |
| OpenCode | [`opencode/`](./opencode) | Slash commands and MCP snippets |
| Cursor | [`cursor/`](./cursor) | Cursor-specific configuration |
| VS Code | [`vscode/`](./vscode) | VS Code-specific configuration |

Runtime discovery files remain at the repository root because the tools require fixed locations:

- `CLAUDE.md` and `.claude-plugin/` for Claude Code.
- `AGENTS.md` and `.agents/skills/` for Codex.

Do not copy shared skill bodies into runtime folders. Add an asset here only when its format, lifecycle, permissions, or behavior is runtime-specific.
