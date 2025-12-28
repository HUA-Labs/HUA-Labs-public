# npm 배포 가이드

## 현재 상태

### ✅ 완료된 작업

1. **TypeScript 빌드 설정**
   - `tsconfig.json` 생성
   - `dist/` 폴더로 컴파일
   - 빌드 성공 확인

2. **package.json 업데이트**
   - `main`: `./dist/index.js`
   - `bin`: `./dist/bin/create-hua-ux.js`
   - `build` 스크립트 추가
   - `files` 필드에 `dist`, `templates` 포함

3. **bin 파일 생성**
   - `src/bin/create-hua-ux.ts` 작성
   - 컴파일 후 `dist/bin/create-hua-ux.js`로 출력

4. **의존성 문제 해결**
   - 생성되는 프로젝트의 `package.json`에서 `workspace:*` 제거
   - `getHuaUxVersion()` 함수로 버전 관리
   - 모노레포 내부 테스트를 위한 환경 변수 지원

5. **템플릿 업데이트**
   - 최신 `hua-ux.config.ts` 템플릿 반영
   - Preset 확장 기능 문서화
   - motion.style 옵션 추가
   - license, plugins 필드 주석 추가

## npm 배포 전 체크리스트

### 빌드 및 테스트

- [x] TypeScript 빌드 성공
- [x] bin 파일 생성 확인
- [ ] 로컬에서 빌드된 CLI 테스트
- [ ] 생성되는 프로젝트가 정상 작동하는지 확인
- [ ] 모노레포 외부에서 테스트 (임시 디렉토리)

### 패키지 설정

- [x] `package.json`의 `main`, `bin` 경로 정확
- [x] `files` 필드에 필요한 파일만 포함
- [ ] `.npmignore` 파일 생성 (선택적)
- [ ] 버전 번호 결정 (현재: 0.1.0)

### 의존성 관리

- [x] 생성되는 프로젝트의 `package.json`에서 `workspace:*` 제거
- [ ] `@hua-labs/hua-ux` 버전 관리 전략 결정
  - 현재: `^0.1.0` (고정 버전)
  - 향후: npm에서 최신 버전 조회 로직 추가 가능

### 문서화

- [x] README.md 업데이트
- [ ] npm 배포 후 사용 가이드
- [ ] 트러블슈팅 가이드

## 배포 절차

### 1. 사전 준비

```bash
# 1. 빌드
cd packages/create-hua-ux
pnpm run build

# 2. 생성되는 파일 확인
ls -la dist/
ls -la dist/bin/

# 3. 로컬 테스트
node dist/bin/create-hua-ux.js test-project
cd test-project
pnpm install
pnpm dev
```

### 2. 버전 업데이트

```bash
# 패치 버전 (0.1.0 → 0.1.1)
npm version patch

# 마이너 버전 (0.1.0 → 0.2.0)
npm version minor

# 메이저 버전 (0.1.0 → 1.0.0)
npm version major
```

### 3. npm 배포

```bash
# 1. npm 로그인 (최초 1회)
npm login

# 2. 배포 전 최종 빌드
pnpm run build

# 3. 배포
npm publish --access public

# 또는 dry-run으로 확인
npm publish --access public --dry-run
```

### 4. 배포 후 테스트

```bash
# 임시 디렉토리에서 테스트
cd /tmp
pnpm create hua-ux test-app
cd test-app
pnpm install
pnpm dev
```

## 모노레포 내부 테스트

모노레포 내부에서 테스트할 때는 환경 변수를 설정하여 `workspace:*` 버전을 사용할 수 있습니다:

```bash
# 환경 변수 설정
export HUA_UX_WORKSPACE_VERSION=workspace

# CLI 실행
cd packages/create-hua-ux
pnpm run dev test-project
```

또는 직접 실행:

```bash
cd packages/create-hua-ux
npx tsx src/index.ts test-project
```

## 생성되는 프로젝트의 의존성

### 현재 설정

생성되는 프로젝트의 `package.json`에서 `@hua-labs/hua-ux` 버전은:

- **기본값**: `^0.1.0` (npm 배포 후)
- **모노레포 내부 테스트**: `HUA_UX_WORKSPACE_VERSION=workspace` 환경 변수 설정 시 `workspace:*`

### 향후 개선

npm에서 최신 버전을 자동으로 가져오는 로직 추가 가능:

```typescript
async function getLatestVersion(): Promise<string> {
  try {
    const response = await fetch('https://registry.npmjs.org/@hua-labs/hua-ux/latest');
    const data = await response.json();
    return `^${data.version}`;
  } catch {
    return '^0.1.0'; // fallback
  }
}
```

## 주의사항

### 1. bin 파일 권한

npm 배포 시 bin 파일에 실행 권한이 자동으로 추가되지만, 로컬에서 테스트할 때는:

```bash
chmod +x dist/bin/create-hua-ux.js
```

### 2. 템플릿 파일

`templates/` 폴더는 `files` 필드에 포함되어 있으므로 npm 패키지에 포함됩니다.

### 3. 버전 동기화

`@hua-labs/hua-ux` 패키지가 npm에 배포되기 전에는 `create-hua-ux`를 배포해도 생성되는 프로젝트가 작동하지 않을 수 있습니다.

**해결 방안**:
1. `@hua-labs/hua-ux`를 먼저 배포
2. 또는 `create-hua-ux` 배포 시점에 `@hua-labs/hua-ux`도 함께 배포

## 배포 순서 (권장)

1. **@hua-labs/hua-ux 배포**
   ```bash
   cd packages/hua-ux
   npm publish --access public
   ```

2. **create-hua-ux 배포**
   ```bash
   cd packages/create-hua-ux
   # getHuaUxVersion()에서 배포된 버전 사용
   npm publish --access public
   ```

## 트러블슈팅

### 빌드 실패

**문제**: TypeScript 컴파일 에러

**해결**:
- `tsconfig.json`의 `skipLibCheck: true` 확인
- 타입 정의 패키지 설치 확인 (`@types/fs-extra`, `@types/inquirer`)

### bin 파일이 작동하지 않음

**문제**: `create-hua-ux` 명령어를 찾을 수 없음

**해결**:
- `package.json`의 `bin` 필드 경로 확인
- `dist/bin/create-hua-ux.js` 파일 존재 확인
- 파일에 `#!/usr/bin/env node` shebang 확인

### 생성되는 프로젝트가 의존성을 찾을 수 없음

**문제**: `@hua-labs/hua-ux` 패키지를 찾을 수 없음

**해결**:
- `@hua-labs/hua-ux`가 npm에 배포되었는지 확인
- 생성되는 프로젝트의 `package.json`에서 버전 확인
- `pnpm install` 실행 확인

## 참고 자료

- [npm 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [package.json files 필드](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files)
- [bin 필드](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin)

---

**작성일**: 2025-12-28  
**작성자**: HUA Platform 개발팀
