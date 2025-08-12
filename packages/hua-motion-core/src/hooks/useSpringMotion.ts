import { useRef, useState, useEffect, useCallback } from 'react'
import { BaseMotionOptions, BaseMotionReturn, MotionElement } from '../types'

export interface SpringOptions extends BaseMotionOptions {
  stiffness?: number // 스프링 강도 (0-1000)
  damping?: number // 감쇠 (0-100)
  mass?: number // 질량 (0.1-10)
  restDelta?: number // 정지 임계값
  restSpeed?: number // 정지 속도 임계값
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
  autoStart?: boolean
}

export function useSpringMotion<T extends MotionElement = HTMLDivElement>(
  options: SpringOptions = {}
): BaseMotionReturn<T> & {
  stiffness: number
  damping: number
  mass: number
  velocity: { scale: number; opacity: number; rotate: number; translateY: number; translateX: number }
} {
  const {
    duration = 1000,
    easing = 'ease-out',
    stiffness = 100,
    damping = 10,
    mass = 1,
    restDelta = 0.01,
    restSpeed = 0.01,
    initialScale = 0,
    initialOpacity = 0,
    initialRotate = 0,
    initialTranslateY = 0,
    initialTranslateX = 0,
    targetScale = 1,
    targetOpacity = 1,
    targetRotate = 0,
    targetTranslateY = 0,
    targetTranslateX = 0,
    autoStart = true,
    onComplete, onStart, onStop, onReset
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  
  // 현재 위치와 속도
  const [currentScale, setCurrentScale] = useState(initialScale)
  const [currentOpacity, setCurrentOpacity] = useState(initialOpacity)
  const [currentRotate, setCurrentRotate] = useState(initialRotate)
  const [currentTranslateY, setCurrentTranslateY] = useState(initialTranslateY)
  const [currentTranslateX, setCurrentTranslateX] = useState(initialTranslateX)
  
  // velocity를 useRef로 변경하여 의존성 배열 문제 해결
  const velocityRef = useRef({
    scale: 0,
    opacity: 0,
    rotate: 0,
    translateY: 0,
    translateX: 0
  })

  // 스프링 애니메이션 루프
  const springAnimation = useCallback(() => {
    if (!isAnimating) return

    const animate = () => {
      if (!isAnimating) return

      // 스프링 물리 계산
      const scaleForce = (targetScale - currentScale) * stiffness
      const opacityForce = (targetOpacity - currentOpacity) * stiffness
      const rotateForce = (targetRotate - currentRotate) * stiffness
      const translateYForce = (targetTranslateY - currentTranslateY) * stiffness
      const translateXForce = (targetTranslateX - currentTranslateX) * stiffness

      // 가속도 계산 (F = ma)
      const scaleAcceleration = scaleForce / mass
      const opacityAcceleration = opacityForce / mass
      const rotateAcceleration = rotateForce / mass
      const translateYAcceleration = translateYForce / mass
      const translateXAcceleration = translateXForce / mass

      // 속도 업데이트 (v = v0 + at)
      const newVelocity = {
        scale: velocityRef.current.scale + scaleAcceleration,
        opacity: velocityRef.current.opacity + opacityAcceleration,
        rotate: velocityRef.current.rotate + rotateAcceleration,
        translateY: velocityRef.current.translateY + translateYAcceleration,
        translateX: velocityRef.current.translateX + translateXAcceleration
      }

      // 감쇠 적용
      newVelocity.scale *= (1 - damping / 100)
      newVelocity.opacity *= (1 - damping / 100)
      newVelocity.rotate *= (1 - damping / 100)
      newVelocity.translateY *= (1 - damping / 100)
      newVelocity.translateX *= (1 - damping / 100)

      // velocityRef 업데이트
      velocityRef.current = newVelocity

      // 위치 업데이트 (x = x0 + vt)
      const newScale = currentScale + newVelocity.scale
      const newOpacity = currentOpacity + newVelocity.opacity
      const newRotate = currentRotate + newVelocity.rotate
      const newTranslateY = currentTranslateY + newVelocity.translateY
      const newTranslateX = currentTranslateX + newVelocity.translateX

      setCurrentScale(newScale)
      setCurrentOpacity(newOpacity)
      setCurrentRotate(newRotate)
      setCurrentTranslateY(newTranslateY)
      setCurrentTranslateX(newTranslateX)

      // 진행률 계산
      const totalDistance = Math.abs(targetScale - initialScale) + 
                           Math.abs(targetOpacity - initialOpacity) + 
                           Math.abs(targetRotate - initialRotate) + 
                           Math.abs(targetTranslateY - initialTranslateY) + 
                           Math.abs(targetTranslateX - initialTranslateX)
      
      const currentDistance = Math.abs(newScale - initialScale) + 
                             Math.abs(newOpacity - initialOpacity) + 
                             Math.abs(newRotate - initialRotate) + 
                             Math.abs(newTranslateY - initialTranslateY) + 
                             Math.abs(newTranslateX - initialTranslateX)
      
      const newProgress = totalDistance > 0 ? currentDistance / totalDistance : 0
      setProgress(Math.min(newProgress, 1))

      // 정지 조건 확인
      const isAtRest = Math.abs(newVelocity.scale) < restSpeed && 
                       Math.abs(newVelocity.opacity) < restSpeed && 
                       Math.abs(newVelocity.rotate) < restSpeed && 
                       Math.abs(newVelocity.translateY) < restSpeed && 
                       Math.abs(newVelocity.translateX) < restSpeed &&
                       Math.abs(targetScale - newScale) < restDelta && 
                       Math.abs(targetOpacity - newOpacity) < restDelta && 
                       Math.abs(targetRotate - newRotate) < restDelta && 
                       Math.abs(targetTranslateY - newTranslateY) < restDelta && 
                       Math.abs(targetTranslateX - newTranslateX) < restDelta

      if (isAtRest) {
        // 목표값으로 정확히 설정
        setCurrentScale(targetScale)
        setCurrentOpacity(targetOpacity)
        setCurrentRotate(targetRotate)
        setCurrentTranslateY(targetTranslateY)
        setCurrentTranslateX(targetTranslateX)
        setProgress(1)
        setIsAnimating(false)
        onComplete?.()
      } else {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isAnimating, currentScale, currentOpacity, currentRotate, currentTranslateY, currentTranslateX, 
      targetScale, targetOpacity, targetRotate, targetTranslateY, targetTranslateX, 
      stiffness, damping, mass, restSpeed, restDelta, onComplete])

  // 모션 시작 함수 - 조건 로직 개선
  const start = useCallback(() => {
    // 이미 애니메이션 중이거나 보이는 상태라면 무시
    if (isAnimating) return
    
    setIsVisible(true)
    setIsAnimating(true)
    setProgress(0)
    onStart?.()
    springAnimation()
  }, [isAnimating, onStart, springAnimation])

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
    setCurrentScale(initialScale)
    setCurrentOpacity(initialOpacity)
    setCurrentRotate(initialRotate)
    setCurrentTranslateY(initialTranslateY)
    setCurrentTranslateX(initialTranslateX)
    // velocityRef 초기화
    velocityRef.current = { scale: 0, opacity: 0, rotate: 0, translateY: 0, translateX: 0 }
    onReset?.()
  }, [initialScale, initialOpacity, initialRotate, initialTranslateY, initialTranslateX, onReset])

  // 모션 일시정지 함수
  const pause = useCallback(() => {
    setIsAnimating(false)
  }, [])

  // 모션 재개 함수
  const resume = useCallback(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true)
      springAnimation()
    }
  }, [isVisible, isAnimating, springAnimation])

  // 자동 시작
  useEffect(() => {
    if (autoStart) {
      start()
    }
  }, [autoStart, start])

  // 스프링 스타일 계산
  const style: React.CSSProperties = {
    transform: `
      scale(${currentScale})
      rotate(${currentRotate}deg)
      translate(${currentTranslateX}px, ${currentTranslateY}px)
    `,
    opacity: currentOpacity,
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
    stiffness,
    damping,
    mass,
    velocity: velocityRef.current // 현재 velocity 값 반환
  }
}
