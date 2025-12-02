# Next.js 플레이그라운드 빠른 시작 가이드

## 실행 방법

### 1. 모노레포 루트에서 의존성 설치

```bash
# 모노레포 루트에서
cd C:\HUA-Labs-public
pnpm install
```

### 2. 예제 디렉토리로 이동

```bash
cd examples/next-app-router-example
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

### 4. 브라우저에서 확인

[http://localhost:3000](http://localhost:3000) 열기

## 주요 기능 확인

1. **언어 전환**: 상단의 언어 버튼 클릭 (6개 언어 지원)
   - 🇰🇷 한국어
   - 🇺🇸 English
   - 🇯🇵 日本語
   - 🇨🇳 中文
   - 🇪🇸 Español
   - 🇫🇷 Français
2. **여러 네임스페이스**: common, pages, examples 네임스페이스 사용
3. **getRawValue**: 배열/객체 값 가져오기
4. **SSR 번역 로드**: 초기 로드 시 서버에서 번역 로드
5. **API 로더**: `/api/translations/[language]/[namespace]` 엔드포인트 사용

## 빌드 및 타입 체크

```bash
# 타입 체크
npx tsc --noEmit

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 문제 해결

### 번역이 로드되지 않는 경우

- `translations/` 폴더의 JSON 파일 확인
- API 라우트가 정상 작동하는지 확인 (`/api/translations/ko/common`)

