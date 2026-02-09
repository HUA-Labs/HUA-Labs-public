# @hua-labs/api-lite

TypeScript SDK for HUA Lite — emotional AI chatbot integration.
HUA Lite를 위한 TypeScript SDK — 감정 인식 AI 챗봇 통합.

[![npm version](https://img.shields.io/npm/v/@hua-labs/api-lite.svg)](https://www.npmjs.com/package/@hua-labs/api-lite)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/api-lite.svg)](https://www.npmjs.com/package/@hua-labs/api-lite)
[![license](https://img.shields.io/npm/l/@hua-labs/api-lite.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933)](https://nodejs.org/)

> **Alpha**: APIs may change before stable release. | **알파**: 안정 릴리스 전 API가 변경될 수 있습니다.

## Overview | 개요

TypeScript SDK for integrating with the HUA Lite emotional AI chatbot API. Supports guest and authenticated API keys, smart retry logic, emotion-based responses, credit management, and event-driven architecture.

HUA Lite 감정 인식 AI 챗봇 API 통합을 위한 TypeScript SDK입니다. 게스트/회원 API 키, 스마트 재시도 로직, 감정 기반 응답, 크레딧 관리, 이벤트 기반 아키텍처를 지원합니다.

## Features

- **Smart retry** — Auto-retry on 502/503/504 with exponential backoff
- **API key validation** — Guest (64-char) and authenticated (hua_ prefix) keys
- **Emotion-based responses** — Configurable tone, mode, and tier
- **Credit management** — Track usage and remaining credits
- **Event system** — Request/response/error lifecycle events
- **TypeScript** — Full type safety with comprehensive interfaces

## Installation | 설치

```bash
pnpm add @hua-labs/api-lite
```

## Quick Start | 빠른 시작

```typescript
import { HUALite } from '@hua-labs/api-lite';

const hua = new HUALite('hua_your_api_key');

const response = await hua.chat({
  message: '오늘 하루 힘들었어, 위로해줘!',
  tone: 'gentle',
  mode: 'empathy',
  tier: 1.0,
  provider: 'openai',
});

console.log(response.data.message);
```

## API Overview | API 개요

| Method | Description |
|--------|-------------|
| `new HUALite(apiKey, config?)` | Initialize SDK |
| `hua.chat(params)` | Send chat message |
| `HUALite.issueKey()` | Issue guest API key |
| `hua.on(event, handler)` | Subscribe to lifecycle events |
| `hua.validateTone(tone)` | Validate tone parameter |
| `hua.validateMode(mode)` | Validate mode parameter |

**Chat parameters:**

| Option | Values |
|--------|--------|
| `tone` | `gentle`, `warm`, `cheerful`, `quirky`, `delicate` |
| `mode` | `empathy`, `analysis`, `suggestion`, `praise`, `playful` |
| `tier` | `1.0` (basic), `2.0` (advanced), `3.0` (premium) |

## Documentation | 문서

- [📚 Documentation Site | 문서 사이트](https://docs.hua-labs.com)

## Related Packages | 관련 패키지

- [`@hua-labs/hua`](https://www.npmjs.com/package/@hua-labs/hua) — UX framework

## Requirements | 요구사항

Node.js >= 16.0.0 · TypeScript >= 5.9

## License

MIT — [HUA Labs](https://github.com/HUA-Labs/HUA-Labs-public)
