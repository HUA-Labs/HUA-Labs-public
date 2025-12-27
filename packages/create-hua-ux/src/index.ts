/**
 * create-hua-ux - Main Logic
 * 
 * Project creation logic
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { createProject } from './create-project';
import { promptProjectName } from './utils';

export async function main() {
  const projectName = process.argv[2] || await promptProjectName();
  
  if (!projectName) {
    console.error('Project name is required');
    process.exit(1);
  }

  await createProject(projectName);
}

// Export for use in bin file
export { createProject };
