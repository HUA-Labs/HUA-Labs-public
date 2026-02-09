import { H as HuaConfig } from '../index-Cm8lkgIw.mjs';
export { a as HuaPageProps, b as HuaPlugin, c as HuaProviderProps, L as LicenseCheckResult, d as LicenseFeature, e as LicenseInfo, f as LicenseType, P as PresetName } from '../index-Cm8lkgIw.mjs';
export { G as GEOConfig, a as GEOMetadata, P as ProgrammingLanguage, S as SoftwareApplicationType, b as SoftwareCategory, c as StructuredData, d as createAIContext, g as generateFAQPageLD, e as generateGEOMetadata, f as generateHowToLD, h as generateSoftwareApplicationLD, i as generateTechArticleLD, r as renderJSONLD } from '../structuredData-Cq9LiZVN.mjs';
export { I18nMiddlewareConfig, SEOConfig, createI18nMiddleware, generateCSSVariables, generateCSSVariablesObject, generatePageMetadata, generateTailwindConfig } from './shared.mjs';
import 'react';
import 'next';

/**
 * @hua-labs/hua/framework - SSR Translations Utils
 *
 * 서버 사이드에서 번역 파일을 로드하는 유틸리티 함수
 * Next.js App Router의 서버 컴포넌트에서만 사용 가능합니다.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { getSSRTranslations } from '@hua-labs/hua/framework/server';
 * import huaConfig from '../hua.config';
 *
 * export default async function RootLayout({ children }) {
 *   const initialTranslations = await getSSRTranslations(huaUxConfig);
 *
 *   return (
 *     <html>
 *       <body>
 *         <HuaProvider config={{ i18n: { initialTranslations } }}>
 *           {children}
 *         </HuaProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

/**
 * SSR 번역 데이터 로드
 *
 * 서버 사이드에서 모든 지원 언어와 네임스페이스의 번역 파일을 로드합니다.
 *
 * @param config - HuaConfig 객체 (i18n 설정 포함)
 * @param translationsDir - 번역 파일 디렉토리 경로 (기본값: 'translations')
 * @returns 초기 번역 데이터 객체
 */
declare function getSSRTranslations(config: HuaConfig, translationsDir?: string): Promise<Record<string, Record<string, Record<string, string>>>>;

/**
 * @hua-labs/hua/framework - Config System (Server-only)
 *
 * Server-only configuration loading.
 * fs 모듈을 사용하므로 서버 환경에서만 사용 가능합니다.
 *
 * ⚠️ 이 파일은 절대 클라이언트 번들에 포함되면 안 됩니다.
 * 반드시 서버 컴포넌트나 API 라우트에서만 import 하세요.
 */

/**
 * Load configuration from file
 *
 * 동적으로 설정 파일을 로드합니다.
 *
 * **로드 순서**:
 * 1. `hua.config.ts` 시도 (TypeScript)
 * 2. `hua.config.js` 시도 (JavaScript)
 * 3. 없으면 기본값 (product preset)
 *
 * **Zero-Config**: 설정 파일이 없어도 기본값으로 동작합니다.
 *
 * **주의사항**:
 * - 이 함수는 Node.js 환경(빌드 타임)에서만 동작합니다.
 * - 런타임에서는 캐시된 설정을 사용합니다.
 * - **권장**: 설정 파일을 명시적으로 import하여 타입 안전성을 보장하세요.
 *   ```ts
 *   // hua.config.ts
 *   import { defineConfig } from '@hua-labs/hua/framework';
 *   export default defineConfig({ preset: 'product' });
 *
 *   // app/layout.tsx 또는 다른 서버 컴포넌트에서
 *   import config from '../hua.config';
 *   import { setConfig } from '@hua-labs/hua/framework';
 *   setConfig(config);
 *   ```
 *
 * **Fallback 용도**: 이 함수는 설정 파일이 명시적으로 import되지 않은 경우에만 사용됩니다.
 * 프로덕션 환경에서는 설정 파일을 명시적으로 import하는 것을 권장합니다.
 */
declare function loadConfig(): HuaConfig;

export { HuaConfig, getSSRTranslations, loadConfig };
