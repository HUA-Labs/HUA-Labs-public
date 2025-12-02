"use client";

import { useI18n } from './useI18n';

/**
 * 간단한 번역 훅 (원본 SDK와 호환)
 * 
 * @example
 * ```tsx
 * import { useTranslation } from '@hua-labs/i18n-core';
 * 
 * function MyComponent() {
 *   const { t, currentLanguage, setLanguage, isLoading, error } = useTranslation();
 *   
 *   return (
 *     <div>
 *       <h1>{t('welcome')}</h1>
 *       <p>Current language: {currentLanguage}</p>
 *       <button onClick={() => setLanguage('en')}>Switch to English</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTranslation() {
  const { t, tWithParams, currentLanguage, setLanguage, getRawValue, isLoading, error, supportedLanguages, debug, isInitialized } = useI18n();
  
  return {
    t,
    tWithParams,
    currentLanguage,
    setLanguage,
    getRawValue,
    isLoading,
    error,
    supportedLanguages,
    debug,
    isInitialized,
  };
}

/**
 * Hook that exposes the current language, supported languages, and a validated language-change function.
 *
 * The `changeLanguage` function attempts to switch the active language to the provided language code; if the code matches a supported language it applies the change, otherwise it logs a warning.
 *
 * @returns An object with:
 * - `currentLanguage` — the currently active language code.
 * - `changeLanguage` — a function `(language: string) => void` that attempts to change the language as described above.
 * - `supportedLanguages` — the list of supported language descriptors.
 */
export function useLanguageChange() {
  const { currentLanguage, setLanguage, supportedLanguages } = useI18n();
  
  const changeLanguage = (language: string) => {
    const supported = supportedLanguages.find(lang => lang.code === language);
    if (supported) {
      setLanguage(language);
    } else {
      console.warn(`Language ${language} is not supported`);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    supportedLanguages,
  };
} 