/**
 * i18n - Internationalization
 *
 * 가벼운 Zustand 기반 i18n 시스템
 * - 한국어/영어 지원
 * - localStorage persist
 * - useTranslation hook
 */

export { ko, type TranslationKeys } from "./ko";
export { en } from "./en";

import { ko } from "./ko";
import { en } from "./en";

export type Language = "ko" | "en";

export const LANGUAGES: Record<Language, { name: string; nativeName: string }> = {
  ko: { name: "Korean", nativeName: "한국어" },
  en: { name: "English", nativeName: "English" },
};

export const translations = {
  ko,
  en,
} as const;

export type Translations = typeof translations;
