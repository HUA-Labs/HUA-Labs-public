# HUA Labs Public

Public SDKs and libraries provided by HUA Labs.

## Available Packages

### Internationalization (i18n)
- **[@hua-labs/i18n-beginner](./packages/hua-i18n-beginner)** - Simple i18n SDK for React beginners
- **@hua-labs/i18n-core** - Core i18n functionality (coming soon)
- **@hua-labs/i18n-sdk** - Advanced i18n SDK (coming soon)
- **@hua-labs/i18n-advanced** - Enterprise-grade i18n solution (coming soon)

### UI Components
- **@hua-labs/ui** - React UI component library (coming soon)

### Animation
- **@hua-labs/animation** - Animation library (coming soon)

## Quick Start

### Installation

```bash
# i18n Beginner SDK
npm install @hua-labs/i18n-beginner

# or yarn
yarn add @hua-labs/i18n-beginner

# or pnpm
pnpm add @hua-labs/i18n-beginner
```

### Basic Usage

```tsx
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

## Documentation

For detailed documentation of each package, please refer to the README in the respective package directory.

## Demo Sites

- **[i18n Beginner Demo](https://i18n-demo.hua-labs.com)** - i18n Beginner SDK demo
- **[Animation Demo](https://animation.hua-labs.com)** - Animation library demo (coming soon)
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