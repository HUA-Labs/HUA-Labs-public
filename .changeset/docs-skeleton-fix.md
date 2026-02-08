---
"@hua-labs/ui": patch
"@hua-labs/hua-ux": patch
"@hua-labs/motion-core": patch
"@hua-labs/state": patch
"@hua-labs/i18n-core": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/i18n-loaders": patch
"@hua-labs/hooks": patch
"@hua-labs/utils": patch
"@hua-labs/i18n-formatters": patch
"create-hua-ux": patch
---

Standardize READMEs, fix Skeleton rendering, remove deprecated i18n-beginner

**All packages**: Bilingual README standardization (EN/KO inline format, consistent template)

**hua-ui**: Fix Skeleton component — inline styles overriding Tailwind className (#411). Default dimensions moved to CVA variant classes.

**Cleanup**: Remove @hua-labs/i18n-beginner (deprecated), delete internal docs from packages
