# Claude Code MCP Snippets

> 한국어: [README.ko.md](./README.ko.md)

Paste these into `mcpServers` in `claude_desktop_config.json` or your Claude Code settings.

## filesystem (local file access)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

## fetch (fetch web pages)

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

<!-- Keep adding the MCPs you use most here. Secrets go in ${ENV_VAR}. -->
