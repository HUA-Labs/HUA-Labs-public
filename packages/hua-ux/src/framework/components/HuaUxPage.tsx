/**
 * @hua-labs/hua-ux/framework - HuaUxPage
 * 
 * Page wrapper with automatic motion and i18n support
 */

'use client';

import React from 'react';
import type { HuaUxPageProps } from '../types';
import { getConfig } from '../config';
import { useFadeIn } from '@hua-labs/motion-core';

/**
 * HuaUxPage Component
 * 
 * Wraps page content with automatic motion animations and i18n support.
 * 
 * @example
 * ```tsx
 * // app/page.tsx
 * import { HuaUxPage } from '@hua-labs/hua-ux/framework';
 * 
 * export default function HomePage() {
 *   return (
 *     <HuaUxPage>
 *       <h1>Welcome</h1>
 *     </HuaUxPage>
 *   );
 * }
 * ```
 */
export function HuaUxPage({
  children,
  title,
  description,
  enableMotion = true,
}: HuaUxPageProps) {
  const config = getConfig();

  // Always call hook (React rules)
  const motionResult = useFadeIn<HTMLDivElement>({ 
    duration: 600,
    autoStart: enableMotion && config.motion?.enableAnimations !== false,
  });
  const pageRef = motionResult.ref;

  return (
    <div ref={pageRef}>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {children}
    </div>
  );
}
