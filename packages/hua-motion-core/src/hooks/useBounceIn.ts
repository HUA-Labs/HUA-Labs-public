import { useRef, useState, useEffect, useCallback } from 'react'
import { BounceOptions, BaseMotionReturn, MotionElement } from '../types'

export function useBounceIn<T extends MotionElement = HTMLDivElement>(
  options: BounceOptions = {}
): BaseMotionReturn<T> {
  const {
    delay = 0,
    duration = 700,
    threshold = 0.1,
    triggerOnce = true,
    easing = 'ease-out',
    autoStart = true,
    bounceHeight = 20,
    bounceCount = 3,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
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
    }
  }, [])

  // 바운스 애니메이션 스타일 계산
  const getBounceStyle = (): React.CSSProperties => {
    if (!isVisible) {
      return {
        transform: `translateY(${bounceHeight}px)`,
        opacity: 0,
        transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
        willChange: 'transform, opacity'
      }
    }

    // 바운스 효과를 위한 CSS 애니메이션
    const bounceKeyframes = `
      @keyframes bounceIn {
        0% {
          transform: translateY(${bounceHeight}px);
          opacity: 0;
        }
        60% {
          transform: translateY(-${bounceHeight / 2}px);
          opacity: 1;
        }
        80% {
          transform: translateY(${bounceHeight / 4}px);
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `

    return {
      animation: `bounceIn ${duration}ms ${easing}`,
      willChange: 'transform, opacity'
    }
  }

  const style = getBounceStyle()

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
