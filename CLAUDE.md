# CLAUDE.md

이 레포는 개발 자산의 공개 인덱스 허브입니다. 에이전트는 아래 구조를 따릅니다.

## 디렉토리

- `skills/` — 에이전트 스킬. 버킷 폴더로 분류:
  - `engineering/` — 매일 하는 코드 작업
  - `productivity/` — 비코드 워크플로우 (블로그 작성, 학습 등)
  - `personal/` — 내 셋업 전용, 홍보 안 함
  - `in-progress/` — 아직 미완성 초안
  - `deprecated/` — 더 이상 안 씀
- `mcp/` — 도구별(claude/cursor/vscode/opencode) MCP 설정 스니펫
- `prompts/` — 단발성 복붙 프롬프트 (반복되면 skill 로 승격)
- `learning/ai/` — AI 학습 로드맵·자료·기록
- `snippets/` — 코드/설정 스니펫

## Skill 규칙 (Anthropic Agent Skills 표준)

모든 스킬은 `skills/<bucket>/<skill-name>/SKILL.md` 형태이며 YAML frontmatter 필수:

```yaml
---
name: skill-name        # 소문자/숫자/하이픈, 64자 이내, "claude"/"anthropic" 금지
description: 무엇을 하는지 + 언제 쓰는지. 1024자 이내. 자동 트리거의 핵심.
---
```

- `engineering/`, `productivity/`, `misc/` 의 스킬은 루트 README 와 `.claude-plugin/plugin.json` 에 반드시 등재.
- `personal/`, `in-progress/`, `deprecated/` 는 어디에도 등재 금지.
- 사용자-호출(user-invoked) 스킬은 `disable-model-invocation: true` 를 두고 사람만 `/명령`으로 실행.
- 모델-호출(model-invoked) 스킬은 작업이 맞으면 에이전트가 자동으로 집어듦.
- 사용자-호출 스킬은 모델-호출 스킬을 부를 수 있으나, 다른 사용자-호출 스킬은 부르지 않는다.

## 버저닝

- Changesets 사용. 변경 시 `pnpm changeset` 으로 변경분 기록 후 릴리스.
- upstream(외부 skills 레포) 동기화는 `.github/workflows/sync-upstream-skills.yml` 가 주기적으로 PR 생성. 사람이 선별 머지한다.
