/**
 * create-hua-ux - Utilities
 * 
 * Utility functions for project creation
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from 'inquirer';
import { HUA_UX_VERSION } from './version';

const TEMPLATE_DIR = path.join(__dirname, '../templates/nextjs');

/**
 * Prompt for project name
 */
export async function promptProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name is required';
        }
        return true;
      },
    },
  ]);

  return projectName;
}

/**
 * Copy template files to project directory
 */
export async function copyTemplate(projectPath: string): Promise<void> {
  await fs.copy(TEMPLATE_DIR, projectPath, {
    filter: (src: string) => {
      // Skip node_modules and .git
      return !src.includes('node_modules') && !src.includes('.git');
    },
  });
}

/**
 * Get hua-ux package version
 * 
 * 모노레포 내부에서는 workspace 버전을, 외부에서는 npm 버전을 사용
 * 
 * 감지 우선순위:
 * 1. 환경 변수 (HUA_UX_WORKSPACE_VERSION)
 * 2. pnpm-workspace.yaml 파일 존재 여부 (더 견고한 방법)
 * 3. 폴더 이름 기반 감지 (하위 호환성)
 * 4. hua-ux 패키지의 package.json에서 버전 읽기 (자동화)
 * 5. npm 버전 (기본값)
 */
function getHuaUxVersion(): string {
  // 1. 환경 변수 우선 확인
  if (process.env.HUA_UX_WORKSPACE_VERSION === 'workspace') {
    return 'workspace:*';
  }
  
  // 2. pnpm-workspace.yaml 파일 존재 여부로 모노레포 감지 (더 견고한 방법)
  try {
    const fs = require('fs');
    const path = require('path');
    let currentDir = process.cwd();
    const maxDepth = 10; // 최대 10단계 상위 디렉토리까지 확인
    
    for (let i = 0; i < maxDepth; i++) {
      const workspaceFile = path.join(currentDir, 'pnpm-workspace.yaml');
      if (fs.existsSync(workspaceFile)) {
        return 'workspace:*';
      }
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break; // 루트 도달
      currentDir = parentDir;
    }
  } catch (error) {
    // fs 모듈을 사용할 수 없는 경우 (Edge Runtime 등) 무시
  }
  
  // 3. 하위 호환성: 폴더 이름 기반 감지 (기존 방식)
  const cwd = process.cwd();
  if (cwd.includes('hua-platform') && !cwd.includes('node_modules')) {
    return 'workspace:*';
  }
  
  // 4. hua-ux 패키지의 package.json에서 버전 읽기 (자동화)
  // create-hua-ux 패키지에서 hua-ux 패키지의 package.json을 읽어서 버전 추출
  try {
    const fs = require('fs');
    const path = require('path');
    
    // create-hua-ux의 위치에서 hua-ux 패키지 찾기
    // __dirname은 dist/utils.js 또는 src/utils.ts의 위치
    // dist/utils.js인 경우: packages/create-hua-ux/dist/utils.js
    // src/utils.ts인 경우: packages/create-hua-ux/src/utils.ts
    const currentFile = __dirname;
    const createHuaUxRoot = path.resolve(currentFile, '../..');
    const huaUxPackageJson = path.join(createHuaUxRoot, '../hua-ux/package.json');
    
    if (fs.existsSync(huaUxPackageJson)) {
      const huaUxPackage = JSON.parse(fs.readFileSync(huaUxPackageJson, 'utf-8'));
      const version = huaUxPackage.version;
      if (version) {
        // 버전 앞에 ^ 추가 (예: 0.1.0 -> ^0.1.0)
        return `^${version}`;
      }
    }
  } catch (error) {
    // 파일을 읽을 수 없는 경우 무시하고 다음 단계로
  }
  
  // 5. 빌드 시점에 생성된 버전 상수 사용 (npm 배포 후)
  // 빌드 스크립트에서 hua-ux 패키지의 버전을 읽어서 생성한 상수
  return HUA_UX_VERSION;
}

/**
 * Get hua-ux related package version
 * 
 * hua-ux와 관련된 패키지들의 버전을 반환합니다.
 * 모노레포 내부에서는 workspace 버전을, 외부에서는 npm 버전을 사용합니다.
 */
function getHuaUxRelatedPackageVersion(): string {
  return getHuaUxVersion();
}

/**
 * Generate package.json
 */
export async function generatePackageJson(
  projectPath: string,
  projectName: string
): Promise<void> {
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev --turbopack',
      build: 'next build',
      start: 'next start',
      lint: "next lint",
      'lint:fix': 'next lint --fix',
    },
    dependencies: {
      '@hua-labs/hua-ux': getHuaUxVersion(),
      '@hua-labs/i18n-core-zustand': getHuaUxRelatedPackageVersion(),
      '@hua-labs/state': getHuaUxRelatedPackageVersion(),
      next: '16.0.10',
      react: '19.2.1',
      'react-dom': '19.2.1',
      zustand: '^5.0.8',
    },
    devDependencies: {
      '@types/node': '^22.0.0',
      '@types/react': '^19.2.7',
      '@types/react-dom': '^19.2.3',
      '@tailwindcss/postcss': '^4',
      autoprefixer: '^10.4.21',
      postcss: '^8.5.6',
      tailwindcss: '^4.1.13',
      typescript: '^5.9.3',
    },
  };

  await fs.writeJSON(
    path.join(projectPath, 'package.json'),
    packageJson,
    { spaces: 2 }
  );
}

/**
 * Generate hua-ux.config.ts
 */
export async function generateConfig(projectPath: string): Promise<void> {
  const configContent = `import { defineConfig } from '@hua-labs/hua-ux/framework';

/**
 * hua-ux 프레임워크 설정
 * 
 * Preset을 선택하면 대부분의 설정이 자동으로 적용됩니다.
 * - 'product': 제품 페이지용 (전문적, 효율적)
 * - 'marketing': 마케팅 페이지용 (화려함, 눈에 띄는)
 * 
 * **바이브 모드 (간단)**: \`preset: 'product'\`
 * **개발자 모드 (세부 설정)**: \`preset: { type: 'product', motion: {...} }\`
 */
export default defineConfig({
  /**
   * 프리셋 선택
   * 
   * Preset을 선택하면 motion, spacing, i18n 등이 자동 설정됩니다.
   * 
   * 바이브 모드 (간단):
   *   preset: 'product'
   * 
   * 개발자 모드 (세부 설정):
   *   preset: {
   *     type: 'product',
   *     motion: { duration: 300 },
   *   }
   */
  preset: 'product',
  
  /**
   * 다국어 설정
   */
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'],
    namespaces: ['common'],
    translationLoader: 'api',
    translationApiPath: '/api/translations',
  },
  
  /**
   * 모션/애니메이션 설정
   * 
   * 바이브 코더용 (명사 중심):
   *   motion: { style: 'smooth' }  // 'smooth' | 'dramatic' | 'minimal'
   * 
   * 개발자용 (기술적):
   *   motion: {
   *     defaultPreset: 'product',
   *     enableAnimations: true,
   *     duration: 300,
   *   }
   */
  motion: {
    defaultPreset: 'product',
    enableAnimations: true,
    // style: 'smooth',  // 바이브 코더용: 'smooth' | 'dramatic' | 'minimal'
  },
  
  /**
   * 상태 관리 설정
   */
  state: {
    persist: true,
    ssr: true,
  },
  
  /**
   * 브랜딩 설정 (화이트 라벨링)
   * 
   * 색상, 타이포그래피 등을 설정하면 모든 컴포넌트에 자동 적용됩니다.
   * 
   * branding: {
   *   colors: {
   *     primary: '#3B82F6',
   *     secondary: '#8B5CF6',
   *   },
   * }
   */
  // branding: {
  //   colors: {
  //     primary: '#3B82F6',
  //   },
  // },
  
  /**
   * 라이선스 설정 (Pro/Enterprise 플러그인 사용 시)
   * 
   * license: {
   *   apiKey: process.env.HUA_UX_LICENSE_KEY,
   * }
   */
  // license: {
  //   apiKey: process.env.HUA_UX_LICENSE_KEY,
  // },
  
  /**
   * 플러그인 설정 (Pro/Enterprise 기능)
   * 
   * plugins: [
   *   motionProPlugin,
   *   i18nProPlugin,
   * ]
   */
  // plugins: [],
});
`;

  await fs.writeFile(
    path.join(projectPath, 'hua-ux.config.ts'),
    configContent
  );
}

/**
 * Generate AI context files
 * 
 * Cursor, Claude 등 다양한 AI 도구를 위한 컨텍스트 파일 생성
 */
export async function generateAiContextFiles(projectPath: string): Promise<void> {
  // .cursorrules는 템플릿에서 복사됨 (이미 처리됨)
  // .claude/project-context.md도 템플릿에서 복사됨 (이미 처리됨)
  // ai-context.md도 템플릿에서 복사됨 (이미 처리됨)
  
  // 필요시 여기서 프로젝트별 커스터마이징 가능
  // 예: 프로젝트 이름을 ai-context.md에 삽입 등
}
