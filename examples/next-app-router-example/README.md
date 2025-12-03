# HUA i18n Next.js Example

Complete example project demonstrating `@hua-labs/i18n-core` integration with Next.js 15 App Router.

## 🚀 Features

This example demonstrates:

- ✅ **SSR Translation Loading**: Server-side translation loading for optimal performance
- ✅ **Client Language Switching**: Seamless language switching without flickering
- ✅ **Zustand Integration**: State management integration with `@hua-labs/i18n-core-zustand`
- ✅ **Multiple Languages**: Support for 6 languages (Korean, English, Japanese, Chinese, Spanish, French)
- ✅ **Multiple Namespaces**: Using multiple translation namespaces (common, pages, examples)
- ✅ **getRawValue Usage**: Accessing arrays and objects from translation files
- ✅ **API Loader**: Production-ready API-based translation loading with caching

## 📦 Installation

```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

## 🏃 Running the Example

### Prerequisites

This example uses npm packages `@hua-labs/i18n-core@^1.0.0`, `@hua-labs/i18n-core-zustand@^1.0.0`, and `@hua-labs/i18n-loaders@^1.0.0`.

### Start Development Server

```bash
# From the example directory
cd examples/next-app-router-example

# Start development server
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Try switching between different languages using the language switcher:
- 🇰🇷 한국어 (Korean)
- 🇺🇸 English
- 🇯🇵 日本語 (Japanese)
- 🇨🇳 中文 (Chinese)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)

### Build for Production

```bash
pnpm build
pnpm start
```

### Run Type Check

```bash
npx tsc --noEmit
```

## 📁 Project Structure

```
next-app-router-example/
├── app/
│   ├── api/
│   │   └── translations/
│   │       └── [language]/
│   │           └── [namespace]/
│   │               └── route.ts      # Translation API route
│   ├── layout.tsx                    # Root layout with SSR translations
│   ├── page.tsx                       # Home page (client component)
│   └── globals.css                    # Global styles
├── components/
│   ├── I18nProvider.tsx              # Client-side i18n provider wrapper
│   ├── LanguageSwitcher.tsx           # Language switching component
│   ├── MultipleNamespacesExample.tsx  # Multiple namespaces demo
│   └── RawValueExample.tsx            # getRawValue demo
├── lib/
│   ├── i18n-config.ts                # i18n configuration
│   └── store.ts                       # Zustand store
├── translations/                      # Translation files
│   ├── ko/
│   │   ├── common.json
│   │   ├── pages.json
│   │   └── examples.json
│   └── en/
│       ├── common.json
│       ├── pages.json
│       └── examples.json
└── package.json
```

## 🎯 Key Implementation Details

### 1. SSR Translation Loading

The `app/layout.tsx` loads translations on the server and passes them to the client component:

```tsx
// app/layout.tsx (Server Component)
export default async function RootLayout({ children }) {
  const ssrTranslations = await loadSSRTranslations('ko');
  
  return (
    <html>
      <body>
        <I18nProvider ssrTranslations={ssrTranslations}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

The `I18nProvider` is a client component (`components/I18nProvider.tsx`) that creates the i18n provider:

```tsx
// components/I18nProvider.tsx (Client Component)
'use client';

export function I18nProvider({ children, ssrTranslations }) {
  const I18nProviderComponent = useMemo(() => {
    return createClientI18nProvider(ssrTranslations);
  }, [ssrTranslations]);

  return <I18nProviderComponent>{children}</I18nProviderComponent>;
}
```

This separation is required for Next.js 15 Server/Client Component architecture.

### 2. API-Based Translation Loader

The example uses `@hua-labs/i18n-loaders` for production-ready translation loading:

```tsx
import { createApiTranslationLoader } from '@hua-labs/i18n-loaders';

const apiLoader = createApiTranslationLoader({
  translationApiPath: '/api/translations',
  cacheTtlMs: 60_000,
  enableGlobalCache: true,
});
```

### 3. Zustand Integration

Language state is managed with Zustand:

```tsx
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';

export const I18nProvider = createZustandI18n(useAppStore, {
  defaultLanguage: 'ko',
  fallbackLanguage: 'en',
  namespaces: ['common', 'pages', 'examples'],
  translationLoader: 'custom',
  loadTranslations: apiLoader,
});
```

### 4. Multiple Namespaces

Use namespace prefixes in translation keys:

```tsx
const { t } = useTranslation();

// Common namespace
t('common:welcome')

// Pages namespace
t('pages:home.title')

// Examples namespace
t('examples:arrayExample')
```

### 5. getRawValue for Arrays/Objects

Access raw values (arrays, objects) from translations:

```tsx
const { getRawValue } = useTranslation();

const arrayExample = getRawValue('examples:arrayExample') as string[];
const objectExample = getRawValue('examples:objectExample') as Record<string, string>;
```

## 🔧 Configuration

### Translation Files

Translation files are located in `translations/[language]/[namespace].json`:

```json
// translations/ko/common.json
{
  "welcome": "환영합니다",
  "language": "언어"
}
```

### API Route

The translation API route is at `app/api/translations/[language]/[namespace]/route.ts`. It:
- Validates language and namespace
- Loads translations from file system
- Returns cached responses with proper headers

## 📚 Learn More

- [@hua-labs/i18n-core Documentation](../../packages/hua-i18n-core/README.md)
- [@hua-labs/i18n-core-zustand Documentation](../../packages/hua-i18n-core-zustand/README.md)
- [@hua-labs/i18n-loaders Documentation](../../packages/hua-i18n-loaders/README.md)

## 🚢 Deployment

This example is ready for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

1. Push this repository to GitHub
2. Import to Vercel
3. Set Root Directory to `examples/next-app-router-example`
4. Deploy!

The example includes all necessary configuration for production deployment.

### Live Demo

Once deployed, the demo will be available at your Vercel URL. The demo showcases:
- 6 languages (Korean, English, Japanese, Chinese, Spanish, French)
- Smooth animations on language change
- SSR/CSR support
- Multiple namespaces
- API-based translation loading

## 🔍 Troubleshooting

### Type Errors

If you encounter type errors, make sure:
- All workspace dependencies are installed: `pnpm install` from monorepo root
- TypeScript version matches: `^5.9.3`

### EPERM Error (Permission Issue on Windows)

If you see `EPERM: operation not permitted, open '.next/trace'` error:

1. Delete `.next` folder:
   ```bash
   # PowerShell
   Remove-Item -Recurse -Force .next
   
   # Or manually delete the .next folder
   ```

2. Restart development server:
   ```bash
   pnpm dev
   ```

3. If still not working:
   - Run as administrator
   - Check if another process is using the files
   - Restart your IDE/editor

### Server Component Errors

If you see errors about functions being passed to Client Components:
- Make sure `I18nProvider` is a client component (has `'use client'` directive)
- The `createClientI18nProvider` should only be called inside client components
- SSR translations are loaded in `layout.tsx` (server component) and passed as props to `I18nProvider` (client component)

### Translation Loading Issues

- Check that translation files exist in `translations/[language]/[namespace].json`
- Verify API route is accessible at `/api/translations/[language]/[namespace]`
- Check browser console for loading errors

### Port Already in Use

If port 3000 is in use, Next.js will automatically use the next available port (3001, 3002, etc.)
- Check the terminal output for the actual port number
- Or specify a custom port: `pnpm dev -- -p 3002`

## 📝 License

MIT

