---
name: improve-codebase-architecture
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one the user picks. Use when the user says "아키텍처 개선", "리팩터링", "구조 개선", "refactor architecture", "improve architecture", or wants to find where shallow modules should become deep ones. Adapted from mattpocock/skills.
disable-model-invocation: true
---

# Improve Codebase Architecture

Surface architectural friction and propose **deepening opportunities** — refactors that turn shallow modules into deep ones. The aim is testability and AI-navigability.

This skill is built on a shared design vocabulary:

- Run the `codebase-design` skill for the architecture vocabulary (**module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**) and its principles (the deletion test, "the interface is the test surface", "one adapter = hypothetical seam, two = real"). Use these terms exactly in every suggestion — don't drift into "component," "service," "API," or "boundary."
- If the project has a context doc (e.g. `CONTEXT.md`) or architecture decision records, read them first: the project's domain language gives names to good seams, and recorded decisions are ones this skill should not re-litigate.

## Process

### 1. Explore

If a project context doc (e.g. `CONTEXT.md`) and any recorded architecture decisions exist for the area you're touching, read them first.

Then use the Agent tool with `subagent_type=Explore` to walk the codebase. Don't follow rigid heuristics — explore organically and note where you experience friction:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where have pure functions been extracted just for testability, but the real bugs hide in how they're called (no **locality**)?
- Where do tightly-coupled modules leak across their seams?
- Which parts of the codebase are untested, or hard to test through their current interface?

Apply the **deletion test** to anything you suspect is shallow: would deleting it concentrate complexity, or just move it? A "yes, concentrates" is the signal you want. Note the common third case: the module's *own* contents are trivial (so deleting it looks harmless) but the real complexity it should own — an order-of-operations, an orchestration recipe — currently lives scattered across its callers. The fix there isn't "delete," it's **absorb**: pull the scattered orchestration *into* a deepened module so it has one home. Duplicated orchestration that has already drifted (two callers doing it slightly differently, one with a bug) is the textbook signal.

### 2. Present candidates as an HTML report

Write a self-contained HTML file to the OS temp directory so nothing lands in the repo. Resolve the temp dir from `$TMPDIR`, falling back to `/tmp` (or `%TEMP%` on Windows), and write to `<tmpdir>/architecture-review-<timestamp>.html` so each run gets a fresh file. Open it for the user — `xdg-open <path>` on Linux, `open <path>` on macOS, `start <path>` on Windows — and tell them the absolute path.

Scale report fidelity to the codebase. A sprawling system warrants the full visual treatment below; a handful of small files needs only a lean version of it (a card or two, a simple before/after) — don't spend more on the report than the finding is worth.

The report uses **Tailwind via CDN** for layout and styling, and **Mermaid via CDN** for diagrams where a graph/flow/sequence reliably communicates the structure. Mix Mermaid with hand-crafted CSS/SVG visuals — use Mermaid when relationships are graph-shaped (call graphs, dependencies, sequences), and hand-built divs/SVG when you want something more editorial (mass diagrams, cross-sections, collapse animations). Each candidate gets a **before/after visualisation**. Be visual.

For each candidate, render a card with:

- **Files** — which files/modules are involved
- **Problem** — why the current architecture is causing friction
- **Solution** — plain English description of what would change
- **Benefits** — explained in terms of locality and leverage, and how tests would improve
- **Before / After diagram** — side-by-side, custom-drawn, illustrating the shallowness and the deepening
- **Recommendation strength** — one of `Strong`, `Worth exploring`, `Speculative`, rendered as a badge

End the report with a **Top recommendation** section: which candidate you'd tackle first and why.

**Use the project's own domain language for the domain, and the `codebase-design` vocabulary for the architecture.** If the project context doc defines "Order," talk about "the Order intake module" — not "the FooBarHandler," and not "the Order service."

**Recorded-decision conflicts**: if a candidate contradicts a recorded architecture decision, only surface it when the friction is real enough to warrant revisiting that decision. Mark it clearly in the card (e.g. a warning callout: _"contradicts the existing decision on X — but worth reopening because…"_). Don't list every theoretical refactor a past decision forbids.

(The HTML scaffold above is deliberately described inline so there are no separate reference files to maintain — a single self-contained file with CDN Tailwind + Mermaid and one card per candidate is the whole spec.)

Do NOT propose interfaces yet. After the file is written, ask the user: "Which of these would you like to explore?" (A short placeholder *name* for a candidate — "the priced-order module" — is fine for reference; what's deferred to the grilling step is the actual interface: the methods, signatures, and what sits behind the seam.)

### 3. Grilling loop

Once the user picks a candidate, run the `grill-me` skill to walk the design tree with them — constraints, dependencies, the shape of the deepened module, what sits behind the seam, what tests survive.

Side effects happen inline as decisions crystallize. If the project keeps a context doc (e.g. `CONTEXT.md`) or decision log, keep it current as you go:

- **Naming a deepened module after a concept not yet in the project context doc?** Add the term to it. Create the doc lazily if it doesn't exist and the project wants one.
- **Sharpening a fuzzy term during the conversation?** Update the context doc right there.
- **User rejects the candidate with a load-bearing reason?** Offer to record it, framed as: _"Want me to write this down so future architecture reviews don't re-suggest it?"_ Only offer when the reason would actually be needed by a future explorer to avoid re-suggesting the same thing — skip ephemeral reasons ("not worth it right now") and self-evident ones.
- **Want to explore alternative interfaces for the deepened module?** Run the `codebase-design` skill and use its design-it-twice parallel sub-agent pattern.

## Owner / leadership lens

For a developer who is also CEO/CTO/CFO/PM, an architecture review is a portfolio review:

- **Rank by ROI, not by itch.** The HTML report's recommendation strength is a budgeting tool — `Strong` is where engineering time compounds; `Speculative` is a bet. Fund the refactors that unblock revenue or cut recurring maintenance, defer the rest.
- **Tie deepening to business risk.** A shallow module at a vendor seam, a billing path, or an auth boundary is concentrated risk. Prioritize seams where being wrong costs money, trust, or a rewrite.
- **Architecture debt is a balance sheet item.** Make it visible: this report is something you can show a co-founder or board to justify a "pay down debt" sprint, the same way you'd justify any capital expenditure.

## Attribution

Adapted from [mattpocock/skills `improve-codebase-architecture`](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture) (MIT). See THIRD_PARTY_NOTICES.md.
