# Changelog

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
