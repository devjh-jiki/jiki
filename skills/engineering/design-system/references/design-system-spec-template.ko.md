# design-system.md 스펙 템플릿

**설계** 패스의 산출 계약. 디자인 시스템은 "모던하고 깔끔" 산문이 아니라 — 명명된 토큰 + 그것을 쓰는 규칙이다. 이런 `design-system.md` *와* 머신리더블 토큰 파일(CSS 커스텀 프로퍼티, Tailwind 테마, 또는 DTCG JSON)을 동기화해 산출한다.

안 맞는 섹션은 빼라; 일반적 UX 조언으로 채우지 마라. 값이 추론된 것(스크린샷, 모호한 브리프)이면 추측을 사실로 제시하지 말고 신뢰도를 표시하고 열린 질문에 적어라.

```markdown
# <프로젝트> 디자인 시스템
**베이스:** Astryx (일반화) · **스택:** <React/StyleX | Tailwind | 기타> · **기준일:** YYYY-MM-DD

## 파운데이션
한 문단: 시각 의도를 쉬운 말로(예: "웜-중립, 에디토리얼, 코랄 악센트 하나")
+ 이 제품이 기대는 단일 시그니처 디테일.

## 베이스 토큰
날것의 값. 스케일별 표.

### Color (베이스)
| 토큰 | 값 |
|------|-----|
| color-neutral-50 | #... |
| color-accent-500 | #... |
...

### Spacing (베이스) — 4px 스케일
space-0…space-12 (+ 레이아웃 배수). 베이스 유닛 명시.

### Typography (베이스)
폰트 패밀리 + size/weight/line-height 램프(Display…Caption) + 폴백 스택.

### Radius / Elevation / Motion (베이스)
radius-sm…full · elevation-0…3 · motion-fast/base/slow + easing.

## 시맨틱 토큰
베이스를 참조하는 역할. 컴포넌트가 소비하는 게 이것.

| 시맨틱 역할 | → 베이스 토큰 | 용도 |
|-------------|--------------|------|
| color-text-primary | color-neutral-900 | 본문 |
| color-surface | color-neutral-50 | 페이지 배경 |
| color-surface-raised | white | 카드, 패널 |
| color-border | color-neutral-200 | 구분선 |
| color-accent | color-accent-500 | primary 액션 |
| space-section | space-12 (+) | 섹션 간 |
| radius-control | radius-md | 버튼, 인풋 |
...
(이 층 교체로 라이트 AND 다크 제공.)

## 컴포넌트
역할과 변형 — 각각 하나씩, 의도적으로.

- **Button**: primary / secondary / ghost — 토큰 참조, 크기, 상태(hover/active/disabled/focus).
- **Card**: 베이스 + 변형.
- **Input / 폼 필드**: 상태, 텍스트 ≥16px, 타겟 ≥44px.
- **Heading / Text**: 어느 타입 역할이 어느 용도에 매핑되나.
...

## 접근성 약속
- 대비: 본문 4.5:1, 큰 텍스트/UI 3:1 — 확인된 쌍 나열.
- 터치 타겟 ≥44×44; 모바일 인풋 ≥16px; 보이는 포커스.

## Do's와 Don'ts
이 시스템에 특정한 것(일반론 아님) 각 최소 3개.
- Do: `color-accent`는 primary 액션에만.
- Don't: 강조용으로 두 번째 브랜드색 도입 — weight/size로 해결.
...

## 열린 질문
추론·미정인 것, 신뢰도(high/medium/low)와 확인 방법.
- [medium] 악센트 hex를 스크린샷에서 추론; 브랜드 소스 대조 필요.
- [low] 다크모드 surface 램프 대비 미검증.
```

## 동반 토큰 파일

같은 결정을 머신리더블 토큰으로 산출해 코드가 소비하게. 스택에 맞는 형태를 고른다:

- **CSS 커스텀 프로퍼티**(`:root { --color-surface: #...; }` + `[data-theme="dark"]` 블록) — 가장 이식적.
- **Tailwind 테마**(`theme.extend.colors`, `spacing`, `borderRadius`) 같은 값 참조.
- **DTCG JSON**(`{ "color": { "surface": { "$value": "#...", "$type": "color" } } }`) — 도구 비종속, 핸드오프에 좋음.

시스템으로 만드는 규칙: **컴포넌트는 시맨틱 층만 참조**하고, 토큰 파일이 값이 정의되는 단 한 곳. 테마 변경은 시맨틱 토큰을 편집해서 — 컴포넌트를 건드려서가 절대 아니라.
