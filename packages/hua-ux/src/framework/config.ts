/**
 * @hua-labs/hua-ux/framework/config
 * 
 * Configuration entry point (server/client compatible)
 * 
 * This is a separate entry point from framework/index.ts to allow defineConfig
 * to be used in server-side configuration files (hua-ux.config.ts) even when
 * framework/index.ts has 'use client' directive.
 */

export { defineConfig, loadConfig, getConfig, setConfig, resetConfig } from './config/index';
export type { HuaUxConfig, PresetName } from './types';
