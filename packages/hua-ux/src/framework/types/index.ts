/**
 * @hua-labs/hua-ux/framework - Type Definitions
 * 
 * Core types for the framework layer
 */

import type { ReactNode } from 'react';

/**
 * Framework configuration
 */
export interface HuaUxConfig {
  /**
   * i18n configuration
   */
  i18n?: {
    defaultLanguage: string;
    supportedLanguages: string[];
    fallbackLanguage?: string;
    namespaces?: string[];
    translationLoader?: 'api' | 'static' | 'custom';
    translationApiPath?: string;
  };

  /**
   * Motion configuration
   */
  motion?: {
    defaultPreset?: 'product' | 'marketing';
    enableAnimations?: boolean;
  };

  /**
   * State management configuration
   */
  state?: {
    persist?: boolean;
    ssr?: boolean;
  };

  /**
   * File structure configuration
   */
  fileStructure?: {
    enforce?: boolean;
  };
}

/**
 * HuaUxLayout props
 */
export interface HuaUxLayoutProps {
  children: ReactNode;
  /**
   * Override config (optional, uses hua-ux.config.ts by default)
   */
  config?: Partial<HuaUxConfig>;
}

/**
 * HuaUxPage props
 */
export interface HuaUxPageProps {
  children: ReactNode;
  /**
   * Page title (for metadata)
   */
  title?: string;
  /**
   * Page description (for metadata)
   */
  description?: string;
  /**
   * Enable page transition animations
   */
  enableMotion?: boolean;
}
