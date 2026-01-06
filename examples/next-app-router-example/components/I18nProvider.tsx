'use client';

import { createClientI18nProvider } from '@/lib/i18n-config';
import { useMemo } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  ssrTranslations?: Record<string, Record<string, Record<string, string>>>;
}

/**
 * i18n Provider 컴포넌트 (클라이언트 컴포넌트)
 * 
 * Next.js 15의 Server/Client Component 분리를 위해 클라이언트 컴포넌트로 분리되었습니다.
 * SSR에서 로드한 번역 데이터를 받아서 i18n Provider를 생성합니다.
 * 
 * @param children - 자식 컴포넌트
 * @param ssrTranslations - SSR에서 로드한 초기 번역 데이터
 */
export function I18nProvider({ children, ssrTranslations }: I18nProviderProps) {
  // useMemo를 사용하여 Provider 컴포넌트를 한 번만 생성
  // SSR 번역 데이터를 포함하여 초기 로드 시 깜빡임 방지
  const I18nProviderComponent = useMemo(() => {
    return createClientI18nProvider(ssrTranslations);
  }, [ssrTranslations]);

  return <I18nProviderComponent>{children}</I18nProviderComponent>;
}

