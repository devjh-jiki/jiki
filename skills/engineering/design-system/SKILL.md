---
name: design-system
description: Design, implement, and review a project's UI design system — using Meta's Astryx (astryx.atmeta.com) as the default foundation for tokens, scales, and principles, generalized so it applies to any stack. Use when the user wants to set up a design system for a side project, define design tokens (color, spacing, type, elevation, motion, shape), build or restyle UI components and pages, establish a visual language, or review existing UI for design quality, accessibility, and consistency. Triggers on "디자인 시스템 잡아줘", "UI 디자인해줘", "이 화면 디자인 좀 다듬어줘", "토큰 정의해줘", "컴포넌트 스타일 통일해줘", "design system for my app", "make this UI look good", "review my UI." Respects a project's existing design system when one is already defined — extend that instead of imposing Astryx.
disable-model-invocation: true
---

# design-system

Bring a project's UI up to a high, consistent bar — by designing a token-based design system, implementing it in components and pages, and reviewing existing UI against it. The default foundation is Meta's **Astryx** ([astryx.atmeta.com](https://astryx.atmeta.com)): a token-driven, theme-able, agent-ready system. We use Astryx's *structure and defaults* as a starting point and generalize them so they hold on any stack — not only React/StyleX.

This skill spans **design → implement → review**, but you rarely run all three. Diagnose where the project is and start there.

## First: respect what already exists

Before anything, check whether the project already has a design system. **If it does, that system wins — extend it, don't replace it with Astryx.**

Signals a system already exists: a `tokens.*`/`theme.*` file, a Tailwind/Chakra/MUI theme config, a `design-system.md` or Storybook, CSS custom properties for color/spacing, an established component library. When you find one:

- Read it first. Adopt its token names, scale, and component conventions.
- Fill gaps using this skill's principles, but in *that system's* vocabulary.
- Only propose Astryx-based defaults for genuinely undefined areas, and say so explicitly.

Astryx is the **default for greenfield or undefined** design surfaces — not an override for projects that already made these decisions.

## Locate the entry point

- **"Set up a design system / define tokens"** (no system yet) → start at **Design**.
- **"Build / restyle this component or page"** → if tokens exist, start at **Implement**; if not, do a quick **Design** pass for the tokens you need, then implement.
- **"Review / improve this UI"** → start at **Review**, score against the rubric, then implement the fixes that matter.

When the stack is React/Next, mention that Astryx ships as real packages (`@astryxdesign/core`, a theme, `@astryxdesign/cli`) and `npx astryx init` sets up agent docs — using the real thing beats reimplementing it. On other stacks, port Astryx's *token structure and scales* (below) into that stack's idiom. For how the same two-tier system lands in each stack you use — plain CSS, React (CSS variables), Tailwind, StyleX/Astryx native, and a **static docs site** (a bundled self-contained docs template you theme via one `tokens.css`, no framework) — read `references/stacks.md`.

## The pipeline

### 1. Design — establish the system

A design system is **tokens + the rules for using them**, not a pile of components. Build it in two tiers so theming stays cheap.

- **Base tokens** — raw values: `color-blue-600`, `space-4`, `radius-md`. The palette and scales.
- **Semantic tokens** — roles that *reference* base tokens: `color-text-primary`, `color-surface`, `color-border`, `space-section`. Components consume **semantic** tokens only; theming changes the semantic layer, never the components.

Cover these foundations (Astryx's set): **color, typography, spacing, elevation, shape/radius, motion, icons**. For the concrete default scales, palettes, and the type ramp, read `references/astryx-foundations.md` — don't invent numbers when a proven scale exists.

Resist token explosion: a scale of 8 spacing steps beats 40 one-off margins. If you can't name a token's *role*, you don't need it yet.

Output a `design-system.md` spec (see `references/design-system-spec-template.md`) plus a machine-readable token file. Keep both in sync.

### 2. Implement — apply the system in UI

Turn tokens into components and pages that feel intentional.

- **Reference semantic tokens, never raw values.** A component that hardcodes `#1a1a1a` or `padding: 13px` has left the system. Every spacing, color, and radius should trace to a token.
- **One of each role.** One primary button, one secondary, one ghost — not five subtly different ones. Same for cards, inputs, headings. Variants are deliberate, not accidental.
- **Build on the existing context first.** Find the nearest existing component and match it before inventing a new pattern. Consistency reads as quality.
- **Placeholder over bad asset.** A clean gray box beats an AI-generated SVG or a stock-y gradient. Don't fill space with noise.

Match the stack: real Astryx components on React/StyleX; the equivalent token-referencing components in the project's framework otherwise. For the concrete way to express tokens per stack (React/Tailwind/StyleX) read `references/stacks.md`. **When the deliverable is a documentation site** (sidebar nav + prose + on-page TOC), don't stand up a framework — use the bundled self-contained template at `assets/docs-template/` and theme its `tokens.css` from the design system; see `references/docs-template-guide.md`. Read `references/anti-slop-and-review.md` before styling — it lists the patterns that make UI look AI-generated and what to do instead.

### 3. Review — score against the bar

Whether you built it or inherited it, review UI against an explicit rubric rather than vibes.

Score these dimensions, each with a concrete bar (full rubric + numbers in `references/anti-slop-and-review.md`):

- **Tokens & consistency** — values trace to tokens; no one-off magic numbers.
- **Accessibility** — WCAG AA contrast (4.5:1 body, 3:1 large/UI), touch targets ≥44×44, ≥16px input text on mobile.
- **Visual hierarchy** — size/weight/color/spacing/position establish a clear read order; one primary action.
- **Spacing & rhythm** — consistent scale, real breathing room, aligned to a grid.
- **Anti-slop** — none of the generic-AI tells; at least one deliberate, branded detail.

Don't pass UI that scores low on a dimension just to finish. Report the score, the specific failures, and the fix — then implement the fixes that earn their place.

## Output conventions

- **Tokens are the contract.** Every design decision lands as a token or references one. A "design" that's just prose adjectives ("modern, clean") isn't done — it resolves to named tokens and scales.
- **Two-tier always.** Base → semantic. Components touch semantic only.
- **Two outputs for a system.** `design-system.md` (human) + a token file (machine: CSS custom properties, a theme config, or DTCG JSON). Keep synced.
- **Name colors by role, not by look.** `color-text-link`, not "sky blue." A role survives a theme change; a look doesn't.
- **State your confidence and open questions.** When you infer a token from a screenshot or a vague brief, mark it (high/medium/low) and list what you'd need to confirm. Inventing a precise-looking token is worse than flagging the gap.

## Why this matters

UI quality is mostly consistency and restraint, not cleverness. The reason teams reinvent buttons and ship six shades of gray is that the system was never written down — so every screen re-decides from scratch and drifts. A token-based system written once lets every later screen inherit the decisions instead of re-litigating them, which is exactly why Astryx exists inside Meta. Designing the system is the cheap part; the value compounds every time a new screen reaches for `color-surface` instead of guessing. And the anti-slop discipline matters because the default output of an AI building UI is generic — the gradient, the emoji icon, the symmetric three-column grid — and a single deliberate, on-brand detail is what separates a real product from a template.
