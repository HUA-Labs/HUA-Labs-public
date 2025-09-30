import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

// 통합 yml 파일 매핑
const MODULE_FILES = {
  tiers: 'tiers.yml',
  toneFilters: 'tone-filters.yml',
  modes: 'modes.yml',
  presets: 'rhythm-presets.yaml',
  ethics: 'ethics-extended-ko.yaml',
  ethicsLite: 'ethics-lite.yml',
};

function loadYaml(type: keyof typeof MODULE_FILES) {
  const filePath = path.join(process.cwd(), 'src/modules', MODULE_FILES[type]);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.parse(content);
  } catch (e) {
    console.error(`[MODULE-LOAD-ERROR] ${MODULE_FILES[type]} 파일을 찾을 수 없습니다:`, e);
    return {};
  }
}

export const tiers = loadYaml('tiers');
export const toneFilters = loadYaml('toneFilters');
export const modes = loadYaml('modes');
export const presets = loadYaml('presets');
export const ethics = loadYaml('ethics');
export const ethicsLite = loadYaml('ethicsLite');

// 주요 값 목록 export
export const tierList = Object.keys(tiers);
export const toneList = Object.keys(toneFilters);
export const modeList = Object.keys(modes);

// 프롬프트에 삽입할 수 있는 값 목록 포맷
export function getRhythmPromptLists() {
  return {
    tier: tierList,
    tone: toneList,
    mode: modeList
  };
} 