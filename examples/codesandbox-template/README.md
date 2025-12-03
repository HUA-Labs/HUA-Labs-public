# HUA i18n CodeSandbox Demo

This is a live demo of [@hua-labs/i18n-core](https://github.com/HUA-Labs/HUA-Labs-public) showing zero-flickering language switching with SSR/CSR support.

> **Note**: This template uses npm packages `@hua-labs/i18n-core@^1.0.0` and `@hua-labs/i18n-core-zustand@^1.0.0`.

## Features Demonstrated

- ✅ **Zero flickering**: Translations update instantly without flickering
- ✅ **SSR/CSR support**: Works seamlessly with Next.js App Router
- ✅ **Zustand integration**: Automatic language synchronization via `@hua-labs/i18n-core-zustand`
- ✅ **6 Languages**: Support for Korean, English, Japanese, Chinese, Spanish, and French
- ✅ **Smooth animations**: Beautiful fade-in transitions when switching languages
- ✅ **JSON-based translations**: Easy to add new languages by adding JSON files
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Persistent storage**: Language preference saved in localStorage

## Quick Start

### Local Development

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Run development server
npm run dev
# or
pnpm run dev
# or
yarn dev
```

Visit `http://localhost:3000` and try switching languages!

### CodeSandbox

This template is ready for CodeSandbox deployment:

1. Go to [CodeSandbox](https://codesandbox.io)
2. Click **"Import from GitHub"**
3. Repository: `HUA-Labs/HUA-Labs-public`
4. Directory: `examples/codesandbox-template`
5. Click **"Import"**

The template will automatically install npm packages and start the development server.

## How It Works

1. **Zustand Store**: Manages language state with `persist` middleware
2. **i18n Provider**: Wraps the app with `createZustandI18n` adapter
3. **Automatic Sync**: Language changes in Zustand automatically sync to i18n
4. **Zero Flickering**: Previous language translation shown during switch

## Project Structure

```
codesandbox-template/
├── app/
│   ├── layout.tsx          # Root layout with I18nProvider
│   ├── page.tsx            # Main demo page
│   └── globals.css         # Global styles with animations
├── components/
│   ├── I18nProvider.tsx    # Client-side i18n provider wrapper
│   └── LanguageSwitcher.tsx # Language switching UI (6 languages)
├── lib/
│   ├── i18n-config.ts      # i18n configuration with Zustand adapter
│   └── store.ts            # Zustand store with persist middleware
├── translations/           # JSON translation files
│   ├── ko/common.json      # Korean translations
│   ├── en/common.json      # English translations
│   ├── ja/common.json      # Japanese translations
│   ├── zh/common.json      # Chinese translations
│   ├── es/common.json      # Spanish translations
│   └── fr/common.json      # French translations
└── package.json
```

## Key Implementation Details

### 1. Zustand Store (`lib/store.ts`)

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);
```

### 2. i18n Configuration (`lib/i18n-config.ts`)

```tsx
export function createClientI18nProvider(store, ssrTranslations) {
  return createZustandI18n(store, {
    defaultLanguage: 'ko',
    fallbackLanguage: 'en',
    namespaces: ['common'],
    initialTranslations: ssrTranslations,
    translationLoader: 'custom',
    loadTranslations: async (language, namespace) => {
      // Load translations from your source
    },
  });
}
```

### 3. Using Translations

```tsx
import { useTranslation } from '@hua-labs/i18n-core';
import { useAppStore } from '@/lib/store';

function MyComponent() {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppStore();

  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

## Try It Out

1. **Switch Languages**: Click the language buttons to see smooth translation updates with animations
2. **No Flickering**: Notice how previous translations remain visible during switch
3. **Smooth Transitions**: Watch the beautiful fade-in animation when languages change
4. **6 Languages**: Try switching between Korean, English, Japanese, Chinese, Spanish, and French
5. **Persistent**: Refresh the page - your language preference is saved!

## Adding New Languages

To add a new language:

1. Create a new JSON file: `translations/[language-code]/common.json`
2. Add the language code to `lib/store.ts`: `SupportedLanguage` type
3. Import the translation in `lib/i18n-config.ts`
4. Add to `getAllTranslations()` function
5. Add to `components/LanguageSwitcher.tsx` languages array

Example for German (de):
```json
// translations/de/common.json
{
  "welcome": "Willkommen",
  "language": "Sprache",
  ...
}
```

## 🚢 Deployment

This template can be deployed to CodeSandbox after npm packages are published. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Current Status

- ✅ Template structure complete
- ✅ 6 languages supported
- ✅ Animations implemented
- ⏳ Waiting for npm package release

### After npm Release

1. Update `package.json` with npm package versions
2. Upload to CodeSandbox
3. Share the public link

## Learn More

- [Core Package Documentation](../../packages/hua-i18n-core/README.md)
- [Zustand Adapter Documentation](../../packages/hua-i18n-core-zustand/README.md)
- [GitHub Repository](https://github.com/HUA-Labs/HUA-Labs-public)
- [Deployment Guide](./DEPLOYMENT.md)

