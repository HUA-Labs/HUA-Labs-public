import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HuaProvider } from "@hua-labs/hua/framework";
import { getSSRTranslations } from "@hua-labs/hua/framework/server";
import config from "../hua.config";

export const metadata: Metadata = {
  title: {
    default: "My HUA App",
    template: "%s | My HUA App",
  },
  description: "Built with HUA Framework — the developer toolkit for building products with soul.",
  keywords: ["HUA", "React", "Next.js", "TypeScript"],
  authors: [{ name: "HUA Labs" }],
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTranslations = await getSSRTranslations(config);

  const configWithSSR = {
    ...config,
    i18n: config.i18n ? { ...config.i18n, initialTranslations } : undefined,
  };

  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <HuaProvider config={configWithSSR}>{children}</HuaProvider>
      </body>
    </html>
  );
}
