/**
 * create-hua - Doctor Command
 *
 * Diagnoses project health and provides solutions
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { checkPrerequisites, validateTranslationFiles } from './utils';
import {
  MIN_NODE_VERSION,
  AI_CONTEXT_FILES,
  compareVersions,
  t,
} from './shared';

/**
 * Diagnose project health
 */
export async function diagnoseProject(projectPath: string): Promise<{
  healthy: boolean;
  issues: Array<{ type: 'error' | 'warning' | 'info'; message: string; solution?: string }>;
}> {
  const issues: Array<{ type: 'error' | 'warning' | 'info'; message: string; solution?: string }> = [];

  // Check if project directory exists
  if (!(await fs.pathExists(projectPath))) {
    return {
      healthy: false,
      issues: [{
        type: 'error',
        message: t('doctor:dirNotFound', { path: projectPath }),
        solution: t('doctor:dirNotFoundSolution'),
      }],
    };
  }

  // Check package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (!(await fs.pathExists(packageJsonPath))) {
    issues.push({
      type: 'error',
      message: t('doctor:packageJsonNotFound'),
      solution: t('doctor:packageJsonNotFoundSolution'),
    });
  } else {
    try {
      const packageJson = await fs.readJSON(packageJsonPath);

      if (!packageJson.dependencies?.['@hua-labs/hua']) {
        issues.push({
          type: 'error',
          message: t('doctor:huaDepMissing'),
          solution: t('doctor:huaDepMissingSolution'),
        });
      }
    } catch (error) {
      issues.push({
        type: 'error',
        message: t('doctor:packageJsonParseFailed', { error: error instanceof Error ? error.message : String(error) }),
      });
    }
  }

  // Check hua.config.ts
  const configPath = path.join(projectPath, 'hua.config.ts');
  if (!(await fs.pathExists(configPath))) {
    issues.push({
      type: 'error',
      message: t('doctor:configNotFound'),
      solution: t('doctor:configNotFoundSolution'),
    });
  }

  // Check required directories
  const requiredDirs = ['app', 'lib', 'store', 'translations'];
  for (const dir of requiredDirs) {
    const dirPath = path.join(projectPath, dir);
    if (!(await fs.pathExists(dirPath))) {
      issues.push({
        type: 'warning',
        message: t('doctor:dirMissing', { dir }),
        solution: t('doctor:dirMissingSolution'),
      });
    }
  }

  // Check app/layout.tsx exists
  const layoutPath = path.join(projectPath, 'app/layout.tsx');
  if (!(await fs.pathExists(layoutPath))) {
    issues.push({
      type: 'error',
      message: t('doctor:layoutNotFound'),
      solution: t('doctor:layoutNotFoundSolution'),
    });
  } else {
    // Check HuaProvider usage in layout
    try {
      const layoutContent = await fs.readFile(layoutPath, 'utf-8');
      if (!layoutContent.includes('HuaProvider')) {
        issues.push({
          type: 'warning',
          message: t('doctor:huaProviderMissing'),
          solution: t('doctor:huaProviderMissingSolution'),
        });
      }
    } catch {
      // Ignore read errors
    }
  }

  // Check app/page.tsx exists
  const pagePath = path.join(projectPath, 'app/page.tsx');
  if (!(await fs.pathExists(pagePath))) {
    issues.push({
      type: 'warning',
      message: t('doctor:pageNotFound'),
      solution: t('doctor:pageNotFoundSolution'),
    });
  }

  // Check globals.css for hua theme import
  const globalsCssPath = path.join(projectPath, 'app/globals.css');
  if (await fs.pathExists(globalsCssPath)) {
    try {
      const cssContent = await fs.readFile(globalsCssPath, 'utf-8');
      if (!cssContent.includes('recommended-theme') && !cssContent.includes('@hua-labs/hua')) {
        issues.push({
          type: 'warning',
          message: t('doctor:cssNoTheme'),
          solution: t('doctor:cssNoThemeSolution'),
        });
      }
    } catch {
      // Ignore read errors
    }
  }

  // Check translation files
  try {
    await validateTranslationFiles(projectPath);
  } catch (error) {
    issues.push({
      type: 'error',
      message: t('doctor:translationFailed', { error: error instanceof Error ? error.message : String(error) }),
      solution: t('doctor:translationFailedSolution'),
    });
  }

  // Check Node.js and pnpm
  try {
    const nodeVersion = process.version;
    if (compareVersions(nodeVersion, MIN_NODE_VERSION) < 0) {
      issues.push({
        type: 'warning',
        message: t('doctor:nodeVersionWarning', { min: MIN_NODE_VERSION, current: nodeVersion }),
        solution: t('doctor:nodeVersionWarningSolution'),
      });
    }
  } catch {
    // Ignore
  }

  try {
    execSync('pnpm --version', { stdio: 'ignore' });
  } catch {
    issues.push({
      type: 'warning',
      message: t('doctor:pnpmNotFound'),
      solution: t('doctor:pnpmNotFoundSolution'),
    });
  }

  // Report AI context file status
  const aiFileStatus: string[] = [];
  for (const entry of AI_CONTEXT_FILES) {
    for (const p of entry.paths) {
      const fullPath = path.join(projectPath, p);
      if (await fs.pathExists(fullPath)) {
        aiFileStatus.push(entry.label);
      }
    }
  }
  if (aiFileStatus.length > 0) {
    issues.push({
      type: 'info',
      message: t('doctor:aiFilesPresent', { files: aiFileStatus.join(', ') }),
    });
  } else {
    issues.push({
      type: 'info',
      message: t('doctor:aiFilesNone'),
    });
  }

  return {
    healthy: issues.filter(i => i.type === 'error').length === 0,
    issues,
  };
}

/**
 * Run doctor command
 */
export async function runDoctor(projectPath: string): Promise<void> {
  console.log(chalk.blue(`\nDiagnosing project: ${projectPath}\n`));

  try {
    // Check prerequisites
    console.log(chalk.blue('Checking prerequisites...'));
    try {
      await checkPrerequisites();
      console.log(chalk.green('  Prerequisites OK'));
    } catch {
      console.log(chalk.yellow('  Prerequisites check failed (non-critical)'));
    }

    // Diagnose project
    console.log(chalk.blue('\nDiagnosing project structure...'));
    const diagnosis = await diagnoseProject(projectPath);

    if (diagnosis.healthy && diagnosis.issues.filter(i => i.type !== 'info').length === 0) {
      console.log(chalk.green('\nProject is healthy! No issues found.'));
    }

    // Display issues
    const errors = diagnosis.issues.filter(i => i.type === 'error');
    const warnings = diagnosis.issues.filter(i => i.type === 'warning');
    const infos = diagnosis.issues.filter(i => i.type === 'info');

    if (errors.length > 0) {
      console.log(chalk.red(`\nFound ${errors.length} error(s):`));
      errors.forEach((issue, index) => {
        console.log(chalk.red(`  ${index + 1}. ${issue.message}`));
        if (issue.solution) {
          console.log(chalk.yellow(`     -> ${issue.solution}`));
        }
      });
    }

    if (warnings.length > 0) {
      console.log(chalk.yellow(`\nFound ${warnings.length} warning(s):`));
      warnings.forEach((issue, index) => {
        console.log(chalk.yellow(`  ${index + 1}. ${issue.message}`));
        if (issue.solution) {
          console.log(chalk.cyan(`     -> ${issue.solution}`));
        }
      });
    }

    if (infos.length > 0) {
      console.log(chalk.blue(`\nInfo:`));
      infos.forEach((issue) => {
        console.log(chalk.gray(`  - ${issue.message}`));
      });
    }

    if (!diagnosis.healthy) {
      console.log(chalk.red('\nProject has critical issues that need to be fixed.'));
      process.exit(1);
    } else if (warnings.length > 0) {
      console.log(chalk.yellow('\nProject has warnings but should work.'));
    }
  } catch (error) {
    console.error(chalk.red('\nDoctor command failed:'));
    console.error(error);
    process.exit(1);
  }
}
