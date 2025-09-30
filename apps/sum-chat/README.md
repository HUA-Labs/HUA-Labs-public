# SUM Chat

HUA Platform의 실시간 채팅 애플리케이션입니다.

## 🚀 빠른 시작

```bash
# 개발 서버 실행
pnpm dev --filter=sum-chat

# 프로덕션 빌드
pnpm build --filter=sum-chat
```

## 🔧 환경 변수

필요한 환경 변수는 `infra/sum-chat/.env` 파일에 설정하세요.

### 필수 환경 변수

```env
# MongoDB 연결
MONGODB_URI=mongodb://localhost:27017/sum-chat

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📋 주요 기능

- 💬 실시간 채팅
- 🤖 AI 어시스턴트
- 📊 감정 분석
- 🔐 사용자 인증
- 📱 반응형 디자인

## 📚 문서

- [프로젝트 구조](docs/project-structure.md)
- [SDK 가이드](docs/sdk-guide.md)

## 🔗 관련 패키지

- `@hua-labs/i18n-sdk`: 국제화 지원
