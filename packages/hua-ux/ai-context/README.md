# HUA-UX AI Context Files

이 디렉토리는 AI 도구(Cursor, Claude 등)가 hua-ux 프레임워크를 이해하고 더 나은 코드를 생성할 수 있도록 돕는 컨텍스트 파일들을 제공합니다.

This directory provides context files to help AI tools (Cursor, Claude, etc.) understand the hua-ux framework and generate better code.

## Files

### ai-context.md
프로젝트 구조, 아키텍처, 사용 패턴에 대한 종합 가이드입니다.
A comprehensive guide about project structure, architecture, and usage patterns.

### .cursorrules
Cursor IDE를 위한 규칙 파일입니다. AI가 코드 생성 시 따라야 할 규칙을 정의합니다.
Rules file for Cursor IDE. Defines rules that AI should follow when generating code.

## Usage / 사용법

### Option 1: Copy to your project root
프로젝트 루트에 파일들을 복사하세요:

```bash
# Copy ai-context.md to project root
cp node_modules/@hua-labs/hua-ux/ai-context/ai-context.md ./ai-context.md

# Copy .cursorrules to project root
cp node_modules/@hua-labs/hua-ux/ai-context/.cursorrules ./.cursorrules
```

### Option 2: Use create-hua-ux CLI (Recommended)
`create-hua-ux` CLI를 사용하면 자동으로 AI 컨텍스트 파일이 포함됩니다:

```bash
npm create hua-ux@latest my-app
```

## Customization / 커스터마이징

이 파일들은 시작점입니다. 프로젝트의 특성에 맞게 수정하세요:
These files are starting points. Customize them for your project's needs:

1. **ai-context.md**: 프로젝트별 컴포넌트, API, 비즈니스 로직 설명 추가
2. **.cursorrules**: 팀의 코딩 스타일, 네이밍 컨벤션 추가

## Related

- [create-hua-ux](https://www.npmjs.com/package/create-hua-ux) - CLI that auto-generates these files
- [HUA-UX Framework](../README.md) - Main framework documentation
