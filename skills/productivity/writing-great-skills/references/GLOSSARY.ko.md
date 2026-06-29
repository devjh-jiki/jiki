# 용어집 — 좋은 스킬 만들기

좋은 스킬을 만드는 것에 대한 도메인 모델. 스킬은 확률적 시스템에서 결정성을 짜내기 위해 존재한다; 근본 미덕은 **Predictability(예측 가능성)** 이고, 아래 모든 용어는 그것에 대한 레버다. 이것은 [`writing-great-skills`](../SKILL.ko.md) 의 disclosed reference 다.

용어는 축별로 묶인다: **Invocation(호출)** (스킬에 어떻게 닿는가), **Information Hierarchy(정보 위계)** (콘텐츠가 어떻게 배치되는가), **Steering(조종)** (에이전트의 런타임 행동이 어떻게 빚어지는가), **Pruning(가지치기)** (어떻게 군살을 빼는가). 각 **failure mode(실패 모드)** 는 그것을 치료하는 레버 옆에 살며 _failure mode_ 로 태그된다.

어느 정의 안의 **굵은 용어**도 이 용어집에 정의돼 있다; 헤딩으로 찾는다.

## Predictability (예측 가능성)

스킬이 에이전트를 매 실행마다 같은 _방식_으로 행동하게 만드는 정도 — 같은 출력이 아니라 같은 과정(브레인스토밍 스킬은 _예측 가능하게_ 발산해야 한다; 토큰은 변하지만 행동은 안 변한다). 다른 모든 용어가 섬기는 근본 미덕 — 비용과 유지보수성은 그것의 경쟁자가 아니라 증상이다.

_Avoid_: consistency, reliability, robustness, output-determinism

## Invocation (호출)

스킬에 어떻게 닿는가 — 그리고 그 선택에 내는 두 load.

### Model-Invoked

**description** 필드를 유지하는 스킬, 그래서 에이전트가 그것을 보고 자율적으로 발동할 수 있고 — 사람도 여전히 이름을 칠 수 있어서, model-invocation 은 항상 user reach 를 _포함_한다. model 전용 상태는 없다: description 은 언제나 에이전트 발견을 _더할_ 뿐 사람의 것을 빼지 않는다. 그 발견 가능성의 대가로 매 턴 영구 **context load** 를 낸다. 다른 스킬이 닿을 수 있다, 그것을 에이전트가 발견 가능하게 만드는 description 이 호출 가능하게 만들기 때문이다. 콘텐츠가 전부 **reference** 인 model-invoked 스킬은 공유 reference 의 한 집이기도 하다: 다른 스킬이 그것을 호출할 수 있어, 여러 스킬이 필요로 하는 reference 가 한 곳에 산다. 에이전트가 스스로 스킬에 닿아야 할 때만 model-invocation 을 고른다; 손으로만 발동한다면 description 을 떼고 context load 를 안 낸다.

_Avoid_: ability, tool, capability

### User-Invoked

**description** 이 떼인 스킬 — 에이전트에게 보이지 않고 사람이 이름을 쳐야만 닿는다(user-_only_, **model-invoked** 는 user-_and-agent_). 에이전트 발견 가능성을 0 **context load** 와 맞바꾼다. description 이 없으므로 사람 외엔 아무것도 닿을 수 없다: 다른 어느 스킬도 그것을 발동 못 한다.

_Avoid_: procedure, workflow, command

### Description

스킬의 기계 판독 가능 트리거, 그리고 **model-invoked** 스킬이 항상 로드한 채로 두도록 강제되는 하나의 **context pointer**. 그것의 존재 자체가 호출 축이다: 유지하면 스킬은 model-invoked(그리고 다른 스킬이 닿을 수 있음); 지우면 스킬은 **user-invoked**, 사람만 닿는다. model-invoked 스킬의 **context load** 의 원천.

_Avoid_: frontmatter, summary

### Context Pointer

에이전트의 컨텍스트에 든 참조로, 컨텍스트 밖 자료를 이름 대고 그것에 닿는 조건을 인코딩한다. **description** 은 최상위 context pointer(컨텍스트 윈도우 → 스킬); disclosed 파일로의 포인터는 한 단계 아래의 같은 객체다. 그 대상이 아니라 문구가 에이전트가 _언제_ 닿는지 — 그리고 _얼마나 신뢰성 있게_ — 결정한다. 약하게 표현된 포인터 뒤의 필수 대상은 분산 버그다: 먼저 문구를 고치고, 날카롭게 하기가 실패할 때만 자료를 인라인한다.

_Avoid_: link, reference, import

### Context Load

**model-invoked** 스킬이 에이전트의 컨텍스트 윈도우에 부과하는 비용 — 그것의 **description**, 항상 로드되어 토큰과 주의를 모두 쓴다. **user-invoked** 스킬이 description 없음으로 벗어나는 것, 그리고 더 많은 model-invoked 스킬로 쪼개는 것의 제동.

_Avoid_: token cost, context bloat

### Cognitive Load

**user-invoked** 스킬이 사람에게 부과하는 비용 — 그들이 머릿속에 지녀야 하는 것: 어떤 스킬이 존재하고 각각 언제 손을 뻗을지(사람이 인덱스다). **model-invocation** 이 에이전트 발견 가능함으로 없애는 것, 그리고 더 많은 user-invoked 스킬로 쪼개는 것의 제동. 최소화할 비용이 아니다: 그것은 인간 주체성의 값이고, 어떤 스킬이 user-invoked 로 남는 이유다. 인간 판단이 중요한 곳에 쓰고; 중요하지 않은 곳에서 없앤다.

_Avoid_: human index, burden, overhead

### Router Skill

다른 user-invoked 스킬들을 가리키는 게 일인 **user-invoked** 스킬 — 각각과 언제 손을 뻗을지 이름을 대서 — 사람이 여럿 대신 하나의 스킬을 기억하게 한다. 힌트만 줄 수 있고 결코 발동 못 한다: user-invoked 스킬은 **description** 이 없어 사람 외엔 아무것도 닿을 수 없다. user-invoked 스킬이 불어날 때 **cognitive load** 의 치료.

_Avoid_: dispatcher, menu, registry, index, router procedure

### Granularity

스킬을 얼마나 잘게 나누느냐. 더 잘게 나눔은 두 load 중 하나를 쓴다: 더 많은 **model-invoked** 스킬은 **context load** 를 씀(더 많은 description 이 윈도우를 붐비고 주의를 두고 경쟁); 더 많은 **user-invoked** 스킬은 **cognitive load** 를 씀(사람이 기억하고 손 뻗을 게 더 많아짐). 두 절단이 나눔을 인도한다. **invocation** 별로, 그것을 트리거할 구별되는 **leading word** 가 있는 곳에서 model-invoked 스킬을 떼어낸다 — 당신이 실제로 프롬프트에 쓰는 트리거 단어. **sequence** 별로, 한 step 의 **post-completion steps** 를 숨겨야 하는 곳에서 **step** 의 연속을 쪼갠다, 그것을 자기 컨텍스트에 격리하면 뒤따르는 것이 치워지기 때문이다. 반대를 조심하라: 시퀀스를 합치면 각 step 의 post-completion steps 가 뒤따르는 것에 노출되어 premature completion 을 부른다.

_Avoid_: chunking, modularity

## Information Hierarchy (정보 위계)

스킬의 콘텐츠가 어떻게 배치되고, 각 조각이 사다리 어디까지 내려가 앉는가.

### Information Hierarchy

에이전트가 얼마나 즉시 필요로 하는지로 매긴 스킬의 콘텐츠 — 두 절단으로 만든 단일 사다리: 파일 내인가 포인터 뒤인가, 그리고 step 인가 reference 인가. 단들:

- **Steps** — 파일 내, 일차
- **Reference**, 파일 내 — 이차
- **Reference**, disclosed — **context pointer** 뒤

**step** 이 없는 스킬은 아래 두 단만 쓴다 — 흔히 정당하게 평평한 동급 집합(예: 리뷰의 모든 규칙이 한 단)이고, 냄새가 아니라 괜찮은 배치다. 위계는 호출과 독립적이다: 스킬은 전부 step, 전부 reference, 또는 둘 다든 model- 또는 user-invoked 일 수 있다. 스킬에 step 이 있을 때, disclose 돼야 할 파일 내 reference 가 그것들을 묻고 그것들에 주의하는 일을 동전 던지기로 만든다 — 가독성 레버일 뿐 아니라 분산 레버. 사다리 위를 읽을 만하게 유지하라; 내릴 수 있는 건 내려라.

_Avoid_: structure, organization, layout

### Steps

에이전트가 수행하는 순서 있는 행동 — 스킬에 그게 있을 때 콘텐츠의 일차 층위이자 SKILL.md 에서 자리를 버는 부분. 모든 스킬이 step 을 갖진 않는다: 스킬은 전부 step(`tdd`), 전부 **reference**(리뷰), 또는 둘 다일 수 있고, 호출과 독립적이다. 모든 step 은 **completion criterion**, 명확하든 모호하든, 으로 끝난다.

_Avoid_: workflow, instructions, choreography

### Reference

에이전트가 필요할 때 참조하는 자료 — 정의, 사실, 파라미터, 예시, 조건부 지시. 스킬에 **step** 이 있을 때 그것에 이차적이고; 없을 때 콘텐츠 전체이거나; 어느 스킬 밖에 산다 — **External Reference** 참고. **context pointer** 로 닿고, **progressive disclosure** 의 일순위 후보.

_Avoid_: supporting material, docs, background

### External Reference

스킬 시스템 밖에 사는 **Reference** — 평범한 파일, **description** 없음, **step** 없음, 호출 불가 — 로 어느 스킬이나 가리킬 수 있다. 스스로 발동할 필요 없는 공유 reference 의 집, 그리고 두 **user-invoked** 스킬이 쓸 수 있는 유일한 공유 집이다, 둘 다 description 이 없어 서로를 발동 못 하기 때문에.

_Avoid_: doc, resource, knowledge base

### Progressive Disclosure

**reference** 를 사다리 아래로 — SKILL.md 밖 **context pointer** 뒤로 — 옮겨 위가 읽을 만하게 유지함. 주로 토큰 최적화가 아니다; 그것은 **information hierarchy** 가 보호되는 방식이다. **branching** 이 허가한다: 일부 branch 만 필요한 것을 disclose 하고, 모든 경로가 필요한 것을 인라인하며, 포인터가 필수 자료에서 신뢰성 없이 발동하면 문구를 날카롭게 하고, 그게 실패할 때만 도로 인라인한다.

_Avoid_: lazy loading, chunking

### Co-location

에이전트가 한 번에 필요한 자료를 한 곳에 둠 — 한 개념의 정의, 규칙, 주의사항을 파일에 흩뜨리지 말고 단일 헤딩 아래 — 그래서 한 부분을 읽으면 그 이웃들이 따라온다. **Information Hierarchy** 의 파일 내 짝: 위계는 한 조각이 _얼마나 아래_ 앉는지 매기고; co-location 은 거기 앉은 뒤 _그 옆에 무엇이 앉는지_ 결정한다. **reference** 본문의 옳은 포맷에 대한 공식은 없다; 테스트는 스킬이 에이전트를 위해 쓰인 문서처럼 읽혀야 한다는 것이고, 묶인 자료가 흩어진 자료가 못 하는 식으로 그렇게 읽힌다. **Duplication** 과 구별된다: 그건 한 의미를 두 곳에 반복하고, 흩뜨림은 단일 의미를 여럿에 조각낸다.

_Avoid_: grouping, clustering, cohesion

### Sprawl

_Failure mode._ 그냥 너무 긴 스킬 — SKILL.md 에 줄이 너무 많음 — 그것들이 낡았든 반복됐든 무관하게. 전부 살아 있고 전부 고유한 스킬도 sprawl 할 수 있다. 가독성(에이전트가 행동 전에 더 헤치고, 주의가 잉여에 걸쳐 얇아짐), 유지보수성(여분 줄마다 **relevant** 하게 유지할 게 하나 더), 토큰을 쓴다. 치료는 **information hierarchy** 다: **reference** 를 **context pointer** 뒤로 밀고, **branch** 나 시퀀스별로 쪼개 각 경로가 필요한 것만 지게 한다. **sediment**(낡은 축적에서 온 길이)와 **duplication**(반복된 의미에서 온 길이)과 구별된다 — sprawl 은 원인이 무엇이든 길이 자체다.

_Avoid_: bloat, length, size, verbosity

## Steering (조종)

에이전트의 런타임 행동을 **Predictability** 쪽으로 빚는 레버들.

### Branch

스킬이 호출될 수 있는 구별되는 방식 — 스킬이 다루는 케이스 — 그래서 다른 실행이 그것을 통해 다른 경로를 밟는다. step 이 많은 스킬은 많은 branch 를 질 수 있고; 선형 스킬은 없다.

_Avoid_: path, case, fork

### Leading Word

압축된 개념 — _Leitwort_ 라고도 함 — 으로 모델의 사전학습에 이미 살고, 에이전트가 스킬을 돌리는 동안 그것으로 사고한다. 모델이 이미 가진 사전(prior)을 동원해 가장 적은 토큰으로 행동 원칙을 인코딩한다(예: _lesson_, _proximal zone of development_, _fog of war_, _tracer bullets_). 문장이 아니라 토큰으로 반복되어 스킬 전반에 분산된 정의를 쌓고 행동의 한 영역 전체를 닻 내린다. 직접 만든 단어도 명확히 정의하면 되지만, 지어낸 단어는 사전을 동원 못 한다 — 사전학습 단어가 공짜로 주는 것을 정의 토큰으로 낸다. 먼저 기존 단어에 손을 뻗어라.

leading word 는 **predictability** 를 두 번 섬긴다. 본문에서 **execution** 을 닻 내린다 — 개념이 나타날 때마다 에이전트가 같은 행동에 손 뻗고, 평평한 reference 안에선 찾을 사물의 부류에 주의를 모아 매 실행 옳은 검사를 동원한다. **description** 에서 **invocation** 을 닻 내린다 — 그리고 스킬 안에서만이 아니다: 같은 단어가 당신의 프롬프트, 문서, 코드베이스에 살면, 에이전트가 그 공유 언어를 스킬에 연결하고 더 신뢰성 있게 발동한다. 스킬을 원할 때 당신이 실제로 쓰는 leading word 로 description 을 표현하라.

_Avoid_: keyword, term, motif

### Completion Criterion

작업 단위가 끝났음을 에이전트에게 알리는 조건 — 그것이 견주는 목표. 두 속성이 그것을 품질이 아니라 레버로 만든다. 그것의 **clarity(명확성)** (에이전트가 끝남과 안 끝남을 구별할 수 있나?)는 **premature completion** 에 저항한다 — 모호한 경계("이해 도달")는 에이전트가 끝났다 선언하고 다음 step 으로 미끄러지게 한다; 이 축은 _step_ 이 있어야 문다, premature completion 이 step 사이 실패이기 때문. 그것의 **demand(요구)** (얼마나 요구하나)는 **legwork** 를 정한다 — "수정된 모든 모델이 설명됨" 은 철저한 작업을 강제하고 "변경 목록 생성" 은 안 한다 — 그리고 이 축은 _step 에 묶이지 않는다_: 평평한 reference 본문도 묶을 수 있고, 그것이 step 없는 스킬이 그래도 빠짐없음 막대("모든 규칙 적용됨")를 지는 방식이다. 가장 강한 기준은 확인 가능하면서 빠짐없다.

_Avoid_: done condition, exit condition, stopping rule

### Legwork

에이전트가 단일 step 안에서 무대 뒤로 하는 작업 — 파일 읽기, 코드베이스 탐색, 변경하기, 사용자에게 떠넘기지 않고 필요한 것을 파내기. step 구조 아래 산다: 결코 자기 step 으로 쓰이지 않고, 문구에 잠재하며, 스킬이 아니라 에이전트가 통제한다. **post-completion steps** 의 step 횡단 당김의 step 내 짝. **leading word**(_comprehensive_, _thorough_) 또는 작업이 빠짐없길 요구하는 **completion criterion** 이 올린다 — 평평한 reference 에 적용된 demand 축 포함, 그것이 평평한 reference 스킬이 모든 단을 덮게 모는 것. 그 demand 가 없거나 **premature completion** 이 step 을 잘라낼 때 얇아진다.

_Avoid_: scope, effort, diligence, coverage

### Post-Completion Steps

현재 step 을 뒤따르는 **step** 들. 보이면 에이전트를 **premature completion** 으로 앞당긴다 — 많이 볼수록 당김이 강하다; 방어는 step 의 연속을 둘로 쪼개 그것들을 숨기는 것.

_Avoid_: horizon, fog of war, lookahead

### Premature Completion

_Failure mode._ 에이전트의 주의가 작업이 아니라 끝남으로 미끄러져서, 현재 step 이 진짜로 끝나기 전에 끝냄. step 사이 실패: **step** 이 있어야 일어난다 — step 없는 스킬이 일찍 그만두는 건 premature completion 이 아니라 충족 안 된 demand 아래 얇은 **legwork** 다. 두 힘 사이의 줄다리기: 보이는 **post-completion steps**(앞으로의 당김)와 **completion criterion** 의 clarity(저항 — 날카롭고 확인 가능한 막대는 버티고; 모호한 건 무너진다). 모호함이 필요 조건이다: 날카로운 경계는 뒤 step 이 아무리 많이 보여도 당김에 저항하므로, 결코 서두르지 않는 step 은 방어가 필요 없다. 서두르는 step 을 두 레버가 잡지만, 순서대로 손 뻗는다: **먼저 경계를 날카롭게** — 국소적이고 싸다. 기준이 줄일 수 없게 모호하고 _또한_ 서두름을 실제 관찰할 때만 **뒤 step 들을 숨긴다** — 그리고 숨김은 실제 컨텍스트 경계를 넘어서만 작동한다(user-invoked 핸드오프 또는 서브에이전트 디스패치; 인라인 model-invoked 호출은 뒤 step 들을 컨텍스트에 남겨 아무것도 치우지 않는다). 얇은 legwork 의 한 원인이지만 그것과 구별된다: legwork 는 step 이 완전히 끝나도 얇을 수 있다.

_Avoid_: premature closure, the rush, rushing, shortcutting

## Pruning (가지치기)

스킬의 군살을 빼기 — 각 처방이 그것이 치료하는 실패와 짝.

### Single Source of Truth

각 의미가 정확히 하나의 권위 있는 장소에 사는 바라는 상태, 그래서 스킬 동작의 변경이 한 곳의 변경이 되게. **Duplication** 이 그것의 위반.

_Avoid_: home, canonical location

### Duplication

_Failure mode._ 하나 이상의 **single source of truth** 가 주어진 같은 의미. 유지보수(한 곳 바꾸면 다른 곳도 바꿔야), 토큰을 쓰고, 두드러짐을 부풀린다 — 의미를 반복하면 사다리상 실제 등급 너머로 가중된다. 의도적으로 토큰을 반복해(의미는 결코) 주의를 올리는 **leading word** 의 우연한 역.

_Avoid_: repetition, redundancy

### Relevance

한 줄이 여전히 스킬이 하는 일에 관계되나 — 무엇을 남길지의 렌즈. 줄은 작업에 결코 관계 안 됨(단순 설명, 또는 disclose 돼야 할 **branch**) 또는 낡음으로 relevance 를 잃는다: 그것이 기술하는 행동이나 세계가 변하며 시대에 뒤처짐. 더 짧은 스킬이 relevant 하게 유지하기 쉽다, 줄마다 확인이 더 싸기 때문. **no-op** 과 구별된다: relevance 는 줄이 행동을 바꾸나가 아니라 작업에 관계되나를 묻는다.

_Avoid_: load-bearing, staleness, freshness

### Sediment

_Failure mode._ 스킬에 가라앉아 결코 치워지지 않는 낡은 콘텐츠 층들, 추가는 안전하게 제거는 위험하게 느껴져서 — 낡고 무관한 줄이 쌓이고 여전히 살아 있는 것을 찾으려 그것들을 뚫고 내려가야 한다. 가지치기 규율 없는 모든 스킬의 기본 운명; **duplication** 의 반복된 의미와 달리 **relevance** 의 느린 침식.

_Avoid_: accretion, bloat, cruft, rot

### No-Op

_Failure mode._ 모델이 이미 기본으로 해서 아무것도 바꾸지 않는 지시 — 어차피 할 일을 에이전트에게 말하려 load 를 낸다. 테스트: 줄이 기본 대비 행동을 바꾸나? 줄은 완벽히 **relevant** 하면서도 no-op 일 수 있다. **leading word** 를 공짜로 만드는 같은 사전이 no-op 을 무가치하게 만든다.

leading word 는 _기법_; No-Op 은 줄에 대한 _판정_ — 그리고 둘은 교차한다. 기본을 못 이길 만큼 약한 leading word 는 no-op 이고(에이전트가 이미 그럭저럭 철저할 때 _be thorough_), 고침은 판정을 통과하는 더 강한 단어(_relentless_)지 다른 기법이 아니다. 그래서 No-Op 테스트 — 기본 대비 행동을 바꾸나? — 는 leading word 가 그 반복을 버는지 채점하는 방법이기도 하다. 이건 독자 상대가 아니라 모델 상대다: 줄이 no-op 인지 두고 의견이 갈리는 둘은 기본에 대해 의견이 갈리고, 논쟁이 아니라 스킬을 돌려서 정한다.

_Avoid_: redundant instruction, restating the obvious, belaboring
