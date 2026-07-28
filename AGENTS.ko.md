# AGENTS.md

이 레포는 재사용 가능한 개발 자산의 공개 인덱스 허브입니다. 변경 사항은 여러 에이전트 런타임에서 이식 가능해야 하며 기존 한/영 문서 쌍을 유지해야 합니다.

## 레포 구조

- `skills/` — 도메인별로 분류한 런타임 중립 재사용 스킬의 단일 원본.
- `runtimes/` — 런타임 전용 스킬, 명령, hook, MCP 스니펫, 설정.
- `.agents/skills/` — Codex 발견용 어댑터. 각 항목은 `skills/` 아래의 호환 스킬을 가리키는 상대 심볼릭 링크.
- `.claude-plugin/` — Claude Code 플러그인 및 마켓플레이스 메타데이터.
- `mcp/` — 런타임 공통 MCP 인덱스. 실제 스니펫은 `runtimes/<runtime>/mcp/`에 둡니다.
- `prompts/` — 단발성 복붙 프롬프트. 반복되는 워크플로우는 스킬로 승격.
- `learning/ai/` — AI 학습 로드맵, 자료, 기록.
- `snippets/` — 재사용 가능한 코드와 설정 스니펫.

## Skill 규칙

공용 스킬은 `skills/<bucket>/<skill-name>/SKILL.md`, 런타임 전용 스킬은 `runtimes/<runtime>/skills/<skill-name>/SKILL.md`에 두며 모두 YAML frontmatter를 사용합니다.

```yaml
---
name: skill-name
description: 스킬이 하는 일과 활성화되어야 하는 조건.
---
```

- 영어 `SKILL.md`를 단일 원본으로 취급하고 `SKILL.ko.md`를 같은 의미로 동기화합니다.
- `name`에는 소문자, 숫자, 하이픈만 사용합니다.
- 상세 절차는 본문에 두고, 안정적으로 활성화되도록 `description`에 적용 범위를 구체적으로 적습니다.
- 공개 공용 스킬은 루트 README, 버킷 README, 호환되는 런타임 manifest에 등록합니다.
- Codex와 호환되는 공용 스킬은 `.agents/skills/<skill-name>`에 상대 심볼릭 링크를 추가합니다.
- 런타임 전용 스킬은 `runtimes/<runtime>/skills/`에 두고 해당 런타임에만 등록합니다. 예를 들어 `git-guardrails`는 `runtimes/claude-code/` 아래에 둡니다.
- `personal/`, `in-progress/`, `deprecated/` 스킬은 공개 인덱스나 런타임 어댑터에 등록하지 않습니다.

## 한/영 문서 쌍

루트 README를 제외하면 영어가 단일 원본입니다.

- `X.md`는 `X.ko.md`와 쌍을 이룹니다.
- 한쪽을 변경하면 다른 쪽도 같은 의미로 갱신합니다.
- 루트 문서는 예외로, `README.md`가 한국어이며 `README.en.md`와 쌍을 이룹니다.
- `CLAUDE.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, Changeset, 코드, 실행 가능한 command template, template, 스니펫, `references/` 아래 보조 파일은 번역 쌍이 없어도 됩니다.

문서를 변경한 뒤 `.github/workflows/check-doc-pairs.yml`과 같은 검사를 실행합니다.

## 작업 규칙

- 작업 트리의 관련 없는 사용자 변경을 보존합니다.
- 편집 전에 관련 스킬, references, 인덱스, 런타임 등록 정보를 확인합니다.
- 중복 스킬 본문을 런타임별로 만들지 말고, 가장 좁고 완전한 변경을 선호합니다.
- 최상단 discovery shim은 얇게 유지하고 런타임 전용 구현은 `runtimes/`에 둡니다.
- clone 후에도 동작하도록 `.agents/skills/`에는 상대 심볼릭 링크를 사용합니다.
- 작업에 필요하지 않은 의존성은 추가하지 않습니다.
- 릴리스할 변경에는 Changesets를 사용합니다: `pnpm changeset`.

## 검증

Codex 어댑터를 변경한 경우 모든 링크가 `SKILL.md`를 포함한 디렉터리로 해석되는지 확인합니다.

```sh
find -L .agents/skills -mindepth 2 -maxdepth 2 -name SKILL.md -print
```

문서를 변경한 경우 레포의 문서 쌍 검사 로직이나 해당 GitHub Actions 워크플로우를 실행합니다.
