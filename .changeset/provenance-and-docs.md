---
"@hua-labs/hua-ux": patch
"@hua-labs/ui": patch
"@hua-labs/motion-core": patch
"@hua-labs/i18n-core": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/i18n-loaders": patch
"@hua-labs/i18n-beginner": patch
"@hua-labs/state": patch
"create-hua-ux": patch
---

# npm Provenance & Documentation Improvements

## npm Provenance (출처증명)
- Add npm provenance support for all packages
- Configure `.npmrc` with `provenance=true`
- Add `id-token: write` permission to release workflow
- Enhance supply chain security with package attestations

## Documentation Enhancements
- **Badges**: Standardize badges across all package READMEs
  - Add npm downloads badge to all packages
  - Add TypeScript badge to all packages
  - Ensure consistent badge formatting

- **Bilingual Support**: Improve Korean-English navigation
  - Add language navigation links to all READMEs
  - Format: `[English](#english) | [한국어](#korean)`
  - Maintain consistent bilingual structure

## Affected Packages
All 9 packages receive patch updates for documentation and provenance:
- @hua-labs/hua-ux
- @hua-labs/ui
- @hua-labs/motion-core
- @hua-labs/i18n-core
- @hua-labs/i18n-core-zustand
- @hua-labs/i18n-loaders
- @hua-labs/i18n-beginner
- @hua-labs/state
- create-hua-ux
