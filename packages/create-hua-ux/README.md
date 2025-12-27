# create-hua-ux

**Scaffolding tool for creating hua-ux projects**

Quickly create a new Next.js project with hua-ux framework pre-configured.

## Installation

```bash
pnpm create hua-ux my-app
# or
npm create hua-ux my-app
# or
yarn create hua-ux my-app
```

## Usage

```bash
pnpm create hua-ux my-app
cd my-app
pnpm install
pnpm dev
```

## What Gets Created

- ✅ Next.js 15 project with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ `@hua-labs/hua-ux` pre-installed and configured
- ✅ Basic project structure (`app/`, `components/`, `lib/`, `store/`)
- ✅ i18n setup with Korean and English translations
- ✅ Example page using `HuaUxLayout` and `HuaUxPage`
- ✅ `hua-ux.config.ts` configuration file

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
