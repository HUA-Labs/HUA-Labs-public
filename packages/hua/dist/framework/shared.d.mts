import { H as HuaConfig } from '../index-Cm8lkgIw.mjs';
export { a as HuaPageProps, b as HuaPlugin, c as HuaProviderProps, L as LicenseCheckResult, d as LicenseFeature, e as LicenseInfo, f as LicenseType, P as PresetName } from '../index-Cm8lkgIw.mjs';
export { G as GEOConfig, a as GEOMetadata, P as ProgrammingLanguage, S as SoftwareApplicationType, b as SoftwareCategory, c as StructuredData, d as createAIContext, g as generateFAQPageLD, e as generateGEOMetadata, f as generateHowToLD, h as generateSoftwareApplicationLD, i as generateTechArticleLD, r as renderJSONLD } from '../structuredData-Cq9LiZVN.mjs';
import * as next from 'next';
import 'react';

/**
 * @hua-labs/hua/framework - Metadata Utilities
 *
 * Next.js Metadata 생성 유틸리티 (Next.js 없이도 사용 가능)
 *
 * Next.js가 설치되어 있으면 Next.js Metadata 타입을 사용하고,
 * 없으면 일반 메타데이터 객체 타입을 사용합니다.
 *
 * Works with or without Next.js:
 * - With Next.js: Returns Next.js Metadata type
 * - Without Next.js: Returns generic metadata object type
 */
type MetadataType = typeof next extends {
    Metadata: infer T;
} ? T : {
    title?: string;
    description?: string;
    keywords?: string[];
    openGraph?: {
        title?: string;
        description?: string;
        type?: 'website' | 'article' | 'product';
        images?: Array<{
            url: string;
        }>;
    };
    twitter?: {
        card?: 'summary' | 'summary_large_image';
        title?: string;
        description?: string;
        images?: string[];
    };
};
/**
 * SEO 설정 타입
 */
interface SEOConfig {
    keywords?: string[];
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: 'website' | 'article' | 'product';
}
/**
 * 페이지 메타데이터 생성
 *
 * Next.js App Router의 `export const metadata`에서 사용할 수 있는 메타데이터를 생성합니다.
 * CRA/Vite 등 일반 React 앱에서도 사용 가능합니다 (React Helmet 등과 함께).
 *
 * Generates metadata that can be used in Next.js App Router's `export const metadata`.
 * Also works in plain React apps (CRA/Vite) with React Helmet, etc.
 *
 * @param options - 메타데이터 옵션
 * @param options.title - 페이지 제목
 * @param options.description - 페이지 설명
 * @param options.seo - SEO 설정 (선택적)
 * @returns Next.js Metadata 객체 (Next.js가 있으면) 또는 일반 메타데이터 객체 (없으면)
 *
 * @example
 * ```tsx
 * // Next.js App Router
 * // app/page.tsx
 * import { generatePageMetadata } from '@hua-labs/hua/framework';
 *
 * export const metadata = generatePageMetadata({
 *   title: '홈',
 *   description: '환영합니다',
 *   seo: {
 *     keywords: ['키워드1', '키워드2'],
 *     ogImage: '/og-image.png',
 *   },
 * });
 *
 * export default function HomePage() {
 *   return <div>...</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // CRA/Vite (React Helmet 사용)
 * import { Helmet } from 'react-helmet-async';
 * import { generatePageMetadata } from '@hua-labs/hua/framework';
 *
 * export default function HomePage() {
 *   const metadata = generatePageMetadata({
 *     title: 'Home',
 *     description: 'Welcome',
 *   });
 *
 *   return (
 *     <>
 *       <Helmet>
 *         <title>{metadata.title}</title>
 *         <meta name="description" content={metadata.description} />
 *       </Helmet>
 *       <div>...</div>
 *     </>
 *   );
 * }
 * ```
 */
declare function generatePageMetadata(options: {
    title: string;
    description?: string;
    seo?: SEOConfig;
}): MetadataType;

/**
 * @hua-labs/hua/framework - i18n Middleware
 *
 * i18n middleware for automatic language detection and routing
 *
 * **타입 안전성**: Next.js를 peerDependency로 사용하므로,
 * Next.js 프로젝트에서는 자동으로 타입이 추론됩니다.
 *
 * **Type Safety**: Next.js is used as a peerDependency,
 * so types are automatically inferred in Next.js projects.
 */
/**
 * Base interface for NextRequest (when Next.js is not available)
 */
interface BaseNextRequest {
    headers: {
        get(name: string): string | null;
    };
    cookies: {
        get(name: string): {
            value: string;
        } | undefined;
    };
    nextUrl: {
        pathname: string;
        searchParams: URLSearchParams;
    };
}
/**
 * NextRequest type - Next.js가 있으면 실제 타입, 없으면 기본 인터페이스
 *
 * Next.js가 optional peerDependency이므로, 타입 레벨에서만 처리합니다.
 * 실제 Next.js 프로젝트에서는 Next.js의 NextRequest 타입이 자동으로 사용됩니다.
 */
type NextRequest = BaseNextRequest;
/**
 * Base interface for NextResponse (when Next.js is not available)
 */
interface BaseNextResponse {
    headers: Headers;
    next?(): BaseNextResponse;
    redirect?(url: string): BaseNextResponse;
}
/**
 * i18n middleware configuration
 */
interface I18nMiddlewareConfig {
    /**
     * Default language
     */
    defaultLanguage: string;
    /**
     * Supported languages
     */
    supportedLanguages: string[];
    /**
     * Language detection strategy
     */
    detectionStrategy?: 'header' | 'cookie' | 'path' | 'query';
}
/**
 * Create i18n middleware for Next.js
 *
 * **⚠️ Edge Runtime Note**: This middleware runs on Edge Runtime.
 * Make sure your middleware.ts file exports the runtime config:
 *
 * ```ts
 * export const runtime = 'edge';
 * ```
 *
 * @example
 * ```ts
 * // middleware.ts
 * import { createI18nMiddleware } from '@hua-labs/hua/framework';
 *
 * // Edge Runtime 명시 (Vercel 자동 감지 방지)
 * export const runtime = 'edge';
 *
 * export default createI18nMiddleware({
 *   defaultLanguage: 'ko',
 *   supportedLanguages: ['ko', 'en'],
 * });
 * ```
 *
 * **Alternative**: If you don't want to use Edge Runtime, you can handle
 * language detection in your API routes or client components instead.
 */
declare function createI18nMiddleware(config: I18nMiddlewareConfig): (request: NextRequest) => BaseNextResponse;

/**
 * @hua-labs/hua/framework - CSS Variables Generator
 *
 * 브랜딩 설정을 CSS 변수로 자동 생성
 */

/**
 * Generate CSS variables from branding configuration
 *
 * 브랜딩 설정을 CSS 변수 문자열로 변환합니다.
 *
 * @param branding - Branding configuration
 * @returns CSS variables string
 *
 * @example
 * ```ts
 * const css = generateCSSVariables({
 *   colors: { primary: '#3B82F6' },
 *   typography: { fontFamily: ['Inter', 'sans-serif'] },
 * });
 * // Returns: ":root {\n  --color-primary: #3B82F6;\n  --font-family: Inter, sans-serif;\n}"
 * ```
 */
declare function generateCSSVariables(branding: NonNullable<HuaConfig['branding']>): string;
/**
 * Generate CSS variables as object
 *
 * 브랜딩 설정을 CSS 변수 객체로 변환합니다.
 *
 * @param branding - Branding configuration
 * @returns CSS variables object
 */
declare function generateCSSVariablesObject(branding: NonNullable<HuaConfig['branding']>): Record<string, string>;

/**
 * @hua-labs/hua/framework - Tailwind Config Generator
 *
 * 브랜딩 설정을 Tailwind Config로 자동 생성
 */

/**
 * Generate Tailwind config from branding configuration
 *
 * 브랜딩 설정을 Tailwind Config 객체로 변환합니다.
 *
 * @param branding - Branding configuration
 * @returns Tailwind config object
 *
 * @example
 * ```ts
 * const tailwindConfig = generateTailwindConfig({
 *   colors: { primary: '#3B82F6' },
 *   typography: { fontFamily: ['Inter', 'sans-serif'] },
 * });
 *
 * // Use in tailwind.config.js:
 * module.exports = {
 *   ...tailwindConfig,
 *   // ... other config
 * };
 * ```
 */
declare function generateTailwindConfig(branding: NonNullable<HuaConfig['branding']>): {
    theme: {
        extend: {
            colors?: Record<string, string>;
            fontFamily?: Record<string, string[]>;
            fontSize?: Record<string, string>;
        };
    };
};

export { HuaConfig, type I18nMiddlewareConfig, type SEOConfig, createI18nMiddleware, generateCSSVariables, generateCSSVariablesObject, generatePageMetadata, generateTailwindConfig };
