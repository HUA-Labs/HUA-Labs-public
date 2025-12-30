# 개발자 결정 최소화 전략

## 개요

hua-ux의 핵심 목표는 **개발자가 매번 결정해야 하는 것들을 줄여주는 것**입니다. Preset 시스템을 통해 모션은 잘 해결했지만, UI 컴포넌트와의 연결이 부족합니다. 이 문서는 그 모자란 부분을 채우기 위한 계획입니다.

## 현재 상태

### ✅ 잘 해결된 부분

1. **Motion 결정 제거**: Preset으로 애니메이션 타입, duration, delay 자동 설정
2. **Spacing 가이드**: Preset에 spacing 기본값 제공
3. **컴포넌트 기본값**: 합리적인 기본 props 제공

### ❌ 모자란 부분

1. **Preset과 컴포넌트 자동 연결 부족**: Preset이 있어도 컴포넌트에 적용 방법이 불명확
2. **색상 결정 필요**: 개발자가 여전히 "어떤 색을 쓸까?" 결정해야 함
3. **Typography 결정 필요**: 타이포그래피 시스템이 Preset에 없음
4. **Layout과 Preset 연결 약함**: Spacing preset이 실제 컴포넌트에서 자동 적용 안 됨

## 설계 결정

### 기본 원칙
**"친절함을 목표로"** - 개발자가 결정해야 하는 것들을 최소화하고, **디자이너가 정한 좋은 기본값**을 제공합니다.

### 포함할 항목
1. ✅ **색상 (Colors)**: Preset별 색상 팔레트 정의
2. ✅ **타이포그래피 (Typography)**: 제목/본문 크기, 굵기, 간격 정의 (향후 폰트 서브셋화 고려)
3. ✅ **간격 (Spacing)**: 자동 설정으로 컴포넌트에 적용
4. ✅ **컴포넌트 기본값**: Button, Card 등 주요 컴포넌트의 기본 스타일

## 개선 계획

### Phase 1: Preset 확장 (색상, 타이포그래피 추가)

#### 1.1 Preset 구조 확장

```typescript
// packages/hua-ux/src/presets/product.ts
export const productPreset = {
  motion: { ... },
  spacing: { ... },
  
  // 추가: 색상 시스템
  colors: {
    primary: 'blue',      // 주요 액션 색상
    secondary: 'gray',    // 보조 색상
    accent: 'purple',     // 강조 색상
    success: 'green',     // 성공 상태
    warning: 'orange',    // 경고 상태
    error: 'red',         // 에러 상태
    info: 'cyan',         // 정보 상태
  },
  
  // 추가: 타이포그래피 시스템
  typography: {
    h1: { size: '2xl', weight: 'bold', lineHeight: 'tight' },
    h2: { size: 'xl', weight: 'semibold', lineHeight: 'snug' },
    h3: { size: 'lg', weight: 'semibold', lineHeight: 'snug' },
    h4: { size: 'base', weight: 'semibold', lineHeight: 'normal' },
    body: { size: 'base', weight: 'normal', lineHeight: 'relaxed' },
    small: { size: 'sm', weight: 'normal', lineHeight: 'relaxed' },
    caption: { size: 'xs', weight: 'normal', lineHeight: 'relaxed' },
  },
  
  // 추가: 컴포넌트별 기본값
  components: {
    button: {
      variant: 'default',
      size: 'md',
      color: 'primary',  // preset.colors.primary 자동 사용
    },
    card: {
      variant: 'elevated',
      spacing: 'component',  // preset.spacing.component 자동 사용
    },
    badge: {
      color: 'primary',
      size: 'md',
    },
  },
  
  i18n: { ... },
} as const;
```

#### 1.2 Marketing Preset도 동일하게 확장

```typescript
// packages/hua-ux/src/presets/marketing.ts
export const marketingPreset = {
  motion: { ... },
  spacing: { ... },
  colors: {
    primary: 'purple',    // 마케팅은 더 화려한 색상
    secondary: 'pink',
    accent: 'orange',
    // ...
  },
  typography: {
    h1: { size: '4xl', weight: 'bold' },  // 더 큰 타이틀
    // ...
  },
  components: { ... },
  i18n: { ... },
} as const;
```

### Phase 2: Preset을 컴포넌트에 자동 연결

#### 2.1 Context 기반 Preset 제공

```typescript
// packages/hua-ux/src/framework/context/PresetContext.tsx
'use client';

import { createContext, useContext } from 'react';
import type { ProductPreset, MarketingPreset } from '../../presets';

type Preset = ProductPreset | MarketingPreset;

const PresetContext = createContext<Preset | null>(null);

export function PresetProvider({ 
  preset, 
  children 
}: { 
  preset: Preset; 
  children: React.ReactNode;
}) {
  return (
    <PresetContext.Provider value={preset}>
      {children}
    </PresetContext.Provider>
  );
}

export function usePreset(): Preset {
  const preset = useContext(PresetContext);
  if (!preset) {
    throw new Error('usePreset must be used within PresetProvider');
  }
  return preset;
}
```

#### 2.2 HuaUxLayout에 Preset 자동 적용

```typescript
// packages/hua-ux/src/framework/components/HuaUxLayout.tsx
import { PresetProvider } from '../context/PresetContext';
import { productPreset } from '../../presets/product';

export function HuaUxLayout({ 
  children,
  preset = 'product'  // 기본값
}: { 
  children: React.ReactNode;
  preset?: 'product' | 'marketing';
}) {
  const selectedPreset = preset === 'product' ? productPreset : marketingPreset;
  
  return (
    <PresetProvider preset={selectedPreset}>
      {/* 기존 providers */}
      {children}
    </PresetProvider>
  );
}
```

#### 2.3 설정 파일에서 Preset 지정

```typescript
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',  // 또는 'marketing'
  // ...
});
```

### Phase 3: 간격 자동 설정

#### 3.1 Layout 컴포넌트가 Preset Spacing 자동 사용

```typescript
// packages/hua-ui/src/components/Stack.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';

export function Stack({
  spacing,  // 'default' | 'section' | 'component' | number
  children,
  ...props
}: StackProps) {
  const preset = usePreset();
  
  // Preset spacing 자동 사용 (명시적 spacing이 없을 때)
  // 결정: spacing을 지정하지 않으면 Preset 기본값 자동 사용
  const spacingValue = spacing || preset.spacing.default;
  
  return (
    <div
      className={merge(
        'flex flex-col',
        `gap-${spacingValue}`,  // Tailwind spacing
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

**효과**: 개발자가 간격을 지정하지 않아도 Preset의 기본 간격이 자동 적용됩니다.

### Phase 4: 컴포넌트가 Preset 자동 사용

#### 4.1 Button 컴포넌트 개선

```typescript
// packages/hua-ui/src/components/Button.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';

export function Button({
  color,  // 명시적 색상 지정 시 우선
  variant,
  size,
  ...props
}: ButtonProps) {
  const preset = usePreset();  // Context에서 preset 가져오기
  
  // Preset에서 기본값 가져오기 (명시적 props가 없을 때)
  const finalColor = color || preset.components.button.color;
  const finalVariant = variant || preset.components.button.variant;
  const finalSize = size || preset.components.button.size;
  
  // Preset 색상 사용
  const colorClass = preset.colors[finalColor];
  
  return (
    <button
      className={merge(
        // 기존 스타일
        colorClass,
        // ...
      )}
      {...props}
    />
  );
}
```

#### 4.2 Typography 컴포넌트 추가

```typescript
// packages/hua-ui/src/components/Typography.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';

type HeadingLevel = 1 | 2 | 3 | 4;

export function Heading({
  level,
  children,
  ...props
}: { 
  level: HeadingLevel;
  children: React.ReactNode;
}) {
  const preset = usePreset();
  const typography = preset.typography[`h${level}` as keyof typeof preset.typography];
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag
      className={merge(
        `text-${typography.size}`,
        `font-${typography.weight}`,
        `leading-${typography.lineHeight}`,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Body({ children, ...props }) {
  const preset = usePreset();
  const typography = preset.typography.body;
  
  return (
    <p
      className={merge(
        `text-${typography.size}`,
        `font-${typography.weight}`,
        `leading-${typography.lineHeight}`,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
```

#### 4.3 Layout 컴포넌트가 Preset Spacing 사용 (Phase 3에서 이미 구현)

```typescript
// packages/hua-ui/src/components/Stack.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';

export function Stack({
  spacing,  // 'default' | 'section' | 'component' | number
  children,
  ...props
}: StackProps) {
  const preset = usePreset();
  
  // Preset spacing 자동 사용
  const spacingValue = typeof spacing === 'string' 
    ? preset.spacing[spacing]
    : spacing;
  
  return (
    <div
      className={merge(
        'flex flex-col',
        `gap-${spacingValue}`,  // Tailwind spacing
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

#### 4.4 Card 컴포넌트 개선

```typescript
// packages/hua-ui/src/components/Card.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';

export function Card({
  spacing,
  variant,
  ...props
}: CardProps) {
  const preset = usePreset();
  
  // Preset에서 기본값 가져오기
  const finalSpacing = spacing || preset.components.card.spacing;
  const finalVariant = variant || preset.components.card.variant;
  
  // Preset spacing 사용
  const spacingClass = `p-${preset.spacing[finalSpacing]}`;
  
  return (
    <div
      className={merge(
        spacingClass,
        // variant 스타일
      )}
      {...props}
    />
  );
}
```

### Phase 5: Motion Preset 자동 적용

#### 4.1 컴포넌트에 Motion 자동 적용

```typescript
// packages/hua-ui/src/components/Card.tsx
import { usePreset } from '@hua-labs/hua-ux/framework';
import { useSlideUp } from '@hua-labs/motion-core';

export function Card({ children, ...props }: CardProps) {
  const preset = usePreset();
  const motion = useSlideUp(preset.motion.card);  // Preset motion 자동 적용
  
  return (
    <div
      ref={motion.ref}
      style={motion.style}
      {...props}
    >
      {children}
    </div>
  );
}
```

#### 4.2 Motion 적용 옵션

```typescript
// 컴포넌트에서 motion 비활성화 가능
<Card motion={false}>  // motion 적용 안 함
<Card motion="custom" motionConfig={{ ... }}>  // 커스텀 motion
```

## 사용 예시

### Before (개발자가 모든 결정)

```tsx
// 개발자가 매번 결정해야 함
<Button 
  variant="default"
  size="md"
  color="blue"  // 어떤 색?
  rounded="md"
  shadow="md"
>
  Click me
</Button>

<Card 
  variant="elevated"
  className="p-6"  // 간격은?
>
  Content
</Card>

<h1 className="text-2xl font-bold">Title</h1>  // 타이포그래피는?
```

### After (Preset이 자동 적용)

```tsx
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',
});

// 개발자는 그냥 쓰면 됨
<Button>Click me</Button>  // preset 자동 적용
<Card>Content</Card>      // preset spacing, motion 자동 적용
<Heading level={1}>Title</Heading>  // preset typography 자동 적용
```

## 구현 우선순위

### Phase 1 (Alpha → Beta) - 기본값 정의
- [ ] Preset에 colors 추가 (디자이너가 정한 좋은 기본값)
- [ ] Preset에 typography 추가 (향후 폰트 서브셋화 고려)
- [ ] Preset에 components 기본값 추가
- [ ] PresetContext 구현
- [ ] HuaUxLayout에 PresetProvider 통합

### Phase 2 (Beta) - 자동 적용
- [ ] Stack, Grid 등 Layout 컴포넌트가 Preset spacing 자동 사용
- [ ] Button, Card 등 주요 컴포넌트가 Preset 자동 사용
- [ ] Typography 컴포넌트 추가 (Heading, Body 등)

### Phase 3 (Beta → Stable) - 완성도 향상
- [ ] 모든 컴포넌트에 Preset 적용
- [ ] Motion Preset 자동 적용
- [ ] 커스터마이징 옵션 제공 (motion={false} 등)
- [ ] 폰트 서브셋화 고려 (향후)

## 디자이너 관점: 기본값 설계 원칙

### 1. 색상 (Colors)
- **Product Preset**: 전문적이고 신뢰감 있는 파란색 계열
- **Marketing Preset**: 화려하고 눈에 띄는 보라색/핑크 계열
- 각 Preset마다 일관된 색상 팔레트 제공

### 2. 타이포그래피 (Typography)
- **현재**: 크기, 굵기, 줄간격 정의
- **향후**: 폰트 서브셋화로 필요한 글자만 포함하여 성능 최적화
- 제목/본문 계층 구조 명확히 정의

### 3. 간격 (Spacing)
- **자동 설정**: 컴포넌트에서 spacing을 지정하지 않으면 Preset 기본값 사용
- Product: 보수적인 간격 (md)
- Marketing: 넓은 간격 (xl)

### 4. 컴포넌트 기본값
- 각 컴포넌트마다 Preset에 맞는 기본 스타일 정의
- 개발자가 props를 지정하지 않아도 좋은 기본값 제공

## 타입 정의

```typescript
// packages/hua-ux/src/presets/types.ts
export interface PresetColors {
  primary: string;      // 'blue' | 'purple' | 'green' 등
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface PresetTypography {
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  body: TypographyStyle;
  small: TypographyStyle;
  caption: TypographyStyle;
}

export interface TypographyStyle {
  size: string;        // 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' 등
  weight: string;     // 'normal' | 'medium' | 'semibold' | 'bold' 등
  lineHeight: string; // 'tight' | 'snug' | 'normal' | 'relaxed' 등
}

// 향후 확장: 폰트 서브셋화
export interface FontSubset {
  // 필요한 글자만 포함하여 폰트 파일 크기 최적화
  // 예: 한글 기본 자모, 영문, 숫자만 포함
}

export interface PresetComponents {
  button: {
    variant: string;
    size: string;
    color: keyof PresetColors;
  };
  card: {
    variant: string;
    spacing: 'default' | 'section' | 'component';
  };
  badge: {
    color: keyof PresetColors;
    size: string;
  };
}

export interface ExtendedPreset {
  motion: PresetConfig;
  spacing: {
    default: string;
    section: string;
    component: string;
  };
  colors: PresetColors;
  typography: PresetTypography;
  components: PresetComponents;
  i18n: {
    defaultLanguage: string;
    supportedLanguages: string[];
  };
}
```

## 마이그레이션 가이드

### 기존 코드 마이그레이션

```tsx
// Before
<Button variant="default" size="md" color="blue">
  Click
</Button>

// After (Preset 사용)
<Button>Click</Button>  // preset.components.button 자동 적용

// After (명시적 override)
<Button color="red">Click</Button>  // color만 override
```

## 참고 자료

- [Preset 시스템](./PRESET_SYSTEM.md)
- [프레임워크 레이어](../src/framework/README.md)
- [컴포넌트 가이드](../../hua-ui/README.md)
