import { c as HuaProviderProps, a as HuaPageProps, H as HuaConfig, d as LicenseFeature, L as LicenseCheckResult, e as LicenseInfo, b as HuaPlugin } from '../index-Cm8lkgIw.mjs';
export { f as LicenseType, P as PresetName } from '../index-Cm8lkgIw.mjs';
export { G as GEOConfig, a as GEOMetadata, P as ProgrammingLanguage, S as SoftwareApplicationType, b as SoftwareCategory, c as StructuredData, d as createAIContext, g as generateFAQPageLD, e as generateGEOMetadata, f as generateHowToLD, h as generateSoftwareApplicationLD, i as generateTechArticleLD, r as renderJSONLD } from '../structuredData-Cq9LiZVN.mjs';
export { I18nMiddlewareConfig, SEOConfig, createI18nMiddleware, generateCSSVariables, generateCSSVariablesObject, generatePageMetadata, generateTailwindConfig } from './shared.mjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default, { ReactNode, RefObject, ComponentType } from 'react';
export { B as BrandedButton, a as BrandedCard, E as ErrorBoundary, b as ErrorBoundaryProps } from '../index-kaC-pE52.mjs';
export { defineConfig, getConfig, resetConfig, setConfig } from './config.mjs';
export { Skeleton } from '@hua-labs/ui';
import { EntranceType, UseUnifiedMotionOptions, MotionElement, BaseMotionReturn } from '@hua-labs/motion-core';
export { useBounceIn, useClickToggle, useFadeIn, useFocusToggle, useGesture, useGestureMotion, useGradient, useHoverMotion, useMotionState, usePulse, useRepeat, useScaleIn, useScrollProgress, useScrollReveal, useSlideLeft, useSlideRight, useSlideUp, useSpringMotion, useToggleMotion } from '@hua-labs/motion-core';
import 'next';
import '@hua-labs/ui/form';
import '@hua-labs/ui/navigation';
import '@hua-labs/ui/overlay';
import '@hua-labs/ui/data';
import '@hua-labs/ui/interactive';
import '@hua-labs/ui/advanced';
import '@hua-labs/ui/advanced/dashboard';
import '@hua-labs/ui/advanced/motion';
import '@hua-labs/i18n-core';
import '@hua-labs/i18n-core-zustand';
import '@hua-labs/state';
import '@hua-labs/pro';

/**
 * HuaProvider Component
 *
 * Automatically configures i18n, motion, and state providers based on configuration.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { HuaProvider } from '@hua-labs/hua/framework';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <HuaProvider>{children}</HuaProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
declare function HuaProvider({ children, config }: HuaProviderProps): react_jsx_runtime.JSX.Element;

/**
 * HuaPage Component
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
 * import { HuaPage } from '@hua-labs/hua/framework';
 *
 * export default function HomePage() {
 *   return (
 *     <HuaPage
 *       vibe="clean"
 *       i18nKey="home"
 *       title="홈"
 *       description="환영합니다"
 *     >
 *       <h1>Welcome</h1>
 *     </HuaPage>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // 바이브 코더용: vibe만으로 스타일 결정
 * // For vibe coders: decide style with just vibe
 * <HuaPage vibe="fancy">
 *   <div>화려한 인터랙션이 자동 적용됩니다</div>
 * </HuaPage>
 * ```
 */
declare function HuaPage({ children, title, description, vibe, i18nKey, enableMotion, enableErrorBoundary, errorBoundaryFallback, seo, motion, }: HuaPageProps): react_jsx_runtime.JSX.Element;

/**
 * UnifiedProviders component
 *
 * Automatically creates and wraps children with all necessary providers
 */
declare function UnifiedProviders({ children, config: overrideConfig, }: {
    children: ReactNode;
    config?: Partial<HuaConfig>;
}): react_jsx_runtime.JSX.Element;

interface WelcomePageProps extends Omit<HuaPageProps, 'children'> {
    /**
     * Project name to display
     */
    projectName?: string;
    /**
     * Show framework features
     */
    showFeatures?: boolean;
    /**
     * Show quick links
     */
    showQuickLinks?: boolean;
    /**
     * Custom content to display
     */
    children?: React__default.ReactNode;
}
/**
 * WelcomePage Component
 *
 * Default welcome page for new hua projects.
 * Displays project information, framework features, and quick links.
 *
 * @example
 * ```tsx
 * // app/page.tsx
 * import { WelcomePage } from '@hua-labs/hua/framework';
 *
 * export default function HomePage() {
 *   return <WelcomePage projectName="My App" />;
 * }
 * ```
 */
declare function WelcomePage({ projectName, showFeatures, showQuickLinks, children, ...pageProps }: WelcomePageProps): react_jsx_runtime.JSX.Element;

/**
 * @hua-labs/hua/framework - Data Fetching Utilities
 *
 * Type-safe data fetching utilities for server and client components
 */
/**
 * Data fetching result
 */
interface DataFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}
/**
 * Client-side data fetching hook
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, isLoading, error } = useData<Post[]>('/api/posts');
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   return <PostList posts={data} />;
 * }
 * ```
 */
declare function useData<T>(url: string, options?: RequestInit): DataFetchResult<T>;
/**
 * Server-side data fetching utility
 *
 * @example
 * ```tsx
 * // app/page.tsx (Server Component)
 * import { fetchData } from '@hua-labs/hua/framework';
 *
 * export default async function HomePage() {
 *   const posts = await fetchData<Post[]>('/api/posts');
 *   return <PostList posts={posts} />;
 * }
 * ```
 */
declare function fetchData<T>(url: string, options?: RequestInit): Promise<T>;

/**
 * @hua-labs/hua/framework - License System
 *
 * 라이선스 검증 및 관리 시스템
 */

/**
 * 라이선스 초기화
 *
 * 설정 파일의 라이선스 정보를 사용하여 라이선스를 로드합니다.
 *
 * @param configLicense - 설정 파일의 라이선스 정보 (선택적)
 */
declare function initLicense(configLicense?: {
    apiKey?: string;
    type?: 'free' | 'pro' | 'enterprise';
}): void;
/**
 * 현재 라이선스 가져오기
 *
 * @returns 라이선스 정보
 */
declare function getLicense(): LicenseInfo;
/**
 * 라이선스 검증
 *
 * 특정 기능이 현재 라이선스에서 사용 가능한지 확인합니다.
 *
 * @param feature - 확인할 기능
 * @returns 검증 결과
 *
 * @example
 * ```ts
 * const result = checkLicense('motion-pro');
 * if (result.valid) {
 *   // Pro 기능 사용
 * }
 * ```
 */
declare function checkLicense(feature: LicenseFeature): LicenseCheckResult;
/**
 * 라이선스 확인 (간단한 boolean 반환)
 *
 * @param feature - 확인할 기능
 * @returns 사용 가능 여부
 *
 * @example
 * ```ts
 * if (hasLicense('motion-pro')) {
 *   // Pro 기능 사용
 * }
 * ```
 */
declare function hasLicense(feature: LicenseFeature): boolean;
/**
 * 라이선스 필수 확인
 *
 * 라이선스가 없으면 에러를 throw합니다.
 *
 * @param feature - 확인할 기능
 * @throws 라이선스가 없을 경우 에러
 *
 * @example
 * ```ts
 * requireLicense('motion-pro');
 * // Pro 기능 사용 (에러 없음)
 * ```
 */
declare function requireLicense(feature: LicenseFeature): void;

/**
 * @hua-labs/hua/framework - Plugin Registry
 *
 * 플러그인 등록 및 관리 시스템
 */

/**
 * 플러그인 레지스트리 / Plugin registry
 *
 * 모든 플러그인을 등록하고 관리하는 싱글톤 클래스
 * Singleton class that registers and manages all plugins
 */
declare class PluginRegistry {
    private plugins;
    private initialized;
    /**
     * 플러그인 등록 / Register plugin
     *
     * @param plugin - 등록할 플러그인
     * @throws 라이선스가 없을 경우 에러
     *
     * @example
     * ```ts
     * import { registerPlugin } from '@hua-labs/hua/framework';
     * import { motionProPlugin } from '@hua-labs/motion-core/pro';
     *
     * registerPlugin(motionProPlugin);
     * ```
     */
    register(plugin: HuaPlugin): void;
    /**
     * 플러그인 초기화 / Initialize plugin
     *
     * 등록된 플러그인의 init 함수를 호출합니다.
     * Calls the init function of registered plugins.
     *
     * @param pluginName - 플러그인 이름
     * @param config - 프레임워크 설정
     */
    initialize(pluginName: string, config: any): Promise<void>;
    /**
     * 모든 플러그인 초기화 / Initialize all plugins
     *
     * @param config - 프레임워크 설정
     */
    initializeAll(config: any): Promise<void>;
    /**
     * 플러그인 가져오기 / Get plugin
     *
     * @param name - 플러그인 이름
     * @returns 플러그인 또는 undefined
     */
    get(name: string): HuaPlugin | undefined;
    /**
     * 모든 플러그인 가져오기 / Get all plugins
     *
     * @returns 플러그인 배열
     */
    getAll(): HuaPlugin[];
    /**
     * 플러그인 등록 해제 / Unregister plugin
     *
     * @param name - 플러그인 이름
     */
    unregister(name: string): void;
    /**
     * 레지스트리 초기화 (테스트용) / Reset registry (for testing)
     */
    reset(): void;
}
/**
 * 전역 플러그인 레지스트리 인스턴스 / Global plugin registry instance
 */
declare const pluginRegistry: PluginRegistry;
/**
 * 플러그인 등록 (편의 함수) / Register plugin (convenience function)
 *
 * @param plugin - 등록할 플러그인
 */
declare function registerPlugin(plugin: HuaPlugin): void;
/**
 * 플러그인 가져오기 (편의 함수) / Get plugin (convenience function)
 *
 * @param name - 플러그인 이름
 * @returns 플러그인 또는 undefined
 */
declare function getPlugin(name: string): HuaPlugin | undefined;
/**
 * 모든 플러그인 가져오기 (편의 함수) / Get all plugins (convenience function)
 *
 * @returns 플러그인 배열
 */
declare function getAllPlugins(): HuaPlugin[];

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
declare function BrandingProvider({ branding, children, }: {
    branding: NonNullable<HuaConfig['branding']> | null;
    children: React__default.ReactNode;
}): react_jsx_runtime.JSX.Element;
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
declare function useBranding(): NonNullable<HuaConfig['branding']> | null;
/**
 * Get color from branding
 *
 * 브랜딩에서 색상을 가져옵니다. 없으면 기본값을 반환합니다.
 *
 * @param colorKey - Color key (primary, secondary, etc.)
 * @param defaultValue - Default color if not found
 * @returns Color value
 */
declare function useBrandingColor(colorKey: keyof NonNullable<NonNullable<HuaConfig['branding']>['colors']>, defaultValue?: string): string | undefined;

/**
 * @hua-labs/hua/framework - useFocusManagement
 *
 * 페이지 전환 시 자동으로 메인 콘텐츠에 포커스를 이동시키는 hook
 * Automatically focuses main content on page transitions
 */

/**
 * Focus Management 옵션
 */
interface FocusManagementOptions {
    /**
     * 마운트 시 자동으로 포커스할지 여부
     * Whether to automatically focus on mount
     *
     * @default true
     */
    autoFocus?: boolean;
    /**
     * 포커스할 요소의 선택자 (기본값: 요소 자체)
     * Selector for element to focus (default: element itself)
     */
    focusSelector?: string;
    /**
     * 포커스 시 스크롤할지 여부
     * Whether to scroll when focusing
     *
     * @default false
     */
    scrollIntoView?: boolean;
    /**
     * 스크롤 옵션 (scrollIntoView가 true일 때)
     * Scroll options (when scrollIntoView is true)
     */
    scrollOptions?: ScrollIntoViewOptions;
}
/**
 * Focus Management Hook
 *
 * 페이지 전환 시 자동으로 메인 콘텐츠에 포커스를 이동시킵니다.
 * Automatically focuses main content on page transitions.
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   const mainRef = useFocusManagement({ autoFocus: true });
 *
 *   return (
 *     <main ref={mainRef} tabIndex={-1}>
 *       <h1>Page Title</h1>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param options - Focus Management 옵션
 * @returns 요소에 연결할 ref
 */
declare function useFocusManagement<T extends HTMLElement = HTMLElement>(options?: FocusManagementOptions): RefObject<T | null>;

/**
 * @hua-labs/hua/framework - useFocusTrap
 *
 * 모달, 드로어 등에서 포커스를 트랩하는 hook
 * Traps focus within a container (e.g., modal, drawer)
 */

/**
 * Focus Trap 옵션
 */
interface FocusTrapOptions {
    /**
     * 포커스 트랩 활성화 여부
     * Whether focus trap is active
     *
     * @default true
     */
    isActive?: boolean;
    /**
     * Escape 키를 눌렀을 때 호출할 콜백
     * Callback when Escape key is pressed
     */
    onEscape?: () => void;
    /**
     * 포커스할 초기 요소 선택자
     * Selector for initial element to focus
     */
    initialFocus?: string;
    /**
     * 포커스가 트랩 밖으로 나갔을 때 호출할 콜백
     * Callback when focus leaves the trap
     */
    onFocusOut?: () => void;
}
/**
 * Focus Trap Hook
 *
 * 모달, 드로어 등에서 포커스를 컨테이너 내부에 트랩합니다.
 * Traps focus within a container (e.g., modal, drawer).
 *
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   const modalRef = useFocusTrap({
 *     isActive: isOpen,
 *     onEscape: onClose
 *   });
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div ref={modalRef} role="dialog" aria-modal="true">
 *       <button onClick={onClose}>Close</button>
 *       Modal content
 *     </div>
 *   );
 * }
 * ```
 *
 * @param options - Focus Trap 옵션
 * @returns 컨테이너에 연결할 ref
 */
declare function useFocusTrap<T extends HTMLElement = HTMLElement>(options?: FocusTrapOptions): RefObject<T | null>;

/**
 * @hua-labs/hua/framework - SkipToContent
 *
 * 키보드 사용자를 위한 "콘텐츠로 건너뛰기" 링크
 * "Skip to content" link for keyboard users
 */

/**
 * SkipToContent 컴포넌트 props
 */
interface SkipToContentProps {
    /**
     * 메인 콘텐츠의 ID
     * ID of the main content element
     *
     * @default "main-content"
     */
    targetId?: string;
    /**
     * 링크 텍스트
     * Link text
     *
     * @default "Skip to content"
     */
    children?: React__default.ReactNode;
    /**
     * 추가 CSS 클래스
     * Additional CSS classes
     */
    className?: string;
}
/**
 * SkipToContent 컴포넌트
 *
 * 키보드 사용자가 네비게이션을 건너뛰고 메인 콘텐츠로 바로 이동할 수 있도록 합니다.
 * Allows keyboard users to skip navigation and go directly to main content.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { SkipToContent } from '@hua-labs/hua/framework';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <SkipToContent />
 *         <nav>Navigation</nav>
 *         <main id="main-content" tabIndex={-1}>
 *           {children}
 *         </main>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @param props - SkipToContent props
 * @returns SkipToContent 컴포넌트
 */
declare function SkipToContent({ targetId, children, className, }: SkipToContentProps): React__default.JSX.Element;

/**
 * @hua-labs/hua/framework - LiveRegion
 *
 * 스크린 리더 사용자에게 동적 상태 변화를 알리는 컴포넌트
 * Component that announces dynamic state changes to screen reader users
 */

/**
 * LiveRegion 컴포넌트 props
 */
interface LiveRegionProps {
    /**
     * 알림할 메시지
     * Message to announce
     */
    message?: string;
    /**
     * Live region의 politeness 레벨
     * Politeness level of the live region
     *
     * - 'polite': 현재 작업이 완료된 후 알림 (기본값)
     * - 'assertive': 즉시 알림
     * - 'off': 알림 비활성화
     *
     * @default "polite"
     */
    politeness?: 'polite' | 'assertive' | 'off';
    /**
     * 추가 CSS 클래스
     * Additional CSS classes
     */
    className?: string;
}
/**
 * LiveRegion 컴포넌트
 *
 * 스크린 리더 사용자에게 동적 상태 변화를 알립니다.
 * Announces dynamic state changes to screen reader users.
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const [message, setMessage] = useState('');
 *
 *   const handleSubmit = async () => {
 *     setMessage('저장 중...');
 *     await saveData();
 *     setMessage('저장되었습니다!');
 *   };
 *
 *   return (
 *     <div>
 *       <form onSubmit={handleSubmit}>Form fields</form>
 *       <LiveRegion message={message} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @param props - LiveRegion props
 * @returns LiveRegion 컴포넌트
 */
declare function LiveRegion({ message, politeness, className, }: LiveRegionProps): React__default.JSX.Element;

/**
 * @hua-labs/hua/framework - useLiveRegion
 *
 * 프로그래밍 방식으로 Live Region을 사용하는 hook
 * Hook for programmatically using Live Region
 */

/**
 * useLiveRegion 반환 타입
 */
interface UseLiveRegionReturn {
    /**
     * 메시지를 알림
     * Announce a message
     */
    announce: (message: string, politeness?: 'polite' | 'assertive') => void;
    /**
     * LiveRegion 컴포넌트
     * LiveRegion component to render
     */
    LiveRegionComponent: React__default.JSX.Element;
    /**
     * 현재 메시지
     * Current message
     */
    message: string | undefined;
}
/**
 * useLiveRegion Hook
 *
 * 프로그래밍 방식으로 Live Region을 사용할 수 있습니다.
 * Allows programmatic use of Live Region.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { announce, LiveRegionComponent } = useLiveRegion();
 *
 *   const handleClick = () => {
 *     announce('버튼이 클릭되었습니다');
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick}>Click me</button>
 *       {LiveRegionComponent}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param defaultPoliteness - 기본 politeness 레벨
 * @returns Live Region 제어 함수와 컴포넌트
 */
declare function useLiveRegion(defaultPoliteness?: 'polite' | 'assertive'): UseLiveRegionReturn;

/**
 * @hua-labs/hua/framework - useDelayedLoading
 *
 * 빠른 API 응답 시 로딩 UI 깜빡임을 방지하는 hook
 * Prevents loading UI flicker for fast API responses
 */
/**
 * Delayed Loading 옵션
 */
interface DelayedLoadingOptions {
    /**
     * 로딩 UI를 표시하기 전 대기 시간 (밀리초)
     * Delay before showing loading UI (milliseconds)
     *
     * @default 300
     */
    delay?: number;
    /**
     * 최소 표시 시간 (밀리초) - 로딩이 너무 빨리 끝나도 최소한 이 시간은 표시
     * Minimum display time (milliseconds) - show loading for at least this duration
     *
     * @default 0
     */
    minDisplayTime?: number;
}
/**
 * useDelayedLoading Hook
 *
 * 빠른 API 응답 시 로딩 UI가 깜빡거리는 것을 방지합니다.
 * 300ms 이하로 끝나면 로딩 UI를 아예 표시하지 않습니다.
 *
 * Prevents loading UI flicker for fast API responses.
 * If loading completes within 300ms, the loading UI is not shown at all.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [isLoading, setIsLoading] = useState(false);
 *   const showLoading = useDelayedLoading(isLoading);
 *
 *   const fetchData = async () => {
 *     setIsLoading(true);
 *     await api.getData(); // 빠르게 끝나면 로딩 UI 안보임
 *     setIsLoading(false);
 *   };
 *
 *   return showLoading ? <Spinner /> : <Content />;
 * }
 * ```
 *
 * @param isLoading - 현재 로딩 상태
 * @param options - 옵션
 * @returns 실제로 로딩 UI를 표시할지 여부
 */
declare function useDelayedLoading(isLoading: boolean, options?: DelayedLoadingOptions): boolean;

/**
 * @hua-labs/hua/framework - useLoadingState
 *
 * 로딩 상태를 관리하는 편의성 hook
 * Convenience hook for managing loading state
 */

/**
 * useLoadingState 반환 타입
 */
interface UseLoadingStateReturn {
    /**
     * 실제로 로딩 UI를 표시할지 여부 (useDelayedLoading 적용)
     * Whether to actually show loading UI (with useDelayedLoading applied)
     */
    showLoading: boolean;
    /**
     * 로딩 시작
     * Start loading
     */
    startLoading: () => void;
    /**
     * 로딩 종료
     * Stop loading
     */
    stopLoading: () => void;
    /**
     * 로딩 상태 토글
     * Toggle loading state
     */
    toggleLoading: () => void;
    /**
     * 현재 로딩 상태 (지연 없이)
     * Current loading state (without delay)
     */
    isLoading: boolean;
}
/**
 * useLoadingState Hook
 *
 * 로딩 상태를 쉽게 관리할 수 있는 편의성 hook입니다.
 * useDelayedLoading이 자동으로 적용됩니다.
 *
 * Convenience hook for easily managing loading state.
 * useDelayedLoading is automatically applied.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { showLoading, startLoading, stopLoading } = useLoadingState();
 *
 *   const fetchData = async () => {
 *     startLoading();
 *     try {
 *       await api.getData();
 *     } finally {
 *       stopLoading();
 *     }
 *   };
 *
 *   return showLoading && <Spinner />;
 * }
 * ```
 *
 * @param options - useDelayedLoading 옵션
 * @returns 로딩 상태 제어 함수
 */
declare function useLoadingState(options?: DelayedLoadingOptions): UseLoadingStateReturn;

/**
 * @hua-labs/hua/framework - SkeletonGroup
 *
 * 여러 Skeleton을 그룹으로 묶는 컴포넌트
 * Component for grouping multiple Skeletons
 */

/**
 * SkeletonGroup 컴포넌트 props
 */
interface SkeletonGroupProps extends React__default.HTMLAttributes<HTMLDivElement> {
    /**
     * 자식 요소들
     * Children elements
     */
    children?: React__default.ReactNode;
    /**
     * 간격 크기
     * Spacing size
     *
     * @default "md"
     */
    spacing?: 'sm' | 'md' | 'lg';
}
/**
 * SkeletonGroup 컴포넌트
 *
 * 여러 Skeleton을 일관된 간격으로 그룹화합니다.
 * Groups multiple Skeletons with consistent spacing.
 *
 * @example
 * ```tsx
 * <SkeletonGroup>
 *   <Skeleton width="60%" height={32} />
 *   <Skeleton width="80%" />
 *   <Skeleton width="70%" />
 * </SkeletonGroup>
 * ```
 *
 * @param props - SkeletonGroup props
 * @returns SkeletonGroup 컴포넌트
 */
declare function SkeletonGroup({ children, spacing, className, ...props }: SkeletonGroupProps): React__default.JSX.Element;

/**
 * @hua-labs/hua/framework - SuspenseWrapper
 *
 * React Suspense를 더 쉽게 사용할 수 있게 해주는 컴포넌트
 * Component that makes React Suspense easier to use
 */

/**
 * SuspenseWrapper 컴포넌트 props
 */
interface SuspenseWrapperProps {
    /**
     * Suspense로 감쌀 자식 요소
     * Children to wrap with Suspense
     */
    children: ReactNode;
    /**
     * 로딩 중 표시할 fallback
     * Fallback to show while loading
     *
     * @default <SkeletonGroup>...</SkeletonGroup>
     */
    fallback?: ReactNode;
    /**
     * 기본 Skeleton fallback 사용 여부
     * Whether to use default Skeleton fallback
     *
     * @default true
     */
    useDefaultFallback?: boolean;
}
/**
 * SuspenseWrapper 컴포넌트
 *
 * React Suspense를 더 쉽게 사용할 수 있게 해줍니다.
 * 기본적으로 Skeleton fallback을 제공합니다.
 *
 * Makes React Suspense easier to use.
 * Provides Skeleton fallback by default.
 *
 * @example
 * ```tsx
 * // 기본 사용 (자동 Skeleton fallback)
 * <SuspenseWrapper>
 *   <AsyncComponent />
 * </SuspenseWrapper>
 *
 * // 커스텀 fallback
 * <SuspenseWrapper fallback={<Spinner />}>
 *   <AsyncComponent />
 * </SuspenseWrapper>
 * ```
 *
 * @param props - SuspenseWrapper props
 * @returns SuspenseWrapper 컴포넌트
 */
declare function SuspenseWrapper({ children, fallback, useDefaultFallback, }: SuspenseWrapperProps): React__default.JSX.Element;

/**
 * @hua-labs/hua/framework - withSuspense
 *
 * 컴포넌트를 Suspense로 감싸는 HOC
 * HOC that wraps a component with Suspense
 */

/**
 * withSuspense 옵션
 */
interface WithSuspenseOptions {
    /**
     * 로딩 중 표시할 fallback
     * Fallback to show while loading
     */
    fallback?: ReactNode;
    /**
     * 기본 Skeleton fallback 사용 여부
     * Whether to use default Skeleton fallback
     *
     * @default true
     */
    useDefaultFallback?: boolean;
}
/**
 * withSuspense HOC
 *
 * 컴포넌트를 Suspense로 감싸는 Higher-Order Component입니다.
 *
 * Higher-Order Component that wraps a component with Suspense.
 *
 * @example
 * ```tsx
 * const AsyncPosts = withSuspense(Posts, <Skeleton height={200} />);
 *
 * function MyPage() {
 *   return <AsyncPosts />;
 * }
 * ```
 *
 * @param Component - 감쌀 컴포넌트
 * @param options - 옵션 또는 fallback
 * @returns Suspense로 감싼 컴포넌트
 */
declare function withSuspense<P extends object>(Component: ComponentType<P>, optionsOrFallback?: WithSuspenseOptions | ReactNode): ComponentType<P>;

/**
 * @hua-labs/hua/framework - useMotion
 *
 * 통합 Motion Hook - motion-core의 useUnifiedMotion을 래핑
 * Unified Motion Hook - Wraps motion-core's useUnifiedMotion
 *
 * 이 hook은 motion-core의 useUnifiedMotion을 재export하여
 * hua 프레임워크에서 일관된 API를 제공합니다.
 *
 * This hook re-exports motion-core's useUnifiedMotion to provide
 * a consistent API within the hua framework.
 */

/**
 * Motion type (motion-core의 EntranceType과 동일)
 */
type MotionType = EntranceType;
/**
 * useMotion options (motion-core의 UseUnifiedMotionOptions와 동일)
 */
type UseMotionOptions = UseUnifiedMotionOptions;
/**
 * 통합 Motion Hook
 *
 * motion-core의 useUnifiedMotion을 래핑하여 hua 프레임워크에서 사용합니다.
 *
 * Wraps motion-core's useUnifiedMotion for use in the hua framework.
 *
 * @param options - Motion options
 * @returns Motion result with ref and control functions
 *
 * @example
 * ```tsx
 * const motion = useMotion({
 *   type: 'fadeIn',
 *   duration: 600,
 *   autoStart: true,
 * });
 *
 * return <div ref={motion.ref} style={motion.style}>Content</div>;
 * ```
 */
declare function useMotion<T extends MotionElement = HTMLDivElement>(options: UseMotionOptions): BaseMotionReturn<T>;

export { BrandingProvider, type DataFetchResult, type DelayedLoadingOptions, type FocusManagementOptions, type FocusTrapOptions, HuaConfig, HuaPage, HuaPageProps, HuaPlugin, HuaProvider, HuaProviderProps, LicenseCheckResult, LicenseFeature, LicenseInfo, LiveRegion, type LiveRegionProps, type MotionType, SkeletonGroup, type SkeletonGroupProps, SkipToContent, type SkipToContentProps, SuspenseWrapper, type SuspenseWrapperProps, UnifiedProviders, type UseMotionOptions, WelcomePage, type WelcomePageProps, checkLicense, fetchData, getAllPlugins, getLicense, getPlugin, hasLicense, initLicense, pluginRegistry, registerPlugin, requireLicense, useBranding, useBrandingColor, useData, useDelayedLoading, useFocusManagement, useFocusTrap, useLiveRegion, useLoadingState, useMotion, useMotion as useUnifiedMotion, withSuspense };
