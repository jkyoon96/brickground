import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BrickGround - 브릭 창작 및 쇼핑 플랫폼',
  description:
    '나만의 브릭아트, 도트아트, 3D 창작물을 만들고 공유하는 브릭 창작 및 쇼핑 플랫폼',
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
