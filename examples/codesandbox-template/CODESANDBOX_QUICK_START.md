# CodeSandbox 빠른 시작

## 가장 빠른 방법

### 1단계: GitHub에 푸시 (이미 완료된 경우 스킵)

```bash
# 현재 브랜치에서
git add examples/codesandbox-template
git commit -m "feat: add CodeSandbox template"
git push
```

### 2단계: CodeSandbox에서 Import

**옵션 A: 웹에서 직접**
1. https://codesandbox.io 접속
2. 우측 상단 **"Import"** 클릭
3. **"Import from GitHub"** 선택
4. 입력:
   - Repository: `HUA-Labs/HUA-Labs-public`
   - Directory: `examples/codesandbox-template`
5. **"Import"** 클릭

**옵션 B: URL로 직접 접근**
```
https://codesandbox.io/s/github/HUA-Labs/HUA-Labs-public/tree/main/examples/codesandbox-template
```

### 3단계: 실행
- CodeSandbox가 자동으로 `npm install` 실행
- 개발 서버 자동 시작
- 브라우저에서 자동으로 열림

---

## 패키지가 npm에 없을 때

현재 패키지가 npm에 배포되지 않았다면, CodeSandbox에서 직접 사용하기 어렵습니다.

**해결 방법:**

1. **임시로 로컬 패키지 사용** (복잡함)
   - 모노레포 구조를 CodeSandbox에 전체 업로드
   - 또는 패키지 파일을 직접 복사

2. **패키지 배포 후 사용** (권장)
   - 먼저 패키지를 npm에 배포
   - 그 다음 CodeSandbox 템플릿 사용

---

## CodeSandbox Template로 공유하기

템플릿을 CodeSandbox Template로 만들면 더 쉽게 공유할 수 있습니다:

1. CodeSandbox에서 프로젝트 열기
2. **File** → **Save as Template**
3. 템플릿 이름: "HUA i18n Demo"
4. 설명 입력
5. **Save** 클릭
6. 생성된 템플릿 URL을 README에 추가

템플릿 URL 예시:
```
https://codesandbox.io/s/hua-i18n-demo-xxxxx
```

이 URL을 README에 추가하면 사용자가 클릭 한 번으로 바로 사용할 수 있습니다!

