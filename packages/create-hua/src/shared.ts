/**
 * create-hua - Shared Utilities
 *
 * Common functions used across multiple modules.
 * Single source of truth for version checks, i18n, and validation.
 */

import { type MessageKey, MESSAGES_EN, MESSAGES_BI } from './messages';

export type { MessageKey };

/**
 * Minimum required Node.js version
 */
export const MIN_NODE_VERSION = '22.0.0';

/**
 * AI context file definitions
 *
 * Maps option keys to their file/directory paths in the generated project.
 */
export const AI_CONTEXT_FILES: Array<{
  key: keyof AiContextOptionFlags;
  label: string;
  paths: string[];
}> = [
  { key: 'cursorRules', label: '.cursor/rules/', paths: ['.cursor'] },
  { key: 'aiContext', label: 'ai-context.md', paths: ['ai-context.md'] },
  { key: 'agentsMd', label: 'AGENTS.md', paths: ['AGENTS.md'] },
  { key: 'skillsMd', label: 'skills.md', paths: ['skills.md'] },
  { key: 'claudeContext', label: '.claude/project-context.md', paths: ['.claude/project-context.md'] },
  { key: 'claudeSkills', label: '.claude/skills/', paths: ['.claude/skills'] },
];

/**
 * Boolean flags from AiContextOptions (excludes `language`)
 */
export interface AiContextOptionFlags {
  cursorRules: boolean;
  aiContext: boolean;
  agentsMd: boolean;
  skillsMd: boolean;
  claudeContext: boolean;
  claudeSkills: boolean;
}

// ---------------------------------------------------------------------------
// Version helpers
// ---------------------------------------------------------------------------

/**
 * Parse a semver-ish version string into numeric parts.
 *
 * Strips leading `v` and any pre-release suffix so that
 * "v22.1.0-beta" → [22, 1, 0].
 */
export function parseVersion(v: string): number[] {
  return v
    .replace(/^v/, '')
    .replace(/-.*$/, '')
    .split('.')
    .map((s) => parseInt(s, 10) || 0);
}

/**
 * Compare two version strings.
 *
 * @returns  1 if v1 > v2, -1 if v1 < v2, 0 if equal
 */
export function compareVersions(v1: string, v2: string): number {
  const v1Parts = parseVersion(v1);
  const v2Parts = parseVersion(v2);

  for (let i = 0; i < 3; i++) {
    if ((v1Parts[i] ?? 0) > (v2Parts[i] ?? 0)) return 1;
    if ((v1Parts[i] ?? 0) < (v2Parts[i] ?? 0)) return -1;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// i18n helpers
// ---------------------------------------------------------------------------

/**
 * Check if English-only mode is enabled
 */
export function isEnglishOnly(): boolean {
  return (
    process.env.LANG === 'en' ||
    process.env.CLI_LANG === 'en' ||
    process.argv.includes('--english-only')
  );
}

/**
 * Get localized message with optional interpolation.
 *
 * @example
 *   t('doctor:dirNotFound', { path: '/foo' })
 *   // → "Project directory not found: /foo"
 */
export function t(key: MessageKey, params?: Record<string, string | number>): string {
  const table = isEnglishOnly() ? MESSAGES_EN : MESSAGES_BI;
  let msg = table[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      msg = msg.replaceAll(`{${k}}`, String(v));
    }
  }
  return msg;
}

// ---------------------------------------------------------------------------
// Interactive detection
// ---------------------------------------------------------------------------

/**
 * Check if running in interactive mode
 *
 * For PowerShell and other environments, we check:
 * 1. stdin/stdout are TTY (if available)
 * 2. Not in CI environment
 * 3. Not explicitly set to non-interactive
 * 4. stdin is readable (not piped)
 *
 * In PowerShell, isTTY might be undefined, so we use a more lenient check.
 */
export function isInteractive(): boolean {
  if (process.env.CI || process.env.NON_INTERACTIVE) {
    return false;
  }
  if (process.argv.includes('--non-interactive')) {
    return false;
  }

  const stdinTTY = process.stdin.isTTY;
  const stdoutTTY = process.stdout.isTTY;

  if (stdinTTY === false && stdoutTTY === false) {
    return false;
  }

  return stdinTTY !== false && stdoutTTY !== false;
}

// ---------------------------------------------------------------------------
// Project name validation
// ---------------------------------------------------------------------------

/**
 * Validate a project name against npm package naming conventions.
 */
export function validateProjectName(name: string): { valid: boolean; message?: string } {
  if (!name || !name.trim()) {
    return { valid: false, message: t('prompt:projectNameRequired') };
  }
  if (/[A-Z]/.test(name)) {
    return { valid: false, message: t('validate:invalidUppercase') };
  }
  if (/\s/.test(name)) {
    return { valid: false, message: t('validate:invalidSpaces') };
  }
  if (/^[._]/.test(name)) {
    return { valid: false, message: t('validate:invalidStartChar') };
  }
  if (!/^[a-z0-9@][a-z0-9._\/-]*$/.test(name)) {
    return { valid: false, message: t('validate:invalidChars') };
  }
  return { valid: true };
}

// ---------------------------------------------------------------------------
// AI context file listing helper
// ---------------------------------------------------------------------------

/**
 * Build a list of AI context file labels that are enabled in the given options.
 */
export function listEnabledAiFiles(opts: AiContextOptionFlags): string[] {
  return AI_CONTEXT_FILES
    .filter((entry) => opts[entry.key])
    .map((entry) => entry.label);
}
