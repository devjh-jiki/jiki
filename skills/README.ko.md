# Skills

> English: [README.md](./README.md)

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
| `business/` | 창업·제품·마케팅 | O |
| `personal/` | 내 셋업 전용 | X |
| `in-progress/` | 미완성 초안 | X |
| `deprecated/` | 더 이상 안 씀 | X |

## 등재된 스킬

### Engineering

**User-invoked** (사람이 `/명령`으로만 실행)

- [improve-codebase-architecture](./engineering/improve-codebase-architecture/SKILL.ko.md) — 심화 기회 스캔, HTML 리포트, 하나 골라 grilling
- [to-prd](./engineering/to-prd/SKILL.ko.md) — 현재 대화를 PRD 로 합성 (인터뷰 없음)

**Model-invoked** (작업에 맞으면 에이전트가 자동 사용)

- [tdd](./engineering/tdd/SKILL.ko.md) — 레드-그린-리팩터, 수직 슬라이스 단위
- [diagnosing-bugs](./engineering/diagnosing-bugs/SKILL.ko.md) — 체계적 진단 루프; 단단한 red 가능 피드백 루프부터
- [codebase-design](./engineering/codebase-design/SKILL.ko.md) — 깊은 모듈 설계 어휘

### Productivity

**User-invoked**

- [write-blog-post](./productivity/write-blog-post/SKILL.ko.md) — 초안·학습·경험을 jihoon 스타일 한국어 기술 블로그 글로 작성/리파인 (문체·SEO 가이드 포함)
- [grill-me](./productivity/grill-me/SKILL.ko.md) — 계획·설계·의사결정·사업 아이디어를 스트레스 테스트하는 집요한 인터뷰 (mattpocock/skills 참고)

**Model-invoked**

- _(아직 없음)_

### Learning

**Model-invoked** (학습 맥락이면 에이전트가 자동 사용)

- [open-source-reverse-engineering-coach](./learning/open-source-reverse-engineering-coach/SKILL.ko.md) — 오픈소스를 역공학하며 아키텍처·인터페이스·트레이드오프를 배우는 코치
- [technical-book-coach](./learning/technical-book-coach/SKILL.ko.md) — 기술 서적·문서를 코칭으로 학습 (영문 붙여넣기 시 한글 번역 + 코칭 분리)

### Business (Review)

**Model-invoked**

- [biz-opportunity-scout](./business/biz-opportunity-scout/SKILL.ko.md) — 사업 기회 검증 (TAM/SAM/SOM, 유닛 이코노믹스, 경쟁, PMF) + 정직한 Go/No-Go
- [marketing-copy](./business/marketing-copy/SKILL.ko.md) — 제품/기능을 한국어 마케팅 카피로
- [product-spec-builder](./business/product-spec-builder/SKILL.ko.md) — 짧은 인터뷰로 거친 아이디어를 만들 수 있는 PRD 로

## upstream 동기화

[mattpocock/skills](https://github.com/mattpocock/skills) 등 검증된 외부 레포의 변경분은
`.github/workflows/sync-upstream-skills.yml` 가 주기적으로 감지해 **PR로 제안**합니다.
PR을 검토하고 내 기준에 맞는 것만 머지하세요.
