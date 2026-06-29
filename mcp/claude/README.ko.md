# Claude MCP 스니펫

> English: [README.md](./README.md)

`claude_desktop_config.json` 또는 Claude Code 설정의 `mcpServers` 에 붙여넣으세요.

## filesystem (로컬 파일 접근)

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

## fetch (웹 페이지 가져오기)

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

<!-- 자주 쓰는 MCP 를 여기 계속 추가하세요. secret 은 ${ENV_VAR} 로. -->
