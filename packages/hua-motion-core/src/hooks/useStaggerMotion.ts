import { useRef, useState, useEffect, useCallback, useMemo, createRef, RefObject } from 'react'
import { BaseMotionOptions, MotionElement } from '../types'

export type StaggerMotionType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn'

export interface StaggerMotionOptions extends Omit<BaseMotionOptions, 'delay'> {
  /**
   * Number of items to animate
   */
  count: number

  /**
   * Motion type
   * @default 'fadeIn'
   */
  type?: StaggerMotionType

  /**
   * Delay between each item (ms)
   * @default 100
   */
  staggerDelay?: number

  /**
   * Initial delay before animation starts (ms)
   * @default 0
   */
  initialDelay?: number

  /**
   * Distance for slide animations (px)
   * @default 20
   */
  slideDistance?: number

  /**
   * Initial scale for scaleIn animation
   * @default 0.9
   */
  initialScale?: number
}

export interface StaggerMotionReturn<T extends MotionElement> {
  /**
   * Array of refs to attach to each item
   */
  refs: RefObject<T | null>[]

  /**
   * Array of styles for each item
   */
  styles: React.CSSProperties[]

  /**
   * Whether all items are visible
   */
  isVisible: boolean

  /**
   * Whether animation is in progress
   */
  isAnimating: boolean

  /**
   * Start all animations
   */
  start: () => void

  /**
   * Reset all animations
   */
  reset: () => void
}

/**
 * useStaggerMotion - Animate multiple items with staggered timing
 *
 * @example
 * ```tsx
 * const items = ['Item 1', 'Item 2', 'Item 3'];
 * const stagger = useStaggerMotion({ count: items.length, type: 'fadeIn', staggerDelay: 100 });
 *
 * return (
 *   <div>
 *     {items.map((item, index) => (
 *       <div key={index} ref={stagger.refs[index]} style={stagger.styles[index]}>
 *         {item}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useStaggerMotion<T extends MotionElement = HTMLDivElement>(
  options: StaggerMotionOptions
): StaggerMotionReturn<T> {
  const {
    count,
    type = 'fadeIn',
    duration = 500,
    staggerDelay = 100,
    initialDelay = 0,
    easing = 'ease-out',
    slideDistance = 20,
    initialScale = 0.9,
    threshold = 0.1,
    triggerOnce = true,
    autoStart = true,
    onComplete,
    onStart
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Create refs array
  const refs = useMemo(() => {
    return Array.from({ length: count }, () => createRef<T>())
  }, [count])

  // Start animation
  const start = useCallback(() => {
    if (isAnimating || isVisible) return

    setIsAnimating(true)
    onStart?.()

    setTimeout(() => {
      setIsVisible(true)

      // Complete after all animations finish
      const totalDuration = initialDelay + (count - 1) * staggerDelay + duration
      setTimeout(() => {
        setIsAnimating(false)
        onComplete?.()
      }, totalDuration - initialDelay)
    }, initialDelay)
  }, [isAnimating, isVisible, count, staggerDelay, duration, initialDelay, onStart, onComplete])

  // Reset animation
  const reset = useCallback(() => {
    setIsVisible(false)
    setIsAnimating(false)
  }, [])

  // Intersection Observer for auto-start
  useEffect(() => {
    if (!autoStart || count === 0) return

    // Use first ref as trigger
    const firstRef = refs[0]?.current
    if (!firstRef) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start()
            if (triggerOnce) {
              observerRef.current?.disconnect()
            }
          }
        })
      },
      { threshold }
    )

    observerRef.current.observe(firstRef)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [autoStart, threshold, triggerOnce, start, refs, count])

  // Generate styles based on motion type
  const styles = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const delay = initialDelay + index * staggerDelay

      const baseStyle: React.CSSProperties = {
        transition: `all ${duration}ms ${easing} ${delay}ms`,
      }

      // Initial state (before animation)
      const initialState: Record<StaggerMotionType, React.CSSProperties> = {
        fadeIn: { opacity: 0 },
        slideUp: { opacity: 0, transform: `translateY(${slideDistance}px)` },
        slideLeft: { opacity: 0, transform: `translateX(${slideDistance}px)` },
        slideRight: { opacity: 0, transform: `translateX(-${slideDistance}px)` },
        scaleIn: { opacity: 0, transform: `scale(${initialScale})` },
      }

      // Final state (after animation)
      const finalState: Record<StaggerMotionType, React.CSSProperties> = {
        fadeIn: { opacity: 1 },
        slideUp: { opacity: 1, transform: 'translateY(0)' },
        slideLeft: { opacity: 1, transform: 'translateX(0)' },
        slideRight: { opacity: 1, transform: 'translateX(0)' },
        scaleIn: { opacity: 1, transform: 'scale(1)' },
      }

      return {
        ...baseStyle,
        ...(isVisible ? finalState[type] : initialState[type]),
      }
    })
  }, [count, isVisible, type, duration, easing, staggerDelay, initialDelay, slideDistance, initialScale])

  return {
    refs,
    styles,
    isVisible,
    isAnimating,
    start,
    reset,
  }
}
