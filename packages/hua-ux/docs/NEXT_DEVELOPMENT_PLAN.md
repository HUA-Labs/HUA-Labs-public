# 다음 단계 개발 플랜

## 현재 상태 요약

### 완료된 기능 (2025-12-28)

#### 1. 컴포넌트 Branding 자동 적용 ✅
- `Button`과 `Card` 컴포넌트에 branding 자동 적용
- `@hua-labs/hua-ux`에서 import 시 자동으로 `BrandedButton`, `BrandedCard` 사용
- CSS 변수 방식으로 Tailwind JIT 최적화 활용

#### 2. HuaUxPage 확장 ✅
- SEO 메타데이터 prop 추가 (`seo`)
- i18n 키 자동 연결 개선 (`i18nKey`)
- Motion 타입 지정 개선 (`motion`: fadeIn, slideUp, slideLeft, slideRight, scaleIn, bounceIn)
- Next.js Metadata 생성 헬퍼 함수 제공 (`generatePageMetadata`)

#### 3. Preset 시스템 확장 ✅
- 바이브 모드: `preset: 'product'` (문자열)
- 개발자 모드: `preset: { type: 'product', motion: {...}, spacing: {...} }` (객체)
- `motion.style` 추가 (명사 중심: 'smooth' | 'dramatic' | 'minimal')
- `style`이 설정되면 자동으로 `defaultPreset`에 매핑

#### 4. 라이선스 시스템 기본 구조 ✅
- 라이선스 타입 정의 (`LicenseType`, `LicenseFeature`, `LicenseInfo`)
- 라이선스 로더 (환경 변수 `HUA_UX_LICENSE_KEY`, 설정 파일)
- 라이선스 검증 함수 (`checkLicense`, `hasLicense`, `requireLicense`)
- 에러 메시지 (구매 링크 포함)

#### 5. 플러그인 시스템 기본 구조 ✅
- 플러그인 인터페이스 정의 (`HuaUxPlugin`)
- 플러그인 레지스트리 구현 (`PluginRegistry`)
- 플러그인 등록/초기화 로직 (Config 통합)
- 라이선스 검증 통합

### 현재 아키텍처 상태

**프레임워크 레이어**:
- ✅ Config 시스템 (Preset 병합, 검증)
- ✅ Component 시스템 (HuaUxLayout, HuaUxPage, BrandedButton, BrandedCard)
- ✅ Branding 시스템 (CSS 변수, Tailwind Config)
- ✅ License 시스템 (검증, 로더)
- ✅ Plugin 시스템 (레지스트리, 초기화)

**Export 구조**:
- `@hua-labs/hua-ux` - Umbrella 패키지 (모든 패키지 re-export)
- `@hua-labs/hua-ux/framework` - 프레임워크 레이어 (Config, Components, License, Plugins)

### Graphite 스택 현황

- `12-28-feat_hua-ux_auto-apply_branding_to_button_and_card_components`
- `12-28-feat_hua-ux_enhance_huauxpage_with_seo_i18n_and_motion_props`
- `12-28-docs_add_devlog_for_hua-ux_framework_branding_enhancement`
- `12-28-feat_hua-ux_extend_preset_system_with_vibe_mode_and_developer_mode`
- `12-28-feat_hua-ux_add_license_system_for_pro_enterprise_features`
- `12-28-feat_hua-ux_add_plugin_system_for_modular_feature_extensions`

---

## 다음 단계 (우선순위 순)

### Phase 1: 첫 번째 상품화 (Beta) 🥇 최우선

#### 1.1 모션 Pro 플러그인 구현

**목표**: 모션 시스템을 Free/Pro로 분리하여 첫 번째 상품화 기능 제공

**작업**:
- [ ] `@hua-labs/motion-core/pro` 패키지 생성
  - 위치: `packages/hua-motion-core-pro/`
  - 의존성: `@hua-labs/motion-core`, `@hua-labs/hua-ux`
- [ ] Pro 기능 구현
  - `useParallax` - 패럴랙스 스크롤 효과
  - `useMotion3D` - 3D 변환 효과
  - `useCustomEasing` - 커스텀 이징 함수
  - `ParallaxScroll` 컴포넌트
  - `Motion3D` 컴포넌트
- [ ] 라이선스 검증 통합
  - `motion-pro` 기능 라이선스 확인
  - 플러그인 등록 시 자동 검증
- [ ] 문서화
  - 사용 가이드
  - API 레퍼런스
  - 예시 코드

**완료 기준**:
```typescript
// Free
import { useFadeIn } from '@hua-labs/motion-core';

// Pro (플러그인)
import { motionProPlugin } from '@hua-labs/motion-core/pro';
import { useParallax } from '@hua-labs/motion-core/pro';

// hua-ux.config.ts
export default defineConfig({
  plugins: [motionProPlugin],
  license: { apiKey: process.env.HUA_UX_LICENSE_KEY },
});
```

**예상 작업 시간**: 2-3일

**우선순위**: 🥇 **최우선** (차별화 포인트, 검증됨)

---

#### 1.2 i18n Pro 기능

**목표**: CDN 로더 및 번역 관리 대시보드 제공

**작업**:
- [ ] CDN 로더 구현
  - `translationLoader: 'cdn'` 옵션 추가
  - CDN URL에서 번역 파일 동적 로드
  - 캐싱 전략 구현
- [ ] 번역 관리 대시보드 (별도 서비스)
  - 번역 키 관리 UI
  - 실시간 업데이트
  - 다국어 편집기
- [ ] 자동 번역 API 연동
  - Google Translate API 연동
  - DeepL API 연동 (선택적)

**완료 기준**:
```typescript
i18n: {
  translationLoader: 'cdn',
  cdnUrl: 'https://cdn.example.com/translations',
  autoUpdate: true,
}
```

**예상 작업 시간**: 3-5일

**우선순위**: 🥈 **높음** (고통의 산물, 시장 수요)

---

### Phase 2: 프레임워크 완성도 향상 🥈

#### 2.1 추가 컴포넌트 Branding 적용

**목표**: 주요 컴포넌트에 branding 자동 적용 확장

**작업**:
- [ ] Alert 컴포넌트 branding 적용
- [ ] Badge 컴포넌트 branding 적용
- [ ] Input 컴포넌트 branding 적용 (선택적)
- [ ] Select 컴포넌트 branding 적용 (선택적)

**완료 기준**:
```typescript
// hua-ux.config.ts
export default defineConfig({
  branding: { colors: { primary: '#FF0000' } }
});

// 자동으로 모든 컴포넌트에 branding 적용
import { Alert, Badge } from '@hua-labs/hua-ux';
<Alert>알림</Alert>  // primary 색상 자동 적용
```

**예상 작업 시간**: 1-2일

**우선순위**: 🥈 **중간** (Button/Card가 핵심, 나머지는 선택적)

---

#### 2.2 Preset 시스템 확장

**목표**: 추가 Preset 및 커뮤니티 Preset 지원

**작업**:
- [ ] E-commerce Preset 구현
  - 쇼핑 카트, 체크아웃 플로우
  - 결제 UI 컴포넌트
- [ ] Dashboard Preset 구현
  - 차트, 그래프 컴포넌트
  - 데이터 테이블
- [ ] Blog Preset 구현
  - 마크다운 렌더링
  - 댓글 시스템
- [ ] 커뮤니티 Preset 지원
  - Preset 플러그인 시스템 확장
  - Preset 검증 및 배포 프로세스

**완료 기준**:
```typescript
// Free
preset: 'product' | 'marketing'

// Pro (플러그인)
preset: 'ecommerce' | 'dashboard' | 'blog'
```

**예상 작업 시간**: 3-4일

**우선순위**: 🥉 **중간** (기본 Preset으로도 충분)

---

### Phase 3: 개발자 경험 개선 🥉

#### 3.1 설정 검증 도구

**목표**: 설정 오류를 사전에 발견하고 수정 가이드 제공

**작업**:
- [ ] `pnpm hua-ux validate` 명령어 구현
  - 설정 파일 검증
  - 의존성 체크
  - 타입 검증
- [ ] 의존성 체크 도구
  - 필수 패키지 버전 확인
  - 호환성 검증
- [ ] 마이그레이션 가이드 자동 생성
  - 버전별 변경 사항 안내
  - 자동 마이그레이션 스크립트

**완료 기준**:
```bash
pnpm hua-ux validate
# ✅ Config is valid
# ⚠️  Warning: motion.style is deprecated, use motion.defaultPreset instead
```

**예상 작업 시간**: 2-3일

**우선순위**: 🥉 **낮음** (기능 구현 우선)

---

#### 3.2 문서화 강화

**목표**: 개발자가 쉽게 시작하고 활용할 수 있도록 문서 개선

**작업**:
- [ ] API 레퍼런스 완성
  - 모든 export 함수/타입 문서화
  - 사용 예시 추가
- [ ] 튜토리얼 시리즈
  - 5분 시작 가이드
  - Branding 적용 튜토리얼
  - 플러그인 개발 튜토리얼
- [ ] 비디오 가이드 (선택적)
  - 기본 사용법
  - 고급 기능

**예상 작업 시간**: 3-5일

**우선순위**: 🥉 **낮음** (현재 문서로도 충분)

---

## 기술적 고려사항

### 모션 Pro 플러그인 아키텍처

**패키지 구조**:
```
packages/hua-motion-core-pro/
├── src/
│   ├── hooks/
│   │   ├── useParallax.ts
│   │   ├── useMotion3D.ts
│   │   └── useCustomEasing.ts
│   ├── components/
│   │   ├── ParallaxScroll.tsx
│   │   └── Motion3D.tsx
│   ├── index.ts
│   └── plugin.ts  // motionProPlugin export
├── package.json
└── README.md
```

**라이선스 통합**:
```typescript
// packages/hua-motion-core-pro/src/plugin.ts
import type { HuaUxPlugin } from '@hua-labs/hua-ux/framework';
import { hasLicense } from '@hua-labs/hua-ux/framework';

export const motionProPlugin: HuaUxPlugin = {
  name: 'motion-pro',
  version: '1.0.0',
  license: 'pro',
  checkLicense: () => hasLicense('motion-pro'),
  // ...
};
```

**의존성 관리**:
- `@hua-labs/motion-core` - 기본 모션 기능 (peer dependency)
- `@hua-labs/hua-ux` - 라이선스 검증 (peer dependency)

---

### CDN 로더 구현 전략

**구현 계획**:
1. `@hua-labs/i18n-core`에 CDN 로더 추가
2. 번역 파일 캐싱 전략 (localStorage + 메모리 캐시)
3. 실시간 업데이트 지원 (WebSocket 또는 Polling)

**API 설계**:
```typescript
// i18n-core에 추가
interface CDNLoaderConfig {
  cdnUrl: string;
  cacheStrategy?: 'memory' | 'localStorage' | 'both';
  autoUpdate?: boolean;
  updateInterval?: number;
}
```

---

### 번역 관리 대시보드 설계

**별도 서비스로 구현**:
- Next.js 기반 웹 애플리케이션
- 번역 키 관리 UI
- 실시간 편집 및 미리보기
- API 연동 (번역 파일 업로드/다운로드)

**통합 방식**:
- CDN URL을 대시보드에서 생성
- 대시보드에서 번역 파일 업데이트 시 CDN에 자동 배포

---

## 상품화 전략

### 가격 정책 (초안)

**Free**:
- 기본 기능 (motion-basic, i18n-basic, preset-basic)
- 오픈소스 프로젝트 무제한 사용

**Pro** ($29/월 또는 $290/년):
- 모션 Pro 플러그인
- i18n Pro 기능 (CDN 로더)
- Preset Pro (ecommerce, dashboard, blog)
- 커뮤니티 지원

**Enterprise** ($299/월 또는 $2,990/년):
- 모든 Pro 기능
- 화이트 라벨링
- 우선 지원
- 커스텀 개발 지원

### 라이선스 모델

**개인/소규모 팀**: Pro
**기업/대규모 팀**: Enterprise
**오픈소스 프로젝트**: Free (무제한)

### 마케팅 전략

1. **오픈소스 커뮤니티**: Free 버전으로 입소문
2. **개발자 블로그**: "5분 만에 프로젝트 생성" 스토리
3. **비디오 튜토리얼**: YouTube, Dev.to
4. **파트너십**: Next.js, Vercel 생태계와의 통합

---

## 구현 타임라인

### 1주차 (Beta 준비)
- [ ] 모션 Pro 플러그인 구현
- [ ] 문서화 및 예시 코드 작성

### 2주차 (Beta 릴리즈)
- [ ] i18n Pro 기능 (CDN 로더)
- [ ] Beta 버전 릴리즈 준비

### 3-4주차 (완성도 향상)
- [ ] 추가 컴포넌트 Branding 적용
- [ ] Preset 시스템 확장
- [ ] 설정 검증 도구

### 5주차 이후 (Stable)
- [ ] 번역 관리 대시보드
- [ ] 문서화 강화
- [ ] Stable 버전 릴리즈

---

## 리스크 및 대응 방안

### 기술적 리스크

1. **라이선스 API 연동 복잡성**
   - 대응: 단계적 구현 (더미 → 실제 API)

2. **플러그인 시스템 성능**
   - 대응: 초기에는 충분히 빠름, 필요 시 최적화

3. **CDN 로더 구현 복잡성**
   - 대응: 기본 구현부터 시작, 점진적 개선

### 비즈니스 리스크

1. **시장 수요 불확실성**
   - 대응: Free 버전으로 검증 후 Pro 기능 확장

2. **경쟁사 대응**
   - 대응: 차별화 포인트 강화 (모션, 바이브 코딩)

---

## 성공 지표

### 기술적 지표
- [ ] 모션 Pro 플러그인 다운로드 수
- [ ] i18n Pro 기능 사용률
- [ ] 플러그인 시스템 활용도

### 비즈니스 지표
- [ ] Pro 라이선스 구매 수
- [ ] Enterprise 라이선스 구매 수
- [ ] 커뮤니티 기여도

---

## 참고 자료

- [상품화 전략](./COMMERCIALIZATION_STRATEGY.md)
- [플러그인 시스템 설계](./PLUGIN_SYSTEM_DESIGN.md)
- [구현 로드맵](./IMPLEMENTATION_ROADMAP.md)
- [다음 단계 플래닝](./NEXT_PHASE_PLANNING.md)
- [셀프 리뷰](./SELF_REVIEW_2025-12-28.md)

---

**작성일**: 2025-12-28  
**작성자**: HUA Platform 개발팀
