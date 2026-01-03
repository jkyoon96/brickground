'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingCart,
  Coins,
  Package,
  MessageCircle,
  BarChart2,
  CheckSquare,
  ShoppingBag,
  ChevronRight,
  Download,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui';
import {
  Layout,
  SellerSidebar,
  SellerStatCard,
  TodoItem,
  SellerOrderRow,
} from '@/components/user';

// Mock data
const mockStats = [
  {
    icon: ShoppingCart,
    label: '오늘 주문',
    value: '12건',
    variant: 'blue' as const,
    trend: { direction: 'up' as const, text: '전일 대비 +15%' },
  },
  {
    icon: Coins,
    label: '오늘 매출',
    value: '584,000원',
    variant: 'yellow' as const,
    trend: { direction: 'up' as const, text: '전일 대비 +23%' },
  },
  {
    icon: Package,
    label: '배송 대기',
    value: '5건',
    variant: 'green' as const,
    trend: { direction: 'down' as const, text: '전일 대비 -20%' },
  },
  {
    icon: MessageCircle,
    label: '미답변 문의',
    value: '3건',
    variant: 'red' as const,
    trend: { direction: 'neutral' as const, text: '빠른 답변 필요' },
  },
];

const mockTodos = [
  { id: '1', text: '신규 주문 5건 확인', done: false, priority: 'high' as const },
  { id: '2', text: '배송 준비 완료', done: true, priority: 'medium' as const },
  { id: '3', text: '고객 문의 답변', done: false, priority: 'high' as const },
  { id: '4', text: '재고 확인', done: false, priority: 'medium' as const },
];

const mockOrders = [
  { orderId: '#ORD-2401', productName: '3D 미니어처 하우스 키트', status: 'new' as const, amount: 45000 },
  { orderId: '#ORD-2400', productName: '픽셀 아트 DIY 키트', status: 'processing' as const, amount: 32000 },
  { orderId: '#ORD-2399', productName: 'VR 캐릭터 피규어 세트', status: 'shipped' as const, amount: 78000 },
];

export default function SellerDashboardPage() {
  const [todos, setTodos] = useState(mockTodos);

  const handleTodoToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px]">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <SellerSidebar
            storeName="홍길동의 공방"
            salesThisMonth={2450000}
            ordersToProcess={5}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="flex items-center gap-3 text-xl font-extrabold text-gray-900 md:text-2xl">
              <LayoutDashboard className="h-6 w-6 text-pixar-blue md:h-7 md:w-7" />
              대시보드
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                리포트
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                상품 등록
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockStats.map((stat) => (
              <SellerStatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                variant={stat.variant}
                trend={stat.trend}
              />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chart Placeholder */}
            <div className="rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,102,255,0.1)] lg:col-span-2">
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <BarChart2 className="h-5 w-5 text-pixar-blue" />
                  매출 현황
                </h2>
                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <option>최근 7일</option>
                  <option>최근 30일</option>
                </select>
              </div>
              <div className="p-6">
                <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 text-gray-400">
                  <BarChart2 className="mb-3 h-12 w-12 opacity-50" />
                  <span>매출 차트 영역</span>
                </div>
              </div>
            </div>

            {/* Todo List */}
            <div className="rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
              <div className="border-b border-gray-100 p-5">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <CheckSquare className="h-5 w-5 text-pixar-blue" />
                  오늘 할 일
                </h2>
              </div>
              <div className="space-y-3 p-5">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                    priority={todo.priority}
                    onToggle={handleTodoToggle}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-6 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <ShoppingBag className="h-5 w-5 text-pixar-blue" />
                최근 주문
              </h2>
              <Link
                href="/seller/orders"
                className="flex items-center gap-1 text-sm font-semibold text-pixar-blue hover:underline"
              >
                전체보기
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="p-5">
              {mockOrders.map((order) => (
                <SellerOrderRow
                  key={order.orderId}
                  orderId={order.orderId}
                  productName={order.productName}
                  status={order.status}
                  amount={order.amount}
                  href={`/seller/orders/${order.orderId}`}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
