# HUA Labs Public

Public SDKs and libraries provided by HUA Labs.

## Available Packages | 사용 가능한 패키지

### 🎯 UX Framework | UX 프레임워크 (NEW!)
- **[@hua-labs/hua-ux](./packages/hua-ux)** - Ship UX faster: UI + motion + i18n, pre-wired ⭐
  - Complete UX framework for React product teams | React 프로덕트 팀을 위한 완전한 UX 프레임워크
  - Includes framework layer (HuaUxLayout, HuaUxPage) | 프레임워크 레이어 포함
  - GEO (AI search engine optimization) support | GEO (AI 검색 엔진 최적화) 지원
  - Accessibility features & loading optimization | 접근성 기능 및 로딩 최적화
- **[create-hua-ux](./packages/create-hua-ux)** - CLI tool for scaffolding hua-ux projects | hua-ux 프로젝트 생성 CLI 도구
  - Quick project setup with interactive prompts | 대화형 프롬프트로 빠른 프로젝트 설정
  - AI context files generation | AI 컨텍스트 파일 생성
- **[@hua-labs/state](./packages/hua-state)** - Unified state management with SSR support | SSR 지원 통합 상태 관리
  - Zustand-based state management | Zustand 기반 상태 관리
  - i18n integration store | i18n 통합 스토어

### Internationalization (i18n)
- **[@hua-labs/i18n-beginner](./packages/hua-i18n-beginner)** - Simple i18n SDK for React beginners
  - [English](./packages/hua-i18n-beginner/README.md) | [한국어](./packages/hua-i18n-beginner/README_EN.md)
- **[@hua-labs/i18n-core](./packages/hua-i18n-core)** - Core i18n functionality with SSR/CSR support
- **[@hua-labs/i18n-core-zustand](./packages/hua-i18n-core-zustand)** - Zustand adapter for i18n-core
- **[@hua-labs/i18n-loaders](./packages/hua-i18n-loaders)** - Production-ready translation loaders
- **@hua-labs/i18n-sdk** - Advanced i18n SDK (coming soon)
- **@hua-labs/i18n-advanced** - Enterprise-grade i18n solution (coming soon)

### UI Components
- **[@hua-labs/ui](./packages/hua-ui)** - Modern React UI component library
  - Beautiful, accessible, customizable components
  - 50+ components with advanced features
  - [English](./packages/hua-ui/README.md)

### Motion & Animation
- **[@hua-labs/motion-core](./packages/hua-motion-core)** - Essential React animation hooks (25+ hooks)
  - [English](./packages/hua-motion-core/README.md) | [한국어](./packages/hua-motion-core/README_KR.md)
- **@hua-labs/animation** - ~~Animation library~~ ⚠️ **DEPRECATED** - Migrate to @hua-labs/motion-core

## Quick Start

### Installation

```bash
# HUA UX Framework (NEW! - Complete UX solution)
pnpm create hua-ux my-app
# or
npm create hua-ux my-app

# i18n Beginner SDK
npm install @hua-labs/i18n-beginner

# Motion Core
npm install @hua-labs/motion-core

# UI Components
npm install @hua-labs/ui

# or yarn
yarn add @hua-labs/i18n-beginner @hua-labs/motion-core @hua-labs/ui

# or pnpm
pnpm add @hua-labs/i18n-beginner @hua-labs/motion-core @hua-labs/ui
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

# Example: Sync to HUA-platform repository
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform"

# Dry run (preview changes without applying)
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform" -DryRun
```

**Bash (Linux/Mac):**
```bash
# Main repository path is required
MAIN_REPO_PATH="/path/to/main/repo" ./scripts/sync-to-main-repo.sh

# Example: Sync to HUA-platform repository
MAIN_REPO_PATH="$HOME/projects/HUA-platform" ./scripts/sync-to-main-repo.sh

# Dry run
MAIN_REPO_PATH="$HOME/projects/HUA-platform" DRY_RUN=true ./scripts/sync-to-main-repo.sh

# Using environment variables
export MAIN_REPO_PATH="$HOME/projects/HUA-platform"
./scripts/sync-to-main-repo.sh
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