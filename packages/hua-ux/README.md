# @hua-labs/hua-ux

**Ship UX faster**: UI + motion + i18n, pre-wired. / **UX를 더 빠르게**: UI + 모션 + i18n, 미리 연결됨.

A framework for React product teams that provides pre-wired UX defaults for spacing, components, motion, and internationalization.

간격, 컴포넌트, 모션, 국제화를 위한 미리 연결된 UX 기본값을 제공하는 React 프로덕트 팀을 위한 프레임워크입니다.

## 왜 hua-ux인가? / Why hua-ux?

프로덕트 팀이 매번 UI 컴포넌트, 모션 라이브러리, i18n 설정을 처음부터 구성하는 것은 시간 낭비입니다. **hua-ux**는 이 세 가지를 하나의 패키지로 통합하여, 5분 안에 프로덕트에 바로 적용할 수 있도록 설계되었습니다.

Product teams waste time setting up UI components, motion libraries, and i18n configuration from scratch every time. **hua-ux** integrates these three into a single package, designed to be applied directly to your product in 5 minutes.

**핵심 가치 / Core Values:**

- ✅ **가볍고 바로 붙는다** / **Lightweight and ready to use**: Framer Motion 대비 가볍고, Next.js에 바로 통합 가능 / Lighter than Framer Motion, ready to integrate with Next.js
- ✅ **타입 안전** / **Type-safe**: TypeScript로 모든 것이 타입 안전하게 제공 / Everything is type-safe with TypeScript
- ✅ **SSR 지원** / **SSR support**: Next.js App Router와 완벽하게 작동 / Works perfectly with Next.js App Router
- ✅ **통합 경험** / **Integrated experience**: UI, Motion, i18n이 하나의 생태계에서 작동 / UI, Motion, i18n work in one ecosystem
- ✅ **에러 처리 자동화** / **Automated error handling**: ErrorBoundary가 HuaUxPage에 기본 내장 / ErrorBoundary built into HuaUxPage by default
- ✅ **접근성 우선** / **Accessibility first**: WCAG 2.1 준수, 스크린 리더 지원, 키보드 탐색 최적화 (useFocusManagement, useFocusTrap, SkipToContent, LiveRegion) / WCAG 2.1 compliant, screen reader support, keyboard navigation optimized
- ✅ **로딩 UX 최적화** / **Loading UX optimized**: 깜빡임 방지, Skeleton UI, Suspense 자동화 (useDelayedLoading, useLoadingState, SuspenseWrapper) / Prevents flickering, Skeleton UI, Suspense automation

## 5분 시작 / 5-Minute Start

### 1. 설치 / Installation

```bash
pnpm add @hua-labs/hua-ux zustand
# or
npm install @hua-labs/hua-ux zustand
# or
yarn add @hua-labs/hua-ux zustand
```

### 2. 기본 설정 / Basic Setup

**두 가지 사용 방법이 있습니다 / Two ways to use:**

#### 방법 1: 프레임워크 레이어 사용 (권장) ⭐ / Method 1: Framework Layer (Recommended) ⭐

프레임워크 레이어를 사용하면 자동으로 모든 Provider가 설정됩니다:

Using the framework layer automatically sets up all providers:

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
import { I18nProviderWrapper } from '@/components/I18nProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <I18nProviderWrapper>{children}</I18nProviderWrapper>
      </body>
    </html>
  );
}
```

**I18nProviderWrapper 생성 / Create I18nProviderWrapper:**

```tsx
// components/I18nProviderWrapper.tsx
'use client';

import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { useAppStore } from '@/store/useAppStore';

const I18nProvider = createZustandI18n(useAppStore, {
  fallbackLanguage: 'en',
  namespaces: ['common'],
  translationLoader: 'api',
  translationApiPath: '/api/translations',
  defaultLanguage: 'ko',
});

export function I18nProviderWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
```

**장점 / Advantages**: 설정 파일만으로 모든 Provider 자동 설정, 간단함 / Automatic provider setup with just config file, simple

#### 방법 2: 직접 사용 (세밀한 제어) / Method 2: Direct Usage (Fine-grained Control)

더 세밀한 제어가 필요한 경우 직접 설정할 수 있습니다:

For more fine-grained control, you can set it up directly:

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
// Create language state management store with createI18nStore
const i18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

// createZustandI18n으로 i18n Provider 생성
// Create i18n Provider with createZustandI18n
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

**장점 / Advantages**: 세밀한 제어 가능, 커스텀 설정 용이 / Fine-grained control, easy custom configuration

**언제 사용하나요? / When to use?**

- **프레임워크 레이어** / **Framework Layer**: 빠른 시작, 표준 설정으로 충분한 경우 / Quick start, when standard setup is sufficient
- **직접 사용** / **Direct Usage**: 커스텀 Provider 조합, 특수한 요구사항이 있는 경우 / Custom provider combinations, special requirements

### 3. 사용하기 / Usage

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
        <Button ref={slideUp.ref} style={slideUp.style}>Get Started</Button>
      </Card>
    </div>
  );
}
```

**중요 / Important**: Motion hooks는 `.ref`와 `.style`을 반환합니다. 둘 다 적용해야 합니다.

Motion hooks return `.ref` and `.style`. Both must be applied.

## Showcase / 쇼케이스

라이브 데모를 확인하세요 / Check out the live demo:

```bash
cd apps/hua-ux-showcase
pnpm install
pnpm dev
```

**Showcase 페이지 / Showcase Pages**:
- `/` - 홈 (3개 Showcase 링크) / Home (3 showcase links)
- `/ui` - UI 컴포넌트 데모 / UI component demo
- `/motion` - Motion 훅 데모 / Motion hooks demo
- `/i18n` - 다국어 지원 데모 / i18n support demo

또는 [Showcase App 소스 코드](../../apps/hua-ux-showcase)를 참고하세요.

Or see the [Showcase App source code](../../apps/hua-ux-showcase).

## 프로젝트 생성 / Project Creation

스캐폴딩 도구를 사용하여 새 프로젝트를 생성할 수 있습니다:

You can create a new project using the scaffolding tool:

```bash
pnpm create hua-ux my-app
cd my-app
pnpm install
pnpm dev
```

자세한 내용은 [create-hua-ux README](../create-hua-ux/README.md)를 참고하세요.

For more details, see the [create-hua-ux README](../create-hua-ux/README.md).

## 패키지 구조 / Package Structure

**hua-ux**는 다음 패키지들을 통합합니다:

**hua-ux** integrates the following packages:

- **`@hua-labs/ui`** - UI 컴포넌트 라이브러리 / UI component library
  - Button, Card, Input, Modal 등 50+ 컴포넌트 / 50+ components
  - 일관된 스타일링 시스템 / Consistent styling system
  - 다크 모드 지원 / Dark mode support

- **`@hua-labs/motion-core`** - Motion 훅 라이브러리 / Motion hooks library
  - `useFadeIn`, `useSlideUp`, `useScaleIn` 등 기본 모션 / Basic motions
  - `useHoverMotion`, `useScrollReveal` 등 인터랙션 / Interactions
  - 프리셋 시스템으로 빠른 설정 / Quick setup with preset system

- **`@hua-labs/i18n-core`** - i18n 핵심 기능 / i18n core functionality
  - 타입 안전한 번역 시스템 / Type-safe translation system
  - SSR/CSR 지원 / SSR/CSR support
  - 네임스페이스 기반 번역 관리 / Namespace-based translation management

- **`@hua-labs/i18n-core-zustand`** - Zustand 어댑터 / Zustand adapter
  - Zustand와 완벽한 통합 / Perfect integration with Zustand
  - 하이드레이션 에러 방지 / Prevents hydration errors
  - 언어 상태 자동 동기화 / Automatic language state synchronization

- **`@hua-labs/state`** - 통합 상태관리 (프레임워크 전용) / Integrated state management (framework only)
  - Zustand 기반 상태관리 / Zustand-based state management
  - SSR/Persistence 지원 / SSR/Persistence support
  - i18n 통합 스토어 제공 / Provides i18n integrated store

## 서브패키지 / Sub-packages

### `@hua-labs/hua-ux/framework`

프레임워크 레이어 - Next.js를 감싸서 구조와 규칙을 강제하는 레이어

Framework layer - A layer that wraps Next.js to enforce structure and rules

**주요 기능 / Key Features**:
- `HuaUxPage`: 페이지 래퍼 (자동 모션) / Page wrapper (automatic motion)
- `defineConfig`: 타입 안전한 설정 시스템 / Type-safe configuration system
- `useData`, `fetchData`: 데이터 페칭 유틸리티 / Data fetching utilities
- `createI18nMiddleware`: i18n 미들웨어 (Edge Runtime) / i18n middleware (Edge Runtime)

자세한 내용은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

For more details, see the [Framework Layer Documentation](./src/framework/README.md).

### `@hua-labs/hua-ux/presets`

사전 구성된 Presets

Pre-configured Presets

**제공되는 Presets / Available Presets**:
- `productPreset`: 제품 페이지용 (빠른 전환, 최소 딜레이) / For product pages (fast transitions, minimal delay)
- `marketingPreset`: 랜딩 페이지용 (드라마틱한 모션, 긴 딜레이) / For landing pages (dramatic motion, long delay)

```tsx
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';
```

## 프레임워크 레이어 사용하기 / Using the Framework Layer

프레임워크 레이어를 사용하면 더 간단하게 설정할 수 있습니다:

Using the framework layer allows for simpler setup:

### 1. 설정 파일 생성 / Create Config File

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

### 2. Layout 설정 / Layout Setup

```tsx
// app/layout.tsx
import { I18nProviderWrapper } from '@/components/I18nProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <I18nProviderWrapper>{children}</I18nProviderWrapper>
      </body>
    </html>
  );
}
```

### 3. 페이지 사용 / Page Usage

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

For more details, see the [Framework Layer Documentation](./src/framework/README.md).

## 주요 기능 / Key Features

### 🎯 통합 Motion Hook (성능 최적화) / Unified Motion Hook (Performance Optimized)

**useMotion Hook** - 모든 motion hook을 통합하여 코드 가독성 및 유지보수성 향상:

**useMotion Hook** - Unifies all motion hooks to improve code readability and maintainability:

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

**Automatic use in HuaUxPage** - Automatically applies optimized motion without separate setup.

### 🛡️ ErrorBoundary (에러 처리 자동화) / ErrorBoundary (Automated Error Handling)

**HuaUxPage에 기본 내장** - 별도 설정 없이 모든 페이지에서 에러를 자동으로 캐치합니다.

**Built into HuaUxPage by default** - Automatically catches errors on all pages without separate setup.

**프로덕션 에러 리포팅 지원** - Sentry, LogRocket 등과 통합 가능:

**Production error reporting support** - Can integrate with Sentry, LogRocket, etc.:

```ts
// 프로덕션 환경에서 에러 리포팅 설정
// Set up error reporting in production environment
window.__ERROR_REPORTER__ = (error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: errorInfo },
  });
};
```

```tsx
// 자동으로 ErrorBoundary가 적용됩니다
// ErrorBoundary is automatically applied
<HuaUxPage title="Home">
  <MyComponent /> {/* 에러 발생 시 fallback UI 표시 / Shows fallback UI on error */}
</HuaUxPage>
```

**커스텀 fallback UI / Custom fallback UI**:
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

**독립적으로 사용** (HuaUxPage 외부) / **Use independently** (outside HuaUxPage):
```tsx
import { ErrorBoundary } from '@hua-labs/hua-ux/framework';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 🎨 브랜딩 (White Labeling) / Branding (White Labeling)

**SSR 지원 CSS 변수 주입** - 서버 사이드에서도 브랜딩 CSS 변수가 즉시 적용되어 FOUC를 방지합니다:

**SSR-supported CSS variable injection** - Branding CSS variables are applied immediately on the server side, preventing FOUC:

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

When branding is configured, it is automatically applied to all components.

### 🤖 GEO (Generative Engine Optimization) / GEO (Generative Engine Optimization)

**AI 검색 엔진 최적화** - ChatGPT, Claude, Gemini, Perplexity가 당신의 소프트웨어를 잘 찾고 추천하도록 최적화:

**AI search engine optimization** - Optimized so ChatGPT, Claude, Gemini, Perplexity can find and recommend your software:

#### 기본 사용법 / Basic Usage

```tsx
import { generateGEOMetadata, renderJSONLD } from '@hua-labs/hua-ux/framework';
import Script from 'next/script';

// GEO 메타데이터 생성
// Generate GEO metadata
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
// Integrate with Next.js metadata
export const metadata = {
  title: 'My App',
  description: geoMeta.meta.find(m => m.name === 'description')?.content,
};

// JSON-LD 추가
// Add JSON-LD
export default function Page() {
  return (
    <>
      <Script {...renderJSONLD(geoMeta.jsonLd[0])} />
      <main>...</main>
    </>
  );
}
```

자세한 GEO 사용법은 [프레임워크 레이어 문서](./src/framework/README.md)를 참고하세요.

For detailed GEO usage, see the [Framework Layer Documentation](./src/framework/README.md).

### ♿ 접근성 (Accessibility) / Accessibility

WCAG 2.1 준수를 위한 완벽한 도구 세트를 제공합니다.

Provides a complete set of tools for WCAG 2.1 compliance.

#### 1. Skip to Content (네비게이션 건너뛰기) / Skip to Content

키보드 사용자를 위한 필수 기능 - Tab 키로 메인 콘텐츠로 바로 이동:

Essential feature for keyboard users - Jump directly to main content with Tab key:

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

#### 2. Focus Management (포커스 관리) / Focus Management

페이지 전환 시 자동으로 메인 콘텐츠에 포커스:

Automatically focuses on main content on page transition:

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

**모달/드로어용 Focus Trap / Focus Trap for Modal/Drawer**:
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

#### 3. Live Region (스크린 리더 알림) / Live Region (Screen Reader Announcements)

동적 상태 변화를 스크린 리더 사용자에게 알림:

Announces dynamic state changes to screen reader users:

```tsx
import { LiveRegion, useLiveRegion } from '@hua-labs/hua-ux/framework';

// 선언적 사용 / Declarative usage
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

// Hook 사용 (프로그래밍 방식) / Hook usage (programmatic)
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

### ⏳ 로딩 상태 최적화 (Loading State) / Loading State Optimization

깜빡임 없는 부드러운 로딩 경험을 제공합니다.

Provides smooth loading experience without flickering.

#### 1. useDelayedLoading (깜빡임 방지) / useDelayedLoading (Prevent Flickering)

**문제 / Problem**: 빠른 API 응답 시 로딩 UI가 깜빡거림 / Loading UI flickers on fast API response

**해결 / Solution**: 300ms 이하로 끝나면 로딩 UI를 아예 안보여줌 / Don't show loading UI if it finishes in 300ms or less

```tsx
import { useDelayedLoading } from '@hua-labs/hua-ux/framework';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = useDelayedLoading(isLoading);

  const fetchData = async () => {
    setIsLoading(true);
    await api.getData(); // 빠르게 끝나면 로딩 UI 안보임 / Loading UI won't show if it finishes quickly
    setIsLoading(false);
  };

  return showLoading ? <Spinner /> : <Content />;
}
```

**편의성 hook / Convenience hook**:
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

#### 2. Skeleton (로딩 중 콘텐츠 미리보기) / Skeleton (Content Preview While Loading)

로딩 시간이 체감적으로 짧게 느껴지고, 레이아웃 시프트를 방지합니다.

Makes loading time feel shorter and prevents layout shift.

```tsx
import { Skeleton, SkeletonGroup } from '@hua-labs/hua-ux/framework';

// 텍스트 스켈레톤 / Text skeleton
<Skeleton width="80%" />
<Skeleton width="60%" />

// 원형 (아바타) / Circular (avatar)
<Skeleton variant="circular" width={40} height={40} />

// 직사각형 (이미지) / Rectangular (image)
<Skeleton variant="rectangular" width={300} height={200} />

// 카드 스켈레톤 / Card skeleton
<div className="card">
  <Skeleton variant="rectangular" height={200} />
  <SkeletonGroup className="p-4">
    <Skeleton width="60%" height={24} />
    <Skeleton width="80%" />
    <Skeleton width="40%" />
  </SkeletonGroup>
</div>
```

#### 3. SuspenseWrapper (React Suspense 편의성) / SuspenseWrapper (React Suspense Convenience)

React Suspense를 더 쉽게 사용할 수 있습니다.

Makes React Suspense easier to use.

```tsx
import { SuspenseWrapper } from '@hua-labs/hua-ux/framework';

// 기본 사용 (자동 Skeleton fallback) / Basic usage (automatic Skeleton fallback)
<SuspenseWrapper>
  <AsyncComponent />
</SuspenseWrapper>

// 커스텀 fallback / Custom fallback
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

**HOC 패턴 / HOC Pattern**:
```tsx
import { withSuspense } from '@hua-labs/hua-ux/framework';

const AsyncPosts = withSuspense(Posts, <Skeleton height={200} />);

function MyPage() {
  return <AsyncPosts />;
}
```

## Use Cases / 사용 사례

### 1. 제품 페이지 (Product Preset) / Product Pages (Product Preset)

```tsx
import { productPreset } from '@hua-labs/hua-ux/presets';

// 빠른 전환, 최소 딜레이 / Fast transitions, minimal delay
const motionConfig = productPreset.motion;
```

### 2. 랜딩 페이지 (Marketing Preset) / Landing Pages (Marketing Preset)

```tsx
import { marketingPreset } from '@hua-labs/hua-ux/presets';

// 드라마틱한 모션, 긴 딜레이 / Dramatic motion, long delay
const motionConfig = marketingPreset.motion;
```

### 3. 다국어 지원 / Multilingual Support

```tsx
import { useTranslation } from '@hua-labs/hua-ux';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common:welcome')}</h1>;
}
```

### 4. 상태관리 (State Package) / State Management (State Package)

```tsx
import { createHuaStore } from '@hua-labs/hua-ux';
// 또는 / or
import { createHuaStore } from '@hua-labs/state';

const useAppStore = createHuaStore((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}), {
  persist: true,
  ssr: true,
});
```

## 테스트 / Testing

프레임워크의 주요 기능에 대한 테스트가 포함되어 있습니다:

Tests are included for the framework's key features:

```bash
cd packages/hua-ux
pnpm test
```

**테스트 커버리지 / Test Coverage**:
- ✅ Motion hooks (`useMotion`)
- ✅ GEO 메타데이터 생성 (`generateGEOMetadata`, `createAIContext`)
- ✅ 구조화된 데이터 (`generateSoftwareApplicationLD`, `generateFAQPageLD`, etc.)
- ✅ CSS 변수 생성 (`generateCSSVariables`)
- ✅ Config 시스템 (`defineConfig`, `getConfig`, `setConfig`)
- ✅ ErrorBoundary 컴포넌트
- 🔄 Accessibility 모듈 (구현 완료, 테스트 예정) / Accessibility module (implementation complete, tests pending)
- 🔄 Loading 모듈 (구현 완료, 테스트 예정) / Loading module (implementation complete, tests pending)

## 버전 / Version

현재 버전: **0.1.0** (Alpha)

Current version: **0.1.0** (Alpha)

- `0.x`: Alpha 단계, API 변경 가능 / Alpha stage, API changes possible
- `1.x`: 안정화 후 / After stabilization

## 라이선스 / License

MIT

## 이슈 및 문의 / Issues and Inquiries

문제가 발생하거나 제안사항이 있으시면 [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)에 등록해주세요.

If you encounter any issues or have suggestions, please register them in [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues).
