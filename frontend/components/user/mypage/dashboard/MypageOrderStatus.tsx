'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface OrderStatusItem {
  label: string;
  count: number;
  isHighlighted?: boolean;
  isMuted?: boolean;
}

interface MypageOrderStatusProps {
  title?: string;
  viewAllHref?: string;
  statuses?: OrderStatusItem[];
}

const defaultStatuses: OrderStatusItem[] = [
  { label: '결제완료', count: 2, isHighlighted: true },
  { label: '상품준비중', count: 1 },
  { label: '배송중', count: 1 },
  { label: '배송완료', count: 3 },
  { label: '취소/반품', count: 0, isMuted: true },
];

export function MypageOrderStatus({
  title = '주문/배송 현황',
  viewAllHref = '/mypage/orders',
  statuses = defaultStatuses,
}: MypageOrderStatusProps) {
  return (
    <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between md:mb-6">
        <h3 className="text-lg font-bold text-[#1E293B]">{title}</h3>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-[#0066FF] hover:underline"
        >
          전체보기 →
        </Link>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-y-4 text-center md:grid-cols-5 md:gap-y-0">
        {statuses.map((status, index) => (
          <div
            key={status.label}
            className={cn(
              'py-3 md:py-4',
              index < statuses.length - 1 && 'md:border-r md:border-[#E2E8F0]',
              // Mobile: add border-right for left items
              index % 2 === 0 && 'border-r border-[#E2E8F0] md:border-r'
            )}
          >
            <p
              className={cn(
                'mb-1 text-2xl font-bold md:text-3xl',
                status.isHighlighted && 'text-[#0066FF]',
                status.isMuted && 'text-[#94A3B8]',
                !status.isHighlighted && !status.isMuted && 'text-[#1E293B]'
              )}
            >
              {status.count}
            </p>
            <p className="text-xs text-[#64748B] md:text-sm">{status.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MypageOrderStatus;
