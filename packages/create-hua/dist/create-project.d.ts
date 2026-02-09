/**
 * create-hua - Project Creation
 *
 * Creates a new hua project from template
 */
import { type AiContextOptions } from './utils';
/**
 * Resolve project path
 *
 * If running from within the monorepo (packages/create-hua), create project in monorepo root.
 * Otherwise, create in current working directory.
 */
export declare function resolveProjectPath(projectName: string): string;
export declare function createProject(projectName: string, aiContextOptions?: AiContextOptions, options?: {
    dryRun?: boolean;
    skipPrerequisites?: boolean;
}): Promise<void>;
//# sourceMappingURL=create-project.d.ts.map