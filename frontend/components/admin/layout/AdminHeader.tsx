'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Settings,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notificationCount?: number;
  onMenuToggle?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function AdminHeader({
  user,
  notificationCount = 0,
  onMenuToggle,
  onThemeToggle,
  isDarkMode = false,
}: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="검색..."
            className="w-64 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">알림</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 text-sm text-muted-foreground text-center">
                  새로운 알림이 없습니다
                </div>
              </div>
              <div className="p-2 border-t border-border">
                <Link
                  href="/admin/notifications"
                  className="block text-center text-sm text-primary hover:underline"
                >
                  모든 알림 보기
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* User Menu */}
        <div className="relative ml-2">
          <Button
            variant="ghost"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-muted transition-colors h-auto"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'A'
              )}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role || '관리자'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 hidden lg:block" />
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50">
              <div className="p-4 border-b border-border">
                <p className="font-medium">{user?.name || 'Admin'}</p>
                <p className="text-sm text-muted-foreground">
                  {user?.email || 'admin@brickground.com'}
                </p>
              </div>
              <div className="p-2">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4" />
                  프로필
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  설정
                </Link>
                <hr className="my-2 border-border" />
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive rounded-md hover:bg-destructive/10 transition-colors h-auto justify-start"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
