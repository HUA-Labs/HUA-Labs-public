# 프로젝트 전체 구조 및 상세 설명

## 1. 프로젝트 트리 구조 (2025-05 기준)

```text
.
├── package.json              # 프로젝트 의존성 및 스크립트
├── tailwind.config.js        # TailwindCSS 설정
├── next.config.js            # Next.js 설정
├── tsconfig.json             # TypeScript 설정
├── README.md                 # 프로젝트 소개
├── .env                      # 환경변수(MONGODB_URI 등)
├── src/                      # 소스 코드 루트
│   ├── app/                  # Next.js 라우팅, 페이지/레이아웃
│   ├── components/           # UI 컴포넌트
│   ├── stores/               # 상태 관리(zustand 등)
│   ├── lib/                  # 공용 라이브러리 코드
│   ├── models/               # DB 모델/스키마
│   ├── modules/              # 프리셋/설정 yaml
│   ├── types/                # 타입 정의
│   ├── hooks/                # 커스텀 훅
│   ├── shared/               # 공통 유틸리티/상수
│   ├── config/               # 환경설정 yaml
│   └── styles/               # 스타일 파일
├── public/                   # 정적 파일/이미지
├── docs/                     # 문서
├── data-lab/                 # 데이터 실험/분석
├── models/                   # 서버/DB 모델
├── types/                    # 타입 정의(루트)
└── ...
```

---

## 2. 폴더/파일별 상세 설명

### 루트

- **package.json**: 의존성, 빌드/실행 스크립트, 버전 관리
- **tailwind.config.js**: TailwindCSS 커스텀 설정
- **next.config.js**: Next.js 런타임/빌드 설정
- **tsconfig.json**: TypeScript 컴파일러 옵션
- **README.md**: 프로젝트 개요, 주요 기능, 실행법
- **.env**: 환경변수 (DB 연결 등)

### src/

- **app/**: Next.js 라우팅, 페이지/레이아웃, 엔트리포인트
  - `page.tsx`: 메인 페이지
  - `layout.tsx`: 전체 레이아웃
  - `chat/`, `login/`, `api/` 등: 각종 라우트/엔드포인트
- **components/**: UI 컴포넌트 집합
  - `ChatUI.tsx`: 채팅 UI, 메시지 렌더링
  - `SessionSidebar.tsx`: 세션 목록/사이드바
  - `SessionHeader.tsx`: 채팅방 헤더
  - `ui/`: 버튼, 입력창 등 재사용 UI
  - `icons/`: SVG/React 아이콘 컴포넌트
  - `chat/`: 채팅 관련 세부 컴포넌트
- **stores/**: zustand 등 상태 관리
  - `sessionStore.ts`: 세션 상태, 사이드바 토글 등
  - `chatStore.ts`: 채팅 상태
  - `uiStore.ts`: UI 상태
- **lib/**: 공용 라이브러리/유틸리티
  - `mongodb.ts`: MongoDB 연결
  - `openai.ts`: OpenAI API 연동
  - `slip-checker.ts`: 슬립 체크 로직
  - `utils.ts`: 범용 함수
- **models/**: DB 모델/스키마
  - `EmotionLog.ts`: 감정 로그 mongoose 모델
- **modules/**: 프리셋/설정 yaml
  - `tiers.yml`, `tone-filters.yml` 등: 티어, 톤, 모드, 윤리 프리셋
- **types/**: 타입스크립트 타입 정의
  - `session.ts`, `chat.ts`: 세션/채팅 타입
- **hooks/**: 커스텀 훅
  - `useChatLimit.ts`, `useAutoScroll.ts`: 채팅 제한, 자동 스크롤 등
- **shared/**: 공통 유틸리티/상수/프롬프트
  - `systemPrompt.ts`, `tonePrompts.ts`: 시스템/톤 프롬프트
  - `user.ts`, `session-title-generator.ts`: 유저/세션 관련 유틸
  - `rhythm-loader.ts`: 리듬 프리셋 로더
- **config/**: 환경설정 yaml
  - `emotion-words.yml`: 감정 단어 프리셋
- **styles/**: 글로벌/컴포넌트 스타일

### 기타

- **public/**: 정적 파일, 이미지, favicon 등
- **docs/**: 문서, API 명세, 구조도, 테스트 리포트 등
- **data-lab/**: 데이터 실험, 샘플, 스키마, 분석 리포트
- **models/**: 서버/DB 모델 (루트)
- **types/**: 타입 정의 (루트)

---

## 3. 주요 데이터 흐름 및 상호작용

- **app/** → **components/**, **stores/**, **hooks/**, **lib/**, **models/** 등 사용
- **components/** → **stores/**, **types/**, **ui/** 등 사용
- **stores/** → zustand 등으로 상태 관리, **components/**에서 구독/제어
- **app/api/logs/** → **lib/mongodb.ts**, **models/EmotionLog.ts** 등 DB 연동
- **lib/mongodb.ts** → mongoose로 MongoDB 연결
- **modules/**, **config/** → 프리셋/설정 데이터로 **utils/lib/**에서 로드
- **prompts/** → 챗봇 프롬프트로 사용
- 라우트에서 params, 세션 상태, 메시지 등 타입 안전성 강화

---

## 4. AI 기준 디벨롭/확장 방안

- **상태 관리**: zustand store 구조 단순화, 사이드바/헤더/딤드 역할 분리 유지
- **DB 연동**: lib/mongodb.ts, models/, .env 구조 명확화, API 라우트에서 dbConnect, 모델 활용
- **타입 안전성**: params, 세션 상태, 메시지 등 타입스크립트로 엄격 관리
- **프리셋/설정**: modules/, config/의 yaml 구조 확장성 고려, 신규 프리셋 추가시 schema 일관성 유지
- **UI/UX**: 컴포넌트 분리, 재사용성 강화, 사이드바/모달/입력창 등 UX 일관성 유지
- **API/엔드포인트**: RESTful 구조, 인증/권한 분리, 외부 SDK 연동 고려
- **테스트/로깅**: data-lab/로 실험, docs/에 리포트 기록, 내부 로깅 정책 준수

---

> 본 문서는 AI(지피티/리듬이) 기준으로, 내부 구조와 확장 방안을 상세히 기술함. 인간이 읽기 어려워도 AI는 빠르게 파악 가능하도록 작성됨.
