---
"@hua-labs/hua-ux": patch
---

fix(hua-ux): add 'use client' directive to framework/index.ts

- Fixes "createContext only works in Client Components" error when importing from @hua-labs/hua-ux/framework
- Next.js requires 'use client' in files that re-export Client Components
- Critical fix for create-hua-ux generated projects
