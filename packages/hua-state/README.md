# @hua-labs/state

Unified state management for the hua-ux ecosystem with SSR support.
hua-ux 생태계를 위한 SSR 지원 통합 상태 관리 솔루션입니다.

[![npm version](https://img.shields.io/npm/v/@hua-labs/state.svg)](https://www.npmjs.com/package/@hua-labs/state)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/state.svg)](https://www.npmjs.com/package/@hua-labs/state)
[![license](https://img.shields.io/npm/l/@hua-labs/state.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview
Zustand-based state management wrapper optimized for the hua-ux ecosystem. Provides built-in SSR hydration handling, localStorage persistence, and seamless i18n integration for React and Next.js applications.

## Installation

```bash
pnpm add @hua-labs/state zustand
# or
npm install @hua-labs/state zustand
# or
yarn add @hua-labs/state zustand
```

## Features

- ✅ **Zustand-based**: Built on Zustand for lightweight, performant state management
- ✅ **SSR Support**: Automatic hydration handling for Next.js App Router
- ✅ **Persistence**: Built-in localStorage persistence with partialize support
- ✅ **i18n Integration**: Pre-configured store for language management
- ✅ **Type Safe**: Full TypeScript support with strict typing
- ✅ **Framework Optimized**: Designed specifically for hua-ux ecosystem

## Quick Start

### Basic Store

```tsx
import { createHuaStore } from '@hua-labs/state';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const useAppStore = createHuaStore<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}), {
  persist: true,
  persistKey: 'app-storage',
  ssr: true,
});

// Usage
function MyComponent() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### i18n Store

```tsx
import { createI18nStore } from '@hua-labs/state/integrations/i18n';

const useI18nStore = createI18nStore({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  persist: true,
  ssr: true,
});

// Usage
function LanguageSwitcher() {
  const language = useI18nStore((state) => state.language);
  const setLanguage = useI18nStore((state) => state.setLanguage);
  
  return (
    <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
      {language === 'ko' ? 'English' : '한국어'}
    </button>
  );
}
```

## API

### `createHuaStore<T>(storeCreator, config?)`

Creates a Zustand store with hua-ux optimizations.

**Parameters:**
- `storeCreator`: Zustand state creator function
- `config`: Optional store configuration

**Configuration Options:**
```typescript
interface StoreConfig {
  persist?: boolean;        // Enable persistence (default: false)
  persistKey?: string;      // Storage key (default: 'hua-state-storage')
  ssr?: boolean;           // Enable SSR support (default: false)
  partialize?: <T>(state: T) => Partial<T>; // Select state to persist
}
```

### `createI18nStore(config)`

Creates a pre-configured store for i18n language management.

**Configuration Options:**
```typescript
interface I18nStoreConfig {
  defaultLanguage: string;      // Default language code
  supportedLanguages: string[]; // Array of supported language codes
  persist?: boolean;            // Enable persistence (default: true)
  persistKey?: string;          // Storage key (default: 'hua-i18n-storage')
  ssr?: boolean;               // Enable SSR support (default: true)
}
```

## SSR Support

The store automatically handles SSR hydration when `ssr: true` is enabled. This prevents hydration mismatches in Next.js App Router.

```tsx
// Server-side: Store initializes with default state
// Client-side: Store hydrates from persisted state (if persist is enabled)
// No hydration errors!
```

## Persistence

When `persist: true` is enabled, the store automatically syncs with localStorage. Use `partialize` to select which state to persist:

```tsx
const useAppStore = createHuaStore((set) => ({
  theme: 'light',
  user: { id: 1, name: 'John' },
  temporaryData: '...',
}), {
  persist: true,
  partialize: (state) => ({ 
    theme: state.theme,
    // Only persist theme, not user or temporaryData
  }),
});
```

## Integration with hua-ux

This package is designed to work seamlessly with other hua-ux packages:

- **@hua-labs/i18n-core-zustand**: Use `createI18nStore` for language management
- **@hua-labs/hua-ux/framework**: Framework layer uses this for state management

## License

MIT
