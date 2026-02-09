/**
 * Version Check Utility
 *
 * Checks if the user is running an outdated version of create-hua
 * and provides clear instructions to clear npx cache if needed.
 *
 * This helps prevent users from getting old templates due to npx cache.
 */
interface VersionCheckResult {
    currentVersion: string;
    latestVersion: string;
    isOutdated: boolean;
    error?: string;
}
/**
 * Check version and display warning if outdated
 */
export declare function checkVersion(): Promise<VersionCheckResult>;
/**
 * Check version without displaying anything (for testing)
 */
export declare function checkVersionSilent(): Promise<VersionCheckResult>;
export {};
//# sourceMappingURL=version-check.d.ts.map