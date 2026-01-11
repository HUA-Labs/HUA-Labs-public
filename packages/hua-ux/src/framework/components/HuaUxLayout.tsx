/**
 * @hua-labs/hua-ux/framework - HuaUxLayout
 *
 * Root layout wrapper that automatically sets up all providers
 */

'use client';

import React from 'react';
import type { HuaUxLayoutProps } from '../types';
import { UnifiedProviders } from './Providers';
import { useTranslation } from '@hua-labs/i18n-core';

/**
 * Language transition wrapper - adds smooth fade during language change
 */
function LanguageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useTranslation();

  return (
    <div
      style={{
        opacity: isLoading ? 0.4 : 1,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

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
  return (
    <UnifiedProviders config={config}>
      <LanguageTransitionWrapper>{children}</LanguageTransitionWrapper>
    </UnifiedProviders>
  );
}
