// ========================================
// HUA Motion Core - 기본 타입 정의
// ========================================

import { RefObject, CSSProperties } from 'react'

// ========================================
// React 19 호환 타입 정의
// ========================================

// React 19에서 더 구체적인 요소 타입 사용
export type MotionElement = HTMLDivElement | HTMLSpanElement | HTMLButtonElement | HTMLHeadingElement | HTMLParagraphElement | HTMLImageElement

// React 19 호환 Ref 타입
export type MotionRef<T extends MotionElement = HTMLDivElement> = RefObject<T | null>

// React 19 호환 스타일 타입
export type MotionStyle = CSSProperties & {
  // React 19의 새로운 CSS 속성들 지원
  '--motion-delay'?: string
  '--motion-duration'?: string
  '--motion-easing'?: string
  '--motion-progress'?: string
}

// ========================================
// 기본 모션 옵션 인터페이스
// ========================================

export interface BaseMotionOptions {
  /** 모션 시작 지연 시간 (ms) */
  delay?: number
  /** 모션 지속 시간 (ms) */
  duration?: number
  /** Intersection Observer 임계값 (0-1) */
  threshold?: number
  /** 한 번만 트리거할지 여부 */
  triggerOnce?: boolean
  /** 이징 함수명 */
  easing?: string
  /** 자동 시작 여부 */
  autoStart?: boolean
  /** 모션 완료 시 콜백 */
  onComplete?: () => void
  /** 모션 시작 시 콜백 */
  onStart?: () => void
  /** 모션 중단 시 콜백 */
  onStop?: () => void
  /** 모션 리셋 시 콜백 */
  onReset?: () => void
}

// ========================================
// 기본 모션 반환값 인터페이스
// ========================================

export interface BaseMotionReturn<T extends MotionElement = HTMLDivElement> {
  /** DOM 요소 참조 */
  ref: MotionRef<T>
  /** 요소가 화면에 보이는지 여부 */
  isVisible: boolean
  /** 모션이 진행 중인지 여부 */
  isAnimating: boolean
  /** 적용할 CSS 스타일 */
  style?: MotionStyle
  /** 적용할 CSS 클래스명 */
  className?: string
  /** 모션 진행률 (0-1) */
  progress?: number
  /** 모션 시작 함수 */
  start?: () => void
  /** 모션 리셋 함수 */
  reset?: () => void
  /** 모션 중단 함수 */
  stop?: () => void
  /** 모션 일시정지 함수 */
  pause?: () => void
  /** 모션 재개 함수 */
  resume?: () => void
  /** 모션 토글 함수 (선택적) */
  toggle?: () => void
}

// ========================================
// 인터랙션 훅 반환값 인터페이스
// ========================================

export interface InteractionReturn<T extends MotionElement = HTMLDivElement> extends BaseMotionReturn<T> {
  // 기존 API 유지 (하위 호환성)
  start: () => void
  isVisible: boolean
  
  // 새로운 직관적 API
  focus?: () => void      // 포커스 시작
  blur?: () => void       // 포커스 종료
  hover?: () => void      // 호버 시작
  leave?: () => void      // 호버 종료
  click?: () => void      // 클릭 시작
  release?: () => void    // 클릭 종료
  show?: () => void       // 표시
  hide?: () => void       // 숨김
  
  // 상태 속성
  isFocused?: boolean     // 포커스 상태
  isHovered?: boolean     // 호버 상태
  isClicked?: boolean     // 클릭 상태
}

// ========================================
// 훅별 확장 옵션 인터페이스들
// ========================================

export interface FadeInOptions extends BaseMotionOptions {
  /** 초기 투명도 */
  initialOpacity?: number
  /** 목표 투명도 */
  targetOpacity?: number
}

export interface SlideOptions extends BaseMotionOptions {
  /** 슬라이드 방향 */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** 슬라이드 거리 (px) */
  distance?: number
}

export interface ScaleOptions extends BaseMotionOptions {
  /** 초기 스케일 */
  initialScale?: number
  /** 목표 스케일 */
  targetScale?: number
}

export interface BounceOptions extends BaseMotionOptions {
  /** 바운스 높이 (px) */
  bounceHeight?: number
  /** 바운스 횟수 */
  bounceCount?: number
}

export interface PulseOptions extends BaseMotionOptions {
  /** 펄스 스케일 */
  pulseScale?: number
  /** 반복 횟수 */
  pulseCount?: number
}

// ========================================
// 기본 타입들
// ========================================

export type MotionDirection = 'up' | 'down' | 'left' | 'right'
export type MotionEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
export type MotionTrigger = 'scroll' | 'click' | 'hover' | 'focus' | 'auto'

export type MotionCallback = () => void
export type MotionProgressCallback = (progress: number) => void
export type MotionStateCallback<T extends MotionElement = HTMLDivElement> = (state: BaseMotionReturn<T>) => void
