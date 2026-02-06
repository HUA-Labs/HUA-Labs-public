# Phase 2: 프롬프트 개선 & z축 도입 계획

**날짜**: 2026-02-01
**선행 PR**: Phase 1 어드민 일기 상세 UI 정리

---

## 1. z축: Approach-Avoidance (접근-회피 방향성)

### 개요
현재 HUA 좌표계는 Valence(x) × Arousal(y) 2차원. 같은 VA 좌표에서도 질적으로 다른 상태 구분 불가:
- 저V 저A + 접근 = 명상, 수용 / + 회피 = 무기력, 침체
- 고V 고A + 접근 = 창발적 몰입 / + 회피 = 과잉각성, 패닉

### 측정 방식: 하이브리드
- **1차 LLM**: `motivation_cues` (근거 텍스트 배열) 추출 → "~하고 싶다", "~에서 벗어나고 싶다" 등
- **2차 로직**: motivation_cues + emotion_flow 패턴으로 0.0~1.0 스코어 산출
  - 0.0 = 강한 회피 / 0.5 = 중립 / 1.0 = 강한 접근
- **이유**: LLM은 시그널 추출에 강하고, 수치 일관성은 로직이 나음

### 프롬프트 변경 (3개국어)
1차 분석 프롬프트에 `motivation_cues` 필드 추가:
```json
{
  "motivation_cues": {
    "approach": ["표현1", "표현2"],
    "avoidance": ["표현3"]
  }
}
```

### DB 스키마
- `hua_analysis` 테이블에 `approach_avoidance Float?` 추가
- `motivation_cues Json?` 추가

---

## 2. 프롬프트 품질 개선

### 현재 문제
- 감정요약/감응해석이 "텍스트를 데이터로 보고 요약 나열"하는 수준
- 현재 톤 = distanced empathy (거리 둔 공감)
- 유저 피드백: 더 밀착된 반응 필요

### 개선 방향

#### A. 기본 모드 (distanced empathy) 개선
현재도 단순 요약이 아니라 해석적이어야 함:
- "슬픔과 분노가 감지됩니다" (X, 나열)
- "무언가를 지키고 싶었던 마음이 좌절로 바뀌는 흐름이 느껴져요" (O, 해석)
- 감정 흐름의 **서사(narrative)**를 읽어주는 방향

#### B. 밀착 모드 (closer empathy) 신규
- 설정에서 유저 선택 가능
- 기본값: distanced (안전)
- closer 선택 시 온보딩 안내 필수

### 밀착 모드 안전장치
1. **enabling 금지 규칙**: "그럴 수밖에 없었어" 류 표현 프롬프트에서 명시적 금지
2. **ethics slip 감지 시**: 자동으로 distanced fallback
3. **위기 감지**: 기존 위기 감지 로직 유지, closer 모드에서도 동일 적용
4. **고지 문구**: "이 모드는 더 밀착된 감정 반영을 제공하지만, 전문 상담을 대체하지 않습니다"

---

## 3. 3개국어 프롬프트 관리

### 현재 구조 확인 필요
- 프롬프트가 단일 언어인지, 이미 분기되어 있는지 확인
- 언어별 감정 표현 뉘앙스가 다르므로 단순 번역 X
- 한국어: "~하고 싶다" / 영어: "I want to~" / 일본어: "~したい"
- motivation_cues 추출도 언어별 패턴 고려 필요

---

## 4. 설정 UI 변경

### 추가할 설정 항목
- **공감 모드**: distanced (기본) / closer
- closer 선택 시 확인 다이얼로그 + 안내 문구

### 파일 영향
- `settings` 페이지 UI
- `user_settings` 테이블에 `empathy_mode` 필드
- 분석 API에서 설정값 읽어서 프롬프트 분기

---

## 변경 파일 예상 (Phase 2)
```
apps/sum-diary/
├── app/lib/prompts/           # 프롬프트 템플릿 (3개국어)
├── app/api/diary/analyze/     # 분석 API (모드 분기, motivation_cues 처리)
├── app/(app)/settings/        # 설정 UI (공감 모드)
├── prisma/schema.prisma       # approach_avoidance, empathy_mode
└── app/(app)/admin/diaries/   # z축 표시
```

---

## 우선순위
1. 기본 모드 프롬프트 품질 개선 (가장 임팩트 큼)
2. z축 (approach-avoidance) 도입
3. 밀착 모드 설계 + 안전장치
4. 설정 UI
