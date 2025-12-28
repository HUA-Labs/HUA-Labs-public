# 로컬 테스트 가이드

## 문제

`pnpm create hua-ux marketing-demo` 실행 시 404 에러 발생

**원인**: `create-hua-ux`가 아직 npm에 배포되지 않음

## 해결 방법

### 방법 1: 직접 실행 (가장 간단)

```bash
# create-hua-ux 디렉토리에서
cd packages/create-hua-ux

# tsx로 직접 실행 (TypeScript 파일 실행)
npx tsx src/index.ts marketing-demo

# 또는 node로 실행 (bin 파일 사용)
node bin/create-hua-ux.js marketing-demo
```

### 방법 2: 모노레포 내에서 테스트

```bash
# 루트에서
cd d:\HUA\hua-platform

# 직접 실행
cd packages/create-hua-ux
npx tsx src/index.ts marketing-demo ../../test-output
```

### 방법 3: pnpm link (배포 후)

배포 후에는 `pnpm link`로 로컬 테스트 가능:

```bash
# 1. create-hua-ux 패키지에서
cd packages/create-hua-ux
pnpm link --global

# 2. 다른 위치에서
cd /path/to/test
pnpm create hua-ux marketing-demo
```

## npm 배포 준비

배포하려면:

```bash
# 1. 버전 업데이트
cd packages/create-hua-ux
npm version patch  # 또는 minor, major

# 2. 빌드 (필요시)
pnpm build

# 3. npm 배포
npm publish --access public
```

## 참고

- `pnpm create`는 npm 레지스트리에서 패키지를 찾으므로, 로컬 테스트는 직접 실행이 더 간단합니다.
- 배포 후에는 `pnpm create hua-ux` 명령어가 정상 작동합니다.
