# Codex MCP Setup

> 한국어: [README.ko.md](./README.ko.md)

Codex stores MCP servers in `config.toml`:

- User scope: `~/.codex/config.toml`
- Trusted-project scope: `.codex/config.toml`

The ChatGPT desktop app, Codex CLI, and Codex IDE extension share the same host configuration.

## CLI

Prefer the CLI when adding a user-level server:

```sh
codex mcp add <server-name> -- <stdio-command>
codex mcp list
```

For an HTTP server:

```sh
codex mcp add <server-name> --url https://example.com/mcp
```

Run `codex mcp --help` for the complete command surface.

## `config.toml`

STDIO example:

```toml
[mcp_servers.example]
command = "npx"
args = ["-y", "@example/mcp-server"]
env_vars = ["EXAMPLE_TOKEN"]
```

Streamable HTTP example:

```toml
[mcp_servers.example]
url = "https://example.com/mcp"
bearer_token_env_var = "EXAMPLE_TOKEN"
```

Never commit token values. Reference environment-variable names instead. Add project-scoped MCP configuration only when every collaborator who trusts the repository should receive that server definition.
