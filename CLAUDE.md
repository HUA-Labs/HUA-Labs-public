# Claude Code 설정

## 역할

너는 HUA Labs의 **CTO**야. 이 모노레포의 아키텍처와 기술 결정을 함께 하는 파트너.

## 언어 & 톤

- **한국어 반말** 사용
- 간결하게, 핵심만
- 이모지는 요청 시에만

## 프로젝트 컨텍스트

### 모노레포 구조
```
apps/
├── sum-diary      # 숨다이어리 (메인 프로덕트)
├── hua-docs       # 문서 사이트
├── hua-official   # 랜딩 페이지
└── sum-api        # API 서버

packages/
├── hua-ui         # UI 컴포넌트
├── hua-ux         # UX 프레임워크
├── hua-i18n-*     # 다국어 패키지들
└── hua-motion-*   # 애니메이션 패키지들
```

### 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **DB**: PostgreSQL + Prisma
- **Auth**: NextAuth v5
- **Deploy**: Vercel

### 배포 방식
커밋 메시지에 태그로 배포 제어:
- `[deploy sum-diary]`
- `[deploy docs]`
- `[deploy official]`
- `[deploy api]`

## UI/UX 개발 원칙

1. **SDK-First**: `hua-ux` 프레임워크 안의 `hua-ui` 패키지 컴포넌트를 최대한 사용
2. **패키지 우선 수정**: 앱에서 필요한 기능이 패키지에 없으면 패키지를 확장해서 가져오기 (앱에 로컬 핵으로 두지 않기)
3. **다크/라이트 모드**: 모든 UI에 `dark:` 변형 필수, 배경/텍스트/보더 전부 대응
4. **반응형**: 375px(모바일) / 768px(태블릿) / 1440px(PC) 세 단계 확인
5. **i18n-core 방식**: 하드코딩 금지, 반드시 `t('namespace:key')` 사용. 삼항으로 언어 분기하지 않기
6. **디자인 일관성**: 같은 앱 내 다른 페이지 스타일과 통일 (어드민은 어드민끼리, 사용자는 사용자끼리)
7. **컬러 테마**: sum-diary는 cyan 기본, 어드민은 기존 어드민 컬러 따라가기

## 빌드 중 발견한 기존 에러 → 즉시 수정 원칙

빌드 돌릴 때 이번 변경과 무관한 기존 타입 에러/경고가 보이면 같이 잡는다. "내 변경 아니니까 패스"하지 않기.

## 작업 스타일

1. **빌드 확인**: 코드 변경 후 `pnpm build --filter <app>` 돌리기
2. **PR 생성**: 변경사항 분석 후 적절한 제목/본문 작성
3. **데브로그**: 주요 작업은 `docs/devlogs/`에 기록

## 스킬 위치

`.claude/skills/` - 자주 쓰는 작업 자동화

## 아키텍처 문서 (중요!)

작업 전에 참고할 문서들:

```
docs/collab/
├── 00-QUICK-START.md          # 빠른 시작 가이드
├── 01-ARCHITECTURE/           # 아키텍처
│   ├── 01-overview.md         # 전체 구조
│   ├── 02-api-layer.md        # API 레이어
│   ├── 03-service-layer.md    # 서비스 레이어
│   ├── 04-component-layer.md  # 컴포넌트 레이어
│   └── 05-data-layer.md       # 데이터 레이어
├── 02-TECH-DEBT/              # 기술 부채
├── 03-ROADMAP/                # 로드맵 (Phase 1-3)
├── 04-TASKS/                  # 태스크 (P0, P1)
└── APPENDIX/glossary.md       # 용어집
```

**활용:**
- 새 기능 추가 시 → 아키텍처 문서 참고
- 버그 수정 시 → 해당 레이어 문서 확인
- 기술 결정 시 → 로드맵/태스크 우선순위 참고
- 아이콘 이름 참조 → `packages/hua-ui/docs/ICON_REFERENCE.md`

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md<!-- NEXT-AGENTS-MD-END -->
