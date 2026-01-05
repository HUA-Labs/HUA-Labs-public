# @hua-labs/hua-ux

Ship UX faster: UI + Motion + i18n, pre-wired.
빠른 UX 개발을 위한 UI, Motion, i18n 통합 프레임워크.

[![npm version](https://img.shields.io/npm/v/@hua-labs/hua-ux.svg)](https://www.npmjs.com/package/@hua-labs/hua-ux)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/hua-ux.svg)](https://www.npmjs.com/package/@hua-labs/hua-ux)
[![license](https://img.shields.io/npm/l/@hua-labs/hua-ux.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview

hua-ux is a high-level, batteries-included framework for React product teams. It unifies UI components, animation hooks, and internationalization into a cohesive ecosystem, enabling production-ready setup in minutes instead of hours.

## 왜 hua-ux인가?

프로덕트 팀이 매번 UI 컴포넌트, 모션 라이브러리, i18n 설정을 처음부터 구성하는 것은 시간 낭비입니다. **hua-ux**는 이 세 가지를 하나의 패키지로 통합하여, 5분 안에 프로덕트에 바로 적용할 수 있도록 설계되었습니다.

**핵심 가치:**
- ✅ **가볍고 바로 붙는다**: Framer Motion 대비 가볍고, Next.js에 바로 통합 가능
- ✅ **타입 안전**: TypeScript로 모든 것이 타입 안전하게 제공
- ✅ **SSR 지원**: Next.js App Router와 완벽하게 작동
- ✅ **통합 경험**: UI, Motion, i18n이 하나의 생태계에서 작동
- ✅ **에러 처리 자동화**: ErrorBoundary가 HuaUxPage에 기본 내장
- ✅ **접근성 우선**: WCAG 2.1 준수, 스크린 리더 지원, 키보드 탐색 최적화 (useFocusManagement, useFocusTrap, SkipToContent, LiveRegion)
- ✅ **로딩 UX 최적화**: 깜빡임 방지, Skeleton UI, Suspense 자동화 (useDelayedLoading, useLoadingState, SuspenseWrapper)

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
import { useTranslation } from '@hua-labs/hua-ux';

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
npm create hua-ux my-app
# or
pnpm create hua-ux my-app
# or
yarn create hua-ux my-app

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

**타입 안전성을 위한 명시적 import (권장)**:

프로덕션 환경에서는 설정 파일을 명시적으로 import하여 타입 안전성을 보장하는 것을 권장합니다:

```tsx
// app/layout.tsx 또는 초기화 파일
import config from '../hua-ux.config';
import { setConfig } from '@hua-labs/hua-ux/framework';

// 설정을 명시적으로 로드 (타입 안전성 보장)
setConfig(config);
```

이 방법을 사용하면:
- ✅ 타입 안전성 보장
- ✅ Next.js 빌드 경고 방지
- ✅ 런타임 에러 방지

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

## 주요 기능

### 🎯 통합 Motion Hook (성능 최적화)

**useMotion Hook** - 모든 motion hook을 통합하여 코드 가독성 및 유지보수성 향상:

```tsx
import { useMotion } from '@hua-labs/hua-ux/framework';

const motion = useMotion({
  type: 'fadeIn',
  duration: 600,
  autoStart: false,
});

return <div ref={motion.ref} style={motion.style}>Content</div>;
```

**HuaUxPage에서 자동 사용** - 별도 설정 없이 자동으로 최적화된 motion 적용됩니다.

### 🛡️ ErrorBoundary (에러 처리 자동화)

**HuaUxPage에 기본 내장** - 별도 설정 없이 모든 페이지에서 에러를 자동으로 캐치합니다.

**프로덕션 에러 리포팅 지원** - Sentry, LogRocket 등과 통합 가능:

```ts
// 프로덕션 환경에서 에러 리포팅 설정
window.__ERROR_REPORTER__ = (error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: errorInfo },
  });
};
```

```tsx
// 자동으로 ErrorBoundary가 적용됩니다
<HuaUxPage title="Home">
  <MyComponent /> {/* 에러 발생 시 fallback UI 표시 */}
</HuaUxPage>
```

**커스텀 fallback UI**:
```tsx
<HuaUxPage
  title="Home"
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

**독립적으로 사용** (HuaUxPage 외부):
```tsx
import { ErrorBoundary } from '@hua-labs/hua-ux/framework';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 🎨 브랜딩 (White Labeling)

**SSR 지원 CSS 변수 주입** - 서버 사이드에서도 브랜딩 CSS 변수가 즉시 적용되어 FOUC를 방지합니다:

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

브랜딩 설정을 하면 모든 컴포넌트에 자동으로 적용됩니다.

### 🤖 GEO (Generative Engine Optimization)

**AI 검색 엔진 최적화** - ChatGPT, Claude, Gemini, Perplexity가 당신의 소프트웨어를 잘 찾고 추천하도록 최적화:

#### 기본 사용법

```tsx
import { generateGEOMetadata, renderJSONLD } from '@hua-labs/hua-ux/framework';
import Script from 'next/script';

// GEO 메타데이터 생성
const geoMeta = generateGEOMetadata({
  name: 'My App',
  description: 'Built with hua-ux framework',
  version: '1.0.0',
  applicationCategory: ['UX Framework', 'Developer Tool'],
  programmingLanguage: ['TypeScript', 'React', 'Next.js'],
  features: ['i18n', 'Motion', 'Accessibility'],
  useCases: ['Multilingual apps', 'Accessible UX'],
  keywords: ['nextjs', 'react', 'ux', 'i18n'],
  codeRepository: 'https://github.com/your-org/your-app',
  license: 'MIT',
});

// Next.js metadata와 통합
export const metadata = {
  title: 'My App',
  description: geoMeta.meta.find(m => m.name === 'description')?.content,
};

// JSON-LD 추가
export default function Page() {
  return (
    <>
      <Script {...renderJSONLD(geoMeta.jsonLd[0])} />
      <main>...</main>
    </>
  );
}
```

#### Layout에서 사용 (앱 전체)

```tsx
// app/layout.tsx
import { generateGEOMetadata, renderJSONLD } from '@hua-labs/hua-ux/framework';
import Script from 'next/script';

const appGeoMeta = generateGEOMetadata({
  name: 'My App',
  description: 'My amazing application',
  // ... 앱 전체 설정
});

export const metadata = {
  title: appGeoMeta.meta.find(m => m.name === 'description')?.content,
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script {...renderJSONLD(appGeoMeta.jsonLd[0])} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### FAQ, HowTo, TechArticle 구조화된 데이터

```tsx
import { generateFAQPageLD, generateHowToLD, generateTechArticleLD } from '@hua-labs/hua-ux/framework';

// FAQ 페이지
const faqLD = generateFAQPageLD([
  { question: 'What is hua-ux?', answer: 'A UX framework for Next.js' },
]);

// 튜토리얼 페이지
const howToLD = generateHowToLD({
  name: 'How to get started',
  steps: [
    { name: 'Install', text: 'Run: pnpm create hua-ux my-app' },
    { name: 'Configure', text: 'Edit hua-ux.config.ts' },
  ],
});

// 기술 문서
const articleLD = generateTechArticleLD({
  headline: 'Getting Started with hua-ux',
  datePublished: '2025-12-29',
  author: { name: 'hua-labs' },
});
```

### ♿ 접근성 (Accessibility)

WCAG 2.1 준수를 위한 완벽한 도구 세트를 제공합니다.

#### 1. Skip to Content (네비게이션 건너뛰기)

키보드 사용자를 위한 필수 기능 - Tab 키로 메인 콘텐츠로 바로 이동:

```tsx
// app/layout.tsx
import { SkipToContent } from '@hua-labs/hua-ux/framework';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipToContent />
        <nav>{/* navigation */}</nav>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
```

#### 2. Focus Management (포커스 관리)

페이지 전환 시 자동으로 메인 콘텐츠에 포커스:

```tsx
import { useFocusManagement } from '@hua-labs/hua-ux/framework';

function MyPage() {
  const mainRef = useFocusManagement({ autoFocus: true });

  return (
    <main ref={mainRef} tabIndex={-1}>
      <h1>Page Title</h1>
    </main>
  );
}
```

**모달/드로어용 Focus Trap**:
```tsx
import { useFocusTrap } from '@hua-labs/hua-ux/framework';

function Modal({ isOpen, onClose }) {
  const modalRef = useFocusTrap({ isActive: isOpen, onEscape: onClose });

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      <button>Close</button>
    </div>
  );
}
```

#### 3. Live Region (스크린 리더 알림)

동적 상태 변화를 스크린 리더 사용자에게 알림:

```tsx
import { LiveRegion, useLiveRegion } from '@hua-labs/hua-ux/framework';

// 선언적 사용
function MyForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('저장 중...');
    await saveData();
    setMessage('저장되었습니다!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* fields */}</form>
      <LiveRegion message={message} />
    </div>
  );
}

// Hook 사용 (프로그래밍 방식)
function MyComponent() {
  const { announce, LiveRegionComponent } = useLiveRegion();

  const handleClick = () => {
    announce('버튼이 클릭되었습니다');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {LiveRegionComponent}
    </div>
  );
}
```

### ⏳ 로딩 상태 최적화 (Loading State)

깜빡임 없는 부드러운 로딩 경험을 제공합니다.

#### 1. useDelayedLoading (깜빡임 방지)

**문제**: 빠른 API 응답 시 로딩 UI가 깜빡거림
**해결**: 300ms 이하로 끝나면 로딩 UI를 아예 안보여줌

```tsx
import { useDelayedLoading } from '@hua-labs/hua-ux/framework';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = useDelayedLoading(isLoading);

  const fetchData = async () => {
    setIsLoading(true);
    await api.getData(); // 빠르게 끝나면 로딩 UI 안보임
    setIsLoading(false);
  };

  return showLoading ? <Spinner /> : <Content />;
}
```

**편의성 hook**:
```tsx
import { useLoadingState } from '@hua-labs/hua-ux/framework';

function MyComponent() {
  const { showLoading, startLoading, stopLoading } = useLoadingState();

  const fetchData = async () => {
    startLoading();
    try {
      await api.getData();
    } finally {
      stopLoading();
    }
  };

  return showLoading && <Spinner />;
}
```

#### 2. Skeleton (로딩 중 콘텐츠 미리보기)

로딩 시간이 체감적으로 짧게 느껴지고, 레이아웃 시프트를 방지합니다.

```tsx
import { Skeleton, SkeletonGroup } from '@hua-labs/hua-ux/framework';

// 텍스트 스켈레톤
<Skeleton width="80%" />
<Skeleton width="60%" />

// 원형 (아바타)
<Skeleton variant="circular" width={40} height={40} />

// 직사각형 (이미지)
<Skeleton variant="rectangular" width={300} height={200} />

// 카드 스켈레톤
<div className="card">
  <Skeleton variant="rectangular" height={200} />
  <SkeletonGroup className="p-4">
    <Skeleton width="60%" height={24} />
    <Skeleton width="80%" />
    <Skeleton width="40%" />
  </SkeletonGroup>
</div>
```

**useDelayedLoading + Skeleton 조합**:
```tsx
function MyComponent() {
  const { data, isLoading } = useQuery('data', fetchData);
  const showLoading = useDelayedLoading(isLoading);

  if (showLoading) {
    return (
      <SkeletonGroup>
        <Skeleton width="60%" height={32} />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </SkeletonGroup>
    );
  }

  return <div>{data?.content}</div>;
}
```

#### 3. SuspenseWrapper (React Suspense 편의성)

React Suspense를 더 쉽게 사용할 수 있습니다.

```tsx
import { SuspenseWrapper } from '@hua-labs/hua-ux/framework';

// 기본 사용 (자동 Skeleton fallback)
<SuspenseWrapper>
  <AsyncComponent />
</SuspenseWrapper>

// 커스텀 fallback
<SuspenseWrapper fallback={<Spinner />}>
  <AsyncComponent />
</SuspenseWrapper>

// Next.js Server Component
async function Posts() {
  const posts = await fetchPosts();
  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>;
}

export default function PostsPage() {
  return (
    <SuspenseWrapper>
      <Posts />
    </SuspenseWrapper>
  );
}
```

**HOC 패턴**:
```tsx
import { withSuspense } from '@hua-labs/hua-ux/framework';

const AsyncPosts = withSuspense(Posts, <Skeleton height={200} />);

function MyPage() {
  return <AsyncPosts />;
}
```

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
import { useTranslation } from '@hua-labs/hua-ux';

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

## 테스트

프레임워크의 주요 기능에 대한 테스트가 포함되어 있습니다:

```bash
cd packages/hua-ux
pnpm test
```

**테스트 커버리지**:
- ✅ Motion hooks (`useMotion`)
- ✅ GEO 메타데이터 생성 (`generateGEOMetadata`, `createAIContext`)
- ✅ 구조화된 데이터 (`generateSoftwareApplicationLD`, `generateFAQPageLD`, etc.)
- ✅ CSS 변수 생성 (`generateCSSVariables`)
- ✅ Config 시스템 (`defineConfig`, `getConfig`, `setConfig`)
- ✅ ErrorBoundary 컴포넌트
- 🔄 Accessibility 모듈 (구현 완료, 테스트 예정)
- 🔄 Loading 모듈 (구현 완료, 테스트 예정)

## 버전

현재 버전: **0.1.0** (Alpha)

- `0.x`: Alpha 단계, API 변경 가능
- `1.x`: 안정화 후

## 라이선스

MIT

## 이슈 및 문의

문제가 발생하거나 제안사항이 있으시면 [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)에 등록해주세요.
