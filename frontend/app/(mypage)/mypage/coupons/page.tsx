'use client';

import { useState, useCallback } from 'react';
import {
  Layout,
  MypageSidebar,
  CouponsPageHeader,
  CouponRegisterBox,
  CouponsFilterTabs,
  CouponCard,
  CouponInfoBox,
} from '@/components/user';
import type { CouponStatusFilter, CouponType, CouponCategory } from '@/components/user';

// Mock data
interface Coupon {
  id: string;
  type: CouponType;
  discountValue: number;
  title: string;
  description: string;
  minOrderAmount?: number;
  maxDiscount?: number;
  expirationDate: string;
  daysLeft?: number;
  category?: CouponCategory;
  gradientColors?: [string, string];
  status: 'available' | 'used' | 'expired';
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    type: 'percent',
    discountValue: 10,
    title: '신규 회원 웰컴 쿠폰',
    description: '전 상품 10% 할인',
    minOrderAmount: 30000,
    maxDiscount: 10000,
    expirationDate: '2025.01.25',
    daysLeft: 5,
    status: 'available',
  },
  {
    id: '2',
    type: 'fixed',
    discountValue: 5000,
    title: 'GOLD 등급 축하 쿠폰',
    description: '전 상품 5,000원 할인',
    minOrderAmount: 50000,
    expirationDate: '2025.02.10',
    gradientColors: ['#A29BFE', '#818CF8'],
    status: 'available',
  },
  {
    id: '3',
    type: 'freeShip',
    discountValue: 0,
    title: '무료배송 쿠폰',
    description: '배송비 무료',
    expirationDate: '2025.03.31',
    status: 'available',
  },
  {
    id: '4',
    type: 'percent',
    discountValue: 15,
    title: 'DotArt 전용 할인 쿠폰',
    description: 'DotArt 카테고리 15% 할인',
    maxDiscount: 15000,
    expirationDate: '2025.02.28',
    category: 'dotart',
    gradientColors: ['#FF9F43', '#FECA57'],
    status: 'available',
  },
  {
    id: '5',
    type: 'fixed',
    discountValue: 3000,
    title: 'BrickArt 스킨 할인 쿠폰',
    description: 'BrickArt 스킨 상품 3,000원 할인',
    expirationDate: '2025.04.30',
    category: 'brickart',
    gradientColors: ['#6BCB77', '#74E291'],
    status: 'available',
  },
];

const filterTabs = [
  { value: 'available' as CouponStatusFilter, label: '사용 가능', count: 5 },
  { value: 'used' as CouponStatusFilter, label: '사용 완료', count: 12 },
  { value: 'expired' as CouponStatusFilter, label: '기간 만료', count: 3 },
];

export default function MypageCouponsPage() {
  const [statusFilter, setStatusFilter] = useState<CouponStatusFilter>('available');

  // Filter coupons
  const filteredCoupons = mockCoupons.filter((c) => c.status === statusFilter);

  // Handlers
  const handleRegisterCoupon = useCallback((code: string) => {
    console.log('Register coupon:', code);
  }, []);

  const handleStatusFilterChange = useCallback((filter: CouponStatusFilter) => {
    setStatusFilter(filter);
  }, []);

  const handleUseCoupon = useCallback((id: string) => {
    console.log('Use coupon:', id);
  }, []);

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        {/* Sidebar */}
        <MypageSidebar
          userName="홍길동"
          userEmail="hong@email.com"
          userLevel="VIP"
        />

        {/* Content Area */}
        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Page Title */}
          <CouponsPageHeader />

          {/* Coupon Register Box */}
          <CouponRegisterBox onRegister={handleRegisterCoupon} />

          {/* Filter Tabs */}
          <CouponsFilterTabs
            tabs={filterTabs}
            selectedTab={statusFilter}
            onTabChange={handleStatusFilterChange}
          />

          {/* Coupon List */}
          <div className="mb-6 space-y-4">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                id={coupon.id}
                type={coupon.type}
                discountValue={coupon.discountValue}
                title={coupon.title}
                description={coupon.description}
                minOrderAmount={coupon.minOrderAmount}
                maxDiscount={coupon.maxDiscount}
                expirationDate={coupon.expirationDate}
                daysLeft={coupon.daysLeft}
                category={coupon.category}
                gradientColors={coupon.gradientColors}
                isUsed={coupon.status === 'used'}
                isExpired={coupon.status === 'expired'}
                onUse={handleUseCoupon}
              />
            ))}
          </div>

          {/* Info Box */}
          <CouponInfoBox />
        </main>
      </div>
    </Layout>
  );
}
