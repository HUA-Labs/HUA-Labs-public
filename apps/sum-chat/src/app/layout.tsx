import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "숨챗 - 지금도 듣고 있어요",
  description: "숨챗은 당신과 함께 숨쉬는 AI 친구입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
