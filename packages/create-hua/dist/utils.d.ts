/**
 * create-hua - Utilities
 *
 * Utility functions for project creation
 */
/**
 * AI context generation options
 */
export interface AiContextOptions {
    /**
     * Generate .cursorrules file
     */
    cursorrules: boolean;
    /**
     * Generate ai-context.md file
     */
    aiContext: boolean;
    /**
     * Generate .claude/project-context.md file
     */
    claudeContext: boolean;
    /**
     * Generate .claude/skills/ files
     */
    claudeSkills: boolean;
    /**
     * Language for documentation (ko, en, both)
     */
    language: 'ko' | 'en' | 'both';
}
/**
 * Prompt for project name
 */
export declare function promptProjectName(): Promise<string>;
/**
 * Check if directory is empty
 */
export declare function isEmptyDir(dirPath: string): Promise<boolean>;
/**
 * Prompt for AI context generation options
 */
export declare function promptAiContextOptions(): Promise<AiContextOptions>;
/**
 * Copy template files to project directory
 *
 * @param projectPath - Target project directory
 * @param options - Copy options
 * @param options.skipAiContext - Skip AI context files (.cursorrules, ai-context.md, .claude/)
 */
export declare function copyTemplate(projectPath: string, options?: {
    skipAiContext?: boolean;
}): Promise<void>;
/**
 * Generate package.json
 */
export declare function generatePackageJson(projectPath: string, projectName: string): Promise<void>;
/**
 * Generate hua.config.ts
 */
export declare function generateConfig(projectPath: string): Promise<void>;
/**
 * Generate AI context files
 *
 * Cursor, Claude 등 다양한 AI 도구를 위한 컨텍스트 파일 생성
 * 템플릿 파일을 복사한 후 프로젝트별 정보를 동적으로 추가합니다.
 */
export declare function generateAiContextFiles(projectPath: string, projectName?: string, options?: AiContextOptions): Promise<void>;
/**
 * Check prerequisites before project creation
 *
 * Verifies Node.js version, pnpm installation, and template integrity
 */
export declare function checkPrerequisites(): Promise<void>;
/**
 * Validate template files integrity
 *
 * Checks if all required template files exist before project creation
 */
export declare function validateTemplate(): Promise<void>;
/**
 * Validate generated project
 *
 * 프로젝트 생성 후 필수 파일과 설정이 올바르게 생성되었는지 검증
 */
export declare function validateGeneratedProject(projectPath: string): Promise<void>;
/**
 * Validate translation files JSON syntax
 */
export declare function validateTranslationFiles(projectPath: string): Promise<void>;
/**
 * Generate installation summary
 */
export declare function generateSummary(projectPath: string, aiContextOptions?: AiContextOptions): Promise<{
    directories: number;
    files: number;
    aiContextFiles: string[];
    languages: string[];
}>;
/**
 * Display installation summary
 */
export declare function displaySummary(summary: {
    directories: number;
    files: number;
    aiContextFiles: string[];
    languages: string[];
}): void;
/**
 * Display next steps with customized guidance
 */
export declare function displayNextSteps(projectPath: string, aiContextOptions?: AiContextOptions): void;
//# sourceMappingURL=utils.d.ts.map