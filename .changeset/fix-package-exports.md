---
"@hua-labs/state": patch
"@hua-labs/ui": patch
---

fix: Fix package.json exports to use dist instead of src

Fixed exports configuration in @hua-labs/state and @hua-labs/ui:
- Changed all import/require paths from src/*.ts to dist/*.js
- Fixed module field to point to dist/*.js instead of dist/*.mjs
- This resolves "Module not found" and "Missing module type" errors in Next.js projects

Affected packages:
- @hua-labs/state: Fixed main entry and integrations/i18n exports
- @hua-labs/ui: Fixed main entry and all subpath exports (advanced, form, navigation, feedback, components)
