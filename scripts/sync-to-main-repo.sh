#!/bin/bash
# HUA-Labs-public에서 HUA-platform으로 i18n 패키지 동기화 스크립트
# 사용법: ./scripts/sync-to-main-repo.sh
#
# 변수 샘플 (아래 주석을 해제하고 경로를 수정하세요):
# export MAIN_REPO_PATH="$HOME/projects/HUA-platform"
# export PUBLIC_REPO_PATH="$HOME/projects/HUA-Labs-public"
# export DRY_RUN="false"
#
# 사용 예시:
# MAIN_REPO_PATH="$HOME/projects/HUA-platform" ./scripts/sync-to-main-repo.sh
# MAIN_REPO_PATH="$HOME/projects/HUA-platform" DRY_RUN=true ./scripts/sync-to-main-repo.sh

set -e

# 필수 파라미터 확인
if [ -z "$MAIN_REPO_PATH" ]; then
    echo "Error: MAIN_REPO_PATH environment variable is required"
    echo "Usage: MAIN_REPO_PATH=/path/to/main/repo ./scripts/sync-to-main-repo.sh"
    echo ""
    echo "Example:"
    echo "  MAIN_REPO_PATH=\"\$HOME/projects/HUA-platform\" ./scripts/sync-to-main-repo.sh"
    exit 1
fi

PUBLIC_REPO_PATH="${PUBLIC_REPO_PATH:-$(cd "$(dirname "$0")/.." && pwd)}"
DRY_RUN="${DRY_RUN:-false}"

# 색상 출력
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}==========================================${NC}"
echo -e "${CYAN}i18n 패키지 동기화 스크립트${NC}"
echo -e "${CYAN}퍼블릭 레포 → 메인 레포${NC}"
echo -e "${CYAN}==========================================${NC}"
echo ""

# 경로 확인
if [ ! -d "$PUBLIC_REPO_PATH" ]; then
    echo -e "${RED}❌ 퍼블릭 레포 경로를 찾을 수 없습니다: $PUBLIC_REPO_PATH${NC}"
    exit 1
fi

if [ ! -d "$MAIN_REPO_PATH" ]; then
    echo -e "${RED}❌ 메인 레포 경로를 찾을 수 없습니다: $MAIN_REPO_PATH${NC}"
    exit 1
fi

# 동기화할 패키지 목록
PACKAGES=(
    "hua-i18n-core"
    "hua-i18n-core-zustand"
    "hua-i18n-loaders"
)

echo -e "${YELLOW}📦 동기화할 패키지:${NC}"
for pkg in "${PACKAGES[@]}"; do
    echo "  - $pkg"
done
echo ""

if [ "$DRY_RUN" = "true" ]; then
    echo -e "${YELLOW}🔍 DRY RUN 모드 - 실제 변경은 하지 않습니다${NC}"
    echo ""
fi

# 퍼블릭 레포에서 최신 상태 확인
echo -e "${CYAN}1️⃣ 퍼블릭 레포 상태 확인...${NC}"
cd "$PUBLIC_REPO_PATH"

PUBLIC_BRANCH=$(git branch --show-current)
echo "현재 브랜치: $PUBLIC_BRANCH"

if [ "$PUBLIC_BRANCH" != "main" ] && [ "$PUBLIC_BRANCH" != "develop" ]; then
    echo -e "${YELLOW}⚠️  main 또는 develop 브랜치가 아닙니다. 계속 진행할까요? (y/N)${NC}"
    read -r response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        exit 0
    fi
fi

# 변경사항 확인
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ 퍼블릭 레포에 커밋되지 않은 변경사항이 있습니다:${NC}"
    git status --porcelain
    echo -e "${YELLOW}⚠️  먼저 커밋하거나 stash하세요.${NC}"
    exit 1
fi

# 메인 레포 상태 확인
echo -e "${CYAN}2️⃣ 메인 레포 상태 확인...${NC}"
cd "$MAIN_REPO_PATH"

MAIN_BRANCH=$(git branch --show-current)
echo "현재 브랜치: $MAIN_BRANCH"

if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  메인 레포에 커밋되지 않은 변경사항이 있습니다:${NC}"
    git status --porcelain
    echo -e "${YELLOW}⚠️  계속 진행하면 변경사항이 덮어씌워질 수 있습니다. 계속할까요? (y/N)${NC}"
    read -r response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        exit 0
    fi
fi

# 각 패키지 동기화
echo -e "${CYAN}3️⃣ 패키지 동기화 시작...${NC}"
echo ""

for pkg in "${PACKAGES[@]}"; do
    PUBLIC_PKG_PATH="$PUBLIC_REPO_PATH/packages/$pkg"
    MAIN_PKG_PATH="$MAIN_REPO_PATH/packages/$pkg"
    
    echo -e "${CYAN}📦 동기화 중: $pkg${NC}"
    
    if [ ! -d "$PUBLIC_PKG_PATH" ]; then
        echo -e "${RED}  ❌ 퍼블릭 레포에 패키지가 없습니다: $PUBLIC_PKG_PATH${NC}"
        continue
    fi
    
    if [ ! -d "$MAIN_PKG_PATH" ]; then
        echo -e "${YELLOW}  ⚠️  메인 레포에 패키지가 없습니다. 새로 생성합니다.${NC}"
        if [ "$DRY_RUN" != "true" ]; then
            mkdir -p "$MAIN_PKG_PATH"
        fi
    fi
    
    # 동기화할 파일/디렉토리 목록
    ITEMS_TO_SYNC=(
        "src"
        "package.json"
        "tsconfig.json"
        "README.md"
        "CHANGELOG.md"
        ".gitignore"
    )
    
    for item in "${ITEMS_TO_SYNC[@]}"; do
        PUBLIC_ITEM="$PUBLIC_PKG_PATH/$item"
        MAIN_ITEM="$MAIN_PKG_PATH/$item"
        
        if [ -e "$PUBLIC_ITEM" ]; then
            if [ "$DRY_RUN" = "true" ]; then
                echo "  [DRY RUN] 복사: $item"
            else
                if [ -e "$MAIN_ITEM" ]; then
                    rm -rf "$MAIN_ITEM"
                fi
                cp -r "$PUBLIC_ITEM" "$MAIN_ITEM"
                echo "  ✅ 동기화: $item"
            fi
        fi
    done
    
    echo ""
done

# dist 폴더는 제외 (빌드 산출물)
echo -e "${YELLOW}ℹ️  dist 폴더는 동기화하지 않습니다 (빌드 산출물)${NC}"
echo ""

if [ "$DRY_RUN" != "true" ]; then
    echo -e "${CYAN}4️⃣ 메인 레포 변경사항 확인...${NC}"
    cd "$MAIN_REPO_PATH"
    
    CHANGES=$(git status --porcelain)
    if [ -n "$CHANGES" ]; then
        echo -e "${GREEN}✅ 동기화 완료! 변경사항:${NC}"
        echo "$CHANGES"
        echo ""
        echo -e "${YELLOW}다음 단계:${NC}"
        echo "  1. git add packages/hua-i18n-*"
        echo "  2. git commit -m 'sync: update i18n packages from public repo'"
        echo "  3. git push"
    else
        echo -e "${GREEN}✅ 변경사항이 없습니다. 이미 동기화되어 있습니다.${NC}"
    fi
else
    echo -e "${GREEN}✅ DRY RUN 완료${NC}"
fi

echo ""
echo -e "${CYAN}==========================================${NC}"
echo -e "${CYAN}동기화 완료!${NC}"
echo -e "${CYAN}==========================================${NC}"

