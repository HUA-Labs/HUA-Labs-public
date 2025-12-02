/**
 * @hua-labs/i18n-core - 핵심 기능 전용 엔트리포인트
 * 
 * 이 모듈은 기본적인 번역 기능만 필요한 경우 사용합니다.
 * 플러그인, 고급 기능, 디버깅 도구 없이 순수한 번역 기능만 제공합니다.
 */

import React from 'react';
import { I18nProvider, useI18n } from './hooks/useI18n';
import { useTranslation, useLanguageChange } from './hooks/useTranslation';
import { Translator, ssrTranslate, serverTranslate } from './core/translator';
import { I18nConfig } from './types';

// Window 객체 타입 확장
declare global {
  interface Window {
    __I18N_DEBUG_MODE__?: boolean;
    __I18N_DEBUG_MISSING_KEYS__?: Record<string, string[]>;
    __I18N_DEBUG_ERRORS__?: Array<{
      timestamp: string;
      language: string;
      namespace: string;
      error: string;
      stack?: string;
    }>;
    __I18N_PERFORMANCE_DATA__?: Record<string, number[]>;
    __I18N_PERFORMANCE_ALERTS__?: Array<{
      id: string;
      type: 'warning' | 'error' | 'info';
      severity: 'low' | 'medium' | 'high' | 'critical';
      message: string;
      metric: string;
      value: number;
      threshold: number;
      timestamp: number;
      resolved: boolean;
    }>;
    __I18N_ANALYTICS_DATA__?: {
      missingKeys?: Set<string> | string[];
      performance?: {
        totalTime: number;
        averageTime: number;
        calls: number;
      };
      usage?: {
        keys?: Map<string, number> | Record<string, number>;
        languages?: Map<string, number> | Record<string, number>;
        namespaces?: Map<string, number> | Record<string, number>;
      };
      errors?: Array<{
        timestamp: number;
        error: string;
        context: string;
      }>;
    };
  }
}

// 기본 언어 설정
const defaultLanguages = [
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

/**
 * Create a Core I18n provider component configured for common translation loading and debug workflows.
 *
 * @param options - Configuration for the provider.
 * @param options.defaultLanguage - Language code used as the default (used when no language is selected).
 * @param options.fallbackLanguage - Language code used as a fallback when a translation is missing.
 * @param options.namespaces - List of translation namespaces to load by default.
 * @param options.debug - Enable debug behavior (logs, missing-key markers, and global missing-key collection).
 * @param options.loadTranslations - Custom loader function for translations when `translationLoader` is `'custom'`.
 * @param options.translationLoader - Strategy for loading translations: `'api'` (API route), `'static'` (static JSON files), or `'custom'`.
 * @param options.translationApiPath - Base API path for translation routes (used when `translationLoader` is `'api'`).
 * @param options.initialTranslations - SSR-provided translations in the shape { [language]: { [namespace]: { [key]: value } } }.
 * @param options.autoLanguageSync - When true, enables automatic language synchronization; default is false.
 * @returns A React provider component (CoreI18nProvider) that accepts `{ children }` and renders `I18nProvider` with the composed configuration.
 */
export function createCoreI18n(options?: {
  defaultLanguage?: string;
  fallbackLanguage?: string;
  namespaces?: string[];
  debug?: boolean;
  loadTranslations?: (language: string, namespace: string) => Promise<Record<string, string>>;
  /**
   * 번역 파일 로딩 방식 설정
   * - 'api': API route를 통해 동적 로드 (기본값, 권장)
   * - 'static': 정적 파일 경로에서 로드
   * - 'custom': loadTranslations 함수 사용
   */
  translationLoader?: 'api' | 'static' | 'custom';
  /**
   * API route 경로 (translationLoader가 'api'일 때 사용)
   * 기본값: '/api/translations'
   */
  translationApiPath?: string;
  /**
   * SSR에서 전달된 초기 번역 데이터 (네트워크 요청 없이 사용)
   * 형식: { [language]: { [namespace]: { [key]: value } } }
   */
  initialTranslations?: Record<string, Record<string, Record<string, string>>>;
  /**
   * 자동 언어 동기화 활성화 여부
   * 기본값: false (Zustand 어댑터 등 외부에서 직접 처리하는 경우)
   */
  autoLanguageSync?: boolean;
}) {
  const {
    defaultLanguage = 'ko',
    fallbackLanguage = 'en',
    namespaces = ['common'],
    debug = false,
    loadTranslations,
    translationLoader = 'api',
    translationApiPath = '/api/translations',
    initialTranslations,
    autoLanguageSync = false // 기본값 false (Zustand 어댑터 등 외부에서 직접 처리)
  } = options || {};

  // API route 기반 로더 (기본값, 권장)
  const apiRouteLoader = async (language: string, namespace: string) => {
    try {
      // 클라이언트 사이드에서만 동적 로드
      if (typeof window !== 'undefined') {
        const apiUrl = `${translationApiPath}/${language}/${namespace}`;
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (debug) {
            console.log(`✅ Loaded translation from API: ${language}/${namespace}`);
          }
          return data;
        } else if (response.status === 404) {
          if (debug) {
            console.warn(`⚠️ Translation not found in API: ${language}/${namespace}`);
          }
        }
      }
      
      // SSR 또는 API 실패 시 기본 번역 반환
      return getDefaultTranslations(language, namespace);
    } catch (error) {
      if (debug) {
        console.warn(`Failed to load translation from API: ${language}/${namespace}`, error);
      }
      return getDefaultTranslations(language, namespace);
    }
  };

  // 정적 파일 로더 (하위 호환성)
  const staticFileLoader = async (language: string, namespace: string) => {
    try {
      let data: Record<string, string> | null = null;
      
      // 클라이언트 사이드에서만 동적 로드 시도
      if (typeof window !== 'undefined') {
        const possiblePaths = [
          `/translations/${language}/${namespace}.json`,
          `../translations/${language}/${namespace}.json`,
          `./translations/${language}/${namespace}.json`,
          `translations/${language}/${namespace}.json`,
          `../../translations/${language}/${namespace}.json`,
        ];

        for (const path of possiblePaths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              data = await response.json();
              if (debug) {
                console.log(`✅ Loaded translation from static path: ${path}`);
              }
              break;
            }
          } catch (pathError) {
            continue;
          }
        }
      }

      if (data) {
        return data;
      }

      return getDefaultTranslations(language, namespace);
    } catch (error) {
      if (debug) {
        console.warn(`Failed to load translation file: ${language}/${namespace}.json`);
      }
      return getDefaultTranslations(language, namespace);
    }
  };

  // 기본 파일 로더 선택
  const defaultFileLoader = translationLoader === 'api' 
    ? apiRouteLoader 
    : translationLoader === 'static'
    ? staticFileLoader
    : loadTranslations || apiRouteLoader;

  const config: I18nConfig = {
    defaultLanguage,
    fallbackLanguage,
    supportedLanguages: defaultLanguages,
    namespaces,
    loadTranslations: translationLoader === 'custom' && loadTranslations 
      ? loadTranslations 
      : defaultFileLoader,
    initialTranslations, // SSR 번역 데이터 전달
    debug,
    missingKeyHandler: (key: string, language?: string, namespace?: string) => {
      if (debug) {
        console.warn(`Missing translation key: ${key}`);
        
        // Debug SDK와 연동하여 누락 키 추적
        if (typeof window !== 'undefined' && window.__I18N_DEBUG_MISSING_KEYS__) {
          const missingKeys = window.__I18N_DEBUG_MISSING_KEYS__;
          const keyPath = `${language || 'unknown'}:${namespace || 'unknown'}`;
          missingKeys[keyPath] = missingKeys[keyPath] || [];
          if (!missingKeys[keyPath].includes(key)) {
            missingKeys[keyPath].push(key);
          }
        }
        
        return `[MISSING: ${key}]`;
      }
      return key.split('.').pop() || key;
    },
    errorHandler: (error: unknown, language: string, namespace: string) => {
      if (debug) {
        console.error(`Translation error for ${language}:${namespace}:`, error);
      }
    },
    // autoLanguageSync는 기본적으로 false (Zustand 어댑터 등 외부에서 직접 처리하는 경우)
    // 필요시 options에서 명시적으로 true로 설정 가능
    autoLanguageSync: options?.autoLanguageSync ?? false
  };

  // Provider 컴포넌트 반환
  return function CoreI18nProvider({ children }: { children: React.ReactNode }) {
    return React.createElement(I18nProvider, { config, children });
  };
}

// 기본 번역 데이터는 공통 유틸리티에서 가져옴
import { getDefaultTranslations } from './utils/default-translations';

/**
 * Provides a minimal core i18n provider that wraps and renders the given children using default core configuration.
 *
 * @param children - React nodes to be rendered inside the provider
 * @returns A React element that supplies the core i18n context and renders `children`
 */
export function CoreProvider({ children }: { children: React.ReactNode }) {
  return createCoreI18n()({ children });
}

/**
 * Creates a Core I18n provider preconfigured with a specific default language.
 *
 * @param language - The language code to use as the provider's default language (e.g., "en", "ko")
 * @returns A React component that renders an I18nProvider configured with `language` as the default language
 */
export function createLanguageProvider(language: string) {
  return createCoreI18n({ defaultLanguage: language });
}

/**
 * Create a Core I18n provider preconfigured with the given namespaces.
 *
 * @param namespaces - Array of namespace keys to load and expose through the provider
 * @returns A React component that wraps children with a Core I18n provider using the specified `namespaces`
 */
export function createNamespaceProvider(namespaces: string[]) {
  return createCoreI18n({ namespaces });
}

/**
 * Create a Core I18n provider configured to use a custom translation loader.
 *
 * @param loadTranslations - Function that loads translations for a given `language` and `namespace`, returning a map of translation keys to strings.
 * @returns A React provider component configured to use the supplied `loadTranslations` function for loading translations.
 */
export function createCustomLoaderProvider(
  loadTranslations: (language: string, namespace: string) => Promise<Record<string, string>>
) {
  return createCoreI18n({ loadTranslations });
}

// 핵심 훅들 export
export { useTranslation, useLanguageChange, useI18n };

// Provider export
export { I18nProvider };

// 핵심 클래스/함수들 export
export { Translator, ssrTranslate, serverTranslate };

// 타입 export
export type { I18nConfig }; 