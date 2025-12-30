/**
 * Test script for create-hua-ux CLI
 * 
 * Creates a test project with all options enabled
 */

import { createProject } from './src/create-project';
import type { AiContextOptions } from './src/utils';

const testOptions: AiContextOptions = {
  cursorrules: true,
  aiContext: true,
  claudeContext: true,
  claudeSkills: true,
  language: 'both',
};

async function test() {
  const projectName = 'test-ux-install';
  console.log(`Creating test project: ${projectName}`);
  console.log('Options:', testOptions);
  
  try {
    await createProject(projectName, testOptions);
    console.log('\n✅ Test project created successfully!');
    console.log('\nNext steps:');
    console.log(`  cd ${projectName}`);
    console.log('  pnpm install');
    console.log('  pnpm dev');
  } catch (error) {
    console.error('❌ Error creating test project:', error);
    process.exit(1);
  }
}

test();
