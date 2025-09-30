# 🧪 HUA API 테스트 가이드

이 문서는 HUA API의 주요 엔드포인트와 기능을 **직접 테스트**하는 방법을 매우 상세하게 안내합니다. (Postman, curl 등 활용)

---

## 1. `/api/meta` 엔드포인트 테스트

### 1) Postman 사용법

- Postman 실행 → 새 요청 생성
- Method: **GET**
- URL: `http://localhost:3000/api/meta` (로컬 기준, 배포 시 실제 도메인)
- [Send] 클릭

- **예상 결과**  

  ```json
  {
    "api_version": "1.0",
    "status": "stable",
    "last_updated": "2025-05-19"
  }
  ```

- **실패 시**: 404/500 등 에러 발생 시, 서버 실행 상태 및 파일 경로 확인

### 2) curl 사용법

```bash
curl http://localhost:3000/api/meta
```

- 위와 같은 JSON이 출력되면 성공

---

## 2. `/api/hua` features 파라미터 테스트

### 1) Postman

- Method: **POST**
- URL: `http://localhost:3000/api/hua`
- Body (raw/JSON):

  ```json
  {
    "input": "지금 기분이 이상해",
    "config": { "mode": "analyst", "tone": "neutral" },
    "features": ["emotion_score"]
  }
  ```
  
- [Send] 클릭
- **예상 결과**  
  - 에러 없이 정상 응답, 또는 안내 메시지 ("해당 기능은 준비 중입니다." 등)
- **실패 시**: 400/500 에러 발생 시, 필드명/타입/서버 로그 확인

### 2) curl

```bash
curl -X POST http://localhost:3000/api/hua \
  -H "Content-Type: application/json" \
  -d '{"input":"지금 기분이 이상해","config":{"mode":"analyst","tone":"neutral"},"features":["emotion_score"]}'
```

---

## 2-1. curl 실전 예시 (윈도우 환경)

명령 프롬프트(cmd)에서 아래와 같이 입력:

```bash
curl -X POST http://127.0.0.1:3000/api/hua ^
  -H "Content-Type: application/json" ^
  -d "{\"input\":\"안녕!\",\"config\":{\"mode\":\"listener\",\"tone\":\"warm\"}}"
```

**예상 결과(실제 예시):**

```json
{"response":"안녕하세요! 😊 오늘 하루 어떠셨나요?"}
```

---

## 3. 에러 응답 구조 테스트

- input 없이 요청 시
  - Postman/curl로 input 필드 없이 POST
  - **예상 결과**

    ```json
    {
      "error": { "code": "missing_input", "message": "입력 메시지가 필요합니다" },
      "status": "error"
    }
    ```

- **실패 시**: 에러 구조가 다르거나 500 에러 발생 시, 코드 내 에러 핸들링 로직 확인

---

## 4. CORS/오리진 정책 테스트

- 실제 외부 도메인(테스트용 HTML/JS)에서 fetch로 호출
- CORS 에러 없이 정상 응답 확인
- 브라우저 콘솔에서 네트워크 탭/에러 메시지 확인
- **실패 시**: CORS 관련 에러 메시지(예: "No 'Access-Control-Allow-Origin' header...")가 뜨면 서버 CORS 설정 확인

---

## 5. 내부 감응 필드 분리 테스트

- API 응답에 slip/tier/ethics 등 내부 정보가 포함되지 않는지 Postman/curl로 확인
- **예상 결과**: 응답에 내부 감응 필드가 노출되지 않아야 함
- **실패 시**: 응답 JSON에 내부 필드가 있으면 응답 생성부 코드 수정 필요

---

## 6. 버전/문서 싱크 테스트

- `/api/meta` 응답의 버전, 문서 상 버전, 코드 주석 등 일치 여부 확인
- **실패 시**: 버전 불일치 시 문서/코드/주석 동기화

---

> 각 항목별로 실제 스크린샷, 예상 결과, 실패 시 대처법 등도 추가 가능. 필요시 QA 체크리스트/테스트 케이스로 확장 가능!
