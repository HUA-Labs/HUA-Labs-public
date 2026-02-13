# create-hua

## 1.2.0

### i18n Overhaul & Stabilization

- **i18n**: Replace 51 inline `isEn` branches with centralized `t()` message system
- **i18n**: Add `src/messages.ts` with 90+ message keys (EN/KO bilingual)
- **i18n**: Add interpolation support to `t()` function (`t('key', { param: value })`)
- **strict mode**: Enable `strict: true` in tsconfig.json
- **fix(C1)**: Replace `process.exit(1)` with `throw Error` in create-project.ts
- **fix(H1)**: Connect `--non-interactive` flag — skip prompts and use defaults
- **fix(H2)**: Connect `--install` flag in interactive path
- **fix(M3)**: Add `.eslintrc.json` to template validation (validateTemplate + validate-template.ts)
- **fix(C3)**: Fix npm badge URLs (`create-hua` not `@hua-labs/create-hua`)
- **docs**: Rewrite README with CLI flags table, doctor command, project structure
- **chore**: Add `.gitignore` for auto-generated `src/version.ts`
- **chore**: Update tsconfig lib to ES2021

## 1.1.0

### Enhancements

- Semver comparison for version check (proper `compareVersions` instead of string equality)
- Auto-install support with `--install` flag (non-interactive path)
- npx cache clearing instructions (Windows/macOS/Linux)
- Monorepo-aware `@hua-labs/hua` version detection (workspace:* / ^version / build-time)
- Template validation script (`scripts/validate-template.ts`)
- Bilingual CLI output (EN/KO) with `--english-only` flag

## 1.0.0

### Stable Release

- Interactive project scaffolding with AI context file selection
- Pre-wired Next.js 16 + React 19 + Tailwind 4 + Zustand 5 template
- Doctor command for project health diagnosis
- Dry-run mode for previewing project creation
- Monorepo detection (pnpm workspace / npm workspaces)
- Project name validation (npm naming conventions)
- Translation file validation (JSON syntax check)
- Dynamic Tailwind config generation (monorepo content paths)
- Package version injection into ai-context.md
