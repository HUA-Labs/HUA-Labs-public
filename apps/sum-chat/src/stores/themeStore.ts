import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'default' | 'sum-prism' | 'hyper-tomato';
type Mode = 'system' | 'light' | 'dark' | 'default';

interface ThemeState {
  mode: Mode;
  setMode: (m: Mode) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (m) => set({ mode: m }),
      theme: 'default',
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: 'theme-settings',
    }
  )
); 