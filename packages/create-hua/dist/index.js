"use strict";
/**
 * create-hua - Main Logic
 *
 * Project creation logic
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
exports.main = main;
const create_project_1 = require("./create-project");
Object.defineProperty(exports, "createProject", { enumerable: true, get: function () { return create_project_1.createProject; } });
const utils_1 = require("./utils");
const version_check_1 = require("./version-check");
/**
 * Parse CLI arguments for AI context options and other flags
 */
function parseAiContextOptions() {
    const args = process.argv.slice(2);
    const flags = {
        '--no-cursorrules': false,
        '--no-ai-context': false,
        '--no-claude-context': false,
        '--claude-skills': false,
        '--lang': 'both',
        '--dry-run': false,
        '--install': false,
        '--non-interactive': false,
    };
    // Simple flag parsing
    if (args.includes('--no-cursorrules'))
        flags['--no-cursorrules'] = true;
    if (args.includes('--no-ai-context'))
        flags['--no-ai-context'] = true;
    if (args.includes('--no-claude-context'))
        flags['--no-claude-context'] = true;
    if (args.includes('--claude-skills'))
        flags['--claude-skills'] = true;
    if (args.includes('--dry-run'))
        flags['--dry-run'] = true;
    if (args.includes('--install'))
        flags['--install'] = true;
    if (args.includes('--non-interactive'))
        flags['--non-interactive'] = true;
    const langIndex = args.indexOf('--lang');
    if (langIndex !== -1 && args[langIndex + 1]) {
        const lang = args[langIndex + 1];
        if (['ko', 'en', 'both'].includes(lang)) {
            flags['--lang'] = lang;
        }
    }
    const result = {};
    // If any flags are set, return parsed options
    if (args.some(arg => arg.startsWith('--'))) {
        result.options = {
            cursorrules: !flags['--no-cursorrules'],
            aiContext: !flags['--no-ai-context'],
            claudeContext: !flags['--no-claude-context'],
            claudeSkills: flags['--claude-skills'],
            language: flags['--lang'],
        };
        result.dryRun = flags['--dry-run'];
        result.install = flags['--install'];
        result.nonInteractive = flags['--non-interactive'];
    }
    return result;
}
async function main() {
    // Check version (skip in CI/test environments)
    if (!process.env.CI && !process.env.NON_INTERACTIVE) {
        await (0, version_check_1.checkVersion)().catch(() => {
            // Silently continue if version check fails
        });
    }
    // Check for doctor command
    const args = process.argv.slice(2);
    if (args[0] === 'doctor') {
        const { runDoctor } = await Promise.resolve().then(() => __importStar(require('./doctor')));
        const projectPath = args[1] || process.cwd();
        await runDoctor(projectPath);
        return;
    }
    // Get project name from args (first non-flag argument)
    const projectName = args.find(arg => !arg.startsWith('--'));
    if (!projectName) {
        try {
            const name = await (0, utils_1.promptProjectName)();
            if (!name) {
                const isEn = process.env.LANG === 'en' || process.env.CLI_LANG === 'en' || process.argv.includes('--english-only');
                console.error(isEn ? 'Project name is required' : 'Project name is required / 프로젝트 이름이 필요합니다');
                console.error('Usage: npx @hua-labs/create-hua <project-name> [--claude-skills] [--lang ko|en|both] [--dry-run] [--install] [--non-interactive] [--english-only]');
                process.exit(1);
            }
            // AI context generation options
            const aiContextOptions = await (0, utils_1.promptAiContextOptions)();
            const parsed = parseAiContextOptions();
            await (0, create_project_1.createProject)(name, aiContextOptions, {
                dryRun: parsed.dryRun,
                skipPrerequisites: parsed.dryRun, // Skip prerequisites in dry-run
            });
            return;
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('User force closed')) {
                process.exit(0);
            }
            throw error;
        }
    }
    // Parse CLI options or prompt
    const parsed = parseAiContextOptions();
    let aiContextOptions;
    if (parsed.options) {
        // Use CLI options if provided
        aiContextOptions = parsed.options;
    }
    else {
        // Try to prompt, fallback to defaults if not interactive
        try {
            aiContextOptions = await (0, utils_1.promptAiContextOptions)();
        }
        catch (error) {
            console.warn('Failed to get interactive options, using defaults');
            aiContextOptions = {
                cursorrules: true,
                aiContext: true,
                claudeContext: true,
                claudeSkills: false,
                language: 'both',
            };
        }
    }
    await (0, create_project_1.createProject)(projectName, aiContextOptions, {
        dryRun: parsed.dryRun,
        skipPrerequisites: parsed.dryRun,
    });
    // Auto-install if --install flag is set
    if (parsed.install && !parsed.dryRun) {
        const { execSync } = await Promise.resolve().then(() => __importStar(require('child_process')));
        const { resolveProjectPath } = await Promise.resolve().then(() => __importStar(require('./create-project')));
        const projectPath = resolveProjectPath(projectName);
        const chalk = (await Promise.resolve().then(() => __importStar(require('chalk')))).default;
        console.log(chalk.blue('\n📦 Installing dependencies...'));
        try {
            execSync('pnpm install', {
                cwd: projectPath,
                stdio: 'inherit',
            });
            console.log(chalk.green('✅ Dependencies installed'));
        }
        catch (error) {
            console.error(chalk.red('❌ Failed to install dependencies'));
            throw error;
        }
    }
}
