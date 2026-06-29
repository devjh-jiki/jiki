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

## 한/영 문서 페어 규칙 (중요)

모든 문서는 **영어 원본 + 한국어 번역 쌍**으로 관리한다. 영어가 source of truth.

- 영어 파일: `X.md` (예: `README.md`, `SKILL.md`)
- 한국어 파일: `X.ko.md` (예: `README.ko.md`, `SKILL.ko.md`)
- **한쪽을 수정하면 반드시 다른 쪽도 같은 의미로 수정한다.** 둘은 항상 동기화되어야 한다.
- 에이전트가 읽고 실행하는 정본은 영어 `SKILL.md`. `SKILL.ko.md` 는 사람이 읽는 번역본이며, frontmatter 의 `name` 은 영어본과 동일하게 유지하되 한국어본은 에이전트 트리거 대상이 아니다.
- CI(`.github/workflows/check-doc-pairs.yml`)가 쌍 누락을 검사한다. `X.md` 가 있으면 `X.ko.md` 도 있어야 한다(그 반대도). 누락 시 빌드 실패.
- **예외 — 루트 README**: GitHub 첫 화면 가독성을 위해 루트만 한국어가 메인이다. `README.md`(한국어) + `README.en.md`(영어) 쌍으로 둔다. 이 둘은 `.ko.md` 규칙을 따르지 않는다.
- 예외(번역 쌍 불필요): `CLAUDE.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, 코드/스니펫 파일, `references/` 내부 보조 문서는 영어 단일 또는 한국어 단일 허용. 체크 대상은 `README` 와 `SKILL` 계열.

## 신뢰도 라벨 (마켓플레이스 운영)

스킬은 검증 단계로 표시한다. 루트 `README` 와 `skills/README` 에 반영:

- **Available** — 직접 테스트·검증 완료. 외부 설치 권장.
- **Review** — 평가 중. 검증되면 Available 로 승격.
- **Private** — 개인 셋업 전용. 마켓플레이스 미포함 (`personal/` 버킷).

## 마켓플레이스 배포

- `.claude-plugin/marketplace.json` 으로 Claude Code 마켓플레이스 배포.
- 설치: `/plugin marketplace add devjh-jiki/jiki` → `/plugin install <plugin>@jiki-skills`.
- 도메인별 플러그인으로 묶을 수 있다 (예: learning-skills, writing-skills).
