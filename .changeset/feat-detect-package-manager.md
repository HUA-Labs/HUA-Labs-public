---
"create-hua-ux": minor
---

feat(create-hua-ux): Detect and display package manager used by user

- Added automatic package manager detection (npm, pnpm, yarn)
- Next Steps now shows the correct commands based on how the CLI was invoked
- Instead of hardcoded `pnpm install`, shows:
  - `npm install` when using `npm create hua-ux`
  - `pnpm install` when using `pnpm create hua-ux`
  - `yarn install` when using `yarn create hua-ux`

Better UX as users can copy-paste commands that match their package manager preference.
