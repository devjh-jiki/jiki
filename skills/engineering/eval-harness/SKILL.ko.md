---
name: eval-harness
description: >
  Eval-driven development (EDD) for AI-assisted and agent work — define
  pass/fail criteria BEFORE building, then measure reliability with pass@k /
  pass^k across repeated runs. Use when the user wants to make an agent, prompt,
  or non-deterministic feature reliable and measurable: "이거 얼마나 믿을 만한지",
  "eval 짜줘", "평가 기준 만들어줘", "프롬프트 회귀 잡고 싶어", "pass@k",
  "eval-driven", "how reliable is this agent", "measure agent reliability",
  "regression suite for a prompt". This is for judging NON-deterministic behavior
  measured statistically over many runs (an LLM call, an agent task, a flaky
  generation) where one run is not proof — it fires only when the target is an AI
  agent, prompt, or probabilistic pipeline. NOT for writing test cases for
  deterministic, pure-function code (that is plain test-writing), NOT for driving
  new code test-first (use tdd), and NOT for a one-off "did this fix work" check
  (use verification-before-completion). Where the correct output is a fixed value,
  a normal test beats an eval.
---

# Eval Harness

Eval 은 비결정적 작업의 단위 테스트다. LLM 호출, 에이전트 태스크, 생성물이 한 번 초록불이 됐다고 아무것도 증명되지 않는다. 다음 실행에서 깨질 수 있다. 이 스킬은 신뢰도를 주장이 아니라 측정된 수치로 다룬다.

## 언제 tdd 대신 이걸

`tdd` 는 결정적 코드를 테스트 우선으로 몰고 간다. `add(2,2)` 는 항상 `4` 이고, 통과 테스트 하나가 곧 증명이다. **eval-harness** 는 대상이 계산기가 아니라 동전일 때 꺼낸다: 프롬프트, 에이전트, 검색 단계, 모델이 채점하는 출력. 여기서 질문은 "통과하냐" 가 아니라 "몇 번 시도 중 몇 번" 이다. 평범한 단언(assert)으로 답을 못 박을 수 있으면 그냥 단언을 써라. eval 은 그게 불가능할 때 쓰는 도구다.

## 루프

1. **만들기 전에 정의한다.** 기준을 먼저 쓰면 "된다" 가 실제로 뭘 뜻하는지 강제로 명시하게 된다. 애매한 성공은 측정 불가다.
2. **반복 실행한다.** 한 번은 일화다. k 번은 비율이다.
3. **시간에 따라 추적한다.** 프롬프트/모델 변경 하나하나가 직전 측정 비율에 대한 diff 다.

## Eval 종류

두 종류이고, 모든 기능에 둘 다 필요하다:

**Capability eval** — 새 일을 애초에 할 수 있나?
```
[CAPABILITY: <이름>]
Task:     에이전트가 달성해야 하는 것
Criteria: - [ ] 구체적이고 체크 가능한 조건
          - [ ] 또 하나
Target:   pass@3 >= 0.90
```

**Regression eval** — 변경이 기존에 되던 걸 깨뜨렸나?
```
[REGRESSION: <이름>]
Baseline: <커밋 sha 또는 체크포인트>
Cases:    기존-동작-1, 기존-동작-2, ...
Target:   릴리스 크리티컬 경로에서 pass^3 = 1.00
```

## Grader: 정직한 것 중 가장 값싼 것

실패를 잡아내면서도 가장 안 화려한 grader 를 골라라. 화려할수록 느리고 flaky 하다.

1. **Code grader** — 결정적. grep, exit code, 스키마 체크. 통과 조건이 기계적이면 무조건 이것.
   ```bash
   npm test -- auth && echo PASS || echo FAIL
   grep -q "export function handleAuth" src/auth.ts && echo PASS || echo FAIL
   ```
2. **Rule grader** — 출력 형태에 대한 regex/스키마 제약. "이 필드들을 가진 유효한 JSON 이어야 함" 류.
3. **Model grader** — LLM 이 열린 출력을 루브릭으로 채점. 산문·설명·설계 품질용. 1-5 루브릭을 주고 숫자만이 아니라 근거를 요구하라.
4. **Human grader** — 수동 검토 플래그. 보안 민감·영향범위 큰 변경엔 필수. 보안 게이트를 완전 자동화하지 마라.

## 지표

- **pass@k** — "k 번 시도 중 최소 1번 성공". `pass@1` 은 순수 첫 시도 신뢰도, `pass@3` 은 재시도 몇 번 허용한 실용 신뢰도. Capability 목표: `pass@3 >= 0.90`.
- **pass^k** — "k 번 시도 전부 성공". best-of 가 아니라 안정성 기준. 단 한 번의 실패도 용납 안 되는 릴리스 크리티컬·회귀 경로엔 `pass^3 = 1.00`.

이 구분이 중요하다: pass@3 = 100% 인데 pass^3 = 40% 인 에이전트는 재시도를 허용하면 돌아가지만, 무인 파이프라인엔 부적합하다.

## 리포트

실행 후 읽기 좋은 리포트 하나:

```
EVAL REPORT: <기능>
Capability:  X/Y passed   (pass@1: __%, pass@3: __%)
Regression:  X/Y passed   (pass^3: __%)
Status:      READY / NOT READY

Failing:
- <케이스>: <실제로 무슨 일이 났나>
```

## 안티패턴

- **Eval 에 과적합.** 알려진 예시를 외울 때까지 프롬프트를 튜닝. eval 은 동작을 샘플링해야지 동작 자체가 되면 안 된다.
- **해피패스만.** 적대적·엣지 케이스가 없으면 그 비율은 허구다.
- **게이트에 flaky grader.** 자기가 5% 실패하는 grader 는 99% 목표를 인증할 수 없다.
- **비용/지연 드리프트를 무시한 채 pass rate 만 좇기.** 같이 추적하라. 4배 느려진 "신뢰할 만한" 에이전트는 회귀한 것이다.
- **테스트면 될 걸 eval 로.** 결정적 출력 → 결정적 테스트. eval 은 비싼 도구다.

## Eval 저장 (선택)

eval 을 코드와 함께 두고 싶으면 가벼운 관례:
```
evals/<기능>.md    # 정의 + 기준
evals/<기능>.log    # 실행 이력, 시간에 따른 비율
```
요구사항이 아니라 제안이다. 가치는 파일 배치가 아니라 루프에 있다. 프로젝트가 이미 쓰는 방식에 맞춰라.

## 경계

순수 함수의 결정적 단위 테스트 → 평범한 test-writing. 새 동작을 테스트 우선으로 → `tdd`. PR 전 build/lint/test 게이트 → `verification-before-completion`. 이 스킬은 비결정적인 것을 신뢰하기 전에 얼마나 믿을 만한지 측정하는 데 특화됐다.

## Attribution

[affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) 에서 **적응**: eval-driven-development 프레이밍, capability/regression eval 구분, 4종 grader, pass@k 대 pass^k 신뢰도 지표를 보존했다. 이 레포에 맞게 재작성 — ECC 고유의 슬래시 커맨드(`/eval define`), `.claude/evals/` 파일 배치, 훅 연동을 도구 무관 루프로 대체했고, `tdd`(결정적 테스트)와의 날카로운 경계를 추가하고 한국어 트리거를 넣었다. THIRD_PARTY_NOTICES.md 참조.
