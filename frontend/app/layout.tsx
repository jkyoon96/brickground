import type { Metadata } from 'next';
import { Nunito, Pretendard } from 'next/font/google';
import '@/styles/globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const pretendard = Pretendard({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BrickGround - VR 쇼핑몰 및 창작 플랫폼',
  description:
    '3D/VR 기반 쇼핑 경험과 픽셀아트 창작 기능을 결합한 통합 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${nunito.variable} ${pretendard.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
