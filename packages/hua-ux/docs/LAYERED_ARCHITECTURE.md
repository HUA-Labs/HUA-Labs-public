# 계층화된 아키텍처 설계

> 최종 업데이트: 2026-01-18

## 개요

전통적인 개발자와 바이브 코더 모두를 만족시키는 **계층화된 아키텍처** 설계입니다.

## 아키텍처 계층

```
┌─────────────────────────────────────────┐
│  상단: AI Context & CLI                 │
│  (바이브 코딩 전용 인터페이스)            │
│  - .cursorrules, ai-context.md          │
│  - create-hua (→ create-hua-ux)         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  중간: Framework & Config               │
│  (AI/바이브 코더용)                      │
│  - @hua-labs/hua-ux/framework           │
│  - @hua-labs/hua-ux/presets             │
│  - @hua-labs/hua-ux/pro                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  하단: Core & Types                     │
│  (전통적 개발자용)                       │
│  - @hua-labs/hua-ux/ui                  │
│  - @hua-labs/hua-ux/motion              │
│  - @hua-labs/hua-ux/i18n                │
│  - @hua-labs/hua-ux/state               │
└─────────────────────────────────────────┘
```

## Subpath Exports 구조

```
@hua-labs/hua-ux
├── .                     → 전체 통합 (UI+Motion+i18n+State+Pro)
│
├── /framework            → 프레임워크 레이어
│   ├── HuaUxLayout       → Provider 자동 설정
│   ├── HuaUxPage         → 페이지 래퍼 (motion + i18n)
│   ├── WelcomePage       → 시작 페이지
│   ├── defineConfig      → 선언적 설정
│   ├── useMotion         → 통합 모션 훅
│   ├── BrandedButton/Card
│   ├── a11y/, loading/, branding/
│   ├── plugins/, license/
│   └── seo/geo/
│
├── /presets              → 프리셋 (product, marketing)
│
├── /ui                   → UI 컴포넌트 (from @hua-labs/ui)
├── /i18n                 → i18n (from @hua-labs/i18n-core + zustand)
├── /motion               → Motion (from @hua-labs/motion-core)
├── /state                → State (from @hua-labs/state)
│
└── /pro                  → Pro 기능 (advanced motion hooks)
```

## 각 계층 상세

### 하단 레이어: Core (Subpath Exports)

**타겟**: 전통적 개발자, 시니어 개발자

**특징**:
- 정교한 TypeScript 타입
- 저수준 API 직접 제어
- 기능별 세분화된 import

**사용 예시**:
```typescript
// UI 컴포넌트
import { Button, Card, Modal } from '@hua-labs/hua-ux/ui';

// i18n
import { useTranslation, useLanguageChange } from '@hua-labs/hua-ux/i18n';
import { createZustandI18n } from '@hua-labs/hua-ux/i18n';

// Motion
import { useFadeIn, useSlideUp, useScrollReveal } from '@hua-labs/hua-ux/motion';

// State
import { createHuaStore, createI18nStore } from '@hua-labs/hua-ux/state';
```

**가치**:
- 필요한 것만 정확히 import
- 번들 사이즈 최적화 (tree-shaking)
- 개별 기능 독립적 사용 가능

### 중간 레이어: Framework & Config

**타겟**: 바이브 코더, 주니어 개발자, AI

**특징**:
- 선언적 설정 (`defineConfig`)
- 자동 Provider 설정 (`HuaUxLayout`)
- Preset 시스템

**사용 예시**:
```typescript
// 프레임워크 컴포넌트
import { HuaUxLayout, HuaUxPage, WelcomePage } from '@hua-labs/hua-ux/framework';
import { defineConfig } from '@hua-labs/hua-ux/framework';
import { useMotion } from '@hua-labs/hua-ux/framework';

// 프리셋
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';

// 설정 파일 (hua-ux.config.ts)
export default defineConfig({
  preset: 'product',
  branding: {
    primaryColor: '#3B82F6',
  },
});
```

**가치**:
- 복잡한 설정 없이 바로 시작
- AI가 설정을 추천하고 코드 생성 가능
- 빠른 프로토타이핑

### Pro 레이어

**타겟**: 고급 애니메이션/인터랙션이 필요한 프로젝트

**특징**:
- 고급 모션 훅 (orchestration, auto-animations)
- 성능 모니터링
- 프레임워크 사용자에게 무료 제공

**사용 예시**:
```typescript
import {
  useAutoSlide,
  useAutoFade,
  useOrchestration,
  useSequence,
  usePerformanceMonitor,
  useGameLoop,
} from '@hua-labs/hua-ux/pro';
```

### 상단 레이어: AI Context & CLI

**타겟**: 바이브 코더, AI 도구 (Cursor, Claude 등)

**특징**:
- AI가 프로젝트 구조를 완벽히 이해
- 자연어 명령만으로 코드 생성

**제공 파일**:
```
project/
├── .cursorrules          → Cursor AI 지침
├── ai-context.md         → AI 컨텍스트
├── .claude/
│   ├── project-context.md
│   └── skills/
│       └── hua-ux-framework/SKILL.md
```

## Import 가이드

### 권장: 프레임워크 Subpath 사용

```typescript
// 권장 - 프레임워크 subpath
import { HuaUxLayout, useMotion } from '@hua-labs/hua-ux/framework';
import { Button, Card } from '@hua-labs/hua-ux/ui';
import { useTranslation } from '@hua-labs/hua-ux/i18n';
import { useFadeIn } from '@hua-labs/hua-ux/motion';
import { createI18nStore } from '@hua-labs/hua-ux/state';
```

### 허용: 메인 Entry Point

```typescript
// 허용 - 전체 통합 (tree-shaking 됨)
import { Button, useTranslation, useFadeIn, HuaUxLayout } from '@hua-labs/hua-ux';
```

### 고급: 개별 패키지 직접 사용

```typescript
// 고급 사용자용 - 개별 패키지 직접
import { Button } from '@hua-labs/ui';
import { useTranslation } from '@hua-labs/i18n-core';
import { useFadeIn } from '@hua-labs/motion-core';
import { createHuaStore } from '@hua-labs/state';
```

## 계층 간 이동

### 바이브 코더 → 전통 개발자

서비스가 커지면 레이어를 내려가기:

```typescript
// 바이브 모드 (중간 레이어)
import { useMotion } from '@hua-labs/hua-ux/framework';
const motion = useMotion({ type: 'fadeIn' });

// 딥다이브 필요 시 (하단 레이어)
import { useFadeIn, useSlideUp } from '@hua-labs/hua-ux/motion';
const fadeIn = useFadeIn({ duration: 300, delay: 100 });
```

### 전통 개발자 → 바이브 코더

단순 작업이나 빠른 프로토타이핑 시:

```typescript
// 전통 모드 (하단 레이어)
const fadeIn = useFadeIn({ duration: 300 });
const slideUp = useSlideUp({ distance: 20 });

// 빠른 작업 필요 시 (중간 레이어)
const motion = useMotion({ type: 'fadeIn' });  // 한 줄로 끝
```

## 설계 원칙

### 1. 단일 패키지, 다중 진입점

- 하나의 `@hua-labs/hua-ux` 패키지
- 용도별 subpath exports
- Tree-shaking으로 번들 최적화

### 2. Escape Hatch 필수

모든 계층에서 하위 계층으로 내려갈 수 있어야 함:
- Framework → Core subpaths
- Config → 직접 제어
- Preset → 커스텀 설정

### 3. 문서의 이원화

- **README.md**: API 레퍼런스
- **.cursorrules**: AI 지침서
- **ai-context.md**: AI 컨텍스트

## 패키지 구조

```
packages/
├── hua-ux              → 프레임워크 (통합)
├── hua-ui              → UI 컴포넌트
├── hua-motion-core     → Motion 훅
├── hua-state           → State 관리
├── hua-pro             → Pro 기능 (private)
├── hua-i18n-core       → i18n 핵심
├── hua-i18n-core-zustand
├── hua-i18n-formatters
├── hua-i18n-loaders
└── create-hua-ux       → CLI
```

## CLI

```bash
# 프로젝트 생성
npx create-hua my-app
# 또는
npx create-hua-ux my-app
```

## 참고 자료

- [바이브 코딩 전략](./VIBE_CODING_STRATEGY.md)
- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [구현 로드맵](./IMPLEMENTATION_ROADMAP.md)
