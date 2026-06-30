# 스택에 시스템 이식하기

토큰 모델은 어디서나 같다; 스택마다 바뀌는 건 시맨틱 층의 *문법*뿐이다. 이 파일은 같은 2층 시스템(베이스 → 시맨틱)을 실제로 쓰는 스택들에 안착시키는 법을 보여준다. **설계**(토큰 형태 고르기)와 **구현**(적용) 때 읽는다.

절대 안 바뀌는 규칙: **값은 한 번 정의하고, 컴포넌트는 시맨틱 토큰을 참조하고, 테마는 시맨틱 층 편집으로 바꾼다.** 아래는 전부 그 규칙이 각 스택에서 어떻게 보이는지일 뿐이다.

## 목차

- [순수 CSS / 모든 프레임워크](#순수-css--모든-프레임워크)
- [React (Vite/Next, CSS 변수)](#react-vitenext-css-변수)
- [React + Tailwind](#react--tailwind)
- [React + StyleX (Astryx 네이티브)](#react--stylex-astryx-네이티브)
- [Docusaurus (Infima)](#docusaurus-infima)

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

## Docusaurus (Infima)

Docusaurus 사이트는 테마가 **Infima CSS 변수**로 구동되는 SPA React 앱이다. Infima의 `--ifm-*` 변수가 *곧* 시맨틱 층이다 — 평행 시스템을 새로 짓지 말고 우리 역할을 거기에 매핑하라. 이게 정확히 "기존 시스템 존중" 규칙이다: Docusaurus엔 이미 시스템이 있다.

**어디에 두나:**
- 전역 토큰 + 오버라이드 → `src/css/custom.css` (`docusaurus.config.js`의 `themeConfig.customCss`에 등록).
- 컴포넌트별 스타일 → CSS 모듈(`*.module.css`), 같은 변수 참조.

**우리 시맨틱 역할 → Infima 변수 매핑** (`custom.css`의 `:root`에서 오버라이드):

```css
/* src/css/custom.css */
:root {
  /* Infima primary = 우리 accent. Infima는 7단계 셰이드를 쓴다 —
     hover/active 상태가 일관되도록 생성하라(docusaurus.io 스타일링 도구 / ColorBox). */
  --ifm-color-primary: #0d7d77;          /* 우리 --color-accent */
  --ifm-color-primary-dark: #0b716c;
  --ifm-color-primary-darker: #0a6a65;
  --ifm-color-primary-darkest: #085853;
  --ifm-color-primary-light: #0f8983;
  --ifm-color-primary-lighter: #109089;
  --ifm-color-primary-lightest: #13a59d;

  --ifm-background-color: #fafafa;        /* 우리 --color-surface */
  --ifm-font-color-base: #1c1c1c;         /* 우리 --color-text-primary */
  --ifm-font-family-base: "Inter", system-ui, sans-serif;
  --ifm-heading-font-family: "Fraunces", Georgia, serif;
  --ifm-code-font-size: 95%;
  --ifm-spacing-horizontal: 16px;         /* 우리 4px 스케일에 맞춤 */
  --ifm-global-radius: 8px;               /* 우리 --radius-md */
}
```

**다크모드** — Docusaurus는 `<html>`에 `data-theme="dark"`를 단다. 거기서 같은 Infima 변수를 오버라이드(다른 셰이드 사용; 한 색이 두 모드에서 다 통하는 경우는 드물다):

```css
[data-theme='dark'] {
  --ifm-color-primary: #4fd1c5;
  --ifm-background-color: #161616;
  --ifm-font-color-base: #f0f0f0;
}
```

**Docusaurus 핵심 특수성:**
- **안정적인 theme class name을 타겟**하라, Infima 내부나 해시 붙은 CSS-모듈 이름 말고. `.theme-doc-markdown`, `.theme-admonition`, `.navbar`, `.menu` 같은 이름(`ThemeClassNames` 목록). 불가피하지 않으면 `[class*='codeBlockContainer']` 식 해시 핵 피하기.
- **대비: primary 색은 WCAG-AA 목표** — 라이트·다크 배경 양쪽에서. Docusaurus 자체 스타일링 도구가 등급을 매긴다; 문서 배경에서 떨어지는 primary를 출시하지 마라.
- **모바일 브레이크포인트는 `996px`**(768 아님). 반응형 규칙 추가 시 맞춰라. 바꾸려면 `useWindowSize` 쓰는 컴포넌트 swizzle 필요.
- **더 깊은 변경 = swizzling.** CSS 너머 DOM/구조 변경은 셀렉터와 싸우지 말고 컴포넌트를 swizzle(`npm run swizzle`). CSS 오버라이드를 먼저, swizzle은 구조를 꼭 바꿔야 할 때만.
- **MDX 중심 콘텐츠:** Docusaurus 사이트의 대부분은 렌더된 마크다운이다. 가장 임팩트 큰 스타일링은 산문 자체 — 제목 리듬, 코드블록 대비, admonition 색, 링크 어포던스, 줄 길이. 맞춤 컴포넌트 스타일링을 쫓기 전에 `--ifm-*` 타이포와 `.theme-doc-markdown` 스코프를 튜닝하라.

Docusaurus 프로젝트의 산출물은 `custom.css`(토큰 오버라이드 + theme-class-name 규칙) + 필요시 `*.module.css` 몇 개이지, 처음부터 짠 새 시스템이 아니다. design-system.md 스펙은 여전히 적용되며, Infima 변수 값으로 풀릴 뿐이다.
