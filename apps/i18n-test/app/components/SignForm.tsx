'use client';

import { useSimpleI18n } from '@hua-labs/i18n-beginner';

export default function SignupForm() {
  const { t, toggleLanguage, languageButtonText, isClient } = useSimpleI18n();

  // 하이드레이션 방지: 클라이언트에서만 렌더링
  if (!isClient) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">환영합니다</h1>
          <button className="px-3 py-1 text-sm bg-gray-200 rounded">
            English
          </button>
        </div>
        
        <form>
          <label className="block mb-2">안녕하세요</label>
          <input type="email" className="border p-2 block w-full mb-4" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            클릭하세요
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{t('welcome')}</h1>
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        >
          {languageButtonText}
        </button>
      </div>
      
      <form>
        <label className="block mb-2">{t('hello')}</label>
        <input type="email" className="border p-2 block w-full mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          {t('click_me')}
        </button>
      </form>
    </div>
  );
}