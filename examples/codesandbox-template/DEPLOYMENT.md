# CodeSandbox 템플릿 배포 가이드

## CodeSandbox 배포

### 옵션 1: npm 패키지 배포 후 (권장)

1. `@hua-labs/i18n-core`와 `@hua-labs/i18n-core-zustand` 패키지가 npm에 배포된 후
2. `package.json` 업데이트:
   ```json
   {
     "dependencies": {
       "@hua-labs/i18n-core": "^1.0.0",
       "@hua-labs/i18n-core-zustand": "^1.0.0",
       "zustand": "^4.5.0"
     }
   }
   ```
3. CodeSandbox에 템플릿 업로드
4. 공개 링크 생성

### 옵션 2: GitHub 연동

1. 이 템플릿을 GitHub 저장소에 푸시
2. CodeSandbox에서 GitHub 저장소 import
3. CodeSandbox가 자동으로 `package.json` 인식
4. npm 패키지 배포 후 자동으로 사용 가능

### 옵션 3: CodeSandbox Template 생성

1. [CodeSandbox](https://codesandbox.io)에 로그인
2. "Create Sandbox" → "Import from GitHub"
3. 저장소 URL 입력
4. 템플릿으로 저장

## 현재 상태

현재는 `workspace:*` 프로토콜을 사용하므로:
- 모노레포 내에서만 작동
- CodeSandbox 배포는 npm 패키지 배포 후 가능

## 배포 후 확인

배포 완료 후:
1. 언어 전환 기능 테스트
2. 6개 언어 모두 작동 확인
3. 애니메이션 효과 확인
4. README에 링크 추가

