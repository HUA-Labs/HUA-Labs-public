/**
 * @hua-labs/hua-ux/framework - File Structure Validation
 * 
 * Validates project file structure according to framework conventions
 */

import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Expected directory structure
 */
const REQUIRED_DIRS = [
  'app',
  'components',
  'lib',
] as const;

const OPTIONAL_DIRS = [
  'hooks',
  'store',
  'translations',
] as const;

/**
 * File structure validation result
 */
export interface FileStructureResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validate project file structure
 * 
 * @example
 * ```ts
 * const result = validateFileStructure(process.cwd());
 * if (!result.valid) {
 *   console.error('Missing directories:', result.missing);
 * }
 * ```
 */
export function validateFileStructure(projectRoot: string): FileStructureResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required directories
  for (const dir of REQUIRED_DIRS) {
    const dirPath = join(projectRoot, dir);
    if (!existsSync(dirPath)) {
      missing.push(dir);
    }
  }

  // Check optional directories (warnings only)
  for (const dir of OPTIONAL_DIRS) {
    const dirPath = join(projectRoot, dir);
    if (!existsSync(dirPath)) {
      warnings.push(`Optional directory "${dir}" not found`);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}
