/**
 * i18n Configuration for Next.js App Router
 * 
 * This file demonstrates:
 * - API-based translation loader
 * - Zustand integration
 * - Multiple namespaces support
 * 
 * Note: Server-side translation loading is in i18n-server.ts
 */
import { createZustandI18n, type ZustandLanguageStore } from '@hua-labs/i18n-core-zustand';
import { createApiTranslationLoader } from '@hua-labs/i18n-loaders';
import type { UseBoundStore, StoreApi } from 'zustand';
import { useAppStore } from './store';

/**
 * Create API-based translation loader
 * This loader fetches translations from API routes
 */
const apiLoader = createApiTranslationLoader({
  translationApiPath: '/api/translations',
  cacheTtlMs: 60_000, // 1 minute cache
});

/**
 * Create i18n Provider with Zustand integration
 * This provider handles both SSR and CSR translations
 */
export function createClientI18nProvider(
  ssrTranslations?: Record<string, Record<string, any>>
) {
  // 타입 단언: ZustandLanguageStore는 string을 받지만, 실제로는 'ko' | 'en'만 사용
  // persist 미들웨어로 인한 타입 호환성을 위해 단언 필요
  return createZustandI18n(useAppStore as UseBoundStore<StoreApi<ZustandLanguageStore>>, {
    defaultLanguage: 'ko',
    fallbackLanguage: 'en',
    namespaces: ['common', 'pages', 'examples'],
    initialTranslations: ssrTranslations,
    translationLoader: 'custom',
    // apiLoader는 TranslationRecord를 반환하지만, 실제로는 Record<string, string> 형태
    loadTranslations: apiLoader as (language: string, namespace: string) => Promise<Record<string, string>>,
    debug: process.env.NODE_ENV === 'development',
  });
}

