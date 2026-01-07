---
"create-hua-ux": patch
"@hua-labs/i18n-beginner": patch
"@hua-labs/i18n-core": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/i18n-loaders": patch
"@hua-labs/motion-core": patch
"@hua-labs/state": patch
"@hua-labs/ui": patch
"@hua-labs/hua-ux": patch
---

chore: align external dependency versions across all packages

- Introduce syncpack for automated dependency version management
- Align @types/node to ^25.0.3 across all packages
- Align TypeScript to ^5.9.3 across all packages
- Align React ecosystem packages to consistent versions
- Add dependency management scripts: deps:check, deps:fix, deps:format

This ensures consistent behavior across the monorepo and prevents version conflicts.
