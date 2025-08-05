'use client';

import { createCoreI18n, useI18n, useTranslation } from '@hua-labs/i18n-core';
import { useState } from 'react';
import Link from 'next/link';

// 기본 번역 데이터
function getDefaultTranslations(language: string, namespace: string): Record<string, string> {
  const defaultTranslations: Record<string, Record<string, Record<string, string>>> = {
    ko: {
      common: {
        welcome: "환영합니다",
        hello: "안녕하세요",
        goodbye: "안녕히 가세요",
        thank_you: "감사합니다",
        yes: "예",
        no: "아니오",
        loading: "로딩 중...",
        error: "오류",
        success: "성공",
        cancel: "취소",
        save: "저장",
        delete: "삭제",
        today: "오늘",
        yesterday: "어제",
        tomorrow: "내일",
        morning: "아침",
        afternoon: "오후",
        evening: "저녁"
      },
      auth: {
        login: "로그인",
        logout: "로그아웃",
        register: "회원가입",
        email: "이메일",
        password: "비밀번호",
        name: "이름"
      },
      errors: {
        not_found: "찾을 수 없습니다",
        unauthorized: "권한이 없습니다",
        forbidden: "접근이 거부되었습니다",
        server_error: "서버 오류가 발생했습니다"
      }
    },
    en: {
      common: {
        welcome: "Welcome",
        hello: "Hello",
        goodbye: "Goodbye",
        thank_you: "Thank you",
        yes: "Yes",
        no: "No",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        today: "Today",
        yesterday: "Yesterday",
        tomorrow: "Tomorrow",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening"
      },
      auth: {
        login: "Login",
        logout: "Logout",
        register: "Register",
        email: "Email",
        password: "Password",
        name: "Name"
      },
      errors: {
        not_found: "Not found",
        unauthorized: "Unauthorized",
        forbidden: "Forbidden",
        server_error: "Server error occurred"
      }
    }
  };

  return defaultTranslations[language]?.[namespace] || {};
}

// Core Provider 생성
const CoreProvider = createCoreI18n({
  defaultLanguage: 'ko',
  fallbackLanguage: 'en',
  namespaces: ['common', 'auth', 'errors'],
  debug: true,
  loadTranslations: async (language: string, namespace: string) => {
    console.log(`🔍 [CORE] Loading ${language}:${namespace}`);
    
    try {
      // 실제 파일 시스템에서 번역 로드 시도
      const url = `/translations/${language}/${namespace}.json`;
      console.log(`🌐 [CORE] Fetching from:`, url);
      
      const response = await fetch(url);
      console.log(`📡 [CORE] Response status:`, response.status, response.statusText);
      
      if (response.ok) {
        const translations = await response.json();
        console.log(`✅ [CORE] Loaded from file for ${language}:${namespace}:`, translations);
        return translations;
      } else {
        console.warn(`⚠️ [CORE] File not found for ${language}:${namespace}, using default translations`);
        // 파일이 없으면 기본 번역 사용
        const translations = getDefaultTranslations(language, namespace);
        console.log(`🔄 [CORE] Using default translations for ${language}:${namespace}:`, translations);
        return translations;
      }
    } catch (error) {
      console.warn(`⚠️ [CORE] Error loading ${language}:${namespace}:`, error);
      // 에러 발생 시 기본 번역 사용
      const translations = getDefaultTranslations(language, namespace);
      console.log(`🔄 [CORE] Using default translations after error for ${language}:${namespace}:`, translations);
      return translations;
    }
  }
});

function CoreTestComponent() {
  const { t, setLanguage, currentLanguage, isLoading, error, debug, isInitialized } = useTranslation();
  const [testKey, setTestKey] = useState('common:welcome');

  // 디버그 정보 출력
  console.log('🔍 [CORE] Component state:', {
    currentLanguage,
    isLoading,
    error,
    isInitialized,
    isReady: debug?.isReady(),
    loadedNamespaces: debug?.getLoadedNamespaces(),
    allTranslations: debug?.getAllTranslations()
  });

  // 번역 테스트 로그
  console.log('🧪 [CORE] Translation tests:', {
    'common:welcome': t('common:welcome'),
    'auth:login': t('auth:login'),
    'errors:not_found': t('errors:not_found'),
    'welcome': t('welcome'),
    'hello': t('hello'),
    'goodbye': t('goodbye'),
    'thank_you': t('thank_you')
  });

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🔄 번역 로딩 중...</h3>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-red-800">❌ 번역 로딩 오류</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">🌐 현재 언어: {currentLanguage}</h3>
        <div className="space-x-2">
          <button 
            onClick={() => setLanguage('ko')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-medium"
          >
            🇰🇷 한국어
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-medium"
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold mb-4 text-green-800">📦 네임스페이스 분리 테스트</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">common:welcome:</span>
            <div className="text-green-700 font-medium">{t('common:welcome')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">auth:login:</span>
            <div className="text-green-700 font-medium">{t('auth:login')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">errors:not_found:</span>
            <div className="text-green-700 font-medium">{t('errors:not_found')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">없는 키:</span>
            <div className="text-red-600 font-medium">{t('nonexistent:key')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800">🔍 동적 키 테스트</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            value={testKey}
            onChange={(e) => setTestKey(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="번역 키 입력 (예: common:welcome)"
          />
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">결과:</span>
            <div className="text-yellow-700 font-medium">{t(testKey)}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">📝 기본 번역 테스트</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">welcome:</span>
            <div className="text-purple-700 font-medium">{t('welcome')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">hello:</span>
            <div className="text-purple-700 font-medium">{t('hello')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">goodbye:</span>
            <div className="text-purple-700 font-medium">{t('goodbye')}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">thank_you:</span>
            <div className="text-purple-700 font-medium">{t('thank_you')}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">🔧 디버그 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">초기화 상태:</span>
            <div className="text-gray-700 font-medium">{isInitialized ? '✅ 완료' : '⏳ 진행 중'}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">로드된 네임스페이스:</span>
            <div className="text-gray-700 font-medium">{debug?.getLoadedNamespaces().join(', ') || '없음'}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">캐시 통계:</span>
            <div className="text-gray-700 font-medium">
              {(() => {
                const stats = debug?.getCacheStats();
                return stats ? `Hits: ${stats.hits}, Misses: ${stats.misses}` : 'N/A';
              })()}
            </div>
          </div>
          <div className="bg-white p-3 rounded border">
            <span className="text-sm text-gray-500 font-mono">현재 언어:</span>
            <div className="text-gray-700 font-medium">{currentLanguage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoreTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" 
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">⚡ Core SDK 테스트</h1>
        <p className="text-gray-700 mb-8 text-lg">핵심 기능, 네임스페이스 분리, SSR 지원 테스트</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <CoreProvider>
            <CoreTestComponent />
          </CoreProvider>
        </div>
      </div>
    </div>
  );
} 