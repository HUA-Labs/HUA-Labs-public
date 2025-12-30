# Interactive Mode Guide

## 대화형 환경 사용 방법

`create-hua-ux` CLI는 대화형 프롬프트를 지원합니다. 실제 터미널에서 실행하면 프롬프트가 나타납니다.

## 사용 방법

### 1. 대화형 모드 (Interactive Mode)

실제 터미널에서 직접 실행하면 프롬프트가 나타납니다:

```bash
cd packages/create-hua-ux
npx tsx src/index.ts my-project
```

**프롬프트**:
1. 프로젝트 이름 입력 (이미 인자로 제공했으면 스킵)
2. AI 컨텍스트 파일 선택 (체크박스)
   - `.cursorrules` (기본: 체크)
   - `ai-context.md` (기본: 체크)
   - `.claude/project-context.md` (기본: 체크)
   - `.claude/skills/` (기본: 체크 안 됨)
3. 문서 언어 선택
   - Korean only
   - English only
   - Both Korean and English (기본)

### 2. 비대화형 모드 (Non-Interactive Mode)

CI/CD나 스크립트에서 사용할 때는 환경 변수를 설정:

```bash
# PowerShell
$env:NON_INTERACTIVE='1'
npx tsx src/index.ts my-project

# Bash
NON_INTERACTIVE=1 npx tsx src/index.ts my-project
```

**기본값**:
- `.cursorrules`: ✅ 생성
- `ai-context.md`: ✅ 생성
- `.claude/project-context.md`: ✅ 생성
- `.claude/skills/`: ❌ 생성 안 함
- 언어: `both` (한국어 + 영어)

### 3. CLI 플래그 사용

프롬프트 없이 옵션을 직접 지정:

```bash
npx tsx src/index.ts my-project --claude-skills --lang both
```

**사용 가능한 플래그**:
- `--claude-skills`: Claude 스킬 생성
- `--no-cursorrules`: `.cursorrules` 생성 안 함
- `--no-ai-context`: `ai-context.md` 생성 안 함
- `--no-claude-context`: `.claude/project-context.md` 생성 안 함
- `--lang <ko|en|both>`: 문서 언어 지정

**예시**:
```bash
# Claude 스킬 포함, 영어만
npx tsx src/index.ts my-project --claude-skills --lang en

# Cursor rules만 생성
npx tsx src/index.ts my-project --no-ai-context --no-claude-context --no-claude-skills
```

## 대화형 환경 감지

CLI는 다음을 확인하여 대화형 모드인지 판단합니다:

1. `process.stdin.isTTY` - stdin이 TTY인지
2. `process.stdout.isTTY` - stdout이 TTY인지
3. `process.env.CI` - CI 환경인지
4. `process.env.NON_INTERACTIVE` - 명시적으로 비대화형 모드인지

PowerShell이나 일부 환경에서는 TTY가 `undefined`일 수 있지만, 명시적으로 `NON_INTERACTIVE`를 설정하지 않으면 대화형 모드로 시도합니다.

## 문제 해결

### 프롬프트가 나타나지 않는 경우

1. **실제 터미널에서 실행**: PowerShell ISE나 일부 IDE 터미널에서는 프롬프트가 나타나지 않을 수 있습니다.
2. **비대화형 모드 사용**: `NON_INTERACTIVE=1` 환경 변수 설정
3. **CLI 플래그 사용**: `--claude-skills` 등의 플래그로 옵션 지정

### PowerShell에서 프롬프트가 멈추는 경우

PowerShell의 파이프나 리다이렉션을 사용하면 프롬프트가 나타나지 않을 수 있습니다:

```powershell
# ❌ 작동하지 않을 수 있음
npx tsx src/index.ts my-project | Out-File log.txt

# ✅ 직접 실행
npx tsx src/index.ts my-project

# ✅ 비대화형 모드
$env:NON_INTERACTIVE='1'
npx tsx src/index.ts my-project
```

## 참고

- 대화형 모드에서는 inquirer를 사용하여 사용자 입력을 받습니다.
- 비대화형 모드나 에러 발생 시 기본값을 사용합니다.
- CLI 플래그가 제공되면 프롬프트를 건너뜁니다.
