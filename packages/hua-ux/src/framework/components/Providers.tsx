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
import { createI18nStore } from '@hua-labs/state/integrations/i18n';

/**
 * Create providers based on configuration
 */
function createProviders(config: HuaUxConfig) {
  const providers: React.ComponentType<{ children: ReactNode }>[] = [];

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
    });

    providers.push(I18nProvider);
  }

  // Return a combined provider
  return function CombinedProvider({ children }: { children: ReactNode }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
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

  return <Provider>{children}</Provider>;
}
