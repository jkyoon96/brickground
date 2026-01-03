'use client';

import Link from 'next/link';
import {
  Package,
  CheckCircle,
  Box,
  Truck,
  Check,
  Loader,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type MypageOrderItemStatus = 'shipping' | 'completed' | 'preparing';

interface RecentOrderItem {
  id: string;
  status: MypageOrderItemStatus;
  date: string;
  title: string;
  price: number;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

interface MypageRecentOrderProps {
  title?: string;
  viewAllHref?: string;
  orders?: RecentOrderItem[];
}

const statusConfig: Record<
  MypageOrderItemStatus,
  {
    label: string;
    icon: LucideIcon;
    badgeClass: string;
    iconBg: string;
    iconColor: string;
    boxIcon: LucideIcon;
  }
> = {
  shipping: {
    label: '배송중',
    icon: Truck,
    badgeClass: 'bg-[rgba(0,206,201,0.1)] text-[#00CEC9]',
    iconBg: 'bg-gradient-to-br from-[#E5F0FF] to-[#F0F5FF]',
    iconColor: 'text-[#0066FF]',
    boxIcon: Package,
  },
  completed: {
    label: '배송완료',
    icon: Check,
    badgeClass: 'bg-[rgba(107,203,119,0.1)] text-[#6BCB77]',
    iconBg: 'bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9]',
    iconColor: 'text-[#6BCB77]',
    boxIcon: CheckCircle,
  },
  preparing: {
    label: '상품준비중',
    icon: Loader,
    badgeClass: 'bg-[rgba(255,217,61,0.2)] text-[#F59E0B]',
    iconBg: 'bg-gradient-to-br from-[#FFF8E1] to-[#FFFDE7]',
    iconColor: 'text-[#F59E0B]',
    boxIcon: Box,
  },
};

const defaultOrders: RecentOrderItem[] = [
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

export function MypageRecentOrder({
  title = '최근 주문',
  viewAllHref = '/mypage/orders',
  orders = defaultOrders,
}: MypageRecentOrderProps) {
  return (
    <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1E293B]">{title}</h3>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-[#0066FF] hover:underline"
        >
          더보기 →
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          const BoxIcon = config.boxIcon;
          const isReview = order.status === 'completed';

          return (
            <div
              key={order.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F0] p-3 transition-all hover:border-[#0066FF] hover:bg-[rgba(0,102,255,0.03)] md:flex-nowrap md:gap-4 md:p-4"
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16',
                  config.iconBg
                )}
              >
                <BoxIcon className={cn('h-7 w-7 md:h-8 md:w-8', config.iconColor)} />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-[20px] px-2.5 py-1 text-xs font-bold',
                      config.badgeClass
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{order.date}</span>
                </div>
                <p className="truncate font-semibold text-[#1E293B]">
                  {order.title}
                </p>
                <p className="text-sm text-[#64748B]">
                  {order.price.toLocaleString()}원
                </p>
              </div>

              {/* Action Button */}
              {order.actionLabel && (
                <Button
                  variant={isReview ? 'gradient' : 'secondary'}
                  onClick={order.onAction}
                  className={cn(
                    'mt-2 w-full flex-shrink-0 rounded-xl px-4 py-2 text-sm font-semibold md:mt-0 md:w-auto',
                    isReview
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white hover:shadow-lg'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                  )}
                >
                  {order.actionLabel}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MypageRecentOrder;
