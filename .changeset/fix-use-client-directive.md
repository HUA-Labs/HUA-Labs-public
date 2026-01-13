---
"@hua-labs/ui": patch
---

fix: add "use client" directive to dist bundles for Next.js 16 Turbopack compatibility

- Added post-build script to prepend "use client" to all bundled JS files
- Updated exports to use dist files instead of src for proper npm publishing
- Fixes "You're importing a component that needs useState/createContext" errors when using with Next.js App Router
