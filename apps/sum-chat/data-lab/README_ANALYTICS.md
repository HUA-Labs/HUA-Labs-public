# 🧪 HUA 감응 로그 분석 스타터킷

이 문서는 HUA 데이터 분석가를 위한 MongoDB 실전 가이드입니다.

---

## 1. MongoDB Compass/Atlas Web UI 접속법

1. Atlas 계정 생성 및 프로젝트/클러스터 생성
2. Connection String(URI) 확인 (예: `mongodb+srv://...`)
3. MongoDB Compass 실행 → URI 입력 후 접속
4. 주요 컬렉션: `users`, `sessions`, `messages`

---

## 2. 샘플 쿼리 예시

### 1) 최근 슬립 발생 로그 조회

```js
// messages 컬렉션에서 slip=true인 최근 10개
{
  slip: true
}
```

### 2) tone 분포 집계

```js
// messages 컬렉션에서 tone별 개수 집계
[
  { $group: { _id: "$tone", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]
```

### 3) tier 변화 추적 (세션별)

```js
// messages 컬렉션에서 session_id별 tier_a 평균
[
  { $group: { _id: "$session_id", avg_tier_a: { $avg: "$tier_a" } } },
  { $sort: { avg_tier_a: -1 } }
]
```

### 4) 윤리 위반 로그 조회

```js
// messages 컬렉션에서 ethics 배열에 특정 키워드 포함
{
  ethics: "creator-fatigue-guard"
}
```

### 5) slip 발생 직전 대화 패턴

```js
// slip=true인 메시지의 session_id, timestamp 기준 이전 메시지 추출
// (MongoDB aggregation 또는 코드로 후처리)
```

---

## 3. 감응 로그 JSON 구조 설명

```json
{
  "timestamp": "2024-06-14T09:00:00Z",
  "user_id": "user001",
  "session_id": "sess001",
  "input": "오늘 너무 힘들었어...",
  "response": "그런 날도 있죠. 힘내세요!",
  "mode": "#companion",
  "tone": "#warm",
  "tier_a": 2.5,
  "tier_b": "F3",
  "slip": false,
  "ethics": ["identity-reflection-safe"]
}
```

- **timestamp**: 메시지 생성 시각(UTC)
- **user_id**: 사용자 식별자
- **session_id**: 세션 식별자
- **input**: 사용자 입력 메시지
- **response**: 챗봇 응답
- **mode**: 감응 모드(예: #companion, #oracle 등)
- **tone**: 감정/언어 톤(예: #warm, #analytical 등)
- **tier_a**: 감응 민감도(수치)
- **tier_b**: 기능 목적 분기(F1~F4)
- **slip**: 슬립(몰입 완화/종료) 여부
- **ethics**: 윤리 필터 키워드 배열

---

## 4. 주요 분석 포인트 (주석)

- **mode/tone 사용 비율**: 사용자별 감정 흐름 스타일 파악
- **tier 상승/하락 트렌드**: 감정 피로 누적 여부 탐지
- **slip 발생 직전 대화 패턴**: 감정 몰입 지점 클러스터링
- **윤리 위반 트리거 단어 분포**: 필터 설계 보완용 인사이트
- **GPT 응답과 사용자 반응 비교**: 감응 품질 추정(향후 감응스코어화)

---

> 향후 확장: /notebooks, /queries, /dashboards 폴더에 실험/분석/시각화 자료 추가 가능
