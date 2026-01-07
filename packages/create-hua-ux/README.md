# create-hua-ux

Scaffolding tool for creating hua-ux projects.
hua-ux 프로젝트 생성을 위한 스캐폴딩 도구입니다.

[![npm version](https://img.shields.io/npm/v/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![npm downloads](https://img.shields.io/npm/dw/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![node version](https://img.shields.io/node/v/create-hua-ux.svg)](https://www.npmjs.com/package/create-hua-ux)
[![license](https://img.shields.io/npm/l/create-hua-ux.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview
The fastest way to bootstrap a production-ready Next.js project with the hua-ux framework. Automatically configures UI components, animation hooks, internationalization, and includes AI-optimized context files for seamless development.

### Quick Start

```bash
npm create hua-ux my-app
# or
pnpm create hua-ux my-app
# or
yarn create hua-ux my-app
```

### Usage

#### Interactive Mode (Recommended)

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

#### Non-Interactive Mode

For CI/CD or automated scripts, use environment variable:

```bash
NON_INTERACTIVE=1 pnpm create hua-ux my-app
```

This will use default options (all files except Claude skills, both languages).

#### CLI Flags

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

#### After Creation

```bash
cd my-app
pnpm install
pnpm dev
```

### Features

#### Intelligent Version Management
- **Automatic npm Registry Detection**: Fetches the latest alpha versions of `@hua-labs` packages directly from npm registry at project creation time
- **Zero Version Conflicts**: No hardcoded version assumptions - always uses the correct published versions
- **Monorepo-Friendly**: Works seamlessly whether packages are published to npm or used as workspace dependencies

#### Performance Optimized
- **Parallel Package Resolution**: Uses `Promise.all` for concurrent npm registry queries
- **Fast Project Creation**: Optimized template copying with smart filtering
- **Minimal Dependencies**: Only essential dependencies for quick installation

#### Production-Ready Setup
- **Complete TypeScript Configuration**: Strict mode enabled with optimal settings
- **Tailwind CSS 4**: Latest version pre-configured
- **ESLint Ready**: Code quality checks out of the box
- **Next.js 16**: Latest App Router with Server Components

#### Internationalization Built-in
- **Bilingual Support**: Korean and English translations included
- **Easy Language Selection**: Choose documentation language during setup
- **i18n API Routes**: Translation loading endpoint pre-configured
- **Middleware Support**: Optional automatic language detection

#### AI-Optimized Development
- **Claude Code Integration**: `.cursorrules` and `.claude/project-context.md` files
- **Cursor IDE Support**: Pre-configured rules for better AI assistance
- **GEO Examples**: Generative Engine Optimization templates included
- **AI Context Files**: Comprehensive project documentation for AI tools

### What Gets Created

#### Core Framework
- **Next.js 16** project with App Router and React 19
- **TypeScript** configuration with strict mode
- **Tailwind CSS 4** setup with PostCSS
- **`@hua-labs/hua-ux`** pre-installed with latest alpha version from npm
- **ESLint** configuration ready

#### Project Structure
- **Organized directories**: `app/`, `components/`, `lib/`, `store/`, `translations/`
- **Framework configuration**: `hua-ux.config.ts` with sensible defaults
- **Welcome page**: Default `WelcomePage` component showing framework features and quick links
- **Example components**: Using `HuaUxLayout` and `HuaUxPage` with translation keys

#### Internationalization
- **i18n setup** with Korean and English translations
- **Translation API route**: `/api/translations/[language]/[namespace]`
- **Dynamic language setting**: Reads from middleware headers
- **Middleware example**: Optional automatic language detection

#### AI Development Tools
- **`.cursorrules`**: Cursor IDE AI rules (optional)
- **`ai-context.md`**: General AI context file (optional)
- **`.claude/project-context.md`**: Claude-specific context (optional)
- **GEO examples**: AI search engine optimization templates

#### Package Management
- **Auto-detected versions**: Latest alpha versions fetched from npm registry
- **Correct dependencies**: No version conflicts or mismatches
- **Zustand store**: State management example included

### Project Structure

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout with HuaUxLayout
│   ├── page.tsx            # Home page with WelcomePage component
│   ├── globals.css         # Tailwind CSS
│   └── api/
│       └── translations/   # i18n API route
├── components/             # Your components
│   └── LanguageToggle.tsx  # Language switcher component
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

### Welcome Page

The generated project includes a `WelcomePage` component that displays:
- Project name and framework information
- Framework features (UI Components, i18n, Motion, AI-First)
- Quick links (Documentation, Examples, GitHub)
- Language toggle button

You can customize the welcome page by editing `app/page.tsx`:

```tsx
import { WelcomePage } from "@hua-labs/hua-ux/framework";

export default function HomePage() {
  return (
    <WelcomePage
      projectName="My App"
      showFeatures={true}
      showQuickLinks={true}
    />
  );
}
```

To replace it with your own content, simply replace the `WelcomePage` component with your custom page.

### Next Steps

1. **Customize configuration**: Edit `hua-ux.config.ts`
2. **Add translations**: Add more keys to `translations/ko/common.json` and `translations/en/common.json`
3. **Create pages**: Add new pages in `app/` directory
4. **Add components**: Create reusable components in `components/` directory
5. **Optional: Add middleware**: If you need automatic language detection, rename `middleware.ts.example` to `middleware.ts` and uncomment the code (Note: Runs on Edge Runtime)
   - The layout will automatically read the language from the `x-language` header set by middleware

### Framework Layer

The generated project uses the hua-ux framework layer.

- **`HuaUxLayout`**: Automatically configures i18n, motion, and state frameworks
- **`HuaUxPage`**: Page wrapper (automatic layout application)
- **`hua-ux.config.ts`**: Framework configuration file

For detailed usage, see [Framework Layer Documentation](../hua-ux/src/framework/README.md).

### Troubleshooting

#### Edge Runtime Limitations

When using templates, there are Edge Runtime limitations:
- Node.js API unavailable (fs, path, etc.)
- Some npm packages may not be supported

**Solutions**:
1. Process directly in API Route without using templates
2. Set Edge Runtime explicitly: `export const runtime = 'edge';`

For detailed usage, see [Framework Layer Documentation](../hua-ux/src/framework/README.md).

#### Getting old template version?

If you're experiencing errors that seem to be from an outdated version of the template (e.g., missing `async/await` in Next.js 16 APIs), this is likely due to npx cache.

**Symptoms**:
- Error: `headersList.get is not a function` in `app/layout.tsx`
- Missing `async` keyword in route handlers or layouts
- Old package versions in generated `package.json`

**Solution - Clear npx cache**:

```bash
# Clear npm cache
npm cache clean --force

# Windows - Clear npx cache
del /s /q "%LOCALAPPDATA%\npm-cache"
rmdir /s /q "%APPDATA%\npm-cache"

# macOS/Linux - Clear npx cache
rm -rf ~/.npm/_npx

# Then create project with latest version
npm create hua-ux@latest my-app
```

**Prevention - Always use @latest**:

```bash
# Good - forces latest version
npm create hua-ux@latest my-app

# Bad - might use cached version
npm create hua-ux my-app
```

**Verification**:

After creating a project, verify you have the latest template by checking:

```bash
cd my-app
cat app/layout.tsx | grep "async function RootLayout"
# Should see: export default async function RootLayout
```

For more details, see [DETAILED_GUIDE.md](./DETAILED_GUIDE.md).

## Korean

### 개요
hua-ux 프레임워크로 프로덕션 준비된 Next.js 프로젝트를 가장 빠르게 시작할 수 있습니다. UI 컴포넌트, 애니메이션 훅, 국제화를 자동으로 설정하고, AI 최적화 컨텍스트 파일을 포함하여 원활한 개발을 지원합니다.

### 빠른 시작

```bash
npm create hua-ux my-app
# 또는
pnpm create hua-ux my-app
# 또는
yarn create hua-ux my-app
```

### 사용법

#### 대화형 모드 (권장)

CLI를 실행하면 생성할 AI 컨텍스트 파일을 선택하라는 프롬프트가 표시됩니다:

```bash
pnpm create hua-ux my-app
# 또는
npx tsx src/index.ts my-app
```

대화형 프롬프트:
1. **AI 컨텍스트 파일 선택** (체크박스):
   - `.cursorrules` (Cursor IDE 규칙) - 기본값: 체크됨
   - `ai-context.md` (일반 AI 컨텍스트) - 기본값: 체크됨
   - `.claude/project-context.md` (Claude 컨텍스트) - 기본값: 체크됨
   - `.claude/skills/` (Claude 스킬) - 기본값: 체크 안됨

2. **문서 언어**:
   - 한국어만
   - 영어만
   - 한국어와 영어 모두 (기본값)

#### 비대화형 모드

CI/CD 또는 자동화 스크립트의 경우 환경 변수를 사용하세요:

```bash
NON_INTERACTIVE=1 pnpm create hua-ux my-app
```

기본 옵션을 사용합니다 (Claude 스킬 제외한 모든 파일, 두 언어 모두).

#### CLI 플래그

옵션을 지정하기 위해 CLI 플래그를 사용할 수도 있습니다:

```bash
npx tsx src/index.ts my-app --claude-skills --lang both
```

사용 가능한 플래그:
- `--claude-skills`: Claude 스킬 포함
- `--no-cursorrules`: .cursorrules 건너뛰기
- `--no-ai-context`: ai-context.md 건너뛰기
- `--no-claude-context`: .claude/project-context.md 건너뛰기
- `--lang <ko|en|both>`: 문서 언어 설정

#### 생성 후

```bash
cd my-app
pnpm install
pnpm dev
```

### 주요 기능

#### 지능형 버전 관리
- **자동 npm 레지스트리 감지**: 프로젝트 생성 시 npm 레지스트리에서 `@hua-labs` 패키지의 최신 alpha 버전을 직접 가져옵니다
- **버전 충돌 없음**: 하드코딩된 버전 가정 없음 - 항상 올바른 게시된 버전 사용
- **모노레포 친화적**: 패키지가 npm에 게시되거나 워크스페이스 종속성으로 사용되는지 여부와 관계없이 원활하게 작동

#### 성능 최적화
- **병렬 패키지 해결**: 동시 npm 레지스트리 쿼리를 위한 `Promise.all` 사용
- **빠른 프로젝트 생성**: 스마트 필터링을 통한 최적화된 템플릿 복사
- **최소 종속성**: 빠른 설치를 위한 필수 종속성만

#### 프로덕션 준비 설정
- **완전한 TypeScript 구성**: 최적 설정으로 엄격 모드 활성화
- **Tailwind CSS 4**: 최신 버전 사전 구성
- **ESLint 준비**: 즉시 사용 가능한 코드 품질 검사
- **Next.js 16**: 서버 컴포넌트가 있는 최신 App Router

#### 내장 국제화
- **이중 언어 지원**: 한국어 및 영어 번역 포함
- **쉬운 언어 선택**: 설정 중 문서 언어 선택
- **i18n API 라우트**: 사전 구성된 번역 로딩 엔드포인트
- **미들웨어 지원**: 선택적 자동 언어 감지

#### AI 최적화 개발
- **Claude 코드 통합**: `.cursorrules` 및 `.claude/project-context.md` 파일
- **Cursor IDE 지원**: 더 나은 AI 지원을 위한 사전 구성된 규칙
- **GEO 예제**: 생성 엔진 최적화 템플릿 포함
- **AI 컨텍스트 파일**: AI 도구를 위한 포괄적인 프로젝트 문서

### 생성되는 내용

#### 핵심 프레임워크
- **Next.js 16** App Router 및 React 19가 있는 프로젝트
- **TypeScript** 엄격 모드가 활성화된 구성
- **Tailwind CSS 4** PostCSS 설정
- **`@hua-labs/hua-ux`** npm에서 최신 alpha 버전으로 사전 설치
- **ESLint** 구성 준비됨

#### 프로젝트 구조
- **구성된 디렉토리**: `app/`, `components/`, `lib/`, `store/`, `translations/`
- **프레임워크 구성**: 합리적인 기본값이 있는 `hua-ux.config.ts`
- **웰컴 페이지**: 프레임워크 기능과 빠른 링크를 보여주는 기본 `WelcomePage` 컴포넌트
- **예제 컴포넌트**: 번역 키를 사용하는 `HuaUxLayout` 및 `HuaUxPage`

#### 국제화
- **i18n 설정** 한국어 및 영어 번역 포함
- **번역 API 라우트**: `/api/translations/[language]/[namespace]`
- **동적 언어 설정**: 미들웨어 헤더에서 읽기
- **미들웨어 예제**: 선택적 자동 언어 감지

#### AI 개발 도구
- **`.cursorrules`**: Cursor IDE AI 규칙 (선택 사항)
- **`ai-context.md`**: 일반 AI 컨텍스트 파일 (선택 사항)
- **`.claude/project-context.md`**: Claude 특정 컨텍스트 (선택 사항)
- **GEO 예제**: AI 검색 엔진 최적화 템플릿

#### 패키지 관리
- **자동 감지된 버전**: npm 레지스트리에서 가져온 최신 alpha 버전
- **올바른 종속성**: 버전 충돌 또는 불일치 없음
- **Zustand 스토어**: 상태 관리 예제 포함

### 프로젝트 구조

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout with HuaUxLayout
│   ├── page.tsx            # Home page with WelcomePage component
│   ├── globals.css         # Tailwind CSS
│   └── api/
│       └── translations/   # i18n API route
├── components/             # Your components
│   └── LanguageToggle.tsx  # Language switcher component
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

### 웰컴 페이지

생성된 프로젝트에는 다음을 표시하는 `WelcomePage` 컴포넌트가 포함되어 있습니다:
- 프로젝트 이름 및 프레임워크 정보
- 프레임워크 기능 (UI 컴포넌트, i18n, Motion, AI-First)
- 빠른 링크 (문서, 예제, GitHub)
- 언어 전환 버튼

`app/page.tsx`를 편집하여 웰컴 페이지를 사용자 지정할 수 있습니다:

```tsx
import { WelcomePage } from "@hua-labs/hua-ux/framework";

export default function HomePage() {
  return (
    <WelcomePage
      projectName="My App"
      showFeatures={true}
      showQuickLinks={true}
    />
  );
}
```

자신만의 콘텐츠로 교체하려면 `WelcomePage` 컴포넌트를 사용자 지정 페이지로 교체하면 됩니다.

### 다음 단계

1. **구성 사용자 지정**: `hua-ux.config.ts` 편집
2. **번역 추가**: `translations/ko/common.json` 및 `translations/en/common.json`에 더 많은 키 추가
3. **페이지 생성**: `app/` 디렉토리에 새 페이지 추가
4. **컴포넌트 추가**: `components/` 디렉토리에 재사용 가능한 컴포넌트 생성
5. **선택 사항: 미들웨어 추가**: 자동 언어 감지가 필요한 경우 `middleware.ts.example`을 `middleware.ts`로 이름을 변경하고 코드의 주석을 해제하세요 (참고: Edge Runtime에서 실행됨)
   - 레이아웃은 미들웨어에서 설정한 `x-language` 헤더에서 자동으로 언어를 읽습니다

### 프레임워크 레이어

생성된 프로젝트는 hua-ux 프레임워크 레이어를 사용합니다.

- **`HuaUxLayout`**: 자동으로 i18n, motion, state 프레임워크 설정
- **`HuaUxPage`**: 페이지 래퍼 (자동 레이아웃 적용)
- **`hua-ux.config.ts`**: 프레임워크 설정 파일

자세한 사용법은 [프레임워크 레이어 문서](../hua-ux/src/framework/README.md)를 참고하세요.

### 문제 해결

#### Edge Runtime 제한

템플릿을 사용할 때 Edge Runtime 제한사항이 있습니다:
- Node.js API 사용 불가 (fs, path 등)
- 일부 npm 패키지가 지원되지 않을 수 있습니다

**해결 방법**:
1. 템플릿을 사용하지 않고 API Route에서 직접 처리하는 방법
2. Edge Runtime을 명시적으로 설정: `export const runtime = 'edge';`

자세한 사용법은 [프레임워크 레이어 문서](../hua-ux/src/framework/README.md)를 참고하세요.

#### 오래된 템플릿 버전을 받고 있나요?

템플릿의 오래된 버전으로 인한 오류가 발생하는 경우 (예: Next.js 16 API에서 `async/await` 누락), 이는 npx 캐시 때문일 수 있습니다.

**증상**:
- `app/layout.tsx`에서 오류: `headersList.get is not a function`
- 라우트 핸들러 또는 레이아웃에서 `async` 키워드 누락
- 생성된 `package.json`에서 오래된 패키지 버전

**해결 방법 - npx 캐시 지우기**:

```bash
# npm 캐시 지우기
npm cache clean --force

# Windows - npx 캐시 지우기
del /s /q "%LOCALAPPDATA%\npm-cache"
rmdir /s /q "%APPDATA%\npm-cache"

# macOS/Linux - npx 캐시 지우기
rm -rf ~/.npm/_npx

# 그런 다음 최신 버전으로 프로젝트 생성
npm create hua-ux@latest my-app
```

**예방 - 항상 @latest 사용**:

```bash
# 좋음 - 최신 버전 강제
npm create hua-ux@latest my-app

# 나쁨 - 캐시된 버전을 사용할 수 있음
npm create hua-ux my-app
```

**확인**:

프로젝트를 생성한 후 다음을 확인하여 최신 템플릿이 있는지 확인하세요:

```bash
cd my-app
cat app/layout.tsx | grep "async function RootLayout"
# 다음이 표시되어야 합니다: export default async function RootLayout
```

자세한 내용은 [DETAILED_GUIDE.md](./DETAILED_GUIDE.md)를 참조하세요.

## License

MIT
