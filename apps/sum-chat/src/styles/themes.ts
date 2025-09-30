export const themes = {
  light: {
    background: '#ffffff',
    text: '#222222',
    primary: '#4f8cff',
    secondary: '#f5f5f5',
    border: '#e0e0e0',
    accent: '#ffb300',
    error: '#e57373',
    // ... 기타 속성
  },
  dark: {
    background: '#181818',
    text: '#f5f5f5',
    primary: '#4f8cff',
    secondary: '#232323',
    border: '#333333',
    accent: '#ffb300',
    error: '#e57373',
    // ... 기타 속성
  },
  'sum-prism': {
    background: '#f6f8fa',
    text: '#24292e',
    primary: '#6f42c1',
    secondary: '#e1e4e8',
    border: '#d1d5da',
    accent: '#ffb300',
    error: '#e57373',
    // ... 기타 속성
  },
  'hyper-tomato': {
    background: '#2d1e2f',
    text: '#ffb3b3',
    primary: '#ff6347',
    secondary: '#3c2a4d',
    border: '#4b3b5c',
    accent: '#ffd700',
    error: '#ff6347',
    // ... 기타 속성
  },
};

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName]; 