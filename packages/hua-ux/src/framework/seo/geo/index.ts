/**
 * @hua-labs/hua-ux/framework - GEO (Generative Engine Optimization)
 *
 * Make your application discoverable and recommendable by AI search engines
 * (ChatGPT, Claude, Gemini, Perplexity)
 *
 * ChatGPT, Claude, Gemini, Perplexity 같은 AI 검색 엔진이
 * 당신의 애플리케이션을 잘 찾고 추천하도록 최적화
 */

// Main GEO function
export { generateGEOMetadata, renderJSONLD, createAIContext } from './generateGEOMetadata';

// Structured data helpers
export {
  generateSoftwareApplicationLD,
  generateFAQPageLD,
  generateTechArticleLD,
  generateHowToLD,
} from './structuredData';

// Types
export type {
  GEOConfig,
  GEOMetadata,
  StructuredData,
  SoftwareApplicationType,
  SoftwareCategory,
  ProgrammingLanguage,
} from './types';
