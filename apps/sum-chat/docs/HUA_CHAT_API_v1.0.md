# 📄 HUA_CHAT_API_v1.0.md

## 🧭 개요

- GPT 기반 대화 인터페이스 API
- 감정 반응 스타일(mode, tone) 선택 가능
- 슬립 감지/윤리 차단은 UX 기반 안내 방식(내부 정책/로깅은 비공개)

---

## 🔑 인증

- JWT 기반 로그인 세션 사용
- 별도 API Key 없음 (카카오/구글 OAuth 연동)

---

## 🧱 엔드포인트

### 📌 대화 생성: `POST /api/hua`

#### 요청 필드

| 필드       | 타입    | 설명                                 |
|------------|---------|--------------------------------------|
| input      | string  | 사용자 입력 메시지                   |
| config     | object  | 감응 구성값 (mode, tone 등)          |
| session_id | string  | 세션 식별자 (선택)                   |

```json
{
  "input": "오늘 하루 너무 힘들었어",
  "config": {
    "mode": "listener",
    "tone": "warm"
  },
  "session_id": "abc123"
}
```

#### 응답 예시

```json
{
  "response": "그런 날도 있죠. 그래도 이렇게 말해줘서 고마워요.",
  "status": "ok",
  "session_id": "abc123"
}
```

---

### 📌 메타 정보 조회: `GET /api/meta`

#### 설명

- 현재 API 버전, 상태, 최종 수정일 등 메타 정보를 반환합니다.
- 클라이언트는 이 엔드포인트로 API 버전 호환성, 운영 상태 등을 확인할 수 있습니다.

> 요청 예시

- Method: `GET`
- URL: `/api/meta`

> 응답 예시

```json
{
  "api_version": "1.0",
  "status": "stable",
  "last_updated": "2025-05-19"
}
```

---

### 📋 감응 프리셋 예시 (실제 조합 기반)

| 이름         | mode        | tone         | 샘플 응답 예시                      |
|--------------|-------------|--------------|-------------------------------------|
| 일상 대화    | casual      | warm         | "어떻게 지내세요?"                  |
| 조언/통찰    | oracle      | professional | "이런 관점에서 보면..."             |
| 공감/위로    | companion   | warm         | "그건 정말 힘드셨겠어요."           |
| 분석/논리    | analyst     | analytical   | "이 문제를 체계적으로 분석해보면..."|
| 경청/피드백  | listener    | neutral      | "네, 계속 말씀해주세요."            |

> ※ 프리셋/조합은 CORE팀-DEV팀 논의 후 언제든 확장/수정 가능

---

### 🛠 에러 응답 구조 예시

```json
{
  "error": {
    "code": "missing_input",
    "message": "입력 메시지가 필요합니다"
  },
  "status": "error"
}
```

---

### 📝 tone/mode 조합별 응답 예시 (실제 샘플 기반)

#### 1. mode: "casual", tone: "warm"**

```json
{
  "response": "오늘 하루는 어땠나요? 편하게 이야기해 주세요.",
  "status": "ok"
}
```

#### **2. mode: "oracle", tone: "professional"**

```json
{
  "response": "맥락을 고려할 때, 조금 더 여유를 가지는 것도 좋은 방법입니다.",
  "status": "ok"
}
```

#### **3. mode: "companion", tone: "warm"**

```json
{
  "response": "그런 상황이 정말 힘드셨겠어요. 함께 고민해볼게요.",
  "status": "ok"
}
```

#### **4. mode: "analyst", tone: "analytical"**

```json
{
  "response": "데이터에 따르면, 충분한 휴식이 스트레스 해소에 도움이 됩니다.",
  "status": "ok"
}
```

#### **5. mode: "listener", tone: "neutral"**

```json
{
  "response": "네, 계속 말씀해 주세요.",
  "status": "ok"
}
```

> ※ 실제 조합/응답 예시는 CORE팀-DEV팀 논의 후 언제든 보완/확장 가능합니다.

---

### 🎛 감응 구성(config)

| 필드 | 예시         | 설명                                 |
|------|--------------|--------------------------------------|
| mode | "listener"   | 시스템 반응 방식 (내부적으로 #mirror 등 매핑) |
| tone | "warm"       | 언어 스타일 (내부적으로 #companion 등 매핑) |
| tier | (생략 가능)  | 내부 평가에 따라 자동 조정됨                |

> ※ slip, ethics 등은 외부 입력 불가. 감지 시 UX 메시지로만 안내됨.

---

### 🛡 슬립/윤리 응답 UX 예시

```json
{
  "response": "잠시 쉬어갈게요. 감정이 깊어지고 있어요.",
  "status": "slip",
  "resume_hint": "계속할게 라고 말하면 다시 이어집니다"
}
```

---

## 📊 사용량 및 세션 제한

- 1 사용자당 최대 10개 세션 가능
- 슬립 발생 횟수, 누적 대화 수에 따라 등급 자동 평가 (내부 tier 시스템 연동, 외부 노출 없음)

---

## 📦 SDK 예시

### **Node.js**

```js
fetch('/api/hua', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    input: '안녕',
    config: { mode: 'listener', tone: 'warm' }
  })
});
```

### **Python**

```python
import requests
res = requests.post('https://yourdomain.com/api/hua', json={
  "input": "안녕", "config": { "mode": "listener", "tone": "warm" }
})
```

---

## 🧭 메타 정보

- **작성자:** DEV팀 / **검토:** CORE팀
- **최종 수정일:** 2025-05-19
- **버전:** 1.0

---

### 📌 운영 원칙 요약

- 감응 구조(PromptCard 기반)는 내부적으로만 적용, 외부에는 최소 정보만 노출
- slip/ethics 등 내부 정책/로깅은 [HUA_INTERNAL_LOGGING_POLICY.md] 기준 별도 운영
- 외부 개발자는 UX 기반 안내 메시지와 안전한 API만 활용

---

## 🧩 확장/운영 제안 (v1.0+)

### 📌 버전 관리 정책 및 메타 엔드포인트

- API 버전 및 상태 관리는 `/api/meta`(GET) 등 별도 엔드포인트에서 제공 가능
- 예시 응답:

```json
{
  "api_version": "1.0",
  "status": "stable",
  "last_updated": "2025-05-19"
}
```

### 🛠️ 향후 기능 스텁 구조 예시

- 감정 분석, 세션 종료 등 확장 기능을 위한 파라미터/구조 예시

```json
{
  "input": "지금 기분이 이상해",
  "config": { "mode": "analyst", "tone": "neutral" },
  "features": ["emotion_score"]
}
```

- features 파라미터는 추후 확장 기능(감정 점수, 요약, 추천 등) 요청에 활용 가능

### 🌐 REST 연동 가이드 (CORS/오리진 등)

- 모든 엔드포인트는 CORS 정책에 따라 허용된 오리진에서만 호출 가능
- 인증/세션 쿠키는 same-origin 또는 secure context에서만 전달됨
- API 연동 시 반드시 HTTPS 사용 권장
- 요청 헤더: `Content-Type: application/json` 필수
- 예시:

```http
OPTIONS /api/hua
Origin: https://yourdomain.com
Access-Control-Request-Method: POST
```

- 응답 헤더 예시:

```text
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```
