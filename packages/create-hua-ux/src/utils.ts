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
      next: '^15.0.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      zustand: '^5.0.0',
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@tailwindcss/postcss': '^4',
      autoprefixer: '^10.4.0',
      postcss: '^8.4.0',
      tailwindcss: '^4',
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

export default defineConfig({
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
  },
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
