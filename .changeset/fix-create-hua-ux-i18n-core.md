---
"create-hua-ux": patch
---

fix(create-hua-ux): add missing peer dependencies

- Add @hua-labs/i18n-core to dependencies (fixes MODULE NOT FOUND error)
- Add @hua-labs/motion-core to dependencies (required by @hua-labs/ui)
- Add @phosphor-icons/react to dependencies (required by @hua-labs/ui)
- Fetch latest alpha versions from npm registry for all hua-labs packages

This ensures all peer dependencies of @hua-labs/ui are satisfied when users create new projects.
