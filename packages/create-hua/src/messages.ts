/**
 * create-hua - i18n Messages
 *
 * All user-facing strings in one place.
 * MESSAGES_EN: English-only mode
 * MESSAGES_BI: Bilingual (EN / KO) mode
 */

export type MessageKey =
  // --- shared / prompt ---
  | 'prompt:projectName'
  | 'prompt:projectNameRequired'
  | 'prompt:selectAiContext'
  | 'prompt:documentationLanguage'
  // --- validate ---
  | 'validate:invalidUppercase'
  | 'validate:invalidSpaces'
  | 'validate:invalidStartChar'
  | 'validate:invalidChars'
  // --- cli (bin/create-hua.ts) ---
  | 'cli:tipPermissions'
  | 'cli:tipNodeInstall'
  | 'cli:tipDirExists'
  | 'cli:troubleshooting'
  | 'cli:troubleNodeVersion'
  | 'cli:troublePermissions'
  | 'cli:troubleDiskSpace'
  // --- index.ts ---
  | 'cli:usage'
  | 'cli:projectNameRequired'
  | 'cli:failedInteractiveOptions'
  // --- project (create-project.ts) ---
  | 'project:dirAlreadyExists'
  | 'project:dirAlreadyExistsTip'
  | 'project:errorCreating'
  // --- doctor ---
  | 'doctor:dirNotFound'
  | 'doctor:dirNotFoundSolution'
  | 'doctor:packageJsonNotFound'
  | 'doctor:packageJsonNotFoundSolution'
  | 'doctor:huaDepMissing'
  | 'doctor:huaDepMissingSolution'
  | 'doctor:packageJsonParseFailed'
  | 'doctor:configNotFound'
  | 'doctor:configNotFoundSolution'
  | 'doctor:dirMissing'
  | 'doctor:dirMissingSolution'
  | 'doctor:layoutNotFound'
  | 'doctor:layoutNotFoundSolution'
  | 'doctor:huaProviderMissing'
  | 'doctor:huaProviderMissingSolution'
  | 'doctor:pageNotFound'
  | 'doctor:pageNotFoundSolution'
  | 'doctor:cssNoTheme'
  | 'doctor:cssNoThemeSolution'
  | 'doctor:translationFailed'
  | 'doctor:translationFailedSolution'
  | 'doctor:nodeVersionWarning'
  | 'doctor:nodeVersionWarningSolution'
  | 'doctor:pnpmNotFound'
  | 'doctor:pnpmNotFoundSolution'
  | 'doctor:aiFilesPresent'
  | 'doctor:aiFilesNone'
  // --- prereq (utils.ts) ---
  | 'prereq:nodeRequired'
  | 'prereq:pnpmRequired'
  | 'prereq:templateValidationFailed'
  | 'prereq:checkFailed'
  | 'prereq:tips'
  // --- validate template (utils.ts) ---
  | 'validate:templateDirNotFound'
  | 'validate:templateFilesMissing'
  // --- validate generated project (utils.ts) ---
  | 'validate:packageJsonNotCreated'
  | 'validate:lintScriptIncorrect'
  | 'validate:depMissing'
  | 'validate:packageJsonParseFailed'
  | 'validate:configNotCreated'
  | 'validate:dirNotCreated'
  | 'validate:fileNotCreated'
  | 'validate:projectFailed'
  | 'validate:projectTips'
  // --- validate translation files (utils.ts) ---
  | 'validate:invalidJson'
  | 'validate:readFailed'
  | 'validate:translationFailed'
  // --- display (utils.ts) ---
  | 'display:claudeSkillsEnabled'
  | 'display:claudeSkillsHint'
  | 'display:bilingualMode'
  | 'display:bilingualHint'
  // --- prompt choices (utils.ts) ---
  | 'prompt:cursorRules'
  | 'prompt:aiContext'
  | 'prompt:agentsMd'
  | 'prompt:skillsMd'
  | 'prompt:claudeContext'
  | 'prompt:claudeSkills'
  | 'prompt:langKo'
  | 'prompt:langEn'
  | 'prompt:langBoth'
  // --- version-check ---
  | 'version:outdatedWarning'
  | 'version:outdatedTemplate'
  | 'version:clearCacheTitle'
  | 'version:clearCacheWindows'
  | 'version:clearCacheMacLinux'
  | 'version:createWithLatest'
  | 'version:usingLatest';

export const MESSAGES_EN: Record<MessageKey, string> = {
  // --- prompt ---
  'prompt:projectName': 'What is your project name?',
  'prompt:projectNameRequired': 'Project name is required',
  'prompt:selectAiContext': 'Select AI context files to generate:',
  'prompt:documentationLanguage': 'Documentation language:',
  // --- validate ---
  'validate:invalidUppercase': 'No uppercase letters allowed',
  'validate:invalidSpaces': 'No spaces allowed',
  'validate:invalidStartChar': 'Cannot start with . or _',
  'validate:invalidChars': 'Only lowercase letters, numbers, hyphens, dots, and @ are allowed',
  // --- cli ---
  'cli:tipPermissions': 'Tip: Check folder permissions.',
  'cli:tipNodeInstall': 'Tip: Make sure Node.js is installed.',
  'cli:tipDirExists': 'Tip: Use a different project name or remove the existing folder.',
  'cli:troubleshooting': 'Troubleshooting:',
  'cli:troubleNodeVersion': 'Check Node.js version',
  'cli:troublePermissions': 'Check folder permissions',
  'cli:troubleDiskSpace': 'Check disk space',
  'cli:usage': 'Usage: npx create-hua <project-name> [options]',
  'cli:projectNameRequired': 'Project name is required',
  'cli:failedInteractiveOptions': 'Failed to get interactive options, using defaults',
  // --- project ---
  'project:dirAlreadyExists': 'Directory "{path}" already exists and is not empty',
  'project:dirAlreadyExistsTip': 'Try a different project name or remove the existing directory',
  'project:errorCreating': 'Error creating project',
  // --- doctor ---
  'doctor:dirNotFound': 'Project directory not found: {path}',
  'doctor:dirNotFoundSolution': 'Make sure you are in the correct directory or provide the correct path',
  'doctor:packageJsonNotFound': 'package.json not found',
  'doctor:packageJsonNotFoundSolution': 'This might not be a valid hua project. Run create-hua to initialize.',
  'doctor:huaDepMissing': '@hua-labs/hua not found in dependencies',
  'doctor:huaDepMissingSolution': 'Run: pnpm install @hua-labs/hua',
  'doctor:packageJsonParseFailed': 'Failed to parse package.json: {error}',
  'doctor:configNotFound': 'hua.config.ts not found',
  'doctor:configNotFoundSolution': 'This file is required for hua framework. Re-run create-hua.',
  'doctor:dirMissing': 'Required directory missing: {dir}',
  'doctor:dirMissingSolution': 'Re-run create-hua to restore project structure',
  'doctor:layoutNotFound': 'app/layout.tsx not found',
  'doctor:layoutNotFoundSolution': 'This is required by Next.js. Re-run create-hua to restore.',
  'doctor:huaProviderMissing': 'HuaProvider not found in app/layout.tsx',
  'doctor:huaProviderMissingSolution': 'Wrap your app with <HuaProvider> from @hua-labs/hua',
  'doctor:pageNotFound': 'app/page.tsx not found',
  'doctor:pageNotFoundSolution': 'Create app/page.tsx for your home page',
  'doctor:cssNoTheme': 'globals.css does not import hua theme',
  'doctor:cssNoThemeSolution': 'Add @import "@hua-labs/hua/recommended-theme.css" to globals.css',
  'doctor:translationFailed': 'Translation files validation failed: {error}',
  'doctor:translationFailedSolution': 'Check translations/ko/common.json and translations/en/common.json for JSON syntax errors',
  'doctor:nodeVersionWarning': 'Node.js {min}+ recommended. Current: {current}',
  'doctor:nodeVersionWarningSolution': 'Update Node.js: https://nodejs.org/',
  'doctor:pnpmNotFound': 'pnpm not found',
  'doctor:pnpmNotFoundSolution': 'Install pnpm: npm install -g pnpm',
  'doctor:aiFilesPresent': 'AI context files present: {files}',
  'doctor:aiFilesNone': 'No AI context files found. Run create-hua to generate them.',
  // --- prereq ---
  'prereq:nodeRequired': 'Node.js {min}+ required. Current: {current}',
  'prereq:pnpmRequired': 'pnpm is required. Install: npm install -g pnpm',
  'prereq:templateValidationFailed': 'Template validation failed: {error}',
  'prereq:checkFailed': 'Prerequisites check failed:\n{errors}\n\nTips:',
  'prereq:tips': '  - Update Node.js: https://nodejs.org/\n  - Install pnpm: npm install -g pnpm',
  // --- validate template ---
  'validate:templateDirNotFound': 'Template directory not found: {path}',
  'validate:templateFilesMissing': 'Template files missing: {files}',
  // --- validate generated project ---
  'validate:packageJsonNotCreated': 'package.json file was not created',
  'validate:lintScriptIncorrect': 'package.json lint script is incorrect. Expected: "next lint", Got: "{actual}"',
  'validate:depMissing': 'Required dependency {dep} is missing from package.json',
  'validate:packageJsonParseFailed': 'Failed to parse package.json: {error}',
  'validate:configNotCreated': 'hua.config.ts file was not created',
  'validate:dirNotCreated': 'Required directory {dir} was not created',
  'validate:fileNotCreated': 'Required file {file} was not created',
  'validate:projectFailed': 'Project validation failed:\n{errors}',
  'validate:projectTips': '\n\nTips:\n  - Check file permissions\n  - Ensure disk space is available\n  - Try running again',
  // --- validate translation ---
  'validate:invalidJson': 'Invalid JSON in {file}: {error}',
  'validate:readFailed': 'Failed to read {file}: {error}',
  'validate:translationFailed': 'Translation files validation failed:\n{errors}',
  // --- display ---
  'display:claudeSkillsEnabled': 'Claude Skills enabled:',
  'display:claudeSkillsHint': '  Check .claude/skills/ for framework usage guide',
  'display:bilingualMode': 'Bilingual mode:',
  'display:bilingualHint': '  Edit translations/ko/ and translations/en/ for your content',
  // --- prompt choices ---
  'prompt:cursorRules': '.cursor/rules/ (Cursor IDE rules)',
  'prompt:aiContext': 'ai-context.md (General AI context)',
  'prompt:agentsMd': 'AGENTS.md (OpenAI Codex)',
  'prompt:skillsMd': 'skills.md (Antigravity)',
  'prompt:claudeContext': '.claude/project-context.md (Claude context)',
  'prompt:claudeSkills': '.claude/skills/ (Claude skills)',
  'prompt:langKo': 'Korean only',
  'prompt:langEn': 'English only',
  'prompt:langBoth': 'Both Korean and English',
  // --- version-check ---
  'version:outdatedWarning': 'Warning: You are using an outdated version of create-hua',
  'version:outdatedTemplate': 'This may result in receiving old templates with known issues.',
  'version:clearCacheTitle': 'To clear npx cache:',
  'version:clearCacheWindows': 'Windows:',
  'version:clearCacheMacLinux': 'macOS/Linux:',
  'version:createWithLatest': 'Then create your project with:',
  'version:usingLatest': 'Using latest version: {version}',
};

export const MESSAGES_BI: Record<MessageKey, string> = {
  // --- prompt ---
  'prompt:projectName': 'What is your project name? / 프로젝트 이름을 입력하세요:',
  'prompt:projectNameRequired': 'Project name is required / 프로젝트 이름이 필요합니다',
  'prompt:selectAiContext': 'Select AI context files to generate / 생성할 AI 컨텍스트 파일을 선택하세요:',
  'prompt:documentationLanguage': 'Documentation language / 문서 언어:',
  // --- validate ---
  'validate:invalidUppercase': 'No uppercase letters / 대문자는 사용할 수 없습니다',
  'validate:invalidSpaces': 'No spaces allowed / 공백은 사용할 수 없습니다',
  'validate:invalidStartChar': 'Cannot start with . or _ / .이나 _로 시작할 수 없습니다',
  'validate:invalidChars': 'Only lowercase, numbers, hyphens allowed / 소문자, 숫자, 하이픈만 사용 가능합니다',
  // --- cli ---
  'cli:tipPermissions': 'Tip: 폴더 권한을 확인하세요.',
  'cli:tipNodeInstall': 'Tip: Node.js가 설치되어 있는지 확인하세요.',
  'cli:tipDirExists': 'Tip: 다른 프로젝트 이름을 사용하거나 기존 폴더를 삭제하세요.',
  'cli:troubleshooting': 'Troubleshooting / 문제 해결:',
  'cli:troubleNodeVersion': 'Node.js 버전 확인',
  'cli:troublePermissions': '폴더 권한 확인',
  'cli:troubleDiskSpace': '디스크 공간 확인',
  'cli:usage': 'Usage: npx create-hua <project-name> [options]',
  'cli:projectNameRequired': 'Project name is required / 프로젝트 이름이 필요합니다',
  'cli:failedInteractiveOptions': 'Failed to get interactive options, using defaults',
  // --- project ---
  'project:dirAlreadyExists': '디렉토리 "{path}"가 이미 존재하며 비어있지 않습니다',
  'project:dirAlreadyExistsTip': '다른 프로젝트 이름을 사용하거나 기존 디렉토리를 삭제하세요',
  'project:errorCreating': '프로젝트 생성 중 오류 발생',
  // --- doctor ---
  'doctor:dirNotFound': '프로젝트 디렉토리를 찾을 수 없습니다: {path}',
  'doctor:dirNotFoundSolution': '올바른 디렉토리에 있는지 확인하거나 올바른 경로를 제공하세요',
  'doctor:packageJsonNotFound': 'package.json을 찾을 수 없습니다',
  'doctor:packageJsonNotFoundSolution': '유효한 hua 프로젝트가 아닐 수 있습니다. create-hua를 실행하여 초기화하세요.',
  'doctor:huaDepMissing': '의존성에 @hua-labs/hua가 없습니다',
  'doctor:huaDepMissingSolution': '실행: pnpm install @hua-labs/hua',
  'doctor:packageJsonParseFailed': 'package.json 파싱 실패: {error}',
  'doctor:configNotFound': 'hua.config.ts를 찾을 수 없습니다',
  'doctor:configNotFoundSolution': '이 파일은 hua 프레임워크에 필요합니다. create-hua를 다시 실행하세요.',
  'doctor:dirMissing': '필수 디렉토리 누락: {dir}',
  'doctor:dirMissingSolution': '프로젝트 구조를 복원하려면 create-hua를 다시 실행하세요',
  'doctor:layoutNotFound': 'app/layout.tsx를 찾을 수 없습니다',
  'doctor:layoutNotFoundSolution': 'Next.js에 필수 파일입니다. create-hua를 다시 실행하세요.',
  'doctor:huaProviderMissing': 'app/layout.tsx에 HuaProvider가 없습니다',
  'doctor:huaProviderMissingSolution': '@hua-labs/hua에서 <HuaProvider>로 앱을 감싸세요',
  'doctor:pageNotFound': 'app/page.tsx를 찾을 수 없습니다',
  'doctor:pageNotFoundSolution': '홈 페이지를 위해 app/page.tsx를 생성하세요',
  'doctor:cssNoTheme': 'globals.css에 hua 테마 import가 없습니다',
  'doctor:cssNoThemeSolution': 'globals.css에 @import "@hua-labs/hua/recommended-theme.css"를 추가하세요',
  'doctor:translationFailed': '번역 파일 검증 실패: {error}',
  'doctor:translationFailedSolution': 'translations/ko/common.json과 translations/en/common.json의 JSON 문법 오류를 확인하세요',
  'doctor:nodeVersionWarning': 'Node.js {min}+ 권장. 현재: {current}',
  'doctor:nodeVersionWarningSolution': 'Node.js 업데이트: https://nodejs.org/',
  'doctor:pnpmNotFound': 'pnpm을 찾을 수 없습니다',
  'doctor:pnpmNotFoundSolution': 'pnpm 설치: npm install -g pnpm',
  'doctor:aiFilesPresent': 'AI 컨텍스트 파일 감지: {files}',
  'doctor:aiFilesNone': 'AI 컨텍스트 파일이 없습니다. create-hua를 실행하여 생성하세요.',
  // --- prereq ---
  'prereq:nodeRequired': 'Node.js {min}+ 필요합니다. 현재: {current}',
  'prereq:pnpmRequired': 'pnpm이 필요합니다. 설치: npm install -g pnpm',
  'prereq:templateValidationFailed': '템플릿 검증 실패: {error}',
  'prereq:checkFailed': '사전 검증 실패:\n{errors}\n\n팁:',
  'prereq:tips': '  - Node.js 업데이트: https://nodejs.org/\n  - pnpm 설치: npm install -g pnpm',
  // --- validate template ---
  'validate:templateDirNotFound': '템플릿 디렉토리를 찾을 수 없습니다: {path}',
  'validate:templateFilesMissing': '템플릿 파일 누락: {files}',
  // --- validate generated project ---
  'validate:packageJsonNotCreated': 'package.json 파일이 생성되지 않았습니다.',
  'validate:lintScriptIncorrect': 'package.json의 lint 스크립트가 올바르지 않습니다. 예상: "next lint", 실제: "{actual}"',
  'validate:depMissing': '필수 의존성 {dep}이 package.json에 없습니다.',
  'validate:packageJsonParseFailed': 'package.json 파싱 실패: {error}',
  'validate:configNotCreated': 'hua.config.ts 파일이 생성되지 않았습니다.',
  'validate:dirNotCreated': '필수 디렉토리 {dir}가 생성되지 않았습니다.',
  'validate:fileNotCreated': '필수 파일 {file}이 생성되지 않았습니다.',
  'validate:projectFailed': '프로젝트 검증 실패:\n{errors}',
  'validate:projectTips': '\n\n팁:\n  - 파일 권한 확인\n  - 디스크 공간 확인\n  - 다시 실행해보세요',
  // --- validate translation ---
  'validate:invalidJson': '{file}의 JSON 문법 오류: {error}',
  'validate:readFailed': '{file} 읽기 실패: {error}',
  'validate:translationFailed': '번역 파일 검증 실패:\n{errors}',
  // --- display ---
  'display:claudeSkillsEnabled': 'Claude Skills enabled:',
  'display:claudeSkillsHint': '  .claude/skills/에서 프레임워크 사용 가이드를 확인하세요',
  'display:bilingualMode': 'Bilingual mode:',
  'display:bilingualHint': '  translations/ko/와 translations/en/에서 번역을 수정하세요',
  // --- prompt choices ---
  'prompt:cursorRules': '.cursor/rules/ (Cursor IDE rules) / Cursor IDE 규칙',
  'prompt:aiContext': 'ai-context.md (General AI context) / 범용 AI 컨텍스트',
  'prompt:agentsMd': 'AGENTS.md (OpenAI Codex) / Codex 컨텍스트',
  'prompt:skillsMd': 'skills.md (Antigravity) / Antigravity 스킬',
  'prompt:claudeContext': '.claude/project-context.md (Claude context) / Claude 컨텍스트',
  'prompt:claudeSkills': '.claude/skills/ (Claude skills) / Claude 스킬',
  'prompt:langKo': 'Korean only / 한국어만',
  'prompt:langEn': 'English only / 영어만',
  'prompt:langBoth': 'Both Korean and English / 한국어와 영어 모두',
  // --- version-check ---
  'version:outdatedWarning': 'Warning: You are using an outdated version of create-hua',
  'version:outdatedTemplate': 'This may result in receiving old templates with known issues.',
  'version:clearCacheTitle': 'To clear npx cache:',
  'version:clearCacheWindows': 'Windows:',
  'version:clearCacheMacLinux': 'macOS/Linux:',
  'version:createWithLatest': 'Then create your project with:',
  'version:usingLatest': 'Using latest version: {version}',
};
