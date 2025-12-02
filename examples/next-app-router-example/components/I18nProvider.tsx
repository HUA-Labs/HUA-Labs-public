'use client';

import { createClientI18nProvider } from '@/lib/i18n-config';
import { useMemo } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  ssrTranslations?: Record<string, Record<string, any>>;
}

/**
 * Wraps `children` with a client-side i18n provider initialized from optional SSR translations.
 *
 * @param children - The React nodes to render inside the provider.
 * @param ssrTranslations - Optional initial translations loaded during server-side rendering; keyed by locale and then by namespace.
 * @returns A React element that renders the i18n provider around `children`.
 */
export function I18nProvider({ children, ssrTranslations }: I18nProviderProps) {
  // useMemo를 사용하여 Provider 컴포넌트를 한 번만 생성
  // SSR 번역 데이터를 포함하여 초기 로드 시 깜빡임 방지
  const I18nProviderComponent = useMemo(() => {
    return createClientI18nProvider(ssrTranslations);
  }, [ssrTranslations]);

  return <I18nProviderComponent>{children}</I18nProviderComponent>;
}
