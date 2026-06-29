# SEO Frontmatter + Pre-publish Checklist

SEO rules for the write-blog-post skill. Referenced from SKILL.md. Posts target Korean search.

## Frontmatter format

```yaml
---
emoji: [a fitting emoji]
title: '[short, clear title]'
seoTitle: '[optional: long search title, 50-60 chars, includes key keywords]'
date: '[YYYY-MM-DD]'
categories: [space-separated categories]
description: '[meta description, 120-160 chars, includes key keywords]'
keywords: '[comma-separated target keywords, 5-8, long-tail focused]'
---
```

## Field guidance

- **title**: site H1/card title. Short and essential. e.g. `"추상화"`, `"도메인 모델"`.
- **seoTitle** (optional): use when you want a short title for site readability but rich keywords for search engines.
  - Reflected in `<title>`, OG, Twitter, JSON-LD `alternativeHeadline`.
  - 50-60 chars recommended (not truncated in Google results).
  - Pattern: main keyword + secondary keyword + action/benefit. e.g. `"프론트엔드 추상화, 좋은 코드를 위한 설계 원칙"`.
  - Falls back to title when omitted, so add only for posts needing keyword reinforcement.
- **description**: convey the core and reader value clearly; include main search keywords naturally.
- **keywords**: concrete long-tail keywords with real search volume. Korean/English mix OK. (e.g. "React Fiber, React 렌더링 원리")

## Pre-publish checklist (required)

In real operational data, when `description`/`keywords` are empty, impressions still occur but clicks converge to zero. Missing metadata equals lost traffic.

- [ ] **description 120-160 chars**: Korean takes more pixel width in snippets and may truncate before 160; do not exceed.
- [ ] **seoTitle 50-60 chars**: length that won't truncate in Google result titles. Put the main keyword near the front.
- [ ] **title vs seoTitle role split**: title = short display, seoTitle = long search.
- [ ] **keywords based on real search queries**: where possible, reflect actual incoming queries from GSC.
- [ ] **core query naturally in the first paragraph**: Google generates the snippet from the body.
- [ ] **at least one internal link**: keyword-anchor link to an existing post in the same category. Inter-post linking is a key topical-authority signal.
- [ ] **image alt text**: descriptive alt for every body image.

## Private (draft) handling

- Unfinished posts put `ignore` in frontmatter `categories`.
- With `ignore`, the post is fully excluded from sitemap, RSS, list, search, individual page, and llms.txt, with `noindex` applied.
- On publish, replace `ignore` with the real category.

## Using GSC data (jihoon-blog)

- `pnpm gsc` collects last-28-days vs prior-28-days search data (CSV in `.gsc-data/` + Quick Win / Cannibalization classification).
- **Quick Win**: queries at position 5-20 with high impressions and low CTR. Improving that post's seoTitle/description/first-paragraph for that query yields immediate effect.
- Base `keywords` on queries actually shown in GSC, not guesses.
