# Frameworks & Report Template

Reference for biz-opportunity-scout. Read before producing a full analysis.

## 1. Market sizing (TAM / SAM / SOM)

- **TAM** (Total Addressable Market): total revenue if you captured 100% of the market. Derive top-down (industry report × price) AND bottom-up (number of potential customers × annual spend). Show both; they should be in the same order of magnitude.
- **SAM** (Serviceable Addressable Market): the slice your product/segment/geography can actually serve.
- **SOM** (Serviceable Obtainable Market): the realistic share you can win in 1-3 years given competition and reach.

Always state the assumption behind each number. A bottom-up estimate (customers × price) is more credible than a top-down percentage guess.

## 2. Unit economics

- **CAC** (Customer Acquisition Cost): fully-loaded cost to acquire one paying customer.
- **LTV** (Lifetime Value): contribution margin per customer × expected lifetime. Use margin, not revenue.
- **LTV:CAC**: healthy is roughly ≥ 3:1. Below 1:1 you lose money per customer.
- **Contribution margin**: revenue per unit minus variable cost per unit.
- **Payback period**: months to recover CAC from contribution margin. Under ~12 months is comfortable for most software.

## 3. Competitive landscape

- Who already serves this customer (direct, indirect, and "do nothing")?
- Why would a customer switch to you? One sentence. If you can't, that's a red flag.
- What is the moat (network effect, switching cost, brand, proprietary data, regulation)? Or is there none?

## 4. PMF signals

Interest is not fit. Look for pull:

- Retention/repeat use, not just signups.
- Organic word of mouth / referrals.
- Willingness to pay (pre-sales, paid pilots) before the product is complete.
- The "very disappointed" test (Sean Ellis): would ≥ 40% be very disappointed if it disappeared?

If none of these exist yet, the honest output is "no PMF signal yet" + the cheapest experiment to generate one.

## Report template (sections)

```
요약: <opportunity> / <Go|No-Go|Conditional> / <one-line reason>
시장 규모: TAM <값+근거> / SAM <값+근거> / SOM <값+근거>
유닛 이코노믹스: CAC / LTV / LTV:CAC / 공헌이익 / 회수기간
경쟁 구도: 주요 경쟁자 / 전환 이유 / 해자
PMF 신호: <있음|없음> + 근거
점수표: 시장 _/5 · 이코노믹스 _/5 · 경쟁 _/5 · PMF _/5 → 종합 _/20 (밴드: ≥15 Go / 9–14 조건부 / ≤8 No-Go)
결정: Go|No-Go|Conditional + 결정 이유 + 최대 리스크 + 다음 검증 실험
```

Tag every figure: `[측정]`, `[출처: ...]`, or `[가정]`.
