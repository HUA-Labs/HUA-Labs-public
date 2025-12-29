import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Translation API Route
 * 
 * 번역 파일을 제공하는 API 엔드포인트입니다.
 * Provides translation files via API endpoint.
 * 
 * @param request - Next.js request object
 * @param request.nextUrl.searchParams.language - Language code (e.g., 'ko', 'en')
 * @param request.nextUrl.searchParams.namespace - Translation namespace (e.g., 'common')
 * @returns Translation object or error response
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get('language') || 'ko';
  const namespace = searchParams.get('namespace') || 'common';

  // 언어 검증
  // Validate language
  const supportedLanguages = ['ko', 'en'];
  if (!supportedLanguages.includes(language)) {
    return NextResponse.json(
      { error: 'Unsupported language' },
      { status: 400 }
    );
  }

  // 네임스페이스 검증 (선택적)
  // Validate namespace (optional)
  // 필요시 지원하는 네임스페이스 목록을 추가할 수 있습니다.
  // You can add a list of supported namespaces if needed.

  try {
    const filePath = join(process.cwd(), 'translations', language, `${namespace}.json`);
    const fileContents = readFileSync(filePath, 'utf-8');
    const translations = JSON.parse(fileContents);

    return NextResponse.json(translations, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    // 에러 타입 구분
    // Distinguish error types
    
    // 파일이 없는 경우
    // File not found
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Translation file not found' },
        { status: 404 }
      );
    }
    
    // JSON 파싱 에러
    // JSON parse error
    if (error instanceof SyntaxError) {
      console.error('Translation JSON parse error:', error);
      return NextResponse.json(
        { error: 'Invalid translation file format' },
        { status: 500 }
      );
    }

    // 기타 에러
    // Other errors
    console.error('Translation load error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
