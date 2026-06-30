# Misc 스킬

> English: [README.md](./README.md)

다른 버킷의 일상 코드/글쓰기 스킬과 달리, 특정 환경을 설정하는 일회성 setup 스킬을 모은다. 각각 특정 런타임이나 생태계를 겨냥하니, 꺼내기 전에 description 을 읽어라.

**모델 호출** (맥락이 맞으면 자동 사용)

- [git-guardrails](./git-guardrails/SKILL.ko.md) — 위험한 git 명령(push, reset --hard, clean -f, branch -D, checkout/restore .)을 막는 Claude Code PreToolUse hook 설치. Claude Code 전용.
- [setup-pre-commit](./setup-pre-commit/SKILL.ko.md) — lint-staged(Prettier)·타입체크·테스트를 도는 Husky pre-commit hook 설치. JavaScript/TypeScript 전용.

둘 다 **Available**(실사용 검증 완료)이며 [mattpocock/skills](https://github.com/mattpocock/skills) 에서 가져왔다. [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md) 참고.
