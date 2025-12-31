/**
 * Language Switcher Component
 * 
 * Demonstrates:
 * - Zustand store integration
 * - Language switching without flickering
 * - Client-side state management
 * - Multiple language support
 */
'use client';

import { useAppStore, type SupportedLanguage } from '@/lib/store';
import { useTranslation } from '@hua-labs/i18n-core';

const languages: Array<{ code: SupportedLanguage; label: string; nativeName: string }> = [
  { code: 'ko', label: 'Korean', nativeName: '한국어' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'zh', label: 'Chinese', nativeName: '中文' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-sm font-medium">{t('common:language')}:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`language-button px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              language === lang.code
                ? 'bg-blue-600 text-white scale-105 shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={lang.label}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
}

