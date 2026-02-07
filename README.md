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
- **[@hua-labs/motion-core](./packages/hua-motion-core)** - 28+ performance-optimized animation hooks
  - Zero dependencies, ref-based engine
  - SSR-compatible for Next.js and Remix
  - Sensor hooks: useInView, useMouse, useReducedMotion, useWindowSize

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

**Utilities**
- **[@hua-labs/hooks](./packages/hua-hooks)** - Utility hooks (useLoading, useAutoScroll, usePerformanceMonitor)
- **[@hua-labs/utils](./packages/hua-utils)** - Utility functions (cn, merge, formatters, validation)
- **[@hua-labs/i18n-formatters](./packages/hua-i18n-formatters)** - Date, number, currency formatters

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

## Quality & Automation

We maintain high quality through comprehensive automation:

- ✅ **Changeset Validation** - Ensures all PRs include proper version updates
- ✅ **Template Quality Checks** - Validates Next.js 16 compatibility before every build
- ✅ **E2E Testing** - Tests in real-world environments across multiple OS and package managers
- ✅ **Dependency Monitoring** - Weekly checks for critical dependency updates
- ✅ **Version Detection** - Warns users about outdated versions due to npx cache

**Transparency:** All automation is publicly available in this repository.

📚 **Learn more:**
- [Automation Guide](./docs/AUTOMATION.md) - Comprehensive documentation
- [Quick Start](./docs/AUTOMATION_QUICK_START.md) - 5-minute guide for developers

**Time Saved:** ~10 hours/week through automated quality checks

---

## Development

This repository uses:
- **pnpm** for package management
- **Turborepo** for build orchestration
- **TypeScript** for type safety
- **Changesets** for versioning
- **GitHub Actions** for CI/CD automation

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
