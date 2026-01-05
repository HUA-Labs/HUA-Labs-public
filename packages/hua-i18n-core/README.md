# @hua-labs/i18n-core

Type-safe i18n library with SSR/CSR support and state management integration.
SSR/CSR 지원 및 상태 관리 통합 기능을 갖춘 타입 안전 i18n 라이브러리.

[![npm version](https://img.shields.io/npm/v/@hua-labs/i18n-core.svg)](https://www.npmjs.com/package/@hua-labs/i18n-core)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/i18n-core.svg)](https://www.npmjs.com/package/@hua-labs/i18n-core)
[![license](https://img.shields.io/npm/l/@hua-labs/i18n-core.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview
Lightweight, production-ready i18n library for React applications. Delivers zero-flicker language transitions through intelligent caching and provides seamless SSR/CSR support with built-in state management integration.

### Why i18n-core?

Built to address common challenges in React internationalization: language transition flickers and SSR hydration mismatches. Provides a focused solution for these specific problems.

**Key advantages:**
- **Zero flickering**: Automatically shows previous language translation during switch
- **SSR-first**: Built-in hydration handling, no mismatch issues
- **State management integration**: First-class Zustand support
- **Small bundle**: ~2.8KB gzipped, zero dependencies (React only)
- **Framework agnostic**: Works with Next.js, Remix, Vite, and more


## Examples

- **[CodeSandbox Template](../../examples/codesandbox-template/)** - Quick start template
- **[Next.js Example](../../examples/next-app-router-example/)** - Complete Next.js App Router example

## Installation

```bash
npm install @hua-labs/i18n-core
# or
yarn add @hua-labs/i18n-core
# or
pnpm add @hua-labs/i18n-core
```

## Features

- Lightweight core translation functionality
- Multiple translation loader strategies (API, static files, custom)
- Lazy loading support for namespaces
- SSR/SSG support with initial translations
- TypeScript support
- Zero external dependencies (except React)
- Built-in caching
- Error handling and fallback support
- Debug mode for development
- **Language change flickering prevention**: Automatically shows previous language translation during language switch
- **State management integration**: Works seamlessly with Zustand via `@hua-labs/i18n-core-zustand`
- **Raw value access**: Get arrays, objects, or any non-string values from translations via `getRawValue`
- **Automatic retry**: Network errors are automatically retried with exponential backoff (when using API loader)
- **Memory leak prevention**: LRU cache for Translator instances to prevent memory accumulation
- **Production-optimized**: Console logs are automatically suppressed in production mode

## Quick Start

### Basic Setup

```tsx
// app/layout.tsx (Next.js App Router)
import { createCoreI18n } from '@hua-labs/i18n-core';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {createCoreI18n({
          defaultLanguage: 'ko',
          fallbackLanguage: 'en',
          namespaces: ['common', 'pages']
        })({ children })}
      </body>
    </html>
  );
}
```

### Using Translations

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <p>{t('pages:home.title')}</p>
    </div>
  );
}
```

## Translation Loaders

The library supports three translation loading strategies:

### 1. API Loader (Default, Recommended)

Loads translations through API routes. Best for production environments.

```tsx
createCoreI18n({
  translationLoader: 'api',
  translationApiPath: '/api/translations', // default
  defaultLanguage: 'ko',
  namespaces: ['common', 'pages']
})
```

**API Route Example (Next.js):**

```tsx
// app/api/translations/[language]/[namespace]/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ language: string; namespace: string }> }
) {
  const { language, namespace } = await params;
  const translationPath = join(
    process.cwd(),
    'translations',
    language,
    `${namespace}.json`
  );
  
  try {
    const fileContent = await readFile(translationPath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent), {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
  }
}
```

### 2. Static File Loader

Loads translations from static JSON files in the public directory.

```tsx
createCoreI18n({
  translationLoader: 'static',
  defaultLanguage: 'ko',
  namespaces: ['common', 'pages']
})
```

The loader will try these paths:
- `/translations/{language}/{namespace}.json`
- `../translations/{language}/{namespace}.json`
- `./translations/{language}/${namespace}.json`
- `translations/{language}/${namespace}.json`
- `../../translations/{language}/${namespace}.json`

### 3. Custom Loader

Use your own translation loading function.

```tsx
createCoreI18n({
  translationLoader: 'custom',
  loadTranslations: async (language, namespace) => {
    // Load from database, CMS, or any other source
    const response = await fetch(`https://api.example.com/translations/${language}/${namespace}`);
    return response.json();
  },
  defaultLanguage: 'ko',
  namespaces: ['common', 'pages']
})
```

## File Structure

Recommended file structure for translations:

```
your-app/
├── translations/
│   ├── ko/
│   │   ├── common.json
│   │   ├── pages.json
│   │   └── footer.json
│   └── en/
│       ├── common.json
│       ├── pages.json
│       └── footer.json
└── app/
    └── layout.tsx
```

## Translation File Format

```json
// translations/en/common.json
{
  "welcome": "Welcome",
  "hello": "Hello",
  "goodbye": "Goodbye",
  "loading": "Loading...",
  "error": "An error occurred"
}
```

```json
// translations/en/pages.json
{
  "home": {
    "title": "Home",
    "description": "Home page"
  },
  "about": {
    "title": "About",
    "description": "About page"
  }
}
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <p>{t('pages:home.title')}</p>
    </div>
  );
}
```

### Translation with Parameters

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const { tWithParams } = useTranslation();
  
  return (
    <div>
      <p>{tWithParams('common:greeting', { name: 'John' })}</p>
    </div>
  );
}
```

Translation file:
```json
{
  "greeting": "Hello, {{name}}!"
}
```

### Getting Raw Values (Arrays and Objects)

Use `getRawValue` to access arrays, objects, or any non-string values from translation files:

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const { getRawValue } = useTranslation();
  
  // Get an array
  const features = getRawValue('common:features') as string[];
  
  // Get an object
  const metadata = getRawValue('common:metadata') as Record<string, string>;
  
  return (
    <div>
      <ul>
        {features?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div>
        <p>Version: {metadata?.version}</p>
        <p>Author: {metadata?.author}</p>
      </div>
    </div>
  );
}
```

Translation file:
```json
{
  "features": ["Fast", "Lightweight", "Type-safe"],
  "metadata": {
    "version": "1.0.0",
    "author": "HUA Labs"
  }
}
```

### Language Switching

```tsx
import { useLanguageChange } from '@hua-labs/i18n-core';

function LanguageSwitcher() {
  const { changeLanguage, supportedLanguages, currentLanguage } = useLanguageChange();
  
  return (
    <div>
      {supportedLanguages.map(lang => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          disabled={lang.code === currentLanguage}
        >
          {lang.nativeName}
        </button>
      ))}
    </div>
  );
}
```

### Advanced Hook Usage

```tsx
import { useTranslation } from '@hua-labs/i18n-core';

function MyComponent() {
  const {
    t,
    tWithParams,
    currentLanguage,
    setLanguage,
    isLoading,
    error,
    supportedLanguages,
    isInitialized,
    debug
  } = useTranslation();
  
  if (isLoading) {
    return <div>Loading translations...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <p>Current language: {currentLanguage}</p>
      <p>Loaded namespaces: {debug.getLoadedNamespaces().join(', ')}</p>
    </div>
  );
}
```

## SSR Support

### Server-Side Translation

```tsx
import { Translator, ssrTranslate, serverTranslate } from '@hua-labs/i18n-core';

// Using Translator class
export async function getServerTranslations(language: string) {
  const translator = await Translator.create({
    defaultLanguage: language,
    namespaces: ['common', 'pages'],
    loadTranslations: async (lang, namespace) => {
      const path = `./translations/${lang}/${namespace}.json`;
      return (await import(path)).default;
    }
  });
  
  return {
    welcome: translator.translate('common:welcome'),
    title: translator.translate('pages:home.title')
  };
}

// Using helper functions
export function getStaticTranslations(language: string) {
  const translations = require(`./translations/${language}/common.json`);
  
  return {
    welcome: ssrTranslate({
      translations,
      key: 'common:welcome',
      language
    })
  };
}
```

### SSR with Initial Translations (Recommended)

```tsx
// app/layout.tsx (Server Component)
import { loadSSRTranslations } from './lib/ssr-translations';
import { createCoreI18n } from '@hua-labs/i18n-core';

export default async function RootLayout({ children }) {
  // Load translation data from SSR
  const ssrTranslations = await loadSSRTranslations('ko');
  
  const I18nProvider = createCoreI18n({
    defaultLanguage: 'ko',
    fallbackLanguage: 'en',
    namespaces: ['common', 'navigation', 'footer'],
    initialTranslations: ssrTranslations, // Pass SSR translation data
    translationLoader: 'api'
  });
  
  return (
    <html lang="ko">
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

## Key Rules

### Namespace Keys

Always include namespace in the key:

```tsx
t('common:welcome')      // common.json -> welcome
t('pages:home.title')   // pages.json -> home.title
t('footer:brand_name')   // footer.json -> brand_name
```

### Common Namespace Shortcut

If the key doesn't include a namespace, it defaults to 'common':

```tsx
t('welcome')    // same as t('common:welcome')
t('hello')      // same as t('common:hello')
```

## Configuration Options

```tsx
createCoreI18n({
  // Required
  defaultLanguage: 'ko',
  
  // Optional
  fallbackLanguage: 'en',
  namespaces: ['common', 'pages'],
  debug: false,
  
  // Loader options
  translationLoader: 'api' | 'static' | 'custom',
  translationApiPath: '/api/translations',
  loadTranslations: async (language, namespace) => {
    // Custom loader function
  },
  
  // SSR optimization: Pre-loaded translations (no network requests)
  // Prevents missing key exposure during initial load
  initialTranslations: {
    ko: {
      common: { /* ... */ },
      navigation: { /* ... */ }
    },
    en: {
      common: { /* ... */ },
      navigation: { /* ... */ }
    }
  },
  
  // Auto language sync (disabled by default when using Zustand adapter)
  autoLanguageSync: false
})
```

## State Management Integration

### Zustand Integration

For Zustand users, use the dedicated adapter package:

```bash
pnpm add @hua-labs/i18n-core-zustand zustand
```

```tsx
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { useAppStore } from './store/useAppStore';

export const I18nProvider = createZustandI18n(useAppStore, {
  fallbackLanguage: 'en',
  namespaces: ['common', 'navigation'],
  defaultLanguage: 'ko', // SSR initial language
  initialTranslations: ssrTranslations // Optional: SSR translations
});
```

See [@hua-labs/i18n-core-zustand README](../hua-i18n-core-zustand/README.md) for full documentation.

## Language Change Optimization

The library automatically prevents flickering during language changes by temporarily showing translations from the previous language while new translations are loading.

**How it works:**
1. When language changes, `translator.setLanguage()` is called
2. If a translation key is not found in the new language yet, the library checks other loaded languages
3. If found, it temporarily returns the previous language's translation
4. Once the new language's translation is loaded, it automatically updates

This ensures a smooth user experience without showing translation keys or empty strings.

## Debug Mode

Enable debug mode to see translation loading and missing keys:

```tsx
createCoreI18n({
  debug: true,
  // ... other options
})
```

**Note**: In production (`debug: false`), console logs are automatically suppressed to improve performance and prevent information leakage.

### Missing Key Overlay (Development)

Display missing translation keys in development:

```tsx
import { MissingKeyOverlay } from '@hua-labs/i18n-core/components/MissingKeyOverlay';

function DebugBar() {
  if (process.env.NODE_ENV !== 'development') return null;
  
  return <MissingKeyOverlay />;
}
```

## Error Handling

The library includes built-in error handling:

- **Automatic fallback**: Falls back to default language when translations are missing
- **Missing key handling**: Returns key in debug mode, empty string in production
- **Network error recovery**: Automatic retry with exponential backoff (when using API loader)
- **Cache invalidation**: Automatically clears cache on errors
- **Error classification**: Distinguishes between recoverable and non-recoverable errors
- **Memory leak prevention**: LRU cache for Translator instances (max 10 instances)

## API Reference

### Main Exports

- `createCoreI18n(options?)` - Creates i18n Provider component
- `useTranslation()` - Hook for translations and language state
- `useLanguageChange()` - Hook for language switching
- `Translator` - Core translation class (for SSR)
- `ssrTranslate()` / `serverTranslate()` - Server-side translation helpers

## Requirements

- React >= 16.8.0
- TypeScript (recommended)

## Bundle Size

- **~2.8 KB** gzipped
- Zero dependencies (React only as peer dependency)

## Troubleshooting

### Translations Not Loading

1. Check file paths match the expected structure
2. Verify JSON format is valid
3. Check network requests in browser DevTools
4. Enable debug mode to see loading logs

### Missing Keys

1. Ensure namespace is included in key: `t('namespace:key')`
2. Check translation files contain the key
3. Verify namespace is included in config: `namespaces: ['namespace']`

### API Loader Not Working

1. Verify API route is accessible
2. Check API route returns valid JSON
3. Ensure API route handles 404 errors gracefully
4. Check CORS settings if loading from different domain

## Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - Core architecture and design patterns

## Code Quality

This package has been refactored for better maintainability:

- **Modular functions**: Translation logic split into focused helper methods
- **Type safety**: Improved type guards and error handling
- **Performance**: Optimized translation lookup with proper memoization
- **Code clarity**: Removed commented code and improved function organization

## Related Packages

- `@hua-labs/i18n-core-zustand`: Zustand state management integration adapter
- `@hua-labs/i18n-loaders`: Production-ready loaders, caching, and preloading helpers
- `@hua-labs/i18n-advanced`: Advanced features like pluralization, date formatting, etc.
- `@hua-labs/i18n-debug`: Debug tools and development helpers

## License

MIT
