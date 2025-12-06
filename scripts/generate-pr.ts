#!/usr/bin/env tsx
/**
 * PR 자동 생성 스크립트
 * 
 * Git 변경사항을 분석하여 PR 템플릿을 자동으로 채웁니다.
 * 
 * 사용법:
 *   pnpm generate:pr
 *   pnpm generate:pr --base=develop
 *   pnpm generate:pr --output=pr-description.md
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface PRData {
  baseBranch: string;
  headBranch: string;
  changedFiles: string[];
  commits: CommitInfo[];
  changeTypes: {
    feature: boolean;
    bugfix: boolean;
    refactor: boolean;
    docs: boolean;
    performance: boolean;
    dependency: boolean;
    config: boolean;
  };
}

interface CommitInfo {
  hash: string;
  message: string;
  type: string;
  scope?: string;
  description: string;
}

function getCurrentBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'main';
  }
}

function getChangedFiles(baseBranch: string, headBranch: string): string[] {
  try {
    const output = execSync(
      `git diff --name-only ${baseBranch}...${headBranch}`,
      { encoding: 'utf-8' }
    );
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function getCommits(baseBranch: string, headBranch: string): CommitInfo[] {
  try {
    const output = execSync(
      `git log --pretty=format:"%H|%s" ${baseBranch}..${headBranch}`,
      { encoding: 'utf-8' }
    );
    
    return output.trim().split('\n').filter(Boolean).map(line => {
      const [hash, message] = line.split('|');
      const match = message.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/);
      
      if (match) {
        const [, type, scope, description] = match;
        return { hash, message, type, scope, description };
      }
      
      return { hash, message, type: 'chore', description: message };
    });
  } catch {
    return [];
  }
}

function analyzeChangeTypes(commits: CommitInfo[], files: string[]): PRData['changeTypes'] {
  const types = {
    feature: false,
    bugfix: false,
    refactor: false,
    docs: false,
    performance: false,
    dependency: false,
    config: false,
  };

  // 커밋 타입 분석
  commits.forEach(commit => {
    switch (commit.type) {
      case 'feat':
        types.feature = true;
        break;
      case 'fix':
        types.bugfix = true;
        break;
      case 'refactor':
        types.refactor = true;
        break;
      case 'docs':
        types.docs = true;
        break;
      case 'perf':
        types.performance = true;
        break;
      case 'chore':
        if (files.some(f => f.includes('package.json') || f.includes('pnpm-lock.yaml'))) {
          types.dependency = true;
        }
        if (files.some(f => f.includes('.config.') || f.includes('tsconfig'))) {
          types.config = true;
        }
        break;
    }
  });

  // 파일 경로 분석
  if (files.some(f => f.includes('docs/') || f.endsWith('.md'))) {
    types.docs = true;
  }

  return types;
}

function generatePRDescription(data: PRData): string {
  const templatePath = join(process.cwd(), 'docs', 'templates', 'PR_TEMPLATE.md');
  let template = readFileSync(templatePath, 'utf-8');

  // 변경 사항 체크박스
  const changeTypes = Object.entries(data.changeTypes)
    .filter(([, checked]) => checked)
    .map(([type]) => {
      const labels: Record<string, string> = {
        feature: '새로운 기능 추가',
        bugfix: '버그 수정',
        refactor: '코드 리팩토링',
        docs: '문서 수정',
        performance: '성능 개선',
        dependency: '의존성 업데이트',
        config: '설정 변경',
      };
      return `- [x] ${labels[type] || type}`;
    })
    .join('\n');

  // 변경된 파일 목록
  const fileList = data.changedFiles
    .slice(0, 20) // 최대 20개만 표시
    .map(file => `- \`${file}\``)
    .join('\n');

  const moreFiles = data.changedFiles.length > 20 
    ? `\n- ... 외 ${data.changedFiles.length - 20}개 파일`
    : '';

  // 주요 변경 사항 (커밋 기반)
  const mainChanges = data.commits
    .slice(0, 5) // 최대 5개 커밋
    .map((commit, index) => {
      const scope = commit.scope ? `(${commit.scope})` : '';
      return `${index + 1}. **${commit.type}${scope}**: ${commit.description}`;
    })
    .join('\n   - ');

  // 템플릿 치환
  template = template
    .replace(/## 변경 사항\n\n- \[ \]/g, `## 변경 사항\n\n${changeTypes}\n- [ ]`)
    .replace(/- \*\*Base 브랜치\*\*: `\[base-branch\]`/g, `- **Base 브랜치**: \`${data.baseBranch}\``)
    .replace(/- \*\*Head 브랜치\*\*: `\[head-branch\]`/g, `- **Head 브랜치**: \`${data.headBranch}\``)
    .replace(/### 변경된 파일\n\n- `\[파일 경로 1\]`/g, `### 변경된 파일\n\n${fileList}${moreFiles}`)
    .replace(/1\. \*\*\[변경 사항 1\]\*\*\n   - 상세 설명/g, `${mainChanges}\n   - 상세 설명`);

  return template;
}

function main() {
  const args = process.argv.slice(2);
  const baseBranch = args.find(arg => arg.startsWith('--base='))?.split('=')[1] || 'develop';
  const headBranch = getCurrentBranch();
  const outputPath = args.find(arg => arg.startsWith('--output='))?.split('=')[1];

  console.log(`\n📝 PR 자동 생성 스크립트\n`);
  console.log(`Base 브랜치: ${baseBranch}`);
  console.log(`Head 브랜치: ${headBranch}\n`);

  const changedFiles = getChangedFiles(baseBranch, headBranch);
  const commits = getCommits(baseBranch, headBranch);
  const changeTypes = analyzeChangeTypes(commits, changedFiles);

  const prData: PRData = {
    baseBranch,
    headBranch,
    changedFiles,
    commits,
    changeTypes,
  };

  console.log(`변경된 파일: ${changedFiles.length}개`);
  console.log(`커밋 수: ${commits.length}개\n`);

  const prDescription = generatePRDescription(prData);

  if (outputPath) {
    writeFileSync(outputPath, prDescription, 'utf-8');
    console.log(`✅ PR 설명이 ${outputPath}에 저장되었습니다.\n`);
  } else {
    console.log('--- PR 설명 ---\n');
    console.log(prDescription);
    console.log('\n--- 끝 ---\n');
    console.log('💡 파일로 저장하려면: pnpm generate:pr --output=pr-description.md');
  }
}

// tsx로 실행 시 자동으로 main 함수 호출
main();

export { generatePRDescription, getChangedFiles, getCommits };

