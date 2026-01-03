# Automation Quick Start Guide

빠르게 시작하는 자동화 도구 사용법 가이드입니다.

## 🚀 5분 Quick Start

### 개발자용

#### 1. 코드 변경 후 Changeset 생성

```bash
# 변경사항이 있으면 항상 changeset 생성
npx changeset

# 또는 Graphite 사용 시
gt create -m "feat: add new feature"
```

#### 2. PR 생성 전 로컬 검증

```bash
# 템플릿 유효성 검사
cd packages/create-hua-ux
pnpm validate:template

# 전체 빌드 테스트
cd ../..
pnpm build
```

#### 3. PR 생성

```bash
# Graphite
gt submit

# 또는 일반 git
git push
gh pr create
```

**자동 실행:**
- ✅ Changeset 검증
- ✅ 패키지 이름 확인
- ✅ Template 검증 (prebuild)

---

### 사용자용 (create-hua-ux)

#### 항상 최신 버전 사용

```bash
# ✅ 권장: @latest 사용
npm create hua-ux@latest my-app

# ❌ 비권장: npx 캐시 문제 가능
npm create hua-ux my-app
```

#### npx 캐시 문제 해결

**증상:**
- `headersList.get is not a function` 에러
- 오래된 템플릿 파일

**해결:**

**Windows:**
```bash
npm cache clean --force
del /s /q "%LOCALAPPDATA%\npm-cache"
rmdir /s /q "%APPDATA%\npm-cache"
npm create hua-ux@latest my-app
```

**macOS/Linux:**
```bash
npm cache clean --force
rm -rf ~/.npm/_npx
npm create hua-ux@latest my-app
```

---

## 📋 체크리스트

### PR 제출 전

- [ ] Changeset 생성했는가?
- [ ] 패키지 이름 오타 없는가?
- [ ] `pnpm build` 성공하는가?
- [ ] Template validation 통과하는가?

### PR 리뷰 시

- [ ] E2E tests 통과했는가?
- [ ] Changeset validation 통과했는가?
- [ ] Breaking changes 확인했는가?

### 릴리즈 전

- [ ] "Version Packages" PR 내용 확인
- [ ] CHANGELOG 검토
- [ ] 버전 번호 올바른가?

---

## 🔧 자주 사용하는 명령어

### 로컬 개발

```bash
# 템플릿 검증만
pnpm --filter create-hua-ux validate:template

# create-hua-ux 빌드
pnpm --filter create-hua-ux build

# 전체 빌드
pnpm build

# 특정 패키지 빌드
pnpm --filter @hua-labs/hua-ux build
```

### Changeset

```bash
# Changeset 생성 (interactive)
npx changeset

# Changeset 상태 확인
pnpm changeset status

# 로컬에서 버전업 시뮬레이션 (테스트용, 실제로는 하지 말 것!)
# pnpm changeset version  # ❌ GitHub Actions가 해야 함
```

### Testing

```bash
# Monorepo 외부에서 테스트
cd /tmp
node ~/hua-labs-public/packages/create-hua-ux/dist/bin/create-hua-ux.js test-app

cd test-app
npm install
npm run dev
```

---

## 🐛 트러블슈팅 Quick Fix

### "Changeset not found"

```bash
npx changeset
# 패키지 선택
# 변경 유형 선택 (patch/minor/major)
# 메시지 작성
```

### "Package name not found"

```bash
# 올바른 패키지 이름 확인
find packages -name "package.json" -exec jq -r '.name' {} \;

# changeset 파일 수정
vim .changeset/your-changeset.md
```

### "Template validation failed"

```bash
# 어떤 파일이 문제인지 확인
pnpm --filter create-hua-ux validate:template

# 누락된 파일 추가 또는 validation 설정 수정
```

### "workspace: protocol found"

이건 CI에서만 발생해야 하는 문제입니다.
로컬 테스트는 항상 monorepo 외부에서:

```bash
cd /tmp
node <monorepo-path>/packages/create-hua-ux/dist/bin/create-hua-ux.js test
```

---

## 📚 더 알아보기

- [전체 문서](./AUTOMATION.md) - 상세한 설명
- [GitHub Workflows](./../.github/workflows/) - 실제 workflow 파일들
- [Changeset 가이드](https://github.com/changesets/changesets) - 공식 문서

---

## 💡 Pro Tips

### 1. Graphite + Changeset 조합

```bash
# 한 번에 브랜치 생성 + changeset + PR
gt create -m "feat: new feature"
# → 자동으로 changeset 생성됨 (Graphite 설정 필요)

gt submit
# → PR 생성
```

### 2. Version Check 건너뛰기 (테스트용)

```bash
# CI 환경 시뮬레이션 (version check 스킵)
CI=true npm create hua-ux test-app

# Non-interactive 모드
NON_INTERACTIVE=1 npm create hua-ux test-app
```

### 3. 특정 의존성 버전 확인

```bash
# Next.js 최신 버전 확인
npm view next version

# 여러 버전 비교
npm view next versions --json | jq '.[-5:]'
```

### 4. GEO Metadata 검증

```typescript
import { validateJsonLd, formatValidationResult } from '@hua-labs/hua-ux/framework';

const result = validateJsonLd(myGEOData);
console.log(formatValidationResult(result));
```

---

## ⚡ 자주 묻는 질문 (FAQ)

### Q: Changeset을 언제 만들어야 하나요?

**A:** 패키지 코드를 변경했을 때 항상 만드세요.
- `packages/` 내부 파일 수정 → changeset 필요
- 문서, workflow만 수정 → changeset 불필요

### Q: 왜 `pnpm changeset version`을 로컬에서 실행하면 안 되나요?

**A:** GitHub Actions가 자동으로 해야 합니다.
- 로컬 실행 → git history 복잡해짐
- GitHub Actions → 일관된 버전 관리

### Q: E2E 테스트가 실패하는데 로컬에서는 잘 됩니다.

**A:** Monorepo 내부 vs 외부 차이입니다.
- 로컬 (monorepo 내부): `workspace:*` 사용
- CI (시뮬레이션): 실제 npm 버전 사용

### Q: Template validation이 계속 실패합니다.

**A:** 동적 생성 파일은 체크하지 않습니다.
- `package.json` → 동적 생성 (체크 안 함)
- `app/layout.tsx` → 정적 파일 (체크함)

---

**마지막 업데이트:** 2026-01-03
**문의:** GitHub Issues에 `automation` 라벨로 등록
