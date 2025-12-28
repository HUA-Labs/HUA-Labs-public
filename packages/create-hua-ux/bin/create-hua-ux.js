#!/usr/bin/env node

/**
 * create-hua-ux CLI
 * 
 * Scaffolding tool for creating hua-ux projects
 * 
 * For local development, use: npx tsx src/index.ts <project-name>
 * For production, this will use compiled JavaScript
 */

// Simple wrapper - in production, this would load compiled JS
// For now, direct users to use tsx for local development
const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: create-hua-ux <project-name>');
  console.error('\nFor local development, use:');
  console.error('  npx tsx src/index.ts <project-name>');
  process.exit(1);
}

console.error('Note: For local development, use:');
console.error(`  npx tsx src/index.ts ${projectName}`);
console.error('\nOr install tsx globally:');
console.error('  pnpm add -g tsx');
console.error(`  tsx src/index.ts ${projectName}`);
process.exit(1);
