/**
 * Server-side i18n utilities for Next.js App Router
 * 
 * This file contains server-only functions that use Node.js APIs.
 * These functions should NOT be imported in client components.
 */
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { SupportedLanguage } from './store';

/**
 * Load translation namespaces for a given language from JSON files.
 *
 * If a namespace file is missing or invalid, a warning is logged and that namespace is returned as an empty object.
 *
 * @param language - Language code to load translations for
 * @returns An object mapping each namespace (`common`, `pages`, `examples`) to its translations (or an empty object on error)
 */
async function loadTranslationsFromFiles(language: SupportedLanguage) {
  const namespaces = ['common', 'pages', 'examples'];
  const translations: Record<string, any> = {};

  for (const namespace of namespaces) {
    try {
      const filePath = join(process.cwd(), 'translations', language, `${namespace}.json`);
      const fileContent = await readFile(filePath, 'utf-8');
      translations[namespace] = JSON.parse(fileContent);
    } catch (error) {
      console.warn(`Failed to load ${namespace} for ${language}:`, error);
      translations[namespace] = {};
    }
  }

  return translations;
}

/**
 * Load translations for server-side rendering and return them keyed by the requested language.
 *
 * @param language - Language code to load translations for (defaults to `'ko'`)
 * @returns An object whose key is the provided language and whose value is a translations object mapping namespaces (`common`, `pages`, `examples`) to their translation data
 */
export async function loadSSRTranslations(language: SupportedLanguage = 'ko') {
  const translations = await loadTranslationsFromFiles(language);
  return {
    [language]: translations,
  };
}
