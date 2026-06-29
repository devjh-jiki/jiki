# MCP 세팅 모음집

도구별 MCP(Model Context Protocol) 서버 설정. **어디에나 복붙 가능**하도록 정리합니다.

## 도구별 위치

| 도구 | 설정 파일 위치 | 폴더 |
|------|----------------|------|
| Claude Desktop / Code | `~/Library/Application Support/Claude/claude_desktop_config.json` 등 | [`claude/`](./claude) |
| Cursor | `.cursor/mcp.json` (프로젝트) 또는 글로벌 | [`cursor/`](./cursor) |
| VS Code | `.vscode/mcp.json` | [`vscode/`](./vscode) |
| OpenCode | `opencode.json` | [`opencode/`](./opencode) |

## 사용법

각 폴더의 스니펫을 복사해 해당 도구 설정 파일의 `mcpServers`(또는 도구별 키)에 붙여넣으세요.
환경변수가 필요한 항목은 주석으로 표시되어 있습니다. **secret 은 절대 커밋하지 마세요** — `${ENV_VAR}` 형태로 참조합니다.

## 용도별 추천 조합

| 용도 | 추천 MCP |
|------|----------|
| 코드베이스 탐색 | filesystem, git |
| 웹 리서치 | fetch, brave-search |
| 문서/지식 | (프로젝트별 추가) |

> 각 폴더에 실제 스니펫을 채워넣으세요. 처음엔 자주 쓰는 것 1~2개부터.
