# @hua-labs/hua-ux

Ship UX faster: UI + Motion + i18n, pre-wired.
더 빠른 UX 개발을 위한 UI, Motion, i18n 통합 프레임워크

[![npm version](https://img.shields.io/npm/v/@hua-labs/hua-ux.svg)](https://www.npmjs.com/package/@hua-labs/hua-ux)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/hua-ux.svg)](https://www.npmjs.com/package/@hua-labs/hua-ux)
[![license](https://img.shields.io/npm/l/@hua-labs/hua-ux.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview

hua-ux is a high-level, batteries-included framework for React product teams. It unifies UI components, animation hooks, and internationalization into a cohesive ecosystem, enabling production-ready setup in minutes instead of hours.

### Features

- **Pre-wired Integration**: UI, Motion, and i18n components pre-configured and ready to use
- **Framework Layer**: Next.js-optimized framework layer with automatic provider setup
- **Type Safety**: Full TypeScript support with type inference
- **SSR Ready**: Works seamlessly with Next.js App Router
- **Accessibility**: WCAG 2.1 compliant components and utilities (useFocusManagement, useFocusTrap, SkipToContent, LiveRegion)
- **Loading UX**: Built-in loading state management (useDelayedLoading, useLoadingState, SuspenseWrapper)
- **Error Handling**: ErrorBoundary built into HuaUxPage
- **Branding**: White-labeling support with SSR-compatible CSS variable injection
- **GEO Support**: Generative Engine Optimization for AI search engines

### Installation

```bash
npm install @hua-labs/hua-ux zustand
# or
yarn add @hua-labs/hua-ux zustand
# or
pnpm add @hua-labs/hua-ux zustand
```

### Peer Dependencies

```bash
# Required
npm install react react-dom next

# Optional (for Zustand state management)
npm install zustand
```

### Quick Start

#### Method 1: Framework Layer (Recommended)

Use the framework layer for automatic provider setup:

```tsx
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  preset: 'product',
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
});
```

```tsx
// app/layout.tsx
import { HuaUxLayout } from '@hua-labs/hua-ux/framework';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <HuaUxLayout>{children}</HuaUxLayout>
      </body>
    </html>
  );
}
```

**Benefits**: Automatic provider setup, minimal configuration

#### Method 2: Manual Setup (Advanced)

For advanced use cases, set up providers manually:

```tsx
// store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  language: 'ko' | 'en';
  setLanguage: (lang: 'ko' | 'en') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);
```

```tsx
// lib/i18n-setup.ts
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { createI18nStore } from '@hua-labs/state';

const i18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

export const I18nProvider = createZustandI18n(i18nStore, {
  fallbackLanguage: 'en',
  namespaces: ['common'],
  translationLoader: 'api',
  translationApiPath: '/api/translations',
  defaultLanguage: 'ko',
});
```

```tsx
// app/layout.tsx
import { I18nProvider } from './lib/i18n-setup';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
```

**Benefits**: Full control over provider setup

**When to use each**:
- **Framework Layer**: Quick start, minimal setup
- **Manual Setup**: Custom store structure, multiple providers

### Usage Example

```tsx
// app/page.tsx
'use client';

import { Button, Card } from '@hua-labs/hua-ux';
import { useFadeIn, useSlideUp } from '@hua-labs/hua-ux';
import { useTranslation } from '@hua-labs/hua-ux';

export default function HomePage() {
  const { t } = useTranslation();
  const fadeIn = useFadeIn();
  const slideUp = useSlideUp();

  return (
    <div>
      <Card ref={fadeIn.ref} style={fadeIn.style}>
        <h1>{t('common:welcome')}</h1>
      </Card>
      <Button ref={slideUp.ref} style={slideUp.style}>
        Get Started
      </Button>
    </div>
  );
}
```

### Project Scaffolding

Use the CLI tool to create a new project:

```bash
npm create hua-ux my-app
# or
pnpm create hua-ux my-app
# or
yarn create hua-ux my-app

cd my-app
pnpm install
pnpm dev
```

For more details, see [create-hua-ux README](../create-hua-ux/README.md).

### Tailwind CSS Configuration

If you're using Tailwind CSS v4, you need to configure `@source` directives to scan the UI package classes:

```css
/* app/globals.css */
@import "tailwindcss";

/* Scan hua-ux packages for Tailwind classes */
@source "../node_modules/@hua-labs/hua-ux/src/**/*.{ts,tsx}";
@source "../node_modules/@hua-labs/ui/src/**/*.{ts,tsx}";
```

> **Note**: The path is relative to your CSS file location. Adjust the path based on your project structure.

For monorepo setups with workspace packages:

```css
/* apps/my-app/app/globals.css */
@import "tailwindcss";

/* Monorepo: packages are in ../../packages/ */
@source "../../../packages/hua-ui/src/**/*.{ts,tsx}";
@source "../../../packages/hua-ux/src/**/*.{ts,tsx}";
```

### Entry Points

hua-ux provides the following entry points:

| Entry | Path | Description |
|-------|------|-------------|
| Core | `@hua-labs/hua-ux` | All UI, Motion, i18n, and State components (re-exports) |
| Framework | `@hua-labs/hua-ux/framework` | Framework layer with automatic provider setup |
| Presets | `@hua-labs/hua-ux/presets` | Pre-configured presets (product, marketing) |
| GEO | `@hua-labs/hua-ux/framework/seo/geo` | Generative Engine Optimization utilities |

### Core Packages

hua-ux includes the following packages:

- **`@hua-labs/ui`** - UI component library
  - Button, Card, Input, Modal, and 70+ components
  - Dark mode support
  - Accessible components

- **`@hua-labs/motion-core`** - Motion hooks library
  - `useFadeIn`, `useSlideUp`, `useScaleIn` and 30+ hooks
  - `useHoverMotion`, `useScrollReveal` for interactions
  - Zero dependencies, SSR-ready

- **`@hua-labs/i18n-core`** - i18n core functionality
  - Type-safe translation system
  - SSR/CSR support
  - Multiple translation loader strategies

- **`@hua-labs/i18n-core-zustand`** - Zustand adapter
  - Seamless Zustand integration
  - Language state synchronization
  - Built-in state management

- **`@hua-labs/state`** - State management (framework layer)
  - Zustand-based state management
  - SSR/Persistence support
  - i18n integration ready

### Framework Layer

The framework layer (`@hua-labs/hua-ux/framework`) provides Next.js-optimized components and utilities:

**Key Features**:
- `HuaUxLayout`: Automatic provider setup
- `HuaUxPage`: Page wrapper with built-in features
- `WelcomePage`: Default welcome page for new projects (shows framework features and quick links)
- `defineConfig`: Type-safe configuration system
- `useData`, `fetchData`: Data fetching utilities
- `createI18nMiddleware`: i18n middleware (Edge Runtime)

#### WelcomePage Component

The `WelcomePage` component provides a default welcome page for new projects:

```tsx
import { WelcomePage } from '@hua-labs/hua-ux/framework';

export default function HomePage() {
  return (
    <WelcomePage
      projectName="My App"
      showFeatures={true}
      showQuickLinks={true}
    />
  );
}
```

**Props**:
- `projectName`: Project name to display (default: "My App")
- `showFeatures`: Show framework features grid (default: true)
- `showQuickLinks`: Show quick links (default: true)

For more details, see [Framework Layer Documentation](./src/framework/README.md).

### Presets

Pre-configured presets for common use cases:

**Available Presets**:
- `productPreset`: Product pages (quick navigation, minimal animations)
- `marketingPreset`: Marketing pages (eye-catching animations, smooth transitions)

```tsx
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';
```

### Key Features

#### Unified Motion Hook

**useMotion Hook** - Unified motion hook that works with all motion hooks:

```tsx
import { useMotion } from '@hua-labs/hua-ux/framework';

const motion = useMotion({
  type: 'fadeIn',
  duration: 600,
  autoStart: false,
});

return <div ref={motion.ref} style={motion.style}>Content</div>;
```

**HuaUxPage with Motion** - Automatic motion application without manual setup

#### Built-in ErrorBoundary

**HuaUxPage includes ErrorBoundary** - All pages automatically handle errors

**Custom Error Reporter** - Works with Sentry, LogRocket, etc.

```tsx
// In Next.js app to set error reporter
window.__ERROR_REPORTER__ = (error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: errorInfo },
  });
};
```

```tsx
// ErrorBoundary is automatically applied
<HuaUxPage title="Home">
  <MyComponent /> {/* Errors are caught and fallback UI is shown */}
</HuaUxPage>
```

**Custom fallback UI**:
```tsx
<HuaUxPage
  title="Home"
  errorBoundaryFallback={(error, reset) => (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={reset}>Try Again</button>
    </div>
  )}
>
  <MyComponent />
</HuaUxPage>
```

**Standalone usage** (without HuaUxPage):
```tsx
import { ErrorBoundary } from '@hua-labs/hua-ux/framework';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

#### Branding (White Labeling)

**SSR-compatible CSS variable injection** - Apply branding CSS variables at build time to prevent FOUC

```tsx
// hua-ux.config.ts
export default defineConfig({
  branding: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    },
  },
});
```

All components automatically use branding when configured.

#### GEO (Generative Engine Optimization)

**AI search engine optimization** - Optimized for ChatGPT, Claude, Gemini, Perplexity to discover and index your app

For detailed GEO usage, see [Framework Layer Documentation](./src/framework/README.md).

### Documentation

- [Framework Layer Documentation](./src/framework/README.md) - Complete framework layer guide
- [Detailed Guide](./DETAILED_GUIDE.md) - Advanced usage and examples

### Related Packages

- [`@hua-labs/ui`](../hua-ui/README.md) - UI component library
- [`@hua-labs/motion-core`](../hua-motion-core/README.md) - Animation hooks
- [`@hua-labs/i18n-core`](../hua-i18n-core/README.md) - Internationalization core
- [`create-hua-ux`](../create-hua-ux/README.md) - Project scaffolding tool

### Requirements

- React >= 19.0.0
- React DOM >= 19.0.0
- Next.js >= 13.0.0 (optional, but recommended)
- Zustand (optional, for state management)

## Korean

### 개요

hua-ux는 React 제품 팀을 위한 고수준의 통합 프레임워크입니다. UI 컴포넌트, 애니메이션 훅, 국제화를 하나의 생태계로 통합하여 몇 시간이 걸리던 프로덕션 준비를 몇 분 만에 완료할 수 있게 합니다.

### 주요 기능

- **사전 통합**: UI, Motion, i18n 컴포넌트가 사전 구성되어 바로 사용 가능
- **프레임워크 레이어**: Next.js 최적화 프레임워크 레이어와 자동 Provider 설정
- **타입 안전성**: 타입 추론을 통한 완전한 TypeScript 지원
- **SSR 지원**: Next.js App Router와 원활하게 작동
- **접근성**: WCAG 2.1 준수 컴포넌트 및 유틸리티 (useFocusManagement, useFocusTrap, SkipToContent, LiveRegion)
- **로딩 UX**: 내장 로딩 상태 관리 (useDelayedLoading, useLoadingState, SuspenseWrapper)
- **에러 처리**: HuaUxPage에 내장된 ErrorBoundary
- **브랜딩**: SSR 호환 CSS 변수 주입을 통한 화이트 라벨링 지원
- **GEO 지원**: AI 검색 엔진을 위한 생성형 엔진 최적화

### 설치

```bash
npm install @hua-labs/hua-ux zustand
# 또는
yarn add @hua-labs/hua-ux zustand
# 또는
pnpm add @hua-labs/hua-ux zustand
```

### Peer Dependencies

```bash
# 필수
npm install react react-dom next

# 선택사항 (Zustand 상태 관리용)
npm install zustand
```

### 빠른 시작

#### 방법 1: 프레임워크 레이어 (권장)

프레임워크 레이어를 사용하여 자동 Provider 설정:

```tsx
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  preset: 'product',
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
});
```

```tsx
// app/layout.tsx
import { HuaUxLayout } from '@hua-labs/hua-ux/framework';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <HuaUxLayout>{children}</HuaUxLayout>
      </body>
    </html>
  );
}
```

**장점**: 자동 Provider 설정, 최소 설정

#### 방법 2: 수동 설정 (고급)

고급 사용 사례를 위해 Provider를 수동으로 설정:

```tsx
// store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  language: 'ko' | 'en';
  setLanguage: (lang: 'ko' | 'en') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);
```

```tsx
// lib/i18n-setup.ts
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { createI18nStore } from '@hua-labs/state';

const i18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

export const I18nProvider = createZustandI18n(i18nStore, {
  fallbackLanguage: 'en',
  namespaces: ['common'],
  translationLoader: 'api',
  translationApiPath: '/api/translations',
  defaultLanguage: 'ko',
});
```

```tsx
// app/layout.tsx
import { I18nProvider } from './lib/i18n-setup';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
```

**장점**: Provider 설정 완전 제어

**언제 사용할까**:
- **프레임워크 레이어**: 빠른 시작, 최소 설정
- **수동 설정**: 커스텀 스토어 구조, 여러 Provider

### 사용 예시

```tsx
// app/page.tsx
'use client';

import { Button, Card } from '@hua-labs/hua-ux';
import { useFadeIn, useSlideUp } from '@hua-labs/hua-ux';
import { useTranslation } from '@hua-labs/hua-ux';

export default function HomePage() {
  const { t } = useTranslation();
  const fadeIn = useFadeIn();
  const slideUp = useSlideUp();

  return (
    <div>
      <Card ref={fadeIn.ref} style={fadeIn.style}>
        <h1>{t('common:welcome')}</h1>
      </Card>
      <Button ref={slideUp.ref} style={slideUp.style}>
        시작하기
      </Button>
    </div>
  );
}
```

### 프로젝트 생성

CLI 도구를 사용하여 새 프로젝트를 생성할 수 있습니다:

```bash
npm create hua-ux my-app
# 또는
pnpm create hua-ux my-app
# 또는
yarn create hua-ux my-app

cd my-app
pnpm install
pnpm dev
```

자세한 내용은 [create-hua-ux README](../create-hua-ux/README.md)를 참고하세요.

### Tailwind CSS 설정

Tailwind CSS v4를 사용하는 경우, UI 패키지 클래스를 스캔하도록 `@source` 디렉티브를 설정해야 합니다:

```css
/* app/globals.css */
@import "tailwindcss";

/* hua-ux 패키지 Tailwind 클래스 스캔 */
@source "../node_modules/@hua-labs/hua-ux/src/**/*.{ts,tsx}";
@source "../node_modules/@hua-labs/ui/src/**/*.{ts,tsx}";
```

> **참고**: 경로는 CSS 파일 위치 기준 상대 경로입니다. 프로젝트 구조에 맞게 조정하세요.

모노레포 워크스페이스 패키지 설정:

```css
/* apps/my-app/app/globals.css */
@import "tailwindcss";

/* 모노레포: 패키지가 ../../packages/에 있는 경우 */
@source "../../../packages/hua-ui/src/**/*.{ts,tsx}";
@source "../../../packages/hua-ux/src/**/*.{ts,tsx}";
```

### 진입점

hua-ux는 다음 진입점을 제공합니다:

| 진입점 | 경로 | 설명 |
|--------|------|------|
| Core | `@hua-labs/hua-ux` | 모든 UI, Motion, i18n, State 컴포넌트 (re-export) |
| Framework | `@hua-labs/hua-ux/framework` | 자동 Provider 설정이 있는 프레임워크 레이어 |
| Presets | `@hua-labs/hua-ux/presets` | 사전 구성된 프리셋 (product, marketing) |
| GEO | `@hua-labs/hua-ux/framework/seo/geo` | 생성형 엔진 최적화 유틸리티 |

### 핵심 패키지

hua-ux는 다음 패키지를 포함합니다:

- **`@hua-labs/ui`** - UI 컴포넌트 라이브러리
  - Button, Card, Input, Modal 및 70개 이상의 컴포넌트
  - 다크 모드 지원
  - 접근 가능한 컴포넌트

- **`@hua-labs/motion-core`** - Motion 훅 라이브러리
  - `useFadeIn`, `useSlideUp`, `useScaleIn` 및 30개 이상의 훅
  - `useHoverMotion`, `useScrollReveal` 등 상호작용 훅
  - 의존성 없음, SSR 지원

- **`@hua-labs/i18n-core`** - i18n 핵심 기능
  - 타입 안전 번역 시스템
  - SSR/CSR 지원
  - 여러 번역 로더 전략

- **`@hua-labs/i18n-core-zustand`** - Zustand 어댑터
  - Zustand와의 원활한 통합
  - 언어 상태 동기화
  - 내장 상태 관리

- **`@hua-labs/state`** - 상태 관리 (프레임워크 레이어)
  - Zustand 기반 상태 관리
  - SSR/지속성 지원
  - i18n 통합 준비

### 프레임워크 레이어

프레임워크 레이어(`@hua-labs/hua-ux/framework`)는 Next.js 최적화 컴포넌트 및 유틸리티를 제공합니다:

**주요 기능**:
- `HuaUxLayout`: 자동 Provider 설정
- `HuaUxPage`: 내장 기능이 있는 페이지 래퍼
- `WelcomePage`: 새 프로젝트를 위한 기본 웰컴 페이지 (프레임워크 기능 및 빠른 링크 표시)
- `defineConfig`: 타입 안전 설정 시스템
- `useData`, `fetchData`: 데이터 페칭 유틸리티
- `createI18nMiddleware`: i18n 미들웨어 (Edge Runtime)

#### WelcomePage 컴포넌트

`WelcomePage` 컴포넌트는 새 프로젝트를 위한 기본 웰컴 페이지를 제공합니다:

```tsx
import { WelcomePage } from '@hua-labs/hua-ux/framework';

export default function HomePage() {
  return (
    <WelcomePage
      projectName="My App"
      showFeatures={true}
      showQuickLinks={true}
    />
  );
}
```

**Props**:
- `projectName`: 표시할 프로젝트 이름 (기본값: "My App")
- `showFeatures`: 프레임워크 기능 그리드 표시 (기본값: true)
- `showQuickLinks`: 빠른 링크 표시 (기본값: true)

자세한 내용은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

### 프리셋

일반적인 사용 사례를 위한 사전 구성된 프리셋:

**사용 가능한 프리셋**:
- `productPreset`: 제품 페이지 (빠른 네비게이션, 최소 애니메이션)
- `marketingPreset`: 마케팅 페이지 (눈에 띄는 애니메이션, 부드러운 전환)

```tsx
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';
```

### 주요 기능

#### 통합 Motion 훅

**useMotion 훅** - 모든 motion 훅과 작동하는 통합 motion 훅:

```tsx
import { useMotion } from '@hua-labs/hua-ux/framework';

const motion = useMotion({
  type: 'fadeIn',
  duration: 600,
  autoStart: false,
});

return <div ref={motion.ref} style={motion.style}>콘텐츠</div>;
```

**HuaUxPage와 Motion** - 수동 설정 없이 자동 motion 적용

#### 내장 ErrorBoundary

**HuaUxPage에 ErrorBoundary 포함** - 모든 페이지가 자동으로 에러 처리

**커스텀 에러 리포터** - Sentry, LogRocket 등과 작동

```tsx
// Next.js 앱에서 에러 리포터 설정
window.__ERROR_REPORTER__ = (error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: errorInfo },
  });
};
```

```tsx
// ErrorBoundary가 자동으로 적용됨
<HuaUxPage title="홈">
  <MyComponent /> {/* 에러가 발생하면 fallback UI 표시 */}
</HuaUxPage>
```

**커스텀 fallback UI**:
```tsx
<HuaUxPage
  title="홈"
  errorBoundaryFallback={(error, reset) => (
    <div>
      <h1>에러: {error.message}</h1>
      <button onClick={reset}>다시 시도</button>
    </div>
  )}
>
  <MyComponent />
</HuaUxPage>
```

**독립 사용** (HuaUxPage 없이):
```tsx
import { ErrorBoundary } from '@hua-labs/hua-ux/framework';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

#### 브랜딩 (화이트 라벨링)

**SSR 호환 CSS 변수 주입** - 빌드 시 브랜딩 CSS 변수를 적용하여 FOUC 방지

```tsx
// hua-ux.config.ts
export default defineConfig({
  branding: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    },
  },
});
```

브랜딩이 설정되면 모든 컴포넌트가 자동으로 사용합니다.

#### GEO (생성형 엔진 최적화)

**AI 검색 엔진 최적화** - ChatGPT, Claude, Gemini, Perplexity가 앱을 발견하고 인덱싱하도록 최적화

자세한 GEO 사용법은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

### 문서

- [프레임워크 레이어 문서](./src/framework/README.md) - 완전한 프레임워크 레이어 가이드
- [상세 가이드](./DETAILED_GUIDE.md) - 고급 사용법 및 예시

### 관련 패키지

- [`@hua-labs/ui`](../hua-ui/README.md) - UI 컴포넌트 라이브러리
- [`@hua-labs/motion-core`](../hua-motion-core/README.md) - 애니메이션 훅
- [`@hua-labs/i18n-core`](../hua-i18n-core/README.md) - 국제화 핵심
- [`create-hua-ux`](../create-hua-ux/README.md) - 프로젝트 스캐폴딩 도구

### 요구사항

- React >= 19.0.0
- React DOM >= 19.0.0
- Next.js >= 13.0.0 (선택사항이지만 권장)
- Zustand (선택사항, 상태 관리용)

## License

MIT License

## Repository

https://github.com/HUA-Labs/HUA-Labs-public
