"use client";

/**
 * I18n Provider for Hue
 *
 * @hua-labs/i18n-core-zustand 기반 i18n 프로바이더
 */

import { createZustandI18n } from "@hua-labs/i18n-core-zustand";
import { useI18nStore } from "@/store/i18n-store";
import { ko } from "@/i18n/ko";
import { en } from "@/i18n/en";

// 초기 번역 데이터 (네트워크 요청 없이 바로 사용)
const initialTranslations = {
  ko: { common: flattenTranslations(ko) },
  en: { common: flattenTranslations(en) },
};

/**
 * 중첩 객체를 플랫한 키로 변환
 * { app: { name: "Hue" } } → { "app.name": "Hue" }
 */
function flattenTranslations(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenTranslations(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}

/**
 * Hue I18n Provider
 */
export const HueI18nProvider = createZustandI18n(useI18nStore, {
  defaultLanguage: "ko",
  fallbackLanguage: "en",
  namespaces: ["common"],
  supportedLanguages: ["ko", "en"],
  initialTranslations,
  translationLoader: "custom",
  loadTranslations: async (language, namespace) => {
    // 이미 initialTranslations에 있으므로 바로 반환
    if (language === "ko") return flattenTranslations(ko);
    if (language === "en") return flattenTranslations(en);
    return {};
  },
  debug: process.env.NODE_ENV === "development",
  autoUpdateHtmlLang: true,
});

export default HueI18nProvider;
