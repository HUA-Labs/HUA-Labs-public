---
"create-hua-ux": patch
"@hua-labs/hua-ux": patch
---

feat: add comprehensive automation for quality and reliability

## create-hua-ux

- Add template validation script that runs before every build
- Validate Next.js 16 async API patterns in templates
- Add version checker CLI to detect npx cache issues
- Warn users with OS-specific cache clear instructions
- Prevent outdated templates from reaching users

## @hua-labs/hua-ux

- Add GEO metadata validator for Schema.org compliance
- Validate JSON-LD structure and required fields
- Provide clear validation errors and warnings
- Export validator functions from framework/seo/geo

## Infrastructure

- Add PR validation workflow (changeset checks, package name validation)
- Add E2E testing workflow (6 OS/package-manager combinations)
- Add dependency monitoring workflow (weekly updates for Next.js, React, TypeScript)
- Add comprehensive automation documentation (guides, troubleshooting, best practices)

**Impact:** Saves ~10 hours/week through automated quality checks and error prevention
