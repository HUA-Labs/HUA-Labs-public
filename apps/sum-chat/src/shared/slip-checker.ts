import { loadEthics } from "./loadEthics";
import { loadEmotionWords } from './loadEmotionWords';
import type { SessionMessage } from '@/types/session';

interface Rule {
  id: string;
  description: string;
  slip_trigger: boolean;
  level: string;
  keywords?: string[];
  patterns?: RegExp[];
}

interface Principle {
  name: string;
  description: string;
  rules: Rule[];
}

// 1단계: 완전 일치 키워드 필터
function exactMatch(input: string, keywords: string[]): boolean {
  return keywords.some((kw) => input.includes(kw));
}

// 2단계: 정규식 패턴 필터
function patternMatch(input: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(input));
}

// 최종 감지 함수
export function shouldSlip(input: string): boolean {
  const ethics = loadEthics();

  const keywords: string[] = [];
  const patterns: RegExp[] = [];

  // 모든 원칙과 규칙에서 키워드와 패턴 수집
  ethics.principles.forEach((principle: Principle) => {
    principle.rules.forEach((rule: Rule) => {
      if (rule.slip_trigger) {
        if (rule.keywords) {
          keywords.push(...rule.keywords);

          // 정규식 패턴 생성
          rule.keywords.forEach((kw: string) => {
            const safeRegex = kw
              .replace(/(\s?싶[어다어요])/g, "\\s?싶[어다어요]")
              .replace(/\s/g, "\\s?");
            patterns.push(new RegExp(safeRegex, "i"));
          });
        }
      }
    });
  });

  // 단계 1: 빠른 완전 일치
  if (exactMatch(input, keywords)) return true;

  // 단계 2: 유연한 정규식 매칭
  if (patternMatch(input, patterns)) return true;

  return false;
}

const emotionWords = loadEmotionWords();

export function detectSlip(messages: SessionMessage[]): boolean {
  const last3 = messages.slice(-3);
  // tone 3회 반복
  const repeatedTone = last3.every(m => m.tone === last3[0]?.tone && m.tone !== undefined);

  // slip_trigger_words 등장 횟수
  const lastContent = last3.map(m => m.content).join(' ');
  const heatWords = emotionWords.slip_trigger_words.filter(w => lastContent.includes(w)).length;

  return repeatedTone || heatWords >= 2;
} 