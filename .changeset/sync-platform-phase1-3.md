---
"@hua-labs/ui": minor
"@hua-labs/hua-ux": minor
"@hua-labs/motion-core": minor
"@hua-labs/state": patch
"@hua-labs/i18n-core": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/i18n-loaders": patch
"@hua-labs/hooks": minor
"@hua-labs/utils": minor
"@hua-labs/i18n-formatters": minor
"create-hua-ux": patch
---

Sync platform Phase 1-3 to public repo

**hua-ui**: Category entry split (overlay, data, interactive), motion-core peerDep removed, dnd-kit externalized to optional peerDeps

**hua-ux**: 15 subpath exports (ui, motion, i18n, state, hooks, loaders, formatters, utils), tsup dual format build

**motion-core**: 23 hooks API standardized (PR #407), 4 new sensor hooks (useInView, useMouse, useReducedMotion, useWindowSize)

**New packages**: @hua-labs/hooks, @hua-labs/utils, @hua-labs/i18n-formatters

**All packages**: tsc → tsup migration, sideEffects:false, tree-shaking optimized
