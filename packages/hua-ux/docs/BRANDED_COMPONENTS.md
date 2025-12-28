# Branded Components

## 개요 / Overview

`hua-ux/framework`는 branding 설정을 자동으로 적용하는 컴포넌트를 제공합니다.
`hua-ux/framework` provides components that automatically apply branding configuration.

## 사용법 / Usage

### BrandedButton

Button 컴포넌트에 branding의 primary, secondary, accent 색상을 자동으로 적용합니다.
Automatically applies branding's primary, secondary, and accent colors to Button component.

```tsx
import { BrandedButton } from '@hua-labs/hua-ux/framework';

// branding 설정이 있으면 자동으로 primary 색상 적용
// Automatically applies primary color if branding is configured
<BrandedButton variant="default">저장</BrandedButton>

// secondary 색상 자동 적용
// Automatically applies secondary color
<BrandedButton variant="secondary">취소</BrandedButton>

// accent 색상 자동 적용 (outline)
// Automatically applies accent color (outline)
<BrandedButton variant="outline">보기</BrandedButton>
```

**자동 적용 규칙 / Auto-apply Rules**:
- `variant="default"`: branding의 `primary` 색상 사용
- `variant="secondary"`: branding의 `secondary` 색상 사용
- `variant="outline"`: branding의 `accent` 색상 사용

### BrandedCard

Card 컴포넌트에 branding의 색상을 자동으로 적용합니다.
Automatically applies branding colors to Card component.

```tsx
import { BrandedCard } from '@hua-labs/hua-ux/framework';

// branding 설정이 있으면 자동으로 색상 적용
// Automatically applies colors if branding is configured
<BrandedCard variant="outline">
  <CardContent>내용</CardContent>
</BrandedCard>
```

**자동 적용 규칙 / Auto-apply Rules**:
- `variant="outline"`: branding의 `accent` 색상을 테두리로 사용
- `variant="default"`: branding의 `primary` 색상의 약간의 tint를 배경에 적용

## 설정 예시 / Configuration Example

```typescript
// hua-ux.config.ts
import { defineConfig } from '@hua-labs/hua-ux/framework';

export default defineConfig({
  preset: 'product',
  branding: {
    colors: {
      primary: '#3B82F6',    // 파란색
      secondary: '#8B5CF6',  // 보라색
      accent: '#F59E0B',     // 주황색
    },
  },
});
```

## Branding이 없을 때 / When Branding is Not Configured

Branding이 설정되지 않았을 때는 기본 `Button`과 `Card` 컴포넌트와 동일하게 동작합니다.
When branding is not configured, works the same as default `Button` and `Card` components.

```tsx
// branding이 없어도 정상 동작
// Works normally even without branding
<BrandedButton variant="default">저장</BrandedButton>
<BrandedCard variant="elevated">내용</BrandedCard>
```

## 구현 방식 / Implementation

### CSS 변수 방식

Branded Components는 **CSS 변수**를 사용하여 Tailwind의 최적화를 활용합니다.
Branded Components use **CSS variables** to leverage Tailwind's optimization.

**장점 / Advantages**:
- ✅ Tailwind의 JIT 컴파일러 최적화 활용
- ✅ 인라인 스타일 없이 깔끔한 코드
- ✅ 런타임에 동적으로 색상 변경 가능
- ✅ 브라우저 캐싱 최적화

**Advantages**:
- ✅ Leverages Tailwind's JIT compiler optimization
- ✅ Clean code without inline styles
- ✅ Dynamic color changes at runtime
- ✅ Browser caching optimization

### CSS 변수 자동 주입

`BrandingProvider`가 자동으로 CSS 변수를 `:root`에 주입합니다.
`BrandingProvider` automatically injects CSS variables into `:root`.

```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #8B5CF6;
  --color-accent: #F59E0B;
}
```

### Tailwind Arbitrary Values 사용

컴포넌트는 Tailwind의 arbitrary values를 사용합니다.
Components use Tailwind's arbitrary values.

```tsx
// BrandedButton 내부
className="bg-[var(--color-primary)] text-white"
```

## 기존 컴포넌트와의 차이 / Difference from Default Components

### Button vs BrandedButton

- **Button**: 하드코딩된 색상 (blue-600 등)
- **BrandedButton**: CSS 변수를 통한 branding 색상 자동 적용

### Card vs BrandedCard

- **Card**: 기본 색상 (slate 등)
- **BrandedCard**: CSS 변수를 통한 branding 색상 자동 적용

## 마이그레이션 가이드 / Migration Guide

기존 코드에서 `Button`과 `Card`를 `BrandedButton`과 `BrandedCard`로 교체하면 branding이 자동 적용됩니다.
Replace `Button` and `Card` with `BrandedButton` and `BrandedCard` in existing code to automatically apply branding.

```tsx
// Before
import { Button, Card } from '@hua-labs/ui';

// After
import { BrandedButton, BrandedCard } from '@hua-labs/hua-ux/framework';
```

## 참고 / References

- [White Labeling 구현](./WHITE_LABELING_IMPLEMENTATION.md)
- [Branding Context](./branding/context.tsx)
