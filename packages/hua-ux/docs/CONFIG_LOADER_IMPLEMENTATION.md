# 설정 로더 구현 완료

## 구현 내용

제미나이 리뷰와 커서의 제안을 바탕으로 Preset 병합 로직과 동적 Config 로더를 구현했습니다.

## 구현된 기능

### 1. Preset 병합 로직 (`merge.ts`)

**깊은 병합 (Deep Merge)**:
- 중첩된 객체를 재귀적으로 병합
- 사용자 설정이 Preset 설정보다 우선
- `undefined`는 병합에서 제외 (명시적으로 끄기)

**Preset 변환**:
- Preset 구조를 `HuaUxConfig` 형식으로 자동 변환
- Preset의 motion, spacing, i18n 설정을 Config로 매핑

**두 가지 병합 방식**:
1. `mergePresetWithConfig`: Preset + 사용자 설정 병합
2. `createConfigFromUserConfig`: Preset 없이 사용자 설정만 사용

### 2. 동적 Config 로더 (`index.ts`)

**로드 순서**:
1. `hua-ux.config.ts` 시도
2. `hua-ux.config.js` 시도
3. `hua-ux.config.mjs` 시도
4. 없으면 기본값 (product preset)

**Zero-Config 지원**:
- 설정 파일이 없어도 기본값으로 동작
- 에러가 아닌 경고만 출력

**환경 인식**:
- Node.js 환경(빌드 타임)에서만 동적 로드
- 브라우저/Edge Runtime에서는 캐시된 설정 사용

### 3. 타입 확장 (`types/index.ts`)

**Preset 필드 추가**:
```typescript
export interface HuaUxConfig {
  preset?: 'product' | 'marketing';  // 새로 추가
  // ...
}
```

### 4. 검증 개선 (`schema.ts`)

**명확한 에러 메시지**:
- Preset 검증
- i18n 검증
- 해결 방법 제시

## 사용 예시

### 최소 설정 (Preset만)

```typescript
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  preset: 'product',  // 끝! 나머지는 자동 설정
});
```

### Preset + 일부 커스터마이징

```typescript
export default defineConfig({
  preset: 'product',
  i18n: {
    supportedLanguages: ['ko', 'en', 'ja'],  // 언어만 추가
  },
});
```

### 완전 커스터마이징 (Preset 없이)

```typescript
export default defineConfig({
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    // ...
  },
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
  },
  // ...
});
```

## 다음 단계

### 개선 필요 사항

1. **TypeScript 설정 파일 로드**
   - 현재는 `.js` 파일만 로드 가능
   - Next.js 빌드 과정에서 TypeScript 파일 처리 필요
   - 또는 `ts-node` 사용 고려

2. **설정 파일 감지 개선**
   - `fs.existsSync` 대신 더 안전한 방법
   - Next.js의 설정 로더 활용 고려

3. **에러 처리 강화**
   - 설정 파일 문법 오류 시 명확한 메시지
   - 설정 파일 경로 표시

### 테스트 필요

1. **Zero-Config 테스트**
   - 설정 파일 없이 프로젝트 생성
   - 기본값으로 정상 동작 확인

2. **Preset 병합 테스트**
   - Preset + 사용자 설정 병합 확인
   - 깊은 병합이 올바르게 동작하는지 확인

3. **동적 로더 테스트**
   - 설정 파일 로드 성공/실패 케이스
   - 다양한 환경(Node.js, 브라우저, Edge Runtime) 테스트

## 참고 자료

- [설정 시스템 설계](./CONFIG_SYSTEM_DESIGN.md)
- [아키텍처 리스크 분석](./ARCHITECTURE_RISKS.md)
- [코드베이스 리뷰](./CODEBASE_REVIEW.md)
