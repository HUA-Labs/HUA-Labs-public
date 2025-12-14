# @hua-labs/i18n-core-zustand

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
