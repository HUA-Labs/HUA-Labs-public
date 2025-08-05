'use client';

import { SimpleI18n, useSimpleI18n } from '@hua-labs/i18n-beginner';
import Link from 'next/link';

function BeginnerTestComponent() {
  const { t, toggleLanguage, languageButtonText, isClient, currentLanguage } = useSimpleI18n();

  // 하이드레이션 방지
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">로딩 중...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">🌐 현재 언어: {currentLanguage}</h3>
        <button 
          onClick={toggleLanguage}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-medium"
        >
          🔄 {languageButtonText}
        </button>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold mb-4 text-green-800">📝 기본 번역 테스트</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">welcome:</span>
            <div className="text-green-700 font-medium">{t('welcome')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">hello:</span>
            <div className="text-green-700 font-medium">{t('hello')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">goodbye:</span>
            <div className="text-green-700 font-medium">{t('goodbye')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">thank_you:</span>
            <div className="text-green-700 font-medium">{t('thank_you')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">yes:</span>
            <div className="text-green-700 font-medium">{t('yes')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">no:</span>
            <div className="text-green-700 font-medium">{t('no')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800">🎨 UI 관련 번역</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">loading:</span>
            <div className="text-yellow-700 font-medium">{t('loading')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">error:</span>
            <div className="text-yellow-700 font-medium">{t('error')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">success:</span>
            <div className="text-yellow-700 font-medium">{t('success')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">cancel:</span>
            <div className="text-yellow-700 font-medium">{t('cancel')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">save:</span>
            <div className="text-yellow-700 font-medium">{t('save')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">delete:</span>
            <div className="text-yellow-700 font-medium">{t('delete')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">📅 날짜/시간 관련</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">today:</span>
            <div className="text-purple-700 font-medium">{t('today')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">yesterday:</span>
            <div className="text-purple-700 font-medium">{t('yesterday')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">tomorrow:</span>
            <div className="text-purple-700 font-medium">{t('tomorrow')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">morning:</span>
            <div className="text-purple-700 font-medium">{t('morning')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">afternoon:</span>
            <div className="text-purple-700 font-medium">{t('afternoon')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">evening:</span>
            <div className="text-purple-700 font-medium">{t('evening')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold mb-4 text-red-800">⭐ Beginner SDK 특징</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-red-700 mb-3">🚀 간단한 API</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                한 줄로 시작
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                직관적인 훅
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                자동 언어 감지
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                하이드레이션 안전
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-red-700 mb-3">📚 기본 번역</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                80+ 기본 번역
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                한국어/영어 지원
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                UI 관련 번역
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                날짜/시간 번역
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">📖 사용법</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">🎯 <strong>한 줄로 시작:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg text-xs overflow-x-auto font-mono">
{`const { t, toggleLanguage } = useSimpleI18n();`}
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">🌐 <strong>번역 사용:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg text-xs overflow-x-auto font-mono">
{`<h1>{t('welcome')}</h1>
<button onClick={toggleLanguage}>
  {languageButtonText}
</button>`}
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">📦 <strong>Provider 설정:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg text-xs overflow-x-auto font-mono">
{`<SimpleI18n>
  <YourApp />
</SimpleI18n>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeginnerTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" 
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🚀 Beginner SDK 테스트</h1>
        <p className="text-gray-700 mb-8 text-lg">초보자용 SDK, 간단한 API, 80+ 기본 번역 테스트</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <SimpleI18n>
            <BeginnerTestComponent />
          </SimpleI18n>
        </div>
      </div>
    </div>
  );
} 