# HUA Motion 패키지 재편 전략 문서

**작성일**: 2025-12-06  
**버전**: 1.0.0

---

## 📋 목차

1. [현재 상황 분석](#현재-상황-분석)
2. [재편 목표](#재편-목표)
3. [패키지 구조 설계](#패키지-구조-설계)
4. [기능 분류](#기능-분류)
5. [UI 패키지 호환성 전략](#ui-패키지-호환성-전략)
6. [마이그레이션 계획](#마이그레이션-계획)
7. [구현 단계](#구현-단계)

---

## 현재 상황 분석

### 1. 패키지 현황

#### 1.1 기존 통합 패키지: `@hua-labs/motion`
- **위치**: `packages/hua-motion/`
- **상태**: 현재 UI 패키지에서 사용 중
- **구조**: 
  - 모든 기능이 하나의 패키지에 통합
  - 서브 엔트리 포인트 제공 (`/core`, `/page`, `/element`, `/scroll`, `/experiments`)
  - 40개 이상의 훅 제공

#### 1.2 Core 패키지: `@hua-labs/motion-core`
- **위치**: `packages/hua-motion-core/`
- **상태**: 이미 별도 패키지로 존재
- **기능**: 
  - 25개 필수 훅
  - 3단계 추상화 시스템 (`useSimplePageMotion`, `usePageMotions`, `useSmartMotion`)
  - 기본 모션, 인터랙션, 스크롤, 유틸리티, 제스처
  - 테스트 커버리지 74%+ (517개 테스트 케이스)
  - **Zero Dependencies** (외부 애니메이션 라이브러리 없음)

#### 1.3 Advanced 패키지: `@hua-labs/motion-advanced`
- **위치**: `packages/hua-motion-advanced/`
- **상태**: 이미 별도 패키지로 존재
- **의존성**: `@hua-labs/motion-core` (workspace:*)
- **기능**:
  - 고급 모션 (Auto 시리즈)
  - 오케스트레이션
  - 고급 인터랙션
  - 성능 최적화
  - 국제화
  - 게임 엔진

### 2. UI 패키지 사용 현황

#### 2.1 의존성
```json
{
  "dependencies": {
    "@hua-labs/motion": "workspace:*"
  }
}
```

#### 2.2 실제 사용
- **Advanced 컴포넌트**: `@hua-labs/motion`에 의존하지만 **실제로는 직접 사용하지 않음**
- **AdvancedPageTransition**: motion 훅을 사용하지 않고 자체 구현 (requestAnimationFrame 기반)
- **빌드 설정**: `tsup.config.ts`에서 `@hua-labs/motion`을 external로 설정

#### 2.3 호환성 요구사항
- Core 컴포넌트: motion 불필요
- Form, Navigation, Feedback: motion 불필요
- Advanced 컴포넌트: motion 선택적 (현재는 사용하지 않음)

### 3. 문제점 분석

#### 3.1 패키지 구조 문제
- ✅ Core와 Advanced가 이미 분리되어 있음
- ❌ 기존 `@hua-labs/motion` 패키지가 여전히 통합 패키지로 존재
- ❌ UI 패키지가 사용하지 않는 통합 패키지에 의존
- ❌ 패키지 간 역할이 명확하지 않음

#### 3.2 번들 크기 문제
- 통합 패키지로 인한 불필요한 코드 번들링
- UI 패키지에서 실제로 사용하지 않는 기능까지 포함 가능성

#### 3.3 유지보수 문제
- 두 가지 패키지 구조가 공존 (통합 vs 분리)
- 마이그레이션 계획이 있지만 완료되지 않음

---

## 재편 목표

### 1. 명확한 패키지 분리
- **Core**: 필수 기능만 포함 (Zero Dependencies)
- **Advanced**: 고급 기능 (Core 의존)
- **통합 패키지**: 선택적 제공 (Core + Advanced 재export)

### 2. UI 패키지 최적화
- Core 컴포넌트는 motion 불필요
- Advanced 컴포넌트는 선택적 의존성으로 전환
- 번들 크기 최적화

### 3. 개발자 경험 개선
- 명확한 패키지 선택 가이드
- 단계별 학습 경로 제공
- 타입 안정성 보장

---

## 패키지 구조 설계

### 1. 최종 패키지 구조

```
packages/
├── hua-motion-core/          # 필수 기능 (Zero Dependencies)
│   ├── 기본 모션 훅 (9개)
│   ├── 인터랙션 훅 (4개)
│   ├── 스크롤 훅 (3개)
│   ├── 유틸리티 훅 (2개)
│   ├── 제스처 훅 (2개)
│   ├── 3단계 추상화 (3개)
│   └── 프리셋 시스템
│
├── hua-motion-advanced/      # 고급 기능 (Core 의존)
│   ├── Auto 시리즈 (4개)
│   ├── 오케스트레이션 (3개)
│   ├── 고급 인터랙션 (7개)
│   ├── 성능 최적화 (1개)
│   ├── 국제화 (1개)
│   └── 게임 엔진 (1개)
│
└── hua-motion/               # 통합 패키지 (선택적)
    ├── Core 재export
    ├── Advanced 재export
    └── 하위 호환성 유지
```

### 2. 패키지 역할 정의

#### 2.1 `@hua-labs/motion-core`
**목적**: 모든 React 앱에 필요한 필수 모션 기능

**특징**:
- ✅ Zero Dependencies (React만 peer dependency)
- ✅ 경량화 (최소 번들 크기)
- ✅ 높은 테스트 커버리지
- ✅ SSR 지원
- ✅ TypeScript First

**대상 사용자**:
- 기본 애니메이션이 필요한 모든 개발자
- 번들 크기를 최소화하려는 개발자
- 학습을 시작하는 개발자

#### 2.2 `@hua-labs/motion-advanced`
**목적**: 복잡한 애니메이션과 고급 기능이 필요한 경우

**특징**:
- ✅ Core 패키지 의존
- ✅ 고급 기능 제공
- ✅ 오케스트레이션 지원
- ✅ 성능 최적화 도구

**대상 사용자**:
- 복잡한 애니메이션 시퀀스가 필요한 개발자
- 고급 인터랙션이 필요한 개발자
- 게임이나 인터랙티브 앱 개발자

#### 2.3 `@hua-labs/motion` (통합 패키지)
**목적**: 하위 호환성 및 편의성 제공

**특징**:
- ✅ Core + Advanced 재export
- ✅ 기존 코드와의 호환성 유지
- ✅ 점진적 마이그레이션 지원

**대상 사용자**:
- 기존 코드 마이그레이션 중인 개발자
- 모든 기능을 한 번에 사용하려는 개발자

---

## 기능 분류

### 1. Core 패키지 기능 (25개 훅)

#### 1.1 기본 모션 (9개)
- `useFadeIn` - 페이드 인
- `useSlideUp` - 위로 슬라이드
- `useSlideLeft` - 왼쪽으로 슬라이드
- `useSlideRight` - 오른쪽으로 슬라이드
- `useSlideDown` - 아래로 슬라이드 (바운스 포함)
- `useScaleIn` - 스케일 인
- `useBounceIn` - 바운스 인
- `usePulse` - 펄스
- `useSkeleton` - 스켈레톤 로딩

#### 1.2 인터랙션 (4개)
- `useHoverMotion` - 호버 모션
- `useClickToggle` - 클릭 토글
- `useFocusToggle` - 포커스 토글
- `useVisibilityToggle` - 가시성 토글

#### 1.3 스크롤 (3개)
- `useScrollReveal` - 스크롤 리빌
- `useScrollProgress` - 스크롤 진행도
- `useScrollToggle` - 스크롤 토글

#### 1.4 유틸리티 (2개)
- `useMotionState` - 모션 상태 관리
- `useRepeat` - 반복 애니메이션
- `useToggleMotion` - 토글 모션

#### 1.5 제스처 (2개)
- `useGesture` - 제스처 감지
- `useGestureMotion` - 제스처 모션

#### 1.6 3단계 추상화 (3개)
- `useSimplePageMotion` - 프리셋 기반 (1단계)
- `usePageMotions` - 페이지 레벨 (2단계)
- `useSmartMotion` - 개별 요소 (3단계)

#### 1.7 고급 Core 기능 (2개)
- `useSpringMotion` - 스프링 물리
- `useGradient` - 그라데이션

### 2. Advanced 패키지 기능 (17개 훅)

#### 2.1 Auto 시리즈 (4개)
- `useAutoSlide` - 자동 슬라이드
- `useAutoScale` - 자동 스케일
- `useAutoFade` - 자동 페이드
- `useAutoPlay` - 자동 재생

#### 2.2 오케스트레이션 (3개)
- `useMotionOrchestra` - 모션 오케스트라
- `useOrchestration` - 오케스트레이션 관리
- `useSequence` - 시퀀스 관리

#### 2.3 고급 인터랙션 (7개)
- `useLayoutMotion` - 레이아웃 모션
- `useKeyboardToggle` - 키보드 토글
- `useScrollDirection` - 스크롤 방향
- `useStickyToggle` - 스티키 토글
- `useScrollToggle` - 스크롤 토글 (Advanced 버전)
- `useVisibilityToggle` - 가시성 토글 (Advanced 버전)
- `useInteractive` - 인터랙티브 모션

#### 2.4 기타 고급 기능 (3개)
- `usePerformanceMonitor` - 성능 모니터링
- `useLanguageAwareMotion` - 언어 인식 모션
- `useGameLoop` - 게임 루프

### 3. 기능 중복 해결

#### 3.1 Core와 Advanced에 모두 있는 기능
- `useScrollToggle`: Core는 기본 버전, Advanced는 고급 버전
- `useVisibilityToggle`: Core는 기본 버전, Advanced는 고급 버전
- **해결책**: Advanced 버전은 Core를 확장하는 형태로 구현

#### 3.2 통합 패키지의 역할
- Core와 Advanced를 모두 재export
- 사용자가 선택적으로 import 가능
- 하위 호환성 유지

---

## UI 패키지 호환성 전략

### 1. 현재 상황

#### 1.1 의존성 구조
```json
{
  "dependencies": {
    "@hua-labs/motion": "workspace:*"
  }
}
```

#### 1.2 실제 사용
- **AdvancedPageTransition**: motion 훅을 사용하지 않음 (자체 구현)
- **빌드 설정**: external로 설정되어 번들에 포함되지 않음

### 2. 마이그레이션 전략

#### 2.1 단계별 접근

**1단계: 의존성 변경 (즉시 가능)**
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

**2단계: 선택적 의존성 (권장)**
- Core 컴포넌트: motion 불필요
- Advanced 컴포넌트: `@hua-labs/motion-core`만 필요
- 향후 Advanced 기능 사용 시: `@hua-labs/motion-advanced` 추가

**3단계: 완전 분리 (선택적)**
- Advanced 컴포넌트를 사용하지 않으면 motion 패키지 불필요
- peerDependency로 전환하여 선택적 설치 가능

#### 2.2 빌드 설정 업데이트

**현재 (`tsup.config.ts`)**:
```typescript
external: ['react', 'react-dom', 'clsx', 'tailwind-merge', '@hua-labs/motion', ...]
```

**변경 후**:
```typescript
external: [
  'react', 
  'react-dom', 
  'clsx', 
  'tailwind-merge', 
  '@hua-labs/motion-core',
  '@hua-labs/motion-advanced',
  ...
]
```

#### 2.3 Advanced 컴포넌트 개선 (선택적)

**현재**: `AdvancedPageTransition`이 자체 구현

**개선 옵션**:
1. **옵션 A**: motion-core 훅 활용
   ```tsx
   import { useFadeIn, useSlideUp } from '@hua-labs/motion-core'
   ```

2. **옵션 B**: 현재 구현 유지 (성능 최적화된 자체 구현)
   - 장점: 추가 의존성 없음
   - 단점: motion 패키지와의 일관성 부족

3. **옵션 C**: 하이브리드
   - 기본 기능은 자체 구현 유지
   - 고급 기능은 motion-advanced 활용

### 3. 호환성 보장

#### 3.1 타입 호환성
- Core와 Advanced의 타입이 일관되게 유지
- 통합 패키지가 타입 재export

#### 3.2 API 호환성
- 기존 `@hua-labs/motion` 사용 코드가 통합 패키지를 통해 계속 작동
- 점진적 마이그레이션 가능

---

## 마이그레이션 계획

### 1. 단계별 마이그레이션

#### Phase 1: 준비 단계 (1주)
- [ ] 현재 사용 현황 완전 파악
- [ ] 테스트 코드 작성/확인
- [ ] 문서화 완료

#### Phase 2: Core 패키지 정리 (1주)
- [ ] `hua-motion-core` 패키지 최종 정리
- [ ] 중복 기능 제거
- [ ] 테스트 커버리지 확인
- [ ] 문서 업데이트

#### Phase 3: Advanced 패키지 정리 (1주)
- [ ] `hua-motion-advanced` 패키지 최종 정리
- [ ] Core 의존성 확인
- [ ] 테스트 작성
- [ ] 문서 업데이트

#### Phase 4: 통합 패키지 재구성 (1주)
- [ ] `@hua-labs/motion`을 Core + Advanced 재export로 변경
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
- [ ] 릴리즈 노트 작성

### 2. 마이그레이션 체크리스트

#### 2.1 패키지 구조
- [ ] Core 패키지 기능 분류 완료
- [ ] Advanced 패키지 기능 분류 완료
- [ ] 통합 패키지 재구성 완료
- [ ] 패키지 간 의존성 명확화

#### 2.2 UI 패키지
- [ ] 의존성 변경 완료
- [ ] 빌드 설정 업데이트 완료
- [ ] 테스트 통과 확인
- [ ] 번들 크기 최적화 확인

#### 2.3 문서화
- [ ] 패키지별 README 작성
- [ ] 마이그레이션 가이드 작성
- [ ] API 문서 업데이트
- [ ] 예제 코드 업데이트

#### 2.4 테스트
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성
- [ ] 호환성 테스트 작성
- [ ] 성능 테스트 작성

---

## 구현 단계

### 1. 즉시 실행 가능한 작업

#### 1.1 문서화 완료 ✅
- 현재 상황 분석 문서 작성 (이 문서)
- 패키지 구조 명확화

#### 1.2 UI 패키지 의존성 변경
```bash
# package.json 수정
"@hua-labs/motion": "workspace:*"
→
"@hua-labs/motion-core": "workspace:*"
```

#### 1.3 빌드 설정 업데이트
```typescript
// tsup.config.ts
external: [
  // ...
  '@hua-labs/motion-core',
  '@hua-labs/motion-advanced'
]
```

### 2. 단기 작업 (1-2주)

#### 2.1 Core 패키지 정리
- 중복 기능 제거
- 테스트 커버리지 확인
- 문서 업데이트

#### 2.2 Advanced 패키지 정리
- Core 의존성 확인
- 테스트 작성
- 문서 업데이트

### 3. 중기 작업 (2-4주)

#### 3.1 통합 패키지 재구성
- Core + Advanced 재export
- 하위 호환성 보장
- 마이그레이션 가이드 작성

#### 3.2 UI 패키지 개선
- Advanced 컴포넌트에서 motion-core 활용 검토
- 번들 크기 최적화
- 성능 테스트

### 4. 장기 작업 (1-2개월)

#### 4.1 완전한 분리
- 통합 패키지 deprecated 처리
- 모든 프로젝트가 Core/Advanced 직접 사용
- 문서 및 예제 업데이트

#### 4.2 추가 기능 개발
- Enterprise 패키지 계획
- 플러그인 시스템
- 커뮤니티 피드백 반영

---

## 결론

### 핵심 전략
1. **명확한 분리**: Core (필수) vs Advanced (고급)
2. **점진적 마이그레이션**: 통합 패키지로 하위 호환성 유지
3. **UI 패키지 최적화**: 선택적 의존성으로 번들 크기 최소화
4. **개발자 경험**: 명확한 가이드와 단계별 학습 경로

### 다음 단계
1. 이 문서 검토 및 승인
2. Phase 1 시작 (준비 단계)
3. 단계별 구현 진행
4. 지속적인 피드백 수집 및 개선

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

