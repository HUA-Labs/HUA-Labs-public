# 예제 프로젝트 업데이트 및 문서 정리

## 개요

예제 프로젝트를 npm 패키지로 업데이트하고, 문서를 정리하여 배포 준비를 완료했습니다.

## 포함된 변경사항

### 예제 프로젝트 업데이트

- **CodeSandbox 템플릿**: workspace:* → npm 패키지 버전 (^1.0.0)으로 업데이트
- **Next.js App Router 예제**: workspace:* → npm 패키지 버전 (^1.0.0)으로 업데이트
  - @hua-labs/i18n-core@^1.0.0
  - @hua-labs/i18n-core-zustand@^1.0.0
  - @hua-labs/i18n-loaders@^1.0.0

### 문서 정리

- README에서 이모지 제거
- 깨진 DEPLOYMENT.md 링크 제거 및 배포 지침 인라인 추가
- 내부 문서를 .gitignore에 추가 (DEPLOYMENT.md, SETUP_BEFORE_NPM.md 등)
- Git 추적에서 내부 문서 제거

### 주요 변경사항

1. npm 패키지 사용으로 전환 (CodeSandbox 및 Vercel 배포 준비)
2. 문서 정리 및 공개 범위 조정
3. README 간소화 및 깨진 링크 수정

## 코드 품질

- ✅ 빌드 통과
- ✅ 린트 통과
- ✅ 타입 체크 통과
- ✅ Next.js 예제 빌드 성공
- ✅ CodeSandbox 템플릿 빌드 성공

## 문서화

- 예제 프로젝트 README 업데이트 완료
- 깨진 링크 수정 및 배포 지침 인라인 추가
- 내부 문서 정리 완료

## 배포 준비

- CodeSandbox 템플릿: npm 패키지로 배포 가능
- Next.js 예제: Vercel 배포 준비 완료 (vercel.json 포함)

## 체크리스트

- [x] develop 브랜치에서 테스트 완료
- [x] 빌드 및 린트 통과
- [x] 문서화 완료
- [x] 예제 프로젝트 빌드 성공
- [x] 깨진 링크 수정 완료
- [x] 내부 문서 정리 완료

## Summary

### Changes

Updated example projects to use published npm packages instead of workspace protocol. Fixed broken documentation links and cleaned up internal documentation files.

### Example Projects

- CodeSandbox template: Ready for deployment with npm packages
- Next.js App Router example: Ready for Vercel deployment with npm packages

### Documentation

- Removed emojis from README files
- Fixed broken DEPLOYMENT.md links (removed and added inline deployment guides)
- Added internal docs to .gitignore
- Removed tracked internal documentation files

