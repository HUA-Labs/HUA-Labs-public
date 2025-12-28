/**
 * create-hua-ux - Utilities
 * 
 * Utility functions for project creation
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as inquirer from 'inquirer';

const TEMPLATE_DIR = path.join(__dirname, '../templates/nextjs');

/**
 * Prompt for project name
 */
export async function promptProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name is required';
        }
        return true;
      },
    },
  ]);

  return projectName;
}

/**
 * Copy template files to project directory
 */
export async function copyTemplate(projectPath: string): Promise<void> {
  await fs.copy(TEMPLATE_DIR, projectPath, {
    filter: (src: string) => {
      // Skip node_modules and .git
      return !src.includes('node_modules') && !src.includes('.git');
    },
  });
}

/**
 * Generate package.json
 */
export async function generatePackageJson(
  projectPath: string,
  projectName: string
): Promise<void> {
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev --turbopack',
      build: 'next build',
      start: 'next start',
      lint: "echo 'Skipping lint'",
    },
    dependencies: {
      '@hua-labs/hua-ux': 'workspace:*',
      next: '16.0.10',
      react: '19.2.1',
      'react-dom': '19.2.1',
      zustand: '^5.0.8',
    },
    devDependencies: {
      '@types/node': '^22.0.0',
      '@types/react': '^19.2.7',
      '@types/react-dom': '^19.2.3',
      '@tailwindcss/postcss': '^4',
      autoprefixer: '^10.4.21',
      postcss: '^8.5.6',
      tailwindcss: '^4.1.13',
      typescript: '^5.9.3',
    },
  };

  await fs.writeJSON(
    path.join(projectPath, 'package.json'),
    packageJson,
    { spaces: 2 }
  );
}

/**
 * Generate hua-ux.config.ts
 */
export async function generateConfig(projectPath: string): Promise<void> {
  const configContent = `import { defineConfig } from '@hua-labs/hua-ux/framework';

/**
 * hua-ux 프레임워크 설정
 * 
 * Preset을 선택하면 대부분의 설정이 자동으로 적용됩니다.
 * - 'product': 제품 페이지용 (전문적, 효율적)
 * - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는)
 */
export default defineConfig({
  /**
   * 프리셋 선택
   * 
   * Preset을 선택하면 motion, spacing, i18n 등이 자동 설정됩니다.
   */
  preset: 'product',
  
  /**
   * 다국어 설정
   */
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
  
  /**
   * 모션/애니메이션 설정
   */
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
  },
  
  /**
   * 상태 관리 설정
   */
  state: {
    persist: true,
    ssr: true,
  },
});
`;

  await fs.writeFile(
    path.join(projectPath, 'hua-ux.config.ts'),
    configContent
  );
}

/**
 * Generate AI context files
 * 
 * Cursor, Claude 등 다양한 AI 도구를 위한 컨텍스트 파일 생성
 */
export async function generateAiContextFiles(projectPath: string): Promise<void> {
  // .cursorrules는 템플릿에서 복사됨 (이미 처리됨)
  // .claude/project-context.md도 템플릿에서 복사됨 (이미 처리됨)
  // ai-context.md도 템플릿에서 복사됨 (이미 처리됨)
  
  // 필요시 여기서 프로젝트별 커스터마이징 가능
  // 예: 프로젝트 이름을 ai-context.md에 삽입 등
}
