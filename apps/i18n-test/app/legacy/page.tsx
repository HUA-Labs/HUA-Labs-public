import MinimalExample from "../components/MinimalExample";
import { SimpleI18n } from '@hua-labs/i18n-beginner';
import Link from 'next/link';

export default function LegacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" 
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📚 기존 Beginner SDK 테스트</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SimpleI18n>
            <MinimalExample />
          </SimpleI18n>
        </div>
      </div>
    </div>
  );
} 