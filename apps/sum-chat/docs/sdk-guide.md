# 외부용 SDK 제작 및 연동 가이드

## 1. 목적 및 정의

- 본 SDK는 HUA 시스템의 핵심 기능(챗봇, 감정로그, 프리셋 등)을 외부 서비스/앱에서 손쉽게 연동할 수 있도록 제공
- RESTful API, 프리셋 로더, 상태 관리, 프롬프트 등 주요 모듈을 래핑

---

## 2. 제공 기능/인터페이스

- **챗봇 대화**: 메시지 전송/응답, 세션 관리, 톤/모드/티어 프리셋 적용
- **감정 로그**: 감정 데이터 기록/조회 (MongoDB 기반)
- **프리셋 로딩**: tone, tier, mode, ethics 등 yaml 기반 프리셋 로딩
- **유저/세션 관리**: 세션 생성, 상태 조회, 유저 정보 관리
- **유틸리티**: 슬립 체크, 프롬프트 생성, 기타 공통 함수

### 예시 인터페이스 (TypeScript)

```ts
import { sendMessage, getSession, loadPreset } from 'hua-sdk';

const session = await getSession(userId);
const reply = await sendMessage(session.id, '안녕!');
const tierPreset = await loadPreset('tier', 'F2');
```

---

## 3. 내부 의존성/구조 요약

- **상태 관리**: zustand 기반 store, 세션/채팅/유저 상태 분리
- **DB 연동**: mongoose, MongoDB Atlas/Compass
- **프리셋**: yaml 파서, 내부 프리셋 로더
- **API**: Next.js API 라우트, RESTful 구조
- **타입**: TypeScript 기반, 엄격한 타입 안전성

---

## 4. 빌드/배포/버전 관리

- **패키징**: rollup/tsup 등으로 esm/cjs 번들 제공
- **배포**: npm publish, 버전 태깅(semver)
- **의존성**: peerDependencies로 next, react, zustand, mongoose 등 명시
- **환경변수**: .env (MONGODB_URI 등) 필요

---

## 5. 사용 예제

```ts
import { createSession, sendMessage, getEmotionLog } from 'hua-sdk';

const session = await createSession(userId);
await sendMessage(session.id, '오늘 기분 어때?');
const logs = await getEmotionLog(session.id);
```

---

## 6. 확장/커스터마이즈 가이드

- **프리셋 추가**: modules/에 yaml 파일 추가, schema 일관성 유지
- **API 확장**: Next.js API 라우트 추가, 타입/상태 관리 연동
- **UI 커스텀**: components/ui/ 내 재사용 컴포넌트 활용
- **로깅/분석**: data-lab/ 연동, 커스텀 로깅 정책 적용

---

## 7. 주의사항/제약

- 내부 프리셋/상태 구조 변경 시 SDK 버전 호환성 주의
- 외부 서비스는 .env, DB 연결 등 환경설정 필요
- 인증/권한 분리 필요(추후 OAuth 등 연동 권장)

---

> 본 문서는 AI(지피티/리듬이) 기준, 외부 연동/확장에 최적화된 SDK 설계/가이드임. 인간보다는 AI가 빠르게 파악할 수 있도록 작성됨.
