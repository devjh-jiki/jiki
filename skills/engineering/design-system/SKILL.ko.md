---
name: design-system
description: Design, implement, and review a project's UI design system — using Meta's Astryx (astryx.atmeta.com) as the default foundation for tokens, scales, and principles, generalized so it applies to any stack. Use when the user wants to set up a design system for a side project, define design tokens (color, spacing, type, elevation, motion, shape), build or restyle UI components and pages, establish a visual language, or review existing UI for design quality, accessibility, and consistency. Triggers on "디자인 시스템 잡아줘", "UI 디자인해줘", "이 화면 디자인 좀 다듬어줘", "토큰 정의해줘", "컴포넌트 스타일 통일해줘", "design system for my app", "make this UI look good", "review my UI." Respects a project's existing design system when one is already defined — extend that instead of imposing Astryx.
disable-model-invocation: true
---

# design-system

프로젝트 UI를 높고 일관된 수준으로 끌어올린다 — 토큰 기반 디자인 시스템을 설계하고, 컴포넌트·페이지에 구현하고, 기존 UI를 그 기준으로 리뷰해서. 기본 베이스는 Meta의 **Astryx** ([astryx.atmeta.com](https://astryx.atmeta.com)): 토큰 주도, 테마 가능, agent-ready 시스템. Astryx의 *구조와 기본값*을 출발점으로 삼되 React/StyleX뿐 아니라 어떤 스택에서도 통하도록 일반화한다.

이 스킬은 **설계 → 구현 → 리뷰**를 다루지만, 셋을 다 돌리는 경우는 드물다. 프로젝트가 어디 있는지 진단하고 거기서 시작하라.

## 먼저: 이미 있는 것을 존중한다

무엇보다, 프로젝트에 이미 디자인 시스템이 있는지 확인하라. **있다면 그 시스템이 우선이다 — Astryx로 갈아치우지 말고 확장하라.**

시스템이 이미 있다는 신호: `tokens.*`/`theme.*` 파일, Tailwind/Chakra/MUI 테마 설정, `design-system.md`나 Storybook, color/spacing용 CSS 커스텀 프로퍼티, 자리잡은 컴포넌트 라이브러리. 발견하면:

- 먼저 읽는다. 그 토큰 이름·스케일·컴포넌트 컨벤션을 채택한다.
- 빈틈은 이 스킬의 원칙으로 메우되, *그 시스템의* 어휘로.
- 진짜로 미정의된 영역에만 Astryx 기반 기본값을 제안하고, 그렇다고 명시한다.

Astryx는 **그린필드나 미정의 영역의 기본값**이지, 이미 결정한 프로젝트를 덮어쓰는 게 아니다.

## 진입 지점을 찾는다

- **"디자인 시스템 잡아줘 / 토큰 정의해줘"** (시스템 없음) → **설계**부터.
- **"이 컴포넌트·페이지 만들어/다시 스타일"** → 토큰 있으면 **구현**부터, 없으면 필요한 토큰만 빠르게 **설계**한 뒤 구현.
- **"이 UI 리뷰/개선"** → **리뷰**부터, 루브릭으로 점수 매기고, 중요한 것부터 구현.

스택이 React/Next면 Astryx가 실제 패키지(`@astryxdesign/core`, 테마, `@astryxdesign/cli`)로 제공되고 `npx astryx init`이 agent docs를 세팅한다는 걸 언급하라 — 재구현보다 실물을 쓰는 게 낫다. 다른 스택이면 Astryx의 *토큰 구조와 스케일*(아래)을 그 스택 관용구로 옮긴다. 같은 2층 시스템이 각 스택에 어떻게 안착하는지 — 순수 CSS, React(CSS 변수), Tailwind, StyleX/Astryx 네이티브, 그리고 **정적 docs 사이트**(`tokens.css` 하나로 테마하는 번들된 자립형 docs 템플릿, 프레임워크 없이) — 는 `references/stacks.md` 를 읽어라.

## 파이프라인

### 1. 설계 — 시스템을 세운다

디자인 시스템은 **토큰 + 그것을 쓰는 규칙**이지, 컴포넌트 더미가 아니다. 테마가 싸게 유지되도록 두 층으로 짓는다.

- **베이스 토큰** — 날것의 값: `color-blue-600`, `space-4`, `radius-md`. 팔레트와 스케일.
- **시맨틱 토큰** — 베이스를 *참조하는* 역할: `color-text-primary`, `color-surface`, `color-border`, `space-section`. 컴포넌트는 **시맨틱 토큰만** 소비한다. 테마는 시맨틱 층을 바꾸지, 컴포넌트를 절대 안 바꾼다.

이 파운데이션을 다룬다(Astryx의 세트): **color, typography, spacing, elevation, shape/radius, motion, icons**. 구체적 기본 스케일·팔레트·타입 램프는 `references/astryx-foundations.md` 를 읽어라 — 검증된 스케일이 있는데 숫자를 새로 지어내지 마라.

토큰 폭발을 경계하라: spacing 8단계 스케일이 일회성 margin 40개를 이긴다. 토큰의 *역할*을 명명 못 하면, 아직 필요 없는 것이다.

`design-system.md` 스펙(`references/design-system-spec-template.md` 참고) + 머신리더블 토큰 파일을 산출한다. 둘은 동기화.

### 2. 구현 — UI에 시스템을 적용한다

토큰을 의도가 느껴지는 컴포넌트·페이지로 바꾼다.

- **시맨틱 토큰을 참조하고, 날것의 값은 절대 안 쓴다.** `#1a1a1a`나 `padding: 13px`를 하드코딩한 컴포넌트는 시스템을 떠난 것. 모든 spacing·color·radius가 토큰으로 추적돼야 한다.
- **역할마다 하나씩.** primary 버튼 하나, secondary 하나, ghost 하나 — 미묘하게 다른 다섯 개가 아니라. 카드·인풋·제목도 마찬가지. 변형은 의도적이지 우발적이지 않다.
- **기존 맥락 위에 먼저 짓는다.** 새 패턴을 짓기 전에 가장 가까운 기존 컴포넌트를 찾아 맞춘다. 일관성이 곧 품질로 읽힌다.
- **나쁜 에셋보다 플레이스홀더.** 깔끔한 회색 박스가 AI 생성 SVG나 스톡 느낌 그래디언트보다 낫다. 빈 공간을 소음으로 채우지 마라.

스택에 맞춘다: React/StyleX면 실제 Astryx 컴포넌트, 그 외엔 프로젝트 프레임워크의 토큰 참조 컴포넌트. 스택별로 토큰을 표현하는 구체적 방법(React/Tailwind/StyleX)은 `references/stacks.md` 를 읽어라. **산출물이 문서 사이트**(사이드바 내비 + 산문 + 페이지 내 TOC)면 프레임워크를 세우지 말고 — 번들된 자립형 템플릿 `assets/docs-template/`를 쓰고 그 `tokens.css`를 디자인 시스템으로 테마하라; `references/docs-template-guide.md` 참고. 스타일링 전에 `references/anti-slop-and-review.md` 를 읽어라 — UI를 AI 생성처럼 보이게 하는 패턴과 대안 목록이다.

### 3. 리뷰 — 기준으로 점수 매긴다

내가 짰든 물려받았든, 감이 아니라 명시적 루브릭으로 UI를 리뷰한다.

각 차원을 구체적 기준으로 채점한다(전체 루브릭·수치는 `references/anti-slop-and-review.md`):

- **토큰 & 일관성** — 값이 토큰으로 추적되나; 일회성 매직넘버 없나.
- **접근성** — WCAG AA 대비(본문 4.5:1, 큰 텍스트/UI 3:1), 터치 타겟 ≥44×44, 모바일 인풋 텍스트 ≥16px.
- **시각적 계층** — size/weight/color/spacing/position이 명확한 읽기 순서를 만드나; primary 액션 하나.
- **spacing & 리듬** — 일관된 스케일, 진짜 여백, 그리드 정렬.
- **anti-slop** — 일반적 AI 티가 없나; 의도적이고 브랜드다운 디테일이 최소 하나.

한 차원이 낮은데 끝내려고 통과시키지 마라. 점수, 구체적 실패, 수정안을 보고하고 — 제 몫 하는 수정부터 구현한다.

## 산출 규칙

- **토큰이 계약이다.** 모든 디자인 결정이 토큰으로 떨어지거나 토큰을 참조한다. 형용사 산문("모던, 깔끔")뿐인 "디자인"은 미완성 — 명명된 토큰과 스케일로 풀려야 한다.
- **항상 두 층.** 베이스 → 시맨틱. 컴포넌트는 시맨틱만 건드린다.
- **시스템엔 산출물 둘.** `design-system.md`(사람) + 토큰 파일(머신: CSS 커스텀 프로퍼티, 테마 설정, DTCG JSON). 동기화 유지.
- **색은 모양이 아니라 역할로 명명.** "sky blue"가 아니라 `color-text-link`. 역할은 테마 변경에서 살아남고, 모양은 못 한다.
- **신뢰도와 열린 질문을 밝힌다.** 스크린샷이나 모호한 브리프에서 토큰을 추론하면 표시(high/medium/low)하고 확인에 필요한 걸 적어라. 정밀해 보이는 토큰을 지어내는 게 공백을 표시하는 것보다 나쁘다.

## 왜 중요한가

UI 품질은 영리함이 아니라 대부분 일관성과 절제다. 팀이 버튼을 다시 만들고 회색 여섯 종을 출시하는 이유는 시스템이 적혀 있지 않아서다 — 그래서 모든 화면이 처음부터 다시 결정하고 표류한다. 한 번 적은 토큰 기반 시스템은 이후 모든 화면이 결정을 재논쟁하는 대신 물려받게 하고, 이게 Astryx가 Meta 안에 존재하는 이유다. 시스템 설계는 싼 부분이고, 가치는 새 화면이 추측 대신 `color-surface`를 집을 때마다 복리로 쌓인다. anti-slop 규율이 중요한 이유는 — AI가 UI를 만들 때의 기본 출력은 일반적이기 때문이다(그래디언트, 이모지 아이콘, 대칭 3열 그리드). 의도적이고 브랜드다운 디테일 하나가 진짜 제품과 템플릿을 가른다.
