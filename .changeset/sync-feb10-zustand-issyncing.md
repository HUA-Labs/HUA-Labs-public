---
"@hua-labs/i18n-core-zustand": patch
---

Fix isSyncing guard for async setLanguage calls

The isSyncing flag was cleared synchronously before the async language change completed, potentially allowing re-entrant sync calls. Now uses `.finally()` to properly clear the flag after the async operation.
