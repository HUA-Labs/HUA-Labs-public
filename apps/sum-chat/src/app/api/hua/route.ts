import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { systemPrompt } from '@/shared/systemPrompt'

export async function POST(request: Request) {
  try {
    const { input, config, session_id } = await request.json();

    if (!openai) {
      return NextResponse.json({ error: 'OpenAI 인스턴스가 없습니다.', response: null }, { status: 500 });
    }

    // GPT API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ],
      temperature: 0.7,
      max_tokens: 1200
    });

    const message = completion?.choices?.[0]?.message?.content ?? '(응답 없음)';
    return NextResponse.json({
      response: message,
      session_id
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'GPT API 호출 중 오류 발생', response: null },
      { status: 500 }
    );
  }
} 