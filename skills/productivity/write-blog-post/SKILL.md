---
name: write-blog-post
description: Use when the user wants to turn a draft, learning, or experience into a polished Korean technical blog post in the "jihoon" voice, or refine an existing post. Trigger whenever the user says things like "블로그 글 써줘", "이거 글로 정리해줘", "기술 블로그", "포스팅 작성", "글 다듬어줘", or pastes a rough draft and wants it shaped into a publishable post. Also use when the user wants SEO frontmatter (title/seoTitle/description/keywords) for a post. Prefer this over a generic writing response whenever the target is a technical blog article meant for real readers.
disable-model-invocation: true
---

# write-blog-post

Turn a learning, development experience, or rough draft into a polished Korean technical blog post in the "jihoon" voice, or refine an existing post in the same style. The goal is a post that readers finish, that is discoverable in search, and that gets clicked.

Detailed voice, SEO, and Markdown rules live in [references/style-guide.md](./references/style-guide.md) and [references/seo-checklist.md](./references/seo-checklist.md). Read both before writing. (The posts themselves are written in Korean.)

## Workflow

1. **Clarify topic, goal, audience**: what the post is about, the reader (beginner/practitioner), and the purpose (learning notes / portfolio / revenue). If unclear, ask briefly rather than guessing.
2. **Research**: do not write from the draft alone. Use web search to verify technical claims (numbers, mechanisms, comparisons) **as of the present moment**, and gather current versions, ecosystem status, and expert statements. Mark unverified content as speculation or drop it.
3. **Structure**: follow this skeleton.
   - Intro: "이번 포스팅에서는 [주제]에 대한 이야기를 해보려고 한다." plus personal context for why this topic.
   - Body: problem → attempt → resolution. Explain concepts with analogies, then note the analogy's limits.
   - What got stuck and what was learned (authenticity is the differentiator).
   - Conclusion: compress the thesis, address the reader, end with humble uncertainty.
4. **Apply voice**: follow the jihoon style in [references/style-guide.md](./references/style-guide.md) (한다체, "필자" as first person, question-form subheadings, bold only, no em dashes, etc.).
5. **SEO frontmatter + pre-publish check**: apply the frontmatter format and checklist in [references/seo-checklist.md](./references/seo-checklist.md) (description 120–160 chars, seoTitle 50–60 chars, internal links, image alt text).
6. **Save**: write to the user's blog repo/directory. For jihoon-blog that is `content/YYMMDD/index.md`. If unspecified, ask; if unfinished, mark `categories: ignore` to keep it private.

## Core principles

- Do not fabricate facts. When unsure, mark as "확인 필요" (needs verification).
- Code examples must actually run.
- Even for revenue posts, no clickbait or false information.
- Prioritize readability and flow. There should be no point where the reader loses the thread or feels awkward.

## Refining an existing post

When the user gives a path and asks to refine, do not rewrite. Preserve the original thesis and structure, and correct voice, Markdown rules, and SEO per the guides above. Do not invent facts not in the original, but reinforce clear errors or missing context with research and tell the user.
