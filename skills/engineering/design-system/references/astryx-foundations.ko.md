# Astryx 기반 파운데이션

시스템을 설계할 때 쓰는 기본 토큰 구조·스케일·원칙. Meta의 Astryx ([astryx.atmeta.com](https://astryx.atmeta.com))에 근거하고, 어떤 스택에서도 통하도록 일반화했다. **설계** 단계에서 숫자를 새로 짓는 대신 검증된 스케일을 고르려고 읽는다. React/StyleX면 실제 패키지(`@astryxdesign/core` + 테마 + `@astryxdesign/cli`)를 우선, 다른 스택이면 이 스케일을 그 스택 관용구(CSS 커스텀 프로퍼티, Tailwind 테마, 토큰 파일)로 옮긴다.

## 목차

- [두 층 토큰 모델](#두-층-토큰-모델)
- [Spacing](#spacing)
- [Typography](#typography)
- [Color](#color)
- [Shape / radius](#shape--radius)
- [Elevation](#elevation)
- [Motion](#motion)
- [Astryx 핵심 규칙 (일반화)](#astryx-핵심-규칙-일반화)

## 두 층 토큰 모델

이게 척추다. 아래 모든 게 여기로 흘러든다.

- **베이스 토큰** — 용도 의견 없는 날것의 값: `color-blue-600`, `space-4`, `radius-md`, `font-size-lg`. 팔레트와 스케일.
- **시맨틱 토큰** — 베이스를 *참조하는* 역할: `color-text-primary`, `color-surface`, `color-border`, `space-section`, `radius-control`. **모양이 아니라 목적으로** 명명.

컴포넌트와 앱 코드는 **시맨틱 토큰만** 참조한다. 테마와 다크모드는 시맨틱 층을 바꾸고, 컴포넌트는 안 바뀐다. "앱 코드가 특정 색이나 치수를 절대 참조하지 않는다" — 이게 테마·다크모드가 자동으로 작동하는 이유다.

층을 스택이 원하는 대로 표현하라: CSS 커스텀 프로퍼티(`var(--color-surface)`), Tailwind 시맨틱 클래스(`bg-surface`, `text-primary`), 타입드 테마 객체. 중요한 건 문법이 아니라 *구조*다.

## Spacing

Astryx는 **4px 베이스 유닛**. 작은 쪽은 세밀하게, 큰 쪽은 일관된 리듬.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `space-0` | 0 | 리셋 |
| `space-0.5` | 2px | 헤어라인 내부 |
| `space-1` | 4px | 타이트 내부 |
| `space-1.5` | 6px | 타이트 내부 |
| `space-2` | 8px | 내부 패딩 |
| `space-3` | 12px | 내부 패딩 |
| `space-4` | 16px | 기본 gap / 카드 패딩 |
| `space-5` | 20px | |
| `space-6` | 24px | 여유 패딩 |
| `space-8` | 32px | 블록 분리 |
| `space-10` | 40px | |
| `space-12` | 48px | 섹션 간격 |

명명된 스케일 너머는 레이아웃용으로 4px 배수(64, 96)로 섹션 여백을 잇는다. **규칙: 값이 스케일에 없으면 디자인을 재고하라 — `padding: 13px`로 손 뻗지 말고.** 작은 단계(0.5–2)는 타이트 내부, 큰 단계(4+)는 gap·섹션.

타협 불가 최소치: **터치 타겟 ≥44×44px**(Astryx는 정확히 이걸 위한 `space-11`=44px 보유), **폼 필드 간격 ≥16px**, **섹션 여백 모바일 ≥48px / 데스크톱 ≥64px**.

## Typography

명명된 역할 램프를 정의한다. 각각 size / weight / line-height + 폴백 스택. 작동하는 기본 램프(Astryx 타이포 토큰을 옮기거나, 이걸 형태로):

| 역할 | 크기 | 굵기 | 행간 |
|------|------|------|------|
| Display | 48–60px | 700 | 1.1 |
| H1 | 32–40px | 700 | 1.15 |
| H2 | 24–28px | 600 | 1.2 |
| H3 | 20px | 600 | 1.3 |
| Body-lg | 18px | 400 | 1.5 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Caption | 12px | 500 | 1.4 |

규칙: **본문 ≥16px**(모바일 인풋도 ≥16px라야 iOS 자동 확대 방지). 최소 세 가지 구분되는 스케일로 계층이 한눈에 읽히게. 폴백 스택을 항상 선언해 웹폰트 로드 전에도 렌더되게.

## Color

팔레트를 베이스 토큰으로 짓고 역할을 매핑한다. 모든 시스템에 필요한 최소 시맨틱 역할:

- **Text**: `color-text-primary`, `color-text-secondary`, `color-text-disabled`, `color-text-link`, `color-text-on-accent`
- **Surface**: `color-surface`(페이지), `color-surface-raised`(카드/패널), `color-surface-sunken`
- **Border**: `color-border`, `color-border-strong`
- **Accent**: `color-accent`(브랜드 메인 하나), `color-accent-hover`, + 상태색 `color-success` / `color-warning` / `color-danger`

규율: **악센트 하나**를 아껴 쓰는 게 경쟁하는 브랜드색 셋을 이긴다. 따뜻하거나 차가운 중립 surface + 자신 있는 악센트 하나가 무지개보다 디자인돼 보인다. 라이트·다크를 시맨틱 층 교체로 정의하라 — 컴포넌트를 포크하지 말고.

**대비는 타협 불가(WCAG AA):** 본문 4.5:1, 큰 텍스트(≥24px 또는 ≥19px 볼드) 3:1, UI/그래픽 3:1. 출시 전 모든 텍스트-surface 쌍 확인.

## Shape / radius

컨트롤 유형으로 명명한 작은 radius 스케일로 일관성 유지:

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius-none` | 0 | |
| `radius-sm` | 4px | 인풋, 작은 칩 |
| `radius-md` | 8px | 버튼, 카드 |
| `radius-lg` | 16px | 모달, 큰 surface |
| `radius-full` | 9999px | 알약, 아바타 |

컨트롤 유형당 radius 하나를 골라 재사용. 형제 요소에 섞인 radius는 우발적으로 읽힌다.

## Elevation

임의의 box-shadow가 아니라, 짧고 순서 있는 그림자 스케일. 각 레벨이 surface가 얼마나 "떠 있는지" 신호:

- `elevation-0` — 평평, 페이지 위
- `elevation-1` — 미묘한 부상(카드)
- `elevation-2` — 떠오름(드롭다운, 팝오버)
- `elevation-3` — 오버레이(모달, 다이얼로그)

Elevation은 레이어링을 알리는 데 쓰지 장식이 아니다. ~4레벨 넘으면 계층이 의미를 잃는다.

## Motion

duration·easing 토큰을 정의하고 재사용. 자연스러운 기본값:

- **Duration**: `motion-fast` 100–150ms(호버, 토글), `motion-base` 200–250ms(대부분 전환), `motion-slow` 300–400ms(큰 surface 진입).
- **Easing**: 진입은 표준 ease-out, 이동은 ease-in-out. UI에 linear 피하기.
- **`prefers-reduced-motion` 존중** — 비필수 애니메이션은 이 뒤에 둔다.

모션은 상태 변화를 명확히 하지 공연하지 않는다. 사용자가 무슨 일이 일어났는지 이해를 돕지 않는 애니메이션은 잘라라.

## Astryx 핵심 규칙 (일반화)

Astryx가 기본 탑재하는 원칙을 스택 비종속으로 재진술:

1. **프리미티브보다 컴포넌트.** raw HTML/div로 내려가기 전에 그게 커버하는 모든 걸 실제 컴포넌트로. 버튼 컴포넌트가 스타일된 `<div onClick>`을 이긴다.
2. **하드코딩 값 대신 시맨틱 토큰.** `#fff`도, 인라인 `16px`도 안 됨. `var(--color-*)` / `bg-surface` / 테마 값 참조.
3. **테마 비종속 코드.** 앱 코드는 특정 색·치수가 아니라 역할을 참조한다 — 그래서 컴포넌트를 안 건드리고도 테마·다크모드가 작동.
4. **열린 내부 / 컴포저블.** 프리미티브와 싸우지 말고 그 위에 짓는다. 변형은 포크가 아니라 확장.
5. **제어 폼 인풋**(value + onChange)으로 상태를 예측 가능하게.

리뷰에서 잡을 안티패턴: raw 요소 인라인 스타일, 하드코딩 색/spacing, 라우터 인식 링크 대신 하드코딩 `<a>`, 컴포넌트 문서 안 읽고 prop 지어내기.
