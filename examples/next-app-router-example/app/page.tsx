/**
 * Home Page - Client Component Example
 * 
 * This page demonstrates:
 * - Client-side translation usage
 * - Language switching
 * - Multiple namespaces
 */
'use client';

import { useTranslation } from '@hua-labs/i18n-core';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { RawValueExample } from '@/components/RawValueExample';
import { MultipleNamespacesExample } from '@/components/MultipleNamespacesExample';

export default function Home() {
  const { t, currentLanguage, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading translations...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        {/* currentLanguage를 key로 사용하여 언어 변경 시 애니메이션 트리거 */}
        <div className="text-center space-y-4" key={currentLanguage}>
          <h1 className="text-4xl font-bold translation-content">{t('common:welcome')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 translation-content">
            {t('common:description')}
          </p>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 translation-content" key={`features-title-${currentLanguage}`}>
            {t('common:features')}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 translation-content" key={`feature1-${currentLanguage}`}>
              <span className="text-green-500 text-xl">✓</span>
              <span>{t('common:feature1')}</span>
            </li>
            <li className="flex items-start gap-3 translation-content" key={`feature2-${currentLanguage}`}>
              <span className="text-green-500 text-xl">✓</span>
              <span>{t('common:feature2')}</span>
            </li>
            <li className="flex items-start gap-3 translation-content" key={`feature3-${currentLanguage}`}>
              <span className="text-green-500 text-xl">✓</span>
              <span>{t('common:feature3')}</span>
            </li>
            <li className="flex items-start gap-3 translation-content" key={`feature4-${currentLanguage}`}>
              <span className="text-green-500 text-xl">✓</span>
              <span>{t('common:feature4')}</span>
            </li>
            <li className="flex items-start gap-3 translation-content" key={`feature5-${currentLanguage}`}>
              <span className="text-green-500 text-xl">✓</span>
              <span>{t('common:feature5')}</span>
            </li>
          </ul>
        </div>

        {/* Multiple Namespaces Example */}
        <MultipleNamespacesExample />

        {/* Raw Value Example (Arrays/Objects) */}
        <RawValueExample />

        {/* Debug Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current language: <strong className="translation-content" key={`lang-${currentLanguage}`}>{currentLanguage}</strong>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 translation-content" key={`hint-${currentLanguage}`}>
            Try switching languages above - notice the smooth transition!
          </p>
        </div>
      </div>
    </main>
  );
}

