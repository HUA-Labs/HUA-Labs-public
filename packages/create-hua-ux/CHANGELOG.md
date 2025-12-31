# Changelog

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
