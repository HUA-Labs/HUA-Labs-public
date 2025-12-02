# CodeSandbox 실행 가이드

## 방법 1: GitHub에서 직접 Import (권장)

### Step 1: GitHub에 푸시
먼저 템플릿을 GitHub에 푸시해야 합니다:

```bash
cd examples/codesandbox-template
git add .
git commit -m "feat: add CodeSandbox template"
git push
```

### Step 2: CodeSandbox에서 Import
1. [CodeSandbox](https://codesandbox.io) 접속
2. 우측 상단 **"Import"** 버튼 클릭
3. **"Import from GitHub"** 선택
4. GitHub 레포지토리 URL 입력:
   ```
   https://github.com/HUA-Labs/HUA-Labs-public
   ```
5. **"Directory"** 필드에 경로 입력:
   ```
   examples/codesandbox-template
   ```
6. **"Import"** 클릭

### Step 3: 실행
- CodeSandbox가 자동으로 의존성을 설치하고 개발 서버를 시작합니다
- 몇 분 후 자동으로 브라우저에서 열립니다

---

## 방법 2: CodeSandbox URL 직접 생성

GitHub에 푸시 후, 다음 URL 형식으로 직접 접근 가능:

```
https://codesandbox.io/s/github/HUA-Labs/HUA-Labs-public/tree/main/examples/codesandbox-template
```

또는 CodeSandbox에서:
1. **"Create Sandbox"** 클릭
2. **"Import from GitHub"** 선택
3. 레포지토리와 디렉토리 경로 입력

---

## 방법 3: 로컬에서 테스트 후 업로드

### 로컬 테스트
```bash
cd examples/codesandbox-template
npm install
npm run dev
```

### CodeSandbox에 업로드
1. CodeSandbox 접속
2. **"Create Sandbox"** → **"Import from CLI"** 선택
3. 또는 **"Upload"** 버튼으로 폴더 업로드

---

## 방법 4: CodeSandbox Template로 공유

템플릿을 CodeSandbox Template로 만들면:
1. CodeSandbox에서 프로젝트 열기
2. **"File"** → **"Save as Template"** 클릭
3. 템플릿 이름과 설명 입력
4. 템플릿 URL 생성됨 (예: `https://codesandbox.io/s/hua-i18n-demo-xxxxx`)

이 URL을 README에 추가하면 사용자가 바로 사용 가능합니다.

---

## 주의사항

### 패키지가 npm에 배포되지 않은 경우
현재 `@hua-labs/i18n-core`와 `@hua-labs/i18n-core-zustand`가 npm에 배포되지 않았다면:

1. **임시 해결책**: 로컬 패키지로 사용
   - `package.json`에서 `workspace:*` 사용 (모노레포인 경우)
   - 또는 상대 경로로 import

2. **권장**: npm 배포 후 사용
   - 패키지를 npm에 배포한 후 사용하는 것이 가장 좋습니다

### CodeSandbox 설정 확인
- `sandbox.config.json`이 올바르게 설정되어 있는지 확인
- Node.js 버전이 18 이상인지 확인

---

## 빠른 시작 (패키지 배포 후)

패키지가 npm에 배포되면:

1. CodeSandbox 접속
2. **"Create Sandbox"** → **"Import from GitHub"**
3. 레포지토리: `HUA-Labs/HUA-Labs-public`
4. 디렉토리: `examples/codesandbox-template`
5. **"Import"** 클릭

자동으로 실행됩니다!

