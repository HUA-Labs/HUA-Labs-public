# HUA Motion 패키지 재편 실행 계획

**작성일**: 2025-12-06  
**버전**: 1.0.0  
**상태**: 계획 단계

---

## 📋 목차

1. [재편 목표](#재편-목표)
2. [패키지 구조 설계](#패키지-구조-설계)
3. [의존성 규칙](#의존성-규칙)
4. [구현 단계](#구현-단계)
5. [문서화 계획](#문서화-계획)
6. [검증 체크리스트](#검증-체크리스트)

---

## 재편 목표

### 핵심 원칙: "필요한 만큼만 가져가는 모듈성"

1. **번들 크기 최소화**: 필요한 기능만 로드
2. **명확한 계층 구조**: Core → Advanced → All-in-One
3. **하위 호환성 유지**: 기존 코드와의 호환성 보장
4. **점진적 마이그레이션**: 단계별 전환 가능

### 목표 구조

```
HUA Application Framework 계층 구조:

┌─────────────────────────────────────┐
│  Product Layer (앱 레벨)            │
│  - motion-core (필수)               │
│  - motion-advanced (선택)           │
│  - ui (motion-core 의존)            │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  Framework Layer                    │
│  - @hua-labs/ui                     │
│  - @hua-labs/motion-core            │
│  - @hua-labs/motion-advanced        │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  Engine Layer                       │
│  - React                            │
└─────────────────────────────────────┘
```

---

## 패키지 구조 설계

### 1. `@hua-labs/motion-core` (필수 엔진)

#### 역할
- 모든 React 앱에 필요한 필수 모션 기능
- Zero Dependencies (React만 peer)
- 경량화된 핵심 기능

#### 포함 기능 (25개 훅)

**3단계 추상화 (3개)**:
- `useSimplePageMotion` - 프리셋 기반 (1단계)
- `usePageMotions` - 페이지 레벨 (2단계)
- `useSmartMotion` - 개별 요소 (3단계)

**기본 모션 (9개)**:
- `useFadeIn`, `useSlideUp`, `useSlideLeft`, `useSlideRight`
- `useScaleIn`, `useBounceIn`, `usePulse`
- `useSpringMotion`, `useGradient`

**인터랙션 (4개)**:
- `useHoverMotion`, `useClickToggle`, `useFocusToggle`, `useToggleMotion`

**스크롤 (3개)**:
- `useScrollReveal`, `useScrollProgress`, `useScrollToggle`

**유틸리티 (2개)**:
- `useMotionState`, `useRepeat`

**제스처 (2개)**:
- `useGesture`, `useGestureMotion`

**핵심 엔진 (3개)**:
- `MotionEngine`, `TransitionEffects`, `PerformanceOptimizer`

#### 의존성
```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "dependencies": {}
}
```

### 2. `@hua-labs/motion-advanced` (고급 기능)

#### 역할
- 복잡한 애니메이션과 고급 기능
- Core 패키지 기반 확장
- 선택적 사용

#### 포함 기능 (17개 훅)

**Auto 시리즈 (4개)**:
- `useAutoSlide`, `useAutoScale`, `useAutoFade`, `useAutoPlay`

**오케스트레이션 (3개)**:
- `useMotionOrchestra`, `useOrchestration`, `useSequence`

**고급 인터랙션 (7개)**:
- `useLayoutMotion`, `useKeyboardToggle`, `useScrollDirection`
- `useStickyToggle`, `useScrollToggle`, `useVisibilityToggle`, `useInteractive`

**기타 고급 기능 (3개)**:
- `usePerformanceMonitor`, `useLanguageAwareMotion`, `useGameLoop`

#### 의존성
```json
{
  "dependencies": {
    "@hua-labs/motion-core": "workspace:*"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

### 3. `@hua-labs/motion` (통합 패키지)

#### 역할
- Core + Advanced 단순 re-export
- 하위 호환성 제공
- 점진적 마이그레이션 지원

#### 구조
```typescript
// packages/hua-motion/src/index.ts
// Core 재export
export * from '@hua-labs/motion-core'

// Advanced 재export
export * from '@hua-labs/motion-advanced'
```

#### 의존성
```json
{
  "dependencies": {
    "@hua-labs/motion-core": "workspace:*",
    "@hua-labs/motion-advanced": "workspace:*"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

---

## 의존성 규칙

### 명시적 의존성 규칙

| From | To | 허용 여부 | 설명 |
|------|-----|---------|------|
| `@hua-labs/ui` | `@hua-labs/motion-core` | ✅ **가능** | UI 패키지의 필수 의존성 |
| `@hua-labs/ui` | `@hua-labs/motion-advanced` | ⚠️ **선택/peer** | 고급 기능이 필요한 경우만 |
| `@hua-labs/ui` | `@hua-labs/motion` | ❌ **권장X** | 통합 패키지는 사용하지 않음 |
| `@hua-labs/motion-advanced` | `@hua-labs/motion-core` | ✅ **가능** | Advanced는 Core 의존 |
| `@hua-labs/motion` | `@hua-labs/motion-core` | ✅ **가능** | 통합 패키지는 Core 재export |
| `@hua-labs/motion` | `@hua-labs/motion-advanced` | ✅ **가능** | 통합 패키지는 Advanced 재export |
| `@hua-labs/motion-core` | `@hua-labs/ui` | ❌ **불가** | 순환 의존성 방지 |
| `@hua-labs/motion-core` | `@hua-labs/motion-advanced` | ❌ **불가** | 역방향 의존성 방지 |
| 서브패키지 간 | 서브패키지 간 | ❌ **불가** | 서브패키지 간 직접 의존 금지 |

### UI 패키지 의존성 전략

#### 현재 (변경 전)
```json
{
  "dependencies": {
    "@hua-labs/motion": "workspace:*"
  }
}
```

#### 변경 후 (Phase 1)
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

#### 최종 목표 (Phase 2)
```json
{
  "peerDependencies": {
    "@hua-labs/motion-core": "*",
    "@hua-labs/motion-advanced": "*"
  }
}
```

**이유**:
- UI 패키지가 실제로 Motion을 사용하지 않음
- `AdvancedPageTransition`은 자체 구현
- 완전한 선택적 의존성으로 번들 크기 최소화

---

## 구현 단계

### Phase 1: 준비 및 검증 (1주)

#### 1.1 현재 상태 확인
- [ ] Core 패키지 기능 목록 확인
- [ ] Advanced 패키지 기능 목록 확인
- [ ] 통합 패키지 현재 구조 분석
- [ ] UI 패키지 실제 사용 현황 확인

#### 1.2 테스트 환경 구축
- [ ] 각 패키지별 테스트 실행
- [ ] 통합 테스트 시나리오 작성
- [ ] 번들 크기 측정 도구 설정

#### 1.3 문서 초안 작성
- [ ] Motion 패키지 도입 가이드 초안
- [ ] 의존성 규칙 문서 작성
- [ ] 마이그레이션 가이드 초안

### Phase 2: Core 패키지 정리 (1주)

#### 2.1 Core 패키지 검증
- [ ] 25개 훅 목록 최종 확인
- [ ] 중복 기능 제거
- [ ] 타입 정의 정리
- [ ] 테스트 커버리지 확인 (목표: 80%+)

#### 2.2 Core 패키지 문서화
- [ ] README 업데이트
- [ ] API 문서 작성
- [ ] 예제 코드 작성

#### 2.3 Core 패키지 배포 준비
- [ ] 빌드 설정 확인
- [ ] 패키지 버전 관리
- [ ] 배포 테스트

### Phase 3: Advanced 패키지 정리 (1주)

#### 3.1 Advanced 패키지 검증
- [ ] 17개 훅 목록 최종 확인
- [ ] Core 의존성 확인
- [ ] 타입 정의 정리
- [ ] 테스트 작성

#### 3.2 Advanced 패키지 문서화
- [ ] README 업데이트
- [ ] Core와의 차이점 명시
- [ ] 사용 시나리오 문서화

#### 3.3 Advanced 패키지 배포 준비
- [ ] 빌드 설정 확인
- [ ] 패키지 버전 관리
- [ ] 배포 테스트

### Phase 4: 통합 패키지 재구성 (1주)

#### 4.1 통합 패키지 재구성
- [ ] Core + Advanced re-export 구현
- [ ] 기존 export 구조 유지
- [ ] 하위 호환성 테스트

#### 4.2 통합 패키지 문서화
- [ ] README 업데이트 (하위 호환성 명시)
- [ ] 마이그레이션 가이드 작성
- [ ] deprecated 경고 추가 (선택적)

#### 4.3 통합 패키지 배포
- [ ] 빌드 설정 확인
- [ ] 버전 관리
- [ ] 배포 및 검증

### Phase 5: UI 패키지 마이그레이션 (1주)

#### 5.1 의존성 변경
- [ ] `package.json` 의존성 변경
- [ ] `tsup.config.ts` 빌드 설정 업데이트
- [ ] 타입 체크 확인

#### 5.2 빌드 및 테스트
- [ ] 빌드 테스트
- [ ] 단위 테스트 실행
- [ ] 통합 테스트 실행
- [ ] 번들 크기 측정 및 비교

#### 5.3 문서 업데이트
- [ ] UI 패키지 README 업데이트
- [ ] Motion 패키지 사용 가이드 작성
- [ ] 예제 코드 업데이트

### Phase 6: 문서화 및 정리 (1주)

#### 6.1 Motion 패키지 도입 가이드 작성
- [ ] Core vs Advanced 차이 설명
- [ ] 기능별 분류 가이드
- [ ] UI 패키지 의존성 설명
- [ ] 사용 예제 작성

#### 6.2 의존성 규칙 문서화
- [ ] 의존성 규칙 표 작성
- [ ] 각 규칙의 이유 설명
- [ ] 위반 시 문제점 설명

#### 6.3 마이그레이션 가이드 완성
- [ ] 단계별 마이그레이션 가이드
- [ ] 코드 예제 작성
- [ ] FAQ 작성

#### 6.4 최종 검증
- [ ] 모든 문서 검토
- [ ] 예제 코드 테스트
- [ ] 번들 크기 최종 확인

---

## 문서화 계획

### 1. Motion 패키지 도입 가이드

**위치**: `packages/hua-motion/docs/GETTING_STARTED.md`

**내용**:
- Core vs Advanced 차이
- 어떤 기능은 어디에 속하는지
- UI 패키지가 어떤 것만 의존하는지
- 설치 및 사용 가이드
- 예제 코드

### 2. 의존성 규칙 문서

**위치**: `packages/hua-motion/docs/DEPENDENCY_RULES.md`

**내용**:
- 명시적 의존성 규칙 표
- 각 규칙의 이유
- 위반 시 문제점
- 검증 방법

### 3. 마이그레이션 가이드

**위치**: `packages/hua-motion/docs/MIGRATION_GUIDE.md`

**내용**:
- 기존 코드 마이그레이션 방법
- 단계별 가이드
- 코드 예제
- FAQ

### 4. 아키텍처 문서 업데이트

**기존 문서 정리**:
- `ARCHITECTURE.md`: 전반적인 Philosophy + 계층 구조
- `PACKAGE_STRUCTURE.md`: 구체적 export / 파일 구조 정의
- `CURRENT_STATUS.md`: 현재 상황 분석
- `REFACTORING_STRATEGY.md`: 재편 전략

**추가 문서**:
- `GETTING_STARTED.md`: Motion 패키지 도입 가이드
- `DEPENDENCY_RULES.md`: 의존성 규칙
- `MIGRATION_GUIDE.md`: 마이그레이션 가이드

---

## 검증 체크리스트

### 패키지 구조 검증

- [ ] Core 패키지가 Zero Dependencies인지 확인
- [ ] Advanced 패키지가 Core만 의존하는지 확인
- [ ] 통합 패키지가 Core + Advanced를 re-export하는지 확인
- [ ] 순환 의존성이 없는지 확인

### UI 패키지 검증

- [ ] UI 패키지가 motion-core만 의존하는지 확인
- [ ] 빌드가 정상적으로 되는지 확인
- [ ] 번들 크기가 감소했는지 확인
- [ ] 타입 체크가 통과하는지 확인

### 하위 호환성 검증

- [ ] 기존 `@hua-labs/motion` 사용 코드가 작동하는지 확인
- [ ] 서브 엔트리 포인트(`/core`, `/page` 등)가 작동하는지 확인
- [ ] 타입 정의가 호환되는지 확인

### 문서화 검증

- [ ] 모든 문서가 작성되었는지 확인
- [ ] 예제 코드가 실제로 작동하는지 확인
- [ ] 문서 간 일관성이 있는지 확인

### 성능 검증

- [ ] 번들 크기 측정 및 비교
- [ ] 빌드 시간 측정
- [ ] 런타임 성능 테스트

---

## 예상 효과

### 번들 크기
- **UI 패키지**: Motion 통합 패키지 제거로 번들 크기 감소
- **선택적 로딩**: 필요한 기능만 로드 가능

### 개발자 경험
- **명확한 선택**: Core vs Advanced 명확한 구분
- **단계적 학습**: Core부터 시작하여 Advanced로 확장
- **유연한 의존성**: 필요한 것만 선택적으로 설치

### 유지보수성
- **명확한 책임**: 각 패키지의 역할이 명확
- **독립적 업데이트**: 패키지별 독립적 버전 관리
- **테스트 용이성**: 각 패키지별 독립적 테스트

### 생태계 확장
- **프레임워크 구조**: HUA Application Framework로 확장 가능
- **모듈성**: 필요한 만큼만 가져가는 구조
- **확장성**: 새로운 패키지 추가 용이

---

## 다음 단계

1. **이 계획 검토 및 승인**
2. **Phase 1 시작** (준비 및 검증)
3. **단계별 구현 진행**
4. **지속적인 피드백 수집 및 개선**

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

