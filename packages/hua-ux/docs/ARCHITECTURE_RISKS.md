# 아키텍처 리스크 분석

## 개요

제미나이 리뷰와 코드베이스 분석을 바탕으로 한 아키텍처 리스크 및 대응 방안입니다.

## 🔴 위험도 높음

### 1. Next.js 업데이트 의존성

**현재 상태**:
- `HuaUxLayout`이 Next.js App Router 구조에 의존
- `HuaUxPage`가 Next.js 메타데이터 처리 방식에 의존
- 설정 파일 로더가 아직 동적 import 미구현 (TODO 상태)

**위험 시나리오**:
- Next.js 17에서 App Router 구조 변경 시 `HuaUxLayout` 전체 수정 필요
- 서버 컴포넌트 처리 방식 변경 시 프레임워크 레이어 전면 수정

**대응 방안**:
- ✅ **Escape Hatch 제공**: `HuaUxLayout` 없이도 `UnifiedProviders`만 사용 가능
- ✅ **최소 추상화**: Next.js의 핵심 기능만 감싸고, 나머지는 그대로 노출
- ⏳ **버전 호환성 체크**: Next.js 버전별 호환성 검증 도구

**코드 확인**:
```typescript
// packages/hua-ux/src/framework/components/HuaUxLayout.tsx
// 현재는 단순히 UnifiedProviders를 감싸는 수준
// → Escape Hatch 이미 존재 (UnifiedProviders 직접 사용 가능)
```

### 2. 추상화 누수 (Abstraction Leak)

**현재 상태**:
- `HuaUxPage`가 `<title>`, `<meta>` 태그를 직접 렌더링
- Next.js의 메타데이터 API를 우회하는 방식
- `enableMotion`으로 일부 제어 가능하지만 완전한 우회 어려움

**위험 시나리오**:
- 특정 페이지에서 프레임워크 규칙을 완전히 우회해야 할 때
- Next.js의 새로운 메타데이터 API를 사용하고 싶을 때

**대응 방안**:
- ✅ **선택적 사용**: `HuaUxPage`를 안 쓰고 일반 Next.js 페이지로 작성 가능
- ⏳ **Opt-out 옵션**: `HuaUxPage`에 `disableFramework={true}` 옵션 추가
- ⏳ **하이브리드 지원**: 일부 페이지만 프레임워크 사용, 나머지는 순수 Next.js

**코드 확인**:
```typescript
// packages/hua-ux/src/framework/components/HuaUxPage.tsx
// <title>, <meta> 태그를 직접 렌더링
// → Next.js의 metadata API와 충돌 가능성
```

### 3. 상태 관리 복합도

**현재 상태**:
- `@hua-labs/state`가 Zustand + Persist + SSR + i18n 통합
- 하이드레이션 에러 추적이 어려울 수 있음
- 레이어가 겹쳐 있어 디버깅 난이도 증가

**위험 시나리오**:
- 하이드레이션 에러 발생 시 어느 레이어 문제인지 파악 어려움
- i18n 번역 데이터와 Zustand 상태가 충돌할 때

**대응 방안**:
- ✅ **명확한 에러 메시지**: 각 레이어별 에러 메시지 구분
- ⏳ **디버그 모드**: 개발 모드에서 각 레이어 상태 로깅
- ⏳ **단계적 통합**: 각 기능을 독립적으로 사용 가능하게

**코드 확인**:
```typescript
// packages/hua-state/src/store/create-store.ts
// Zustand + Persist 통합
// → 하이드레이션 에러 시 추적 어려움
```

## 🟡 위험도 중간

### 4. Edge Runtime 제약

**현재 상태**:
- 미들웨어에 Edge Runtime 경고 추가됨
- `.example` 파일로 선택적 사용
- 하지만 프레임워크 기능이 많아질수록 제약 증가

**위험 시나리오**:
- 프레임워크 기능이 Edge Runtime과 호환되지 않는 API 사용
- 사용자가 Edge Runtime 제약을 모르고 사용하다가 에러

**대응 방안**:
- ✅ **명시적 경고**: 문서와 코드에 Edge Runtime 제약 명시
- ✅ **선택적 사용**: 미들웨어를 안 써도 동작하도록 설계
- ⏳ **런타임 체크**: Edge Runtime에서 사용 불가능한 기능 자동 감지

### 5. 설정 파일 복잡도

**현재 상태**:
- `defineConfig`로 타입 안전성 제공
- 하지만 설정 항목이 많아질수록 복잡도 증가
- Zero-config 지원 부족 (설정 파일 없으면 기본값 사용)

**위험 시나리오**:
- 설정이 너무 복잡해서 사용자가 포기
- "5분 안에 프로젝트 생성" 목표와 상충

**대응 방안**:
- ✅ **Zero-config**: 설정 파일 없어도 동작
- ⏳ **Preset 우선**: 설정보다 Preset 선택으로 대부분 해결
- ⏳ **점진적 설정**: 기본값 → Preset → 커스텀 설정

## 🟢 위험도 낮음 (하지만 주의)

### 6. 범용성 vs 특수성

**현재 상태**:
- 내부 서비스(숨다)에 최적화된 구조
- 범용 프레임워크로 나가기엔 일부 제약

**대응 방안**:
- ⏳ **설정으로 제어**: 모든 기능을 설정으로 켜고 끌 수 있게
- ⏳ **모듈화**: 필요한 기능만 선택적으로 사용

## 종합 평가

### 현재 추상화 수준: **적절함** ✅

**이유**:
1. **최소 추상화**: Next.js를 깊게 감싸지 않고 필요한 부분만 감쌈
2. **Escape Hatch 존재**: `UnifiedProviders` 직접 사용 가능
3. **선택적 사용**: `HuaUxPage`를 안 써도 됨

### 위험도: **중간** ⚠️

**이유**:
1. Next.js 업데이트 대응 필요
2. 설정 시스템 확장 필요
3. 디버깅 도구 부족

### 범용 프레임워크 전환 가능성: **높음** ✅

**이유**:
1. 현재 구조가 이미 범용적
2. 설정 시스템만 확장하면 됨
3. Escape Hatch로 유연성 확보 가능

## 권장 사항

### 즉시 개선 (Alpha → Beta)

1. **Escape Hatch 명확화**
   - `UnifiedProviders` 직접 사용 가이드
   - `HuaUxPage` 없이도 동작하는 방법 문서화

2. **설정 시스템 확장**
   - Preset 기반 설정 (설정 파일 최소화)
   - Zero-config 완벽 지원

3. **에러 메시지 개선**
   - 각 레이어별 명확한 에러 메시지
   - 디버그 모드 추가

### 중기 개선 (Beta → Stable)

1. **버전 호환성 체크**
   - Next.js 버전별 호환성 검증
   - 자동 마이그레이션 가이드

2. **디버깅 도구**
   - 개발 모드 상태 로깅
   - 하이드레이션 에러 추적 도구

3. **문서화 강화**
   - Edge Runtime 제약 상세 설명
   - 문제 해결 가이드

## 결론

**현재 구조는 범용 프레임워크로 나가기에 적합합니다.**

**이유**:
- 추상화 수준이 적절함 (너무 깊지 않음)
- Escape Hatch 존재
- 설정 시스템 확장 가능

**주의할 점**:
- Next.js 업데이트 대응 계획 필요
- 설정 복잡도 관리 필요
- 디버깅 도구 강화 필요

**다음 단계**:
1. 설정 시스템 확장 (Preset 기반)
2. Escape Hatch 문서화
3. 에러 처리 개선
