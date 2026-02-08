---
"create-hua-ux": patch
---

fix: resolve blank page, broken i18n, and Tailwind v4 in generated projects

- Remove broken useMotion wrapper from page.tsx and LanguageToggle (opacity:0 fix)
- Pass hua-ux.config to HuaUxLayout in layout.tsx (enables i18n provider)
- Add @source directives to globals.css for Tailwind v4 node_modules scanning
- Replace placeholder logo with real HUA Labs logo
- Use t() translation keys instead of ternary language branching
- Simplify layout.tsx (remove unused headers() import)
- Clean up page.tsx with Next.js-inspired design
