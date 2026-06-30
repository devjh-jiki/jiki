# design-system.md spec template

The output contract for a **Design** pass. A design system isn't "modern and clean" prose — it's named tokens plus the rules for using them. Produce a `design-system.md` like this *and* a machine-readable token file (CSS custom properties, a Tailwind theme, or DTCG JSON), kept in sync.

Drop sections that don't apply; never pad with generic UX advice. When a value is inferred (from a screenshot, a vague brief), mark confidence and list it under Open Questions rather than presenting a guess as fact.

```markdown
# <Project> design system
**Base:** Astryx (generalized) · **Stack:** <React/StyleX | Tailwind | other> · **As of:** YYYY-MM-DD

## Foundation
One paragraph: the visual intent in plain terms (e.g. "warm-neutral, editorial,
one coral accent") and the single signature detail this product leans on.

## Base tokens
Raw values. Tables per scale.

### Color (base)
| Token | Value |
|-------|-------|
| color-neutral-50 | #... |
| color-accent-500 | #... |
...

### Spacing (base) — 4px scale
space-0…space-12 (+ layout multiples). Note the base unit.

### Typography (base)
Font families + the size/weight/line-height ramp (Display…Caption) + fallback stack.

### Radius / Elevation / Motion (base)
radius-sm…full · elevation-0…3 · motion-fast/base/slow + easing.

## Semantic tokens
Roles that reference base tokens. This is what components consume.

| Semantic role | → Base token | Use |
|---------------|--------------|-----|
| color-text-primary | color-neutral-900 | body text |
| color-surface | color-neutral-50 | page background |
| color-surface-raised | white | cards, panels |
| color-border | color-neutral-200 | dividers |
| color-accent | color-accent-500 | primary actions |
| space-section | space-12 (+) | between sections |
| radius-control | radius-md | buttons, inputs |
...
(Provide light AND dark by swapping this layer.)

## Components
The roles and their variants — one of each, deliberate.

- **Button**: primary / secondary / ghost — token references, sizes, states (hover/active/disabled/focus).
- **Card**: base + variants.
- **Input / form field**: states, ≥16px text, ≥44px target.
- **Heading / text**: which type role maps to which use.
...

## Accessibility commitments
- Contrast: 4.5:1 body, 3:1 large/UI — confirmed pairs listed.
- Touch targets ≥44×44; inputs ≥16px on mobile; visible focus.

## Do's and Don'ts
At least 3 each, specific to THIS system (not generic).
- Do: use `color-accent` only for the primary action.
- Don't: introduce a second brand color for emphasis — use weight/size.
...

## Open questions
What's inferred or undecided, with confidence (high/medium/low) and what would confirm it.
- [medium] Accent hex inferred from screenshot; confirm against brand source.
- [low] Dark-mode surface ramp not yet validated for contrast.
```

## The companion token file

Emit the same decisions as machine-readable tokens so code can consume them. Pick the form that matches the stack:

- **CSS custom properties** (`:root { --color-surface: #...; }` + a `[data-theme="dark"]` block) — most portable.
- **Tailwind theme** (`theme.extend.colors`, `spacing`, `borderRadius`) referencing the same values.
- **DTCG JSON** (`{ "color": { "surface": { "$value": "#...", "$type": "color" } } }`) — tool-agnostic, good for hand-off.

The rule that makes it a system: **components reference the semantic layer only**, and the token file is the single place a value is defined. Change a theme by editing semantic tokens — never by touching components.
