---
name: iterative-retrieval
description: >
  Progressively refine context for a subagent instead of guessing it upfront.
  A dispatch → evaluate → refine loop (max ~3 cycles) that learns the codebase's
  own terminology in the first pass and keeps only files scoring high on
  relevance. Use when dispatching a subagent or search that needs codebase
  context it cannot predict, when a dispatched subagent fails because it got
  irrelevant or overwhelming code, or when the user says
  "서브에이전트한테 뭘 줘야 할지 모르겠어", "관련 파일 좀 추려서",
  "이 코드베이스에서 X 찾아서 맥락 잡아줘", "gather the right context for this task",
  "which files matter for this". This is a RETRIEVAL strategy for feeding an
  agent the right FILES — not for auditing a config's standing token overhead
  (that is context-budget), not for parallelizing independent tasks, and not a
  general codebase Q&A; it is specifically the "start broad, score, narrow,
  repeat" discipline for assembling just-enough context.
---

# Iterative Retrieval

태스크를 맡기려 띄운 서브에이전트는 보통 처음엔 모른다. 어떤 파일이 필요한지, 코드베이스가 어떤 패턴을 쓰는지, 이 프로젝트가 뭘 뭐라고 부르는지. 순진한 선택지는 다 실패한다: 전부 보내면 컨텍스트 창이 터지고, 아무것도 안 보내면 에이전트는 눈을 가린 채 날고, 추측하면 대개 틀린다. 해법은 사이클로 검색하며 배워 나가는 것이다.

## 루프

**DISPATCH → EVALUATE → REFINE → LOOP**, 약 3 사이클로 제한, 그 다음엔 확보한 최선의 컨텍스트로 진행한다.

### 1. DISPATCH — 넓게 시작

태스크의 순수 의도에서 첫 그물을 넓게 던진다. 넓은 키워드 검색 + 뻔한 경로 glob, 도움이 될 때만 뻔한 노이즈(테스트·생성 파일)를 제외. 첫 쿼리를 과하게 특정하지 마라. 아직 코드베이스의 어휘를 모른다.

### 2. EVALUATE — 관련도 채점

각 후보에 관련도 점수를 매기고, 결정적으로 아직 빠진 게 뭔지 적는다:

| 점수 | 의미 | 행동 |
|-------|---------|--------|
| 0.8-1.0 | 목표를 직접 구현 | keep |
| 0.5-0.7 | 관련 패턴/타입 | 여유 있으면 keep |
| 0.2-0.4 | 곁가지 | 갭 못 메우면 drop |
| 0-0.2 | 무관 | 확신을 갖고 exclude |

각 파일 옆에 **missing context** 를 명시적으로 추적: "핸들러는 찾음, 세션을 어디 저장하는지 아직 필요". 다음 사이클을 이끄는 건 hit 보다 갭이다.

### 3. REFINE — 배운 걸로 쿼리 갱신

첫 사이클의 진짜 수확은 대개 어휘다. 되먹여라:
- high-relevance 파일에서 발견한 패턴·용어 추가 (코드베이스는 `rate limit` 이 아니라 `throttle` 이라 부른다)
- 무관 확정된 경로를 제외해 다시 안 뜨게
- 다음 쿼리를 전체 공간이 아니라 명시된 갭으로 겨냥

### 4. LOOP — 반복, 그리고 충분하면 멈춤

최상위 밴드(>= 0.8, 그걸 직접 구현하는 것) 파일 대략 3개가 있고 크리티컬 갭 플래그가 없으면 — 또는 사이클 상한에 닿으면 — 멈춘다. 실제로 그걸 구현하는 3개가 그저 언급만 하는 10개를 이긴다. 미미한 완전성을 위해 계속 돌지 마라. 모아서 진행하라.

## 예시

**버그 픽스 — 어휘는 맞았고 범위만 좁혀짐**
```
Task: auth 토큰 만료 버그 수정
Cycle 1  dispatch: src/** 에서 "token", "auth", "expiry"
         evaluate: auth.ts 0.9, tokens.ts 0.8, user.ts 0.3
         refine:   "refresh", "jwt" 추가; user.ts 제외
Cycle 2  evaluate: session-manager.ts 0.95, jwt-utils.ts 0.85 → 충분
Result:  auth.ts, tokens.ts, session-manager.ts, jwt-utils.ts
```

**기능 — 첫 사이클이 용어를 가르쳐줌**
```
Task: API 엔드포인트에 rate limiting 추가
Cycle 1  dispatch: "rate", "limit", "api" → 매치 없음; 레포는 "throttle" 이라 부름
         refine:   "throttle", "middleware" 추가
Cycle 2  evaluate: throttle.ts 0.9, middleware/index.ts 0.7 → 라우터 형태 필요
         refine:   "router", "express" 추가
Cycle 3  evaluate: router-setup.ts 0.8 → 충분
Result:  throttle.ts, middleware/index.ts, router-setup.ts
```

두 번째의 첫 사이클은 hit 이 0이었는데도 가장 값졌다: 코드베이스가 그 개념을 부르는 단어를 알려줬으니까.

## 서브에이전트에게 넘길 때

검색을 위임한다면, 에이전트가 루프를 스스로 발명하길 기대하지 말고 지시에 넣어라:
> 넓은 키워드 검색으로 시작해. 각 파일을 태스크 관련도 0-1 로 채점해. 아직 빠진 컨텍스트를 적어. 배운 걸로 검색을 정제해 반복, 최대 3 사이클. 그걸 직접 구현하는 파일(>= 0.8)과 여유 있는 만큼의 0.5-0.7 파일, 못 메운 갭과 함께 반환해.

## 베스트 프랙티스

- 넓게 시작해 점진적으로 좁혀라 — 촘촘한 첫 쿼리는 아직 얻지 못한 가정을 인코딩한다.
- 사이클 1 을 어휘 수업으로 취급하라. 코드베이스는 자기 방식으로 이름 붙인다.
- missing context 를 명시적으로 추적하라. 갭이 hit 보다 정제를 잘 이끈다.
- 충분하면 멈춰라. 탄탄한 3개가 부풀린 목록을 이긴다.
- 확신을 갖고 제외하라. 0.1 파일이 다음 사이클에 관련돼지지 않는다.

## 경계

이건 에이전트/검색을 위한 *컨텍스트 조립* 이다. 여러 독립 태스크를 동시에 돌리는 건 다른 문제(병렬 디스패치)다. 사용자에게 "X 가 어떻게 동작해" 를 일회성으로 답하는 건 이 루프가 아니라 평범한 탐색이다. iterative-retrieval 은 *찾기 시작하기 전엔 어떤 컨텍스트가 필요한지 모른다* 는 게 어려운 부분일 때 꺼내라.

## Attribution

[affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) 에서 **적응**: 서브에이전트 컨텍스트 문제 프레이밍, DISPATCH/EVALUATE/REFINE/LOOP 사이클, 관련도 채점 구간, 명시적 missing-context 추적, 3-사이클 상한, 두 예시를 보존했다. 이 레포에 맞게 재작성 — 업스트림의 가상 JavaScript 검색 API(`retrieveFiles`, `scoreRelevance`, ...)를 도구 무관 산문과 바로 붙여넣을 수 있는 서브에이전트 지시로 대체했고, 다른 ECC 스킬 참조를 뺐으며, 한국어 트리거를 넣었다. THIRD_PARTY_NOTICES.md 참조.
