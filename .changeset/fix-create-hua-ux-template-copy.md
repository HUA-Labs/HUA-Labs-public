---
"create-hua-ux": patch
---

fix(create-hua-ux): Fix template copy failure when CLI is installed from npm. The filter function was checking if source path contains 'node_modules', which caused all files to be skipped when the template itself is located inside node_modules (npm installation). Changed to use relative paths for filtering.
