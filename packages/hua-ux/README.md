# @hua-labs/hua-ux

Ship UX faster: UI + Motion + i18n, pre-wired.
더 빠른 UX 개발을 위한 UI, Motion, i18n 통합 프레임워크

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

## ??hua-ux?멸??

?꾨줈?뺥듃 ???留ㅻ쾲 UI 而댄룷?뚰듃, 紐⑥뀡 ?쇱씠釉뚮윭由? i18n ?ㅼ젙??泥섏쓬遺??援ъ꽦?섎뒗 寃껋? ?쒓컙 ??퉬?낅땲?? **hua-ux**??????媛吏瑜??섎굹???⑦궎吏濡??듯빀?섏뿬, 5遺??덉뿉 ?꾨줈?뺥듃??諛붾줈 ?곸슜?????덈룄濡??ㅺ퀎?섏뿀?듬땲??

**?듭떖 媛移?**
- ??**媛蹂띻퀬 諛붾줈 遺숇뒗??*: Framer Motion ?鍮?媛蹂띻퀬, Next.js??諛붾줈 ?듯빀 媛??
- ??**????덉쟾**: TypeScript濡?紐⑤뱺 寃껋씠 ????덉쟾?섍쾶 ?쒓났
- ??**SSR 吏??*: Next.js App Router? ?꾨꼍?섍쾶 ?묐룞
- ??**?듯빀 寃쏀뿕**: UI, Motion, i18n???섎굹???앺깭怨꾩뿉???묐룞
- ??**?먮윭 泥섎━ ?먮룞??*: ErrorBoundary媛 HuaUxPage??湲곕낯 ?댁옣
- ??**?묎렐???곗꽑**: WCAG 2.1 以?? ?ㅽ겕由?由щ뜑 吏?? ?ㅻ낫???먯깋 理쒖쟻??(useFocusManagement, useFocusTrap, SkipToContent, LiveRegion)
- ??**濡쒕뵫 UX 理쒖쟻??*: 源쒕묀??諛⑹?, Skeleton UI, Suspense ?먮룞??(useDelayedLoading, useLoadingState, SuspenseWrapper)

## 5遺??쒖옉

### 1. ?ㅼ튂

```bash
pnpm add @hua-labs/hua-ux zustand
# or
npm install @hua-labs/hua-ux zustand
# or
yarn add @hua-labs/hua-ux zustand
```

### 2. 湲곕낯 ?ㅼ젙

**??媛吏 ?ъ슜 諛⑸쾿???덉뒿?덈떎:**

#### 諛⑸쾿 1: ?꾨젅?꾩썙???덉씠???ъ슜 (沅뚯옣) 狩?

?꾨젅?꾩썙???덉씠?대? ?ъ슜?섎㈃ ?먮룞?쇰줈 紐⑤뱺 Provider媛 ?ㅼ젙?⑸땲??

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

**?μ젏**: ?ㅼ젙 ?뚯씪留뚯쑝濡?紐⑤뱺 Provider ?먮룞 ?ㅼ젙, 媛꾨떒??

#### 諛⑸쾿 2: 吏곸젒 ?ъ슜 (?몃????쒖뼱)

???몃????쒖뼱媛 ?꾩슂??寃쎌슦 吏곸젒 ?ㅼ젙?????덉뒿?덈떎:

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

// createI18nStore濡??몄뼱 ?곹깭 愿由??ㅽ넗???앹꽦
const i18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

// createZustandI18n?쇰줈 i18n Provider ?앹꽦
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

**?μ젏**: ?몃????쒖뼱 媛?? 而ㅼ뒪? ?ㅼ젙 ?⑹씠

**?몄젣 ?ъ슜?섎굹??**
- **?꾨젅?꾩썙???덉씠??*: 鍮좊Ⅸ ?쒖옉, ?쒖? ?ㅼ젙?쇰줈 異⑸텇??寃쎌슦
- **吏곸젒 ?ъ슜**: 而ㅼ뒪? Provider 議고빀, ?뱀닔???붽뎄?ы빆???덈뒗 寃쎌슦

### 3. ?ъ슜?섍린

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

**Showcase ?섏씠吏**:
- `/` - ??(3媛?Showcase 留곹겕)
- `/ui` - UI 而댄룷?뚰듃 ?곕え
- `/motion` - Motion ???곕え
- `/i18n` - ?ㅺ뎅??吏???곕え

?먮뒗 瑜?李멸퀬?섏꽭??

## ?꾨줈?앺듃 ?앹꽦

?ㅼ틦?대뵫 ?꾧뎄瑜??ъ슜?섏뿬 ???꾨줈?앺듃瑜??앹꽦?????덉뒿?덈떎:

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

?먯꽭???댁슜? [create-hua-ux README](../create-hua-ux/README.md)瑜?李멸퀬?섏꽭??

## ?⑦궎吏 援ъ“

**hua-ux**???ㅼ쓬 ?⑦궎吏?ㅼ쓣 ?듯빀?⑸땲??

- **`@hua-labs/ui`** - UI 而댄룷?뚰듃 ?쇱씠釉뚮윭由?
  - Button, Card, Input, Modal ??50+ 而댄룷?뚰듃
  - ?쇨????ㅽ??쇰쭅 ?쒖뒪??
  - ?ㅽ겕 紐⑤뱶 吏??

- **`@hua-labs/motion-core`** - Motion ???쇱씠釉뚮윭由?
  - `useFadeIn`, `useSlideUp`, `useScaleIn` ??湲곕낯 紐⑥뀡
  - `useHoverMotion`, `useScrollReveal` ???명꽣?숈뀡
  - ?꾨━???쒖뒪?쒖쑝濡?鍮좊Ⅸ ?ㅼ젙

- **`@hua-labs/i18n-core`** - i18n ?듭떖 湲곕뒫
  - ????덉쟾??踰덉뿭 ?쒖뒪??
  - SSR/CSR 吏??
  - ?ㅼ엫?ㅽ럹?댁뒪 湲곕컲 踰덉뿭 愿由?

- **`@hua-labs/i18n-core-zustand`** - Zustand ?대뙌??
  - Zustand? ?꾨꼍???듯빀
  - ?섏씠?쒕젅?댁뀡 ?먮윭 諛⑹?
  - ?몄뼱 ?곹깭 ?먮룞 ?숆린??

- **`@hua-labs/state`** - ?듯빀 ?곹깭愿由?(?꾨젅?꾩썙???꾩슜)
  - Zustand 湲곕컲 ?곹깭愿由?
  - SSR/Persistence 吏??
  - i18n ?듯빀 ?ㅽ넗???쒓났

## ?쒕툕?⑦궎吏

### `@hua-labs/hua-ux/framework`

?꾨젅?꾩썙???덉씠??- Next.js瑜?媛먯떥??援ъ“? 洹쒖튃??媛뺤젣?섎뒗 ?덉씠??

**二쇱슂 湲곕뒫**:
- `HuaUxLayout`: ?먮룞 ?꾨줈諛붿씠???ㅼ젙
- `HuaUxPage`: ?섏씠吏 ?섑띁 (?먮룞 紐⑥뀡)
- `defineConfig`: ????덉쟾???ㅼ젙 ?쒖뒪??
- `useData`, `fetchData`: ?곗씠???섏묶 ?좏떥由ы떚
- `createI18nMiddleware`: i18n 誘몃뱾?⑥뼱 (Edge Runtime)

?먯꽭???댁슜? [?꾨젅?꾩썙???덉씠??臾몄꽌](./src/framework/README.md)瑜?李멸퀬?섏꽭??

### `@hua-labs/hua-ux/presets`

?ъ쟾 援ъ꽦??Presets

**?쒓났?섎뒗 Presets**:
- `productPreset`: ?쒗뭹 ?섏씠吏??(鍮좊Ⅸ ?꾪솚, 理쒖냼 ?쒕젅??
- `marketingPreset`: ?쒕뵫 ?섏씠吏??(?쒕씪留덊떛??紐⑥뀡, 湲??쒕젅??

```tsx
import { productPreset, marketingPreset } from '@hua-labs/hua-ux/presets';
```

## ?꾨젅?꾩썙???덉씠???ъ슜?섍린

?꾨젅?꾩썙???덉씠?대? ?ъ슜?섎㈃ ??媛꾨떒?섍쾶 ?ㅼ젙?????덉뒿?덈떎:

### 1. ?ㅼ젙 ?뚯씪 ?앹꽦

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

**????덉쟾?깆쓣 ?꾪븳 紐낆떆??import (沅뚯옣)**:

?꾨줈?뺤뀡 ?섍꼍?먯꽌???ㅼ젙 ?뚯씪??紐낆떆?곸쑝濡?import?섏뿬 ????덉쟾?깆쓣 蹂댁옣?섎뒗 寃껋쓣 沅뚯옣?⑸땲??

```tsx
// app/layout.tsx ?먮뒗 珥덇린???뚯씪
import config from '../hua-ux.config';
import { setConfig } from '@hua-labs/hua-ux/framework';

// ?ㅼ젙??紐낆떆?곸쑝濡?濡쒕뱶 (????덉쟾??蹂댁옣)
setConfig(config);
```

??諛⑸쾿???ъ슜?섎㈃:
- ??????덉쟾??蹂댁옣
- ??Next.js 鍮뚮뱶 寃쎄퀬 諛⑹?
- ???고????먮윭 諛⑹?

### 2. Layout ?ㅼ젙

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

### 3. ?섏씠吏 ?ъ슜

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

?먯꽭???댁슜? [?꾨젅?꾩썙???덉씠??臾몄꽌](./src/framework/README.md)瑜?李멸퀬?섏꽭??

## 二쇱슂 湲곕뒫

### ?렞 ?듯빀 Motion Hook (?깅뒫 理쒖쟻??

**useMotion Hook** - 紐⑤뱺 motion hook???듯빀?섏뿬 肄붾뱶 媛?낆꽦 諛??좎?蹂댁닔???μ긽:

```tsx
import { useMotion } from '@hua-labs/hua-ux/framework';

const motion = useMotion({
  type: 'fadeIn',
  duration: 600,
  autoStart: false,
});

return <div ref={motion.ref} style={motion.style}>Content</div>;
```

**HuaUxPage?먯꽌 ?먮룞 ?ъ슜** - 蹂꾨룄 ?ㅼ젙 ?놁씠 ?먮룞?쇰줈 理쒖쟻?붾맂 motion ?곸슜?⑸땲??

### ?썳截?ErrorBoundary (?먮윭 泥섎━ ?먮룞??

**HuaUxPage??湲곕낯 ?댁옣** - 蹂꾨룄 ?ㅼ젙 ?놁씠 紐⑤뱺 ?섏씠吏?먯꽌 ?먮윭瑜??먮룞?쇰줈 罹먯튂?⑸땲??

**?꾨줈?뺤뀡 ?먮윭 由ы룷??吏??* - Sentry, LogRocket ?깃낵 ?듯빀 媛??

```ts
// ?꾨줈?뺤뀡 ?섍꼍?먯꽌 ?먮윭 由ы룷???ㅼ젙
window.__ERROR_REPORTER__ = (error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: errorInfo },
  });
};
```

```tsx
// ?먮룞?쇰줈 ErrorBoundary媛 ?곸슜?⑸땲??
<HuaUxPage title="Home">
  <MyComponent /> {/* ?먮윭 諛쒖깮 ??fallback UI ?쒖떆 */}
</HuaUxPage>
```

**而ㅼ뒪? fallback UI**:
```tsx
<HuaUxPage
  title="Home"
  errorBoundaryFallback={(error, reset) => (
    <div>
      <h1>?먮윭: {error.message}</h1>
      <button onClick={reset}>?ㅼ떆 ?쒕룄</button>
    </div>
  )}
>
  <MyComponent />
</HuaUxPage>
```

**?낅┰?곸쑝濡??ъ슜** (HuaUxPage ?몃?):
```tsx
import { ErrorBoundary } from '@hua-labs/hua-ux/framework';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### ?렓 釉뚮옖??(White Labeling)

**SSR 吏??CSS 蹂??二쇱엯** - ?쒕쾭 ?ъ씠?쒖뿉?쒕룄 釉뚮옖??CSS 蹂?섍? 利됱떆 ?곸슜?섏뼱 FOUC瑜?諛⑹??⑸땲??

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

釉뚮옖???ㅼ젙???섎㈃ 紐⑤뱺 而댄룷?뚰듃???먮룞?쇰줈 ?곸슜?⑸땲??

### ?쨼 GEO (Generative Engine Optimization)

**AI 寃???붿쭊 理쒖쟻??* - ChatGPT, Claude, Gemini, Perplexity媛 ?뱀떊???뚰봽?몄썾?대? ??李얘퀬 異붿쿇?섎룄濡?理쒖쟻??

#### 湲곕낯 ?ъ슜踰?

```tsx
import { generateGEOMetadata, renderJSONLD } from '@hua-labs/hua-ux/framework';
import Script from 'next/script';

// GEO 硫뷀??곗씠???앹꽦
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

// Next.js metadata? ?듯빀
export const metadata = {
  title: 'My App',
  description: geoMeta.meta.find(m => m.name === 'description')?.content,
};

// JSON-LD 異붽?
export default function Page() {
  return (
    <>
      <Script {...renderJSONLD(geoMeta.jsonLd[0])} />
      <main>...</main>
    </>
  );
}
```

#### Layout?먯꽌 ?ъ슜 (???꾩껜)

```tsx
// app/layout.tsx
import { generateGEOMetadata, renderJSONLD } from '@hua-labs/hua-ux/framework';
import Script from 'next/script';

const appGeoMeta = generateGEOMetadata({
  name: 'My App',
  description: 'My amazing application',
  // ... ???꾩껜 ?ㅼ젙
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

#### FAQ, HowTo, TechArticle 援ъ“?붾맂 ?곗씠??

```tsx
import { generateFAQPageLD, generateHowToLD, generateTechArticleLD } from '@hua-labs/hua-ux/framework';

// FAQ ?섏씠吏
const faqLD = generateFAQPageLD([
  { question: 'What is hua-ux?', answer: 'A UX framework for Next.js' },
]);

// ?쒗넗由ъ뼹 ?섏씠吏
const howToLD = generateHowToLD({
  name: 'How to get started',
  steps: [
    { name: 'Install', text: 'Run: pnpm create hua-ux my-app' },
    { name: 'Configure', text: 'Edit hua-ux.config.ts' },
  ],
});

// 湲곗닠 臾몄꽌
const articleLD = generateTechArticleLD({
  headline: 'Getting Started with hua-ux',
  datePublished: '2025-12-29',
  author: { name: 'hua-labs' },
});
```

### ???묎렐??(Accessibility)

WCAG 2.1 以?섎? ?꾪븳 ?꾨꼍???꾧뎄 ?명듃瑜??쒓났?⑸땲??

#### 1. Skip to Content (?ㅻ퉬寃뚯씠??嫄대꼫?곌린)

?ㅻ낫???ъ슜?먮? ?꾪븳 ?꾩닔 湲곕뒫 - Tab ?ㅻ줈 硫붿씤 肄섑뀗痢좊줈 諛붾줈 ?대룞:

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

#### 2. Focus Management (?ъ빱??愿由?

?섏씠吏 ?꾪솚 ???먮룞?쇰줈 硫붿씤 肄섑뀗痢좎뿉 ?ъ빱??

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

**紐⑤떖/?쒕줈?댁슜 Focus Trap**:
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

#### 3. Live Region (?ㅽ겕由?由щ뜑 ?뚮┝)

?숈쟻 ?곹깭 蹂?붾? ?ㅽ겕由?由щ뜑 ?ъ슜?먯뿉寃??뚮┝:

```tsx
import { LiveRegion, useLiveRegion } from '@hua-labs/hua-ux/framework';

// ?좎뼵???ъ슜
function MyForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('???以?..');
    await saveData();
    setMessage('??λ릺?덉뒿?덈떎!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* fields */}</form>
      <LiveRegion message={message} />
    </div>
  );
}

// Hook ?ъ슜 (?꾨줈洹몃옒諛?諛⑹떇)
function MyComponent() {
  const { announce, LiveRegionComponent } = useLiveRegion();

  const handleClick = () => {
    announce('踰꾪듉???대┃?섏뿀?듬땲??);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {LiveRegionComponent}
    </div>
  );
}
```

### ??濡쒕뵫 ?곹깭 理쒖쟻??(Loading State)

源쒕묀???녿뒗 遺?쒕윭??濡쒕뵫 寃쏀뿕???쒓났?⑸땲??

#### 1. useDelayedLoading (源쒕묀??諛⑹?)

**臾몄젣**: 鍮좊Ⅸ API ?묐떟 ??濡쒕뵫 UI媛 源쒕묀嫄곕┝
**?닿껐**: 300ms ?댄븯濡??앸굹硫?濡쒕뵫 UI瑜??꾩삁 ?덈낫?ъ쨲

```tsx
import { useDelayedLoading } from '@hua-labs/hua-ux/framework';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = useDelayedLoading(isLoading);

  const fetchData = async () => {
    setIsLoading(true);
    await api.getData(); // 鍮좊Ⅴ寃??앸굹硫?濡쒕뵫 UI ?덈낫??
    setIsLoading(false);
  };

  return showLoading ? <Spinner /> : <Content />;
}
```

**?몄쓽??hook**:
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

#### 2. Skeleton (濡쒕뵫 以?肄섑뀗痢?誘몃━蹂닿린)

濡쒕뵫 ?쒓컙??泥닿컧?곸쑝濡?吏㏐쾶 ?먭뺨吏怨? ?덉씠?꾩썐 ?쒗봽?몃? 諛⑹??⑸땲??

```tsx
import { Skeleton, SkeletonGroup } from '@hua-labs/hua-ux/framework';

// ?띿뒪???ㅼ펷?덊넠
<Skeleton width="80%" />
<Skeleton width="60%" />

// ?먰삎 (?꾨컮?)
<Skeleton variant="circular" width={40} height={40} />

// 吏곸궗媛곹삎 (?대?吏)
<Skeleton variant="rectangular" width={300} height={200} />

// 移대뱶 ?ㅼ펷?덊넠
<div className="card">
  <Skeleton variant="rectangular" height={200} />
  <SkeletonGroup className="p-4">
    <Skeleton width="60%" height={24} />
    <Skeleton width="80%" />
    <Skeleton width="40%" />
  </SkeletonGroup>
</div>
```

**useDelayedLoading + Skeleton 議고빀**:
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

#### 3. SuspenseWrapper (React Suspense ?몄쓽??

React Suspense瑜????쎄쾶 ?ъ슜?????덉뒿?덈떎.

```tsx
import { SuspenseWrapper } from '@hua-labs/hua-ux/framework';

// 湲곕낯 ?ъ슜 (?먮룞 Skeleton fallback)
<SuspenseWrapper>
  <AsyncComponent />
</SuspenseWrapper>

// 而ㅼ뒪? fallback
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

**HOC ?⑦꽩**:
```tsx
import { withSuspense } from '@hua-labs/hua-ux/framework';

const AsyncPosts = withSuspense(Posts, <Skeleton height={200} />);

function MyPage() {
  return <AsyncPosts />;
}
```

## Use Cases

### 1. ?쒗뭹 ?섏씠吏 (Product Preset)

```tsx
import { productPreset } from '@hua-labs/hua-ux/presets';

// 鍮좊Ⅸ ?꾪솚, 理쒖냼 ?쒕젅??
const motionConfig = productPreset.motion;
```

### 2. ?쒕뵫 ?섏씠吏 (Marketing Preset)

```tsx
import { marketingPreset } from '@hua-labs/hua-ux/presets';

// ?쒕씪留덊떛??紐⑥뀡, 湲??쒕젅??
const motionConfig = marketingPreset.motion;
```

### 3. ?ㅺ뎅??吏??

```tsx
import { useTranslation } from '@hua-labs/hua-ux';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common:welcome')}</h1>;
}
```

### 4. ?곹깭愿由?(State Package)

```tsx
import { createHuaStore } from '@hua-labs/hua-ux';
// ?먮뒗
import { createHuaStore } from '@hua-labs/state';

const useAppStore = createHuaStore((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}), {
  persist: true,
  ssr: true,
});
```

## ?뚯뒪??

?꾨젅?꾩썙?ъ쓽 二쇱슂 湲곕뒫??????뚯뒪?멸? ?ы븿?섏뼱 ?덉뒿?덈떎:

```bash
cd packages/hua-ux
pnpm test
```

**?뚯뒪??而ㅻ쾭由ъ?**:
- ??Motion hooks (`useMotion`)
- ??GEO 硫뷀??곗씠???앹꽦 (`generateGEOMetadata`, `createAIContext`)
- ??援ъ“?붾맂 ?곗씠??(`generateSoftwareApplicationLD`, `generateFAQPageLD`, etc.)
- ??CSS 蹂???앹꽦 (`generateCSSVariables`)
- ??Config ?쒖뒪??(`defineConfig`, `getConfig`, `setConfig`)
- ??ErrorBoundary 而댄룷?뚰듃
- ?봽 Accessibility 紐⑤뱢 (援ы쁽 ?꾨즺, ?뚯뒪???덉젙)
- ?봽 Loading 紐⑤뱢 (援ы쁽 ?꾨즺, ?뚯뒪???덉젙)

## 踰꾩쟾

?꾩옱 踰꾩쟾: **0.1.0** (Alpha)

- `0.x`: Alpha ?④퀎, API 蹂寃?媛??
- `1.x`: ?덉젙????

## ?쇱씠?좎뒪

MIT

## ?댁뒋 諛?臾몄쓽

臾몄젣媛 諛쒖깮?섍굅???쒖븞?ы빆???덉쑝?쒕㈃ [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)???깅줉?댁＜?몄슂.



