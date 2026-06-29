# Skills

매일 쓰는 나만의 에이전트 스킬 모음. [Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) 표준을 따릅니다.

## 설치

```bash
npx skills@latest add <your-org>/dev-hub
```

## 버킷

| 버킷 | 용도 | README 등재 |
|------|------|-------------|
| `engineering/` | 매일 하는 코드 작업 | O |
| `productivity/` | 비코드 워크플로우(블로그, 학습 등) | O |
| `personal/` | 내 셋업 전용 | X |
| `in-progress/` | 미완성 초안 | X |
| `deprecated/` | 더 이상 안 씀 | X |

## 등재된 스킬

### Engineering

**User-invoked** (사람이 `/명령`으로만 실행)

- _(아직 없음 — 첫 스킬을 추가하세요)_

**Model-invoked** (작업에 맞으면 에이전트가 자동 사용)

- _(아직 없음)_

### Productivity

**User-invoked**

- [write-blog-post](./productivity/write-blog-post/SKILL.md) — 학습/개발 내용을 기술 블로그 글 초안으로 작성

**Model-invoked**

- _(아직 없음)_

## upstream 동기화

[mattpocock/skills](https://github.com/mattpocock/skills) 등 검증된 외부 레포의 변경분은
`.github/workflows/sync-upstream-skills.yml` 가 주기적으로 감지해 **PR로 제안**합니다.
PR을 검토하고 내 기준에 맞는 것만 머지하세요.
