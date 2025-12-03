# HUA-Labs-public에서 HUA-platform으로 i18n 패키지 동기화 스크립트
# 사용법: .\scripts\sync-to-main-repo.ps1
#
# 변수 샘플 (아래 주석을 해제하고 경로를 수정하세요):
# $MainRepoPath = "C:\dev\HUA-platform"
# $PublicRepoPath = "C:\dev\HUA-Labs-public"
#
# 사용 예시:
# .\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform"
# .\scripts\sync-to-main-repo.ps1 -MainRepoPath "C:\dev\HUA-platform" -DryRun

param(
    [Parameter(Mandatory=$true)]
    [string]$MainRepoPath,
    [string]$PublicRepoPath = $PSScriptRoot + "\..",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

# 색상 출력 함수
function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput "Cyan" "=========================================="
Write-ColorOutput "Cyan" "i18n 패키지 동기화 스크립트"
Write-ColorOutput "Cyan" "퍼블릭 레포 → 메인 레포"
Write-ColorOutput "Cyan" "=========================================="
Write-Output ""

# 경로 확인
if (-not (Test-Path $PublicRepoPath)) {
    Write-ColorOutput "Red" "❌ 퍼블릭 레포 경로를 찾을 수 없습니다: $PublicRepoPath"
    exit 1
}

if (-not (Test-Path $MainRepoPath)) {
    Write-ColorOutput "Red" "❌ 메인 레포 경로를 찾을 수 없습니다: $MainRepoPath"
    exit 1
}

# 동기화할 패키지 목록
$Packages = @(
    "hua-i18n-core",
    "hua-i18n-core-zustand",
    "hua-i18n-loaders"
)

Write-ColorOutput "Yellow" "📦 동기화할 패키지:"
foreach ($pkg in $Packages) {
    Write-Output "  - $pkg"
}
Write-Output ""

if ($DryRun) {
    Write-ColorOutput "Yellow" "🔍 DRY RUN 모드 - 실제 변경은 하지 않습니다"
    Write-Output ""
}

# 퍼블릭 레포에서 최신 상태 확인
Write-ColorOutput "Cyan" "1️⃣ 퍼블릭 레포 상태 확인..."
Push-Location $PublicRepoPath

$PublicBranch = git branch --show-current
Write-Output "현재 브랜치: $PublicBranch"

if ($PublicBranch -ne "main" -and $PublicBranch -ne "develop") {
    Write-ColorOutput "Yellow" "⚠️  main 또는 develop 브랜치가 아닙니다. 계속 진행할까요? (Y/N)"
    $response = Read-Host
    if ($response -ne "Y" -and $response -ne "y") {
        Pop-Location
        exit 0
    }
}

# 변경사항 확인
$PublicStatus = git status --porcelain
if ($PublicStatus) {
    Write-ColorOutput "Red" "❌ 퍼블릭 레포에 커밋되지 않은 변경사항이 있습니다:"
    Write-Output $PublicStatus
    Write-ColorOutput "Yellow" "⚠️  먼저 커밋하거나 stash하세요."
    Pop-Location
    exit 1
}

Pop-Location

# 메인 레포 상태 확인
Write-ColorOutput "Cyan" "2️⃣ 메인 레포 상태 확인..."
Push-Location $MainRepoPath

$MainBranch = git branch --show-current
Write-Output "현재 브랜치: $MainBranch"

$MainStatus = git status --porcelain
if ($MainStatus) {
    Write-ColorOutput "Yellow" "⚠️  메인 레포에 커밋되지 않은 변경사항이 있습니다:"
    Write-Output $MainStatus
    Write-ColorOutput "Yellow" "⚠️  계속 진행하면 변경사항이 덮어씌워질 수 있습니다. 계속할까요? (Y/N)"
    $response = Read-Host
    if ($response -ne "Y" -and $response -ne "y") {
        Pop-Location
        exit 0
    }
}

Pop-Location

# 각 패키지 동기화
Write-ColorOutput "Cyan" "3️⃣ 패키지 동기화 시작..."
Write-Output ""

foreach ($pkg in $Packages) {
    $PublicPkgPath = Join-Path $PublicRepoPath "packages\$pkg"
    $MainPkgPath = Join-Path $MainRepoPath "packages\$pkg"
    
    Write-ColorOutput "Cyan" "📦 동기화 중: $pkg"
    
    if (-not (Test-Path $PublicPkgPath)) {
        Write-ColorOutput "Red" "  ❌ 퍼블릭 레포에 패키지가 없습니다: $PublicPkgPath"
        continue
    }
    
    if (-not (Test-Path $MainPkgPath)) {
        Write-ColorOutput "Yellow" "  ⚠️  메인 레포에 패키지가 없습니다. 새로 생성합니다."
        if (-not $DryRun) {
            New-Item -ItemType Directory -Path $MainPkgPath -Force | Out-Null
        }
    }
    
    # 동기화할 파일/디렉토리 목록
    $ItemsToSync = @(
        "src",
        "package.json",
        "tsconfig.json",
        "README.md",
        "CHANGELOG.md",
        ".gitignore"
    )
    
    foreach ($item in $ItemsToSync) {
        $PublicItem = Join-Path $PublicPkgPath $item
        $MainItem = Join-Path $MainPkgPath $item
        
        if (Test-Path $PublicItem) {
            if ($DryRun) {
                Write-Output "  [DRY RUN] 복사: $item"
            } else {
                if (Test-Path $MainItem) {
                    Remove-Item $MainItem -Recurse -Force -ErrorAction SilentlyContinue
                }
                Copy-Item $PublicItem -Destination $MainItem -Recurse -Force
                Write-Output "  ✅ 동기화: $item"
            }
        }
    }
    
    Write-Output ""
}

# dist 폴더는 제외 (빌드 산출물)
Write-ColorOutput "Yellow" "ℹ️  dist 폴더는 동기화하지 않습니다 (빌드 산출물)"
Write-Output ""

if (-not $DryRun) {
    Write-ColorOutput "Cyan" "4️⃣ 메인 레포 변경사항 확인..."
    Push-Location $MainRepoPath
    
    $Changes = git status --porcelain
    if ($Changes) {
        Write-ColorOutput "Green" "✅ 동기화 완료! 변경사항:"
        Write-Output $Changes
        Write-Output ""
        Write-ColorOutput "Yellow" "다음 단계:"
        Write-Output "  1. git add packages/hua-i18n-*"
        Write-Output "  2. git commit -m 'sync: update i18n packages from public repo'"
        Write-Output "  3. git push"
    } else {
        Write-ColorOutput "Green" "✅ 변경사항이 없습니다. 이미 동기화되어 있습니다."
    }
    
    Pop-Location
} else {
    Write-ColorOutput "Green" "✅ DRY RUN 완료"
}

Write-Output ""
Write-ColorOutput "Cyan" "=========================================="
Write-ColorOutput "Cyan" "동기화 완료!"
Write-ColorOutput "Cyan" "=========================================="

