# 다음 단계 플래닝 (바이브 코딩 + 전통 개발자)

## 개요

바이브 코딩 전략과 계층화된 아키텍처를 바탕으로 한 다음 단계 계획입니다.

## 핵심 전략

**"전문가가 설계한 탄탄한 엔진을, AI의 힘으로 누구나 운전할 수 있게 만든 슈퍼카"**

- **전통 개발자**: 하단 레이어 (Core & Types) - 정교한 타입, 저수준 제어
- **바이브 코더**: 중간 레이어 (Framework & Config) - 선언적 설정, Preset
- **AI 도구**: 상단 레이어 (AI Context & CLI) - .cursorrules, ai-context.md

## 즉시 구현 (이번 주)

### 1. HuaUxPage 확장 (한 파일에서 많은 것 결정)

**목표**: AI가 파일 하나만 보고도 완벽한 페이지 생성

**현재 상태**:
```tsx
<HuaUxPage title="..." description="...">
  {/* 내용 */}
</HuaUxPage>
```

**확장 계획**:
```tsx
<HuaUxPage
  title="메인 페이지"
  description="환영합니다"
  i18nKey="home"           // 번역 네임스페이스 자동 지정
  motion="fadeIn"          // 모션 타입 지정
  seo={{                   // SEO 메타데이터
    keywords: ['키워드1', '키워드2'],
    ogImage: '/og-image.png',
  }}
>
  {/* AI가 파일 하나만 보고도 완벽한 페이지 생성 */}
</HuaUxPage>
```

**효과**: 바이브 코더가 "메인 페이지 만들어줘"라고 하면 AI가 한 파일로 완성

### 2. Preset 시스템 확장 (개발자 모드 vs 바이브 모드)

**목표**: 전통 개발자와 바이브 코더 모두 만족

**현재 상태**:
```typescript
preset: 'product' | 'marketing'
```

**확장 계획**:
```typescript
// 바이브 모드 (비즈니스 의도 중심)
preset: {
  type: 'product',
  mode: 'vibe',  // 바이브 코딩 모드
}

// 개발자 모드 (기술적 세부 설정)
preset: {
  type: 'product',
  mode: 'developer',  // 개발자 모드
  // 기술적 세부 설정 가능
}
```

**또는 더 간단하게**:
```typescript
// 바이브 코더용 (간단)
preset: 'product'

// 전통 개발자용 (세부 설정)
preset: {
  type: 'product',
  motion: { duration: 300 },
  spacing: { default: 'md' },
}
```

### 3. 명사 중심 설정 확장

**목표**: AI가 이해하기 쉬운 비즈니스 의도 중심 설정

**현재 상태**:
```typescript
motion: {
  defaultPreset: 'product',
  enableAnimations: true,
}
```

**확장 계획**:
```typescript
motion: {
  // 바이브 코더용 (명사 중심)
  style: 'smooth',  // 'smooth' | 'dramatic' | 'minimal'
  
  // 전통 개발자용 (기술적)
  defaultPreset: 'product',
  enableAnimations: true,
  duration: 300,
}
```

## 중기 구현 (다음 주)

### 4. 라이선스 시스템 기본 구조

**목표**: Pro/Enterprise 기능 분리 준비

**작업**:
- [ ] 라이선스 타입 정의
- [ ] 라이선스 로더 (환경 변수, 설정 파일)
- [ ] 라이선스 검증 함수
- [ ] 에러 메시지 (구매 링크 포함)

### 5. 플러그인 시스템 기본 구조

**목표**: 모듈화된 구조로 유료 기능 분리

**작업**:
- [ ] 플러그인 인터페이스 정의
- [ ] 플러그인 레지스트리 구현
- [ ] 플러그인 등록/로드 로직

## 장기 구현 (Beta → Stable)

### 6. 모션 Pro 플러그인

**목표**: 모션 시스템을 Free/Pro로 분리

**작업**:
- [ ] `@hua-labs/motion-core/pro` 패키지 생성
- [ ] Pro 기능 구현 (parallax, 3D transforms)
- [ ] 라이선스 검증 통합

### 7. i18n Pro 기능

**목표**: CDN 로더, 번역 관리 대시보드

**작업**:
- [ ] CDN 로더 구현
- [ ] 번역 관리 대시보드 (별도 서비스)

## 구현 우선순위

### 최우선 (이번 주)

1. ✅ 화이트 라벨링 기본 구조
2. ✅ 바이브 코딩 친화적 구조 (.cursorrules, ai-context.md)
3. 🥇 **HuaUxPage 확장** (한 파일에서 많은 것 결정)
4. 🥈 **Preset 시스템 확장** (개발자 모드 vs 바이브 모드)

### 높음 (다음 주)

5. 🥈 라이선스 시스템 기본 구조
6. 🥈 플러그인 시스템 기본 구조

### 중간 (Beta → Stable)

7. 🥇 모션 Pro 플러그인
8. 🥈 i18n Pro 기능

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

## 참고 자료

- [바이브 코딩 전략](./VIBE_CODING_STRATEGY.md)
- [계층화된 아키텍처](./LAYERED_ARCHITECTURE.md)
- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [구현 로드맵](./IMPLEMENTATION_ROADMAP.md)
