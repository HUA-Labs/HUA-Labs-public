/**
 * @hua-labs/hua-ux/framework - HuaUxPage
 * 
 * Page wrapper with automatic motion and i18n support
 */

'use client';

import React from 'react';
import type { HuaUxPageProps } from '../types';
import { getConfig } from '../config';
import { 
  useFadeIn, 
  useSlideUp, 
  useSlideLeft, 
  useSlideRight, 
  useScaleIn, 
  useBounceIn 
} from '@hua-labs/motion-core';

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
  seo,
  motion,
}: HuaUxPageProps) {
  const config = getConfig();

  // vibe에 따라 모션 설정 조정
  // Adjust motion settings based on vibe
  const motionDuration = vibe === 'fancy' ? 800 : vibe === 'minimal' ? 300 : 600;
  const shouldEnableMotion = enableMotion && config.motion?.enableAnimations !== false;

  // motion prop 또는 vibe에 따라 모션 타입 결정
  // Determine motion type based on motion prop or vibe
  const motionType = motion || (vibe === 'fancy' ? 'slideUp' : vibe === 'minimal' ? 'fadeIn' : 'fadeIn');

  // Call all hooks unconditionally (React Rules of Hooks)
  // 모든 hook을 조건 없이 호출 (React Rules of Hooks 준수)
  const fadeInResult = useFadeIn<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });
  const slideUpResult = useSlideUp<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });
  const slideLeftResult = useSlideLeft<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });
  const slideRightResult = useSlideRight<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });
  const scaleInResult = useScaleIn<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });
  const bounceInResult = useBounceIn<HTMLDivElement>({ 
    duration: motionDuration, 
    autoStart: false 
  });

  // Select the appropriate result based on motion type
  // motionType에 따라 적절한 결과 선택
  let motionResult: typeof fadeInResult;
  
  switch (motionType) {
    case 'slideUp':
      motionResult = slideUpResult;
      break;
    case 'slideLeft':
      motionResult = slideLeftResult;
      break;
    case 'slideRight':
      motionResult = slideRightResult;
      break;
    case 'scaleIn':
      motionResult = scaleInResult;
      break;
    case 'bounceIn':
      motionResult = bounceInResult;
      break;
    case 'fadeIn':
    default:
      motionResult = fadeInResult;
      break;
  }

  // Start the selected motion if enabled
  // 모션이 활성화된 경우 선택된 모션 시작
  React.useEffect(() => {
    if (shouldEnableMotion) {
      motionResult.start?.();
    }
  }, [shouldEnableMotion, motionResult]);
  const pageRef = motionResult.ref;

  // SEO 메타데이터는 Next.js App Router에서 page.tsx의 export const metadata로 처리하는 것이 권장됩니다.
  // 이 컴포넌트는 Client Component이므로 메타데이터를 직접 설정할 수 없습니다.
  // SEO 설정이 있으면 개발자에게 경고 메시지 표시 (개발 모드에서만)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && seo) {
      console.warn(
        '[HuaUxPage] SEO metadata should be set using `export const metadata` in page.tsx.\n' +
        'Use `generatePageMetadata()` helper function from @hua-labs/hua-ux/framework'
      );
    }
  }, [seo]);

  // i18nKey가 있으면 해당 네임스페이스를 자동으로 로드하도록 안내
  // (실제 로드는 I18nProvider에서 자동 처리됨)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && i18nKey) {
      // i18nKey가 설정되어 있으면 해당 네임스페이스가 자동으로 로드됩니다.
      // 번역 키는 `${i18nKey}:title`, `${i18nKey}:description` 형식으로 사용할 수 있습니다.
      // Translation keys can be used in the format `${i18nKey}:title`, `${i18nKey}:description`
    }
  }, [i18nKey]);

  return (
    <div ref={pageRef}>
      {children}
    </div>
  );
}
