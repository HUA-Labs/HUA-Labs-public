/**
 * create-hua - Doctor Command
 *
 * Diagnoses project health and provides solutions
 */
/**
 * Diagnose project health
 */
export declare function diagnoseProject(projectPath: string): Promise<{
    healthy: boolean;
    issues: Array<{
        type: 'error' | 'warning';
        message: string;
        solution?: string;
    }>;
}>;
/**
 * Run doctor command
 */
export declare function runDoctor(projectPath: string): Promise<void>;
//# sourceMappingURL=doctor.d.ts.map