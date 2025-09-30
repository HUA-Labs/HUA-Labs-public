import yaml from 'js-yaml';
import fs from 'fs';

export interface EmotionWords {
  warm_words: string[];
  slip_trigger_words: string[];
  immersion_words: string[];
  detachment_words: string[];
}

export function loadEmotionWords(): EmotionWords {
  const file = fs.readFileSync('src/config/emotion-words.yml', 'utf8');
  const data = yaml.load(file) as { emotion_words: EmotionWords };
  return data.emotion_words;
} 