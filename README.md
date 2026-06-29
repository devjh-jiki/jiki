# jiki

> English: [README.en.md](./README.en.md)

개발자로서 활용하는 모든 자산을 한곳에서 찾고 관리하는 **공개 메타레포 / 인덱스 허브**입니다.
"그거 어디 적어뒀더라"를 없애는 것이 목표입니다.

> 비공개 자산(사이드 프로젝트 wiki, 일상/여행 기록, 공개하기 애매한 학습 노트)은 별도
> 프라이빗 레포 `vault` 에서 관리합니다. 이 레포에는 공개 가능한 것만 둡니다.

## 인덱스

| 영역 | 위치 | 설명 |
|------|------|------|
| Skills | [`skills/`](./skills) | 나만의 에이전트 스킬. 버저닝 + upstream 자동 동기화. Claude Code 플러그인으로 설치 가능 |
| MCP | [`mcp/`](./mcp) | 도구별 MCP 세팅. 어디에나 복붙 |
| Prompts | [`prompts/`](./prompts) | 자주 쓰는 프롬프트 명령어 |
| Learning / AI | [`learning/ai/`](./learning/ai) | 프론트엔드 개발자 관점 AI 학습 로드맵 + 자료 + 기록 |
| Snippets | [`snippets/`](./snippets) | 자주 쓰는 코드/설정 스니펫 |

## 스킬 마켓플레이스

스킬은 Claude Code 플러그인으로 설치할 수 있습니다.

```
/plugin marketplace add devjh-jiki/jiki
/plugin install learning-skills@jiki-skills
/plugin install writing-skills@jiki-skills
/plugin install business-skills@jiki-skills
```

또는 skills CLI:

```bash
npx skills@latest add devjh-jiki/jiki
```

### 신뢰도 라벨

스킬은 검증 단계로 표시합니다:

- **Available** — 직접 테스트·검증 완료. 외부 설치 권장.
- **Review** — 평가 중. 검증되면 Available 로 승격.
- **Private** — 개인 셋업 전용. 마켓플레이스 미포함.

| 스킬 | 단계 | 설명 |
|------|------|------|
| [write-blog-post](./skills/productivity/write-blog-post) | Available | 초안·학습을 jihoon 스타일 한국어 기술 블로그 글로 작성 (문체·SEO 가이드) |
| [grill-me](./skills/productivity/grill-me) | Available | 계획·의사결정·사업 아이디어를 스트레스 테스트하는 집요한 인터뷰 |
| [open-source-reverse-engineering-coach](./skills/learning/open-source-reverse-engineering-coach) | Available | 오픈소스를 인터랙티브 역공학으로 학습 |
| [technical-book-coach](./skills/learning/technical-book-coach) | Available | 기술 서적·문서 코칭 학습 (한글 번역 + 코칭) |
| [biz-opportunity-scout](./skills/business/biz-opportunity-scout) | Available | 사업 기회 검증 (TAM/SAM/SOM, 유닛 이코노믹스, PMF) + Go/No-Go |
| [marketing-copy](./skills/business/marketing-copy) | Available | 제품/기능을 한국어 마케팅 카피로 |
| [product-spec-builder](./skills/business/product-spec-builder) | Available | 거친 아이디어를 만들 수 있는 PRD 로 |
| [tdd](./skills/engineering/tdd) | Review | 레드-그린-리팩터 테스트 주도 개발 (mattpocock 참고) |
| [diagnosing-bugs](./skills/engineering/diagnosing-bugs) | Review | 체계적 버그 진단 루프 (mattpocock 참고) |
| [codebase-design](./skills/engineering/codebase-design) | Review | 깊은 모듈 설계 어휘 (mattpocock 참고) |
| [improve-codebase-architecture](./skills/engineering/improve-codebase-architecture) | Review | 아키텍처 심화 기회 스캔 + 리포트 (mattpocock 참고) |
| [to-prd](./skills/engineering/to-prd) | Review | 대화를 PRD 로 합성 (mattpocock 참고) |
| [to-issues](./skills/engineering/to-issues) | Review | 계획/PRD 를 수직 슬라이스 이슈로 분해 (mattpocock 참고) |
| [domain-modeling](./skills/engineering/domain-modeling) | Review | 도메인 모델·용어집·ADR 구축 (mattpocock 참고) |
| [grill-with-docs](./skills/engineering/grill-with-docs) | Review | 문서까지 만드는 grilling (mattpocock 참고) |
| [prototype](./skills/engineering/prototype) | Review | 설계 검증용 throwaway 프로토타입 (mattpocock 참고) |
| [handoff](./skills/productivity/handoff) | Review | 세션 인계 문서 생성 (mattpocock 참고) |
| [writing-great-skills](./skills/productivity/writing-great-skills) | Review | 스킬을 잘 쓰는 법 레퍼런스 (mattpocock 참고) |

## 관련 레포 (Organization)

| 레포 | 공개 | 설명 |
|------|------|------|
| [`jiki`](https://github.com/devjh-jiki/jiki) (이 레포) | 공개 | 인덱스 허브 |
| [`trending-newsletter`](https://github.com/devjh-jiki/trending-newsletter) | 공개 | GitHub trending 한글 뉴스레터 (3관점: 개발/창업/마케팅) |
| [`ai-playground`](https://github.com/devjh-jiki/ai-playground) | 공개 | AI 학습하며 만든 실습 프로젝트 |
| `vault` | 비공개 | 사이드 wiki + 일상/여행 기록 + 학습 노트 |

## 문서 정책

모든 문서는 **영어 원본 + 한국어 `.ko.md` 쌍**으로 관리합니다 (영어가 source of truth).
한쪽을 수정하면 다른 쪽도 같이 수정해야 하며, CI가 쌍 누락을 검사합니다. [CLAUDE.md](./CLAUDE.md) 참고.

## 라이선스

[MIT](./LICENSE) · 서드파티 출처: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
