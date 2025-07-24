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
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <p>{t('welcome_message')}</p> {/* TypeScript 파일에서 로드된 번역 */}
      <p>{t('test_message')}</p> {/* TypeScript 파일에서 로드된 번역 */}
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
} 