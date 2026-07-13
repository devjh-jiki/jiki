# Engineering Skills

> English: [README.md](./README.md)

매일 하는 코드 작업 스킬. 일부는 [mattpocock/skills](https://github.com/mattpocock/skills) 에서 가져와
오너/리더십 관점을 더했다. [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md) 참고.

**User-invoked** (사람이 `/명령`으로 실행)

- [improve-codebase-architecture](./improve-codebase-architecture/SKILL.ko.md) — 코드베이스에서 심화 기회를 스캔해 HTML 리포트로 제시하고, 하나를 골라 grilling.
- [to-prd](./to-prd/SKILL.ko.md) — 현재 대화를 PRD 로 합성(인터뷰 없음). `product-spec-builder`(먼저 인터뷰)와 보완 관계.
- [to-issues](./to-issues/SKILL.ko.md) — 계획/PRD 를 독립적으로 잡을 수 있는 수직 슬라이스 이슈로 분해. `to-prd` 산출물을 소비.
- [grill-with-docs](./grill-with-docs/SKILL.ko.md) — 진행하며 용어집 + ADR 까지 유지하는 grilling 인터뷰 (`grill-me` + `domain-modeling`).
- [prototype](./prototype/SKILL.ko.md) — 설계 리스크를 줄이는 throwaway 프로토타입 (로직 터미널 앱, 또는 UI 변형).
- [design-system](./design-system/SKILL.ko.md) — 토큰 기반 UI 디자인 시스템을 설계·구현·리뷰. Meta의 Astryx를 기본 베이스로(어떤 스택에도 일반화), 기존 시스템이 있으면 그것을 존중.
- [anti-slop-frontend](./anti-slop-frontend/SKILL.ko.md) — AI가 만든 마케팅/랜딩/포트폴리오 프론트엔드가 템플릿처럼 보이지 않게: 브리프를 읽고, 세 다이얼을 조절하고, LLM 기본값을 피하고, 기계적 프리플라이트를 돈다 (Leonxlnx/taste-skill 각색). 취향 레이어; 앱 전반의 체계적 토큰 시스템은 `design-system`.

**Model-invoked** (맥락이 맞으면 에이전트가 자동 사용)

- [tdd](./tdd/SKILL.ko.md) — 레드-그린-리팩터, 수직 슬라이스 단위; 테스트를 리스크 자산으로.
- [lazy-code](./lazy-code/SKILL.ko.md) — 실제로 동작하는 가장 게으른 해법 강제: YAGNI 사다리, 의존성보다 표준 라이브러리/네이티브, 50줄보다 1줄; lite/full/ultra (DietrichGebert/ponytail 각색).
- [diagnosing-bugs](./diagnosing-bugs/SKILL.ko.md) — 체계적 진단 루프; 이론 전에 단단한 red 가능 피드백 루프부터.
- [codebase-design](./codebase-design/SKILL.ko.md) — 깊은 모듈 설계 공용 어휘 (인터페이스, 깊이, seam, 어댑터, 레버리지, 지역성).
- [domain-modeling](./domain-modeling/SKILL.ko.md) — 프로젝트 도메인 모델을 능동적으로 구축·정밀화 (용어집 + ADR).
