# AI 도구 지원 전략

## 개요

바이브 코딩을 위해 다양한 AI 도구를 지원하는 전략입니다.

## 지원하는 AI 도구

### 1. Cursor

**파일**: `.cursorrules`

**용도**: Cursor IDE가 코드 생성 시 따를 규칙

**내용**:
- 프로젝트 구조 설명
- 코드 생성 패턴
- 주요 규칙

**자동 생성**: ✅ `create-hua-ux` 실행 시 자동 생성

### 2. Claude (Cursor 내 Claude 포함)

**파일**: `.claude/project-context.md`

**용도**: Claude가 프로젝트 구조를 이해하기 위한 컨텍스트

**내용**:
- 프로젝트 개요
- 아키텍처 계층
- 주요 패턴
- 설정 파일 설명

**자동 생성**: ✅ `create-hua-ux` 실행 시 자동 생성

### 3. 범용 AI 컨텍스트

**파일**: `ai-context.md`

**용도**: 모든 AI 도구가 사용할 수 있는 범용 컨텍스트

**내용**:
- 프로젝트 구조
- 주요 패턴
- 설정 파일 이해
- AI가 코드 생성할 때 주의사항

**자동 생성**: ✅ `create-hua-ux` 실행 시 자동 생성

## 한글 + 영어 JSDoc 전략

### 원칙

**양쪽 모두 지원**: 한글 사용자와 영어 사용자 모두 만족

**형식**:
```typescript
/**
 * 한글 설명 / English description
 * 
 * 상세 설명 (한글) / Detailed description (English)
 * 
 * @param param - 한글 설명 / English description
 */
```

### 예시

```typescript
/**
 * 프레임워크 설정 정의 / Define framework configuration
 * 
 * IntelliSense를 완벽히 지원하는 설정 함수입니다.
 * Provides full IntelliSense support for configuration options.
 * 
 * @param config - 설정 객체 / Configuration object
 * @param config.preset - 사용할 프리셋 / Preset to use
 *   - 'product': 제품 페이지용 (전문적, 효율적) / Product pages (professional, efficient)
 *   - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는) / Marketing pages (dramatic, eye-catching)
 */
```

## 구현 상태

### 완료 ✅

- [x] `.cursorrules` 템플릿 생성
- [x] `.claude/project-context.md` 템플릿 생성
- [x] `ai-context.md` 템플릿 생성
- [x] 한글 + 영어 JSDoc 시작 (defineConfig)

### 진행 중

- [ ] 모든 설정 항목에 한글 + 영어 JSDoc 추가
- [ ] 컴포넌트 props에도 한글 + 영어 JSDoc 추가
- [ ] 훅에도 한글 + 영어 JSDoc 추가

## 사용 예시

### Cursor 사용자

1. 프로젝트 생성: `pnpm create hua-ux my-app`
2. `.cursorrules` 자동 생성됨
3. Cursor가 프로젝트 구조 자동 이해
4. "메인 페이지 만들어줘" → AI가 완벽한 코드 생성

### Claude 사용자

1. 프로젝트 생성: `pnpm create hua-ux my-app`
2. `.claude/project-context.md` 자동 생성됨
3. Claude가 프로젝트 구조 자동 이해
4. "메인 페이지 만들어줘" → AI가 완벽한 코드 생성

### 범용 AI 도구

1. 프로젝트 생성: `pnpm create hua-ux my-app`
2. `ai-context.md` 자동 생성됨
3. AI 도구가 이 파일을 읽고 프로젝트 구조 이해

## 다음 단계

1. **모든 JSDoc에 한글 + 영어 추가**
   - 설정 항목
   - 컴포넌트 props
   - 훅

2. **AI 도구별 최적화**
   - Cursor: `.cursorrules` 강화
   - Claude: `.claude/` 디렉토리 확장
   - 범용: `ai-context.md` 상세화

## 참고 자료

- [바이브 코딩 전략](./VIBE_CODING_STRATEGY.md)
- [계층화된 아키텍처](./LAYERED_ARCHITECTURE.md)
