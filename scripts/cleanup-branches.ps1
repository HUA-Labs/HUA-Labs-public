# 퍼블릭 레포 브랜치 정리 스크립트
# main과 develop만 남기고 나머지 브랜치 삭제

param(
    [switch]$Force = $false,
    [switch]$RemoteOnly = $false
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
Write-ColorOutput "Cyan" "브랜치 정리 스크립트"
Write-ColorOutput "Cyan" "=========================================="
Write-Output ""

# 현재 브랜치 확인
$CurrentBranch = git branch --show-current
Write-Output "현재 브랜치: $CurrentBranch"
Write-Output ""

# 보존할 브랜치
$KeepBranches = @("main", "develop", "HEAD")

# 로컬 브랜치 목록
Write-ColorOutput "Yellow" "📋 로컬 브랜치:"
$LocalBranches = git branch --format='%(refname:short)'
foreach ($branch in $LocalBranches) {
    $branch = $branch.Trim()
    if ($KeepBranches -contains $branch) {
        Write-ColorOutput "Green" "  ✅ $branch (보존)"
    } else {
        Write-ColorOutput "Red" "  ❌ $branch (삭제 예정)"
    }
}
Write-Output ""

# 원격 브랜치 목록
Write-ColorOutput "Yellow" "📋 원격 브랜치:"
$RemoteBranches = git branch -r --format='%(refname:short)'
$BranchesToDelete = @()

foreach ($branch in $RemoteBranches) {
    $branch = $branch.Trim()
    if ($branch -match "^origin/(.*)$") {
        $branchName = $matches[1]
        if ($branchName -eq "HEAD") {
            Write-ColorOutput "Green" "  ✅ $branch (보존)"
        } elseif ($KeepBranches -contains $branchName) {
            Write-ColorOutput "Green" "  ✅ $branch (보존)"
        } else {
            Write-ColorOutput "Red" "  ❌ $branch (삭제 예정)"
            $BranchesToDelete += $branch
        }
    }
}
Write-Output ""

if ($BranchesToDelete.Count -eq 0) {
    Write-ColorOutput "Green" "✅ 삭제할 브랜치가 없습니다."
    exit 0
}

# 확인
if (-not $Force) {
    Write-ColorOutput "Yellow" "⚠️  다음 브랜치들이 삭제됩니다:"
    foreach ($branch in $BranchesToDelete) {
        Write-Output "  - $branch"
    }
    Write-Output ""
    Write-ColorOutput "Yellow" "계속 진행할까요? (Y/N)"
    $response = Read-Host
    if ($response -ne "Y" -and $response -ne "y") {
        Write-ColorOutput "Yellow" "취소되었습니다."
        exit 0
    }
}

# 원격 브랜치 삭제
Write-ColorOutput "Cyan" "🗑️  원격 브랜치 삭제 중..."
foreach ($branch in $BranchesToDelete) {
    if ($branch -match "^origin/(.*)$") {
        $branchName = $matches[1]
        Write-Output "삭제 중: $branch"
        git push origin --delete $branchName
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "Green" "  ✅ $branch 삭제 완료"
        } else {
            Write-ColorOutput "Red" "  ❌ $branch 삭제 실패"
        }
    }
}
Write-Output ""

# 로컬 브랜치 삭제 (원격만 삭제하는 경우 제외)
if (-not $RemoteOnly) {
    Write-ColorOutput "Cyan" "🗑️  로컬 브랜치 삭제 중..."
    
    # 현재 브랜치가 삭제 대상이면 main으로 전환
    if ($KeepBranches -notcontains $CurrentBranch) {
        Write-ColorOutput "Yellow" "현재 브랜치가 삭제 대상입니다. main으로 전환합니다."
        git checkout main
        $CurrentBranch = "main"
    }
    
    $LocalBranchesToDelete = @()
    foreach ($branch in $LocalBranches) {
        $branch = $branch.Trim()
        if ($KeepBranches -notcontains $branch) {
            $LocalBranchesToDelete += $branch
        }
    }
    
    foreach ($branch in $LocalBranchesToDelete) {
        Write-Output "삭제 중: $branch"
        git branch -D $branch
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "Green" "  ✅ $branch 삭제 완료"
        } else {
            Write-ColorOutput "Red" "  ❌ $branch 삭제 실패"
        }
    }
    Write-Output ""
}

# 원격 추적 브랜치 정리
Write-ColorOutput "Cyan" "🧹 원격 추적 브랜치 정리 중..."
git fetch --prune
Write-Output ""

Write-ColorOutput "Green" "✅ 브랜치 정리 완료!"
Write-Output ""
Write-ColorOutput "Cyan" "현재 브랜치 상태:"
git branch -a

