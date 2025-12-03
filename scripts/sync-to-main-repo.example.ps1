# 동기화 스크립트 사용 예시 파일
# 이 파일을 복사해서 사용하세요

# ==========================================
# 변수 설정 (여기를 수정하세요)
# ==========================================

# 메인 레포 경로 (필수)
$MainRepoPath = "C:\dev\HUA-platform"

# 퍼블릭 레포 경로 (선택, 기본값: 스크립트 상위 디렉토리)
# $PublicRepoPath = "C:\dev\HUA-Labs-public"

# Dry run 모드 (true: 미리보기만, false: 실제 동기화)
$DryRun = $false

# ==========================================
# 스크립트 실행
# ==========================================

# 기본 실행
# .\scripts\sync-to-main-repo.ps1 -MainRepoPath $MainRepoPath

# Dry run 실행
# .\scripts\sync-to-main-repo.ps1 -MainRepoPath $MainRepoPath -DryRun

# 퍼블릭 레포 경로도 지정
# .\scripts\sync-to-main-repo.ps1 -MainRepoPath $MainRepoPath -PublicRepoPath $PublicRepoPath

Write-Host "이 파일은 예시입니다. 위의 주석을 해제하고 경로를 수정한 후 사용하세요." -ForegroundColor Yellow

