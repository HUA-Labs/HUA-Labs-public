/**
 * Zustand store for language management
 * This store is used with @hua-labs/i18n-core-zustand adapter
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr';

interface AppStore {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

/**
 * Global app store with language state
 * Uses Zustand persist middleware to save language preference
 */
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

