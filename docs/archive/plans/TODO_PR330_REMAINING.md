# PR #330 잔여 태스크

> Branch: `refactor/admin-layout` | PR: #330
> 마지막 작업: 2026-01-30

## 확인 필요 (배포 후)

### 1. 다크모드 사이드바 버튼
- **상태**: 코드상 `dark:bg-slate-900`, `dark:text-slate-200` 적용됨
- **확인**: 서버 재시작 후 다크모드에서 햄버거/닫기 버튼 색상 정상인지 확인
- **파일**: `packages/hua-ui/src/components/dashboard/DashboardSidebar.tsx`
- 만약 여전히 허옇게 보이면 → Tailwind purge 문제일 수 있음. `safelist`에 추가 필요

### 2. 모바일 375px 전체 페이지 점검
- [ ] `/diary` — 제목+뷰토글 겹침 해소 확인
- [ ] `/diary/write` — 좌우 패딩 정상, 에디터 폰트 크기 (현재 text-base=16px)
- [ ] `/notifications` — 패딩 정상
- [ ] `/search` — 패딩 정상
- [ ] `/blog` — 패딩 정상
- [ ] `/admin` — 햄버거 → 사이드바 열림/닫힘
- [ ] `/admin/analytics` — 패딩 정상
- [ ] `/admin/blog` — 테이블 가로 스크롤

### 3. 에디터 폰트 크기
- **현재**: `text-base` (16px) — iOS 자동 줌 방지 최소값
- **판단**: 모바일에서 너무 크거나 작다면 조정
- **파일**: `apps/sum-diary/app/(app)/diary/write/page.tsx:519`

### 4. Footer 모바일 처리
- **현재**: 미니 Footer 다시 보이게 복원 (약관/개인정보 접근 필요)
- **고려**: BottomNav에 약관 링크 추가하면 Footer 모바일 숨김 가능
- **파일**: `apps/sum-diary/app/components/layout/Footer.tsx`

## 미래 개선

### Admin 사이드바
- 모바일에서 메뉴 아이템 클릭 시 자동 닫힘 (현재 수동 닫기만)
- 사이드바 스와이프 제스처 (열기/닫기)

### DashboardSidebar 공용 컴포넌트
- `mobilePosition` prop 추가 고려 (`"left" | "right"`)
- 애니메이션 개선 (slide-in/out)

## 컨텍스트 메모

### (app)/layout.tsx 구조
```
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 pb-10 md:pb-16">
  {children}
</div>
```
- 모든 유저 페이지가 이 레이아웃 안에 렌더됨
- 각 페이지에서 `max-w-7xl`이나 `px-*` 중복하면 안 됨
- `max-w-4xl mx-auto`로 좁히는 건 OK

### Admin 레이아웃 구조
```
AdminLayout (server) → auth 체크
  └─ AdminShell (client) → 사이드바 상태 관리
       ├─ AdminHeader → 햄버거 + 로고 + 아바타 Popover
       ├─ AdminSidebar → DashboardSidebar 래퍼
       └─ main → 각 admin 페이지
```
