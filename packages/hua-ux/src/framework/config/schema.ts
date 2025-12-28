/**
 * @hua-labs/hua-ux/framework - Config Schema
 * 
 * Configuration schema and validation
 */

import type { HuaUxConfig } from '../types';

/**
 * Default configuration
 * 
 * Preset을 사용하지 않을 때의 기본값입니다.
 * Preset을 사용하면 이 값은 무시되고 Preset 값이 사용됩니다.
 */
export const defaultConfig: Required<Omit<HuaUxConfig, 'branding'>> & { branding?: HuaUxConfig['branding'] } = {
  preset: 'product',  // 기본 Preset
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
 * 
 * 설정의 유효성을 검증하고 친절한 에러 메시지를 제공합니다.
 * Validates configuration and provides friendly error messages.
 */
export function validateConfig(config: Partial<HuaUxConfig>): HuaUxConfig {
  // Preset 검증
  if (config.preset && !['product', 'marketing'].includes(config.preset)) {
    throw new Error(
      `[hua-ux] ❌ 잘못된 Preset입니다: "${config.preset}"\n` +
      `[hua-ux] ❌ Invalid preset: "${config.preset}"\n\n` +
      `사용 가능한 Preset: 'product', 'marketing'\n` +
      `Available presets: 'product', 'marketing'\n\n` +
      `💡 해결 방법 / Solution:\n` +
      `   - 'product' 또는 'marketing' 중 하나를 선택하세요.\n` +
      `   - Select either 'product' or 'marketing'.\n` +
      `   - 커스텀 설정이 필요하면 preset 필드를 생략하고 모든 설정을 직접 지정하세요.\n` +
      `   - For custom configuration, omit the preset field and specify all settings manually.\n\n` +
      `📖 가이드 / Guide: https://github.com/HUA-Labs/hua-platform/tree/main/packages/hua-ux/docs`
    );
  }

  // 기본값과 병합
  const validated: HuaUxConfig = {
    preset: config.preset || defaultConfig.preset,
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
        `[hua-ux] ❌ i18n 설정 오류 / i18n configuration error\n\n` +
        `기본 언어 "${validated.i18n.defaultLanguage}"가 지원 언어 목록에 없습니다.\n` +
        `Default language "${validated.i18n.defaultLanguage}" is not in supportedLanguages.\n\n` +
        `현재 지원 언어 / Current supported languages: ${validated.i18n.supportedLanguages.join(', ')}\n\n` +
        `💡 해결 방법 / Solution:\n` +
        `   1. supportedLanguages에 "${validated.i18n.defaultLanguage}"를 추가하세요.\n` +
        `      Add "${validated.i18n.defaultLanguage}" to supportedLanguages.\n` +
        `   2. 또는 defaultLanguage를 지원 언어 중 하나로 변경하세요.\n` +
        `      Or change defaultLanguage to one of the supported languages.\n\n` +
        `📝 예시 / Example:\n` +
        `   i18n: {\n` +
        `     defaultLanguage: 'ko',\n` +
        `     supportedLanguages: ['ko', 'en', 'ja'],  // 'ko' 포함 필수\n` +
        `   }\n\n` +
        `📖 가이드 / Guide: https://github.com/HUA-Labs/hua-platform/tree/main/packages/hua-ux/docs`
      );
    }
  }

  return validated;
}
