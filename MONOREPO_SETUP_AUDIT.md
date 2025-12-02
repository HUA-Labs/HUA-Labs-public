# Monorepo Setup Audit

## Issues Found

### 1. Turbo Version Mismatch
- **Public**: `turbo@^1.10.0` (old format)
- **Private**: `turbo@^2.5.8` (new format)
- **Issue**: Public uses old `pipeline` format, private uses new `tasks` format
- **Action**: Update turbo to v2 and migrate turbo.json

### 2. pnpm Version Mismatch
- **Public**: `pnpm@10.14.0`
- **Private**: `pnpm@10.24.0`
- **Action**: Update to match private repo

### 3. Missing .nvmrc
- **Public**: No .nvmrc file
- **Private**: Node 22.17.1
- **Action**: Add .nvmrc file

### 4. Missing type-check Script
- **Public**: No `type-check` script in root package.json
- **Private**: Has `type-check` script
- **Action**: Add type-check script

### 5. Turbo.json Format
- **Public**: Uses old `pipeline` format
- **Private**: Uses new `tasks` format
- **Action**: Migrate to new format

### 6. Missing ESLint Configuration
- **Public**: No ESLint config
- **Private**: Has ESLint config
- **Action**: Add ESLint config (optional, but recommended for consistency)

### 7. Package Dependencies Outdated
- **Public packages**: Old dependency versions
  - `eslint@^8.0.0` (very old)
  - `jest@^29.0.0` (could be newer)
  - `typescript@^5.8.3` (should match private)
- **Action**: Update to match private repo versions

### 8. Missing Build Verification
- **Action**: Run build, lint, type-check on all packages

## Recommended Actions

1. Update turbo to v2
2. Update pnpm version
3. Add .nvmrc
4. Add type-check script
5. Migrate turbo.json to new format
6. Update package dependencies
7. Add ESLint config (optional)
8. Test build/lint/type-check

