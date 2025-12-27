/**
 * @hua-labs/hua-ux/framework - Config Schema
 * 
 * Configuration schema and validation
 */

import type { HuaUxConfig } from '../types';

/**
 * Default configuration
 */
export const defaultConfig: Required<HuaUxConfig> = {
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    fallbackLanguage: 'en',
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
  fileStructure: {
    enforce: false,
  },
};

/**
 * Validate configuration
 */
export function validateConfig(config: Partial<HuaUxConfig>): HuaUxConfig {
  const validated: HuaUxConfig = {
    i18n: {
      ...defaultConfig.i18n,
      ...config.i18n,
    },
    motion: {
      ...defaultConfig.motion,
      ...config.motion,
    },
    state: {
      ...defaultConfig.state,
      ...config.state,
    },
    fileStructure: {
      ...defaultConfig.fileStructure,
      ...config.fileStructure,
    },
  };

  // Validate i18n
  if (validated.i18n) {
    if (!validated.i18n.supportedLanguages.includes(validated.i18n.defaultLanguage)) {
      throw new Error(
        `Default language "${validated.i18n.defaultLanguage}" must be in supportedLanguages: ${validated.i18n.supportedLanguages.join(', ')}`
      );
    }
  }

  return validated;
}
