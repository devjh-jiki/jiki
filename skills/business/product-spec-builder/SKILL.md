---
name: product-spec-builder
description: Help a founder or PM turn a rough idea into a clear, buildable product spec (PRD) fast. Use when the user wants a PRD, product spec, feature spec, or says "스펙 잡아줘", "PRD 만들어줘", "기획서", "요구사항 정리". Runs a short interview to fill gaps, then produces a structured spec a developer or coding agent can execute. Prefer this over writing code or a vague plan whenever the user is defining what to build.
---

# product-spec-builder

Turn a rough idea into a spec that a developer (or a coding agent) can build without guessing.
Be a sharp PM: clarify the why, scope tightly, and make success measurable.

If the idea is still unvalidated as a business, suggest running `grill-me` or `biz-opportunity-scout` first.
If the user already knows what to build, proceed.

## Workflow

1. **Short interview** (use the grill-me discipline: one question at a time, recommend answers, probe vagueness). Fill only the gaps you actually need:
   - Problem & user: who, what pain, what they do today.
   - Goal & success metric: what changes, how it's measured.
   - Scope: must-have vs explicitly out of scope for v1.
   - Constraints: tech, time, dependencies, non-functional (perf, security, a11y).
2. **Draft the spec** using the template below.
3. **Slice it**: break the spec into independently shippable vertical slices, each with its own done-criteria. Smallest valuable slice first.
4. **Confirm**: show the spec, ask what's wrong or missing, revise.

## Spec template

```
# <기능/제품 이름>

## 문제 & 사용자
- 누구를 위한 것인가
- 지금 어떻게 하고 있고 무엇이 불편한가

## 목표 & 성공 지표
- 이 기능이 바꾸는 것
- 성공을 측정하는 지표/신호

## 범위
- 포함 (v1 must-have)
- 제외 (명시적으로 v1에서 안 함)

## 사용자 흐름
- 핵심 시나리오 1~3개 (해피 패스 + 주요 엣지)

## 요구사항
- 기능 요구사항 (검증 가능하게)
- 비기능 요구사항 (성능, 보안, 접근성, 호환성)

## 데이터 & 인터페이스
- 다루는 데이터, 외부 API/계약, 상태

## 수용 기준 (Done Criteria)
- [ ] 체크 가능한 항목으로

## 슬라이스 (실행 단위)
1. <가장 작은 가치 슬라이스> + done-criteria
2. ...

## 미해결 질문
- 아직 정해지지 않은 것
```

## Principles

- **Scope ruthlessly.** A v1 that ships beats a v3 in your head. Push "nice to have" to a later slice.
- **Make it verifiable.** Every requirement should be checkable. "사용자 친화적" is not a requirement; "3-클릭 이내 완료"는 된다.
- **Surface assumptions and open questions** rather than silently deciding them.
- **Vertical slices.** Each slice should deliver end-to-end value, not a horizontal layer.

## Relationship to other skills

- Upstream: `grill-me` (decision), `biz-opportunity-scout` (is it worth building).
- Downstream: hand the slices to a coding agent or to the engineering skills.
