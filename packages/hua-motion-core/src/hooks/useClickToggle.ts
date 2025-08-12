import { useRef, useState, useCallback, useEffect } from 'react'
import { BaseMotionOptions, InteractionReturn, MotionElement } from '../types'

export interface ClickToggleOptions extends BaseMotionOptions {
  clickScale?: number
  clickOpacity?: number
  clickRotate?: number
  clickTranslateY?: number
  clickTranslateX?: number
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
}

export function useClickToggle<T extends MotionElement = HTMLDivElement>(
  options: ClickToggleOptions = {}
): InteractionReturn<T> {
  const {
    duration = 300,
    easing = 'ease-out',
    clickScale = 0.95,
    clickOpacity = 0.8,
    clickRotate = 0,
    clickTranslateY = 0,
    clickTranslateX = 0,
    initialScale = 1,
    initialOpacity = 1,
    initialRotate = 0,
    initialTranslateY = 0,
    initialTranslateX = 0,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  // 클릭 시작
  const handleMouseDown = useCallback(() => {
    setIsClicked(true)
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

  // 클릭 종료
  const handleMouseUp = useCallback(() => {
    setIsClicked(false)
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
    handleMouseDown()
  }, [handleMouseDown])

  // 모션 중단 함수
  const stop = useCallback(() => {
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsClicked(false)
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
    if (isClicked) {
      setIsAnimating(true)
    }
  }, [isClicked])

  // 이벤트 리스너 설정
  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('mouseleave', handleMouseUp) // 마우스가 요소를 벗어나면 클릭 상태 해제

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseUp])

  // 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${isClicked ? clickScale : initialScale})
      rotate(${isClicked ? clickRotate : initialRotate}deg)
      translate(${isClicked ? clickTranslateX : initialTranslateX}px, ${isClicked ? clickTranslateY : initialTranslateY}px)
    `,
    opacity: isClicked ? clickOpacity : initialOpacity,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity',
    cursor: 'pointer'
  }

  return {
    ref,
    isVisible: isClicked,
    isAnimating,
    style,
    progress,
    start,
    stop,
    reset,
    pause,
    resume,
    // 새로운 직관적 API 추가
    click: handleMouseDown,
    release: handleMouseUp,
    // 상태 속성 추가
    isClicked
  }
}
