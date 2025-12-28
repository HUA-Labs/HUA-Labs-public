# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
