# 타입 오류 패턴

**작성일**: 2025-12-06  
**목적**: 자주 발생하는 TypeScript 타입 오류와 해결 방법 정리

---

## 1. React 이벤트 핸들러 타입 오류

### 문제 상황

React 이벤트 핸들러에 타입이 지정되지 않아 TypeScript 오류 발생

```typescript
// ❌ 타입 오류
const handleChange = (e) => {
  // ...
}
```

### 원인 분석

TypeScript strict mode에서 이벤트 핸들러에 명시적 타입 지정 필요

### 해결 방법

```typescript
// ✅ 해결된 코드
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // ...
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // ...
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // ...
}
```

### 예방 방법

- React 이벤트 핸들러는 항상 명시적 타입 지정
- 공통 이벤트 핸들러 타입 정의 파일 생성 고려

### 관련 데브로그

- [DEVLOG_2025-11-30_BUILD_AND_LINT_FIXES.md](../devlogs/DEVLOG_2025-11-30_BUILD_AND_LINT_FIXES.md)

---

## 2. Supabase 쿼리 타입 추론 실패

### 문제 상황

Supabase 쿼리 결과에서 `Type 'never'` 오류 발생

```typescript
// ❌ 타입 오류
const { data } = await supabase
  .from('users')
  .select('*')
  .single();
// data의 타입이 never로 추론됨
```

### 원인 분석

TypeScript가 복잡한 Supabase 쿼리 결과 타입을 추론하지 못함

### 해결 방법

#### 명시적 타입 어노테이션

```typescript
// ✅ 해결된 코드
const { data } = await supabase
  .from('users')
  .select('*')
  .single() as { data: User | null };

// 또는
interface User {
  id: string;
  name: string;
  // ...
}

const { data } = await supabase
  .from('users')
  .select('*')
  .single() as { data: User | null };
```

#### 명시적 타입 정의 (권장 해결책) ✅

```typescript
// ✅ 권장: 명시적 타입 정의
interface ApiKey {
  id: string;
  key: string;
  user_id: string;
}

const { data: keyData } = await supabase
  .from('api_keys')
  .select('id, user_id')
  .eq('key', apiKey)
  .single() as { data: ApiKey | null };

if (keyData) {
  const apiKeyId = keyData.id; // 타입 안전
  const userId = keyData.user_id; // 타입 안전
}
```

**실제 적용 사례**:
- `apps/sum-api/types/supabase.ts`: 공통 타입 정의 파일 생성
- `apps/sum-api/lib/common/rate-limiter.ts`: 모든 `as any` 제거 완료
- `apps/sum-api/lib/services/notification-service.ts`: Notification 타입 적용
- `apps/sum-api/lib/services/credit-service.ts`: User, Transaction 타입 적용

### 예방 방법

- Supabase 타입 생성 도구 활용 검토
- 공통 타입 정의 파일 생성 (`types/supabase.ts`)
- 복잡한 쿼리는 타입을 명시적으로 정의
- `as any` 사용 금지, 항상 명시적 타입 정의 사용

### 관련 데브로그

- [DEVLOG_2025-12-04_VERCEL_BUILD_ERROR_FIX.md](../devlogs/DEVLOG_2025-12-04_VERCEL_BUILD_ERROR_FIX.md)

---

## 3. React.cloneElement 타입 오류

### 문제 상황

`React.cloneElement`에서 스프레드 연산자 사용 시 타입 오류 발생

```typescript
// ❌ 타입 오류
React.cloneElement(child, {
  ...child.props,
  // ...
})
```

### 원인 분석

TypeScript가 `child.props`의 타입을 정확히 추론하지 못함

### 해결 방법

#### Partial 타입 사용

```typescript
// ✅ 해결된 코드
React.cloneElement(child, {
  ...(child.props as Partial<typeof child.props>),
  // ...
})
```

#### 타입 가드 사용

```typescript
// ✅ 해결된 코드
if (React.isValidElement(child)) {
  React.cloneElement(child, {
    ...child.props,
    // ...
  } as Partial<typeof child.props>)
}
```

### 예방 방법

- `React.cloneElement` 사용 시 타입을 명시적으로 정의
- 공통 유틸리티 함수로 추상화

### 관련 데브로그

- [DEVLOG_2025-12-05_UI_PACKAGE_IMPROVEMENT.md](../devlogs/DEVLOG_2025-12-05_UI_PACKAGE_IMPROVEMENT.md)

---

## 4. forwardRef 타입 오류

### 문제 상황

`React.forwardRef`와 `React.memo`를 함께 사용할 때 타입 오류 발생

```typescript
// ❌ 타입 오류
export const Icon = React.memo(
  React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    // ...
  })
);
```

### 원인 분석

`React.memo`와 `React.forwardRef`의 타입 시그니처가 충돌

### 해결 방법

#### 내부 컴포넌트 분리

```typescript
// ✅ 해결된 코드
const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    // ...
  }
);

IconComponent.displayName = 'Icon';

export const Icon = React.memo(IconComponent, (prevProps, nextProps) => {
  // 커스텀 비교 함수
  return prevProps.name === nextProps.name && prevProps.size === nextProps.size;
}) as typeof IconComponent;
```

### 예방 방법

- `forwardRef`와 `memo`를 함께 사용할 때는 내부 컴포넌트를 분리
- 타입 단언을 사용하여 타입 시그니처 보존

### 관련 데브로그

- [DEVLOG_2025-12-06_UI_PACKAGE_IMPROVEMENT.md](../devlogs/DEVLOG_2025-12-06_UI_PACKAGE_IMPROVEMENT.md)

---

## 5. 사용하지 않는 변수 타입 오류

### 문제 상황

사용하지 않는 변수나 파라미터로 인한 TypeScript/ESLint 경고

### 원인 분석

TypeScript strict mode에서 사용하지 않는 변수는 오류로 처리됨

### 해결 방법

#### 언더스코어 접두사 사용

```typescript
// ✅ 해결된 코드
function handleEvent(_event: Event) {
  // event를 사용하지 않지만 타입은 필요
}

// 또는
const { unused, ...rest } = data;
```

#### 주석 처리 (향후 사용 예정)

```typescript
// ✅ 해결된 코드
// const language = 'ko'; // 향후 사용 예정
```

### 예방 방법

- 사용하지 않는 변수는 즉시 제거
- 향후 사용 예정인 경우 주석으로 명시
- ESLint 규칙으로 일관된 처리

### 관련 데브로그

- [DEVLOG_2025-11-30_BUILD_AND_LINT_FIXES.md](../devlogs/DEVLOG_2025-11-30_BUILD_AND_LINT_FIXES.md)

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

