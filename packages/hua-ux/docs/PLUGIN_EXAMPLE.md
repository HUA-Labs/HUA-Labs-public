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

**플러그인 등록 시 자동 검증**:
- `plugin.checkLicense()` 함수가 있으면 먼저 호출
- 없으면 기본 라이선스 검증 수행 (개발 환경에서는 경고만 표시)
- 라이선스가 없으면 등록 시 에러 발생

```typescript
export const proPlugin: HuaUxPlugin = {
  name: 'pro-plugin',
  version: '1.0.0',
  license: 'pro',
  
  // 라이선스 검증 함수 (선택적)
  // 없으면 기본 라이선스 검증 사용
  checkLicense() {
    const { hasLicense } = require('@hua-labs/hua-ux/framework');
    return hasLicense('motion-pro');  // 실제 기능 이름 사용
  },
  
  init(config) {
    // 플러그인 등록 시 이미 라이선스 검증 완료
    // 여기서는 Pro 기능 초기화만 수행
    console.log('Pro plugin initialized with config:', config);
  },
};
```

**주의사항**:
- `checkLicense()` 함수는 플러그인 등록 시 자동 호출됩니다
- `init()` 함수 내에서 다시 검증할 필요는 없습니다
- 라이선스가 없으면 등록 단계에서 에러가 발생하므로 `init()`은 호출되지 않습니다

## 플러그인 초기화 순서

플러그인은 다음 순서로 초기화됩니다:

1. **플러그인 등록** (`defineConfig` 또는 `registerPlugin`)
   - 라이선스 검증 수행
   - 플러그인 레지스트리에 등록

2. **설정 검증 완료 후**
   - `defineConfig`에서 설정이 완료된 후
   - 모든 플러그인의 `init()` 함수가 병렬로 호출됨

3. **초기화 완료**
   - 각 플러그인은 한 번만 초기화됨 (중복 방지)
   - 초기화된 플러그인은 `initialized` Set에 저장됨

**예시**:
```typescript
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',
  plugins: [motionProPlugin, i18nProPlugin],
  // 플러그인 등록 → 설정 검증 → 플러그인 초기화 (자동)
});
```

## 플러그인 타입 및 Export

플러그인 시스템은 `@hua-labs/hua-ux/framework`에서 export됩니다:

```typescript
import { 
  pluginRegistry,      // 플러그인 레지스트리 인스턴스
  registerPlugin,     // 플러그인 등록 함수
  getPlugin,          // 플러그인 가져오기
  getAllPlugins       // 모든 플러그인 가져오기
} from '@hua-labs/hua-ux/framework';

import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework';
```

## 실제 구현 확인

플러그인 시스템의 실제 구현은 다음 파일에서 확인할 수 있습니다:

- `packages/hua-ux/src/framework/plugins/types.ts` - 플러그인 인터페이스
- `packages/hua-ux/src/framework/plugins/registry.ts` - 플러그인 레지스트리
- `packages/hua-ux/src/framework/plugins/index.ts` - Export

## 참고 자료

- [플러그인 시스템 설계](./PLUGIN_SYSTEM_DESIGN.md)
- [라이선스 시스템](../src/framework/license/types.ts)
- [라이선스 검증 함수](../src/framework/license/index.ts)
