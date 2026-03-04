import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://story.kmong.com";
const TITLE = "Agent Starter";
const DESCRIPTION =
  "비개발자를 위한 Claude Code 인터랙티브 가이드. AI 에이전트를 제대로 부려먹는 법을 배우세요.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Claude Code",
    "AI 가이드",
    "비개발자",
    "크몽",
    "AI Native",
    "프롬프트",
    "에이전트",
    "사장님 마인드셋",
    "인터랙티브 튜토리얼",
  ],
  authors: [{ name: "AI Native Team — 크몽" }],
  creator: "크몽 AI Native Team",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Agent Starter — 비개발자를 위한 Claude Code 가이드",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
