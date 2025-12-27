/**
 * create-hua-ux - Project Creation
 * 
 * Creates a new hua-ux project from template
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { copyTemplate, generatePackageJson, generateConfig } from './utils';

export async function createProject(projectName: string): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (await fs.pathExists(projectPath)) {
    console.error(chalk.red(`Directory "${projectName}" already exists`));
    process.exit(1);
  }

  console.log(chalk.blue(`Creating hua-ux project: ${projectName}...`));

  try {
    // Create project directory
    await fs.ensureDir(projectPath);

    // Copy template files
    await copyTemplate(projectPath);

    // Generate package.json
    await generatePackageJson(projectPath, projectName);

    // Generate hua-ux.config.ts
    await generateConfig(projectPath);

    console.log(chalk.green(`\n✅ Project created successfully!`));
    console.log(chalk.cyan(`\nNext steps:`));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  pnpm install`));
    console.log(chalk.white(`  pnpm dev`));
  } catch (error) {
    // Cleanup on error
    await fs.remove(projectPath);
    throw error;
  }
}
