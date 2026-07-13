---
name: verification-before-completion
description: >
  Never claim done without proof. Before saying a task is finished, fixed,
  working, or ready for PR, run the actual verification (build, types, lint,
  tests, a security scan, a diff review) and read the output. Use when wrapping
  up any change and about to declare success, or when the user says "다 됐어?",
  "확인하고 끝내줘", "PR 올리기 전에 점검", "검증하고 마무리", "verify before done",
  "make sure it actually works", "run the checks before you say it's fixed". This
  governs the moment of CLAIMING completion — it is not for diagnosing why a test
  fails (use diagnosing-bugs), not for driving new code test-first (use tdd), and
  not for judging code quality/logic/architecture (that is a code review; the
  "diff review" phase here only scans for unintended changes, not design). Its
  job is to convert "I think it's done" into "here is the evidence it's done".
---

# Verification Before Completion

"됐다" 는 주장이다. 증거 없는 주장은 리포트로 위장한 추측이다. 이 스킬은 "done" 이라는 말이 입 밖에 나오기 전에 체크를 돌리고 그 출력을 읽는 규율이다.

이게 막는 실패는 구체적이고 흔하다: 관찰이 아니라 의도에서 성공을 선언하는 것 — 실패하던 케이스를 다시 안 돌려보고 "버그 고쳤어", 빌드를 안 돌려보고 "빌드 통과", 추적 안 된 디버그 로그가 diff 에 남은 채 "PR 준비 완료".

## 규칙

태스크를 완료·수정·작동·준비 완료로 주장하기 전에: 관련 검증을 돌리고 실제로 출력된 것을 인용하라. 출력이 없으면 주장도 없다. 안 돌렸으면 "done" 이 아니라 "아직 미검증" 이라고 말하라.

## Phase

해당하는 것을 돌려라. 모든 변경이 모든 phase 를 건드리진 않지만, phase 를 건너뛰는 건 조용히 빠뜨리는 단계가 아니라 명시하는 결정이다.

1. **Build** — 컴파일/번들 되나?
   ```bash
   npm run build 2>&1 | tail -20    # 또는 pnpm build, cargo build, go build, ...
   ```
   실패 → 다른 무엇보다 먼저 STOP 하고 고쳐라. 깨진 빌드는 이후 모든 phase 를 무의미하게 만든다.

2. **Types** — 정적 체크 깨끗한가?
   ```bash
   npx tsc --noEmit 2>&1 | head -30    # 또는 pyright ., mypy, ...
   ```

3. **Lint** — 스타일/품질 게이트?
   ```bash
   npm run lint 2>&1 | head -30    # 또는 ruff check ., golangci-lint, ...
   ```

4. **Tests** — 특히 이 변경과 묶인 케이스. 빨갛던 테스트를 다시 돌려 초록으로 바뀌는 걸 봐라. 전체 스위트 요약으로 추론하지 마라.
   ```bash
   npm test 2>&1 | tail -50
   ```
   보고: 전체 / 통과 / 실패, 프로젝트가 게이트하면 커버리지도.

5. **Security / secrets** — 유출 없나, 디버그 백도어 안 남았나.
   ```bash
   git diff | grep -nE "sk-|api_key|password|console\.log|TODO|debugger"
   ```

6. **Diff review** — 기억이 아니라 실제 diff 를 읽어라.
   ```bash
   git diff --stat && git diff
   ```
   확인: 의도 안 한 변경, 흘린 파일, 빠진 에러 처리, 변경이 연 엣지 케이스.

## 리포트

```
VERIFICATION
Build:    PASS / FAIL
Types:    PASS / FAIL  (N errors)
Lint:     PASS / FAIL  (N warnings)
Tests:    PASS / FAIL  (X/Y, Z% coverage)
Security: PASS / FAIL  (N flags)
Diff:     N files

Verdict:  READY / NOT READY
Skipped:  <phase> — <왜 해당 안 되는지>
Fix next:
  1. ...
```

어느 phase 든 FAIL 이면 verdict 는 NOT READY 다. "거의 준비됨" 같은 건 없다.

## 연속 체크포인트

긴 작업에선 검증을 끝까지 모아두지 마라. 의미 있는 단위마다 체크포인트 — 함수 하나 끝, 컴포넌트 하나 완료, 태스크 전환 전. 체크포인트에서 잡은 회귀는 몇 분이지만, 열 번 더 변경한 뒤 잡은 건 bisect 로 오후를 날린다.

## 안티패턴

- 마무리 멘트로 "이제 될 거예요". should 는 is 가 아니다.
- 정작 재현 케이스는 다시 안 돌려본 채 전체 스위트 초록불을 인용.
- 세 번 편집 전에 돌렸던 빌드를 아직 초록이라고 선언.
- 건너뛴 phase 를 명시하지 않고 안 보이는 것처럼 취급.

## 경계

체크가 *왜* 실패하는지 알아내는 건 `diagnosing-bugs`. 애초에 테스트를 쓰는 건 `tdd`. 비결정적인 것의 신뢰도를 여러 실행으로 측정하는 건 `eval-harness`. 이 스킬은 완료를 주장하는 순간의 정직성 게이트, 즉 "done" 전의 증거를 다루며 — 위의 연속 체크포인트 모드는 같은 게이트를 작업 중 마일스톤마다 적용한 것이지 별도 스킬이 아니다.

## Attribution

두 업스트림을 결합. 핵심 원칙 — 주장보다 증거, "검증을 돌리지 않고 성공을 선언하지 마라" — 는 [obra/superpowers](https://github.com/obra/superpowers) (MIT) 의 `verification-before-completion` 에서 왔다. 구체적인 6-phase 파이프라인(build → types → lint → tests → security → diff), 구조화된 VERIFICATION REPORT 형태, 연속 체크포인트 모드는 [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) 의 `verification-loop` 에서 왔다. 이 레포에 맞게 병합·재작성 — ECC 의 `/verify` 커맨드와 훅 연동 노트를 뺐고, "전체 스위트로 추론 말고 실패하던 케이스를 직접 재실행" 규칙과 "건너뛴 phase 를 명시" 규율을 추가했으며, `diagnosing-bugs` / `tdd` / `eval-harness` 와의 경계를 긋고 한국어 트리거를 넣었다. THIRD_PARTY_NOTICES.md 참조.
