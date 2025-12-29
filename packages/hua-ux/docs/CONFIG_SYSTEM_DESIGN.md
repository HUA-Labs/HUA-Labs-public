# 설정 시스템 설계 (범용 프레임워크용)

## 개요

범용 프레임워크로 나가기 위한 `hua-ux.config.ts` 설정 시스템 설계입니다.

## 설계 원칙

### 1. Zero-Config 우선
- 설정 파일이 없어도 동작
- Preset 하나만 선택하면 대부분 해결
- 점진적 설정 (기본값 → Preset → 커스텀)

### 2. 선언적 설정
- "무엇을 할 것인가"를 선언
- "어떻게 할 것인가"는 프레임워크가 결정
- 개발자 결정 최소화

### 3. Escape Hatch
- 모든 기능을 끌 수 있음
- 순수 Next.js로 돌아갈 수 있음
- 하이브리드 사용 가능

## 설정 구조 (4개 레이어)

### 1. Core (기본 정보)

```typescript
{
  preset: 'product' | 'marketing' | 'dashboard' | 'minimal',
  strictMode: boolean,  // 파일 구조 검증 강도
}
```

**설명**:
- `preset`: 가장 중요한 설정. 이것 하나로 대부분 결정됨
- `strictMode`: 프레임워크 규칙 위반 시 빌드 에러 발생 여부

### 2. UI & UX (감도 설정)

```typescript
{
  theme: {
    mode: 'class' | 'media' | 'none',  // 다크모드 전략
    colors: {
      primary: string,  // Tailwind 색상 이름 또는 hex
      // ... 또는 Preset 색상 사용
    },
  },
  motion: {
    preset: 'high-performance' | 'balanced' | 'luxury',
    // 또는 Preset의 motion 사용
  },
  typography: {
    fontStack: string[],  // 기본 폰트 스택
    // 또는 Preset 타이포그래피 사용
  },
}
```

**설명**:
- Preset을 선택하면 대부분 자동 설정
- 필요시 일부만 커스터마이징

### 3. Features (기능 모듈)

```typescript
{
  i18n: {
    locales: string[],
    defaultLocale: string,
    strategy: 'sub-domain' | 'path' | 'cookie' | 'header',
    // ... 기존 설정
  },
  state: {
    persistence: 'localStorage' | 'sessionStorage' | 'none',
    ssr: boolean,
  },
  analytics: {
    provider: 'ga4' | 'amplitude' | 'pixel' | 'custom',
    key?: string,  // API 키 (선택적)
  },
}
```

**설명**:
- 각 기능을 독립적으로 켜고 끌 수 있음
- 사용하지 않는 기능은 아예 포함되지 않음 (Tree-shaking)

### 4. Infrastructure (환경 설정)

```typescript
{
  runtime: 'nodejs' | 'edge' | 'auto',
  security: {
    csp: boolean,  // CSP 헤더 자동 설정
    middleware: boolean,  // 보안 미들웨어 활성화
  },
}
```

**설명**:
- 런타임에 따라 자동으로 최적화
- Edge Runtime 제약 자동 처리

## 설정 예시

### 최소 설정 (Preset만)

```typescript
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  preset: 'product',
  // 끝! 나머지는 모두 기본값
});
```

### 중간 설정 (Preset + 일부 커스터마이징)

```typescript
export default defineConfig({
  preset: 'product',
  i18n: {
    locales: ['ko', 'en', 'ja'],  // Marketing은 2개 언어만 지원
    defaultLocale: 'ko',
  },
  analytics: {
    provider: 'ga4',
    key: process.env.GA4_KEY,
  },
});
```

### 고급 설정 (완전 커스터마이징)

```typescript
export default defineConfig({
  // Preset 없이 모든 설정 직접
  theme: {
    mode: 'class',
    colors: {
      primary: '#3B82F6',  // 커스텀 색상
    },
  },
  motion: {
    preset: 'balanced',
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    strategy: 'path',
  },
  // ...
});
```

## 구현 계획

### Phase 1: Preset 기반 설정

```typescript
// packages/hua-ux/src/framework/config/schema.ts
export interface HuaUxConfig {
  // Core
  preset?: 'product' | 'marketing' | 'dashboard' | 'minimal';
  strictMode?: boolean;
  
  // UI & UX (Preset에서 가져오거나 커스터마이징)
  theme?: {
    mode?: 'class' | 'media' | 'none';
    colors?: {
      primary?: string;
      // ...
    };
  };
  motion?: {
    preset?: 'high-performance' | 'balanced' | 'luxury';
    // 또는 Preset motion 사용
  };
  
  // Features
  i18n?: { /* ... */ };
  state?: { /* ... */ };
  analytics?: { /* ... */ };
  
  // Infrastructure
  runtime?: 'nodejs' | 'edge' | 'auto';
  security?: { /* ... */ };
}
```

### Phase 2: Preset 병합 로직

```typescript
// packages/hua-ux/src/framework/config/merge.ts
export function mergePresetWithConfig(
  preset: Preset,
  userConfig: Partial<HuaUxConfig>
): HuaUxConfig {
  // Preset 기본값 + 사용자 설정 병합
  // 사용자 설정이 우선
  return {
    ...preset,
    ...userConfig,
    // 깊은 병합 (nested objects)
  };
}
```

### Phase 3: Zero-Config 지원

```typescript
// packages/hua-ux/src/framework/config/index.ts
export function loadConfig(): HuaUxConfig {
  // 1. 설정 파일 로드 시도
  // 2. 없으면 Preset 기본값 (product)
  // 3. Preset도 없으면 최소 기본값
  return defaultConfig;
}
```

## Escape Hatch 설계

### 1. 컴포넌트 레벨 Opt-out

```typescript
// HuaUxPage를 안 쓰고 순수 Next.js
export default function Page() {
  return <div>Content</div>;  // 프레임워크 없이
}

// 또는 일부만 사용
import { useTranslation } from '@hua-labs/hua-ux';
export default function Page() {
  const { t } = useTranslation();
  return <div>{t('welcome')}</div>;  // i18n만 사용
}
```

### 2. 설정 레벨 Opt-out

```typescript
export default defineConfig({
  preset: 'product',
  motion: {
    enableAnimations: false,  // 모션 끄기
  },
  i18n: undefined,  // i18n 안 쓰기
});
```

### 3. Provider 레벨 Opt-out

```typescript
// HuaUxLayout 대신 필요한 Provider만 직접 사용
import { I18nProvider } from './lib/i18n-setup';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <I18nProvider>{children}</I18nProvider>
        {/* 다른 Provider는 안 씀 */}
      </body>
    </html>
  );
}
```

## 타입 안전성

### Zod 스키마로 런타임 검증

```typescript
import { z } from 'zod';

const configSchema = z.object({
  preset: z.enum(['product', 'marketing', 'dashboard', 'minimal']).optional(),
  strictMode: z.boolean().optional(),
  // ...
});

export function validateConfig(config: unknown): HuaUxConfig {
  return configSchema.parse(config);
}
```

### TypeScript로 컴파일 타임 검증

```typescript
export function defineConfig<T extends Partial<HuaUxConfig>>(
  config: T
): HuaUxConfig {
  // 타입 체크 + 런타임 검증
  return validateConfig(config);
}
```

## 문서화

### JSDoc으로 자동완성 지원

```typescript
/**
 * Define framework configuration
 * 
 * @param config.preset - Preset to use ('product' | 'marketing' | ...)
 *   - 'product': Professional, efficient (default)
 *   - 'marketing': Dramatic, eye-catching
 *   - 'dashboard': Data-focused, minimal motion
 *   - 'minimal': Bare minimum, maximum performance
 * 
 * @example
 * ```ts
 * export default defineConfig({
 *   preset: 'product',
 * });
 * ```
 */
export function defineConfig(config: Partial<HuaUxConfig>): HuaUxConfig {
  // ...
}
```

## 참고 자료

- [아키텍처 리스크 분석](./ARCHITECTURE_RISKS.md)
- [개발자 결정 최소화 전략](./DEVELOPER_DECISION_MINIMIZATION.md)
