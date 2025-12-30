# @hua-labs/i18n-core-zustand 개선 제안

> 작성일: 2025-12-19  
> 작성자: sum-diary 프로젝트 적용 경험 기반

## 개요

sum-diary 프로젝트에서 `@hua-labs/i18n-core-zustand` 패키지를 적용하면서 발견한 개선 사항과 제안사항을 정리한 문서입니다.

## 발견된 이슈

### 1. 타입 안정성 개선 필요

**현재 문제:**
```typescript
// src/index.ts
export interface ZustandLanguageStore {
  language: string | 'ko' | 'en';  // ❌ 'ja'가 빠져있음
  setLanguage: (lang: string | 'ko' | 'en') => void;  // ❌ 'ja'가 빠져있음
}
```

**문제점:**
- 실제 사용 중인 언어 코드(`'ja'`)가 타입에 포함되지 않음
- 타입 안정성이 떨어짐
- 확장성이 제한적

**개선 제안:**
```typescript
// 제네릭 타입 지원으로 개선
export interface ZustandLanguageStore<L extends string = string> {
  language: L;
  setLanguage: (lang: L) => void;
}

// 또는 유니온 타입으로 확장 가능하게
export type SupportedLanguage = 'ko' | 'en' | 'ja';
export interface ZustandLanguageStore {
  language: SupportedLanguage | string;
  setLanguage: (lang: SupportedLanguage | string) => void;
}
```

### 2. document.documentElement.lang 업데이트 중복

**현재 문제:**
- `useAppStore`의 `setLanguage`에서 `document.documentElement.lang` 업데이트
- `LanguageSync` 컴포넌트에서도 동일한 작업 수행
- 중복 코드로 인한 유지보수 어려움

**개선 제안:**
- 패키지에서 `document.documentElement.lang` 자동 업데이트 옵션 제공
- 또는 사용자가 직접 관리하도록 명확히 문서화

```typescript
export interface ZustandI18nConfig {
  // ... 기존 옵션들
  autoUpdateHtmlLang?: boolean; // 기본값: true
}
```

### 3. 언어 코드 표준화

**현재 상태:**
- 코드에서 `'ja'` 사용 (ISO 639-1 표준 ✅)
- 일부 타입 정의에서 누락

**확인 사항:**
- ISO 639-1 표준: `ja` (Japanese) ✅
- ISO 3166-1 alpha-2: `jp` (Japan) ❌ (국가 코드, 언어 코드 아님)

**결론:** `ja`가 올바른 언어 코드입니다.

### 4. 에러 핸들링 개선

**현재 문제:**
- 언어 변경 실패 시 에러 처리 부족
- 네트워크 에러 시 fallback 동작 불명확

**개선 제안:**
```typescript
export interface ZustandI18nConfig {
  // ... 기존 옵션들
  onLanguageChangeError?: (error: Error, language: string) => void;
  fallbackOnError?: boolean; // 에러 시 이전 언어로 복구
}
```

### 5. SSR 하이드레이션 개선

**현재 문제:**
- 하이드레이션 로직이 복잡함
- 디버그 모드가 없으면 문제 파악 어려움

**개선 제안:**
- 하이드레이션 상태를 명확히 추적할 수 있는 API 제공
- 개발자 도구 또는 디버그 모드 개선

```typescript
export function useI18nHydrationStatus() {
  // 하이드레이션 상태 반환
  return {
    isHydrated: boolean;
    hydrationError: Error | null;
  };
}
```

## 제안된 개선 사항

### 우선순위 1: 타입 안정성 개선

**작업 내용:**
1. `ZustandLanguageStore` 인터페이스에 제네릭 타입 지원 추가
2. 기본 타입에 `'ja'` 포함
3. 타입 가드 함수 제공

**예상 효과:**
- 타입 안정성 향상
- IDE 자동완성 개선
- 런타임 에러 감소

### 우선순위 2: document.documentElement.lang 자동 관리

**작업 내용:**
1. `autoUpdateHtmlLang` 옵션 추가 (기본값: `true`)
2. 패키지 내부에서 자동으로 `document.documentElement.lang` 업데이트
3. 사용자는 `LanguageSync` 컴포넌트 불필요

**예상 효과:**
- 코드 중복 제거
- 사용자 편의성 향상
- 일관성 보장

### 우선순위 3: 에러 핸들링 강화

**작업 내용:**
1. 언어 변경 실패 시 에러 콜백 제공
2. 자동 fallback 옵션 추가
3. 에러 로깅 개선

**예상 효과:**
- 사용자 경험 개선
- 디버깅 용이성 향상
- 안정성 향상

### 우선순위 4: 개발자 경험 개선

**작업 내용:**
1. 하이드레이션 상태 추적 API 제공
2. 디버그 모드 개선 (더 자세한 로그)
3. 타입 가드 및 유틸리티 함수 추가

**예상 효과:**
- 개발 생산성 향상
- 문제 해결 시간 단축
- 문서화 개선

## 구현 예시

### 개선된 타입 정의

```typescript
// 제네릭 타입 지원
export interface ZustandLanguageStore<L extends string = string> {
  language: L;
  setLanguage: (lang: L) => void;
}

// 또는 유니온 타입
export type SupportedLanguage = 'ko' | 'en' | 'ja';
export interface ZustandLanguageStore {
  language: SupportedLanguage | string;
  setLanguage: (lang: SupportedLanguage | string) => void;
}

// 타입 가드
export function isSupportedLanguage(
  lang: string
): lang is SupportedLanguage {
  return ['ko', 'en', 'ja'].includes(lang);
}
```

### 개선된 설정 옵션

```typescript
export interface ZustandI18nConfig {
  // ... 기존 옵션들
  
  // HTML lang 속성 자동 업데이트
  autoUpdateHtmlLang?: boolean; // 기본값: true
  
  // 에러 핸들링
  onLanguageChangeError?: (error: Error, language: string) => void;
  fallbackOnError?: boolean; // 기본값: true
  
  // 하이드레이션
  hydrationTimeout?: number; // 기본값: 5000ms
}
```

### 개선된 사용 예시

```typescript
// lib/i18n-config.ts
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { useAppStore } from '@/app/store/useAppStore';

export const I18nProvider = createZustandI18n(useAppStore, {
  defaultLanguage: 'ko',
  fallbackLanguage: 'en',
  namespaces: ['common', 'navigation', 'footer', 'diary', 'analysis'],
  translationLoader: 'custom',
  loadTranslations,
  
  // 개선된 옵션들
  autoUpdateHtmlLang: true, // document.documentElement.lang 자동 업데이트
  onLanguageChangeError: (error, language) => {
    console.error(`Failed to change language to ${language}:`, error);
  },
  fallbackOnError: true, // 에러 시 이전 언어로 복구
  debug: process.env.NODE_ENV === 'development',
});
```

## 마이그레이션 가이드

### 기존 코드에서 개선된 코드로

**Before:**
```typescript
// store/useAppStore.ts
setLanguage: (language: 'ko' | 'en' | 'ja') => {
  set({ language });
  // 중복: document.documentElement.lang 업데이트
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
},
```

**After:**
```typescript
// store/useAppStore.ts
setLanguage: (language: 'ko' | 'en' | 'ja') => {
  set({ language });
  // 패키지에서 자동 처리하므로 제거 가능
},
```

**Before:**
```tsx
// layout.tsx
<I18nProvider>
  <LanguageSync /> {/* 중복 컴포넌트 */}
  {children}
</I18nProvider>
```

**After:**
```tsx
// layout.tsx
<I18nProvider>
  {/* LanguageSync 불필요 */}
  {children}
</I18nProvider>
```

## 테스트 시나리오

### 1. 타입 안정성 테스트
- [ ] `'ja'` 언어 코드 타입 체크 통과
- [ ] 제네릭 타입 지원 확인
- [ ] 타입 가드 함수 동작 확인

### 2. document.documentElement.lang 테스트
- [ ] 언어 변경 시 자동 업데이트 확인
- [ ] `autoUpdateHtmlLang: false` 시 업데이트 안 됨 확인
- [ ] SSR 환경에서도 정상 동작 확인

### 3. 에러 핸들링 테스트
- [ ] 네트워크 에러 시 fallback 동작 확인
- [ ] 에러 콜백 호출 확인
- [ ] 이전 언어로 복구 확인

### 4. 하이드레이션 테스트
- [ ] 하이드레이션 상태 추적 API 동작 확인
- [ ] 타임아웃 설정 동작 확인
- [ ] 디버그 모드 로그 확인

## 참고 자료

- [ISO 639-1 언어 코드](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [Next.js App Router 문서](https://nextjs.org/docs/app)

## 다음 단계

1. **타입 안정성 개선** (우선순위 1) - 즉시 구현 가능
2. **document.documentElement.lang 자동 관리** (우선순위 2) - 다음 버전
3. **에러 핸들링 강화** (우선순위 3) - 다음 버전
4. **개발자 경험 개선** (우선순위 4) - 지속적 개선

## 피드백

이 문서는 sum-diary 프로젝트 적용 경험을 바탕으로 작성되었습니다. 추가 개선 사항이나 피드백이 있으면 이슈로 등록해주세요.
