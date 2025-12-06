# HUA Motion 패키지 재편 요약

**작성일**: 2025-12-06  
**목적**: GPT에게 컨텍스트 제공용 요약 문서

---

## 🎯 핵심 요약

### 현재 상황
- **3개의 패키지 존재**: `@hua-labs/motion` (통합), `@hua-labs/motion-core` (Core), `@hua-labs/motion-advanced` (Advanced)
- **Core와 Advanced는 이미 분리됨** ✅
- **통합 패키지가 여전히 모든 기능 포함** ⚠️
- **UI 패키지는 Motion을 의존하지만 실제로는 사용하지 않음** ❌

### 재편 목표
1. **명확한 분리**: Core (필수) vs Advanced (고급)
2. **UI 패키지 최적화**: 불필요한 의존성 제거
3. **하위 호환성**: 통합 패키지로 점진적 마이그레이션 지원

---

## 📦 패키지 구조

### 1. `@hua-labs/motion-core` (Core)
**역할**: 모든 React 앱에 필요한 필수 모션 기능

**특징**:
- ✅ Zero Dependencies (React만 peer)
- ✅ 25개 필수 훅
- ✅ 테스트 커버리지 74%+ (517개 테스트)
- ✅ SSR 지원

**주요 훅**:
- 3단계 추상화: `useSimplePageMotion`, `usePageMotions`, `useSmartMotion`
- 기본 모션: `useFadeIn`, `useSlideUp`, `useSlideLeft`, `useSlideRight`, `useScaleIn`, `useBounceIn`, `usePulse`, `useSpringMotion`, `useGradient`
- 인터랙션: `useHoverMotion`, `useClickToggle`, `useFocusToggle`, `useToggleMotion`
- 스크롤: `useScrollReveal`, `useScrollProgress`, `useScrollToggle`
- 유틸리티: `useMotionState`, `useRepeat`
- 제스처: `useGesture`, `useGestureMotion`

### 2. `@hua-labs/motion-advanced` (Advanced)
**역할**: 복잡한 애니메이션과 고급 기능

**특징**:
- ✅ Core 패키지 의존
- ✅ 17개 고급 훅

**주요 훅**:
- Auto 시리즈: `useAutoSlide`, `useAutoScale`, `useAutoFade`, `useAutoPlay`
- 오케스트레이션: `useMotionOrchestra`, `useOrchestration`, `useSequence`
- 고급 인터랙션: `useLayoutMotion`, `useKeyboardToggle`, `useScrollDirection`, `useStickyToggle`, `useScrollToggle`, `useVisibilityToggle`, `useInteractive`
- 기타: `usePerformanceMonitor`, `useLanguageAwareMotion`, `useGameLoop`

### 3. `@hua-labs/motion` (통합 패키지)
**역할**: 하위 호환성 및 편의성 제공

**재편 후**:
- Core + Advanced 재export
- 기존 코드와의 호환성 유지
- 점진적 마이그레이션 지원

---

## 🔗 UI 패키지 호환성

### 현재 상황
```json
{
  "dependencies": {
    "@hua-labs/motion": "workspace:*"
  }
}
```

**문제점**:
- Motion 패키지를 의존하지만 실제로는 사용하지 않음
- `AdvancedPageTransition`은 자체 구현 (requestAnimationFrame 기반)
- 불필요한 의존성

### 마이그레이션 전략

#### Phase 1: 즉시 실행 가능
```json
{
  "dependencies": {
    "@hua-labs/motion-core": "workspace:*"
  },
  "peerDependencies": {
    "@hua-labs/motion-advanced": "*"
  }
}
```

#### Phase 2: 빌드 설정 업데이트
```typescript
// tsup.config.ts
external: [
  '@hua-labs/motion-core',
  '@hua-labs/motion-advanced'
]
```

#### Phase 3: 완전한 의존성 제거 (최종 목표)
```json
{
  "peerDependencies": {
    "@hua-labs/motion-core": "*",
    "@hua-labs/motion-advanced": "*"
  }
}
```

---

## 📋 마이그레이션 계획

### 단계별 작업

#### Phase 1: 준비 단계 (1주)
- [x] 현재 상황 문서화 완료
- [ ] 테스트 코드 확인
- [ ] 문서 검토

#### Phase 2: Core 패키지 정리 (1주)
- [ ] 중복 기능 제거
- [ ] 테스트 커버리지 확인
- [ ] 문서 업데이트

#### Phase 3: Advanced 패키지 정리 (1주)
- [ ] Core 의존성 확인
- [ ] 테스트 작성
- [ ] 문서 업데이트

#### Phase 4: 통합 패키지 재구성 (1주)
- [ ] Core + Advanced 재export
- [ ] 하위 호환성 테스트
- [ ] 마이그레이션 가이드 작성

#### Phase 5: UI 패키지 마이그레이션 (1주)
- [ ] 의존성 변경
- [ ] 빌드 설정 업데이트
- [ ] 테스트 실행
- [ ] 번들 크기 확인

#### Phase 6: 문서화 및 정리 (1주)
- [ ] 사용 가이드 작성
- [ ] 마이그레이션 가이드 작성
- [ ] 예제 코드 업데이트

---

## 🎯 핵심 결정 사항

### 1. 패키지 분리
- ✅ Core와 Advanced는 이미 분리되어 있음
- ⚠️ 통합 패키지를 재구성 필요

### 2. UI 패키지 전략
- **즉시**: `@hua-labs/motion` → `@hua-labs/motion-core`로 변경
- **단기**: peerDependency로 전환
- **장기**: 완전한 의존성 제거 검토

### 3. 하위 호환성
- 통합 패키지로 기존 코드 지원
- 점진적 마이그레이션 가능
- 명확한 가이드 제공

---

## 📚 관련 문서

1. **REFACTORING_STRATEGY.md**: 상세한 재편 전략
2. **CURRENT_STATUS.md**: 현재 상황 상세 분석
3. **MOTION_PACKAGE_INTEGRATION.md**: UI 패키지 통합 가이드

---

## 💡 GPT에게 전달할 핵심 포인트

1. **현재 상황**: Core와 Advanced는 이미 분리되어 있지만, 통합 패키지가 여전히 존재하고 UI 패키지가 불필요한 의존성을 가지고 있음

2. **목표**: 
   - 통합 패키지를 Core + Advanced 재export로 재구성
   - UI 패키지의 불필요한 의존성 제거
   - 하위 호환성 유지

3. **다음 단계**:
   - UI 패키지 의존성을 `@hua-labs/motion-core`로 변경
   - 빌드 설정 업데이트
   - 단계별 마이그레이션 진행

4. **주의사항**:
   - 기존 코드와의 호환성 유지
   - 점진적 마이그레이션 지원
   - 명확한 문서화 필요

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

