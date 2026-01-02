---
"@hua-labs/hua-ux": patch
---

fix(hua-ux): Fix package.json exports to use .js instead of .mjs

TypeScript compiler generates .js files, not .mjs files. Updated package.json exports to point to the correct .js files.

This fixes the "Module not found" error when importing @hua-labs/hua-ux in Next.js projects.
