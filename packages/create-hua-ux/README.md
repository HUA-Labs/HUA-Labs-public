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

## License

MIT
