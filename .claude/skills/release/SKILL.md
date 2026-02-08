# Release / Publish Packages

## When to Apply

- Publishing packages to npm
- Creating a new release
- Version bumping

## Workflow

This monorepo uses **Changesets** in **alpha pre-release mode** for versioning and publishing.
Publishing happens via **GitHub Actions** (not local `npm publish`).

### Steps

1. **Create changeset** describing the changes:
   ```bash
   cd D:\HUA\hua-labs-public
   npx changeset
   ```
   Or manually create a `.changeset/<name>.md` file:
   ```markdown
   ---
   "package-name": patch
   ---

   Description of changes
   ```

2. **Commit and push to main**:
   ```bash
   git add .changeset/
   git commit -m "chore: add changeset for <description>"
   git push origin main
   ```

3. **GitHub Actions handles the rest**:
   - `.github/workflows/release.yml` triggers on push to `main`
   - Changesets action runs `changeset version` (bumps alpha versions)
   - Then runs `pnpm release` → `pnpm -r publish --access public --no-git-checks`
   - npm provenance is enabled via GitHub OIDC

### Pre-release (Alpha) Mode

Currently active. All version bumps produce `-alpha.X` suffixes.

```bash
# Check current mode
cat .changeset/pre.json

# Exit alpha mode (for stable release)
npx changeset pre exit

# Enter alpha mode
npx changeset pre enter alpha
```

### Version Types

| Type | When |
|------|------|
| `patch` | Bug fixes, small changes |
| `minor` | New features, backward compatible |
| `major` | Breaking changes |

### Package Names

| Package | npm name |
|---------|----------|
| hua-ui | `@hua-labs/ui` |
| hua-ux | `@hua-labs/hua-ux` |
| create-hua-ux | `create-hua-ux` |
| hua-i18n-core | `@hua-labs/i18n-core` |
| hua-i18n-core-zustand | `@hua-labs/i18n-core-zustand` |
| hua-i18n-formatters | `@hua-labs/i18n-formatters` |
| hua-i18n-loaders | `@hua-labs/i18n-loaders` |
| hua-motion-core | `@hua-labs/motion-core` |
| hua-state | `@hua-labs/state` |

## Important

- **NEVER** use `npm publish` locally — always go through GitHub Actions
- `workspace:^` dependencies are auto-converted to real versions by `pnpm publish`
- The release script is `pnpm -r publish` (NOT `changeset publish`)
- Check CI status after push: `gh run list --workflow=release.yml`
