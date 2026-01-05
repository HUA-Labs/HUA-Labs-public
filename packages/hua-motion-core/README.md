# @hua-labs/motion-core

30+ production-tested React animation hooks. Zero dependencies, SSR-ready.
?꾨줈?뺤뀡 寃利??꾨즺 React ?좊땲硫붿씠????30媛??댁긽. ?섏〈???놁쓬, SSR 吏??

[![npm version](https://img.shields.io/npm/v/@hua-labs/motion-core.svg)](https://www.npmjs.com/package/@hua-labs/motion-core)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/motion-core.svg)](https://www.npmjs.com/package/@hua-labs/motion-core)
[![license](https://img.shields.io/npm/l/@hua-labs/motion-core.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **?좑툘 Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [?쒓뎅??(#korean)

## English

### Overview

A production-ready collection of 30+ motion hooks optimized for React. Built on a ref-based engine that delivers smooth 60fps animations with zero external dependencies. Every hook is TypeScript-native and SSR-compatible.

### Why motion-core?

motion-core provides essential animation primitives for React applications through direct DOM manipulation. The ref-based approach offers predictable performance characteristics while maintaining a small bundle footprint.

### Key Features

- **30+ Optimized Hooks** - Fade, slide, scale, scroll, parallax, and gesture animations
- **Performance First** - Direct ref manipulation for consistent 60fps
- **Zero Dependencies** - Pure JavaScript motion engine (~15KB gzipped)
- **TypeScript Native** - Complete type safety with inferred types
- **SSR Compatible** - Works with Next.js, Remix, and all SSR frameworks
- **Battle Tested** - 74%+ coverage with 517 test cases

### Installation

```bash
npm install @hua-labs/motion-core
```

```bash
yarn add @hua-labs/motion-core
```

```bash
pnpm add @hua-labs/motion-core
```

## Quick Start

```tsx
import React from 'react';
import { useFadeIn, useSlideUp } from '@hua-labs/motion-core';

function MyComponent() {
  const fadeIn = useFadeIn({ duration: 800 });
  const slideUp = useSlideUp({ delay: 200 });

  return (
    <div>
      <h1 ref={fadeIn.ref} style={fadeIn.style}>
        Welcome to HUA Motion Core
      </h1>
      <p ref={slideUp.ref} style={slideUp.style}>
        Beautiful animations made simple
      </p>
    </div>
  );
}
```

## Available Hooks

### Basic Motion Hooks (9)
- `useFadeIn` - Fade in animation
- `useSlideUp` - Slide up animation  
- `useSlideLeft` - Slide left animation
- `useSlideRight` - Slide right animation
- `useSlideDown` - Advanced slide down with bounce/overshoot
- `useScaleIn` - Scale in animation
- `useBounceIn` - Bounce in animation
- `usePulse` - Pulse animation
- `useSkeleton` - Skeleton loading animation

### Interaction Hooks (4)
- `useHoverMotion` - Hover-triggered animations
- `useClickToggle` - Click-triggered animations
- `useFocusToggle` - Focus-triggered animations
- `useVisibilityToggle` - Visibility-controlled animations

### Scroll Hooks (3)
- `useScrollReveal` - Scroll-triggered reveal animations
- `useScrollToggle` - Scroll-based toggle animations
- `useScrollProgress` - Scroll progress tracking

### Utility Hooks (2)
- `useMotionState` - Motion state management
- `useRepeat` - Repeating animations

### Advanced Hooks (7)
- `useMotion` - Core motion engine
- `useSpringMotion` - Spring physics animations
- `useGradient` - Gradient animations
- `useNavigation` - Navigation animations
- `useButtonEffect` - Button interaction effects
- `useCardList` - Card list animations
- `useLoadingSpinner` - Loading spinner animations

## API Reference

All hooks return a consistent interface:

```tsx
interface BaseMotionReturn<T = HTMLElement> {
  ref: RefObject<T>;
  style: CSSProperties;
  isVisible: boolean;
  isAnimating: boolean;
  progress: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}
```

### Common Options

```tsx
interface BaseMotionOptions {
  duration?: number;        // Animation duration in ms (default: 1000)
  delay?: number;          // Animation delay in ms (default: 0)
  easing?: string;         // CSS easing function (default: 'ease-out')
  autoStart?: boolean;     // Auto-start animation (default: true)
  onStart?: () => void;    // Start callback
  onComplete?: () => void; // Complete callback
  onStop?: () => void;     // Stop callback
  onReset?: () => void;    // Reset callback
}
```

## Examples

### Fade In Animation

```tsx
import { useFadeIn } from '@hua-labs/motion-core';

function FadeInExample() {
  const { ref, style, start, stop } = useFadeIn({
    duration: 1000,
    autoStart: false
  });

  return (
    <div>
      <div ref={ref} style={style}>
        This will fade in
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Scroll Reveal

```tsx
import { useScrollReveal } from '@hua-labs/motion-core';

function ScrollRevealExample() {
  const { ref, style } = useScrollReveal({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div ref={ref} style={style}>
      This appears when scrolled into view
    </div>
  );
}
```

### Hover Interaction

```tsx
import { useHoverMotion } from '@hua-labs/motion-core';

function HoverExample() {
  const { ref, style, hover, leave } = useHoverMotion({
    scale: 1.1,
    duration: 300
  });

  return (
    <div 
      ref={ref} 
      style={style}
      onMouseEnter={hover}
      onMouseLeave={leave}
    >
      Hover me!
    </div>
  );
}
```

## TypeScript Support

HUA Motion Core is built with TypeScript and provides comprehensive type definitions:

```tsx
import { useFadeIn, BaseMotionReturn, FadeInOptions } from '@hua-labs/motion-core';

// Full type safety
const fadeIn: BaseMotionReturn<HTMLDivElement> = useFadeIn({
  duration: 1000,
  opacity: { from: 0, to: 1 }
} as FadeInOptions);
```

## Related Packages

- ** - Advanced motion hooks and orchestration
- ** - Unified package (Core + Advanced re-export)

## Roadmap

- **Motion Core** - Essential hooks ??(Current)
- **Motion Advanced** - Complex animations ??(Available)
- **Motion Enterprise** - Team solutions (Planned)

### Documentation

- [Detailed Guide](./DETAILED_GUIDE.md) - Complete API reference and advanced usage
- [TypeScript Definitions](./dist/index.d.ts) - Type definitions

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

---

## Korean

### 媛쒖슂

React瑜??꾪븳 ?꾨줈?뺤뀡 以鍮??꾨즺 紐⑥뀡 ??30媛??댁긽??而щ젆?섏엯?덈떎. ?몃? ?섏〈???놁씠 遺?쒕윭??60fps ?좊땲硫붿씠?섏쓣 ?쒓났?섎뒗 ref 湲곕컲 ?붿쭊?쇰줈 援ъ텞?섏뿀?듬땲?? 紐⑤뱺 ?낆? TypeScript ?ㅼ씠?곕툕?대ŉ SSR怨??명솚?⑸땲??

### 二쇱슂 湲곕뒫

- **30媛??댁긽??理쒖쟻?붾맂 ??* - ?섏씠?? ?щ씪?대뱶, ?ㅼ??? ?ㅽ겕濡? ?⑤윺?숈뒪, ?쒖뒪泥??좊땲硫붿씠??
- **?깅뒫 ?곗꽑** - ?쇨???60fps瑜??꾪븳 吏곸젒 ref 議곗옉
- **?섏〈???놁쓬** - ?쒖닔 JavaScript 紐⑥뀡 ?붿쭊 (~15KB gzipped)
- **TypeScript ?ㅼ씠?곕툕** - ???異붾줎???ы븿???꾩쟾??????덉쟾??
- **SSR ?명솚** - Next.js, Remix 諛?紐⑤뱺 SSR ?꾨젅?꾩썙?ъ? ?묐룞
- **寃利??꾨즺** - 517媛??뚯뒪??耳?댁뒪濡?74% ?댁긽 而ㅻ쾭由ъ?

### ?ㅼ튂

```bash
npm install @hua-labs/motion-core
```

### 臾몄꽌

- [?곸꽭 媛?대뱶](./DETAILED_GUIDE.md) - ?꾩쟾??API ?덊띁?곗뒪 諛?怨좉툒 ?ъ슜踰?

---

## License

MIT 짤 HUA Labs
