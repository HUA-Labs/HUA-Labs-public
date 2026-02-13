# create-hua

Interactive scaffolding CLI for creating Next.js + HUA projects. Generates a pre-wired project with UI, motion, i18n, state management, and AI context files.

[![npm version](https://img.shields.io/npm/v/create-hua.svg)](https://www.npmjs.com/package/create-hua)
[![npm downloads](https://img.shields.io/npm/dm/create-hua.svg)](https://www.npmjs.com/package/create-hua)
[![license](https://img.shields.io/npm/l/create-hua.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## Quick Start

```bash
npx create-hua@latest my-app
cd my-app
pnpm dev
```

## Features

- **Interactive prompts** — Choose project name, AI context files, and documentation language
- **Pre-wired stack** — Next.js 16, React 19, Tailwind 4, Zustand 5, HUA i18n
- **Showcase template** — Glassmorphism UI, animated orbs, parallax scrolling, CodeBlock, and interactive demos
- **Doctor command** — Diagnose existing project health (dependencies, config, template drift)
- **Monorepo aware** — Detects pnpm workspace, uses `workspace:*` versions automatically
- **AI context generation** — `.cursor/rules/`, `ai-context.md`, `AGENTS.md`, `.claude/project-context.md`
- **Bilingual support** — KO/EN i18n with language toggle out of the box
- **VS Code / Cursor snippets** — `hpage`, `hcomp`, `hapi`, `ht` and more pre-configured
- **Google Sans Flex** — Pre-configured English font via Google Fonts CDN

## CLI Options

```bash
npx create-hua <project-name> [options]
```

| Flag | Description |
|------|-------------|
| `--non-interactive` | Skip prompts, use defaults |
| `--install` | Auto-install dependencies after generation |
| `--lang ko\|en\|both` | Set documentation language (default: `both`) |
| `--english-only` | English-only UI messages |
| `--dry-run` | Preview without creating files |
| `--no-cursor-rules` | Skip `.cursor/rules/` generation |
| `--no-agents-md` | Skip `AGENTS.md` generation |
| `--no-skills-md` | Skip `skills.md` generation |
| `--claude-skills` | Include `.claude/project-context.md` |
| `--skip-version-check` | Skip CLI update check |

## Doctor Command

Diagnose an existing HUA project:

```bash
npx create-hua doctor [project-path]
```

Checks: dependencies, config files, template drift, CSS imports, i18n setup.

## Generated Project Structure

```
my-app/
├── app/
│   ├── api/translations/[language]/[namespace]/route.ts
│   ├── globals.css          # Tailwind 4 + HUA theme + glassmorphism
│   ├── layout.tsx           # HuaProvider + Google Sans Flex
│   └── page.tsx             # Showcase page with interactive demos
├── components/
│   └── LanguageToggle.tsx   # KO/EN language switcher
├── lib/
│   ├── i18n-setup.ts        # i18n configuration
│   └── utils.ts             # Utility helpers
├── store/
│   └── useAppStore.ts       # Zustand store template
├── translations/
│   ├── ko/common.json       # Korean translations
│   └── en/common.json       # English translations
├── public/                  # Static assets
├── .vscode/
│   └── hua.code-snippets    # VS Code / Cursor snippets
├── .cursor/rules/           # Cursor AI context
├── .claude/project-context.md
├── hua.config.ts            # HUA framework configuration
├── next.config.ts           # Next.js config (webpack warning suppression)
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Snippets (VS Code / Cursor)

| Prefix | Description |
|--------|-------------|
| `hpage` | Next.js page with metadata |
| `hcomp` | Client component with `useTranslation` |
| `hapi` | API route handler (GET/POST/PUT/DELETE) |
| `ht` | `useTranslation('namespace')` |
| `htt` | `{t('namespace:key')}` in JSX |
| `hstore` | Zustand store pattern |
| `hmotion` | Motion animation hook |
| `haction` | Server action |

## API

| Export | Type | Description |
|--------|------|-------------|
| `createProject` | function | Create a new HUA project at the given path |
| `main` | function | CLI entry point — parses args and runs scaffolding |

## Related Packages

- [`@hua-labs/hua`](https://www.npmjs.com/package/@hua-labs/hua) — HUA framework core
- [`@hua-labs/ui`](https://www.npmjs.com/package/@hua-labs/ui) — UI component library

## License

MIT — [HUA Labs](https://hua-labs.com)
