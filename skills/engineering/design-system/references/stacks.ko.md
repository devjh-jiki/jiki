# 스택에 시스템 이식하기

토큰 모델은 어디서나 같다; 스택마다 바뀌는 건 시맨틱 층의 *문법*뿐이다. 이 파일은 같은 2층 시스템(베이스 → 시맨틱)을 실제로 쓰는 스택들에 안착시키는 법을 보여준다. **설계**(토큰 형태 고르기)와 **구현**(적용) 때 읽는다.

절대 안 바뀌는 규칙: **값은 한 번 정의하고, 컴포넌트는 시맨틱 토큰을 참조하고, 테마는 시맨틱 층 편집으로 바꾼다.** 아래는 전부 그 규칙이 각 스택에서 어떻게 보이는지일 뿐이다.

## 목차

- [순수 CSS / 모든 프레임워크](#순수-css--모든-프레임워크)
- [React (Vite/Next, CSS 변수)](#react-vitenext-css-변수)
- [React + Tailwind](#react--tailwind)
- [React + StyleX (Astryx 네이티브)](#react--stylex-astryx-네이티브)
- [정적 docs 사이트 (프레임워크 없이)](#정적-docs-사이트-프레임워크-없이)

## 순수 CSS / 모든 프레임워크

가장 이식적인 형태. 베이스 토큰과 시맨틱 역할을 CSS 커스텀 프로퍼티로, 다크모드는 `[data-theme]` 속성으로.

```css
:root {
  /* base */
  --color-neutral-900: #1c1c1c;  --color-neutral-50: #fafafa;  --color-teal-600: #0d7d77;
  --space-4: 16px;  --radius-md: 8px;
  /* semantic — base 참조 */
  --color-text-primary: var(--color-neutral-900);
  --color-surface: var(--color-neutral-50);
  --color-accent: var(--color-teal-600);
}
[data-theme="dark"] {
  --color-text-primary: #f0f0f0;
  --color-surface: #161616;
}
.button { background: var(--color-accent); padding: var(--space-4); border-radius: var(--radius-md); }
```

## React (Vite/Next, CSS 변수)

위 `:root` 블록을 전역 스타일시트(`globals.css`, 한 번 import)에 둔다. 컴포넌트는 `var(--…)`를 직접, 또는 얇은 타입드 헬퍼로 참조. Astryx 네이티브가 아닌 React 사이드 프로젝트의 기본.

```tsx
// tokens.css 를 앱 엔트리에서 import
export function Button({children}: {children: React.ReactNode}) {
  return <button className="btn">{children}</button>;
}
// .btn { background: var(--color-accent); color: var(--color-text-on-accent); ... }
```

타입 안전을 원하면 시맨틱 토큰을 `var()` 문자열을 반환하는 TS 객체로 미러링해, 컴포넌트가 변수명을 외우는 대신 역할을 자동완성하게.

## React + Tailwind

시맨틱 역할을 `tailwind.config.js`의 `theme.extend`에 매핑해 CSS 변수를 가리키게. 그러면 컴포넌트는 시맨틱 유틸 클래스(`bg-surface`, `text-primary`)를 쓴다 — `bg-[#fff]`가 아니라.

```js
// tailwind.config.js
theme: { extend: {
  colors: {
    surface: "var(--color-surface)",
    "text-primary": "var(--color-text-primary)",
    accent: "var(--color-accent)",
  },
  borderRadius: { control: "var(--radius-md)" },
}}
```

다크모드: Tailwind `dark:` 변형 또는 CSS 변수를 구동하는 `[data-theme]` 블록 — 하나 골라 일관되게. 핵심 이득은 `bg-surface`가 변수를 통해 풀려서, 테마 변경이 컴포넌트를 절대 안 건드린다는 것.

## React + StyleX (Astryx 네이티브)

프로젝트가 React/StyleX면 토큰을 재구현하지 말고 **실제 Astryx 패키지를 써라**:

```bash
npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
npx astryx init   # agent docs 세팅; 생성된 파일을 읽어라
```

```css
/* globals.css */
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

컴포넌트는 카테고리별 서브패스에서 import하고 `xstyle`로 오버라이드:

```tsx
import {Button} from '@astryxdesign/core/Button';
import * as stylex from '@stylexjs/stylex';
const s = stylex.create({ save: { alignSelf: 'flex-end', marginTop: 16 } });
<Button label="Save" xstyle={s.save} />
```

`npx astryx component <Name>`과 `npx astryx docs tokens`로 추측 대신 실제 props·토큰 값을 조회하라. 네이티브 Astryx에선 시맨틱 토큰 규율이 이미 강제돼 있다 — 네 일은 그걸 *깨지 않는 것*(인라인 hex 금지, 하드코딩 spacing 금지, raw HTML보다 컴포넌트).

## 정적 docs 사이트 (프레임워크 없이)

목표가 **문서 사이트** — 사이드바 내비, 콘텐츠 컬럼, 페이지 내 목차(TOC), 라이트/다크 — 라면 Docusaurus 같은 프레임워크가 필요 없다. 스킬은 `assets/docs-template/`에 의존성 없는 자립형 docs 템플릿을 번들한다. design-system 토큰을 검증된 docs 레이아웃에 이미 연결해 둔 것(구조는 Docusaurus/Stripe 스타일 docs를 참조했으나, 빌드 없이 브라우저에서 열리는 순수 HTML/CSS).

**docs 골격을 처음부터 짓지 말고 템플릿을 써라.** "반복 산출은 자산으로 번들" 원칙이다: docs 셸은 매번 같으니, 프로젝트마다 재설계할 게 아니라 고정 자산이다.

적용법(전체 안내는 `references/docs-template-guide.md`):

1. `assets/docs-template/`를 프로젝트에 복사.
2. `tokens.css`를 열어 시맨틱 토큰을 프로젝트 시스템에 맞게 설정 — 네가 설계한 *같은* `--color-surface`, `--color-accent`, 타입 램프, spacing. 테마하는 파일은 이것 하나뿐이고, 레이아웃은 여기서 읽는다.
3. 페이지 템플릿에 콘텐츠 투입(사이드바 링크 + 마크다운식 콘텐츠 컬럼). docs 사이트 대부분이 산문이므로, 템플릿의 산문 스타일(제목 리듬, 코드블록, 콜아웃, 링크 어포던스, 줄 길이)은 이미 튜닝돼 있다.
4. 다중 페이지면 페이지 셸을 문서별로 복제하고 사이드바/TOC를 일관되게 유지.

산출물은 Docusaurus 설정이 아니라 테마 적용된 템플릿 사본이다. `design-system.md` 스펙이 여전히 구동하며 — 템플릿의 `tokens.css`가 그 토큰이 안착하는 자리일 뿐이다.

> 여기서 docs 프레임워크를 안 쓰는 건 의도적이다: 정적 토큰 구동 템플릿이 올바르게 테마하기 쉽고(`tokens.css` 하나), 빌드/의존성 표면이 0이며, 이식성이 높다. 프로젝트가 *이미* Docusaurus 등 docs 프레임워크를 쓰고 있다면 "기존 시스템 존중" 규칙으로 — 교체 말고 그 프레임워크 테마 변수에 design-system 역할을 매핑하라.
