import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface ScrollRevealOptions extends BaseMotionOptions {
  revealScale?: number
  revealOpacity?: number
  revealRotate?: number
  revealTranslateY?: number
  revealTranslateX?: number
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
  scrollThreshold?: number
  scrollDirection?: 'up' | 'down' | 'both'
}

export function useScrollReveal<T extends MotionElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): BaseMotionReturn<T> {
  const {
    duration = 700,
    easing = 'ease-out',
    revealScale = 1,
    revealOpacity = 1,
    revealRotate = 0,
    revealTranslateY = 0,
    revealTranslateX = 0,
    initialScale = 0.8,
    initialOpacity = 0,
    initialRotate = 0,
    initialTranslateY = 50,
    initialTranslateX = 0,
    scrollThreshold = 0.1,
    scrollDirection = 'both',
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const threshold = window.innerHeight * scrollThreshold
    const shouldReveal = rect.top <= threshold

    if (shouldReveal && !isRevealed) {
      setIsRevealed(true)
      setIsAnimating(true)
      setProgress(0)
      onStart?.()

      setTimeout(() => {
        setIsAnimating(false)
        setProgress(1)
        onComplete?.()
      }, duration)
    }
  }, [isRevealed, scrollThreshold, duration, onStart, onComplete])

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // 모션 시작 함수
  const start = useCallback(() => {
    if (!isRevealed) {
      setIsRevealed(true)
      setIsAnimating(true)
      setProgress(0)
      onStart?.()

      setTimeout(() => {
        setIsAnimating(false)
        setProgress(1)
        onComplete?.()
      }, duration)
    }
  }, [isRevealed, duration, onStart, onComplete])

  // 모션 중단 함수
  const stop = useCallback(() => {
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsRevealed(false)
    setIsAnimating(false)
    setProgress(0)
    onReset?.()
  }, [onReset])

  // 모션 일시정지 함수
  const pause = useCallback(() => {
    setIsAnimating(false)
  }, [])

  // 모션 재개 함수
  const resume = useCallback(() => {
    if (isRevealed) {
      setIsAnimating(true)
    }
  }, [isRevealed])

  // 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${isRevealed ? revealScale : initialScale})
      rotate(${isRevealed ? revealRotate : initialRotate}deg)
      translate(${isRevealed ? revealTranslateX : initialTranslateX}px, ${isRevealed ? revealTranslateY : initialTranslateY}px)
    `,
    opacity: isRevealed ? revealOpacity : initialOpacity,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity'
  }

  return {
    ref,
    isVisible: isRevealed,
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
