# CLI 설치 리뷰 및 개선점

## 현재 상태 평가

### ✅ 잘 작동하는 부분

1. **파일 생성**
   - 모든 템플릿 파일이 정상적으로 복사됨
   - package.json, 설정 파일들이 올바르게 생성됨
   - 번역 파일, API 라우트 등 구조가 완벽함

2. **AI 컨텍스트 선택**
   - 대화형 모드에서 체크박스로 선택 가능
   - CLI 플래그로 비대화형 모드 지원
   - 선택형 설치가 정상 작동

3. **프로젝트 구조**
   - Next.js App Router 구조 정상
   - hua-ux 프레임워크 통합 완벽
   - TypeScript 설정 올바름

### ⚠️ 발견된 문제점

1. **PowerShell 인코딩 문제**
   - 한글이 깨져서 표시됨
   - 해결: 영어 전용 모드 추가 (`--english-only` 또는 `CLI_LANG=en`)

2. **비대화형 모드 안정성**
   - 일부 환경에서 프롬프트가 나타나지 않을 수 있음
   - 해결: 기본값 폴백 로직 추가됨

3. **에러 메시지**
   - 일부 에러 메시지가 기술적이고 사용자 친화적이지 않음

## 개선 제안

### 1. 설치 후 자동 검증 강화

**현재**: 기본적인 파일 존재 여부만 확인

**개선안**:
```typescript
// 설치 후 자동으로 다음을 확인:
- package.json의 의존성 버전 호환성
- TypeScript 컴파일 가능 여부
- 필수 디렉토리 구조
- 번역 파일 JSON 유효성
- 설정 파일 문법 오류
```

**구현 예시**:
```typescript
export async function validateGeneratedProject(projectPath: string): Promise<void> {
  // 1. 파일 존재 확인 (현재)
  // 2. JSON 유효성 검사
  const translations = await validateTranslationFiles(projectPath);
  // 3. TypeScript 컴파일 체크
  await validateTypeScript(projectPath);
  // 4. 의존성 버전 호환성
  await validateDependencies(projectPath);
}
```

### 2. 설치 진행 상황 표시

**현재**: 단순한 로그 메시지

**개선안**: 프로그레스 바 또는 단계별 표시

```typescript
console.log(chalk.blue('📦 Creating project structure...'));
console.log(chalk.green('✅ Template files copied'));
console.log(chalk.blue('⚙️  Generating configuration...'));
console.log(chalk.green('✅ Configuration generated'));
console.log(chalk.blue('🤖 Generating AI context files...'));
console.log(chalk.green('✅ AI context files generated'));
```

### 3. 설치 후 자동 의존성 설치 옵션

**개선안**: `--install` 플래그 추가

```bash
npx tsx src/index.ts my-project --install
# 또는
npx tsx src/index.ts my-project --no-install  # 기본값
```

**구현**:
```typescript
if (options.autoInstall) {
  console.log(chalk.blue('\n📦 Installing dependencies...'));
  await exec('pnpm install', { cwd: projectPath });
  console.log(chalk.green('✅ Dependencies installed'));
}
```

### 4. 템플릿 파일 검증

**개선안**: 설치 전 템플릿 파일 무결성 확인

```typescript
export async function validateTemplate(): Promise<void> {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'app/layout.tsx',
    'app/page.tsx',
    // ...
  ];
  
  for (const file of requiredFiles) {
    const path = join(TEMPLATE_DIR, file);
    if (!await fs.pathExists(path)) {
      throw new Error(`Template file missing: ${file}`);
    }
  }
}
```

### 5. 더 명확한 에러 메시지

**현재**:
```typescript
throw new Error('프로젝트 검증 실패:\n${errors.join('\n')}');
```

**개선안**:
```typescript
const errorMessage = isEnglishOnly()
  ? `Project validation failed:\n${errors.map(e => `  ❌ ${e}`).join('\n')}\n\n💡 Tips:\n  - Check file permissions\n  - Ensure disk space is available`
  : `프로젝트 검증 실패:\n${errors.map(e => `  ❌ ${e}`).join('\n')}\n\n💡 팁:\n  - 파일 권한 확인\n  - 디스크 공간 확인`;

throw new Error(errorMessage);
```

### 6. 설치 시간 최적화

**현재**: 템플릿 전체 복사 후 AI 컨텍스트 파일 삭제

**개선안**: 조건부 복사 (선택적)

```typescript
export async function copyTemplate(
  projectPath: string,
  options?: { skipAiContext?: boolean }
): Promise<void> {
  await fs.copy(TEMPLATE_DIR, projectPath, {
    filter: (src: string) => {
      // node_modules, .git 스킵 (현재)
      if (src.includes('node_modules') || src.includes('.git')) {
        return false;
      }
      
      // AI 컨텍스트 파일 조건부 스킵
      if (options?.skipAiContext) {
        if (src.includes('.cursorrules') || 
            src.includes('ai-context.md') || 
            src.includes('.claude')) {
          return false;
        }
      }
      
      return true;
    },
  });
}
```

**장점**: 
- 불필요한 파일 복사 방지
- 삭제 단계 제거
- 약간의 성능 향상

**단점**:
- 템플릿 구조 변경 시 필터 로직 업데이트 필요

### 7. 설치 요약 표시

**개선안**: 설치 완료 후 생성된 파일 요약

```typescript
console.log(chalk.green('\n✅ Project created successfully!'));
console.log(chalk.cyan('\n📊 Summary:'));
console.log(chalk.white(`  📁 Directories: ${dirCount}`));
console.log(chalk.white(`  📄 Files: ${fileCount}`));
console.log(chalk.white(`  🤖 AI Context: ${aiContextFiles.join(', ')}`));
console.log(chalk.white(`  🌐 Languages: ${languages.join(', ')}`));
```

### 8. 롤백 기능

**개선안**: 설치 실패 시 자동 롤백

```typescript
try {
  await createProject(projectName, options);
} catch (error) {
  // 이미 생성된 파일들 정리
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.yellow('Cleaning up...'));
    await fs.remove(projectPath);
  }
  throw error;
}
```

**현재**: 이미 구현되어 있음 ✅

### 9. 의존성 버전 확인

**개선안**: 설치 전 필수 패키지 버전 확인

```typescript
export async function checkPrerequisites(): Promise<void> {
  const nodeVersion = process.version;
  const requiredVersion = '18.0.0';
  
  if (compareVersions(nodeVersion, requiredVersion) < 0) {
    throw new Error(`Node.js ${requiredVersion}+ required. Current: ${nodeVersion}`);
  }
  
  // pnpm 설치 여부 확인
  try {
    await exec('pnpm --version');
  } catch {
    throw new Error('pnpm is required. Install: npm install -g pnpm');
  }
}
```

### 10. 설치 후 가이드

**개선안**: 프로젝트별 맞춤 가이드 표시

```typescript
console.log(chalk.cyan('\n📚 Next Steps:'));
console.log(chalk.white(`  cd ${displayPath}`));
console.log(chalk.white(`  pnpm install`));
console.log(chalk.white(`  pnpm dev`));

if (options.claudeSkills) {
  console.log(chalk.cyan('\n💡 Claude Skills enabled:'));
  console.log(chalk.white('  Check .claude/skills/ for framework usage guide'));
}

if (options.language === 'both') {
  console.log(chalk.cyan('\n🌐 Bilingual mode:'));
  console.log(chalk.white('  Edit translations/ko/ and translations/en/'));
}
```

## 우선순위별 개선 계획

### 높은 우선순위 (즉시 개선 가능)

1. ✅ **에러 메시지 개선** - 사용자 친화적인 메시지
2. ✅ **설치 진행 상황 표시** - 단계별 로그
3. ✅ **설치 요약 표시** - 생성된 파일 통계

### 중간 우선순위 (시간 투자 필요)

4. **의존성 버전 확인** - 사전 검증
5. **템플릿 파일 검증** - 무결성 확인
6. **조건부 템플릿 복사** - 성능 최적화

### 낮은 우선순위 (선택적)

7. **자동 의존성 설치** - `--install` 플래그
8. **TypeScript 컴파일 검증** - 설치 후 검증
9. **번역 파일 JSON 검증** - 문법 오류 확인

## 구현 예시

### 개선된 createProject 함수

```typescript
export async function createProject(
  projectName: string, 
  aiContextOptions?: AiContextOptions
): Promise<void> {
  const projectPath = resolveProjectPath(projectName);
  
  // 1. 사전 검증
  await checkPrerequisites();
  
  if (await fs.pathExists(projectPath)) {
    throw new UserFriendlyError(
      `Directory "${projectPath}" already exists`,
      'Try a different project name or remove the existing directory'
    );
  }

  console.log(chalk.blue(`\n🚀 Creating hua-ux project: ${projectName}...\n`));

  try {
    // 2. 단계별 진행 상황 표시
    console.log(chalk.blue('📦 Step 1/5: Creating project structure...'));
    await fs.ensureDir(projectPath);

    console.log(chalk.blue('📋 Step 2/5: Copying template files...'));
    await copyTemplate(projectPath, {
      skipAiContext: !shouldGenerateAiContext(aiContextOptions)
    });

    console.log(chalk.blue('⚙️  Step 3/5: Generating configuration...'));
    await generatePackageJson(projectPath, projectName);
    await generateConfig(projectPath);

    console.log(chalk.blue('🤖 Step 4/5: Generating AI context files...'));
    await generateAiContextFiles(projectPath, projectName, aiContextOptions);

    console.log(chalk.blue('✅ Step 5/5: Validating project...'));
    await validateGeneratedProject(projectPath);

    // 3. 설치 요약
    const summary = await generateSummary(projectPath, aiContextOptions);
    displaySummary(summary);

    console.log(chalk.green(`\n✅ Project created successfully!`));
    displayNextSteps(projectPath, aiContextOptions);
    
  } catch (error) {
    console.error(chalk.red(`\n❌ Error creating project:`));
    displayErrorHelp(error);
    
    // 롤백
    if (await fs.pathExists(projectPath)) {
      console.log(chalk.yellow('Cleaning up...'));
      await fs.remove(projectPath);
    }
    throw error;
  }
}
```

## 결론

현재 CLI는 **기본 기능이 잘 작동**하고 있습니다. 주요 개선점은:

1. **사용자 경험 개선**: 더 명확한 메시지, 진행 상황 표시
2. **안정성 강화**: 사전 검증, 에러 처리 개선
3. **성능 최적화**: 조건부 복사 (선택적)
4. **편의성 향상**: 자동 설치 옵션, 맞춤 가이드

대부분의 개선사항은 **점진적으로 적용**할 수 있으며, 현재 상태에서도 프로젝트 생성은 정상적으로 작동합니다.
