# @hua-labs/motion-core

**30+ battle-tested animation hooks. 60fps, zero dependencies, SSR-ready**
**전투 테스트 완료 애니메이션 훅 30개 이상. 60fps, 의존성 없음, SSR 지원**

[![npm version](https://img.shields.io/npm/v/@hua-labs/motion-core.svg)](https://www.npmjs.com/package/@hua-labs/motion-core)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/motion-core.svg)](https://www.npmjs.com/package/@hua-labs/motion-core)
[![npm provenance](https://img.shields.io/badge/provenance-attestation-blue)](https://docs.npmjs.com/generating-provenance-statements)
[![license](https://img.shields.io/npm/l/@hua-labs/motion-core.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.
> **⚠️ 알파 릴리즈**: 현재 알파 단계입니다. 안정 릴리즈 전에 API가 변경될 수 있습니다.

---

**By HUA Labs** | [GitHub](https://github.com/HUA-Labs) | [Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues)

---

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

- **[@hua-labs/motion-advanced](../../hua-motion-advanced)** - Advanced motion hooks and orchestration
- **[@hua-labs/motion](../../hua-motion)** - Unified package (Core + Advanced re-export)

## Roadmap

- **Motion Core** - Essential hooks ✅ (Current)
- **Motion Advanced** - Complex animations ✅ (Available)
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

### 개요

React를 위한 프로덕션 준비 완료 모션 훅 30개 이상의 컬렉션입니다. 외부 의존성 없이 부드러운 60fps 애니메이션을 제공하는 ref 기반 엔진으로 구축되었습니다. 모든 훅은 TypeScript 네이티브이며 SSR과 호환됩니다.

### 주요 기능

- **30개 이상의 최적화된 훅** - 페이드, 슬라이드, 스케일, 스크롤, 패럴랙스, 제스처 애니메이션
- **성능 우선** - 일관된 60fps를 위한 직접 ref 조작
- **의존성 없음** - 순수 JavaScript 모션 엔진 (~15KB gzipped)
- **TypeScript 네이티브** - 타입 추론이 포함된 완전한 타입 안전성
- **SSR 호환** - Next.js, Remix 및 모든 SSR 프레임워크와 작동
- **검증 완료** - 517개 테스트 케이스로 74% 이상 커버리지

### 설치

```bash
npm install @hua-labs/motion-core
```

### 문서

- [상세 가이드](./DETAILED_GUIDE.md) - 완전한 API 레퍼런스 및 고급 사용법

---

## License | 라이선스

MIT © 2025-present HUA Labs