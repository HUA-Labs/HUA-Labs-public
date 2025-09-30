// Devin × 먼팀장: 세션 제목 자동 생성 모듈 (로컬 + GPT 하이브리드)

// 기본 로컬 추출기 (경량 추론용)
export function extractSessionName(text: string): string {
  const stopwords = ['이', '그', '저', '이런', '그런', '저런', '이것', '그것', '저것', '있다', '하다', '입니다', '오늘', '그리고', '저는'];
  const emotionKeywords = ['기쁨', '불안', '혼란', '공감', '슬픔', '결정', '분석', '기획', '코드', '테스트'];

  const words = text.match(/[\w가-힣]+/g) || [];
  const meaningfulWords = words.filter(word => 
    word.length > 1 &&
    !/^[0-9]+$/.test(word) &&
    !stopwords.includes(word)
  );

  if (meaningfulWords.length === 0) return '새 채팅';

  const prioritized = meaningfulWords.find(word => emotionKeywords.includes(word));
  if (prioritized) return prioritized.slice(0, 10);

  return meaningfulWords.slice(0, 2).join(' ').slice(0, 10) || '새 채팅';
}

// GPT 기반 고급 추출기 (감응형 흐름 추출)
// ⚠️ 서버 전용 함수! 클라이언트에서 직접 호출하면 안 됨.
import { openai } from '@/lib/openai';

export async function generateSessionTitleWithGPT(sessionFirstMessage: string): Promise<string> {
  const prompt = `
다음 텍스트는 채팅의 첫 메시지입니다.  
이 대화를 잘 요약해서, 감정이나 주제 흐름이 느껴지는 **짧은 제목**을 한글로 만들어주세요.  
10자 이내, 너무 일반적이지 않게, 하지만 감각적으로.

※ 반드시 쌍따옴표나 따옴표 없이(", '') 없이, 한글 제목만 자연스럽게 반환하세요.

입력: ${sessionFirstMessage}
출력:
`;

  try {
    if (!openai) {
      throw new Error('OpenAI 인스턴스가 없습니다. 환경 변수를 확인하세요.');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 30
    });

    const title = response.choices[0].message.content?.trim();
    // 앞뒤 따옴표, 작은따옴표 모두 제거
    const cleanTitle = title ? title.replace(/^['"]+|['"]+$/g, '') : '';
    return cleanTitle || '새 채팅';
  } catch (error) {
    console.error('[GPT 제목 생성 오류]', error);
    return '새 채팅';
  }
} 