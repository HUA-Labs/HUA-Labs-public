"use strict";
/**
 * Version Check Utility
 *
 * Checks if the user is running an outdated version of create-hua
 * and provides clear instructions to clear npx cache if needed.
 *
 * This helps prevent users from getting old templates due to npx cache.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersion = checkVersion;
exports.checkVersionSilent = checkVersionSilent;
const child_process_1 = require("child_process");
const util_1 = require("util");
const chalk_1 = __importDefault(require("chalk"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
/**
 * Fetch the latest version from npm registry
 */
async function getLatestVersion() {
    try {
        const { stdout } = await execAsync('npm view create-hua version', {
            timeout: 5000, // 5 second timeout
        });
        return stdout.trim();
    }
    catch (error) {
        return null;
    }
}
/**
 * Get current package version
 */
function getCurrentVersion() {
    try {
        const packageJson = require('../package.json');
        return packageJson.version;
    }
    catch (error) {
        return 'unknown';
    }
}
/**
 * Compare versions (simple semver comparison)
 */
function isVersionOutdated(current, latest) {
    if (current === latest)
        return false;
    if (current === 'unknown')
        return true;
    // Simple comparison - if they're different and current is not latest, it's outdated
    // For alpha versions, any difference means potentially outdated
    return current !== latest;
}
/**
 * Display cache clearing instructions based on OS
 */
function displayCacheClearInstructions() {
    const platform = process.platform;
    console.log(chalk_1.default.cyan('\n   📝 To clear npx cache:\n'));
    if (platform === 'win32') {
        // Windows
        console.log(chalk_1.default.cyan('   Windows:'));
        console.log(chalk_1.default.white('   npm cache clean --force'));
        console.log(chalk_1.default.white('   del /s /q "%LOCALAPPDATA%\\npm-cache"'));
        console.log(chalk_1.default.white('   rmdir /s /q "%APPDATA%\\npm-cache"'));
    }
    else {
        // macOS / Linux
        console.log(chalk_1.default.cyan('   macOS/Linux:'));
        console.log(chalk_1.default.white('   npm cache clean --force'));
        console.log(chalk_1.default.white('   rm -rf ~/.npm/_npx'));
    }
    console.log(chalk_1.default.cyan('\n   Then create your project with:'));
    console.log(chalk_1.default.white('   npm create hua@latest my-app'));
    console.log();
}
/**
 * Check version and display warning if outdated
 */
async function checkVersion() {
    const currentVersion = getCurrentVersion();
    const latestVersion = await getLatestVersion();
    if (!latestVersion) {
        // Network error or npm unreachable - skip check silently
        return {
            currentVersion,
            latestVersion: 'unknown',
            isOutdated: false,
            error: 'Unable to check latest version (network error)',
        };
    }
    const isOutdated = isVersionOutdated(currentVersion, latestVersion);
    if (isOutdated) {
        console.log(chalk_1.default.yellow('\n⚠️  Warning: You are using an outdated version of create-hua'));
        console.log(chalk_1.default.yellow(`   Current:  ${currentVersion}`));
        console.log(chalk_1.default.yellow(`   Latest:   ${latestVersion}`));
        console.log();
        console.log(chalk_1.default.yellow('   This may result in receiving old templates with known issues.'));
        displayCacheClearInstructions();
        console.log(chalk_1.default.gray('   Continuing in 5 seconds...\n'));
        // Wait 5 seconds to let user read the warning
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    else {
        console.log(chalk_1.default.green(`✓ Using latest version: ${currentVersion}\n`));
    }
    return {
        currentVersion,
        latestVersion,
        isOutdated,
    };
}
/**
 * Check version without displaying anything (for testing)
 */
async function checkVersionSilent() {
    const currentVersion = getCurrentVersion();
    const latestVersion = await getLatestVersion();
    if (!latestVersion) {
        return {
            currentVersion,
            latestVersion: 'unknown',
            isOutdated: false,
            error: 'Unable to check latest version',
        };
    }
    return {
        currentVersion,
        latestVersion,
        isOutdated: isVersionOutdated(currentVersion, latestVersion),
    };
}
