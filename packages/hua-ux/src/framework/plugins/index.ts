/**
 * @hua-labs/hua-ux/framework - Plugin System
 * 
 * 플러그인 시스템 메인 export
 */

export { 
  pluginRegistry, 
  registerPlugin, 
  getPlugin, 
  getAllPlugins 
} from './registry';
export type { HuaUxPlugin } from './types';
