# @hua-labs/hua-ux/framework

**Framework layer for hua-ux** - Structure and rules enforcement with developer affordances.

A framework layer that wraps Next.js to enforce structure and conventions while providing maximum convenience through affordances.

## Installation

This is part of `@hua-labs/hua-ux`. Install the main package:

```bash
pnpm add @hua-labs/hua-ux zustand
```

## Features

- ✅ **Automatic Provider Setup**: `HuaUxLayout` automatically configures i18n, motion, and state
- ✅ **Configuration System**: Type-safe configuration via `hua-ux.config.ts`
- ✅ **Data Fetching**: Type-safe utilities for server and client components
- ✅ **Middleware System**: Built-in i18n middleware for language detection
- ✅ **File Structure Validation**: Ensures project follows framework conventions
- ✅ **Type Safe**: Full TypeScript support with autocomplete

## Quick Start

### 1. Configuration

Create `hua-ux.config.ts` in your project root:

```tsx
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

### 2. Root Layout

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

### 3. Pages

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

## API

### Components

#### `HuaUxLayout`

Root layout wrapper that automatically sets up all providers.

```tsx
<HuaUxLayout config={overrideConfig}>
  {children}
</HuaUxLayout>
```

#### `HuaUxPage`

Page wrapper with automatic motion and i18n support.

```tsx
<HuaUxPage title="Page Title" enableMotion={true}>
  {children}
</HuaUxPage>
```

### Configuration

#### `defineConfig(config)`

Define framework configuration.

```tsx
export default defineConfig({
  i18n: { /* ... */ },
  motion: { /* ... */ },
  state: { /* ... */ },
});
```

### Data Fetching

#### `useData<T>(url, options?)`

Client-side data fetching hook.

```tsx
const { data, isLoading, error, refetch } = useData<Post[]>('/api/posts');
```

#### `fetchData<T>(url, options?)`

Server-side data fetching utility.

```tsx
const posts = await fetchData<Post[]>('/api/posts');
```

### Middleware

#### `createI18nMiddleware(config)`

Create i18n middleware for Next.js.

```tsx
// middleware.ts
import { createI18nMiddleware } from '@hua-labs/hua-ux/framework';

export default createI18nMiddleware({
  defaultLanguage: 'ko',
  supportedLanguages: ['ko', 'en'],
  detectionStrategy: 'header',
});
```

### File Structure

#### `validateFileStructure(projectRoot)`

Validate project file structure.

```tsx
const result = validateFileStructure(process.cwd());
if (!result.valid) {
  console.error('Missing directories:', result.missing);
}
```

## License

MIT
