'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  MessageSquare,
  Bell,
  Store,
  TrendingUp,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface SellerSidebarProps {
  storeName?: string;
  storeImage?: string;
  salesThisMonth?: number;
  ordersToProcess?: number;
}

const menuItems = [
  {
    section: '대시보드',
    items: [
      { href: '/seller', label: '홈', icon: LayoutDashboard },
      { href: '/seller/analytics', label: '판매 분석', icon: BarChart3 },
    ],
  },
  {
    section: '상품 관리',
    items: [
      { href: '/seller/products', label: '상품 목록', icon: Package },
      { href: '/seller/products/new', label: '상품 등록', icon: FileText },
      { href: '/seller/inventory', label: '재고 관리', icon: Store },
    ],
  },
  {
    section: '주문 관리',
    items: [
      { href: '/seller/orders', label: '주문 목록', icon: ShoppingCart },
      { href: '/seller/shipping', label: '배송 관리', icon: TrendingUp },
      { href: '/seller/returns', label: '반품/교환', icon: Package },
    ],
  },
  {
    section: '고객 관리',
    items: [
      { href: '/seller/customers', label: '고객 목록', icon: Users },
      { href: '/seller/reviews', label: '리뷰 관리', icon: MessageSquare },
      { href: '/seller/inquiries', label: '문의 관리', icon: HelpCircle },
    ],
  },
  {
    section: '설정',
    items: [
      { href: '/seller/settings', label: '스토어 설정', icon: Settings },
      { href: '/seller/notifications', label: '알림 설정', icon: Bell },
    ],
  },
];

export function SellerSidebar({
  storeName = '내 스토어',
  storeImage,
  salesThisMonth = 0,
  ordersToProcess = 0,
}: SellerSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen">
      {/* Store Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pixar-blue to-toy-cyan flex items-center justify-center overflow-hidden">
            {storeImage ? (
              <img
                src={storeImage}
                alt={storeName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{storeName}</h3>
            <p className="text-xs text-gray-500">판매자 대시보드</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">이번 달 매출</p>
            <p className="font-bold text-pixar-blue">
              {salesThisMonth.toLocaleString()}원
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">처리 대기</p>
            <p className="font-bold text-orange-500">{ordersToProcess}건</p>
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
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/seller' && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-pixar-blue text-white'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-pixar-blue'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default SellerSidebar;
