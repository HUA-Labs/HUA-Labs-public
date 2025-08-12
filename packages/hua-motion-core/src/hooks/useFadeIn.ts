import { useRef, useState, useEffect, useCallback } from 'react'
import { FadeInOptions, BaseMotionReturn, MotionElement } from '../types'

/**
 * 요소가 화면에 나타날 때 페이드인 효과를 적용합니다
 * 
 * @example
 * ```tsx
 * const { ref, style } = useFadeIn({
 *   delay: 200,        // 지연 시간
 *   duration: 700,     // 지속 시간
 *   triggerOnce: true  // 한 번만 실행
 * })
 * 
 * return <div ref={ref} style={style}>페이드인 효과</div>
 * ```
 */
export function useFadeIn<T extends MotionElement = HTMLDivElement>(
  options: FadeInOptions = {}
): BaseMotionReturn<T> {
  const {
    delay = 0,
    duration = 700,
    threshold = 0.1,
    triggerOnce = true,
    easing = 'ease-out',
    autoStart = true,
    initialOpacity = 0,
    targetOpacity = 1,
    onComplete,
    onStart,
    onStop,
    onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const motionRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  // 모션 시작 함수
  const start = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    // 지연 시간 적용
    if (delay > 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
        setProgress(1)
        setIsAnimating(false)
        onComplete?.()
      }, delay)
    } else {
      setIsVisible(true)
      setProgress(1)
      setIsAnimating(false)
      onComplete?.()
    }
  }, [delay, isAnimating, onStart, onComplete])

  // 모션 중단 함수
  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (motionRef.current) {
      cancelAnimationFrame(motionRef.current)
      motionRef.current = null
    }
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    stop()
    setIsVisible(false)
    setProgress(0)
    onReset?.()
  }, [stop, onReset])

  // 모션 일시정지 함수
  const pause = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsAnimating(false)
  }, [])

  // 모션 재개 함수
  const resume = useCallback(() => {
    if (!isVisible && !isAnimating) {
      start()
    }
  }, [isVisible, isAnimating, start])

  // Intersection Observer 설정
  useEffect(() => {
    if (!ref.current || !autoStart) return

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

    observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [autoStart, threshold, triggerOnce, start])

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (motionRef.current) {
        cancelAnimationFrame(motionRef.current)
      }
    }
  }, [])

  // 스타일 계산
  const style: React.CSSProperties = {
    opacity: isVisible ? targetOpacity : initialOpacity,
    transition: `opacity ${duration}ms ${easing}`,
    willChange: 'opacity'
  }

  return {
    ref,
    isVisible,
    isAnimating,
    style,
    progress,
    start,
    stop,
    reset,
    pause,
    resume
  }
}
