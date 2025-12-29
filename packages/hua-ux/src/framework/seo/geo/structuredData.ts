/**
 * @hua-labs/hua-ux/framework - Structured Data Helpers
 *
 * Schema.org JSON-LD helpers for AI search engines
 * AI 검색 엔진이 이해하기 쉬운 구조화된 데이터 생성
 */

import type {
  GEOConfig,
  StructuredData,
  SoftwareApplicationType,
  ProgrammingLanguage,
  SoftwareCategory,
} from './types';

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
 *   name: 'hua-ux',
 *   description: 'Privacy-first UX framework for Next.js',
 *   version: '1.0.0',
 *   applicationCategory: 'UX Framework',
 *   programmingLanguage: ['TypeScript', 'React'],
 *   features: ['i18n', 'Motion', 'Accessibility'],
 * });
 * ```
 */
export function generateSoftwareApplicationLD(config: GEOConfig): StructuredData {
  const jsonLd: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
  };

  // Alternative names
  if (config.alternateName && config.alternateName.length > 0) {
    jsonLd.alternateName = config.alternateName;
  }

  // Version
  if (config.version) {
    jsonLd.softwareVersion = config.version;
  }

  // Application category
  if (config.applicationCategory) {
    jsonLd.applicationCategory = Array.isArray(config.applicationCategory)
      ? config.applicationCategory.join(', ')
      : config.applicationCategory;
  }

  // Programming language
  if (config.programmingLanguage) {
    jsonLd.programmingLanguage = config.programmingLanguage;
  }

  // Application type
  if (config.applicationType) {
    jsonLd.applicationSubType = config.applicationType;
  }

  // URLs
  if (config.url) {
    jsonLd.url = config.url;
  }

  if (config.documentationUrl) {
    jsonLd.softwareHelp = {
      '@type': 'CreativeWork',
      url: config.documentationUrl,
    };
  }

  if (config.codeRepository) {
    jsonLd.codeRepository = config.codeRepository;
  }

  // License
  if (config.license) {
    jsonLd.license = config.license;
  }

  // Author
  if (config.author) {
    jsonLd.author = {
      '@type': 'Organization',
      name: config.author.name,
      ...(config.author.url && { url: config.author.url }),
    };
  }

  // Features as keywords
  if (config.features && config.features.length > 0) {
    jsonLd.featureList = config.features.join(', ');
  }

  // Keywords
  if (config.keywords && config.keywords.length > 0) {
    jsonLd.keywords = config.keywords.join(', ');
  }

  // Operating system
  if (config.operatingSystem && config.operatingSystem.length > 0) {
    jsonLd.operatingSystem = config.operatingSystem.join(', ');
  }

  // Software requirements
  if (config.softwareRequirements && config.softwareRequirements.length > 0) {
    jsonLd.softwareRequirements = config.softwareRequirements.join(', ');
  }

  return jsonLd;
}

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
 *     question: 'What is hua-ux?',
 *     answer: 'hua-ux is a privacy-first UX framework for Next.js applications.',
 *   },
 *   {
 *     question: 'How do I install hua-ux?',
 *     answer: 'Run: npx create-hua-ux my-app',
 *   },
 * ]);
 * ```
 */
export function generateFAQPageLD(
  faqs: Array<{ question: string; answer: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

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
 *   headline: 'Getting Started with hua-ux',
 *   description: 'Learn how to build privacy-first UX with hua-ux',
 *   datePublished: '2025-12-29',
 *   author: { name: 'hua-labs' },
 * });
 * ```
 */
export function generateTechArticleLD(article: {
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url?: string };
  image?: string;
}): StructuredData {
  const jsonLd: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.headline,
  };

  if (article.description) {
    jsonLd.description = article.description;
  }

  if (article.datePublished) {
    jsonLd.datePublished = article.datePublished;
  }

  if (article.dateModified) {
    jsonLd.dateModified = article.dateModified;
  }

  if (article.author) {
    jsonLd.author = {
      '@type': 'Organization',
      name: article.author.name,
      ...(article.author.url && { url: article.author.url }),
    };
  }

  if (article.image) {
    jsonLd.image = article.image;
  }

  return jsonLd;
}

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
 *     { name: 'Install hua-ux', text: 'Run: npx create-hua-ux my-app' },
 *     { name: 'Configure i18n', text: 'Add locales to your config' },
 *   ],
 * });
 * ```
 */
export function generateHowToLD(howTo: {
  name: string;
  description?: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
}): StructuredData {
  const jsonLd: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };

  if (howTo.description) {
    jsonLd.description = howTo.description;
  }

  if (howTo.totalTime) {
    jsonLd.totalTime = howTo.totalTime;
  }

  return jsonLd;
}
