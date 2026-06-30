# Anti-slop & design review

Two things: the concrete patterns that make UI look AI-generated (with what to do instead), and a scored rubric for reviewing UI. Read this before **Implement** (so you don't ship the tells) and during **Review** (to score against a bar, not vibes).

## Contents

- [The anti-slop banned list](#the-anti-slop-banned-list)
- [Behavioral heuristics](#behavioral-heuristics)
- [The review rubric](#the-review-rubric)
- [Common mistakes → fix](#common-mistakes--fix)

## The anti-slop banned list

These are the default outputs of an AI building UI. Each one is a tell; each has a better move. Avoiding them is most of what separates a real product from a template.

| Tell (avoid) | Do instead |
|--------------|------------|
| Purple→blue gradient as the default brand look | One confident accent color on a neutral surface; gradients only if the brand earns them |
| Emoji used as icons (🚀 ✨ 🔥 on buttons/features) | A real icon set (consistent weight/grid); if none, a clean text label |
| Neon-on-near-black (`#0D1117` + saturated accent) as "modern dark" | A considered dark theme via the semantic layer; muted surfaces, accessible accent |
| Symmetric three-column feature grid with icon-title-text | Vary the layout to the content; asymmetry and real hierarchy read as designed |
| AI-generated SVG illustrations / stock-y hero blobs | A clean placeholder (gray box, real photo, or nothing) until a real asset exists |
| Generic display fonts (Inter/Roboto everywhere, no intent) | A deliberate type pairing; at minimum a distinct display vs body choice |
| Five slightly different button styles | One primary, one secondary, one ghost — variants are deliberate |
| Everything centered, equal weight, no focal point | A clear primary action and a single visual focal point per screen |
| Drop shadows on everything | Elevation used to signal layering, sparingly |
| Rainbow of brand colors competing | One accent, used sparingly; neutrals carry the rest |

## Behavioral heuristics

How to work, not just what to avoid:

- **Start from context, never a blank canvas.** Find the existing system/brand/nearby component first and match it. If genuinely none exists, write a short brand/token spec *before* styling — don't improvise pixel by pixel.
- **Offer 2–3 distinct directions, not one final.** Early on, show a few real options (e.g. "editorial / warm-minimal / functional") so the user steers, rather than presenting one finished thing to accept or reject.
- **Gray boxes beat bad assets.** A neutral placeholder communicates layout honestly; a bad AI image communicates "unfinished and tacky."
- **One signature detail at 120% effort per screen.** Generic everywhere is slop. Pick one element — a considered empty state, a nice hover, a real illustration, distinctive spacing — and make it genuinely good. That single deliberate detail is what reads as craft.
- **System first, don't fill.** Whitespace is a feature, not a gap to cram content into. Restraint reads as confidence.
- **On polish passes, refine — don't add.** Ask "how do I make what's here better," not "what can I add." Removing a competing element often beats adding a new one.

## The review rubric

Score each dimension 0–10. **A dimension below 7 is a fail — name the specific problem and the fix, don't wave it through to finish.** Report the scores, not just a verdict.

### 1. Tokens & consistency (0–10)
- Every color, space, and radius traces to a token? No `#hex` or `13px` magic numbers?
- One of each component role (primary/secondary/ghost button; one card base)?
- Sibling elements use the same radius, spacing rhythm, type roles?
- *Fail signals:* hardcoded values, six shades of gray, inconsistent corner radii.

### 2. Accessibility (0–10)
- Contrast meets WCAG AA: **4.5:1** body, **3:1** large text and UI/graphics?
- Touch targets **≥44×44px**? Inputs **≥16px** text on mobile?
- Focus states visible? Interactive elements reachable by keyboard? Images have alt text?
- *Fail signals:* light-gray-on-white body text, tiny tap targets, invisible focus.

### 3. Visual hierarchy (0–10)
- Is there one clear primary action per screen?
- Do size / weight / color / spacing / position create an obvious read order?
- Can you find the most important thing in two seconds?
- *Fail signals:* everything the same weight, two competing CTAs, no focal point.

### 4. Spacing & rhythm (0–10)
- Spacing follows the scale (4px-based), consistent across siblings?
- Real breathing room (sections ≥48px mobile / 64px desktop)? Not cramped, not adrift?
- Aligned to a grid; related things grouped, unrelated things separated?
- *Fail signals:* arbitrary margins, content jammed edge-to-edge, uneven gaps.

### 5. Anti-slop / craft (0–10)
- None of the banned-list tells present?
- At least one deliberate, on-brand detail at high effort?
- Does it look like a specific product, not a generic template?
- *Fail signals:* the purple gradient, emoji icons, symmetric feature grid, generic everything.

**Verdict:** pass only when every dimension is ≥7 and there are no accessibility failures (a11y failures are blocking regardless of other scores).

## Common mistakes → fix

| Mistake | Fix |
|---------|-----|
| Hardcoded `#333` / `padding: 13px` | Reference a semantic token; add one to the scale if a real role is missing |
| Body text in light gray (#aaa on white) | Bump to a token that meets 4.5:1 |
| Two primary buttons on one screen | Demote one to secondary; one primary action per view |
| 40 one-off spacing values | Collapse to the 4px scale; delete the outliers |
| Emoji feature icons | Swap to a consistent icon set or plain labels |
| Centered everything, no focus | Establish hierarchy; give the primary action visual weight |
| New component when one exists | Reuse/extend the existing component instead |
