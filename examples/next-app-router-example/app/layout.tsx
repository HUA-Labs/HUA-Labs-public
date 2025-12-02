/**
 * Root Layout - Next.js App Router
 * 
 * This layout demonstrates:
 * - SSR translation loading
 * - Server Component with async data fetching
 * - i18n Provider setup with initial translations
 * 
 * Note: I18nProvider is a client component to comply with Next.js 15
 * Server/Client Component separation requirements.
 */
import { loadSSRTranslations } from '@/lib/i18n-server';
import { I18nProvider } from '@/components/I18nProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HUA i18n Next.js Example',
  description: 'Complete example of @hua-labs/i18n-core with Next.js App Router',
};

/**
 * Root App Router layout that loads Korean server-side translations and supplies them to the application.
 *
 * @param children - The layout's child nodes rendered inside the `I18nProvider`
 * @returns The HTML root element that wraps `children` with an `I18nProvider` initialized with Korean SSR translations
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load translations from server-side (SSR)
  // This prevents hydration mismatches and improves initial load performance
  const ssrTranslations = await loadSSRTranslations('ko');

  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider ssrTranslations={ssrTranslations}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
