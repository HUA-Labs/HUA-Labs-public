import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface ScrollProgressOptions extends BaseMotionOptions {
  progressScale?: number
  progressOpacity?: number
  progressRotate?: number
  progressTranslateY?: number
  progressTranslateX?: number
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
  scrollThreshold?: number
  progressDirection?: 'horizontal' | 'vertical' | 'both'
}

export function useScrollProgress<T extends MotionElement = HTMLDivElement>(
  options: ScrollProgressOptions = {}
): BaseMotionReturn<T> & {
  scrollProgress: number
  scrollDirection: 'up' | 'down' | null
  scrollVelocity: number
} {
  const {
    duration = 300,
    easing = 'ease-out',
    progressScale = 1,
    progressOpacity,
    progressRotate,
    progressTranslateY,
    progressTranslateX,
    initialScale = 0.8,
    initialOpacity = 0.5,
    initialRotate = 0,
    initialTranslateY = 0,
    initialTranslateX = 0,
    scrollThreshold = 0.1,
    progressDirection = 'both',
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(Date.now())

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (!ref.current) return

    const currentScrollY = window.scrollY
    const currentTime = Date.now()
    const rect = ref.current.getBoundingClientRect()
    const threshold = window.innerHeight * scrollThreshold

    // 스크롤 진행률 계산 (0-1)
    const elementTop = rect.top + currentScrollY
    const elementHeight = rect.height
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    
    let newScrollProgress = 0

    if (progressDirection === 'vertical' || progressDirection === 'both') {
      // 세로 스크롤 진행률
      const scrollRange = documentHeight - viewportHeight
      newScrollProgress = Math.max(0, Math.min(1, currentScrollY / scrollRange))
    } else if (progressDirection === 'horizontal') {
      // 가로 스크롤 진행률 (요소가 뷰포트에 들어올 때)
      const elementProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + elementHeight)))
      newScrollProgress = elementProgress
    }

    setScrollProgress(newScrollProgress)

    // 스크롤 방향과 속도 계산
    const isScrollingDown = currentScrollY > lastScrollY
    const isScrollingUp = currentScrollY < lastScrollY
    const timeDiff = currentTime - lastScrollTime
    const scrollDiff = Math.abs(currentScrollY - lastScrollY)
    const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0

    if (isScrollingDown) {
      setScrollDirection('down')
    } else if (isScrollingUp) {
      setScrollDirection('up')
    }

    setScrollVelocity(velocity)

    // 요소가 뷰포트에 보이는지 확인
    const shouldBeVisible = rect.top <= threshold

    if (shouldBeVisible && !isVisible) {
      setIsVisible(true)
      setIsAnimating(true)
      setProgress(0)
      onStart?.()

      setTimeout(() => {
        setIsAnimating(false)
        setProgress(1)
        onComplete?.()
      }, duration)
    }

    setLastScrollY(currentScrollY)
    setLastScrollTime(currentTime)
  }, [isVisible, lastScrollY, lastScrollTime, progressDirection, scrollThreshold, duration, onStart, onComplete])

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 상태 확인

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // 모션 시작 함수
  const start = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true)
      setIsAnimating(true)
      setProgress(0)
      onStart?.()

      setTimeout(() => {
        setIsAnimating(false)
        setProgress(1)
        onComplete?.()
      }, duration)
    }
  }, [isVisible, duration, onStart, onComplete])

  // 모션 중단 함수
  const stop = useCallback(() => {
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsVisible(false)
    setIsAnimating(false)
    setProgress(0)
    setScrollProgress(0)
    onReset?.()
  }, [onReset])

  // 모션 일시정지 함수
  const pause = useCallback(() => {
    setIsAnimating(false)
  }, [])

  // 모션 재개 함수
  const resume = useCallback(() => {
    if (isVisible) {
      setIsAnimating(true)
    }
  }, [isVisible])

  // 스타일 계산 (스크롤 진행률에 따라)
  const style: React.CSSProperties = {
    transform: `
      scale(${initialScale + (progressScale - initialScale) * scrollProgress})
      rotate(${initialRotate + (progressRotate || 0 - initialRotate) * scrollProgress}deg)
      translate(${initialTranslateX + (progressTranslateX || 0 - initialTranslateX) * scrollProgress}px, ${initialTranslateY + (progressTranslateY || 0 - initialTranslateY) * scrollProgress}px)
    `,
    opacity: initialOpacity + (progressOpacity || 1 - initialOpacity) * scrollProgress,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity'
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
    resume,
    scrollProgress,
    scrollDirection,
    scrollVelocity
  }
}
