# 바이브 코딩 전략

## 개요

**"전문가가 설계한 탄탄한 엔진을, AI의 힘으로 누구나 운전할 수 있게 만든 슈퍼카"**

hua-ux는 전통적인 개발자와 바이브 코더 모두를 만족시키는 **계층화된 아키텍처**를 지향합니다.

## 타겟 사용자

### 1. 전통적 개발자 (Traditional Developers)
- **원하는 것**: 신뢰할 수 있는 기반, 정교한 타입, 저수준 제어
- **사용 방식**: Core 레이어 직접 사용, 개별 패키지 독립 사용
- **가치**: "밑바닥 코드가 깔끔하네" → 프레임워크 신뢰도

### 2. 바이브 코더 (Vibe Coders)
- **원하는 것**: 빠른 결과, AI와의 자연스러운 소통
- **사용 방식**: 설정 파일 + AI 명령, Preset 시스템
- **가치**: "Next.js 몰라도 됨. 그냥 설정하고 AI한테 말하면 됨"

## 계층화된 아키텍처

### 하단 레이어: Core & Types (전통적 개발자용)

**특징**: "내가 다 통제할 수 있어"

**제공**:
- 정교한 TypeScript 타입
- 저수준 API
- 개별 패키지 독립적 사용 (`@hua-labs/state`, `@hua-labs/motion` 등)

**사용 예시**:
```typescript
// 전통 개발자: 직접 제어
import { createHuaStore } from '@hua-labs/state';
import { useFadeIn } from '@hua-labs/motion-core';

const store = createHuaStore(...);
const motion = useFadeIn({ duration: 300 });
```

**효과**: 시니어 개발자가 "밑바닥 코드가 깔끔하네"라고 인정 → 신뢰도 확보

### 중간 레이어: Framework & Config (AI/바이브 코더용)

**특징**: "말만 하면 알아서 해줘"

**제공**:
- `defineConfig` (선언적 설정)
- `HuaUxLayout` (자동 Provider 설정)
- Preset 시스템 (한 단어로 대부분 해결)

**사용 예시**:
```typescript
// 바이브 코더: 설정만으로 해결
export default defineConfig({
  preset: 'product',  // 끝!
});
```

**효과**: 바이브 코더가 밑바닥 코드를 볼 필요 없이 고급 기능 구현

### 상단 레이어: AI Context & CLI (바이브 코딩 전용)

**특징**: "AI가 내 마음을 읽어"

**제공**:
- `.cursorrules` (AI 전용 가이드)
- `ai-context.md` (프로젝트 구조 설명)
- `create-hua-ux` 스캐폴딩 (AI 친화적 구조)

**효과**: 커서(Cursor)가 프로젝트 구조를 완벽히 이해 → 자연어 명령만으로 코드 생성

## 바이브 코딩 친화적 설계

### 1. 명사 중심의 선언적 설정

**Bad (전통 개발자용)**:
```typescript
revalidate: 3600,
staleTime: 60000,
```

**Good (바이브 코더용)**:
```typescript
freshness: 'high',
performance: 'fast-and-light',
```

**이유**: AI는 기술적 숫자보다 '의도'를 나타내는 형용사/명사를 만났을 때 맥락을 더 정확히 파악

### 2. 한 파일에서 많은 것 결정

**Bad**: 여러 파일을 오가며 설정
**Good**: `HuaUxPage` 하나에 SEO, Motion, i18n Key 모두 props로

```tsx
<HuaUxPage
  title="메인 페이지"
  description="환영합니다"
  i18nKey="home"
  motion="fadeIn"
>
  {/* AI가 파일 하나만 보고도 완벽한 페이지 생성 */}
</HuaUxPage>
```

### 3. 강력한 타입 시스템 (AI 자동완성 유도)

타입이 정교하면 커서가 "여기에 넣을 수 있는 값은 'product', 'marketing' 중 하나입니다"라고 제안

### 4. 한글 JSDoc 주석

AI가 사용자에게 설정을 추천할 때 한글로 설명 가능

```typescript
/**
 * 프리셋 선택
 * 
 * - 'product': 제품 페이지용 (전문적, 효율적)
 * - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는)
 */
preset?: 'product' | 'marketing';
```

## 양손잡이 전략

### 상호 보완 관계

1. **전통 개발자 → 바이브 코더**
   - 전통 개발자가 만든 '단단한 코드'가 있어야 AI가 생성하는 코드 품질 향상
   - 바이브 코더의 '엄청난 생산성' 사례가 프레임워크 확산에 도움

2. **바이브 코더 → 전통 개발자**
   - 바이브 코더가 만들어내는 생산성 사례가 프레임워크 신뢰도 향상
   - 서비스가 커지면 전통 개발자도 필요 → 레이어만 내려가면 됨

### 커리어 이동 지원

- **숙련 개발자**: 컨디션 안 좋거나 단순 작업 시 '바이브 코딩' 모드 전환
- **바이브 코더**: 서비스 커지면 '딥다이브' 필요 → 프레임워크 바꾸지 않고 레이어만 내려가기

## 실천 방안

### 1. 기본은 엄격하게, 사용은 유연하게

- **내부 로직**: 전통 개발자가 봐도 감탄할 만큼 깨끗한 TypeScript
- **외부 설정**: 바이브 코더가 자연어로 이해하기 쉽게

### 2. 문서의 이원화

- **README.md**: 전통 개발자를 위한 API 레퍼런스
- **.cursorrules**: AI가 바이브 코딩을 돕기 위한 지침서
- **ai-context.md**: 프로젝트 구조 AI 전용 설명

### 3. Preset 시스템 확장

- **개발자 모드**: 기술적 세부 설정 가능
- **바이브 모드**: 비즈니스 의도 중심 설정

## 다음 단계

1. **.cursorrules 자동 생성**: `create-hua-ux` 실행 시 자동 생성
2. **한글 JSDoc 강화**: 모든 설정 항목에 친절한 한글 설명
3. **ai-context.md 자동 생성**: 프로젝트 구조 AI 전용 설명
4. **Preset 확장**: "개발자 모드"와 "바이브 모드" 모두 지원

## 참고 자료

- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [구현 로드맵](./IMPLEMENTATION_ROADMAP.md)
- [설정 시스템 설계](./CONFIG_SYSTEM_DESIGN.md)
