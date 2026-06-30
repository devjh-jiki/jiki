# docs-app — 재사용 정적 문서 빌더

design-system 스킬(Astryx 토큰 기반)을 따르는 **무프레임워크 정적 문서 사이트 빌더**.
Markdown을 넣으면 토큰 기반 정적 HTML 사이트가 나온다. 런타임 의존성 0 (Mermaid만 CDN).

> 왜 이렇게: docs 셸(3컬럼 레이아웃·다크모드·scroll-spy·prose 스타일)은 프로젝트마다 똑같다.
> 그래서 **고정 자산**으로 한 번만 만들고, 프로젝트별로 변하는 것(`tokens.css` 테마 + 콘텐츠 `*.md`)만 갈아끼운다.
> Docusaurus 대비: 빌드 1개 스크립트, 산출물은 순수 HTML/CSS/JS.

## 무엇이 들어있나

```
docs-app/
├── build.mjs        # 빌더: md → 정적 HTML (frontmatter, _category_.json, ```mermaid, :::callout 처리)
├── shell.html       # 페이지 셸 템플릿 (플레이스홀더를 빌더가 치환)
├── tokens.css       # 기본 테마 (cool-neutral + indigo). 프로젝트는 이걸 복사·override
├── assets/
│   ├── styles.css   # 레이아웃 — 전부 tokens.css의 semantic 토큰만 참조
│   └── app.js       # 테마 토글, scroll-spy, 모바일 사이드바, 검색
└── package.json     # 빌드 의존성: markdown-it, highlight.js (빌드타임 전용)
```

## 빠른 시작 (소비자 프로젝트)

1. **의존성 설치** (템플릿 디렉토리에서 한 번):
   ```bash
   cd <this-template>
   pnpm install   # 또는 npm install
   ```

2. **소비자 프로젝트에 `docs.config.json` 작성**:
   ```json
   {
     "title": "Projects Wiki",
     "lang": "ko",
     "docsDir": "docs",
     "outDir": "build",
     "tokens": "tokens.css",
     "topbarLinks": [{ "label": "GitHub", "href": "https://github.com/you/repo" }],
     "port": 3000
   }
   ```

3. **빌드 / 개발 서버**:
   ```bash
   node <template>/build.mjs            # docs.config.json 읽어 build/ 생성
   node <template>/build.mjs --serve    # 빌드 후 http://localhost:3000
   ```

## 콘텐츠 규칙 (Docusaurus 호환)

빌더는 Docusaurus 문서 관례를 그대로 읽는다 — 기존 문서를 거의 손대지 않고 이식할 수 있다:

| 기능 | 표기 | 동작 |
|------|------|------|
| 페이지 제목 | frontmatter `title` > 첫 `# H1` > `sidebar_label` | `<title>` + breadcrumb |
| 사이드바 라벨/순서 | `sidebar_label`, `sidebar_position` | 좌측 nav |
| 루트 경로 | `slug: /` | `index.html` 로 출력 |
| 그룹(폴더) | `<group>/_category_.json` (`label`,`position`,`link.id`) | 사이드바 그룹·정렬·그룹 제목 링크 |
| 다이어그램 | ` ```mermaid ` 코드블록 | 브라우저에서 Mermaid CDN 렌더 (라이트/다크 자동) |
| Admonition | `:::note` `:::tip` `:::warning` `:::danger` `...` `:::` | `.callout` 박스 |
| 내부 링크 | `/kalyx/overview` 같은 절대 doc 링크 | 상대 `.html` 경로로 재작성 |
| 코드 하이라이트 | ` ```ts ` 등 | highlight.js → `--code-*` 토큰 팔레트 |

## 테마(re-brand)

`tokens.css` **한 파일만** 고친다. semantic 토큰(`--color-surface`, `--color-accent`, 타입 램프, 간격)을
프로젝트 디자인 시스템에 맞추면 레이아웃이 알아서 따라온다. 라이트는 `:root`, 다크는 `[data-theme="dark"]`.
소비자 프로젝트는 자체 `tokens.css`를 두고 `docs.config.json`의 `"tokens"`로 가리키면 된다(템플릿 원본 미수정).

## 검색

빌드 시 `search-index.json`(제목·breadcrumb·본문 발췌)을 생성한다. 상단 검색창은 이걸 fetch해서
클라이언트 필터링한다. `⌘K`/`Ctrl K` 로 포커스, 방향키+Enter 로 이동.

## 출력 배포

`build/` 는 순수 정적 파일이라 GitHub Pages·Netlify·S3 어디든 그대로 올린다.
서브패스 배포(예: `you.github.io/repo/`)는 상대경로로 빌드되므로 추가 설정 불필요.
