'use client';

import { useTranslation } from '@hua-labs/i18n-core';
import { Button } from '@hua-labs/hua-ux';
import { Globe } from '@phosphor-icons/react';
import { useMotion } from '@hua-labs/hua-ux/framework';

/**
 * LanguageToggle Component
 *
 * Allows users to switch between available languages
 */
export function LanguageToggle() {
  const { currentLanguage, changeLanguage, availableLanguages } = useTranslation();
  const { ref, isVisible } = useMotion('fade-in-up');

  const handleToggle = () => {
    // Toggle between available languages
    const currentIndex = availableLanguages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    changeLanguage(availableLanguages[nextIndex]);
  };

  const languageLabels: Record<string, string> = {
    ko: '한국어',
    en: 'English',
  };

  return (
    <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="gap-2"
        aria-label="Toggle language"
      >
        <Globe size={16} weight="duotone" />
        <span>{languageLabels[currentLanguage] || currentLanguage}</span>
      </Button>
    </div>
  );
}
