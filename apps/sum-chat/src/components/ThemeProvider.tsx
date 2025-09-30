import React, { createContext, useContext, useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { themes, ThemeName } from '@/theme';

type ThemeKey = ThemeName;

const ThemeContext = createContext({
  theme: 'light' as ThemeKey,
  mode: 'light',
  colors: themes['light'],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, mode } = useThemeStore();
  const [resolvedTheme, setResolvedTheme] = useState<ThemeKey>('light');

  useEffect(() => {
    // theme가 ThemeName에 포함되면 우선 적용
    if (theme in themes) {
      setResolvedTheme(theme as ThemeKey);
    } else if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => setResolvedTheme(mq.matches ? 'dark' : 'light');
      updateTheme();
      mq.addEventListener('change', updateTheme);
      return () => mq.removeEventListener('change', updateTheme);
    } else if (mode in themes) {
      setResolvedTheme(mode as ThemeKey);
    } else {
      setResolvedTheme('light');
    }
  }, [theme, mode]);

  const colors = themes[resolvedTheme] || themes['light'];

  // body에 CSS 변수 동기화
  useEffect(() => {
    if (typeof window === 'undefined') return;
    Object.entries(colors).forEach(([key, value]) => {
      document.body.style.setProperty(`--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`, String(value));
    });
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, mode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 