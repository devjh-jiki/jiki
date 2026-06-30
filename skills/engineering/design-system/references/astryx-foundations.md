# Astryx-based foundations

The default token structure, scales, and principles for designing a system, grounded in Meta's Astryx ([astryx.atmeta.com](https://astryx.atmeta.com)) and generalized so they apply on any stack. Read this during **Design** to pick real scales instead of inventing numbers. On React/StyleX projects, prefer the real packages (`@astryxdesign/core` + a theme + `@astryxdesign/cli`); on other stacks, port these scales into the project's idiom (CSS custom properties, a Tailwind theme, a tokens file).

## Contents

- [The two-tier token model](#the-two-tier-token-model)
- [Spacing](#spacing)
- [Typography](#typography)
- [Color](#color)
- [Shape / radius](#shape--radius)
- [Elevation](#elevation)
- [Motion](#motion)
- [Astryx's core rules (generalized)](#astryxs-core-rules-generalized)

## The two-tier token model

This is the backbone. Everything below feeds it.

- **Base tokens** — raw values with no opinion about use: `color-blue-600`, `space-4`, `radius-md`, `font-size-lg`. This is the palette and the scales.
- **Semantic tokens** — roles that *reference* base tokens: `color-text-primary`, `color-surface`, `color-border`, `space-section`, `radius-control`. Named by **purpose, not appearance**.

Components and app code reference **semantic tokens only**. Theming and dark mode change the semantic layer; components never change. This is why "your app code never references a specific color or measurement" — that's what makes themes and dark mode work automatically.

Express the layer however the stack wants: CSS custom properties (`var(--color-surface)`), a Tailwind semantic class (`bg-surface`, `text-primary`), or a typed theme object. The *structure* is what matters, not the syntax.

## Spacing

Astryx uses a **4px base unit**. Fine control at the small end, consistent rhythm at larger sizes.

| Token | Value | Use |
|-------|-------|-----|
| `space-0` | 0 | reset |
| `space-0.5` | 2px | hairline internal |
| `space-1` | 4px | tight internal |
| `space-1.5` | 6px | tight internal |
| `space-2` | 8px | internal padding |
| `space-3` | 12px | internal padding |
| `space-4` | 16px | default gap / card padding |
| `space-5` | 20px | |
| `space-6` | 24px | comfortable padding |
| `space-8` | 32px | block separation |
| `space-10` | 40px | |
| `space-12` | 48px | section spacing |

Beyond the named scale, keep going in 4px multiples for layout (64, 96) for section breathing room. **Rule: if a value isn't on the scale, reconsider the design — don't reach for `padding: 13px`.** Use small steps (0.5–2) for tight internal spacing, large steps (4+) for gaps and sections.

Practical minimums that aren't negotiable: **touch targets ≥44×44px** (Astryx has a `space-11` = 44px for exactly this), **form fields ≥16px apart**, **section breathing ≥48px mobile / 64px desktop**.

## Typography

Define a ramp of named roles, each with size / weight / line-height, plus a fallback stack. A workable default ramp (port Astryx's typography tokens, or use this as the shape):

| Role | Size | Weight | Line height |
|------|------|--------|-------------|
| Display | 48–60px | 700 | 1.1 |
| H1 | 32–40px | 700 | 1.15 |
| H2 | 24–28px | 600 | 1.2 |
| H3 | 20px | 600 | 1.3 |
| Body-lg | 18px | 400 | 1.5 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Caption | 12px | 500 | 1.4 |

Rules: **body text ≥16px** (and ≥16px on mobile inputs to stop iOS auto-zoom). Use at least three distinct scales so hierarchy is legible at a glance. Always declare a fallback stack so the page renders before web fonts load.

## Color

Build the palette as base tokens, then map roles. Minimum semantic roles every system needs:

- **Text**: `color-text-primary`, `color-text-secondary`, `color-text-disabled`, `color-text-link`, `color-text-on-accent`
- **Surface**: `color-surface` (page), `color-surface-raised` (card/panel), `color-surface-sunken`
- **Border**: `color-border`, `color-border-strong`
- **Accent**: `color-accent` (one primary brand color), `color-accent-hover`, plus state colors `color-success` / `color-warning` / `color-danger`

Discipline: **one accent**, used sparingly, beats three competing brand colors. A warm or cool neutral surface + a single confident accent reads as more designed than a rainbow. Define both light and dark by swapping the semantic layer — don't fork components.

**Contrast is non-negotiable (WCAG AA):** body text 4.5:1, large text (≥24px or ≥19px bold) 3:1, UI components/graphics 3:1. Check every text-on-surface pair before shipping.

## Shape / radius

A small radius scale, named by control type so it stays consistent:

| Token | Value | Use |
|-------|-------|-----|
| `radius-none` | 0 | |
| `radius-sm` | 4px | inputs, small chips |
| `radius-md` | 8px | buttons, cards |
| `radius-lg` | 16px | modals, large surfaces |
| `radius-full` | 9999px | pills, avatars |

Pick one radius per control type and reuse it. Mixed radii on sibling elements read as accidental.

## Elevation

A short, ordered shadow scale — not arbitrary box-shadows. Each level signals how "raised" a surface is:

- `elevation-0` — flat, on the page
- `elevation-1` — subtle lift (cards)
- `elevation-2` — raised (dropdowns, popovers)
- `elevation-3` — overlay (modals, dialogs)

Use elevation to communicate layering, not decoration. More than ~4 levels and the hierarchy stops meaning anything.

## Motion

Define duration and easing tokens, then reuse them. Defaults that feel right:

- **Durations**: `motion-fast` 100–150ms (hovers, toggles), `motion-base` 200–250ms (most transitions), `motion-slow` 300–400ms (large surfaces entering).
- **Easing**: a standard ease-out for entrances, ease-in-out for movement. Avoid linear for UI.
- **Respect `prefers-reduced-motion`** — gate non-essential animation behind it.

Motion should clarify a state change, not perform. If an animation doesn't help the user understand what happened, cut it.

## Astryx's core rules (generalized)

The principles Astryx ships with, restated stack-agnostically:

1. **Components over primitives.** Use a real component for everything it covers before dropping to raw HTML/divs. A button component beats a styled `<div onClick>`.
2. **Semantic tokens, never hardcoded values.** No `#fff`, no `16px` inline. Reference `var(--color-*)` / `bg-surface` / a theme value.
3. **Theme-agnostic code.** App code references roles, not specific colors or measurements — so themes and dark mode work without touching components.
4. **Open internals / composable.** Build on primitives rather than fighting them; variants extend, not fork.
5. **Controlled form inputs** (value + onChange) so state is predictable.

Anti-patterns to flag in review: inline styles on raw elements, hardcoded colors/spacing, hardcoded `<a>` tags instead of a router-aware link, and inventing props instead of reading component docs.
