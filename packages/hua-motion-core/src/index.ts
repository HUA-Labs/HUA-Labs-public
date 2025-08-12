// ========================================
// HUA Motion Core - 메인 export 파일
// ========================================

// ========================================
// 기본 모션 훅들 (12개)
// ========================================

// 기본 모션
export { useFadeIn } from './hooks/useFadeIn'
export { useSlideUp } from './hooks/useSlideUp'
export { useSlideLeft } from './hooks/useSlideLeft'
export { useSlideRight } from './hooks/useSlideRight'
export { useScaleIn } from './hooks/useScaleIn'
export { useBounceIn } from './hooks/useBounceIn'
export { usePulse } from './hooks/usePulse'
export { useSpringMotion } from './hooks/useSpringMotion'
export { useGradient } from './hooks/useGradient'
export { useMotion } from './hooks/useMotion'
export { useSlideDown } from './hooks/useSlideDown'
export { useSkeleton } from './hooks/useSkeleton'

// 기본 인터랙션
export { useHoverMotion } from './hooks/useHoverMotion'
export { useClickToggle } from './hooks/useClickToggle'
export { useFocusToggle } from './hooks/useFocusToggle'
export { useVisibilityToggle } from './hooks/useVisibilityToggle'

// 기본 스크롤
export { useScrollReveal } from './hooks/useScrollReveal'
export { useScrollToggle } from './hooks/useScrollToggle'
export { useScrollProgress } from './hooks/useScrollProgress'

// 🆕 한국 개발자들이 자주 사용하는 기능
export { useCardList } from './hooks/useCardList'
export { useNavigation } from './hooks/useNavigation'
export { useLoadingSpinner } from './hooks/useLoadingSpinner'
export { useButtonEffect } from './hooks/useButtonEffect'

// 기본 유틸리티
export { useMotionState } from './hooks/useMotionState'
export { useRepeat } from './hooks/useRepeat'

// ========================================
// 기본 이징 함수들 (8개)
// ========================================

export {
  linear, easeIn, easeOut, easeInOut,
  easeInQuad, easeOutQuad, easeInOutQuad,
  type EasingFunction, type EasingType
} from './utils/easing'

// 이징 유틸리티
export { 
  getEasing, applyEasing, safeApplyEasing, isValidEasing, 
  getAvailableEasings, isEasingFunction, easingPresets, getPresetEasing 
} from './utils/easing'

// ========================================
// 기본 타입들
// ========================================

export type {
  // 공통 타입들
  BaseMotionOptions,
  BaseMotionReturn,
  FadeInOptions,
  SlideOptions,
  ScaleOptions,
  BounceOptions,
  PulseOptions,
  
  // 기본 타입들
  MotionDirection,
  MotionEasing,
  MotionTrigger,
  MotionCallback,
  MotionProgressCallback,
  MotionStateCallback,
  
  // React 19 호환 타입들
  MotionElement,
  MotionRef,
  MotionStyle
} from './types'
