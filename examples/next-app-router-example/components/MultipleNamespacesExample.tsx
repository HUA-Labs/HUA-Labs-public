/**
 * Multiple Namespaces Example Component
 * 
 * Demonstrates:
 * - Using multiple namespaces (common, pages, examples)
 * - Namespace prefix in translation keys
 */
'use client';

import { useTranslation } from '@hua-labs/i18n-core';

export function MultipleNamespacesExample() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" key={currentLanguage}>
      <h2 className="text-2xl font-semibold mb-4 translation-content">Multiple Namespaces Example</h2>
      <div className="space-y-4">
        <div className="translation-content">
          <h3 className="font-semibold mb-2">Common Namespace:</h3>
          <p>{t('common:welcome')}</p>
        </div>
        <div className="translation-content">
          <h3 className="font-semibold mb-2">Pages Namespace:</h3>
          <p>
            <strong>{t('pages:home.title')}</strong>: {t('pages:home.description')}
          </p>
          <p>
            <strong>{t('pages:about.title')}</strong>: {t('pages:about.description')}
          </p>
        </div>
      </div>
    </div>
  );
}

