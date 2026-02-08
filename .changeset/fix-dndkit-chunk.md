---
"@hua-labs/ui": patch
"@hua-labs/hua-ux": patch
"create-hua-ux": patch
---

fix: remove dashboard re-export from advanced entry to avoid @dnd-kit chunk error

- `@hua-labs/ui`: Remove `export * from './advanced/dashboard'` from `advanced.ts` to prevent Kanban/@dnd-kit dependency leak
- `@hua-labs/hua-ux`: Split advanced imports into dedicated sub-entries (`advanced/dashboard`, `advanced/motion`)
- `create-hua-ux`: Update Next.js version from 16.1.1 to 16.1.6
