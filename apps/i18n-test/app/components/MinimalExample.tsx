'use client';

import { useSimpleI18n, useTranslationsFromFile } from '@hua-labs/i18n-beginner';
import { myTranslations } from '../../translations/myTranslations';

export default function MinimalExample() {
  const { t, toggleLanguage, languageButtonText, isClient } = useSimpleI18n();

  // TypeScript 파일에서 번역 자동 로드
  useTranslationsFromFile(myTranslations);

  // 하이드레이션 방지
  if (!isClient) {
    return (
      <div>
        <h1>환영합니다</h1>
        <p>안녕하세요</p>
        <p>커스텀 메시지</p>
        <button>English</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('welcome')}</h1>
        <p className="text-gray-600">{t('hello')}</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">TypeScript 파일에서 로드된 번역:</h3>
        <div className="space-y-2">
          <p><span className="text-sm text-gray-500">welcome_message:</span> {t('welcome_message')}</p>
          <p><span className="text-sm text-gray-500">test_message:</span> {t('test_message')}</p>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={toggleLanguage}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-medium"
        >
          🔄 {languageButtonText}
        </button>
      </div>
    </div>
  );
} 