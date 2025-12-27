/**
 * @hua-labs/hua-ux/framework - HuaUxLayout
 * 
 * Root layout wrapper that automatically sets up all providers
 */

'use client';

import React from 'react';
import type { HuaUxLayoutProps } from '../types';
import { UnifiedProviders } from './Providers';

/**
 * HuaUxLayout Component
 * 
 * Automatically configures i18n, motion, and state providers based on configuration.
 * 
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { HuaUxLayout } from '@hua-labs/hua-ux/framework';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <HuaUxLayout>{children}</HuaUxLayout>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function HuaUxLayout({ children, config }: HuaUxLayoutProps) {
  return <UnifiedProviders config={config}>{children}</UnifiedProviders>;
}
