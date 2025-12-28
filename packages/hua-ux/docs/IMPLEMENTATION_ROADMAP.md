# 구현 로드맵 (합리적 순서)

## 개요

상품화 전략을 바탕으로 **합리적인 순서**로 구현을 진행합니다.

## Phase 1: 기본 인프라 (즉시)

### 1.1 로컬 테스트 환경 구축 ✅

**목표**: 개발 중 빠른 테스트

**작업**:
- [x] CLI 도구 직접 실행 방법 문서화
- [x] 의존성 설치 가이드 추가
- [ ] 테스트 프로젝트 생성 스크립트

**완료 기준**: `npx tsx src/index.ts marketing-demo` 정상 작동

### 1.2 화이트 라벨링 기본 구조 ✅

**목표**: "숨다의 색깔을 쉽게 빼고, 다른 브랜드의 색깔을 입힐 수 있는 시스템"

**작업**:
- [x] `branding` 설정 타입 추가
- [x] CSS 변수 자동 생성 함수
- [x] Tailwind Config 자동 생성 함수
- [x] BrandingContext 구현
- [ ] 컴포넌트에서 branding 자동 적용 (Button, Card 등)

### 1.3 바이브 코딩 친화적 구조 ✅

**목표**: "AI가 내 마음을 읽어" - 바이브 코더를 위한 AI 친화적 설계

**작업**:
- [x] `.cursorrules` 자동 생성 (템플릿)
- [x] `ai-context.md` 자동 생성 (템플릿)
- [x] 한글 JSDoc 강화
- [x] `hua-ux.config.ts` 한글 주석 자동 추가
- [ ] HuaUxPage 확장 (한 파일에서 많은 것 결정)

**완료 기준**: 
```typescript
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',
  branding: {
    colors: { primary: '#FF0000' },
  },
});
// → 모든 Button이 빨간색으로 자동 변경
```

**우선순위**: 🥇 **최우선** (화이트 라벨링은 범용 프레임워크 필수)

## Phase 2: 상품화 기반 (Alpha → Beta)

### 2.1 라이선스 시스템 기본 구조

**목표**: Pro/Enterprise 기능 분리 준비

**작업**:
- [ ] 라이선스 타입 정의
- [ ] 라이선스 로더 (환경 변수, 설정 파일)
- [ ] 라이선스 검증 함수
- [ ] 에러 메시지 (구매 링크 포함)

**완료 기준**:
```typescript
if (checkLicense('motion-pro')) {
  // Pro 기능 사용
}
```

**우선순위**: 🥈 **높음** (플러그인 시스템의 기반)

### 2.2 플러그인 시스템 기본 구조

**목표**: 모듈화된 구조로 유료 기능 분리

**작업**:
- [ ] 플러그인 인터페이스 정의
- [ ] 플러그인 레지스트리 구현
- [ ] 플러그인 등록/로드 로직
- [ ] 설정 파일에서 플러그인 지정

**완료 기준**:
```typescript
// hua-ux.config.ts
export default defineConfig({
  plugins: [motionProPlugin],
});
```

**우선순위**: 🥈 **높음** (모션 Pro의 기반)

## Phase 3: 첫 번째 상품화 (Beta)

### 3.1 모션 Pro 플러그인

**목표**: 모션 시스템을 Free/Pro로 분리

**작업**:
- [ ] `@hua-labs/motion-core/pro` 패키지 생성
- [ ] Pro 기능 구현 (parallax, 3D transforms)
- [ ] 라이선스 검증 통합
- [ ] 문서화

**완료 기준**:
```typescript
// Free
import { useFadeIn } from '@hua-labs/motion-core';

// Pro
import { useParallax } from '@hua-labs/motion-core/pro';
```

**우선순위**: 🥇 **최우선** (차별화 포인트, 검증됨)

### 3.2 i18n Pro 기능

**목표**: CDN 로더, 번역 관리 대시보드

**작업**:
- [ ] CDN 로더 구현
- [ ] 번역 관리 대시보드 (별도 서비스)
- [ ] 자동 번역 API 연동

**완료 기준**:
```typescript
i18n: {
  translationLoader: 'cdn',
  cdnUrl: 'https://cdn.example.com/translations',
}
```

**우선순위**: 🥈 **높음** (고통의 산물, 시장 수요)

## Phase 4: 확장 (Beta → Stable)

### 4.1 프리셋 마켓플레이스

**목표**: 커뮤니티 프리셋, 유료 프리셋

**작업**:
- [ ] 프리셋 플러그인 시스템
- [ ] 프리셋 검증 및 배포
- [ ] 프리셋 마켓플레이스 웹사이트

**우선순위**: 🥉 **중간**

### 4.2 기술 지원 자동화

**목표**: AI 친화적 문서, 자동화 도구

**작업**:
- [ ] 설정 검증 도구 (`pnpm hua-ux validate`)
- [ ] 의존성 체크 도구
- [ ] 마이그레이션 가이드 자동 생성

**우선순위**: 🥉 **중간**

## 구현 순서 요약

### 즉시 (이번 주)

1. ✅ 로컬 테스트 환경 구축
2. 🥇 **화이트 라벨링 기본 구조** (최우선)
3. 🥈 라이선스 시스템 기본 구조

### 다음 주 (Alpha → Beta)

4. 🥈 플러그인 시스템 기본 구조
5. 🥇 **모션 Pro 플러그인** (최우선 상품화)

### 그 다음 (Beta → Stable)

6. 🥈 i18n Pro 기능
7. 🥉 프리셋 마켓플레이스
8. 🥉 기술 지원 자동화

## 참고 자료

- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [플러그인 시스템 설계](./PLUGIN_SYSTEM_DESIGN.md)
- [설정 시스템 설계](./CONFIG_SYSTEM_DESIGN.md)
