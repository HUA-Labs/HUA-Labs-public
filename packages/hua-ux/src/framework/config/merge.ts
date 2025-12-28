/**
 * @hua-labs/hua-ux/framework - Config Merge
 * 
 * Preset 병합 및 깊은 병합 로직
 */

import type { HuaUxConfig } from '../types';
import { productPreset } from '../../presets/product';
import { marketingPreset } from '../../presets/marketing';

/**
 * Preset 타입
 */
export type PresetName = 'product' | 'marketing';

/**
 * Preset 맵
 */
const PRESET_MAP: Record<PresetName, any> = {
  product: productPreset,
  marketing: marketingPreset,
};

/**
 * 깊은 병합 (Deep Merge)
 * 
 * 중첩된 객체를 재귀적으로 병합합니다.
 * 사용자 설정이 Preset 설정보다 우선합니다.
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] === undefined) {
      // undefined는 병합에서 제외 (사용자가 명시적으로 끄려는 경우)
      continue;
    }

    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      // 중첩 객체는 재귀적으로 병합
      result[key] = deepMerge(target[key], source[key] as Partial<T[Extract<keyof T, string>]>);
    } else {
      // 배열이나 원시값은 그대로 덮어쓰기
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }

  return result;
}

/**
 * Preset에서 Config로 변환
 * 
 * Preset의 구조를 HuaUxConfig 형식으로 변환합니다.
 */
function presetToConfig(preset: typeof productPreset | typeof marketingPreset): Partial<HuaUxConfig> {
  return {
    motion: {
      defaultPreset: preset === productPreset ? 'product' : 'marketing',
      enableAnimations: true,
    },
    i18n: {
      defaultLanguage: preset.i18n.defaultLanguage,
      supportedLanguages: [...preset.i18n.supportedLanguages],
    },
    // Preset의 spacing은 나중에 컴포넌트에서 사용
    // Config에는 직접 포함하지 않음 (컴포넌트가 PresetContext에서 가져옴)
  };
}

/**
 * Preset과 사용자 설정 병합
 * 
 * 1. Preset 기본값 로드
 * 2. 사용자 설정으로 병합 (사용자 설정 우선)
 * 3. 최종 검증
 * 
 * @param presetName - 사용할 Preset 이름
 * @param userConfig - 사용자 설정 (선택적)
 * @returns 병합된 설정
 */
export function mergePresetWithConfig(
  presetName: PresetName,
  userConfig?: Partial<HuaUxConfig>
): HuaUxConfig {
  // 1. Preset 로드
  const preset = PRESET_MAP[presetName];
  if (!preset) {
    throw new Error(
      `Unknown preset: "${presetName}". Available presets: ${Object.keys(PRESET_MAP).join(', ')}`
    );
  }

  // 2. Preset을 Config 형식으로 변환
  const presetConfig = presetToConfig(preset);

  // 3. 사용자 설정과 병합 (사용자 설정 우선)
  const merged = userConfig
    ? deepMerge(presetConfig, userConfig)
    : presetConfig;

  // 4. 최종 Config 형식으로 변환 (필수 필드 보장)
  return {
    ...presetConfig,
    ...merged,
    // i18n은 항상 있어야 함 (Preset에서 제공)
    i18n: merged.i18n || presetConfig.i18n,
    // motion은 항상 있어야 함
    motion: merged.motion || presetConfig.motion,
    // state는 기본값 사용
    state: merged.state || {
      persist: true,
      ssr: true,
    },
    // fileStructure는 기본값 사용
    fileStructure: merged.fileStructure || {
      enforce: false,
    },
  } as HuaUxConfig;
}

/**
 * Preset 없이 사용자 설정만으로 Config 생성
 * 
 * Preset을 사용하지 않고 모든 설정을 직접 지정하는 경우
 */
export function createConfigFromUserConfig(
  userConfig: Partial<HuaUxConfig>
): HuaUxConfig {
  // 기본값과 사용자 설정 병합
  const defaultConfig: Partial<HuaUxConfig> = {
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

  return deepMerge(defaultConfig, userConfig) as HuaUxConfig;
}
