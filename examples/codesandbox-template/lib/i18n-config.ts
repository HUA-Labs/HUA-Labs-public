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
 * 클라이언트용 i18n Provider를 생성합니다.
 * 
 * @param store - Zustand store (language와 setLanguage 메서드 필요)
 * @param ssrTranslations - SSR에서 로드한 초기 번역 데이터 (선택사항)
 * @param defaultLanguage - 초기 언어 설정 (기본값: 'ko')
 * @returns React Provider 컴포넌트
 * 
 * @example
 * ```tsx
 * const I18nProvider = createClientI18nProvider(useAppStore, ssrTranslations, 'en');
 * ```
 */
export function createClientI18nProvider(
  store: typeof useAppStore,
  ssrTranslations?: Record<string, Record<string, Record<string, string>>> | null,
  defaultLanguage: SupportedLanguage = 'ko'
) {
  // 타입 단언: ZustandLanguageStore는 string을 받지만, 실제로는 'ko' | 'en'만 사용
  // persist 미들웨어로 인한 타입 호환성을 위해 단언 필요
  return createZustandI18n(store as UseBoundStore<StoreApi<ZustandLanguageStore>>, {
    defaultLanguage,
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
 * SSR에서 번역 데이터를 로드합니다.
 * Next.js App Router의 서버 컴포넌트에서 사용합니다.
 * 
 * @param language - 로드할 언어 코드
 * @returns 번역 데이터 객체
 */
export async function loadSSRTranslations(language: SupportedLanguage = 'ko') {
  return await getSSRTranslations(language);
}

