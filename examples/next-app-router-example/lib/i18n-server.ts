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
 * Translation value can be a string, nested object, or array
 * Supports various JSON structures in translation files
 */
type TranslationValue = string | number | boolean | TranslationValue[] | Record<string, TranslationValue>;

/**
 * Load translations from JSON files
 * This function loads all namespaces for a given language
 */
async function loadTranslationsFromFiles(language: SupportedLanguage) {
  const namespaces = ['common', 'pages', 'examples'];
  const translations: Record<string, Record<string, TranslationValue>> = {};

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
 * Load translations from server-side (SSR)
 * Loads from JSON files in translations directory
 * 
 * This function should only be used in Server Components or API routes.
 */
export async function loadSSRTranslations(language: SupportedLanguage = 'ko') {
  const translations = await loadTranslationsFromFiles(language);
  return {
    [language]: translations,
  };
}

