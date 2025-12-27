/**
 * @hua-labs/hua-ux/framework
 * 
 * Framework layer for hua-ux
 */

// Components
export { HuaUxLayout } from './components/HuaUxLayout';
export { HuaUxPage } from './components/HuaUxPage';
export { UnifiedProviders } from './components/Providers';

// Configuration
export { defineConfig, loadConfig, getConfig, setConfig } from './config';
export type { HuaUxConfig } from './types';

// Data Fetching
export { useData, fetchData } from './utils/data-fetching';
export type { DataFetchResult } from './utils/data-fetching';

// Middleware
export { createI18nMiddleware } from './middleware/i18n';
export type { I18nMiddlewareConfig } from './middleware/i18n';

// File Structure
export { validateFileStructure } from './utils/file-structure';
export type { FileStructureResult } from './utils/file-structure';

// Types
export type { HuaUxLayoutProps, HuaUxPageProps } from './types';
