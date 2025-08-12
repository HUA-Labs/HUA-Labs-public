import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface MotionStateOptions extends BaseMotionOptions {
  states: {
    [key: string]: {
      scale?: number
      opacity?: number
      rotate?: number
      translateY?: number
      translateX?: number
      backgroundColor?: string
      color?: string
      borderColor?: string
      boxShadow?: string
    }
  }
  initialState?: string
  stateTransitionDuration?: number
  stateTransitionEasing?: string
}

export function useMotionState<T extends MotionElement = HTMLDivElement>(
  options: MotionStateOptions
): BaseMotionReturn<T> & {
  currentState: string
  availableStates: string[]
  setState: (stateName: string) => void
  transitionToState: (stateName: string, duration?: number) => void
} {
  const {
    duration = 300,
    easing = 'ease-out',
    states,
    initialState = Object.keys(states)[0] || 'default',
    stateTransitionDuration,
    stateTransitionEasing,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentState, setCurrentState] = useState(initialState)
  const [targetState, setTargetState] = useState(initialState)

  const availableStates = Object.keys(states)
  const currentStateConfig = states[currentState] || {}
  const targetStateConfig = states[targetState] || {}

  // 상태 변경 함수
  const setState = useCallback((stateName: string) => {
    if (!states[stateName]) {
      console.warn(`State "${stateName}" not found in available states:`, availableStates)
      return
    }

    setTargetState(stateName)
    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    const transitionDuration = stateTransitionDuration || duration

    setTimeout(() => {
      setCurrentState(stateName)
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, transitionDuration)
  }, [states, stateTransitionDuration, duration, onStart, onComplete])

  // 상태 전환 함수 (애니메이션과 함께)
  const transitionToState = useCallback((stateName: string, customDuration?: number) => {
    if (!states[stateName]) {
      console.warn(`State "${stateName}" not found in available states:`, availableStates)
      return
    }

    setTargetState(stateName)
    setIsAnimating(true)
    setProgress(0)
    onStart?.()

    const transitionDuration = customDuration || stateTransitionDuration || duration

    setTimeout(() => {
      setCurrentState(stateName)
      setIsAnimating(false)
      setProgress(1)
      onComplete?.()
    }, transitionDuration)
  }, [states, stateTransitionDuration, duration, onStart, onComplete])

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
    setCurrentState(initialState)
    setTargetState(initialState)
    onReset?.()
  }, [initialState, onReset])

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

  // 현재 상태에 따른 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${currentStateConfig.scale || 1})
      rotate(${currentStateConfig.rotate || 0}deg)
      translate(${currentStateConfig.translateX || 0}px, ${currentStateConfig.translateY || 0}px)
    `,
    opacity: currentStateConfig.opacity ?? 1,
    backgroundColor: currentStateConfig.backgroundColor,
    color: currentStateConfig.color,
    borderColor: currentStateConfig.borderColor,
    boxShadow: currentStateConfig.boxShadow,
    transition: `all ${stateTransitionDuration || duration}ms ${stateTransitionEasing || easing}`,
    willChange: 'transform, opacity, background-color, color, border-color, box-shadow'
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
    currentState,
    availableStates,
    setState,
    transitionToState
  }
}
