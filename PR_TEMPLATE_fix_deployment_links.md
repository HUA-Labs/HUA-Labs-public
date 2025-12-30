# fix: remove broken DEPLOYMENT.md links from READMEs

## 개요

DEPLOYMENT.md 파일이 .gitignore에 추가되어 커밋되지 않는데, README에서 이 파일을 참조하고 있어 깨진 링크가 발생했습니다. 이를 수정하기 위해 링크를 제거하고 배포 지침을 README에 인라인으로 추가했습니다.

## 포함된 변경사항

### 문제점

- `examples/codesandbox-template/README.md`: DEPLOYMENT.md 링크 2곳
- `examples/next-app-router-example/README.md`: DEPLOYMENT.md 링크 1곳
- DEPLOYMENT.md 파일은 .gitignore에 추가되어 커밋되지 않음
- 저장소를 복제하는 사용자가 깨진 링크를 보게 됨

### 해결 방법

- DEPLOYMENT.md 링크 제거
- 배포 지침을 README에 인라인으로 추가
  - CodeSandbox 배포: 단계별 가이드 추가
  - Vercel 배포: Quick Deploy 섹션에 지침 포함

## 변경된 파일

- `examples/codesandbox-template/README.md`
- `examples/next-app-router-example/README.md`

## 코드 품질

- ✅ 링크 검증 완료 (깨진 링크 없음)
- ✅ 배포 지침 인라인으로 포함
- ✅ 문서 가독성 유지

## 체크리스트

- [x] 깨진 링크 확인
- [x] DEPLOYMENT.md 링크 제거
- [x] 배포 지침 인라인 추가
- [x] 문서 검토 완료






