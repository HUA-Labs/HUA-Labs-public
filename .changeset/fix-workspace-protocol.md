---
"@hua-labs/i18n-loaders": patch
"@hua-labs/i18n-formatters": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/hua-ux": patch
---

fix: replace workspace: protocol with actual version ranges in dependencies

Replace `workspace:*` and `workspace:^` with actual semver ranges so npm install
works correctly in consumer projects. The workspace: protocol is pnpm-specific and
was not being replaced during changeset publish.
