# devjh-jiki

개발자로서 활용하는 모든 자산을 한곳에서 찾고 관리하는 **공개 메타레포 / 인덱스 허브**입니다.
"그거 어디 적어뒀더라"를 없애는 것이 목표입니다.

> 비공개 자산(사이드 프로젝트 wiki, 일상/여행 기록, 공개하기 애매한 학습 노트)은 별도
> 프라이빗 레포 `vault` 에서 관리합니다. 이 레포에는 공개 가능한 것만 둡니다.

## 인덱스

| 영역 | 위치 | 설명 |
|------|------|------|
| 🧩 Skills | [`skills/`](./skills) | 매일 쓰는 나만의 에이전트 스킬. 버저닝 + upstream 자동 동기화 |
| 🔌 MCP | [`mcp/`](./mcp) | 도구별 MCP 세팅 모음. 어디에나 복붙 가능 |
| 💬 Prompts | [`prompts/`](./prompts) | 자주 쓰는 프롬프트 명령어 모음 |
| 📚 Learning / AI | [`learning/ai/`](./learning/ai) | 프론트엔드 개발자 관점 AI 학습 로드맵 + 자료 + 기록 |
| ✂️ Snippets | [`snippets/`](./snippets) | 자주 쓰는 코드/설정 스니펫 |

## 관련 레포 (Organization)

| 레포 | 공개 | 설명 |
|------|------|------|
| [`jiki`](https://github.com/devjh-jiki/jiki) (이 레포) | 공개 | 인덱스 허브 |
| [`trending-newsletter`](https://github.com/devjh-jiki/trending-newsletter) | 공개 | GitHub trending 한글 번역 뉴스레터 (3관점: 프론트/창업/마케팅) |
| [`ai-playground`](https://github.com/devjh-jiki/ai-playground) | 공개 | AI 학습하며 만든 실습 프로젝트 |
| `vault` | 비공개 | 사이드 wiki + 일상/여행 기록 + 학습 노트 |

## 원칙

- **문서·복붙 자산은 모은다** (skills/mcp/prompts/learning → 이 레포)
- **자동 실행·배포·독립성이 필요한 것만 떼어낸다** (newsletter, playground → 독립 레포)
- **비공개는 분리한다** (wiki/일상 → vault)
- **프롬프트가 반복 절차가 되면 skill 로 승격한다**

## 라이선스

[MIT](./LICENSE)
