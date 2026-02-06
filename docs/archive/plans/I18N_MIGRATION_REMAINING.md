# i18n Migration Remaining Files

## Summary
Total files with `isKo` pattern: **53 files**

---

## Hooks (13 files) - IN PROGRESS
- [x] `hooks/page.tsx` - 훅 인덱스 페이지
- [x] `hooks/use-motion/page.tsx`
- [x] `hooks/use-slide-up/page.tsx`
- [x] `hooks/use-bounce-in/page.tsx`
- [x] `hooks/use-fade-in/page.tsx`
- [x] `hooks/use-gesture/page.tsx` - 마이그레이션 완료
- [x] `hooks/use-scroll-reveal/page.tsx` - 마이그레이션 완료
- [ ] `hooks/use-window-size/page.tsx`
- [ ] `hooks/use-reduced-motion/page.tsx`
- [ ] `hooks/use-scale-in/page.tsx`
- [ ] `hooks/use-scroll-progress/page.tsx`
- [ ] `hooks/use-mouse/page.tsx`
- [ ] `hooks/use-in-view/page.tsx`

---

## Components (26 files) - PENDING
- [ ] `components/page.tsx` - 컴포넌트 인덱스
- [ ] `components/accordion/page.tsx`
- [ ] `components/bottom-sheet/page.tsx`
- [ ] `components/breadcrumb/page.tsx`
- [ ] `components/card/page.tsx`
- [ ] `components/carousel/page.tsx`
- [ ] `components/code-block/page.tsx`
- [ ] `components/command/page.tsx`
- [ ] `components/confirm-modal/page.tsx`
- [ ] `components/container/page.tsx`
- [ ] `components/context-menu/page.tsx`
- [ ] `components/date-picker/page.tsx`
- [ ] `components/divider/page.tsx`
- [ ] `components/drawer/page.tsx`
- [ ] `components/dropdown/page.tsx`
- [ ] `components/form/page.tsx`
- [ ] `components/glow-card/page.tsx`
- [ ] `components/grid/page.tsx`
- [ ] `components/kanban-board/page.tsx`
- [ ] `components/label/page.tsx`
- [ ] `components/language-toggle/page.tsx`
- [ ] `components/loading-spinner/page.tsx`
- [ ] `components/marquee/page.tsx`
- [ ] `components/popover/page.tsx`
- [ ] `components/progress/page.tsx`
- [ ] `components/skeleton/page.tsx`
- [ ] `components/stack/page.tsx`
- [ ] `components/tooltip/page.tsx`
- [ ] `components/video-background/page.tsx`

---

## Guides (8 files) - PENDING
- [ ] `guides/page.tsx` - 가이드 인덱스
- [ ] `guides/animation/page.tsx`
- [ ] `guides/component-patterns/page.tsx`
- [ ] `guides/configuration/page.tsx`
- [ ] `guides/i18n/page.tsx`
- [ ] `guides/performance/page.tsx`
- [ ] `guides/project-structure/page.tsx`
- [ ] `guides/testing/page.tsx`
- [ ] `guides/theming/page.tsx`

---

## Other Pages (6 files) - PENDING
- [ ] `docs/page.tsx` - 문서 메인 페이지
- [ ] `getting-started/page.tsx`

---

## Completed (Previous Session)
- [x] Pro hooks (7 files): useAutoMotion, useOrchestration, useAutoPlay, useLayoutMotion, useKeyboardToggle, useScrollDirection, usePerformanceMonitor
- [x] Core hooks (6 files): useGradient, useHoverMotion, usePulse, useRepeat, useScrollToggle, useSlide

---

## Pattern to Replace
```tsx
// Before
const { t, currentLanguage } = useTranslation();
const isKo = currentLanguage === "ko";
{isKo ? "한글" : "English"}

// After
const { t } = useTranslation();
{t("namespace:key")}
```
