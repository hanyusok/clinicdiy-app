import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClinicDIY - 개원 의사를 위한 병원 수선 커뮤니티",
  description: "개원 의사분들이 병원 운영 중 필요한 소소한 인테리어 수선 작업(DIY)에 대한 노하우, 팁, 유용한 도구를 공유하는 커뮤니티입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-1 flex flex-col pb-16 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
