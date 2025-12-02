# Next.js 예제 배포 가이드

## Vercel 배포

### 1. Vercel 프로젝트 생성

**중요**: 별도 GitHub 저장소 연결이 필요 없습니다. 같은 모노레포 저장소에서 프로젝트만 추가하면 됩니다.

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. 기존 GitHub 저장소 선택: `HUA-Labs/HUA-Labs-public`
   - 이미 연결되어 있다면 "Import" 클릭
   - 처음이라면 GitHub 계정 연결 후 저장소 선택

### 2. 모노레포 설정

Vercel은 모노레포를 지원합니다. **프로젝트 설정**에서 다음을 설정하세요:

**Root Directory**: `examples/next-app-router-example`

**Framework Preset**: Next.js (자동 감지)

**Build Command**: (자동 또는 수동 설정)
- 자동: Vercel이 `examples/next-app-router-example/package.json`의 `build` 스크립트 자동 실행
- 수동: `cd ../.. && pnpm install && cd examples/next-app-router-example && pnpm build`

**Install Command**: (필요시)
- `cd ../.. && pnpm install`

> **참고**: `vercel.json` 파일이 이미 생성되어 있어서 대부분의 설정이 자동으로 적용됩니다.

### 3. 환경 변수

현재는 환경 변수가 필요하지 않습니다.

### 4. 배포 후 확인

배포가 완료되면:
1. 언어 전환 기능 테스트
2. 6개 언어 모두 작동 확인
3. 애니메이션 효과 확인
4. SSR 번역 로드 확인

### 5. README에 링크 추가

배포 완료 후 메인 README에 데모 링크 추가:
```markdown
- **[Next.js Live Demo](https://your-vercel-url.vercel.app)** - Live demo on Vercel
```

## 로컬 빌드 테스트

배포 전 로컬에서 빌드 테스트:

```bash
# 모노레포 루트에서
cd examples/next-app-router-example
pnpm build
pnpm start
```

## 문제 해결

### 빌드 에러: 패키지를 찾을 수 없음

모노레포 루트에서 빌드해야 합니다:
```bash
# 루트에서
pnpm install
pnpm build
```

### Vercel 배포 시 workspace 에러

Vercel 설정에서:
- Root Directory: `examples/next-app-router-example`
- Install Command: `cd ../.. && pnpm install`
- Build Command: `pnpm build`

또는 `vercel.json` 파일 생성:

```json
{
  "buildCommand": "cd ../.. && pnpm install && pnpm build --filter=hua-i18n-nextjs-example",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && pnpm install"
}
```

