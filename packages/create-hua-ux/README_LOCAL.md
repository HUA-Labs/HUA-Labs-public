# 로컬 개발 가이드

## 빠른 시작

### 방법 1: tsx로 직접 실행 (권장)

```bash
cd packages/create-hua-ux
npx tsx src/index.ts marketing-demo
```

### 방법 2: pnpm dev 스크립트 사용

```bash
cd packages/create-hua-ux
pnpm dev marketing-demo
```

## 프로젝트 생성

```bash
# 현재 디렉토리에 프로젝트 생성
npx tsx src/index.ts my-project

# 또는 상대 경로 지정
npx tsx src/index.ts ../test-output/my-project
```

## 문제 해결

### "tsx를 찾을 수 없습니다"

```bash
# tsx 전역 설치
pnpm add -g tsx

# 또는 로컬 설치
cd packages/create-hua-ux
pnpm add -D tsx
```

### "모듈을 찾을 수 없습니다" (fs-extra, chalk 등)

```bash
# 의존성 설치 (모노레포 루트에서)
cd d:\HUA\hua-platform
pnpm install

# 또는 create-hua-ux 패키지에서
cd packages/create-hua-ux
pnpm install
```

**참고**: 모노레포에서는 루트에서 `pnpm install`을 실행하는 것이 일반적입니다.

## npm 배포 후

배포 후에는 `pnpm create hua-ux` 명령어가 정상 작동합니다:

```bash
pnpm create hua-ux my-project
```
