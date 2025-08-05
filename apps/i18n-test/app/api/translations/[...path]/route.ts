import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || path.length < 2) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const language = path[0];
    const namespace = path[1].replace('.json', '');
    
    // 번역 파일 경로
    const filePath = join(process.cwd(), 'translations', language, `${namespace}.json`);
    
    // 파일 읽기
    const fileContent = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    });
  } catch (error) {
    console.error('Translation file error:', error);
    return NextResponse.json({ error: 'Translation file not found' }, { status: 404 });
  }
} 