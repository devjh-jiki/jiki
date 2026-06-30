# Docs template guide

How to use the bundled `assets/docs-template/` — a self-contained, dependency-free documentation site driven entirely by design-system tokens. Read this when the user wants a docs site (sidebar nav + prose + on-page TOC) without standing up a framework like Docusaurus.

## What's in the template

```
assets/docs-template/
├── index.html    # the docs shell: top bar, left sidebar, prose content, right TOC,
│                 # dark-mode toggle, scroll-spy. All styling reads from tokens.css.
└── tokens.css    # THE file you theme. Base -> semantic tokens (light + dark).
```

It opens directly in a browser — no build, no npm, no framework. Fonts (Inter/Fraunces/JetBrains Mono) are the only external dependency; swap or self-host them freely.

Structure is modeled on the proven docs layout that Docusaurus, Stripe, and similar sites converge on — three columns (navigation / readable content / on-page TOC), a sticky top bar, and a clear prose hierarchy — but it's plain HTML/CSS you own.

## How to apply it

1. **Copy** `docs-template/` into the project (e.g. `cp -r docs-template my-project/docs`).
2. **Theme `tokens.css`** — and *only* `tokens.css`. Set the semantic tokens to the project's design system: the same `--color-surface`, `--color-accent`, type ramp, and spacing from your `design-system.md`. Light mode is `:root`; dark mode overrides the same roles under `[data-theme="dark"]`. The layout reads everything from here, so re-theming is one file.
3. **Fill in content** in `index.html`: sidebar links (grouped by section), the prose column (headings with `id`s so the TOC and scroll-spy work), and the on-page TOC entries mirroring the headings.
4. **Multi-page:** duplicate the page shell per doc; keep the sidebar and top bar identical across pages so navigation is stable. Mark the current page's sidebar link `class="active"`.

## What's already handled (don't rebuild these)

- **Three-column responsive shell** — collapses the TOC under 1100px and the sidebar under 768px.
- **Dark mode** — toggle in the top bar, persists to `localStorage`, respects `prefers-color-scheme`. Flips `data-theme` on `<html>`; tokens do the rest.
- **Scroll-spy** — the heading in view is highlighted in both the right TOC and the left sidebar (IntersectionObserver).
- **Prose styles** — heading rhythm, readable line length (`--content-max`, ~75ch), code blocks with horizontal scroll, inline code, blockquotes, tables, and token-built callouts (`.callout`, `.callout.warn`) that need no framework.
- **Accessibility** — semantic landmarks (`nav`/`main`/`header`), `aria-label`s, focusable controls, accent colors chosen for WCAG-AA on both surfaces.

## Tuning notes

- **Readability first.** Most of a docs site is prose. Don't widen `--content-max` past ~75 characters per line. Tune the heading ramp and code-block contrast before anything bespoke.
- **One accent.** Links, active nav, and the TOC indicator all use `--color-accent`. Change it in `tokens.css` and the whole site follows.
- **Keep the structure.** The value of the template is that the docs chrome is consistent and solved. Reskin via tokens; only touch the layout when the *structure* genuinely needs to change.
- **The `design-system.md` spec still drives it.** The template's `tokens.css` is just where those tokens land. If the project has a real design system already, theme `tokens.css` from it rather than inventing new values.
