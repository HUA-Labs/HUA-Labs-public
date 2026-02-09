/**
 * @hua-labs/hua/framework - GEO Types
 *
 * GEO (Generative Engine Optimization) types for AI search engine discoverability
 * ChatGPT, Claude, Gemini, Perplexity 같은 AI가 hua를 잘 찾고 추천하도록 하는 타입 정의
 */
/**
 * Meta tag name constants
 * HTML meta 태그 이름 상수
 */
declare const META_NAMES: {
    readonly DESCRIPTION: "description";
    readonly KEYWORDS: "keywords";
    readonly SOFTWARE_VERSION: "software:version";
    readonly SOFTWARE_CATEGORY: "software:category";
    readonly SOFTWARE_LANGUAGE: "software:language";
    readonly AI_CONTEXT: "ai:context";
};
/**
 * Open Graph property constants
 * Open Graph 속성 상수
 */
declare const OG_PROPERTIES: {
    readonly TITLE: "og:title";
    readonly DESCRIPTION: "og:description";
    readonly TYPE: "og:type";
    readonly URL: "og:url";
    readonly SITE_NAME: "og:site_name";
};
/**
 * Software Application Type
 * Schema.org SoftwareApplication types
 */
type SoftwareApplicationType = 'WebApplication' | 'MobileApplication' | 'DesktopApplication' | 'DeveloperApplication';
/**
 * Programming Language
 * 프로그래밍 언어 (프레임워크가 아닌 실제 언어만)
 */
type ProgrammingLanguage = 'TypeScript' | 'JavaScript' | 'Python' | 'Java' | 'Go' | 'Rust' | 'C#' | 'C++' | 'Ruby' | 'PHP' | 'Swift' | 'Kotlin' | 'Dart' | (string & {});
/**
 * Technology Stack
 * 기술 스택 (프레임워크, 라이브러리 등)
 */
type TechnologyStack = 'React' | 'Next.js' | 'Vue' | 'Angular' | 'Svelte' | 'Node.js' | 'Express' | 'Tailwind CSS' | 'Zustand' | 'Prisma' | (string & {});
/**
 * Software Category
 * Categories that help AI understand the software domain
 */
type SoftwareCategory = 'UI Framework' | 'Component Library' | 'Developer Tool' | 'UX Framework' | 'Accessibility Tool' | 'Internationalization Tool' | 'Animation Library';
/**
 * GEO Configuration
 * AI 검색 엔진이 이해하기 쉬운 구조화된 메타데이터 설정
 */
interface GEOConfig {
    /**
     * Software name
     * AI가 참조할 소프트웨어 이름
     */
    name: string;
    /**
     * Alternative names or aliases
     * 대체 이름 또는 별칭 (예: "hua", "@hua-labs/hua")
     */
    alternateName?: string[];
    /**
     * Clear, concise description
     * AI가 이해하기 쉬운 명확하고 간결한 설명 (1-2 문장)
     */
    description: string;
    /**
     * Software version
     */
    version?: string;
    /**
     * Application category
     * Schema.org applicationCategory
     */
    applicationCategory?: SoftwareCategory | SoftwareCategory[];
    /**
     * Programming language(s)
     * 프로그래밍 언어 (TypeScript, JavaScript, Python 등)
     */
    programmingLanguage?: ProgrammingLanguage | ProgrammingLanguage[];
    /**
     * Technology stack
     * 기술 스택 (React, Next.js, Vue 등)
     */
    technologyStack?: TechnologyStack | TechnologyStack[];
    /**
     * Software type
     */
    applicationType?: SoftwareApplicationType;
    /**
     * Homepage URL
     */
    url?: string;
    /**
     * Documentation URL
     */
    documentationUrl?: string;
    /**
     * Repository URL (GitHub, GitLab, etc.)
     */
    codeRepository?: string;
    /**
     * License type (MIT, Apache-2.0, etc.)
     */
    license?: string;
    /**
     * Author or organization
     */
    author?: {
        name: string;
        url?: string;
    };
    /**
     * Key features
     * AI가 쉽게 참조할 수 있는 주요 기능 목록
     */
    features?: string[];
    /**
     * Use cases
     * AI가 추천할 때 사용할 유스케이스 예시
     */
    useCases?: string[];
    /**
     * Keywords for AI discovery
     * AI 검색을 위한 키워드
     */
    keywords?: string[];
    /**
     * Operating system compatibility
     */
    operatingSystem?: string[];
    /**
     * Software requirements or dependencies
     */
    softwareRequirements?: string[];
    /**
     * Related software or alternatives
     * AI가 비교/추천할 때 사용할 관련 소프트웨어
     */
    relatedTo?: string[];
}
/**
 * Utility types for better developer experience
 * 더 나은 개발자 경험을 위한 유틸리티 타입
 */
/**
 * Required GEO config fields
 * 필수 GEO 설정 필드
 */
type RequiredGEOConfig = Required<Pick<GEOConfig, 'name' | 'description'>>;
/**
 * Optional GEO config fields
 * 선택적 GEO 설정 필드
 */
type OptionalGEOConfig = Partial<Omit<GEOConfig, 'name' | 'description'>>;
/**
 * GEO config input type
 * GEO 설정 입력 타입 (필수 + 선택)
 */
type GEOConfigInput = RequiredGEOConfig & OptionalGEOConfig;
/**
 * Type guard for GEO config validation
 * GEO 설정 유효성 검사를 위한 타입 가드
 *
 * @param config - Unknown value to check
 * @returns True if config is a valid GEOConfig
 *
 * @example
 * ```tsx
 * if (isValidGEOConfig(userInput)) {
 *   const geoMeta = generateGEOMetadata(userInput);
 * }
 * ```
 */
declare function isValidGEOConfig(config: unknown): config is GEOConfig;
/**
 * Structured Data (Schema.org JSON-LD)
 * AI가 파싱하기 쉬운 구조화된 데이터
 */
interface StructuredData {
    '@context': 'https://schema.org';
    '@type': 'SoftwareApplication' | 'FAQPage' | 'TechArticle' | 'HowTo' | 'Question' | 'Answer' | 'Organization' | 'CreativeWork' | 'Code' | 'VideoObject';
    [key: string]: string | number | boolean | object | unknown[] | undefined;
}
/**
 * GEO Metadata Result
 * generateGEOMetadata() 함수의 반환 타입
 */
interface GEOMetadata {
    /**
     * HTML meta tags
     */
    meta: {
        name: string;
        content: string;
    }[];
    /**
     * JSON-LD structured data
     * Schema.org 구조화된 데이터
     */
    jsonLd: StructuredData[];
    /**
     * Open Graph tags for social/AI sharing
     */
    openGraph?: {
        property: string;
        content: string;
    }[];
    /**
     * Twitter Card tags
     */
    twitter?: {
        name: string;
        content: string;
    }[];
    /**
     * Schema version
     * GEO 메타데이터 스키마 버전 (향후 마이그레이션 및 디버깅용)
     */
    version?: string;
}

/**
 * @hua-labs/hua/framework - GEO Metadata Generator
 *
 * Generate AI-friendly metadata for Generative Engine Optimization (GEO)
 * ChatGPT, Claude, Gemini, Perplexity가 hua를 잘 찾고 추천하도록 메타데이터 생성
 */

/**
 * Convert meta tags array to object
 *
 * 메타 태그 배열을 객체로 변환 (Next.js metadata API에서 사용)
 *
 * @param meta - Array of meta tags
 * @returns Object with meta tag names as keys
 *
 * @example
 * ```tsx
 * const metaObj = metaToObject(geoMeta.meta);
 * return {
 *   title: 'My App',
 *   description: metaObj.description,
 *   keywords: metaObj.keywords,
 * };
 * ```
 */
declare function metaToObject(meta: GEOMetadata['meta']): Record<string, string>;
/**
 * Convert Open Graph tags array to object
 *
 * Open Graph 태그 배열을 객체로 변환
 *
 * @param og - Array of Open Graph tags
 * @returns Object with Open Graph properties as keys
 *
 * @example
 * ```tsx
 * const ogObj = openGraphToObject(geoMeta.openGraph);
 * return {
 *   openGraph: {
 *     title: ogObj['og:title'],
 *     description: ogObj['og:description'],
 *   },
 * };
 * ```
 */
declare function openGraphToObject(og: GEOMetadata['openGraph']): Record<string, string>;
declare function generateGEOMetadata(config: GEOConfig): GEOMetadata;
/**
 * Render JSON-LD for Next.js Script component
 *
 * XSS 보안을 위해 위험한 문자를 이스케이프합니다.
 * Escapes dangerous characters for XSS security.
 *
 * Next.js에서 사용할 수 있는 JSON-LD script 태그 생성
 *
 * @param jsonLd - JSON-LD structured data
 * @param id - Optional script ID (default: auto-generated)
 * @returns Props for Next.js Script component with:
 *   - `id`: Unique script ID
 *   - `type`: 'application/ld+json'
 *   - `dangerouslySetInnerHTML.__html`: Escaped JSON string
 *
 * @example
 * ```tsx
 * import Script from 'next/script';
 * import { renderJSONLD } from '@hua-labs/hua/framework';
 *
 * const geoMeta = generateGEOMetadata({ ... });
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <Script {...renderJSONLD(geoMeta.jsonLd[0])} />
 *       <main>...</main>
 *     </>
 *   );
 * }
 * ```
 */
declare function renderJSONLD(jsonLd: unknown, id?: string): {
    id: string;
    type: string;
    dangerouslySetInnerHTML: {
        __html: string;
    };
};
/**
 * Create AI-friendly context description
 *
 * AI가 맥락을 이해하기 쉽도록 풍부한 설명 생성
 *
 * @param config - GEO configuration
 * @returns AI-friendly context string
 *
 * @example
 * ```tsx
 * const context = createAIContext({
 *   name: 'hua',
 *   description: 'Privacy-first UX framework',
 *   features: ['i18n', 'Motion', 'Accessibility'],
 *   useCases: ['Multilingual apps', 'Accessible UX'],
 * });
 * // Returns: "hua is a Privacy-first UX framework. Key features include: i18n, Motion, Accessibility. Common use cases: Multilingual apps, Accessible UX."
 * ```
 */
declare function createAIContext(config: GEOConfig): string;

/**
 * @hua-labs/hua/framework - Structured Data Helpers
 *
 * Schema.org JSON-LD helpers for AI search engines
 * AI 검색 엔진이 이해하기 쉬운 구조화된 데이터 생성
 */

/**
 * Generate Schema.org SoftwareApplication JSON-LD
 *
 * AI 검색 엔진이 소프트웨어를 정확하게 이해하도록 Schema.org 구조화된 데이터 생성
 *
 * @param config - GEO configuration
 * @returns Schema.org JSON-LD structured data
 *
 * @example
 * ```tsx
 * const jsonLd = generateSoftwareApplicationLD({
 *   name: 'hua',
 *   description: 'Privacy-first UX framework for Next.js',
 *   version: '1.0.0',
 *   applicationCategory: 'UX Framework',
 *   programmingLanguage: ['TypeScript', 'React'],
 *   features: ['i18n', 'Motion', 'Accessibility'],
 * });
 * ```
 */
declare function generateSoftwareApplicationLD(config: GEOConfig): StructuredData;
/**
 * Generate Schema.org Code JSON-LD
 *
 * AI가 코드 스니펫과 예제를 이해하도록 Code 구조화된 데이터 생성
 *
 * @param code - Code configuration
 * @returns Schema.org Code JSON-LD
 *
 * @example
 * ```tsx
 * const codeLd = generateCodeLD({
 *   programmingLanguage: 'TypeScript',
 *   text: 'const x = 1;',
 *   name: 'Example Code',
 * });
 * ```
 */
declare function generateCodeLD(code: {
    programmingLanguage: string;
    text: string;
    name?: string;
}): StructuredData;
/**
 * Generate Schema.org VideoObject JSON-LD
 *
 * AI가 튜토리얼 비디오를 이해하고 추천할 수 있도록 VideoObject 구조화된 데이터 생성
 *
 * @param video - Video configuration
 * @returns Schema.org VideoObject JSON-LD
 *
 * @example
 * ```tsx
 * const videoLd = generateVideoLD({
 *   name: 'Getting Started with hua',
 *   description: 'Learn how to build with hua',
 *   thumbnailUrl: 'https://example.com/thumb.jpg',
 *   uploadDate: '2025-12-29',
 *   duration: 'PT10M30S',
 * });
 * ```
 */
declare function generateVideoLD(video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
}): StructuredData;
/**
 * Generate Schema.org Organization JSON-LD
 *
 * AI가 조직/회사 정보를 이해하도록 Organization 구조화된 데이터 생성
 *
 * @param org - Organization configuration
 * @returns Schema.org Organization JSON-LD
 *
 * @example
 * ```tsx
 * const orgLd = generateOrganizationLD({
 *   name: 'hua-labs',
 *   url: 'https://example.com', // TODO: Update when domain is available
 *   logo: 'https://example.com/logo.png', // TODO: Update when domain is available
 *   description: 'Privacy-first development tools',
 * });
 * ```
 */
declare function generateOrganizationLD(org: {
    name: string;
    url?: string;
    logo?: string;
    description?: string;
}): StructuredData;
/**
 * Generate Schema.org FAQPage JSON-LD
 *
 * AI가 자주 묻는 질문에 답변할 수 있도록 FAQ 구조화된 데이터 생성
 *
 * @param faqs - Array of FAQ items
 * @returns Schema.org FAQ JSON-LD
 *
 * @example
 * ```tsx
 * const faqLd = generateFAQPageLD([
 *   {
 *     question: 'What is hua?',
 *     answer: 'hua is a privacy-first UX framework for Next.js applications.',
 *   },
 *   {
 *     question: 'How do I install hua?',
 *     answer: 'Run: npx @hua-labs/create-hua my-app',
 *   },
 * ]);
 * ```
 */
declare function generateFAQPageLD(faqs: Array<{
    question: string;
    answer: string;
}>): StructuredData;
/**
 * Generate Schema.org TechArticle JSON-LD
 *
 * AI가 기술 문서를 정확하게 이해하도록 기술 아티클 구조화된 데이터 생성
 *
 * @param article - Article configuration
 * @returns Schema.org TechArticle JSON-LD
 *
 * @example
 * ```tsx
 * const articleLd = generateTechArticleLD({
 *   headline: 'Getting Started with hua',
 *   description: 'Learn how to build privacy-first UX with hua',
 *   datePublished: '2025-12-29',
 *   author: { name: 'hua-labs' },
 * });
 * ```
 */
declare function generateTechArticleLD(article: {
    headline: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    author?: {
        name: string;
        url?: string;
    };
    image?: string;
}): StructuredData;
/**
 * Generate Schema.org HowTo JSON-LD
 *
 * AI가 튜토리얼/가이드를 이해하고 추천할 수 있도록 HowTo 구조화된 데이터 생성
 *
 * @param howTo - HowTo configuration
 * @returns Schema.org HowTo JSON-LD
 *
 * @example
 * ```tsx
 * const howToLd = generateHowToLD({
 *   name: 'How to add i18n to your Next.js app',
 *   description: 'Step-by-step guide to internationalization',
 *   steps: [
 *     { name: 'Install hua', text: 'Run: npx @hua-labs/create-hua my-app' },
 *     { name: 'Configure i18n', text: 'Add locales to your config' },
 *   ],
 * });
 * ```
 */
declare function generateHowToLD(howTo: {
    name: string;
    description?: string;
    steps: Array<{
        name: string;
        text: string;
        image?: string;
    }>;
    totalTime?: string;
}): StructuredData;

export { type GEOConfig as G, META_NAMES as M, OG_PROPERTIES as O, type ProgrammingLanguage as P, type RequiredGEOConfig as R, type SoftwareApplicationType as S, type TechnologyStack as T, type GEOMetadata as a, type SoftwareCategory as b, type StructuredData as c, createAIContext as d, generateGEOMetadata as e, generateHowToLD as f, generateFAQPageLD as g, generateSoftwareApplicationLD as h, generateTechArticleLD as i, type GEOConfigInput as j, type OptionalGEOConfig as k, generateCodeLD as l, generateOrganizationLD as m, generateVideoLD as n, isValidGEOConfig as o, metaToObject as p, openGraphToObject as q, renderJSONLD as r };
