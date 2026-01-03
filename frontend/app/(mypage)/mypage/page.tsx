'use client';

import { Coins, Ticket, Heart, Star, PlusCircle } from 'lucide-react';
import {
  Layout,
  MypageSidebar,
  MypageStatCard,
  MypageOrderStatus,
  MypageRecentOrder,
  MypageQuickMenu,
  MypageActivity,
} from '@/components/user';
import type { MypageOrderItemStatus } from '@/components/user';

// Mock data
const mockStats = [
  { icon: Coins, label: '포인트', value: '12,500P', color: 'rose' as const },
  { icon: Ticket, label: '쿠폰', value: '5장', color: 'purple' as const },
  { icon: Heart, label: '찜 목록', value: '23개', color: 'coral' as const },
  { icon: Star, label: '내 리뷰', value: '8건', color: 'cyan' as const },
];

const mockOrderStatuses = [
  { label: '결제완료', count: 2, isHighlighted: true },
  { label: '상품준비중', count: 1 },
  { label: '배송중', count: 1 },
  { label: '배송완료', count: 3 },
  { label: '취소/반품', count: 0, isMuted: true },
];

const mockRecentOrders: Array<{
  id: string;
  status: MypageOrderItemStatus;
  date: string;
  title: string;
  price: number;
  actionLabel: string;
}> = [
  {
    id: '1',
    status: 'shipping',
    date: '2025.01.15',
    title: '브릭 테크닉 포르쉐 911 GT3 RS 외 1건',
    price: 156000,
    actionLabel: '배송조회',
  },
  {
    id: '2',
    status: 'completed',
    date: '2025.01.10',
    title: '브릭 아트 픽셀 프레임 세트',
    price: 89000,
    actionLabel: '리뷰쓰기',
  },
  {
    id: '3',
    status: 'preparing',
    date: '2025.01.18',
    title: '미니 브릭 캐릭터 컬렉션 5종',
    price: 45000,
    actionLabel: '주문상세',
  },
];

const mockActivities = [
  {
    id: '1',
    icon: PlusCircle,
    color: 'green' as const,
    title: '포인트 적립 +1,500P',
    description: '상품 리뷰 작성 · 2시간 전',
  },
  {
    id: '2',
    icon: Ticket,
    color: 'rose' as const,
    title: '쿠폰 발급',
    description: '신규 회원 10% 할인 · 어제',
  },
  {
    id: '3',
    icon: Star,
    color: 'purple' as const,
    title: '등급 업그레이드',
    description: 'SILVER → GOLD · 3일 전',
  },
];

export default function MypageDashboardPage() {
  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        {/* Sidebar */}
        <MypageSidebar
          userName="김브릭"
          userEmail="brick@email.com"
          userLevel="GOLD"
          userPoints={12500}
        />

        {/* Content Area */}
        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="mb-5 grid grid-cols-2 gap-3 md:mb-6 md:grid-cols-4 md:gap-4">
            {mockStats.map((stat) => (
              <MypageStatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
              />
            ))}
          </div>

          {/* Order Status */}
          <div className="mb-5 md:mb-6">
            <MypageOrderStatus statuses={mockOrderStatuses} />
          </div>

          {/* Recent Orders */}
          <div className="mb-5 md:mb-6">
            <MypageRecentOrder orders={mockRecentOrders} />
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Quick Menu */}
            <MypageQuickMenu />

            {/* Recent Activity */}
            <MypageActivity activities={mockActivities} />
          </div>
        </main>
      </div>
    </Layout>
  );
}
