/**
 * @hua-labs/hua-ux/framework - Type Definitions
 * 
 * Core types for the framework layer
 */

import type { ReactNode } from 'react';

/**
 * Preset name
 */
export type PresetName = 'product' | 'marketing';

/**
 * Framework configuration
 */
export interface HuaUxConfig {
  /**
   * Preset to use / 사용할 프리셋
   * 
   * Preset을 선택하면 대부분의 설정이 자동으로 적용됩니다.
   * Selecting a preset automatically applies most settings.
   * 
   * - 'product': Professional, efficient (default) / 제품 페이지용 (전문적, 효율적, 기본값)
   * - 'marketing': Dramatic, eye-catching / 마케팅 페이지용 (화려함, 눈에 띄는)
   * 
   * @example
   * ```ts
   * export default defineConfig({
   *   preset: 'product',  // 이것만으로도 대부분 설정 완료 / Most settings auto-configured
   * });
   * ```
   */
  preset?: PresetName;

  /**
   * i18n configuration / 다국어 설정
   * 
   * Internationalization settings for multi-language support.
   * 다국어 지원을 위한 설정입니다.
   */
  i18n?: {
    /**
     * Default language code / 기본 언어 코드
     * 
     * 예: 'ko', 'en' / e.g., 'ko', 'en'
     */
    defaultLanguage: string;
    
    /**
     * Supported language codes / 지원하는 언어 코드 배열
     * 
     * 예: ['ko', 'en', 'ja'] / e.g., ['ko', 'en', 'ja']
     */
    supportedLanguages: string[];
    
    /**
     * Fallback language / 대체 언어
     * 
     * 번역이 없을 때 사용할 언어 / Language to use when translation is missing
     */
    fallbackLanguage?: string;
    
    /**
     * Translation namespaces / 번역 네임스페이스
     * 
     * 로드할 번역 네임스페이스 목록 / List of translation namespaces to load
     */
    namespaces?: string[];
    
    /**
     * Translation loading strategy / 번역 로딩 전략
     * 
     * - 'api': API Route에서 로드 / Load from API Route
     * - 'static': 정적 파일에서 로드 / Load from static files
     * - 'custom': 커스텀 로더 사용 / Use custom loader
     */
    translationLoader?: 'api' | 'static' | 'custom';
    
    /**
     * Translation API path / 번역 API 경로
     * 
     * 'api' 로더 사용 시 API 경로 / API path when using 'api' loader
     */
    translationApiPath?: string;
  };

  /**
   * Motion configuration / 모션/애니메이션 설정
   * 
   * Animation and motion settings.
   * 애니메이션 및 모션 설정입니다.
   */
  motion?: {
    /**
     * Default motion preset / 기본 모션 프리셋
     * 
     * - 'product': 빠른 전환, 최소 딜레이 / Fast transitions, minimal delay
     * - 'marketing': 느린 전환, 긴 딜레이 / Slow transitions, long delay
     */
    defaultPreset?: 'product' | 'marketing';
    
    /**
     * Enable animations globally / 전역 애니메이션 활성화 여부
     * 
     * false로 설정하면 모든 애니메이션 비활성화 / Set to false to disable all animations
     */
    enableAnimations?: boolean;
  };

  /**
   * State management configuration
   */
  state?: {
    persist?: boolean;
    ssr?: boolean;
  };

  /**
   * File structure configuration
   */
  fileStructure?: {
    enforce?: boolean;
  };

  /**
   * Branding configuration (White Labeling) / 브랜딩 설정 (화이트 라벨링)
   * 
   * 브랜드 커스터마이징을 위한 설정입니다.
   * Brand customization settings.
   * 
   * 색상, 타이포그래피, 로고 등을 설정하면 모든 컴포넌트에 자동 적용됩니다.
   * Setting colors, typography, logo, etc. automatically applies to all components.
   * 
   * @example
   * ```ts
   * export default defineConfig({
   *   preset: 'product',
   *   branding: {
   *     name: 'My Company',
   *     logo: '/logo.svg',
   *     colors: {
   *       primary: '#3B82F6',
   *       secondary: '#8B5CF6',
   *     },
   *     typography: {
   *       fontFamily: ['Inter', 'sans-serif'],
   *     },
   *   },
   * });
   * ```
   */
  branding?: {
    /**
     * Company/Service name / 회사/서비스 이름
     */
    name?: string;
    
    /**
     * Logo path / 로고 경로
     */
    logo?: string;
    
    /**
     * Color palette / 색상 팔레트
     * 
     * Tailwind 색상 이름 또는 hex 코드를 사용할 수 있습니다.
     * You can use Tailwind color names or hex codes.
     */
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      success?: string;
      warning?: string;
      error?: string;
      info?: string;
    };
    
    /**
     * Typography settings / 타이포그래피 설정
     */
    typography?: {
      /**
       * Font family stack / 폰트 패밀리 스택
       */
      fontFamily?: string[];
      
      /**
       * Font sizes / 폰트 크기
       */
      fontSize?: {
        h1?: string;
        h2?: string;
        h3?: string;
        body?: string;
      };
    };
    
    /**
     * Custom CSS variables / 커스텀 CSS 변수
     * 
     * 추가적인 CSS 변수를 정의할 수 있습니다.
     * You can define additional CSS variables.
     */
    customVariables?: Record<string, string>;
  };
}

/**
 * HuaUxLayout props
 */
export interface HuaUxLayoutProps {
  children: ReactNode;
  /**
   * Override config (optional, uses hua-ux.config.ts by default)
   */
  config?: Partial<HuaUxConfig>;
}

/**
 * HuaUxPage props
 */
export interface HuaUxPageProps {
  children: ReactNode;
  
  /**
   * 페이지 제목 / Page title
   * 
   * SEO 메타데이터에 사용됩니다.
   * Used for SEO metadata.
   */
  title?: string;
  
  /**
   * 페이지 설명 / Page description
   * 
   * SEO 메타데이터에 사용됩니다.
   * Used for SEO metadata.
   */
  description?: string;
  
  /**
   * 페이지 감도 / Page vibe
   * 
   * AI가 페이지의 스타일을 결정하는 핵심 키워드입니다.
   * Core keyword for AI to determine page style.
   * 
   * - 'clean': 여백 중심, 미니멀한 인터랙션 / Spacing-focused, minimal interactions
   * - 'fancy': 화려한 인터랙션, 드라마틱한 모션 / Rich interactions, dramatic motion
   * - 'minimal': 최소한의 모션, 빠른 전환 / Minimal motion, fast transitions
   * 
   * @vibe AI가 페이지의 감도를 결정하는 핵심 키워드
   * 
   * @example
   * ```tsx
   * <HuaUxPage vibe="clean">
   *   <div>여백 중심의 깔끔한 페이지</div>
   * </HuaUxPage>
   * ```
   */
  vibe?: 'clean' | 'fancy' | 'minimal';
  
  /**
   * i18n 네임스페이스 / i18n namespace
   * 
   * 번역 파일의 네임스페이스를 지정합니다.
   * 설정하지 않으면 파일명을 따릅니다.
   * 
   * Specifies the translation namespace.
   * If not specified, uses the file name.
   * 
   * @example
   * ```tsx
   * <HuaUxPage i18nKey="home">
   *   <div>translations/ko/home.json, translations/en/home.json 사용</div>
   * </HuaUxPage>
   * ```
   */
  i18nKey?: string;
  
  /**
   * 페이지 전환 애니메이션 활성화 / Enable page transition animations
   * 
   * 기본값: true (설정에서 motion.enableAnimations가 true인 경우)
   * Default: true (when motion.enableAnimations is true in config)
   */
  enableMotion?: boolean;
}
