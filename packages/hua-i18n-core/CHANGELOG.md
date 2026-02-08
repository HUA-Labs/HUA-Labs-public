# @hua-labs/i18n-core

## 1.1.0

### Patch Changes

- 34dcb5c: CVA Phase 5 migration, README standardization, Skeleton fix

  **hua-ui**: Full CVA migration (73+ components), new advanced components (AnimatedGradient, Carousel, GlowCard, etc.), emotion analysis components, blog editor

  **All packages**: Bilingual README standardization, Skeleton rendering fix (#411)

## 1.1.0-alpha.9

### Patch Changes

- CVA Phase 5 migration, README standardization, Skeleton fix

  **hua-ui**: Full CVA migration (73+ components), new advanced components (AnimatedGradient, Carousel, GlowCard, etc.), emotion analysis components, blog editor

  **All packages**: Bilingual README standardization, Skeleton rendering fix (#411)

## 1.1.0-alpha.8

### Patch Changes

- Standardize READMEs, fix Skeleton rendering, remove deprecated i18n-beginner

  **All packages**: Bilingual README standardization (EN/KO inline format, consistent template)

  **hua-ui**: Fix Skeleton component — inline styles overriding Tailwind className (#411). Default dimensions moved to CVA variant classes.

  **Cleanup**: Remove @hua-labs/i18n-beginner (deprecated), delete internal docs from packages

## 1.1.0-alpha.7

### Patch Changes

- 571383c: Sync platform Phase 1-3 to public repo

  **hua-ui**: Category entry split (overlay, data, interactive), motion-core peerDep removed, dnd-kit externalized to optional peerDeps

  **hua-ux**: 15 subpath exports (ui, motion, i18n, state, hooks, loaders, formatters, utils), tsup dual format build

  **motion-core**: 23 hooks API standardized (PR #407), 4 new sensor hooks (useInView, useMouse, useReducedMotion, useWindowSize)

  **New packages**: @hua-labs/hooks, @hua-labs/utils, @hua-labs/i18n-formatters

  **All packages**: tsc → tsup migration, sideEffects:false, tree-shaking optimized

## 1.1.0-alpha.4

### Patch Changes

- feat: Motion hooks, Logo component, FormControl/NumberInput

  - Motion hooks: useInView, useMouse, useReducedMotion, useScrollProgress, useWindowSize
  - Logo component for branding
  - FormControl, NumberInput components
  - Various README and template updates

## 1.1.0-alpha.5

### Minor Changes

- da2b2d3: feat: useStaggerMotion hook, WelcomePage redesign, i18n 10 languages

  ### @hua-labs/motion-core

  - Add `useStaggerMotion` hook for animating multiple items with staggered timing
  - Supports fadeIn, slideUp, slideLeft, slideRight, scaleIn motion types
  - Configurable staggerDelay, initialDelay, duration, threshold options

  ### @hua-labs/hua-ux

  - Redesign WelcomePage with Next.js-style layout
  - Add HUA logo, code block UI, Quick Links cards
  - Add footer with HUA Labs, Docs, GitHub, email links
  - Apply useFadeIn, useSlideUp motion animations

  ### @hua-labs/i18n-core

  - Expand default languages from 2 to 10
  - Added: en-IN, ja, zh, zh-TW, es, ru, de, fr

  ### @hua-labs/ui

  - Export recommended-theme.css for Tailwind v4 @theme directive

  ### create-hua-ux

  - Update template globals.css to import recommended-theme.css
  - Add fadeIn, slideUp CSS animations
  - Add Tailwind CSS v4 styling documentation to ai-context.md

## 1.1.0-alpha.4

### Patch Changes

- 35d7058: feat: HUA ecosystem major update

  **@hua-labs/ui**

  - Add 331 Iconsax icons with dynamic loading system
  - Add SDUI (Server-Driven UI) registry and types
  - Add ColorPicker component
  - Add CodeBlock component
  - Add motion utilities (easing, keyframes)
  - Add recommended-theme.css

  **@hua-labs/i18n-core**

  - Fix React version requirement (>= 19.0.0)
  - Add Coming Soon tags to unreleased related packages

  **@hua-labs/hua-ux**

  - Update framework with SSR improvements
  - Add server utilities for translations

  **@hua-labs/state**

  - Add onStoreRehydrated export
  - SSR support improvements

  **create-hua-ux**

  - Version sync

## 1.1.0-alpha.3

### Patch Changes

- d997d6b: # npm Provenance & Documentation Improvements

  ## npm Provenance (출처증명)

  - Add npm provenance support for all packages
  - Configure `.npmrc` with `provenance=true`
  - Add `id-token: write` permission to release workflow
  - Enhance supply chain security with package attestations

  ## Documentation Enhancements

  - **Badges**: Standardize badges across all package READMEs

    - Add npm downloads badge to all packages
    - Add TypeScript badge to all packages
    - Ensure consistent badge formatting

  - **Bilingual Support**: Improve Korean-English navigation
    - Add language navigation links to all READMEs
    - Format: `[English](#english) | [한국어](#korean)`
    - Maintain consistent bilingual structure

  ## Affected Packages

  All 9 packages receive patch updates for documentation and provenance:

  - @hua-labs/hua-ux
  - @hua-labs/ui
  - @hua-labs/motion-core
  - @hua-labs/i18n-core
  - @hua-labs/i18n-core-zustand
  - @hua-labs/i18n-loaders
  - @hua-labs/i18n-beginner
  - @hua-labs/state
  - create-hua-ux

## 1.1.0-alpha.2

### Patch Changes

- f7d08f1: chore: align external dependency versions across all packages

  - Introduce syncpack for automated dependency version management
  - Align @types/node to ^25.0.3 across all packages
  - Align TypeScript to ^5.9.3 across all packages
  - Align React ecosystem packages to consistent versions
  - Add dependency management scripts: deps:check, deps:fix, deps:format

  This ensures consistent behavior across the monorepo and prevents version conflicts.

## 1.1.0-alpha.1

### Minor Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

## 2.0.0

### Major Changes

- a475818: Initial release of i18n packages:

  - **@hua-labs/i18n-core**: Core i18n library with SSR/CSR support, zero flickering on language changes, and state management integration
  - **@hua-labs/i18n-core-zustand**: Zustand adapter for seamless state management integration
  - **@hua-labs/i18n-loaders**: Production-ready translation loaders with caching, preloading, and default translation merging

  Includes complete Next.js App Router example and CodeSandbox template.

## 1.0.0

### Major Changes

- Initial release of @hua-labs/i18n-core

  - Type-safe i18n library with SSR/CSR support
  - Zero flickering on language changes
  - Built-in hydration handling
  - State management integration support
  - Framework agnostic (Next.js, Remix, Vite, etc.)
  - Small bundle size (~2.8KB gzipped)
  - Zero dependencies (React only)
