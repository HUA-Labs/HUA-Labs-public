# create-hua-ux

Scaffolding tool for creating hua-ux projects.
hua-ux 프로젝트 생성을 위한 스캐폴딩 도구입니다.

[![npm version](https://img.shields.io/npm/v/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![npm downloads](https://img.shields.io/npm/dw/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![license](https://img.shields.io/npm/l/create-hua-ux.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

## English

### Overview
The fastest way to bootstrap a production-ready Next.js project with the hua-ux framework. Automatically configures UI components, animation hooks, internationalization, and includes AI-optimized context files for seamless development.

## Quick Start

```bash
npm create hua-ux my-app
# or
pnpm create hua-ux my-app
# or
yarn create hua-ux my-app
```

## Usage

### Interactive Mode (Recommended)

When you run the CLI, you'll be prompted to select which AI context files to generate:

```bash
pnpm create hua-ux my-app
# or
npx tsx src/index.ts my-app
```

You'll see interactive prompts:
1. **Select AI context files** (checkboxes):
   - `.cursorrules` (Cursor IDE rules) - default: checked
   - `ai-context.md` (General AI context) - default: checked
   - `.claude/project-context.md` (Claude context) - default: checked
   - `.claude/skills/` (Claude skills) - default: unchecked

2. **Documentation language**:
   - Korean only
   - English only
   - Both Korean and English (default)

### Non-Interactive Mode

For CI/CD or automated scripts, use environment variable:

```bash
NON_INTERACTIVE=1 pnpm create hua-ux my-app
```

This will use default options (all files except Claude skills, both languages).

### CLI Flags

You can also use CLI flags to specify options:

```bash
npx tsx src/index.ts my-app --claude-skills --lang both
```

Available flags:
- `--claude-skills`: Include Claude skills
- `--no-cursorrules`: Skip .cursorrules
- `--no-ai-context`: Skip ai-context.md
- `--no-claude-context`: Skip .claude/project-context.md
- `--lang <ko|en|both>`: Set documentation language

### After Creation

```bash
cd my-app
pnpm install
pnpm dev
```

## Features

### 🚀 Intelligent Version Management
- **Automatic npm Registry Detection**: Fetches the latest alpha versions of `@hua-labs` packages directly from npm registry at project creation time
- **Zero Version Conflicts**: No hardcoded version assumptions - always uses the correct published versions
- **Monorepo-Friendly**: Works seamlessly whether packages are published to npm or used as workspace dependencies

### ⚡ Performance Optimized
- **Parallel Package Resolution**: Uses `Promise.all` for concurrent npm registry queries
- **Fast Project Creation**: Optimized template copying with smart filtering
- **Minimal Dependencies**: Only essential dependencies for quick installation

### 🎯 Production-Ready Setup
- **Complete TypeScript Configuration**: Strict mode enabled with optimal settings
- **Tailwind CSS 4**: Latest version pre-configured
- **ESLint Ready**: Code quality checks out of the box
- **Next.js 16**: Latest App Router with Server Components

### 🌍 Internationalization Built-in
- **Bilingual Support**: Korean and English translations included
- **Easy Language Selection**: Choose documentation language during setup
- **i18n API Routes**: Translation loading endpoint pre-configured
- **Middleware Support**: Optional automatic language detection

### 🤖 AI-Optimized Development
- **Claude Code Integration**: `.cursorrules` and `.claude/project-context.md` files
- **Cursor IDE Support**: Pre-configured rules for better AI assistance
- **GEO Examples**: Generative Engine Optimization templates included
- **AI Context Files**: Comprehensive project documentation for AI tools

## What Gets Created

### Core Framework
- ✅ **Next.js 16** project with App Router and React 19
- ✅ **TypeScript** configuration with strict mode
- ✅ **Tailwind CSS 4** setup with PostCSS
- ✅ **`@hua-labs/hua-ux`** pre-installed with latest alpha version from npm
- ✅ **ESLint** configuration ready

### Project Structure
- ✅ **Organized directories**: `app/`, `components/`, `lib/`, `store/`, `translations/`
- ✅ **Framework configuration**: `hua-ux.config.ts` with sensible defaults
- ✅ **Example components**: Using `HuaUxLayout` and `HuaUxPage` with translation keys

### Internationalization
- ✅ **i18n setup** with Korean and English translations
- ✅ **Translation API route**: `/api/translations/[language]/[namespace]`
- ✅ **Dynamic language setting**: Reads from middleware headers
- ✅ **Middleware example**: Optional automatic language detection

### AI Development Tools
- ✅ **`.cursorrules`**: Cursor IDE AI rules (optional)
- ✅ **`ai-context.md`**: General AI context file (optional)
- ✅ **`.claude/project-context.md`**: Claude-specific context (optional)
- ✅ **GEO examples**: AI search engine optimization templates

### Package Management
- ✅ **Auto-detected versions**: Latest alpha versions fetched from npm registry
- ✅ **Correct dependencies**: No version conflicts or mismatches
- ✅ **Zustand store**: State management example included

## Project Structure

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout with HuaUxLayout
│   ├── page.tsx            # Home page with HuaUxPage
│   ├── globals.css         # Tailwind CSS
│   └── api/
│       └── translations/   # i18n API route
├── components/             # Your components
├── lib/
│   └── i18n-setup.ts      # i18n configuration
├── store/
│   └── useAppStore.ts     # Zustand store
├── translations/           # Translation files
│   ├── ko/
│   └── en/
├── hua-ux.config.ts       # Framework configuration
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Next Steps

1. **Customize configuration**: Edit `hua-ux.config.ts`
2. **Add translations**: Add more keys to `translations/ko/common.json` and `translations/en/common.json`
3. **Create pages**: Add new pages in `app/` directory
4. **Add components**: Create reusable components in `components/` directory
5. **Optional: Add middleware**: If you need automatic language detection, rename `middleware.ts.example` to `middleware.ts` and uncomment the code (⚠️ Note: Runs on Edge Runtime)
   - The layout will automatically read the language from the `x-language` header set by middleware

## Template Features

### GEO (Generative Engine Optimization)
Example files for AI search engine optimization are included:
- `app/layout-with-geo.example.tsx` - Layout with GEO metadata
- `app/page-with-geo.example.tsx` - Page with GEO and SEO metadata

These examples show how to integrate GEO metadata for better AI discoverability.

### Dynamic Language Setting
The generated `app/layout.tsx` automatically reads the language from middleware headers:

```tsx
// app/layout.tsx
import { headers } from "next/headers";

const headersList = headers();
const language = headersList.get('x-language') || 'ko';

return <html lang={language}>...</html>;
```

### Translation Keys Usage
The example page uses translation keys instead of hardcoded text:

```tsx
// app/page.tsx
import { useTranslation } from '@hua-labs/hua-ux';

const { t } = useTranslation('common');
return <h1>{t('title')}</h1>;
```

### Improved Error Handling
The translation API route includes proper error handling with type distinction and validation.

## Framework Layer

생성된 프로젝트는 프레임워크 레이어를 사용합니다:

- **`HuaUxLayout`**: 자동으로 i18n, motion, state 프로바이더 설정
- **`HuaUxPage`**: 페이지 래퍼 (자동 모션 적용)
- **`hua-ux.config.ts`**: 프레임워크 설정 파일

자세한 내용은 [프레임워크 레이어 문서](../../packages/hua-ux/src/framework/README.md)를 참고하세요.

## Troubleshooting

### Edge Runtime 이슈

미들웨어를 사용할 때 Edge Runtime 제약사항이 있습니다:
- Node.js API 사용 불가 (fs, path 등)
- 일부 npm 패키지가 호환되지 않을 수 있음

**해결 방법**:
1. 미들웨어를 사용하지 않고 API Route나 클라이언트 컴포넌트에서 언어 감지
2. Edge Runtime을 명시적으로 설정: `export const runtime = 'edge';`

자세한 내용은 [프레임워크 레이어 문서](../../packages/hua-ux/src/framework/README.md)를 참고하세요.

## License

MIT
