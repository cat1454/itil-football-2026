import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
  description: 'Trang thông tin chính thức CLB Bóng Đá Liên Chi Đoàn CNTT — Giải đấu Mùa 1 năm 2026 (4 đội xoay vòng 3 lượt trận, bảng xếp hạng và bục vinh danh).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-editorial-grid min-h-screen text-[#141413] antialiased selection:bg-[#16422B] selection:text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
