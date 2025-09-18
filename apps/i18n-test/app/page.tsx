import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          HUA i18n SDK 테스트 페이지
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Beginner 테스트 */}
          <Link href="/test/beginner" 
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">🚀 Beginner</h2>
            <p className="text-gray-700 mb-4 font-medium">초보자용 SDK 테스트</p>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                간단한 API
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                80+ 기본 번역
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                TypeScript 지원
              </div>
            </div>
          </Link>

          {/* Core 테스트 */}
          <Link href="/test/core" 
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-2 text-green-600">⚡ Core</h2>
            <p className="text-gray-700 mb-4 font-medium">핵심 기능 테스트</p>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                네임스페이스 분리
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                SSR 지원
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Translator 클래스
              </div>
            </div>
          </Link>

          {/* Advanced 테스트 */}
          <Link href="/test/advanced" 
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <h2 className="text-xl font-semibold mb-2 text-purple-600">🎯 Advanced</h2>
            <p className="text-gray-700 mb-4 font-medium">고급 기능 테스트</p>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                성능 모니터링
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                플러그인 시스템
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                분석/캐시
              </div>
            </div>
          </Link>

          {/* Debug 테스트 */}
          <Link href="/test/debug" 
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold mb-2 text-orange-600">🔧 Debug</h2>
            <p className="text-gray-700 mb-4 font-medium">디버깅 도구 테스트</p>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                누락 키 추적
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                성능 추적
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                에러 추적
              </div>
            </div>
          </Link>
        </div>

        {/* 기존 테스트 링크 */}
        <div className="mt-12 text-center">
          <Link href="/legacy" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-md">
            📚 기존 Beginner 테스트 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
