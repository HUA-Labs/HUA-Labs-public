// ========================================
// HUA Motion Core - 기본 이징 함수들
// ========================================

export type EasingFunction = (t: number) => number

// ========================================
// 기본 이징 함수들 (8개)
// ========================================

export const linear: EasingFunction = (t) => t

export const easeIn: EasingFunction = (t) => t * t
export const easeOut: EasingFunction = (t) => 1 - (1 - t) * (1 - t)
export const easeInOut: EasingFunction = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

// Quad는 In/Out과 동일하므로 별칭으로 제공
export const easeInQuad: EasingFunction = easeIn
export const easeOutQuad: EasingFunction = easeOut
export const easeInOutQuad: EasingFunction = easeInOut

// ========================================
// 이징 타입 정의
// ========================================

export type EasingType = 
  | 'linear'
  | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'

// ========================================
// 이징 유틸리티 함수들
// ========================================

/**
 * 이징 함수가 유효한지 확인
 */
export function isValidEasing(easingName: string): boolean {
  const validEasings = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad']
  return validEasings.includes(easingName)
}

/**
 * 이징 함수명으로 이징 함수 가져오기
 */
export function getEasing(easingName: unknown): EasingFunction {
  if (typeof easingName === 'function') {
    // 타입 안전성을 위해 EasingFunction으로 캐스팅
    return easingName as EasingFunction
  }
  
  if (typeof easingName === 'string') {
    switch (easingName) {
      case 'linear': return linear
      case 'easeIn': return easeIn
      case 'easeOut': return easeOut
      case 'easeInOut': return easeInOut
      case 'easeInQuad': return easeInQuad
      case 'easeOutQuad': return easeOutQuad
      case 'easeInOutQuad': return easeInOutQuad
      default: return linear
    }
  }
  
  return linear // 기본값
}

/**
 * 이징 함수 적용
 */
export function applyEasing(t: number, easingName: string | EasingFunction): number {
  const easing = getEasing(easingName)
  return easing(t)
}

/**
 * 안전한 이징 함수 적용 (에러 처리)
 */
export function safeApplyEasing(t: number, easingName: unknown): number {
  try {
    return applyEasing(t, easingName as string | EasingFunction)
  } catch (error) {
    console.warn('Easing function error, using linear:', error)
    return linear(t)
  }
}

/**
 * 사용 가능한 이징 함수 목록 가져오기
 */
export function getAvailableEasings(): string[] {
  return ['linear', 'easeIn', 'easeOut', 'easeInOut', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad']
}

/**
 * 값이 이징 함수인지 확인
 */
export function isEasingFunction(value: any): value is EasingFunction {
  return typeof value === 'function'
}

// ========================================
// 이징 함수 맵
// ========================================

// 기존 패키지와 동일한 방식으로 개별 함수 export
// easingFunctions 객체는 제거하여 React 19 타입 호환성 문제 해결

// ========================================
// 기본 이징 프리셋
// ========================================

export const easingPresets = {
  smooth: easeInOut,
  fast: easeIn,
  slow: easeOut,
  natural: easeInOut
}

/**
 * 프리셋 이징 함수 가져오기
 */
export function getPresetEasing(preset: keyof typeof easingPresets): EasingFunction {
  return easingPresets[preset] || linear
}
