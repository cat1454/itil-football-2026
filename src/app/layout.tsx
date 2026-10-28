import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#16422B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://itil-football-2026.vercel.app'),
  title: {
    default: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
    template: '%s | ITIL 2026',
  },
  description:
    'Cổng thông tin chính thức Giải Bóng Đá Nội Bộ Mùa 1 năm 2026 — CLB Bóng Đá Liên Chi Đoàn Khoa CNTT. Cập nhật tỷ số trực tiếp, lịch thi đấu 3 vòng, bảng xếp hạng 4 đội xoay vòng và bục trao giải vinh danh.',
  keywords: [
    'ITIL 2026',
    'IT Internal League',
    'CLB Bóng Đá Liên Chi Đoàn CNTT',
    'Giải Bóng Đá CNTT',
    'Bóng Đá Mùa 1 2026',
    'Giải Bóng Đá Nội Bộ',
    'Bảng Xếp Hạng Bóng Đá ITIL',
    'Khoa Công Nghệ Thông Tin',
    'Bóng Đá Sinh Viên',
  ],
  authors: [
    { name: 'Ban Tổ Chức Liên Chi Đoàn Khoa CNTT' },
    { name: 'CLB Bóng Đá LCĐ Khoa CNTT' },
  ],
  creator: 'CLB Bóng Đá Liên Chi Đoàn Khoa CNTT',
  publisher: 'Khoa Công Nghệ Thông Tin',
  applicationName: 'ITIL Football 2026',
  alternates: {
    canonical: 'https://itil-football-2026.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon-512.png',
    shortcut: '/icon-512.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://itil-football-2026.vercel.app',
    siteName: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
    title: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
    description:
      'Cổng thông tin & Bảng xếp hạng chính thức Giải bóng đá nội bộ Mùa 1 năm 2026. Lịch thi đấu 3 vòng, tỷ số trực tiếp và bục vinh danh 4 đội tranh tài.',
    images: [
      {
        url: 'https://itil-football-2026.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
    description:
      'Cổng thông tin & Bảng xếp hạng chính thức Giải bóng đá nội bộ Mùa 1 năm 2026. Lịch thi đấu 3 vòng, tỷ số trực tiếp và bục vinh danh.',
    images: ['https://itil-football-2026.vercel.app/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SportsOrganization',
      '@id': 'https://itil-football-2026.vercel.app/#organization',
      name: 'CLB Bóng Đá Liên Chi Đoàn Khoa CNTT',
      url: 'https://itil-football-2026.vercel.app',
      sport: 'Soccer',
      description: 'Câu lạc bộ bóng đá sinh viên và giảng viên Liên Chi Đoàn Khoa Công Nghệ Thông Tin.',
    },
    {
      '@type': 'SportsEvent',
      '@id': 'https://itil-football-2026.vercel.app/#event',
      name: 'ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT',
      description: 'Giải bóng đá nội bộ Mùa 1 năm 2026 thể thức 4 đội thi đấu vòng tròn 1 lượt (Round-Robin) tìm ra nhà vô địch.',
      startDate: '2026-11-07T07:30:00+07:00',
      endDate: '2026-11-14T11:00:00+07:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      sport: 'Soccer',
      location: {
        '@type': 'Place',
        name: 'Sân Bóng Đá Mini',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'TP. Hồ Chí Minh',
          addressCountry: 'VN',
        },
      },
      organizer: {
        '@id': 'https://itil-football-2026.vercel.app/#organization',
      },
    },
  ],
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
        {/* Social link preview fallback tags for Zalo, Facebook, Messenger, Telegram */}
        <meta property="og:image" content="https://itil-football-2026.vercel.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://itil-football-2026.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ITIL Mùa 1 (2026) — Giải Bóng Đá CLB Liên Chi Đoàn CNTT" />
        <meta name="twitter:image" content="https://itil-football-2026.vercel.app/og-image.png" />
        <link rel="image_src" href="https://itil-football-2026.vercel.app/og-image.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-editorial-grid min-h-screen text-[#141413] antialiased selection:bg-[#16422B] selection:text-white"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
