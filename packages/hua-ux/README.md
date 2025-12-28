# @hua-labs/hua-ux

**Ship UX faster**: UI + motion + i18n, pre-wired.

A framework for React product teams that provides pre-wired UX defaults for spacing, components, motion, and internationalization.

## 왜 hua-ux인가?

프로덕트 팀이 매번 UI 컴포넌트, 모션 라이브러리, i18n 설정을 처음부터 구성하는 것은 시간 낭비입니다. **hua-ux**는 이 세 가지를 하나의 패키지로 통합하여, 5분 안에 프로덕트에 바로 적용할 수 있도록 설계되었습니다.

**핵심 가치:**
- ✅ **가볍고 바로 붙는다**: Framer Motion 대비 가볍고, Next.js에 바로 통합 가능
- ✅ **타입 안전**: TypeScript로 모든 것이 타입 안전하게 제공
- ✅ **SSR 지원**: Next.js App Router와 완벽하게 작동
- ✅ **통합 경험**: UI, Motion, i18n이 하나의 생태계에서 작동

## 5분 시작

### 1. 설치

```bash
pnpm add @hua-labs/hua-ux zustand
# or
npm install @hua-labs/hua-ux zustand
# or
yarn add @hua-labs/hua-ux zustand
```

### 2. 기본 설정

**두 가지 사용 방법이 있습니다:**

#### 방법 1: 프레임워크 레이어 사용 (권장) ⭐

프레임워크 레이어를 사용하면 자동으로 모든 Provider가 설정됩니다:

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

**장점**: 설정 파일만으로 모든 Provider 자동 설정, 간단함

#### 방법 2: 직접 사용 (세밀한 제어)

더 세밀한 제어가 필요한 경우 직접 설정할 수 있습니다:

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
import { useAppStore } from '../store/useAppStore';

// createI18nStore로 언어 상태 관리 스토어 생성
const i18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

// createZustandI18n으로 i18n Provider 생성
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

**장점**: 세밀한 제어 가능, 커스텀 설정 용이

**언제 사용하나요?**
- **프레임워크 레이어**: 빠른 시작, 표준 설정으로 충분한 경우
- **직접 사용**: 커스텀 Provider 조합, 특수한 요구사항이 있는 경우

### 3. 사용하기

```tsx
// app/page.tsx
'use client';

import { Button, Card } from '@hua-labs/hua-ux';
import { useFadeIn, useSlideUp } from '@hua-labs/hua-ux';
import { useTranslation } from '@hua-labs/i18n-core';

export default function HomePage() {
  const { t } = useTranslation();
  const fadeInRef = useFadeIn();
  const slideUpRef = useSlideUp();

  return (
    <div>
      <Card ref={fadeInRef}>
        <h1>{t('common:welcome')}</h1>
        <Button ref={slideUpRef}>Get Started</Button>
      </Card>
    </div>
  );
}
```

## Showcase

라이브 데모를 확인하세요:

```bash
cd apps/hua-ux-showcase
pnpm install
pnpm dev
```

**Showcase 페이지**:
- `/` - 홈 (3개 Showcase 링크)
- `/ui` - UI 컴포넌트 데모
- `/motion` - Motion 훅 데모
- `/i18n` - 다국어 지원 데모

또는 [Showcase App 소스 코드](../../apps/hua-ux-showcase)를 참고하세요.

## 프로젝트 생성

스캐폴딩 도구를 사용하여 새 프로젝트를 생성할 수 있습니다:

```bash
pnpm create hua-ux my-app
cd my-app
pnpm install
pnpm dev
```

자세한 내용은 [create-hua-ux README](../create-hua-ux/README.md)를 참고하세요.

## 패키지 구조

**hua-ux**는 다음 패키지들을 통합합니다:

- **`@hua-labs/ui`** - UI 컴포넌트 라이브러리
  - Button, Card, Input, Modal 등 50+ 컴포넌트
  - 일관된 스타일링 시스템
  - 다크 모드 지원

- **`@hua-labs/motion-core`** - Motion 훅 라이브러리
  - `useFadeIn`, `useSlideUp`, `useScaleIn` 등 기본 모션
  - `useHoverMotion`, `useScrollReveal` 등 인터랙션
  - 프리셋 시스템으로 빠른 설정

- **`@hua-labs/i18n-core`** - i18n 핵심 기능
  - 타입 안전한 번역 시스템
  - SSR/CSR 지원
  - 네임스페이스 기반 번역 관리

- **`@hua-labs/i18n-core-zustand`** - Zustand 어댑터
  - Zustand와 완벽한 통합
  - 하이드레이션 에러 방지
  - 언어 상태 자동 동기화

- **`@hua-labs/state`** - 통합 상태관리 (프레임워크 전용)
  - Zustand 기반 상태관리
  - SSR/Persistence 지원
  - i18n 통합 스토어 제공

## 서브패키지

### `@hua-labs/hua-ux/framework`

프레임워크 레이어 - Next.js를 감싸서 구조와 규칙을 강제하는 레이어

**주요 기능**:
- `HuaUxLayout`: 자동 프로바이더 설정
- `HuaUxPage`: 페이지 래퍼 (자동 모션)
- `defineConfig`: 타입 안전한 설정 시스템
- `useData`, `fetchData`: 데이터 페칭 유틸리티
- `createI18nMiddleware`: i18n 미들웨어 (Edge Runtime)

자세한 내용은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

### `@hua-labs/hua-ux/presets`

사전 구성된 Presets

**제공되는 Presets**:
- `productPreset`: 제품 페이지용 (빠른 전환, 최소 딜레이)
- `marketingPreset`: 랜딩 페이지용 (드라마틱한 모션, 긴 딜레이)

```tsx
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';
```

## 프레임워크 레이어 사용하기

프레임워크 레이어를 사용하면 더 간단하게 설정할 수 있습니다:

### 1. 설정 파일 생성

```tsx
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
  },
  state: {
    persist: true,
    ssr: true,
  },
});
```

### 2. Layout 설정

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

### 3. 페이지 사용

```tsx
// app/page.tsx
import { HuaUxPage } from '@hua-labs/hua-ux/framework';

export default function HomePage() {
  return (
    <HuaUxPage title="Home" description="Welcome page">
      <h1>Welcome</h1>
    </HuaUxPage>
  );
}
```

자세한 내용은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

## Use Cases

### 1. 제품 페이지 (Product Preset)

```tsx
import { productPreset } from '@hua-labs/hua-ux/presets';

// 빠른 전환, 최소 딜레이
const motionConfig = productPreset.motion;
```

### 2. 랜딩 페이지 (Marketing Preset)

```tsx
import { marketingPreset } from '@hua-labs/hua-ux/presets';

// 드라마틱한 모션, 긴 딜레이
const motionConfig = marketingPreset.motion;
```

### 3. 다국어 지원

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common:welcome')}</h1>;
}
```

### 4. 상태관리 (State Package)

```tsx
import { createHuaStore } from '@hua-labs/hua-ux';
// 또는
import { createHuaStore } from '@hua-labs/state';

const useAppStore = createHuaStore((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}), {
  persist: true,
  ssr: true,
});
```

## 버전

현재 버전: **0.1.0** (Alpha)

- `0.x`: Alpha 단계, API 변경 가능
- `1.x`: 안정화 후

## 라이선스

MIT

## 이슈 및 문의

문제가 발생하거나 제안사항이 있으시면 [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)에 등록해주세요.
