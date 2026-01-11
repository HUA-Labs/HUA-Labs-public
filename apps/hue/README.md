# Hue

> **휴~** HUA Labs의 비주얼 UI 에디터

드래그앤드롭으로 UI를 만들고 JSON 스키마로 내보내는 SDUI(Server-Driven UI) 비주얼 에디터.

```
후아(HUA) → 숨 → 휴(Hue)
         숨소리 브랜딩
```

## Features

### Core
- **드래그앤드롭** - 팔레트에서 캔버스로, 노드 간 이동/재정렬
- **라이브 프리뷰** - SDUIRenderer 연동 실시간 렌더링
- **속성 패널** - props 편집 (string, number, boolean, select)
- **프로젝트 관리** - localStorage 저장/로드, JSON 내보내기/가져오기
- **Undo/Redo** - 50단계 히스토리

### UI/UX
- **3패널 레이아웃** - 컴포넌트 팔레트 | 캔버스 | 속성 패널
- **패널 폴딩** - 좌우 패널 접기/펼치기 (`[` `]` 단축키)
- **패널 리사이즈** - 드래그로 너비 조절
- **프리뷰 모드** - `P`키로 토글, 편집 UI 없이 순수 렌더링
- **반응형 프리뷰** - 모바일(375px) / 태블릿(768px) / 데스크톱
- **컨텍스트 메뉴** - 우클릭으로 복제/삭제

### Logic Engine (Phase 2)
- **조건부 렌더링** - 컨텍스트 기반 노드 표시/숨김
- **조건 평가 엔진** - eq, neq, gt, contains, exists 등 연산자
- **컨텍스트 패널** - 프리셋(guest/member/admin) + 값 토글
- **조건 에디터** - 속성 패널에서 규칙 추가/삭제

### Action System (Phase 3)
- **액션 타입** - navigate, api, setState, toast, modal, analytics, custom
- **액션 체이닝** - onSuccess/onError로 연속 실행
- **조건부 실행** - 컨텍스트 기반 액션 분기
- **커스텀 핸들러** - 확장 가능한 액션 시스템

### i18n
- **다국어 지원** - 한국어/영어 (설정에서 전환)
- **@hua-labs/i18n-core** 연동 - 자체 i18n 패키지 사용

### Export
- **JSON 스키마** - SDUI 호환 JSON 내보내기
- **React 스니펫** - SDUIRenderer 포함 바로 붙여넣기 가능한 코드
- **클립보드 복사** - 토스트 피드백

## Quick Start

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev --filter=hue

# http://localhost:3020
```

## Components

### Layout
`Box` `Flex` `Grid` `Section` `Container` `Spacer` `Divider`

### Typography
`H1` `H2` `H3` `H4` `Text` `Link`

### Form
`Button` `Input` `Textarea` `Checkbox` `Switch` `Label`

### Display
`Card` `CardHeader` `CardTitle` `CardDescription` `CardContent` `CardFooter`
`Badge` `Avatar` `Image` `Icon`

### Feedback
`Alert` `Progress` `Skeleton`

### Advanced (Pro)
`Header` `HeroSection` `ScrollProgress` `Accordion` `Tabs`

## Keyboard Shortcuts

| 키 | 동작 |
|---|------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo |
| `Ctrl+C` | 노드 복사 |
| `Ctrl+V` | 노드 붙여넣기 |
| `Ctrl+D` | 노드 복제 |
| `Delete` / `Backspace` | 선택 노드 삭제 |
| `P` | 프리뷰 모드 |
| `E` / `Esc` | 편집 모드 |
| `[` | 왼쪽 패널 토글 |
| `]` | 오른쪽 패널 토글 |
| `C` | 컨텍스트 패널 토글 |

## Architecture

```
apps/hue/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 에디터 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # Tailwind v4 + 테마
├── components/
│   ├── editor/            # 에디터 코어
│   │   ├── Canvas.tsx     # 드롭존 + 노드 렌더링
│   │   ├── PreviewCanvas.tsx  # 미리보기 모드
│   │   └── EditorLayout.tsx   # 3패널 레이아웃
│   ├── panels/            # 사이드 패널들
│   │   ├── ComponentPalette.tsx  # 컴포넌트 목록
│   │   ├── ComponentTree.tsx     # 레이어 트리
│   │   ├── PropertiesPanel.tsx   # 속성 편집
│   │   └── ContextPanel.tsx      # 컨텍스트 토글
│   └── toolbar/           # 상단 툴바
├── store/                 # Zustand 스토어
│   ├── editor-store.ts    # 에디터 상태 (스키마, 선택, 드래그)
│   ├── history-store.ts   # Undo/Redo
│   ├── context-store.ts   # 프리뷰 컨텍스트
│   ├── project-store.ts   # 프로젝트 저장/로드
│   └── i18n-store.ts      # 언어 설정 (ZustandLanguageStore)
├── i18n/                  # 다국어
│   ├── ko.ts              # 한국어
│   ├── en.ts              # 영어
│   └── index.ts           # 타입 & 내보내기
├── providers/             # 컨텍스트 프로바이더
│   └── I18nProvider.tsx   # i18n-core-zustand 연동
├── hooks/                 # 커스텀 훅
│   └── useHueTranslation.ts   # 번역 호환 레이어
├── lib/                   # 유틸리티
│   ├── component-metadata.ts   # 컴포넌트 메타데이터
│   ├── condition-evaluator.ts  # 조건 평가 엔진
│   ├── action-engine.ts        # 액션 실행 엔진
│   ├── schema-utils.ts         # 노드 조작 함수
│   └── id-utils.ts             # nanoid 래퍼
├── types/                 # TypeScript 타입
│   └── editor.ts          # EditorNode, Condition 등
└── docs/                  # 문서
```

## Tech Stack

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (Turbopack) |
| UI | @hua-labs/ui (내부 디자인 시스템) |
| State | Zustand 5 + persist/subscribeWithSelector |
| Styling | Tailwind CSS 4 |
| DnD | HTML5 Drag and Drop API |
| ID | nanoid |

## Data Flow

```
ComponentPalette                    Canvas
      │                               │
      │ drag start                    │
      ▼                               │
  EditorStore.startDrag()            │
      │                               │
      │ hover                         │
      ▼                               │
  EditorStore.setHover()             │
      │                               │
      │ drop                          │
      ▼                               ▼
  EditorStore.addNode() ───────► Schema Update
      │                               │
      │                               │
      ▼                               ▼
  HistoryStore.push() ◄─────── Auto Sync
```

## Roadmap

### Phase 1: UI Builder ✅
- [x] 드래그앤드롭 캔버스
- [x] 컴포넌트 팔레트
- [x] 속성 편집기
- [x] JSON 내보내기/가져오기
- [x] Undo/Redo
- [ ] 템플릿 시스템
- [ ] Dialog 컴포넌트

### Phase 2: Logic Engine ✅
- [x] 조건부 렌더링
- [x] 조건 평가 엔진
- [x] 컨텍스트 패널
- [x] 조건 에디터 UI
- [ ] 중첩 조건 그룹 (AND/OR)

### Phase 3: Event Actions ✅
- [x] actions 스키마 정의 (ActionType, EditorAction)
- [x] 액션 실행 엔진 (action-engine.ts)
- [x] navigate, toast, setState 액션
- [x] API 호출 + 체이닝 (onSuccess/onError)
- [x] 액션 에디터 UI (속성 패널)

### Phase 4: Data Loading
- [ ] loading 스키마 정의
- [ ] dataSource 연동
- [ ] 자동 스켈레톤 생성

### Phase 5: i18n Builder
- [ ] i18n 키 배정
- [ ] AI 키 추천
- [ ] 다국어 JSON 내보내기

## Related

- `packages/hua-ui` - UI 컴포넌트 라이브러리
- `packages/hua-ui/src/sdui` - SDUI 렌더러 & 레지스트리
- `docs/devlog.md` - 개발 로그
- `docs/advanced-sdui-features.md` - Phase 2+ 기획
- `docs/phase2-logic-engine.md` - Logic Engine 상세

## License

Private - HUA Labs
