---
name: biz-opportunity-scout
description: Identify and validate a business opportunity with quantitative frameworks before committing. Use when the user is deciding whether to commit real time or money to a startup idea, a new product line, a small or offline business, a side project, a pivot, or an expansion, or says things like "이 사업 될까?", "시장 규모 분석", "사업성 검증", "차릴까/팔아볼까", "TAM SAM SOM", "유닛 이코노믹스". Produces a market-size estimate, unit economics, competitive read, PMF signals, and a Go/No-Go recommendation. Prefer this over a vague opinion whenever a real go/no-go decision is at stake — but not for simply defining a term (e.g. "what does TAM mean?") or building a plain feature-comparison table, which need no full analysis.
---

# biz-opportunity-scout

Validate a business opportunity through quantitative frameworks, then give an honest Go/No-Go.
Be a skeptical analyst, not a cheerleader. Numbers and sources over enthusiasm.

> Frameworks and the report template live in [references/frameworks.md](./references/frameworks.md).
> Read it before producing a full analysis.

## Scope

Confirm which kind of analysis this is:

- **Idea validation** — early-stage concept viability.
- **Pivot / extension** — modify or expand an existing idea.
- **Expansion** — growth opportunity for an established business.

## Workflow

1. **Frame the opportunity**: who is the customer, what is the problem, what is the proposed solution. If these are vague and you can ask, ask one round of clarifying questions before analyzing. If you can't pause (the user clearly wants a one-shot read), don't stall — state your framing explicitly as `assumption`s, flag the most decision-critical one, and proceed.
2. **Gather data**: use web search actively for market data, pricing, and competitors. Target specific numbers each framework needs. Label every figure as `measured`, `sourced`, or `assumption`.
3. **Run the four frameworks** (see references/frameworks.md):
   - Market sizing (TAM / SAM / SOM)
   - Unit economics (LTV, CAC, contribution margin, payback period)
   - Competitive landscape (who, why-switch, moat)
   - PMF signals (evidence of pull, not just interest)
4. **Score**: rate each of the four frameworks 1–5 and sum to a composite out of 20 — always exactly these four dimensions, no extras. As a rough decision band (use judgment, not a hard gate): **≥15 → Go territory**, **9–14 → Conditional-Go** (a key assumption must be validated first), **≤8 → No-Go**. State the band you landed in.
5. **Decide**: give a clear Go / No-Go / Conditional-Go with the deciding reasons and the biggest risk.

## Output

Produce a concise Korean report with these sections (HTML or Markdown per user preference):

- 요약 (Opportunity + Go/No-Go in 3 lines)
- 시장 규모 (TAM/SAM/SOM with how each was derived)
- 유닛 이코노믹스 (LTV, CAC, margin, payback)
- 경쟁 구도 (주요 경쟁자, 전환 이유, 해자)
- PMF 신호 (있다/없다 + 근거)
- 점수표 (dimension별 점수 + 종합)
- 결정 (Go/No-Go + 결정 이유 + 가장 큰 리스크 + 다음 검증 단계)

## Honesty rules

- Distinguish `measured` (real data), `sourced` (from a citation), and `assumption` (your estimate). Never present an assumption as fact.
- If the data needed for a framework doesn't exist yet, say so and propose the cheapest experiment to get it (landing page, pre-sale, interviews).
- When you have no live data and nearly everything is an `assumption`, don't let the labels become noise. Call out the one or two **load-bearing assumptions** — the ones that, if wrong, flip the decision — and make validating them the top of the next-steps list.
- A "No-Go" or "not enough signal yet" is a valid and valuable answer. Do not manufacture optimism.

## Attribution

Framework selection (TAM/SAM/SOM, unit economics, competitive, PMF) is inspired by
[buYoung/skills `biz-opportunity-scout`](https://github.com/buYoung/skills/tree/main/skills/biz-opportunity-scout). See THIRD_PARTY_NOTICES.md.
