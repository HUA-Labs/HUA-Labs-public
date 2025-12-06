#!/usr/bin/env tsx
/**
 * Devlog 자동 생성 스크립트
 * 
 * Git 커밋 로그를 분석하여 Devlog 초안을 자동으로 생성합니다.
 * 
 * 사용법:
 *   pnpm generate:devlog
 *   pnpm generate:devlog --date=2025-12-06
 *   pnpm generate:devlog --branch=feature/new-feature
 *   pnpm generate:devlog --output=devlog.md
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface DevlogData {
  date: string;
  branch?: string;
  commits: CommitInfo[];
  changedFiles: string[];
  workCategories: {
    features: string[];
    fixes: string[];
    refactors: string[];
    docs: string[];
    others: string[];
  };
}

interface CommitInfo {
  hash: string;
  date: string;
  message: string;
  type: string;
  scope?: string;
  description: string;
  files: string[];
}

function getCurrentBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'main';
  }
}

function getCommitsForDate(date?: string, branch?: string): CommitInfo[] {
  try {
    const dateFilter = date ? `--since="${date} 00:00:00" --until="${date} 23:59:59"` : '--since="1 day ago"';
    const branchFilter = branch ? ` ${branch}` : '';
    
    const output = execSync(
      `git log --pretty=format:"%H|%ad|%s" --date=short ${dateFilter}${branchFilter}`,
      { encoding: 'utf-8' }
    );

    return output.trim().split('\n').filter(Boolean).map(line => {
      const [hash, commitDate, message] = line.split('|');
      const match = message.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/);
      
      let type = 'chore';
      let scope: string | undefined;
      let description = message;

      if (match) {
        [, type, scope, description] = match;
      }

      // 커밋의 변경된 파일 가져오기
      const files = getCommitFiles(hash);

      return {
        hash,
        date: commitDate,
        message,
        type,
        scope,
        description,
        files,
      };
    });
  } catch {
    return [];
  }
}

function getCommitFiles(hash: string): string[] {
  try {
    const output = execSync(
      `git diff-tree --no-commit-id --name-only -r ${hash}`,
      { encoding: 'utf-8' }
    );
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function categorizeWork(commits: CommitInfo[]): DevlogData['workCategories'] {
  const categories = {
    features: [] as string[],
    fixes: [] as string[],
    refactors: [] as string[],
    docs: [] as string[],
    others: [] as string[],
  };

  commits.forEach(commit => {
    const item = `- **${commit.type}${commit.scope ? `(${commit.scope})` : ''}**: ${commit.description}`;
    
    switch (commit.type) {
      case 'feat':
        categories.features.push(item);
        break;
      case 'fix':
        categories.fixes.push(item);
        break;
      case 'refactor':
        categories.refactors.push(item);
        break;
      case 'docs':
        categories.docs.push(item);
        break;
      default:
        categories.others.push(item);
    }
  });

  return categories;
}

function getUniqueChangedFiles(commits: CommitInfo[]): string[] {
  const fileSet = new Set<string>();
  commits.forEach(commit => {
    commit.files.forEach(file => fileSet.add(file));
  });
  return Array.from(fileSet).sort();
}

function generateDevlog(data: DevlogData): string {
  const templatePath = join(process.cwd(), 'docs', 'templates', 'DEVLOG_TEMPLATE.md');
  let template = readFileSync(templatePath, 'utf-8');

  // 날짜 치환
  template = template.replace(/YYYY-MM-DD/g, data.date);

  // 작업 내용 생성
  const completedWork: string[] = [];
  let workIndex = 1;

  if (data.workCategories.features.length > 0) {
    completedWork.push(
      `#### ${workIndex}. 새로운 기능 추가\n\n` +
      `**상태**: 완료\n` +
      `**작업 시간**: ${data.date}\n\n` +
      `**작업 내용**:\n` +
      data.workCategories.features.join('\n') + '\n'
    );
    workIndex++;
  }

  if (data.workCategories.fixes.length > 0) {
    completedWork.push(
      `#### ${workIndex}. 버그 수정\n\n` +
      `**상태**: 완료\n` +
      `**작업 시간**: ${data.date}\n\n` +
      `**작업 내용**:\n` +
      data.workCategories.fixes.join('\n') + '\n'
    );
    workIndex++;
  }

  if (data.workCategories.refactors.length > 0) {
    completedWork.push(
      `#### ${workIndex}. 코드 리팩토링\n\n` +
      `**상태**: 완료\n` +
      `**작업 시간**: ${data.date}\n\n` +
      `**작업 내용**:\n` +
      data.workCategories.refactors.join('\n') + '\n'
    );
    workIndex++;
  }

  if (data.workCategories.docs.length > 0) {
    completedWork.push(
      `#### ${workIndex}. 문서 작업\n\n` +
      `**상태**: 완료\n` +
      `**작업 시간**: ${data.date}\n\n` +
      `**작업 내용**:\n` +
      data.workCategories.docs.join('\n') + '\n'
    );
    workIndex++;
  }

  if (data.workCategories.others.length > 0) {
    completedWork.push(
      `#### ${workIndex}. 기타 작업\n\n` +
      `**상태**: 완료\n` +
      `**작업 시간**: ${data.date}\n\n` +
      `**작업 내용**:\n` +
      data.workCategories.others.join('\n') + '\n'
    );
  }

  // 변경된 파일 목록
  const fileList = data.changedFiles
    .slice(0, 30) // 최대 30개만 표시
    .map(file => `- \`${file}\``)
    .join('\n');

  const moreFiles = data.changedFiles.length > 30 
    ? `\n- ... 외 ${data.changedFiles.length - 30}개 파일`
    : '';

  // 템플릿 치환
  template = template
    .replace(/### 완료된 작업\n\n#### 1\. \[작업 제목\]/g, `### 완료된 작업\n\n${completedWork.join('---\n\n')}`)
    .replace(/- `\[파일 경로 1\]`/g, `${fileList}${moreFiles}`);

  // 제목 생성
  const title = data.workCategories.features.length > 0 
    ? '새로운 기능 추가'
    : data.workCategories.fixes.length > 0
    ? '버그 수정'
    : data.workCategories.refactors.length > 0
    ? '코드 리팩토링'
    : '개발 작업';

  template = template.replace(/# DevLog - \[날짜\] - \[제목\]/g, `# DevLog - ${data.date} - ${title}`);

  return template;
}

function main() {
  const args = process.argv.slice(2);
  const dateArg = args.find(arg => arg.startsWith('--date='))?.split('=')[1];
  const branchArg = args.find(arg => arg.startsWith('--branch='))?.split('=')[1];
  const outputPath = args.find(arg => arg.startsWith('--output='))?.split('=')[1];

  const date = dateArg || new Date().toISOString().split('T')[0];
  const branch = branchArg || getCurrentBranch();

  console.log(`\n📝 Devlog 자동 생성 스크립트\n`);
  console.log(`날짜: ${date}`);
  console.log(`브랜치: ${branch}\n`);

  const commits = getCommitsForDate(date, branch);
  const changedFiles = getUniqueChangedFiles(commits);
  const workCategories = categorizeWork(commits);

  const devlogData: DevlogData = {
    date,
    branch,
    commits,
    changedFiles,
    workCategories,
  };

  console.log(`커밋 수: ${commits.length}개`);
  console.log(`변경된 파일: ${changedFiles.length}개\n`);

  const devlog = generateDevlog(devlogData);

  if (outputPath) {
    writeFileSync(outputPath, devlog, 'utf-8');
    console.log(`✅ Devlog가 ${outputPath}에 저장되었습니다.\n`);
  } else {
    const defaultPath = join(process.cwd(), 'docs', 'devlogs', `DEVLOG_${date}_AUTO_GENERATED.md`);
    writeFileSync(defaultPath, devlog, 'utf-8');
    console.log(`✅ Devlog가 ${defaultPath}에 저장되었습니다.\n`);
    console.log('💡 파일명을 변경하고 내용을 검토한 후 커밋하세요.');
  }
}

// tsx로 실행 시 자동으로 main 함수 호출
main();

export { generateDevlog, getCommitsForDate, categorizeWork };

