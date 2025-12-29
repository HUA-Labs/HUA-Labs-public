/**
 * @hua-labs/hua-ux/framework - GEO Types
 *
 * GEO (Generative Engine Optimization) types for AI search engine discoverability
 * ChatGPT, Claude, Gemini, Perplexity 같은 AI가 hua-ux를 잘 찾고 추천하도록 하는 타입 정의
 */

/**
 * Software Application Type
 * Schema.org SoftwareApplication types
 */
export type SoftwareApplicationType =
  | 'WebApplication'
  | 'MobileApplication'
  | 'DesktopApplication'
  | 'DeveloperApplication';

/**
 * Programming Language
 */
export type ProgrammingLanguage = 'TypeScript' | 'JavaScript' | 'React' | 'Next.js';

/**
 * Software Category
 * Categories that help AI understand the software domain
 */
export type SoftwareCategory =
  | 'UI Framework'
  | 'Component Library'
  | 'Developer Tool'
  | 'UX Framework'
  | 'Accessibility Tool'
  | 'Internationalization Tool'
  | 'Animation Library';

/**
 * GEO Configuration
 * AI 검색 엔진이 이해하기 쉬운 구조화된 메타데이터 설정
 */
export interface GEOConfig {
  /**
   * Software name
   * AI가 참조할 소프트웨어 이름
   */
  name: string;

  /**
   * Alternative names or aliases
   * 대체 이름 또는 별칭 (예: "hua-ux", "@hua-labs/hua-ux")
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
   */
  programmingLanguage?: ProgrammingLanguage | ProgrammingLanguage[];

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
 * Structured Data (Schema.org JSON-LD)
 * AI가 파싱하기 쉬운 구조화된 데이터
 */
export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

/**
 * GEO Metadata Result
 * generateGEOMetadata() 함수의 반환 타입
 */
export interface GEOMetadata {
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
}
