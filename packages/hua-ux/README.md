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
import { useAppStore } from '../store/useAppStore';

export const I18nProvider = createZustandI18n(useAppStore, {
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

또는 [Showcase App 소스 코드](../../apps/hua-ux-showcase)를 참고하세요.

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

## 버전

현재 버전: **0.1.0** (Alpha)

- `0.x`: Alpha 단계, API 변경 가능
- `1.x`: 안정화 후

## 라이선스

MIT

## 이슈 및 문의

문제가 발생하거나 제안사항이 있으시면 [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)에 등록해주세요.
