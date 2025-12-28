# npm 배포 가이드

## 배포 전 체크리스트

### 1. 빌드 확인

```bash
cd packages/create-hua-ux
pnpm run build
```

**확인 사항**:
- [x] `dist/` 폴더가 생성됨
- [x] `dist/bin/create-hua-ux.js` 파일 존재
- [x] `dist/index.js` 파일 존재
- [x] TypeScript 컴파일 에러 없음

### 2. 로컬 테스트

#### 방법 1: 직접 실행

```bash
cd packages/create-hua-ux
node dist/bin/create-hua-ux.js test-project
```

#### 방법 2: pnpm link 사용

```bash
# create-hua-ux 패키지에서
cd packages/create-hua-ux
pnpm link --global

# 다른 위치에서 테스트
cd /path/to/test
pnpm create hua-ux test-project
```

**확인 사항**:
- [ ] 프로젝트가 정상적으로 생성됨
- [ ] 생성된 프로젝트의 `package.json`에 `@hua-labs/hua-ux` 버전이 올바름 (workspace:* 아님)
- [ ] 생성된 프로젝트에서 `pnpm install` 성공
- [ ] 생성된 프로젝트에서 `pnpm dev` 성공

### 3. 의존성 확인

**생성되는 프로젝트의 package.json**:
```json
{
  "dependencies": {
    "@hua-labs/hua-ux": "^0.1.0"  // workspace:* 아님
  }
}
```

**주의**: `@hua-labs/hua-ux`가 npm에 배포되어 있어야 생성된 프로젝트가 정상 작동합니다.

### 4. 버전 관리

**버전 업데이트**:
```bash
cd packages/create-hua-ux
npm version patch  # 0.1.0 → 0.1.1
# 또는
npm version minor   # 0.1.0 → 0.2.0
# 또는
npm version major   # 0.1.0 → 1.0.0
```

**버전 동기화**:
- `create-hua-ux`와 `@hua-labs/hua-ux`의 버전을 동기화하는 것이 좋음
- 또는 `create-hua-ux`에서 `@hua-labs/hua-ux`의 최신 버전을 자동으로 가져오는 로직 추가

## npm 배포 절차

### 1. 사전 준비

#### npm 계정 설정

```bash
# npm 로그인
npm login

# 계정 확인
npm whoami
```

#### 패키지 이름 확인

현재 패키지 이름: `create-hua-ux`

**주의**: npm에서 `create-*` 패키지는 특별한 의미가 있습니다:
- `pnpm create hua-ux` → `create-hua-ux` 패키지를 찾음
- 패키지 이름이 정확해야 함

### 2. 배포 전 최종 확인

```bash
cd packages/create-hua-ux

# 1. 빌드
pnpm run build

# 2. 배포할 파일 확인
npm pack --dry-run

# 3. package.json 확인
cat package.json | grep -E '"name"|"version"|"files"'
```

**확인 사항**:
- [x] `files` 필드에 `dist`와 `templates` 포함
- [x] `bin` 경로가 `dist/bin/create-hua-ux.js`로 올바름
- [x] `main` 경로가 `dist/index.js`로 올바름

### 3. 배포 실행

```bash
cd packages/create-hua-ux

# 배포 (공개 패키지)
npm publish --access public
```

**주의**: 
- 첫 배포는 `--access public` 필수
- 이후 배포는 버전만 올리면 됨

### 4. 배포 후 확인

#### 설치 테스트

```bash
# 다른 위치에서
cd /path/to/test
pnpm create hua-ux test-project
```

**확인 사항**:
- [ ] `pnpm create hua-ux` 명령어가 정상 작동
- [ ] 생성된 프로젝트가 정상 작동
- [ ] npm 레지스트리에서 패키지 확인 가능

## 버전 관리 전략

### @hua-labs/hua-ux와의 버전 동기화

**옵션 1: 수동 동기화**
- `@hua-labs/hua-ux` 배포 후 버전 확인
- `create-hua-ux/src/utils.ts`의 `getHuaUxVersion()` 함수 수정

**옵션 2: 자동 버전 조회 (향후 구현)**
```typescript
async function getHuaUxVersion(): Promise<string> {
  try {
    // npm에서 최신 버전 조회
    const response = await fetch('https://registry.npmjs.org/@hua-labs/hua-ux/latest');
    const data = await response.json();
    return `^${data.version}`;
  } catch {
    // 폴백: 고정 버전
    return '^0.1.0';
  }
}
```

**현재 구현**: 고정 버전 `^0.1.0` 사용 (수동 업데이트 필요)

## 문제 해결

### 빌드 에러

**에러**: `Could not find a declaration file for module 'fs-extra'`

**해결**:
```bash
pnpm add -D @types/fs-extra @types/inquirer
```

### bin 파일이 작동하지 않음

**확인 사항**:
1. `dist/bin/create-hua-ux.js` 파일이 존재하는지
2. 파일 첫 줄에 `#!/usr/bin/env node`가 있는지
3. 파일 권한이 올바른지 (Unix/Linux)

**해결**:
```bash
chmod +x dist/bin/create-hua-ux.js
```

### 생성된 프로젝트에서 의존성 설치 실패

**원인**: `@hua-labs/hua-ux`가 npm에 배포되지 않음

**해결**: 
1. `@hua-labs/hua-ux`를 먼저 npm에 배포
2. 또는 `create-hua-ux`에서 `@hua-labs/hua-ux`를 포함하여 배포 (monorepo 구조상 어려움)

## 배포 순서

1. **@hua-labs/hua-ux 배포** (먼저 필요)
   ```bash
   cd packages/hua-ux
   npm publish --access public
   ```

2. **create-hua-ux 배포**
   ```bash
   cd packages/create-hua-ux
   npm publish --access public
   ```

## 참고 자료

- [npm 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [create-* 패키지 규칙](https://docs.npmjs.com/cli/v9/commands/npm-init)

---

**작성일**: 2025-12-28  
**작성자**: HUA Platform 개발팀
