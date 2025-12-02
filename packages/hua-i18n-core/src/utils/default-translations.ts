/**
 * 기본 번역 데이터 유틸리티
 * 
 * 번역 파일을 로드할 수 없을 때 사용되는 기본 번역 데이터를 제공합니다.
 */

/**
 * 기본 번역 데이터
 */
const DEFAULT_TRANSLATIONS: Record<string, Record<string, Record<string, string>>> = {
  ko: {
    common: {
      welcome: "환영합니다",
      greeting: "안녕하세요",
      goodbye: "안녕히 가세요",
      loading: "로딩 중...",
      error: "오류가 발생했습니다",
      success: "성공했습니다",
      cancel: "취소",
      confirm: "확인",
      save: "저장",
      delete: "삭제",
      edit: "편집",
      add: "추가",
      search: "검색",
      filter: "필터",
      sort: "정렬",
      refresh: "새로고침",
      back: "뒤로",
      next: "다음",
      previous: "이전",
      home: "홈",
      about: "소개",
      contact: "연락처",
      settings: "설정",
      profile: "프로필",
      logout: "로그아웃",
      login: "로그인",
      register: "회원가입"
    },
    auth: {
      login: "로그인",
      logout: "로그아웃",
      register: "회원가입",
      email: "이메일",
      password: "비밀번호",
      forgot_password: "비밀번호 찾기",
      remember_me: "로그인 상태 유지"
    },
    errors: {
      not_found: "페이지를 찾을 수 없습니다",
      server_error: "서버 오류가 발생했습니다",
      network_error: "네트워크 오류가 발생했습니다",
      unauthorized: "인증이 필요합니다",
      forbidden: "접근이 거부되었습니다"
    }
  },
  en: {
    common: {
      welcome: "Welcome",
      greeting: "Hello",
      goodbye: "Goodbye",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      refresh: "Refresh",
      back: "Back",
      next: "Next",
      previous: "Previous",
      home: "Home",
      about: "About",
      contact: "Contact",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      register: "Register"
    },
    auth: {
      login: "Login",
      logout: "Logout",
      register: "Register",
      email: "Email",
      password: "Password",
      forgot_password: "Forgot Password",
      remember_me: "Remember Me"
    },
    errors: {
      not_found: "Page not found",
      server_error: "Server error occurred",
      network_error: "Network error occurred",
      unauthorized: "Authentication required",
      forbidden: "Access denied"
    }
  }
};

/**
 * Retrieve the default translation map for the specified language and namespace.
 *
 * @param language - Language code, e.g., "ko" or "en"
 * @param namespace - Namespace name, e.g., "common" or "auth"
 * @returns The translation key → string map for the given language and namespace, or an empty object if none exists
 */
export function getDefaultTranslations(
  language: string,
  namespace: string
): Record<string, string> {
  return DEFAULT_TRANSLATIONS[language]?.[namespace] || {};
}

/**
 * Retrieve the full set of default translations for all languages and namespaces.
 *
 * @returns The complete nested translations object keyed first by language, then by namespace, then by translation key with string values.
 */
export function getAllDefaultTranslations(): Record<string, Record<string, Record<string, string>>> {
  return DEFAULT_TRANSLATIONS;
}
