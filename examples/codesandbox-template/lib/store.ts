import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr';

interface AppStore {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

// 패키지 README 예제와 동일한 구조 (persist 미들웨어 사용)
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);

