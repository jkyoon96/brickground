'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import {
  Layout,
  MypageSidebar,
  PointsPageHeader,
  PointsHeroCard,
  PointsExpirationWarning,
  PointsFilterSection,
  PointHistoryItem,
  PointsTipBox,
} from '@/components/user';
import type { PointsFilterType, PointsPeriod, PointTransactionType } from '@/components/user';

// Mock data
interface PointTransaction {
  id: string;
  type: PointTransactionType;
  title: string;
  description: string;
  amount: number;
  expirationDate?: string;
}

const mockTransactions: PointTransaction[] = [
  {
    id: '1',
    type: 'earn',
    title: '상품 리뷰 작성',
    description: '2025.01.18 14:32',
    amount: 1500,
    expirationDate: '2026.01.18',
  },
  {
    id: '2',
    type: 'use',
    title: '상품 결제 사용',
    description: '2025.01.15 10:15 · 주문번호 ORD-20250115-0038',
    amount: 5000,
  },
  {
    id: '3',
    type: 'earn',
    title: '구매 적립 (3%)',
    description: '2025.01.12 16:20 · 배송완료',
    amount: 2670,
    expirationDate: '2026.01.12',
  },
  {
    id: '4',
    type: 'earn',
    title: '등급 업그레이드 보너스',
    description: '2025.01.10 00:00 · SILVER → GOLD',
    amount: 5000,
    expirationDate: '2026.01.10',
  },
  {
    id: '5',
    type: 'expire',
    title: '유효기간 만료 소멸',
    description: '2025.01.05 00:00',
    amount: 1200,
  },
  {
    id: '6',
    type: 'earn',
    title: '출석 체크 보너스',
    description: '2025.01.01 09:30',
    amount: 100,
    expirationDate: '2026.01.01',
  },
];

export default function MypagePointsPage() {
  const [filter, setFilter] = useState<PointsFilterType>('all');
  const [period, setPeriod] = useState<PointsPeriod>('1month');

  // Filter transactions
  const filteredTransactions =
    filter === 'all'
      ? mockTransactions
      : mockTransactions.filter((t) => t.type === filter);

  // Handlers
  const handleFilterChange = useCallback((newFilter: PointsFilterType) => {
    setFilter(newFilter);
  }, []);

  const handlePeriodChange = useCallback((newPeriod: PointsPeriod) => {
    setPeriod(newPeriod);
  }, []);

  const handleShopClick = useCallback(() => {
    console.log('Navigate to shop');
  }, []);

  const handleLoadMore = useCallback(() => {
    console.log('Load more transactions');
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
          <PointsPageHeader />

          {/* Points Hero Card */}
          <PointsHeroCard
            totalPoints={12500}
            monthlyEarned={3200}
            monthlyUsed={5000}
            expiringPoints={2000}
            expiringDays={30}
          />

          {/* Expiration Warning */}
          <PointsExpirationWarning
            expiringPoints={2000}
            expirationDate="2025.02.20"
            onShopClick={handleShopClick}
          />

          {/* Filter & History Card */}
          <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
            {/* Filter Section */}
            <PointsFilterSection
              selectedFilter={filter}
              onFilterChange={handleFilterChange}
              selectedPeriod={period}
              onPeriodChange={handlePeriodChange}
            />

            {/* Points History List */}
            <div className="mb-4">
              {filteredTransactions.map((transaction) => (
                <PointHistoryItem
                  key={transaction.id}
                  type={transaction.type}
                  title={transaction.title}
                  description={transaction.description}
                  amount={transaction.amount}
                  expirationDate={transaction.expirationDate}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center border-t border-[#E2E8F0] pt-6">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 rounded-[28px] border-2 border-[#E2E8F0] bg-white px-6 py-3.5 font-semibold text-[#1E293B] transition-all hover:-translate-y-0.5 hover:border-[#0066FF] hover:text-[#0066FF] hover:shadow-[0_4px_12px_rgba(0,102,255,0.15)]"
              >
                <Plus className="h-5 w-5" />
                <span>더보기</span>
                <span className="rounded-xl bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#64748B]">
                  8개 더보기
                </span>
              </button>
            </div>
          </div>

          {/* Tip Box */}
          <PointsTipBox />
        </main>
      </div>
    </Layout>
  );
}
