import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

// 서버 사이드에서만 OpenAI 클라이언트 초기화
const openai = typeof window === 'undefined' 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

export { openai }; 