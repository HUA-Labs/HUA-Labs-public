# Preset 시스템

## 개요

Preset 시스템은 개발자가 매번 결정해야 하는 것들(색상, 간격, 타이포그래피, 모션 등)을 미리 정의하여 자동으로 적용하는 시스템입니다.

## 목표

**개발자 결정 최소화**: "그냥 쓰면 되는" 수준까지

## Preset 구조

### 현재 구조 (Alpha)

```typescript
export const productPreset = {
  motion: { ... },      // ✅ 구현됨
  spacing: { ... },     // ✅ 구현됨
  i18n: { ... },        // ✅ 구현됨
}
```

### 확장 구조 (Beta 목표)

```typescript
export const productPreset = {
  motion: { ... },      // ✅ 구현됨
  spacing: { ... },     // ✅ 구현됨
  colors: { ... },      // ⏳ 구현 예정
  typography: { ... },  // ⏳ 구현 예정
  components: { ... },  // ⏳ 구현 예정
  i18n: { ... },        // ✅ 구현됨
}
```

## Preset 종류

### 1. Product Preset

**용도**: 제품 페이지, 대시보드 등 일반적인 제품 UI

**특징**:
- 보수적인 모션 (빠른 전환, 최소 딜레이)
- 일관된 스페이싱 (md 기본값)
- 호버/클릭 인터랙션 최소화
- 전문적인 색상 (blue primary)
- 표준 타이포그래피

**사용 예시**:
```tsx
<HuaUxLayout preset="product">
  <Button>Click</Button>  // 자동으로 productPreset 적용
</HuaUxLayout>
```

### 2. Marketing Preset

**용도**: 랜딩 페이지, 마케팅 페이지

**특징**:
- 드라마틱한 모션 (느린 전환, 긴 딜레이)
- 넓은 스페이싱 (xl 기본값)
- 호버/클릭 인터랙션 강조
- 화려한 색상 (purple primary)
- 큰 타이포그래피

**사용 예시**:
```tsx
<HuaUxLayout preset="marketing">
  <Button>Click</Button>  // 자동으로 marketingPreset 적용
</HuaUxLayout>
```

## Preset 적용 방법

### 1. 설정 파일에서 지정

```typescript
// hua-ux.config.ts
export default defineConfig({
  preset: 'product',  // 전체 앱에 product preset 적용
});
```

### 2. Layout에서 지정

```tsx
// app/layout.tsx
import { HuaUxLayout } from '@hua-labs/hua-ux/framework';

export default function RootLayout({ children }) {
  return (
    <HuaUxLayout preset="product">
      {children}
    </HuaUxLayout>
  );
}
```

### 3. 컴포넌트에서 자동 사용

```tsx
// Preset이 자동으로 적용됨
<Button>Click</Button>  // preset.components.button 자동 적용
<Card>Content</Card>   // preset.components.card 자동 적용
<Heading level={1}>Title</Heading>  // preset.typography.h1 자동 적용
```

## Preset 확장 계획

### Phase 1: 기본 Preset 확장

- [ ] Product Preset에 colors, typography, components 추가
- [ ] Marketing Preset에 colors, typography, components 추가

### Phase 2: 추가 Preset

- [ ] Dashboard Preset (대시보드 전용)
- [ ] Blog Preset (블로그 전용)
- [ ] E-commerce Preset (전자상거래 전용)

### Phase 3: 커스텀 Preset

- [ ] 사용자 정의 Preset 생성 기능
- [ ] Preset 확장/병합 기능

## Preset vs 명시적 Props

### Preset 우선 (기본값)

```tsx
<Button>Click</Button>  // preset.components.button 사용
```

### 명시적 Props 우선 (Override)

```tsx
<Button color="red">Click</Button>  // color만 override, 나머지는 preset
```

### 완전 커스텀

```tsx
<Button 
  color="red"
  size="lg"
  variant="outline"
>
  Click
</Button>  // 모든 props 명시적 지정
```

## 참고 자료

- [개발자 결정 최소화 전략](./DEVELOPER_DECISION_MINIMIZATION.md)
- [프레임워크 레이어](../src/framework/README.md)
