import { useRef, useState, useCallback, useEffect } from 'react'
import { BaseMotionOptions, InteractionReturn, MotionElement } from '../types'

export interface HoverMotionOptions extends BaseMotionOptions {
  hoverScale?: number
  hoverOpacity?: number
  hoverRotate?: number
  hoverTranslateY?: number
  hoverTranslateX?: number
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
}

export function useHoverMotion<T extends MotionElement = HTMLDivElement>(
  options: HoverMotionOptions = {}
): InteractionReturn<T> {
  const {
    duration = 300,
    easing = 'ease-out',
    hoverScale = 1.05,
    hoverOpacity = 1,
    hoverRotate = 0,
    hoverTranslateY = 0,
    hoverTranslateX = 0,
    initialScale = 1,
    initialOpacity = 1,
    initialRotate = 0,
    initialTranslateY = 0,
    initialTranslateX = 0,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  // 호버 시작
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    // 애니메이션 완료 시
    setTimeout(() => {
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, duration)
  }, [duration, onStart, onComplete])

  // 호버 종료
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setIsAnimating(true)
    setProgress(1)

    // 애니메이션 완료 시
    setTimeout(() => {
      setIsAnimating(false)
      setProgress(0)
    }, duration)
  }, [duration])

  // 모션 시작 함수 (프로그래매틱 제어용)
  const start = useCallback(() => {
    handleMouseEnter()
  }, [handleMouseEnter])

  // 모션 중단 함수
  const stop = useCallback(() => {
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsHovered(false)
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
    if (isHovered) {
      setIsAnimating(true)
    }
  }, [isHovered])

  // 이벤트 리스너 설정
  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseEnter, handleMouseLeave])

  // 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${isHovered ? hoverScale : initialScale})
      rotate(${isHovered ? hoverRotate : initialRotate}deg)
      translate(${isHovered ? hoverTranslateX : initialTranslateX}px, ${isHovered ? hoverTranslateY : initialTranslateY}px)
    `,
    opacity: isHovered ? hoverOpacity : initialOpacity,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity'
  }

  return {
    ref,
    isVisible: isHovered,
    isAnimating,
    style,
    progress,
    start,
    stop,
    reset,
    pause,
    resume,
    // 새로운 직관적 API 추가
    hover: handleMouseEnter,
    leave: handleMouseLeave,
    // 상태 속성 추가
    isHovered
  }
}
