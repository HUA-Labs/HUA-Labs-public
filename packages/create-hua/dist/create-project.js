"use strict";
/**
 * create-hua - Project Creation
 *
 * Creates a new hua project from template
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveProjectPath = resolveProjectPath;
exports.createProject = createProject;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
/**
 * Resolve project path
 *
 * If running from within the monorepo (packages/create-hua), create project in monorepo root.
 * Otherwise, create in current working directory.
 */
function resolveProjectPath(projectName) {
    const cwd = process.cwd();
    // Check if we're running from packages/create-hua directory
    // More robust check: look for both 'packages' and 'create-hua' in path
    const normalizedCwd = path.normalize(cwd).replace(/\\/g, '/');
    if (normalizedCwd.includes('/packages/') && normalizedCwd.includes('/create-hua')) {
        // Find the packages directory and go up one level to monorepo root
        const packagesIndex = normalizedCwd.indexOf('/packages/');
        const monorepoRoot = normalizedCwd.substring(0, packagesIndex);
        return path.resolve(monorepoRoot, projectName);
    }
    // Default: create in current working directory
    return path.resolve(cwd, projectName);
}
async function createProject(projectName, aiContextOptions, options) {
    const projectPath = resolveProjectPath(projectName);
    const isDryRun = options?.dryRun ?? false;
    // Debug: log the resolved path (only in development)
    if (process.env.NODE_ENV !== 'production' && !isDryRun) {
        console.log(chalk_1.default.gray(`Project will be created at: ${projectPath}`));
    }
    // Check if directory already exists and is not empty
    if (!isDryRun && await fs.pathExists(projectPath) && !(await (0, utils_1.isEmptyDir)(projectPath))) {
        const isEn = process.env.LANG === 'en' || process.env.CLI_LANG === 'en' || process.argv.includes('--english-only');
        console.error(chalk_1.default.red(isEn
            ? `Directory "${projectPath}" already exists and is not empty`
            : `디렉토리 "${projectPath}"가 이미 존재하며 비어있지 않습니다`));
        console.error(chalk_1.default.yellow(isEn
            ? '💡 Try a different project name or remove the existing directory'
            : '💡 다른 프로젝트 이름을 사용하거나 기존 디렉토리를 삭제하세요'));
        process.exit(1);
    }
    // Prerequisites check (skip in dry-run mode)
    if (!isDryRun && !options?.skipPrerequisites) {
        const { checkPrerequisites } = await Promise.resolve().then(() => __importStar(require('./utils')));
        try {
            await checkPrerequisites();
        }
        catch (error) {
            console.error(chalk_1.default.red('\n❌ Prerequisites check failed'));
            throw error;
        }
    }
    if (isDryRun) {
        console.log(chalk_1.default.blue(`\n🔍 Dry-run mode: Preview of project creation for "${projectName}"\n`));
    }
    else {
        console.log(chalk_1.default.blue(`\n🚀 Creating hua project: ${projectName}...\n`));
    }
    try {
        // Step 1/5: Creating project structure
        console.log(chalk_1.default.blue('📦 Step 1/5: Creating project structure...'));
        if (!isDryRun) {
            await fs.ensureDir(projectPath);
        }
        else {
            console.log(chalk_1.default.gray(`  Would create directory: ${projectPath}`));
        }
        console.log(chalk_1.default.green('✅ Project structure ready'));
        // Step 2/5: Copying template files
        console.log(chalk_1.default.blue('\n📋 Step 2/5: Copying template files...'));
        if (!isDryRun) {
            // Determine if we should skip AI context files during copy
            // If user explicitly disabled all AI context, skip them during copy for performance
            // Note: We still copy them and delete later for safety, but this optimization
            // can be enabled if all AI context is explicitly disabled
            const shouldSkipAiContext = aiContextOptions
                ? !aiContextOptions.cursorrules && !aiContextOptions.aiContext && !aiContextOptions.claudeContext && !aiContextOptions.claudeSkills
                : false;
            await (0, utils_1.copyTemplate)(projectPath, { skipAiContext: shouldSkipAiContext });
        }
        else {
            console.log(chalk_1.default.gray('  Would copy template files from templates/nextjs/'));
            if (aiContextOptions) {
                const aiFiles = [];
                if (aiContextOptions.cursorrules)
                    aiFiles.push('.cursorrules');
                if (aiContextOptions.aiContext)
                    aiFiles.push('ai-context.md');
                if (aiContextOptions.claudeContext)
                    aiFiles.push('.claude/project-context.md');
                if (aiContextOptions.claudeSkills)
                    aiFiles.push('.claude/skills/');
                if (aiFiles.length > 0) {
                    console.log(chalk_1.default.gray(`  Would include AI context files: ${aiFiles.join(', ')}`));
                }
            }
        }
        console.log(chalk_1.default.green('✅ Template files copied'));
        // Step 3/5: Generating configuration
        console.log(chalk_1.default.blue('\n⚙️  Step 3/5: Generating configuration...'));
        if (!isDryRun) {
            await (0, utils_1.generatePackageJson)(projectPath, projectName);
            await (0, utils_1.generateConfig)(projectPath);
        }
        else {
            console.log(chalk_1.default.gray('  Would generate package.json'));
            console.log(chalk_1.default.gray('  Would generate hua.config.ts'));
        }
        console.log(chalk_1.default.green('✅ Configuration generated'));
        // Step 4/5: Generating AI context files
        console.log(chalk_1.default.blue('\n🤖 Step 4/5: Generating AI context files...'));
        if (!isDryRun) {
            await (0, utils_1.generateAiContextFiles)(projectPath, projectName, aiContextOptions);
        }
        else {
            const aiFiles = [];
            if (aiContextOptions?.cursorrules)
                aiFiles.push('.cursorrules');
            if (aiContextOptions?.aiContext)
                aiFiles.push('ai-context.md');
            if (aiContextOptions?.claudeContext)
                aiFiles.push('.claude/project-context.md');
            if (aiContextOptions?.claudeSkills)
                aiFiles.push('.claude/skills/');
            if (aiFiles.length > 0) {
                console.log(chalk_1.default.gray(`  Would generate: ${aiFiles.join(', ')}`));
            }
            else {
                console.log(chalk_1.default.gray('  No AI context files selected'));
            }
        }
        console.log(chalk_1.default.green('✅ AI context files generated'));
        // Step 5/5: Validating project
        console.log(chalk_1.default.blue('\n✅ Step 5/5: Validating project...'));
        if (!isDryRun) {
            await (0, utils_1.validateGeneratedProject)(projectPath);
            // Validate translation files
            const { validateTranslationFiles } = await Promise.resolve().then(() => __importStar(require('./utils')));
            await validateTranslationFiles(projectPath);
            console.log(chalk_1.default.green('✅ Project validation passed'));
        }
        else {
            console.log(chalk_1.default.gray('  Would validate: package.json, tsconfig.json, required directories'));
            console.log(chalk_1.default.green('✅ Validation would pass'));
        }
        if (isDryRun) {
            console.log(chalk_1.default.green(`\n✅ Dry-run completed successfully!`));
            console.log(chalk_1.default.cyan(`\n📊 Preview Summary:`));
            console.log(chalk_1.default.white(`  Project name: ${projectName}`));
            console.log(chalk_1.default.white(`  Location: ${projectPath}`));
            if (aiContextOptions) {
                const aiFiles = [];
                if (aiContextOptions.cursorrules)
                    aiFiles.push('.cursorrules');
                if (aiContextOptions.aiContext)
                    aiFiles.push('ai-context.md');
                if (aiContextOptions.claudeContext)
                    aiFiles.push('.claude/project-context.md');
                if (aiContextOptions.claudeSkills)
                    aiFiles.push('.claude/skills/');
                console.log(chalk_1.default.white(`  AI Context: ${aiFiles.length > 0 ? aiFiles.join(', ') : 'None'}`));
                console.log(chalk_1.default.white(`  Language: ${aiContextOptions.language}`));
            }
            console.log(chalk_1.default.cyan(`\n💡 Run without --dry-run to create the project`));
            return;
        }
        // Generate and display summary
        const { generateSummary, displaySummary, displayNextSteps } = await Promise.resolve().then(() => __importStar(require('./utils')));
        const summary = await generateSummary(projectPath, aiContextOptions);
        console.log(chalk_1.default.green(`\n✅ Project created successfully!`));
        displaySummary(summary);
        displayNextSteps(projectPath, aiContextOptions);
    }
    catch (error) {
        // Log error details
        const isEn = process.env.LANG === 'en' || process.env.CLI_LANG === 'en' || process.argv.includes('--english-only');
        console.error(chalk_1.default.red(`\n❌ ${isEn ? 'Error creating project' : '프로젝트 생성 중 오류 발생'}:`));
        if (error instanceof Error) {
            console.error(chalk_1.default.red(error.message));
            if (process.env.NODE_ENV !== 'production' || process.env.DEBUG) {
                console.error(chalk_1.default.gray(error.stack));
            }
        }
        else {
            console.error(error);
        }
        // Cleanup on error (only if we created a new directory)
        if (!isDryRun && await fs.pathExists(projectPath)) {
            // Check if it was empty before we started? 
            // Simplified: always try to clean up if it's the target, but maybe only if it's "new"
            // actually, if we started in an existing empty dir, we might want to clean up what we added.
            // But for safety, if it was an existing dir, maybe don't rm -rf the whole thing.
            // Let's keep existing cleanup but log more.
            console.log(chalk_1.default.yellow('\n🧹 Cleaning up...'));
            await fs.remove(projectPath);
        }
        throw error;
    }
}
