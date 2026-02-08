# @hua-labs/i18n-formatters

## 1.1.1-alpha.0

### Patch Changes

- 0bd2230: fix: use pnpm publish to properly resolve workspace: protocol in npm packages

  Previously `changeset publish` used `npm publish` internally which didn't convert
  `workspace:` protocol to actual version ranges, causing `npm install` failures
  in consumer projects. Switched release script to `pnpm -r publish` which
  automatically replaces `workspace:^` with real semver ranges during publish.

## 1.1.0

### Patch Changes

- 34dcb5c: CVA Phase 5 migration, README standardization, Skeleton fix

  **hua-ui**: Full CVA migration (73+ components), new advanced components (AnimatedGradient, Carousel, GlowCard, etc.), emotion analysis components, blog editor

  **All packages**: Bilingual README standardization, Skeleton rendering fix (#411)

- Updated dependencies [34dcb5c]
  - @hua-labs/i18n-core@1.1.0

## 1.1.0-alpha.2

### Patch Changes

- CVA Phase 5 migration, README standardization, Skeleton fix

  **hua-ui**: Full CVA migration (73+ components), new advanced components (AnimatedGradient, Carousel, GlowCard, etc.), emotion analysis components, blog editor

  **All packages**: Bilingual README standardization, Skeleton rendering fix (#411)

- Updated dependencies
  - @hua-labs/i18n-core@1.1.0-alpha.9

## 1.1.0-alpha.1

### Patch Changes

- Standardize READMEs, fix Skeleton rendering, remove deprecated i18n-beginner

  **All packages**: Bilingual README standardization (EN/KO inline format, consistent template)

  **hua-ui**: Fix Skeleton component — inline styles overriding Tailwind className (#411). Default dimensions moved to CVA variant classes.

  **Cleanup**: Remove @hua-labs/i18n-beginner (deprecated), delete internal docs from packages

- Updated dependencies
  - @hua-labs/i18n-core@1.1.0-alpha.8

## 1.1.0-alpha.0

### Minor Changes

- 571383c: Sync platform Phase 1-3 to public repo

  **hua-ui**: Category entry split (overlay, data, interactive), motion-core peerDep removed, dnd-kit externalized to optional peerDeps

  **hua-ux**: 15 subpath exports (ui, motion, i18n, state, hooks, loaders, formatters, utils), tsup dual format build

  **motion-core**: 23 hooks API standardized (PR #407), 4 new sensor hooks (useInView, useMouse, useReducedMotion, useWindowSize)

  **New packages**: @hua-labs/hooks, @hua-labs/utils, @hua-labs/i18n-formatters

  **All packages**: tsc → tsup migration, sideEffects:false, tree-shaking optimized

### Patch Changes

- Updated dependencies [571383c]
  - @hua-labs/i18n-core@1.1.0-alpha.7
