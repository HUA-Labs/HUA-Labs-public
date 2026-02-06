# i18n 패키지 개선 TODO

> 작성일: 2026-01-15

## 완료된 작업 ✅

### 1. 패키지 정리 (12개 → 8개)
- [x] `@hua-labs/i18n-beginner` 삭제 - core가 충분히 추상화됨
- [x] `@hua-labs/i18n-sdk` 삭제 - 불필요한 래퍼
- [x] `@hua-labs/i18n-formatters` 통합 생성
  - date + number + currency 머지
  - 서브패스 export 지원 (`/date`, `/number`, `/currency`)
  - sum-diary 의존성 업데이트 완료

### 2. t() 패턴 마이그레이션 (공통 컴포넌트)
- [x] `docs.json` 번역 키 추가
  - `unpublished.*` - 미배포 컴포넌트 관련
  - `install.*` - 설치 가이드 관련
  - `valueDisplay.*` - 값 표시 (켜짐/꺼짐)
- [x] `ComponentDoc.tsx` 마이그레이션
  - UnpublishedBanner
  - ValueDisplay
- [x] `InstallGuide.tsx` 전체 마이그레이션

---

## 남은 작업 📋

### 1. advanced 패키지 머지 (우선순위: 낮음)
```
현재:
- @hua-labs/i18n-plugins
- @hua-labs/i18n-debug
- @hua-labs/i18n-advanced

목표:
- @hua-labs/i18n-advanced (통합)
  - /plugins
  - /debug
```

**작업 내용:**
1. `hua-i18n-advanced` 패키지에 plugins, debug 코드 이동
2. 서브패스 export 설정
3. 기존 패키지 삭제
4. turbo.json 빌드 태스크 정리

### 2. 개별 페이지 t() 마이그레이션 (우선순위: 중간)

64개 파일에서 `isKo` 패턴 사용 중:

**공통 컴포넌트 (완료)**
- `ComponentDoc.tsx` ✅
- `InstallGuide.tsx` ✅

**아직 isKo 사용하는 파일들:**
```
components/docs/ComponentDocNavigation.tsx
components/docs/HookDocNavigation.tsx
components/layout/Sidebar.tsx
components/SearchCommand.tsx
components/DocNavigation.tsx

app/docs/components/*.tsx (약 25개)
app/docs/hooks/*.tsx (약 15개)
app/docs/guides/*.tsx (약 10개)
app/packages/*.tsx (약 15개)
```

**마이그레이션 패턴:**
```tsx
// Before (isKo 패턴)
const isKo = currentLanguage === "ko";
<p>{isKo ? "한글 설명" : "English description"}</p>

// After (t() 패턴)
<p>{t("docs:component.description")}</p>
```

**주의사항:**
- `descriptionKo`, `titleKo` 같은 prop 패턴은 유지 필요
- 각 컴포넌트별 translation key 추가 필요
- ko/docs.json, en/docs.json 동시 업데이트

### 3. PropsTable descriptionKo 패턴 개선 (우선순위: 낮음)

현재 PropsTable은 수동으로 prop 배열 전달:
```tsx
const props = [
  {
    name: "variant",
    type: "string",
    description: "Button style variant",
    descriptionKo: "버튼 스타일 변형",
  },
];
```

**개선 방안:**
- TypeScript 타입에서 자동 추출 검토
- 또는 translation key 기반으로 변경

---

## 현재 i18n 패키지 구조

```
@hua-labs/i18n-core          # 핵심 (유지)
@hua-labs/i18n-core-zustand  # Zustand 어댑터 (유지)
@hua-labs/i18n-loaders       # 로더 (유지)
@hua-labs/i18n-formatters    # 포맷터 (NEW - 통합)
@hua-labs/i18n-ai            # AI 번역 (유지 - Pro)
@hua-labs/i18n-plugins       # 플러그인 (머지 대상)
@hua-labs/i18n-debug         # 디버그 (머지 대상)
@hua-labs/i18n-advanced      # 고급 (머지 타겟)
```

**목표 구조 (8개 → 6개):**
```
@hua-labs/i18n-core
@hua-labs/i18n-core-zustand
@hua-labs/i18n-loaders
@hua-labs/i18n-formatters
@hua-labs/i18n-ai
@hua-labs/i18n-advanced      # plugins + debug 포함
```
