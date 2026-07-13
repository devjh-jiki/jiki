---
name: recency-research
description: >
  Research what people actually said about a topic in roughly the last 30 days,
  across multiple community sources (Reddit, Hacker News, X, YouTube, GitHub, the
  web) rather than stale blog posts or model training data. Score signal by real
  engagement (upvotes, comments, stars), merge the same story across sources, and
  synthesize one grounded, cited brief with verbatim community quotes. Use before
  a meeting, sales call, or launch; to learn what problems people are hitting with
  a tool right now; or when the user says "요즘 사람들 뭐래", "최근 반응 찾아줘",
  "지난 30일", "여론 조사", "recent takes on", "what are people saying about",
  "last 30 days", "community sentiment". This is a lightweight, host-web-tool
  workflow; for the full multi-platform engine with API-key sources (TikTok,
  Polymarket, Instagram, saved library, watchlists) install the upstream
  last30days tool (see Attribution). Do NOT use for evergreen/reference facts
  (use document-with-research) or for a codebase question.
---

# Recency Research

Answer "what are people *actually* saying about X right now?" — grounded in recent community signal, not model memory or SEO blog posts. The value is depth (real quotes, real engagement numbers, cross-source corroboration), not a link dump.

**When this fits:** a person/company/product/tool/topic you need the *last ~30 days* of truth on. **When it doesn't:** evergreen facts or how-to (use `document-with-research`); a question about a codebase.

## Capability check first

This skill runs on whatever web/search tools the current agent has. Before you start:

- **Full engine available?** If the upstream `last30days` tool is installed (a `last30days.py` on the machine, or the `/last30days` command), prefer it — it adds API-key sources (TikTok, Instagram, Polymarket, LinkedIn), a saved library, and watchlists this workflow can't reach. To check quickly: try `/last30days` if the host supports slash commands, or `command -v last30days || ls last30days.py 2>/dev/null`; if nothing is found, proceed with the lightweight workflow below. Hand off to it and stop here.
- **Otherwise**, run the lightweight workflow below with the host's web search / fetch tools. Be honest about coverage: without platform APIs you get Reddit, HN, GitHub, and general web reliably; X/YouTube/TikTok only as far as public web search surfaces them. Say so in the output — never imply you searched a source you couldn't reach.

## Workflow

### 1. Resolve who/what matters
Before searching, resolve the entities so queries hit real signal, not noise:
- Person → their handles (X, GitHub), the subreddits they show up in, YouTube channel.
- Company/product → GitHub org/repo (pull live star count), subreddits, official accounts.
- Topic → the communities that argue about it (r/…), the right search phrasing.

A literal phrase ("gift for a 42 year old man") returns noise because nobody posts that way. Reframe to how people actually talk before searching.

### 2. Search each reachable source, windowed to ~30 days
Run these in parallel where the tool allows. For each, capture the *engagement number* and the *link*, not just the title:
- **Reddit** — top threads + top comments with upvote counts. A 1,500-upvote thread outweighs a blog nobody read.
- **Hacker News** — points + comment count; where technical people argue.
- **GitHub** — for a tool: recent issues/discussions, release notes, live star count. For a person: recent PRs/repos.
- **Web** — recent articles, but as one signal among many, not the answer.
- **X / YouTube** — only as far as public web search exposes them; label as partial.

### 3. Merge, don't list
The same story shows up on Reddit, X, and a blog → that's *one* cluster, not three items. Rank clusters by cross-source engagement + freshness. Drop off-topic viral noise even if it scored high.

### 4. Synthesize one grounded brief
Structure:
- **What I learned:** — 2–4 short paragraphs, each led by the concrete finding, grounded in specific data ("569 upvotes on r/…", "23 PRs merged this month").
- **Weave in ≥ 2 verbatim, attributed community quotes** (`u/name`, `@handle`) inline where they fit — the sharp community line is the headline value, not a footnote. Never fabricate a quote or a URL; if you don't have the URL, attribute by plain name.
- **Key patterns:** — a short numbered list of the recurring themes.
- Cite readably: on a host that hides URLs behind link text, inline-link `[name](url)`; on a host that shows raw URLs, use plain labels (`per @handle`, `per r/subreddit`) and keep URLs out of the prose. Never a raw URL string, never URL soup, never a trailing "Sources:" dump.

### 5. State coverage honestly
End by noting which sources you actually reached vs. couldn't (no API key / not reachable). "Nothing on X" is only true if you actually searched X; otherwise say "not covered".

## Guardrails
- Recency is the point — prefer the last ~30 days; older material only as context, labeled as such.
- Engagement is the signal — a number-backed claim beats an assertion.
- Honesty over completeness — a partial brief that names its gaps beats a confident one that hides them.

## Attribution

Adapted from [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) (MIT) — the multi-source-community-research concept, engagement-scored synthesis, cross-source cluster merging, verbatim-community-quote weaving, and honest partial-coverage reporting. This is a **lightweight reimplementation** using the host's own web tools; it deliberately does NOT vendor the upstream Python engine, its API-key source integrations, or its saved-library/watchlist features. For the full engine, install the upstream tool directly. See THIRD_PARTY_NOTICES.md.
