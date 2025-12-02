import type { Metadata } from 'next';
import { I18nProvider } from '@/components/I18nProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'HUA i18n Demo',
  description: 'Demo of @hua-labs/i18n-core with zero flickering language switching',
};

/**
 * Root layout component
 * 
 * Wraps the application with I18nProvider to enable translations.
 * suppressHydrationWarning is used to prevent hydration mismatches
 * when Zustand persist middleware loads language from localStorage.
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

