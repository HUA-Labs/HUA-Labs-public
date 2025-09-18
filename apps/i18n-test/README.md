# i18n Test App

이 프로젝트는 `@hua-labs/i18n-beginner` SDK를 테스트하기 위한 앱입니다.

## 🧪 테스트 내용

### ✅ 기본 기능 테스트
- [x] 한국어/영어 자동 전환
- [x] 기본 번역 키들 (80개+) 정상 작동
- [x] 하이드레이션 오류 없음
- [x] 언어 설정 유지 (localStorage)

### ✅ 커스텀 번역 테스트
- [x] 동적 번역 추가 (`addTranslation`)
- [x] TypeScript 파일에서 번역 로드 (`useTranslationsFromFile`)
- [x] 무한 루프 오류 없음

### ✅ TypeScript 파일 지원 테스트
- [x] `translations/myTranslations.ts` 파일 생성
- [x] `useTranslationsFromFile` 훅 사용
- [x] 번역 파일에서 로드된 텍스트 정상 표시

## 🎯 테스트 결과

### ✅ 성공한 기능들:
- **기본 번역**: 80개+ 기본 번역 키 정상 작동
- **언어 전환**: 한국어 ↔ 영어 자동 전환
- **TypeScript 파일**: 별도 파일에서 번역 로드 성공
- **하이드레이션**: 서버/클라이언트 렌더링 일치
- **성능**: 무한 루프 없음, 메모리 누수 없음

### 📁 파일 구조:
```
apps/i18n-test/
├── app/
│   ├── layout.tsx          # SimpleI18n Provider 설정
│   ├── page.tsx           # 메인 페이지
│   └── components/
│       └── MinimalExample.tsx  # 테스트 컴포넌트
├── translations/
│   └── myTranslations.ts  # TypeScript 번역 파일
└── README.md
```

## 🚀 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 브라우저에서 확인
open http://localhost:3001
```

## 📝 테스트 시나리오

1. **기본 번역 확인**: "환영합니다" / "Welcome" 표시 확인
2. **언어 전환**: 버튼 클릭으로 한국어 ↔ 영어 전환
3. **TypeScript 파일 번역**: "환영합니다 (TypeScript 파일에서)" 표시 확인
4. **새로고침**: 페이지 새로고침 후 언어 설정 유지 확인

## 🎯 결론

`@hua-labs/i18n-beginner` SDK는 초보자도 쉽게 사용할 수 있는 다국어 지원 도구입니다!

- ✅ **간단한 설정**: 3단계로 완성
- ✅ **TypeScript 지원**: 타입 안정성 보장
- ✅ **파일 분리**: 번역을 별도 파일로 관리 가능
- ✅ **성능 최적화**: 무한 루프, 메모리 누수 없음
- ✅ **하이드레이션 안전**: Next.js와 완벽 호환
