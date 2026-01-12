---
"@hua-labs/motion-core": minor
"@hua-labs/hua-ux": patch
"@hua-labs/i18n-core": minor
"@hua-labs/ui": patch
"create-hua-ux": patch
---

feat: useStaggerMotion hook, WelcomePage redesign, i18n 10 languages

### @hua-labs/motion-core
- Add `useStaggerMotion` hook for animating multiple items with staggered timing
- Supports fadeIn, slideUp, slideLeft, slideRight, scaleIn motion types
- Configurable staggerDelay, initialDelay, duration, threshold options

### @hua-labs/hua-ux
- Redesign WelcomePage with Next.js-style layout
- Add HUA logo, code block UI, Quick Links cards
- Add footer with HUA Labs, Docs, GitHub, email links
- Apply useFadeIn, useSlideUp motion animations

### @hua-labs/i18n-core
- Expand default languages from 2 to 10
- Added: en-IN, ja, zh, zh-TW, es, ru, de, fr

### @hua-labs/ui
- Export recommended-theme.css for Tailwind v4 @theme directive

### create-hua-ux
- Update template globals.css to import recommended-theme.css
- Add fadeIn, slideUp CSS animations
- Add Tailwind CSS v4 styling documentation to ai-context.md
