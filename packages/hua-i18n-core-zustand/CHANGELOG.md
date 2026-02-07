# @hua-labs/i18n-core-zustand

## 2.0.0-alpha.6

### Patch Changes

- 571383c: Sync platform Phase 1-3 to public repo

  **hua-ui**: Category entry split (overlay, data, interactive), motion-core peerDep removed, dnd-kit externalized to optional peerDeps

  **hua-ux**: 15 subpath exports (ui, motion, i18n, state, hooks, loaders, formatters, utils), tsup dual format build

  **motion-core**: 23 hooks API standardized (PR #407), 4 new sensor hooks (useInView, useMouse, useReducedMotion, useWindowSize)

  **New packages**: @hua-labs/hooks, @hua-labs/utils, @hua-labs/i18n-formatters

  **All packages**: tsc → tsup migration, sideEffects:false, tree-shaking optimized

- Updated dependencies [571383c]
  - @hua-labs/state@1.0.0-alpha.8
  - @hua-labs/i18n-core@1.1.0-alpha.7

## 1.1.0-alpha.2

### Patch Changes

- Updated dependencies
  - @hua-labs/i18n-core@1.1.0-alpha.4

## 1.1.0-alpha.4

### Patch Changes

- Updated dependencies [da2b2d3]
  - @hua-labs/i18n-core@1.1.0-alpha.5

## 1.1.0-alpha.3

### Patch Changes

- a14cae1: fix(i18n-core-zustand): Update zustand peer dependency to support v5

  Changed zustand peer dependency from `^4.0.0` to `^4.0.0 || ^5.0.0` to support both v4 and v5. This fixes peer dependency warnings when using with zustand 5.x.

## 1.1.0-alpha.2

### Patch Changes

- Updated dependencies [35d7058]
  - @hua-labs/i18n-core@1.1.0-alpha.4
  - @hua-labs/state@1.0.0-alpha.6

## 2.0.0-alpha.4

### Major Changes

- dd9d4b2: Release alpha versions of i18n packages with React 19 support and type safety improvements.

  - @hua-labs/i18n-core-zustand: 2.0.0-alpha.3 (major bump due to Zustand v5 breaking changes)
  - @hua-labs/i18n-beginner: 2.1.0-alpha.3
  - @hua-labs/i18n-loaders: 1.1.0-alpha.3

  Note: i18n-core-zustand requires major bump as it has breaking changes (Zustand v5 upgrade) as documented in CHANGELOG.

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

- Updated dependencies [d997d6b]
  - @hua-labs/i18n-core@1.1.0-alpha.3

## 1.1.0-alpha.2

### Minor Changes

- f7d08f1: feat(i18n-core-zustand): upgrade to zustand v5

  BREAKING CHANGE: This package now requires zustand >=5.0.0

  - Update peerDependencies to zustand >=5.0.0
  - Update devDependencies to zustand ^5.0.8
  - Ensures compatibility with @hua-labs/state which uses zustand v5

### Patch Changes

- f7d08f1: chore: align external dependency versions across all packages

  - Introduce syncpack for automated dependency version management
  - Align @types/node to ^25.0.3 across all packages
  - Align TypeScript to ^5.9.3 across all packages
  - Align React ecosystem packages to consistent versions
  - Add dependency management scripts: deps:check, deps:fix, deps:format

  This ensures consistent behavior across the monorepo and prevents version conflicts.

- Updated dependencies [f7d08f1]
  - @hua-labs/i18n-core@1.1.0-alpha.2

## 1.1.0-alpha.1

### Minor Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

### Patch Changes

- Updated dependencies
  - @hua-labs/i18n-core@1.1.0-alpha.1

## 2.0.0

### Major Changes

- a475818: Initial release of i18n packages:

  - **@hua-labs/i18n-core**: Core i18n library with SSR/CSR support, zero flickering on language changes, and state management integration
  - **@hua-labs/i18n-core-zustand**: Zustand adapter for seamless state management integration
  - **@hua-labs/i18n-loaders**: Production-ready translation loaders with caching, preloading, and default translation merging

  Includes complete Next.js App Router example and CodeSandbox template.

### Patch Changes

- Updated dependencies [a475818]
  - @hua-labs/i18n-core@2.0.0

## 1.0.0

### Major Changes

- Initial release of @hua-labs/i18n-core-zustand

  - Type-safe Zustand adapter for @hua-labs/i18n-core
  - Automatic language synchronization
  - SSR compatible with hydration handling
  - Unidirectional data flow (Zustand as source of truth)
  - Circular reference prevention
  - Minimal dependencies (Zustand only as peer dependency)
