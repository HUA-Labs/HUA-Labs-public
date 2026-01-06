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
 * i18n Provider 컴포넌트
 * 
 * 클라이언트 컴포넌트에서 사용하며, Zustand store와 i18n을 통합합니다.
 * 모든 언어의 번역을 초기에 로드하여 깜빡임을 방지합니다.
 * 
 * @param children - 자식 컴포넌트
 * @param initialLanguage - 초기 언어 (기본값: 'ko')
 */
export function I18nProvider({ children, initialLanguage = 'ko' }: I18nProviderProps) {
  // useMemo를 사용하여 Provider 컴포넌트를 생성
  // initialLanguage가 변경되면 Provider를 재생성하여 초기 언어를 반영
  const I18nProviderComponent = useMemo(() => {
    const allTranslations = getInitialTranslations();
    return createClientI18nProvider(useAppStore, allTranslations);
  }, []);

  return <I18nProviderComponent>{children}</I18nProviderComponent>;
}

