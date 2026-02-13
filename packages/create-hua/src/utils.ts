/**
 * create-hua - Utilities
 *
 * Utility functions for project creation
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { HUA_VERSION } from './version';
import {
  MIN_NODE_VERSION,
  AI_CONTEXT_FILES,
  isInteractive,
  t,
  compareVersions,
  validateProjectName,
  listEnabledAiFiles,
} from './shared';

/**
 * Detect which package manager was used to run the CLI
 */
function detectPackageManager(): 'npm' | 'pnpm' | 'yarn' {
  const userAgent = process.env.npm_config_user_agent || '';

  if (userAgent.startsWith('pnpm')) return 'pnpm';
  if (userAgent.startsWith('yarn')) return 'yarn';
  return 'npm';
}
import {
  NEXTJS_VERSION,
  REACT_VERSION,
  REACT_DOM_VERSION,
  ZUSTAND_VERSION,
  TYPESCRIPT_VERSION,
  TYPES_NODE_VERSION,
  TYPES_REACT_VERSION,
  TYPES_REACT_DOM_VERSION,
  TAILWIND_POSTCSS_VERSION,
  AUTOPREFIXER_VERSION,
  POSTCSS_VERSION,
  TAILWIND_VERSION,
  PHOSPHOR_ICONS_VERSION,
} from './constants/versions';

// Resolve template directory
// When compiled, __dirname points to dist/, so we need to go up to templates/
// When running with tsx, __dirname points to src/, so we need to go up one level
const TEMPLATE_DIR = path.join(__dirname, '../templates/nextjs');

/**
 * AI context generation options
 */
export interface AiContextOptions {
  cursorRules: boolean;
  aiContext: boolean;
  agentsMd: boolean;
  skillsMd: boolean;
  claudeContext: boolean;
  claudeSkills: boolean;
  language: 'ko' | 'en' | 'both';
}

interface MonorepoContext {
  isMonorepo: boolean;
  rootDir?: string;
  projectLocation?: 'root' | 'apps' | 'packages' | 'other';
}

/**
 * Prompt for project name with npm naming validation
 */
export async function promptProjectName(): Promise<string> {
  if (!isInteractive()) {
    throw new Error('Project name is required when running in non-interactive mode. Please provide it as an argument: npx create-hua <project-name>');
  }

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: t('prompt:projectName'),
      validate: (input: string) => {
        const result = validateProjectName(input);
        if (!result.valid) return result.message!;
        return true;
      },
    },
  ]);

  return projectName;
}

/**
 * Check if directory is empty
 */
export async function isEmptyDir(dirPath: string): Promise<boolean> {
  if (!(await fs.pathExists(dirPath))) {
    return true;
  }
  const files = await fs.readdir(dirPath);
  return files.length === 0;
}

/**
 * Prompt for AI context generation options
 */
export async function promptAiContextOptions(): Promise<AiContextOptions> {
  if (!isInteractive()) {
    console.log('Running in non-interactive mode, using default options...');
    return {
      cursorRules: true,
      aiContext: true,
      agentsMd: true,
      skillsMd: true,
      claudeContext: true,
      claudeSkills: false,
      language: 'both',
    };
  }

  try {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'options',
        message: t('prompt:selectAiContext'),
        choices: [
          { name: t('prompt:cursorRules'), value: 'cursorRules', checked: true },
          { name: t('prompt:aiContext'), value: 'aiContext', checked: true },
          { name: t('prompt:agentsMd'), value: 'agentsMd', checked: true },
          { name: t('prompt:skillsMd'), value: 'skillsMd', checked: true },
          { name: t('prompt:claudeContext'), value: 'claudeContext', checked: true },
          { name: t('prompt:claudeSkills'), value: 'claudeSkills', checked: false },
        ],
      },
      {
        type: 'list',
        name: 'language',
        message: t('prompt:documentationLanguage'),
        choices: [
          { name: t('prompt:langKo'), value: 'ko' },
          { name: t('prompt:langEn'), value: 'en' },
          { name: t('prompt:langBoth'), value: 'both' },
        ],
        default: 'both',
      },
    ]);

    return {
      cursorRules: answers.options.includes('cursorRules'),
      aiContext: answers.options.includes('aiContext'),
      agentsMd: answers.options.includes('agentsMd'),
      skillsMd: answers.options.includes('skillsMd'),
      claudeContext: answers.options.includes('claudeContext'),
      claudeSkills: answers.options.includes('claudeSkills'),
      language: answers.language || 'both',
    };
  } catch {
    console.warn('Failed to get interactive input, using default options...');
    return {
      cursorRules: true,
      aiContext: true,
      agentsMd: true,
      skillsMd: true,
      claudeContext: true,
      claudeSkills: false,
      language: 'both',
    };
  }
}

/**
 * Copy template files to project directory
 */
export async function copyTemplate(
  projectPath: string,
  options?: { skipAiContext?: boolean }
): Promise<void> {
  await fs.copy(TEMPLATE_DIR, projectPath, {
    filter: (src: string) => {
      const relativePath = path.relative(TEMPLATE_DIR, src);

      if (relativePath.includes('node_modules') || relativePath.includes('.git')) {
        return false;
      }

      if (options?.skipAiContext) {
        if (relativePath === 'ai-context.md' ||
          relativePath === 'AGENTS.md' ||
          relativePath === 'skills.md' ||
          relativePath.startsWith('.cursor') ||
          relativePath.startsWith('.claude')) {
          return false;
        }
      }

      return true;
    },
  });
}

/**
 * Get hua package version
 *
 * Detection priority:
 * 1. HUA_WORKSPACE_VERSION env var
 * 2. Monorepo detection (packages/hua/package.json)
 * 3. Fallback: HUA_VERSION constant (set at build time)
 */
function getHuaVersion(): string {
  // 1. Explicit workspace env
  if (process.env.HUA_WORKSPACE_VERSION === 'workspace') {
    return 'workspace:*';
  }

  // 2. Monorepo: look for sibling hua package
  try {
    const createHuaRoot = path.resolve(__dirname, '..');
    const huaPackageJson = path.join(createHuaRoot, '../hua/package.json');

    if (fs.pathExistsSync(huaPackageJson)) {
      const huaPackage = fs.readJSONSync(huaPackageJson);
      // If we can read sibling package, we're in a monorepo
      if (huaPackage.version) {
        // Check for pnpm-workspace.yaml to confirm monorepo
        let currentDir = process.cwd();
        for (let i = 0; i < 10; i++) {
          if (fs.pathExistsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
            return 'workspace:*';
          }
          const parentDir = path.dirname(currentDir);
          if (parentDir === currentDir) break;
          currentDir = parentDir;
        }
        return `^${huaPackage.version}`;
      }
    }
  } catch {
    // Cannot read sibling package, continue to fallback
  }

  // 3. Build-time constant (npm publish)
  return HUA_VERSION;
}

/**
 * Get @hua-labs/ui version — mirrors getHuaVersion() logic
 */
function getHuaUiVersion(): string {
  if (process.env.HUA_WORKSPACE_VERSION === 'workspace') {
    return 'workspace:*';
  }

  try {
    const createHuaRoot = path.resolve(__dirname, '..');
    const uiPackageJson = path.join(createHuaRoot, '../hua-ui/package.json');

    if (fs.pathExistsSync(uiPackageJson)) {
      const uiPackage = fs.readJSONSync(uiPackageJson);
      if (uiPackage.version) {
        let currentDir = process.cwd();
        for (let i = 0; i < 10; i++) {
          if (fs.pathExistsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
            return 'workspace:*';
          }
          const parentDir = path.dirname(currentDir);
          if (parentDir === currentDir) break;
          currentDir = parentDir;
        }
        return `^${uiPackage.version}`;
      }
    }
  } catch {
    // fallback
  }

  return '^2.0.0';
}

/**
 * Detect monorepo context by looking for workspace markers in parent directories
 */
async function detectMonorepoContext(projectPath: string): Promise<MonorepoContext> {
  const visited = new Set<string>();
  let currentDir = path.dirname(projectPath);

  const buildResult = (rootDir: string): MonorepoContext => {
    const relativePath = path.relative(rootDir, projectPath);
    const segments = relativePath.split(path.sep).filter(Boolean);
    let projectLocation: MonorepoContext['projectLocation'] = 'other';

    if (segments.length === 0) {
      projectLocation = 'root';
    } else if (segments[0] === 'apps') {
      projectLocation = 'apps';
    } else if (segments[0] === 'packages') {
      projectLocation = 'packages';
    }

    return {
      isMonorepo: true,
      rootDir,
      projectLocation,
    };
  };

  for (let depth = 0; depth < 10; depth++) {
    if (!currentDir || visited.has(currentDir)) {
      break;
    }
    visited.add(currentDir);

    const workspaceFile = path.join(currentDir, 'pnpm-workspace.yaml');
    if (await fs.pathExists(workspaceFile)) {
      return buildResult(currentDir);
    }

    const packageJsonPath = path.join(currentDir, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const packageJson = await fs.readJSON(packageJsonPath);
        if (packageJson.workspaces) {
          return buildResult(currentDir);
        }
      } catch {
        // Ignore JSON parse errors and move up
      }
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }

  // Fallback: check immediate parent for monorepo structure hints
  const parentDir = path.dirname(projectPath);
  const hasPackagesDir = await fs.pathExists(path.join(parentDir, 'packages'));
  const hasAppsDir = await fs.pathExists(path.join(parentDir, 'apps'));
  if (hasPackagesDir || hasAppsDir) {
    return buildResult(parentDir);
  }

  return { isMonorepo: false };
}

function toPosixRelative(from: string, target: string): string {
  let relativePath = path.relative(from, target).replace(/\\/g, '/');
  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }
  return relativePath;
}

/**
 * Generate package.json
 */
export async function generatePackageJson(
  projectPath: string,
  projectName: string
): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (await fs.pathExists(packageJsonPath)) {
    await fs.remove(packageJsonPath);
  }

  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev --webpack',
      build: 'next build',
      start: 'next start',
      lint: "next lint",
      'lint:fix': 'next lint --fix',
    },
    dependencies: {
      '@hua-labs/hua': getHuaVersion(),
      '@hua-labs/ui': getHuaUiVersion(),
      '@phosphor-icons/react': PHOSPHOR_ICONS_VERSION,
      next: NEXTJS_VERSION,
      react: REACT_VERSION,
      'react-dom': REACT_DOM_VERSION,
      zustand: ZUSTAND_VERSION,
    },
    devDependencies: {
      '@types/node': TYPES_NODE_VERSION,
      '@types/react': TYPES_REACT_VERSION,
      '@types/react-dom': TYPES_REACT_DOM_VERSION,
      '@tailwindcss/postcss': TAILWIND_POSTCSS_VERSION,
      autoprefixer: AUTOPREFIXER_VERSION,
      postcss: POSTCSS_VERSION,
      tailwindcss: TAILWIND_VERSION,
      typescript: TYPESCRIPT_VERSION,
    },
  };

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
}

/**
 * Generate Tailwind config based on monorepo context
 */
async function generateTailwindConfig(projectPath: string): Promise<void> {
  const tailwindConfigPath = path.join(projectPath, 'tailwind.config.js');
  const context = await detectMonorepoContext(projectPath);

  const contentEntries = new Set<string>([
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ]);

  if (context.isMonorepo && context.rootDir) {
    const packageMappings = [
      { dir: 'hua-ui', glob: 'src/**/*.{ts,tsx}' },
      { dir: 'hua', glob: 'src/**/*.{ts,tsx}' },
      { dir: 'hua-motion-core', glob: 'src/**/*.{ts,tsx}' },
    ];

    for (const pkg of packageMappings) {
      const packageDir = path.join(context.rootDir, 'packages', pkg.dir);
      if (!(await fs.pathExists(packageDir))) {
        continue;
      }
      const absoluteGlob = path.join(packageDir, pkg.glob);
      contentEntries.add(toPosixRelative(projectPath, absoluteGlob));
    }
  } else {
    [
      './node_modules/@hua-labs/ui/**/*.{ts,tsx}',
      './node_modules/@hua-labs/hua/**/*.{ts,tsx}',
      './node_modules/@hua-labs/motion-core/**/*.{ts,tsx}',
    ].forEach(entry => contentEntries.add(entry));
  }

  const safelistEntries = [
    '{ pattern: /^(bg|text|border)-(?:primary|secondary|accent|neutral|success|warning|danger)(?:-(?:50|100|200|300|400|500|600|700|800|900))?$/ }',
    '{ pattern: /^(px|py)-(?:0|1|2|3|4|5|6|8|10)$/ }',
    '{ pattern: /^text-(?:xs|sm|base|lg|xl|2xl)$/ }',
    '{ pattern: /^rounded-(?:none|sm|md|lg|xl|2xl|3xl|full)$/ }',
    '{ pattern: /^shadow-(?:sm|md|lg|xl|2xl)$/ }',
    '{ pattern: /^transition(?:-(?:all|colors|opacity|transform))?$/ }',
    '{ pattern: /^duration-(?:75|100|150|200|300)$/ }',
    '{ pattern: /^ease-(?:linear|in|out|in-out)$/ }',
    "'modal-open'",
    "'modal-close'",
    "'modal-backdrop'",
    "'drawer-open'",
    "'drawer-side'",
    "'drawer-content'",
    "'card-glow'",
    "'card-gradient'",
  ];

  const contentArray = Array.from(contentEntries).sort().map(entry => `    '${entry}'`).join(',\n');
  const safelistArray = safelistEntries.map(entry => `  ${entry}`).join(',\n');

  const configContent = `/**
 * This file is generated by create-hua.
 * It ensures Tailwind scans hua-ui/hua sources in both monorepo and standalone installs.
 */
const componentSafelist = [
${safelistArray}
];

module.exports = {
  content: [
${contentArray}
  ],
  safelist: componentSafelist,
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

  await fs.writeFile(tailwindConfigPath, configContent, 'utf-8');
}

/**
 * Generate hua.config.ts
 */
export async function generateConfig(projectPath: string): Promise<void> {
  const configContent = `import { defineConfig } from '@hua-labs/hua/framework/config';

/**
 * hua 프레임워크 설정
 *
 * Preset을 선택하면 대부분의 설정이 자동으로 적용됩니다.
 * - 'product': 제품 페이지용 (전문적, 효율적)
 * - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는)
 *
 * **바이브 모드 (간단)**: \`preset: 'product'\`
 * **개발자 모드 (세부 설정)**: \`preset: { type: 'product', motion: {...} }\`
 */
export default defineConfig({
  /**
   * 프리셋 선택
   *
   * Preset을 선택하면 motion, spacing, i18n 등이 자동 설정됩니다.
   *
   * 바이브 모드 (간단):
   *   preset: 'product'
   *
   * 개발자 모드 (세부 설정):
   *   preset: {
   *     type: 'product',
   *     motion: { duration: 300 },
   *   }
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
   *
   * 바이브 코더용 (명사 중심):
   *   motion: { style: 'smooth' }  // 'smooth' | 'dramatic' | 'minimal'
   *
   * 개발자용 (기술적):
   *   motion: {
   *     defaultPreset: 'product',
   *     enableAnimations: true,
   *     duration: 300,
   *   }
   */
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
    // style: 'smooth',  // 바이브 코더용: 'smooth' | 'dramatic' | 'minimal'
  },

  /**
   * 상태 관리 설정
   */
  state: {
    persist: true,
    ssr: true,
  },

  /**
   * 브랜딩 설정 (화이트 라벨링)
   *
   * 색상, 타이포그래피 등을 설정하면 모든 컴포넌트에 자동 적용됩니다.
   *
   * branding: {
   *   colors: {
   *     primary: '#3B82F6',
   *     secondary: '#8B5CF6',
   *   },
   * }
   */
  // branding: {
  //   colors: {
  //     primary: '#3B82F6',
  //   },
  // },

  /**
   * 라이선스 설정 (Pro/Enterprise 플러그인 사용 시)
   *
   * license: {
   *   apiKey: process.env.HUA_LICENSE_KEY,
   * }
   */
  // license: {
  //   apiKey: process.env.HUA_LICENSE_KEY,
  // },

  /**
   * 플러그인 설정 (Pro/Enterprise 기능)
   *
   * plugins: [
   *   motionProPlugin,
   *   i18nProPlugin,
   * ]
   */
  // plugins: [],
});
`;

  await fs.writeFile(
    path.join(projectPath, 'hua.config.ts'),
    configContent
  );

  try {
    await generateTailwindConfig(projectPath);
  } catch (error) {
    console.warn(
      chalk.yellow(
        `Warning: Failed to generate Tailwind config: ${error instanceof Error ? error.message : String(error)}`
      )
    );
  }
}

/**
 * Generate AI context files
 *
 * Data-driven: uses AI_CONTEXT_FILES from shared.ts to remove disabled files.
 */
export async function generateAiContextFiles(
  projectPath: string,
  projectName?: string,
  options?: AiContextOptions
): Promise<void> {
  const opts = options || {
    cursorRules: true,
    aiContext: true,
    agentsMd: true,
    skillsMd: true,
    claudeContext: true,
    claudeSkills: false,
    language: 'both',
  };

  // Data-driven: remove files for disabled options
  for (const entry of AI_CONTEXT_FILES) {
    if (!opts[entry.key]) {
      for (const p of entry.paths) {
        const fullPath = path.join(projectPath, p);
        if (await fs.pathExists(fullPath)) {
          await fs.remove(fullPath);
        }
      }
    }
  }

  // Project-specific customization
  if (projectName) {
    if (opts.aiContext) {
      const aiContextPath = path.join(projectPath, 'ai-context.md');
      if (await fs.pathExists(aiContextPath)) {
        let content = await fs.readFile(aiContextPath, 'utf-8');
        content = content.replace(
          /^# hua Project AI Context/,
          `# ${projectName} - hua Project AI Context\n\n**Project Name**: ${projectName}`
        );
        await fs.writeFile(aiContextPath, content, 'utf-8');
      }
    }

    if (opts.claudeContext) {
      const claudeContextPath = path.join(projectPath, '.claude', 'project-context.md');
      if (await fs.pathExists(claudeContextPath)) {
        let content = await fs.readFile(claudeContextPath, 'utf-8');
        content = content.replace(
          /^# hua Project Context/,
          `# ${projectName} - hua Project Context\n\n**Project Name**: ${projectName}`
        );
        await fs.writeFile(claudeContextPath, content, 'utf-8');
      }
    }
  }

  // Inject package version info into ai-context.md
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJSON(packageJsonPath);
      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};

      if (opts.aiContext) {
        const aiContextPath = path.join(projectPath, 'ai-context.md');
        if (await fs.pathExists(aiContextPath)) {
          let content = await fs.readFile(aiContextPath, 'utf-8');

          const depsSection = `
## Installed Package Versions

### Core Dependencies
${Object.entries(dependencies)
            .filter(([name]) => name.startsWith('@hua-labs/') || name === 'next' || name === 'react')
            .map(([name, version]) => `- \`${name}\`: ${version}`)
            .join('\n')}

### Dev Dependencies
${Object.entries(devDependencies)
            .filter(([name]) => name.includes('typescript') || name.includes('tailwind') || name.includes('@types'))
            .map(([name, version]) => `- \`${name}\`: ${version}`)
            .join('\n')}
`;

          content = content.replace(
            /## 참고 자료/,
            `${depsSection}\n## 참고 자료`
          );

          await fs.writeFile(aiContextPath, content, 'utf-8');
        }
      }
    } catch (error) {
      console.warn('Failed to extract package versions for AI context:', error);
    }
  }
}

/**
 * Check prerequisites before project creation
 */
export async function checkPrerequisites(): Promise<void> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Node.js version check
  const nodeVersion = process.version;
  if (compareVersions(nodeVersion, MIN_NODE_VERSION) < 0) {
    errors.push(t('prereq:nodeRequired', { min: MIN_NODE_VERSION, current: nodeVersion }));
  }

  // 2. pnpm installation check
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
  } catch {
    errors.push(t('prereq:pnpmRequired'));
  }

  // 3. Template validation
  try {
    await validateTemplate();
  } catch (error) {
    errors.push(t('prereq:templateValidationFailed', { error: error instanceof Error ? error.message : String(error) }));
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow('\nWarnings:'));
    warnings.forEach(w => console.log(chalk.yellow(`  - ${w}`)));
  }

  if (errors.length > 0) {
    const errorList = errors.map(e => `  - ${e}`).join('\n');
    const errorMessage = `${t('prereq:checkFailed', { errors: errorList })}\n${t('prereq:tips')}`;
    throw new Error(errorMessage);
  }
}

/**
 * Validate template files integrity
 */
export async function validateTemplate(): Promise<void> {
  if (!(await fs.pathExists(TEMPLATE_DIR))) {
    throw new Error(t('validate:templateDirNotFound', { path: TEMPLATE_DIR }));
  }

  const requiredFiles = [
    'tsconfig.json',
    'next.config.ts',
    'tailwind.config.js',
    '.eslintrc.json',
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'lib/i18n-setup.ts',
    'lib/utils.ts',
    'store/useAppStore.ts',
    'translations/ko/common.json',
    'translations/en/common.json',
    'ai-context.md',
    'AGENTS.md',
    'skills.md',
    '.cursor/rules/hua-framework.mdc',
  ];

  const missingFiles: string[] = [];

  for (const file of requiredFiles) {
    const filePath = path.join(TEMPLATE_DIR, file);
    if (!(await fs.pathExists(filePath))) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(t('validate:templateFilesMissing', { files: missingFiles.join(', ') }));
  }
}

/**
 * Validate generated project
 */
export async function validateGeneratedProject(projectPath: string): Promise<void> {
  const errors: string[] = [];

  // 1. package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (!(await fs.pathExists(packageJsonPath))) {
    errors.push(t('validate:packageJsonNotCreated'));
  } else {
    try {
      const packageJson = await fs.readJSON(packageJsonPath);

      if (packageJson.scripts?.lint !== 'next lint') {
        errors.push(t('validate:lintScriptIncorrect', { actual: packageJson.scripts?.lint ?? '' }));
      }

      const requiredDeps = ['@hua-labs/hua', 'next', 'react', 'react-dom'];
      for (const dep of requiredDeps) {
        if (!packageJson.dependencies?.[dep]) {
          errors.push(t('validate:depMissing', { dep }));
        }
      }
    } catch (error) {
      errors.push(t('validate:packageJsonParseFailed', { error: String(error) }));
    }
  }

  // 2. hua.config.ts
  const configPath = path.join(projectPath, 'hua.config.ts');
  if (!(await fs.pathExists(configPath))) {
    errors.push(t('validate:configNotCreated'));
  }

  // 3. Required directories
  const requiredDirs = ['app', 'lib', 'store', 'translations'];
  for (const dir of requiredDirs) {
    const dirPath = path.join(projectPath, dir);
    if (!(await fs.pathExists(dirPath))) {
      errors.push(t('validate:dirNotCreated', { dir }));
    }
  }

  // 4. Required files
  const requiredFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'tsconfig.json',
    'next.config.ts',
  ];
  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    if (!(await fs.pathExists(filePath))) {
      errors.push(t('validate:fileNotCreated', { file }));
    }
  }

  if (errors.length > 0) {
    const errorList = errors.map(e => `  - ${e}`).join('\n');
    throw new Error(t('validate:projectFailed', { errors: errorList }) + t('validate:projectTips'));
  }
}

/**
 * Validate translation files JSON syntax
 */
export async function validateTranslationFiles(projectPath: string): Promise<void> {
  const translationFiles = [
    'translations/ko/common.json',
    'translations/en/common.json',
  ];

  const errors: string[] = [];

  for (const file of translationFiles) {
    const filePath = path.join(projectPath, file);
    if (await fs.pathExists(filePath)) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        JSON.parse(content);
      } catch (error) {
        if (error instanceof SyntaxError) {
          errors.push(t('validate:invalidJson', { file, error: error.message }));
        } else {
          errors.push(t('validate:readFailed', { file, error: error instanceof Error ? error.message : String(error) }));
        }
      }
    }
  }

  if (errors.length > 0) {
    const errorList = errors.map(e => `  - ${e}`).join('\n');
    throw new Error(t('validate:translationFailed', { errors: errorList }));
  }
}

/**
 * Generate installation summary
 */
export async function generateSummary(
  projectPath: string,
  aiContextOptions?: AiContextOptions
): Promise<{
  directories: number;
  files: number;
  aiContextFiles: string[];
  languages: string[];
}> {
  let directories = 0;
  let files = 0;

  const countItems = async (dirPath: string): Promise<void> => {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      for (const item of items) {
        if (item.name.startsWith('.') && !item.name.startsWith('.cursor') && !item.name.startsWith('.claude')) {
          continue;
        }
        if (item.name === 'node_modules' || item.name === '.git') {
          continue;
        }

        const itemPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
          directories++;
          await countItems(itemPath);
        } else {
          files++;
        }
      }
    } catch {
      // Ignore permission errors
    }
  };

  await countItems(projectPath);

  const aiContextFiles = aiContextOptions
    ? listEnabledAiFiles(aiContextOptions)
    : [];

  const languages: string[] = [];
  if (aiContextOptions?.language === 'ko' || aiContextOptions?.language === 'both') {
    languages.push('ko');
  }
  if (aiContextOptions?.language === 'en' || aiContextOptions?.language === 'both') {
    languages.push('en');
  }

  return {
    directories,
    files,
    aiContextFiles,
    languages,
  };
}

/**
 * Display installation summary
 */
export function displaySummary(summary: {
  directories: number;
  files: number;
  aiContextFiles: string[];
  languages: string[];
}): void {
  console.log(chalk.cyan('\nSummary:'));
  console.log(chalk.white(`  Directories: ${summary.directories}`));
  console.log(chalk.white(`  Files: ${summary.files}`));

  if (summary.aiContextFiles.length > 0) {
    console.log(chalk.white(`  AI Context: ${summary.aiContextFiles.join(', ')}`));
  } else {
    console.log(chalk.gray(`  AI Context: None`));
  }

  if (summary.languages.length > 0) {
    console.log(chalk.white(`  Languages: ${summary.languages.join(', ')}`));
  }
}

/**
 * Display next steps with customized guidance
 */
export function displayNextSteps(
  projectPath: string,
  aiContextOptions?: AiContextOptions
): void {
  const relativePath = path.relative(process.cwd(), projectPath);
  const displayPath = relativePath || path.basename(projectPath);

  const packageManager = detectPackageManager();
  const devCommand = packageManager === 'npm' ? 'npm run dev' : `${packageManager} dev`;
  console.log(chalk.cyan(`\nNext Steps:`));
  console.log(chalk.white(`  cd ${displayPath}`));
  console.log(chalk.white(`  ${packageManager} install`));
  console.log(chalk.white(`  ${devCommand}`));

  if (aiContextOptions?.claudeSkills) {
    console.log(chalk.cyan(`\n${t('display:claudeSkillsEnabled')}`));
    console.log(chalk.white(t('display:claudeSkillsHint')));
  }

  if (aiContextOptions?.language === 'both') {
    console.log(chalk.cyan(`\n${t('display:bilingualMode')}`));
    console.log(chalk.white(t('display:bilingualHint')));
  }
}
