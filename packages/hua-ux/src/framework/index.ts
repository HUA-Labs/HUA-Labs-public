/**
 * @hua-labs/hua-ux/framework
 * 
 * Framework layer for hua-ux
 */

// Components
export { HuaUxLayout } from './components/HuaUxLayout';
export { HuaUxPage } from './components/HuaUxPage';
export { UnifiedProviders } from './components/Providers';
export { BrandedButton } from './components/BrandedButton';
export { BrandedCard } from './components/BrandedCard';

// Configuration
export { defineConfig, loadConfig, getConfig, setConfig, resetConfig } from './config';
export type { HuaUxConfig, PresetName } from './types';

// Data Fetching
export { useData, fetchData } from './utils/data-fetching';
export type { DataFetchResult } from './utils/data-fetching';

// Middleware
export { createI18nMiddleware } from './middleware/i18n';
export type { I18nMiddlewareConfig } from './middleware/i18n';

// File Structure
// 서버 전용 유틸리티 (클라이언트 번들에서 제외)
// Server-only utilities (excluded from client bundle)
// export { validateFileStructure } from './utils/file-structure';
// export type { FileStructureResult } from './utils/file-structure';
// Note: validateFileStructure는 서버 전용이므로 필요시 직접 import

// Metadata Utilities
export { generatePageMetadata } from './utils/metadata';
export type { SEOConfig } from './utils/metadata';

// GEO (Generative Engine Optimization)
export {
  generateGEOMetadata,
  renderJSONLD,
  createAIContext,
  generateSoftwareApplicationLD,
  generateFAQPageLD,
  generateTechArticleLD,
  generateHowToLD,
} from './seo/geo';
export type {
  GEOConfig,
  GEOMetadata,
  StructuredData,
  SoftwareApplicationType,
  SoftwareCategory,
  ProgrammingLanguage,
} from './seo/geo';

// License System
export { 
  initLicense, 
  getLicense, 
  checkLicense, 
  hasLicense, 
  requireLicense 
} from './license';
export type { 
  LicenseInfo, 
  LicenseType, 
  LicenseFeature, 
  LicenseCheckResult 
} from './license/types';

// Plugin System
export { 
  pluginRegistry, 
  registerPlugin, 
  getPlugin, 
  getAllPlugins 
} from './plugins';
export type { HuaUxPlugin } from './plugins/types';

// Branding
export { BrandingProvider, useBranding, useBrandingColor } from './branding/context';
export { generateCSSVariables, generateCSSVariablesObject } from './branding/css-vars';
export { generateTailwindConfig } from './branding/tailwind-config';

// Types
export type { HuaUxLayoutProps, HuaUxPageProps } from './types';
