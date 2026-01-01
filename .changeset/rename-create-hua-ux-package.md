---
"create-hua-ux": major
---

BREAKING CHANGE: Renamed package from `@hua-labs/create-hua-ux` to `create-hua-ux` for better CLI experience.

**Migration Guide:**

**Old command (no longer works):**
```bash
npx @hua-labs/create-hua-ux my-app
```

**New command (now works with npm create):**
```bash
npm create hua-ux my-app
# or
pnpm create hua-ux my-app
# or
yarn create hua-ux my-app
```

**Why this change?**
- Enables standard `npm create` command pattern
- Better user experience - easier to remember and type
- Consistent with create-next-app, create-react-app, etc.
- The old `@hua-labs/create-hua-ux` package will be deprecated

**Note:** This is still in alpha, so we're making this breaking change now before stable release.
