'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  CreditCard,
  Star,
  Box,
  Palette,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MypageSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userLevel?: string;
  userPoints?: number;
}

const menuItems = [
  {
    section: '마이페이지',
    items: [
      { href: '/mypage', label: '대시보드', icon: LayoutDashboard },
    ],
  },
  {
    section: '내 작품',
    items: [
      { href: '/mypage/brickarts', label: '브릭아트', icon: Box },
      { href: '/mypage/dotarts', label: '도트아트', icon: Palette },
      { href: '/mypage/creations', label: '창작물', icon: Sparkles },
    ],
  },
  {
    section: '쇼핑 정보',
    items: [
      { href: '/mypage/carts', label: '장바구니', icon: ShoppingCart },
      { href: '/mypage/orders', label: '주문 내역', icon: Package },
      { href: '/mypage/wishlist', label: '위시리스트', icon: Heart },
      { href: '/mypage/coupons', label: '쿠폰함', icon: CreditCard },
      { href: '/mypage/points', label: '포인트', icon: Star },
    ],
  },
  {
    section: '계정 관리',
    items: [
      { href: '/mypage/profile', label: '프로필 설정', icon: User },
    ],
  },
  {
    section: '고객 지원',
    items: [
      { href: '/mypage/inquiries', label: '1:1 문의', icon: MessageSquare },
    ],
  },
];

export function MypageSidebar({
  userName = '사용자',
  userEmail = 'user@example.com',
  userAvatar,
  userLevel = 'Bronze',
  userPoints = 0,
}: MypageSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen">
      {/* User Profile Card */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pixar-blue to-toy-purple flex items-center justify-center text-white text-xl font-bold overflow-hidden">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{userName}</h3>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div>
            <p className="text-xs text-gray-500">회원 등급</p>
            <p className="font-bold text-pixar-blue">{userLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">포인트</p>
            <p className="font-bold text-toy-purple">
              {userPoints.toLocaleString()}P
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
              {section.section}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = item.href === '/mypage'
                  ? pathname === '/mypage'
                  : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-pixar-blue text-white'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-pixar-blue'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Logout Button */}
        <Button variant="ghost" className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 mt-4">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">로그아웃</span>
        </Button>
      </nav>
    </aside>
  );
}

export default MypageSidebar;
