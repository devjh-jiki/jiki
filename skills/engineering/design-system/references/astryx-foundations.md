# Astryx-based foundations

The default token structure, scales, and principles for designing a system, grounded in Meta's Astryx ([astryx.atmeta.com](https://astryx.atmeta.com)) and generalized so they apply on any stack. Read this during **Design** to pick real scales instead of inventing numbers. On React/StyleX projects, prefer the real packages (`@astryxdesign/core` + a theme + `@astryxdesign/cli`); on other stacks, port these scales into the project's idiom (CSS custom properties, a Tailwind theme, a tokens file).

## Contents

- [The two-tier token model](#the-two-tier-token-model)
- [Spacing](#spacing)
- [Typography](#typography)
- [Color](#color)
- [Palette for technical docs](#palette-for-technical-docs)
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

## Palette for technical docs

A documentation site is a specific design problem: long-form prose plus a lot of code, read for hours, often by developers. The 2026 norm — what GitHub, Stripe, Linear, Vercel, and TanStack converge on — is a **cool-neutral base + one restrained accent + a separate code-syntax palette.** Use this as the default for any docs/reference surface (it's what the bundled `assets/docs-template/tokens.css` ships with).

### Base: cool-neutral, not warm
Pick a gray ramp with a faint *cool* (slightly blue) tint rather than a warm beige/cream one. Cool neutrals read as precise and technical, give code blocks cleaner contrast, and don't tint toward "lifestyle blog." Warm neutrals are great for editorial/marketing, but for docs the cool base is the safer default.

- Light surface: near-white with a faint cool tint (e.g. `#fbfcfd`), wells `#f1f3f5`, borders `#e3e6ea`, primary text `#1a1d21` (~16:1), secondary `#5c636e` (~5.9:1).
- Dark surface: a cool near-black (GitHub-style `#0e1116`), raised `#161b22`, text `#e6e9ee`, secondary `#9aa4b2`. Avoid warm charcoals.

### Accent: one hue, quarantined
The lesson from TanStack (which uses a dozen+ accent hues without chaos): **a single shared neutral carries ~95% of every surface, and each accent is restricted to one role/object.** For a single docs site that means *one* accent used only on links, active nav, focus rings, and the TOC indicator — never as large fills or backgrounds.

Good 2026 docs accents (all clear WCAG AA on the cool surface): **indigo `#4f5bd5`** (default — reads "developer tool," strong contrast headroom), **teal `#0e7c74`** (calmer, more neutral), **emerald/green** (fresh, but watch contrast), **blue `#3b6fd4`** (classic but generic). Lighten one step in dark mode (e.g. indigo → `#8b93f8`) to hold contrast against the dark surface. Avoid the AI-slop default purple→blue gradient.

### Code: a separate syntax palette
Keep code-block colors **independent from the marketing accent.** Don't tint syntax toward your brand hue — readability and developer familiarity beat brand consistency here. The safe, recognized default is the **GitHub/Primer** scheme (what TanStack uses):

- Light (`#fff`/`#24292f`): keyword `#cf222e`, string `#0a7f64`, function `#8250df`, number/attr `#0550ae`, type/inline `#953800`, comment `#6e7781`.
- Dark (`#0e1116`/`#d4d4d4`): keyword `#ff7b72`, string `#a5d6ff`, function `#d2a8ff`, number `#79c0ff`, type/inline `#ffa657`, comment `#a3a3a3`.

Store these as their own `--code-*` tokens (the template does), so a brand-color change never touches code legibility.

### Why this combination
Restraint by structure is what makes it work: one disciplined neutral foundation means the accent never has to fight the surface, long reading sessions stay comfortable, and code — the thing developers actually scan — gets a palette tuned for scanning rather than for branding. A docs site that picks a warm base, tints its code blocks to match the brand, and sprinkles the accent everywhere looks busy and tiring; the cool-neutral + one-accent + separate-code formula looks like a tool you'd trust.

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
