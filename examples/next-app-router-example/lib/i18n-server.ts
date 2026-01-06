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
type TranslationValue =
  | string
  | number
  | boolean
  | readonly TranslationValue[]
  | { readonly [key: string]: TranslationValue };

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
 * 
 * Returns translations in the format expected by I18nProvider:
 * Record<language, Record<namespace, Record<key, string>>>
 */
export async function loadSSRTranslations(
  language: SupportedLanguage = 'ko'
): Promise<Record<string, Record<string, Record<string, string>>> {
  const translations = await loadTranslationsFromFiles(language);
  
  // Convert TranslationValue to string for I18nProvider compatibility
  const stringTranslations: Record<string, Record<string, string>> = {};
  
  for (const [namespace, namespaceTranslations] of Object.entries(translations)) {
    stringTranslations[namespace] = flattenTranslations(namespaceTranslations);
  }
  
  return {
    [language]: stringTranslations,
  };
}

/**
 * Flatten nested translation objects to string values
 * Handles nested objects and arrays by converting them to JSON strings
 */
function flattenTranslations(
  translations: Record<string, TranslationValue>
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value === 'string') {
      result[key] = value;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result[key] = String(value);
    } else if (Array.isArray(value)) {
      result[key] = JSON.stringify(value);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = JSON.stringify(value);
    }
  }
  
  return result;
}
