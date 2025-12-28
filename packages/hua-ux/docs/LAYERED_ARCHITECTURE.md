# 계층화된 아키텍처 설계

## 개요

전통적인 개발자와 바이브 코더 모두를 만족시키는 **계층화된 아키텍처** 설계입니다.

## 아키텍처 계층

```
┌─────────────────────────────────────────┐
│  상단: AI Context & CLI                 │
│  (바이브 코딩 전용 인터페이스)            │
│  - .cursorrules                         │
│  - ai-context.md                        │
│  - create-hua-ux                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  중간: Framework & Config               │
│  (AI/바이브 코더용)                      │
│  - defineConfig                         │
│  - HuaUxLayout                          │
│  - Preset 시스템                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  하단: Core & Types                     │
│  (전통적 개발자용)                      │
│  - @hua-labs/state                      │
│  - @hua-labs/motion-core                │
│  - @hua-labs/i18n-core                  │
│  - 정교한 TypeScript 타입               │
└─────────────────────────────────────────┘
```

## 각 계층 상세

### 하단 레이어: Core & Types

**타겟**: 전통적 개발자, 시니어 개발자

**특징**:
- 정교한 TypeScript 타입
- 저수준 API 직접 제어
- 개별 패키지 독립적 사용 가능
- "밑바닥 코드가 깔끔하네" 수준의 품질

**제공**:
```typescript
// 개별 패키지 직접 사용
import { createHuaStore } from '@hua-labs/state';
import { useFadeIn } from '@hua-labs/motion-core';
import { useTranslation } from '@hua-labs/i18n-core';

// 완전한 제어 가능
const store = createHuaStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}), {
  persist: true,
  ssr: true,
});
```

**가치**:
- 프레임워크의 신뢰도 확보
- "마법"이 싫을 때 하단 레이어로 내려가 직접 제어
- 개별 패키지만 사용 가능 (프레임워크 없이도)

### 중간 레이어: Framework & Config

**타겟**: 바이브 코더, 주니어 개발자, AI

**특징**:
- 선언적 설정 (`defineConfig`)
- 자동 Provider 설정 (`HuaUxLayout`)
- Preset 시스템 (한 단어로 대부분 해결)
- "말만 하면 알아서 해줘"

**제공**:
```typescript
// 설정만으로 해결
export default defineConfig({
  preset: 'product',  // 끝!
});

// 컴포넌트 자동 적용
<HuaUxLayout>
  <HuaUxPage title="메인 페이지">
    {/* 자동으로 Motion, i18n 적용 */}
  </HuaUxPage>
</HuaUxLayout>
```

**가치**:
- 밑바닥 코드를 볼 필요 없이 고급 기능 구현
- AI가 설정을 추천하고 코드 생성 가능
- 빠른 프로토타이핑

### 상단 레이어: AI Context & CLI

**타겟**: 바이브 코더, AI 도구 (Cursor 등)

**특징**:
- AI가 프로젝트 구조를 완벽히 이해
- 자연어 명령만으로 코드 생성
- "AI가 내 마음을 읽어"

**제공**:
```markdown
<!-- .cursorrules -->
이 프로젝트는 hua-ux 프레임워크를 사용합니다.
- 페이지는 app/ 디렉토리에 생성
- 컴포넌트는 components/ 디렉토리에 생성
- 번역은 translations/ 디렉토리에 추가
- HuaUxPage로 페이지를 감싸면 자동으로 Motion, i18n 적용
```

**가치**:
- AI가 프로젝트 구조를 완벽히 이해
- 자연어 명령만으로 코드 생성
- 바이브 코더가 문서를 읽지 않아도 AI가 안내

## 계층 간 이동

### 바이브 코더 → 전통 개발자

서비스가 커지면 레이어를 내려가기:

```typescript
// 바이브 모드 (중간 레이어)
export default defineConfig({
  preset: 'product',
});

// 딥다이브 필요 시 (하단 레이어)
import { createHuaStore } from '@hua-labs/state';
// 직접 제어
```

### 전통 개발자 → 바이브 코더

단순 작업이나 컨디션 안 좋을 때 레이어를 올리기:

```typescript
// 전통 모드 (하단 레이어)
const store = createHuaStore(...);

// 빠른 작업 필요 시 (중간 레이어)
export default defineConfig({
  preset: 'product',
});
```

## 설계 원칙

### 1. 기본은 엄격하게, 사용은 유연하게

- **내부 로직**: 전통 개발자가 봐도 감탄할 만큼 깨끗한 TypeScript
- **외부 설정**: 바이브 코더가 자연어로 이해하기 쉽게

### 2. Escape Hatch 필수

모든 계층에서 하위 계층으로 내려갈 수 있어야 함:
- Framework → Core
- Config → 직접 제어
- Preset → 커스텀 설정

### 3. 문서의 이원화

- **README.md**: 전통 개발자를 위한 API 레퍼런스
- **.cursorrules**: AI가 바이브 코딩을 돕기 위한 지침서
- **ai-context.md**: 프로젝트 구조 AI 전용 설명

## 구현 계획

### Phase 1: Core 레이어 강화 (전통 개발자용)

- [ ] 개별 패키지 독립 사용성 강화
- [ ] 정교한 타입 시스템
- [ ] 저수준 API 문서화

### Phase 2: Framework 레이어 확장 (바이브 코더용)

- [x] Preset 시스템
- [x] 선언적 설정
- [ ] 한 파일에서 많은 것 결정 (HuaUxPage 확장)

### Phase 3: AI Context 레이어 (바이브 코딩 전용)

- [ ] .cursorrules 자동 생성
- [ ] ai-context.md 자동 생성
- [ ] 한글 JSDoc 강화

## 참고 자료

- [바이브 코딩 전략](./VIBE_CODING_STRATEGY.md)
- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [구현 로드맵](./IMPLEMENTATION_ROADMAP.md)
