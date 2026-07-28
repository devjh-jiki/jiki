# Skills

> English: [README.md](./README.md)

매일 쓰는 나만의 에이전트 스킬 모음. 공개 [Agent Skills](https://agentskills.io) 표준을 따르며 Claude Code, Codex, 호환 런타임에서 함께 사용합니다.

## 설치

```bash
npx skills@latest add devjh-jiki/jiki
```

이 레포에서 작업할 때 Codex는 `.agents/skills/` 어댑터를 통해 호환 스킬을 자동으로 발견합니다.

## 버킷

| 버킷 | 용도 | README 등재 |
|------|------|-------------|
| `engineering/` | 매일 하는 코드 작업 | O |
| `productivity/` | 비코드 워크플로우(블로그 등) | O |
| `learning/` | AI·기술 지식 학습 코치 | O |
| `business/` | 창업·제품·마케팅 | O |
| `misc/` | 일회성 환경 설정 | O |
| `personal/` | 내 셋업 전용 | X |
| `in-progress/` | 미완성 초안 | X |
| `deprecated/` | 더 이상 안 씀 | X |

## 등재된 스킬

### Engineering

**User-invoked** (사람이 `/명령`으로만 실행)

- [improve-codebase-architecture](./engineering/improve-codebase-architecture/SKILL.ko.md) — 심화 기회 스캔, HTML 리포트, 하나 골라 grilling
- [to-prd](./engineering/to-prd/SKILL.ko.md) — 현재 대화를 PRD 로 합성 (인터뷰 없음)
- [to-issues](./engineering/to-issues/SKILL.ko.md) — 계획/PRD 를 수직 슬라이스 이슈로 분해
- [grill-with-docs](./engineering/grill-with-docs/SKILL.ko.md) — 진행하며 용어집 + ADR 까지 유지하는 grilling
- [prototype](./engineering/prototype/SKILL.ko.md) — 설계 리스크를 줄이는 throwaway 프로토타입
- [design-system](./engineering/design-system/SKILL.ko.md) — 토큰 기반 UI 디자인 시스템 설계/구현/리뷰 (Astryx 베이스, 모든 스택)
- [anti-slop-frontend](./engineering/anti-slop-frontend/SKILL.ko.md) — AI가 만든 마케팅/랜딩/포트폴리오 프론트엔드가 템플릿처럼 안 보이게 (브리프 읽기, 세 다이얼, LLM 기본값 회피, 프리플라이트)
- [implement](./engineering/implement/SKILL.ko.md) — 합의된 PRD/이슈/슬라이스를 커밋된 테스트 코드로 구현

**Model-invoked** (작업에 맞으면 에이전트가 자동 사용)

- [tdd](./engineering/tdd/SKILL.ko.md) — 레드-그린-리팩터, 수직 슬라이스 단위
- [lazy-code](./engineering/lazy-code/SKILL.ko.md) — 실제로 동작하는 가장 게으른 해법 강제 (YAGNI 사다리, 의존성보다 표준 라이브러리/네이티브); lite/full/ultra
- [diagnosing-bugs](./engineering/diagnosing-bugs/SKILL.ko.md) — 체계적 진단 루프; 단단한 red 가능 피드백 루프부터
- [codebase-design](./engineering/codebase-design/SKILL.ko.md) — 깊은 모듈 설계 어휘
- [domain-modeling](./engineering/domain-modeling/SKILL.ko.md) — 도메인 모델을 능동적으로 구축·정밀화 (용어집 + ADR)
- [resolving-merge-conflicts](./engineering/resolving-merge-conflicts/SKILL.ko.md) — merge/rebase 충돌을 양쪽 의도 복원으로 해소
- [webapp-testing](./engineering/webapp-testing/SKILL.ko.md) — Playwright 로 로컬 웹앱 구동·테스트 (정찰 후 행동)
- [eval-harness](./engineering/eval-harness/SKILL.ko.md) — 비결정적 작업의 eval-driven development: 기준을 먼저 정의하고 pass@k / pass^k 로 측정 (affaan-m/ecc 적응)
- [verification-before-completion](./engineering/verification-before-completion/SKILL.ko.md) — 증거 없이 done 금지: build/types/lint/tests/security/diff 돌리고 출력 읽기 (obra/superpowers + affaan-m/ecc 적응)
- [iterative-retrieval](./engineering/iterative-retrieval/SKILL.ko.md) — dispatch→evaluate→refine 루프와 관련도 채점으로 서브에이전트에 충분한 컨텍스트 조립 (affaan-m/ecc 적응)

### Productivity

**User-invoked**

- [write-blog-post](./productivity/write-blog-post/SKILL.ko.md) — 초안·학습·경험을 jihoon 스타일 한국어 기술 블로그 글로 작성/리파인 (문체·SEO 가이드 포함)
- [grill-me](./productivity/grill-me/SKILL.ko.md) — 계획·설계·의사결정·사업 아이디어를 스트레스 테스트하는 집요한 인터뷰 (mattpocock/skills 참고)
- [handoff](./productivity/handoff/SKILL.ko.md) — 대화를 인계 문서로 압축해 다른 에이전트가 이어받게
- [writing-great-skills](./productivity/writing-great-skills/SKILL.ko.md) — 스킬을 잘 쓰고 편집하는 법 레퍼런스
- [terse-output](./productivity/terse-output/SKILL.ko.md) — 정확도는 유지하며 토큰을 줄이는 초압축 출력; lite/full/ultra (JuliusBrussee/caveman 참고)

**Model-invoked**

- [document-with-research](./productivity/document-with-research/SKILL.ko.md) — 고품질 마크다운 문서 산출: 오픈데이터 조사, 주장 검증, 구조 설계, 작성, 그리고 기존 자료를 가독성·문서 간 연결 관점에서 다듬기
- [recency-research](./productivity/recency-research/SKILL.ko.md) — 어떤 주제의 최근 ~30일 커뮤니티 신호를 조사 (Reddit, HN, GitHub, X, 웹), 인게이지먼트로 점수화 (mvanhorn/last30days-skill 참고)
- [council](./productivity/council/SKILL.ko.md) — 애매한 결정에 4-보이스 council(Architect/Skeptic/Pragmatist/Critic)을 병렬 서브에이전트로 소집, 앵커링 방지 (affaan-m/ecc 적응)
- [context-budget](./productivity/context-budget/SKILL.ko.md) — 에이전트/스킬/MCP/룰의 상시 컨텍스트 오버헤드를 감사하고 뭘 자를지 순위화 (affaan-m/ecc 적응)

### Learning

**Model-invoked** (학습 맥락이면 에이전트가 자동 사용)

- [open-source-reverse-engineering-coach](./learning/open-source-reverse-engineering-coach/SKILL.ko.md) — 오픈소스를 역공학하며 아키텍처·인터페이스·트레이드오프를 배우는 코치
- [technical-book-coach](./learning/technical-book-coach/SKILL.ko.md) — 기술 서적·문서를 코칭으로 학습 (영문 붙여넣기 시 한글 번역 + 코칭 분리)

### Business

**Model-invoked**

- [biz-opportunity-scout](./business/biz-opportunity-scout/SKILL.ko.md) — 사업 기회 검증 (TAM/SAM/SOM, 유닛 이코노믹스, 경쟁, PMF) + 정직한 Go/No-Go
- [marketing-copy](./business/marketing-copy/SKILL.ko.md) — 제품/기능을 한국어 마케팅 카피로
- [product-spec-builder](./business/product-spec-builder/SKILL.ko.md) — 짧은 인터뷰로 거친 아이디어를 만들 수 있는 PRD 로

### Misc

**Model-invoked**

- [setup-pre-commit](./misc/setup-pre-commit/SKILL.ko.md) — lint-staged/Prettier/타입체크/테스트를 도는 Husky pre-commit hook 설치 (JS/TS 전용)

Claude Code의 [git-guardrails](../runtimes/claude-code/skills/git-guardrails/SKILL.ko.md)처럼 런타임 전용인 스킬은 `runtimes/` 아래에 둡니다.

## upstream 동기화

[mattpocock/skills](https://github.com/mattpocock/skills) 등 검증된 외부 레포의 변경분은
`.github/workflows/sync-upstream-skills.yml` 가 주기적으로 감지해 **PR로 제안**합니다.
PR을 검토하고 내 기준에 맞는 것만 머지하세요.
