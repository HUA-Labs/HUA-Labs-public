import type { Metadata } from "next";
import "./globals.css";
import { HuaUxLayout } from "@hua-labs/hua-ux/framework";

export const metadata: Metadata = {
  title: "HUA UX App",
  description: "Created with hua-ux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <HuaUxLayout>{children}</HuaUxLayout>
      </body>
    </html>
  );
}
