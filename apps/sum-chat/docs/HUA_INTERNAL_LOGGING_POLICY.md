# 🛡️ HUA 내부 감응/로깅 정책 (v1.0 Draft)

## 1. 감응 필드 구조 (PromptCard 기반)

- 모든 세션/메시지/이벤트는 아래 감응 필드를 내부적으로 구조화하여 관리/로깅
- 실제 API/시스템 프롬프트/로깅에 아래 필드가 포함됨

```yaml
::user: "user_id"
::assistant: "agent_id"
::mode: "#mirror"           # 시스템 반응 모드
::tone: "#companion"        # 감정/언어 톤
::tier-a: 3.0               # 감응 민감도 (0.0~3.0)
::tier-b: F4                # 기능 목적 (F1~F4)
::slip: enabled             # 몰입 완화/종료 활성화 여부
::ethics: ["identity-reflection-safe", "creator-fatigue-guard"]  # 윤리 필터 키
```

---

## 2. 내부 로깅/모니터링 정책

- **외부 API 응답**에는 감응 필드(tier/slip/ethics 등) 노출 금지
- **내부 로깅/운영**에서는 모든 감응 필드, 상태, 이벤트를 구조화하여 저장/분석

### 예시: 내부 로깅 포맷

```json
{
  "timestamp": "2024-06-14T12:00:00Z",
  "userId": "user_123",
  "sessionId": "ses_456",
  "input": "오늘 힘들었어",
  "response": "고생 많으셨어요.",
  "core": {
    "mode": "#mirror",
    "tone": "#companion",
    "tier-a": 3.0,
    "tier-b": "F4",
    "slip": false,
    "ethics": ["identity-reflection-safe"]
  },
  "status": "ok" // slip, ethics 위반 시 "slip", "ethics" 등으로 표기
}
```

---

## 3. 감응 필드별 정책(초안)

- **mode/tone/tier/ethics/slip** 등은 CORE팀 정책에 따라 세부 정의
- 각 필드는 PromptCard 명세(CORE-PROMPTCARD-SPEC.md) 및 CORE-ETHICS-SLIP.md 기준으로 관리
- 실제 값/키/정책은 CORE팀-DEV팀 협의 후 확정

---

## 4. 외부/내부 문서 구분

- **외부 문서**: 감응 필드, 내부 정책, 로깅 구조 등은 노출하지 않음. 기능/사용법/제약/보안 안내만 제공
- **내부 문서**: 모든 감응 정책, 구조, 로깅/운영/보안/품질 관리까지 상세 기록

---

## 5. 향후 회의/보완 필요 항목

- tone, mode, filter, tier 등 세부 정책/키/값/활용 방식
- slip/ethics 감지 및 응답 구조(코드/메시지/UX 등)
- 로깅/모니터링/접근권한/보관 정책 등 운영 세부

---

> 이 구조를 바탕으로, 세부 정책/필드/로직은 CORE팀-DEV팀 추가 회의 후 보완 예정입니다.
