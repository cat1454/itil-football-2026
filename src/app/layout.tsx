import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ITIL 2026 — Giải Bóng Đá Nội Bộ Liên Chi Đoàn CNTT (4 Đội Xoay Vòng)',
  description: 'Trang thông tin, lịch thi đấu 3 vòng (6 trận), bảng xếp hạng trực tiếp và ma trận đối đầu giải bóng đá nội bộ ITIL 2026.',
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
