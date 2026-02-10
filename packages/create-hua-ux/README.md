# create-hua-ux

> **DEPRECATED**: This package has been renamed to [`create-hua`](https://www.npmjs.com/package/create-hua). Please migrate to the new package. This package will no longer receive updates.

Scaffolding tool for creating hua-ux projects — production-ready in seconds.
hua-ux 프로젝트 생성을 위한 스캐폴딩 도구 — 몇 초 만에 프로덕션 레디.

[![npm version](https://img.shields.io/npm/v/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![npm downloads](https://img.shields.io/npm/dw/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![license](https://img.shields.io/npm/l/create-hua-ux.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)

## Overview | 개요

The fastest way to bootstrap a production-ready Next.js project with the hua-ux framework. Automatically configures UI components, animation hooks, internationalization, state management, and AI-optimized context files.

hua-ux 프레임워크로 프로덕션 레디 Next.js 프로젝트를 생성하는 가장 빠른 방법입니다. UI 컴포넌트, 애니메이션 훅, 국제화, 상태 관리, AI 최적화 컨텍스트 파일을 자동 구성합니다.

## Features

- **Interactive CLI** — Select AI context files, documentation language
- **Auto version management** — Fetches latest @hua-labs package versions from npm
- **AI context files** — .cursorrules, ai-context.md, Claude context/skills
- **Non-interactive mode** — CI/CD compatible with `NON_INTERACTIVE=1`
- **Parallel resolution** — Concurrent npm registry queries for fast setup

## Installation | 설치

No installation needed — use directly:

```bash
pnpm create hua-ux my-app
```

Or with npx:

```bash
npx create-hua-ux my-app
```

## Quick Start | 빠른 시작

```bash
# Interactive mode (recommended)
pnpm create hua-ux my-app

# Non-interactive (CI/CD)
NON_INTERACTIVE=1 pnpm create hua-ux my-app

# With CLI flags
npx create-hua-ux my-app --claude-skills --lang both
```

After creation:

```bash
cd my-app
pnpm install
pnpm dev
```

## API Overview | API 개요

**Interactive prompts:**

| Prompt | Options |
|--------|---------|
| AI context files | `.cursorrules`, `ai-context.md`, `.claude/project-context.md`, `.claude/skills/` |
| Documentation language | Korean only, English only, Both (default) |

**CLI flags:**

| Flag | Description |
|------|-------------|
| `--claude-skills` | Include Claude skills |
| `--no-cursorrules` | Skip .cursorrules |
| `--no-ai-context` | Skip ai-context.md |
| `--no-claude-context` | Skip Claude context |
| `--lang <ko\|en\|both>` | Documentation language |

**Generated project includes:**

| Component | Source |
|-----------|--------|
| Next.js App Router | Pre-configured |
| hua-ux framework | `@hua-labs/hua-ux` with defineConfig |
| UI components | `@hua-labs/ui` |
| Animations | `@hua-labs/motion-core` |
| i18n | `@hua-labs/i18n-core` + loaders |
| State management | `@hua-labs/state` + Zustand |
| TypeScript | Strict mode |
| Tailwind CSS | Pre-configured |

## Documentation | 문서

- [📚 Documentation Site | 문서 사이트](https://docs.hua-labs.com)

## Related Packages | 관련 패키지

- [`create-hua`](https://www.npmjs.com/package/create-hua) — Successor to this package (use this instead)
- [`@hua-labs/hua`](https://www.npmjs.com/package/@hua-labs/hua) — The hua framework (successor to @hua-labs/hua-ux)

## Requirements | 요구사항

Node.js >= 22.0.0

## License

MIT — [HUA Labs](https://github.com/HUA-Labs/HUA-Labs-public)
