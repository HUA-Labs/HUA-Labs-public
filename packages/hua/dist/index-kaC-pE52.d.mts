import { Button, CardProps } from '@hua-labs/ui';
import '@hua-labs/ui/form';
import '@hua-labs/ui/navigation';
import '@hua-labs/ui/overlay';
import '@hua-labs/ui/data';
import '@hua-labs/ui/interactive';
import '@hua-labs/ui/advanced';
import '@hua-labs/ui/advanced/dashboard';
import '@hua-labs/ui/advanced/motion';
import * as React from 'react';
import React__default, { ComponentPropsWithoutRef, ErrorInfo, Component, ReactNode } from 'react';
import '@hua-labs/motion-core';
import '@hua-labs/i18n-core';
import '@hua-labs/i18n-core-zustand';
import '@hua-labs/state';
import '@hua-labs/pro';

/**
 * @hua-labs/hua/framework - BrandedButton
 *
 * Button 컴포넌트에 branding을 자동으로 적용하는 wrapper
 * Wrapper that automatically applies branding to Button component
 *
 * CSS 변수를 사용하여 Tailwind의 최적화를 활용합니다.
 * Uses CSS variables to leverage Tailwind's optimization.
 */

/**
 * BrandedButton Component
 *
 * Button 컴포넌트에 branding 설정을 자동으로 적용합니다.
 * Automatically applies branding configuration to Button component.
 *
 * **자동 적용되는 branding**:
 * - Primary 색상: `variant="default"`일 때 `bg-[var(--color-primary)]` 사용
 * - Secondary 색상: `variant="secondary"`일 때 `bg-[var(--color-secondary)]` 사용
 * - Accent 색상: `variant="outline"`일 때 `border-[var(--color-accent)]` 사용
 *
 * **Auto-applied branding**:
 * - Primary color: Uses `bg-[var(--color-primary)]` when `variant="default"`
 * - Secondary color: Uses `bg-[var(--color-secondary)]` when `variant="secondary"`
 * - Accent color: Uses `border-[var(--color-accent)]` when `variant="outline"`
 *
 * **CSS 변수 방식의 장점**:
 * - Tailwind의 JIT 컴파일러 최적화 활용
 * - 인라인 스타일 없이 깔끔한 코드
 * - 런타임에 동적으로 색상 변경 가능
 *
 * **Advantages of CSS variables**:
 * - Leverages Tailwind's JIT compiler optimization
 * - Clean code without inline styles
 * - Dynamic color changes at runtime
 *
 * @example
 * ```tsx
 * // branding 설정이 있으면 자동으로 primary 색상 적용
 * // Automatically applies primary color if branding is configured
 * <BrandedButton variant="default">저장</BrandedButton>
 *
 * // branding이 없으면 기본 Button과 동일하게 동작
 * // Works same as default Button if branding is not configured
 * <BrandedButton variant="outline">취소</BrandedButton>
 * ```
 */
type BrandedButtonProps = ComponentPropsWithoutRef<typeof Button>;
declare const BrandedButton: React.ForwardRefExoticComponent<BrandedButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

/**
 * @hua-labs/hua/framework - BrandedCard
 *
 * Card 컴포넌트에 branding을 자동으로 적용하는 wrapper
 * Wrapper that automatically applies branding to Card component
 *
 * CSS 변수를 사용하여 Tailwind의 최적화를 활용합니다.
 * Uses CSS variables to leverage Tailwind's optimization.
 */

/**
 * BrandedCard Component
 *
 * Card 컴포넌트에 branding 설정을 자동으로 적용합니다.
 * Automatically applies branding configuration to Card component.
 *
 * **자동 적용되는 branding**:
 * - Accent 색상: `variant="outline"`일 때 `border-[var(--color-accent)]` 사용
 * - Primary 색상: `variant="default"`일 때 `bg-[var(--color-primary)]/5` 사용
 *
 * **Auto-applied branding**:
 * - Accent color: Uses `border-[var(--color-accent)]` when `variant="outline"`
 * - Primary color: Uses `bg-[var(--color-primary)]/5` when `variant="default"`
 *
 * **CSS 변수 방식의 장점**:
 * - Tailwind의 JIT 컴파일러 최적화 활용
 * - 인라인 스타일 없이 깔끔한 코드
 * - 런타임에 동적으로 색상 변경 가능
 *
 * **Advantages of CSS variables**:
 * - Leverages Tailwind's JIT compiler optimization
 * - Clean code without inline styles
 * - Dynamic color changes at runtime
 *
 * @example
 * ```tsx
 * // branding 설정이 있으면 자동으로 색상 적용
 * // Automatically applies colors if branding is configured
 * <BrandedCard variant="outline">
 *   <CardContent>내용</CardContent>
 * </BrandedCard>
 *
 * // branding이 없으면 기본 Card와 동일하게 동작
 * // Works same as default Card if branding is not configured
 * <BrandedCard variant="elevated">
 *   <CardContent>내용</CardContent>
 * </BrandedCard>
 * ```
 */
declare const BrandedCard: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * @hua-labs/hua/framework - ErrorBoundary
 *
 * React Error Boundary component for catching and handling errors
 */

/**
 * Global error reporter interface
 *
 * 프로덕션 환경에서 에러 리포팅 서비스(Sentry, LogRocket 등)와 통합하기 위한 인터페이스
 * Interface for integrating with error reporting services (Sentry, LogRocket, etc.) in production
 *
 * @example
 * ```ts
 * // Sentry 통합 예시
 * window.__ERROR_REPORTER__ = (error, errorInfo) => {
 *   Sentry.captureException(error, {
 *     contexts: { react: errorInfo },
 *   });
 * };
 * ```
 */
declare global {
    interface Window {
        __ERROR_REPORTER__?: (error: Error, errorInfo: ErrorInfo) => void;
    }
}
/**
 * Error Boundary Props
 */
interface ErrorBoundaryProps {
    /**
     * Children to render
     */
    children: ReactNode;
    /**
     * Fallback UI to show when error occurs
     * Can be a ReactNode or a function that receives error and reset callback
     */
    fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
    /**
     * Callback when error is caught
     */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /**
     * Custom error filter - return true to catch, false to rethrow
     */
    onReset?: () => void;
}
/**
 * Error Boundary State
 */
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <h1>Error: {error.message}</h1>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    reset: () => void;
    render(): ReactNode;
}

export { BrandedButton as B, ErrorBoundary as E, BrandedCard as a, type ErrorBoundaryProps as b };
