# Hue - Development Log

> **Hue** - HUA Labs의 비주얼 UI 에디터. "휴~" 숨소리 컨셉 (후아, 숨, 휴)

## 2026-01-11: 템플릿 시스템 + 타이포그래피 + AI 기능 기획

### 템플릿 시스템 구현

자주 쓰는 컴포넌트 조합을 템플릿으로 저장/재사용하는 기능 완성.

**스토어** (`store/template-store.ts`)
- Template 인터페이스 (id, name, category, node, useCount, isPro 등)
- 카테고리: layout, card, hero, form, navigation, custom
- Zustand persist (사용자 정의만 저장, 빌트인은 코드에서 제공)
- getRecentTemplates, getPopularTemplates 유틸

**빌트인 템플릿 (11개)**
- Hero: 심플 히어로, 그라데이션 히어로 (Pro)
- Card: 기능 카드, 후기 카드, 프라이싱 카드 (Pro)
- Layout: 기능 그리드 (3열), 프라이싱 섹션 (Pro)
- Form: 연락처 폼, 로그인 폼, 회원가입 폼
- Navigation: 헤더 네비게이션, 푸터

**UI** (`components/panels/TemplatePalette.tsx`)
- 카테고리 필터 탭
- Pro 배지 표시 (그라디언트 보라색)
- 드래그앤드롭 지원
- 선택 노드를 템플릿으로 저장
- 사용 횟수 표시

**통합**
- page.tsx LeftPanel에 "템플릿" 탭 추가 (컴포넌트 | 템플릿 | 레이어)

### 타이포그래피 스타일 확장

Text, H1~H4 컴포넌트에 세밀한 타이포그래피 조정 옵션 추가.

**새 props** (`lib/component-metadata.ts`)
- `fontSize` - 12px~60px 프리셋 (xs~6xl)
- `lineHeight` - 1.0~2.0 (빽빽~아주 넓음)
- `fontWeight` - 300~800 (가늘게~아주 두껍게)
- `letterSpacing` - -0.05em~0.1em (좁게~아주 넓게)

**렌더링** (`packages/hua-ui/src/sdui/registry.tsx`)
- getTypographyStyle() 헬퍼 함수
- style 객체로 병합해서 DOM에 적용

> 참고: 일반 사용자는 variant 프리셋 사용, 세밀한 조정이 필요한 사용자용

### AI 기능 기획 문서화

`docs/ai-features.md` - AI 기능 통합 지점 정리:

1. **컴포넌트 생성 AI** - 프롬프트 → EditorNode JSON
2. **속성 편집 어시스턴트** - "더 눈에 띄게" → props 변경 제안
3. **텍스트 콘텐츠 생성** - 카피라이팅, 번역
4. **레이아웃 추천** - 버튼 3개 추가 시 "Flex로 배치할까요?"
5. **전체 페이지 생성** - 섹션 조합 랜딩페이지 자동 생성
6. **접근성 검사** - alt 텍스트, 색상 대비 등
7. **스타일 일관성** - 간격, 버튼 스타일 통일 제안

**구현 우선순위**
1. 텍스트 생성 (낮은 난이도, 높은 가치)
2. 컴포넌트 생성 (중간, 높음)
3. 전체 페이지 생성 (높음, 매우 높음)

**Basic vs Pro 구분**
- Basic: 일일 10회 텍스트 생성, 기본 추천
- Pro: 무제한, 전체 페이지, 고급 분석

### 버그 수정

**캔버스 삭제 버튼 정사각형** (`components/editor/Canvas.tsx`)
- 문제: `p-0.5` 사용으로 정사각형 아님
- 해결: `w-4 h-4 flex items-center justify-center`로 변경

---

## 2026-01-11: i18n 마이그레이션 + Phase 3 시작 + ColorPicker 개선

### i18n-core-zustand 마이그레이션

기존 로컬 i18n 구현에서 `@hua-labs/i18n-core` + `@hua-labs/i18n-core-zustand`로 마이그레이션.

#### 변경된 파일들

**새로 생성**
- `i18n/ko.ts` - 한국어 번역 (120+ 키)
- `i18n/en.ts` - 영어 번역
- `i18n/index.ts` - 번역 타입 & 내보내기
- `providers/I18nProvider.tsx` - i18n-core-zustand 프로바이더
- `hooks/useHueTranslation.ts` - 호환 레이어 (t.toolbar.undo 스타일 유지)
- `components/settings/SettingsModal.tsx` - 언어 설정 모달

**수정됨**
- `store/i18n-store.ts` - ZustandLanguageStore 인터페이스 사용
- `store/index.ts` - i18n 관련 re-export 추가
- `app/layout.tsx` - HueI18nProvider 래핑
- `components/toolbar/EditorToolbar.tsx` - 설정 버튼 추가

#### 호환 레이어 구조

```typescript
// useHueTranslation.ts
export function useHueTranslation() {
  const { currentLanguage, setLanguage, t: translate } = useCoreTranslation();
  const t = translations[currentLanguage] || translations.ko;

  return {
    t,           // 객체 스타일: t.toolbar.undo
    translate,   // 함수 스타일: translate('toolbar.undo')
    language,
    setLanguage,
    languages: LANGUAGES,
  };
}
```

i18n-core는 함수형 API(`t('key')`)지만, Hue는 객체형(`t.key`)을 사용 중이라 호환 레이어로 둘 다 지원.

### ColorPicker 탭 분리

테일윈드 프리셋과 커스텀 선택을 탭으로 분리해서 UX 개선.

**Tailwind 탭**
- 18개 색상 계열 × 10 단계 팔레트
- gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

**Custom 탭**
- HSL 색상 선택기 (채도/밝기 매트릭스 + 색조 슬라이더)
- HEX 직접 입력
- 현재 값 표시

### Phase 3: Action System 시작

#### 구현 완료

**타입 정의** (`types/editor.ts`)
- `ActionType` - navigate, api, setState, toast, modal, analytics, custom
- 각 액션별 Config 인터페이스 (NavigateActionConfig, ApiActionConfig 등)
- `EditorAction` - 체이닝 지원 (onSuccess, onError)
- `ActionContext` - 실행 컨텍스트 (state, navigate, toast 등)
- `ActionResult` - 실행 결과

**액션 엔진** (`lib/action-engine.ts`)
- `executeAction()` - 단일 액션 실행
- `executeActions()` - 액션 체인 실행
- 핸들러: navigate, api, setState, toast, modal, analytics, custom
- 조건부 실행, 에러 핸들링, 체이닝 지원
- `createAction()` 헬퍼 함수
- `registerActionHandler()` 확장 API

**액션 에디터 UI** (`components/properties/ActionEditor.tsx`)
- 이벤트 토글 (onClick, onSubmit, onChange, onFocus, onBlur, onLoad)
- 액션 타입별 설정 UI:
  - Navigate: 경로, 새 탭, 히스토리 대체
  - SetState: 상태 경로, 값
  - Toast: 메시지, 스타일(success/error/warning), 시간
  - Modal: 열기/닫기, 모달 ID
  - API: 메서드, 엔드포인트, 결과 저장 경로
- 액션 체이닝 구조 (접힘/펼침)
- PropertiesPanel에 통합

**캔버스 액션 뱃지** (`components/editor/Canvas.tsx`)
- 액션이 있는 노드에 보라색 번개 뱃지 표시 (zap 아이콘)
- 액션 개수 표시
- 조건 뱃지(ON/OFF) 옆에 배치

### 버그 수정

**hua-ui Box/Flex/Grid 커스텀 prop 누출 수정** (`packages/hua-ui/src/sdui/registry.tsx`)
- 문제: `backgroundColor`, `padding` 등 커스텀 props가 DOM에 직접 전달되어 React 경고 발생
- 해결: 커스텀 props를 destructure하여 style 객체로 변환
- 지원 props: `backgroundColor`, `padding`, `margin`, `borderRadius`, `border`

```typescript
// Before (경고 발생)
<div {...props}> // backgroundColor가 DOM에 전달

// After (수정됨)
const { backgroundColor, padding, ...rest } = props;
<div style={{ backgroundColor, padding }} {...rest}>
```

### 에셋 추가

- `app/favicon.ico` - 앱 파비콘
- `hue-logo.svg` - 로고 (teal→purple 그라디언트, 무한 심볼)

### 향후 계획: Pro 컴포넌트 흡수

Hue에서 만든 좋은 컴포넌트들을 hua-ui Pro로 흡수 예정:
- **ColorPicker** - 탭 기반 (Tailwind 프리셋 / Custom HSL)
- **ActionEditor** - 이벤트 액션 편집 UI
- 다크/라이트 테마 패턴 매칭 기능

---

## 2026-01-11: 리브랜딩 + Phase 1 완성 + 문서화 + 확장

### 리브랜딩
- **SDUI Editor → Hue** 이름 변경
- 폴더: `apps/sdui-editor` → `apps/hue`
- HUA Labs 브랜딩 (숨소리 컨셉: 후아, 숨, 휴)

### 오늘 구현한 것

#### Core Features
- **드래그앤드롭**: 팔레트 → 캔버스, 노드 간 이동/재정렬
- **라이브 프리뷰**: SDUIRenderer 연동으로 실시간 렌더링
- **속성 패널**: props 편집 (string, number, boolean, select)
- **프로젝트 관리**: localStorage 저장/로드, JSON 내보내기/가져오기
- **Undo/Redo**: 50단계 히스토리 (메모리 only)

#### UI/UX
- **3패널 레이아웃**: 왼쪽(팔레트) + 중앙(캔버스) + 오른쪽(속성)
- **패널 폴딩**: 좌우 패널 접기/펼치기 애니메이션
- **패널 리사이즈**: 드래그로 너비 조절
- **프리뷰 모드**: P키로 토글, 편집 UI 없이 순수 렌더링
- **컨텍스트 메뉴**: 우클릭으로 복제/삭제 (화면 경계 체크)

#### 내보내기 개선
- 드롭다운 메뉴로 변경 (JSON/코드 섹션)
- 클립보드 복사 기능 추가
- 복사 완료 토스트 피드백
- **React 스니펫 복사** - SDUIRenderer 포함 바로 붙여넣기 가능한 코드

#### 반응형 프리뷰
- 툴바에 모바일/태블릿/데스크톱 버튼 추가
- 모바일: 375px, 태블릿: 768px, 데스크톱: 전체
- 뷰포트 크기 표시 + 시각적 구분 (보라색 테두리)

#### 컴포넌트
- 레이아웃: Box, Flex, Grid, Section, Container, Spacer, Divider
- 타이포그래피: H1-H4, Text, Link
- UI: Button, Badge, Avatar, Input, Textarea, Checkbox, Switch, Label
- 카드: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- 피드백: Alert, Skeleton, Progress
- 미디어: Image, Icon
- Advanced (Pro): Header, HeroSection, ScrollProgress
- Interactive (Pro): **Accordion**, **Tabs** (신규 추가)

### 문서화
- `advanced-sdui-features.md`: Phase 2+ 기획 (조건부 렌더링, 이벤트 플로우, 스켈레톤)
- `i18n-canvas-builder.md`: i18n 확장 기획
- `phase2-logic-engine.md`: Phase 2 상세 구현 가이드 (ConditionEvaluator, Context Store, UI)

### 잼민이 피드백 반영 (Session 1)
- 조건 시각화 UI 설계
- 재귀적 조건 그룹 구조
- Action Engine context pipeline
- Custom 액션 타입 확장성

### 잼민이 피드백 반영 (Session 2) - Logic Engine 기획
- ConditionEvaluator 설계 제안 (`evaluateCondition(condition, context)`)
- lodash/get 스타일 깊은 참조 해결
- Context Mocking UI 아이디어 (에디터에서 `isLoggedIn` 토글하면 실시간 반영)
- "도파민 루프" 접근법: UI → Logic으로 진화

### 빌드 에러 수정
- `IconName` import 경로 수정 (`../components/Icon` → `../lib/icons`)
- 유효하지 않은 아이콘 이름 수정:
  - `grid` → `square`
  - `layers` → `menu`
  - `help` → `helpCircle`
- `SDUIRenderer` prop 이름 수정 (`registry` → `components`)
- `removeNode` → `deleteNode` 메서드명 통일
- `childrenType: "none"` 제거 (allowsChildren: false로 충분)

### UX 개선
- **패널 단축키** - `[` 왼쪽 패널, `]` 오른쪽 패널, `C` 컨텍스트 패널 토글
- **접힌 패널 핸들러** - 세로 텍스트 → 아이콘 버튼으로 개선 (chevron 화살표)
- **미리보기 반응형** - 편집 모드 뷰포트 크기가 미리보기에도 적용
  - 헤더에 뷰포트 라벨 표시 (모바일 375px, 태블릿 768px)
  - 반응형일 때 중앙 정렬 + primary 테두리
- **Undo/Redo 단축키** - `Ctrl+Z`, `Ctrl+Shift+Z`, `Ctrl+Y`
- **노드 삭제 단축키** - `Delete`, `Backspace`

### Phase 2: Logic Engine 구현 완료
- **evaluateCondition** - 조건 평가 엔진 (`lib/condition-evaluator.ts`)
  - 연산자: eq, neq, gt, gte, lt, lte, contains, exists, empty 등
  - AND/OR 논리 연산자
  - 깊은 경로 접근 (getByPath)
- **Context Store** - 미리보기 컨텍스트 (`store/context-store.ts`)
  - 프리셋: guest, member, admin, proUser, emptyCart, fullCart
  - setByPath로 깊은 경로 수정
- **Context Panel** - 컨텍스트 토글 UI (`components/panels/ContextPanel.tsx`)
- **Canvas 조건부 렌더링** - 조건 미충족 시 opacity 30% + ON/OFF 뱃지
- **속성 패널 조건 편집** - 규칙 추가/삭제, AND/OR, 필드 자동완성
- **툴바 Context 버튼** - 패널 열기/닫기

### Tailwind v4 마이그레이션 이슈 (Edge Case)

> **문제**: `bg-secondary`, `text-primary` 등 Tailwind 색상 유틸리티가 동작 안 함

hua-ui 패키지가 8개월 전 Tailwind v3 기준 코드라서 CSS 변수 방식이 달라짐.

**해결**: `globals.css`에 `@theme` 블록 추가

```css
@theme {
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  /* ... 모든 테마 색상 */
}
```

Tailwind v4는 `--color-*` 네이밍 컨벤션을 따라야 `bg-*`, `text-*` 유틸리티가 동작.
각 앱의 `globals.css`에 추가 필요. 패키지 레벨 해결은 앱별 테마 커스텀 제한됨.

---

## TODO

### Phase 1 마무리 ✅
- [x] Accordion, Tabs 컴포넌트 추가
- [x] 반응형 프리뷰 (모바일/태블릿 뷰포트)
- [x] React 스니펫 복사 기능
- [x] i18n 지원 (한/영)
- [x] 템플릿 시스템 (11개 빌트인 + 사용자 정의)
- [ ] Dialog 컴포넌트 추가

### Phase 2: 조건부 렌더링 ✅
- [x] condition 스키마 정의
- [x] ConditionEvaluator 구현
- [x] 에디터 UI (조건 탭)
- [x] 조건 있는 노드 시각화 (배지, 반투명)

### Phase 3: 이벤트 액션 ✅
- [x] actions 스키마 정의 (ActionType, EditorAction, EventHandlers)
- [x] executeActions 엔진 (체이닝, 조건부 실행)
- [x] 기본 액션 (navigate, toast, setState, modal, api, analytics, custom)
- [x] 액션 에디터 UI (속성 패널 통합)

### Phase 4: 로딩 상태
- [ ] loading 스키마 정의
- [ ] dataSource 연동
- [ ] 자동 스켈레톤 생성

### Phase 5: Pro 컴포넌트 흡수
- [ ] ColorPicker → hua-ui Pro
- [ ] ActionEditor → hua-ui Pro
- [ ] 다크/라이트 테마 패턴 매칭

---

## 기술 스택

- **Framework**: Next.js 16 (Turbopack)
- **UI**: @hua-labs/ui (내부 디자인 시스템)
- **State**: Zustand + persist middleware
- **DnD**: HTML5 Drag and Drop API
- **ID**: nanoid

---

## 메모

- 노코드 한계는 커스텀 패키지(npm)로 확장
- Phase 1-2는 랜딩 페이지 시장, 3-4는 어드민 시장 타겟
- "짭 Lovable" 시작 → **Hue** (Logic & Data Driven UX Engine)으로 진화 중
- 브랜딩: 후아(HUA) → 숨 → **휴(Hue)** - 숨소리 컨셉 통일
