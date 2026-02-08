import type { Metadata } from "next";
import "./globals.css";
import { HuaUxLayout } from "@hua-labs/hua-ux/framework";
import config from "../hua-ux.config";

export const metadata: Metadata = {
  title: "HUA UX App",
  description: "Created with @hua-labs/hua-ux",
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <HuaUxLayout config={config}>{children}</HuaUxLayout>
      </body>
    </html>
  );
}
