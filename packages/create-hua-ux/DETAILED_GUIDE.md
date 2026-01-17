# @hua-labs/create-hua-ux Detailed Guide

Technical reference for the HUA UX scaffolding and automation tool.
HUA UX 프로젝트 구성을 위한 스캐폴딩 및 자동화 도구 기술 명세입니다.

---

## English

### Operational Overview
The CLI tool automates the setup of HUA Framework projects, including configuration files and AI-specific context optimization.

### CLI Interface and Parameters

#### Interactive Mode (Standard)
Executes a guided setup process for:
1. **AI Context Generation**: Select specific metadata files (`.cursorrules`, `ai-context.md`, Claude context) to assist LLMs in project understanding.
2. **Localization Defaults**: Configure primary documentation and translation languages (Korean, English, or Bilingual).

#### Automated Execution (Non-Interactive)
Suitable for inclusion in automated scripts or CI/CD pipelines.
```bash
NON_INTERACTIVE=1 pnpm create hua-ux my-app
```

#### Parameters Reference
- `--claude-skills`: Includes functional skill definitions for Claude-based development.
- `--no-cursorrules`: Prevents the generation of the `.cursorrules` file.
- `--lang <ko|en|both>`: Forces a specific language configuration for the generated project.

---

### Generated Internal Structure
- `hua-ux.config.ts`: Central framework orchestration and configuration.
- `translations/`: Directory structure for multilingual resources.
- `app/layout.tsx`: Root layout integrated with the framework provider.
- `ai-context/`: Collection of files designed for search engine and developer tool indexing.

---

## Korean

### 운영 개요
CLI 도구는 설정 파일 및 AI 컨텍스트 최적화 파일을 포함한 HUA UX 프레임워크 프로젝트 구성을 자동화합니다.

### 인터페이스 및 파라미터 상세

#### 대화형 실행 (표준)
다음 항목들에 대한 가이드 설정을 진행합니다:
1. **AI 컨텍스트 파일 자동 생성**: 프로젝트를 분석하는 LLM을 돕기 위한 메타데이터 파일들을 선택적으로 생성합니다.
2. **언어 환경 설정**: 프로젝트 문서 및 번역의 기본 언어를 설정합니다.

#### 자동 실행 모드
사용자 개입 없이 기본 설정을 적용할 때 사용합니다.

#### 파라미터 레퍼런스
- `--claude-skills`: Claude 환경을 위한 기능 스킬 정의를 포함합니다.
- `--no-cursorrules`: `.cursorrules` 파일 생성을 수행하지 않습니다.
- `--lang <ko|en|both>`: 생성될 프로젝트의 언어 환경을 강제 지정합니다.

---

### 생성된 프로젝트 내부 구조
- `hua-ux.config.ts`: 프레임워크의 통합 제어 및 설정 파일입니다.
- `translations/`: 다국어 자원 관리를 위한 디렉토리 구조입니다.
- `app/layout.tsx`: 프레임워크 레이어가 적용된 최상위 레이아웃 파일입니다.
- AI 최적화 파일: 인덱싱 및 AI 도구의 프로젝트 이해도를 높이기 위한 파일군을 포함합니다.
