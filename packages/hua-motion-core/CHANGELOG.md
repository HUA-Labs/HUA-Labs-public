# @hua-labs/motion-core

## 2.1.0-alpha.2

### Patch Changes

- f7d08f1: chore: align external dependency versions across all packages

  - Introduce syncpack for automated dependency version management
  - Align @types/node to ^25.0.3 across all packages
  - Align TypeScript to ^5.9.3 across all packages
  - Align React ecosystem packages to consistent versions
  - Add dependency management scripts: deps:check, deps:fix, deps:format

  This ensures consistent behavior across the monorepo and prevents version conflicts.

## 2.1.0-alpha.1

### Minor Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

## 1.1.0

### Minor Changes

- 31920d5: Update motion-core with latest hooks and improvements

  - Added `useUnifiedMotion` hook for streamlined animation API
  - Enhanced type definitions for better TypeScript support
  - Improved animation performance and stability
  - Updated documentation and examples

## 2.0.0

### Major Changes

- 950a40d: # HUA Motion Core v1.0.0 - Essential React motion hooks with TypeScript support

  - 25 essential motion hooks for React applications
  - Full TypeScript support with comprehensive type definitions
  - Zero external dependencies, lightweight and performant
  - SSR ready for Next.js and other frameworks
  - Extensive test coverage (74%+ functions)
  - Intuitive API design for easy integration
  - Covers fade, slide, scale, scroll, and interaction animations
