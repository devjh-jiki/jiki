# Codex MCP 설정

> English: [README.md](./README.md)

Codex는 MCP 서버를 `config.toml`에 저장합니다.

- 사용자 범위: `~/.codex/config.toml`
- 신뢰한 프로젝트 범위: `.codex/config.toml`

ChatGPT 데스크톱 앱, Codex CLI, Codex IDE 확장은 같은 호스트 설정을 공유합니다.

## CLI

사용자 범위 서버를 추가할 때는 CLI를 우선 사용합니다.

```sh
codex mcp add <server-name> -- <stdio-command>
codex mcp list
```

HTTP 서버:

```sh
codex mcp add <server-name> --url https://example.com/mcp
```

전체 명령은 `codex mcp --help`로 확인합니다.

## `config.toml`

STDIO 예시:

```toml
[mcp_servers.example]
command = "npx"
args = ["-y", "@example/mcp-server"]
env_vars = ["EXAMPLE_TOKEN"]
```

Streamable HTTP 예시:

```toml
[mcp_servers.example]
url = "https://example.com/mcp"
bearer_token_env_var = "EXAMPLE_TOKEN"
```

토큰 값은 절대 커밋하지 말고 환경 변수 이름만 참조합니다. 레포를 신뢰하는 모든 동료에게 해당 서버 정의가 필요한 경우에만 프로젝트 범위 MCP 설정을 추가합니다.
