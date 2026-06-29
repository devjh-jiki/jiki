# SEO 프론트매터 + 발행 전 체크리스트

write-blog-post 스킬의 SEO 규칙. SKILL.md 에서 참조한다.

## 프론트매터 형식

```yaml
---
emoji: [적절한 이모지]
title: '[짧고 명확한 제목]'
seoTitle: '[선택: 검색엔진용 긴 제목, 50~60자, 핵심 키워드 포함]'
date: '[YYYY-MM-DD]'
categories: [공백으로 구분된 카테고리]
description: '[메타 디스크립션, 120~160자, 핵심 키워드 포함]'
keywords: '[쉼표로 구분된 검색 타겟 키워드 5~8개, 롱테일 위주]'
---
```

## 각 필드 작성법

- **title**: 사이트 H1/카드 제목. 짧고 본질적으로. 예: `"추상화"`, `"도메인 모델"`
- **seoTitle** (선택): 짧은 title로 사이트 가독성을 지키면서 검색엔진엔 키워드를 노출하고 싶을 때.
  - `<title>`, OG, 트위터, JSON-LD `alternativeHeadline` 에 반영됨
  - 50~60자 권장 (구글 결과에서 안 잘리는 길이)
  - 메인 키워드 + 보조 키워드 + 액션/혜택 패턴. 예: `"프론트엔드 추상화, 좋은 코드를 위한 설계 원칙"`
  - 미지정 시 title이 자동 대체되므로 키워드 강화가 필요한 글에만 추가
- **description**: 글의 핵심과 독자가 얻을 가치를 명확히. 주요 검색 키워드 자연스럽게 포함.
- **keywords**: 구체적이고 검색량 있는 롱테일 위주. 한글/영문 혼용 가능. (예: "React Fiber, React 렌더링 원리")

## 발행 전 체크리스트 (필수)

실제 운영 데이터상 `description`/`keywords`가 비면 노출은 되어도 클릭이 0에 수렴한다. 메타데이터 누락은 곧 트래픽 손실이다.

- [ ] **description 120~160자**: 한글은 스니펫 픽셀 폭이 커 160자 이전에 잘릴 수 있으므로 초과 금지.
- [ ] **seoTitle 50~60자**: 구글 결과 제목이 안 잘리는 길이. 메인 키워드를 앞쪽에.
- [ ] **title과 seoTitle 역할 분리**: title은 짧은 표시용, seoTitle은 긴 검색용.
- [ ] **keywords는 실제 검색 쿼리 기반**: 가능하면 GSC 데이터로 실제 유입 쿼리 반영.
- [ ] **본문 첫 문단에 핵심 쿼리 자연 배치**: 구글 스니펫이 본문에서 생성되므로.
- [ ] **내부 링크 1개 이상**: 같은 카테고리 기존 글로 키워드 앵커 링크. topical authority 신호.
- [ ] **이미지 alt 텍스트**: 모든 본문 이미지에 설명 alt 작성.

## 비공개(임시 저장) 처리

- 미완성 글은 프론트매터 `categories`에 `ignore` 를 넣는다.
- `ignore`면 sitemap·RSS·목록·검색·개별 페이지·llms.txt 에서 완전 제외 + `noindex`.
- 발행 시 `ignore`를 실제 카테고리로 교체.

## GSC 데이터 활용 (jihoon-blog 기준)

- `pnpm gsc`로 최근 28일 vs 직전 28일 검색 데이터 수집 (`.gsc-data/`에 CSV + Quick Win/Cannibalization 분류).
- **Quick Win**: position 5~20 + 노출 높음 + CTR 낮은 쿼리 → 해당 글 seoTitle/description/첫 문단을 그 쿼리에 맞게 개선하면 즉시 효과.
- keywords는 추측이 아니라 GSC에서 실제 노출되는 쿼리를 우선 반영.
