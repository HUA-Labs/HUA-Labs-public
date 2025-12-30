/**
 * @hua-labs/hua-ux/framework - Providers
 * 
 * Unified providers for i18n, motion, and state
 */

'use client';

import React from 'react';
import type { ReactNode } from 'react';
import type { HuaUxConfig } from '../types';
import { getConfig } from '../config';
import { createZustandI18n } from '@hua-labs/i18n-core-zustand';
import { createI18nStore } from '@hua-labs/state';
import { BrandingProvider } from '../branding/context';

/**
 * Create providers based on configuration
 * 
 * Provider 체인을 생성합니다. Branding Provider는 가장 바깥쪽에 위치하여
 * 다른 Provider들이 브랜딩 설정을 사용할 수 있도록 합니다.
 * 
 * Creates a provider chain. Branding Provider is placed at the outermost level
 * so other providers can use branding configuration.
 */
function createProviders(config: HuaUxConfig) {
  const providers: React.ComponentType<{ children: ReactNode }>[] = [];

  // Branding Provider를 먼저 추가 (다른 Provider들이 사용 가능하도록)
  // Add Branding Provider first (so other providers can use it)
  if (config.branding) {
    providers.push(({ children }) => (
      <BrandingProvider branding={config.branding || null}>{children}</BrandingProvider>
    ));
  }

  // i18n Provider
  if (config.i18n) {
    const i18nStore = createI18nStore({
      defaultLanguage: config.i18n.defaultLanguage,
      supportedLanguages: config.i18n.supportedLanguages,
      persist: config.state?.persist ?? true,
      ssr: config.state?.ssr ?? true,
    });

    const I18nProvider = createZustandI18n(i18nStore, {
      fallbackLanguage: config.i18n.fallbackLanguage || 'en',
      namespaces: config.i18n.namespaces || ['common'],
      translationLoader: config.i18n.translationLoader || 'api',
      translationApiPath: config.i18n.translationApiPath || '/api/translations',
      defaultLanguage: config.i18n.defaultLanguage,
      loadTranslations: config.i18n.loadTranslations,
      debug: config.i18n.debug,
    });

    providers.push(I18nProvider);
  }

  // Return a combined provider
  return function CombinedProvider({ children }: { children: ReactNode }) {
    // Provider 체인 생성 (Branding Provider가 가장 바깥쪽)
    // Create provider chain (Branding Provider is outermost)
    const wrapped = providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
    
    return wrapped;
  };
}

/**
 * UnifiedProviders component
 * 
 * Automatically creates and wraps children with all necessary providers
 */
export function UnifiedProviders({
  children,
  config: overrideConfig,
}: {
  children: ReactNode;
  config?: Partial<HuaUxConfig>;
}) {
  const baseConfig = getConfig();
  const config = overrideConfig
    ? { ...baseConfig, ...overrideConfig }
    : baseConfig;

  const Provider = React.useMemo(() => createProviders(config), [config]);

  // Provider 체인은 createProviders 내부에서 처리됨
  // Provider chain is handled inside createProviders
  return <Provider>{children}</Provider>;
}
