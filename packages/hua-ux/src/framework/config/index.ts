/**
 * @hua-labs/hua-ux/framework - Config System
 * 
 * Configuration loading and management
 */

import type { HuaUxConfig, Preset } from '../types';
import { defaultConfig, validateConfig } from './schema';
import { mergePresetWithConfig, createConfigFromUserConfig } from './merge';

/**
 * Global config cache
 */
let cachedConfig: HuaUxConfig | null = null;

/**
 * 프레임워크 설정 정의 / Define framework configuration
 * 
 * IntelliSense를 완벽히 지원하는 설정 함수입니다.
 * Provides full IntelliSense support for configuration options.
 * 
 * 모든 옵션은 선택사항이며 기본값 또는 Preset과 병합됩니다.
 * All options are optional and will be merged with defaults or Preset.
 * 
 * **Zero-Config**: 설정 파일이 없어도 기본값으로 동작합니다.
 * **Zero-Config**: Works with defaults even without a config file.
 * 
 * **Preset 우선**: `preset: 'product'`만 지정해도 대부분의 설정이 자동 적용됩니다.
 * **Preset First**: Just specify `preset: 'product'` and most settings are auto-applied.
 * 
 * **바이브 코딩 친화적**: AI가 이해하기 쉬운 한글 주석과 명사 중심 설정
 * **Vibe Coding Friendly**: Korean comments and noun-centered settings for AI understanding
 * 
 * @param config - 설정 객체 / Configuration object
 * @param config.preset - 사용할 프리셋 / Preset to use
 *   - **바이브 모드 (간단) / Vibe mode (simple)**: `'product' | 'marketing'`
 *     - 'product': 제품 페이지용 (전문적, 효율적, 기본값) / Product pages (professional, efficient, default)
 *     - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는) / Marketing pages (dramatic, eye-catching)
 *   - **개발자 모드 (세부 설정) / Developer mode (detailed)**: `{ type: 'product' | 'marketing', motion?: {...}, spacing?: {...} }`
 *     - 세부 설정을 포함한 Preset 객체 / Preset object with detailed settings
 *   - Preset을 선택하면 motion, spacing, i18n 등이 자동 설정됩니다.
 *   - Selecting a preset automatically configures motion, spacing, i18n, etc.
 * @param config.i18n - 다국어 설정 / Internationalization settings
 * @param config.i18n.defaultLanguage - 기본 언어 코드 (예: 'ko', 'en') / Default language code (e.g., 'ko', 'en')
 * @param config.i18n.supportedLanguages - 지원하는 언어 코드 배열 / Array of supported language codes
 * @param config.i18n.namespaces - 로드할 번역 네임스페이스 / Translation namespaces to load
 * @param config.i18n.translationLoader - 번역 로딩 전략 ('static' | 'api') / Translation loading strategy
 * @param config.i18n.translationApiPath - 번역 API 경로 ('api' 로더 사용 시) / API path for translations
 * @param config.motion - 모션/애니메이션 설정 / Motion/animation settings
 * @param config.motion.style - 모션 스타일 (바이브 코더용) / Motion style (for vibe coders)
 *   - 'smooth': 부드러운 전환 / Smooth transitions
 *   - 'dramatic': 드라마틱한 전환 / Dramatic transitions
 *   - 'minimal': 최소한의 전환 / Minimal transitions
 * @param config.motion.defaultPreset - 기본 모션 프리셋 (개발자용) / Default motion preset (for developers)
 *   - 'product': 빠른 전환, 최소 딜레이 / Fast transitions, minimal delay
 *   - 'marketing': 느린 전환, 긴 딜레이 / Slow transitions, long delay
 * @param config.motion.enableAnimations - 전역 애니메이션 활성화 여부 / Enable animations globally
 * @param config.motion.duration - 애니메이션 지속 시간 (밀리초, 개발자용) / Animation duration in milliseconds (for developers)
 * @param config.motion.easing - 애니메이션 이징 함수 (개발자용) / Animation easing function (for developers)
 * @param config.state - 상태 관리 설정 / State management settings
 * @param config.state.persist - localStorage 영속성 활성화 여부 / Enable localStorage persistence
 * @param config.state.ssr - SSR 지원 활성화 여부 / Enable SSR support
 * @param config.branding - 브랜딩 설정 (화이트 라벨링) / Branding settings (white labeling)
 * @param config.branding.name - 회사/서비스 이름 / Company/service name
 * @param config.branding.logo - 로고 경로 / Logo path
 * @param config.branding.colors - 색상 팔레트 (primary, secondary, accent 등) / Color palette
 * @param config.branding.typography - 타이포그래피 설정 (fontFamily, fontSize 등) / Typography settings
 * 
 * @returns 검증된 설정 객체 / Validated configuration object
 * 
 * @example
 * ```ts
 * // 최소 설정 (Preset만) - 바이브 코더용
 * // hua-ux.config.ts
 * import { defineConfig } from '@hua-labs/hua-ux/framework';
 * 
 * export default defineConfig({
 *   preset: 'product',  // 끝! 나머지는 자동 설정
 * });
 * ```
 * 
 * @example
 * ```ts
 * // Preset + 일부 커스터마이징
 * export default defineConfig({
 *   preset: 'product',
 *   i18n: {
 *     supportedLanguages: ['ko', 'en', 'ja'],  // 언어만 추가
 *   },
 * });
 * ```
 * 
 * @example
 * ```ts
 * // 개발자 모드: Preset 객체 형태 (세부 설정)
 * export default defineConfig({
 *   preset: {
 *     type: 'product',
 *     motion: { duration: 300 },
 *     spacing: { default: 'md' },
 *   },
 * });
 * ```
 * 
 * @example
 * ```ts
 * // 바이브 코더용: motion.style 사용
 * export default defineConfig({
 *   preset: 'product',
 *   motion: {
 *     style: 'smooth',  // 명사 중심, 이해하기 쉬움
 *   },
 * });
 * ```
 * 
 * @example
 * ```ts
 * // 완전 커스터마이징 (Preset 없이) - 전통 개발자용
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
  // Preset이 지정된 경우 Preset과 병합
  if (config.preset) {
    const { preset, ...userConfig } = config;
    const merged = mergePresetWithConfig(preset, userConfig);
    return validateConfig(merged);
  }

  // Preset이 없는 경우 사용자 설정만 사용
  const merged = createConfigFromUserConfig(config);
  return validateConfig(merged);
}

/**
 * Load configuration from file
 * 
 * 동적으로 설정 파일을 로드합니다.
 * 
 * **로드 순서**:
 * 1. `hua-ux.config.ts` 시도 (TypeScript)
 * 2. `hua-ux.config.js` 시도 (JavaScript)
 * 3. 없으면 기본값 (product preset)
 * 
 * **Zero-Config**: 설정 파일이 없어도 기본값으로 동작합니다.
 * 
 * **주의**: 이 함수는 Node.js 환경(빌드 타임)에서만 동작합니다.
 * 런타임에서는 캐시된 설정을 사용합니다.
 */
export function loadConfig(): HuaUxConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  // Node.js 환경에서만 동적 로드 시도
  if (typeof process !== 'undefined' && process.cwd) {
    try {
      const fs = require('fs');
      const path = require('path');
      const projectRoot = process.cwd();

      // 설정 파일 경로 후보
      const configPaths = [
        path.join(projectRoot, 'hua-ux.config.ts'),
        path.join(projectRoot, 'hua-ux.config.js'),
        path.join(projectRoot, 'hua-ux.config.mjs'),
      ];

      // 첫 번째로 발견된 설정 파일 사용
      for (const configPath of configPaths) {
        if (fs.existsSync(configPath)) {
          try {
            // 동적 require (TypeScript는 컴파일된 .js 파일 필요)
            // 실제로는 Next.js 빌드 과정에서 처리됨
            const configModule = require(configPath);
            const userConfig = configModule.default || configModule;
            
            // Preset 병합 처리
            if (userConfig && typeof userConfig === 'object') {
              if (userConfig.preset) {
                const { preset, ...rest } = userConfig;
                cachedConfig = mergePresetWithConfig(preset, rest);
              } else {
                cachedConfig = createConfigFromUserConfig(userConfig);
              }
              
              cachedConfig = validateConfig(cachedConfig);
              return cachedConfig;
            }
          } catch (requireError) {
            // require 실패 (TypeScript 파일 등)
            // 기본값 사용
            break;
          }
        }
      }
    } catch (error) {
      // fs, path 등이 없는 환경 (브라우저, Edge Runtime 등)
      // 기본값 사용
    }
  }

  // 기본값 (product preset)
  // 설정 파일이 없거나 로드 실패 시
  cachedConfig = mergePresetWithConfig('product', {});
  return cachedConfig;
}

/**
 * Get current configuration
 * 
 * 캐시된 설정을 반환하거나, 없으면 로드합니다.
 */
export function getConfig(): HuaUxConfig {
  return cachedConfig || loadConfig();
}

/**
 * Set configuration (for testing or manual override)
 * 
 * 테스트나 수동 오버라이드를 위한 설정 설정 함수
 */
export function setConfig(config: HuaUxConfig): void {
  cachedConfig = validateConfig(config);
}

/**
 * Reset configuration cache
 * 
 * 설정 캐시를 초기화합니다. (주로 테스트용)
 */
export function resetConfig(): void {
  cachedConfig = null;
}
