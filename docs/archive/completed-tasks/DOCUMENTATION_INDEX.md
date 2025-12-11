# Motion 패키지 문서 인덱스

**작성일**: 2025-12-06  
**목적**: 모든 문서의 역할과 위치를 명확히 정리

---

## 📚 문서 구조

### 핵심 계획 문서

#### 1. **MOTION_REFACTORING_PLAN.md** (실행 계획)
**위치**: `packages/hua-motion/MOTION_REFACTORING_PLAN.md`

**역할**: 
- 재편 목표 및 패키지 구조 설계
- 의존성 규칙 정의
- 구현 단계별 상세 계획
- 검증 체크리스트

**대상**: 개발팀, 프로젝트 관리자

#### 2. **REFACTORING_STRATEGY.md** (전략 문서)
**위치**: `packages/hua-motion/REFACTORING_STRATEGY.md`

**역할**:
- 현재 상황 상세 분석
- 재편 목표 및 전략
- 기능 분류
- UI 패키지 호환성 전략

**대상**: 아키텍트, 기술 리더

#### 3. **CURRENT_STATUS.md** (현재 상황)
**위치**: `packages/hua-motion/CURRENT_STATUS.md`

**역할**:
- 패키지 현황 상세 분석
- 기능 매핑
- 의존성 분석
- 문제점 및 개선점

**대상**: 모든 개발자

#### 4. **REFACTORING_SUMMARY.md** (요약)
**위치**: `packages/hua-motion/REFACTORING_SUMMARY.md`

**역할**:
- 핵심 요약
- GPT에게 컨텍스트 제공
- 빠른 참조

**대상**: AI Assistant, 빠른 참조 필요 시

### 사용자 가이드 문서

#### 5. **GETTING_STARTED.md** (도입 가이드)
**위치**: `packages/hua-motion/docs/GETTING_STARTED.md`

**역할**:
- 패키지 선택 가이드 (Core vs Advanced)
- 설치 및 사용법
- 기능별 분류
- UI 패키지와의 통합
- 예제 코드

**대상**: 새로운 사용자, 개발자

#### 6. **DEPENDENCY_RULES.md** (의존성 규칙)
**위치**: `packages/hua-motion/docs/DEPENDENCY_RULES.md`

**역할**:
- 명시적 의존성 규칙 표
- 각 규칙의 상세 설명
- 위반 시 문제점
- 검증 방법

**대상**: 모든 개발자, CI/CD

#### 7. **MIGRATION_GUIDE.md** (마이그레이션 가이드)
**위치**: `packages/hua-motion/docs/MIGRATION_GUIDE.md`

**역할**:
- 기존 코드 마이그레이션 방법
- 단계별 가이드
- 코드 예제
- FAQ

**대상**: 기존 사용자, 마이그레이션 진행 중인 개발자

### UI 패키지 통합 문서

#### 8. **MOTION_PACKAGE_INTEGRATION.md** (UI 통합 가이드)
**위치**: `packages/hua-ui/docs/MOTION_PACKAGE_INTEGRATION.md`

**역할**:
- UI 패키지 현재 사용 현황
- 마이그레이션 전략
- 사용 가이드
- 최적화 전략

**대상**: UI 패키지 개발자, 사용자

### 컨텍스트 문서

#### 9. **GPT_CONTEXT.md** (GPT 컨텍스트)
**위치**: `packages/hua-motion/GPT_CONTEXT.md`

**역할**:
- GPT에게 전달할 간결한 컨텍스트
- 핵심 정보만 포함
- 프롬프트로 바로 사용 가능

**대상**: AI Assistant

---

## 📖 문서별 역할 정리

### Philosophy + 계층 구조
- **REFACTORING_STRATEGY.md**: 전반적인 Philosophy + 계층 구조
- **CURRENT_STATUS.md**: 현재 상황 분석

### 구체적 구조 정의
- **MOTION_REFACTORING_PLAN.md**: 구체적 export / 파일 구조 정의
- **DEPENDENCY_RULES.md**: 의존성 규칙 명시

### 사용자 가이드
- **GETTING_STARTED.md**: 도입 가이드
- **MIGRATION_GUIDE.md**: 마이그레이션 가이드
- **MOTION_PACKAGE_INTEGRATION.md**: UI 패키지 통합

### 실행 계획
- **MOTION_REFACTORING_PLAN.md**: 실행 계획 및 체크리스트

---

## 🎯 문서 사용 시나리오

### 시나리오 1: 새로운 프로젝트 시작
1. **GETTING_STARTED.md** - 패키지 선택 및 설치
2. **DEPENDENCY_RULES.md** - 의존성 규칙 확인

### 시나리오 2: 기존 코드 마이그레이션
1. **MIGRATION_GUIDE.md** - 마이그레이션 방법
2. **DEPENDENCY_RULES.md** - 의존성 규칙 확인
3. **GETTING_STARTED.md** - 새로운 사용법 학습

### 시나리오 3: 아키텍처 이해
1. **REFACTORING_STRATEGY.md** - 전반적인 전략
2. **CURRENT_STATUS.md** - 현재 상황
3. **MOTION_REFACTORING_PLAN.md** - 실행 계획

### 시나리오 4: UI 패키지 개발
1. **MOTION_PACKAGE_INTEGRATION.md** - UI 통합 가이드
2. **DEPENDENCY_RULES.md** - 의존성 규칙
3. **GETTING_STARTED.md** - Motion 패키지 사용법

### 시나리오 5: AI Assistant 작업
1. **GPT_CONTEXT.md** - 간결한 컨텍스트
2. **REFACTORING_SUMMARY.md** - 상세 요약
3. **MOTION_REFACTORING_PLAN.md** - 실행 계획

---

## 📝 문서 작성 원칙

### 1. 역할 명확화
- 각 문서는 명확한 역할을 가짐
- 중복 최소화
- 상호 참조 활용

### 2. 대상 독자 명시
- 각 문서의 대상 독자 명시
- 독자 수준에 맞는 내용
- 예제 코드 포함

### 3. 일관성 유지
- 문서 간 일관된 스타일
- 용어 통일
- 구조 일관성

### 4. 최신 상태 유지
- 변경 사항 즉시 반영
- 버전 관리
- 최종 업데이트 날짜 표시

---

## 🔄 문서 업데이트 프로세스

### 1. 변경 사항 발생 시
1. 관련 문서 식별
2. 문서 업데이트
3. 상호 참조 확인
4. 검토 및 승인

### 2. 정기적 검토
- 월 1회 문서 검토
- 사용자 피드백 반영
- 최신 정보 반영

### 3. 버전 관리
- 문서 버전 명시
- 변경 이력 관리
- 최종 업데이트 날짜 표시

---

## 📌 빠른 참조

### 가장 자주 사용되는 문서
1. **GETTING_STARTED.md** - 도입 가이드
2. **DEPENDENCY_RULES.md** - 의존성 규칙
3. **MIGRATION_GUIDE.md** - 마이그레이션 가이드

### 계획 및 전략 문서
1. **MOTION_REFACTORING_PLAN.md** - 실행 계획
2. **REFACTORING_STRATEGY.md** - 전략 문서
3. **CURRENT_STATUS.md** - 현재 상황

### 컨텍스트 문서
1. **GPT_CONTEXT.md** - GPT 컨텍스트
2. **REFACTORING_SUMMARY.md** - 요약

---

**작성자**: Auto (AI Assistant)  
**최종 업데이트**: 2025-12-06

