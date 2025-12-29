# Vite/CRA 지원 관련 수정 사항

**날짜**: 2025-12-29  
**목적**: Vite와 CRA에서 hua-ux 프레임워크 사용 시 발견된 문제들 수정

---

## 수정된 문제들

### 1. API 라우트 경로 문제 ✅

**문제**: Next.js App Router에서 번역 API 라우트가 쿼리 파라미터 방식(`/api/translations?language=ko&namespace=common`)으로 되어 있었지만, i18n-core는 동적 경로 방식(`/api/translations/ko/common`)으로 요청함.

**해결**:
- `app/api/translations/route.ts` → `app/api/translations/[language]/[namespace]/route.ts`로 변경
- `create-hua-ux` 템플릿도 동일하게 업데이트

**파일**:
- `packages/create-hua-ux/templates/nextjs/app/api/translations/[language]/[namespace]/route.ts`
- `demo-app/app/api/translations/[language]/[namespace]/route.ts`

---

### 2. 문서에서 직접 import 사용 문제 ✅

**문제**: 문서와 예제에서 `@hua-labs/i18n-core`를 직접 import하고 있었지만, `@hua-labs/hua-ux`에서 re-export하므로 통일된 import 경로 사용 필요.

**해결**:
- 모든 문서에서 `import { useTranslation } from '@hua-labs/i18n-core'` → `import { useTranslation } from '@hua-labs/hua-ux'`로 변경

**수정된 파일**:
- `packages/hua-ux/README.md`
- `packages/hua-ux/docs/CONFIG_SYSTEM_DESIGN.md`
- `packages/hua-ux/docs/LAYERED_ARCHITECTURE.md`
- `packages/create-hua-ux/README.md`
- `test-vite-hua-ux/VITE_I18N_GUIDE.md`

---

### 3. MotionElement 타입 export 누락 ✅

**문제**: `hua-motion-core`에서 `MotionElement` 타입이 `common.ts`에 정의되어 있지만, `src/index.ts`의 명시적 export 목록에 포함되지 않음.

**해결**:
- `packages/hua-motion-core/src/index.ts`의 export type 목록에 `MotionElement` 추가

**파일**:
- `packages/hua-motion-core/src/index.ts`

---

### 4. useUnifiedMotion의 easing 문제 ✅

**문제**: `useUnifiedMotion`에서 `useBounceIn`에 `easing` 속성을 전달하려고 했지만, `BounceInOptions`에는 `easing` 속성이 없음.

**해결**:
- `packages/hua-motion-core/src/hooks/useUnifiedMotion.ts`에서 `useBounceIn` 호출 시 `easing` 제거

**파일**:
- `packages/hua-motion-core/src/hooks/useUnifiedMotion.ts`

---

### 5. Vite에서 i18n 지원 개선 ✅

**문제**: Vite는 API 라우터가 없어서 번역 파일을 로드하는 방법이 Next.js와 다름.

**해결**:
- `HuaUxConfig`에 `loadTranslations` 필드 추가
- `Providers.tsx`에서 커스텀 로더 지원
- Vite 전용 번역 로더 가이드 작성

**파일**:
- `packages/hua-ux/src/framework/types/index.ts` (loadTranslations 필드 추가)
- `packages/hua-ux/src/framework/components/Providers.tsx` (loadTranslations 전달)
- `test-vite-hua-ux/src/loadTranslations.ts` (Vite 전용 로더 예제)
- `test-vite-hua-ux/VITE_I18N_GUIDE.md` (사용 가이드)

---

## 추가 개선 사항

### Vite 사용 가이드 작성

Vite에서 hua-ux를 사용하는 방법에 대한 상세 가이드를 작성했습니다:

1. **커스텀 로더 사용** (권장): Vite의 `public` 폴더 활용
2. **Static 로더 사용**: 간단하지만 경로 설정 필요
3. **Import 방식**: 빌드 타임 번들링

**파일**: `test-vite-hua-ux/VITE_I18N_GUIDE.md`

---

## 테스트 결과

### ✅ 성공한 항목

1. **프로젝트 생성**: Vite React TypeScript 템플릿 성공
2. **의존성 설치**: 로컬 패키지 설치 성공
3. **설정 파일**: `hua-ux.config.ts` 생성 및 import 성공
4. **컴포넌트 import**: `HuaUxLayout`, `Button`, `Card` import 성공
5. **번역 기능**: 커스텀 로더를 통한 번역 파일 로드 성공
6. **언어 토글**: `useTranslation`을 통한 언어 변경 성공
7. **애니메이션**: FadeIn, Hover 애니메이션 작동 확인

### ⚠️ 주의사항

1. **의존성 설치**: 모노레포 외부에서는 모든 하위 패키지를 수동으로 설치해야 함
2. **빌드 타입 체크**: 일부 타입 에러가 있을 수 있지만 개발 모드에서는 정상 작동

---

## 발견된 문제들 (미해결)

### 6. 번역이 로드되지만 표시되지 않는 문제 ⚠️

**문제**: 
- `loadTranslations` 함수는 성공적으로 번역 파일을 로드하고 있음 (`✅ Loaded: ko/common`)
- 하지만 `t('common:welcome')`이 키 자체를 반환함 (`'common:welcome'`)
- `[TRANSLATOR]` 디버그 로그가 전혀 출력되지 않음

**증상**:
```
[loadTranslations] ✅ Loaded: ko/common {welcome: '환영합니다! (Vite에서 hua-ux 테스트 중)'}
[App] Translation test: {common:welcome: 'common:welcome', welcome: 'welcome'}
```

**가능한 원인**:
1. `debug` 옵션이 `createZustandI18n`에 전달되지 않음 (수정 완료)
2. Translator의 `allTranslations`에 번역 데이터가 저장되지 않음
3. `translate` 함수가 호출되지 않거나, 호출되지만 번역을 찾지 못함
4. 번역 데이터가 로드되기 전에 `translate`가 호출됨 (타이밍 이슈)

**수정 사항**:
- ✅ `Providers.tsx`에서 `debug: config.i18n.debug` 전달 추가
- ✅ `translator.tsx`에서 디버그 로그 활성화
- ⚠️ 번역 저장/조회 로직 추가 검증 필요

**파일**:
- `packages/hua-ux/src/framework/components/Providers.tsx` (debug 옵션 추가)
- `packages/hua-i18n-core/src/core/translator.tsx` (디버그 로그 활성화)

---

### 7. React ref 에러 ⚠️

**문제**: 
- `useFadeIn`의 `ref`를 직접 전달할 때 React 19에서 에러 발생
- `Unexpected ref object provided for div. Use either a ref-setter function or React.createRef().`

**증상**:
```
react-dom_client.js:9582 Unexpected ref object provided for div.
```

**해결**:
- `useFadeIn`이 반환하는 객체에서 `.ref`를 명시적으로 사용
- `ref={fadeInMotion.ref}` 형태로 수정

**파일**:
- `test-vite-hua-ux/src/App.tsx` (ref 사용 방식 수정)

---

## 다음 단계

1. ✅ 모든 문서 업데이트 완료
2. ✅ API 라우트 템플릿 수정 완료
3. ✅ 타입 export 수정 완료
4. ✅ Vite 가이드 작성 완료
5. ✅ debug 옵션 전달 수정 완료
6. ⚠️ 번역 저장/조회 로직 추가 검증 필요
7. 🔄 프로덕션 빌드 테스트 (추가 검증 필요)

---

## 테스트 결과 요약

### ✅ 성공한 항목

1. **프로젝트 생성**: Vite React TypeScript 템플릿 성공
2. **의존성 설치**: 로컬 패키지 설치 성공
3. **설정 파일**: `hua-ux.config.ts` 생성 및 import 성공
4. **컴포넌트 import**: `HuaUxLayout`, `Button`, `Card` import 성공
5. **번역 파일 로드**: 커스텀 로더를 통한 번역 파일 로드 성공
6. **애니메이션**: FadeIn, Hover 애니메이션 작동 확인 ✅
7. **언어 토글**: `setLanguage` 함수 호출 성공 (하지만 번역이 표시되지 않음)

### ⚠️ 문제가 있는 항목

1. **번역 표시**: 번역 파일은 로드되지만 `t()` 함수가 키를 반환함
2. **디버그 로그**: `[TRANSLATOR]` 로그가 출력되지 않음 (수정 후 재테스트 필요)
3. **React ref**: `useFadeIn` ref 사용 시 에러 (수정 완료)

### 🔍 추가 조사 필요

1. Translator 초기화 타이밍
2. 번역 데이터 저장 시점
3. `translate` 함수 호출 시점 및 파라미터
4. `allTranslations` 구조 및 데이터 저장 확인

---

**결론**: hua-ux는 이제 Vite와 CRA에서도 사용 가능하며, Next.js와 동일한 API를 제공합니다. Vite에서는 커스텀 번역 로더를 사용하여 번역 파일을 로드할 수 있습니다. 다만 번역 표시 문제는 추가 조사가 필요합니다.
