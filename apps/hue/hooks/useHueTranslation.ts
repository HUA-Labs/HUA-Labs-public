/**
 * useHueTranslation - Hue 전용 번역 훅
 *
 * @hua-labs/i18n-core와 로컬 번역 데이터를 연결
 * - t 객체: 중첩 객체 스타일 (t.toolbar.undo)
 * - translate 함수: 플랫 키 스타일 (translate('toolbar.undo'))
 */

import { useTranslation as useCoreTranslation } from "@hua-labs/i18n-core";
import { ko, type TranslationKeys } from "@/i18n/ko";
import { en } from "@/i18n/en";
import { LANGUAGES, type Language } from "@/store/i18n-store";

const translations = { ko, en };

/**
 * Hue 전용 번역 훅
 */
export function useHueTranslation() {
  const {
    currentLanguage,
    setLanguage,
    t: translate,
    isLoading,
    isInitialized,
  } = useCoreTranslation();

  // 현재 언어의 번역 객체
  const t: TranslationKeys = translations[currentLanguage as Language] || translations.ko;

  return {
    /** 번역 객체 (중첩 스타일) - t.toolbar.undo */
    t,
    /** 번역 함수 (플랫 키 스타일) - translate('toolbar.undo') */
    translate,
    /** 현재 언어 */
    language: currentLanguage as Language,
    /** 언어 변경 함수 */
    setLanguage: (lang: Language) => setLanguage(lang),
    /** 지원 언어 목록 */
    languages: LANGUAGES,
    /** 로딩 중 여부 */
    isLoading,
    /** 초기화 완료 여부 */
    isInitialized,
  };
}

export default useHueTranslation;
