---
"@hua-labs/i18n-core-zustand": patch
---

fix(i18n-core-zustand): Update zustand peer dependency to support v5

Changed zustand peer dependency from `^4.0.0` to `^4.0.0 || ^5.0.0` to support both v4 and v5. This fixes peer dependency warnings when using with zustand 5.x.
