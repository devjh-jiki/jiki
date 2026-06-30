# Markdown quality reference

Templates, linking patterns, and a readability checklist for producing high-quality Markdown. Read this during **design** (pick a template, plan links) and **refine** (run the checklist).

## Contents

- [Document-type templates](#document-type-templates)
- [Linking patterns](#linking-patterns)
- [Readability checklist](#readability-checklist)
- [Markdown mechanics checklist](#markdown-mechanics-checklist)

## Document-type templates

Match the shape to the reader's job. These are starting points, not cages — drop sections that don't apply.

### README (project front door)

The reader is deciding "is this for me, and how do I start." Get them running fast.

```markdown
# Project name
One sentence: what it is and who it's for.

## Why / what it does
2–4 sentences or a short bullet list of the value.

## Quick start
Copy-pasteable steps to a working result. Numbered, minimal.

## Usage
The 2–3 most common things people do, with examples.

## Configuration / options
Only if needed. Table of options, defaults, what each does.

## Links
Docs, contributing, license — point outward to deeper material.
```

### How-to guide (task-oriented)

The reader has a specific goal. Take them from start to done in order.

```markdown
# How to <accomplish the task>
What you'll have at the end (one sentence) + prerequisites.

## Steps
1. Action. Expected result.
2. Action. Expected result.
...

## Verify it worked
How the reader confirms success.

## Troubleshooting
Common failure → cause → fix.
```

### Reference (lookup-oriented)

The reader knows what they want and needs the exact detail. Optimize for scanning and completeness, not narrative.

```markdown
# <Thing> reference
One-line scope.

## <Item> (e.g. function / endpoint / flag)
- **Signature / syntax**
- **Parameters** — table: name, type, required, description
- **Returns / response**
- **Example** — copy-pasteable
- **Notes / errors**
```

### Decision record (ADR)

Captures a hard-to-reverse decision and its trade-off, so future readers know *why*.

```markdown
# ADR-NNN: <decision title>
**Status:** proposed | accepted | superseded
**Date:** YYYY-MM-DD

## Context
The forces at play — what made this decision necessary.

## Decision
What we chose, stated plainly.

## Consequences
What this makes easy, what it makes hard, what we're giving up.

## Alternatives considered
The other options and why they lost.
```

### Research brief (findings from investigation)

Turns research + verification into a trustworthy, sourced writeup.

```markdown
# <Topic> — research brief
**As of:** YYYY-MM-DD · **Confidence:** high/medium/mixed

## Summary
The 3–5 findings that matter, each one line. Front-load the answer.

## Findings
### <Claim 1>
The claim, the evidence, the source (inline link). Note confidence and date if it can go stale.

## Open questions / gaps
What you couldn't confirm, and what it would take to confirm it.

## Sources
Backup list — primary sources first, with publisher and date.
```

## Linking patterns

A good doc set is a navigable web, not a pile of files.

- **Link at the point of need.** When you mention a concept covered elsewhere, link it inline right there — don't make the reader hunt.
- **Link both ways for related docs.** If A links to B because B is the deeper dive, B should link back to A as context. One-way links create dead ends.
- **Use relative links within a repo** (`./guide.md`, `../adr/0003.md`) so they survive cloning and don't break on a fork. Reserve absolute URLs for genuinely external sources.
- **Give every doc a "next" or "related" pointer.** The reader who finishes one doc should know where to go. A short "See also" or "Next steps" section at the bottom does this.
- **Anchor-link long docs.** A table of contents at the top with `#heading` anchors lets readers jump. GitHub auto-generates anchors from headings (lowercase, spaces → hyphens).
- **Don't over-link.** Linking the same target five times in one section is noise; link it on first mention.

## Readability checklist

Run this as the target reader during **refine**.

- [ ] The top of the doc orients a stranger in ~10 seconds: what is this, is it for me, where do I start.
- [ ] Each section leads with its conclusion, then supports it.
- [ ] One idea per paragraph. Sentences are short enough to parse on first read.
- [ ] Structure matches content: lists for parallel items, tables for comparisons, prose for reasoning. Nothing forced into the wrong shape.
- [ ] Every claim that leans on a source has the source linked inline.
- [ ] Concrete examples / commands / tables carry the weight, not abstract description.
- [ ] No filler: throat-clearing intros, "in this section we will," redundant restatements — cut.
- [ ] Headings are parallel in grammar and scannable as an outline on their own.
- [ ] Jargon is defined on first use, or linked to where it's defined.

## Markdown mechanics checklist

The things that silently break rendering or trust.

- [ ] Code fences have language tags (```` ```python ````, ```` ```bash ````) for highlighting.
- [ ] Every code block is copy-pasteable and actually correct — test commands where feasible.
- [ ] Tables use GFM pipe syntax and render (header row + separator row present).
- [ ] Internal links resolve (relative paths correct); external links are live, not 404.
- [ ] Heading levels are consistent and don't skip (no `#` jumping to `###`).
- [ ] Images have alt text; paths resolve.
- [ ] No platform-specific syntax unless that platform is the target (Obsidian `[[wikilinks]]`, Docusaurus `:::note` admonitions, etc.).
- [ ] Long docs (past ~2 screens) have a table of contents.
- [ ] Line-level: no trailing whitespace artifacts, consistent list markers, blank line around code blocks and tables so they render.
