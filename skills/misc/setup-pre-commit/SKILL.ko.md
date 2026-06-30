---
name: setup-pre-commit
description: Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when the user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing. This is for the JavaScript/TypeScript (Husky) ecosystem — if the repo isn't Node-based, say so and suggest the language-native equivalent (e.g. pre-commit framework for Python) rather than forcing Husky.
---

# setup-pre-commit

스테이지된 파일에 lint-staged(Prettier)를 돌린 뒤 타입체크와 테스트를 실행하는 Husky pre-commit hook 을 설치해, 깨졌거나 포맷 안 된 코드가 커밋되지 못하게 한다.

> JavaScript/TypeScript 전용. Husky 는 `package.json` 에 산다. `package.json` 이 없으면 이 스킬은 해당 없음 — 사용자에게 그 언어의 네이티브 pre-commit 도구를 안내하라.

## 무엇을 설치하나

- **Husky** pre-commit hook
- 스테이지된 파일에 Prettier 를 돌리는 **lint-staged**
- **Prettier** 설정 (없을 때만)
- hook 에 연결된 **typecheck** 와 **test** 스크립트 (레포에 실제로 있는 것만)

## 단계

### 1. 패키지 매니저 감지

`package-lock.json`(npm), `pnpm-lock.yaml`(pnpm), `yarn.lock`(yarn), `bun.lockb`(bun) 를 확인한다. 있는 것을 쓰고, 불분명하면 npm 기본. 아래 모든 명령에서 일관되게 쓴다.

### 2. dev 의존성 설치

감지한 패키지 매니저로 `husky`, `lint-staged`, `prettier` 를 devDependencies 로 설치한다.

나중에 스테이지하기 전에 `node_modules/` 가 gitignore 됐는지 확인한다 — 없으면 `.gitignore` 에 추가한다. lint-staged 의 `"*"` glob 은 탐욕적이다: 이게 없으면 `git add .` 가 의존성을 휩쓸어 lint-staged 가 수백 개 `node_modules` 파일을 포맷하려 들고(그 안의 중첩 설정에 걸리기도 한다).

### 3. Husky 초기화

```bash
npx husky init
```

`.husky/` 를 만들고 `package.json` 에 `prepare: "husky"` 스크립트를 추가한다.

### 4. `.husky/pre-commit` 작성

Husky v9+ 는 shebang 불필요. 빠른 스테이지 전용 단계를 먼저, 그다음 더 무거운 검사:

```
npx lint-staged
npm run typecheck
npm run test
```

**가정하지 말고 현실에 맞춰라:** `npm` 을 감지한 매니저로 바꾸고, 레포의 `package.json` 에 `typecheck` 나 `test` 스크립트가 없으면 그 줄을 빼고 건너뛰었다고 알린다 — 없는 스크립트를 부르는 hook 은 매 커밋을 실패시킨다. `"test": "echo \"Error: no test specified\" && exit 1"`(`npm init -y` 가 쓰는 것) 같은 placeholder 스텁은 *없는 것으로* 취급한다 — 돌리면 똑같이 매 커밋을 실패시키니, 연결하지 말고 제거한다.

### 5. `.lintstagedrc` 작성

```json
{ "*": "prettier --ignore-unknown --write" }
```

`--ignore-unknown` 은 Prettier 가 파싱 못 하는 파일(이미지 등)을 건너뛴다.

### 6. `.prettierrc` 작성 (없을 때만)

Prettier 설정이 이미 있으면 건너뛴다 — 프로젝트 스타일을 덮어쓰지 않는다. 없으면 합리적 기본값(2칸, 탭 없음, 80 width, 큰따옴표, es5 trailing comma, 세미콜론, always-parens 화살표).

### 7. 검증

완료 기준 — 다음이 모두 참:

- [ ] `.husky/pre-commit` 이 존재하고 실행 가능
- [ ] `.lintstagedrc` 존재
- [ ] `package.json` 의 `prepare` 스크립트가 `"husky"`
- [ ] Prettier 설정 존재
- [ ] `npx lint-staged` 가 깨끗이 실행됨

### 8. 커밋을 스모크 테스트로

전부 스테이지하고 `Add pre-commit hooks (husky + lint-staged + prettier)` 로 커밋한다. 이 커밋은 새 hook 을 *통과해* 돌아간다 — 통과하면 설정이 엔드투엔드로 동작한 것. 그 커밋이 형식이 아니라 테스트다.

## 오너 / 리더십 렌즈

CEO/CTO/CFO/PM 를 겸하는 개발자에게, pre-commit hook 은 품질을 왼쪽으로 옮긴 것이다:

- **가장 싼 순간에 싼 결함을 잡는다.** 커밋 시점에 잡힌 포맷 잡음·타입 에러·깨진 테스트는 리뷰어, CI 분(分), 동료의 pull 에 결코 닿지 않는다. 가장 이른 게이트가 가장 싼 게이트다.
- **팀의 기준을 한 번 인코딩한다.** 새 팀원과 에이전트가 말 안 해도 같은 바를 물려받는다 — hook 이 곧 기준이지, 아무도 안 읽는 위키 페이지가 아니다.
- **빠르게 유지하지 않으면 우회된다.** lint-staged 가 스테이지된 파일만 도는 데는 이유가 있다; hook 이 느려지면 사람들은 `--no-verify` 에 손대고 게이트는 사라진다. 일상적으로 건너뛰는 가드레일은 가치가 0 으로 감가된다.

## 출처

[mattpocock/skills `setup-pre-commit`](https://github.com/mattpocock/skills/tree/main/skills/misc/setup-pre-commit) (MIT) 에서 가져와 확장. THIRD_PARTY_NOTICES.md 참고.
