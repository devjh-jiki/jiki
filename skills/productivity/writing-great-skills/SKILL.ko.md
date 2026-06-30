---
name: writing-great-skills
description: 에이전트 스킬을 잘 쓰고 편집하기 위한 레퍼런스 — 스킬을 예측 가능하게 만드는 어휘와 원칙. 사용자가 SKILL.md 를 쓰거나, 리뷰하거나, 리팩터하거나, 개선하려 하거나, "스킬 어떻게 잘 쓰지", "이 스킬 다듬어줘", "write a skill", "review my skill", "good skill 작성법" 라고 하거나, model-invoked vs user-invoked, 레퍼런스 파일로 무엇을 disclose 할지, 또는 스킬을 어떻게 prune 할지 결정할 때 사용한다. mattpocock/skills 에서 가져옴. (영어 원본 SKILL.md 의 한국어 번역본)
disable-model-invocation: true
---

스킬은 확률적 시스템에서 결정성을 짜내기 위해 존재한다. **예측 가능성(Predictability)** — 같은 출력을 내는 게 아니라 매 실행마다 같은 _과정_을 밟는 에이전트 — 이 근본 미덕이다; 아래 모든 레버가 그것을 섬긴다.

**굵은 용어**는 [`references/GLOSSARY.md`](references/GLOSSARY.ko.md) 에 정의돼 있다; 전체 의미는 거기서 찾는다.

## 호출 (Invocation)

서로 다른 비용을 맞바꾸는 두 선택:

- **model-invoked** 스킬은 **description** 을 유지해서 에이전트가 자율적으로 발동할 수 있고 _또한_ 다른 스킬이 닿을 수 있다(이름을 직접 칠 수도 있다). 이건 **context load** 에 기여한다 — description 이 매 턴 윈도우에 앉아 있다. 메커니즘: `disable-model-invocation` 을 생략하고, 풍부한 트리거 표현("Use when the user wants…, mentions…")을 가진 모델 대상 description 을 쓴다.
- **user-invoked** 스킬은 description 을 에이전트의 손이 닿는 곳에서 떼어낸다: 오직 당신이 이름을 쳐야 발동할 수 있고 — 다른 어느 스킬도 못 한다. context load 는 0 이지만 **cognitive load** 를 쓴다: _당신_이 그것이 존재함을 기억해야 하는 인덱스다. 메커니즘: `disable-model-invocation: true` 설정; `description` 은 사람 대상이 된다 — 한 줄 요약, 트리거 목록 제거.

에이전트가 스스로 스킬에 닿아야 하거나 다른 스킬이 닿아야 할 때만 model-invocation 을 고른다. 손으로만 발동한다면 user-invoked 로 만들고 context load 를 안 낸다. (둘 다 안 쓸 때의 기본값: `disable-model-invocation` 을 생략하면 스킬은 **model-invoked** 다 — description 이 있는 상태가 곧 model-invoked.)

user-invoked 스킬이 기억할 수 있는 한계를 넘어 불어나면, 그 쌓인 cognitive load 는 **router skill** 로 치료한다: 다른 것들과 각각 언제 손을 뻗을지 이름을 대는 하나의 user-invoked 스킬.

## description 쓰기

model-invoked **description** 은 두 일을 한다 — 스킬이 무엇인지 진술하고, 그것을 트리거해야 할 **branch** 들을 나열한다. 모든 단어가 **context load** 를 늘리므로, description 은 본문보다 더 가혹한 가지치기를 받는다:

- **스킬의 leading word 를 앞세운다** — description 은 그것이 호출 작업을 하는 곳이다.
- **branch 당 트리거 하나.** 단일 branch 를 다시 이름 붙인 동의어는 **duplication** 이다 — "build features using TDD … asks for test-first development" 는 한 branch 를 두 번 쓴 것이다. 합친다; 진짜로 구별되는 branch 만 남긴다.
- **본문에 이미 있는 정체성은 자른다.** description 은 트리거와, 있다면 "다른 스킬이 필요할 때…" 도달 절로 유지한다.

## 정보 위계 (Information hierarchy)

스킬은 두 콘텐츠 유형 — **step** 과 **reference** — 으로 지어지며 자유롭게 섞인다: 스킬은 전부 step, 전부 reference, 또는 둘 다일 수 있다. 핵심 결정은 어느 것을 쓰고 각각이 **정보 위계** — 에이전트가 자료를 얼마나 즉시 필요로 하는지로 매긴 사다리 — 의 어디에 앉느냐다:

1. **스킬 내 step** — `SKILL.md` 의 순서 있는 행동, 일차 층위: 에이전트가 순서대로 하는 것. 각 step 은 **completion criterion**, 즉 작업이 끝났음을 에이전트에게 알리는 조건으로 끝난다. _확인 가능_하게(에이전트가 끝남과 안 끝남을 구별할 수 있나?) 그리고 중요한 곳에선 _빠짐없이_("수정된 모든 모델이 설명됨", "변경 목록 생성" 이 아니라) 만든다 — 모호한 기준은 **premature completion** 을 부른다. 확인 가능하고 빠짐없는 기준은 보통 에이전트가 검증할 수 있는 카운트나 불변식을 가진다, 예: "evaluations == records × rules" 가 "꼼꼼히 확인함" 을 이긴다. step 에는 앞 가장자리도 있다: **input contract** 는 스킬이 돌기 전에 무엇이 있어야 하는지와 없을 때 무엇을 할지(묻거나 리다이렉트, 절대 지어내지 않기)를 명명한다. 모호한 "묻기 vs 진행" 경계가 실제 스킬에서 가장 흔한 약점이다; 어떤 빈틈이 스킬을 멈추고 어떤 빈틈은 명시한 가정으로 채우는지 밝혀라.
2. **스킬 내 reference** — `SKILL.md` 의 정의, 규칙, 또는 사실, 필요할 때 참조. 흔히 정당하게 평평한 동급 집합(리뷰의 모든 규칙이 한 단)이다 — 냄새가 아니라 괜찮은 배치. _이 스킬은 전부 reference 다._
3. **External reference** — `SKILL.md` 밖 별도 파일로 밀어낸 reference, **context pointer** 로 닿고, 포인터가 발동할 때만 로드된다. (_disclosed_ reference — `GLOSSARY.md` 같은 형제 파일, 여전히 스킬의 일부 — 부터 스킬 시스템 밖에 살며 어느 스킬이나 가리킬 수 있는 완전한 **external reference** 까지 걸친다.)

까다로운 completion criterion 은 철저한 **legwork** — 에이전트가 작업 안에서 하는 파기 — 을 몰아붙인다, 스킬에 step 이 있든 없든, "모든 규칙 적용됨" 이 평평한 reference 를 묶는 것이 "모든 step 완료됨" 이 시퀀스를 묶는 것과 똑같기 때문이다.

너무 적게 내리면 위가 부풀고; 너무 많이 내리면 에이전트가 실제로 필요한 자료를 숨긴다. 그 긴장이 결정의 전부다.

**Progressive disclosure** 는 사다리를 내려가는 움직임 — `SKILL.md` 밖 링크된 파일로 — 이라 위가 읽을 만하게 유지된다. 메커니즘: 스킬 폴더 내 링크된 `.md` 파일, 담은 것에 맞춰 이름 짓는다(이 스킬은 전체 정의를 `references/GLOSSARY.md` 로 disclose 한다). 어떤 스킬은 한 가지 이상으로 쓰이고, 각 구별되는 방식이 **branch** — 다른 실행이 스킬을 통해 다른 경로를 밟음 — 이다. Branching 은 가장 깔끔한 disclosure 테스트다: 모든 branch 가 필요한 것은 인라인하고, 일부 branch 만 닿는 것은 포인터 뒤로 민다. **context pointer** 의 _문구_가, 그 대상이 아니라, 에이전트가 언제 그리고 얼마나 신뢰성 있게 자료에 닿는지 결정한다.

사다리가 한 조각이 _얼마나 아래_에 앉는지 결정하는 반면, **co-location** 은 거기 앉은 뒤 _그 옆에 무엇이 앉는지_ 결정한다: 한 개념의 정의, 규칙, 주의사항을 흩뜨리지 말고 한 헤딩 아래 둬서, 한 부분을 읽으면 그 이웃들이 따라오게 한다.

## 언제 쪼갤까

**Granularity** 는 스킬을 얼마나 잘게 나누느냐이고, 각 절단이 두 load 중 하나를 쓰므로, 절단이 값을 할 때만 쪼갠다. 두 절단:

- **호출별** — 그것을 스스로 트리거해야 할 구별되는 **leading word** 가 있거나 다른 스킬이 닿아야 할 때 **model-invoked** 스킬을 떼어낸다. 새로 항상 로드되는 **description** 에 대해 **context load** 를 내므로, 그 독립적 도달이 값해야 한다.
- **시퀀스별** — 아직 앞에 남은 step 들(한 step 의 **post-completion steps**)이 에이전트가 눈앞의 것을 서두르게(**premature completion**) 유혹할 때 **step** 의 연속을 쪼갠다. 그것들을 시야 밖에 두면 에이전트가 현재 작업에 더 많은 **legwork** 를 하도록 부추긴다.

## 가지치기 (Pruning)

각 의미를 **single source of truth** 에 둔다: 하나의 권위 있는 장소, 그래서 동작을 바꾸는 게 한 곳 편집이 되게.

모든 줄의 **relevance** 를 확인한다: 그게 여전히 스킬이 하는 일에 관계되나?

그다음 **no-op** 을 줄 단위가 아니라 문장 단위로 사냥한다: 각 문장을 격리해 no-op 테스트를 돌리고, 하나가 실패하면 단어를 다듬지 말고 문장 전체를 지운다. 공격적으로 — 실패하는 대부분의 산문은 다시 쓸 게 아니라 없애야 한다.

## leading word

**leading word** 는 모델의 사전학습에 이미 사는 압축된 개념으로, 에이전트가 스킬을 돌리는 동안 그것으로 사고한다(예: _lesson_, _fog of war_, _tracer bullets_). 텍스트 전반에 반복되면(꼭 그럴 필요는 없다 - 강한 leading word 는 한 번만 필요할 수도) 분산된 정의를 쌓고, 모델이 이미 가진 사전(prior)을 동원해 가장 적은 토큰으로 행동의 한 영역 전체를 닻 내린다.

이것은 예측 가능성을 두 번 섬긴다. 본문에서 _실행_을 닻 내린다: 단어가 나타날 때마다 에이전트가 같은 행동에 손을 뻗는다. description 에서 _호출_을 닻 내린다: 같은 단어가 당신의 프롬프트, 문서, 코드에 살면, 에이전트가 그 공유 언어를 스킬에 연결하고 더 신뢰성 있게 발동한다.

스킬을 leading word 를 쓰도록 리팩터할 기회를 사냥한다. 세 곳에 펼쳐진 삼인조(**duplication**), 한 아이디어를 가리키는 데 문장 하나를 쓰는 description — 각각은 단일 토큰으로 **collapse** 하길 애원하는 구절이다. 예:

- "fast, deterministic, low-overhead" -> _tight_ — 한 단계에 걸쳐 다시 진술된 한 품질 — 을 단일 사전학습 단어로(a _tight_ loop).
- "a loop you believe in" -> _red_ — 모호한 게이트를 이진 관찰 가능 상태로 변환(루프가 버그에서 _red_ 가 되거나, 안 된다).

두 배로 이긴다: 더 적은 토큰, _그리고_ 에이전트가 사고를 걸 더 날카로운 고리. 모든 스킬이 leading word 가 은퇴시킬 재진술을 지고 있다고 가정하라 — 가서 찾아라.

## 실패 모드

사용자가 스킬에서 겪는 문제를 진단하는 데 쓴다.

- **Premature completion** — step 이 진짜로 끝나기 전에 끝내기, 주의가 _끝남_ 쪽으로 미끄러짐. 방어, 순서대로: 먼저 completion criterion 을 날카롭게(싸고 국소적); 그게 줄일 수 없게 모호하고 _또한_ 서두름을 관찰할 때만, 쪼개서 post-completion steps 를 숨긴다(시퀀스 절단).
- **Fabricated input** — premature completion 의 앞단 쌍둥이: 필요한 입력 없이 스킬이 돌며 그것을 지어낸다(규칙 없는 "valid", 논의 없는 PRD) — 자신만만한 쓰레기를 낳는다. 해법은 명시적 **input contract** — 필요가 빠지면 묻거나 리다이렉트, 절대 지어내지 않기.
- **Duplication** — 같은 의미가 둘 이상의 장소에. 유지보수와 토큰을 쓰고, 한 의미의 사다리상 두드러짐을 실제 등급 너머로 부풀린다.
- **Sediment** — 추가는 안전하게 느껴지고 제거는 위험하게 느껴져서 가라앉은 낡은 층들. 가지치기 규율 없는 모든 스킬의 기본 운명.
- **Sprawl** — 모든 줄이 살아 있고 고유해도 그냥 너무 긴 스킬. 가독성과 유지보수성을 해치고 토큰을 낭비한다. 치료는 사다리다: **reference** 를 포인터 뒤로 disclose 하고, **branch** 나 시퀀스별로 쪼개 각 경로가 필요한 것만 지게 한다.
- **No-op** — 모델이 이미 기본으로 따르는 줄이라, 아무것도 말하지 않으려 load 를 낸다. 테스트: 그게 기본 대비 행동을 바꾸나? 약한 leading word(에이전트가 이미 그럭저럭 철저할 때 _be thorough_)는 no-op 이다; 고침은 다른 기법이 아니라 더 강한 단어(_relentless_)다.

## 오너 / 리더십 렌즈

개발자이자 CEO/CTO/CFO/PM 인 사람에게, 스킬 라이브러리는 단순 설정이 아니라 지적 재산이다:

- **잘 쓴 스킬은 복리로 쌓이는 재사용 가능한 조직 자산이다.** 각각은 안 그러면 매번 다시 설명할 과정을 인코딩한다 — 신입에게, 에이전트에게, 미래의 당신에게. 라이브러리는 레버리지다: 과정을 한 번 쓰고, 영원히 결정적으로 돌린다.
- **스킬 라이브러리를 IP 로 다뤄라.** 예측 가능한 스킬은 *당신의 팀이 어떻게 일하는지*에 대해 포착된 결정이다. 가치는 산문이 아니라, 그 행동이 이제 당신 없이도 반복 가능하다는 것이다.
- **가지치기는 자산의 유지보수다.** Sediment 와 sprawl 은 당신의 과정 IP 에 낀 기술 부채다. 두 번 같은 방식으로 돈다고 아무도 믿지 않는 스킬은 0 으로 감가됐다 — 규율이 자산을 장부에 남긴다.

## 출처

[mattpocock/skills `writing-great-skills`](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-great-skills) (MIT) 에서 가져와 확장. THIRD_PARTY_NOTICES.md 참고.
