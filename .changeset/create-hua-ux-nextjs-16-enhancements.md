---
"create-hua-ux": patch
"@hua-labs/hua-ux": patch
---

feat(create-hua-ux): enhance template with Next.js 16 compatibility and improved UX

**create-hua-ux:**
- Fix Next.js 16 async APIs (`await headers()`, `await params`)
- Add LanguageToggle component with Globe icon and fade-in-up motion
- Replace basic template with WelcomePage component featuring:
  - Feature cards (UI, i18n, Motion, AI-First)
  - Quick links (Documentation, Examples, GitHub)
  - Gradient header with project name
- Add public assets:
  - logo.svg (HUA Labs brand logo)
  - favicon.ico
  - next.svg
- Enhance metadata with keywords, authors, OpenGraph

**@hua-labs/hua-ux:**
- Add `framework/seo/geo` export path for server-side GEO support (preparation for future release)

**Fixes:**
- Resolves "headersList.get is not a function" runtime error
- Resolves "params must be unwrapped with await" API route error
- Resolves template validation failures

**Compatibility:**
- Next.js 16.1.1+
- React 19.2.3+
- Full backward compatibility maintained
