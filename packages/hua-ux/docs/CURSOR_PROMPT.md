# Cursor IDE 전용 프롬프트 가이드

## Context

우리는 Next.js 16/React 19 기반의 **커스텀 메타 프레임워크** `@hua-labs/hua-ux`를 만들고 있습니다.

**목표**: 'Vibe Coding' 환경에서 도구 전문가들이 기술적 복잡성 없이 고도화된 UI/UX/i18n을 구현할 수 있도록 하는 것

**현재 상태**: Alpha 단계 완료, Beta로 넘어가기 전 설정 시스템 설계 필요

**중요한 제약사항**:
- 범용 프레임워크로 나갈 계획 (내부 서비스뿐만 아니라 외부 사용자도 대상)
- Next.js 업데이트 대응 필요
- Escape Hatch 필수 (프레임워크를 벗어날 수 있어야 함)

## Task

범용 프레임워크로서의 확장을 위해 `hua-ux.config.ts` 설정 시스템을 설계하고 구현해주세요.

## 요구 사항

### 1. Strict Typing
- `defineConfig` 유틸리티로 완벽한 자동완성과 타입 체크 지원
- IntelliSense에서 각 설정의 의미와 예시 확인 가능

### 2. Modular Schema
- 설정을 **Core, UI, Features, Infrastructure** 4개 레이어로 분리
- 각 항목은 **Zod**를 사용하여 런타임/빌드타임에 검증
- Preset 기반 설정 (설정 파일 최소화)

### 3. Smart Defaults
- 사용자가 최소한의 설정(예: `preset: 'product'`)만 해도 동작
- **Zero-config**: 설정 파일 없어도 기본값으로 동작
- Preset 선택으로 대부분 해결

### 4. Edge Awareness
- `runtime: 'edge'` 설정 시, Node.js 전용 API를 사용하는 모듈이 포함되지 않도록
- Tree-shaking이나 조건부 export 전략
- Edge Runtime 제약 자동 처리

### 5. Escape Hatch
- 모든 기능을 끌 수 있음
- 순수 Next.js로 돌아갈 수 있음
- 하이브리드 사용 가능 (일부만 프레임워크 사용)

### 6. Documentation
- 설정 항목 위에 **JSDoc** 상세히 작성
- Cursor 내에서 마우스를 올렸을 때 각 설정의 의미와 예시 표시
- Preset별 차이점 명확히 설명

## 결과물

1. **설정 스키마**: `packages/hua-ux/src/framework/config/schema.ts`
   - Zod 스키마 정의
   - 타입 정의 확장

2. **설정 로더**: `packages/hua-ux/src/framework/config/index.ts`
   - Preset 병합 로직
   - Zero-config 지원
   - 동적 설정 파일 로드

3. **Preset 병합**: `packages/hua-ux/src/framework/config/merge.ts`
   - Preset + 사용자 설정 병합
   - 깊은 병합 (nested objects)

4. **예시 파일**: `packages/create-hua-ux/templates/nextjs/hua-ux.config.ts`
   - 최소 설정 예시
   - 중간 설정 예시
   - 고급 설정 예시

5. **문서**: 설정 시스템 사용 가이드

## 참고할 기존 코드

- `packages/hua-ux/src/framework/config/schema.ts` - 현재 기본 스키마
- `packages/hua-ux/src/framework/config/index.ts` - 현재 로더
- `packages/hua-ux/src/presets/product.ts` - Product Preset
- `packages/hua-ux/src/presets/marketing.ts` - Marketing Preset

## 주의사항

1. **추상화 누수 방지**: Next.js를 깊게 감싸지 말 것
2. **유연성 확보**: 모든 기능을 선택적으로 사용 가능
3. **에러 메시지**: 명확하고 해결 방법 제시
4. **성능**: 설정 로드가 빌드/런타임에 영향을 주지 않도록

## 검증 체크리스트

구현 후 다음을 확인:

- [ ] 설정 파일 없어도 동작하는가? (Zero-config)
- [ ] Preset만 선택해도 동작하는가?
- [ ] 모든 설정을 끌 수 있는가? (Escape Hatch)
- [ ] 타입 안전성이 보장되는가?
- [ ] Edge Runtime에서도 동작하는가?
- [ ] JSDoc이 충분히 상세한가?
