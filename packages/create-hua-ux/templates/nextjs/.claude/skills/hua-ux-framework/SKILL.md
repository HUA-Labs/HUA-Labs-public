---
name: hua-ux Framework Usage
description: Quick reference guide for developing with hua-ux framework
license: MIT
compatibility:
  - claude
---

# hua-ux Framework Usage Skill

**Quick reference** for hua-ux framework. For detailed project structure, see `.claude/project-context.md`.

## 🚨 Required Guidelines

```
IF (creating a new page or component) THEN
  1. Use hua-ux framework components first
     → Wrap page with `HuaUxPage`
     → Use components from `@hua-labs/ui` first
  2. Generate translation files together
     → `translations/ko/{namespace}.json`
     → `translations/en/{namespace}.json`
  3. Prefer Server Components
     → Add `'use client'` only when client features are needed
END IF
```

## Core Philosophy

**"You don't need to know Next.js. Just configure and tell AI what to do."**

## Essential Patterns

### Page Creation

```tsx
import { HuaUxPage } from '@hua-labs/hua-ux/framework';
import { useTranslation } from '@hua-labs/hua-ux';

export default function MyPage() {
  const { t } = useTranslation();
  return (
    <HuaUxPage title={t('common:title')} description={t('common:description')}>
      <h1>{t('common:title')}</h1>
    </HuaUxPage>
  );
}
```

### Client Component

```tsx
'use client';
import { Card, Button } from '@hua-labs/hua-ux';
import { useFadeIn } from '@hua-labs/hua-ux';

export function MyComponent() {
  const motion = useFadeIn();
  return (
    <Card ref={motion.ref} style={motion.style}>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Language Toggle

```tsx
'use client';
import { useAppStore } from '@/store/useAppStore';

export function LanguageToggle() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  
  return (
    <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>
      {language === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}
```

## Key Components

- **`HuaUxPage`**: Page wrapper (Motion, i18n, SEO auto-applied)
- **`I18nProviderWrapper`**: Required in `layout.tsx` for language toggle
- **`Button`, `Card`, `Badge`**: From `@hua-labs/hua-ux`
- **`useFadeIn`, `useSlideUp`**: Motion hooks from `@hua-labs/hua-ux`

## Configuration

```typescript
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',  // or 'marketing'
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
  },
});
```

## Quick Rules

1. **Pages**: Wrap with `HuaUxPage`, use `useTranslation()`
2. **Components**: Add `'use client'` if needed, use framework components
3. **Translations**: Always create both `ko/` and `en/` files
4. **Config**: Only modify `hua-ux.config.ts`

## References

- **Detailed guide**: `.claude/project-context.md` (project structure, full component list)
- **Component styles**: `docs/COMPONENT_STYLE_GUIDE.md`
- **Motion hooks**: `docs/MOTION_HOOKS.md`
- **Troubleshooting**: `docs/TROUBLESHOOTING.md`
