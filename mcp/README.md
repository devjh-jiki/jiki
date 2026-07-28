# MCP Setup Collection

> 한국어: [README.ko.md](./README.ko.md)

MCP (Model Context Protocol) server configs per tool. Organized to be **copy-paste-able anywhere**.

## Location per tool

| Tool | Config file location | Folder |
|------|----------------|------|
| Claude Desktop / Code | `~/Library/Application Support/Claude/claude_desktop_config.json`, etc. | [`runtimes/claude-code/mcp/`](../runtimes/claude-code/mcp) |
| Codex | `~/.codex/config.toml` (user) or `.codex/config.toml` (trusted project) | [`runtimes/codex/mcp/`](../runtimes/codex/mcp) |
| Cursor | `.cursor/mcp.json` (project) or global | [`runtimes/cursor/mcp/`](../runtimes/cursor/mcp) |
| VS Code | `.vscode/mcp.json` | [`runtimes/vscode/mcp/`](../runtimes/vscode/mcp) |
| OpenCode | `opencode.json` | [`runtimes/opencode/mcp/`](../runtimes/opencode/mcp) |

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
