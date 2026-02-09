export * from '@hua-labs/utils';

/**
 * Logger utility
 *
 * Environment-based log level control:
 * - production: warn, error only
 * - development: all levels
 *
 * Override with LOG_LEVEL env var:
 * - LOG_LEVEL=debug|info|warn|error
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LogContext {
    [key: string]: unknown;
}
interface Logger {
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, context?: LogContext): void;
}
/** Default logger (no prefix) */
declare const logger: Logger;
/** Create a named logger with a prefix */
declare function createLogger(prefix: string): Logger;

export { type LogContext, type LogLevel, type Logger, createLogger, logger };
