# i18n 예제 npm 패키지 업데이트

## 개요

CodeSandbox 템플릿과 Next.js 예제를 npm에 배포된 패키지 버전으로 업데이트하고, 내부 문서를 정리했습니다.

## 포함된 변경사항

### 패키지 업데이트

- `examples/codesandbox-template/package.json`: workspace:* → npm 패키지 버전 (^1.0.0)
- `examples/next-app-router-example/package.json`: workspace:* → npm 패키지 버전 (^1.0.0)
  - @hua-labs/i18n-core@^1.0.0
  - @hua-labs/i18n-core-zustand@^1.0.0
  - @hua-labs/i18n-loaders@^1.0.0 (Next.js 예제만)

### 문서 정리

- README에서 이모지 제거
- 내부 문서를 .gitignore에 추가:
  - DEPLOYMENT.md
  - SETUP_BEFORE_NPM.md
  - HOW_TO_USE.md
  - CODESANDBOX_GUIDE.md
  - CODESANDBOX_QUICK_START.md
  - QUICK_START.md
  - package.json.with-npm
- Git 추적에서 내부 문서 제거 (파일은 로컬에 유지)

### 주요 변경사항

1. npm 패키지 사용으로 전환 (CodeSandbox 배포 준비)
2. 문서 정리 및 공개 범위 조정
3. README 간소화 (이모지 제거)

## 코드 품질

- ✅ 빌드 통과
- ✅ 타입 체크 통과
- ✅ CodeSandbox 템플릿 빌드 성공
- ✅ Next.js 예제 빌드 성공

## 배포 준비

- CodeSandbox 템플릿: npm 패키지로 배포 가능
- Next.js 예제: npm 패키지로 배포 가능

## 체크리스트

- [x] develop 브랜치에서 테스트 완료
- [x] 빌드 및 타입 체크 통과
- [x] 문서 업데이트 완료
- [x] 내부 문서 정리 완료
- [x] .gitignore 업데이트 완료

## 배포 시 주의사항

- CodeSandbox 배포: GitHub Import 시 `examples/codesandbox-template` 디렉토리 지정
- Next.js 예제: Vercel 배포 시 `examples/next-app-router-example` 디렉토리 지정

