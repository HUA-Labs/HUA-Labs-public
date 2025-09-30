# HUA data-lab: 데이터 분석가 온보딩 가이드

## 1. 소개

HUA 챗봇 시스템의 감응(Emotion) 로그, 슬립/윤리/티어 정책 등 다양한 데이터를 분석하기 위한 data-lab 환경입니다. 이 가이드는 데이터 분석가가 실험, 쿼리, 대시보드 구축을 빠르게 시작할 수 있도록 작성되었습니다.

---

## 2. 폴더 구조

```text
data-lab/
├── logs/                # 샘플 감응 로그 (JSON, 10개 예시)
├── schemas/             # Mongoose 스키마 예시
├── queries/             # 샘플 쿼리/분석 스크립트
├── dashboards/          # 대시보드/리포트 예시 (추가 예정)
├── README.md            # 본 안내문
```

---

## 3. 샘플 데이터 예시 (logs/sample_log1.json)

```json
{
  "sessionId": "sess_001",
  "userId": "user_123",
  "message": "안녕, 오늘 기분이 어때?",
  "assistant": "안녕하세요! 오늘은 기분이 상쾌하네요.",
  "emotion": "positive",
  "slip": false,
  "ethics": true,
  "tier": "A",
  "timestamp": "2024-06-01T09:00:00Z"
}
```

> logs/ 폴더에 10개 샘플 로그가 있습니다. 실제 운영 로그와 구조 동일합니다.

---

## 4. 스키마 예시 (schemas/emotionLog.schema.js)

```js
const mongoose = require('mongoose');

const EmotionLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  assistant: { type: String, required: true },
  emotion: { type: String, required: true },
  slip: { type: Boolean, required: true },
  ethics: { type: Boolean, required: true },
  tier: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('EmotionLog', EmotionLogSchema);
```

---

## 5. 분석 환경 접속

- **MongoDB Compass** 등 GUI 툴로 운영 DB 접속 가능 (접속 정보는 별도 제공)
- 샘플 쿼리 및 데이터 확인 가능

---

## 6. 샘플 쿼리 예시 (queries/emotion_count.js)

### MongoDB Aggregation (감응별 빈도수 집계)

```js
// emotion_count.js
// 감응(emotion)별 빈도수 집계

db.emotionlogs.aggregate([
  { $group: { _id: "$emotion", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```

### Python(pymongo) 예시 (slip 발생률)

```python
# slip_rate.py
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017')
db = client['hua']
logs = db['emotionlogs']

total = logs.count_documents({})
slip_count = logs.count_documents({'slip': True})
print(f"slip rate: {slip_count/total:.2%}")
```

---

## 7. 분석 포인트 (예시)

- 감응(emotion) 분포 및 변화 패턴
- slip/tier/ethics 정책별 로그 추이
- 세션별 대화 흐름 및 이탈 분석
- heatmap, slip rate, tier drift 등
- TODO: 추가 분석 포인트는 README에 주석으로 남겨주세요.

---

## 8. 확장/협업 안내

- 추가 분석 스크립트/대시보드는 `queries/`, `dashboards/`에 PR로 제출
- 분석 포인트/아이디어는 README에 TODO로 남기거나 이슈로 등록
- 커밋 메시지: `[data-lab] ...` 형식 권장

---

## 9. 참고/문의

- 시스템 구조, 정책, 데이터 필드 등 문의: 담당자(Devin) 또는 리듬이(어시스턴트)
- 운영 DB/접속 정보 등은 별도 전달

---

**이 문서만 읽고 바로 실험/분석 시작 가능합니다!**
추가 요청/질문은 언제든 환영합니다.
