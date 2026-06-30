---
name: document-with-research
description: Produce high-quality Markdown documentation — researching open data on the web, verifying claims, designing structure, writing, and refining existing material for readability, flow, and cross-document linking. Use whenever the user wants to document a side project, write or improve a README/guide/reference, organize scattered notes into a coherent doc, research a topic into a structured writeup, fact-check and add citations, or generally "make this doc clearer / better organized." Trigger even without the word "documentation" — e.g. "정리해줘", "이거 문서로 만들어줘", "리드미 좀 다듬어줘", "이 주제 조사해서 정리해줘", "자료 찾아서 표로 만들어줘", "turn my notes into docs", "research X and summarize." For reference/explanatory docs whose goal is clarity and accuracy. NOT for a personal blog/retrospective (use write-blog-post), marketing copy meant to convert (use marketing-copy), or compacting this conversation into a handoff (use handoff).
---

# document-with-research

Turn a topic, a pile of notes, or an existing rough document into clear, trustworthy, well-linked Markdown. This skill spans the whole pipeline — **research → verify → design → write → refine** — but you rarely need all five. Diagnose where the user actually is and start there.

## First: locate the entry point

Don't run the full pipeline by reflex. Read the request and the material on hand, then pick the lightest path that gets the user what they want.

- **"Research X and document it"** → start at **research**, run the whole pipeline.
- **"Document my side project / write a README / guide"** → the facts already live in the code and the user's head. Skip web research unless a claim needs an external source; start at **design**.
- **"Clean up / improve / restructure this doc"** → start at **refine**. Don't rewrite from scratch; respect what's there and fix what's weak.
- **"Fact-check this / add sources"** → run **verify** against the existing text, then a light **refine** pass to weave citations in.

When unsure which path, ask one sharp question rather than guessing — but if the request is clear, just proceed. The pipeline below is the full version; collapse it to fit.

**Write in the reader's language.** Match the language of the request and the existing material — if the user writes to you in Korean or hands you a Korean repo, the document is Korean; an English request gets English. Don't silently switch languages because a template happens to be in English. The reader is who the doc is for, not the template.

## The pipeline

### 1. Research

When the document depends on facts you don't already have, gather them before writing.

- **Search with intent.** Each search should answer a specific question you've written down, not "learn about X." Keep a short running list of open questions and close them one by one.
- **Prefer primary and authoritative sources.** Official docs, standards bodies, government/open-data portals, the project's own source code, peer-reviewed work — over blog posts and aggregators. When you cite a secondary source, try to trace it to its primary.
- **Capture the source as you go**, not later: URL, who published it, when, and the specific claim it supports. You'll need this for the citations and for verify.
- **Stop when the open questions that matter are closed.** Diminishing returns are real; don't research forever.

For source tiering, open-data portals, and how to handle conflicting sources, read `references/research-and-verify.md`.

### 2. Verify

Research finds claims; verify decides which ones you trust enough to publish.

- **Separate fact from inference.** A number from an official source is a fact. "This implies the market is growing" is your inference — label it as such, don't smuggle it in as fact.
- **Cross-check load-bearing claims.** Anything a reader would act on, or that would embarrass the doc if wrong, deserves a second independent source.
- **Date everything that can go stale.** Prices, versions, "current" leaders, statistics — note the as-of date so the reader knows the shelf life.
- **Be honest about gaps — but earn the gap first.** Honesty is the fallback *after* a real attempt, not a shortcut around one. Before writing "unconfirmed," try the obvious next move: if a portal page is blocked, try its data API or export; if a search engine fails, go to the source's domain directly; if one query comes up empty, rephrase it. Only when a genuine attempt fails do you mark it "unconfirmed" / "as of X, per Y" rather than rounding up to certainty. Don't surrender a number a little more digging would have found.

### 3. Design

Decide the shape before writing prose. A document's structure is most of its quality.

- **Name the reader and the one job.** Who opens this, and what do they need to leave able to do? A getting-started guide, an API reference, and a decision record have different shapes — match the shape to the job.
- **Outline first.** Draft the heading hierarchy and confirm it carries the reader from "why am I here" to "I can act now" before you write a single paragraph. The outline is cheap to rearrange; prose is not.
- **Decide what links to what.** A doc rarely stands alone. Note which existing docs this should link to and which should link back, so the set forms a navigable web rather than islands.

For document-type templates (README, guide, reference, ADR, research brief) and linking patterns, read `references/markdown-quality.md`. When the doc is developer-facing — an integration guide, API/CLI docs, anything with code — also apply that file's "Developer-documentation craft" section: title by the task, ship complete copy-pasteable code that comments the *why*, recommend one path among several and say why, and layer quickstart → guide → reference.

### 4. Write

Fill the outline. The goal is that a reader gets the point fast and trusts it.

- **Front-load the answer.** Lead each section with the conclusion, then support it. Readers scan; reward the scan.
- **One idea per paragraph; short sentences.** Break dense prose into lists and tables where structure helps, but don't list-ify things that are actually prose.
- **Show, then tell.** Concrete examples, command blocks, and tables land harder than abstract description. Every code block should be copy-pasteable and correct.
- **Cite inline where a claim leans on a source.** Link the source at the point of the claim, not just in a bibliography dump at the bottom.

### 5. Refine

Whether you wrote it or inherited it, pass over it as a critical reader.

- **Cut what doesn't earn its place.** Redundant sentences, throat-clearing intros, "in this section we will." Tighten.
- **Fix the flow.** Does each section follow from the last? Are headings parallel and scannable? Does the top of the doc orient a stranger in ten seconds?
- **Check the mechanics.** Working links (internal and external), rendered tables, correct code fences with language tags, consistent heading levels, alt text on images.
- **Re-read as the target reader.** The plumber-turned-coder and the staff engineer need different things; make sure the actual reader can follow.

Before you call it done, run the readability and mechanics checklists in `references/markdown-quality.md` as an explicit final pass — not from memory. This is where duplicate table rows, a fact that quietly went missing in the rewrite, a broken link, or an untagged code fence get caught. A skipped final pass is how small flaws survive into the published doc.

For the full readability and Markdown-mechanics checklist, read `references/markdown-quality.md`.

## Output conventions

- **Target portable Markdown** that renders correctly on GitHub by default (GFM): fenced code blocks with language tags, GFM tables, relative links between docs in the same repo. Avoid platform-specific syntax (Docusaurus admonitions, Obsidian `[[wikilinks]]`) unless the user says that's their target.
- **Make the document navigable.** For anything past a couple of screens, add a short table of contents near the top. Link related docs both ways so the set forms a web.
- **Keep sources visible.** Cite inline at the claim. A "Sources" or "References" section at the bottom is good as a backup, not a substitute for inline links.
- **Match the existing repo's conventions.** If the project already has a docs style (heading depth, file layout under `docs/`, naming), follow it rather than imposing a new one.

## Why this matters

Documentation is read far more often than it's written, usually by someone who isn't you and isn't here to ask. A doc that's well-researched but unstructured wastes the reader's time; a doc that's beautifully structured but wrong erodes trust the moment they catch the error. The pipeline exists to protect both: verify so the facts hold, design and refine so the reader gets them without friction. When you skip steps — and you often should — skip the ones this particular document doesn't need, not the ones that happen to be tedious.
