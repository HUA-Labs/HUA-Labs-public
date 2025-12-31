# Changesets Guide

This repository uses [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.

For deployment checklist, see [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

## Versioning Rules

### Semantic Versioning (SemVer)

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes that require users to modify their code
- **MINOR** (0.x.0): New features that are backward compatible
- **PATCH** (0.0.x): Bug fixes and backward compatible changes

### Version Bump Rules

1. **Major (breaking)**
   - API changes that break backward compatibility
   - Removal of public APIs or features
   - Changes to TypeScript types that require code updates
   - Changes to required peer dependencies

2. **Minor (feature)**
   - New features or functionality
   - New public APIs
   - New optional parameters (backward compatible)
   - Deprecation notices (without removal)

3. **Patch (fix)**
   - Bug fixes
   - Performance improvements
   - Documentation updates
   - Internal refactoring (no API changes)
   - Dependency updates (non-breaking)

### Internal Dependencies

When a package depends on another package in this monorepo:
- Internal dependency updates are automatically handled as `patch` bumps
- If you need a `minor` or `major` bump for an internal dependency, explicitly specify it in the changeset

## Creating a Changeset

### Interactive Mode

```bash
pnpm changeset
```

This will:
1. Ask which packages changed
2. Ask what type of change (major/minor/patch)
3. Ask for a summary of changes

### Manual Creation

Create a file in `.changeset/` directory:

```
.changeset/[random-name].md
```

Example:

```markdown
---
"@hua-labs/i18n-core": patch
---

Fix hydration issue when language changes
```

### Changeset Format

```markdown
---
"package-name": [major|minor|patch]
"another-package": [major|minor|patch]
---

Description of changes (will appear in CHANGELOG.md)
```

## Release Process

### 1. Create Changesets

After making changes, create a changeset:

```bash
pnpm changeset
```

### 2. Version Packages

When ready to release, version packages based on changesets:

```bash
pnpm version
```

This will:
- Update package.json versions
- Generate/update CHANGELOG.md files
- Remove used changesets

### 3. Review Changes

Review the generated CHANGELOG.md files and commit:

```bash
git add .
git commit -m "chore: version packages"
```

### 4. Publish

Publish to npm:

```bash
pnpm release
```

Or dry-run first:

```bash
pnpm release:dry
```

## Best Practices

1. **Create changesets early**: Create a changeset when you start working on a feature, not at the end
2. **Be descriptive**: Write clear summaries that users will understand
3. **Group related changes**: Multiple related changes can be in one changeset
4. **Breaking changes**: Always mark breaking changes as `major` and explain migration steps
5. **Review before versioning**: Review all changesets before running `pnpm version`

## Examples

### Patch Release (Bug Fix)

```markdown
---
"@hua-labs/i18n-core": patch
---

Fix translation key lookup when namespace is missing
```

### Minor Release (New Feature)

```markdown
---
"@hua-labs/i18n-core": minor
---

Add getRawValue method to retrieve raw translation data for arrays and objects
```

### Major Release (Breaking Change)

```markdown
---
"@hua-labs/i18n-core": major
---

Remove deprecated autoLanguageSync option. Use Zustand adapter instead.
```

### Multiple Packages

```markdown
---
"@hua-labs/i18n-core": minor
"@hua-labs/i18n-core-zustand": patch
---

Add SSR support to core package and update Zustand adapter to use new API
```

