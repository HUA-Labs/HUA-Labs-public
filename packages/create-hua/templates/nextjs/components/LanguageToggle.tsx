'use client';

import { useTranslation, useLanguageChange } from '@hua-labs/hua/i18n';

export function LanguageToggle() {
  const { currentLanguage } = useTranslation();
  const { changeLanguage, supportedLanguages } = useLanguageChange();

  const codes = supportedLanguages.map(lang => lang.code);

  return (
    <div className="flex items-center gap-0.5 text-sm font-mono">
      {codes.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-border mx-1">/</span>}
          <button
            onClick={() => changeLanguage(code)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              currentLanguage === code
                ? 'text-primary font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
