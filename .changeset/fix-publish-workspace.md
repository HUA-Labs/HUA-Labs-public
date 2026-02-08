---
"@hua-labs/i18n-loaders": patch
"@hua-labs/i18n-formatters": patch
"@hua-labs/i18n-core-zustand": patch
"@hua-labs/hua-ux": patch
---

fix: use pnpm publish to properly resolve workspace: protocol in npm packages

Previously `changeset publish` used `npm publish` internally which didn't convert
`workspace:` protocol to actual version ranges, causing `npm install` failures
in consumer projects. Switched release script to `pnpm -r publish` which
automatically replaces `workspace:^` with real semver ranges during publish.
