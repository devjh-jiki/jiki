# Porting the system to a stack

The token model is the same everywhere; only the *syntax* of the semantic layer changes per stack. This file shows how to land the same two-tier system (base → semantic) in the stacks you actually use. Read this during **Design** (pick the token form) and **Implement** (apply it).

The rule that never changes: **define values once, reference semantic tokens in components, theme by editing the semantic layer.** Everything below is just how that rule looks in each stack.

## Contents

- [Plain CSS / any framework](#plain-css--any-framework)
- [React (Vite/Next, CSS variables)](#react-vitenext-css-variables)
- [React + Tailwind](#react--tailwind)
- [React + StyleX (Astryx native)](#react--stylex-astryx-native)
- [Static docs site (no framework)](#static-docs-site-no-framework)

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

## Static docs site (no framework)

When the goal is a **documentation site** — sidebar navigation, a content column, an on-page table of contents, light/dark — you don't need a framework like Docusaurus. The skill bundles a self-contained, dependency-free docs template at `assets/docs-template/` that already wires the design-system tokens into a proven docs layout (structure modeled on Docusaurus/Stripe-style docs, but plain HTML/CSS that opens in a browser with no build).

**Use the template instead of building docs chrome from scratch.** It's the "bundle the repeated artifact" principle: a docs shell is the same every time, so it's a fixed asset, not something to redesign per project.

How to apply it (see `references/docs-template-guide.md` for the full walkthrough):

1. Copy `assets/docs-template/` into the project.
2. Open `tokens.css` and set the semantic tokens to the project's system — the *same* `--color-surface`, `--color-accent`, type ramp, spacing you designed. This is the only file you theme; the layout reads from it.
3. Drop content into the page template (sidebar links + the markdown-style content column). The template's prose styles (heading rhythm, code blocks, callouts, link affordance, line length) are already tuned, since most of a docs site is prose.
4. For a multi-page site, duplicate the page shell per doc and keep the sidebar/TOC consistent.

The deliverable is a themed copy of the template, not a Docusaurus config. The `design-system.md` spec still drives it — the template's `tokens.css` is just where those tokens land.

> Not using a docs framework here is deliberate: a static, token-driven template is easier to theme correctly (one `tokens.css`), has zero build/dependency surface, and stays portable. If a project *already* runs Docusaurus or another docs framework, fall back to the "respect the existing system" rule — map the design-system roles onto that framework's theme variables rather than replacing it.
