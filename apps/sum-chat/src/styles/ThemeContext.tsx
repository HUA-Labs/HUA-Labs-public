import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes, ThemeName, Theme } from './themes';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const setTheme = (name: ThemeName) => setThemeName(name);
  const value = { theme: themes[themeName], themeName, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}; 