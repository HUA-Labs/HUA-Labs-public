# 퍼블릭 레포 Graphite 마이그레이션 계획

**작성일**: 2025-12-30

## 마이그레이션 개요

### 목표

퍼블릭 레포(`HUA-Labs-public`)에 Graphite를 도입하여:
1. 프라이빗 레포와 워크플로우 일관성 확보
2. 작은 PR로 안전한 배포
3. Changesets와의 완벽한 통합

### 현재 vs 목표

| 항목 | 현재 | 목표 |
|------|------|------|
| 브랜치 전략 | Git Flow (main, develop) | Trunk-Based (main only) |
| PR 생성 | 수동 (GitHub 웹) | Graphite (`gt submit`) |
| 커밋 | `git commit` | `gt create` |
| Base 브랜치 | develop → main | main 직접 |

## 마이그레이션 단계

### Phase 1: 준비 (1주)

#### 1.1 Graphite 설치 및 설정

**중요**: Graphite는 GitHub 조직(Organization) 단위로 등록되므로, HUA-Labs 조직이 이미 Graphite에 등록되어 있다면 별도 조직 등록 없이 바로 사용 가능합니다.

```bash
# Graphite CLI 설치 (이미 설치되어 있다면 생략)
npm install -g @graphite-io/cli

# 레포 초기화 (조직에 등록되어 있으면 자동으로 연결됨)
cd C:\HUA-Labs-public
gt repo init

# Base 브랜치 설정
gt track --parent main
```

**조직 등록 확인**:
- Graphite 웹 인터페이스에서 HUA-Labs 조직이 등록되어 있는지 확인
- 등록되어 있다면 퍼블릭 레포에서도 바로 사용 가능

#### 1.2 현재 상태 확인

```bash
# develop 브랜치 확인
git branch -a | grep develop

# develop의 변경사항 확인
git log main..develop --oneline

# PR 상태 확인
gh pr list --base develop
gh pr list --base main
```

#### 1.3 develop 브랜치 정리

**옵션 A: develop의 변경사항이 없는 경우**

```bash
# develop 브랜치 삭제
git branch -d develop
git push origin --delete develop
```

**옵션 B: develop의 변경사항이 있는 경우**

```bash
# 1. develop의 변경사항을 main으로 병합
git checkout main
git pull origin main
git merge origin/develop --no-ff -m "chore: merge develop into main (graphite migration)"

# 충돌 발생 시
git merge origin/develop --no-ff -X theirs

# 2. develop 브랜치 삭제
git branch -d develop
git push origin --delete develop
```

### Phase 2: CI/CD 업데이트 (1일)

#### 2.1 GitHub Actions 워크플로우 업데이트

**`.github/workflows/ci.yml`**:
```yaml
on:
  push:
    branches:
      - main  # develop 제거
  pull_request:
    branches:
      - main  # develop 제거
```

**`.github/workflows/pr-checks.yml`**:
```yaml
on:
  pull_request:
    branches:
      - main  # develop 제거
```

**`.github/workflows/release.yml`**:
```yaml
on:
  push:
    branches:
      - main  # develop 제거 (이미 main만 있음)
```

#### 2.2 PR 템플릿 업데이트

**`.github/PULL_REQUEST_TEMPLATE.md`**:
```markdown
## Branch Information

- **Base branch**: `main` (Graphite stack)
- **Head branch**: `gt/your-stack-name` (Graphite generated)
```

### Phase 3: Graphite 설정 (1일)

#### 3.1 Graphite 초기화

```bash
cd C:\HUA-Labs-public
gt repo init

# Base 브랜치 확인
gt log
```

#### 3.2 `.graphite_repo_config` 설정

```json
{
  "trunk": "main",
  "baseBranch": "main"
}
```

### Phase 4: 테스트 (1주)

#### 4.1 작은 변경사항으로 테스트

```bash
# 1. 스택 생성
gt create -m "chore: test graphite workflow"

# 2. 작은 변경 (예: README 수정)
# ... 파일 수정 ...

# 3. Changeset 생성 (필요시)
pnpm changeset

# 4. PR 제출
gt submit --base main

# 5. PR 리뷰 및 병합
# GitHub에서 확인

# 6. 자동 배포 확인
# Changesets가 자동으로 배포하는지 확인
```

#### 4.2 Changesets 통합 확인

**확인 사항**:
- ✅ Changeset이 생성되면 자동 배포되는지
- ✅ 여러 스택의 Changeset이 올바르게 처리되는지
- ✅ 버전 관리가 올바른지

### Phase 5: 문서화 (1일)

#### 5.1 워크플로우 가이드 작성

- Graphite 기본 사용법
- Changesets 통합 가이드
- 모노레포 특화 가이드

#### 5.2 팀 가이드 작성

- 빠른 시작 가이드
- 자주 묻는 질문
- 트러블슈팅

## Changesets 통합 전략

### 권장 워크플로우

#### 시나리오 1: 단일 패키지 변경

```bash
# 1. 스택 생성
gt create -m "feat(packages/hua-ux): add feature X"

# 2. 코드 수정
# ... 파일 수정 ...

# 3. Changeset 생성
pnpm changeset
# 패키지: hua-ux
# 버전: minor

# 4. PR 제출
gt submit --base main
```

#### 시나리오 2: 여러 패키지 변경

```bash
# 스택 1: 패키지 A
gt create -m "feat(packages/hua-ux): add feature X"
pnpm changeset  # hua-ux: minor

# 스택 2: 패키지 B
gt create -m "feat(packages/create-hua-ux): update CLI"
pnpm changeset  # create-hua-ux: patch

# 스택 3: 문서
gt create -m "docs: update README"

# 전체 제출
gt submit --base main
```

**병합 순서**:
1. 스택 1 병합 → Changeset 1 처리
2. 스택 2 병합 → Changeset 2 처리
3. 스택 3 병합 → Changeset 없음

**주의**: 각 스택이 병합될 때마다 Changesets가 실행되므로, 버전 관리가 복잡해질 수 있음.

**대안**: 최종 스택에서만 Changeset 생성

```bash
# 스택 1-2: Changeset 없이 작업
gt create -m "feat: ..."
gt create -m "feat: ..."

# 최종 스택: Changeset 생성
gt create -m "chore: add changeset"
pnpm changeset
```

## 체크리스트

### Phase 1: 준비

- [ ] Graphite CLI 설치
- [ ] `develop` 브랜치 상태 확인
- [ ] `develop` → `main` 병합 (필요시)
- [ ] `develop` 브랜치 삭제

### Phase 2: CI/CD 업데이트

- [ ] `.github/workflows/ci.yml` 업데이트
- [ ] `.github/workflows/pr-checks.yml` 업데이트
- [ ] `.github/workflows/release.yml` 확인
- [ ] PR 템플릿 업데이트

### Phase 3: Graphite 설정

- [ ] `gt repo init` 실행
- [ ] Base 브랜치 설정
- [ ] `.graphite_repo_config` 확인

### Phase 4: 테스트

- [ ] 작은 변경사항으로 테스트
- [ ] Changesets 통합 확인
- [ ] 자동 배포 확인
- [ ] 문제 해결

### Phase 5: 문서화

- [ ] 워크플로우 가이드 작성
- [ ] Changesets 통합 가이드 작성
- [ ] 팀 가이드 작성

## 주의사항

### 1. develop 브랜치 제거

**주의**:
- `develop` 브랜치에 중요한 변경사항이 있는지 확인
- 모든 PR이 병합되었는지 확인
- 백업 후 삭제

### 2. Changesets 관리

**주의**:
- 각 스택에 Changeset을 생성하면 여러 배포가 발생할 수 있음
- 최종 스택에서만 Changeset 생성 권장
- 또는 스택별 Changeset 생성 시 배포 순서 확인

### 3. 브랜치 보호 규칙

**업데이트 필요**:
- `main` 브랜치만 보호 규칙 설정
- `develop` 브랜치 보호 규칙 제거

### 4. 팀원 교육

**필수**:
- Graphite 기본 명령어 교육
- 워크플로우 예시 제공
- 트러블슈팅 가이드 제공

## 예상 이점

### 1. 일관성

- 프라이빗 레포와 동일한 워크플로우
- 컨텍스트 전환 최소화

### 2. 안전성

- 작은 PR로 안전한 배포
- 문제 발생 시 해당 PR만 롤백

### 3. 효율성

- 모노레포 최적화
- 의존성 그래프 자동 처리

### 4. 리뷰 용이성

- 논리적 단위로 분리
- 각 스택이 독립적으로 리뷰 가능

## 결론

**권장**: Graphite 도입 ✅

**이유**:
1. 프라이빗 레포와 일관성
2. Changesets와 완벽한 통합
3. 작은 PR로 안전한 배포
4. 모노레포 최적화

**마이그레이션 기간**: 2-3주

**위험도**: 낮음 (Changesets와 충돌 없음)

---

**참고**:
- [Graphite 워크플로우 가이드](./GRAPHITE_FOR_PUBLIC_REPO.md)
- [Changesets 가이드](./CHANGESETS_GUIDE.md)
- [프라이빗 레포 Graphite 가이드](../../.cursor/skills/graphite-workflow/SKILL.md)
