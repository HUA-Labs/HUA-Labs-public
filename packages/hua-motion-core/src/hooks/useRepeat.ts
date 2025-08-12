import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface RepeatOptions extends BaseMotionOptions {
  repeatCount?: number // -1은 무한 반복
  repeatDelay?: number
  repeatDirection?: 'forward' | 'reverse' | 'alternate'
  repeatMode?: 'loop' | 'bounce' | 'ping-pong'
  autoStart?: boolean
  initialScale?: number
  initialOpacity?: number
  initialRotate?: number
  initialTranslateY?: number
  initialTranslateX?: number
  targetScale?: number
  targetOpacity?: number
  targetRotate?: number
  targetTranslateY?: number
  targetTranslateX?: number
}

export function useRepeat<T extends MotionElement = HTMLDivElement>(
  options: RepeatOptions = {}
): BaseMotionReturn<T> & {
  repeatCount: number
  currentRepeat: number
  isRepeating: boolean
  repeatDirection: 'forward' | 'reverse' | 'alternate'
  repeatMode: 'loop' | 'bounce' | 'ping-pong'
} {
  const {
    duration = 1000,
    easing = 'ease-in-out',
    repeatCount = -1, // 기본값: 무한 반복
    repeatDelay = 0,
    repeatDirection = 'forward',
    repeatMode = 'loop',
    autoStart = true,
    initialScale = 1,
    initialOpacity = 1,
    initialRotate = 0,
    initialTranslateY = 0,
    initialTranslateX = 0,
    targetScale = 1.2,
    targetOpacity = 0.8,
    targetRotate = 10,
    targetTranslateY = -10,
    targetTranslateX = 0,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentRepeat, setCurrentRepeat] = useState(0)
  const [isRepeating, setIsRepeating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'reverse'>('forward')

  // 애니메이션 루프 함수
  const runAnimation = useCallback(() => {
    if (!isRepeating) return

    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    // 애니메이션 진행
    const startTime = Date.now()
    const animate = () => {
      if (!isRepeating) return

      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(elapsed / duration, 1)
      
      // 이징 적용
      const easedProgress = currentProgress
      setProgress(easedProgress)

      if (currentProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        // 애니메이션 완료
        setIsAnimating(false)
        setProgress(1)
        
        // 반복 방향 결정
        let nextDirection = animationDirection
        if (repeatDirection === 'alternate') {
          nextDirection = animationDirection === 'forward' ? 'reverse' : 'forward'
          setAnimationDirection(nextDirection)
        }

        // 반복 카운트 증가
        const nextRepeat = currentRepeat + 1
        setCurrentRepeat(nextRepeat)

        // 반복 조건 확인
        if (repeatCount === -1 || nextRepeat < repeatCount) {
          // 지연 후 다음 반복
          setTimeout(() => {
            if (isRepeating) {
              runAnimation()
            }
          }, repeatDelay)
        } else {
          // 반복 완료
          setIsRepeating(false)
          onComplete?.()
        }
      }
    }

    requestAnimationFrame(animate)
  }, [isRepeating, duration, onStart, onComplete, currentRepeat, repeatCount, repeatDelay, repeatMode, animationDirection])

  // 반복 시작 함수
  const startRepeat = useCallback(() => {
    if (isRepeating) return

    setIsRepeating(true)
    setCurrentRepeat(0)
    setAnimationDirection('forward')
    runAnimation()
  }, [isRepeating, runAnimation])

  // 반복 중단 함수
  const stopRepeat = useCallback(() => {
    setIsRepeating(false)
    setIsAnimating(false)
    onStop?.()
  }, [onStop])

  // 반복 일시정지 함수
  const pauseRepeat = useCallback(() => {
    setIsRepeating(false)
    setIsAnimating(false)
  }, [])

  // 반복 재개 함수
  const resumeRepeat = useCallback(() => {
    if (!isRepeating && currentRepeat < (repeatCount === -1 ? Infinity : repeatCount)) {
      setIsRepeating(true)
      runAnimation()
    }
  }, [isRepeating, currentRepeat, repeatCount, runAnimation])

  // 모션 시작 함수
  const start = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true)
      startRepeat()
    }
  }, [isVisible, startRepeat])

  // 모션 중단 함수
  const stop = useCallback(() => {
    stopRepeat()
  }, [stopRepeat])

  // 모션 리셋 함수
  const reset = useCallback(() => {
    setIsVisible(false)
    setIsAnimating(false)
    setProgress(0)
    setCurrentRepeat(0)
    setIsRepeating(false)
    setAnimationDirection('forward')
    onReset?.()
  }, [onReset])

  // 모션 일시정지 함수
  const pause = useCallback(() => {
    pauseRepeat()
  }, [pauseRepeat])

  // 모션 재개 함수
  const resume = useCallback(() => {
    if (isVisible) {
      resumeRepeat()
    }
  }, [isVisible, resumeRepeat])

  // 자동 시작
  useEffect(() => {
    if (autoStart) {
      startRepeat()
    }
  }, [autoStart, startRepeat])

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      setIsRepeating(false)
    }
  }, [])

  // 현재 진행률에 따른 스타일 계산
  const getCurrentStyle = (): React.CSSProperties => {
    let currentProgress = progress

    // 반복 방향에 따른 진행률 조정
    if (animationDirection === 'reverse') {
      currentProgress = 1 - progress
    }

    // 반복 모드에 따른 진행률 조정
    if (repeatMode === 'bounce') {
      currentProgress = Math.sin(currentProgress * Math.PI)
    }

    const scale = initialScale + (targetScale - initialScale) * currentProgress
    const opacity = initialOpacity + (targetOpacity - initialOpacity) * currentProgress
    const rotate = initialRotate + (targetRotate - initialRotate) * currentProgress
    const translateY = initialTranslateY + (targetTranslateY - initialTranslateY) * currentProgress
    const translateX = initialTranslateX + (targetTranslateX - initialTranslateX) * currentProgress

    return {
      transform: `
        scale(${scale})
        rotate(${rotate}deg)
        translate(${translateX}px, ${translateY}px)
      `,
      opacity,
      transition: `all ${duration}ms ${easing}`,
      willChange: 'transform, opacity'
    }
  }

  const style = getCurrentStyle()

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
    repeatCount,
    currentRepeat,
    isRepeating,
    repeatDirection,
    repeatMode
  }
}
