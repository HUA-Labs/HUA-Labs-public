# 배포 전 체크리스트

## 🔍 배포 전 필수 검토 (우선순위순)

### Phase 1: 코드 완성도 (배포 블로커)

#### 1.1 크리티컬 버그 수정
- [ ] 알려진 버그 모두 수정
- [ ] 이슈 트래커 확인
- [ ] 최근 변경사항 검토

#### 1.2 빌드 및 테스트
- [ ] `pnpm run build` 성공
- [ ] TypeScript 컴파일 에러 0개: `npx tsc --noEmit`
- [ ] `dist/bin/create-hua-ux.js` 파일 생성 확인
- [ ] 자동 테스트 실행: `pnpm run test:cli` (Unix/Linux) 또는 수동 테스트
- [ ] 로컬 테스트: `node dist/bin/create-hua-ux.js test-project` 성공
- [ ] 생성된 프로젝트 빌드 성공: `cd test-project && pnpm build`

#### 1.3 템플릿 파일 검증
- [ ] 모든 템플릿 파일이 존재하는지 확인
- [ ] 템플릿 파일의 import 경로가 올바른지 확인
- [ ] 예시 파일들(`.example`)이 올바르게 포함되어 있는지 확인
- [ ] 생성된 프로젝트의 모든 파일이 정상 작동하는지 확인

### Phase 2: 버전 및 의존성 (데이터 정확성)

#### 2.1 버전 동기화 (자동화됨) ✅
- [x] `scripts/generate-version.ts`가 빌드 시점에 `hua-ux/package.json`에서 버전을 읽음
- [x] `src/version.ts` 파일이 자동 생성됨
- [x] 모노레포 내부에서는 `workspace:*` 사용
- [x] npm 배포 후에는 빌드 시 생성된 버전 상수 사용

**동작 방식**:
```typescript
// 빌드 시점: scripts/generate-version.ts 실행
// → hua-ux/package.json에서 버전 읽기
// → src/version.ts 생성 (예: export const HUA_UX_VERSION = '^0.1.0')

// 런타임: getHuaUxVersion() 함수
// 1. 모노레포 감지 → 'workspace:*'
// 2. npm 배포 후 → HUA_UX_VERSION 상수 사용
```

#### 2.2 프레임워크 버전 (상수 파일로 관리) ✅
- [x] `src/constants/versions.ts` 파일에서 버전 관리
- [ ] Next.js 버전 확인: `16.0.10` (versions.ts에서 확인)
- [ ] React 버전 확인: `19.2.1` (versions.ts에서 확인)
- [ ] 프로젝트 전체에서 사용하는 버전과 일치하는지 확인

**현재 상태** (`src/constants/versions.ts`):
- Next.js: `16.0.10`
- React: `19.2.1`
- React DOM: `19.2.1`

**업데이트 방법**:
1. `src/constants/versions.ts` 파일에서 버전 수정
2. 재빌드 및 재배포

#### 2.3 의존성 확인
- [ ] `@hua-labs/hua-ux`가 npm에 배포되어 있는지 확인: `npm view @hua-labs/hua-ux version`
- [ ] 생성된 프로젝트의 `package.json`에 올바른 버전 포함 확인
- [ ] `workspace:*`가 아닌 실제 버전(`^0.1.0`)인지 확인

### Phase 3: 문서화 (사용자 경험)

#### 3.1 README 업데이트
- [x] Next.js 버전 정보 수정 (Next.js 15 → 16)
- [ ] React 버전 정보 추가
- [ ] 새로운 기능 문서화 (doctor, dry-run, --install)
- [ ] 사용 예시 업데이트

#### 3.2 CHANGELOG
- [x] 변경사항 기록
- [ ] 날짜 명시
- [ ] Breaking Changes 강조 (있는 경우)

### Phase 4: 에러 처리 및 안정성

#### 4.1 에러 처리 개선
- [ ] 네트워크 에러 처리
- [ ] 파일 시스템 에러 처리
- [ ] 권한 에러 처리
- [ ] 사용자 친화적인 에러 메시지

## 🚀 배포 순서

### Step 1: @hua-labs/hua-ux 배포 (필수)

```bash
cd packages/hua-ux
pnpm run build
npm publish --access public
```

**확인**:
- [ ] `npm view @hua-labs/hua-ux version`으로 배포 확인

### Step 2: create-hua-ux 재빌드

```bash
cd packages/create-hua-ux
pnpm run build  # hua-ux 버전이 자동으로 반영됨
```

**확인**:
- [ ] `dist/` 폴더 생성 확인
- [ ] `dist/bin/create-hua-ux.js` 파일 존재 확인
- [ ] `src/version.ts`에 올바른 버전 반영 확인

### Step 3: create-hua-ux 배포

```bash
npm publish --access public
```

**확인**:
- [ ] `npm view create-hua-ux version`으로 배포 확인
- [ ] `pnpm create hua-ux test-project` 명령어 테스트

## 🚨 배포 직전 최종 확인 (2분)

**⚠️ npm publish 실행 전 반드시 확인!**

### 체크리스트
- [ ] 현재 브랜치가 `main`인가? (`git branch`)
- [ ] 모든 변경사항 커밋 완료? (`git status`)
- [ ] git push 완료? (`git log origin/main`)
- [ ] `package.json` 버전이 올바른가?
- [ ] npm 계정 로그인 확인: `npm whoami`
- [ ] 로컬 테스트 성공? (`node dist/bin/create-hua-ux.js test-project`)
- [ ] `@hua-labs/hua-ux`가 npm에 배포되어 있는가? (`npm view @hua-labs/hua-ux version`)

### ⚠️ 되돌릴 수 없음!
**npm publish는 되돌릴 수 없습니다.**
- 패키지를 삭제할 수는 있지만, 버전 번호는 재사용 불가
- 잠시 멈추고 다시 한번 확인하세요

### 준비됐다면:
```bash
# 배포!
npm publish --access public

# 배포 후 즉시 확인
npm info @hua-labs/hua-ux version
npm info create-hua-ux version

# 실제 사용 테스트
cd /tmp
pnpm create hua-ux test-release
cd test-release
pnpm install
pnpm build  # 빌드 성공 확인
```

## 🔄 배포 롤백 (문제 발생 시)

### 시나리오 1: create-hua-ux에 버그 발견

**옵션 A: 즉시 패치 (권장)**
```bash
# 1. 버그 수정
# 2. 패치 버전 업
cd packages/create-hua-ux
npm version patch  # 0.1.0 → 0.1.1
# 3. 재빌드
pnpm run build
# 4. 재배포
npm publish --access public
```

**옵션 B: 이전 버전으로 롤백**
```bash
# npm에서 특정 버전을 latest로 지정
npm dist-tag add create-hua-ux@0.0.9 latest
```

### 시나리오 2: hua-ux에 크리티컬 버그

**1. 문제 확인**:
- 어느 버전에서 발생?
- 얼마나 심각한가?

**2. 긴급 조치**:
```bash
# 이전 안정 버전을 latest로
npm dist-tag add @hua-labs/hua-ux@0.0.9 latest
```

**3. 수정 후 재배포**:
```bash
cd packages/hua-ux
# 버그 수정
npm version patch  # 0.1.1
pnpm run build
npm publish --access public
```

**4. create-hua-ux도 업데이트**:
```bash
cd packages/create-hua-ux
pnpm run build  # 새 버전 자동 반영
npm version patch
pnpm run build
npm publish --access public
```

## 📝 버전 업데이트 시나리오

### 시나리오: hua-ux를 0.1.0 → 0.2.0으로 업데이트

1. **hua-ux 패키지 업데이트**:
   ```bash
   cd packages/hua-ux
   npm version minor  # 0.1.0 → 0.2.0
   pnpm run build
   npm publish --access public
   ```

2. **create-hua-ux 재빌드**:
   ```bash
   cd packages/create-hua-ux
   pnpm run build  # scripts/generate-version.ts가 자동으로 0.2.0 읽음
   # → src/version.ts가 '^0.2.0'으로 업데이트됨
   ```

3. **create-hua-ux 재배포**:
   ```bash
   npm version patch  # create-hua-ux 버전 업데이트
   npm publish --access public
   ```

4. **결과**:
   - 새로 생성되는 프로젝트는 `@hua-labs/hua-ux: ^0.2.0` 사용
   - 기존 프로젝트는 영향 없음 (자체 package.json 사용)

## ✅ 자동화된 부분

- ✅ hua-ux 버전 자동 동기화 (빌드 시점)
- ✅ 모노레포 감지 및 workspace 버전 사용
- ✅ npm 배포 후 버전 상수 사용
- ✅ 프레임워크 버전 상수 파일로 관리 (`src/constants/versions.ts`)

## ⚠️ 수동 관리 필요

- ⚠️ `src/constants/versions.ts`에서 Next.js/React 버전 업데이트
- ⚠️ 기타 의존성 버전 업데이트 (zustand, tailwindcss 등)
