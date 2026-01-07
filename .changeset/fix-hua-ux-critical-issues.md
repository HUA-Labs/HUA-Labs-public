---
"@hua-labs/hua-ux": patch
---

fix(hua-ux): Fix critical framework issues

- Export WelcomePage component and types from framework index
- Fix package.json exports to point to dist instead of src for production builds
- Remove middleware from tsconfig exclude to include it in build output

These fixes resolve:
1. Missing WelcomePage export (breaking change for users)
2. Import inconsistencies between dev and production environments
3. Middleware not being included in TypeScript compilation
