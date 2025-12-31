# @hua-labs/i18n-loaders

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

## 1.0.0

### Major Changes

- a475818: Initial release of i18n packages:

  - **@hua-labs/i18n-core**: Core i18n library with SSR/CSR support, zero flickering on language changes, and state management integration
  - **@hua-labs/i18n-core-zustand**: Zustand adapter for seamless state management integration
  - **@hua-labs/i18n-loaders**: Production-ready translation loaders with caching, preloading, and default translation merging

  Includes complete Next.js App Router example and CodeSandbox template.

### Patch Changes

- Updated dependencies [a475818]
  - @hua-labs/i18n-core@2.0.0

## 0.1.0

### Minor Changes

- Initial release of @hua-labs/i18n-loaders

  - Production-ready API translation loader
  - Built-in TTL caching and global cache
  - Duplicate request prevention
  - Namespace preloading utilities
  - Fallback language warming
  - Default translation merging
  - Works on both server and client
  - Production tested in SUM API
