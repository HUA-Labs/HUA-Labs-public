/**
 * @hua-labs/hua-ux/framework - Branding Context
 * 
 * 브랜딩 설정을 컴포넌트에서 사용하기 위한 Context
 */

'use client';

import React, { createContext, useContext } from 'react';
import type { HuaUxConfig } from '../types';

/**
 * Branding context value
 */
interface BrandingContextValue {
  branding: NonNullable<HuaUxConfig['branding']> | null;
}

/**
 * Branding context
 */
const BrandingContext = createContext<BrandingContextValue>({
  branding: null,
});

/**
 * BrandingProvider component
 * 
 * 브랜딩 설정을 제공하고 CSS 변수를 자동으로 주입하는 Provider입니다.
 * Provides branding configuration and automatically injects CSS variables.
 * 
 * @example
 * ```tsx
 * <BrandingProvider branding={config.branding}>
 *   {children}
 * </BrandingProvider>
 * ```
 */
export function BrandingProvider({
  branding,
  children,
}: {
  branding: NonNullable<HuaUxConfig['branding']> | null;
  children: React.ReactNode;
}) {
  // CSS 변수를 동적으로 생성하고 주입
  // Generate and inject CSS variables dynamically
  React.useEffect(() => {
    if (!branding) return;

    // CSS 변수 생성
    // Generate CSS variables
    const cssVars: string[] = [];
    
    if (branding.colors) {
      Object.entries(branding.colors).forEach(([key, value]) => {
        if (value) {
          cssVars.push(`--color-${key}: ${value};`);
        }
      });
    }
    
    if (branding.typography) {
      if (branding.typography.fontFamily) {
        cssVars.push(`--font-family: ${branding.typography.fontFamily.join(', ')};`);
      }
      if (branding.typography.fontSize) {
        Object.entries(branding.typography.fontSize).forEach(([key, value]) => {
          if (value) {
            cssVars.push(`--font-size-${key}: ${value};`);
          }
        });
      }
    }
    
    if (branding.customVariables) {
      Object.entries(branding.customVariables).forEach(([key, value]) => {
        cssVars.push(`--${key}: ${value};`);
      });
    }

    if (cssVars.length === 0) return;

    // style 태그 생성 또는 업데이트
    // Create or update style tag
    const styleId = 'hua-ux-branding-vars';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `:root {\n  ${cssVars.join('\n  ')}\n}`;

    // Cleanup
    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, [branding]);

  return (
    <BrandingContext.Provider value={{ branding }}>
      {children}
    </BrandingContext.Provider>
  );
}

/**
 * useBranding hook
 * 
 * 브랜딩 설정을 가져오는 훅입니다.
 * 
 * @returns Branding configuration or null
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const branding = useBranding();
 *   const primaryColor = branding?.colors?.primary || 'blue';
 *   return <div style={{ color: primaryColor }}>Hello</div>;
 * }
 * ```
 */
export function useBranding(): NonNullable<HuaUxConfig['branding']> | null {
  const { branding } = useContext(BrandingContext);
  return branding;
}

/**
 * Get color from branding
 * 
 * 브랜딩에서 색상을 가져옵니다. 없으면 기본값을 반환합니다.
 * 
 * @param colorKey - Color key (primary, secondary, etc.)
 * @param defaultValue - Default color if not found
 * @returns Color value
 */
export function useBrandingColor(
  colorKey: keyof NonNullable<NonNullable<HuaUxConfig['branding']>['colors']>,
  defaultValue?: string
): string | undefined {
  const branding = useBranding();
  return branding?.colors?.[colorKey] || defaultValue;
}
