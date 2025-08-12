# HUA Labs Public

Public SDKs and libraries provided by HUA Labs.

## Available Packages

### Internationalization (i18n)
- **[@hua-labs/i18n-beginner](./packages/hua-i18n-beginner)** - Simple i18n SDK for React beginners
  - [English](./packages/hua-i18n-beginner/README.md) | [한국어](./packages/hua-i18n-beginner/README_EN.md)
- **@hua-labs/i18n-core** - Core i18n functionality (coming soon)
- **@hua-labs/i18n-sdk** - Advanced i18n SDK (coming soon)
- **@hua-labs/i18n-advanced** - Enterprise-grade i18n solution (coming soon)

### UI Components
- **[@hua-labs/ui](./packages/hua-ui)** - React UI component library
  - [English](./packages/hua-ui/README.md)

### Motion & Animation
- **[@hua-labs/motion-core](./packages/hua-motion-core)** - Essential React animation hooks (25 hooks)
  - [English](./packages/hua-motion-core/README.md) | [한국어](./packages/hua-motion-core/README_KR.md)
- **@hua-labs/animation** - ~~Animation library~~ ⚠️ **DEPRECATED** - Migrate to @hua-labs/motion-core

## Quick Start

### Installation

```bash
# i18n Beginner SDK
npm install @hua-labs/i18n-beginner

# Motion Core (New!)
npm install @hua-labs/motion-core

# or yarn
yarn add @hua-labs/i18n-beginner @hua-labs/motion-core

# or pnpm
pnpm add @hua-labs/i18n-beginner @hua-labs/motion-core
```

### Basic Usage

```tsx
// i18n Beginner SDK
import { SimpleI18n, useSimpleI18n } from '@hua-labs/i18n-beginner';

function App() {
  return (
    <SimpleI18n>
      <MyComponent />
    </SimpleI18n>
  );
}

function MyComponent() {
  const { t, toggleLanguage, languageButtonText } = useSimpleI18n();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

```tsx
// Motion Core - Essential animation hooks
import { useFadeIn, useSlideUp, useHoverMotion } from '@hua-labs/motion-core';

function AnimatedComponent() {
  const fadeIn = useFadeIn({ duration: 1000 });
  const slideUp = useSlideUp({ delay: 200 });
  const hover = useHoverMotion({ scale: 1.1 });
  
  return (
    <div 
      ref={fadeIn.ref}
      style={fadeIn.style}
      className="card"
    >
      <h2 ref={slideUp.ref} style={slideUp.style}>Animated Title</h2>
      <button 
        ref={hover.ref}
        onMouseEnter={hover.hover}
        onMouseLeave={hover.leave}
        style={hover.style}
      >
        Hover me!
      </button>
    </div>
  );
}
```
```

## Documentation

For detailed documentation of each package, please refer to the README in the respective package directory.

## Demo Sites

- **[i18n Beginner Demo](https://i18n-demo.hua-labs.com)** - i18n Beginner SDK demo
- **[Motion Core Demo](https://motion-core.hua-labs.com)** - Motion Core hooks demo (coming soon)
- **[UI Components Demo](https://ui.hua-labs.com)** - UI components demo (coming soon)

## Contributing

If you'd like to contribute, please refer to the CONTRIBUTING.md in each package.

### Development Workflow

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

#### Making Changes

1. Create a new branch for your changes
2. Make your changes
3. Create a changeset to document your changes:
   ```bash
   pnpm changeset
   ```
4. Commit your changes and the changeset
5. Create a pull request

#### Publishing

When changes are merged to main, the GitHub Action will automatically:
1. Version packages based on changesets
2. Update changelogs
3. Publish to npm

#### Available Scripts

- `pnpm version` - Version packages based on changesets
- `pnpm release` - Publish packages to npm
- `pnpm release:dry` - Dry run of the release process

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Links

- **[HUA Labs Official](https://hua-labs.com)** - Official website
- **[GitHub](https://github.com/HUA-Labs/HUA-Labs-public)** - Source code
- **[Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)** - Bug reports and feature requests

---

Made with ❤️ by HUA Labs Team 