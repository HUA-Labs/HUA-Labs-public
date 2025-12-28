# 플러그인 예시

## 기본 플러그인 구조

플러그인을 만들 때는 다음 구조를 따르세요:

```typescript
// packages/my-plugin/src/index.ts
import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework';

export const myPlugin: HuaUxPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  license: 'free', // 또는 'pro', 'enterprise'
  
  description: 'My awesome plugin',
  
  init(config) {
    // 플러그인 초기화 로직
    console.log('My plugin initialized!', config);
  },
  
  components: {
    // 컴포넌트 확장
    MyComponent: MyComponent,
  },
  
  hooks: {
    // 훅 확장
    useMyHook: useMyHook,
  },
  
  // Pro/Enterprise 플러그인의 경우
  checkLicense() {
    const { hasLicense } = require('@hua-labs/hua-ux/framework');
    return hasLicense('my-plugin-feature');
  },
};
```

## 사용 예시

### 1. 설정 파일에서 플러그인 등록

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
  
  // 라이선스 설정 (Pro 플러그인 사용 시)
  license: {
    apiKey: process.env.HUA_UX_LICENSE_KEY,
  },
});
```

### 2. 런타임에 플러그인 등록

```typescript
// app/layout.tsx
import { registerPlugin } from '@hua-labs/hua-ux/framework';
import { myPlugin } from './plugins/my-plugin';

// 플러그인 등록
registerPlugin(myPlugin);
```

### 3. 플러그인에서 제공하는 컴포넌트 사용

```typescript
// app/page.tsx
import { getPlugin } from '@hua-labs/hua-ux/framework';

export default function Page() {
  const motionPro = getPlugin('motion-pro');
  const ParallaxScroll = motionPro?.components?.ParallaxScroll;
  
  if (!ParallaxScroll) {
    return <div>Motion Pro plugin not available</div>;
  }
  
  return <ParallaxScroll>Content</ParallaxScroll>;
}
```

## 플러그인 타입별 예시

### 기능 플러그인 (Feature Plugin)

```typescript
// motion-pro-plugin.ts
import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework';
import { ParallaxScroll } from './components/ParallaxScroll';
import { useParallax } from './hooks/useParallax';

export const motionProPlugin: HuaUxPlugin = {
  name: 'motion-pro',
  version: '1.0.0',
  license: 'pro',
  
  description: 'Advanced motion features (parallax, 3D transforms)',
  
  init(config) {
    // Pro 기능 초기화
    if (config.motion?.pro) {
      // Pro 설정 적용
    }
  },
  
  components: {
    ParallaxScroll,
    Motion3D,
  },
  
  hooks: {
    useParallax,
    useMotion3D,
  },
  
  checkLicense() {
    const { hasLicense } = require('@hua-labs/hua-ux/framework');
    return hasLicense('motion-pro');
  },
};
```

### 프리셋 플러그인 (Preset Plugin)

```typescript
// ecommerce-preset-plugin.ts
import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework';

export const ecommercePresetPlugin: HuaUxPlugin = {
  name: 'preset-ecommerce',
  version: '1.0.0',
  license: 'pro',
  
  description: 'E-commerce preset with shopping cart, checkout flows',
  
  init(config) {
    // E-commerce 프리셋 설정 적용
    // (향후 프리셋 시스템 확장 시 구현)
  },
  
  checkLicense() {
    const { hasLicense } = require('@hua-labs/hua-ux/framework');
    return hasLicense('preset-pro');
  },
};
```

## 라이선스 검증

Pro/Enterprise 플러그인은 라이선스 검증이 필요합니다:

```typescript
export const proPlugin: HuaUxPlugin = {
  name: 'pro-plugin',
  version: '1.0.0',
  license: 'pro',
  
  checkLicense() {
    const { hasLicense } = require('@hua-labs/hua-ux/framework');
    return hasLicense('pro-plugin-feature');
  },
  
  init(config) {
    // 라이선스가 없으면 에러 발생
    if (!this.checkLicense?.()) {
      throw new Error('Pro license required');
    }
    
    // Pro 기능 초기화
  },
};
```

## 참고 자료

- [플러그인 시스템 설계](./PLUGIN_SYSTEM_DESIGN.md)
- [라이선스 시스템](../src/framework/license/README.md)
