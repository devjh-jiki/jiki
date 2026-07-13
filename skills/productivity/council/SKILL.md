---
name: council
description: >
  Convene a four-voice council for an ambiguous decision with more than one
  credible path. Architect, Skeptic, Pragmatist, and Critic are launched as
  independent parallel subagents given only the question — deliberately NOT the
  chat history — so their views cannot anchor on yours or each other's, then you
  synthesize the disagreement into a verdict. Use for go/no-go and tradeoff calls
  when the user says "결정 좀 도와줘", "이거 할지 말지", "두 방향 중에 뭐가 나아",
  "다른 관점도 듣고 싶어", "반대 의견도 내봐", "second opinion", "help me decide
  between", "pros and cons from different angles", "should we ship now or wait".
  This is for DECISION-MAKING under ambiguity — not code review, not breaking
  work into implementation steps, not designing architecture, and not a
  one-sided adversarial stress-test of a single plan you already hold (use
  grill-me for that). If there is an obvious right answer, skip the council and
  just answer.
---

# Council

Some decisions have one obvious answer; answer those directly. Council is for the other kind: two or more credible paths, no clear winner, and a real cost to choosing wrong. It surfaces the disagreement before you choose, instead of letting a single train of thought quietly settle it.

The mechanism is four voices, and the anti-anchoring trick is that three of them never see your reasoning or the conversation. They get only the question.

## When this, not grill-me

`grill-me` is one relentless interviewer stress-testing *your* plan by asking *you* questions; you do the thinking under pressure. **Council** is the opposite shape: you pose one fixed question to several independent advisors at once and then synthesize what they said. Grill-me sharpens a position you already hold. Council is for when you do not yet hold one.

## When NOT to use

| If the task is | Use instead |
|----------------|-------------|
| Reviewing code for bugs/security | a code review, not council |
| Breaking a feature into steps | to-issues / implement |
| Designing a module or system shape | codebase-design |
| Stress-testing a plan you already favor | grill-me |
| A straight factual question | just answer |
| Obvious execution work | just do it |

## The four voices

| Voice | Lens |
|-------|------|
| **Architect** | correctness, maintainability, long-term implications |
| **Skeptic** | attacks the premise itself, questions assumptions, proposes the simplest credible alternative |
| **Pragmatist** | shipping speed, user impact, operational reality |
| **Critic** | edge cases, downside risk, failure modes |

## Workflow

### 1. Extract the real question
Reduce the decision to one explicit prompt: what are we deciding, what constraints bind it, what counts as success. If it is vague, ask one clarifying question before convening.

### 2. Gather only the necessary context
Codebase-specific decision → collect the few relevant files/metrics, keep it compact. Strategic decision → skip repo snippets unless they change the answer. Compact context is not laziness; it is what keeps the external voices from drowning.

### 3. Form the Architect position FIRST
Before reading any other voice, write your own initial position, the three strongest reasons for it, and the main risk in your preferred path. Do this first so the final synthesis does not just parrot whatever the subagents said.

### 4. Launch the three external voices in parallel
Each gets the question, compact context, a strict role, and **no conversation history** — that omission is the whole point. Prompt shape:

```text
You are the [ROLE] on a four-voice decision council.

Question:
[the decision]

Context:
[only the relevant snippets or constraints]

Respond with:
1. Position   — 1-2 sentences
2. Reasoning  — 3 concise bullets
3. Risk       — the biggest risk in your own recommendation
4. Surprise   — one thing the other voices may miss

Be direct. No hedging. Under 300 words.
(No conversation history is provided on purpose — answer only from the question and context above. Do not ask for the transcript.)
```
Role emphasis: Skeptic challenges the framing and offers the simplest alternative; Pragmatist optimizes for speed and real execution; Critic hunts downside and failure modes.

### 5. Synthesize with bias guardrails
- Do not dismiss an external view without saying why.
- If a voice changed your recommendation, say so explicitly.
- Always include the strongest dissent, even if you reject it.
- Two voices aligning against your initial position is a real signal, not noise.
- Keep the raw positions visible before your verdict.

### 6. Present a compact verdict
```markdown
## Council: [decision title]

**Architect:** [position] — [why, 1 line]
**Skeptic:** [position] — [why, 1 line]
**Pragmatist:** [position] — [why, 1 line]
**Critic:** [position] — [why, 1 line]

### Verdict
- Consensus:       [where they align]
- Strongest dissent: [the disagreement that matters most]
- Premise check:   [did the Skeptic challenge the question itself?]
- Recommendation:  [the synthesized path]
```
Keep it scannable.

## Multi-round follow-up
Default is one round. If a second is wanted, keep the new question focused, include the previous verdict only if necessary, and keep the Skeptic as context-clean as possible to preserve the anti-anchoring value.

## Anti-patterns
- Using council for code review or plain implementation work.
- Feeding the subagents the entire conversation transcript (destroys anti-anchoring).
- Hiding disagreement in the final verdict — the disagreement IS the value.
- Convening a council when the answer is obvious.

## Boundaries
Council decides between paths under ambiguity. It does not implement, review, or design. If the environment cannot launch parallel subagents, you can still run the four lenses sequentially, but write the Architect position before reading the others and resist letting each voice read the last — the independence is what makes the output worth more than one opinion.

## Attribution

Adapted from [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) — the four-voice framework (Architect / Skeptic / Pragmatist / Critic), the anti-anchoring mechanism of launching the external voices as fresh subagents with only the question, the "form the Architect position first" rule, the synthesis bias guardrails, and the compact verdict shape are preserved. Rewritten for this repo: references to ECC-internal skills (santa-method, knowledge-ops, planner, architect) were dropped, a sharp boundary against `grill-me` (single-interviewer) was added, the ECC persistence/`~/.claude/notes` section was removed, and Korean triggers were added. See THIRD_PARTY_NOTICES.md.
