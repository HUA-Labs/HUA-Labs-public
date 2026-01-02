---
"@hua-labs/hua-ux": patch
"@hua-labs/state": patch
---

fix(hua-ux, state): improve type safety and remove 'as any' assertions

- Remove all 'as any' type assertions from hua-ux framework
- Export zustand types (UseBoundStore, StoreApi) from @hua-labs/state for proper type inference
- Fix LicenseFeature type handling for dynamic plugin features
- Improve type safety in Providers.tsx by using re-exported types
