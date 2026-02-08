---
"@hua-labs/i18n-core-zustand": patch
---

fix: update zustand peerDependency to support both v4 and v5

Update `zustand` peer dependency from `^4.0.0` to `^4.0.0 || ^5.0.0` and `react` from `>=16.8.0` to `>=19.0.0` to match the actual source code and resolve peer dependency conflicts with `@hua-labs/state` which requires `zustand >=5.0.0`.
