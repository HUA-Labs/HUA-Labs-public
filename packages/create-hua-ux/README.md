# create-hua-ux

**AI-first development tool for React** 🚀 / **AI 시대를 위한 React 개발 도구** 🚀

Create production-ready Next.js projects with AI context files in seconds. Built for **vibe coding** - you don't need to know Next.js. Just configure and tell AI what to do.

프로덕션 준비된 Next.js 프로젝트를 AI 컨텍스트 파일과 함께 몇 초 만에 생성합니다. **바이브 코딩**을 위해 만들어졌습니다 - Next.js를 알 필요 없습니다. 설정만 하고 AI에게 무엇을 할지 말하세요.

## Why create-hua-ux? / 왜 create-hua-ux인가?

In the AI era, developers shouldn't waste time setting up boilerplate. **create-hua-ux** generates:

AI 시대에 개발자들은 보일러플레이트 설정에 시간을 낭비해서는 안 됩니다. **create-hua-ux**는 다음을 생성합니다:

- ✅ **Production-ready project** with hua-ux framework pre-configured / **프로덕션 준비된 프로젝트** - hua-ux 프레임워크가 미리 설정됨
- ✅ **AI context files** (Cursor, Claude) for seamless AI collaboration / **AI 컨텍스트 파일** (Cursor, Claude) - 원활한 AI 협업을 위해
- ✅ **Zero-config setup** - start coding immediately with AI assistance / **제로 설정** - AI 도움으로 즉시 코딩 시작
- ✅ **Vibe coding support** - AI-friendly documentation and structure / **바이브 코딩 지원** - AI 친화적인 문서와 구조

## Quick Start / 빠른 시작

**5 seconds to production-ready project with AI support:**

**AI 지원과 함께 프로덕션 준비된 프로젝트까지 5초:**

```bash
pnpm create hua-ux my-app
# or
npm create hua-ux my-app
# or
yarn create hua-ux my-app
```

**What you get: / 생성되는 것:**

- 🎯 Next.js 16 project with App Router / Next.js 16 프로젝트 (App Router)
- 🤖 AI context files (Cursor, Claude) pre-configured / AI 컨텍스트 파일 (Cursor, Claude) 미리 설정
- ⚡ hua-ux framework with UI + motion + i18n / hua-ux 프레임워크 (UI + 모션 + i18n)
- 📝 AI-friendly documentation structure / AI 친화적인 문서 구조
- 🚀 Ready for vibe coding with AI assistants / AI 어시스턴트와의 바이브 코딩 준비 완료

## Usage / 사용법

### Interactive Mode (Recommended) / 대화형 모드 (권장)

When you run the CLI, you'll be prompted to select which AI context files to generate:

CLI를 실행하면 생성할 AI 컨텍스트 파일을 선택하라는 프롬프트가 표시됩니다:

```bash
pnpm create hua-ux my-app
# or
npx tsx src/index.ts my-app
```

You'll see interactive prompts:

대화형 프롬프트가 표시됩니다:

1. **Select AI context files** (checkboxes) / **AI 컨텍스트 파일 선택** (체크박스):
   - `.cursorrules` (Cursor IDE rules) - default: checked / 기본값: 체크됨
   - `ai-context.md` (General AI context) - default: checked / 기본값: 체크됨
   - `.claude/project-context.md` (Claude context) - default: checked / 기본값: 체크됨
   - `.claude/skills/` (Claude skills) - default: unchecked / 기본값: 체크 안 됨

2. **Documentation language** / **문서 언어**:
   - Korean only / 한국어만
   - English only / 영어만
   - Both Korean and English (default) / 한국어와 영어 모두 (기본값)

### Non-Interactive Mode / 비대화형 모드

For CI/CD or automated scripts, use environment variable:

CI/CD 또는 자동화 스크립트의 경우 환경 변수를 사용하세요:

```bash
NON_INTERACTIVE=1 pnpm create hua-ux my-app
```

This will use default options (all files except Claude skills, both languages).

기본 옵션을 사용합니다 (Claude skills 제외한 모든 파일, 두 언어 모두).

### CLI Flags / CLI 플래그

You can also use CLI flags to specify options:

CLI 플래그를 사용하여 옵션을 지정할 수도 있습니다:

```bash
npx tsx src/index.ts my-app --claude-skills --lang both
```

Available flags / 사용 가능한 플래그:
- `--claude-skills`: Include Claude skills / Claude skills 포함
- `--no-cursorrules`: Skip .cursorrules / .cursorrules 건너뛰기
- `--no-ai-context`: Skip ai-context.md / ai-context.md 건너뛰기
- `--no-claude-context`: Skip .claude/project-context.md / .claude/project-context.md 건너뛰기
- `--lang <ko|en|both>`: Set documentation language / 문서 언어 설정
- `--dry-run`: Preview what will be created without actually creating / 실제로 생성하지 않고 미리보기
- `--install`: Automatically run `pnpm install` after creation / 생성 후 자동으로 `pnpm install` 실행
- `--english-only`: Use English only for CLI output / CLI 출력에 영어만 사용

### After Creation / 생성 후

```bash
cd my-app
pnpm install
pnpm dev
```

## What Gets Created / 생성되는 것

- ✅ Next.js 16 project with App Router / Next.js 16 프로젝트 (App Router)
- ✅ TypeScript configuration / TypeScript 설정
- ✅ Tailwind CSS 4 setup (with PostCSS) / Tailwind CSS 4 설정 (PostCSS 포함)
- ✅ `@hua-labs/hua-ux` pre-installed and configured / `@hua-labs/hua-ux` 미리 설치 및 설정
- ✅ Basic project structure (`app/`, `components/`, `lib/`, `store/`) / 기본 프로젝트 구조
- ✅ i18n setup with Korean and English translations / 한국어 및 영어 번역이 포함된 i18n 설정
- ✅ Example page using `HuaUxPage` and `I18nProviderWrapper` / `HuaUxPage` 및 `I18nProviderWrapper`를 사용한 예제 페이지
- ✅ `hua-ux.config.ts` configuration file / `hua-ux.config.ts` 설정 파일
- ✅ Dynamic language setting in layout (middleware-ready) / 레이아웃의 동적 언어 설정 (미들웨어 준비)
- ✅ Improved error handling in translation API / 번역 API의 개선된 에러 처리
- ✅ ESLint configuration ready / ESLint 설정 준비 완료

## Project Structure / 프로젝트 구조

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout with I18nProviderWrapper
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
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration (Tailwind 4)
└── tsconfig.json
```

## Next Steps / 다음 단계

1. **Customize configuration** / **설정 사용자 정의**: Edit `hua-ux.config.ts` / `hua-ux.config.ts` 편집
2. **Add translations** / **번역 추가**: Add more keys to `translations/ko/common.json` and `translations/en/common.json` / `translations/ko/common.json` 및 `translations/en/common.json`에 더 많은 키 추가
3. **Create pages** / **페이지 생성**: Add new pages in `app/` directory / `app/` 디렉토리에 새 페이지 추가
4. **Add components** / **컴포넌트 추가**: Create reusable components in `components/` directory / `components/` 디렉토리에 재사용 가능한 컴포넌트 생성
5. **Optional: Add middleware** / **선택사항: 미들웨어 추가**: If you need automatic language detection, rename `middleware.ts.example` to `middleware.ts` and uncomment the code (⚠️ Note: Runs on Edge Runtime) / 자동 언어 감지가 필요한 경우 `middleware.ts.example`을 `middleware.ts`로 이름 변경하고 코드 주석 해제 (⚠️ 참고: Edge Runtime에서 실행)
   - The layout will automatically read the language from the `x-language` header set by middleware / 레이아웃은 미들웨어가 설정한 `x-language` 헤더에서 자동으로 언어를 읽습니다

## Template Features / 템플릿 기능

### GEO (Generative Engine Optimization) / GEO (생성형 엔진 최적화)

Example files for AI search engine optimization are included:

AI 검색 엔진 최적화를 위한 예제 파일이 포함되어 있습니다:

- `app/layout-with-geo.example.tsx` - Layout with GEO metadata / GEO 메타데이터가 있는 레이아웃
- `app/page-with-geo.example.tsx` - Page with GEO and SEO metadata / GEO 및 SEO 메타데이터가 있는 페이지

These examples show how to integrate GEO metadata for better AI discoverability.

이 예제는 더 나은 AI 검색 가능성을 위해 GEO 메타데이터를 통합하는 방법을 보여줍니다.

### Dynamic Language Setting / 동적 언어 설정

The generated `app/layout.tsx` automatically reads the language from middleware headers:

생성된 `app/layout.tsx`는 미들웨어 헤더에서 자동으로 언어를 읽습니다:

```tsx
// app/layout.tsx
import { headers } from "next/headers";

const headersList = await headers();
const language = headersList.get('x-language') || 'ko';

return <html lang={language}>...</html>;
```

### Translation Keys Usage / 번역 키 사용

The example page uses translation keys instead of hardcoded text:

예제 페이지는 하드코딩된 텍스트 대신 번역 키를 사용합니다:

```tsx
// app/page.tsx
import { useTranslation } from '@hua-labs/hua-ux';

const { t } = useTranslation('common');
return <h1>{t('title')}</h1>;
```

### Improved Error Handling / 개선된 에러 처리

The translation API route includes proper error handling with type distinction and validation.

번역 API 라우트에는 타입 구분 및 검증이 포함된 적절한 에러 처리가 포함되어 있습니다.

## Framework Layer / 프레임워크 레이어

생성된 프로젝트는 프레임워크 레이어를 사용합니다:

The generated project uses the framework layer:

- **`I18nProviderWrapper`**: Client Component wrapper for i18n provider setup / i18n 프로바이더 설정을 위한 Client Component 래퍼
- **`HuaUxPage`**: Page wrapper (automatic motion applied) / 페이지 래퍼 (자동 모션 적용)
- **`hua-ux.config.ts`**: Framework configuration file / 프레임워크 설정 파일

자세한 내용은 [프레임워크 레이어 문서](../../packages/hua-ux/src/framework/README.md)를 참고하세요.

For more details, see the [Framework Layer Documentation](../../packages/hua-ux/src/framework/README.md).

## Vibe Coding Support / 바이브 코딩 지원

**create-hua-ux** is designed for **vibe coding** - a development style where you describe what you want to AI, and it helps you build it.

**create-hua-ux**는 **바이브 코딩**을 위해 설계되었습니다 - 원하는 것을 AI에게 설명하면 AI가 구축을 도와주는 개발 스타일입니다.

### What is Vibe Coding? / 바이브 코딩이란?

- 🗣️ **Talk to AI, not code** / **코드가 아닌 AI와 대화**: Describe your feature in natural language / 자연어로 기능 설명
- ⚙️ **Configuration over code** / **코드보다 설정**: Use presets and config files / 프리셋 및 설정 파일 사용
- 📚 **AI-friendly docs** / **AI 친화적인 문서**: Comprehensive context files for AI assistants / AI 어시스턴트를 위한 포괄적인 컨텍스트 파일
- 🚀 **Fast iteration** / **빠른 반복**: AI understands your project structure instantly / AI가 프로젝트 구조를 즉시 이해

### How It Works / 작동 방식

1. **Generate project** with AI context files / AI 컨텍스트 파일로 프로젝트 생성
2. **Configure** using `hua-ux.config.ts` (preset: 'product' or 'marketing') / `hua-ux.config.ts`로 설정 (프리셋: 'product' 또는 'marketing')
3. **Tell AI** what you want to build / AI에게 구축하고 싶은 것 말하기
4. **AI understands** your project structure from context files / AI가 컨텍스트 파일에서 프로젝트 구조 이해
5. **Ship faster** with AI assistance / AI 도움으로 더 빠르게 배포

### Example / 예제

```bash
# 1. Create project / 프로젝트 생성
npm create hua-ux my-app

# 2. Tell AI: "Add a contact form with validation"
# AI understands:
# - Your project structure (from ai-context.md)
# - Framework components (from .cursorrules)
# - Translation keys (from translations/)
# - Best practices (from .claude/skills/)

# 3. AI generates code that fits your project perfectly
```

## AI Context Files / AI 컨텍스트 파일

Generated projects include AI context files for seamless AI collaboration:

생성된 프로젝트에는 원활한 AI 협업을 위한 AI 컨텍스트 파일이 포함되어 있습니다:

- **`.cursorrules`**: Cursor IDE rules and patterns / Cursor IDE 규칙 및 패턴
- **`ai-context.md`**: General AI context (project structure, components) / 일반 AI 컨텍스트 (프로젝트 구조, 컴포넌트)
- **`.claude/project-context.md`**: Claude-specific project context / Claude 전용 프로젝트 컨텍스트
- **`.claude/skills/`**: Claude skills for framework usage (optional) / 프레임워크 사용을 위한 Claude skills (선택사항)

These files help AI assistants understand your project instantly, making development faster and more intuitive.

이 파일들은 AI 어시스턴트가 프로젝트를 즉시 이해하도록 도와 개발을 더 빠르고 직관적으로 만듭니다.

## Troubleshooting / 문제 해결

### Edge Runtime Issues / Edge Runtime 이슈

When using middleware, there are Edge Runtime constraints:

미들웨어를 사용할 때 Edge Runtime 제약사항이 있습니다:

- Node.js API 사용 불가 (fs, path 등) / Cannot use Node.js APIs (fs, path, etc.)
- 일부 npm 패키지가 호환되지 않을 수 있음 / Some npm packages may not be compatible

**해결 방법 / Solutions**:

1. 미들웨어를 사용하지 않고 API Route나 클라이언트 컴포넌트에서 언어 감지 / Detect language in API Route or client component instead of middleware
2. Edge Runtime을 명시적으로 설정: `export const runtime = 'edge';` / Explicitly set Edge Runtime: `export const runtime = 'edge';`

자세한 내용은 [프레임워크 레이어 문서](../../packages/hua-ux/src/framework/README.md)를 참고하세요.

For more details, see the [Framework Layer Documentation](../../packages/hua-ux/src/framework/README.md).

## License / 라이선스

MIT
