# Skills

매일 쓰는 나만의 에이전트 스킬 모음. [Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) 표준을 따릅니다.

## 설치

```bash
npx skills@latest add devjh-jiki/jiki
```

## 버킷

| 버킷 | 용도 | README 등재 |
|------|------|-------------|
| `engineering/` | 매일 하는 코드 작업 | O |
| `productivity/` | 비코드 워크플로우(블로그 등) | O |
| `learning/` | AI·기술 지식 학습 코치 | O |
| `personal/` | 내 셋업 전용 | X |
| `in-progress/` | 미완성 초안 | X |
| `deprecated/` | 더 이상 안 씀 | X |

## 등재된 스킬

### Engineering

**User-invoked** (사람이 `/명령`으로만 실행)

- _(아직 없음 — 첫 스킬을 추가하세요)_

**Model-invoked** (작업에 맞으면 에이전트가 자동 사용)

- _(아직 없음)_

### Productivity

**User-invoked**

- [write-blog-post](./productivity/write-blog-post/SKILL.md) — 초안·학습·경험을 jihoon 스타일 한국어 기술 블로그 글로 작성/리파인 (문체·SEO 가이드 포함)

**Model-invoked**

- _(아직 없음)_

### Learning

**Model-invoked** (학습 맥락이면 에이전트가 자동 사용)

- [open-source-reverse-engineering-coach](./learning/open-source-reverse-engineering-coach/SKILL.md) — 오픈소스를 역공학하며 아키텍처·인터페이스·트레이드오프를 배우는 코치
- [technical-book-coach](./learning/technical-book-coach/SKILL.md) — 기술 서적·문서를 코칭으로 학습 (영문 붙여넣기 시 한글 번역 + 코칭 분리)

## upstream 동기화

[mattpocock/skills](https://github.com/mattpocock/skills) 등 검증된 외부 레포의 변경분은
`.github/workflows/sync-upstream-skills.yml` 가 주기적으로 감지해 **PR로 제안**합니다.
PR을 검토하고 내 기준에 맞는 것만 머지하세요.
