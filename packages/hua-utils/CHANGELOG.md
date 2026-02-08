# @hua-labs/utils

## 1.1.0-alpha.1

### Patch Changes

- Standardize READMEs, fix Skeleton rendering, remove deprecated i18n-beginner

  **All packages**: Bilingual README standardization (EN/KO inline format, consistent template)

  **hua-ui**: Fix Skeleton component — inline styles overriding Tailwind className (#411). Default dimensions moved to CVA variant classes.

  **Cleanup**: Remove @hua-labs/i18n-beginner (deprecated), delete internal docs from packages

## 1.1.0-alpha.0

### Minor Changes

- 571383c: Sync platform Phase 1-3 to public repo

  **hua-ui**: Category entry split (overlay, data, interactive), motion-core peerDep removed, dnd-kit externalized to optional peerDeps

  **hua-ux**: 15 subpath exports (ui, motion, i18n, state, hooks, loaders, formatters, utils), tsup dual format build

  **motion-core**: 23 hooks API standardized (PR #407), 4 new sensor hooks (useInView, useMouse, useReducedMotion, useWindowSize)

  **New packages**: @hua-labs/hooks, @hua-labs/utils, @hua-labs/i18n-formatters

  **All packages**: tsc → tsup migration, sideEffects:false, tree-shaking optimized
