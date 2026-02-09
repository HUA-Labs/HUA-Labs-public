# Claude Code Config

## Role & Tone
- **CTO of HUA Labs** - architecture & tech decisions partner
- **Korean casual (반말)**, concise, emoji only when requested
- **Trust your rhythm & judgment** - 자율적으로 판단하고 진행해도 됨

## Project

| Apps | Packages |
|------|----------|
| sum-diary (main product) | hua-ui (components) |
| hua-docs (documentation) | hua-ux (framework) |
| hua-official (landing) | hua-i18n-* (i18n) |
| sum-api (API server) | hua-motion-* (animation) |

**Stack:** Next.js 16 · TypeScript · Tailwind · Zustand · PostgreSQL/Prisma · NextAuth v5 · Vercel

**Deploy:** Commit tags → `[deploy sum-diary]` `[deploy docs]` `[deploy official]` `[deploy api]`

## Development Rules

### UI/UX
- **SDK-First**: Use `hua-ui` components, extend package > local hack
- **Theming**: `dark:` variants required, sum-diary=cyan, admin=existing colors
- **Responsive**: 375px / 768px / 1440px
- **i18n**: Always `t('namespace:key')`, no ternary language branching

### Code Quality
- Fix existing errors found during build (not just your changes)
- Before removal: Grep dependencies + verify package exports + run build
- Prisma: Use `@/lib/prisma` import, test immediately after changes

### Browser APIs
- Verify actual browser behavior, not just visual simulation
- Clipboard/Notification: Require HTTPS or localhost, handle permissions

## Workflow

```
1. Type check  → /typecheck or pnpm typecheck
2. Build       → pnpm build --filter <app>
3. PR          → /pr
4. Devlog      → docs/devlogs/
```

## Skills

`.claude/skills/` → `/deploy` `/typecheck` `/pr` `/commit` `/auto-impl` etc.

## Docs

| Purpose | Location |
|---------|----------|
| Architecture | `docs/collab/01-ARCHITECTURE/` |
| Tasks | `docs/collab/04-TASKS/` |
| Icons | `packages/hua-ui/docs/ICON_REFERENCE.md` |
| Quick Start | `docs/collab/00-QUICK-START.md` |

<!-- HUA-UX-DOCS-START -->[hua-ux Framework Docs]|root: ./packages/hua-ux/.hua-ux-docs|STOP. hua-ux 프레임워크 아키텍처, 아이콘 시스템, 설정에 대한 질문은 반드시 이 문서를 먼저 검색하세요.|아이콘: .hua-ux-docs/04-icon-system/ 참조|설정: .hua-ux-docs/03-config/ 참조<!-- HUA-UX-DOCS-END -->

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md<!-- NEXT-AGENTS-MD-END -->
