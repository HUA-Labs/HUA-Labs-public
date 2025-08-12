import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface GradientOptions extends BaseMotionOptions {
  colors: string[]
  direction?: 'to-right' | 'to-left' | 'to-bottom' | 'to-top' | 'to-bottom-right' | 'to-bottom-left' | 'to-top-right' | 'to-top-left'
  gradientType?: 'linear' | 'radial'
  startPosition?: number // 0-100
  endPosition?: number // 0-100
  animateColors?: boolean
  animateDirection?: boolean
  animatePosition?: boolean
  colorTransitionDuration?: number
  directionTransitionDuration?: number
  positionTransitionDuration?: number
  autoStart?: boolean
}

export function useGradient<T extends MotionElement = HTMLDivElement>(
  options: GradientOptions
): BaseMotionReturn<T> & {
  currentColors: string[]
  currentDirection: string
  currentStartPosition: number
  currentEndPosition: number
  setColors: (colors: string[]) => void
  setDirection: (direction: 'to-right' | 'to-left' | 'to-bottom' | 'to-top' | 'to-bottom-right' | 'to-bottom-left' | 'to-top-right' | 'to-top-left') => void
  setPositions: (start: number, end: number) => void
} {
  const {
    duration = 1000,
    easing = 'ease-in-out',
    colors,
    direction = 'to-right',
    gradientType = 'linear',
    startPosition = 0,
    endPosition = 100,
    animateColors = true,
    animateDirection = false,
    animatePosition = false,
    colorTransitionDuration = 1000,
    directionTransitionDuration = 500,
    positionTransitionDuration = 800,
    autoStart = true,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentColors, setCurrentColors] = useState(colors)
  const [currentDirection, setCurrentDirection] = useState(direction)
  const [currentStartPosition, setCurrentStartPosition] = useState(startPosition)
  const [currentEndPosition, setCurrentEndPosition] = useState(endPosition)

  // 색상 변경 함수
  const setColors = useCallback((newColors: string[]) => {
    if (!animateColors) {
      setCurrentColors(newColors)
      return
    }

    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    setTimeout(() => {
      setCurrentColors(newColors)
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, colorTransitionDuration)
  }, [animateColors, colorTransitionDuration, onStart, onComplete])

  // 방향 변경 함수
  const setDirection = useCallback((newDirection: 'to-right' | 'to-left' | 'to-bottom' | 'to-top' | 'to-bottom-right' | 'to-bottom-left' | 'to-top-right' | 'to-top-left') => {
    if (!animateDirection) {
      setCurrentDirection(newDirection)
      return
    }

    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    setTimeout(() => {
      setCurrentDirection(newDirection)
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, directionTransitionDuration)
  }, [animateDirection, directionTransitionDuration, onStart, onComplete])

  // 위치 변경 함수
  const setPositions = useCallback((start: number, end: number) => {
    if (!animatePosition) {
      setCurrentStartPosition(start)
      setCurrentEndPosition(end)
      return
    }

    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    setTimeout(() => {
      setCurrentStartPosition(start)
      setCurrentEndPosition(end)
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, positionTransitionDuration)
  }, [animatePosition, positionTransitionDuration, onStart, onComplete])

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
    setCurrentColors(colors)
    setCurrentDirection(direction)
    setCurrentStartPosition(startPosition)
    setCurrentEndPosition(endPosition)
    onReset?.()
  }, [colors, direction, startPosition, endPosition, onReset])

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

  // 자동 시작
  useEffect(() => {
    if (autoStart) {
      start()
    }
  }, [autoStart, start])

  // 그라데이션 스타일 생성
  const getGradientStyle = (): React.CSSProperties => {
    let background: string

    if (gradientType === 'radial') {
      background = `radial-gradient(circle at ${currentStartPosition}% ${currentEndPosition}%, ${currentColors.join(', ')})`
    } else {
      background = `linear-gradient(${currentDirection}, ${currentColors.join(', ')})`
    }

    return {
      background,
      transition: `all ${duration}ms ${easing}`,
      willChange: 'background'
    }
  }

  const style = getGradientStyle()

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
    currentColors,
    currentDirection,
    currentStartPosition,
    currentEndPosition,
    setColors,
    setDirection,
    setPositions
  }
}
