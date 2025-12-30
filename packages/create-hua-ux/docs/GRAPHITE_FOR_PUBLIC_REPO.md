# 퍼블릭 레포 Graphite 도입 검토

**작성일**: 2025-12-30

## 현재 상황

### 퍼블릭 레포 워크플로우

**현재 구조**:
- **브랜치**: `main`, `develop`
- **PR 프로세스**: Feature → develop → main
- **자동 배포**: Changesets + GitHub Actions
- **CI/CD**: PR 체크, 빌드, 릴리즈 자동화

**워크플로우**:
```
Feature Branch → PR to develop → Merge → PR to main → Merge → Auto Deploy
```

### 프라이빗 레포 워크플로우

**현재 구조**:
- **브랜치**: `main` (Trunk-Based Development)
- **PR 프로세스**: Graphite Stack → main
- **도구**: Graphite (gt CLI)

**워크플로우**:
```
gt create → gt submit → PR to main → Merge → Auto Deploy
```

## Graphite 도입 장단점 분석

### ✅ 장점

#### 1. 작은 PR로 분리

**현재 문제**:
- 큰 PR이 생성될 수 있음
- 리뷰가 어려움
- 변경사항 추적 어려움

**Graphite 도입 후**:
- 논리적 단위로 자동 분리
- 각 스택이 독립적으로 리뷰 가능
- 변경사항 추적 용이

#### 2. 프라이빗 레포와 일관성

**장점**:
- 동일한 워크플로우로 작업
- 컨텍스트 전환 최소화
- 학습 곡선 감소

#### 3. Changesets와의 통합

**호환성**:
- ✅ Graphite는 스택을 main으로 병합
- ✅ Changesets는 main 브랜치 푸시 시 자동 배포
- ✅ 충돌 없음

**워크플로우**:
```
gt create → gt submit → PR to main → Merge → Changesets 자동 배포
```

#### 4. 모노레포 최적화

**장점**:
- 패키지 간 의존성 변경 시 자동으로 올바른 순서 관리
- Turbo 빌드와 잘 통합
- 의존성 그래프 자동 처리

### ⚠️ 단점 및 고려사항

#### 1. 학습 곡선

**문제**:
- 팀원들이 Graphite를 배워야 함
- 기존 Git 명령어와 다름

**해결**:
- 문서화 및 가이드 제공
- 점진적 도입

#### 2. develop 브랜치 제거 필요

**현재**:
- CI/CD가 `develop` 브랜치도 체크
- PR 템플릿이 `develop` 언급

**변경 필요**:
- `.github/workflows/*.yml`에서 `develop` 제거
- PR 템플릿 업데이트
- 브랜치 보호 규칙 변경

#### 3. Changesets와의 조화

**주의사항**:
- Changeset은 각 스택에 생성 가능
- 하지만 자동 배포는 main 병합 시에만 실행
- 스택별로 Changeset 생성 시 버전 관리 복잡도 증가

**권장**:
- Changeset은 최종 스택에서만 생성
- 또는 각 스택에 Changeset 생성하되, 배포는 최종 병합 시

## 권장 접근법

### 옵션 1: Graphite 도입 (권장)

**이유**:
- 프라이빗 레포와 일관성
- 작은 PR로 안전한 배포
- Changesets와 충돌 없음

**도입 단계**:

#### Phase 1: 준비 (1주)

1. **Graphite 설치 및 설정**:
   ```bash
   # Graphite CLI 설치 (이미 설치되어 있다면 생략)
   npm install -g @graphite-io/cli
   
   # 레포 초기화 (조직에 등록되어 있으면 자동으로 연결됨)
   gt repo init
   ```
   
   **중요**: Graphite는 GitHub 조직(Organization) 단위로 등록되므로, HUA-Labs 조직이 이미 Graphite에 등록되어 있다면 별도 조직 등록 없이 바로 사용 가능합니다.

2. **브랜치 정리**:
   - `develop` 브랜치의 변경사항을 `main`으로 병합
   - `develop` 브랜치 삭제

3. **CI/CD 업데이트**:
   - `.github/workflows/*.yml`에서 `develop` 제거
   - `main` 브랜치만 체크하도록 변경

#### Phase 2: 도입 (1주)

1. **문서화**:
   - Graphite 워크플로우 가이드 작성
   - Changesets 통합 가이드 작성

2. **테스트**:
   - 작은 변경사항으로 Graphite 워크플로우 테스트
   - Changesets 자동 배포 확인

#### Phase 3: 전환 (1주)

1. **팀 교육**:
   - Graphite 명령어 가이드
   - 워크플로우 예시

2. **모니터링**:
   - 첫 몇 주간 워크플로우 모니터링
   - 문제 발생 시 즉시 대응

### 옵션 2: 현재 구조 유지

**이유**:
- 이미 잘 작동 중
- 변경 비용 없음
- 팀원들의 학습 곡선 없음

**단점**:
- 프라이빗 레포와 불일치
- 큰 PR 위험
- 리뷰 어려움

## Changesets 통합 전략

### 스택별 Changeset 생성

**방법 1: 각 스택에 Changeset 생성** (권장)

```bash
# 스택 1: 패키지 변경
gt create -m "feat(packages/hua-ux): add new feature"
pnpm changeset  # Changeset 생성

# 스택 2: 앱 변경
gt create -m "feat(apps/showcase): use new feature"
# Changeset 없음 (의존성 업데이트만)

# 스택 3: 문서 업데이트
gt create -m "docs: update README"
# Changeset 없음
```

**장점**:
- 각 변경사항이 명확히 기록됨
- 버전 관리 정확

**단점**:
- 여러 Changeset이 생성될 수 있음
- 배포는 최종 병합 시에만 실행

### 최종 스택에만 Changeset 생성

**방법 2: 최종 스택에서만 Changeset 생성**

```bash
# 스택 1-3: Changeset 없이 작업
gt create -m "feat: ..."
gt create -m "feat: ..."
gt create -m "feat: ..."

# 최종 스택: Changeset 생성
gt create -m "chore: add changeset for release"
pnpm changeset
```

**장점**:
- Changeset 관리 단순
- 한 번에 배포

**단점**:
- 중간 변경사항 추적 어려움

## 권장 워크플로우 (Graphite + Changesets)

### 1. 작업 시작

```bash
# main 브랜치 최신화
git checkout main
git pull origin main
gt sync

# 새 스택 생성
gt create -m "feat(packages/hua-ux): add feature X"
```

### 2. 스택 분리

```bash
# 스택 1: 패키지 변경
gt create -m "feat(packages/hua-ux): add feature X"

# 스택 2: 앱 변경
gt create -m "feat(apps/showcase): use feature X"

# 스택 3: 문서
gt create -m "docs: update README"
```

### 3. Changeset 생성

```bash
# 최종 스택에서 Changeset 생성
gt create -m "chore: add changeset"
pnpm changeset
# 패키지 선택: hua-ux
# 버전: minor
```

### 4. PR 제출

```bash
# 전체 스택을 PR로 제출
gt submit --base main
```

### 5. 자동 배포

- PR 병합 → `main` 브랜치 업데이트
- Changesets 자동 배포 실행
- npm 배포 및 GitHub Release 생성

## 마이그레이션 체크리스트

### Phase 1: 준비

- [ ] Graphite CLI 설치 확인
- [ ] `develop` 브랜치 변경사항 확인
- [ ] CI/CD 워크플로우 분석
- [ ] 브랜치 보호 규칙 확인

### Phase 2: 전환

- [ ] `develop` → `main` 병합
- [ ] `develop` 브랜치 삭제
- [ ] CI/CD 워크플로우 업데이트
- [ ] PR 템플릿 업데이트

### Phase 3: Graphite 설정

- [ ] `gt repo init` 실행
- [ ] `.graphite_repo_config` 설정
- [ ] Base 브랜치를 `main`으로 설정

### Phase 4: 테스트

- [ ] 작은 변경사항으로 테스트
- [ ] Changesets 통합 확인
- [ ] 자동 배포 확인

### Phase 5: 문서화

- [ ] Graphite 워크플로우 가이드 작성
- [ ] Changesets 통합 가이드 작성
- [ ] 팀 가이드 작성

## 결론

### 권장: Graphite 도입 ✅

**이유**:
1. **일관성**: 프라이빗 레포와 동일한 워크플로우
2. **안전성**: 작은 PR로 안전한 배포
3. **호환성**: Changesets와 충돌 없음
4. **효율성**: 모노레포 최적화

**주의사항**:
- `develop` 브랜치 제거 필요
- CI/CD 워크플로우 업데이트 필요
- 팀원 교육 필요

### 대안: 현재 구조 유지

**이유**:
- 이미 잘 작동 중
- 변경 비용 없음

**단점**:
- 프라이빗 레포와 불일치
- 큰 PR 위험

---

**참고**:
- [Graphite 워크플로우 가이드](../../.cursor/skills/graphite-workflow/SKILL.md)
- [Trunk-Based Development 가이드](../../.cursor/skills/trunk-based-development/SKILL.md)
- [Changesets 가이드](./CHANGESETS_GUIDE.md)
