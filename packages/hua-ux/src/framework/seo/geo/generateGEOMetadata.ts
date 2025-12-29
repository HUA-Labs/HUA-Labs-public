/**
 * @hua-labs/hua-ux/framework - GEO Metadata Generator
 *
 * Generate AI-friendly metadata for Generative Engine Optimization (GEO)
 * ChatGPT, Claude, Gemini, Perplexity가 hua-ux를 잘 찾고 추천하도록 메타데이터 생성
 */

import type { GEOConfig, GEOMetadata } from './types';
import { generateSoftwareApplicationLD } from './structuredData';

/**
 * Generate GEO (Generative Engine Optimization) Metadata
 *
 * AI 검색 엔진이 소프트웨어를 정확하게 이해하고 추천할 수 있도록
 * 구조화된 메타데이터를 생성합니다.
 *
 * Generate structured metadata that helps AI search engines (ChatGPT, Claude,
 * Gemini, Perplexity) accurately understand and recommend your software.
 *
 * @param config - GEO configuration
 * @returns GEO metadata including meta tags, JSON-LD, Open Graph, and Twitter cards
 *
 * @example
 * ```tsx
 * // Basic usage
 * const geoMetadata = generateGEOMetadata({
 *   name: 'hua-ux',
 *   description: 'Privacy-first UX framework for Next.js with built-in i18n, motion, and accessibility',
 *   version: '1.0.0',
 *   applicationCategory: ['UX Framework', 'Developer Tool'],
 *   programmingLanguage: ['TypeScript', 'React', 'Next.js'],
 *   features: [
 *     'Privacy-first architecture',
 *     'Built-in internationalization (i18n)',
 *     'Motion animations with hua-motion',
 *     'WCAG 2.1 compliant accessibility',
 *     'Automatic error handling',
 *     'Loading state optimization',
 *   ],
 *   useCases: [
 *     'Building multilingual Next.js applications',
 *     'Creating accessible web applications',
 *     'Rapid prototyping with AI-friendly documentation',
 *   ],
 *   keywords: [
 *     'nextjs',
 *     'react',
 *     'ux',
 *     'i18n',
 *     'internationalization',
 *     'accessibility',
 *     'a11y',
 *     'motion',
 *     'animation',
 *     'privacy',
 *   ],
 *   codeRepository: 'https://github.com/hua-labs/hua',
 *   documentationUrl: 'https://hua-labs.dev/docs/hua-ux',
 *   license: 'MIT',
 *   author: {
 *     name: 'hua-labs',
 *     url: 'https://hua-labs.dev',
 *   },
 * });
 * ```
 *
 * @example
 * ```tsx
 * // Use with Next.js metadata
 * import { generateGEOMetadata } from '@hua-labs/hua-ux/framework';
 *
 * export async function generateMetadata() {
 *   const geoMeta = generateGEOMetadata({
 *     name: 'My App',
 *     description: 'Built with hua-ux',
 *     features: ['i18n', 'Dark mode', 'Responsive'],
 *   });
 *
 *   return {
 *     title: 'My App',
 *     description: geoMeta.meta.find(m => m.name === 'description')?.content,
 *     // Add JSON-LD to page
 *     other: {
 *       'script:ld+json': JSON.stringify(geoMeta.jsonLd),
 *     },
 *   };
 * }
 * ```
 */
export function generateGEOMetadata(config: GEOConfig): GEOMetadata {
  // Generate meta tags
  const meta = [
    {
      name: 'description',
      content: config.description,
    },
  ];

  // Add keywords meta tag
  if (config.keywords && config.keywords.length > 0) {
    meta.push({
      name: 'keywords',
      content: config.keywords.join(', '),
    });
  }

  // Add software-specific meta tags
  if (config.version) {
    meta.push({
      name: 'software:version',
      content: config.version,
    });
  }

  if (config.applicationCategory) {
    const categories = Array.isArray(config.applicationCategory)
      ? config.applicationCategory
      : [config.applicationCategory];
    meta.push({
      name: 'software:category',
      content: categories.join(', '),
    });
  }

  if (config.programmingLanguage) {
    const languages = Array.isArray(config.programmingLanguage)
      ? config.programmingLanguage
      : [config.programmingLanguage];
    meta.push({
      name: 'software:language',
      content: languages.join(', '),
    });
  }

  // Generate JSON-LD structured data
  const jsonLd = [generateSoftwareApplicationLD(config)];

  // Generate Open Graph tags
  const openGraph = [
    {
      property: 'og:title',
      content: config.name,
    },
    {
      property: 'og:description',
      content: config.description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ];

  if (config.url) {
    openGraph.push({
      property: 'og:url',
      content: config.url,
    });
  }

  // Add Open Graph article tags for software
  if (config.author) {
    openGraph.push({
      property: 'og:site_name',
      content: config.author.name,
    });
  }

  // Generate Twitter Card tags
  const twitter = [
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: config.name,
    },
    {
      name: 'twitter:description',
      content: config.description,
    },
  ];

  return {
    meta,
    jsonLd,
    openGraph,
    twitter,
  };
}

/**
 * Render JSON-LD script tag for Next.js
 *
 * Next.js에서 사용할 수 있는 JSON-LD script 태그 생성
 *
 * @param jsonLd - JSON-LD structured data
 * @returns Script tag props for Next.js
 *
 * @example
 * ```tsx
 * import Script from 'next/script';
 * import { renderJSONLD } from '@hua-labs/hua-ux/framework';
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
export function renderJSONLD(jsonLd: unknown) {
  return {
    id: 'jsonld',
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(jsonLd),
    },
  };
}

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
 *   name: 'hua-ux',
 *   description: 'Privacy-first UX framework',
 *   features: ['i18n', 'Motion', 'Accessibility'],
 *   useCases: ['Multilingual apps', 'Accessible UX'],
 * });
 * // Returns: "hua-ux is a Privacy-first UX framework. Key features include: i18n, Motion, Accessibility. Common use cases: Multilingual apps, Accessible UX."
 * ```
 */
export function createAIContext(config: GEOConfig): string {
  const parts: string[] = [];

  // Basic description
  parts.push(`${config.name} is a ${config.description}`);

  // Features
  if (config.features && config.features.length > 0) {
    parts.push(`Key features include: ${config.features.join(', ')}`);
  }

  // Use cases
  if (config.useCases && config.useCases.length > 0) {
    parts.push(`Common use cases: ${config.useCases.join(', ')}`);
  }

  // Programming language
  if (config.programmingLanguage) {
    const languages = Array.isArray(config.programmingLanguage)
      ? config.programmingLanguage
      : [config.programmingLanguage];
    parts.push(`Built with: ${languages.join(', ')}`);
  }

  // Requirements
  if (config.softwareRequirements && config.softwareRequirements.length > 0) {
    parts.push(`Requires: ${config.softwareRequirements.join(', ')}`);
  }

  return parts.join('. ') + '.';
}
