import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "🦊 boni 的小站",
  description: "跟有趣的人做有趣的事 - boni 的学习、思考和分享",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-amber-50">{children}</body>
    </html>
  );
}
