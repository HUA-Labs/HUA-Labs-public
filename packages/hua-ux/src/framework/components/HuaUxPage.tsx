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
 * 페이지 콘텐츠를 자동 모션 애니메이션과 i18n 지원으로 감싸는 컴포넌트입니다.
 * Wraps page content with automatic motion animations and i18n support.
 * 
 * **바이브 코딩 친화적 / Vibe Coding Friendly**:
 * - 한 파일에서 SEO, Motion, i18n을 모두 결정할 수 있습니다.
 * - You can decide SEO, Motion, and i18n all in one file.
 * - AI가 파일 하나만 보고도 완벽한 페이지를 생성할 수 있습니다.
 * - AI can generate a perfect page by looking at just one file.
 * 
 * @example
 * ```tsx
 * // app/page.tsx
 * import { HuaUxPage } from '@hua-labs/hua-ux/framework';
 * 
 * export default function HomePage() {
 *   return (
 *     <HuaUxPage
 *       vibe="clean"
 *       i18nKey="home"
 *       title="홈"
 *       description="환영합니다"
 *     >
 *       <h1>Welcome</h1>
 *     </HuaUxPage>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // 바이브 코더용: vibe만으로 스타일 결정
 * // For vibe coders: decide style with just vibe
 * <HuaUxPage vibe="fancy">
 *   <div>화려한 인터랙션이 자동 적용됩니다</div>
 * </HuaUxPage>
 * ```
 */
export function HuaUxPage({
  children,
  title,
  description,
  vibe,
  i18nKey,
  enableMotion = true,
}: HuaUxPageProps) {
  const config = getConfig();

  // vibe에 따라 모션 설정 조정
  // Adjust motion settings based on vibe
  const motionDuration = vibe === 'fancy' ? 800 : vibe === 'minimal' ? 300 : 600;
  const shouldEnableMotion = enableMotion && config.motion?.enableAnimations !== false;

  // Always call hook (React rules)
  const motionResult = useFadeIn<HTMLDivElement>({ 
    duration: motionDuration,
    autoStart: shouldEnableMotion,
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
