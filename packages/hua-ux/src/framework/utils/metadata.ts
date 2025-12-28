/**
 * @hua-labs/hua-ux/framework - Metadata Utilities
 * 
 * Next.js Metadata 생성 유틸리티
 */

import type { Metadata } from 'next';

/**
 * SEO 설정 타입
 */
export interface SEOConfig {
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
 * Generates metadata that can be used in Next.js App Router's `export const metadata`.
 * 
 * @param options - 메타데이터 옵션
 * @param options.title - 페이지 제목
 * @param options.description - 페이지 설명
 * @param options.seo - SEO 설정 (선택적)
 * @returns Next.js Metadata 객체
 * 
 * @example
 * ```tsx
 * // app/page.tsx
 * import { generatePageMetadata } from '@hua-labs/hua-ux/framework';
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
 */
export function generatePageMetadata(options: {
  title: string;
  description?: string;
  seo?: SEOConfig;
}): Metadata {
  const { title, description, seo } = options;

  const metadata: Metadata = {
    title,
    description,
  };

  // Keywords 추가
  if (seo?.keywords && seo.keywords.length > 0) {
    metadata.keywords = seo.keywords;
  }

  // Open Graph 메타데이터
  if (seo?.ogImage || seo?.ogTitle || seo?.ogDescription || seo?.ogType) {
    metadata.openGraph = {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      type: seo.ogType || 'website',
      ...(seo.ogImage && { images: [{ url: seo.ogImage }] }),
    };
  }

  // Twitter Card 메타데이터 (Open Graph가 있으면 자동으로 사용)
  if (seo?.ogImage) {
    metadata.twitter = {
      card: 'summary_large_image',
      ...(seo.ogTitle && { title: seo.ogTitle }),
      ...(seo.ogDescription && { description: seo.ogDescription }),
      ...(seo.ogImage && { images: [seo.ogImage] }),
    };
  }

  return metadata;
}
