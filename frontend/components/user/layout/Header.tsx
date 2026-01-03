'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Store,
  Blocks,
  Grid3X3,
  Sparkles,
  BookOpen,
  GraduationCap,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';

interface HeaderProps {
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  } | null;
  cartCount?: number;
  wishlistCount?: number;
}

const navItems = [
  { href: '/brickarts', label: '브릭아트', icon: Blocks },
  { href: '/dotarts', label: '도트아트', icon: Grid3X3 },
  { href: '/creations', label: '창작물', icon: Sparkles },
  { href: '/products', label: '쇼핑몰', icon: Store },
  { href: '/classes', label: '체험 & 방과후 수업', icon: GraduationCap },
  { href: '/manuals', label: '설명서', icon: BookOpen },
  { href: '/help', label: '도움말', icon: HelpCircle },
];

export function Header({
  user,
  cartCount = 0,
  wishlistCount = 0,
}: HeaderProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo + Right Section */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/brickground_logo.png"
              alt="BrickGround"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Box - Desktop */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border-2 border-transparent focus-within:border-pixar-blue focus-within:bg-white transition-all duration-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Icon Buttons */}
            <div className="flex items-center gap-1">
              {/* Search - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-600 hover:text-pixar-blue hover:bg-blue-50"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Wishlist */}
              <Link
                href="/mypage/wishlist"
                className="relative p-2 text-gray-600 hover:text-pixar-blue hover:bg-blue-50 rounded-full transition-all"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pixar-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/mypage/carts"
                className="relative p-2 text-gray-600 hover:text-pixar-blue hover:bg-blue-50 rounded-full transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pixar-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Avatar / Login */}
              {user ? (
                <div className="relative ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-pixar-blue to-toy-purple flex items-center justify-center text-white font-bold text-sm overflow-hidden p-0 hover:opacity-90"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </Button>
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/mypage"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        마이페이지
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 justify-start rounded-none h-auto font-normal"
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button asChild size="sm" className="ml-2">
                  <Link href="/login">로그인</Link>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-pixar-blue hover:bg-blue-50"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-start gap-1 py-2 border-t border-gray-50 -ml-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-pixar-blue hover:bg-blue-50 rounded-full transition-all duration-200"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-gray-100"
          >
            {/* Mobile Search */}
            <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-gray-50 rounded-2xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-gray-400"
              />
            </div>

            {/* Mobile Nav Items */}
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-pixar-blue hover:bg-blue-50 rounded-xl transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}

export default Header;
