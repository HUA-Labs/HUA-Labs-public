---
"create-hua-ux": patch
---

fix(create-hua-ux): add missing lib/utils.ts template and fix validation

- Add `lib/utils.ts` template file with cn() utility function for className merging
- Remove `public/favicon.ico` from required files validation (users add this after Next.js setup)
- Fixes template validation errors when creating new projects
