---
name: handoff
description: 현재 대화를 다른 에이전트(또는 새 세션)가 이어받을 수 있도록 인계 문서로 압축한다. 사용자가 "인계 문서", "핸드오프", "hand off", "handoff", "다음 세션에 넘겨줘", "이어서 작업하게 정리해줘" 라고 하거나, 마무리하면서 맥락을 보존하고 싶을 때 사용한다. mattpocock/skills 에서 가져왔다. (영어 원본 SKILL.md 의 한국어 번역본)
disable-model-invocation: true
---

# handoff

새 에이전트가 작업을 이어갈 수 있도록 현재 대화를 요약한 인계 문서를 작성하라. 현재 워크스페이스가 아니라 사용자 OS 의 임시 디렉토리에 저장하라. 임시 디렉토리는 `$TMPDIR` 에서 해결하고 `/tmp`(Windows 는 `%TEMP%`)로 폴백하며, `<tmpdir>/handoff-<timestamp>.md` 에 써라. 사용자에게 절대 경로를 알려주고 — 새 에이전트는 임시 디렉토리를 들여다볼 줄 모르므로 — 다음 세션이 실제로 시작될 곳(`NEXT.md`, 작업 트래커, 또는 커밋/PR 설명)에 그 경로를 가리키는 한 줄 포인터를 남길지 제안하라. 인계 문서는 다음 세션이 찾을 수 있어야만 쓸모가 있다.

다음 에이전트가 실행해야 할 스킬을 나열하는 **"Suggested skills"** 섹션을 포함하라(예: `to-prd`, `improve-codebase-architecture`, `diagnosing-bugs`, `grill-me`).

다른 산출물(PRD, 계획, ADR, 이슈, 커밋, diff)에 이미 담긴 내용을 중복하지 마라. 대신 경로나 URL 로 참조하라.

민감 정보는 가려라 — API 키, 비밀번호, 토큰, 또는 개인 식별 정보.

사용자가 다음 세션이 무엇에 집중할지 설명했다면, 그것을 목표로 삼아 문서를 맞춰라.

## 오너 / 리더십 렌즈

CEO/CTO/CFO/PM 를 겸하는 개발자에게 인계는 글로 하는 위임이다:

- **좋은 인계는 위임과 방치의 차이다.** 목표, 이미 내린 결정, 단 하나의 다음 행동을 적어 다음 에이전트(또는 사람)가 맥락을 다시 유도하지 않고 시작하게 하라 — 그것이 당신이 자리를 비울 수 있게 하는 것이다.
- **"무엇"만이 아니라 "왜"를 포착하라.** 결정과 그 이유가 비싼 부분이다; 코드는 다시 읽을 수 있지만 의도는 그럴 수 없다. 무엇은 산출물로 참조하고, 왜는 적어라.
- **민감정보 가리기는 거버넌스 습관이다.** 인계 파일은 세션을 떠난다 — 키나 PII 가 따라가게 하지 마라.

## 출처

[mattpocock/skills `handoff`](https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff) (MIT) 에서 가져와 확장. THIRD_PARTY_NOTICES.md 참고.
