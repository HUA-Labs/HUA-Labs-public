# How to Use This CodeSandbox Template

## Option 1: Import to CodeSandbox

1. Go to [CodeSandbox](https://codesandbox.io)
2. Click "Import from GitHub"
3. Enter the repository URL: `https://github.com/HUA-Labs/HUA-Labs-public`
4. Navigate to `examples/codesandbox-template`
5. CodeSandbox will automatically detect it's a Next.js project

## Option 2: Use as Template

1. Fork or clone this repository
2. Navigate to `examples/codesandbox-template`
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Note

This template uses `@hua-labs/i18n-core` and `@hua-labs/i18n-core-zustand` packages. 
Make sure these packages are published to npm before using this template in CodeSandbox.

If the packages are not yet published, you can:
1. Use the local packages by adjusting the import paths
2. Wait for the packages to be published to npm
3. Use a GitHub import with the full repository

## Features Demonstrated

- Zero flickering language switching
- SSR translation loading
- Zustand state management integration
- Next.js App Router compatibility

