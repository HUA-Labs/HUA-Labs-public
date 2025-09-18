'use client';

import { createAdvancedI18n, useTranslation } from '@hua-labs/i18n-advanced';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Advanced Provider 생성
const AdvancedProvider = createAdvancedI18n({
  defaultLanguage: 'ko',
  fallbackLanguage: 'en',
  namespaces: ['common', 'auth', 'errors'],
  enablePerformanceMonitoring: false, // 성능 모니터링 비활성화
  enableAutoOptimization: false, // 자동 최적화 비활성화
  enableAnalytics: false, // 분석 비활성화
  enableCaching: true,
  debug: true
});

function AdvancedTestComponent() {
  const { t, setLanguage, currentLanguage } = useTranslation();
  const [performanceData, setPerformanceData] = useState<any>(null);

  // 번역 테스트 로그 (한 번만 실행)
  useEffect(() => {
    console.log('🚀 [ADVANCED] Component state:', {
      currentLanguage,
      'common:welcome': t('common:welcome'),
      'auth:login': t('auth:login'),
      'errors:not_found': t('errors:not_found')
    });
  }, [currentLanguage, t]);

  useEffect(() => {
    // 성능 데이터 수집 (한 번만 실행)
    if (typeof window !== 'undefined') {
      const data = {
        performanceData: window.__I18N_PERFORMANCE_DATA__ || {},
        performanceAlerts: window.__I18N_PERFORMANCE_ALERTS__ || [],
        analyticsData: window.__I18N_ANALYTICS_DATA__ || {}
      };
      setPerformanceData(data);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold mb-4 text-purple-800">🌐 현재 언어: {currentLanguage}</h3>
        <div className="space-x-3">
          <button 
            onClick={() => setLanguage('ko')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md font-medium"
          >
            🇰🇷 한국어
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md font-medium"
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-bold mb-4 text-green-800">🚀 고급 기능 테스트</h3>
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

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold mb-4 text-blue-800">📊 성능 모니터링</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <span className="text-sm text-gray-600 font-mono">성능 데이터:</span>
            <div className="text-blue-700 font-bold">{performanceData ? '✅ 수집 중...' : '⏳ 로딩 중...'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <span className="text-sm text-gray-600 font-mono">알림:</span>
            <div className="text-blue-700 font-bold">{performanceData?.performanceAlerts?.length || 0}개</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <span className="text-sm text-gray-600 font-mono">분석 데이터:</span>
            <div className="text-blue-700 font-bold">{performanceData?.analyticsData ? '✅ 활성화' : '❌ 비활성화'}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-bold mb-4 text-yellow-800">🔌 플러그인 시스템</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 text-xl">✅</span>
              <span className="font-bold text-yellow-700">Analytics Plugin</span>
            </div>
            <p className="text-gray-700">번역 사용량 추적</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 text-xl">✅</span>
              <span className="font-bold text-yellow-700">Cache Plugin</span>
            </div>
            <p className="text-gray-700">번역 결과 캐싱</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 text-xl">✅</span>
              <span className="font-bold text-yellow-700">Performance Monitor</span>
            </div>
            <p className="text-gray-700">성능 모니터링</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 text-xl">✅</span>
              <span className="font-bold text-yellow-700">Auto Optimizer</span>
            </div>
            <p className="text-gray-700">자동 최적화</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
        <h3 className="text-xl font-bold mb-4 text-red-800">⚡ 고급 기능 목록</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <h4 className="font-bold text-lg text-red-700 mb-3">🚀 성능 최적화</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                번역 로딩 시간 추적
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                캐시 히트율 모니터링
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                메모리 사용량 분석
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                자동 최적화 제안
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-300">
            <h4 className="font-bold text-lg text-red-700 mb-3">🔧 플러그인 시스템</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                분석 플러그인
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                캐시 플러그인
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                커스텀 플러그인 지원
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                플러그인 우선순위
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdvancedTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" 
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Advanced SDK 테스트</h1>
        <p className="text-gray-600 mb-8">성능 모니터링, 플러그인 시스템, 분석/캐시 테스트</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <AdvancedProvider>
            <AdvancedTestComponent />
          </AdvancedProvider>
        </div>
      </div>
    </div>
  );
} 