# Changelog

## 0.1.0-alpha.8

### Patch Changes

- 50db3b9: feat(create-hua-ux): enhance template with Next.js 16 compatibility and improved UX

  **create-hua-ux:**

  - Fix Next.js 16 async APIs (`await headers()`, `await params`)
  - Add LanguageToggle component with Globe icon and fade-in-up motion
  - Replace basic template with WelcomePage component featuring:
    - Feature cards (UI, i18n, Motion, AI-First)
    - Quick links (Documentation, Examples, GitHub)
    - Gradient header with project name
  - Add public assets:
    - logo.svg (HUA Labs brand logo)
    - favicon.ico
    - next.svg
  - Enhance metadata with keywords, authors, OpenGraph

  **@hua-labs/hua-ux:**

  - Add `framework/seo/geo` export path for server-side GEO support (preparation for future release)

  **Fixes:**

  - Resolves "headersList.get is not a function" runtime error
  - Resolves "params must be unwrapped with await" API route error
  - Resolves template validation failures

  **Compatibility:**

  - Next.js 16.1.1+
  - React 19.2.3+
  - Full backward compatibility maintained

## 0.1.0-alpha.7

### Patch Changes

- ce1a089: fix(hua-ux): add 'use client' directive to framework/index.ts

  - Fixes "createContext only works in Client Components" error when importing from @hua-labs/hua-ux/framework
  - Next.js requires 'use client' in files that re-export Client Components
  - Critical fix for create-hua-ux generated projects

## 0.1.0-alpha.6

### Patch Changes

- f7d08f1: chore: align external dependency versions across all packages

  - Introduce syncpack for automated dependency version management
  - Align @types/node to ^25.0.3 across all packages
  - Align TypeScript to ^5.9.3 across all packages
  - Align React ecosystem packages to consistent versions
  - Add dependency management scripts: deps:check, deps:fix, deps:format

  This ensures consistent behavior across the monorepo and prevents version conflicts.

- f7d08f1: fix(hua-ux, state): improve type safety and remove 'as any' assertions

  - Remove all 'as any' type assertions from hua-ux framework
  - Export zustand types (UseBoundStore, StoreApi) from @hua-labs/state for proper type inference
  - Fix LicenseFeature type handling for dynamic plugin features
  - Improve type safety in Providers.tsx by using re-exported types

- Updated dependencies [f7d08f1]
- Updated dependencies [f7d08f1]
- Updated dependencies [f7d08f1]
  - @hua-labs/i18n-core@1.1.0-alpha.2
  - @hua-labs/i18n-core-zustand@1.1.0-alpha.2
  - @hua-labs/motion-core@2.1.0-alpha.2
  - @hua-labs/state@0.1.0-alpha.3
  - @hua-labs/ui@1.1.0-alpha.3

## 0.1.0-alpha.5

### Patch Changes

- Updated dependencies [a1aa8e9]
  - @hua-labs/state@0.1.0-alpha.2
  - @hua-labs/ui@1.1.0-alpha.2

## 0.1.0-alpha.4

### Patch Changes

- fix(hua-ux): Fix package.json exports to use .js instead of .mjs

  TypeScript compiler generates .js files, not .mjs files. Updated package.json exports to point to the correct .js files.

  This fixes the "Module not found" error when importing @hua-labs/hua-ux in Next.js projects.

## 0.1.0-alpha.3

### Patch Changes

- d11a13c: fix(hua-ux): Fix critical framework issues

  - Export WelcomePage component and types from framework index
  - Fix package.json exports to point to dist instead of src for production builds
  - Remove middleware from tsconfig exclude to include it in build output

  These fixes resolve:

  1. Missing WelcomePage export (breaking change for users)
  2. Import inconsistencies between dev and production environments
  3. Middleware not being included in TypeScript compilation

## 0.1.0-alpha.2

### Patch Changes

- 2032326: docs(hua-ux): Update project creation commands to include npm and yarn. Added all three package manager options (npm, pnpm, yarn) for better user guidance after CLI package rename to create-hua-ux.

## 0.1.0-alpha.1

### Patch Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

- Updated dependencies
  - @hua-labs/motion-core@2.1.0-alpha.1
  - @hua-labs/i18n-core@1.1.0-alpha.1
  - @hua-labs/i18n-core-zustand@1.1.0-alpha.1
  - @hua-labs/state@0.1.0-alpha.1
  - @hua-labs/ui@1.1.0-alpha.1

## 0.2.0

### Minor Changes

- 31920d5: Introduce complete UX framework package (v0.1.0 alpha)

  - Added framework layer with HuaUxLayout and HuaUxPage components
  - GEO (AI search engine optimization) support built-in
  - Accessibility features and loading optimization
  - Pre-wired integration of UI, motion, i18n, and state management
  - Framework presets for common use cases

### Patch Changes

- Updated dependencies [31920d5]
- Updated dependencies [31920d5]
- Updated dependencies [31920d5]
  - @hua-labs/motion-core@1.1.0
  - @hua-labs/state@0.2.0
  - @hua-labs/ui@2.0.0

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-29

### Added

- Initial release of `@hua-labs/hua-ux` umbrella package
- Re-export all core packages: `@hua-labs/ui`, `@hua-labs/motion-core`, `@hua-labs/i18n-core`, `@hua-labs/i18n-core-zustand`
- Presets system with `product` and `marketing` presets
- Framework layer (`@hua-labs/hua-ux/framework`) for Next.js integration
- CLI scaffolding tool (`create-hua-ux`) for project generation
- Showcase demo app (`apps/hua-ux-showcase`)
- Comprehensive README with 5-minute quick start guide
- TypeScript support with full type definitions

### Framework Layer Features

- **HuaUxLayout**: Automatic provider setup for i18n, motion, and state
- **HuaUxPage**: Page wrapper with automatic motion, SEO, and i18n support
- **Configuration System**: Type-safe configuration via `hua-ux.config.ts`
- **Data Fetching**: Type-safe utilities for server and client components (`useData`, `fetchData`)
- **Middleware System**: Built-in i18n middleware for language detection
- **Branding System**: White-labeling support with CSS variables and Tailwind config
- **License System**: Pro/Enterprise feature separation (basic structure)
- **Plugin System**: Modular feature extensions (basic structure)

### CLI Tool Features

- **Project Scaffolding**: `pnpm create hua-ux` command
- **Workspace Detection**: Automatic monorepo detection via `pnpm-workspace.yaml`
- **Template Generation**: Next.js App Router template with best practices
- **Error Handling**: User-friendly error messages with troubleshooting tips

### Features

- **Product Preset**: Fast transitions, minimal delays for product pages
- **Marketing Preset**: Dramatic motions, longer delays for landing pages
- **Unified API**: Single import for all hua-ux packages
- **Type Safety**: Full TypeScript support across all packages
- **SSR Support**: Next.js App Router and Server Components support
- **Client/Server Separation**: Safe environment detection for Node.js APIs

[0.1.0]: https://github.com/HUA-Labs/HUA-Labs-public/releases/tag/hua-ux-v0.1.0
