/**
 * @hua-labs/hua-ux/framework - i18n Middleware
 * 
 * i18n middleware for automatic language detection and routing
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * i18n middleware configuration
 */
export interface I18nMiddlewareConfig {
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
 * @example
 * ```ts
 * // middleware.ts
 * import { createI18nMiddleware } from '@hua-labs/hua-ux/framework';
 * 
 * export default createI18nMiddleware({
 *   defaultLanguage: 'ko',
 *   supportedLanguages: ['ko', 'en'],
 * });
 * ```
 */
export function createI18nMiddleware(config: I18nMiddlewareConfig) {
  return function i18nMiddleware(request: NextRequest) {
    const { defaultLanguage, supportedLanguages, detectionStrategy = 'header' } = config;
    
    // Get language from various sources
    let language = defaultLanguage;
    
    if (detectionStrategy === 'header') {
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        // Simple language detection from Accept-Language header
        const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
        if (supportedLanguages.includes(preferredLang)) {
          language = preferredLang;
        }
      }
    } else if (detectionStrategy === 'cookie') {
      const cookieLang = request.cookies.get('language')?.value;
      if (cookieLang && supportedLanguages.includes(cookieLang)) {
        language = cookieLang;
      }
    } else if (detectionStrategy === 'path') {
      const pathLang = request.nextUrl.pathname.split('/')[1];
      if (pathLang && supportedLanguages.includes(pathLang)) {
        language = pathLang;
      }
    } else if (detectionStrategy === 'query') {
      const queryLang = request.nextUrl.searchParams.get('lang');
      if (queryLang && supportedLanguages.includes(queryLang)) {
        language = queryLang;
      }
    }
    
    // Add language to request headers for use in components
    const response = NextResponse.next();
    response.headers.set('x-language', language);
    
    return response;
  };
}
