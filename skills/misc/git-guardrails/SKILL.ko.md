---
name: git-guardrails
description: Set up a Claude Code PreToolUse hook that blocks dangerous git commands (push, reset --hard, clean -f, branch -D, checkout ., restore .) before they execute. Use when the user wants to prevent destructive or irreversible git operations, add git safety hooks, or stop an agent from pushing/force-resetting in Claude Code. This targets Claude Code's hook system specifically — if the user is on another agent runtime, say so rather than installing a hook that won't fire.
---

# git-guardrails

위험한 git 명령을 Claude 가 실행하기 전에 가로채 막는 PreToolUse hook 을 설치한다. 에이전트는 해당 명령에 권한이 없다는 메시지를 보고, 작업은 실행되지 않는다.

> Claude Code 전용. 이 hook 은 Claude Code 의 `PreToolUse` 메커니즘에 의존한다. 다른 런타임에서는 발동하지 않으니, 죽은 hook 을 설치하지 말고 사용자에게 알려라.

## 무엇이 막히나

- `git push` (모든 변형, `--force` 포함)
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

## 단계

### 1. 범위 묻기

**이 프로젝트만**(`.claude/settings.json`) 설치할지, **모든 프로젝트**(`~/.claude/settings.json`)에 설치할지 묻는다 — 영향 범위가 다르니 가정하지 않는다.

### 2. hook 스크립트 복사

번들 스크립트는 [scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh) 다. 범위에 맞는 위치에 복사하고 `chmod +x` 한다:

- **프로젝트**: `.claude/hooks/block-dangerous-git.sh`
- **전역**: `~/.claude/hooks/block-dangerous-git.sh`

### 3. settings 에 hook 추가

해당 settings 파일의 `hooks.PreToolUse` 배열에 병합한다 — 다른 설정을 덮어쓰지 않는다.

**프로젝트** (`.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh" }
        ]
      }
    ]
  }
}
```

**전역** (`~/.claude/settings.json`): 같은 형태, `"command": "~/.claude/hooks/block-dangerous-git.sh"` 로.

### 4. 커스터마이즈 묻기

막을 패턴을 추가/제거할지 묻고, 복사한 스크립트를 그에 맞게 편집한다. 스크립트는 tool input 파싱에 `jq` 를 쓴다 — `jq` 가 없으면 hook 이 fail open 한다(아무것도 안 막음). 설치하거나 알려라.

### 5. 검증

완료 기준: 실제로 막혀야 할 명령이 정말 0 이 아닌 코드로 종료된다. 돌려서 확인한다:

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | <스크립트-경로>
```

종료 코드 `2` 와 stderr 의 `BLOCKED` 메시지가 나와야 한다. 테스트 안 한 hook 은 없는 hook 이다.

## 오너 / 리더십 렌즈

CEO/CTO/CFO/PM 를 겸하는 개발자에게, 가드레일은 되돌릴 수 없는 손실에 대한 싼 보험이다:

- **막히는 작업들이 곧 비가역적인 것들이다.** force-push 나 `reset --hard` 는 어떤 리뷰로도 복구 못 하는 작업을 파괴할 수 있다. 5분을 들여 파괴 경로를 불가능하게 만드는 건 백업 정책과 같은 거래다 — 구해주는 날까지 체감이 안 될 뿐이다.
- **신뢰를 경계심에서 메커니즘으로 옮긴다.** 피곤할 때 잘못된 명령을 결코 안 치길 바라는 대신, 잘못된 명령이 아예 안 돌아간다. 비용 크고 빈도 낮은 실수에는 규율보다 메커니즘이 이긴다.
- **범위는 정책 선택이다.** 전역은 모든 레포를 기본 보호하고, 프로젝트별은 샌드박스 레포를 느슨하게 둔다. 기본값에 맡기지 말고 의도적으로 정해라.

## 출처

[mattpocock/skills `git-guardrails-claude-code`](https://github.com/mattpocock/skills/tree/main/skills/misc/git-guardrails-claude-code) (MIT) 에서 가져와 확장. THIRD_PARTY_NOTICES.md 참고.
