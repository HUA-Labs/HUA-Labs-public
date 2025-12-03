# HUA Labs Public

Public SDKs and libraries provided by HUA Labs.

## Available Packages

### Internationalization (i18n)
- **[@hua-labs/i18n-beginner](./packages/hua-i18n-beginner)** - Simple i18n SDK for React beginners
  - [English](./packages/hua-i18n-beginner/README.md) | [한국어](./packages/hua-i18n-beginner/README_EN.md)
- **[@hua-labs/i18n-core](./packages/hua-i18n-core)** - Core i18n functionality with SSR/CSR support
- **[@hua-labs/i18n-core-zustand](./packages/hua-i18n-core-zustand)** - Zustand adapter for i18n-core
- **[@hua-labs/i18n-loaders](./packages/hua-i18n-loaders)** - Production-ready translation loaders
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

## Examples

### i18n Examples

- **[CodeSandbox Template](./examples/codesandbox-template/)** - Quick start template for CodeSandbox
  - 📝 [Setup Guide](./examples/codesandbox-template/SETUP_BEFORE_NPM.md) - Setup instructions before npm package release
  - 🚀 [Deployment Guide](./examples/codesandbox-template/DEPLOYMENT.md) - How to deploy to CodeSandbox
- **[Next.js App Router Example](./examples/next-app-router-example/)** - Complete Next.js example with SSR, Zustand, and multiple namespaces
  - 🚀 [Deployment Guide](./examples/next-app-router-example/DEPLOYMENT.md) - How to deploy to Vercel
  - ⚡ [Quick Start](./examples/next-app-router-example/QUICK_START.md) - Quick start guide

### Demo Sites

- **[i18n Core Live Demo](https://i18n-core-demo.vercel.app)** - Next.js example with 6 languages, animations, and SSR support (coming soon)
- **[i18n Beginner Demo](https://i18n-demo.hua-labs.com)** - i18n Beginner SDK demo
- **[Motion Core Demo](https://motion-core.hua-labs.com)** - Motion Core hooks demo (coming soon)
- **[UI Components Demo](https://ui.hua-labs.com)** - UI components demo (coming soon)

> **Note**: Live demos will be available after deployment. See deployment guides for each example.

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

### Repository Synchronization

This repository is synchronized with the main HUA Platform repository. Use the provided scripts to sync i18n packages:

#### Sync to Main Repository

Sync i18n packages from this public repository to the main private repository:

**PowerShell (Windows):**
```powershell
# Main repository path is required
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\path\to\main\repo"

# Dry run (preview changes without applying)
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\path\to\main\repo" -DryRun
```

**Bash (Linux/Mac):**
```bash
# Main repository path is required
MAIN_REPO_PATH="/path/to/main/repo" ./scripts/sync-to-main-repo.sh

# Dry run
MAIN_REPO_PATH="/path/to/main/repo" DRY_RUN=true ./scripts/sync-to-main-repo.sh
```

The script will:
- Copy `hua-i18n-core`, `hua-i18n-core-zustand`, and `hua-i18n-loaders` packages
- Sync source files, configuration, and documentation
- Exclude build artifacts (`dist` folder)

#### Branch Cleanup

Clean up branches, keeping only `main` and `develop`:

**PowerShell (Windows):**
```powershell
.\scripts\cleanup-branches.ps1
```

**Force mode (skip confirmation):**
```powershell
.\scripts\cleanup-branches.ps1 -Force
```

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Links

- **[HUA Labs Official](https://hua-labs.com)** - Official website
- **[GitHub](https://github.com/HUA-Labs/HUA-Labs-public)** - Source code
- **[Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)** - Bug reports and feature requests

---

Made with ❤️ by HUA Labs Team 