'use client';

import { createClientI18nProvider, getAllTranslations } from '@/lib/i18n-config';
import { useAppStore } from '@/lib/store';
import { useMemo } from 'react';
import type { SupportedLanguage } from '@/lib/store';

interface I18nProviderProps {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}

/**
 * 초기 번역 데이터를 반환합니다.
 * getAllTranslations를 사용하여 JSON 파일에서 번역을 로드합니다.
 * 모든 언어의 번역을 포함하여 초기 로드 시 깜빡임을 방지합니다.
 */
const getInitialTranslations = () => {
  return getAllTranslations();
};

/**
 * Provides a client-side internationalization context bound to the app store and preloaded translations.
 *
 * Creates a provider that integrates i18n with the Zustand app store and ensures translations for all supported
 * languages are loaded upfront to avoid UI flicker during client render.
 *
 * @param children - React nodes to be wrapped by the i18n provider
 * @param initialLanguage - Optional initial language code (default: `'ko'`). Note: this prop is accepted but not used by the provider implementation
 */
export function I18nProvider({ children, initialLanguage = 'ko' }: I18nProviderProps) {
  // useMemo를 사용하여 Provider 컴포넌트를 한 번만 생성
  // 모든 언어의 번역을 포함하여 초기 로드 시 깜빡임 방지
  const I18nProviderComponent = useMemo(() => {
    const allTranslations = getInitialTranslations();
    return createClientI18nProvider(useAppStore, allTranslations);
  }, []);

  return <I18nProviderComponent>{children}</I18nProviderComponent>;
}
