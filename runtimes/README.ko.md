# 런타임 어댑터

> English: [README.md](./README.md)

이 디렉터리는 특정 에이전트 런타임에만 필요한 자산을 관리합니다. 공용 워크플로우는 [`skills/`](../skills)를 단일 원본으로 유지합니다.

| 런타임 | 디렉터리 | 런타임 전용 자산 |
|---|---|---|
| Claude Code | [`claude-code/`](./claude-code) | Claude 전용 스킬, hook, MCP 스니펫 |
| Codex | [`codex/`](./codex) | Codex 설정과 MCP 스니펫 |
| OpenCode | [`opencode/`](./opencode) | 슬래시 명령과 MCP 스니펫 |
| Cursor | [`cursor/`](./cursor) | Cursor 전용 설정 |
| VS Code | [`vscode/`](./vscode) | VS Code 전용 설정 |

도구가 고정된 경로를 요구하므로 런타임 발견 파일은 레포 최상단에 유지합니다.

- Claude Code: `CLAUDE.md`, `.claude-plugin/`
- Codex: `AGENTS.md`, `.agents/skills/`

공용 스킬 본문을 런타임 폴더에 복사하지 않습니다. 형식, 생명주기, 권한 또는 동작이 특정 런타임에 종속될 때만 이곳에 자산을 추가합니다.
