# Repository Management Scripts

이 디렉토리에는 레포지토리 관리 및 동기화를 위한 스크립트가 포함되어 있습니다.

## 스크립트 목록

### 1. `sync-to-main-repo.ps1` / `sync-to-main-repo.sh`

퍼블릭 레포(HUA-Labs-public)에서 메인 레포(HUA-platform)로 i18n 패키지를 동기화합니다.

**사용법:**

**PowerShell (Windows):**
```powershell
# 메인 레포 경로 필수 지정
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\path\to\main\repo"

# Dry run (변경사항 미리보기)
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\path\to\main\repo" -DryRun

# 퍼블릭 레포 경로도 지정 (기본값: 스크립트 상위 디렉토리)
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\path\to\main\repo" -PublicRepoPath "C:\path\to\public\repo"
```

**Bash (Linux/Mac):**
```bash
# 실행 권한 부여 (최초 1회)
chmod +x scripts/sync-to-main-repo.sh

# 메인 레포 경로 필수 지정
MAIN_REPO_PATH="/path/to/main/repo" ./scripts/sync-to-main-repo.sh

# Dry run
MAIN_REPO_PATH="/path/to/main/repo" DRY_RUN=true ./scripts/sync-to-main-repo.sh

# 퍼블릭 레포 경로도 지정 (기본값: 스크립트 상위 디렉토리)
MAIN_REPO_PATH="/path/to/main/repo" PUBLIC_REPO_PATH="/path/to/public/repo" ./scripts/sync-to-main-repo.sh
```

**실제 사용 예시:**

**PowerShell (Windows):**
```powershell
# 예시 1: 기본 사용 (메인 레포 경로만 지정)
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform"

# 예시 2: Dry run으로 미리 확인
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform" -DryRun

# 예시 3: 두 레포 경로 모두 지정
.\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform" -PublicRepoPath "C:\dev\HUA-Labs-public"
```

**Bash (Linux/Mac):**
```bash
# 예시 1: 기본 사용
MAIN_REPO_PATH="$HOME/projects/HUA-platform" ./scripts/sync-to-main-repo.sh

# 예시 2: Dry run으로 미리 확인
MAIN_REPO_PATH="$HOME/projects/HUA-platform" DRY_RUN=true ./scripts/sync-to-main-repo.sh

# 예시 3: 두 레포 경로 모두 지정
MAIN_REPO_PATH="$HOME/projects/HUA-platform" PUBLIC_REPO_PATH="$HOME/projects/HUA-Labs-public" ./scripts/sync-to-main-repo.sh

# 예시 4: 환경 변수로 설정 후 사용
export MAIN_REPO_PATH="$HOME/projects/HUA-platform"
export PUBLIC_REPO_PATH="$HOME/projects/HUA-Labs-public"
./scripts/sync-to-main-repo.sh
```

**동기화 대상:**
- `packages/hua-i18n-core`
- `packages/hua-i18n-core-zustand`
- `packages/hua-i18n-loaders`

**동기화 항목:**
- `src/` - 소스 코드
- `package.json` - 패키지 설정
- `tsconfig.json` - TypeScript 설정
- `README.md` - 문서
- `CHANGELOG.md` - 변경 이력
- `.gitignore` - Git 무시 파일

**제외 항목:**
- `dist/` - 빌드 산출물 (제외)

**주의사항:**
- 스크립트 실행 전 두 레포 모두 커밋되지 않은 변경사항이 없어야 합니다
- 메인 레포의 기존 패키지 파일이 덮어씌워질 수 있습니다
- 동기화 후 메인 레포에서 커밋 및 푸시가 필요합니다

### 2. `cleanup-branches.ps1`

브랜치를 정리하여 `main`과 `develop`만 남깁니다.

**사용법:**

**PowerShell (Windows):**
```powershell
# 확인 후 삭제
.\scripts\cleanup-branches.ps1

# 강제 실행 (확인 생략)
.\scripts\cleanup-branches.ps1 -Force

# 원격 브랜치만 삭제
.\scripts\cleanup-branches.ps1 -RemoteOnly
```

**동작:**
1. 로컬 및 원격 브랜치 목록 확인
2. `main`, `develop`, `HEAD` 외 모든 브랜치 삭제
3. 원격 추적 브랜치 정리 (`git fetch --prune`)

**주의사항:**
- 현재 브랜치가 삭제 대상이면 자동으로 `main`으로 전환됩니다
- 삭제된 브랜치는 복구할 수 없으므로 주의하세요
- PR이 머지된 브랜치만 삭제하는 것을 권장합니다

## 스크립트 개발 가이드

### PowerShell 스크립트 작성 규칙

1. **에러 처리**: `$ErrorActionPreference = "Stop"` 사용
2. **색상 출력**: `Write-ColorOutput` 함수 사용
3. **사용자 확인**: 중요한 작업 전 확인 메시지 표시
4. **Dry Run 지원**: `-DryRun` 파라미터 제공

### Bash 스크립트 작성 규칙

1. **에러 처리**: `set -e` 사용
2. **색상 출력**: ANSI 색상 코드 사용
3. **사용자 확인**: `read` 명령어로 확인
4. **환경 변수**: 기본값 설정 (`${VAR:-default}`)

## 문제 해결

### 동기화 실패

**문제**: "퍼블릭 레포에 커밋되지 않은 변경사항이 있습니다"

**해결**:
```powershell
cd C:\HUA-Labs-public
git status
git add .
git commit -m "작업 내용"
```

### 브랜치 삭제 실패

**문제**: "unable to delete 'branch-name': remote ref does not exist"

**해결**: 이미 삭제된 원격 브랜치입니다. 로컬 브랜치만 삭제하거나 무시해도 됩니다.

### 권한 오류 (Linux/Mac)

**문제**: "Permission denied"

**해결**:
```bash
chmod +x scripts/*.sh
```

