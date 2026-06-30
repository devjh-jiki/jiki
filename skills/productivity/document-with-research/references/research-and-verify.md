# Research & verify reference

How to research a topic on the web and verify what you find, so the document you write earns trust. Read this during **research** (where to look, how to search) and **verify** (how to decide what to publish).

## Contents

- [Source tiering](#source-tiering)
- [Open-data and authoritative portals](#open-data-and-authoritative-portals)
- [Searching effectively](#searching-effectively)
- [Verifying claims](#verifying-claims)
- [Handling conflicting sources](#handling-conflicting-sources)
- [Recording sources for citation](#recording-sources-for-citation)

## Source tiering

Not all sources are equal. Prefer higher tiers; when you must use a lower tier, say so and try to trace upward.

| Tier | Examples | Use for |
|------|----------|---------|
| **Primary / authoritative** | Official docs, standards (RFC, W3C, ISO), government & open-data portals, the project's own source code, peer-reviewed papers, original datasets | Load-bearing facts, numbers, definitions |
| **Reputable secondary** | Established tech publications, maintainer blogs, well-known textbooks, documentation aggregators that cite primaries | Context, explanation, pointers to primaries |
| **Community / informal** | Forum answers, random blogs, social posts, AI-generated summaries | Leads to chase down — verify before relying |

The rule: a claim a reader will *act on* should rest on a primary or reputable-secondary source. If the best you have is community-tier, label the claim's confidence accordingly.

## Open-data and authoritative portals

Useful starting points when a document needs real data. Always confirm the dataset's license allows your use and note its as-of date.

- **Government / public data**: [data.go.kr](https://www.data.go.kr) (Korea public data portal), [data.gov](https://data.gov) (US), [data.europa.eu](https://data.europa.eu) (EU), [data.worldbank.org](https://data.worldbank.org), [ourworldindata.org](https://ourworldindata.org), OECD / UN statistics.
- **Standards & specs**: official RFCs (ietf.org), W3C, WHATWG, language/runtime official docs.
- **Software facts**: the project's own repo (README, source, releases, CHANGELOG), package registries (npm, PyPI) for versions, official docs over third-party tutorials.
- **Research**: Google Scholar, arXiv, Semantic Scholar — and read the actual paper, not the press release about it.

Treat any portal's data as a primary source only for what it actually measures. A dataset titled "X" may define X differently than your reader assumes — check the methodology note.

## Searching effectively

- **One question per search.** Write the question first ("what's the default timeout for fetch in Node 20?"), then search for it. Vague searches ("Node fetch") return vague results.
- **Go to the source's site.** If you suspect the answer is in official docs, search within that domain or navigate there directly rather than trusting a summary.
- **Date-bound when freshness matters.** For anything that changes (prices, versions, rankings), prefer recent sources and note the date you checked.
- **Chase secondary to primary.** A blog says "the spec requires X" — find the spec section and confirm. Cite the spec, optionally the blog for explanation.
- **Stop at diminishing returns.** When new searches keep returning what you already have, the question is closed. Move on.

## Verifying claims

Verification is deciding what you trust enough to publish under your name.

- **Fact vs. inference.** Mark which statements are sourced facts and which are your interpretation. Never present inference as fact.
- **Cross-check load-bearing claims.** Anything the reader acts on, or that would discredit the doc if wrong, needs a second independent source — independent meaning not just two sites copying the same press release.
- **Date stale-able claims.** Prices, versions, "current" anything, statistics — attach an as-of date so the reader knows when it was true.
- **Check the claim's own caveats.** A statistic often has a definition, a sample, a methodology. "Unemployment is X%" means something specific; don't strip the qualifier that makes it true.
- **State confidence honestly.** "Confirmed by official docs" vs. "reported by one blog, unverified" are different; let the doc reflect that.

## Handling conflicting sources

When two sources disagree:

1. **Rank by tier and recency.** A current primary source beats an old secondary one.
2. **Find the disagreement's root.** Often they're measuring different things, or one is outdated. Naming the difference usually resolves it.
3. **If genuinely unresolved, report both.** Don't silently pick one. "Source A says X (date); source B says Y (date); they differ because…" is more useful and honest than false certainty.

## Recording sources for citation

Capture this *as you research*, not reconstructed later:

- The URL (permalink if available)
- Publisher / author
- Publication or last-updated date
- The specific claim it supports

This feeds two things: inline citations at the point of each claim, and a backup Sources section. With the record in hand, citing is mechanical; without it, you'll either guess or re-search — both worse.
