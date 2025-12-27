# hua-ux 다음 단계 계획

## 제미나이 리뷰 반영 사항

제미나이 리뷰에서 제안된 개선사항을 반영한 다음 단계 계획입니다.

## ✅ 이미 완료된 개선사항

### 1. Config Autocomplete 개선
- `defineConfig` 함수에 상세한 JSDoc 주석 추가
- 모든 설정 옵션에 대한 타입 안전성 및 설명 제공
- IntelliSense에서 각 옵션의 설명과 예시 확인 가능

## 🚀 다음 단계 계획

### Phase 1: Alpha → Beta (우선순위 높음)

#### 1. Edge Runtime 최적화

**목표**: Edge Runtime에서 번역 데이터를 효율적으로 로드

**구현 계획**:
- [ ] Edge-optimized 번역 로더 구현
  ```typescript
  // packages/hua-ux/src/framework/utils/edge-translations.ts
  export function createEdgeTranslationLoader(apiPath: string) {
    return async (language: string, namespace: string) => {
      const response = await fetch(
        `${apiPath}?language=${language}&namespace=${namespace}`,
        { next: { revalidate: 3600 } }
      );
      return response.json();
    };
  }
  ```
- [ ] 번역 파일 경량화 스크립트
  ```bash
  pnpm hua-ux optimize translations
  ```
- [ ] Edge Runtime 제약사항 문서 보완

**예상 효과**:
- Edge Runtime에서 번역 로딩 성능 향상
- 번역 파일 크기 감소 (30-50% 예상)

#### 2. 코드 생성기 설계 및 구현

**목표**: 개발자가 빠르게 페이지, 컴포넌트, 훅, API Route를 생성

**구현 계획**:
- [ ] CLI 명령어 구조 설계 (완료: `docs/CLI_DESIGN.md`)
- [ ] 페이지 생성기 (`pnpm hua-ux gen page <name>`)
- [ ] 컴포넌트 생성기 (`pnpm hua-ux gen component <name>`)
- [ ] 훅 생성기 (`pnpm hua-ux gen hook <name>`)
- [ ] API Route 생성기 (`pnpm hua-ux gen api <name>`)

**생성되는 파일 예시**:
```
pnpm hua-ux gen page DiaryList
→ app/diary-list/page.tsx
→ translations/ko/diary-list.json
→ translations/en/diary-list.json
```

**예상 효과**:
- 개발 속도 2-3배 향상
- 일관된 코드 스타일 유지
- 보일러플레이트 코드 제거

#### 3. 설정 검증 도구

**목표**: 프로젝트 구조와 설정의 유효성 검증

**구현 계획**:
- [ ] `pnpm hua-ux validate` 명령어 구현
- [ ] 파일 구조 검증
- [ ] i18n 번역 파일 일관성 검증
- [ ] 설정 파일 유효성 검증
- [ ] 의존성 버전 호환성 검증

**예상 효과**:
- 설정 오류 조기 발견
- 프로젝트 구조 일관성 유지

### Phase 2: Beta → Stable (우선순위 중간)

#### 4. SSR 하이드레이션 개선

**목표**: `createHuaStore`의 SSR 하이드레이션 안정성 향상

**구현 계획**:
- [ ] `isMounted` 상태 체크 로직 내부화
- [ ] 하이드레이션 완료 전까지 기본값 사용
- [ ] 하이드레이션 에러 자동 복구

**예상 효과**:
- SSR 하이드레이션 에러 제로
- 사용자 경험 향상

#### 5. 프리셋 확장

**목표**: 다양한 사용 사례를 위한 추가 프리셋 제공

**구현 계획**:
- [ ] `dashboardPreset` - 대시보드용 (빠른 전환, 최소 모션)
- [ ] `blogPreset` - 블로그용 (읽기 중심, 부드러운 전환)
- [ ] `ecommercePreset` - 전자상거래용 (인터랙션 강조)

**예상 효과**:
- 다양한 프로젝트 타입 지원
- 빠른 프로젝트 시작

### Phase 3: Stable 이후 (우선순위 낮음)

#### 6. 성능 모니터링

**목표**: 프레임워크 사용 시 성능 지표 수집

**구현 계획**:
- [ ] 번역 로딩 시간 측정
- [ ] 모션 애니메이션 성능 추적
- [ ] 번들 크기 분석

#### 7. 플러그인 시스템

**목표**: 프레임워크 확장성 제공

**구현 계획**:
- [ ] 플러그인 인터페이스 정의
- [ ] 커스텀 미들웨어 지원
- [ ] 커스텀 프리셋 등록

## 구현 일정

### 2025년 12월 (Alpha)
- ✅ 기본 구조 완성
- ✅ Config Autocomplete 개선
- ✅ 문서화

### 2026년 1월 (Beta 목표)
- [ ] Edge Runtime 최적화
- [ ] 페이지/컴포넌트 생성기
- [ ] 설정 검증 도구

### 2026년 2월 (Stable 목표)
- [ ] 모든 생성기 완성
- [ ] SSR 하이드레이션 개선
- [ ] 프리셋 확장

## 참고 자료

- [CLI 설계 문서](../create-hua-ux/docs/CLI_DESIGN.md)
- [프레임워크 레이어 README](../src/framework/README.md)
- [제미나이 리뷰 피드백](./GEMINI_REVIEW.md)
