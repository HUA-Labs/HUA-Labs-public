---
"@hua-labs/ui": patch
---

fix(ui): Remove unused Jest dependencies in favor of Vitest

Removed jest, @types/jest, and @testing-library/jest-dom from devDependencies since the package uses Vitest as its test framework.
