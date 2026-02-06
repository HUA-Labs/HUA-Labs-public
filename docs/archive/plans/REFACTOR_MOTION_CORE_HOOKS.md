# Motion Core Hooks 리팩토링 작업지침서

**작성일:** 2026-01-15
**상태:** 진행 예정
**우선순위:** 높음

---

## 현재 상황 분석

### 문제점

motion-core 훅들의 일관성이 없음. 같은 기능(슬라이드)인데 구현 방식이 완전히 다름.

### Slide 시리즈 비교

| 훅 | IntersectionObserver | 콜백 지원 | threshold/triggerOnce | 애니메이션 방식 |
|-----|---------------------|-----------|----------------------|----------------|
| useSlideUp | ✅ | ✅ | ✅ | CSS transition |
| useSlideDown | ✅ | ✅ | ✅ | requestAnimationFrame (과잉) |
| useSlideLeft | ❌ | ❌ | ❌ | setTimeout (너무 단순) |
| useSlideRight | ? | ? | ? | 확인 필요 |

### 핵심 발견

**useSlideUp이 이미 `direction` prop으로 4방향 지원함:**
```tsx
direction?: 'up' | 'down' | 'left' | 'right'
```

즉, useSlideDown/Left/Right가 사실상 불필요하거나 wrapper여야 함.

---

## 리팩토링 계획

### 1단계: useSlide 시리즈 통일

**목표:** useSlideUp 패턴을 기준으로 통일

**방법 A: Wrapper 패턴 (권장 - 비파괴적)**
```tsx
// useSlideDown.ts
export function useSlideDown<T extends MotionElement = HTMLDivElement>(
  options: Omit<SlideOptions, 'direction'> = {}
): BaseMotionReturn<T> {
  return useSlideUp({ ...options, direction: 'down' })
}

// useSlideLeft.ts
export function useSlideLeft<T extends MotionElement = HTMLDivElement>(
  options: Omit<SlideOptions, 'direction'> = {}
): BaseMotionReturn<T> {
  return useSlideUp({ ...options, direction: 'left' })
}

// useSlideRight.ts
export function useSlideRight<T extends MotionElement = HTMLDivElement>(
  options: Omit<SlideOptions, 'direction'> = {}
): BaseMotionReturn<T> {
  return useSlideUp({ ...options, direction: 'right' })
}
```

**방법 B: Deprecated 처리**
- useSlideDown/Left/Right를 deprecated 표시
- useSlideUp + direction 사용 권장
- 1-2 버전 후 제거

### 2단계: 기준 패턴 정의

**Entrance Animation Hook 표준 인터페이스:**
```tsx
interface EntranceAnimationOptions {
  // 타이밍
  duration?: number      // 기본 700ms
  delay?: number         // 기본 0ms
  easing?: string        // 기본 'ease-out'

  // IntersectionObserver
  threshold?: number     // 기본 0.1
  triggerOnce?: boolean  // 기본 true
  autoStart?: boolean    // 기본 true

  // 콜백
  onStart?: () => void
  onComplete?: () => void
  onStop?: () => void
  onReset?: () => void
}

interface EntranceAnimationReturn<T> {
  ref: RefObject<T>
  style: CSSProperties
  isVisible: boolean
  isAnimating: boolean
  progress: number
  start: () => void
  stop: () => void
  reset: () => void
}
```

### 3단계: 적용 대상 훅 목록

**Entrance Animation 패턴 적용:**
- [x] useFadeIn
- [x] useSlideUp
- [ ] useSlideDown → wrapper로 변경
- [ ] useSlideLeft → wrapper로 변경
- [ ] useSlideRight → wrapper로 변경
- [x] useBounceIn
- [x] useScaleIn

**확인 필요:**
- [ ] useScrollReveal - 패턴 확인
- [ ] usePulse - 반복 애니메이션이라 다를 수 있음
- [ ] useSpringMotion - 물리 기반이라 다를 수 있음

### 4단계: startRef 패턴 적용

Graphite 리뷰에서 지적된 IntersectionObserver 의존성 문제 해결:

```tsx
// 잘못된 패턴 (Observer가 불필요하게 재생성됨)
useEffect(() => {
  // ...
  start()
  // ...
}, [autoStart, threshold, triggerOnce, start]) // start가 의존성에 있음

// 올바른 패턴 (startRef 사용)
const startRef = useRef<() => void>(() => {})
startRef.current = start

useEffect(() => {
  // ...
  startRef.current()
  // ...
}, [autoStart, threshold, triggerOnce]) // start 제거됨
```

**적용 대상:**
- [x] useScaleIn (완료)
- [ ] useSlideUp
- [ ] useBounceIn
- [ ] useFadeIn
- [ ] 기타 IntersectionObserver 사용 훅들

---

## 파일별 작업 내역

### packages/hua-motion-core/src/hooks/

| 파일 | 현재 상태 | 작업 내용 | 우선순위 |
|------|----------|----------|---------|
| useSlideUp.ts | 좋음 | startRef 패턴 적용 | 높음 |
| useSlideDown.ts | 과잉 설계 | wrapper로 교체 | 높음 |
| useSlideLeft.ts | 불완전 | wrapper로 교체 | 높음 |
| useSlideRight.ts | 확인 필요 | wrapper로 교체 | 높음 |
| useFadeIn.ts | 좋음 | startRef 패턴 적용 | 중간 |
| useBounceIn.ts | 좋음 | startRef 패턴 확인 | 중간 |
| useScaleIn.ts | 완료 | startRef 패턴 적용됨 | 완료 |

---

## 문서화 작업 (리팩토링 후)

### 훅 문서 페이지 작성 순서

**1차 (리팩토링 후 즉시):**
- useSlideDown, useSlideLeft, useSlideRight (통일된 API로)

**2차:**
- useScrollReveal
- usePulse
- useSpringMotion

**3차 (Interaction):**
- useHoverMotion
- useClickToggle
- useFocusToggle
- useVisibilityToggle

**4차 (Utility):**
- useGradient
- useRepeat
- useToggleMotion
- useMotionState

**5차 (내부용 - 필요시):**
- useButtonEffect
- useCardList
- useLoadingSpinner
- useSkeleton

---

## Badge 규칙

| 패키지 | Badge 표시 |
|--------|-----------|
| @hua-labs/motion-core | `@hua-labs/motion-core` |
| @hua-labs/motion-advanced | `@hua-labs/motion-advanced` |
| @hua-labs/motion | ❌ deprecated, 사용하지 않음 |

---

## 체크리스트

### 리팩토링 전
- [ ] useSlideRight.ts 내용 확인
- [ ] 다른 훅들 IntersectionObserver 사용 여부 확인
- [ ] 기존 사용처 영향도 파악

### 리팩토링 중
- [ ] useSlideDown → wrapper 변환
- [ ] useSlideLeft → wrapper 변환
- [ ] useSlideRight → wrapper 변환
- [ ] startRef 패턴 전체 적용
- [ ] 테스트

### 리팩토링 후
- [ ] 문서 페이지 작성
- [ ] PR 생성 및 리뷰

---

## 참고 코드

### useSlideUp의 direction 처리 (현재 구현)
```tsx
// packages/hua-motion-core/src/hooks/useSlideUp.ts:29-43
const getInitialTransform = useCallback(() => {
  switch (direction) {
    case 'up':
      return `translateY(${distance}px)`
    case 'down':
      return `translateY(-${distance}px)`
    case 'left':
      return `translateX(${distance}px)`
    case 'right':
      return `translateX(-${distance}px)`
    default:
      return `translateY(${distance}px)`
  }
}, [direction, distance])
```

### SlideOptions 타입 (types.ts에서)
```tsx
export interface SlideOptions extends BaseMotionOptions {
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}
```

---

## 관련 PR

- #238: motion-core hook abstraction (useScaleIn startRef 적용)
- #249: motion hooks badge 수정

---

**작성자:** Claude Opus 4.5
**다음 작업자 참고:** 이 문서를 기반으로 리팩토링 진행. 질문 있으면 코드 직접 확인.
