import { H as HuaConfig } from '../index-Cm8lkgIw.mjs';
export { P as PresetName } from '../index-Cm8lkgIw.mjs';
import 'react';

/**
 * @hua-labs/hua/framework - Config System (Client-safe)
 *
 * Client-safe configuration functions.
 * fs 모듈을 사용하지 않아 브라우저에서 안전하게 사용 가능합니다.
 */

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
 * @returns 검증된 설정 객체 / Validated configuration object
 *
 * @example
 * ```ts
 * // 최소 설정 (Preset만) - 바이브 코더용
 * // hua.config.ts
 * import { defineConfig } from '@hua-labs/hua/framework';
 *
 * export default defineConfig({
 *   preset: 'product',  // 끝! 나머지는 자동 설정
 * });
 * ```
 */
declare function defineConfig(config: Partial<HuaConfig>): HuaConfig;
/**
 * Get current configuration
 *
 * 캐시된 설정을 반환하거나, 없으면 기본값을 반환합니다.
 *
 * **클라이언트 안전**: 어디서든 안전하게 호출 가능합니다.
 * **Client Safe**: Safe to call anywhere.
 */
declare function getConfig(): HuaConfig;
/**
 * Set configuration (for testing or manual override)
 *
 * 테스트나 수동 오버라이드를 위한 설정 설정 함수
 */
declare function setConfig(config: HuaConfig): void;
/**
 * Reset configuration cache
 *
 * 설정 캐시를 초기화합니다. (주로 테스트용)
 */
declare function resetConfig(): void;

export { HuaConfig, defineConfig, getConfig, resetConfig, setConfig };
