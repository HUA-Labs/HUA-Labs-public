import type { Metadata } from 'next';
import { I18nProvider } from '@/components/I18nProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'HUA i18n Demo',
  description: 'Demo of @hua-labs/i18n-core with zero flickering language switching',
};

/**
 * Root layout that sets the document language to Korean and wraps the app with I18nProvider.
 *
 * The layout applies `suppressHydrationWarning` to avoid hydration mismatches when a persisted
 * language is loaded (for example from localStorage) and initializes the i18n provider with `"ko"`.
 *
 * @param children - The application content to render inside the i18n provider
 * @returns The root HTML structure containing the I18nProvider-wrapped children
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider initialLanguage="ko">
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
