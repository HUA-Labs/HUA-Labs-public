# HUA Motion 패키지 현재 상황 상세 분석

**작성일**: 2025-12-06  
**버전**: 1.0.0

---

## 📋 목차

1. [패키지 현황](#패키지-현황)
2. [기능 매핑](#기능-매핑)
3. [의존성 분석](#의존성-분석)
4. [사용 현황](#사용-현황)
5. [문제점 및 개선점](#문제점-및-개선점)

---

## 패키지 현황

### 1. `@hua-labs/motion` (통합 패키지)

#### 위치
- `packages/hua-motion/`

#### 구조
```
hua-motion/
├── src/
│   ├── entries/          # 서브 엔트리 포인트
│   │   ├── core.ts
│   │   ├── page.ts
│   │   ├── element.ts
│   │   ├── scroll.ts
│   │   └── experiments.ts
│   ├── hooks/            # 모든 훅 (40개+)
│   ├── managers/         # 상태 관리
│   ├── presets/          # 프리셋 시스템
│   ├── types/            # 타입 정의
│   └── utils/            # 유틸리티
└── package.json
```

#### 엔트리 포인트
```json
{
  "exports": {
    ".": "./dist/index.js",
    "./core": "./dist/core.js",
    "./page": "./dist/page.js",
    "./element": "./dist/element.js",
    "./scroll": "./dist/scroll.js",
    "./experiments": "./dist/experiments.js"
  }
}
```

#### 주요 훅 (40개+)
- 기본 모션: `useFadeIn`, `useSlideUp`, `useSlideLeft`, `useSlideRight`, `useScaleIn`, `useBounceIn`, `usePulse`, `useSkeleton`
- 인터랙션: `useHoverMotion`, `useClickToggle`, `useFocusToggle`
- 스크롤: `useScrollReveal`, `useScrollProgress`, `useScrollToggle`
- 고급: `useAutoSlide`, `useAutoScale`, `useAutoFade`, `useAutoPlay`
- 오케스트레이션: `useMotionOrchestra`, `useOrchestration`, `useSequence`
- 기타: `useGameLoop`, `usePerformanceMonitor`, `useLanguageAwareMotion` 등

### 2. `@hua-labs/motion-core` (Core 패키지)

#### 위치
- `packages/hua-motion-core/`

#### 구조
```
hua-motion-core/
├── src/
│   ├── core/             # 핵심 엔진 (의존성 제로)
│   │   ├── MotionEngine.ts
│   │   ├── TransitionEffects.ts
│   │   └── PerformanceOptimizer.ts
│   ├── hooks/            # Core 훅 (25개)
│   ├── managers/         # 상태 관리
│   ├── presets/          # 프리셋 시스템
│   ├── types/            # 타입 정의
│   └── utils/            # 유틸리티 (easing)
└── package.json
```

#### 주요 특징
- ✅ **Zero Dependencies**: React만 peer dependency
- ✅ **테스트 커버리지**: 74%+ (517개 테스트 케이스)
- ✅ **SSR 지원**: Next.js 등 SSR 프레임워크 지원
- ✅ **TypeScript First**: 완전한 타입 안정성

#### Core 훅 목록 (25개)

**3단계 추상화 (3개)**:
- `useSimplePageMotion` - 프리셋 기반 (1단계)
- `usePageMotions` - 페이지 레벨 (2단계)
- `useSmartMotion` - 개별 요소 (3단계)

**기본 모션 (9개)**:
- `useFadeIn` - 페이드 인
- `useSlideUp` - 위로 슬라이드
- `useSlideLeft` - 왼쪽으로 슬라이드
- `useSlideRight` - 오른쪽으로 슬라이드
- `useScaleIn` - 스케일 인
- `useBounceIn` - 바운스 인
- `usePulse` - 펄스
- `useSpringMotion` - 스프링 물리
- `useGradient` - 그라데이션

**인터랙션 (4개)**:
- `useHoverMotion` - 호버 모션
- `useClickToggle` - 클릭 토글
- `useFocusToggle` - 포커스 토글
- `useToggleMotion` - 토글 모션

**스크롤 (3개)**:
- `useScrollReveal` - 스크롤 리빌
- `useScrollProgress` - 스크롤 진행도
- `useScrollToggle` - 스크롤 토글

**유틸리티 (2개)**:
- `useMotionState` - 모션 상태 관리
- `useRepeat` - 반복 애니메이션

**제스처 (2개)**:
- `useGesture` - 제스처 감지
- `useGestureMotion` - 제스처 모션

**핵심 엔진 (3개)**:
- `MotionEngine` - 순수 JavaScript 모션 엔진
- `TransitionEffects` - 전환 효과 시스템
- `PerformanceOptimizer` - 성능 최적화

### 3. `@hua-labs/motion-advanced` (Advanced 패키지)

#### 위치
- `packages/hua-motion-advanced/`

#### 구조
```
hua-motion-advanced/
├── src/
│   ├── hooks/            # Advanced 훅 (17개)
│   └── types/            # 타입 정의
└── package.json
```

#### 의존성
```json
{
  "dependencies": {
    "@hua-labs/motion-core": "workspace:*"
  }
}
```

#### Advanced 훅 목록 (17개)

**Auto 시리즈 (4개)**:
- `useAutoSlide` - 자동 슬라이드
- `useAutoScale` - 자동 스케일
- `useAutoFade` - 자동 페이드
- `useAutoPlay` - 자동 재생

**오케스트레이션 (3개)**:
- `useMotionOrchestra` - 모션 오케스트라
- `useOrchestration` - 오케스트레이션 관리
- `useSequence` - 시퀀스 관리

**고급 인터랙션 (7개)**:
- `useLayoutMotion` - 레이아웃 모션
- `useKeyboardToggle` - 키보드 토글
- `useScrollDirection` - 스크롤 방향
- `useStickyToggle` - 스티키 토글
- `useScrollToggle` - 스크롤 토글 (고급 버전)
- `useVisibilityToggle` - 가시성 토글 (고급 버전)
- `useInteractive` - 인터랙티브 모션

**기타 고급 기능 (3개)**:
- `usePerformanceMonitor` - 성능 모니터링
- `useLanguageAwareMotion` - 언어 인식 모션
- `useGameLoop` - 게임 루프

---

## 기능 매핑

### 1. Core vs Advanced 매핑

| 기능 | Core | Advanced | 통합 패키지 |
|------|------|----------|------------|
| 기본 모션 (fade, slide, scale) | ✅ | ❌ | ✅ |
| 인터랙션 (hover, click, focus) | ✅ | ❌ | ✅ |
| 스크롤 (reveal, progress) | ✅ | ❌ | ✅ |
| 3단계 추상화 | ✅ | ❌ | ✅ |
| Auto 시리즈 | ❌ | ✅ | ✅ |
| 오케스트레이션 | ❌ | ✅ | ✅ |
| 고급 인터랙션 | ❌ | ✅ | ✅ |
| 성능 모니터링 | ❌ | ✅ | ✅ |
| 국제화 | ❌ | ✅ | ✅ |
| 게임 엔진 | ❌ | ✅ | ✅ |

### 2. 중복 기능 분석

#### 2.1 `useScrollToggle`
- **Core**: 기본 스크롤 토글 기능
- **Advanced**: 고급 스크롤 토글 (추가 옵션 및 기능)
- **해결책**: Advanced 버전은 Core를 확장하는 형태

#### 2.2 `useVisibilityToggle`
- **Core**: 기본 가시성 토글
- **Advanced**: 고급 가시성 토글 (추가 옵션 및 기능)
- **해결책**: Advanced 버전은 Core를 확장하는 형태

### 3. 통합 패키지의 역할

#### 현재 구조
- 모든 훅을 하나의 패키지에 포함
- 서브 엔트리 포인트로 분리 (`/core`, `/page`, `/element`, `/scroll`)

#### 재편 후 구조
- Core와 Advanced를 재export
- 하위 호환성 유지
- 점진적 마이그레이션 지원

---

## 의존성 분석

### 1. 패키지 간 의존성

```
@hua-labs/motion (통합)
    ├── 모든 기능 포함
    └── 서브 엔트리 포인트 제공

@hua-labs/motion-core (Core)
    └── Zero Dependencies (React만 peer)

@hua-labs/motion-advanced (Advanced)
    └── @hua-labs/motion-core (의존)
```

### 2. UI 패키지 의존성

#### 현재
```
@hua-labs/ui
    └── @hua-labs/motion (workspace:*)
        └── 실제로는 사용하지 않음
```

#### 재편 후 (권장)
```
@hua-labs/ui
    ├── @hua-labs/motion-core (workspace:*, peerDependency)
    └── @hua-labs/motion-advanced (peerDependency, 선택적)
```

### 3. 번들 크기 영향

#### 현재
- Motion 패키지가 external로 설정되어 번들에 포함되지 않음
- 하지만 타입 체크 시 포함됨

#### 재편 후
- Core만 필요 시 최소 번들
- Advanced 필요 시에만 추가
- 완전한 선택적 의존성

---

## 사용 현황

### 1. UI 패키지 사용

#### 실제 사용
- **AdvancedPageTransition**: Motion 훅을 사용하지 않고 자체 구현
- **다른 컴포넌트**: Motion 패키지 사용 안 함

#### 코드 분석
```tsx
// packages/hua-ui/src/components/advanced/AdvancedPageTransition.tsx
// Motion 훅 import 없음
// requestAnimationFrame으로 자체 구현
```

### 2. 다른 프로젝트 사용 (예상)

#### hua-motion 앱
- Motion 패키지의 모든 기능 사용
- 플레이그라운드 및 데모 사이트

#### 기타 프로젝트
- Core 기능만 필요한 경우: 통합 패키지 사용
- 고급 기능 필요한 경우: 통합 패키지 사용

---

## 문제점 및 개선점

### 1. 현재 문제점

#### 1.1 패키지 구조
- ✅ Core와 Advanced가 이미 분리되어 있음
- ❌ 통합 패키지가 여전히 모든 기능 포함
- ❌ UI 패키지가 사용하지 않는 통합 패키지에 의존

#### 1.2 번들 크기
- 통합 패키지로 인한 불필요한 코드 포함 가능성
- 실제로 사용하지 않는 기능까지 포함

#### 1.3 유지보수
- 두 가지 패키지 구조가 공존
- 마이그레이션 계획이 있지만 완료되지 않음

### 2. 개선 방안

#### 2.1 명확한 분리
- Core: 필수 기능만
- Advanced: 고급 기능
- 통합: 선택적 제공

#### 2.2 UI 패키지 최적화
- Core만 필수 의존성
- Advanced는 선택적 의존성
- 완전한 의존성 제거 검토

#### 2.3 점진적 마이그레이션
- 통합 패키지로 하위 호환성 유지
- 단계별 마이그레이션 가이드
- 문서 및 예제 제공

### 3. 우선순위

#### 즉시 실행 가능
1. UI 패키지 의존성 변경
2. 빌드 설정 업데이트
3. 문서화 완료

#### 단기 작업 (1-2주)
1. Core 패키지 정리
2. Advanced 패키지 정리
3. 통합 패키지 재구성

#### 중기 작업 (2-4주)
1. UI 패키지 개선
2. 마이그레이션 가이드 작성
3. 예제 코드 업데이트

#### 장기 작업 (1-2개월)
1. 완전한 분리
2. 통합 패키지 deprecated
3. 커뮤니티 피드백 반영

---

## 결론

### 현재 상황 요약
1. **Core와 Advanced가 이미 분리되어 있음** ✅
2. **통합 패키지가 여전히 존재** ⚠️
3. **UI 패키지가 불필요한 의존성 보유** ❌
4. **마이그레이션 계획이 있지만 미완료** ⚠️

### 다음 단계
1. 이 문서 검토 및 승인
2. REFACTORING_STRATEGY.md와 함께 검토
3. 단계별 마이그레이션 시작
4. 지속적인 피드백 수집

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

