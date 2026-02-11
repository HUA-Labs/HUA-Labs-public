# @hua-labs/api-lite

TypeScript SDK for integrating with the HUA Lite emotional AI chatbot API. Supports guest and authenticated API keys, smart retry logic, emotion-based responses, credit management, and event-driven architecture.

[![npm version](https://img.shields.io/npm/v/@hua-labs/api-lite.svg)](https://www.npmjs.com/package/@hua-labs/api-lite)
[![npm downloads](https://img.shields.io/npm/dm/@hua-labs/api-lite.svg)](https://www.npmjs.com/package/@hua-labs/api-lite)
[![license](https://img.shields.io/npm/l/@hua-labs/api-lite.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## Features

- **Smart retry — Auto-retry on 502/503/504 with exponential backoff**
- **API key validation — Guest (64-char) and authenticated (hua_ prefix) keys**
- **Emotion-based responses — Configurable tone, mode, and tier**
- **Credit management — Track usage and remaining credits**
- **Event system — Request/response/error lifecycle events**
- **TypeScript — Full type safety with comprehensive interfaces**

## Installation

```bash
pnpm add @hua-labs/api-lite
```


## Quick Start

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

## API

| Export | Type | Description |
|--------|------|-------------|
| `HUAError` | component |  |
| `MissingApiKeyError` | component |  |
| `ValidationError` | component |  |
| `NetworkError` | component |  |
| `TimeoutError` | component |  |
| `ServerError` | component |  |
| `AuthenticationError` | component |  |
| `InvalidApiKeyError` | component |  |
| `GuestKeyLimitExceededError` | component |  |
| `RateLimitExceededError` | component |  |
| `InsufficientCreditsError` | component |  |
| `MissingMessageError` | component |  |
| `InvalidToneError` | component |  |
| `InvalidModeError` | component |  |
| `InvalidTierError` | component |  |
| `InvalidLanguageError` | component |  |
| `OpenAIApiError` | component |  |
| `ConfigurationError` | component |  |
| `RetryLimitExceededError` | component |  |
| `createErrorFromResponse` | function |  |
| `isHUAError` | function |  |
| `isRetryableError` | function |  |
| `formatErrorMessage` | function |  |
| `HUALite` | class | Main SDK class — initialize with API key |


## Related Packages

- [`@hua-labs/hua`](https://www.npmjs.com/package/@hua-labs/hua)

## License

MIT — [HUA Labs](https://hua-labs.com)
