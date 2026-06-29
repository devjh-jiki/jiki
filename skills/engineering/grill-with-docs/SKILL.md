---
name: grill-with-docs
description: A relentless interview that sharpens a plan or design AND captures the decisions as docs — glossary terms and ADRs — inline as they crystallise. Use when the user says "압박 질문하면서 문서도 남겨줘", "grill me and write it down", "설계 캐묻고 ADR 로 정리해줘", "interrogate this and keep docs", or wants a high-stakes design stress-tested while leaving a durable record behind. Adapted from mattpocock/skills.
disable-model-invocation: true
---

# grill-with-docs

Run a relentless grilling interview that *also* maintains the project's docs as you go. Two disciplines, one session: interrogate the plan until it's sharp, and write down every resolved term and irreversible decision the moment it lands — so the conversation leaves a durable asset, not just a clearer head.

## The two disciplines

**Grill** — apply the `grill-me` interview discipline:

- **One question at a time.** Ask, listen, then ask the next based on the answer. Never dump a list.
- **Recommend an answer.** With each question, offer the answer you'd pick and why; the user accepts or overrides.
- **Probe vagueness.** When an answer is vague ("it should be fast", "users want this"), push: how fast, which users, how do you know.
- **Follow the riskiest branch first**, and stop when the remaining unknowns are cheap to get wrong.

**Document** — apply the `domain-modeling` discipline as the interview surfaces decisions:

- When a term gets pinned down, update the `CONTEXT.md` glossary right there (create it if it doesn't exist yet). Capture terms as they resolve — don't batch.
- When the interview settles a decision that is **hard to reverse, surprising without context, and a real trade-off**, offer to record it as an ADR under `docs/adr/` (create the directory lazily).
- Use the project's existing domain vocabulary throughout the questions, and challenge any term that conflicts with the glossary.

## Flow

1. **Frame**: restate in one sentence what the user is deciding. Confirm it.
2. **Map**: silently list the major branches; pick the riskiest.
3. **Interview, documenting inline**: walk the tree one question at a time. Each time an answer pins a term or settles a trade-off, write it to `CONTEXT.md` or an ADR before moving on.
4. **Resolve**: continue until every branch that matters is settled or explicitly deferred.
5. **Summarize**: end with a short decision record AND a list of the docs you touched (which terms, which ADRs).

The interview drives the docs; don't stop interviewing to write a perfect doc, and don't finish the interview with decisions left uncaptured. The two run together.

## Owner / leadership lens

For a developer who is also CEO/CTO/CFO/PM, the grilling sharpens the decision — but the *docs* are what compound:

- **Decisions captured as ADRs become alignment assets.** The next hire, the next investor question, the next "why did we build it this way" all get answered from the record instead of from your memory.
- **The glossary built mid-interview becomes onboarding material.** You're not writing docs as a separate chore later; the interview pays for itself twice.
- **A grilling with no record is a sunk cost.** You paid the time to think hard — capturing it is how that thinking stops being re-done every quarter.

## Attribution

Adapted from [mattpocock/skills `grill-with-docs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) (MIT). See THIRD_PARTY_NOTICES.md.
