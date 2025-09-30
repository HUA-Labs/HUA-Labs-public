# @hua-labs/api-lite v2.1.2

HUA Lite API를 위한 TypeScript SDK입니다. 감정 인식 AI 챗봇과 쉽게 통합할 수 있습니다.

[![npm version](https://badge.fury.io/js/@hua-labs/api-lite.svg)](https://badge.fury.io/js/@hua-labs/api-lite)
[![npm downloads](https://img.shields.io/npm/dm/@hua-labs/api-lite.svg)](https://www.npmjs.com/package/@hua-labs/api-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-2.1.1-blue.svg)](https://github.com/HUA-Labs/hua-sdk-lite/tree/v2)

[English Documentation (README.en.md)](./README.en.md)

---

## ✨ 주요 기능 (2.1.1)

- **실제 서비스와 동일한 API 키 검증** (게스트: 64자리, 회원: hua_ 접두사)
- **스마트 재시도 로직** (502/503/504 등 서버 오류 자동 재시도)
- **강화된 에러 처리** (17개 테스트로 모든 예외 상황 검증)
- **TypeScript 완벽 지원 & 개발자 경험 개선**
- **감정 기반 응답, 다국어, 크레딧, 이벤트, 배치 처리 등**

---

## 설치

```bash
npm install @hua-labs/api-lite@2.1.2
```

---

## 빠른 시작

```typescript
import { HUALite } from '@hua-labs/api-lite';

// SDK 초기화 (게스트 키 또는 회원가입 키)
const hua = new HUALite('hua_wut4p3hneulrt2ud3mi9rn'); // 회원가입 키 예시
// 또는
// const hua = new HUALite('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'); // 게스트 키 예시

// 챗봇과 대화
const response = await hua.chat({
  message: "오늘 하루 힘들었어, 위로해줘!",
  tone: "gentle",
  mode: "empathy",
  tier: 1.0,
  provider: "openai"
});

console.log(response.data.message);
// "정말 힘드셨겠어요... 오늘 하루도 잘 버텨내셨네요. 당신의 노력을 알아봐요. 내일은 더 좋은 하루가 될 거예요! 💕"
```

---

## API 키 발급

```typescript
// 게스트 API 키 발급 (64자리 랜덤)
const apiKey = await HUALite.issueKey();
console.log(apiKey); // 예: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
```

---

## 고급 사용법

```typescript
// 사용자 정의 설정
const hua = new HUALite('hua_wut4p3hneulrt2ud3mi9rn', {
  baseUrl: 'https://api.hua.ai.kr',
  timeout: 30000,
  retries: 2,
  retryDelay: 1000
});

// 다양한 감정 설정으로 대화
const responses = await Promise.all([
  hua.chat({ message: "안녕!", tone: "gentle", mode: "empathy" }),
  hua.chat({ message: "힘내!", tone: "cheerful", mode: "praise" }),
  hua.chat({ message: "고마워", tone: "warm", mode: "praise" })
]);
```

---

## 지원 옵션

### Tone (톤)

- `gentle` - 부드럽고 따뜻한
- `warm` - 따뜻하고 친근한
- `cheerful` - 밝고 활기찬
- `quirky` - 독특하고 재미있는
- `delicate` - 섬세하고 정중한

### Mode (모드)

- `empathy` - 공감적
- `analysis` - 분석적
- `suggestion` - 제안적
- `praise` - 칭찬적
- `playful` - 장난스러운

### Tier (등급)

- `1.0` - 기본 (1 크레딧)
- `2.0` - 고급 (2 크레딧)
- `3.0` - 프리미엄 (3 크레딧)

---

## 응답 구조

```typescript
interface ChatResponse {
  success: boolean;
  data: {
    message: string;
    usage: {
      total_tokens: number;
      input_tokens: number;
      output_tokens: number;
    };
    credits?: {
      used: number;
      remaining: number;
      tier: string;
    };
    tier: string;
    mode: string;
    tone: string;
    authenticated: boolean;
    userId?: string;
    note?: string;
  };
}
```

---

## 에러 처리 & 재시도

```typescript
try {
  const response = await hua.chat({ message: "Hello!" });
} catch (error) {
  if (error.code === 'INSUFFICIENT_CREDITS') {
    console.log('크레딧이 부족합니다.');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.log('요청 한도를 초과했습니다.');
  } else if (error.code === 'SERVER_ERROR') {
    console.log('서버 오류, 자동 재시도 중...');
  } else {
    console.error(error);
  }
}
```text
- 502/503/504 등 서버 오류는 자동 재시도 (config로 횟수/딜레이 조절)
- 모든 에러는 타입별로 구분되어 처리 가능

---

## 이벤트 시스템

```typescript
hua.on('request', (event) => {
  console.log('Request sent:', event.data.url);
});
hua.on('response', (event) => {
  console.log('Response received:', event.data.status);
});
hua.on('error', (event) => {
  console.log('Error occurred:', event.data.error);
});
```

---

## 입력값 검증

```typescript
if (hua.validateTone('gentle')) {
  // 유효한 톤
}
if (hua.validateMode('empathy')) {
  // 유효한 모드
}
if (hua.validateTier(1.0)) {
  // 유효한 등급
}
```

---

## 테스트 & 품질

- **Jest 기반 17+개 테스트**로 모든 주요 기능/에러/재시도 검증
- 실제 서비스 환경과 동일한 조건에서 안전하게 사용 가능

---

## 문서

- [API 문서](https://api.hua.ai.kr/docs)
- [온라인 데모](https://api.hua.ai.kr/api-test)
- [API 키 관리](https://api.hua.ai.kr/api-key)

## 라이선스

MIT License

## 지원

- 이슈: [GitHub Issues](https://github.com/HUA-Labs/hua-sdk-lite/issues)
- 이메일: <echonet.ais@gmail.com>
