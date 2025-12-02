import { createZustandI18n, type ZustandLanguageStore } from '@hua-labs/i18n-core-zustand';
import type { UseBoundStore, StoreApi } from 'zustand';
import { useAppStore, type SupportedLanguage } from './store';

// JSON 파일에서 번역 데이터 import
import koCommon from '../translations/ko/common.json';
import enCommon from '../translations/en/common.json';
import jaCommon from '../translations/ja/common.json';
import zhCommon from '../translations/zh/common.json';
import esCommon from '../translations/es/common.json';
import frCommon from '../translations/fr/common.json';

/**
 * 모든 번역 데이터를 JSON 파일에서 로드합니다.
 * 언어를 추가할 때는 translations/[language]/common.json 파일을 추가하면 됩니다.
 */
export const getAllTranslations = () => {
  return {
    ko: { common: koCommon },
    en: { common: enCommon },
    ja: { common: jaCommon },
    zh: { common: zhCommon },
    es: { common: esCommon },
    fr: { common: frCommon },
  };
};

/**
 * SSR용 번역 데이터를 로드합니다.
 * 실제 프로덕션에서는 서버에서 번역 파일을 읽어옵니다.
 */
const getSSRTranslations = async (language: SupportedLanguage) => {
  const allTranslations = getAllTranslations();
  return {
    [language]: allTranslations[language],
  };
};

/**
 * Create a client-side i18n React Provider bound to the given Zustand language store.
 *
 * @param store - Zustand store that exposes the current `language` and a `setLanguage` method
 * @param ssrTranslations - Optional initial translations keyed by language and namespace (e.g. { [lang]: { [namespace]: { key: value } } })
 * @returns A React Provider component that supplies translations and language controls using the provided store
 */
export function createClientI18nProvider(
  store: typeof useAppStore,
  ssrTranslations?: Record<string, Record<string, Record<string, string>>> | null
) {
  // 타입 단언: ZustandLanguageStore는 string을 받지만, 실제로는 'ko' | 'en'만 사용
  // persist 미들웨어로 인한 타입 호환성을 위해 단언 필요
  return createZustandI18n(store as UseBoundStore<StoreApi<ZustandLanguageStore>>, {
    defaultLanguage: 'ko',
    fallbackLanguage: 'en',
    namespaces: ['common'],
    initialTranslations: ssrTranslations || undefined,
    debug: typeof window !== 'undefined' && process.env.NODE_ENV === 'development',
    translationLoader: 'custom',
    loadTranslations: async (language: string, namespace: string) => {
      const allTranslations = getAllTranslations();
      const lang = language as SupportedLanguage;
      const translations = allTranslations[lang];
      if (!translations) return {};
      return (translations[namespace as keyof typeof translations] as Record<string, string>) || {};
    },
  });
}

/**
 * Load translation data for server-side rendering.
 *
 * Intended for use in Next.js App Router server components.
 *
 * @param language - Language code to load translations for
 * @returns An object mapping the requested language to its namespace translations, e.g. `{ [language]: { common: Record<string, string> } }`
 */
export async function loadSSRTranslations(language: SupportedLanguage = 'ko') {
  return await getSSRTranslations(language);
}
