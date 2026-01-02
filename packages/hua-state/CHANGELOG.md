# @hua-labs/state

## 0.1.0-alpha.2

### Patch Changes

- a1aa8e9: fix: Fix package.json exports to use dist instead of src

  Fixed exports configuration in @hua-labs/state and @hua-labs/ui:

  - Changed all import/require paths from src/_.ts to dist/_.js
  - Fixed module field to point to dist/_.js instead of dist/_.mjs
  - This resolves "Module not found" and "Missing module type" errors in Next.js projects

  Affected packages:

  - @hua-labs/state: Fixed main entry and integrations/i18n exports
  - @hua-labs/ui: Fixed main entry and all subpath exports (advanced, form, navigation, feedback, components)

## 0.1.0-alpha.1

### Minor Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

## 0.1.0-alpha.0.1

### Minor Changes

- 31920d5: Introduce unified state management package with SSR support

  - Zustand v5 based state management
  - SSR support for Next.js App Router
  - i18n integration store included
  - Type-safe with full TypeScript support
  - Lightweight and performant
