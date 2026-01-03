'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuthStore } from '@/lib/stores/authStore';

interface LayoutProps {
  children: ReactNode;
  cartCount?: number;
  wishlistCount?: number;
  notificationCount?: number;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function Layout({
  children,
  cartCount = 0,
  wishlistCount = 0,
  notificationCount = 0,
  hideHeader = false,
  hideFooter = false,
}: LayoutProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const user = useAuthStore((state) => state.user);

  // Wait for hydration to complete before showing auth-dependent UI
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!hideHeader && (
        <Header
          user={isHydrated ? user : null}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          notificationCount={notificationCount}
        />
      )}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
