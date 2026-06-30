---
name: handoff
description: Compact the current conversation into a handoff document for another agent (or a fresh session) to pick up. Use when the user says "인계 문서", "핸드오프", "hand off", "handoff", "다음 세션에 넘겨줘", "이어서 작업하게 정리해줘", or is wrapping up and wants the context preserved for continuation. Adapted from mattpocock/skills.
disable-model-invocation: true
---

# handoff

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save it to the temporary directory of the user's OS — not the current workspace. Resolve the temp dir from `$TMPDIR`, falling back to `/tmp` (or `%TEMP%` on Windows), and write to `<tmpdir>/handoff-<timestamp>.md`. Tell the user the absolute path, and — because a fresh agent won't know to look in the temp dir — offer to drop a one-line pointer to that path where the next session will actually start (a `NEXT.md`, a task tracker, or the commit/PR description). The handoff is only useful if the next session can find it.

Include a **"Suggested skills"** section listing the skills the next agent should invoke (e.g. `to-prd`, `improve-codebase-architecture`, `diagnosing-bugs`, `grill-me`).

Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information — API keys, passwords, tokens, or personally identifiable information.

If the user described what the next session will focus on, treat that as the goal and tailor the doc accordingly.

## Owner / leadership lens

For a developer who is also CEO/CTO/CFO/PM, a handoff is delegation in writing:

- **A good handoff is the difference between delegating and dropping.** State the goal, the decisions already made, and the single next action so the next agent (or person) starts without re-deriving context — that is what lets you step away.
- **Capture the "why," not just the "what."** Decisions and their reasons are the expensive part; code can be re-read, intent cannot. Reference artifacts for the what, write down the why.
- **Redaction is a governance habit.** Handoff files leave your session — never let a key or PII ride along.

## Attribution

Adapted from [mattpocock/skills `handoff`](https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff) (MIT). See THIRD_PARTY_NOTICES.md.
