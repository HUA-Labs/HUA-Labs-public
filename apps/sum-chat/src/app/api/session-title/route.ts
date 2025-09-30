import { NextResponse } from 'next/server';
import { generateSessionTitleWithGPT } from '@/shared/session-title-generator';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: '메시지 누락' }, { status: 400 });
    }
    const title = await generateSessionTitleWithGPT(message);
    return NextResponse.json({ title });
  } catch (error) {
    console.error('[API] 세션 제목 생성 오류:', error);
    return NextResponse.json({ error: '세션 제목 생성 실패' }, { status: 500 });
  }
} 