# MCP Setup Collection

> 한국어: [README.ko.md](./README.ko.md)

MCP (Model Context Protocol) server configs per tool. Organized to be **copy-paste-able anywhere**.

## Location per tool

| Tool | Config file location | Folder |
|------|----------------|------|
| Claude Desktop / Code | `~/Library/Application Support/Claude/claude_desktop_config.json`, etc. | [`claude/`](./claude) |
| Cursor | `.cursor/mcp.json` (project) or global | [`cursor/`](./cursor) |
| VS Code | `.vscode/mcp.json` | [`vscode/`](./vscode) |
| OpenCode | `opencode.json` | [`opencode/`](./opencode) |

## Usage

Copy the snippet from each folder and paste it into the tool's config file under `mcpServers` (or the tool-specific key).
Items that require environment variables are marked with comments. **Never commit secrets** — reference them as `${ENV_VAR}`.

## Recommended combos by use case

| Use case | Recommended MCP |
|------|----------|
| Codebase exploration | filesystem, git |
| Web research | fetch, brave-search |
| Docs/knowledge | (add per project) |

> Fill in the actual snippets in each folder. Start with the 1–2 you use most.
