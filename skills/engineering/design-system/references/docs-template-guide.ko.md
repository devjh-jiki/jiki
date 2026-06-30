# Docs 템플릿 가이드

번들된 `assets/docs-template/` 사용법 — design-system 토큰으로 완전히 구동되는, 의존성 없는 자립형 문서 사이트. 사용자가 Docusaurus 같은 프레임워크를 세우지 않고 docs 사이트(사이드바 내비 + 산문 + 페이지 내 TOC)를 원할 때 읽는다.

## 템플릿 구성

```
assets/docs-template/
├── index.html    # docs 셸: 상단바, 좌측 사이드바, 산문 콘텐츠, 우측 TOC,
│                 # 다크모드 토글, 스크롤스파이. 모든 스타일이 tokens.css 에서 읽힌다.
└── tokens.css    # 네가 테마하는 파일. 베이스 -> 시맨틱 토큰 (라이트 + 다크).
```

브라우저에서 바로 열린다 — 빌드, npm, 프레임워크 없음. 폰트(Inter/Fraunces/JetBrains Mono)만 외부 의존성이며 자유롭게 교체·자체호스팅 가능.

구조는 Docusaurus·Stripe 등 좋은 docs 사이트가 수렴하는 검증된 레이아웃 — 3컬럼(내비 / 읽기 좋은 콘텐츠 / 페이지 내 TOC), 스티키 상단바, 명확한 산문 계층 — 이지만, 네가 소유하는 순수 HTML/CSS다.

## 적용법

1. **복사**: `docs-template/`를 프로젝트에 (예: `cp -r docs-template my-project/docs`).
2. **`tokens.css`만 테마**하라. 시맨틱 토큰을 프로젝트 디자인 시스템에 맞게: `design-system.md`의 같은 `--color-surface`, `--color-accent`, 타입 램프, spacing. 라이트는 `:root`, 다크는 `[data-theme="dark"]`에서 같은 역할을 오버라이드. 레이아웃이 전부 여기서 읽으므로, 재테마는 파일 하나.
3. **콘텐츠 투입** (`index.html`): 사이드바 링크(섹션별 그룹), 산문 컬럼(TOC·스크롤스파이가 작동하도록 제목에 `id`), 제목을 미러링한 페이지 내 TOC.
4. **다중 페이지**: 페이지 셸을 문서별로 복제하고 사이드바·상단바를 페이지 간 동일하게 유지(내비 안정성). 현재 페이지의 사이드바 링크에 `class="active"`.

## 이미 처리된 것 (재구축 금지)

- **3컬럼 반응형 셸** — 1100px 이하에서 TOC, 768px 이하에서 사이드바 접힘.
- **다크모드** — 상단바 토글, `localStorage` 저장, `prefers-color-scheme` 존중. `<html>`의 `data-theme`를 뒤집고 토큰이 나머지 처리.
- **스크롤스파이** — 화면에 보이는 제목이 우측 TOC와 좌측 사이드바 양쪽에서 하이라이트(IntersectionObserver).
- **산문 스타일** — 제목 리듬, 읽기 좋은 줄 길이(`--content-max`, ~75자), 가로 스크롤 코드블록, 인라인 코드, 인용, 표, 토큰으로 만든 콜아웃(`.callout`, `.callout.warn`) — 프레임워크 불필요.
- **접근성** — 시맨틱 랜드마크(`nav`/`main`/`header`), `aria-label`, 포커스 가능한 컨트롤, 두 surface에서 WCAG-AA를 만족하는 악센트 색.

## 튜닝 노트

- **가독성 먼저.** docs 사이트 대부분은 산문이다. `--content-max`를 줄당 ~75자 너머로 넓히지 마라. 맞춤 작업 전에 제목 램프와 코드블록 대비부터 튜닝.
- **악센트 하나.** 링크, 활성 내비, TOC 표시가 모두 `--color-accent`를 쓴다. `tokens.css`에서 바꾸면 사이트 전체가 따라온다.
- **구조는 유지.** 템플릿의 가치는 docs 골격이 일관되고 해결돼 있다는 것. 토큰으로 리스킨하고, *구조*가 정말 바뀌어야 할 때만 레이아웃을 건드려라.
- **`design-system.md` 스펙이 여전히 구동.** 템플릿의 `tokens.css`는 그 토큰이 안착하는 자리일 뿐. 프로젝트에 이미 디자인 시스템이 있으면 새 값을 짓지 말고 거기서 `tokens.css`를 테마하라.
