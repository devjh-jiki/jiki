# Porting the system to a stack

The token model is the same everywhere; only the *syntax* of the semantic layer changes per stack. This file shows how to land the same two-tier system (base → semantic) in the stacks you actually use. Read this during **Design** (pick the token form) and **Implement** (apply it).

The rule that never changes: **define values once, reference semantic tokens in components, theme by editing the semantic layer.** Everything below is just how that rule looks in each stack.

## Contents

- [Plain CSS / any framework](#plain-css--any-framework)
- [React (Vite/Next, CSS variables)](#react-vitenext-css-variables)
- [React + Tailwind](#react--tailwind)
- [React + StyleX (Astryx native)](#react--stylex-astryx-native)
- [Docusaurus (Infima)](#docusaurus-infima)

## Plain CSS / any framework

The most portable form. Base tokens and semantic roles as CSS custom properties; dark mode via a `[data-theme]` attribute.

```css
:root {
  /* base */
  --color-neutral-900: #1c1c1c;  --color-neutral-50: #fafafa;  --color-teal-600: #0d7d77;
  --space-4: 16px;  --radius-md: 8px;
  /* semantic — references base */
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

## React (Vite/Next, CSS variables)

Put the `:root` block above in a global stylesheet (`globals.css`, imported once). Components reference `var(--…)` directly or via a thin typed helper. This is the default for a React side project that isn't on Astryx native.

```tsx
// tokens.css imported in the app entry
export function Button({children}: {children: React.ReactNode}) {
  return <button className="btn">{children}</button>;
}
// .btn { background: var(--color-accent); color: var(--color-text-on-accent); ... }
```

For a typed surface, mirror the semantic tokens in a TS object that returns the `var()` strings, so components autocomplete roles instead of memorizing variable names.

## React + Tailwind

Map semantic roles into `tailwind.config.js` `theme.extend`, pointing at the CSS variables. Then components use semantic utility classes (`bg-surface`, `text-primary`) — never `bg-[#fff]`.

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

Dark mode: Tailwind's `dark:` variant or the `[data-theme]` block driving the CSS vars — pick one and stay consistent. The win is that `bg-surface` resolves through the variable, so a theme change never touches a component.

## React + StyleX (Astryx native)

If the project is React/StyleX, **use the real Astryx packages** instead of reimplementing tokens:

```bash
npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
npx astryx init   # sets up agent docs; read the generated files
```

```css
/* globals.css */
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

Then import components from per-category subpaths and override with `xstyle`:

```tsx
import {Button} from '@astryxdesign/core/Button';
import * as stylex from '@stylexjs/stylex';
const s = stylex.create({ save: { alignSelf: 'flex-end', marginTop: 16 } });
<Button label="Save" xstyle={s.save} />
```

Use `npx astryx component <Name>` and `npx astryx docs tokens` to discover real props and token values rather than guessing. On native Astryx the semantic-token discipline is already enforced — your job is to *not break it* (no inline hex, no hardcoded spacing, use components over raw HTML).

## Docusaurus (Infima)

A Docusaurus site is a single-page React app whose theme is driven by **Infima CSS variables**. Infima's `--ifm-*` variables *are* the semantic layer — map our roles onto them rather than inventing a parallel system. This is exactly the "respect the existing system" rule: Docusaurus already has one.

**Where things go:**
- Global tokens + overrides → `src/css/custom.css` (registered via `themeConfig.customCss` in `docusaurus.config.js`).
- Per-component styles → CSS Modules (`*.module.css`), referencing the same variables.

**Map our semantic roles → Infima variables** (override in `:root` of `custom.css`):

```css
/* src/css/custom.css */
:root {
  /* Infima primary = our accent. Infima uses 7 shades — generate them
     (docusaurus.io styling tool / ColorBox) so hover/active states are consistent. */
  --ifm-color-primary: #0d7d77;          /* our --color-accent */
  --ifm-color-primary-dark: #0b716c;
  --ifm-color-primary-darker: #0a6a65;
  --ifm-color-primary-darkest: #085853;
  --ifm-color-primary-light: #0f8983;
  --ifm-color-primary-lighter: #109089;
  --ifm-color-primary-lightest: #13a59d;

  --ifm-background-color: #fafafa;        /* our --color-surface */
  --ifm-font-color-base: #1c1c1c;         /* our --color-text-primary */
  --ifm-font-family-base: "Inter", system-ui, sans-serif;
  --ifm-heading-font-family: "Fraunces", Georgia, serif;
  --ifm-code-font-size: 95%;
  --ifm-spacing-horizontal: 16px;         /* align to our 4px scale */
  --ifm-global-radius: 8px;               /* our --radius-md */
}
```

**Dark mode** — Docusaurus sets `data-theme="dark"` on `<html>`. Override the same Infima vars there (use different shades; one color rarely works in both modes):

```css
[data-theme='dark'] {
  --ifm-color-primary: #4fd1c5;
  --ifm-background-color: #161616;
  --ifm-font-color-base: #f0f0f0;
}
```

**Key Docusaurus specifics:**
- **Target stable theme class names**, not Infima internals or hashed CSS-module names. Use names like `.theme-doc-markdown`, `.theme-admonition`, `.navbar`, `.menu` (the `ThemeClassNames` list). Avoid `[class*='codeBlockContainer']`-style hash hacks unless unavoidable.
- **Contrast: aim for WCAG-AA on the primary color** against both light and dark backgrounds — Docusaurus' own styling tool rates this; don't ship a primary that fails on the doc background.
- **Mobile breakpoint is `996px`** (not 768). If you add responsive rules, match it. Changing it means swizzling components that use `useWindowSize`.
- **Deeper changes = swizzling.** For DOM/structure changes beyond CSS, swizzle the component (`npm run swizzle`) rather than fighting selectors. Prefer CSS overrides first; swizzle only when structure must change.
- **MDX-heavy content:** most of a Docusaurus site is rendered markdown. The highest-leverage styling is the prose itself — heading rhythm, code-block contrast, admonition colors, link affordance, line length. Tune `--ifm-*` typography and the `.theme-doc-markdown` scope before chasing bespoke component styling.

The deliverable for a Docusaurus project is a `custom.css` (the token overrides + theme-class-name rules) plus, if needed, a few `*.module.css` files — not a fresh from-scratch system. The design-system.md spec still applies; it just resolves into Infima variable values.
