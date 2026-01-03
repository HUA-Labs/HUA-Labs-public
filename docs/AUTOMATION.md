# Automation Guide

This document describes the automated processes and quality checks in the hua-labs-public repository.

## Table of Contents

- [Overview](#overview)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Local Development Tools](#local-development-tools)
- [Quality Checks](#quality-checks)
- [Troubleshooting](#troubleshooting)

---

## Overview

We use automation to:
- ✅ Prevent common mistakes (missing changesets, package name typos)
- ✅ Ensure template quality (Next.js 16 compatibility)
- ✅ Catch outdated dependencies early
- ✅ Test in real-world environments (outside monorepo)
- ✅ Validate GEO metadata correctness

**Benefits:**
- Faster development (catch issues before PR review)
- Better user experience (no broken templates)
- Reduced maintenance burden (automated monitoring)

---

## GitHub Actions Workflows

### 1. PR Validation (`.github/workflows/validate-pr.yml`)

**Triggers:**
- Every pull request to `main`
- On PR open, sync, or reopen

**What it does:**
1. Checks if package code was modified
2. Verifies changeset exists for code changes
3. Validates package names in changesets
4. Runs changeset format validation

**Example output:**
```
✓ Detected changes in packages
✓ Changeset files found: .changeset/fix-template.md
✓ create-hua-ux - valid
✓ @hua-labs/hua-ux - valid
✓ All changeset package names are valid
```

**How to fix failures:**
```bash
# Create a changeset
npx changeset

# Or with Graphite
gt create -m "your commit message"
```

---

### 2. E2E Test (`.github/workflows/e2e-test.yml`)

**Triggers:**
- PR changes to `packages/create-hua-ux/**`
- Push to `main`
- Manual workflow dispatch

**What it does:**
1. Builds create-hua-ux from source
2. Creates test project **outside monorepo** (simulates real user)
3. Verifies no `workspace:` protocol in package.json
4. Checks Next.js 16 async API patterns
5. Tests dependency installation
6. Builds the generated project
7. Starts dev server to verify runtime

**Test matrix:**
- OS: Ubuntu, Windows, macOS
- Package managers: npm, pnpm
- Node: 22

**What it catches:**
- ❌ Workspace protocol in generated projects
- ❌ Missing `async`/`await` in Next.js 16 code
- ❌ Template build failures
- ❌ Runtime errors on dev server start

---

### 3. Dependency Monitor (`.github/workflows/dependency-monitor.yml`)

**Triggers:**
- Every Monday at 9:00 UTC (6:00 PM KST)
- Manual workflow dispatch

**What it does:**
1. Checks critical dependencies (Next.js, React, TypeScript)
2. Compares current vs latest versions
3. Creates/updates GitHub issue with findings

**Monitored dependencies:**
- `next`
- `react`
- `react-dom`
- `typescript`

**Example issue:**
```markdown
# Dependency Updates Available - 2026-01-03

## 📦 next

**Current:** 16.0.10
**Latest:** 16.1.0

**Repository:** https://github.com/vercel/next.js

## Action Items

- [ ] Review changelog and breaking changes
- [ ] Test compatibility with templates
- [ ] Update package.json if compatible
- [ ] Run E2E tests
```

---

## Local Development Tools

### 1. Template Validation (`validate-template.ts`)

**Location:** `packages/create-hua-ux/scripts/validate-template.ts`

**When it runs:**
- Automatically before every build (`prebuild` script)
- Manually via `pnpm validate:template`

**What it checks:**
```typescript
// Required files
- app/layout.tsx
- app/page.tsx
- lib/utils.ts
- translations/ko/common.json
// ... and more

// File contents (Next.js 16 compatibility)
- app/layout.tsx must contain "async function RootLayout"
- app/layout.tsx must contain "await headers()"
- API routes must contain "await params"
```

**Example output:**
```
📋 Validating required files...
  ✓ app/layout.tsx
  ✓ app/page.tsx
  ✓ lib/utils.ts

🔍 Validating file contents (Next.js 16 compatibility)...
  Checking app/layout.tsx:
    ✓ Found: async function RootLayout
    ✓ Found: await headers()

✅ Template validation passed
```

---

### 2. Version Checker (`version-check.ts`)

**Location:** `packages/create-hua-ux/src/version-check.ts`

**When it runs:**
- Automatically when user runs `npm create hua-ux my-app`
- Skipped in CI/non-interactive mode

**What it does:**
1. Checks current vs latest npm version
2. Warns if outdated (due to npx cache)
3. Provides OS-specific cache clear instructions
4. Waits 5 seconds before continuing

**Example output:**
```
⚠️  Warning: You are using an outdated version of create-hua-ux
   Current:  1.0.0-alpha.10
   Latest:   1.0.0-alpha.12

   This may result in receiving old templates with known issues.

   📝 To clear npx cache:

   macOS/Linux:
   npm cache clean --force
   rm -rf ~/.npm/_npx

   Then create your project with:
   npm create hua-ux@latest my-app

   Continuing in 5 seconds...
```

---

### 3. GEO Metadata Validator (`validator.ts`)

**Location:** `packages/hua-ux/src/framework/seo/geo/validator.ts`

**Usage:**
```typescript
import { validateJsonLd, formatValidationResult } from '@hua-labs/hua-ux/framework';

const result = validateJsonLd(myJsonLd);

if (!result.valid) {
  console.log(formatValidationResult(result));
}
```

**What it validates:**
- Required fields (`@context`, `@type`, `name`, `description`)
- URL format correctness
- Type-specific fields (SoftwareApplication vs WebSite)
- Schema.org compliance

**Example:**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'My App',
  description: 'Too short', // ⚠️ Warning: < 10 chars
};

const result = validateJsonLd(jsonLd);
// result.valid: true (no errors)
// result.warnings: [{ field: 'description', message: '...' }]
```

---

## Quality Checks

### Pre-Commit Checks

**Not automated yet**, but recommended to add:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pnpm lint-staged"
    }
  },
  "lint-staged": {
    "packages/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### Pre-Build Checks

**Automatically run:**
```bash
# Before building create-hua-ux
pnpm prebuild
# → Runs: generate-version.ts && validate-template.ts
```

### Pre-Publish Checks

**Automatically run:**
```bash
# Before publishing to npm
pnpm prepublishOnly
# → Runs: pnpm build
# → Which runs: prebuild (validation) + tsc
```

---

## Troubleshooting

### Changeset Validation Failed

**Error:**
```
❌ Error: Package changes detected but no changeset found
```

**Solution:**
```bash
# Create changeset interactively
npx changeset

# Or with Graphite
gt create -m "feat: add new feature"
```

---

### Package Name Not Found

**Error:**
```
❌ @hua-labs/hua-state - NOT FOUND in workspace
```

**Solution:**
Check the package name spelling. Available packages:
```bash
# List all packages
find packages -name "package.json" -exec jq -r '.name' {} \;
```

Correct name: `@hua-labs/state` (not `hua-state`)

---

### Template Validation Failed

**Error:**
```
❌ Missing required file: lib/utils.ts
```

**Solution:**
```bash
# Create the missing file
cat > packages/create-hua-ux/templates/nextjs/lib/utils.ts <<'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
```

---

### E2E Test Failed (workspace: protocol found)

**Error:**
```
❌ Error: workspace: protocol found in package.json
```

**Cause:**
Test ran inside monorepo, not outside.

**Solution:**
This shouldn't happen in CI. Locally, test outside monorepo:
```bash
cd /tmp
node ~/hua-labs-public/packages/create-hua-ux/dist/bin/create-hua-ux.js test
```

---

### Version Check Network Error

**Error:**
```
(Version check skipped)
```

**Cause:**
npm registry unreachable or network timeout.

**Impact:**
None - version check is optional. Project creation continues.

---

## Best Practices

### For Developers

1. **Always create changesets** for package changes
   ```bash
   gt create -m "your message"  # Graphite
   # OR
   npx changeset                # Manual
   ```

2. **Test outside monorepo** before publishing
   ```bash
   cd /tmp
   node ~/hua-labs-public/packages/create-hua-ux/dist/bin/create-hua-ux.js test-app
   cd test-app
   npm install
   npm run dev
   ```

3. **Run validation before committing**
   ```bash
   cd packages/create-hua-ux
   pnpm validate:template
   ```

4. **Check dependency updates weekly**
   - Review Monday's Dependency Monitor issue
   - Test breaking changes before updating

### For PR Reviewers

1. ✅ Check that changeset exists
2. ✅ Verify E2E tests pass
3. ✅ Ensure template validation passes
4. ✅ Review breaking changes in dependencies

### For Release Managers

1. ✅ Merge "Version Packages" PR only after review
2. ✅ Monitor npm publish in GitHub Actions
3. ✅ Test published package immediately
   ```bash
   npm create hua-ux@latest test-published
   ```

---

## Metrics

### Time Saved

**Before automation:**
- npx cache issues: 5 hours/week
- Changeset mistakes: 2 hours/week
- Template errors: 2 hours/week
- Monorepo vs real-world differences: 1 hour/week

**Total:** 10 hours/week

**After automation:**
- Expected savings: 9.5 hours/week (95% reduction)
- ROI: 2 weeks to build, recovered in 2 weeks

---

## Future Improvements

### Planned

- [ ] Husky + lint-staged for pre-commit checks
- [ ] Auto-fix template issues where possible
- [ ] Performance benchmarks in E2E tests
- [ ] Visual regression testing
- [ ] Automated changelog generation

### Under Consideration

- [ ] Automatic dependency updates (Dependabot)
- [ ] Security scanning (npm audit in CI)
- [ ] Bundle size monitoring
- [ ] Code coverage reporting

---

## Contributing

To add new automation:

1. Create workflow in `.github/workflows/`
2. Test locally with `act` (GitHub Actions locally)
3. Document in this file
4. Add to PR checklist if needed

---

**Last updated:** 2026-01-03
**Maintained by:** hua-labs team
**Questions?** Open an issue with label `automation`
