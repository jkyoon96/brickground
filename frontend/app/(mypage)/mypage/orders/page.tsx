'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import {
  Layout,
  OrdersFilterSection,
  OrderCard,
  OrdersPageHeader,
  MypageSidebar,
} from '@/components/user';
import type { OrderFilterStatus, OrderProductStatus } from '@/components/user';

// Mock data
const mockOrders = [
  {
    orderId: '1',
    orderNumber: 'ORD-20250118-0042',
    orderDate: '2025.01.18',
    products: [
      {
        id: 'p1',
        imageUrl: '/images/shop/1000000107.jpg',
        status: 'preparing' as OrderProductStatus,
        title: '미니 브릭 캐릭터 컬렉션 5종',
        option: '옵션: 스페셜 에디션 / 수량: 1개',
        price: 45000,
        primaryAction: {
          label: '배송조회',
          onClick: () => console.log('배송조회'),
          variant: 'outline' as const,
        },
        secondaryAction: {
          label: '주문취소',
          onClick: () => console.log('주문취소'),
        },
      },
    ],
  },
  {
    orderId: '2',
    orderNumber: 'ORD-20250115-0038',
    orderDate: '2025.01.15',
    totalPrice: 156000,
    products: [
      {
        id: 'p2',
        imageUrl: '/images/shop/1000000106.jpg',
        status: 'shipping' as OrderProductStatus,
        title: '브릭 테크닉 포르쉐 911 GT3 RS',
        option: '옵션: 기본 / 수량: 1개',
        price: 129000,
        primaryAction: {
          label: '배송조회',
          onClick: () => console.log('배송조회'),
          variant: 'primary' as const,
        },
      },
      {
        id: 'p3',
        imageUrl: '/images/shop/1000000104.jpg',
        status: 'shipping' as OrderProductStatus,
        title: '브릭 확장 파츠 세트',
        option: '옵션: 300피스 / 수량: 1개',
        price: 27000,
        primaryAction: {
          label: '배송조회',
          onClick: () => console.log('배송조회'),
          variant: 'primary' as const,
        },
      },
    ],
  },
  {
    orderId: '3',
    orderNumber: 'ORD-20250110-0031',
    orderDate: '2025.01.10',
    products: [
      {
        id: 'p4',
        imageUrl: '/images/shop/1000000094.jpg',
        status: 'completed' as OrderProductStatus,
        statusDate: '01.12 수령',
        title: '브릭 아트 픽셀 프레임 세트',
        option: '옵션: 화이트 프레임 / 수량: 1개',
        price: 89000,
        primaryAction: {
          label: '리뷰쓰기',
          onClick: () => console.log('리뷰쓰기'),
          variant: 'primary' as const,
        },
        secondaryAction: {
          label: '재구매',
          onClick: () => console.log('재구매'),
        },
      },
    ],
  },
];

export default function MypageOrdersPage() {
  const [filter, setFilter] = useState<OrderFilterStatus>('all');
  const [startDate, setStartDate] = useState('2024-12-01');
  const [endDate, setEndDate] = useState('2025-01-20');

  const handleFilterChange = useCallback((newFilter: OrderFilterStatus) => {
    setFilter(newFilter);
  }, []);

  const handleSearch = useCallback(() => {
    console.log('Search with:', { filter, startDate, endDate });
  }, [filter, startDate, endDate]);

  const handleLoadMore = useCallback(() => {
    console.log('Load more orders');
  }, []);

  // Filter orders based on selected filter
  const filteredOrders = filter === 'all'
    ? mockOrders
    : mockOrders.filter((order) =>
        order.products.some((product) => {
          if (filter === 'paid') return product.status === 'paid';
          if (filter === 'shipping') return product.status === 'shipping' || product.status === 'preparing';
          if (filter === 'completed') return product.status === 'completed';
          if (filter === 'canceled') return product.status === 'canceled';
          return true;
        })
      );

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
          <OrdersPageHeader />

          {/* Filter Section */}
          <OrdersFilterSection
            selectedFilter={filter}
            onFilterChange={handleFilterChange}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSearch={handleSearch}
          />

          {/* Order List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                orderId={order.orderId}
                orderNumber={order.orderNumber}
                orderDate={order.orderDate}
                products={order.products}
                totalPrice={order.totalPrice}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center py-6">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-[28px] border-2 border-[#E2E8F0] bg-white px-6 py-3.5 font-semibold text-[#1E293B] transition-all hover:-translate-y-0.5 hover:border-[#0066FF] hover:text-[#0066FF] hover:shadow-[0_4px_12px_rgba(0,102,255,0.15)]"
            >
              <Plus className="h-5 w-5" />
              <span>더보기</span>
              <span className="rounded-xl bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#64748B]">
                12개 더보기
              </span>
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
