---
"create-hua-ux": patch
---

fix(create-hua-ux): add missing peer dependencies to generated projects

- Add @hua-labs/i18n-core to dependencies (fixes MODULE NOT FOUND error)
- Add @hua-labs/motion-core to dependencies (required by @hua-labs/ui for animations)
- Add @phosphor-icons/react to dependencies (required by @hua-labs/ui for icons)
- Fetch latest alpha versions from npm registry for all hua-labs packages
- Add PHOSPHOR_ICONS_VERSION constant (^2.1.10)

This ensures all peer dependencies are satisfied and UI components work out of the box.
