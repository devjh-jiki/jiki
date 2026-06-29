# jihoon Voice Style Guide

Detailed style rules for the write-blog-post skill. Referenced from SKILL.md.
Posts are written in Korean; the rules below describe that Korean voice. Korean examples are kept verbatim.

## Tone

- Use the **한다체 (plain declarative)**: "~한다", "~이다", "~것이다".
- First person is always **"필자"** (never "나").
- Calm and logical baseline. Parenthetical asides carry the writer's genuine opinion that flows naturally from the text.
  - e.g. `(이 부분이 처음엔 가장 헷갈렸다)`, `(실제로 적용해보니 이 순서가 결정적이었다)`
  - Avoid: jokes/memes unrelated to the text, overuse of internet slang.
- Use **concession-assertion structure**: "물론 ~이지만, 필자 생각은 다르다".

## Intro pattern

1. Declaration: "이번 포스팅에서는 [주제]에 대한 이야기를 해보려고 한다."
2. Personal context: 2-3 paragraphs on why this topic.
3. Reader empathy: start from the writer's own first encounter with the concept.

## Subheadings

- Mix question form and declarative form: "TCP가 왜 느리다고 하는 걸까?", "작성자에서 의사결정권자로".
- Only h2 and h3.
- Aim to spark the reader's curiosity.

## Transitions

- Convert the previous section's conclusion into a question that leads into the next.
- "여기까지 읽으면 자연스럽게 떠오르는 질문이 하나 있다."
- Flow between sections must feel natural, never abrupt.

## Explaining technical concepts

- Always expand English acronyms/jargon: "DRI(Directly Responsible Individual)는...".
- Use analogies actively, then state the analogy's limits: "다만 실제로는 ~이기 때문에...".
- Prefer reference-based writing. Introduce sources by who (author/org) made them.
  - e.g. "Stanford 연구팀(Liu et al.)은...", "React 코어팀의 Andrew Clark은...".
  - Avoid: listing paper titles or arXiv IDs verbatim in the body.

## Sentence structure

- Rhythm of long explanatory sentences + short ones: 2-3 sentences then close with "이런 상황인 것이다."
- Use "~것이다", "~인 것이다" endings for an assertive-yet-explanatory tone.
- 1 paragraph = 1-3 sentences, blank lines between for breathing room.

## Markdown rules

- Emphasis uses `**bold**` only. No `*italic*` (Korean italics render poorly).
- Inline code (`` `code` ``) only for real code, filenames, API names.
- **Do not use em dash (—) or hyphen (-) to join sentences, connect explanations, or separate title/subtitle.** Anywhere: body, subheadings, lists, frontmatter, link text. Use commas, colons (`:`), periods, or natural sentence structure instead.
  - Avoid: `방향 1 — harness`, `Zustand — 소스코드`
  - Prefer: `방향 1: harness`, `Zustand 소스코드`

## Visuals

- Where a diagram/flow/comparison-table helps, mark it with this format:
  ```
  ![one-line description](그림이나자료필요(AI 이미지 생성 프롬프트: concrete generation instruction))
  ```
- alt text = the figure's title/purpose; the parenthetical prompt = concrete content so an AI can generate the image.

## Link rules

- Sources directly quoted in the body get an inline link in the body and are NOT repeated in the bottom references (`:::ref`).
  - "Directly quoted" = a specific number/statement/definition/policy attributed to that source in the body.
  - General mentions ("according to the official docs") stay in the bottom references, not forced inline.
- The same URL is linked only once across the whole post (first occurrence only; later mentions are plain text).

## References section

- Bottom references use the `:::ref` block.
- Each item: `[type] [link text](url)` (types: `paper`, `docs`, `repo`, `article`).
- Link text leads with author/org: `[article] [TkDodo, React Query Error Handling](url)`.
- No em dash/hyphen for title/subtitle separation inside link text either.

## Conclusion pattern

- Compress the whole thesis into 1-2 paragraphs.
- Close by addressing the reader directly.
- Express humble uncertainty about the future: "정답은 없지만... 각자만의 답을 찾아보기를 바란다."
