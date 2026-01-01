---
"create-hua-ux": patch
---

fix: (create-hua-ux) Fetch latest alpha versions from npm registry at project creation time instead of using hardcoded version assumptions. This fixes installation failures when @hua-labs packages have different version numbers (e.g., @hua-labs/i18n-core-zustand@1.1.0-alpha.1 vs @hua-labs/hua-ux@0.1.0-alpha.1).
