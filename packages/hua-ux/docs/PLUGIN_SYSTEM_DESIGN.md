# 플러그인 시스템 설계

## 개요

hua-ux를 **캐시워크**로 만들기 위한 플러그인 시스템 설계입니다.

**목표**: 
- 코어는 무료, 프리미엄은 플러그인
- 모듈화된 구조로 유료 기능 분리
- 화이트 라벨링 완벽 지원

## 플러그인 타입

### 1. 기능 플러그인 (Feature Plugins)

고급 기능을 추가하는 플러그인

**예시**:
- `@hua-labs/motion-core/pro` - 고급 모션
- `@hua-labs/i18n-core/pro` - CDN 로더, 번역 관리
- `@hua-labs/analytics` - 분석 도구 통합

### 2. 프리셋 플러그인 (Preset Plugins)

새로운 프리셋을 추가하는 플러그인

**예시**:
- `@hua-labs/preset-ecommerce` - 전자상거래 프리셋
- `@hua-labs/preset-dashboard` - 대시보드 프리셋
- `@hua-labs/preset-blog` - 블로그 프리셋

### 3. 브랜딩 플러그인 (Branding Plugins)

화이트 라벨링을 위한 브랜드 테마

**예시**:
- `@hua-labs/branding-custom` - 커스텀 브랜딩
- `@hua-labs/branding-enterprise` - 엔터프라이즈 브랜딩

## 플러그인 인터페이스

### 기본 구조

```typescript
// packages/hua-ux/src/plugins/types.ts
import type { ZodSchema } from 'zod';
import type { HuaUxConfig } from '../types';

export interface HuaUxPlugin {
  /**
   * 플러그인 이름
   */
  name: string;
  
  /**
   * 플러그인 버전
   */
  version: string;
  
  /**
   * 라이선스 타입
   */
  license: 'free' | 'pro' | 'enterprise';
  
  /**
   * 플러그인 초기화
   */
  init(config: HuaUxConfig): void;
  
  /**
   * 컴포넌트 확장
   */
  components?: Record<string, React.ComponentType<any>>;
  
  /**
   * 훅 확장
   */
  hooks?: Record<string, Function>;
  
  /**
   * 설정 스키마 확장
   */
  configSchema?: ZodSchema;
  
  /**
   * 라이선스 검증
   */
  checkLicense?(): boolean;
}
```

### 플러그인 등록

```typescript
// packages/hua-ux/src/framework/plugins/registry.ts
class PluginRegistry {
  private plugins: Map<string, HuaUxPlugin> = new Map();
  
  register(plugin: HuaUxPlugin): void {
    // 라이선스 검증
    if (plugin.license !== 'free' && !plugin.checkLicense?.()) {
      throw new Error(
        `[hua-ux] Plugin "${plugin.name}" requires a valid license. ` +
        `Please purchase a ${plugin.license} license.`
      );
    }
    
    this.plugins.set(plugin.name, plugin);
  }
  
  get(name: string): HuaUxPlugin | undefined {
    return this.plugins.get(name);
  }
  
  getAll(): HuaUxPlugin[] {
    return Array.from(this.plugins.values());
  }
}

export const pluginRegistry = new PluginRegistry();
```

### 플러그인 사용

```typescript
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';
import { motionProPlugin } from '@hua-labs/motion-core/pro';
import { i18nProPlugin } from '@hua-labs/i18n-core/pro';

export default defineConfig({
  preset: 'product',
  
  // 플러그인 등록
  plugins: [
    motionProPlugin,
    i18nProPlugin,
  ],
  
  // 플러그인별 설정
  motion: {
    pro: {
      enableParallax: true,
      enable3D: false,
    },
  },
  
  i18n: {
    pro: {
      cdnUrl: 'https://cdn.example.com/translations',
      autoUpdate: true,
    },
  },
});
```

## 라이선스 시스템

### 라이선스 타입

```typescript
// packages/hua-ux/src/framework/license/types.ts
export interface LicenseInfo {
  type: 'free' | 'pro' | 'enterprise';
  valid: boolean;
  expiresAt?: Date;
  features: string[];
  companyName?: string;
  apiKey?: string;
}

export interface LicenseCheckResult {
  valid: boolean;
  reason?: string;
  expiresAt?: Date;
}
```

### 라이선스 검증

```typescript
// packages/hua-ux/src/framework/license/index.ts
export function checkLicense(feature: string): boolean {
  const license = getLicense();
  
  if (!license.valid) {
    return false;
  }
  
  if (license.expiresAt && license.expiresAt < new Date()) {
    return false;
  }
  
  return license.features.includes(feature) || license.type === 'enterprise';
}

export function requireLicense(feature: string): void {
  if (!checkLicense(feature)) {
    throw new Error(
      `[hua-ux] Feature "${feature}" requires a valid license. ` +
      `Please purchase a Pro or Enterprise license. ` +
      `Visit https://hua-labs.com/pricing for more information.`
    );
  }
}
```

### 라이선스 로드

```typescript
// packages/hua-ux/src/framework/license/loader.ts
export function loadLicense(): LicenseInfo {
  // 1. 환경 변수에서 API 키 확인
  const apiKey = process.env.HUA_UX_LICENSE_KEY;
  if (apiKey) {
    return validateLicenseKey(apiKey);
  }
  
  // 2. 설정 파일에서 확인
  const config = getConfig();
  if (config.license?.apiKey) {
    return validateLicenseKey(config.license.apiKey);
  }
  
  // 3. 기본값: Free
  return {
    type: 'free',
    valid: true,
    features: ['core', 'motion-basic', 'i18n-basic'],
  };
}
```

## 화이트 라벨링 구현

### 브랜딩 설정

```typescript
// packages/hua-ux/src/framework/types/index.ts
export interface HuaUxConfig {
  // ... 기존 설정
  
  /**
   * 브랜딩 설정 (화이트 라벨링)
   */
  branding?: {
    /**
     * 회사/서비스 이름
     */
    name?: string;
    
    /**
     * 로고 경로
     */
    logo?: string;
    
    /**
     * 색상 팔레트
     */
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      success?: string;
      warning?: string;
      error?: string;
      info?: string;
    };
    
    /**
     * 타이포그래피
     */
    typography?: {
      fontFamily?: string[];
      fontSize?: {
        h1?: string;
        h2?: string;
        h3?: string;
        body?: string;
      };
    };
    
    /**
     * 커스텀 CSS 변수
     */
    customVariables?: Record<string, string>;
  };
}
```

### CSS 변수 자동 생성

```typescript
// packages/hua-ux/src/framework/branding/css-vars.ts
export function generateCSSVariables(branding: BrandingConfig): string {
  const vars: string[] = [];
  
  // 색상 변수
  if (branding.colors) {
    Object.entries(branding.colors).forEach(([key, value]) => {
      vars.push(`  --color-${key}: ${value};`);
    });
  }
  
  // 타이포그래피 변수
  if (branding.typography) {
    if (branding.typography.fontFamily) {
      vars.push(`  --font-family: ${branding.typography.fontFamily.join(', ')};`);
    }
    if (branding.typography.fontSize) {
      Object.entries(branding.typography.fontSize).forEach(([key, value]) => {
        vars.push(`  --font-size-${key}: ${value};`);
      });
    }
  }
  
  // 커스텀 변수
  if (branding.customVariables) {
    Object.entries(branding.customVariables).forEach(([key, value]) => {
      vars.push(`  --${key}: ${value};`);
    });
  }
  
  return `:root {\n${vars.join('\n')}\n}`;
}
```

### Tailwind Config 자동 생성

```typescript
// packages/hua-ux/src/framework/branding/tailwind-config.ts
export function generateTailwindConfig(branding: BrandingConfig): object {
  return {
    theme: {
      extend: {
        colors: branding.colors ? {
          primary: branding.colors.primary,
          secondary: branding.colors.secondary,
          // ...
        } : {},
        fontFamily: branding.typography?.fontFamily ? {
          sans: branding.typography.fontFamily,
        } : {},
      },
    },
  };
}
```

## 예시: 모션 Pro 플러그인

```typescript
// packages/hua-motion-core-pro/src/index.ts
import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework/plugins';
import { checkLicense } from '@hua-labs/hua-ux/framework/license';

export const motionProPlugin: HuaUxPlugin = {
  name: '@hua-labs/motion-core/pro',
  version: '1.0.0',
  license: 'pro',
  
  init(config) {
    // 라이선스 검증
    if (!checkLicense('motion-pro')) {
      console.warn(
        '[hua-ux] Motion Pro features require a Pro license. ' +
        'Falling back to free features.'
      );
      return;
    }
    
    // Pro 기능 초기화
    // ...
  },
  
  hooks: {
    useParallax: requireLicense('motion-pro') ? useParallax : undefined,
    use3DTransform: requireLicense('motion-pro') ? use3DTransform : undefined,
  },
  
  checkLicense() {
    return checkLicense('motion-pro');
  },
};
```

## 다음 단계

### Phase 1: 기본 구조
- [ ] 플러그인 인터페이스 정의
- [ ] 플러그인 레지스트리 구현
- [ ] 라이선스 시스템 기본 구조

### Phase 2: 화이트 라벨링
- [ ] 브랜딩 설정 추가
- [ ] CSS 변수 자동 생성
- [ ] Tailwind Config 자동 생성

### Phase 3: 첫 번째 Pro 플러그인
- [ ] 모션 Pro 플러그인 구현
- [ ] 라이선스 검증 통합
- [ ] 문서화

## 참고 자료

- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [설정 시스템 설계](./CONFIG_SYSTEM_DESIGN.md)
