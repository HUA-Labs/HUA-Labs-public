# @hua-labs/i18n-loaders 개선 제안

> 작성일: 2025-12-19  
> 작성자: sum-diary 프로젝트 적용 경험 기반

## 개요

sum-diary 프로젝트에서 `@hua-labs/i18n-loaders` 패키지를 적용하면서 발견한 개선 사항과 제안사항을 정리한 문서입니다.

## 발견된 이슈

### 1. 캐시 무효화 전략 개선

**현재 문제:**
- TTL 기반 캐시만 제공
- 특정 언어/네임스페이스만 무효화하는 기능 부재
- 개발 중 번역 파일 변경 시 캐시 클리어 불편

**개선 제안:**
```typescript
interface ApiLoaderOptions {
  // ... 기존 옵션들
  
  // 캐시 무효화 전략
  cacheInvalidation?: {
    // 특정 언어/네임스페이스 무효화 함수 제공
    invalidate?: (language?: string, namespace?: string) => void;
    // 전체 캐시 클리어 함수 제공
    clear?: () => void;
  };
  
  // 개발 모드에서 자동 무효화
  autoInvalidateInDev?: boolean; // 기본값: true
}
```

### 2. 에러 타입 구분 개선

**현재 문제:**
- 모든 에러를 동일하게 처리
- 네트워크 에러와 파싱 에러 구분 불가
- 사용자 친화적 에러 메시지 부족

**개선 제안:**
```typescript
// 커스텀 에러 타입
export class TranslationLoadError extends Error {
  constructor(
    public language: string,
    public namespace: string,
    public cause: unknown,
    public type: 'network' | 'parse' | 'not-found' | 'unknown'
  ) {
    super(`Failed to load translation: ${language}/${namespace}`);
    this.name = 'TranslationLoadError';
  }
}

// 에러 타입별 처리
function isRetryableError(error: unknown): boolean {
  if (error instanceof TranslationLoadError) {
    return error.type === 'network';
  }
  // 기존 로직...
}
```

### 3. 로딩 상태 추적

**현재 문제:**
- 번역 로딩 중인지 확인 불가
- 로딩 상태를 UI에 반영하기 어려움

**개선 제안:**
```typescript
interface ApiLoaderOptions {
  // ... 기존 옵션들
  
  // 로딩 상태 콜백
  onLoadingStart?: (language: string, namespace: string) => void;
  onLoadingComplete?: (language: string, namespace: string) => void;
  onLoadingError?: (language: string, namespace: string, error: Error) => void;
}

// 또는 로딩 상태 추적 API
export function createApiTranslationLoaderWithStatus(
  options?: ApiLoaderOptions
): {
  loader: TranslationLoader;
  getLoadingState: () => Map<string, boolean>; // language:namespace -> loading
  isLoading: (language: string, namespace: string) => boolean;
}
```

### 4. 요청 우선순위

**현재 문제:**
- 모든 번역 요청이 동일한 우선순위
- 중요한 네임스페이스(`common`)를 먼저 로드할 수 없음

**개선 제안:**
```typescript
interface ApiLoaderOptions {
  // ... 기존 옵션들
  
  // 네임스페이스 우선순위
  namespacePriority?: Record<string, number>; // 높을수록 우선순위 높음
  
  // 동시 요청 제한
  maxConcurrentRequests?: number; // 기본값: 무제한
}
```

### 5. 오프라인 지원

**현재 문제:**
- 네트워크 오프라인 시 에러만 발생
- 이전에 로드한 번역을 사용할 수 없음

**개선 제안:**
```typescript
interface ApiLoaderOptions {
  // ... 기존 옵션들
  
  // 오프라인 모드
  offlineMode?: boolean; // 기본값: false
  offlineStorage?: {
    // IndexedDB 또는 localStorage 사용
    type: 'indexeddb' | 'localstorage';
    // 오프라인 저장소에서 로드
    loadFromOffline?: (language: string, namespace: string) => Promise<TranslationRecord | null>;
    // 오프라인 저장소에 저장
    saveToOffline?: (language: string, namespace: string, data: TranslationRecord) => Promise<void>;
  };
}
```

## 제안된 개선 사항

### 우선순위 1: 캐시 무효화 전략

**작업 내용:**
1. 특정 언어/네임스페이스 캐시 무효화 함수 제공
2. 전체 캐시 클리어 함수 제공
3. 개발 모드 자동 무효화 옵션

**예상 효과:**
- 개발 생산성 향상
- 캐시 관리 용이
- 디버깅 편의성 향상

### 우선순위 2: 에러 타입 구분

**작업 내용:**
1. 커스텀 에러 클래스 도입
2. 에러 타입별 처리 로직 개선
3. 사용자 친화적 에러 메시지

**예상 효과:**
- 에러 처리 정확도 향상
- 디버깅 용이성 향상
- 사용자 경험 개선

### 우선순위 3: 로딩 상태 추적

**작업 내용:**
1. 로딩 상태 콜백 제공
2. 로딩 상태 조회 API 제공
3. React Hook으로 래핑

**예상 효과:**
- UI 반응성 향상
- 사용자 경험 개선
- 로딩 인디케이터 구현 용이

### 우선순위 4: 요청 우선순위

**작업 내용:**
1. 네임스페이스 우선순위 설정
2. 동시 요청 제한 옵션
3. 요청 큐 관리

**예상 효과:**
- 초기 로딩 시간 단축
- 네트워크 리소스 효율적 사용
- 사용자 경험 개선

### 우선순위 5: 오프라인 지원

**작업 내용:**
1. IndexedDB 또는 localStorage 기반 오프라인 저장소
2. 오프라인 모드 감지
3. 오프라인 저장소에서 자동 로드

**예상 효과:**
- 오프라인 환경에서도 앱 사용 가능
- 네트워크 부하 감소
- 사용자 경험 개선

## 구현 예시

### 개선된 캐시 무효화

```typescript
const loader = createApiTranslationLoader({
  translationApiPath: '/api/translations',
  cacheTtlMs: 60_000,
  
  // 캐시 무효화
  cacheInvalidation: {
    invalidate: (language, namespace) => {
      // 특정 언어/네임스페이스만 무효화
      const cacheKey = namespace 
        ? `${language}:${namespace}` 
        : `${language}:*`;
      // 캐시에서 제거
    },
    clear: () => {
      // 전체 캐시 클리어
    }
  },
  
  // 개발 모드 자동 무효화
  autoInvalidateInDev: true,
});
```

### 개선된 에러 처리

```typescript
try {
  const translations = await loader('ko', 'common');
} catch (error) {
  if (error instanceof TranslationLoadError) {
    switch (error.type) {
      case 'network':
        // 네트워크 에러 처리
        console.error('Network error:', error);
        break;
      case 'parse':
        // 파싱 에러 처리
        console.error('Parse error:', error);
        break;
      case 'not-found':
        // 404 에러 처리
        console.error('Translation not found:', error);
        break;
    }
  }
}
```

### 로딩 상태 추적

```typescript
const { loader, isLoading, getLoadingState } = createApiTranslationLoaderWithStatus({
  translationApiPath: '/api/translations',
  onLoadingStart: (lang, ns) => {
    console.log(`Loading ${lang}/${ns}...`);
  },
  onLoadingComplete: (lang, ns) => {
    console.log(`Loaded ${lang}/${ns}`);
  },
});

// 사용
if (isLoading('ko', 'common')) {
  return <LoadingSpinner />;
}

const loadingState = getLoadingState();
// Map { 'ko:common' => true, 'ko:navigation' => false }
```

## 테스트 시나리오

### 1. 캐시 무효화 테스트
- [ ] 특정 언어/네임스페이스 무효화 확인
- [ ] 전체 캐시 클리어 확인
- [ ] 개발 모드 자동 무효화 확인

### 2. 에러 타입 구분 테스트
- [ ] 네트워크 에러 타입 확인
- [ ] 파싱 에러 타입 확인
- [ ] 404 에러 타입 확인

### 3. 로딩 상태 추적 테스트
- [ ] 로딩 시작 콜백 호출 확인
- [ ] 로딩 완료 콜백 호출 확인
- [ ] 로딩 상태 조회 API 동작 확인

### 4. 요청 우선순위 테스트
- [ ] 우선순위 높은 네임스페이스 먼저 로드 확인
- [ ] 동시 요청 제한 동작 확인

### 5. 오프라인 지원 테스트
- [ ] 오프라인 모드 감지 확인
- [ ] 오프라인 저장소에서 로드 확인
- [ ] 오프라인 저장소에 저장 확인

## 참고 자료

- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 다음 단계

1. **캐시 무효화 전략** (우선순위 1) - 즉시 구현 가능
2. **에러 타입 구분** (우선순위 2) - 다음 버전
3. **로딩 상태 추적** (우선순위 3) - 다음 버전
4. **요청 우선순위** (우선순위 4) - 지속적 개선
5. **오프라인 지원** (우선순위 5) - 장기 계획

## 피드백

이 문서는 sum-diary 프로젝트 적용 경험을 바탕으로 작성되었습니다. 추가 개선 사항이나 피드백이 있으면 이슈로 등록해주세요.
