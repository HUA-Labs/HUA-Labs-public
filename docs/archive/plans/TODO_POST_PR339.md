# TODO: PR #339 이후 잔여 작업

**관련 PR**: #339 (refactor/sum-diary-use-client-reduction)
**날짜**: 2026-01-31
**우선순위**: P0 = 핫픽스, P1 = 다음 스프린트, P2 = 백로그

---

## P0 - 핫픽스 ✅

### 1. ~~임시저장 불러온 후 재저장 버그~~ ✅ PR #342
- **증상**: 임시저장 불러와서 냅두면 자동저장이 새 임시저장으로 생성됨
- **원인**: 삭제된 draft의 draftId로 `update()` 시도 → Prisma `No record found` 에러 → fallback으로 새로 생성
- **수정**: `useDraftManagement.ts`에서 삭제 후 `setCurrentDraftId(null)` 호출

### 2. ~~임시저장 HTML entity 이스케이프~~ ✅ PR #342
- **증상**: 불러온 임시저장에서 `/`가 `&#x2F;`로 표시됨
- **원인**: `sanitizeInput`에서 `/`를 `&#x2F;`로 불필요하게 이스케이프
- **수정**: `packages/hua-utils/src/sanitize.ts`에서 `/` 이스케이프 제거

---

## P1 - 다음 스프린트

### 3. 토스트 다크모드
- **증상**: 다크모드에서 토스트 배경이 하얗게 보임
- **원인 후보**:
  - Tailwind content scan에 hua-ui 패키지 경로 미포함 → `dark:bg-*` 클래스 purge
  - 또는 CSS 변수 체계가 Toast까지 전달 안 됨
- **파일**: `packages/hua-ui/src/components/Toast.tsx`, Tailwind 설정

### 4. 스피너 다크모드 가시성
- **증상**: LoadingSpinner `ring` variant가 다크 배경에서 거의 안 보임
- **원인**: indigo track 색상이 다크 배경과 대비 부족
- **파일**: `packages/hua-ui/src/components/LoadingSpinner.tsx`
- **수정 방향**: `dark:border-indigo-500/40` → 더 밝은 track 또는 다른 색상 계열

### 5. 전역 스피너 통일
- **증상**: 랜딩 페이지(`(landing)/page.tsx`)에서 수동 `div.animate-spin` 사용
- **수정 방향**: `LoadingSpinner` 컴포넌트로 교체

### 6. 대시보드 진입 최적화
- **증상**: 로그인 유저가 `/` → 클라이언트 리다이렉트 → `/dashboard` (불필요한 홉)
- **현재 플로우**: `useSession()` loading → spinner → `router.replace("/dashboard")` → skeleton → content
- **수정 방향**: 미들웨어에서 인증된 유저 `/` → `/dashboard` 서버사이드 리다이렉트
- **파일**: `middleware.ts`, `(landing)/page.tsx`

### 7. diary create 타임아웃
- **증상**: dev에서 `SyntaxError: Unexpected end of JSON input` (request.json() 실패)
- **원인**: 클라이언트 30초 AbortController + dev 컴파일 지연 = 실질 API 처리 시간 부족
- **파일**: `diary/write/page.tsx` (handleSubmit), `api/diary/create/route.ts`
- **수정 방향**: 프로덕션에서도 발생하면 타임아웃 60초로 조정

---

### 11. 테스트 페이지 히스토리 DB 저장
- **현재**: 3개 테스트 페이지(multilang, prompt-test, test-diary) 히스토리가 localStorage에만 저장
- **문제**: JSON 파일로 결과 공유하고 있어서 번거롭고 기기 간 동기화 안 됨
- **수정 방향**: 테스트 세션 테이블 추가 → API로 CRUD → 팀 공유 가능하게
- **스코프**: 새 Prisma 모델 + API route + 3개 페이지 마이그레이션

---

## P2 - 백로그

### 8. 로그 레벨 정리
- **증상**: dev 콘솔에 임시저장 CRUD, `[ANALYZE:DEBUG]`, 사용자 설정 등 과다 로그
- **수정 방향**: 환경변수 기반 로그 레벨 (`LOG_LEVEL=debug|info|warn|error`)
- **대상 로그**:
  - `임시저장 암호화 키 확인`, `암호화 시도/성공`, `임시저장 저장/업데이트` → DEBUG
  - `[ANALYZE:DEBUG]` 전체 → DEBUG
  - `사용자 설정 업데이트 완료` → DEBUG
  - 위기 감지 로그 → 유지 (INFO)

### 9. 오프라인 모드 UX
- **증상**: 온라인/오프라인 상태가 UI에서 명확히 구분 안 됨
- **수정 방향**: 일기 쓰기 화면에 네트워크 상태 인디케이터 추가 (이미 일부 있지만 더 명확하게)

### 10. LoadingOverlay 디자인 반영 확인
- **증상**: dev에서 LoadingOverlay 변경이 시각적으로 반영 안 되는 것처럼 보임
- **원인 후보**: 다크모드에서 이전/이후 디자인 차이가 미미, 또는 캐시 잔존
- **확인 방법**: 프로덕션 배포 후 확인, 또는 라이트모드에서 비교
