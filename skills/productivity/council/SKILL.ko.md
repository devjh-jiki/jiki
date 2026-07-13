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

어떤 결정은 답이 하나로 뻔하다. 그런 건 바로 답하라. Council 은 다른 종류를 위한 것이다: 그럴듯한 경로가 둘 이상이고, 뚜렷한 승자가 없고, 틀리면 실제 비용이 드는 결정. 하나의 사고 흐름이 조용히 결론 내리게 두는 대신, 고르기 전에 이견을 드러낸다.

메커니즘은 네 목소리이고, 앵커링 방지 트릭은 그중 셋이 네 추론도 대화도 절대 못 본다는 것이다. 그들은 오직 질문만 받는다.

## 언제 grill-me 대신 이걸

`grill-me` 는 *네* 계획을 *너에게* 질문을 던져 압박하는 단일 인터뷰어다. 압박 속에서 사고하는 건 너다. **Council** 은 정반대 형태다: 고정된 질문 하나를 여러 독립 조언자에게 동시에 던지고 그들이 말한 걸 네가 합성한다. grill-me 는 이미 가진 입장을 벼린다. council 은 아직 입장이 없을 때 쓴다.

## 쓰지 말아야 할 때

| 태스크가 | 대신 |
|----------------|-------------|
| 코드 버그/보안 리뷰 | council 아니라 코드 리뷰 |
| 기능을 단계로 쪼개기 | to-issues / implement |
| 모듈·시스템 형태 설계 | codebase-design |
| 이미 선호하는 계획 압박 테스트 | grill-me |
| 단순 사실 질문 | 그냥 답 |
| 뻔한 실행 작업 | 그냥 실행 |

## 네 목소리

| 목소리 | 렌즈 |
|-------|------|
| **Architect** | 정확성, 유지보수성, 장기 함의 |
| **Skeptic** | 전제 자체를 공격, 가정 의심, 가장 단순한 그럴듯한 대안 제시 |
| **Pragmatist** | 출시 속도, 사용자 영향, 운영 현실 |
| **Critic** | 엣지 케이스, 하방 리스크, 실패 모드 |

## 워크플로

### 1. 진짜 질문 추출
결정을 하나의 명시적 프롬프트로 축약: 뭘 결정하나, 어떤 제약이 묶나, 뭐가 성공인가. 애매하면 소집 전에 한 가지만 명확히 물어라.

### 2. 필요한 컨텍스트만 수집
코드베이스 특정 결정 → 관련 파일/지표 몇 개만, 간결하게. 전략적 결정 → 답을 바꾸지 않으면 레포 스니펫은 건너뛴다. 간결한 컨텍스트는 게으름이 아니라 외부 목소리가 익사하지 않게 하는 장치다.

### 3. Architect 입장을 먼저 세운다
다른 어떤 목소리도 읽기 전에, 네 초기 입장과 그것을 지지하는 가장 강한 이유 셋, 선호 경로의 주된 리스크를 적어라. 최종 합성이 서브에이전트가 한 말을 앵무새처럼 따라하지 않도록 이걸 먼저 한다.

### 4. 외부 세 목소리를 병렬로 띄운다
각자 질문, 간결한 컨텍스트, 엄격한 역할, 그리고 **대화 이력 없음** 을 받는다 — 그 생략이 핵심 전부다. 프롬프트 형태:

```text
너는 4-보이스 결정 council 의 [ROLE] 이다.

Question:
[결정]

Context:
[관련 스니펫이나 제약만]

다음으로 답하라:
1. Position   — 1-2 문장
2. Reasoning  — 간결한 불릿 3개
3. Risk       — 네 추천의 가장 큰 리스크
4. Surprise   — 다른 목소리가 놓칠 만한 한 가지

직설적으로. 얼버무리지 마라. 300단어 이내.
(대화 이력은 일부러 주지 않았다 — 위 질문과 컨텍스트만으로 답하라. 전문을 요구하지 마라.)
```
역할 강조: Skeptic 은 프레이밍에 도전하고 가장 단순한 대안 제시; Pragmatist 는 속도와 실제 실행 최적화; Critic 은 하방과 실패 모드를 사냥.

### 5. 편향 가드레일 갖고 합성
- 외부 견해를 이유 없이 기각하지 마라.
- 어떤 목소리가 네 추천을 바꿨으면 명시하라.
- 기각하더라도 가장 강한 반대를 항상 포함하라.
- 두 목소리가 네 초기 입장에 맞서 정렬하면 그건 노이즈가 아니라 진짜 신호다.
- verdict 전에 원본 입장들을 보이게 둬라.

### 6. 간결한 verdict 제시
```markdown
## Council: [결정 제목]

**Architect:** [입장] — [이유, 1줄]
**Skeptic:** [입장] — [이유, 1줄]
**Pragmatist:** [입장] — [이유, 1줄]
**Critic:** [입장] — [이유, 1줄]

### Verdict
- Consensus:        [어디서 정렬하나]
- Strongest dissent: [가장 중요한 이견]
- Premise check:    [Skeptic 이 질문 자체에 도전했나?]
- Recommendation:   [합성된 경로]
```
스캔 가능하게 유지.

## 다중 라운드 후속
기본은 한 라운드. 두 번째를 원하면 새 질문을 좁게 유지하고, 이전 verdict 는 필요할 때만 포함하며, Skeptic 은 앵커링 방지 가치를 지키려 최대한 컨텍스트를 깨끗이.

## 안티패턴
- council 을 코드 리뷰나 평범한 구현 작업에 사용.
- 서브에이전트에게 대화 전문을 먹이기(앵커링 방지 파괴).
- 최종 verdict 에 이견을 숨기기 — 이견이 곧 가치다.
- 답이 뻔한데 council 소집.

## 경계
Council 은 애매함 속에서 경로 사이를 결정한다. 구현·리뷰·설계는 안 한다. 병렬 서브에이전트를 못 띄우는 환경이면 네 렌즈를 순차로 돌릴 수도 있지만, 다른 걸 읽기 전에 Architect 입장을 쓰고 각 목소리가 직전 걸 읽지 않게 버텨라 — 그 독립성이 출력을 한 사람 의견보다 값지게 만든다.

## Attribution

[affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) 에서 **적응**: 4-보이스 프레임워크(Architect / Skeptic / Pragmatist / Critic), 외부 목소리를 질문만 준 fresh 서브에이전트로 띄우는 앵커링 방지 메커니즘, "Architect 입장을 먼저" 규칙, 합성 편향 가드레일, 간결한 verdict 형태를 보존했다. 이 레포에 맞게 재작성 — ECC 내부 스킬 참조(santa-method, knowledge-ops, planner, architect)를 뺐고, `grill-me`(단일 인터뷰어)와의 날카로운 경계를 추가했으며, ECC 의 persistence/`~/.claude/notes` 섹션을 제거하고 한국어 트리거를 넣었다. THIRD_PARTY_NOTICES.md 참조.
