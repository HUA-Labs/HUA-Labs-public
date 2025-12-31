# HUA Labs

Open-source React development tools for production applications.
프로덕션 애플리케이션을 위한 오픈소스 React 개발 도구.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> **⚠️ Alpha Release**: All packages are currently in alpha. APIs may change before the stable release.

---

## Packages

### Framework

- **[@hua-labs/hua-ux](./packages/hua-ux)** - Unified framework integrating UI, motion, and i18n
  - Pre-configured layout with state management
  - Zero-config setup for Next.js applications
  - Modular architecture for optimal bundle size

- **[@hua-labs/create-hua-ux](./packages/create-hua-ux)** - Project scaffolding CLI
  - Interactive project setup
  - Pre-configured templates with best practices
  - AI-optimized context files

### Core Libraries

**UI Components**
- **[@hua-labs/ui](./packages/hua-ui)** - 70+ accessible React components
  - TypeScript-native with full type safety
  - Dark mode support and ARIA compliance
  - Modular entry points

**Animation**
- **[@hua-labs/motion-core](./packages/hua-motion-core)** - 30+ performance-optimized animation hooks
  - Zero dependencies, ref-based engine
  - SSR-compatible for Next.js and Remix
  - Consistent 60fps animations

**Internationalization**
- **[@hua-labs/i18n-core](./packages/hua-i18n-core)** - Zero-flicker i18n with SSR support
  - Lightweight (~2.8KB gzipped)
  - Built-in state management integration
  - Framework-agnostic design

- **[@hua-labs/i18n-core-zustand](./packages/hua-i18n-core-zustand)** - Zustand adapter for i18n-core
- **[@hua-labs/i18n-loaders](./packages/hua-i18n-loaders)** - Translation loaders with caching
- **[@hua-labs/i18n-beginner](./packages/hua-i18n-beginner)** - Simplified i18n for beginners

**State Management**
- **[@hua-labs/state](./packages/hua-state)** - SSR-safe Zustand wrapper
  - Automatic hydration handling
  - Built-in localStorage persistence
  - i18n store integration

---

## Quick Start

### Create New Project

```bash
npm create @hua-labs/hua-ux my-app
cd my-app
npm install
npm run dev
```

### Install Individual Packages

```bash
# Framework (includes all features)
npm install @hua-labs/hua-ux zustand

# Or individual packages
npm install @hua-labs/motion-core
npm install @hua-labs/i18n-core
npm install @hua-labs/ui
```

### Basic Usage

```tsx
// Framework setup (app/layout.tsx)
import { HuaUxLayout } from '@hua-labs/hua-ux/framework';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HuaUxLayout
          i18nConfig={{
            defaultLanguage: 'en',
            namespaces: ['common']
          }}
        >
          {children}
        </HuaUxLayout>
      </body>
    </html>
  );
}

// Using integrated features
import { Button, useFadeIn, useTranslation } from '@hua-labs/hua-ux';

function Hero() {
  const { t } = useTranslation('common');
  const fadeIn = useFadeIn();

  return (
    <div ref={fadeIn.ref} style={fadeIn.style}>
      <h1>{t('welcome')}</h1>
      <Button variant="primary">Get Started</Button>
    </div>
  );
}
```

---

## Documentation

Each package includes:
- **README.md** - Overview and quick start guide
- **DETAILED_GUIDE.md** - Complete API reference and advanced usage

Visit individual package directories for comprehensive documentation.

---

## Examples

- **[Next.js App Router](./examples/next-app-router-example)** - Full-featured Next.js application with SSR
- **[CodeSandbox Template](./examples/codesandbox-template)** - Quick start template for online development

---

## Development

This repository uses:
- **pnpm** for package management
- **Turborepo** for build orchestration
- **TypeScript** for type safety
- **Changesets** for versioning

### Build All Packages

```bash
pnpm install
pnpm build
```

### Run Tests

```bash
pnpm test
```

---

## License

MIT © HUA Labs

---

## Links

- [GitHub Repository](https://github.com/HUA-Labs/HUA-Labs-public)
- [Issue Tracker](https://github.com/HUA-Labs/HUA-Labs-public/issues)
