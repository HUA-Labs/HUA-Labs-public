# Setup Before npm Package Release

## 현재 상황

`@hua-labs/i18n-core`와 `@hua-labs/i18n-core-zustand` 패키지가 아직 npm에 배포되지 않았습니다.

## 해결 방법

### 옵션 1: 패키지 배포 후 사용 (권장)

1. 패키지를 npm에 배포
2. `package.json`에 패키지 추가:
   ```json
   {
     "dependencies": {
       "@hua-labs/i18n-core": "^1.0.0",
       "@hua-labs/i18n-core-zustand": "^1.0.0"
     }
   }
   ```
3. `npm install` 실행

### 옵션 2: 모노레포에서 로컬 테스트

현재 모노레포 구조에서 테스트하려면:

1. 루트에서 패키지 빌드:
   ```bash
   cd ../..
   pnpm build
   ```

2. `package.json`에서 workspace 프로토콜 사용:
   ```json
   {
     "dependencies": {
       "@hua-labs/i18n-core": "workspace:*",
       "@hua-labs/i18n-core-zustand": "workspace:*"
     }
   }
   ```

3. 루트에서 설치:
   ```bash
   pnpm install
   ```

### 옵션 3: 패키지 파일 직접 복사 (임시)

1. `packages/hua-i18n-core/dist` 폴더를 `examples/codesandbox-template/packages/hua-i18n-core/dist`로 복사
2. `packages/hua-i18n-core-zustand/dist` 폴더를 `examples/codesandbox-template/packages/hua-i18n-core-zustand/dist`로 복사
3. `package.json`에서 상대 경로로 import:
   ```json
   {
     "dependencies": {
       "@hua-labs/i18n-core": "file:./packages/hua-i18n-core",
       "@hua-labs/i18n-core-zustand": "file:./packages/hua-i18n-core-zustand"
     }
   }
   ```

## 권장 순서

1. **지금**: 템플릿 구조만 확인 (코드 검토)
2. **패키지 배포 후**: `package.json` 업데이트하고 CodeSandbox에서 테스트
3. **최종**: README에 CodeSandbox 링크 추가

