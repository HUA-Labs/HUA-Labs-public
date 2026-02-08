---
"create-hua-ux": patch
---

fix: resolve React Context duplication causing i18n translation failures

Removed direct `@hua-labs/i18n-core`, `i18n-core-zustand`, `motion-core`, `state` from generated `package.json`. These caused npm to install separate module copies, creating multiple React Context instances that prevented `useTranslation()` from finding the i18n provider. Now only `@hua-labs/hua-ux` is listed as the single HUA dependency, with all sub-packages provided transitively.
