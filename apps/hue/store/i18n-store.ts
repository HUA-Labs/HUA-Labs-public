/**
 * i18n Store (using @hua-labs/i18n-core-zustand)
 *
 * Zustand 기반 언어 설정 스토어
 * - localStorage persist
 * - @hua-labs/i18n-core-zustand와 연동
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ZustandLanguageStore, SupportedLanguage } from "@hua-labs/i18n-core-zustand";

// 지원 언어
export type Language = "ko" | "en";

export const LANGUAGES: Record<Language, { name: string; nativeName: string }> = {
  ko: { name: "Korean", nativeName: "한국어" },
  en: { name: "English", nativeName: "English" },
};

/**
 * i18n 스토어 인터페이스
 */
interface I18nState extends ZustandLanguageStore<Language> {
  language: Language;
  setLanguage: (language: Language) => void;
}

/**
 * 브라우저 언어 감지
 */
function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "ko";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("en")) return "en";

  return "ko"; // 기본값
}

/**
 * i18n 스토어
 */
export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: "ko", // SSR 기본값과 일치

      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: "hue-i18n",
      partialize: (state) => ({ language: state.language }),
    }
  )
);

/**
 * 번역 훅 (편의용) - 컴포넌트에서 사용
 * @deprecated useTranslation from @hua-labs/i18n-core 사용 권장
 */
export function useLanguageSettings() {
  const language = useI18nStore((s) => s.language);
  const setLanguage = useI18nStore((s) => s.setLanguage);

  return {
    language,
    setLanguage,
    languages: LANGUAGES,
  };
}

export { LANGUAGES as languageList };
