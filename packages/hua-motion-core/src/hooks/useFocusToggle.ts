import { useRef, useState, useCallback, useEffect } from 'react'
import { BaseMotionOptions, InteractionReturn, MotionElement } from '../types'

export interface FocusToggleOptions extends BaseMotionOptions {
  focusScale?: number
  focusOpacity?: number
  focusRotate?: number
  focusTranslateY?: number
  focusTranslateX?: number
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
}

export function useFocusToggle<T extends MotionElement = HTMLDivElement>(
  options: FocusToggleOptions = {}
): InteractionReturn<T> {
  const {
    duration = 300,
    easing = 'ease-out',
    focusScale = 1.02,
    focusOpacity = 1,
    focusRotate = 0,
    focusTranslateY = 0,
    focusTranslateX = 0,
    initialScale = 1,
    initialOpacity = 1,
    initialRotate = 0,
    initialTranslateY = 0,
    
    initialTranslateX = 0,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  // 포커스 시작
  const handleFocus = useCallback(() => {
    setIsFocused(true)
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

  // 포커스 종료
  const handleBlur = useCallback(() => {
    setIsFocused(false)
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
    handleFocus()
  }, [handleFocus])

  // 모션 중단 함수
  const stop = useCallback(() => {
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsFocused(false)
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
    if (isFocused) {
      setIsAnimating(true)
    }
  }, [isFocused])

  // 이벤트 리스너 설정
  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [handleFocus, handleBlur])

  // 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${isFocused ? focusScale : initialScale})
      rotate(${isFocused ? focusRotate : initialRotate}deg)
      translate(${isFocused ? focusTranslateX : initialTranslateX}px, ${isFocused ? focusTranslateY : initialTranslateY}px)
    `,
    opacity: isFocused ? focusOpacity : initialOpacity,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity'
  }

  return {
    ref,
    isVisible: isFocused,
    isAnimating,
    style,
    progress,
    start,
    stop,
    reset,
    pause,
    resume,
    // 새로운 직관적 API 추가
    focus: handleFocus,
    blur: handleBlur,
    // 상태 속성 추가
    isFocused
  }
}
