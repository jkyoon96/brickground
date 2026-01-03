'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notificationCount?: number;
}

export function AdminLayout({
  children,
  user,
  notificationCount = 0,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={cn('min-h-screen bg-background', isDarkMode && 'dark')}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        )}
      >
        <AdminHeader
          user={user}
          notificationCount={notificationCount}
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
