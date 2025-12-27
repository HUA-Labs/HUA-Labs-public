/**
 * @hua-labs/hua-ux/framework - Config System
 * 
 * Configuration loading and management
 */

import type { HuaUxConfig } from '../types';
import { defaultConfig, validateConfig } from './schema';

/**
 * Global config cache
 */
let cachedConfig: HuaUxConfig | null = null;

/**
 * Define framework configuration
 * 
 * Provides full IntelliSense support for configuration options.
 * All options are optional and will be merged with defaults.
 * 
 * @param config - Configuration object
 * @param config.i18n - Internationalization settings
 * @param config.i18n.defaultLanguage - Default language code (e.g., 'ko', 'en')
 * @param config.i18n.supportedLanguages - Array of supported language codes
 * @param config.i18n.namespaces - Translation namespaces to load
 * @param config.i18n.translationLoader - Translation loading strategy ('static' | 'api')
 * @param config.i18n.translationApiPath - API path for translations (if using 'api' loader)
 * @param config.motion - Motion/animation settings
 * @param config.motion.defaultPreset - Default motion preset ('product' | 'marketing')
 * @param config.motion.enableAnimations - Enable animations globally
 * @param config.state - State management settings
 * @param config.state.persist - Enable localStorage persistence
 * @param config.state.ssr - Enable SSR support
 * 
 * @returns Validated configuration object
 * 
 * @example
 * ```ts
 * // hua-ux.config.ts
 * import { defineConfig } from '@hua-labs/hua-ux/framework';
 * 
 * export default defineConfig({
 *   i18n: {
 *     defaultLanguage: 'ko',
 *     supportedLanguages: ['ko', 'en'],
 *     namespaces: ['common'],
 *     translationLoader: 'api',
 *     translationApiPath: '/api/translations',
 *   },
 *   motion: {
 *     defaultPreset: 'product',
 *     enableAnimations: true,
 *   },
 *   state: {
 *     persist: true,
 *     ssr: true,
 *   },
 * });
 * ```
 */
export function defineConfig(config: Partial<HuaUxConfig>): HuaUxConfig {
  return validateConfig(config);
}

/**
 * Load configuration from file
 * 
 * Attempts to load from hua-ux.config.ts or hua-ux.config.js
 */
export function loadConfig(): HuaUxConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    // Try to load from config file
    // In a real implementation, this would use dynamic import
    // For now, return default config
    cachedConfig = defaultConfig;
    return cachedConfig;
  } catch (error) {
    console.warn('Failed to load hua-ux.config.ts, using defaults:', error);
    cachedConfig = defaultConfig;
    return cachedConfig;
  }
}

/**
 * Get current configuration
 */
export function getConfig(): HuaUxConfig {
  return cachedConfig || loadConfig();
}

/**
 * Set configuration (for testing or manual override)
 */
export function setConfig(config: HuaUxConfig): void {
  cachedConfig = validateConfig(config);
}
