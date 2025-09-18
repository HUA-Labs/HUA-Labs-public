'use client';

import { createDebugI18n, useTranslation } from '@hua-labs/i18n-debug';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Debug Provider 생성
const DebugProvider = createDebugI18n({
  defaultLanguage: 'ko',
  fallbackLanguage: 'en',
  namespaces: ['common', 'auth', 'errors'],
  enableConsoleLogging: false, // 콘솔 로깅 비활성화
  enableMissingKeyTracking: true,
  enablePerformanceTracking: false, // 성능 추적 비활성화
  enableErrorTracking: true,
  logLevel: 'debug'
});

function DebugTestComponent() {
  const { t, setLanguage, currentLanguage } = useTranslation();
  const [debugData, setDebugData] = useState<any>(null);

  // 번역 테스트 로그 (한 번만 실행)
  useEffect(() => {
    // 로그 제거 - 필요시 주석 해제
    // console.log('🔍 [DEBUG] Component state:', {
    //   currentLanguage,
    //   'common:welcome': t('common:welcome'),
    //   'auth:login': t('auth:login'),
    //   'errors:not_found': t('errors:not_found')
    // });
  }, [currentLanguage, t]);

  // 디버그 데이터 수집 함수
  const updateDebugData = () => {
    if (typeof window !== 'undefined') {
      // 각 전역 변수를 개별적으로 확인
      const debugMode = window.__I18N_DEBUG_MODE__;
      const missingKeys = window.__I18N_DEBUG_MISSING_KEYS__;
      const errors = window.__I18N_DEBUG_ERRORS__;
      
      console.log('🔍 [DEBUG] updateDebugData - Individual checks:');
      console.log('  window.__I18N_DEBUG_MODE__ =', debugMode);
      console.log('  window.__I18N_DEBUG_MISSING_KEYS__ =', missingKeys);
      console.log('  window.__I18N_DEBUG_ERRORS__ =', errors);
      
      const data = {
        debugMode: debugMode || false,
        missingKeys: missingKeys || {},
        errors: errors || []
      };
      
      console.log('🔍 [DEBUG] updateDebugData - Final data:', data);
      setDebugData(data);
    }
  };

  useEffect(() => {
    // Provider가 완전히 설정된 후 초기 데이터 수집 (더 긴 지연)
    const initialTimeout = setTimeout(() => {
      // console.log('🔍 [DEBUG] Initial updateDebugData after timeout'); // 로그 제거
      updateDebugData();
    }, 500);

    // 실시간 업데이트를 위한 인터벌 설정 (10초마다)
    const interval = setInterval(updateDebugData, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
        <h3 className="text-xl font-bold mb-4 text-orange-800">🌐 현재 언어: {currentLanguage}</h3>
        <div className="space-x-3">
          <button 
            onClick={() => setLanguage('ko')}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md font-medium"
          >
            🇰🇷 한국어
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md font-medium"
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-bold mb-4 text-green-800">✅ 정상 번역 테스트</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-300">
            <span className="text-sm text-gray-600 font-mono">common:welcome:</span>
            <div className="text-green-700 font-bold text-lg">{t('common:welcome')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-300">
            <span className="text-sm text-gray-600 font-mono">auth:login:</span>
            <div className="text-green-700 font-bold text-lg">{t('auth:login')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-300">
            <span className="text-sm text-gray-600 font-mono">errors:not_found:</span>
            <div className="text-green-700 font-bold text-lg">{t('errors:not_found')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
        <h3 className="text-xl font-bold mb-4 text-red-800">🐛 의도적 에러 테스트 (콘솔 확인)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <span className="text-sm text-gray-600 font-mono">없는 키 1:</span>
            <div className="text-red-700 font-bold text-lg">{t('nonexistent:key')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <span className="text-sm text-gray-600 font-mono">없는 키 2:</span>
            <div className="text-red-700 font-bold text-lg">{t('missing:translation')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <span className="text-sm text-gray-600 font-mono">잘못된 네임스페이스:</span>
            <div className="text-red-700 font-bold text-lg">{t('invalid:namespace:key')}</div>
          </div>
        </div>
      </div>

             <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl font-bold text-blue-800">🔍 디버그 모드 상태</h3>
           <button 
             onClick={updateDebugData}
             className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
           >
             🔄 새로고침
           </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-white p-4 rounded-lg border border-blue-300">
             <span className="text-sm text-gray-600 font-mono">디버그 모드:</span>
             <div className="text-blue-700 font-bold">{debugData?.debugMode ? '✅ 활성화' : '❌ 비활성화'}</div>
           </div>
           <div className="bg-white p-4 rounded-lg border border-blue-300">
             <span className="text-sm text-gray-600 font-mono">누락 키 추적:</span>
             <div className="text-blue-700 font-bold">{debugData?.missingKeys ? '✅ 활성화' : '❌ 비활성화'}</div>
           </div>
           <div className="bg-white p-4 rounded-lg border border-blue-300">
             <span className="text-sm text-gray-600 font-mono">에러 추적:</span>
             <div className="text-blue-700 font-bold">{debugData?.errors?.length || 0}개 에러</div>
           </div>
         </div>
       </div>

      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-bold mb-4 text-yellow-800">🛠️ 디버깅 도구 목록</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <h4 className="font-bold text-lg text-yellow-700 mb-3">📝 콘솔 로깅</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                번역 로딩 로그
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                키 사용 로그
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                언어 변경 로그
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                에러 로그
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <h4 className="font-bold text-lg text-yellow-700 mb-3">🔍 추적 기능</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                누락 키 추적
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                성능 추적
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                에러 추적
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                사용량 통계
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold mb-4 text-purple-800">🔧 개발자 도구</h3>
        <div className="bg-white p-4 rounded-lg border border-purple-300">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-purple-700 mb-2">🔍 브라우저 콘솔 확인사항:</h4>
              <ul className="space-y-1 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  번역 로딩 메시지
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  누락 키 경고
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  성능 측정 로그
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  에러 메시지
                </li>
              </ul>
            </div>
            <div>
                             <h4 className="font-bold text-purple-700 mb-2">🌐 전역 변수 확인:</h4>
               <div className="space-y-1">
                 <div className="bg-gray-100 p-2 rounded font-mono text-sm text-gray-800 font-semibold">
                   window.__I18N_DEBUG_MODE__
                 </div>
                 <div className="bg-gray-100 p-2 rounded font-mono text-sm text-gray-800 font-semibold">
                   window.__I18N_DEBUG_MISSING_KEYS__
                 </div>
                 <div className="bg-gray-100 p-2 rounded font-mono text-sm text-gray-800 font-semibold">
                   window.__I18N_DEBUG_ERRORS__
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebugTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" 
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Debug SDK 테스트</h1>
        <p className="text-gray-600 mb-8">디버깅 도구, 누락 키 추적, 성능 추적, 에러 추적 테스트</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <DebugProvider>
            <DebugTestComponent />
          </DebugProvider>
        </div>
      </div>
    </div>
  );
} 