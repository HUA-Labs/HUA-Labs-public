import { G as GEOConfig, a as GEOMetadata } from '../../../structuredData-Cq9LiZVN.mjs';
export { j as GEOConfigInput, M as META_NAMES, O as OG_PROPERTIES, k as OptionalGEOConfig, P as ProgrammingLanguage, R as RequiredGEOConfig, S as SoftwareApplicationType, b as SoftwareCategory, c as StructuredData, T as TechnologyStack, d as createAIContext, l as generateCodeLD, g as generateFAQPageLD, e as generateGEOMetadata, f as generateHowToLD, m as generateOrganizationLD, h as generateSoftwareApplicationLD, i as generateTechArticleLD, n as generateVideoLD, o as isValidGEOConfig, p as metaToObject, q as openGraphToObject, r as renderJSONLD } from '../../../structuredData-Cq9LiZVN.mjs';
import { Metadata } from 'next';

/**
 * @hua-labs/hua/framework - Server Component Helpers for GEO
 *
 * Next.js 16 Server Component에 최적화된 GEO 헬퍼
 * GEO helpers optimized for Next.js 16 Server Components with async APIs
 *
 * Next.js 16에서는 params, searchParams, cookies, headers 등이 모두 async입니다.
 * In Next.js 16, params, searchParams, cookies, headers are all async.
 *
 * @example
 * ```tsx
 * // app/layout.tsx (Server Component)
 * import { generateGEOForMetadata } from '@hua-labs/hua/framework';
 *
 * export async function generateMetadata() {
 *   return generateGEOForMetadata({
 *     name: 'My App',
 *     description: 'Built with hua',
 *     features: ['i18n', 'Accessibility'],
 *   });
 * }
 * ```
 */

/**
 * Generate Next.js Metadata object from GEO config (Server Component only)
 *
 * Next.js Metadata API와 GEO를 통합하여 서버 컴포넌트에서 바로 사용 가능
 * Next.js 16에서는 generateMetadata가 async 함수여야 합니다.
 *
 * @param config - GEO configuration
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * // app/layout.tsx (Next.js 16)
 * import { generateGEOForMetadata } from '@hua-labs/hua/framework';
 *
 * export async function generateMetadata() {
 *   return generateGEOForMetadata({
 *     name: 'hua',
 *     description: 'Privacy-first UX framework for Next.js',
 *     features: ['i18n', 'Motion', 'Accessibility'],
 *     keywords: ['nextjs', 'react', 'i18n'],
 *     codeRepository: 'https://github.com/hua-labs/hua',
 *     license: 'MIT',
 *   });
 * }
 * ```
 */
declare function generateGEOForMetadata(config: GEOConfig): Metadata;
/**
 * Generate JSON-LD scripts for Server Component
 *
 * 서버 컴포넌트에서 JSON-LD script 태그를 쉽게 생성
 *
 * @param config - GEO configuration
 * @returns GEO metadata (use jsonLd array to render scripts)
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { generateGEOScripts, renderJSONLD } from '@hua-labs/hua/framework';
 * import Script from 'next/script';
 *
 * export default function RootLayout({ children }) {
 *   const geoMeta = generateGEOScripts({
 *     name: 'My App',
 *     description: 'Built with hua',
 *   });
 *
 *   return (
 *     <html>
 *       <head>
 *         {geoMeta.jsonLd.map((jsonLd, index) => (
 *           <Script key={index} {...renderJSONLD(jsonLd)} />
 *         ))}
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
declare function generateGEOScripts(config: GEOConfig): GEOMetadata;
/**
 * Get GEO metadata for use in Server Components
 *
 * 서버 컴포넌트에서 GEO 메타데이터 가져오기
 *
 * @param config - GEO configuration
 * @returns GEO metadata object
 *
 * @example
 * ```tsx
 * // app/page.tsx (Server Component)
 * import { getGEOMetadata } from '@hua-labs/hua/framework';
 *
 * export default function Page() {
 *   const geoMeta = getGEOMetadata({
 *     name: 'My Page',
 *     description: 'Page description',
 *   });
 *
 *   return (
 *     <div>
 *       <p>{geoMeta.meta.find(m => m.name === 'description')?.content}</p>
 *     </div>
 *   );
 * }
 * ```
 */
declare function getGEOMetadata(config: GEOConfig): GEOMetadata;
/**
 * Async version of generateGEOForMetadata (for dynamic data)
 *
 * 동적 데이터를 위한 비동기 버전 (데이터베이스, API 호출 등)
 *
 * @param configOrPromise - GEO config or Promise that resolves to GEO config
 * @returns Promise resolving to Next.js Metadata object
 *
 * @example
 * ```tsx
 * // app/[slug]/page.tsx
 * import { generateGEOForMetadataAsync } from '@hua-labs/hua/framework';
 *
 * export async function generateMetadata({ params }) {
 *   const data = await fetchPageData(params.slug);
 *
 *   return generateGEOForMetadataAsync({
 *     name: data.title,
 *     description: data.description,
 *     keywords: data.tags,
 *   });
 * }
 * ```
 */
declare function generateGEOForMetadataAsync(configOrPromise: GEOConfig | Promise<GEOConfig>): Promise<Metadata>;
/**
 * Combine multiple GEO configs (useful for merging app-level and page-level GEO)
 *
 * 여러 GEO 설정을 병합 (앱 레벨 + 페이지 레벨 GEO 병합에 유용)
 *
 * @param baseConfig - Base GEO config (app-level)
 * @param pageConfig - Page-specific GEO config
 * @returns Merged GEO config
 *
 * @example
 * ```tsx
 * // app/blog/[slug]/page.tsx
 * import { combineGEOConfigs, generateGEOForMetadata } from '@hua-labs/hua/framework';
 *
 * const appGEO = {
 *   name: 'My App',
 *   description: 'App description',
 *   author: { name: 'My Org' },
 * };
 *
 * export async function generateMetadata({ params }) {
 *   const post = await getPost(params.slug);
 *
 *   const mergedConfig = combineGEOConfigs(appGEO, {
 *     name: post.title,
 *     description: post.excerpt,
 *     keywords: post.tags,
 *   });
 *
 *   return generateGEOForMetadata(mergedConfig);
 * }
 * ```
 */
declare function combineGEOConfigs(baseConfig: GEOConfig, pageConfig: Partial<GEOConfig>): GEOConfig;
/**
 * Create GEO config from environment variables (for dynamic deployment)
 *
 * 환경 변수에서 GEO 설정 생성 (동적 배포를 위한)
 *
 * @param fallbackConfig - Fallback config if env vars are not set
 * @returns GEO config
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { createGEOFromEnv, generateGEOForMetadata } from '@hua-labs/hua/framework';
 *
 * const geoConfig = createGEOFromEnv({
 *   name: 'Default App Name',
 *   description: 'Default description',
 * });
 *
 * export const metadata = generateGEOForMetadata(geoConfig);
 * ```
 *
 * .env:
 * ```
 * NEXT_PUBLIC_APP_NAME=My App
 * NEXT_PUBLIC_APP_DESCRIPTION=My app description
 * NEXT_PUBLIC_APP_VERSION=1.0.0
 * NEXT_PUBLIC_REPO_URL=https://github.com/user/repo
 * ```
 */
declare function createGEOFromEnv(fallbackConfig: GEOConfig): GEOConfig;

/**
 * @hua-labs/hua/framework - GEO Presets
 *
 * Pre-configured GEO presets for common use cases
 * 일반적인 사용 사례를 위한 사전 구성된 GEO 프리셋
 */
/**
 * GEO Presets
 * 일반적인 소프트웨어 타입을 위한 사전 구성된 설정
 */
declare const GEO_PRESETS: {
    /**
     * Next.js Framework preset
     * Next.js 프레임워크용 프리셋
     */
    readonly NEXTJS_FRAMEWORK: {
        readonly applicationType: "DeveloperApplication";
        readonly programmingLanguage: ["TypeScript"];
        readonly technologyStack: ["Next.js", "React"];
        readonly applicationCategory: "Developer Tool";
    };
    /**
     * UI Library preset
     * UI 라이브러리용 프리셋
     */
    readonly UI_LIBRARY: {
        readonly applicationType: "DeveloperApplication";
        readonly applicationCategory: "Component Library";
    };
    /**
     * React Application preset
     * React 애플리케이션용 프리셋
     */
    readonly REACT_APP: {
        readonly applicationType: "WebApplication";
        readonly programmingLanguage: ["TypeScript", "JavaScript"];
        readonly technologyStack: ["React"];
    };
    /**
     * NPM Package preset
     * NPM 패키지용 프리셋
     */
    readonly NPM_PACKAGE: {
        readonly applicationType: "DeveloperApplication";
        readonly applicationCategory: "Developer Tool";
    };
};
/**
 * Type helper for preset values
 */
type GEOPreset = typeof GEO_PRESETS[keyof typeof GEO_PRESETS];

/**
 * GEO Metadata Validator
 *
 * Validates GEO (Generative Engine Optimization) metadata against Schema.org specifications.
 * Ensures that generated JSON-LD is valid and follows best practices for AI search engines.
 */
interface ValidationError {
    field: string;
    message: string;
    severity: 'error' | 'warning';
}
interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}
/**
 * Validate a single JSON-LD object
 */
declare function validateJsonLd(jsonLd: any): ValidationResult;
/**
 * Validate GEO metadata (multiple JSON-LD objects)
 */
declare function validateGEOMetadata$1(jsonLdArray: any[]): ValidationResult;
/**
 * Format validation result as human-readable string
 */
declare function formatValidationResult(result: ValidationResult): string;

/**
 * @hua-labs/hua/framework - GEO Test Utilities
 *
 * Testing utilities for GEO metadata validation and debugging
 * GEO 메타데이터 검증 및 디버깅을 위한 테스트 유틸리티
 */

/**
 * Validation result
 * 검증 결과
 */
interface GEOValidationResult {
    /**
     * Whether the metadata is valid
     */
    valid: boolean;
    /**
     * Array of error messages
     */
    errors: string[];
    /**
     * Array of warning messages
     */
    warnings: string[];
}
/**
 * Validate GEO metadata
 *
 * GEO 메타데이터의 유효성을 검증합니다.
 *
 * @param metadata - GEO metadata to validate
 * @returns Validation result with errors and warnings
 *
 * @example
 * ```tsx
 * const result = validateGEOMetadata(geoMeta);
 * if (!result.valid) {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
declare function validateGEOMetadata(metadata: GEOMetadata): GEOValidationResult;
/**
 * Pretty print GEO metadata
 *
 * GEO 메타데이터를 읽기 쉬운 형식으로 출력합니다.
 *
 * @param metadata - GEO metadata to print
 * @returns Formatted JSON string
 *
 * @example
 * ```tsx
 * console.log(prettyPrintGEOMetadata(geoMeta));
 * ```
 */
declare function prettyPrintGEOMetadata(metadata: GEOMetadata): string;
/**
 * Compare two GEO metadata objects
 *
 * 두 GEO 메타데이터 객체를 비교합니다.
 *
 * @param a - First GEO metadata
 * @param b - Second GEO metadata
 * @returns Comparison result with differences
 *
 * @example
 * ```tsx
 * const result = compareGEOMetadata(meta1, meta2);
 * if (!result.same) {
 *   console.log('Differences:', result.differences);
 * }
 * ```
 */
declare function compareGEOMetadata(a: GEOMetadata, b: GEOMetadata): {
    same: boolean;
    differences: string[];
};

export { GEOConfig, GEOMetadata, type GEOPreset, type GEOValidationResult, GEO_PRESETS, type ValidationError, type ValidationResult, combineGEOConfigs, compareGEOMetadata, createGEOFromEnv, formatValidationResult, generateGEOForMetadata, generateGEOForMetadataAsync, generateGEOScripts, getGEOMetadata, prettyPrintGEOMetadata, validateGEOMetadata, validateGEOMetadata$1 as validateGEOMetadataStructure, validateJsonLd };
