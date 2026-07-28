# OpenCode 명령

> English: [README.md](./README.md)

이 디렉터리의 `*.md`는 OpenCode TUI에서 `/<name>` 슬래시 명령으로 사용할 수 있는 custom command입니다.

이 레포에서 버전관리하되, 각 프로젝트에서만 활성화해 자체 규칙이 있는 업무 레포에 전역 로드되지 않도록 합니다.

## 사용 가능한 명령

- **design-system.md** → `/design-system <request>` — `engineering/design-system` 스킬과 references, 문서 템플릿을 불러와 요청에 적용합니다. 기존 디자인 시스템이 있으면 이를 존중합니다.

## 사이드 프로젝트에서 활성화

사이드 프로젝트 루트에서 다음과 같이 링크를 만듭니다.

```bash
mkdir -p .opencode/commands
ln -sfn /path/to/dev-hub/runtimes/opencode/commands/design-system.md .opencode/commands/design-system.md
```

그 뒤 OpenCode TUI에서 실행합니다.

```text
/design-system this docs site needs a cool-neutral theme with an indigo accent, light + dark
```

`$ARGUMENTS`는 `/design-system` 뒤의 전체 입력으로 치환됩니다. 제거할 때는 프로젝트의 `.opencode/commands/design-system.md` 링크만 삭제합니다.
