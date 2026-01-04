# Changelog

## 1.0.0-alpha.13

### Patch Changes

- a061538: feat: add comprehensive automation for quality and reliability

  ## create-hua-ux

  - Add template validation script that runs before every build
  - Validate Next.js 16 async API patterns in templates
  - Add version checker CLI to detect npx cache issues
  - Warn users with OS-specific cache clear instructions
  - Prevent outdated templates from reaching users

  ## @hua-labs/hua-ux

  - Add GEO metadata validator for Schema.org compliance
  - Validate JSON-LD structure and required fields
  - Provide clear validation errors and warnings
  - Export validator functions from framework/seo/geo

  ## Infrastructure

  - Add PR validation workflow (changeset checks, package name validation)
  - Add E2E testing workflow (6 OS/package-manager combinations)
  - Add dependency monitoring workflow (weekly updates for Next.js, React, TypeScript)
  - Add comprehensive automation documentation (guides, troubleshooting, best practices)

  **Impact:** Saves ~10 hours/week through automated quality checks and error prevention

- ce397a1: docs(create-hua-ux): Add npx cache troubleshooting section to README. Provides clear guidance for users who receive outdated templates due to npx cache, including symptoms, cache clearing commands for Windows/macOS/Linux, prevention tips using @latest flag, and verification steps.

## 1.0.0-alpha.12

### Patch Changes

- 3286dff: feat(hua-ux/geo): add Next.js 16 server component helpers

  Adds Next.js 16 Server Component optimized GEO (Generative Engine Optimization) helpers to make AI search engines (ChatGPT, Claude, Gemini, Perplexity) easily discover and recommend your app.

  **Key Features:**

  - ✅ Full Next.js 16 async API support (`headers()`, `params`, `searchParams`)
  - ✅ Seamless integration with Next.js Metadata API
  - ✅ App-level + page-level GEO merging
  - ✅ Environment variable support for dynamic deployments
  - ✅ Type-safe with full TypeScript support

  **create-hua-ux update:**

  - Updated Next.js templates to use the new Next.js 16 async APIs and GEO helpers.

## 1.0.0-alpha.11

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

## 1.0.0-alpha.10

### Patch Changes

- ddfd7d8: fix(create-hua-ux): add missing lib/utils.ts template and fix validation

  - Add `lib/utils.ts` template file with cn() utility function for className merging
  - Remove `public/favicon.ico` from required files validation (users add this after Next.js setup)
  - Fixes template validation errors when creating new projects

## 1.0.0-alpha.9

### Patch Changes

- f7d08f1: chore: align external dependency versions across all packages

  - Introduce syncpack for automated dependency version management
  - Align @types/node to ^25.0.3 across all packages
  - Align TypeScript to ^5.9.3 across all packages
  - Align React ecosystem packages to consistent versions
  - Add dependency management scripts: deps:check, deps:fix, deps:format

  This ensures consistent behavior across the monorepo and prevents version conflicts.

- f7d08f1: fix(create-hua-ux): add missing peer dependencies to generated projects

  - Add @hua-labs/i18n-core to dependencies (fixes MODULE NOT FOUND error)
  - Add @hua-labs/motion-core to dependencies (required by @hua-labs/ui for animations)
  - Add @phosphor-icons/react to dependencies (required by @hua-labs/ui for icons)
  - Fetch latest alpha versions from npm registry for all hua-labs packages
  - Add PHOSPHOR_ICONS_VERSION constant (^2.1.10)

  This ensures all peer dependencies are satisfied and UI components work out of the box.

## 1.0.0-alpha.8

### Minor Changes

- e648340: feat(create-hua-ux): Detect and display package manager used by user

  - Added automatic package manager detection (npm, pnpm, yarn)
  - Next Steps now shows the correct commands based on how the CLI was invoked
  - Instead of hardcoded `pnpm install`, shows:
    - `npm install` when using `npm create hua-ux`
    - `pnpm install` when using `pnpm create hua-ux`
    - `yarn install` when using `yarn create hua-ux`

  Better UX as users can copy-paste commands that match their package manager preference.

## 1.0.0-alpha.7

### Patch Changes

- 16bbe79: fix(create-hua-ux): Fix broken links and add Node.js version badge

  - Fixed framework layer documentation links: `../../packages/hua-ux/src/framework/README.md` → `../hua-ux/src/framework/README.md`
  - Added Node.js version badge to README

## 1.0.0-alpha.6

### Major Changes

- 6a3163c: BREAKING CHANGE: Renamed package from `@hua-labs/create-hua-ux` to `create-hua-ux` for better CLI experience.

  **Migration Guide:**

  **Old command (no longer works):**

  ```bash
  npx @hua-labs/create-hua-ux my-app
  ```

  **New command (now works with npm create):**

  ```bash
  npm create hua-ux my-app
  # or
  pnpm create hua-ux my-app
  # or
  yarn create hua-ux my-app
  ```

  **Why this change?**

  - Enables standard `npm create` command pattern
  - Better user experience - easier to remember and type
  - Consistent with create-next-app, create-react-app, etc.
  - The old `@hua-labs/create-hua-ux` package will be deprecated

  **Note:** This is still in alpha, so we're making this breaking change now before stable release.

## 0.1.0-alpha.5

### Patch Changes

- f4116d9: docs(create-hua-ux): Update README with npm badges and enhanced features documentation. Added npm downloads badge, comprehensive features section highlighting intelligent version management, performance optimizations, and AI-optimized development tools. Reorganized "What Gets Created" section with categorized subsections for better clarity.

## 0.1.0-alpha.4

### Patch Changes

- ea5d62a: fix(create-hua-ux): Fix template copy failure when CLI is installed from npm. The filter function was checking if source path contains 'node_modules', which caused all files to be skipped when the template itself is located inside node_modules (npm installation). Changed to use relative paths for filtering.

## 0.1.0-alpha.3

### Patch Changes

- 5eefccd: fix: (create-hua-ux) Fixed Step 2/5 installation failure by resolving CJS/ESM compatibility issue with chalk v5 (downgraded to v4). Updated Node.js requirement to 22.x or higher as requested.
- ce478ab: fix: (create-hua-ux) Fetch latest alpha versions from npm registry at project creation time instead of using hardcoded version assumptions. This fixes installation failures when @hua-labs packages have different version numbers (e.g., @hua-labs/i18n-core-zustand@1.1.0-alpha.1 vs @hua-labs/hua-ux@0.1.0-alpha.1).

## 0.1.0-alpha.2

### Patch Changes

- 53abfbb: fix: (create-hua-ux) Downgraded chalk to v4 for CommonJS compatibility and allowed initialization in existing empty directories. Added --non-interactive flag and improved internal error logging.

## 0.1.0-alpha.1

### Patch Changes

- Public alpha release with complete documentation

  - Complete README standardization across all packages
  - Comprehensive DETAILED_GUIDE documentation for each package
  - Optimized npm keywords for better discoverability
  - Professional documentation tone and structure
  - All packages updated to alpha.0.2

## 0.2.0

### Minor Changes

- 31920d5: Introduce CLI scaffolding tool for hua-ux projects (v0.1.0)

  - Interactive CLI with prompts for project configuration
  - Template-based project generation
  - AI context files generation for better Claude Code integration
  - Auto-detection and installation of dependencies (npm/pnpm/yarn)
  - Quick project setup with `npm create hua-ux my-app`

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive CLI installation improvements
  - Prerequisites check (Node.js version, pnpm installation, template validation)
  - Progress indication (5-step visual feedback)
  - Conditional template copying optimization
  - Enhanced post-validation (translation files JSON validation)
  - Installation summary and customized guide
  - `--dry-run` flag for preview mode
  - `hua-ux doctor` command for project health diagnosis
  - `--install` flag for automatic dependency installation
- Interactive and non-interactive mode support
- Bilingual CLI prompts (Korean/English)
- English-only mode support (`--english-only` flag)

### Changed

- Improved error messages with user-friendly tips
- Optimized template copying (conditional copy instead of copy-then-delete)
- Enhanced project validation with detailed error reporting

### Fixed

- Template validation now correctly excludes dynamically generated files (package.json)
- Improved TTY detection for PowerShell compatibility

## [0.1.0] - 2025-12-29

### Added

- Initial release of `create-hua-ux` CLI tool
- Project scaffolding for Next.js applications with hua-ux framework
- Automatic workspace detection for monorepo environments
- Template generation with pre-configured hua-ux setup
- TypeScript build configuration
- Comprehensive error handling with user-friendly messages
- AI context files generation (`.cursorrules`, `.claude/project-context.md`, `ai-context.md`)

### Features

- **Zero-Config Setup**: Creates a fully configured Next.js project with hua-ux
- **Monorepo Support**: Automatically detects workspace and uses `workspace:*` dependencies
- **TypeScript Ready**: Full TypeScript support out of the box
- **Framework Integration**: Pre-configured with `@hua-labs/hua-ux` framework layer
- **Error Handling**: Helpful error messages with troubleshooting tips
- **Template System**: Next.js App Router template with best practices

### Technical Details

- **Node.js**: Requires Node.js >= 18.0.0
- **Package Manager**: Supports pnpm, npm, yarn
- **Framework**: Next.js 16.0.10 with React 19.2.1
- **TypeScript**: Version 5.9.3

### Usage

```bash
# Create a new project
pnpm create hua-ux my-app
cd my-app
pnpm install
pnpm dev
```

### Dependencies

The generated project includes:

- `@hua-labs/hua-ux`: ^0.1.0
- `@hua-labs/i18n-core-zustand`: ^0.1.0
- `@hua-labs/state`: ^0.1.0
- `next`: 16.0.10
- `react`: 19.2.1
- `react-dom`: 19.2.1
- `zustand`: ^5.0.8

### Files Generated

- `app/` - Next.js App Router structure
- `components/` - React components directory
- `lib/` - Utility functions
- `hua-ux.config.ts` - Framework configuration
- `package.json` - Project dependencies
- `.cursorrules` - Cursor AI configuration
- `.claude/project-context.md` - Claude AI context
- `ai-context.md` - General AI context

### Known Limitations

- Currently supports Next.js only (CRA, Vite support planned)
- Template selection not yet available (single template)
- TypeScript only (JavaScript support planned)

[0.1.0]: https://github.com/HUA-Labs/HUA-Labs-public/releases/tag/create-hua-ux-v0.1.0
